// Re-open every cited page and confirm each supporting quote is still there.
//
//   node tools/verify-sources.mjs              check live pages, print a report
//   node tools/verify-sources.mjs --write      also save ../verification/source-check.{json,md}
//
// Web pages are rendered in headless Chromium (most of the sources are built
// with JavaScript). The whitepaper PDF is read with `pdftotext` (poppler-utils).
// Quotes are compared on letters and digits only, so line breaks, PDF
// hyphenation and curly or straight quote marks do not cause false alarms.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTopics } from "./lint-copy.mjs";
import { launchOptions } from "./render.mjs";

const require = createRequire(import.meta.url);
const { chromium } = (() => {
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try { return require(id); } catch { /* next */ }
  }
  throw new Error("Playwright not found. Run `npm install` in the source folder.");
})();

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");

export const skeleton = s => s.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

async function pageText(context, url) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
    for (let i = 0; i < 25; i++) { await page.mouse.wheel(0, 1400); await page.waitForTimeout(120); }
    await page.waitForTimeout(600);
    return await page.evaluate(() => document.body ? document.body.innerText : "");
  } finally {
    await page.close();
  }
}

async function pdfText(context, url) {
  const res = await context.request.get(url, { timeout: 60000 });
  if (!res.ok()) throw new Error(`HTTP ${res.status()}`);
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "rx-")), "doc.pdf");
  fs.writeFileSync(file, await res.body());
  try {
    return execFileSync("pdftotext", [file, "-"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  } catch {
    throw new Error("needs pdftotext (poppler-utils) to read the PDF");
  }
}

async function main() {
  const write = process.argv.includes("--write");
  const RX = loadTopics();
  const facts = RX.topics.flatMap(t => t.facts.map(f => ({ topic: `${String(t.n).padStart(2, "0")} ${t.title}`, ...f, url: RX.src[f.src].url })));
  const urls = [...new Set(facts.map(f => f.url))];

  const browser = await chromium.launch(launchOptions());
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const texts = {};
  for (const url of urls) {
    try {
      texts[url] = skeleton(/\.pdf($|\?)/.test(url) ? await pdfText(context, url) : await pageText(context, url));
      console.log(`fetched  ${url} (${texts[url].length} letters)`);
    } catch (e) {
      texts[url] = null;
      console.log(`ERROR    ${url}: ${e.message}`);
    }
  }
  await browser.close();

  const rows = facts.map(f => ({ ...f, found: texts[f.url] == null ? null : texts[f.url].includes(skeleton(f.quote)) }));
  const missing = rows.filter(r => r.found === false), unread = rows.filter(r => r.found === null);
  for (const r of rows) {
    if (r.found !== true) console.log(`${r.found === null ? "UNREAD " : "MISSING"} [${r.topic}] "${r.quote}" (${r.url})`);
  }
  const when = new Date().toISOString();
  console.log(`\n${rows.length - missing.length - unread.length}/${rows.length} quotes found on their source pages (${urls.length} pages, checked ${when})`);

  if (write) {
    const dir = path.join(root, "verification");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "source-check.json"), JSON.stringify({ checked: when, pages: urls.length, results: rows }, null, 2));
    const md = [
      "# Source check",
      "",
      `Checked ${when} by \`source/tools/verify-sources.mjs\`. Each supporting quote in SOURCES.md was searched for on its live source page.`,
      "",
      `Result: ${rows.length - missing.length - unread.length} of ${rows.length} quotes found on ${urls.length} pages.`,
      "",
      "| Infographic | Quote | Page | Found |",
      "| --- | --- | --- | --- |",
      ...rows.map(r => `| ${r.topic} | ${r.quote.replace(/\|/g, "/")} | ${r.url} | ${r.found === true ? "yes" : r.found === false ? "NO" : "not read"} |`),
      ""
    ].join("\n");
    fs.writeFileSync(path.join(dir, "source-check.md"), md);
    console.log(`wrote verification/source-check.json and verification/source-check.md`);
  }
  process.exit(missing.length || unread.length ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch(e => { console.error(e); process.exit(2); });
