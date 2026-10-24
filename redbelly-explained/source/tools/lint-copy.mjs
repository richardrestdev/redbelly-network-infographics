// Copy rules for the artwork and the written deliverables.
//
//   node tools/lint-copy.mjs
//
// Artwork copy (everything printed on the infographics, from src/topics.js):
//   - no em or en dashes, no emoji (Task Board voice rules)
//   - no filler verbs the Task Board bans
//   - no price talk, investment advice or promises of returns
//   - no personal credit (names, handles, "made by" lines)
//   - Snapshot only mentioned as the old venue; no Constitution v1.2 rules
//   - short: a word budget per infographic
// Written files (gallery, README, source list): no em or en dashes, no emoji,
// no personal credit lines.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, "..");
const root = path.resolve(source, "..");

export function loadTopics() {
  // topics.js is a browser script that writes to window.RX; give it a window
  const sandbox = {};
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(source, "src", "topics.js"), "utf8"), sandbox);
  return sandbox.RX;
}

const DASHES = /[\u2012\u2013\u2014\u2015\u2E3A\u2E3B]/u;   // figure, en, em and other long dashes
const EMOJI = /\p{Extended_Pictographic}/u;
const FILLER = /\b(elevate[sd]?|seamless(ly)?|unleash(es|ed)?|revolution(ise|ize|ary|ising|izing)[sd]?)\b/i;
const MONEY = /\b(price[sd]?|pricing|returns?|profits?|apy|apr|yields?|gains?|roi|moon|pump|bullish|bearish|buy|sell|market cap|financial advice|guaranteed?|upside|earn)\b/i;
const CREDIT = /(made by|designed by|created by|illustrated by|written by|©|(^|\s)@\w)/i;
const WORD_BUDGET = 110;

/* every string printed on one infographic */
function printed(t, RX) {
  const out = [t.title, t.lead, RX.verified, ...t.foot];
  if (t.kicker) out.push(t.kicker);
  (function walk(v) {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => { if (k !== "type" && k !== "icon" && k !== "dot") walk(x); });
  })(t.visual);
  return out;
}

export function lintTopics(RX) {
  const problems = [];
  for (const t of RX.topics) {
    const id = `${String(t.n).padStart(2, "0")} ${t.slug}`;
    const strings = printed(t, RX);
    for (const s of strings) {
      if (DASHES.test(s)) problems.push(`${id}: em or en dash in "${s}"`);
      if (EMOJI.test(s)) problems.push(`${id}: emoji in "${s}"`);
      if (FILLER.test(s)) problems.push(`${id}: filler verb in "${s}"`);
      if (MONEY.test(s)) problems.push(`${id}: price or investment wording in "${s}"`);
      if (CREDIT.test(s)) problems.push(`${id}: personal credit marker in "${s}"`);
      if (/snapshot/i.test(s) && !/moved off snapshot/i.test(s)) problems.push(`${id}: Snapshot mentioned as if current: "${s}"`);
      if (/constitution|v1\.2/i.test(s)) problems.push(`${id}: cites the constitution: "${s}"`);
    }
    const words = strings.join(" ").split(/\s+/).filter(Boolean).length;
    if (words > WORD_BUDGET) problems.push(`${id}: ${words} words on the artwork (budget ${WORD_BUDGET})`);
    if (!t.facts || !t.facts.length) problems.push(`${id}: no sourced facts listed`);
    for (const f of t.facts || []) {
      if (!RX.src[f.src]) problems.push(`${id}: fact cites unknown source key "${f.src}"`);
    }
  }
  return problems;
}

export function lintFile(file) {
  const problems = [];
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const where = `${path.relative(root, file)}:${i + 1}`;
    if (DASHES.test(line)) problems.push(`${where}: em or en dash`);
    if (EMOJI.test(line)) problems.push(`${where}: emoji`);
    if (/(made by|designed by|created by)\b/i.test(line)) problems.push(`${where}: personal credit line`);
  });
  return problems;
}

function main() {
  const RX = loadTopics();
  const problems = lintTopics(RX);
  const files = [
    path.join(root, "index.html"), path.join(root, "README.md"), path.join(root, "SOURCES.md"),
    path.join(source, "README.md"), path.join(source, "infographic.html")
  ].filter(f => fs.existsSync(f));
  for (const f of files) problems.push(...lintFile(f));
  const words = RX.topics.map(t => printed(t, RX).join(" ").split(/\s+/).filter(Boolean).length);
  console.log(`checked ${RX.topics.length} infographics (${Math.min(...words)} to ${Math.max(...words)} words each) and ${files.length} files`);
  if (problems.length) {
    for (const p of problems) console.log(`FAIL ${p}`);
    process.exit(1);
  }
  console.log("ok   no dashes, emoji, filler verbs, price talk, personal credit or outdated governance wording");
}

if (import.meta.url === `file://${process.argv[1]}`) main();
