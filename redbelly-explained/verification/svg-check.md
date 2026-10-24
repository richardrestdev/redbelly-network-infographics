# SVG export check

Checked 2026-10-24T03:47:56.772Z by `source/tools/compare-svg.mjs`. Each SVG was opened in Chromium, captured at the PNG size and compared pixel by pixel with the PNG. "Changed pixels" counts pixels whose colour differs by more than 48 of 255 on any channel; the rest is text anti-aliasing.

Result: 33 of 33 SVG files match their PNG (threshold 3% changed pixels).

| Format | File | Mean difference (0 to 255) | Changed pixels | Result |
| --- | --- | --- | --- | --- |
| 16x9 | 01-what-is-redbelly.svg | 2.52 | 1.75% | pass |
| 16x9 | 02-why-tokenise-real-world-assets.svg | 1.89 | 1.28% | pass |
| 16x9 | 03-dbft-consensus.svg | 2.82 | 2.01% | pass |
| 16x9 | 04-receptor.svg | 1.93 | 1.38% | pass |
| 16x9 | 05-verifiable-credentials.svg | 1.87 | 1.35% | pass |
| 16x9 | 06-zk-proofs.svg | 2.18 | 1.63% | pass |
| 16x9 | 07-tokeniser.svg | 2.75 | 2.05% | pass |
| 16x9 | 08-compliance-aware-assets.svg | 2.47 | 1.78% | pass |
| 16x9 | 09-identity-and-accountability.svg | 2.76 | 1.93% | pass |
| 16x9 | 10-governance.svg | 2.63 | 1.83% | pass |
| 16x9 | 11-project-acacia.svg | 2.47 | 1.79% | pass |
| 4x5 | 01-what-is-redbelly.svg | 1.76 | 1.43% | pass |
| 4x5 | 02-why-tokenise-real-world-assets.svg | 2.87 | 2.22% | pass |
| 4x5 | 03-dbft-consensus.svg | 2.76 | 2.10% | pass |
| 4x5 | 04-receptor.svg | 1.78 | 1.48% | pass |
| 4x5 | 05-verifiable-credentials.svg | 2.23 | 1.70% | pass |
| 4x5 | 06-zk-proofs.svg | 2.04 | 1.65% | pass |
| 4x5 | 07-tokeniser.svg | 1.93 | 1.55% | pass |
| 4x5 | 08-compliance-aware-assets.svg | 2.48 | 1.96% | pass |
| 4x5 | 09-identity-and-accountability.svg | 1.95 | 1.46% | pass |
| 4x5 | 10-governance.svg | 1.71 | 1.39% | pass |
| 4x5 | 11-project-acacia.svg | 2.71 | 2.20% | pass |
| 1x1 | 01-what-is-redbelly.svg | 1.11 | 0.84% | pass |
| 1x1 | 02-why-tokenise-real-world-assets.svg | 0.11 | 0.10% | pass |
| 1x1 | 03-dbft-consensus.svg | 0.64 | 0.48% | pass |
| 1x1 | 04-receptor.svg | 0.77 | 0.59% | pass |
| 1x1 | 05-verifiable-credentials.svg | 0.59 | 0.43% | pass |
| 1x1 | 06-zk-proofs.svg | 0.33 | 0.25% | pass |
| 1x1 | 07-tokeniser.svg | 0.59 | 0.46% | pass |
| 1x1 | 08-compliance-aware-assets.svg | 0.37 | 0.28% | pass |
| 1x1 | 09-identity-and-accountability.svg | 1.51 | 1.05% | pass |
| 1x1 | 10-governance.svg | 0.98 | 0.76% | pass |
| 1x1 | 11-project-acacia.svg | 0.29 | 0.21% | pass |
