# Share Account modal — visual reference map

STATUS: VERIFIED by independent verifier

## 1. Sources

- Figma file: `Q5LFMKpcKD2ChXj9pyiHwk` (`Genesis-FX-Dashboard`).
- Source screen: node `4037:112280`, `Genesis FXbook`, 1920×1027.
- Target modal: node `4037:112759`, `Frame 427321638`, 1318×835.
- Public-sharing disabled state: node `4037:112865`, `Account Details`, containing `Frame 427321638` at `4037:113344`.
- Share trigger: node `4037:112667`, `Buttons`, 61×46.
- Full source-screen screenshot: `/home/clawd/genesis-share-reference/frame_1.png` (1920×1027 source, 1024×548 MCP export).
- Modal screenshot: `/home/clawd/genesis-share-reference/frame_2.png` (exported 1364×881, displayed by MCP at 1024×662).
- Trigger screenshot: `/home/clawd/genesis-share-reference/frame_3.png` (61×46).
- Exact dimensions and tokens come from Figma MCP `get_metadata`, `get_design_context`, and `get_variable_defs`; screenshots are visual confirmation only.

## 2. Section map

### Trigger beside Deposit

Reference: `4037:112667`, `frame_3.png`; placement context comes from `frame_1.png` plus the operator requirement.

- Secondary SparkleButton shell is exactly 61×46 with 30px radius.
- Background is a vertical dark-green gradient: `#09241C` at 29.327% to `#0C1311` at 87.5%.
- Border is `#A0A0A0`; internal padding is 22px horizontal / 14px vertical.
- Centered 18×18 filled Share SVG uses the muted gray visual treatment.
- No additional sparkle field is visibly distinguishable around the icon in the supplied 61×46 trigger screenshot.
- Placement immediately beside Deposit, before Trade, with a 12px action gap is contextual implementation guidance; it is not visually provable from the isolated trigger screenshot.

### Modal shell

Reference: `4037:112759`, `frame_1.png`, `frame_2.png`.

- Desktop artboard is 1318×835, rounded 30px, clipped, with `#0C1311` surface and a 1.16px `#0C1311` border.
- Drop shadow: `0 4.641px 23.204px rgba(0,0,0,0.03)`.
- Close icon is 24×24 at x=1264, y=27 in node coordinates.
- Three oversized decorative green blur ellipses are clipped by the shell: bottom-left, upper-right edge, and above the upper-right edge.
- Title `Share Account` starts at x=35, visual baseline centered near y=97; subtitle starts x=35 near y=121.
- Title uses Acid Grotesk regular 24px; body uses Acid Grotesk regular 14px / 18.8px, `#808080`.
- The implementation follows the project modal contract: full-screen overlay/backdrop, centered responsive scale, click-outside and Escape closure. These behaviors are project-pattern requirements, not visually provable by the static Figma screenshot.

### Left column

Reference: `4037:112759`, `frame_1.png`, `frame_2.png`.

- Public-sharing card: x=35, y=153, 525×120, rounded 14px; title at x=71/y≈197 and supporting line at x=71/y≈220.
- Master toggle: 44×23 at x=498/y=53 relative to card, active green `#40C99C`, white 19px thumb aligned right.
- `Share Link` heading begins at x=35/y≈297.
- Public link field is x=35, y=327, 329×50, radius 30px, fill `#101E1A`, 1px `#404040` border.
- Three 40×40 icon controls follow at x=406, 458, and 510, each rounded 10px: Copy, QR code, External/share.
- `Privacy Settings` heading starts x=35/y≈414; body explanation starts x=35/y≈451.
- Six privacy rows begin at y=493 and step by 43px: Account Name, Balance, Equity, P&L, Closed Trades, Open Positions.
- Labels are Acid Grotesk regular 16px white. Every row has a 44×23 active toggle aligned at x=498.

### Public sharing disabled

Reference: `4037:112865`, nested modal `4037:113344`.

- The public-sharing card remains visible with its toggle switched off.
- The entire lower-left control region is empty: no Share Link heading or field, no Copy/QR/External controls, no Privacy Settings heading or rows.
- The right-column analytics remains unchanged and visible, including the three zero-stat cards, August chart, and `0 total views`.
- Re-enabling public sharing restores the lower-left controls; this restoration behavior is inferred from the toggle contract and verified in browser QA.

### Right column analytics

Reference: `4037:112759`, `frame_1.png`, `frame_2.png`.

- Three stat cards begin at x=631/y=164; each is 210×124, rounded 14px, separated by 10–11px.
- Each card shows `0` in Acid Grotesk regular 36px and a centered 16px `#808080` caption: `This month`, `Avg/Day`, `Best Day`.
- Month navigation spans x≈631–1280 around y=329–349 with left/right chevrons and centered `AUGUST` in 12px medium text.
- Chart card is x=631, y=389, 661×294, rounded 24px.
- Area chart uses `#00B38C` highlight, `#064B34` middle tone, and `#0C1311` shadow over the dark surface; axes use 12px bold label styling and `#606060`.
- View count is below the chart: 24×24 eye icon followed by `0 total views` in 16px `#A0A0A0`.

## 6. Responsive and interaction guidance

- Figma establishes only the 1318×835 desktop composition. Responsive behavior is inferred from the existing project modal convention: preserve the internal artboard and uniformly scale it to at most 95% of viewport width/height.
- Toggle, copy, QR, external-link, month-navigation, and public-link behaviors are not provable from a static image. They must be implemented with accessible native buttons/switches and deterministic local demo behavior.
- No backend/API contract is present in the Figma reference; the modal is a UI interaction surface only for this task.

## 7. Three signature moments

1. `4037:112667`: compact 61×46 SparkleButton with a centered filled Share SVG; its position beside Deposit is contextual guidance not shown by the isolated trigger reference.
2. `4037:112759`: large 1318×835 rounded dark glass modal with bottom-left and upper-right green atmospheric glows.
3. `4037:112759` / `4037:112865`: asymmetric two-column composition — enabled shows left privacy/share controls, while disabled leaves that lower-left region empty and preserves the right analytics.
