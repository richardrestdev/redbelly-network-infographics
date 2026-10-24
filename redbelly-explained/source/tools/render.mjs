// Render every infographic to PNG with headless Chromium.
//
//   node tools/render.mjs                 all 11 topics, all 3 formats
//   node tools/render.mjs 3 governance    only these topics (number or slug)
//   node tools/render.mjs --formats=square,portrait
//
// Output goes to ../png/16x9, ../png/4x5 and ../png/1x1 next to the gallery.
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = loadPlaywright();

const here = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(here, "..");
const outRoot = path.resolve(sourceDir, "..", "png");

export const FORMATS = {
  landscape: { dir: "16x9", width: 1280, height: 720, scale: 1.5 },   // 1920 x 1080
  portrait:  { dir: "4x5",  width: 1080, height: 1350, scale: 1 },    // 1080 x 1350
  square:    { dir: "1x1",  width: 1080, height: 1080, scale: 1 }     // 1080 x 1080
};

function loadPlaywright() {
  // Prefer a local install (npm install), fall back to a global one.
  for (const id of ["playwright", "/opt/node-tools/node_modules/playwright"]) {
    try { return require(id); } catch { /* try next */ }
  }
  throw new Error("Playwright not found. Run `npm install` in the source folder.");
}

export function launchOptions() {
  const opts = {};
  if (process.env.HTTPS_PROXY) opts.proxy = { server: process.env.HTTPS_PROXY };
  if (process.env.CHROMIUM_PATH) opts.executablePath = process.env.CHROMIUM_PATH;
  return opts;
}

export async function openTopic(browser, slug, fmt) {
  const f = FORMATS[fmt];
  const context = await browser.newContext({
    viewport: { width: f.width, height: f.height },
    deviceScaleFactor: f.scale
  });
  const page = await context.newPage();
  const url = pathToFileURL(path.join(sourceDir, "infographic.html")).href + `?t=${slug}&f=${fmt}`;
  await page.goto(url);
  await page.waitForFunction(() => window.RX_READY === true, null, { timeout: 30000 });
  return { page, context };
}

async function listTopics(browser) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(sourceDir, "infographic.html")).href);
  const topics = await page.evaluate(() => window.RX.topics.map(t => ({ n: t.n, slug: t.slug })));
  await page.close();
  return topics;
}

async function main() {
  const args = process.argv.slice(2);
  const fmtArg = args.find(a => a.startsWith("--formats="));
  const formats = fmtArg ? fmtArg.split("=")[1].split(",") : Object.keys(FORMATS);
  const wanted = args.filter(a => !a.startsWith("--"));

  const browser = await chromium.launch(launchOptions());
  const topics = (await listTopics(browser)).filter(t =>
    !wanted.length || wanted.some(w => w === String(t.n) || w === t.slug || Number(w) === t.n));

  for (const t of topics) {
    for (const fmt of formats) {
      const f = FORMATS[fmt];
      const { page, context } = await openTopic(browser, t.slug, fmt);
      const dir = path.join(outRoot, f.dir);
      fs.mkdirSync(dir, { recursive: true });
      const file = path.join(dir, `${String(t.n).padStart(2, "0")}-${t.slug}.png`);
      await page.locator("#canvas").screenshot({ path: file, animations: "disabled" });
      await context.close();
      console.log(`rendered ${path.relative(path.resolve(sourceDir, ".."), file)}`);
    }
  }
  await browser.close();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(err => { console.error(err); process.exit(1); });
}
