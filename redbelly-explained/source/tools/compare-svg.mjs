// Check that every exported SVG looks the same as its PNG.
//
//   node tools/compare-svg.mjs
//
// Each SVG is opened in Chromium as its own page (so its fonts load), captured
// at the PNG's size and compared pixel by pixel with the PNG. Small differences
// come from text anti-aliasing; a layout bug in the export shows up as a large
// share of changed pixels.
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FORMATS } from "./render.mjs";

const require = createRequire(import.meta.url);
const { chromium } = (() => {
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try { return require(id); } catch { /* next */ }
  }
  throw new Error("Playwright not found. Run `npm install` in the source folder.");
})();

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
// Percent of pixels allowed to differ noticeably. The browser snaps HTML boxes
// and text to whole device pixels while SVG keeps fractional positions, so edges
// of letters and boxes anti-alias slightly differently (measured 0.1% to 2.2%).
// A broken export (missing text, misplaced shapes) changes far more than this.
const MAX_CHANGED = 3.0;

const harness = `<!doctype html><meta charset="utf-8"><body style="margin:0"><script>
async function load(src) { const im = new Image(); im.src = src; await im.decode(); return im; }
window.compare = async function (svgUrl, pngUrl, w, h) {
  const [a, b] = await Promise.all([load(svgUrl), load(pngUrl)]);
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 300));
  const px = im => { const c = document.createElement("canvas"); c.width = w; c.height = h;
    const g = c.getContext("2d"); g.fillStyle = "#000"; g.fillRect(0, 0, w, h); g.drawImage(im, 0, 0, w, h);
    return g.getImageData(0, 0, w, h).data; };
  const A = px(a), B = px(b);
  let sum = 0, changed = 0;
  for (let i = 0; i < A.length; i += 4) {
    const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
    sum += d; if (d > 48) changed++;
  }
  const n = A.length / 4;
  return { mean: sum / n, changedPct: 100 * changed / n };
};
</script>`;

async function main() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rx-cmp-"));
  const harnessFile = path.join(tmp, "compare.html");
  fs.writeFileSync(harnessFile, harness);
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
  let failures = 0, count = 0;
  const rows = [];
  for (const [fmt, f] of Object.entries(FORMATS)) {
    const w = Math.round(f.width * f.scale), h = Math.round(f.height * f.scale);
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const view = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(pathToFileURL(harnessFile).href);
    for (const name of fs.readdirSync(path.join(root, "svg", f.dir)).filter(x => x.endsWith(".svg")).sort()) {
      await view.goto(pathToFileURL(path.join(root, "svg", f.dir, name)).href);
      await view.evaluate(() => document.fonts && document.fonts.ready);
      await view.waitForTimeout(150);
      const svg = "data:image/png;base64," + (await view.screenshot()).toString("base64");
      const png = pathToFileURL(path.join(root, "png", f.dir, name.replace(/\.svg$/, ".png"))).href;
      const r = await page.evaluate(([s, p, ww, hh]) => window.compare(s, p, ww, hh), [svg, png, w, h]);
      const ok = r.changedPct <= MAX_CHANGED;
      failures += ok ? 0 : 1; count++;
      console.log(`${ok ? "ok  " : "FAIL"} ${f.dir.padEnd(5)} ${name.padEnd(40)} mean diff ${r.mean.toFixed(2)}  changed pixels ${r.changedPct.toFixed(2)}%`);
      rows.push(`| ${f.dir} | ${name} | ${r.mean.toFixed(2)} | ${r.changedPct.toFixed(2)}% | ${ok ? "pass" : "FAIL"} |`);
    }
    await page.close();
    await view.close();
  }
  await browser.close();
  console.log(`\n${count - failures}/${count} SVG exports match their PNGs (threshold ${MAX_CHANGED}% changed pixels)`);
  if (process.argv.includes("--write")) {
    const dir = path.join(root, "verification");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "svg-check.md"), [
      "# SVG export check", "",
      `Checked ${new Date().toISOString()} by \`source/tools/compare-svg.mjs\`. Each SVG was opened in Chromium, captured at the PNG size and compared pixel by pixel with the PNG. "Changed pixels" counts pixels whose colour differs by more than 48 of 255 on any channel; the rest is text anti-aliasing.`, "",
      `Result: ${count - failures} of ${count} SVG files match their PNG (threshold ${MAX_CHANGED}% changed pixels).`, "",
      "| Format | File | Mean difference (0 to 255) | Changed pixels | Result |", "| --- | --- | --- | --- | --- |", ...rows, ""].join("\n"));
  }
  process.exit(failures ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(2); });
