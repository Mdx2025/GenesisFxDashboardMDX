# Changelog

## 2026-08-11

- Replaced the light-theme FAQ toggle artwork with the supplied 44px mint-and-green SVG while preserving the dark icon.
- Updated the light-theme `neutral-250` token to `#9FE4CD` while preserving its dark value.
- Restored the light ModeToggle active indicator to green with a component-local background token.
- Updated the Journal AI Coach and chat controls to use the supplied lavender gradient on mobile while preserving the existing desktop gradient.
- Set TradeLocker Platforms cards to a pure white surface in light theme.
- Updated light-theme close icons, `green-200`, and GreenPillButton styling from the supplied specification.
- Removed the clipped rectangular shadows from Journal Overview weekly cards in light theme.
- Aligned Copy Trading profile-detail font sizes and weights with Figma Frame 518.
- Connected the Copy Trading strategy filters, search, and favorite controls to the strategy cards.
- Hid the Genesis Score, Trading Calendar, and GlassBannerCard decorative glows in light theme while preserving them in dark theme.
- Changed the Journal statistics layout to a 1:2 Genesis Score/metrics column ratio on desktop while preserving the single-column mobile layout.
- Standardized the details-page trades tables on a white light-theme card surface with the shared card shadow while preserving dark-theme styling.
- Changed GenSocial signal strategy cards to a white surface in light theme while preserving their dark-theme background.

## 2026-08-10

- Added a bottom-left `GlowEllipse` to the five PAMM Manager summary cards (Total AUM, Total Strategies, Total Followers, Total P&L Generated, Fee Earnings) via a new `bottom-left` `StatCard` glow position.
- Added side `GlowEllipse` accents to the PAMM performance stat cards: ROI, Win Rate, Profit Factor and Days Active glow from the right, the rest from the left.

## 2026-08-05

- Rebuilt the Academy E Book card media compositions from Figma Frame 1000002408, including the exact MCP-exported artwork, category surfaces, crop geometry, opacity, and lower fades.
- Blended each Academy E Book image into its category surface with a Tailwind gradient, removing the hard horizontal seam between the cover artwork and card background.
- Replaced the Academy E Book artwork with the supplied Crypto, Forex, and Stocks assets and introduced category-specific green surfaces so Crypto is lighter than the page while Forex and Stocks are lighter still.
- Refactored the Academy E Books card reference into reusable Tailwind CSS, including its two-stage media composition, green color blend, exact radius, CTA geometry, timing metadata, focus state, and mobile-safe grid.
- Added a subtle bottom-centered `GlowEllipse` reveal to Academy course cards on hover and keyboard focus, with a reduced-motion-safe transition.
- Migrated Academy course cards to the reusable light `GlassCard` surface while preserving their existing content and layout.
- Replaced the 10X Challenges empty state with a responsive four-card account grid matching Figma Frame 2085662554 and using the reusable light `GlassCard` surface.
- Matched the Journal Trades table container border to the reusable light glass card and enabled Notebook folder filtering for All notes, Trade, Day, Account, and Text1.

## 2026-08-04

- Promoted all base `text-gfx-neutral-300` source classes to `text-gfx-neutral-500` for clearer secondary text across the dashboard.
- Refined Journal Statistics with elevated Session & Time summary cards, adjacent metric info icons, and the supplied XAAUSD Most Profitable Asset pill.
- Reused the `/home` Portfolio Equity chart for Journal Net P&L, centered all `SparkleButton` content, and rebuilt the Statistics Genesis Score visual as the supplied empty five-ring radar reference at full available card height.
- Rebuilt the Total Balance mini chart with Chart.js to match the supplied six-month equalizer reference, including bar geometry, rounded tops, emerald-to-dark gradients, and compact month labels.
- Preserved the existing Total Balance title, value, and change copy.
- Refactored the reusable Period Selector active item to the supplied Tailwind geometry, colors, border, typography, and clipped bottom bloom.
- Lowered the August Total Balance bar and raised September to become the chart peak.
- Rebuilt the Total Equity candlestick chart in Chart.js from the supplied eight-candle reference while preserving the KPI copy.
- Restored the Period Selector selected-state border to the previous subtle top-edge fade.
- Reworked the Portfolio Equity curve with sharp linear peaks and drawdowns to better match a professional trading platform.
- Corrected the Quick Actions links for New Account and Journal to use their registered TradeLocker routes.
- Changed the Quick Actions heading color to the existing neutral-500 token (`#A0A0A0`).
- Removed the nested glass treatment from `EmptyState` and replaced the Assets Management table control with the supplied rounded archive-download button.
- Updated the TradeLocker account flow with the external Trade redirect, leverage summary alignment, account-card spacing, calendar sharing control, and empty Open Positions/Closed Trades states.

## 2026-07-31

- Replaced the static profile-menu theme mockup with an accessible, persisted light/dark switch.
- Added premium GSAP motion for the account menu enter/exit and the theme gradient transition, with reduced-motion fallbacks.
- Added semantic light-theme surface tokens for the dashboard shell, cards, sidebar, overlays, and menu states.
- Restored the supplied three-layer SVG gradient glow behind the Theme row with its original path, color stops, and blur treatment.

All notable changes to this project will be documented in this file.

## 2026-07-04

### Changed

- Replaced the Tradelocker sidebar icon with the provided PNG asset.
- Reworked the Total Equity candlestick preview to use glowing custom SVG candles with visible wicks.
- Removed horizontal grid lines and hidden month/value labels from the Portfolio Equity line chart.

### Documentation

- Added initial changelog for project work tracking.
