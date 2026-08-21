# Streaming page — visual reference map

STATUS: VERIFIED by independent verifier

## 1. Source references

- Figma file: `Q5LFMKpcKD2ChXj9pyiHwk`
- Section: `4037:107869` — `home streaming`
- `frame_1.png`: node `4037:107870` — Home/Streaming — `/home/clawd/genesis-streaming-home-figma.png` (`1920×2043`)
- `frame_2.png`: node `4037:108175` — Browse — `/home/clawd/genesis-streaming-browse-figma.png` (`1920×1487`)
- `frame_3.png`: node `4037:108442` — Following populated — `/home/clawd/genesis-streaming-following-a-figma.png` (`1920×1080`)
- `frame_4.png`: node `4037:108629` — Following empty — `/home/clawd/genesis-streaming-following-b-figma.png` (`1920×1080`)
- `frame_5.png`: node `4037:108784` — Replays — `/home/clawd/genesis-streaming-replays-figma.png` (`1920×1487`)

## 2. Section map — shared page shell

- All states visibly share the same dashboard-style sidebar and top bar. The page content begins after the `315px` sidebar.
- Content has approximately `29–34px` internal left padding. The breadcrumb reads `Streaming`.
- Heading is `Streaming`, rendered at approximately `50px`, with a small red outlined `Live` badge immediately to its right.
- Two right-aligned actions sit on the heading row: dark secondary `My streams` (`171×46`) and pale primary `Start streaming` (`197×44`).
- The four-state mode control begins at content `x=29`, `y=206`, height `46px`, with labels `Home`, `Browse`, `Replays`, and `Following`. The visible bar is `532px` wide; the selected segment has a teal glow.
- The rasters visibly use near-black page surfaces, dark green raised surfaces, green borders/active accents, white headings, and muted gray body text. **Non-visual design metadata (not independently verifiable from raster alone):** page surface `#000705`; raised surfaces `#0C1311` / `#09241C`; green border and active color `#064B34` / `#00B38C`; body `#808080`; font family `fff acid grotesk`.
- Citation: `frame_1.png`, `frame_2.png`, `frame_3.png`, `frame_4.png`, `frame_5.png`.

## 3. Home / Streaming state

- Main featured stream card: content `x=29`, `y=307`, `992×561px`; chart/video fills the surface and a dark `956×111px` footer overlays the bottom.
- Footer contains circular `S` avatar, `Stream Test`, `EURUSD`, `Forex`, `English`, and pale `Watch now` button.
- Chat panel: content `x=1046`, `y=307`, `532×561px`; header `Chat` + `LIVE`, inner live-chat surface `493×448px`, joined-state line, and bottom message composer.
- `Top Live Categories` starts at `y=944`; six `255×297px` cards begin at `y=1006` with `15px` horizontal gaps. Labels: All, Forex, Crypto, Indices, Stocks, News & Analysis.
- Prize banner: content `x=29`, `y=1323`, `1529×217px`; copy `Win $10,000 Cash Prize` and `Stream live • Compete • Get Paid`, with `Enter Now` at right.
- `Live channels (1)` begins at `y=1617`; one stream card is `381×319px` at `x=29`, `y=1679`.
- Citation: `frame_1.png`.

## 4. Browse state

- Same header/actions/mode control with Browse selected.
- Search field is right-aligned below actions (`Search streams, symbols..`).
- Hero banner below tabs reads `Genesis Live`, `Browse live trading`, and `1 stream live now`, on a dark green dotted/glow surface.
- Category pills appear at content `y=528`: Forex 1, Crypto 0, Indices 0, Stocks 1, Commodities 1, News & Analysis 0, Scalping 0, Education 0.
- `Live now (1)` starts at `y=596` with one `381×319px` stream card at `x=29`, `y=633`.
- A centered `Browse by category` divider sits at `y=978`; `Forex (1 live)` starts at `y=1026`, with another stream card at `y=1063`.
- Citation: `frame_2.png`.

## 5. Replays state

- Same header/actions/mode control with Replays selected.
- Search field: content `x≈29`, `y≈287`, `764.5×44.2px`, placeholder `Search replays...`.
- Right-side segmented filter has `All replays` selected and `My favorites (0)` with heart icon.
- `Recent replays (1 live)` begins at content `y=389`.
- Three stream cards are aligned in one row at content `x=29`, `423`, and `817`, `381×319px` each. Their categories are FOREX, NEWS & ANALYSIS, and COMMODITIES.
- Citation: `frame_5.png`.

## 6. Following states

### Populated

- Following is selected. The same `Search replays...` field appears at `x≈29`, `y≈287`, `764.5×44.2px`.
- `Recent replays (1 live)` begins at `y=389`; one `381×319px` stream card starts at `x=29`, `y=426`.
- The card action is an active teal `Follow` state with check icon.
- Citation: `frame_3.png`.

### Empty

- Following remains selected and the search field remains visible.
- A large outlined empty-state surface spans most of the content below search.
- Center copy: `You don’t follow anyone yet`; supporting text: `Open a stream and tap Follow to see their live broadcasts here.`; pale pill action: `Browse channels`.
- Citation: `frame_4.png`.

## 7. Interaction map — non-visual/inferred

- **Non-visual/inferred:** Continue from the Streaming username modal navigates to `/streaming`.
- **Non-visual/inferred:** Mode control switches Home, Browse, Replays, and Following without leaving `/streaming`.
- **Non-visual/inferred:** Following supports both a populated and empty dataset state; the initial mock state should preserve one visible followed stream while code keeps the empty variant reusable.
- **Non-visual/inferred:** Search and category/filter controls are client-side mock interactions; no streaming backend is established by the static Figma references.
- **Non-visual/inferred:** `Browse channels` switches the active mode to Browse.
- Visual references do not establish network/API behavior, real playback, chat delivery, or Start streaming/My streams destinations.

## 8. Signature moments

- `frame_1.png`: two-column featured trading chart + live chat, followed by the six-card categories strip and full-width cash-prize banner.
- `frame_2.png`: Browse hero with dotted green atmosphere, category pill row, and two vertically separated stream sections.
- `frame_5.png`: sparse Replays canvas with three equal stream cards and the right-aligned All replays/My favorites filter.

## 9. Responsive inference

- **Non-visual/inferred:** Figma provides desktop frames only. For mobile/tablet, preserve hierarchy, allow tabs/category pills horizontal scrolling, stack the Home chart/chat columns, and wrap stream cards without document-level horizontal overflow.
- Light theme is not depicted by these references. **Non-visual/inferred:** use the established semantic light-theme tokens and preserve the same hierarchy, dimensions, borders, and green accents.

## 10. Implementation validation

- Local browser QA at `1920×1027` verified the Home feature surface at `x=343`, `y=306.797`, `992×561px` and the chat surface at `x=1359`, `y=306.797`, `532×561px`.
- Home exposes six category cards and one live channel; Browse exposes two stream cards; Replays exposes three; Following exposes one and transitions to the reusable empty state.
- Continue from the Streaming username modal lands on `/streaming`; Browse channels returns the empty Following state to Browse.
- Dark, semantic light, and `390×844` mobile states passed without runtime errors, failed responses, or document-level horizontal overflow.

## 11. Operator refinement — chat, categories, prize banner, and live channel

- Source: operator screenshot plus the two attached HTML/CSS geometry specifications received 2026-08-21.
- Design route: `surface=dashboard`, `archetype=analytics`, `pattern_pack=pattern-analytics-dashboard`, `evidence=operator screenshot + supplied HTML + live codebase`, `style=existing GenesisFX glass-dashboard thesis`.
- Visual thesis: preserve the shipped Streaming composition while replacing its four manually approximated surfaces with the project primitives and exact supplied geometry.
- Locked geometry: outer Chat remains `532×561px`; inner Live Chat is `493×448px` with `30px` radius and a `70px` composer; Live Channel card is `381×319px` with a `381×220px` media well.
- Interaction: Top Live Categories uses the installed Swiper, pointer drag, keyboard navigation, and visible previous/next single-pointer controls; no native horizontal scrollbar.
- Quality contract: WCAG 2.2 AA; no visible text below `12px`; normal text contrast `>=4.5:1`, meaningful UI/focus `>=3:1`; mobile, intermediate, and desktop containment; keyboard/focus, reduced-motion, 200% reflow, runtime errors, failed requests, and build integration checked.
- Highest risk: Swiper keyboard/drag parity, fixed reference geometry at narrow widths, the intentionally dark Live Chat surface under light theme, and icon-only send/carousel controls.
- Local validation: visual-map gate and `pnpm build` passed (`282` modules). Browser QA passed Home/Browse/Replays/Following, dark/light, `1920×1027`, `960×900`, and `390×844`: Chat uses one light `GlassCard`; Live Chat is exactly `493×448px` with `30px` radius; composer is `70px`; send control is `62×44px`; prize uses one `GlassBannerCard`; Live Channel is exactly `381×319px`; Swiper has six slides, hidden overflow, working pointer drag, keyboard controls, and `allowTouchMove=true`; zero text below `12px`, horizontal overflow, runtime errors, or failed responses.
- Accessibility evidence: send control exposes a visible focus ring; reduced-motion mode retains all four Home surfaces; measured text contrast ratios are danger `4.74:1`, muted `4.76:1`, joined-state `11.01:1`, white `18.80:1`, and green accent `7.01:1`. No axe/Lighthouse package is installed in the repo, so automated WCAG auditing remains not tested; targeted semantic, keyboard, focus, target-size, contrast, reduced-motion, and reflow checks passed.

## 12. Operator refinement — streaming header actions

- Source: operator screenshot and supplied `18×18px` broadcast/play SVG received 2026-08-21.
- Observed geometry: `My streams` is `171×46px`; `Start streaming` is `197×44px`; both remain horizontally aligned with a `12px` gap at desktop and may wrap on narrow screens.
- Component contract: `My streams` uses the existing `SparkleButton`; `Start streaming` uses the existing `GlowButton` with the supplied SVG placed before the label.
- Quality contract: preserve stable dimensions, black icon paint on the light GlowButton fill, native button semantics, visible focus treatment, `44px` minimum primary target height, no mobile overflow, and semantic light-theme parity.
- Highest risk: SparkleButton's default/light-theme geometry overriding the locked `171×46px` dimensions, or the icon inheriting GlowButton's light-theme label color instead of remaining black.
- Local validation: `pnpm build` passed (`282` modules). Browser QA passed dark/light at `1920×1027`, intermediate `960×900`, and mobile `390×844`; the measured actions are exactly `171×46px` and `197×44px`, the supplied icon is exactly `18×18px` and precedes the label, both component identities are verified, and there are zero runtime errors, failed responses, or horizontal overflow. Automated axe/Lighthouse remains not tested because neither package is installed; the existing native-button semantics, global focus-visible treatment, reduced-motion, typography-floor, and responsive checks passed.
