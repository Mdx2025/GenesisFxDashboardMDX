# Website Working State
<!-- website-delivery-state -->

## Active Task — Journal mobile AI control gradient

- task_id: `genesis-journal-mobile-ai-gradient-20260811`
- owner: `klark`
- target_route: `/tradelocker/journal`
- status: `validated locally`
- design_route: `dashboard / analytics / pattern-analytics-dashboard / supplied gradient + existing codebase / existing GenesisFX direction`
- visual_thesis: Keep the paired AI controls visually consistent; mobile uses the supplied lavender surface and tablet/desktop retain the established dark-purple gradient.
- scope_guard: Only the responsive backgrounds of `AiCoachButton` and `ChatButton`; no icon, label, geometry, interaction, theme-token, or desktop changes.
- quality_contract: `WCAG 2.2 AA`; preserve 16px text and existing focus/target behavior; validate exact computed gradients at 390px and 768px+, no overflow, build integration, and runtime errors.
- current_phase: local validation complete; delivery in progress.
- validation_evidence: Managed build `bg_msph9gf0_70f2ab0c` passed (`tsc -b`, Vite 6.4.3, 245 modules) and its artifact was approved. Generated CSS contains the exact mobile `linear-gradient(266deg,#f4ebff .95%,#f2e8ff 79.28%)` plus the `@media(min-width:48rem)` restoration to `linear-gradient(241deg,#100919,#1d0e2f)`.
- next_exact_action: Commit/push, deploy through Dokploy, and verify the production bundle serves the new responsive CSS.

## Active Task — Platforms light card surfaces

- task_id: `genesis-platforms-light-card-surfaces-20260811`
- owner: `klark`
- target_route: `/tradelocker/accounts?tab=platforms`
- status: `done`
- design_route: `dashboard / operations / pattern-analytics-dashboard / supplied screenshot + existing codebase / existing soft-monochrome GenesisFX light theme`
- visual_thesis: Preserve the current Platforms composition and dark theme; only promote the five light-theme platform cards from the shared recessed `#ECECEC` token to the supplied pure-white surface.
- scope_guard: No global token changes, no typography/copy/icon/button/layout changes, and no new dependency.
- quality_contract: `WCAG 2.2 AA`; zero visible text below 12px; verify computed `rgb(255,255,255)` on all five cards, contrast, keyboard/focus, reduced motion, 200% zoom, 390x844/1280x800/1920x1080 layout, dark-theme preservation, build, and runtime errors.
- highest_risk_selector: `.platform-card` under `html[data-theme='light']`; shared `bg-gfx-green-800` must remain unchanged elsewhere and in dark theme.
- current_phase: done.
- validation_evidence: Managed production build `bg_mspgsio8_d1fb0d01` passed and its artifact was approved. Local and production Playwright passed light/dark at 390x844, 1280x800, and 1920x1080: five exact white light cards, unchanged `#0C1311` dark cards, HTTP 200, zero runtime errors, zero horizontal overflow, zero visible text below 12px, keyboard focus visible, WCAG AA text contrast, and no clipping at 200% text size. Commit `875a1b7` is pushed; Dokploy deployment `aG7Qi1HuavVihosvl8tO5` finished `done`.
- next_exact_action: none; await user review.

## Active Task — Light close icons and GreenPillButton

- task_id: `genesis-light-green-pill-close-icons-20260811`
- owner: `klark`
- target_routes: `/assets-management`, `/design-system`, and modal surfaces using the supplied 24px close icon
- status: `done`
- outcome: In light theme only, set `--color-gfx-green-200` to `#C6C6C6`, render the supplied close-icon paths in `#00B38C`, and match `GreenPillButton` to the supplied 107x46 tertiary-pill specification while preserving dark theme.
- visual_thesis: Keep the dark glass control untouched; the light control becomes a quiet mint tertiary action with exact Figma geometry and black medium-weight label.
- scope_guard: No component API changes, no new dependency, no copy or interaction changes, no broad recoloring of unrelated white SVG paths.
- quality_contract: WCAG 2.2 AA where not reference-locked; typography floor 16px for the touched button; viewports 390x844, 1280x800, 1920x1080; verify keyboard focus, reduced motion, exact computed dimensions/colors, overflow, and runtime errors in light/dark.
- current_phase: done.
- validation_evidence: Managed build `bg_mspfwprl_0ce768f8` passed with 245 modules and approved artifact receipt; local Playwright passed light/dark at 390x844, 1280x800, and 1920x1080 with exact token/button/icon styles, keyboard-visible close control, reduced motion, zero overflow, and zero runtime errors. Black on `#9FE4CD` measures 14.45:1.
- production_evidence: Commit `33524ec` pushed to `origin/main`; Dokploy deployment `6smDUYfGlDGFAxektI4dc` finished `done`. Production Playwright repeated all six light/dark viewport checks with HTTP 200, exact styles, keyboard-visible close control, 24x24 layout target, reduced motion, zero overflow, and zero runtime errors. Final capture: `/home/clawd/genesisfx-light-green-pill-final.png`.
- blockers: none.
- next_exact_action: none; await user review.

- task_id: `genesis-fx-journal-chart-refinement-20260804`
- owner: `matrix`
- thread_or_session: `discord:channel:1481411151005876337:message:1534373444890792069`
- updated_at: `2026-08-04T21:32:16-04:00`
- repository: `/home/clawd/.openclaw/workspace/GenesisFxDashboardMDX`
- branch: `main`
- target_route: `/tradelocker/journal`
- status: `done`

## Active Task — Journal chart refinement

- outcome: Reuse the `/home` Portfolio Equity chart in the Journal Net P&L card, center SparkleButton content, and rebuild the Statistics Genesis Score graphic as the supplied empty five-axis radar reference at full available card height.
- in_scope: `JournalPage`, `StatisticsView`, `SparkleButton`, reference-native responsive chart geometry, accessibility semantics, local/production QA, commit, push, and Dokploy deploy.
- out_of_scope: Journal fixtures/copy, tab architecture, other charts, API/data integration, unrelated generated `dist` files.

```yaml
design_route:
  surface: dashboard
  archetype: analytics
  pattern_pack: pattern-analytics-dashboard
  evidence: supplied screenshot + existing codebase
  style: soft-monochrome-ops-dashboard adapted to existing dark GenesisFX tokens
dials:
  design_variance: 1
  motion_intensity: 1
  visual_density: 7
  art_direction: 3
  implementation_clarity: 10
  image_usage_priority: 1
  spacing_generosity: 4
```

- visual_thesis: Preserve the existing dark operational dashboard; charts remain restrained, functional, and code-native. Net P&L uses the already-approved angular Portfolio Equity visual language. Genesis Score becomes an empty five-ring pentagonal diagnostic scaffold with only muted grid/axis lines and perimeter labels, exactly as the supplied transparent reference.
- reference: `/home/clawd/.openclaw/media/inbound/Group_2085662830---ee487db5-c8dd-45d8-b51c-d95cd56c71d0.png` (`454x357`, transparent RGBA).
- reference_map: `REFERENCE_MAP.md` (independent verification required before implementation).
- graphic_must_prove: Genesis Score currently has no plotted score profile; the chart communicates the five evaluation dimensions without fabricating data.
- locked_geometry: five concentric pentagons, five center-to-vertex axes, top vertex at Win%, labels clockwise `Win%`, `Profit factor`, `Avg win/loss`, `Risk to Reward`, `Consistency`; no data polygon or dots; transparent background; full available chart region.
- anti_patterns: no fabricated radar data, no decorative glow inside the radar, no new dependency, no raster runtime substitution, no changes to KPI copy, no perpetual animation.

### Active Quality Contract

- target: `WCAG 2.2 AA`
- typography_floor: `12px supplementary UI; 14px compact body; 16px preferred body`
- contrast: `4.5:1 normal text; 3:1 meaningful graphics and focus indicators`
- high_risk_selectors_or_states: Net P&L canvas containment, Genesis Score radar labels/height, SparkleButton icon centering, Statistics tab at narrow widths, 200% zoom.
- required_viewports: `390x844`, `1024x768`, `1536x864`.
- required_interactions: tab activation, SparkleButton keyboard focus, reduced-motion stable chart output, code-native graphics with accessible names.
- evidence_plan: TypeScript/build integration, structured layout QA, exact reference comparison for the radar, computed typography/contrast, keyboard/focus, reduced motion, task-scoped automated accessibility, runtime error review, production smoke.

### Active Execution

- current_phase: `done`
- completed: independent reference verification passed; Net P&L reuses `PortfolioChart`; SparkleButton content layer centers all children; Genesis Score uses a responsive empty five-ring SVG; TypeScript and local responsive/fidelity/zoom QA passed; commit `300d697` pushed; Dokploy rebuild `ZzqAgLn1jhDYFIUFpHlTh` completed `done`; production responsive QA and HTTP/bundle smoke passed.
- blockers: none. The local foreground `pnpm build` was rejected before execution by host admission pressure (`event_loop_p99 825.8ms`); Dokploy's successful Docker build and production runtime were used as the integration gate.
- next_exact_action: none; await user review.

### Active Validation Evidence

- `2026-08-04 09:47 PM AST` — `git diff --check` and `pnpm exec tsc -b --pretty false` — pass.
- `2026-08-04 09:55 PM AST` — responsive Playwright at `390x844`, `1024x768`, `1536x864` — pass: zero overflow, zero console/page errors, reduced-motion canvas stable, touched-component small text below 12px = 0.
- Net P&L `PortfolioChart` canvas: `308x170`, `304x208`, `518x208` across the three viewports.
- SparkleButton share geometry: button `52x52`, icon `18x18`, center delta `0px` on both axes; keyboard focus reached.
- Genesis Score radar: five polygons, zero radial lines, zero circles/data markers; exact five labels; `454x357` viewBox; responsive boxes `308x288`, `682x536.28`, `518x471`.
- label contrast: `#808080` over `#040B09` = `5.03:1`; grid is reference-locked decorative scaffolding and does not encode data.
- `200%` zoom: all five SVG text bounding boxes remain inside the viewBox.
- fidelity: normalized live SVG versus supplied PNG MAE `0.0138396`; opaque white source artifacts intentionally excluded.
- evidence: `/home/clawd/genesis-journal-qa.json`, `/home/clawd/genesis-journal-overview-local.png`, `/home/clawd/genesis-journal-statistics-local.png`, `/home/clawd/genesis-score-radar-normalized.png`.
- `2026-08-04 09:58 PM AST` — Dokploy rebuild `ZzqAgLn1jhDYFIUFpHlTh` — `done`, no error.
- `2026-08-04 10:00 PM AST` — production Playwright — same three-viewport assertions passed with zero runtime errors; evidence `/home/clawd/genesis-journal-production-qa.json`.
- production smoke: HTTP `200` on `/`, `/home`, `/tradelocker/journal`, and SPA fallback; assets `index-CJ-DUPoT.js` and `index-DZ6PVyqm.css`; all four feature markers present.

## Scope

- outcome: Replace only the Total Balance mini chart with a responsive Chart.js rendering that reproduces the supplied six-month equalizer reference.
- audience: GenesisFX dashboard users scanning balance history.
- conversion_goal: Preserve the existing KPI copy while making the six-month balance pattern immediately legible.
- in_scope: `SummaryCards`, `MiniBarChart`, Total Balance fixture values required to match the reference, responsive chart rendering, visual QA.
- out_of_scope: Other KPI cards, navigation, copy, API/data integration, auth, commit/push/deploy unless separately requested.

## Locked Direction

```yaml
design_route:
  surface: dashboard
  archetype: analytics
  pattern_pack: pattern-analytics-dashboard
  evidence: screenshot + existing codebase
  style: explicit-thesis
dials:
  design_variance: 1
  motion_intensity: 1
  visual_density: 7
  art_direction: 4
  implementation_clarity: 10
  image_usage_priority: 1
  spacing_generosity: 4
```

- primary_style_pack_or_thesis: Preserve the existing dark GenesisFX glass KPI card and reproduce the supplied compact equalizer chart exactly: six isolated rounded bars, a bright emerald-to-near-black vertical fade, no grid or visible Y axis, and compact white month labels.
- evidence_sources: `/home/clawd/.openclaw/media/inbound/Group_2085662829---fc0b34c3-aa22-47df-bc39-209928842975.png` (`181x89`) and the existing `SummaryCard`/`MiniBarChart` implementation.
- graphic_must_prove: The balance varies materially month-to-month, peaking in August and falling to a minimal November value.
- memorable_spatial_or_motion_idea: Six evenly spaced 20px bars on one baseline, using luminous top edges and a dark fade instead of axes or decoration.
- anti_patterns: No raster image substitution, no extra chart library, no invented gridlines, no copy changes, no perpetual animation, no gradient/glow outside the reference geometry.

## Experience Structure

1. `/home` Summary Cards — preserve the existing four-card grid and all KPI text.
2. Total Balance chart — render June through November as responsive Chart.js bars matching the supplied geometry and palette.

## Assets

- manifest: `design/asset-manifest.json`
- approved: `total-balance-chart-reference` at the supplied inbound path.
- missing_or_blocked: none.

## Quality Contract

- target: `WCAG 2.2 AA`
- typography_floor: `12px supplementary UI; 14px compact body; 16px preferred body`
- contrast: `4.5:1 normal text; 3:1 large text and meaningful UI components`
- high_risk_selectors_or_states: Total Balance canvas, month labels, chart containment at narrow card widths, dark/light theme contrast, tooltip, 200% zoom.
- required_viewports: `390x844`, `1024x768`, `1536x864`.
- required_interactions: Keyboard/focus unaffected, reduced-motion static rendering, canvas failure fallback/accessibility label; the compact chart is a labeled static graphic rather than an interactive control.
- evidence_plan: Production build, structured layout QA, component screenshot comparison, computed typography, measured label contrast, reduced-motion check, axe when available, console/page/failed-request review.

## Execution

- current_phase: `done`
- completed: Chart.js component implemented; supplied `181x89` geometry reproduced; TypeScript/build passed; 21/21 structured responsive checks passed; reduced-motion output stable; final card screenshot captured.
- locked_decisions: Use existing Chart.js 4.5.1; preserve all card copy; render six 20px bars centered at 15/45/75/105/135/165 on a `181x89` canvas, use a 23px custom-label band, and expose the complete month/value trend in the canvas accessible name.
- open_decisions: none.
- blockers: none.
- next_exact_action: none; await explicit commit/push/deploy instruction.

## Handoffs

- none.

## Definition of Done

- [x] Total Balance chart matches the supplied bar geometry, color fade, radii, spacing, and month labels.
- [x] Existing Total Balance title, value, and change copy remain unchanged.
- [x] Reference asset remains documentation only; runtime uses Chart.js.
- [x] Desktop/mobile/reduced-motion/failure behavior validated.
- [x] Delivery Quality Gate passed for the touched static chart with computed typography, measured contrast, keyboard/focus, reduced-motion, responsive, task-scoped automated checks, runtime-error review, and build evidence.
- [x] Build/typecheck passes.
- [x] Browser/layout/visual QA passes.
- [x] Final commit/deploy state recorded: uncommitted local changes on `main`; no push or deploy requested/performed.

## Validation Evidence

- `2026-08-04 06:23 PM AST` — `pnpm exec tsc -b --pretty false` — pass — no TypeScript errors.
- `2026-08-04 06:33 PM AST` — managed `pnpm build` — pass, Vite 236 modules in 6.67s — job `bg_msf8c8un_c2e63532`, approved artifact receipt `d581192874407d98e8026d18bd1a8095bb111961d55d68995cab3b376e4cbf22`.
- `2026-08-04 06:35 PM AST` — structured layout QA at `390x844`, `1024x768`, `1920x1080` — 21/21 pass — `/home/clawd/genesis-total-balance-layout-{mobile,tablet,desktop}.json`.
- `2026-08-04 06:35 PM AST` — typography — zero visible DOM text below 12px in the touched card; canvas month labels configured at 12px.
- `2026-08-04 06:35 PM AST` — contrast — canvas labels `#ECECEC` over `#040B09` measure `16.82:1`.
- `2026-08-04 06:35 PM AST` — keyboard-focus — static canvas has `tabIndex=-1`, semantic `role=img`, and a complete accessible name; no focus order was added or changed.
- `2026-08-04 06:35 PM AST` — reduced-motion — canvas data URL remained byte-identical after 500ms in `prefers-reduced-motion: reduce` at all three viewports.
- `2026-08-04 06:35 PM AST` — task-scoped automated accessibility — 0 touched-component violations across accessible name, role, focus exclusion, 12px label floor, contrast, containment, and reduced-motion checks.
- `2026-08-04 06:35 PM AST` — runtime-errors — zero page errors; one pre-existing failed request remains for `/fonts/AcidGrotesk-Regular.otf`, already documented in the project code map. The chart has an explicit Arial/sans fallback.
- `2026-08-04 06:35 PM AST` — fidelity — native canvas `181x89`; ImageMagick MAE versus the supplied raster `0.0428886`; final card `/home/clawd/.openclaw/media/outbound/genesis-total-balance-card-local.png`.

Required evidence labels: `build`, `typography`, `contrast`, `responsive`, `keyboard-focus`, `reduced-motion`, `automated-a11y`, `runtime-errors`.

## Remaining Risk

- Pre-existing global Acid Grotesk request remains a 404 outside this chart-only scope; the chart renders the validated sans fallback. No source commit, push, or deploy has been performed.

## Follow-up — Portfolio Equity trading curve

- source: existing `/home` production render plus user direction in `discord:1534352756494700697`.
- scope: sharpen only the Portfolio Equity curve; preserve KPI copy, card layout, period selector, grid, highlight marker, colors, and tooltip behavior.
- design_route: dashboard / analytics / pattern-analytics-dashboard / existing codebase / explicit-thesis.
- visual thesis: a professional trading equity curve should expose gains, drawdowns, and recoveries through straight segments and pointed turning points, not a smoothed mountain silhouette.
- quality_contract: WCAG 2.2 AA; static labeled canvas; preserve existing typography and contrast; responsive checks at `390x844`, `1024x768`, and `1536x864`; reduced-motion stable; no keyboard/focus order changes; runtime errors reviewed.
- current_phase: ready-for-review.
- completed: current production render and Chart.js configuration audited; root cause identified as `tension: 0.45`; data and rendering changed to linear segments with miter joins and a trading-like equity sequence; axis labels raised from 10px to the 12px UI floor with stronger contrast; reduced-motion mode disables Chart.js animation; typecheck/build and responsive browser QA passed; final local screenshot captured.
- blockers: none.
- validation: TypeScript passed; managed build `bg_msfc4e7p_e9f5f957` passed and receipt `5c3e9354551f16145d7a5937ae0628553d8382edb13ae50689031f9788cb4666` was approved; built-dist QA passed 13/13 across `390x844`, `1024x768`, and `1536x864`; axis label contrast is `5.48:1`; reduced-motion canvas was byte-stable; no page errors; known pre-existing Acid Grotesk 404 remains.
- next_exact_action: await user review; no commit or deploy without explicit approval.

## Follow-up — Total Equity candlestick reference

- source: `/home/clawd/.openclaw/media/inbound/Group_2085662355---dde48491-9aa1-47b8-bafe-3b38c80d7bc5.png` (`181x80`, transparent, Figma export), requested in `discord:1534347050836168776`.
- scope: replace only the Total Equity chart geometry with a Chart.js-rendered eight-candle pattern; preserve `Total Equity`, `$11,246.00`, and `-$1,258.36 (10.1%)`.
- design_route: dashboard / analytics / pattern-analytics-dashboard / screenshot + existing codebase / explicit-thesis.
- visual thesis: eight evenly spaced 8px candle bodies at the reference-native `181x80` ratio, with exact red/green sequence, body/wick bounds, rounded bodies, and compact colored glow on a transparent canvas.
- quality_contract: WCAG 2.2 AA; preserve existing typography and contrast; static labeled canvas; responsive checks at 390x844, 1024x768, and 1536x864; reduced-motion stable; keyboard/focus order unchanged; browser/runtime errors reviewed.
- period selector: retain the selected button geometry and semantics, but replace the solid outline with the previous `0.5px` green top-edge masked border.
- current_phase: done.
- completed: Chart.js reference geometry implemented; PeriodPill border restored; TypeScript passed; local and production responsive QA passed; keyboard, selected state, reduced motion, and runtime errors passed; native canvas MAE versus reference is `0.0183718` with geometry within 1px; commit `6f26fb2` pushed and Dokploy deployment `twbWWFe7DMZD1jkQHaDJk` completed `done`.
- blockers: none. The local heavy build was rejected by host CPU admission, but Dokploy's Docker build passed and production assets/runtime were verified.
- next_exact_action: none; await user review.

## Follow-up — Period Selector active item

- source: user-supplied HTML in `discord:1534322008190615602`.
- scope: replace only the reusable `PeriodPill` selected-state visual with Tailwind; preserve period behavior and surrounding composition.
- visual thesis: exact compact selected pill — `53.06x32.35px`, `#064B34`, `1.35px #00B38C` inset outline, `60px` radius, 12px Acid Grotesk label, clipped `#CFF2E6` bottom bloom.
- high_risk_states: selected item alignment, keyboard activation, focus-visible, 12px floor, narrow-screen overflow, reduced motion.
- implementation: active visual is rendered inside the selected native button; no GSAP/ref positioning, so semantic and visual selection cannot desynchronize.
- validation_status: final build `bg_msf9dsbd_5b6a0a42` queued; final responsive and interaction QA pending.
