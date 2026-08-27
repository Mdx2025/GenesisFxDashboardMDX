# Mobile card width audit — 2026-08-27

## Executive summary

Audited every route declared in `src/data/pages.tsx`, the tab-driven states in Journal, Academy, PAMM, Copy Trading, and Signals, and the reusable card roots under `src/pages` and `src/components`. Catalog/list cards now fill their single-column mobile grid tracks. No additional production card family required a width change after the Streaming, My Streaming, Challenges, and Signals corrections.

The final browser matrix covered 47 routes, 141 route/view states, 780 visible cards, and 522 one-column grids at 360px, 430px, and 600px. Result: zero card/grid mismatches, document overflow, runtime errors, or failed responses.

## Method

1. Queried the project graph for card, grid, `max-width`, search, and tab relationships.
2. Inventoried every `GlassCard`/card root with a fixed or capped width and every responsive one-column grid.
3. Classified structural widths separately from catalog-card caps.
4. Ran `e2e/mobile-card-grid-exhaustive-qa.mjs` across all declared routes and the major tab-driven views.
5. Kept the targeted geometry assertions in `e2e/mobile-card-width-system-qa.mjs` for the confirmed shared defects and the Explore Markets control stack.

## Confirmed shared cases

- `StreamCard` (`381px` cap): used by Streaming Home, Browse, Replays, and Following, plus My Streaming Streams and Replays.
- `MyStreamFollowerCard` (`374px` cap): used by My Streaming Followers.
- `FollowerProviderCard` (`504px` cap): used by Signals Follower; its cap started before the two-column grid breakpoint and left unused space on wide mobile viewports.
- 10X Challenges search/filter controls: the action group was content-sized, so the filter could not reach the mobile content edge.
- Copy Trading search/view controls: Search was full-width at the base breakpoint and forced the three icon actions onto a second row.

## Resolution

- Both reusable card families use the full parent width below `md` and retain their original design cap from `md` upward.
- The Signals follower card fills its parent below `sm` and retains the original 504px cap from `sm` upward. Its identity/actions header stacks below 400px and its metric cells use compact mobile padding, removing the pre-existing internal overflow at 360px and 390px.
- Search and filter share a dedicated full-width row below `lg`; search grows and the filter remains fixed at the right edge. The desktop action layout is preserved with `lg:contents`.
- Copy Trading keeps Search, Favorites, List, and Grid on one non-wrapping row below `lg`; Search flexes while all three 48px icon buttons remain fixed.

## Exclusions

The source inventory found 12 card roots with `max-width` constraints. They classify as:

- 6 modal canvases capped by `95vw`.
- 2 large responsive content canvases whose caps exceed every mobile viewport.
- 1 intentionally centered registration choice card.
- 3 responsive catalog-card families already corrected (`ChallengeAccountCard`, `MyStreamFollowerCard`, and `FollowerProviderCard`).

Fixed widths belonging to modal canvases, logo artwork, chat panels, tables, intentionally centered cards, and horizontally scrolling category cards remain structural and were not widened.

## Explore Markets

The `/news/discover` controls now use a column layout below `md`: category tabs first, then a full-width search field. At `md` and above they return to a horizontal row and the search field restores its 287px design width.

## Regression gate

`e2e/mobile-card-width-system-qa.mjs` covers Streaming, My Streaming, Signals Follower, Copy Trading, 10X Challenges, and Explore Markets at 360, 390, 414, 430, 600, 768, and 1440 pixels. It checks parent/card width equality before each grid breakpoint, internal and document overflow, search/filter edge alignment, the single-row Copy Trading controls, and the mobile Explore Markets stack.

`e2e/mobile-card-grid-exhaustive-qa.mjs` derives its route list from `src/data/pages.tsx` and audits every visible card inside a one-column grid. It excludes explicitly centered cards and nested multi-card compositions so structural surfaces do not produce false positives.
