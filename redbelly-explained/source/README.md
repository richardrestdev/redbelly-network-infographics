# Redbelly Explained: source

Everything that makes the 33 infographics, the SVG exports, the gallery and the source list. The design is plain HTML, CSS and SVG, rendered by headless Chromium, so any text editor is enough to change it.

## Files

| File | Role |
| --- | --- |
| `src/topics.js` | All words on the artwork, the diagram type for each topic, the printed source line, and every fact with its page, supporting quote, the printed lines it supports (`on`) and any condition the source attaches (`when`). |
| `src/tokens.css` | Colours and fonts (values from the Redbelly DAO Task Board brand kit). |
| `src/series.css` | The frame (header, intro, footer) and every diagram, with rules per format. |
| `src/icons.js` | The icon set, drawn for this series on a 48 unit grid. One red accent per icon. |
| `src/build.js` | Builds one infographic into the page and draws connector lines after layout. |
| `infographic.html` | Source view. Open it, pick a topic and a format, or use `?t=receptor&f=square`. |
| `fonts/` | Be Vietnam Pro and JetBrains Mono (woff2) with their SIL OFL 1.1 licences. |
| `brand/` | The Redbelly DAO mark from the Task Board brand kit, and a smaller copy used in the files. |

## Commands

```
npm install
npx playwright install chromium

npm run render    # PNGs into ../png (16:9 is a 1280 x 720 layout rendered at 1.5x)
npm run svg       # editable SVGs into ../svg
npm run check     # layout check, writes ../verification/layout-check.*
npm run compare   # SVG against PNG, writes ../verification/svg-check.*
npm run lint      # copy rules
npm run verify    # re-reads every cited page, writes ../verification/source-check.* (needs internet and pdftotext)
npm run claims    # reads every printed line against its quotes, writes ../verification/claim-check.*
npm run site      # ../index.html, ../sources.html, ../SOURCES.md, ../assets
npm run build     # render, svg, check, compare, claims, lint and site in one go
```

`render.mjs`, `export-svg.mjs` and `check.mjs` take topic numbers or slugs to work on a few files, for example `node tools/render.mjs 4 governance` or `node tools/check.mjs 2 --formats=landscape`.

## How a layout is made

Each topic names a diagram type in `topics.js` (`hub`, `compare`, `dbft`, `jobs`, `triangle`, `zk`, `stack`, `gate`, `lanes`, `governance`, `acacia`). `build.js` turns it into HTML and `series.css` lays it out for the format on the canvas (`f-landscape`, `f-portrait`, `f-square`). On 16:9 some topics use a split layout (title and lead on the left, diagram on the right) and the others a band (title and lead across the top, diagram underneath), whichever lets the 11 pt text fit.

## Copy rules

Plain language, one idea per infographic, lead with the answer, say the number. No em or en dashes and no emoji anywhere (Task Board voice rules). No price talk, investment advice or promises of returns. No personal credit. Governance only from the TASK-23 changelog and the DAO voting platform. `npm run lint` checks these, and `npm run check` fails if new words no longer fit.

Readability: no text below 11 pt when the image fills a 390 pt wide phone, in any format (body 12 pt or more on 4:5 and 1:1). The type scale per format is in `series.css` (`--fs-*`); keep the copy short enough to fit at that size.

Accuracy: never print a claim wider than its quote. If a source says "can", "often" or "up to", keep it; if it attaches a condition ("if honest nodes disagree", "on the same ledger"), print the condition and record it in the fact's `when`. `npm run claims` tests this.

## Adding or changing a fact

Change the words in `topics.js`, then add or update the matching entry in that topic's `facts` list: the claim, the source key (from `RX.src`), a short quote copied from the page, the exact printed lines it supports (`on`) and, if the source attaches a condition, the words of that condition as printed (`when`). Printed words that only name a column, lane or role go in the topic's `labels`. `npm run verify` confirms the quote is on the page, `npm run claims` reads the printed lines against the quotes, and `npm run site` rebuilds the source list.
