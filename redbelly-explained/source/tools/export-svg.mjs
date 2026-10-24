// Export every infographic as an editable SVG with live text.
//
//   node tools/export-svg.mjs              all topics, all formats -> ../svg/
//   node tools/export-svg.mjs 3 receptor   only these topics
//
// The exporter reads the same live layout the PNG renderer screenshots and
// writes it out as plain SVG: boxes become rects, every line of text becomes a
// <text> element (so it stays editable in Figma, Illustrator or Inkscape), and
// the icons and diagrams are copied with their styles written inline.
// Fonts: Be Vietnam Pro and JetBrains Mono (both on Google Fonts, and built
// into Figma). The files also link the copies in source/fonts for browsers.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FORMATS, launchOptions, openTopic } from "./render.mjs";

const require = createRequire(import.meta.url);
const { chromium } = (() => {
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try { return require(id); } catch { /* next */ }
  }
  throw new Error("Playwright not found. Run `npm install` in the source folder.");
})();

const here = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(here, "..");
const root = path.resolve(sourceDir, "..");

/* Runs in the page. Walks #canvas and returns an SVG document as a string. */
function toSVG(opts) {
  const canvas = document.getElementById("canvas");
  const C = canvas.getBoundingClientRect();
  const parts = [];
  const defs = [];
  let uid = 0;
  const n = v => Math.round(v * 100) / 100;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function rgba(str) {
    const m = /rgba?\(([^)]+)\)/.exec(str || "");
    if (!m) return null;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    const a = p.length > 3 ? p[3] : 1;
    if (!(a > 0)) return null;
    return { hex: "#" + p.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, "0")).join(""), a };
  }
  function paint(name, col) {
    if (!col) return `${name}="none"`;
    return `${name}="${col.hex}"` + (col.a < 1 ? ` ${name}-opacity="${n(col.a)}"` : "");
  }
  function visible(el) {
    const cs = getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden";
  }

  /* backgrounds and borders of one HTML element */
  function box(el, cs) {
    const r = el.getBoundingClientRect();
    if (r.width < 0.5 || r.height < 0.5) return;
    // browsers paint box edges on whole device pixels; match that
    const snap = v => Math.round(v * opts.scale) / opts.scale;
    const x0 = snap(r.left - C.left), y0 = snap(r.top - C.top), x1 = snap(r.right - C.left), y1 = snap(r.bottom - C.top);
    const x = x0, y = y0, w = x1 - x0, h = y1 - y0;
    if (w <= 0 || h <= 0) return;
    const bg = rgba(cs.backgroundColor);
    const sides = ["Top", "Right", "Bottom", "Left"].map(s => ({
      w: parseFloat(cs["border" + s + "Width"]) || 0,
      c: cs["border" + s + "Style"] === "none" ? null : rgba(cs["border" + s + "Color"]),
      dash: cs["border" + s + "Style"] === "dashed"
    }));
    const rad = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, w / 2, h / 2);
    const drawn = sides.filter(s => s.w > 0 && s.c);
    if (!bg && !drawn.length) return;
    const same = drawn.length === 4 && drawn.every(s => s.w === drawn[0].w && s.c.hex === drawn[0].c.hex && s.c.a === drawn[0].c.a);
    if (!drawn.length || same) {
      const b = same ? drawn[0].w : 0;
      parts.push(`<rect x="${n(x + b / 2)}" y="${n(y + b / 2)}" width="${n(w - b)}" height="${n(h - b)}"` +
        (rad ? ` rx="${n(Math.max(rad - b / 2, 0))}"` : "") + ` ${paint("fill", bg)}` +
        (same ? ` ${paint("stroke", drawn[0].c)} stroke-width="${n(b)}"` + (drawn[0].dash ? ` stroke-dasharray="${n(b * 5)} ${n(b * 4)}"` : "") : "") + "/>");
      return;
    }
    // uneven borders: fill, then each border band, all clipped to the rounded shape
    const id = "clip" + (++uid);
    defs.push(`<clipPath id="${id}"><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rad ? ` rx="${n(rad)}"` : ""}/></clipPath>`);
    const g = [`<g clip-path="url(#${id})">`];
    if (bg) g.push(`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" ${paint("fill", bg)}/>`);
    const band = [
      [x, y, w, sides[0].w], [x + w - sides[1].w, y, sides[1].w, h],
      [x, y + h - sides[2].w, w, sides[2].w], [x, y, sides[3].w, h]
    ];
    // thin sides first, so a thick accent side is painted on top
    [0, 1, 2, 3].sort((a, b) => sides[a].w - sides[b].w).forEach(i => {
      if (sides[i].w > 0 && sides[i].c) g.push(`<rect x="${n(band[i][0])}" y="${n(band[i][1])}" width="${n(band[i][2])}" height="${n(band[i][3])}" ${paint("fill", sides[i].c)}/>`);
    });
    g.push("</g>");
    parts.push(g.join(""));
  }

  /* an inline SVG (icon, diagram, connectors, background) with styles written in */
  const STYLE_PROPS = ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-dasharray", "opacity"];
  function inlineSVG(svg) {
    const cs = getComputedStyle(svg);
    const vb = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal : null;
    const w = parseFloat(cs.width), h = parseFloat(cs.height);
    if (!(w > 0 && h > 0)) return;
    const r = svg.getBoundingClientRect();
    const cx = r.left + r.width / 2 - C.left, cy = r.top + r.height / 2 - C.top;
    let t = `translate(${n(cx)} ${n(cy)})`;
    const m = /matrix\(([^)]+)\)/.exec(cs.transform || "");
    if (m) {
      const k = m[1].split(",").map(Number);
      t += ` matrix(${k.slice(0, 4).map(v => n(v)).join(" ")} 0 0)`;
    }
    t += ` translate(${n(-w / 2)} ${n(-h / 2)})`;
    if (vb) {
      const par = svg.preserveAspectRatio.baseVal;
      let sx = w / vb.width, sy = h / vb.height, ox = 0, oy = 0;
      if (par.align !== 1) {                       // 1 = none
        const s = par.meetOrSlice === 2 ? Math.max(sx, sy) : Math.min(sx, sy);
        const xMin = [2, 5, 8].includes(par.align), xMax = [4, 7, 10].includes(par.align);
        const yMin = [2, 3, 4].includes(par.align), yMax = [8, 9, 10].includes(par.align);
        ox = xMin ? 0 : xMax ? w - vb.width * s : (w - vb.width * s) / 2;
        oy = yMin ? 0 : yMax ? h - vb.height * s : (h - vb.height * s) / 2;
        sx = sy = s;
      }
      t += ` translate(${n(ox)} ${n(oy)}) scale(${n(sx)} ${n(sy)}) translate(${n(-vb.x)} ${n(-vb.y)})`;
    }
    const clone = svg.cloneNode(true);
    const src = [svg, ...svg.querySelectorAll("*")], dst = [clone, ...clone.querySelectorAll("*")];
    dst.forEach((el, i) => {
      if (i === 0) return;
      const tag = el.tagName.toLowerCase();
      if (["defs", "stop", "radialgradient", "lineargradient", "pattern", "clippath"].includes(tag) || el.closest("defs")) return;
      const s = getComputedStyle(src[i]);
      STYLE_PROPS.forEach(p => {
        let v = s.getPropertyValue(p);
        if (!v || v === "normal") return;
        if (p === "fill" || p === "stroke") {
          // the colour's own alpha and the *-opacity property multiply
          const op = parseFloat(s.getPropertyValue(p + "-opacity"));
          const base = isNaN(op) ? 1 : op;
          if (v.startsWith("url(")) {
            el.setAttribute(p, v.replace(/url\(["']?.*?(#[^"')]+)["']?\)/, "url($1)"));
            if (base < 1) el.setAttribute(p + "-opacity", n(base));
            return;
          }
          const col = rgba(v);
          el.setAttribute(p, col ? col.hex : "none");
          if (col && col.a * base < 1) el.setAttribute(p + "-opacity", n(col.a * base));
          else el.removeAttribute(p + "-opacity");
          return;
        }
        if (p === "stroke-dasharray" && v === "none") return;
        if (p === "opacity" && v === "1") return;
        el.setAttribute(p, v.replace(/px/g, ""));
      });
      el.removeAttribute("class");
      el.removeAttribute("style");
    });
    parts.push(`<g transform="${t}">${clone.innerHTML}</g>`);
  }

  /* text, one <text> per rendered line, positioned on its baseline */
  const meter = document.createElement("canvas").getContext("2d");
  function fontMetrics(cs) {
    meter.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const mm = meter.measureText("Hg");
    return { ascent: mm.fontBoundingBoxAscent, descent: mm.fontBoundingBoxDescent };
  }
  function textNode(node) {
    const el = node.parentElement;
    const cs = getComputedStyle(el);
    const raw = node.textContent;
    if (!raw.trim()) return;
    const fm = fontMetrics(cs);
    const col = rgba(cs.color);
    const upper = cs.textTransform === "uppercase";
    const ls = cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing);
    const family = cs.fontFamily.replace(/"/g, "'");
    const attrs = `font-family="${esc(family)}" font-size="${n(parseFloat(cs.fontSize))}" font-weight="${cs.fontWeight}"` +
      (ls ? ` letter-spacing="${n(ls)}"` : "") + ` ${paint("fill", col)}`;
    if (cs.writingMode.startsWith("vertical")) {
      const r = el.getBoundingClientRect(), range = document.createRange();
      range.selectNodeContents(node);
      const len = range.getBoundingClientRect().height;
      const txt = upper ? raw.trim().toUpperCase() : raw.trim();
      parts.push(`<text transform="translate(${n(r.left + r.width / 2 - C.left)} ${n(r.top + r.height / 2 - C.top)}) rotate(-90)" ` +
        `x="${n(-len / 2)}" y="${n((fm.ascent - fm.descent) / 2)}" ${attrs}>${esc(txt)}</text>`);
      return;
    }
    const range = document.createRange();
    const lines = [];
    let cur = null;
    for (let i = 0; i < raw.length; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rects = range.getClientRects();
      if (!rects.length) continue;
      const r = rects[0];
      if (r.width === 0) continue;
      if (!cur || Math.abs(r.top - cur.top) > r.height * 0.5) {
        cur = { top: r.top, x: null, text: "" };
        lines.push(cur);
      }
      if (cur.x === null && /\S/.test(raw[i])) cur.x = r.left;   // a line starts at its first visible letter
      cur.text += raw[i];
    }
    for (const L of lines) {
      let txt = L.text.trim().replace(/\s+/g, " ");
      if (!txt) continue;
      const x = L.x - C.left;
      if (upper) txt = txt.toUpperCase();
      // browsers put HTML text baselines on whole device pixels; do the same here
      const y = Math.round((L.top - C.top + Math.round(fm.ascent)) * opts.scale) / opts.scale;
      parts.push(`<text x="${n(x)}" y="${n(y)}" ${attrs} xml:space="preserve">${esc(txt)}</text>`);
    }
  }

  function walk(el) {
    if (!visible(el)) return;
    const cs = getComputedStyle(el);
    if (el.tagName.toLowerCase() === "svg") { inlineSVG(el); return; }
    if (el.tagName.toLowerCase() === "img") {
      const r = el.getBoundingClientRect();
      parts.push(`<image x="${n(r.left - C.left)}" y="${n(r.top - C.top)}" width="${n(r.width)}" height="${n(r.height)}" href="${opts.logo}" xlink:href="${opts.logo}" preserveAspectRatio="xMidYMid meet"/>`);
      return;
    }
    if (el !== canvas) box(el, cs);
    // paint children in stacking order: lower z-index first, then document order
    const kids = [...el.childNodes].map((k, i) => ({ k, i, z: k.nodeType === 1 ? (parseInt(getComputedStyle(k).zIndex, 10) || 0) : 0 }));
    kids.sort((a, b) => a.z - b.z || a.i - b.i);
    for (const { k } of kids) {
      if (k.nodeType === 3) textNode(k);
      else if (k.nodeType === 1) walk(k);
    }
  }

  walk(canvas);
  const W = C.width, H = C.height;
  const fontCss = opts.fonts.map(f => `@font-face{font-family:'${f.family}';font-weight:${f.weight};src:url('${f.url}') format('woff2')}`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${opts.outW}" height="${opts.outH}" viewBox="0 0 ${n(W)} ${n(H)}">\n` +
    `<title>${esc(opts.title)}</title>\n<desc>${esc(opts.desc)}</desc>\n` +
    `<defs><style>${fontCss}</style>${defs.join("")}</defs>\n` + parts.join("\n") + "\n</svg>\n";
}

async function main() {
  const wanted = process.argv.slice(2).filter(a => !a.startsWith("--"));
  const logo = "data:image/png;base64," + fs.readFileSync(path.join(sourceDir, "brand", "dao-logo-on-dark.png")).toString("base64");
  const browser = await chromium.launch(launchOptions());
  const probe = await browser.newPage();
  await probe.goto(pathToFileURL(path.join(sourceDir, "infographic.html")).href);
  const topics = (await probe.evaluate(() => window.RX.topics.map(t => ({ n: t.n, slug: t.slug, title: t.title, lead: t.lead }))))
    .filter(t => !wanted.length || wanted.some(w => w === String(t.n) || w === t.slug));
  await probe.close();

  for (const t of topics) {
    for (const fmt of Object.keys(FORMATS)) {
      const f = FORMATS[fmt];
      const outDir = path.join(root, "svg", f.dir);
      fs.mkdirSync(outDir, { recursive: true });
      const fontRel = path.relative(outDir, path.join(sourceDir, "fonts")).split(path.sep).join("/");
      const fonts = [
        ...[400, 500, 600, 700].map(wt => ({ family: "Be Vietnam Pro", weight: wt, url: `${fontRel}/be-vietnam-pro-latin-${wt}-normal.woff2` })),
        ...[400, 500, 700].map(wt => ({ family: "JetBrains Mono", weight: wt, url: `${fontRel}/jetbrains-mono-latin-${wt}-normal.woff2` }))
      ];
      const { page, context } = await openTopic(browser, t.slug, fmt);
      const svg = await page.evaluate(toSVG, {
        logo, fonts, scale: f.scale, outW: Math.round(f.width * f.scale), outH: Math.round(f.height * f.scale),
        title: `Redbelly Explained ${String(t.n).padStart(2, "0")}: ${t.title}`, desc: t.lead
      });
      await context.close();
      const file = path.join(outDir, `${String(t.n).padStart(2, "0")}-${t.slug}.svg`);
      fs.writeFileSync(file, svg);
      console.log(`exported ${path.relative(root, file)} (${Math.round(svg.length / 1024)} KB)`);
    }
  }
  await browser.close();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main().catch(e => { console.error(e); process.exit(1); });
