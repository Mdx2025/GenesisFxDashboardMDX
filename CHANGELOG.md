# Changelog

## 2026-08-27

- Turned the four-dot Partner marketing card into a real four-item Swiper. The existing `Real Time Statistics` card was static even though its pagination implied more content; it now supports touch/pointer drag, clickable 24px dot targets and arrow-key navigation across statistics, creative assets, landing pages and referral-link tools. The original 242px green-glass composition is preserved, the CTA routes to the marketing library, motion respects reduced-motion preferences, and light-theme accents now retain AA contrast.

- Removed the card surface from the three GenSocial details headers. Unifying them into `ProfileHeader` earlier today also wrapped them in a `GlassCard` with a glow behind the avatar, which read as a second banner stacked above the page's real content cards. The header now sits directly on the page background again, and dropping the card's padding puts its left edge back in line with the cards below it — measured at `x=335` on desktop and `x=16` on a 393px phone for both. The responsive grid is untouched: this is a surface change only, so the actions that used to paint off-screen on a phone stay reachable.

- Replaced the three GenSocial details headers (Signals, Copy Trading, PAMM) with one `ProfileHeader` component. They were near-duplicate hand-built rows that had drifted apart — each treated its metadata differently and two carried the same favourite-star SVG copied verbatim — and all three were a single `flex items-center` row with no breakpoint and no wrap. On a 393px phone that pushed the primary action clean off the viewport: `Connect now` painted at `left: 835px` on Copy Trading and `left: 486px` on PAMM, clipped by the page container with no horizontal scroll to reach it, so the one thing a visitor can do on the page was unreachable. The header is now a grid that stacks below `lg` into rows sharing the card's left edge — name beside the avatar, badges wrapping, meta line, then the actions — and collapses into the original single row from `lg` with the meta line under the name. It also gained the surface it was missing: it used to float bare on the page background above a grid of glass cards, and now sits in the same `GlassCard` treatment with a glow behind the avatar, which is gradient-filled and ringed instead of a flat disc. The favourite star is a real toggle with `aria-pressed` rather than an inert button, and its hand-drawn 47×44 border path and hardcoded greys give way to themed tokens. The em-dash metadata run (`@csescoe — Signals Provider — 11 followers`) is now dot-separated fragments that wrap cleanly. The PAMM action also read `Connect Row`, a typo for `Connect now` — it opens `ConnectPammModal` — and has been corrected.

- Rebuilt the Copy Trading subscription modal for mobile. The dialog was a two-column `flex` whose summary panel was pinned at `w-[460px] flex-shrink-0`, wider than the phone viewport itself, so the form column was crushed to nothing and the two columns painted over each other — title, field labels and trader profile overlapped into unreadable text. The columns now stack below `lg` and the body scrolls inside a card capped at `90vh`. They are ordered so the stacked view reads profile → summary → form → `Start copying`, matching the `Connect to PAMM` modal, with the desktop arrangement unchanged. The lot-size options drop to one column on a phone and grow with their labels instead of clipping them. The modal also gained a close button: it previously relied on `Escape` or a tap on the sliver of overlay around it, neither of which is reachable on a phone.

- Relabelled the Signal Details header action from `Connect now` to `Follow` and gave it the follow-person icon. The button already opened the follow modal and the page's own right-rail card already called the same action `Follow`, so the header contradicted both. The icon was not new artwork: `FollowPersonIcon` was already declared in the page and never rendered — it is now the button's icon, redrawn at the requested 18×18 viewBox.

- Applied the same banner treatment to the Copy Trading `Master` tab. Its profile banner had the identical structure to the PAMM one — avatar, name and tagline on the left, Social Wallet chip and a fixed 180px `Create strategy` button on the right, all locked in a single `flex` row — so on a phone the name and tagline were crushed into a sliver and the actions ran past the card. The row now stacks below `lg`, the name truncates instead of squeezing its column, and the wallet chip and CTA sit underneath at their natural and full width respectively. The `Master Dashboard` heading no longer shares a row with its search field either. An audit of the rest of the app found no third instance of this banner.

- Unclipped the PAMM manager banner on mobile. The banner was a single `flex` row locked to `h-[7.8125rem]` with `overflow-hidden`, so on a phone the avatar, the manager name, the tagline, the Social Wallet pill and `Create Strategy` all fought for one line: the content overflowed the fixed height and the card cropped the name off the top. The banner now grows with its content below `lg`, the identity block sits on its own row with a truncating name, and the wallet pill and `Create Strategy` stack underneath at full width. The `Manager Dashboard` heading no longer shares a squeezed row with its search field either. Desktop is unchanged.

- Reclaimed the horizontal space in the `Strategy Settings` modal on mobile. The scroll body carried the desktop gutters `pl-[7.3125rem] pr-[6.1875rem]` at every width, so on a 393px phone 216px of the viewport went to padding and the form collapsed into a ~140px column: the title broke over two lines, `Min Investment ($)` and `Max Investors` wrapped inside a two-column grid, and the fixed-height setting rows clipped their descriptions. The gutters drop to 20px below `lg`, the paired number fields stack in the right order, the setting rows size to their content, and `Cancel` / `Save changes` stack full-width instead of overflowing the card.

- Rebuilt the Podcast episode cards for mobile. The fixed desktop row squeezed a 70px episode index, date, long summary, duration and 58px play action into one narrow line; mobile now uses a compact 52px index/date/action header with the summary at full card width. The card height drops to 206px at 360–390px, play targets remain 52px with visible focus, and desktop cards now grow from their 198px minimum when long copy needs more room instead of clipping it.

- Stopped browsers from pinning visitors to an old build. `nginx` served `index.html` with no `Cache-Control`, only an `ETag`, so browsers applied heuristic caching and kept requesting the previous hashed bundle after a deploy — the app looked unchanged even though the new assets were live. `index.html` is now sent as `no-cache, must-revalidate`; the hashed assets keep their one-year `immutable` policy.

- Kept the PAMM strategy search and its view-mode buttons on one row on mobile. The search field was `w-full` below `sm`, so it claimed the whole line and the list/grid toggles wrapped underneath. The field now flexes to the remaining space and the toggles stay beside it, matching the desktop row.

- Rebuilt the `Connect to PAMM` modal for mobile. The dialog was a two-column `flex` whose strategy panel was pinned at `w-[534px] flex-shrink-0`, so on a phone it never shrank: the card clipped it, the `Aum` / `ROI` boxes and the fee values ran past the right edge, and the whole investment form sat off-screen with no way to reach it. The columns now stack below `lg`, the body scrolls inside a card capped at `90vh` with the close button pinned, and the avatar, headings, stat boxes, detail rows and paddings step down to mobile sizes. The desktop layout is unchanged.

- Reordered the mobile Podcast dock stack. The global floating tab bar now sits 24px above the 92px audio player on `/news/podcast`, while the player anchors to the viewport edge and every other route keeps the original 24px tab-bar offset.

- Lifted the Settings profile avatar on mobile. The avatar sat at `top-[7rem]` over an `8rem` banner, so its lower edge reached `12.5rem` while the `Joe Doe` heading started at `11rem` and the circle covered the name. The avatar now straddles the banner edge on mobile and the info block below it clears the overhang.

- Stacked the Settings rows on mobile. Every row (`Profile Picture`, `Theme`, `Change Language`, `AI Coach Widget`, `Change Password`, `Change Email`, `Close Account`) held its label and its control in a fixed two-column row, so on a phone the description column was squeezed to a few words per line and the `Theme` options ran past the card edge. The rows now stack with the control below its description and return to the two-column layout from the `md` breakpoint.

- Restored the canonical `ModeToggle` for all 11 Explore Markets categories while preserving the mobile control stack and full-width search field.

- Made the Settings `Theme` control actually change the theme. `Light` / `Dark` / `Auto` only moved a local index that no one read, so the palette never changed and the choice was lost on reload. The three options now drive the same stored preference the topbar switch uses, `Auto` follows the operating system and repaints live when the system flips, and the pre-paint bootstrap in `index.html` resolves `Auto` so the page no longer flashes dark for a light-system visitor. The topbar switch and the Settings options now read from one source and stay in sync in both directions.

- Levelled the Settings `Theme` options. The selected option renders as a `GlowButton` and the rest as `SparkleButton`, so the selected pill was 38px tall against 48px (46px in light theme) for the others, and the row resized as the selection moved. All three options now share one 96×48 box in both themes.

- Restored the Portfolio Equity line chart on TradeLocker account details. The card stretched to its Account Details sibling, but its chart wrapper asked for `h-full` inside an auto-height parent, so the responsive container resolved to zero height and left an empty surface. The card now lays out as a column and the chart claims the remaining space with a height floor that also holds on mobile, where the card has no sibling to stretch it.

- Replaced the cramped Explore Markets `ModeToggle` with the purpose-built market category rail: a stable `For you` pill, 28px category spacing, asset divider, and touch-scrollable overflow with the native scrollbar hidden.

- Completed a route-wide mobile card-width audit and added a reproducible 47-route, 141-state browser gate covering 780 visible cards and 522 one-column grids at 360px, 430px, and 600px. The audit confirmed that catalog cards now fill their mobile grid tracks while intentionally centered surfaces, modal canvases, tables, artwork, and multi-card compositions retain their structural widths.

- Moved the Explore Markets search field below its category tabs on mobile and made it fill the content width. The desktop layout returns to a single horizontal row from the `md` breakpoint with the original 287px search width.

- Wired the `Share` button in the My Streaming channel hero to the Share Account modal. The modal already shipped and is used from account details; the channel hero button simply had no handler. Opening it keeps the visitor on `/streaming/mystreaming`, and it closes on Escape and on its own close control.

- Wired the `Start streaming` button in the My Streaming channel hero to the streamer application screen. The control rendered and reacted to hover but carried no click handler, so it went nowhere; it now routes to `/streaming/newstreaming`, matching the identical button already shipped on the streaming index.

- Centred the `Forex` / `English` tags with the `Watch now` button in the streaming featured-stream overlay and gave them room to breathe. The tags carried a top margin inside a centre-aligned row, which offset them half a margin below the button, and the row distributed no space at all, so the last tag sat flush against the button. Tags and button now share one baseline and a consistent gap that widens on the largest screens. Mobile keeps its stacked layout unchanged.

- Gave the QR, share, and copy actions in the partner referral-link card a resting background. They previously sat on the exact colour of the card behind them, so the controls only became visible on hover; they now rest on the accent surface and hover one step up the green scale, matching the same icon trio already shipped on `/partner`. Light theme keeps the glyphs white on the hovered accent fill instead of repainting them the accent colour itself.

- Stopped shared `ModeToggle` options from colliding with the pill's rounded edge. Tracks now refuse to shrink below their own label and the container reserves inset padding at every breakpoint, so long options such as `All Levels` on the partner referrals and commissions level bars keep their text inside the control instead of overflowing it. The sliding indicator follows the measured active track rather than an assumed equal slice, and re-measures when a webfont swap or label change reflows the tracks. Added a 17-route × 4-viewport regression matrix asserting label clipping, container edge collisions, indicator alignment, type floor, and document overflow.

- Made 10X Challenge account cards fill the mobile content width through 430px while preserving the 374px design width from the `md` breakpoint. Compacted the narrow-card identity header to prevent its power values from being clipped at 360px.

- Removed the empty 112px mobile Reset action reservation on Assets Management. The Reset row now exists only while filters are active, uses its natural 44px control height, and leaves a consistent 24px gap before Assets History.

- Hid the fixed mobile tab bar whenever the sidebar drawer is open, restoring it automatically when the drawer closes while preserving the desktop sidebar.

- Made content-fitted mobile geometry the canonical shared `ModeToggle` behavior across every consumer. Tabs now keep readable intrinsic spacing, switch to component-owned horizontal scrolling when long option sets exceed the viewport, preserve equal tracks on desktop, and no longer require page-level flags. Added a 12-route mobile regression matrix covering 360px/390px layout, clipping, indicator movement, focus, reduced motion, axe, runtime, and network errors.

- Refined Assets Management on mobile: transaction tabs now allocate width from label content, narrow screens compact the wallet banner clear of the floating navigation, Reset appears as a compact secondary action only when filters are active, and Export lives with the history table. Added responsive, keyboard, reduced-motion, typography, axe, runtime, and network regression QA.

## 2026-08-26

- Added the Figma-matched 10X challenge detail route at `/challenges/details-single-page`, wired every challenge-card `View` action to it, and introduced reusable `ChallengeDrawdownCard`, `ChallengeMetricCard`, and `ChallengePerformanceCard` design-system components using the official Figma MCP tokens and chart artwork from frame `4144:64927`.

- Wired the Journal's AI Coach button to a new `AiCoachModal` recreating the Figma frames Default view (`4037:115702`), AI coach (`4037:115094`), Response got (`4037:113896`), and AI Trade Idea (`4037:114468`) on a 1270×906 canvas, added the `AiCoachChip`, `AiCoachIconChip`, `AiCoachPromptBar`, and `AiCoachTradeChart` design-system components plus the `--color-gfx-purple-well` token, and remapped the purple surface for light theme through the `.ai-coach-surface` palette.

- Wired the sidebar's Leaderboards item to the pixel-perfect `ClaimUsernameModal` from Figma Frame 2085662761 (`4037:116043`), restored the reference username/availability state, documented `PrimaryPillButton` in `/design-system`, and added repeatable desktop/mobile interaction and geometry QA.

- Replaced the Frame 518 accounts area's bespoke tabs, action button, and grid-based table shell with the canonical `ModeToggle`, `SparkleButton`, `SearchInput`, `GlassCard`, `GlowButton`, and semantic table pattern from the GenesisFX design system while preserving filtering, search, and account navigation.

- Replaced the Frame 518 balance hero's bespoke card and secondary actions with the canonical `GlassBannerCard` and four `SparkleButton` controls from the GenesisFX design system.

- Replaced the `/home` dashboard body with the Figma Frame 518 composition (`4037:117903`): balance hero, eight product cards, account filters/search, and the two-row trading accounts table, reusing the existing GenesisFX design-system controls and route behavior.

- Tightened the Switch Modes label-to-toggle spacing to Tailwind `gap-5`.

- Moved the sidebar divider's vertical spacing from legacy CSS to the Tailwind `py-5` utility.

- Standardized the fixed sidebar footer regions on Tailwind's `gap-7.5` spacing utility (1.875rem / 30px), removed arbitrary pixel gap classes, and corrected the Switch Modes label contrast in light theme with the semantic neutral token.

- Restored the Figma spacing rhythm between the fixed sidebar blocks with Tailwind utilities: 35px from Genesis Tutorials to Switch Modes, 16px from the label to the mode toggle, and 44px from the toggle to Logout, with a compact fallback for short viewports.

- Compacted the sidebar's fixed header and footer spacing so the closed Overview menu fits without scrolling at 1920×1080, while expanded submenus still scroll inside Overview; rebuilt Genesis Tutorials from the supplied design as Tailwind-only markup.

- Restricted sidebar scrolling to the Overview navigation region so the logo/tagline header and the Genesis Tutorials/mode/logout footer remain visible within `100dvh`.

- Restored the sidebar mode selector to the shared `ModeToggle` component appearance by removing its Figma-specific rectangular height, border, background, and radius overrides.

- Removed the sidebar's decorative glow component and changed GenSocial to start collapsed instead of reopening automatically on mount or route changes.

- Rebuilt the left sidebar from Figma frame `4037:118295`: exact 315px shell, navigation rhythm and states, expanded GenSocial menu, Leaderboards/Streaming/Market Watch/Academy entries, Genesis Tutorials card, mode switch, and footer alignment.

- Clipped the sidebar's decorative glow inside a rail-sized wrapper so it cannot create a hidden horizontal scroll area.

- Removed the User Account card from the left sidebar, including its dedicated divider, glow, and theme-specific styles.

- Changed the Journal Strategy DNA archetype card from pill-shaped `rounded-full` corners to the standard `rounded-md` card radius.

- Centered the sidebar collapse toggle in the collapsed rail, since the zero-width logo left `justify-between` pinning it to the right edge instead of aligning it with the User Account avatar below.

- Fixed the light-theme User Account card collapsing incorrectly: its geometry and copy block are now scoped to the expanded sidebar, so the collapsed rail centers the avatar and hides the name and date exactly like dark theme. The light rules outranked the collapsed-state rules on specificity, which kept the expanded 273px box and its text inside the 72px rail.

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
