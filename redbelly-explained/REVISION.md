# Revision: what changed and why

This revision answers the review of the first submission (27 of 35). The review asked for three things: text readable on a phone, including small labels; infographic 02 to say that some benefits of tokenisation depend on the infrastructure around the token; and infographic 09 to state the conditions under which Polygraph produces evidence of faulty node behaviour. It also noted that the readability thresholds were too low and that factual interpretation was not tested. Every point is addressed below, and every file was rebuilt and re-checked on 31 Oct 2026.

## 1. Mobile readability

**New standard.** No text of any kind, body, labels, sources or dates, is under 11 pt when the image fills a 390 pt wide phone held upright, with no zoom. This applies to all three formats, the 16:9 included. 11 pt is the smallest size in Apple's Human Interface Guidelines and matches Material Design's smallest type style (11 sp). Body text on the phone-first 4:5 and 1:1 files must also reach 12 pt. `tools/check.mjs` enforces both floors on all 33 files and fails the build if any line falls short.

| Format | Smallest body text, before | Smallest label, before | Smallest header or footer, before | Smallest body text, now | Smallest label, now | Smallest header or footer, now |
| --- | --- | --- | --- | --- | --- | --- |
| 16:9 | 8.2 pt | 6.4 pt | 6.1 pt | 11.6 pt | 11.3 pt | 11.3 pt |
| 4:5 | 10.8 pt | 8.3 pt | 7.9 pt | 13.0 pt | 11.6 pt | 11.6 pt |
| 1:1 | 10.1 pt | 7.9 pt | 7.6 pt | 12.3 pt | 11.2 pt | 11.2 pt |

**How it fits.** The type scale was raised in every format, the header now carries the series name, number and verified date on one line, and the footer carries only the sources and the DAO logo. The copy was cut to 58 to 92 words per file, header and footer included (it was 73 to 104), so each one stays a single idea with short text. Several 16:9 layouts were redrawn to use the width: the hub has two properties on each side of the hexagon, the credential roles stand in a row with the signature check arcing back, and the governance status and Acacia timeline became short lists. Full measurements per file: `verification/layout-check.md`.

## 2. Infographic 02: benefits depend on the setup

The table now has a third column, **Only if**, next to each benefit:

| Benefit | Only if | Source |
| --- | --- | --- |
| Asset and payment swap in one step | The payment is on the same ledger | TASK-07: "place the asset and the means of payment on the same programmable ledger, so that a single atomic transaction can exchange both simultaneously" |
| Checked before every trade | Identity is built into the network | Tokeniser: "Tokeniser operates on Redbelly Network, ... with identity and eligibility built into the protocol." |
| Fractions, traded 24/7 | A market runs 24/7 | Tokeniser: "24/7 secondary trading through protocol finance" and "24/7 liquidity options, created by protocol finance" |

The lead now ends "The benefits depend on the setup." The "today" side keeps its hedges from the sources: "A bond trade can take 2 to 4 days", "Rule breaches often found late".

## 3. Infographic 09: when Polygraph produces proof

The first version said "a node that cheats leaves proof it cannot deny", which is wider than the sources. The whitepaper is specific: "if honest nodes disagree on the next block, the system can eventually output at least n/3 faulty nodes who are responsible for the disagreement", and "When faulty nodes try to cause disagreement, they leave cryptographically signed traces that honest nodes can combine to build undeniable proofs of fraud". The infographic now says:

- Lead: "Every participant is known. Nodes that try to cause disagreement leave proof."
- **Disagreement.** Only if 1 in 3 or more nodes are faulty. (DBFT is proven safe for any f < n/3; the Polygraph paper: "If the adversary controls more than 1/3 of the computing power, it can always force disagreement.")
- **Proof of fraud.** Their signed messages can name them.
- **Removed.** Excluded from consensus with enough proof. (Whitepaper: "Once honest nodes gather enough proofs of fraud against faulty nodes, they initiate a membership change", with "an exclusion protocol".)

The people side keeps the hedge of its source too: "Transactions can be tied to a responsible party."

## 4. Factual interpretation is now tested

`tools/check-claims.mjs` (`npm run claims`) reads every printed line against the quotes behind it. Each fact in `src/topics.js` now names the exact printed lines it supports (`on`) and, where the source attaches one, the condition that must be printed with it (`when`). For every line the check tests that it is traced to at least one quote, that its numbers appear in a linked quote, that wording which widens a claim (every, all, only, no, never, without) is backed by the same kind of word in a quote, that a line built only on hedged quotes (could, may, often, typically, eventually, up to) is hedged too, and that each source condition is printed on the same infographic. Result: 126 of 126 printed lines and conditions pass, including 8 source conditions. Report: `verification/claim-check.md`. `SOURCES.md` now shows, for every fact, the printed lines it supports and any condition.

## 5. Other wording made exact

Running the claim check over the whole series found a few more lines that said slightly more than their source. They were changed:

| Infographic | Before | Now | Why |
| --- | --- | --- | --- |
| 03 | Classical blockchains: "The rest is wasted work." / "Their transactions combine into one superblock." | "Classical chains": "The rest is wasted." / "Transactions join a superblock." | Matches the whitepaper's wording for both drawings. |
| 03 | "Proven safe while under 1 in 3 nodes are faulty." | "Proven safe if under 1 in 3 nodes are faulty." | States the threshold as the condition it is. |
| 04 | "No uploading documents to every app." | "Without uploading documents." | The source speaks of not uploading to the platform, not to every app. |
| 05 | Verifier: "Checks the proof and the issuer's signature." Edge: "Checks signature" | Verifier: "Checks the issuer's signature." Edge: "Trusts issuer" | Removes a repeated line; the docs speak of the "trusted issuer's public key". |
| 06 | "Your wallet proves it. Nothing is revealed." | "Your wallet proves it. No data shown." | The answer itself (true) is shown; what stays hidden is the data. |
| 07 | "Every holder is verified. Every transfer is checked against the asset's rules." | "Every holder verified. Every transfer checked against the rules." | Same claim, shorter to fit the larger type. |

## 6. Re-verified

All 101 supporting quotes were found on their 28 live pages on 31 Oct 2026 (`verification/source-check.md`). The DAO voting platform was re-checked the same day: 41 proposals, none open, nothing that changes infographic 10. All 33 SVG files were redrawn and match their PNGs (`verification/svg-check.md`). The copy check still finds no price talk, investment wording, personal credit, em or en dashes, emoji, or outdated governance wording.
