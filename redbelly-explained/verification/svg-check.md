# SVG export check

Checked 2026-10-31T05:14:39.021Z by `source/tools/compare-svg.mjs`. Each SVG was opened in Chromium, captured at the PNG size and compared pixel by pixel with the PNG. "Changed pixels" counts pixels whose colour differs by more than 48 of 255 on any channel; the rest is text anti-aliasing.

Result: 33 of 33 SVG files match their PNG (threshold 3% changed pixels).

| Format | File | Mean difference (0 to 255) | Changed pixels | Result |
| --- | --- | --- | --- | --- |
| 16x9 | 01-what-is-redbelly.svg | 1.42 | 0.92% | pass |
| 16x9 | 02-why-tokenise-real-world-assets.svg | 1.03 | 0.71% | pass |
| 16x9 | 03-dbft-consensus.svg | 2.91 | 2.04% | pass |
| 16x9 | 04-receptor.svg | 2.07 | 1.46% | pass |
| 16x9 | 05-verifiable-credentials.svg | 1.78 | 1.30% | pass |
| 16x9 | 06-zk-proofs.svg | 1.93 | 1.42% | pass |
| 16x9 | 07-tokeniser.svg | 2.12 | 1.56% | pass |
| 16x9 | 08-compliance-aware-assets.svg | 1.71 | 1.19% | pass |
| 16x9 | 09-identity-and-accountability.svg | 3.07 | 2.11% | pass |
| 16x9 | 10-governance.svg | 1.51 | 0.97% | pass |
| 16x9 | 11-project-acacia.svg | 1.86 | 1.36% | pass |
| 4x5 | 01-what-is-redbelly.svg | 1.50 | 1.17% | pass |
| 4x5 | 02-why-tokenise-real-world-assets.svg | 1.37 | 1.10% | pass |
| 4x5 | 03-dbft-consensus.svg | 1.12 | 0.87% | pass |
| 4x5 | 04-receptor.svg | 1.37 | 1.09% | pass |
| 4x5 | 05-verifiable-credentials.svg | 1.77 | 1.31% | pass |
| 4x5 | 06-zk-proofs.svg | 1.12 | 0.88% | pass |
| 4x5 | 07-tokeniser.svg | 1.17 | 0.91% | pass |
| 4x5 | 08-compliance-aware-assets.svg | 1.14 | 0.90% | pass |
| 4x5 | 09-identity-and-accountability.svg | 1.47 | 0.99% | pass |
| 4x5 | 10-governance.svg | 1.55 | 1.25% | pass |
| 4x5 | 11-project-acacia.svg | 0.96 | 0.77% | pass |
| 1x1 | 01-what-is-redbelly.svg | 2.18 | 1.72% | pass |
| 1x1 | 02-why-tokenise-real-world-assets.svg | 3.18 | 2.39% | pass |
| 1x1 | 03-dbft-consensus.svg | 2.68 | 2.03% | pass |
| 1x1 | 04-receptor.svg | 2.07 | 1.64% | pass |
| 1x1 | 05-verifiable-credentials.svg | 2.19 | 1.72% | pass |
| 1x1 | 06-zk-proofs.svg | 2.62 | 2.07% | pass |
| 1x1 | 07-tokeniser.svg | 1.92 | 1.51% | pass |
| 1x1 | 08-compliance-aware-assets.svg | 2.61 | 2.03% | pass |
| 1x1 | 09-identity-and-accountability.svg | 3.33 | 2.40% | pass |
| 1x1 | 10-governance.svg | 2.07 | 1.63% | pass |
| 1x1 | 11-project-acacia.svg | 2.63 | 2.05% | pass |
