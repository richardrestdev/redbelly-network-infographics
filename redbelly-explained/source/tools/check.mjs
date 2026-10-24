// Automated checks on every rendered layout.
//
//   node tools/check.mjs            all topics, all formats
//   node tools/check.mjs --json     machine-readable report on stdout
//
// For each infographic it measures, in the live page:
//   1. every text line sits inside the canvas safe area,
//   2. text inside a card stays inside that card,
//   3. no two pieces of text overlap,
//   4. the diagram does not run into the title block or the footer,
//   5. the smallest text, converted to points on a 390 pt wide phone screen.
// It also checks the PNG files on disk: present, and at the required size.
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { FORMATS, launchOptions, openTopic } from "./render.mjs";

const require = createRequire(import.meta.url);
const { chromium } = (() => {
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try { return require(id); } catch { /* next */ }
  }
  throw new Error("Playwright not found. Run `npm install` in the source folder.");
})();

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const PHONE_PT = 390;   // logical width of a typical phone screen, in points
// Smallest allowed text on that screen, by role. The 16:9 file is shown at a
// smaller scale on a phone than the 4:5 and 1:1 files, so it has its own floor.
const MIN_PT = {
  landscape: { body: 8.0, label: 6.3, meta: 6.0 },
  portrait:  { body: 10.0, label: 7.5, meta: 7.5 },
  square:    { body: 10.0, label: 7.5, meta: 7.5 }
};
const REQUIRED = { landscape: [1920, 1080], portrait: [1080, 1350], square: [1080, 1080] };

function pngSize(file) {
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 1, 4) !== "PNG") throw new Error("not a PNG");
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

/* Runs inside the page. Returns a list of problems and the smallest font sizes. */
function measure() {
  const canvas = document.getElementById("canvas");
  const cs = getComputedStyle(canvas);
  const c = canvas.getBoundingClientRect();
  const safe = {
    l: c.left + parseFloat(cs.paddingLeft) - 1, r: c.right - parseFloat(cs.paddingRight) + 1,
    t: c.top + parseFloat(cs.paddingTop) - 1, b: c.bottom - parseFloat(cs.paddingBottom) + 1
  };
  const CARD = ".hub-item,.panel,.chip,.job,.zk-step,.layer,.gv-token,.lane,.gs,.stat,.note,.zk-c,.gov-status li,.edge-lbl,.vc,.bubble,.result";
  const problems = [];
  const lines = [];
  const walker = document.createTreeWalker(canvas, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!node.textContent.trim()) continue;
    const el = node.parentElement;
    const st = getComputedStyle(el);
    if (st.visibility === "hidden" || st.display === "none") continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const isMeta = !!el.closest(".ft, .hd");
    const labelPx = parseFloat(cs.getPropertyValue("--fs-label"));
    for (const r of range.getClientRects()) {
      if (r.width < 1 || r.height < 1) continue;
      const size = parseFloat(st.fontSize);
      lines.push({ el, text: node.textContent.trim().slice(0, 40), r, size, isMeta, isLabel: !isMeta && size <= labelPx + 0.5 });
    }
  }
  for (const L of lines) {
    const { r } = L;
    if (r.left < safe.l || r.right > safe.r || r.top < safe.t || r.bottom > safe.b) {
      problems.push(`outside safe area: "${L.text}"`);
    }
    const card = L.el.closest(CARD);
    if (card) {
      const k = card.getBoundingClientRect();
      if (r.left < k.left - 1 || r.right > k.right + 1 || r.top < k.top - 1 || r.bottom > k.bottom + 1) {
        problems.push(`spills out of its box: "${L.text}"`);
      }
    }
  }
  // text must not run into a box it does not belong to
  const cards = [...canvas.querySelectorAll(CARD)];
  for (const L of lines) {
    for (const k of cards) {
      if (k.contains(L.el)) continue;
      const kr = k.getBoundingClientRect();
      const ox = Math.min(L.r.right, kr.right) - Math.max(L.r.left, kr.left);
      const oy = Math.min(L.r.bottom, kr.bottom) - Math.max(L.r.top, kr.top);
      if (ox > 2 && oy > 2) problems.push(`text runs into another box: "${L.text}" / ${k.className}`);
    }
  }
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const a = lines[i], b = lines[j];
      if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const ox = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const oy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (ox > 2 && oy > 2) problems.push(`text overlaps: "${a.text}" / "${b.text}"`);
    }
  }
  const intro = canvas.querySelector(".intro").getBoundingClientRect();
  const foot = canvas.querySelector(".ft").getBoundingClientRect();
  const parts = canvas.querySelectorAll(".visual > *, .visual > * *");
  const layoutSplit = canvas.getAttribute("data-layout") === "split" && canvas.classList.contains("f-landscape");
  for (const p of parts) {
    if (p.closest(".wires")) continue;
    const r = p.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    if (r.bottom > foot.top + 0.5) { problems.push(`diagram runs into footer: ${p.className || p.tagName}`); break; }
    const besideIntro = layoutSplit && r.left >= intro.right - 0.5;
    if (!besideIntro && !p.closest(".note") && r.top < intro.bottom - 0.5 && r.bottom > intro.top) {
      problems.push(`diagram runs into title block: ${p.className || p.tagName}`); break;
    }
  }
  // the diagram must fit inside the space it was given
  const vis = canvas.querySelector(".visual");
  const area = (layoutSplit ? canvas.querySelector(".main") : vis).getBoundingClientRect();
  for (const child of vis.children) {
    const r = child.getBoundingClientRect();
    if (r.top < area.top - 1 || r.bottom > area.bottom + 1) { problems.push(`diagram overflows its area: ${child.className}`); break; }
  }
  // diagram parts must not overlap each other (or the intro, in the split layout)
  const blocks = [...canvas.querySelectorAll(".visual > *")].filter(b => !b.classList.contains("wires"));
  if (layoutSplit) blocks.push(canvas.querySelector(".intro"));
  for (let i = 0; i < blocks.length; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      const a = blocks[i].getBoundingClientRect(), b = blocks[j].getBoundingClientRect();
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ox > 1 && oy > 1) problems.push(`blocks overlap: ${blocks[i].className} / ${blocks[j].className}`);
    }
  }
  const pick = f => lines.filter(f).map(l => l.size);
  return {
    problems: [...new Set(problems)],
    minBody: Math.min(...pick(l => !l.isMeta && !l.isLabel)),
    minLabel: Math.min(...pick(l => l.isLabel)),
    minMeta: Math.min(...pick(l => l.isMeta)),
    words: canvas.innerText.split(/\s+/).filter(Boolean).length
  };
}

async function main() {
  const asJson = process.argv.includes("--json");
  const browser = await chromium.launch(launchOptions());
  const page0 = await browser.newPage();
  await page0.goto("file://" + path.join(root, "source", "infographic.html"));
  const topics = await page0.evaluate(() => window.RX.topics.map(t => ({ n: t.n, slug: t.slug })));
  await page0.close();

  const report = [];
  let failures = 0;
  for (const t of topics) {
    for (const fmt of Object.keys(FORMATS)) {
      const f = FORMATS[fmt];
      const { page, context } = await openTopic(browser, t.slug, fmt);
      const m = await page.evaluate(measure);
      await context.close();
      const outScale = f.scale;                       // CSS px -> PNG px
      const outWidth = f.width * f.scale;
      const pt = px => +(px * outScale * PHONE_PT / outWidth).toFixed(1);
      const row = {
        topic: `${String(t.n).padStart(2, "0")}-${t.slug}`, format: fmt,
        minBodyPx: +(m.minBody * outScale).toFixed(1), minBodyPt: pt(m.minBody),
        minLabelPx: +(m.minLabel * outScale).toFixed(1), minLabelPt: pt(m.minLabel),
        minMetaPx: +(m.minMeta * outScale).toFixed(1), minMetaPt: pt(m.minMeta),
        words: m.words, problems: m.problems.slice()
      };
      const floor = MIN_PT[fmt];
      if (row.minBodyPt < floor.body) row.problems.push(`body text ${row.minBodyPt} pt on a phone (min ${floor.body})`);
      if (row.minLabelPt < floor.label) row.problems.push(`label text ${row.minLabelPt} pt on a phone (min ${floor.label})`);
      if (row.minMetaPt < floor.meta) row.problems.push(`header/footer text ${row.minMetaPt} pt on a phone (min ${floor.meta})`);
      const file = path.join(root, "png", f.dir, `${row.topic}.png`);
      if (!fs.existsSync(file)) row.problems.push("PNG missing");
      else {
        const [w, h] = pngSize(file);
        const [rw, rh] = REQUIRED[fmt];
        row.png = `${w}x${h}`;
        if (w < rw || h < rh || Math.abs(w / h - rw / rh) > 0.01) row.problems.push(`PNG is ${w}x${h}, needs ${rw}x${rh}`);
      }
      failures += row.problems.length ? 1 : 0;
      report.push(row);
    }
  }
  await browser.close();

  if (process.argv.includes("--write")) {
    const dir = path.join(root, "verification");
    fs.mkdirSync(dir, { recursive: true });
    const when = new Date().toISOString();
    fs.writeFileSync(path.join(dir, "layout-check.json"), JSON.stringify({ checked: when, phoneWidthPt: PHONE_PT, minimumPt: MIN_PT, results: report }, null, 2));
    fs.writeFileSync(path.join(dir, "layout-check.md"), [
      "# Layout check", "",
      `Checked ${when} by \`source/tools/check.mjs\`. For every file: PNG present at the required size, every line of text inside the safe area and inside its box, no overlapping text or boxes, nothing running into the title block or footer, and the smallest text converted to points on a ${PHONE_PT} pt wide phone screen.`, "",
      `Minimum sizes allowed (points on the phone): 16:9 body ${MIN_PT.landscape.body}, labels ${MIN_PT.landscape.label}, header and footer ${MIN_PT.landscape.meta}; 4:5 and 1:1 body ${MIN_PT.square.body}, labels ${MIN_PT.square.label}, header and footer ${MIN_PT.square.meta}.`, "",
      `Result: ${report.length - failures} of ${report.length} layouts pass.`, "",
      "| Infographic | Format | PNG size | Smallest body text | Smallest label | Header and footer | Words | Result |",
      "| --- | --- | --- | --- | --- | --- | --- | --- |",
      ...report.map(r => `| ${r.topic} | ${r.format} | ${r.png} | ${r.minBodyPx}px (${r.minBodyPt} pt) | ${r.minLabelPx}px (${r.minLabelPt} pt) | ${r.minMetaPx}px (${r.minMetaPt} pt) | ${r.words} | ${r.problems.length ? "FAIL: " + r.problems.join("; ") : "pass"} |`),
      ""].join("\n"));
  }
  if (asJson) { console.log(JSON.stringify(report, null, 2)); }
  else {
    for (const r of report) {
      const status = r.problems.length ? "FAIL" : "ok  ";
      console.log(`${status} ${r.topic.padEnd(34)} ${r.format.padEnd(9)} ${String(r.png || "-").padEnd(9)} ` +
        `body ${r.minBodyPx}px=${r.minBodyPt}pt  label ${r.minLabelPx}px=${r.minLabelPt}pt  meta ${r.minMetaPx}px=${r.minMetaPt}pt  ${r.words} words`);
      for (const p of r.problems) console.log(`       - ${p}`);
    }
    console.log(`\n${report.length - failures}/${report.length} layouts pass`);
  }
  process.exit(failures ? 1 : 0);
}

main().catch(err => { console.error(err); process.exit(2); });
