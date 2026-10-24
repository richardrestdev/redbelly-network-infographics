# Redbelly Explained

Eleven infographics that explain Redbelly's core ideas in plain language, one idea each, for the Redbelly DAO Start Here hub, the DAO website, Discord and X. Every infographic comes in three formats:

| Format | Size | Good for |
| --- | --- | --- |
| 16:9 | 1920 x 1080 PNG | website, X cards, slides |
| 4:5 | 1080 x 1350 PNG | phone feeds |
| 1:1 | 1080 x 1080 PNG | Discord, pins, X |

![All 11 infographics](assets/overview.png)

## What is in this folder

| Path | What it is |
| --- | --- |
| `index.html` | The gallery page. This is the site root for Vercel. |
| `png/16x9`, `png/4x5`, `png/1x1` | The 33 finished PNGs. |
| `svg/16x9`, `svg/4x5`, `svg/1x1` | The same 33 designs as editable SVG with live text. |
| `source/` | Editable source: words, styles, icons and the scripts that build and check everything. |
| `SOURCES.md` and `sources.html` | The source list: every fact on every infographic, its page and a supporting quote. |
| `verification/` | Reports from the checks below, as Markdown, HTML and JSON. |
| `assets/` | `overview.png` (all 11 at a glance) and `redbelly-explained-png.zip` (all 33 PNGs). |

## The 11 infographics

| No. | Title | The one idea | File name |
| --- | --- | --- | --- |
| 01 | What is Redbelly? | A public layer 1 blockchain built for tokenising real world assets. | `01-what-is-redbelly` |
| 02 | Why tokenise real world assets? | A token records who owns an asset and carries its rules. Today versus tokenised. | `02-why-tokenise-real-world-assets` |
| 03 | DBFT consensus | Nodes agree on blocks together, with no leader, so blocks are final. | `03-dbft-consensus` |
| 04 | Receptor | Redbelly's identity protocol: lets verified users in, sets rules, proves you qualify. | `04-receptor` |
| 05 | Verifiable credentials | Issuer, holder and verifier: a signed proof you keep and share. | `05-verifiable-credentials` |
| 06 | Zero knowledge proofs | Prove something is true without revealing the data. | `06-zk-proofs` |
| 07 | Tokeniser | The Redbelly Network project funds and companies use to issue and manage tokenised assets. | `07-tokeniser` |
| 08 | Compliance aware assets | An asset carries its own rules and every transfer is checked against them. | `08-compliance-aware-assets` |
| 09 | Identity and accountability | Every participant is known, and a node that cheats leaves proof. | `09-identity-and-accountability` |
| 10 | Governance | How the Redbelly Community DAO decides today, on its own voting platform. | `10-governance` |
| 11 | Project Acacia | The RBA and DFCRC real money pilot, and Redbelly's part in it. | `11-project-acacia` |

Each file name exists in all three PNG folders and all three SVG folders.

## Deploy on Vercel

The site is static. There is no build step and `index.html` is at the root.

1. Unzip `redbelly-explained.zip`.
2. Either run `npx vercel deploy --prod` inside the `redbelly-explained` folder, or push the folder to a Git repository and import it in Vercel with Framework Preset "Other", no build command and the root as the output directory.

The gallery shows every infographic in the format you pick, opens any image full size, links every PNG and SVG for download, offers all 33 PNGs in one zip, and has a source list and a plain text version of each infographic (useful as alt text when posting).

## Edit the words or the design

Everything is built from one content file, so the PNGs, SVGs, gallery and source list never drift apart.

| To change | Edit |
| --- | --- |
| Titles, leads, labels, notes, footers and the facts behind them | `source/src/topics.js` |
| The "last verified" date printed on every infographic | `RX.verified` in `source/src/topics.js` |
| Colours and fonts | `source/src/tokens.css` |
| Layout of each diagram, per format | `source/src/series.css` |
| Icons (all drawn for this series on a 48 unit grid) | `source/src/icons.js` |

To preview, open `source/infographic.html` in Chrome and pick an infographic and a format. To rebuild every file:

```
cd source
npm install
npx playwright install chromium
npm run build     # PNGs, SVGs, layout check, SVG check, copy check, gallery and source list
npm run verify    # re-reads every cited page and confirms each quote (needs internet and pdftotext)
```

To edit in a design tool, open a file from `svg/`. In Figma, drag the SVG onto the canvas: text stays editable and both fonts are built into Figma. For Illustrator or Inkscape, install Be Vietnam Pro and JetBrains Mono from Google Fonts first.

## Design decisions

- **One series look.** Every infographic shares the same frame: an 11 step series rail with the current topic in red, the "Redbelly explained" label and number, a title and a one sentence answer, one diagram, and a footer with the sources, the last verified date and the DAO logo. The diagrams change with the idea (hub, comparison table, consensus drawings, steps, trust triangle, layer stack, transfer check, lanes, stats and timeline) but use one set of cards, icon tiles and arrows.
- **Brand.** These are DAO contributor deliverables, so they follow the Redbelly DAO Task Board brand kit ("Kinetic Consensus"): deep slate surfaces, one red accent (#EF5350), Be Vietnam Pro for words and JetBrains Mono for machine values, status colours only for status, no drop shadows, plain hyphens only, no emoji, and a dated "last verified" line on every graphic because some facts expire. The kit is built to sit alongside Redbelly Network's own identity and asks that material is not presented under the Redbelly Network name without the core team, so the DAO mark is used (light ink on dark, no plate, clear space kept, well above the 28 px minimum) and the Redbelly Network logo is not.
- **Phone first.** Type sizes are set per format and measured at phone width (390 pt wide screen). On the 1:1 and 4:5 files the smallest body text is about 10 pt or more. A 16:9 image is shown much smaller on a phone, so its body text was pushed to 8.2 pt or more; for phone-first channels post the 4:5 or 1:1 file.
- **Facts only from the supplied resources.** Each claim on the artwork maps to a page and a quote in `SOURCES.md`. Figures that change daily (node counts, TVL, transactions processed) and anything about token prices were left out on purpose.
- **Governance from the current sources.** Infographic 10 is built from the TASK-23 changelog (what was decided and what is in force, sourced to 1 August 2026) and the DAO voting platform (how voting works today), which takes priority wherever the changelog describes Snapshot voting. Constitution v1.2 is not used. The platform was re-checked on 24 Oct 2026: 41 proposals, none open, nothing newer that changes the facts shown.

## Checks

| Check | Command | Result (24 Oct 2026) |
| --- | --- | --- |
| Every quote in the source list is still on its live page | `npm run verify` | 96 of 96 quotes found on 28 pages |
| Every PNG at the required size; no clipped, overlapping or out of bounds text; smallest text measured at phone width | `npm run check` | 33 of 33 layouts pass |
| Every SVG drawn back and compared pixel by pixel with its PNG | `npm run compare` | 33 of 33 match |
| No price talk, investment wording, promises of returns, personal credit, em or en dashes, emoji, or outdated governance wording | `npm run lint` | pass |

Full reports are in `verification/`.

## Licences and credits for assets

- **Fonts:** Be Vietnam Pro and JetBrains Mono, both under the SIL Open Font License 1.1. Licence texts are in `source/fonts`.
- **Logo:** the Redbelly DAO mark from the Task Board brand kit (taskboard.redbellydao.network/brand), used as supplied apart from proportional resizing.
- **Icons, diagrams, layouts and code:** original work made for this series. No icon sets, templates, stock images or third-party code are included.
- **Build tool:** Playwright (Apache 2.0) renders the files during the build. It is a development dependency and is not part of the site.
