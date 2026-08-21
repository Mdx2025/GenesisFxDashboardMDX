# GenesisFX Leaderboards — Visual Reference Map

STATUS: VERIFIED by independent verifier

Date: 2026-08-21
Figma file: `Q5LFMKpcKD2ChXj9pyiHwk`
Section node: `4037:115802`

## Source frames

- `frame_1` — Top traders, Figma `4037:116074`, design size `1920×3003`; local reference `/home/clawd/genesis-leaderboards-reference/top-traders.png` is a proportional `1228×1920` raster.
- `frame_2` — Most Profitable, Figma `4037:116403`, design size `1920×3003`; local reference `/home/clawd/genesis-leaderboards-reference/most-profitable.png` is a proportional `1228×1920` raster.
- `frame_3` — Demo Accounts, Figma `4037:116731`, design size `1920×3003`; local reference `/home/clawd/genesis-leaderboards-reference/demo-accounts.png` is a proportional `1228×1920` raster.
- `frame_4` — 10X Challenge, Figma `4037:117108`, design size `1920×2486`; local reference `/home/clawd/genesis-leaderboards-reference/10x-challenge.png` is a proportional `1483×1920` raster.

## Section map — Shared page structure

- Root-layout screen with the existing 315 px sidebar and top bar. The leaderboard content begins inside the existing main-content coordinate system, not in a standalone route (`frame_1`, `frame_3`, `frame_4`).
- Page title `Leaderboard` is centered above a four-option pill tab control. The visible tab order is `Top traders`, `Most Profitable`, `10X Challenge`, `Demo Accounts`; the active tab uses the established green selected-pill treatment (`frame_1`, `frame_3`, `frame_4`).
- Content column is centered and approximately 1041 px wide. Shared surfaces use rounded glass containers with a subtle green outline, dark `#0c1311` fill and decorative `#064b34` blur; light theme must map these through the repository's semantic surface/text tokens rather than preserve dark literals (`frame_1`, `frame_3`, `frame_4`).
- Typography is FFF Acid Grotesk. The page heading is 50 px regular; section headings are 24 px regular; table labels are 12 px bold uppercase with 2.323 px tracking; table data is 16 px medium (`frame_1`, `frame_3`, `frame_4`).

## Top traders

- Context row: outlined date pill `August 2026`, title `Top Traders–Monthly ROI`, and right ranking note `Ranked by ROI%. Minimum 5 closed trades` with a green status dot (`frame_1`).
- Podium card is `1040×514` and contains three circular trader medallions. Center rank 1 is largest, with ranks 2 and 3 flanking it; the portraits use green radial/glow fills and thin amber outer rings (`frame_1`).
- Podium copy: rank 1 `Maiya B.` / `+863.07%` / `Champion`; rank 2 `@GLotrades` / `+352.75%` / `Runner-up`; rank 3 `@Dhall` / `+352.75%` / `Bronze` (`frame_1`).
- Below is a 1041 px-wide, 24-row table with `RANK`, `USERNAME`, `MONTH ROI`. Rows are 75 px tall; avatar monogram is a 44 px circle; ROI is right-aligned green (`frame_1`).
- Bottom disclaimer is a rounded glass banner with a warning icon and the exact copy `Disclaimer: Rankings update periodically and reflect live trading performance. Prizes are illustrative and awarded at the broker's discretion. Past performance doesn't guarantee future results.` (`frame_1`).

## Most Profitable

- Keeps the shared page heading, tabs, date pill, podium, table and disclaimer geometry (`frame_2`).
- Section title changes to `Most Profitable — Monthly P/L`; right note changes to `Ranked by net profit ($) across TradeLocker accounts.` (`frame_2`).
- Table terminal metric changes from `MONTH ROI` to `MONTH P/L`, with green currency values `+$26,327.40` (`frame_2`).
- The Figma screenshot export for `frame_2` is visibly clipped/corrupted across the left and center columns; use the shared geometry proven by `frame_1`/`frame_3` and only take `frame_2` as source of state-specific labels and values. Do not reproduce the export corruption.

## Demo Accounts

- Same shared composition and podium geometry as Top traders (`frame_3`).
- Section title is `Top Demo Traders - Monthly ROI`; right note is `Demo TradeLocker accounts ranked by ROI %. Minimum 5 closed trades.` (`frame_3`).
- Table uses `RANK`, `USERNAME`, `MONTH ROI`, 24 visible data rows and the same green ROI styling (`frame_3`).

## 10X Challenge

- Omits the podium entirely. After the tabs, the date/title row reads `August 2026` and `10X Challenge - Leaderboard`, with the right note `Top 25 challenge accounts ranked by return %.` (`frame_4`).
- Main table is approximately 1041 px wide and contains 25 rows. The visible headers are `RANK`, `USER`, `CHALLENGUE TIER`, `RETURN%`, `CHART`, `REWARD`; `CHALLENGUE` is the literal spelling in the reference (`frame_4`).
- Rows are 75 px tall. User cell combines 44 px `CP` avatar with `Curtis P.`. Tier is `Tier 1` plus muted `Rookie`; return is green `+219.50%`; chart is a small green sparkline; reward is `$500` (`frame_4`).
- The first row has a stronger green horizontal highlight while remaining inside the table border (`frame_4`).

## Theme and responsive behavior

- Dark colors map to existing semantic tokens: screen `#000705`, raised/container `#0c1311`, middle green border `#064b34`, primary text white, body `#808080`, subtle table text `#606060`, accent `#00b38c`/`#40c99c` (`frame_1`, `frame_3`, `frame_4`).
- Light theme is not represented by the Figma frames. Follow the verified project design system: white raised surfaces, `#ececec` borders, black headings/data, dark muted body labels, green accents retained, and decorative glows hidden. This is a derived implementation rule, not a visual claim from Figma.
- Mobile is not represented by the Figma frames. Preserve readable hierarchy by making tabs horizontally scrollable, podium responsive/stackable, and tables horizontally scrollable without document-level overflow. This is a derived implementation rule.

## Design-system reuse/new primitives

- Reuse `RootLayout`, `GlassCard`, `PillTabs`, semantic surface/text tokens, existing sidebar/topbar, and existing icon system.
- Create reusable leaderboard primitives where the frame introduces a new pattern: `LeaderboardTabs`, `LeaderboardPodium`, `LeaderboardTable`, `LeaderboardAvatar`, and `LeaderboardSparkline` (exact final names may follow repository conventions).
- Document the new primitives in `/design-system`.
- `ClaimUsernameModal` must use semantic surfaces, borders and text colors for light theme, preserve its verified 755×551 dark geometry, and expose an `onContinue` flow that navigates to the leaderboard route after a valid username.

## Signature moments

1. `frame_1`: the three-person glowing podium, with the oversized rank-1 medallion centered between ranks 2 and 3.
2. `frame_1`/`frame_3`: the long 24-row leaderboard table directly beneath the podium, aligned to the same 1041 px content width.
3. `frame_4`: the podium disappears and becomes a six-column 25-row challenge table with sparklines and a green-highlighted first row.

## Fidelity and QA gates

- Before build, this file must be independently reviewed and changed to `STATUS: VERIFIED`.
- Dark desktop QA must compare rendered screenshots against `frame_1`, `frame_3`, and `frame_4` in the same turn.
- Functional QA must prove: Leaderboards opens `ClaimUsernameModal`; valid `Continue` closes the modal and lands on `/leaderboards`; all four tabs switch their state-specific content; dark and light computed colors match semantic tokens; no runtime errors, failed responses, or document-level horizontal overflow.
