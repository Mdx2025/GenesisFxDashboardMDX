# Glyph Optical-Centering Audit — 2026-08-14

## Outcome

The previous control audit compared CSS line boxes with their containers. That method missed visible imbalance in short Acid Grotesk strings because the font reserves descender space even when a label contains no descenders. The supplied `$90.254,58` balance badge is the canonical reproduction.

## Measurement contract

- Routes: 40 registered, authentication, and design-system routes.
- States: light and dark themes.
- Viewports: 390×844 and 1440×1000.
- Metric: canvas `actualBoundingBoxAscent` / `actualBoundingBoxDescent`, projected into the browser text range and compared with the visual control center.
- Tolerance: absolute visible-ink center delta at or below 1px.
- Secondary gates: symmetric vertical padding, no horizontal overflow, no runtime errors, keyboard focus, 24px targets, reduced motion, and 200%-equivalent reflow.

## Evidence

Production baseline:

- 3,331 controls inspected across 160 scenarios.
- 500 repeated instances grouped into 23 component signatures.
- `$90.254,58`: `-1.87px` high; 6px top and 9.73px bottom visible-ink gaps.
- No overflow or runtime errors.

Local post-fix:

- 3,198 visual controls inspected across 160 scenarios.
- 0 offenders above 1px.
- `$90.254,58`: `+0.13px` to `+0.20px`; 8px top and 7.59–7.73px bottom gaps.
- 0 overflow and 0 runtime errors.
- Build passed with 245 transformed modules.
- Accessibility/reflow QA passed.

Production post-fix:

- 3,199 visual controls inspected across 160 scenarios.
- 0 offenders above 1px, 0 overflow, and 0 runtime errors.
- Focused accessibility/reflow QA passed on the public deployment.
- `/home` returned HTTP 200.
- Public and local `index-B-SCmWOW.js` SHA-256 matched: `71b29e2d40187f51feabaaacfe22d23242fcd59a139d1f266360313120616e02`.
- Commit `87db1a5`; Dokploy deployment `Wy7qWIau0q4g1rZDprkcv` completed successfully.

## Implementation

`src/app.css` defines semantic glyph layers:

- `.optical-text`: 1px label correction.
- `.optical-text--numeric`: 2px numeric correction.

The correction is applied to the glyph layer rather than the border or hit target. Shared primitives and repeated compact patterns were updated first: navigation/user card, wallet and live balance, mode toggles, sparkle/green pill buttons, selects, badges, status pills, filters, and action controls.

## Scope guard

Page and card spacing, control dimensions, borders, icon geometry, theme colors, and hit targets remain unchanged except where the supplied balance wrapper incorrectly used `items-start`; it now uses `items-center`.

## Operator follow-up: SparkleButton icon/label pairs

The first glyph-aware matrix still allowed one blind spot: it judged the union of icon paint and label ink. The operator's Deposit / Withdraw / Transfer crop showed that the union could pass while its two layers disagreed visibly.

- Production reproduction on `/home`: Deposit label and icon were both `+1px`; Withdraw and Transfer labels were `-1.5px` while their icons were `+1px`.
- Root cause: the union center hid a `2.5px` disagreement between each no-descender label and its icon.
- Correction: the existing semantic `.optical-text` label layer is now applied to Withdraw and Transfer in the repeated Home, Partner, Assets Management, and design-system patterns. Deposit remains unchanged because its descender already aligned at `+1px`.
- QA contract: label ink, icon paint, and their union must now each be within `1px` of the button center.
- Local result: Home passed in dark and light; Partner and Assets Management passed in dark. Deposit finished at `+1px`; Withdraw and Transfer at `-0.5px`; icon paint and content union at `+1px`; zero runtime errors.
- Build passed with 245 transformed modules.
