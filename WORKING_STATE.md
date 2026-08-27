# Website Working State
<!-- website-delivery-state -->

## Coordination — shared worktree rules (all agents)

This checkout is used simultaneously by several agents and git authorship is
identical for all of them, so authorship cannot tell us apart. Before touching a
file, claim it here.

- claim first: open an `## Active Task` block with `owner`, `status: in-progress`
  and an explicit `scope_lock` (exact paths) before the first edit.
- never `git add -A`, `git add .`, `git stash`, `git checkout --` or
  `git reset --hard` in this tree: another agent's uncommitted work is usually
  live in it. Commit only the exact `src/` paths you named in your `scope_lock`.
- `dist/` churn is local build noise and is not committed.
- if a file you need shows up modified and it is outside your `scope_lock`,
  stop and coordinate instead of committing it.

### Live ownership snapshot — 2026-08-26

- `star`: Challenges (`e1c6ebc`, `6500734`, `dbe421f` on `main`) plus in-flight
  uncommitted edits in this tree: `src/components/ui/ModeToggle.css`,
  `src/components/ui/ModeToggle.tsx`, `src/pages/AcademyPage.tsx`. Do not touch.
- `artemis`: News / AI Analysis (`838337a`, deployed). No open scope; idle,
  awaiting assignment.

## Active Task — ModeToggle canonical mobile spacing

- task_id: `genesis-mode-toggle-mobile-default-20260827`
- owner: `star`
- status: `ready-to-deploy`
- scope_lock: `src/components/ui/ModeToggle.tsx`,
  `src/components/ui/ModeToggle.css`, `src/pages/AssetsManagementPage.tsx`,
  `src/pages/AcademyPage.tsx`, `e2e/mode-toggle-mobile-qa.mjs`,
  `WORKING_STATE.md`, `CHANGELOG.md`
- request: move the content-fitted mobile tab geometry from page-level opt-in
  into the shared ModeToggle so every consumer receives the same spacing.
- design_route: `surface=dashboard`, `archetype=operations`,
  `pattern_pack=pattern-analytics-dashboard`, `evidence=live codebase + shipped
  Assets Management behavior`, `style=existing GenesisFX glass-dashboard thesis`.
- visual_thesis: preserve the existing ModeToggle appearance and desktop equal
  tracks while making mobile labels define their own safe, readable tracks for
  every shared-component consumer.
- quality_contract: WCAG 2.2 AA; 12px visible-text floor; 24px minimum targets;
  no overlap or horizontal overflow at 360px/390px; keyboard/focus and reduced
  motion preserved; build and representative cross-route browser QA must pass.
- highest_risk: multi-option consumers with long labels, icon-bearing options,
  active-indicator geometry after resize, and accidental desktop changes.
- implementation: removed the page-level `fitContentOnMobile` API and made
  content-fitted indicator geometry canonical below 640px. Mobile buttons grow
  to fill available space without shrinking below their content width; long
  option sets scroll inside ModeToggle with a hidden scrollbar. Assets and
  Academy now use the plain shared-component contract.
- local_validation: `pnpm build` passed with 885 modules. The repeatable
  12-route matrix passed at 360x800 and 390x844 with zero clipped labels, zero
  document overflow, at least 16px label gaps for scrollable long sets, aligned
  initial/moved indicators, 12px minimum text, 24px+ targets, visible keyboard
  focus, reduced-motion visibility, zero axe violations, zero runtime errors,
  and zero failed responses.
- next_exact_action: commit exact scope, push `main`, and verify the automatic
  production deployment plus public smoke.

## Active Task — Assets filter row mobile UX

- task_id: `genesis-assets-filter-mobile-20260826`
- owner: `star`
- status: `done`
- scope_lock: `src/pages/AssetsManagementPage.tsx`,
  `e2e/assets-management-mobile-qa.mjs`, `CHANGELOG.md`
- request: increase separation between the active `Deposits` state and
  `Withdrawals` on mobile, and fix the awkward Reset action below the filters.
- design_route: `surface=dashboard`, `archetype=operations`,
  `pattern_pack=pattern-analytics-dashboard`,
  `evidence=production URL + live codebase`,
  `style=existing GenesisFX glass-dashboard thesis`.
- visual_thesis: preserve the existing GenesisFX control language while making
  the transaction mode rail scan cleanly and keeping recovery actions attached
  to the filters they affect instead of underneath the floating mobile nav.
- dials: `design_variance=1`, `motion_intensity=1`, `visual_density=8`,
  `art_direction=4`, `implementation_clarity=10`,
  `image_usage_priority=1`, `spacing_generosity=3`.
- root_cause: the four equal-width 16px ModeToggle tracks leave almost no
  optical gap between `Deposits` and `Withdrawals` at 390px. The always-visible
  48px GreenPillButton Reset row lands behind the fixed mobile navigation, while
  Export is grouped with filters instead of the history table it acts on.
- quality_contract: WCAG 2.2 AA; 12px visible-text floor; 4.5:1 text and 3:1 UI
  contrast; 24px minimum / 44px preferred targets; 360px, 390px, intermediate,
  and desktop containment; keyboard/focus, reduced motion, automated axe,
  runtime/network errors, build, and production screenshot evidence.
- highest_risk: content-fitted indicator geometry, conditional Reset focus/target
  behavior, mobile-nav overlap, and desktop filter/export regression.
- local_validation: build passed with 885 modules. Remote preview QA passed at
  360x800 and 390x844 with 16.8px / 24.3px Deposits-to-Withdrawals label gaps,
  9.6px / 73.6px filter-to-nav clearance, zero horizontal overflow, zero text
  below 12px, 44px keyboard-focused Reset, reduced-motion content parity, zero
  axe violations, zero runtime errors, and zero failed responses.
- preview_evidence:
  `/home/clawd/.openclaw/media/outbound/genesis-assets-management-mobile-reset-preview.png`.
- delivery: commit `3bcc0e3` pushed to `origin/main`; Dokploy deployment
  `Z_ZdDNWUvvNbu5GlASwKk` finished `done` at 2026-08-27 1:33:59 AM AST.
- production_assets: `assets/index-BAMJRZ_l.js` and
  `assets/index-BfjZNzea.css`.
- production_validation: the full preview matrix passed unchanged against the
  public URL at 360x800, 390x844, 768x1024, and 1440x960; axe reported zero
  violations; runtime/network errors and horizontal overflow were zero; `/`,
  `/home`, `/assets-management`, `/register`, `/allpages`, and SPA fallback all
  returned HTTP 200.
- production_evidence:
  `/home/clawd/.openclaw/media/outbound/genesis-assets-management-mobile-production.png`.
- next_exact_action: none. Scope released.

## Active Task — Challenges status filter dropdown

- task_id: `genesis-challenges-status-filter-20260826`
- owner: `artemis`
- status: `done`
- scope_lock: `src/pages/ChallengesPage.tsx` (released)
- request: the filter icon on /challenges must open a dropdown (All Status /
  Active / Breached / Restricted / Ended) matching the supplied Figma spec,
  refactored to Tailwind, with a correct light-theme variant, and it must
  actually filter the rendered challenge cards.
- shipped: commit `09b5439`, Dokploy deployment `QucIxKqcXdMJiW7WUQyD9` done.
- verified_in_prod: bundle `assets/index-DjpyCjmp.js` carries the literal
  markers `Breached` and `Status filter`; the dropdown renders correctly in dark
  and light theme; selecting `Breached` moves the banner count 4 -> 1 and leaves
  a single card rendered.
- note: the selected pill uses `gfx-green-250`, not the literal spec color
  `#064B34`. That color maps to `gfx-green-200`, which `app.css` overrides to
  `#C6C6C6` under `html[data-theme='light']`, so the literal value would have
  rendered grey in light theme.
- note: seed accounts were all `status: 'Funded'`, a value outside the filter
  vocabulary, so every selection would have emptied the grid. Statuses are now
  distributed one per account across the four real states. Revertible in one
  line if the seed data is meant to stay uniform.

## Active Task — Modal mobile legibility (12px floor + spacing)

- task_id: `genesis-modal-mobile-legibility-20260826`
- owner: `artemis`
- status: `done`
- scope_lock: `src/components/modals/ClaimUsernameModal.tsx`,
  `src/components/modals/ShareAccountModal.tsx`,
  `src/components/modals/AiCoachModal.tsx`,
  `src/components/modals/AiCoachModal.css`
- request: modals whose text renders far below the 12px mobile accessibility
  floor must be fixed, along with their lateral/top/bottom spacing, matching the
  Internal Transfer modal.
- root_cause: `ClaimUsernameModal` (755x551) and `ShareAccountModal` (1318x835)
  are fixed-size Figma canvases positioned absolutely and shrunk with
  `transform: scale()`. At 375px the scale lands at 0.47/0.27, so 16px body text
  renders at ~7.6/4.3px and every margin shrinks with it. Internal Transfer does
  not do this: it is real flow layout with responsive padding.
  `AiCoachModal` is NOT affected: it early-returns a purpose-built full-screen
  sheet below 768px, so its 1270x906 canvas never renders on phones. Its only
  violation was a `text-[11px]` disclaimer inside that mobile branch.
- delivery: `ClaimUsernameModal` and `ShareAccountModal` converted to responsive
  flow layout with desktop metrics preserved (base = mobile, `sm:` = original
  desktop values); `AiCoachModal` mobile disclaimer raised to `text-xs`.
- production_validation: commit `38020b8` pushed to main, Dokploy deployment
  `QVVqrg98-uB1xJdFwSAp1` -> `done`. Served bundle `assets/index-Buf2RJrL.js`
  contains `data-claim-username-surface`, `sm:pt-[108px]`, `sm:pl-[33.84px]`
  and `sm:mt-[78.84px]`.
- next_exact_action: none. Closed.
- deferred (not in scope, would move screens owned by `star`): the global type
  scale in `src/app.css` still floors below 12px (`caption`/`eyebrow` 9px,
  `h6`/`tab` 10px, `label`/`body2` 11px, `sidebar-label` 11.2px), so
  `InternalTransferModalFrame`'s own description renders at 9px on mobile, and
  that frame's default `contentClassName` (`px-[78px] pb-[54px] pt-8`) is not
  responsive.

## Active Task — Academy glossary two-column mobile

- task_id: `genesis-academy-glossary-2col-20260826`
- owner: `artemis`
- status: `done`
- scope_lock: `src/pages/AcademyPage.tsx` (`GlossarySection` grid line only),
  `src/components/ui/GlossaryCard.tsx`
- request: same mobile treatment as the other screens — glossary cards two per
  row instead of one.
- delivery: `d1333ea` on `main`, deployed (Dokploy `xN5tKXjDg5dfBYKY2FGJI`).
- production_validation: served bundle `assets/index-BM5E0xSY.css` carries
  `sm:px-[2.3125rem]`, `sm:py-[3rem]`, `sm:gap-4.5`, `xl:grid-cols-3`.
- next_exact_action: none. Scope released.

## Active Task — Mobile two-column boxes + banner spacing

- task_id: `genesis-mobile-2col-20260826`
- owner: `artemis`
- status: `done`
- scope_lock: `src/components/dashboard/Frame518Dashboard.tsx`,
  `src/components/ui/StatCard.tsx`, `src/components/ui/ChallengeDetails.tsx`
  (`ChallengeMetricCard` only), `src/pages/SignalsDetailsPage.tsx`,
  `src/pages/PammDetailsPage.tsx`, `src/pages/PartnerPage.tsx`,
  `src/pages/CopyTradingDetailsPage.tsx`, `src/pages/ChallengeDetailsPage.tsx`
  (KPI grid line only)
- request: on mobile, screens with many boxes lay them out two per row instead of
  one; the green balance banner gets reduced lateral / top / bottom spacing.
- delivery: `2daba24` on `main`, deployed (Dokploy `fkil-qqp6azf61g1HP6uU`).
- production_validation: served bundle `assets/index-83w-jn_h.css` carries
  `h-42`, `sm:h-58.75`, `sm:px-10`, `sm:h-37`, `sm:min-h-[9.25rem]`, `sm:p-6`,
  `sm:w-[42px]`, `sm:text-4xl`.
- next_exact_action: none. Scope released.

## Active Task — GlassSelect trigger background

- task_id: `genesis-glassselect-bg-20260826`
- owner: `artemis`
- status: `done`
- scope_lock: `src/app.css` (token `--color-gfx-surface-select`, dark theme only)
- request: GlassSelect trigger background to `#0C1311`, border unchanged.
- delivery: commit `2aa9e88` on `main`; Dokploy `PFJVX3m89vh3YL2nVKU5N` deployment
  `LTL13TBL40jR6qgRSJ_Zq` done.
- production_validation: served bundle `assets/index-CI5aFCQd.css` has
  `--color-gfx-surface-select:#0c1311`; old `#09241C` absent; light theme `#fff`
  unchanged.
- next_exact_action: none. Scope released.

## Active Task — Sidebar idle nav borders

- task_id: `genesis-sidebar-idle-border-20260826`
- owner: `artemis`
- status: `done`
- scope_lock: `src/components/ui/NavButton.css`, `src/components/dashboard/Sidebar.css`
- request: inactive sidebar items must not show their border; the border appears
  on hover only. Active item keeps its current border.
- delivery: commit `045dd59` on `main`; Dokploy `PFJVX3m89vh3YL2nVKU5N` deployment
  `zvHgiBYKsTPbqgD54W0G6` done.
- production_validation: served bundle `assets/index-CxRGgNKV.css` has
  `.nav-btn{...border:1px solid transparent...}` and
  `.nav-btn:hover{...border-color:#0d1e18}`; old `border:1px solid #0d1e18` absent.
- next_exact_action: none. Scope released.

## Active Task — My Streaming Figma implementation

- task_id: `genesis-my-streaming-figma-20260821`
- owner: `star`
- status: `done`
- target_route: `/streaming/mystreaming`; My streams action on `/streaming` routes here.
- figma: file `Q5LFMKpcKD2ChXj9pyiHwk`, section `4037:109406`; Overview `109407`, Streams `109587`, Replays `109892`, Earnings `110196`, Followers `110502`.
- scope: channel hero, five-state ModeToggle navigation, metric cards, owner StreamCard variant, follower performance card, earnings summary/table, route registration, design-system showcase, visual QA.
- highest_risk: 1549×279 desktop hero anchoring, 740×46 toggle geometry, five state swaps, light-theme semantic surfaces, mobile containment.
- delivery: commit `150954d` pushed to `origin/main`; Dokploy deployment `A8JNp_r4rEYSnzgTVaHJq` finished `done` at `2026-08-22T01:04:53.130Z`.
- local_validation: visual-map gate, `pnpm build` (284 modules), new My Streaming browser matrix, and existing Streaming regression matrix passed.
- production_validation: `/streaming/mystreaming` returned `200`; remote QA passed Overview, Streams, Replays, Followers, Earnings, navigation from My streams, dark/light, desktop/intermediate/mobile, reduced motion, no overflow, runtime errors, or failed responses.
- next_exact_action: None.

## Active Task — AI Coach modal (Journal)

- task_id: `genesis-ai-coach-modal-20260821`
- owner: `artemis`
- status: `done`
- target_route: `/tradelocker/journal`, AI Coach modal in its Default view, AI coach, Response got, and AI Trade Idea states, in light and dark.
- figma: file `Q5LFMKpcKD2ChXj9pyiHwk`, modal nodes `4037:115702` (Default view), `4037:115094` (AI coach), `4037:113896` (Response got), `4037:114468` (AI Trade Idea); modal canvas 1270×906.
- scope_lock: `src/components/modals/AiCoachModal*`, `src/components/ui/AiCoach.tsx`, `src/components/icons/aiCoachIcons.tsx`, `src/pages/JournalPage.tsx`, `src/app.css` (one token). No edits outside this set.
- delivery: commits `25e8852`, `e9fce1a` on `main`; Dokploy `PFJVX3m89vh3YL2nVKU5N` deployment `TaZku3VjaUyyCNxffEUSQ` done.
- local_validation: `pnpm build` green (tsc -b + vite).
- production_validation: `node e2e/ai-coach-modal-qa.mjs` against the preview — 4 states × light/dark, surface 1270×906, 0 overflow, 0 runtime errors; screenshots in `/home/clawd/.openclaw/media/genesis-aicoach-qa`.
- follow_up: the `/design-system` showcase entry for `AiCoachChip` / `AiCoachIconChip` / `AiCoachPromptBar` / `AiCoachTradeChart` and the `src/components/ui/index.ts` barrel export are intentionally NOT committed — both files had star's in-flight Streaming work uncommitted in the shared worktree. Land them once star's Streaming commit is in.

## Active Task — `#021B13` semantic icon-well surfaces

- task_id: `genesis-icon-well-light-theme-20260814`
- owner: `klark`
- status: `done`
- target_route: `/settings`, Support and Security states, in light and dark at mobile and desktop widths.
- operator_evidence: Settings icon wells using hardcoded `bg-[#021B13]` remained dark in light theme.
- root_cause: Three JSX callsites used the raw dark palette literal instead of a theme-aware semantic surface token.
- implementation: Added `--color-gfx-surface-icon-well` (`#021B13` dark / `#FFF` light), migrated the shared Support contact-card well and both Security wells, documented the token, and extended the existing deep-surface source/runtime gate to cover both the literal and computed color contract.
- local_validation: Build passed with 245 transformed modules. The expanded `e2e/deep-surface-theme-audit.mjs` passed 48/48 light/dark × mobile/desktop route/state scenarios with 0 static offenders, exact `#FFF` light and `#021B13` dark icon-well surfaces, 0 overflow, and 0 runtime errors. Final light-theme Security screenshot: `/home/clawd/genesis-icon-well-light-settings-local.png`.
- production_validation: Public Playwright passed the same 48/48 light/dark × mobile/desktop route/state scenarios with 0 static offenders, exact `#FFF` light and `#021B13` dark icon-well surfaces, 0 overflow, and 0 runtime errors. Public smokes for `/`, `/home`, `/settings`, `/design-system`, and the SPA fallback returned HTTP 200. Final public screenshot: `/home/clawd/.openclaw/media/outbound/genesis-icon-well-light-settings-production.png`.
- delivery: Implementation commit `ab10c95` pushed to `origin/main`; Dokploy deployment `vsojtcPNvR1E4ghLmOTld` finished `done` at `2026-08-15T01:41:48.088Z`.
- next_exact_action: None.

## Active Task — `#09241C` semantic deep surfaces

- task_id: `genesis-deep-surface-light-theme-20260814`
- owner: `klark`
- status: `done`
- target_routes: `/home`, `/partner`, `/partner/marketing`, `/partner/statistics`, `/settings`, and `/tradelocker/journal`, including Verification, Security, 2FA, Change Picture, Change Password, and Change Email states.
- operator_evidence: Hardcoded `bg-[#09241C]` UI surfaces remained dark or depended on one-off light-theme overrides after the earlier `#0D1512` / `#0C1311` audits.
- root_cause: `#09241C` was used as a raw Tailwind background across multiple semantic roles, bypassing the light-theme token contract.
- implementation: Added `--color-gfx-surface-deep` (`#09241C` dark / `#FFF` light), migrated content surfaces and icon wells to `bg-gfx-surface-deep`, and routed dividers, inactive tracks, progress tracks, and borders through their existing semantic tokens. Preserved SVG/chart paint and non-background literals.
- local_validation: Build passed with 245 transformed modules. `e2e/deep-surface-theme-audit.mjs` passed 44/44 light/dark × mobile/desktop route/state scenarios with 0 static offenders, exact surface colors, 0 overflow, and 0 runtime errors. Visual inspection of the final light-theme 2FA modal passed.
- production_validation: Public Playwright passed the same 44/44 light/dark × mobile/desktop route/state scenarios with 0 static offenders, exact `#FFF` light and `#09241C` dark deep surfaces, 0 overflow, and 0 runtime errors. Public smokes for `/`, `/home`, `/settings`, `/partner/marketing`, and `/tradelocker/journal` returned HTTP 200.
- delivery: Implementation commit `c6fb9e3` pushed to `origin/main`; Dokploy deployment `cVqeoK3kkkM_zhn7_D446` finished `done` at `2026-08-15T01:19:44.420Z`.
- next_exact_action: None.

## Active Task — Hardcoded dark surface regression

- task_id: `genesis-hardcoded-dark-light-regression-20260814`
- owner: `klark`
- status: `done`
- target_route: `/settings`, with a project-wide source census for `bg-[#0D1512]` and equivalent CSS declarations.
- operator_evidence: The light-theme profile banner retained a dark `#0D1512` lower shell behind the email and badges.
- root_cause: `SettingsPage.tsx` introduced `bg-[#0D1512]`, a near-match that bypassed the prior `#0C1311` semantic-surface audit and the light-theme token override.
- implementation: Replaced the literal class with `surface-raised` and added `data-settings-profile-card` for deterministic runtime validation. Added `e2e/hardcoded-dark-light-audit.mjs`, which scans all source files for the literal and gates computed light/dark surface color, overflow, HTTP status, and runtime errors.
- local_validation: `pnpm build` passed (245 modules). Project-wide source scan found 0 remaining `#0D1512` background literals. Focused Playwright passed `/settings` at 390×844 and 1440×1000 in light and dark: 4/4 scenarios, exact white light surface, canonical `#0C1311` dark surface, zero overflow, and zero runtime errors. Final light-theme card screenshot: `/home/clawd/genesis-settings-light-surface-fixed.png`.
- production_validation: Focused Playwright passed `/settings` at 390×844 and 1440×1000 in light and dark: 4/4 scenarios, 0 static offenders, exact white light surface, canonical `#0C1311` dark surface, zero overflow, and zero runtime errors. `/`, `/settings`, `/home`, and the SPA fallback returned HTTP 200. Production serves `index-uBW985MA.js`; its SHA-256 matches local (`63358cdd6f844e6eee96d4670a6067ea7e88dfa9a70989782e11c18d21616dea`).
- delivery: Commit `362621e` pushed to `origin/main`; Dokploy deployment `QBbKO1M2n5dz3zkSk3O9P` finished `done` at `2026-08-14T23:59:54.061Z`.
- next_exact_action: None.

## Active Task — SparkleButton Sign Up hover parity

- task_id: `genesis-sparkle-button-signup-hover-20260814`
- owner: `klark`
- status: `done`
- target_routes: `/design-system` plus representative shared-component consumers on `/home`, `/partner`, and `/assets-management`, in light and dark.
- reference: GenesisFX Markets desktop header `Sign Up` button at `https://genesisfxmarkets.mdxpreview.xyz`.
- measured_reference: No scale or layout movement; hover adds a white 5% wash over 350ms and runs eight staggered sparkle animations with 2.4s cycles, opacity `0 → 0.35 → 0`.
- implementation: Added a dedicated hover surface and eight decorative twinkle nodes to the shared `SparkleButton`; preserved all existing rest-state decoration, content, geometry, and focus treatment; light theme uses semantic green paint and reduced motion uses a static fallback.
- quality_contract: Shared component only; zero geometry shift; exact reference timing and stagger; no animation while idle/disabled; no overflow/runtime errors; reduced-motion safe; existing optical-centering gate remains passing.
- local_validation: Build passed with 245 transformed modules. Playwright passed dark/light rest, hover, disabled, geometry, timing, stagger, and reduced-motion checks on `/design-system`, with zero runtime errors. The existing `/home` optical gate also remained passing: Deposit `+1px`, Withdraw/Transfer `-0.5px`, icon paint/union within `+1px`.
- production_validation: Playwright passed dark/light rest, hover, disabled, geometry, exact 350ms surface timing, eight-node 2.4s stagger, and reduced-motion checks on `/design-system`, with zero runtime errors. The `/home` optical gate remained passing: Deposit `+1px`, Withdraw/Transfer `-0.5px`, icon paint/content union within `+1px`. `/`, `/design-system`, `/home`, `/partner`, `/assets-management`, and the SPA fallback returned HTTP 200.
- delivery: Implementation commit `a3ce925` pushed to `origin/main`; Dokploy deployment `v21wiarnmF9p17SrlDF7l` finished `done` at `2026-08-14T22:55:27.848Z`.
- next_exact_action: None.

## Active Task — Glyph optical-centering audit

- task_id: `genesis-glyph-optical-centering-audit-20260814`
- owner: `klark`
- status: `done`
- target_routes: All registered and authentication routes, light/dark, mobile and desktop, with the supplied `$90.254,58` balance badge as the reference failure.
- design_route: `surface=dashboard`, `archetype=analytics`, `pattern_pack=pattern-analytics-dashboard`, `evidence=operator screenshot + live codebase + production UI`, `style=existing GenesisFX glass-dashboard thesis`.
- visual_thesis: Preserve the established GenesisFX visual language while aligning the visible glyph ink—not merely the CSS line box—inside compact controls, pills, badges, tabs, and buttons.
- dials: `design_variance=1`, `motion_intensity=1`, `visual_density=8`, `art_direction=4`, `implementation_clarity=10`, `image_usage_priority=1`, `spacing_generosity=3`.
- observed_evidence: The supplied 143×48 screenshot isolates `LiveAccountsCard`'s `$90.254,58` badge. Its wrapper uses symmetric vertical padding but `items-start`; the previous audit measured the text range/line box, so Acid Grotesk's reserved descender space was incorrectly treated as visible content.
- derived_decisions: Use canvas `actualBoundingBoxAscent/Descent` plus computed font metrics to estimate the visible glyph ink box. Correct repeatable component primitives only; preserve page/card spacing and avoid scattered magic offsets.
- quality_contract: WCAG 2.2 AA; zero visible text below the existing 12px floor; glyph-ink center within 1px of the control center unless an explicit optical exception is documented; no overflow/runtime errors; keyboard/focus, 24px targets, reduced motion, 200% reflow, contrast, build, and production asset parity verified.
- highest_risk: Compact amount/status badges; all-uppercase labels and numeric-only strings without descenders; icon+label controls; existing one-pixel optical corrections; line-height changes affecting target height or responsive wrapping.
- media: `not_applicable` — the supplied screenshot is diagnostic evidence, not a runtime asset.
- definition_of_done: Full production baseline and local post-fix matrix use glyph metrics, every repeated offender is fixed or documented, the supplied badge is visually centered, and all delivery-quality gates pass in production.
- baseline: The glyph-aware production crawl inspected 3,331 controls across 160 route/theme/viewport scenarios and found 500 repeated offender instances grouped into 23 component signatures. The supplied `$90.254,58` pill measured `-1.87px` high with 6px top versus 9.73px bottom visible-ink gaps.
- implementation: Added semantic `optical-text` and `optical-text--numeric` glyph layers, aligned the Live Accounts wrapper itself with `items-center`, and migrated the repeated Sidebar, TopBar, ModeToggle, SparkleButton, GreenPillButton, GlassSelect, status-pill, filter, action, and compact numeric patterns discovered by the census.
- local_validation: `pnpm build` passed (245 modules). The final local 160-scenario crawl inspected 3,198 visual controls with 0 offenders above the strict 1px tolerance, 0 overflow, and 0 runtime errors. The supplied balance pill now measures `+0.13px` to `+0.20px`, with 8px top and 7.59–7.73px bottom visible-ink gaps. Focused accessibility QA passed symmetric padding, centered flex anatomy, keyboard/focus, 24px targets, reduced motion, and 200%-equivalent reflow.
- production_validation: The public 160-scenario crawl inspected 3,199 visual controls across all 40 routes, light/dark, and mobile/desktop with 0 offenders, 0 overflow, and 0 runtime errors. Focused production accessibility QA passed, `/home` returned 200, and local/public `index-B-SCmWOW.js` SHA-256 matched (`71b29e2d40187f51feabaaacfe22d23242fcd59a139d1f266360313120616e02`).
- delivery: Commit `87db1a5` pushed to `origin/main`; Dokploy deployment `Wy7qWIau0q4g1rZDprkcv` finished `done` at `2026-08-14T20:32:31.110Z`.
- operator_follow_up: The Deposit / Withdraw / Transfer SparkleButton crop exposed a layer-level miss: Withdraw and Transfer label ink measured `-1.5px` while icon paint measured `+1px`, although the combined union stayed inside the previous tolerance.
- follow_up_fix: Applied the existing `.optical-text` layer to Withdraw and Transfer across Home, Partner, Assets Management, and the design-system reference; Deposit remains unchanged because its visible descender already aligns with its icon.
- follow_up_validation: Tightened `e2e/sparkle-button-optical-qa.mjs` to gate label ink, icon paint, and the union independently. Build passed (245 modules). Local Home dark/light plus Partner and Assets Management dark all passed: Deposit `+1px`, Withdraw/Transfer `-0.5px`, icon paint/union `+1px`, zero runtime errors.
- follow_up_delivery: Commit `45d0f20` pushed to `origin/main`; Dokploy deployment `WpJh14hvUkXeh1QIVfCNU` finished `done` at `2026-08-14T22:33:16.104Z`. Production serves `index-NyeTXoSg.js`.
- follow_up_production_validation: `/home` passed in dark and light; `/partner` and `/assets-management` passed in dark. Deposit remained `+1px`; Withdraw and Transfer measured `-0.5px`; icon paint and content union remained within `+1px`; zero runtime errors. `/`, `/home`, `/partner`, `/assets-management`, and the SPA fallback route returned HTTP 200.
- next_exact_action: None.

## Completed Task — Control optical-centering audit

- task_id: `genesis-control-optical-centering-audit-20260814`
- owner: `klark`
- status: `done`
- target_routes: All registered application routes plus `/login` and `/register`, in light/dark at mobile and desktop widths; conditional controls and dialogs are included where reachable.
- design_route: `surface=dashboard`, `archetype=analytics`, `pattern_pack=pattern-analytics-dashboard`, `evidence=live codebase + production UI`, `style=existing GenesisFX glass-dashboard thesis`.
- visual_thesis: Preserve the established dark glass / light semantic theme and fix only control anatomy: text, icons, and badges must share an optical center and a compact, repeatable vertical rhythm without decorative offsets.
- dials: `design_variance=2`, `motion_intensity=2`, `visual_density=7`, `art_direction=4`, `implementation_clarity=10`, `image_usage_priority=1`, `spacing_generosity=4`.
- observed_evidence: The full production baseline inspected 3,027 text-bearing controls across 160 route/theme/viewport scenarios. It found 24 offenders from one repeated Academy chapter-row component and 70 active ModeToggle SVG paint failures; overflow and runtime errors were both zero.
- derived_decisions: Fix shared primitives before page-specific outliers; use semantic state selectors and a single optical-alignment hook/token where the Acid Grotesk font needs correction; do not alter card/page spacing that is not part of control anatomy.
- quality_contract: Measure content-union center versus control center; active ModeToggle text and SVG must compute to `#fff`; repeated controls must share height/padding/line-height; test responsive layout, 200% zoom, keyboard/focus, reduced motion, contrast, runtime errors, and production build integration.
- highest_risk: ModeToggle active SVG paint; pill/tab/button line boxes; icon+label controls; badges with tight heights; buttons containing absolutely positioned sparkle layers; conditional dialogs.
- media: `not_applicable` — this task changes component geometry and paint, not load-bearing media.
- definition_of_done: Full route/state census has no unexplained optical-center delta above 2px, no asymmetric vertical padding above 2px, no active ModeToggle icon other than `#fff`, no overflow/runtime regressions, and production serves the verified build.
- validation: Managed `pnpm build` passed (245 modules). Local and production 160-scenario Playwright matrices each inspected 3,027 controls and passed with 0 center offenders, 0 ModeToggle paint failures, 0 overflow, and 0 runtime errors. Focused accessibility QA passed keyboard activation/focus, 24px target minimums, reduced motion, and 200%-equivalent reflow; ModeToggle active text/SVG computed to exact white and Academy rows computed to `align-items: center` with symmetric 0px vertical padding. Four production route smokes returned 200, and the local/public entry bundle SHA-256 matched (`2076dafece49f6bae5da4e14472c12f3c22ce4c7d20a6b3461b2a5d4c7056519`).
- delivery: Commit `360dd71` pushed to `origin/main`; Dokploy deployment `yJK5DRLaOGMs99DwkFJee` finished `done` at `2026-08-14T19:38:40.206Z`.
- next_exact_action: None.

## Completed Task — Semantic dark-surface audit

- task_id: `genesis-semantic-dark-surface-audit-20260814`
- owner: `klark`
- status: `done`
- target_routes: `/partner`, `/partner/referrals`, `/partner/statistics`, `/partner/marketing`, `/settings`, `/signals`, plus Settings account/security modals.
- root_cause: Repeated `#0C1311` class and inline backgrounds bypassed theme tokens; some stayed visibly dark in light theme while others appeared correct only because a later global GlassCard rule won the cascade.
- scope_guard: Migrate UI surfaces and borders only. Preserve token definitions, ThemeSwitch artwork, SVG/QR/icon paint, chart gradients, and explicitly theme-overridden Partner decoration.
- pre_fix_evidence: Production Playwright found 18 visible dark surfaces in light theme across the affected routes and states.
- validation: `pnpm build` passed (245 modules). Local and production Playwright each passed 72/72 light/dark states at 390×844 and 1440×1000, including Partner views, Settings tabs, language dropdown, referral details, 2FA, and four account modals; 0 light-theme dark offenders, 0 semantic mismatches, 0 overflow, and 0 runtime errors. Eight production route smokes returned 200. The local/public entry-bundle SHA-256 matched (`a049f84d0edde932616f0a7c96f856e2b0159bf19e8c85372d0a08e3ac75e805`). Static exception census and graph refresh also passed.
- delivery: Commit `1a0fc7f` pushed to `origin/main`; Dokploy deployment `2j6TGfq3mEsOxPcLnIwz4` finished `done` at `2026-08-14T19:06:00.433Z`.
- next_exact_action: None.

## Completed Task — Partner Links semantic surface

- task_id: `genesis-partner-links-semantic-surface-20260814`
- owner: `klark`
- status: `done`
- target_route: `/partner/links`
- root_cause: The referral-code GlassCard used an inline `background: #0C1311`, overriding the light-theme surface contract.
- scope_guard: Move only the hardcoded surface/background behavior into the design system; preserve layout, copy, and interactions.
- expected: Dark `#0C1311`; light `#FFF`; no inline background.
- validation: Production pre-fix Playwright reproduced the dark inline background in light mode at 390/1280/1920. `pnpm build` passed. Local post-fix Playwright passed 6/6 light/dark viewport combinations with the exact expected colors, no inline background, no overflow, and no runtime errors.
- delivery: Commit `54c4713` pushed to `origin/main`; Dokploy deployment `xBlcYkoHQ5RtzmCGCridF` finished `done`. Production serves `index-CYp9Qv6W.js` and `index-BVlj7DrK.css`.
- next_exact_action: None.

## Completed Task — Project-wide light surface text contrast audit

- task_id: `genesis-light-surface-text-contrast-audit-20260813`
- owner: `klark`
- status: `done`
- target_routes: All 38 registered routes at 390/1280/1920, including Partner tables, details modal, payout input, statistics badges, journal metrics, and PAMM/copy-trading stat values.
- root_cause: Hardcoded `#ECECEC` and inline white fallbacks bypassed the established light-theme `.text-white` contract, leaving pale copy on pale surfaces.
- scope_guard: Migrate light-surface copy to semantic `text-white` so it resolves black only in light theme; retain explicitly colored status values, active green controls, and dark-theme white text.
- validation: Static hardcoded-color census, production pre-fix computed-color crawl, build, local/production Playwright across 114 route/viewport combinations, conditional-state checks, overflow, and runtime-error gates.
- validation_result: Pre-fix production crawl inspected 10,727 visible text nodes and isolated the true pale-on-pale defects after excluding approved active-control overlays. Managed build `bg_mss50o5t_2cf8ad0e` passed. Production QA inspected 10,736 visible text nodes across 114 route/viewport combinations with 0 pale-on-pale offenders, 0 overflow, and 0 runtime errors; 16 focused light/dark conditional checks also passed.
- delivery: Commit `203b5b4` pushed to `origin/main`; Dokploy deployment `eZEJwkrnjEVybtkf0PuQj` finished `done` at `2026-08-13T23:27:54.522Z`.
- next_exact_action: None.

## Completed Task — Exhaustive light hover-text audit

- task_id: `genesis-light-hover-text-audit-20260813`
- owner: `klark`
- status: `done`
- target_routes: All 38 public/registered routes at 390/1280/1920, including authentication pages, light-theme modals, and intentional dark video controls.
- root_cause: Tailwind's `.hover\\:text-white:hover` variant is a separate selector from `.text-white`, so the existing light-theme black-text contract could not intercept it.
- scope_guard: Keep hover text black only on semantic light application/auth surfaces; preserve dark theme and explicitly marked controls over dark video.
- validation: Static census plus local/production Playwright comparing every visible `hover:text-white` candidate before/after hover, with runtime-error and multi-viewport gates.
- validation_result: Pre-fix production crawl found 23 real transitions to white. Managed build `bg_msrvolqa_cdc4fd6c` passed. Final production crawl inspected 675 visible candidates across 114 route/viewport combinations with 0 transitions to white and 0 runtime errors. Conditional auth/PAMM/modal/video/dark-theme flow checks also passed in local and production.
- delivery: Commit `4596206` pushed to `origin/main`; Dokploy deployment `nl4wCUO1-ACF_miQKhxwo` finished `done` at `2026-08-13T19:12:22.587Z`.
- next_exact_action: None.

## Active Task — Partner decorative glow light-theme audit

- task_id: `genesis-partner-light-glow-audit-20260813`
- owner: `klark`
- status: `done`
- target_routes: `/partner`, `/partner/referrals`, `/partner/links`, `/partner/trades`, `/partner/comissions`, `/partner/payouts`, `/partner/marketing`, and `/partner/statistics`, including Referral Details modal.
- root_cause: Anonymous filtered blur blobs did not carry the semantic `.theme-decorative-glow` hook, so the established light-theme hide contract could not match them.
- scope_guard: Tag and hide only decorative Partner glows in light theme; preserve all dark-theme decoration plus GlowButton, active-tab, sidebar, focus, and interaction effects.
- validation: Static semantic-hook census, managed build, and local/production Playwright across all 8 Partner routes at 390/1440/1920 in light/dark, including the Referral Details modal.
- validation_result: Managed build `bg_msru0004_0e2e3b75` passed and was approved. Local and production Playwright passed 54 combinations: 0 visible or unmarked decorative glows in light, 117 preserved dark-theme hooks, 0 overflow, and 0 runtime errors. Production screenshot confirms the Recent Activity card is clean.
- delivery: Commit `5e530fb`; Dokploy deployment `d5GpcfnyWduP8_ApK4Bro` finished `done` at `2026-08-13T18:18:54.865Z`.
- next_exact_action: None — production delivery and regression audit complete.

## Active Task — Project-wide light SVG color audit

- task_id: `genesis-light-svg-white-audit-20260813`
- owner: `klark`
- status: `done`
- target_routes: All 38 registered/public application routes plus conditionally rendered modal SVGs.
- root_cause: Literal SVG `fill`/`stroke` values (`white`, `#fff`, `#ffffff`) bypass the text-color light cascade and remain white on pale surfaces.
- scope_guard: Recolor white icon paint to `#00B38C` only in light theme; preserve dark, structural masks/clip paths, decorative sparkle highlights, and white glyphs on green active states.
- validation: Static source census, managed build, and full local/production Playwright crawl across 38 routes with exact computed SVG paint checks, overflow, and runtime-error gates.
- validation_result: Build `bg_msrsvgi8_37e09e4b` passed and was approved; local and production crawls passed across 38/38 routes with 0 actionable white SVG paints and 0 runtime errors. Dark retained 836 white paints across 111 signatures.
- delivery: Commit `1de8402`; Dokploy deployment `GlmvxCevxshj0tyPAJiL6` finished `done` at `2026-08-13T17:43:36.870Z`.
- next_exact_action: None — production delivery and regression audit complete.

## Active Task — Partner marketing card light palette

- task_id: `genesis-partner-marketing-card-light-theme-20260813`
- owner: `klark`
- status: `done`
- target_route: `/partner`.
- source_of_truth: Operator-provided 359x242 HTML reference and screenshot.
- scope_guard: Change only the marketing feature card palette in light theme; preserve geometry, typography, copy, carousel indicators, interactions, and the complete dark-theme palette.
- validation: Managed `tsc -b && vite build` passed (245 modules). Local and production Playwright passed light/dark at 390/1280/1920: exact mint-to-white light gradient, #ECECEC border, mint badge, black title, preserved dark palette, 242px height, 0 overflow, and 0 runtime errors.
- delivery: Implementation `4aecadb` pushed to `origin/main`; Dokploy `s0sfSCqwh4MOmW2Rjb-qK` finished `done` at `2026-08-13T17:18:45.397Z`.
- next_exact_action: User visual confirmation.

## Active Task — Trade Sessions light bottom fade

- task_id: `genesis-trade-sessions-light-bottom-fade-20260812`
- owner: `klark`
- status: `done`
- target_route: `/news`, tab `Trade Sessions`.
- root_cause: The 500px bottom fade used an inline `linear-gradient` with `#000705`, so it could not react to `html[data-theme]` and remained dark in light theme.
- scope_guard: Theme only the bottom fade; preserve its size, stacking, transparency, dark color, globe, cards, and interactions.
- validation: Managed `tsc -b && vite build` passed (245 modules). Local and production Playwright passed light/dark at 390/1280/1920: exact `rgb(255,255,255)` light and preserved `rgb(0,7,5)` dark, 500px height, 0 overflow, 0 runtime errors.
- delivery: Implementation `98e3eda` pushed to `origin/main`; Dokploy `gzjic-OiHsFkTNA0MwxY7` finished `done` at `2026-08-12T23:41:00.313Z`.
- next_exact_action: User visual confirmation.

## Active Task — Trading Accounts light text audit

- task_id: `genesis-trading-accounts-light-text-audit-20260812`
- owner: `klark`
- status: `done`
- target_routes: `/home` and `/tradelocker/accounts`.
- root_cause: The existing light audit covered the exact `.text-white` class, but platform names used Tailwind's separate `text-white/60` utility and overflow-menu SVG paths hardcoded `fill="white"`; both bypassed that cascade and disappeared on the white card. Action hover states also switched back to white.
- scope_guard: Theme only platform copy, overflow-menu icons, and row-action hover states in both Trading Accounts implementations; preserve data, layout, badges, P&L status colors, controls, and dark theme.
- validation: Pre-fix production Playwright reproduced two white platform labels and six white overflow-menu paths per container. Managed `tsc -b && vite build` passed (245 modules). Local and production Playwright passed `/home` + `/tradelocker/accounts`, light/dark, at 390/1280/1920: 0 light white text offenders, exact black platform copy, theme-aware six-dot icons, safe action hovers, 0 uncontained overflow, 0 runtime errors.
- delivery: Commit `065bf37` pushed to `origin/main`; Dokploy deployment `cP1_tS3kg-fr_Bx1vno-n` completed `done` at `2026-08-12T22:14:46.670Z`.
- next_exact_action: User visual confirmation only.

## Active Task — Figma typography parity for GenSocial detail pages

- task_id: `genesis-gensocial-detail-typography-figma-20260812`
- owner: `klark`
- status: `done`
- target_routes: `/gensocial/pamm/details-single-page` and `/gensocial/copy-trading/details-single-page`.
- figma_nodes: `Q5LFMKpcKD2ChXj9pyiHwk:2682:48732` and `Q5LFMKpcKD2ChXj9pyiHwk:2938:70035`.
- root_cause: PAMM reused 10px/16px/24px utilities where the Figma typography specifies 14px/24px/36px, while both detail pages rendered the 16px performance tabs at weight 400 instead of the Figma weight 500.
- scope_guard: Typography only—font size, weight, line height, and letter spacing; preserve copy, color, layout, data, and interaction.
- validation: Figma MCP supplied the exact Acid Grotesk typography from both nodes. Build passed (`tsc -b`, Vite 6.4.3, 245 modules). Focused Playwright checked 19 representative text roles across both routes for exact font family, size, weight, line height, and table-label tracking; local and production both passed with zero failures, overflow, or runtime errors. Full-page visual review at 1920px also passed.
- delivery: Commit `0893d94` pushed to `origin/main`; Dokploy deployment `hKBWRaWyCeHsMBgxsW77S` completed `done`. Production serves `index-BPy_bAXw.js` and `index-BojexXRz.css`.
- next_exact_action: User visual confirmation.

## Active Task — Light functional header icons

- task_id: `genesis-light-functional-header-icons-20260812`
- owner: `klark`
- status: `done`
- target_routes: `/tradelocker/accounts/demo` and `/news`.
- root_cause: The Account Details profile/settings SVGs and the Daily Analysis live-stream SVG used hardcoded white fills, so they disappeared against their light surfaces.
- scope_guard: Use `#00B38C` only for these three functional icons in light theme; preserve white in dark theme, button geometry, behavior, and surrounding layout.
- validation: Managed build passed (`tsc -b`, Vite 6.4.3, 245 modules). Focused local and production Playwright confirmed all three icons compute to `#00B38C` in light and white in dark, preserves 36x36 settings-button and 40x40 live-stream geometry, with zero overflow and runtime errors.
- delivery: Commit `ea8d3d6` pushed to `origin/main`; Dokploy deployment `AfSFWX82BPjKjji-I2SQ6` completed `done`. Production serves `index-k5uiDOyS.js` and `index-CO4Yg_0W.css`.
- next_exact_action: User visual confirmation.

## Active Task — Exhaustive chart-text theme audit

- task_id: `genesis-light-chart-text-audit-20260812`
- owner: `klark`
- status: `done`
- scope_guard: Audit all registered routes for chart text rendered by Chart.js canvas, SVG text, and DOM axis/legend labels; make those labels pure black in light theme while preserving dark-theme colors, chart geometry, data, tooltips, and interaction.
- root_cause: The global light-theme `.text-white` rule cannot style canvas drawing state or hardcoded SVG `fill`; `PortfolioChart` also instantiated Chart.js once without reacting to later `data-theme` mutations, and `MiniBarChart` inherited a hardcoded white canvas color.
- implementation: Added a semantic `data-chart-text` hook, light-only color/fill mapping, theme-aware Chart.js scriptable colors, and a theme mutation refresh; applied the hook to audited canvas, SVG, axis, legend, and donut-center labels.
- validation: Build passed (`tsc -b`, Vite 6.4.3, 245 modules). Local Playwright changed themes live across 38 routes and inspected 44 visible chart-text hooks plus 72 light/117 dark canvas text draws with zero failures. Production repeated 38 routes, 44 hooks, and 99 light/102 dark canvas text draws: all light labels resolved to pure black, dark labels preserved their existing palette, with 0 overflow routes and 0 runtime errors.
- delivery: Commit `3263e4c` pushed to `origin/main`; Dokploy deployment `uNPpHzmr6ZrNY6YM_1TGv` completed `done`. Production serves `index-DGcTNlbz.js` and `index-DzBtX9aE.css`.
- next_exact_action: User visual confirmation.

## Active Task — Exhaustive light decorative-glow audit

- task_id: `genesis-light-decorative-glow-audit-20260812`
- owner: `klark`
- status: `done`
- scope_guard: Hide decorative GlowEllipse-equivalent effects in light theme across dialogs and page containers while preserving dark theme and functional GlowButton, focus, backdrop, status, and progress effects.
- root_cause: Existing light CSS recognized only named helpers such as `.glow-ellipse` and `.bg-gfx-glow-green`; many equivalent decorations were authored as anonymous blurred or radial-gradient elements and therefore escaped the theme rule.
- implementation: Added the semantic `.theme-decorative-glow` hook to reusable GlowEllipse and audited modal/container decorations, plus a light-only neutral surface for the integrated Change Picture hero artwork.
- validation: Build passed (245 modules). Local and production Playwright each opened 15/15 modal flows and crawled 38 routes in light and dark. Production inspected 133 semantic decorative-glow instances: light rendered 0 visible; dark preserved 114 visible. Functional GlowButton cores remained visible (47 light, 48 dark), with 0 overflow routes and 0 runtime errors. Journal note/folder dialogs also gained proper dialog semantics during the audit.
- delivery: Commit `bc56a8a` pushed to `origin/main`; Dokploy deployment `PSjMsNnjKVG4G3tH_AoL7` completed `done`. Production serves `index-TTFDd7Q3.js` and `index-jTIqcd5d.css`.
- next_exact_action: User visual confirmation.

## Active Task — Restore light `PeriodPill` surface

- task_id: `genesis-light-period-pill-surface-20260812`
- owner: `klark`
- status: `done`
- scope_guard: Restore the prior `#F6F6F6` light container background only for `PeriodPill`; preserve the shared white select token, active green pill, calendar control, and dark theme.
- validation: Build passed (245 modules). Local and production Playwright confirmed light `#F6F6F6`, preserved dark 4% white surface, active geometry intact, zero overflow, and zero runtime errors.
- delivery: Commit `461173a` pushed to `origin/main`; Dokploy deployment `isyM1Wy3m6adk0xmZ9TvS` completed `done`. Production serves `index-Czp67ZJk.js` and `index-B1mBJaOL.css`.
- next_exact_action: User visual confirmation.

## Active Task — Full light `text-white` cascade audit

- task_id: `genesis-light-text-white-cascade-audit-20260812`
- owner: `klark`
- status: `done`
- scope_guard: Audit every registered application route for exact `text-white` tokens that remain non-black in light theme; fix cascade gaps outside `.theme-root`; retain only previously approved white-on-accent exceptions and preserve dark theme.
- validation: Final local crawl covered 38 routes and 1,096 visible `.text-white` instances with 0 offenders. Production repeated 38 routes and 1,098 visible instances with 0 offenders, 0 visible light-theme GlowEllipse, 0 overflow routes, and 0 runtime errors. Explicit notification/funding accent exceptions remain white.
- delivery: Commit `461173a` pushed to `origin/main`; Dokploy deployment `isyM1Wy3m6adk0xmZ9TvS` completed `done`.
- next_exact_action: None; production route audit passed.

## Active Task — Graphify project integration

- task_id: `genesis-graphify-project-integration-20260812`
- owner: `klark`
- status: `done`
- scope_guard: Install Graphify project-scoped for Codex, use code-only local extraction, keep generated graph output out of Git, and avoid LLM/global agent configuration.
- validation: Graphify 0.9.41 installed; code-only/no-cluster extraction produced a 7-file graph artifact; `graphify query` traversed the live `PeriodPill` and theme graph successfully.
- delivery: Project integration committed in `461173a` and pushed to `origin/main`; generated `graphify-out/` remains ignored.
- next_exact_action: Run `graphify update .` after future code changes.

## Active Task — Light text and modal glow cleanup

- task_id: `genesis-light-text-modal-glow-20260812`
- owner: `klark`
- status: `done`
- scope_guard: Render `.text-white` copy as pure black in light theme while preserving explicit light-theme accent exceptions; ensure `GlowEllipse` decorations cannot display inside dialogs in light theme; preserve dark theme.
- validation: Production build passed (245 modules). Local Playwright at 1280x800 confirmed `.text-white` computes to pure black and the `Connect to PAMM` dialog glow is hidden in light; dark preserves white text and the visible glow; no horizontal overflow or runtime errors.
- delivery: Commit `7dd274f` pushed to `origin/main`; Dokploy deployment `dfNvpF1rfddr_A-Ww_Q32` finished `done`.
- next_exact_action: None; production Playwright and public bundle hash checks passed.

## Active Task — Light FAQ transparent surface

- task_id: `genesis-light-faq-transparent-surface-20260812`
- owner: `klark`
- status: `done`
- target_routes: `/deposit`, `/withdraw`, `/gensocial/signals`, and `/design-system`.
- scope_guard: Make only the FAQ card background transparent in light theme; preserve borders, spacing, accordion behavior, supplied toggle artwork, and dark-theme background.
- validation: Production build passed (245 modules). Local and production Playwright at 1280x800 confirmed all four `/deposit` FAQ cards are transparent in light, retain the mint border, preserve the dark `rgb(0,7,5)` surface, and produce no horizontal overflow or runtime errors.
- delivery: Commit `85628fc` pushed to `origin/main`; Dokploy deployment `u-qd8Jls7T42Q9ZsU9Jsx` completed `done` with no error.
- next_exact_action: User visual confirmation.

## Active Task — TopBar alignment and light funding states

- task_id: `genesis-topbar-funding-state-polish-20260812`
- owner: `klark`
- status: `done`
- target_routes: `/home`, `/deposit`, and `/withdraw`.
- root_cause: The controls already used flex centering, but normal text line boxes did not optically match the adjacent SVG boxes; a broad light-theme accent selector also overrode the notification count's white text. Funding selections inherited light surface tokens instead of the supplied active green state.
- scope_guard: Align only wallet/language control copy and the notification count; update only light-theme active coin and active/completed step states; preserve layout, interactions, responsive visibility, and all dark-theme rendering.
- validation: Managed build passed (`tsc -b`, Vite 6.4.3, 245 modules). Local Playwright passed at 390/1280/1920 in light and dark: wallet icon `0px`, amount `-0.5px`, language flag/EN/chevron `0px`, notification count `-0.5px`, count color `#fff`, no overflow or runtime errors. Light active coin and funding steps computed to `#00B38C` with white text/check; dark values remained unchanged.
- delivery: Commit `b05c6bb` pushed to `origin/main`; Dokploy deployment `7RSpkrpCBDSjJdAAZ_0Jf` completed. Production serves `index-Ds4hr4zc.js` and `index-DHUa0gbY.css`. Playwright repeated the targeted checks on `/home`, `/deposit`, and `/withdraw` at 390/1280/1920 in light and dark with zero failures, overflow, or runtime errors.
- next_exact_action: User visual confirmation.

## Active Task — Assets Reset label alignment

- task_id: `genesis-assets-reset-alignment-20260812`
- owner: `klark`
- status: `done`
- design_route: Dashboard filter action; supplied screenshot evidence; existing GenesisFX pill-button direction.
- visual_thesis: The Reset label sits geometrically centered inside the existing 107x46 mint pill without changing its surface, typography, or behavior.
- scope_guard: GreenPillButton internal alignment only; preserve dimensions, padding, colors, decoration, focus, click behavior, and light/dark styling.
- quality_contract: WCAG 2.2 AA; exact button and label center deltas, 44px target, keyboard/focus, reduced motion, 390/1280/1920 layouts, no overflow/runtime errors, build integration.
- validation: Managed build passed (245 modules). Playwright at 390/1280/1920 in light and dark measured exact horizontal and vertical center deltas of `0px`, preserved 107x46 light geometry, keyboard focus, no overflow, and zero runtime errors.
- delivery: Commit `1191d80` pushed to `origin/main`; Dokploy deployment `J5V-rncxiV-orIpddv2JH` completed. Production Playwright repeated the 0px center deltas, focus, responsive, overflow, and runtime checks.
- next_exact_action: User visual confirmation.

## Active Task — Light select surface token

- task_id: `genesis-light-surface-select-20260812`
- owner: `klark`
- status: `done`
- design_route: Dashboard control token; explicit operator color specification; existing GenesisFX light/dark direction.
- scope_guard: Override only `--color-gfx-surface-select` in light theme to `#fff`; preserve dark `#09241C`, GlassSelect behavior, PeriodPill geometry, and all callsites.
- quality_contract: WCAG 2.2 AA; exact computed token and representative surfaces in light/dark, keyboard/focus and dropdown behavior, reduced motion, 390/1280/1920 layouts, no overflow/runtime errors, build integration.
- validation: Managed build passed (245 modules). Playwright at 390/1280/1920 confirmed `#fff` in light and the preserved `#09241c` dark token, keyboard focus, no overflow, and zero runtime errors.
- delivery: Commit `1191d80` pushed to `origin/main`; Dokploy deployment `J5V-rncxiV-orIpddv2JH` completed. Production Playwright confirmed light `#fff`, preserved dark `#09241c`, focus, responsive, overflow, and runtime checks.
- next_exact_action: User visual confirmation.

## Active Task — Light TopBar icon color

- task_id: `genesis-light-topbar-icons-20260811`
- owner: `klark`
- status: `done`
- design_route: Dashboard utility header; supplied screenshot evidence; existing GenesisFX light/dark direction.
- visual_thesis: Functional header glyphs use the requested Genesis green in light while flags, badges, status graphics, avatar decoration, and all dark-theme rendering remain intact.
- scope_guard: Wallet, notification, language chevron, help, and mobile navigation glyphs only; no global SVG selector or shared token mutation.
- quality_contract: WCAG 2.2 AA; exact computed `#00B38C` in light and white in dark, keyboard/focus and dropdown behavior, reduced motion, 390/1280/1920 layouts, no overflow/runtime errors, build integration.
- accessibility_note: `#00B38C` is 2.68:1 on white and below the 3:1 meaningful-icon target; retained as the explicit supplied design color.
- validation: Managed build passed (245 modules). Playwright at 390/1280/1920 confirmed scoped glyphs `#00B38C` in light and white in dark, preserved flag artwork, notification/language keyboard interactions, no overflow, and zero runtime errors.
- delivery: Commit `1191d80` pushed to `origin/main`; Dokploy deployment `J5V-rncxiV-orIpddv2JH` completed. Production Playwright repeated exact scoped glyph colors, preserved flag artwork, keyboard interactions, responsive, overflow, and runtime checks.
- next_exact_action: User visual confirmation.

## Active Task — Light FAQ toggle SVG

- task_id: `genesis-light-faq-toggle-svg-20260811`
- owner: `klark`
- status: `done`
- design_route: Dashboard utility component; exact supplied SVG evidence; existing GenesisFX light/dark direction; no pattern pack because this is an isolated icon-state replacement with no structural or flow changes.
- visual_thesis: Light FAQs use the supplied 44px `#F1FFFA` container and `#00B38C` filled chevron; dark retains the existing gradient and icon.
- scope_guard: FAQ toggle artwork only; preserve button semantics, 44px target, label, expansion state, rotation, card geometry, copy, and dark rendering.
- quality_contract: WCAG 2.2 AA; exact SVG geometry/fills, 44px target, keyboard activation/focus, reduced motion, mobile/desktop, no overflow/runtime errors, and build integration.
- validation: Managed build passed (245 modules). Playwright passed light/dark at 390px and 1280px: exact 44x44 target, light fills `#F1FFFA`/`#00B38C`, dark artwork preserved, keyboard Enter toggles `aria-expanded`, reduced-motion interaction works, no overflow, and zero runtime errors.
- accessibility_note: Supplied `#00B38C` chevron on `#F1FFFA` is 2.61:1, below the WCAG 3:1 meaningful-icon target; retained for exact reference fidelity.
- automated_accessibility: Not run; `axe-core` is not installed in this project, and the changed surface was covered by targeted semantic, keyboard, size, contrast, reduced-motion, responsive, and runtime checks.
- delivery: Commit `8048ff1` pushed to `origin/main`; Dokploy deployment `_QnmXvEhjIQZorpoDVMmJ` completed. Production serves `index-bn32ChRc.js` and `index-BRjKlIZB.css`; exact supplied path and theme selectors verified.
- next_exact_action: User visual confirmation.

## Active Task — Light neutral-250 token

- task_id: `genesis-light-neutral-250-20260811`
- owner: `klark`
- status: `done`
- design_route: Existing GenesisFX dashboard token system and explicit operator color specification.
- scope_guard: Override only `--color-gfx-neutral-250` in light theme to `#9FE4CD`; preserve dark `#303030` and all callsites.
- quality_contract: WCAG 2.2 AA; token-only regression check across light/dark, mobile/desktop, exact computed token value, overflow/runtime errors, and build integration.
- risk_surface: 61 existing consumers spanning borders, dividers, controls, and decorative fills; no geometry or interaction changes.
- validation: Managed build passed (245 modules). Playwright passed exact computed token and representative border colors in light (`#9FE4CD`) and dark (`#303030`) at 390px and 1280px, with no overflow or runtime errors. Existing Journal text below the internal 12px floor remains 18/2 nodes in light and 20/2 in dark at mobile/desktop; unchanged and outside this token-only scope.
- accessibility_note: As a meaningful boundary, `#9FE4CD` has only 1.45:1 on white, 1.35:1 on `#F2F8F6`, and 1.23:1 on `#ECECEC`, below the WCAG 3:1 component-boundary target; retained because this is the explicit supplied design token.
- delivery: Commit `1cef6e7` pushed to `origin/main`; Dokploy deployment `n8fs22cxRtnAfv8jDJOD0` completed. Production serves `index-CLYHkGZO.css` with dark `#303030` and light `#9FE4CD` token values.
- next_exact_action: User visual confirmation.

## Active Task — ModeToggle active background isolation

- task_id: `genesis-mode-toggle-active-bg-isolation-20260811`
- owner: `klark`
- target_routes: all `ModeToggle` consumers, including `/tradelocker/journal`
- status: `done`
- scope_guard: Restore only the light active indicator to `#00B38C`; preserve the global `green-200` token and every unrelated component.
- root_cause: `.mode-indicator` consumed global `--color-gfx-green-200`, so the intentional global light-token change to `#C6C6C6` leaked into ModeToggle.
- implementation: Introduce component-local `--mode-indicator-bg`, default it to the existing global token, and override it only on light `.mode-toggle`.
- validation: Managed build passed (245 modules). Playwright passed light/dark at 390px and 1280px with exact indicator colors (`#00B38C` light, `#064B34` dark), no horizontal overflow, and zero runtime errors.
- delivery: Commit `651ce5b` pushed to `origin/main`; Dokploy deployment `zTZh69eeZSOifpl9MJRxH` completed. Production serves `index-Dp0pBUNB.css` with the isolated light and dark indicator values.
- next_exact_action: User visual confirmation.

## Active Task — Journal mobile AI control gradient

- task_id: `genesis-journal-mobile-ai-gradient-20260811`
- owner: `klark`
- target_route: `/tradelocker/journal`
- status: `done`
- design_route: `dashboard / analytics / pattern-analytics-dashboard / supplied gradient + existing codebase / existing GenesisFX direction`
- visual_thesis: Keep the paired AI controls visually consistent; mobile uses the supplied lavender surface and tablet/desktop retain the established dark-purple gradient.
- scope_guard: Only the responsive backgrounds of `AiCoachButton` and `ChatButton`; no icon, label, geometry, interaction, theme-token, or desktop changes.
- quality_contract: `WCAG 2.2 AA`; preserve 16px text and existing focus/target behavior; validate exact computed gradients at 390px and 768px+, no overflow, build integration, and runtime errors.
- current_phase: done.
- validation_evidence: Managed build `bg_msph9gf0_70f2ab0c` passed (`tsc -b`, Vite 6.4.3, 245 modules) and its artifact was approved. Generated CSS contains the exact mobile `linear-gradient(266deg,#f4ebff .95%,#f2e8ff 79.28%)` plus the `@media(min-width:48rem)` restoration to `linear-gradient(241deg,#100919,#1d0e2f)`.
- production_evidence: Commit `7037c7a` pushed to `origin/main`; Dokploy deployment `pwJDedpWFeknZKHQ73brY` finished `done`. Production HTTP smoke passed and CSS bundle `index-BUC1WqeO.css` contains the exact mobile gradient plus the `48rem` desktop restoration.
- next_exact_action: none; await user visual confirmation on mobile.

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
## Active Task — Start Streaming Figma flow (2026-08-22)

- request: Submit application routes to `/streaming/startstreaming`; reproduce Figma section `4037:110661` across Ready, Terms, Permissions, and Accepted states; extend the design system; commit, push, and redeploy.
- design_route: dashboard / broadcast workspace / existing GenesisFX streaming workspace / Figma evidence / explicit thesis.
- visual_thesis: Preserve the compact GenesisFX dark-glass workspace and express broadcast readiness through one wide hero, an asymmetric details grid, and two progressively resolved consent modals.
- dials: variance 1; motion 1; density 8; art direction 3; implementation clarity 10; image priority 1; spacing 3.
- reference_map: `docs/start-streaming-reference-map-2026-08-22.md` (DRAFT; independent verification pending).
- source_nodes: `4037:110662`, `4037:110819`, `4037:110998`, `4037:111184`.
- assets: no runtime raster assets required; Figma screenshots are fidelity evidence only.
- quality_contract: WCAG 2.2 AA; 12px typography floor; 4.5:1 normal text; 3:1 large/UI; keyboard/focus trap/return; reduced motion; dark/light; 1920/960/390 containment; zero runtime errors and failed responses.
- current_phase: validated locally; preparing delivery.
- completed: verified Figma map; `/streaming/startstreaming`; submit redirect; Ready/Terms/Permissions/Accepted states; reusable design-system exports; dark/light and 1920/960/390 containment; modal focus trap/return; reduced-motion parity; build and browser QA PASS.
- validation_evidence: Vite build 293 modules; hero 1549×279 at x343/y143.8; cards 842×566, 691×283, 691×265; Terms 677×704 with 519×331 copy panel; Permissions 677×643 with three 520×91 rows; zero runtime errors and failed responses.
- next_exact_action: refresh Graphify, review final diff, commit, rebase/push origin/main, redeploy Dokploy, and rerun production QA.
- blockers: none.
