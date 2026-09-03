# Challenge Account Details — Visual Reference Map

STATUS: VERIFIED by independent verifier

## Source

- Reference image: `/home/clawd/.t3/userdata/attachments/466eedd6-46d2-4cc7-97d9-a7435f7f3dab-a2393060-c0c1-4a35-9dbf-3f42c712553e.png`
- Native dimensions: `1519 × 790 px`
- Frame citations below are logical crops/regions of this single reference image, not separate source images.
- Target route: `/challenges/details-single-page`
- Insertion point: immediately after the existing `Performance Chart` card
- Fidelity: structural and visual, translated through the existing GenesisFX design system

## Section map

### 1. Account details card

- Frame citation: `frame_1.png` — logical upper-card region of the single source screenshot.

- One full-width rounded bordered surface.
- Header row: `Account details` at left and `Withdraw` action at right.
- Two equal detail columns on desktop; one column on mobile.
- Left column rows: `Trading power`, `Breach floor (10% DD)`, `Trading days`, `Opened`.
- Right column rows: `Deposit`, `Buffer to floor`, `Available to cash out`, `Net P&L`.
- Values remain right-aligned within their column.
- Bottom amber status banner spans the card width.
- Locked banner copy: `Trade on 5 more days to unlock cash-out. You can always cash out at breakeven or a loss once 5 trading days are met.`

### 2. Cash-out eligibility banner

- Frame citation: `frame_2.png` — logical amber-banner region within the Account details card in the single source screenshot.
- Full-width amber treatment is inset within the card and anchored below both ledger columns.
- Copy matches the locked banner copy above.

### 3. Trade activity card

- Frame citation: `frame_3.png` — logical lower-card region of the single source screenshot.

- One full-width rounded bordered surface below Account details.
- Tabs at the upper left: `Open Positions` and `Closed Trades`.
- Selected tab has an accent underline; selection is not communicated by color alone.
- Empty state is centered in the remaining card area.
- Open state copy: `No open positions. The markets are waiting!`
- Open state action: `Start Trading`, with the project’s existing trade/transfer glyph grammar.
- Closed state must be implemented rather than left inert; use an equivalent empty message and no fabricated records.

## Observed visual evidence

- Dark near-black cards with a thin low-contrast border and large corner radius.
- Heading uses a compact medium/bold weight; labels are muted; values are brighter and right-aligned.
- Semantic values: green for positive/buffer values, muted red for breach floor, amber for trading days/status.
- Rows use subtle horizontal dividers, not nested cards.
- Card interior is information-dense but uses generous outer padding.
- Reference card separation is about one card-radius plus a small vertical gap.

## GenesisFX translation

- Surface: `GlassCard variant="light"`, `divider="none"`, `rounded="19px"`.
- Typography: `font-acid`; section heading `text-2xl font-normal`; rows `text-sm` labels and `text-base` medium values.
- Semantic colors: `text-gfx-bullish-light` / `text-gfx-bullish-emphasis`, `text-gfx-red-muted`, existing neutral tokens, and an amber banner composed from existing semantic amber values where available.
- Controls: reuse `SparkleButton`; no new component library or icon package.
- Spacing: existing challenge page `gap-4`; card padding aligned with `ChallengePerformanceCard` (`px-5 sm:px-7`, `py-7 sm:py-9`).
- Responsive: desktop two-column details; mobile single column with preserved 44px actions and no horizontal overflow.

## Signature moments

1. The Account details header/action pair followed by a symmetric two-column ledger.
2. The full-width amber cash-out eligibility banner anchored to the bottom of the details card.
3. The underlined trade tabs above a centered, actionable empty state.

## Acceptance

- All locked copy is present on the target route below `Performance Chart`.
- Tab selection changes the empty-state copy and exposes `aria-selected` semantics.
- Values and labels preserve readable alignment at desktop, tablet, mobile, and 200% zoom.
- No visible text below `12px`; no page-level horizontal overflow.
- Keyboard focus is visible for Withdraw, both tabs, and Start Trading.
- Reduced motion keeps all content and interactions available.
- Visual QA compares the reference and implementation in the same turn.
