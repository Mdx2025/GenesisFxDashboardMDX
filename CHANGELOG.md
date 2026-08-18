# Changelog

- Switched the sidebar header to its light-theme artwork: the collapse arrow becomes a white well with a `#C6C6C6` border and an `#A0A0A0` chevron, and the GenesisFX wordmark swaps to the light-background lockup. The arrow is painted from CSS instead of `fill`/`stroke` attributes so the global light-theme SVG contract does not repaint its white well green.

- Gave GlowButton a solid `#00B38C` surface with white content in light theme, and extended the icon carve-out so its glyphs stay white on that green instead of being recolored green-on-green by the light-theme SVG contract.

- Keyed the Journal AI Coach and chat button gradients to the theme instead of the viewport, so the lavender surface now appears in light theme at every width while dark theme keeps its deep purple gradient.

- Centered the AI Coach icon against its label by widening the glyph's box to account for the sparkle that overhangs the face, which had been pulling the icon's box center above its visual mass.

- Corrected vertical centering platform-wide at its source: Acid Grotesk declares asymmetric typo metrics, so every centered label rendered 0.1em above the optical center and drifted further apart as font sizes grew. Overriding the face metrics fixes all pages, modals, badges, and pills at once, and replaces the per-element pixel nudges that could not scale and had split sibling labels apart.

- Kept the Settings profile banner name white in light theme, since it sits over the dark hero artwork where the global light text contract would otherwise render it black.

- Centered Support contact card content vertically so shorter cards no longer anchor their icon and copy to the top of a row-stretched card.

- Replaced hardcoded `#021B13` Settings icon-well backgrounds with a semantic contract that renders white in light theme while preserving the original dark-theme surface.

- Replaced hardcoded `#09241C` UI backgrounds with a semantic deep-surface contract so cards, badges, icon wells, modal controls, and auxiliary panels render white in light theme while preserving the original dark palette.

- Replaced the Settings profile header's hardcoded `#0D1512` shell with the semantic raised-surface contract so it renders white in light theme and retains the canonical dark surface in dark theme; added a source/runtime regression gate.

- Ported the GenesisFX Markets Sign Up hover interaction to the shared SparkleButton: a 350ms surface wash and eight staggered 2.4s twinkles, with theme-aware paint and a reduced-motion fallback.

- Tightened SparkleButton optical QA to validate icon paint and label ink independently, then corrected the repeated Withdraw and Transfer labels across Home, Assets Management, Partner, and the design-system reference.

- Recalibrated compact controls against visible glyph ink rather than CSS line boxes, correcting the balance, wallet, status, filter, mode, navigation, and shared action-button families across the platform.

- Corrected optical centering across the audited control system: active ModeToggle icons now remain white in light theme, and Academy chapter rows vertically center their number, title, and duration without asymmetric padding.

- Completed a cross-route dark-surface audit: Partner, Settings, Signals, and account modals now use the semantic raised-surface and border tokens instead of hardcoded `#0C1311` UI backgrounds.

- Moved the Partner Links referral-code card from an inline dark background to the semantic raised-surface token, which resolves to white in light theme.

- Migrated hardcoded pale and inline-white copy to the semantic theme text contract so Partner tables, modal details, form values, statistics, journal metrics, and strategy stats render black on light surfaces while remaining white in dark theme.

- Added a light-theme hover text contract so interactive labels stay black instead of switching to white on pale surfaces, with explicit preservation for controls over dark video.

- Extended the semantic decorative-glow contract across all Partner cards, empty states, and the Referral Details modal so decorative blur blobs are suppressed in light theme while remaining intact in dark theme.

- Added a project-wide light-theme SVG paint contract so literal white icon fills and strokes render `#00B38C`, while structural masks, sparkle highlights, and white glyphs on green active states retain their required contrast.

- Matched the Partner Program marketing card to its light-theme design: mint-to-white surface, subtle gray border, mint badge, and black title while preserving the dark palette.

- Updated the Trade Sessions bottom fade to use white only in light theme while preserving the existing dark gradient.

- Fixed Trading Accounts platform copy, overflow-menu icons, and action hover colors so light theme never renders white-on-white while preserving the existing dark palette.

## 2026-08-12

- Synchronized PAMM and Copy Trading detail-page typography with Figma frames `2682:48732` and `2938:70035`, including exact title, metric, detail-row, tab, and table-label sizes and weights.
- Updated the Account Details profile/settings icons and the Daily Analysis live-stream icon to `#00B38C` in light theme while preserving white icons in dark theme.
- Added semantic chart-text hooks and live theme synchronization so Chart.js canvas labels, SVG radar labels, and DOM chart axes/legends render black in light theme while preserving dark-theme colors.
- Added a semantic `theme-decorative-glow` hook across modal, snackbar, authentication, settings, KYC, academy, journal, and challenge decorations so light theme hides visual glows without suppressing functional button, focus, or progress effects; also completed dialog semantics for the journal note/folder modals found during the audit.
- Installed Graphify 0.9.41 as a project-scoped Codex skill and generated a local code-only graph excluded from Git.
- Changed `SuccessSnackbar` from `rounded-full` to the design-system `rounded-md` radius.
- Restored the light-theme `PeriodPill` container background to `#F6F6F6` without changing the shared select-surface token or dark theme.
- Expanded the light-theme `text-white` override beyond `.theme-root` so sibling overlays and global dialogs also render their copy in black, while retaining approved accent-state exceptions.
- Mapped `text-white` copy to pure black in light theme and enforced hidden `GlowEllipse` decoration inside light-theme dialogs.
- Made FAQ card surfaces transparent in light theme while preserving their borders, controls, and dark-theme background.
- Corrected the TopBar wallet, language, and notification-count optical alignment, and kept the notification count white in light theme.
- Updated light-theme active funding coin options and active/completed funding steps to use `#00B38C` with white labels and check icons while preserving dark theme.

## 2026-08-11

- Centered GreenPillButton labels with explicit flex alignment, including the Assets Management Reset action.
- Updated the light-theme select surface token to pure white while preserving its dark value.
- Isolated the TopBar functional SVG colors so wallet, notification, language, help, and mobile-menu glyphs use `#00B38C` only in light theme.
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
