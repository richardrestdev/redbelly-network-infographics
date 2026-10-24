// Build the gallery site and the source list from src/topics.js.
//
//   node tools/build-site.mjs
//
// Writes, next to the source folder:
//   index.html         gallery: every infographic in 16:9, 4:5 and 1:1, with downloads
//   sources.html       the source list as a web page
//   SOURCES.md         the same source list as Markdown
//   assets/overview.png    all 11 at a glance
//   assets/redbelly-explained-png.zip   every PNG in one download (needs `zip`)
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadTopics } from "./lint-copy.mjs";
import { launchOptions } from "./render.mjs";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const RX = loadTopics();
const pad = n => String(n).padStart(2, "0");
const id = t => `${pad(t.n)}-${t.slug}`;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const FORMATS = [["16x9", "16:9", 1920, 1080], ["4x5", "4:5", 1080, 1350], ["1x1", "1:1", 1080, 1080]];

const GOV_NOTE = "Constitution v1.2 is out of date and is not used. Infographic 10 takes what has been decided and what is in force from the TASK-23 changelog (sourced to 1 August 2026), and how voting works today from the DAO voting platform. Where the changelog describes Snapshot voting, the voting platform takes priority, because voting has since moved off Snapshot.";

/* pages cited, in first-use order, with the infographics that use them */
function pagesUsed() {
  const map = new Map();
  for (const t of RX.topics) for (const f of t.facts) {
    const s = RX.src[f.src];
    if (!map.has(s.url)) map.set(s.url, { ...s, topics: new Set() });
    map.get(s.url).topics.add(pad(t.n));
  }
  return [...map.values()];
}

/* every string printed on one infographic, in reading order */
function printedText(t) {
  const out = [];
  (function walk(v, key) {
    if (typeof v === "string") { if (!["type", "icon", "dot"].includes(key) && v.trim()) out.push(v); }
    else if (Array.isArray(v)) v.forEach(x => walk(x, key));
    else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => walk(x, k));
  })(t.visual, "");
  return out;
}

/* ---------- SOURCES.md ---------- */
function sourcesMarkdown() {
  const cell = s => String(s).replace(/\|/g, "/").replace(/\n/g, " ");
  const lines = [
    "# Sources", "",
    `Every fact printed on the 11 infographics, the page it comes from and a short quote from that page that supports it. All quotes were found on the live pages on ${RX.verified} (see verification/source-check.md). Only the resources supplied with the task were used.`, "",
    `**Governance.** ${GOV_NOTE}`, "",
    "## Pages used", "",
    "| Page | Link | Used in |", "| --- | --- | --- |",
    ...pagesUsed().map(p => `| ${cell(p.name)} | ${p.url} | ${[...p.topics].join(", ")} |`), ""
  ];
  for (const t of RX.topics) {
    lines.push(`## ${pad(t.n)} ${t.title}`, "", `Printed source line: ${t.foot.join(" / ")}`, "",
      "| What the infographic says | Page | Supporting quote |", "| --- | --- | --- |",
      ...t.facts.map(f => `| ${cell(f.claim)} | [${cell(RX.src[f.src].name)}](${RX.src[f.src].url}) | "${cell(f.quote)}" |`), "");
  }
  return lines.join("\n");
}

/* ---------- shared page chrome ---------- */
const FONT_CSS = [[400, "be-vietnam-pro"], [500, "be-vietnam-pro"], [600, "be-vietnam-pro"], [700, "be-vietnam-pro"], [400, "jetbrains-mono"], [500, "jetbrains-mono"]]
  .map(([w, f]) => `@font-face{font-family:"${f === "be-vietnam-pro" ? "Be Vietnam Pro" : "JetBrains Mono"}";font-weight:${w};font-display:swap;src:url("source/fonts/${f}-latin-${w}-normal.woff2") format("woff2")}`).join("\n");

const SITE_CSS = `
${FONT_CSS}
:root{--page:#0c1317;--deep:#0a1014;--slate:#141f26;--nest:#17222a;--steel:#1d3140;--edge:#263641;--rule:#34444f;
  --t1:#f1f5f8;--t2:#c2ced6;--t3:#8fa1ad;--red:#EF5350;--red-ink:#ffb3ae;--ok:#86EFAC;
  --sans:"Be Vietnam Pro",system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,monospace;color-scheme:dark}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{background:var(--page);color:var(--t1);font:400 16px/1.55 var(--sans);overflow-x:hidden}
a{color:var(--red-ink);text-decoration:none}
a:hover{text-decoration:underline}
:focus-visible{outline:2px solid var(--red);outline-offset:3px;border-radius:2px}
.wrap{max-width:1280px;margin:0 auto;padding:0 16px}
@media (min-width:720px){.wrap{padding:0 40px}}
.rail{display:grid;grid-template-columns:repeat(11,1fr);gap:5px;padding-top:28px}
.rail i{height:4px;border-radius:2px;background:var(--red)}
header.top{padding-bottom:28px;border-bottom:1px solid var(--edge)}
.brandrow{display:flex;align-items:center;gap:14px;margin-top:22px}
.brandrow .eyebrow{margin-top:0}
.mark{display:block;height:48px;width:auto;flex:none}
.eyebrow{margin-top:22px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--t3)}
h1{margin-top:8px;font-size:clamp(34px,6vw,56px);line-height:1.04;letter-spacing:-.02em}
.intro{margin-top:14px;max-width:62ch;font-size:18px;color:var(--t2)}
.bar{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;margin-top:22px}
.seg{display:inline-flex;border:1px solid var(--rule);border-radius:6px;overflow:hidden}
.seg button{font:600 14px var(--sans);color:var(--t2);background:none;border:0;padding:9px 16px;cursor:pointer}
.seg button[aria-pressed="true"]{background:var(--red);color:#fff}
.stamp{font:500 13px var(--mono);color:var(--t3)}
.all{font-weight:600}
main{padding:32px 0 8px}
.grid{display:grid;gap:28px;grid-template-columns:1fr}
@media (min-width:760px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1180px){body[data-format="4x5"] .grid,body[data-format="1x1"] .grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
.card{background:var(--slate);border:1px solid var(--edge);border-radius:10px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.shot{display:block;width:100%;padding:0;border:0;background:var(--deep);cursor:zoom-in}
.shot img{display:block;width:100%;height:auto}
.meta{padding:16px 18px 18px;display:grid;gap:10px}
.meta h2{font-size:20px;line-height:1.2;letter-spacing:-.01em}
.meta h2 .n{font:500 14px var(--mono);color:var(--red-ink);margin-right:8px}
.meta p{color:var(--t2);font-size:15px}
.dl{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:14px}
.dl .k{font:500 12px var(--mono);letter-spacing:.06em;color:var(--t3);padding-top:2px}
details{border-top:1px solid var(--edge);padding-top:10px}
summary{cursor:pointer;font-weight:600;font-size:14px;color:var(--t1)}
details ul{margin:10px 0 0 18px;display:grid;gap:6px;font-size:14px;color:var(--t2)}
details p{margin-top:8px;font-size:14px}
.txt li{list-style:disc}
section.info{border-top:1px solid var(--edge);margin-top:36px;padding:28px 0}
section.info h2{font-size:24px;letter-spacing:-.01em}
section.info p,section.info li{color:var(--t2);max-width:75ch}
section.info ul{margin:12px 0 0 20px;display:grid;gap:8px}
.checks{display:grid;gap:12px;margin-top:16px;grid-template-columns:1fr}
@media (min-width:760px){.checks{grid-template-columns:repeat(2,minmax(0,1fr))}}
.check{border:1px solid var(--edge);border-radius:8px;padding:14px 16px;background:var(--slate)}
.check b{display:block;font:500 13px var(--mono);color:var(--ok);letter-spacing:.04em}
.check span{display:block;margin-top:4px;color:var(--t2);font-size:15px}
footer.end{border-top:1px solid var(--edge);padding:22px 0 40px;color:var(--t3);font-size:14px}
dialog{border:0;padding:0;background:transparent;max-width:96vw;max-height:94vh;margin:auto}
dialog::backdrop{background:rgba(5,8,10,.88)}
dialog img{display:block;max-width:96vw;max-height:88vh;width:auto;height:auto;border-radius:6px}
dialog form{text-align:right;padding:8px 0 0}
dialog button{font:600 14px var(--sans);background:var(--red);color:#fff;border:0;border-radius:4px;padding:8px 14px;cursor:pointer}
table{border-collapse:collapse;width:100%;margin-top:12px;font-size:14px}
th,td{border-bottom:1px solid var(--edge);padding:8px 10px 8px 0;text-align:left;vertical-align:top;color:var(--t2)}
th{color:var(--t1);font-weight:600}
td a{word-break:break-word}
`;

function page(title, description, body, extraHead = "") {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="png/16x9/${id(RX.topics[0])}.png">
<meta name="theme-color" content="#0c1317">
<link rel="icon" href="source/brand/dao-logo-on-dark-600.png">
${extraHead}<style>${SITE_CSS}</style>
</head>
<body data-format="1x1">
${body}
</body>
</html>
`;
}

/* ---------- index.html ---------- */
function gallery(stats) {
  const cards = RX.topics.map(t => {
    const sources = [...new Map(t.facts.map(f => [RX.src[f.src].url, RX.src[f.src]])).values()];
    const dl = kind => FORMATS.map(([dir, label]) => `<a href="${kind}/${dir}/${id(t)}.${kind}" download>${label}</a>`).join("");
    return `<article class="card" id="t${pad(t.n)}">
  <button class="shot" type="button" aria-label="Open ${esc(t.title)} full size">
    <img src="png/1x1/${id(t)}.png" data-name="${id(t)}" width="1080" height="1080" loading="lazy" alt="${esc(`Infographic ${t.n} of 11, ${t.title}. ${t.lead}`)}">
  </button>
  <div class="meta">
    <h2><span class="n">${pad(t.n)}</span>${esc(t.title)}</h2>
    <p>${esc(t.lead)}</p>
    <div class="dl"><span class="k">PNG</span>${dl("png")}<span class="k">SVG</span>${dl("svg")}</div>
    <details><summary>Sources</summary><ul>${sources.map(s => `<li><a href="${esc(s.url)}" rel="noopener">${esc(s.name)}</a></li>`).join("")}</ul>
      <p><a href="sources.html#t${pad(t.n)}">Every claim on this infographic, with its supporting quote</a></p></details>
    <details class="txt"><summary>Text version</summary><ul>${[t.title + (t.kicker ? `: ${t.kicker}` : ""), t.lead, ...printedText(t), `Sources: ${t.foot.join(" / ")}`, `Last verified ${RX.verified}`].map(s => `<li>${esc(s)}</li>`).join("")}</ul></details>
  </div>
</article>`;
  }).join("\n");

  const body = `<header class="top"><div class="wrap">
  <div class="rail" aria-hidden="true">${"<i></i>".repeat(11)}</div>
  <div class="brandrow"><img class="mark" src="source/brand/dao-logo-on-dark-600.png" alt="Redbelly DAO" width="67" height="48"><p class="eyebrow">Redbelly DAO / Start Here</p></div>
  <h1>Redbelly Explained</h1>
  <p class="intro">Eleven infographics that explain Redbelly’s core ideas in plain language, one idea each. Every one comes in three formats: 16:9 for the web and X, 4:5 for phone feeds, and 1:1 for Discord and pins.</p>
  <div class="bar">
    <div class="seg" role="group" aria-label="Format">
      <button type="button" data-f="16x9" aria-pressed="false">16:9</button><button type="button" data-f="4x5" aria-pressed="false">4:5</button><button type="button" data-f="1x1" aria-pressed="true">1:1</button>
    </div>
    <a class="all" href="assets/redbelly-explained-png.zip" download>Download all 33 PNGs (zip)</a>
    <a href="sources.html">Source list</a>
    <span class="stamp">Facts last verified ${esc(RX.verified)}</span>
  </div>
</div></header>
<main class="wrap">
<div class="grid">
${cards}
</div>
<section class="info" id="checks">
  <h2>How these were checked</h2>
  <div class="checks">
    <div class="check"><b>${stats.quotes}</b><span>Every fact on the artwork traced to a supplied resource, with a quote from that page. The quotes were found on the live pages on ${esc(RX.verified)}. <a href="verification/source-check.html">Report</a></span></div>
    <div class="check"><b>${stats.layouts}</b><span>Every PNG at the required size, no text clipped, overlapping or outside its box, and small text measured at phone width. <a href="verification/layout-check.html">Report</a></span></div>
    <div class="check"><b>${stats.svg}</b><span>Every editable SVG drawn back and compared with its PNG, pixel by pixel. <a href="verification/svg-check.html">Report</a></span></div>
    <div class="check"><b>${stats.copy}</b><span>No price talk, investment wording or promises of returns, no personal credit, no em or en dashes, no emoji, and governance described only from the current sources.</span></div>
  </div>
</section>
<section class="info" id="governance">
  <h2>Governance sources</h2>
  <p>${esc(GOV_NOTE)}</p>
</section>
<section class="info" id="files">
  <h2>Files</h2>
  <ul>
    <li><b>PNG</b>: <code>png/16x9</code> (1920 x 1080), <code>png/4x5</code> (1080 x 1350) and <code>png/1x1</code> (1080 x 1080), also in <a href="assets/redbelly-explained-png.zip" download>one zip</a>.</li>
    <li><b>SVG with live text</b>: the same 33 designs in <code>svg/</code>, ready for Figma, Illustrator or Inkscape.</li>
    <li><b>Source</b>: <a href="source/infographic.html">live source view</a> of every design. Words live in <code>source/src/topics.js</code>; one command rebuilds every file (see README.md).</li>
  </ul>
</section>
</main>
<footer class="end"><div class="wrap">Fonts: Be Vietnam Pro and JetBrains Mono, SIL Open Font License 1.1. Logo: Redbelly DAO mark from the Task Board brand kit. Icons and illustrations: original drawings made for this series. Facts last verified ${esc(RX.verified)}.</div></footer>
<dialog id="zoom"><img alt=""><form method="dialog"><button>Close</button></form></dialog>
<script>
(function () {
  var KEY = "rx-format", body = document.body;
  var sizes = { "16x9": [1920, 1080], "4x5": [1080, 1350], "1x1": [1080, 1080] };
  function set(f) {
    body.setAttribute("data-format", f);
    document.querySelectorAll(".seg button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-f") === f)); });
    document.querySelectorAll(".shot img").forEach(function (im) {
      im.src = "png/" + f + "/" + im.getAttribute("data-name") + ".png";
      im.width = sizes[f][0]; im.height = sizes[f][1];
    });
    try { localStorage.setItem(KEY, f); } catch (e) {}
  }
  document.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { set(b.getAttribute("data-f")); }); });
  var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved && sizes[saved]) set(saved);
  var dlg = document.getElementById("zoom");
  document.querySelectorAll(".shot").forEach(function (s) {
    s.addEventListener("click", function () {
      var im = s.querySelector("img");
      if (!dlg.showModal) { window.open(im.src, "_blank"); return; }
      dlg.querySelector("img").src = im.src; dlg.querySelector("img").alt = im.alt; dlg.showModal();
    });
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
})();
</script>`;
  return page("Redbelly Explained: 11 infographics", "Eleven plain-language infographics on Redbelly’s core ideas, each in 16:9, 4:5 and 1:1, with sources.", body);
}

/* ---------- sources.html ---------- */
function sourcesPage() {
  const rows = pagesUsed().map(p => `<tr><td>${esc(p.name)}</td><td><a href="${esc(p.url)}" rel="noopener">${esc(p.url)}</a></td><td>${[...p.topics].join(", ")}</td></tr>`).join("");
  const sections = RX.topics.map(t => `<section class="info" id="t${pad(t.n)}"><h2>${pad(t.n)} ${esc(t.title)}</h2>
<p>Printed source line: ${esc(t.foot.join(" / "))}</p>
<table><thead><tr><th>What the infographic says</th><th>Page</th><th>Supporting quote</th></tr></thead><tbody>
${t.facts.map(f => `<tr><td>${esc(f.claim)}</td><td><a href="${esc(RX.src[f.src].url)}" rel="noopener">${esc(RX.src[f.src].name)}</a></td><td>“${esc(f.quote)}”</td></tr>`).join("\n")}
</tbody></table></section>`).join("\n");
  const body = `<header class="top"><div class="wrap">
  <div class="rail" aria-hidden="true">${"<i></i>".repeat(11)}</div>
  <div class="brandrow"><img class="mark" src="source/brand/dao-logo-on-dark-600.png" alt="Redbelly DAO" width="67" height="48"><p class="eyebrow">Redbelly Explained</p></div>
  <h1>Sources</h1>
  <p class="intro">Every fact printed on the 11 infographics, the page it comes from and a quote from that page that supports it. All quotes were found on the live pages on ${esc(RX.verified)}. Only the resources supplied with the task were used.</p>
  <div class="bar"><a href="index.html">Back to the infographics</a><a href="SOURCES.md">Markdown version</a></div>
</div></header>
<main class="wrap">
<section class="info" id="governance"><h2>Governance</h2><p>${esc(GOV_NOTE)}</p></section>
<section class="info" id="pages"><h2>Pages used</h2><table><thead><tr><th>Page</th><th>Link</th><th>Used in</th></tr></thead><tbody>${rows}</tbody></table></section>
${sections}
</main>
<footer class="end"><div class="wrap">Facts last verified ${esc(RX.verified)}.</div></footer>`;
  return page("Redbelly Explained: sources", "Every fact on the Redbelly Explained infographics, with its source and a supporting quote.", body);
}

/* ---------- verification reports as web pages ---------- */
function reportPage(md, title) {
  const inline = s => esc(s).replace(/\`([^\`]+)\`/g, "<code>$1</code>")
    .replace(/(https?:\/\/[^\s|<]+)/g, '<a href="$1" rel="noopener">$1</a>');
  const out = [];
  const lines = md.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    if (L.startsWith("# ")) continue;                       // the page header carries the title
    if (L.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(lines[i++]);
      i--;
      const cells = r => r.slice(1, -1).split(" | ").map(c => c.trim());
      out.push("<table><thead><tr>" + cells(rows[0]).map(c => `<th>${inline(c)}</th>`).join("") + "</tr></thead><tbody>" +
        rows.slice(2).map(r => "<tr>" + cells(r).map(c => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") + "</tbody></table>");
    } else if (L.trim()) out.push(`<p>${inline(L)}</p>`);
  }
  const body = `<header class="top"><div class="wrap">
  <div class="rail" aria-hidden="true">${"<i></i>".repeat(11)}</div>
  <div class="brandrow"><img class="mark" src="../source/brand/dao-logo-on-dark-600.png" alt="Redbelly DAO" width="67" height="48"><p class="eyebrow">Redbelly Explained / Verification</p></div>
  <h1>${esc(title)}</h1>
  <div class="bar"><a href="../index.html#checks">Back to the infographics</a></div>
</div></header>
<main class="wrap"><section class="info">${out.join("\n")}</section></main>`;
  return page(`Redbelly Explained: ${title}`, `${title} for the Redbelly Explained infographics.`, body)
    .replace(/(href|src)="(source|png)\//g, '$1="../$2/');
}

/* ---------- overview image ---------- */
async function overview() {
  const { chromium } = (() => {
    for (const p of ["playwright", "/opt/node-tools/node_modules/playwright"]) { try { return require(p); } catch { /* next */ } }
    throw new Error("Playwright not found");
  })();
  const tiles = RX.topics.map(t => `<img src="${pathToFileURL(path.join(root, "png", "1x1", id(t) + ".png")).href}">`).join("");
  const html = `<!doctype html><meta charset="utf-8"><style>${FONT_CSS.replace(/source\/fonts/g, pathToFileURL(path.join(root, "source", "fonts")).href)}
body{margin:0;background:#070c0f}.g{display:grid;grid-template-columns:repeat(4,390px);gap:20px;padding:40px;width:1700px;box-sizing:border-box}
img{width:390px;height:390px;border-radius:8px;display:block}.t{width:390px;height:390px;border-radius:8px;background:#141f26;border:1px solid #263641;box-sizing:border-box;padding:34px;display:flex;flex-direction:column;justify-content:flex-end;font-family:"Be Vietnam Pro";color:#f1f5f8}
.t i{display:block;width:72px;height:6px;border-radius:3px;background:#EF5350;margin-bottom:24px}.t b{font-size:44px;line-height:1.05;letter-spacing:-.02em}.t span{margin-top:14px;font-size:20px;color:#c2ced6;line-height:1.35}</style>
<div class="g">${tiles}<div class="t"><i></i><b>Redbelly Explained</b><span>11 infographics, each in 16:9, 4:5 and 1:1</span></div></div>`;
  const tmp = path.join(root, "assets", ".overview.html");
  fs.writeFileSync(tmp, html);
  const browser = await chromium.launch({ ...launchOptions(), args: ["--allow-file-access-from-files"] });
  const pg = await browser.newPage({ viewport: { width: 1700, height: 1300 } });
  await pg.goto(pathToFileURL(tmp).href);
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(300);
  await pg.locator(".g").screenshot({ path: path.join(root, "assets", "overview.png") });
  await browser.close();
  fs.unlinkSync(tmp);
}

async function main() {
  fs.mkdirSync(path.join(root, "assets"), { recursive: true });
  const read = (f, re, fallback) => { try { const m = re.exec(fs.readFileSync(path.join(root, "verification", f), "utf8")); return m ? m[1] : fallback; } catch { return fallback; } };
  const stats = {
    quotes: read("source-check.md", /Result: (\d+ of \d+ quotes found on \d+ pages)/, "Source check") ,
    layouts: read("layout-check.md", /Result: (\d+ of \d+ layouts pass)/, "Layout check"),
    svg: read("svg-check.md", /Result: (\d+ of \d+ SVG files match their PNG)/, "SVG check"),
    copy: "Copy rules: pass"
  };
  fs.writeFileSync(path.join(root, "SOURCES.md"), sourcesMarkdown());
  fs.writeFileSync(path.join(root, "sources.html"), sourcesPage());
  fs.writeFileSync(path.join(root, "index.html"), gallery(stats));
  for (const [file, title] of [["source-check", "Source check"], ["layout-check", "Layout check"], ["svg-check", "SVG export check"]]) {
    const md = path.join(root, "verification", file + ".md");
    if (fs.existsSync(md)) fs.writeFileSync(path.join(root, "verification", file + ".html"), reportPage(fs.readFileSync(md, "utf8"), title));
  }
  await overview();
  try {
    const zipFile = path.join(root, "assets", "redbelly-explained-png.zip");
    if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);
    execFileSync("zip", ["-q", "-r", "-X", zipFile, "png"], { cwd: root });
  } catch {
    console.log("note: `zip` not found, skipped assets/redbelly-explained-png.zip");
  }
  console.log("wrote index.html, sources.html, SOURCES.md, verification/*.html, assets/overview.png, assets/redbelly-explained-png.zip");
}

main().catch(e => { console.error(e); process.exit(1); });
