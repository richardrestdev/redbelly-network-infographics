// Check how each printed line reads against its sources (factual interpretation).
//
//   node tools/check-claims.mjs            print the result
//   node tools/check-claims.mjs --write    also save ../verification/claim-check.{json,md}
//
// verify-sources.mjs proves every quote is on its live page. This script tests
// the step after that: does the artwork say what the quotes say, and no more?
// For every line printed on an infographic (from src/topics.js):
//   1. traced      the line is linked (by a fact's `on` list) to at least one
//                  quote. Lines in a topic's `labels` only name a column, lane
//                  or role and are listed, not tested. Titles are topic names.
//   2. numbers     every number on the line (digits or words, "1 in 3",
//                  "24/7") appears in a linked quote, or a linked fact explains
//                  how it was counted (`numbers`).
//   3. scope       words that widen a claim ("every", "all", "anyone"; "only";
//                  "no", "not", "never", "without") are backed by a word of the
//                  same kind in a linked quote, so "some" never becomes "all".
//   4. hedges      if every linked quote is hedged ("could", "may", "often",
//                  "typically", "eventually", "up to", "can be"), the line must
//                  be hedged too ("can", "often", "if", "up to", "-able", ...).
//   5. conditions  when a source attaches a condition to a claim (a fact's
//                  `when`), that condition is printed on the same infographic.
// Every `on` entry must also match a printed line exactly, so the links cannot
// drift from the artwork.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTopics } from "./lint-copy.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");

const norm = s => String(s).normalize("NFKC").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
const low = s => norm(s).toLowerCase();

/* every line printed on one infographic, with where it sits */
export function printedLines(t) {
  const out = [{ text: t.title, where: "title", label: true }];
  if (t.kicker) out.push({ text: t.kicker, where: "kicker" });
  norm(t.lead).split(/(?<=[.?!])\s+/).forEach(s => out.push({ text: s, where: "lead" }));
  (function walk(v, where) {
    if (typeof v === "string") { if (v.trim()) out.push({ text: v, where }); }
    else if (Array.isArray(v)) v.forEach(x => walk(x, where));
    else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => { if (!["type", "icon", "dot", "hot"].includes(k)) walk(x, k); });
  })(t.visual, "visual");
  const labels = new Set((t.labels || []).map(low));
  for (const l of out) if (labels.has(low(l.text))) l.label = true;
  return out;
}

/* ---------- numbers ---------- */
const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, single: 1 };
function numbers(s, isQuote) {
  let x = low(s)
    .replace(/\b(\d+)\s+in\s+(\d+)\b/g, "$1/$2")                       // "1 in 3" -> 1/3
    .replace(/\bn\s*\/\s*3\b/g, "1/3").replace(/\b(a|one)[\s-]third\b/g, "1/3");
  if (isQuote) x = x.replace(/\bthird\b/g, "1/3");
  x = x.replace(/\b([a-z]+)\b/g, (m, w) => (w in WORDS ? String(WORDS[w]) : m));
  const found = new Set();
  for (const m of x.matchAll(/(?<![a-z0-9])(\d+(?:\/\d+)?)(?![a-z0-9])/g)) found.add(m[1]);
  // a fraction also stands for its two numbers ("24/7" covers 24 and 7 only as a pair)
  return found;
}

/* ---------- scope and hedges ---------- */
const SCOPE = {
  all:  { line: /\b(every|everyone|everything|all|each|any|anyone|always)\b/, quote: /\b(every|everyone|everything|all|each|any|anyone|always|entire|entirety)\b/ },
  only: { line: /\bonly\b/, quote: /\b(only|sole|solely|exclusive|exclusively)\b/ },
  none: { line: /\b(no|not|never|cannot|nothing|none|without)\b/, quote: /\b(no|not|never|cannot|can't|nothing|none|without|impossible|eliminates?|\w+less)\b/ }
};
// "may" before a year is the month, not a hedge
const HEDGE_QUOTE = /\b(could|may(?!\s+\d{4})|might|potential|potentially|typically|often|eventually|up to|can be|aims?|designed to|likely)\b/;
// "-able" words ("traceable") state a capability, like "can"
const HEDGE_LINE = /\b(can|could|may|might|often|typically|eventually|up to|if|some|when|needs?|depends?|\w+able)\b/;

export function checkClaims(RX) {
  const report = [];
  const problems = [];
  for (const t of RX.topics) {
    const id = `${String(t.n).padStart(2, "0")} ${t.title}`;
    const lines = printedLines(t);
    const printedAll = low(lines.map(l => l.text).join(" "));
    const byText = new Map(lines.map(l => [low(l.text), l]));
    const facts = (t.facts || []).map((f, i) => ({ ...f, i }));

    // every `on` entry must be a printed line
    for (const f of facts) {
      if (!Array.isArray(f.on) || !f.on.length) problems.push(`${id}: fact ${f.i + 1} has no printed line in "on"`);
      for (const o of f.on || []) if (!byText.has(low(o))) problems.push(`${id}: fact ${f.i + 1} links to "${o}", which is not printed`);
    }

    const rows = [];
    for (const l of lines) {
      const linked = facts.filter(f => (f.on || []).some(o => low(o) === low(l.text)));
      const row = { topic: id, line: norm(l.text), where: l.where, label: !!l.label, facts: linked.map(f => f.i + 1), checks: {}, notes: [] };
      if (l.label) { row.result = "label"; rows.push(row); continue; }
      const fail = (k, msg) => { row.checks[k] = "FAIL"; row.notes.push(msg); problems.push(`${id}: "${row.line}": ${msg}`); };

      // 1 traced
      if (!linked.length) { fail("traced", "not linked to any sourced fact"); row.result = "FAIL"; rows.push(row); continue; }
      row.checks.traced = "pass";
      const quotes = linked.map(f => f.quote);
      const qLow = quotes.map(low);

      // 2 numbers
      const nums = [...numbers(l.text, false)];
      if (!nums.length) row.checks.numbers = "none";
      else {
        const inQuotes = new Set(quotes.flatMap(q => [...numbers(q, true)]));
        const explained = Object.assign({}, ...linked.map(f => f.numbers || {}));
        const missing = nums.filter(n => !inQuotes.has(n) && !explained[n] && !(n.includes("/") && n.split("/").every(p => inQuotes.has(p))));
        if (missing.length) fail("numbers", `number ${missing.join(", ")} is not in a linked quote`);
        else {
          row.checks.numbers = "pass";
          for (const n of nums) if (!inQuotes.has(n) && explained[n]) row.notes.push(`${n}: ${explained[n]}`);
        }
      }

      // 3 scope
      const ll = low(l.text);
      const scopes = Object.keys(SCOPE).filter(k => SCOPE[k].line.test(ll));
      if (!scopes.length) row.checks.scope = "none";
      else {
        const unbacked = scopes.filter(k => !qLow.some(q => SCOPE[k].quote.test(q)));
        if (unbacked.length) fail("scope", `"${unbacked.join(", ")}" wording on the line is not backed by the same kind of word in a linked quote`);
        else row.checks.scope = "pass";
      }

      // 4 hedges
      if (qLow.every(q => HEDGE_QUOTE.test(q))) {
        if (HEDGE_LINE.test(ll)) row.checks.hedge = "pass";
        else fail("hedge", "every linked quote is hedged but the line states it as certain");
      } else row.checks.hedge = "none";

      row.result = Object.values(row.checks).includes("FAIL") ? "FAIL" : "pass";
      rows.push(row);
    }

    // 5 conditions
    for (const f of facts.filter(f => f.when)) {
      const ok = printedAll.includes(low(f.when));
      const c = { topic: id, line: `condition: "${f.when}"`, where: "condition", label: false, facts: [f.i + 1], checks: { condition: ok ? "pass" : "FAIL" },
        notes: [ok ? `printed on the artwork (source: ${f.claim})` : `the source attaches "${f.when}" to this claim, but it is not printed`], result: ok ? "pass" : "FAIL" };
      if (!ok) problems.push(`${id}: condition "${f.when}" from fact ${f.i + 1} is not printed`);
      rows.push(c);
    }
    report.push(...rows);
  }
  return { report, problems };
}

function main() {
  const RX = loadTopics();
  const { report, problems } = checkClaims(RX);
  const tested = report.filter(r => !r.label);
  const passed = tested.filter(r => r.result === "pass");
  const conds = report.filter(r => r.where === "condition");
  for (const r of report.filter(r => r.result === "FAIL")) console.log(`FAIL [${r.topic}] "${r.line}": ${r.notes.join("; ")}`);
  for (const p of problems.filter(p => /links to|has no printed/.test(p))) console.log(`FAIL ${p}`);
  const linkProblems = problems.filter(p => /links to|has no printed/.test(p)).length;
  const summary = `${passed.length} of ${tested.length} printed lines and conditions pass (${conds.length} source conditions, ${report.length - tested.length} labels listed)`;
  console.log(summary);

  if (process.argv.includes("--write")) {
    const dir = path.join(root, "verification");
    fs.mkdirSync(dir, { recursive: true });
    const when = new Date().toISOString();
    fs.writeFileSync(path.join(dir, "claim-check.json"), JSON.stringify({ checked: when, results: report, problems }, null, 2));
    const cell = s => String(s).replace(/\|/g, "/");
    const md = [
      "# Claim check", "",
      `Checked ${when} by \`source/tools/check-claims.mjs\`. The source check proves every quote is on its live page; this check tests how the artwork reads those quotes. Every printed line must be linked to a sourced fact; its numbers must appear in a linked quote; words that widen a claim (every, all, only, no, never, without) must be backed by the same kind of word in a quote; a line built only on hedged quotes (could, may, often, typically, eventually, up to) must be hedged too; and every condition a source attaches to a claim must be printed on the same infographic.`, "",
      `Result: ${summary}.`, "",
      "| Infographic | Printed line | Facts | Traced | Numbers | Scope words | Hedges | Condition | Result | Notes |",
      "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
      ...report.map(r => `| ${r.topic} | ${cell(r.line)} | ${r.facts.join(", ") || "-"} | ${r.checks.traced || "-"} | ${r.checks.numbers || "-"} | ${r.checks.scope || "-"} | ${r.checks.hedge || "-"} | ${r.checks.condition || "-"} | ${r.result} | ${cell(r.notes.join("; ") || (r.label ? "names a column, lane or role" : ""))} |`),
      ""
    ].join("\n");
    fs.writeFileSync(path.join(dir, "claim-check.md"), md);
    console.log("wrote verification/claim-check.json and verification/claim-check.md");
  }
  process.exit(passed.length === tested.length && !linkProblems ? 0 : 1);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
