# Mobile card width audit — 2026-08-27

## Scope

Reviewed reusable card components and their page consumers for fixed `max-width` constraints that leave unused horizontal space below the `md` breakpoint. Also reviewed the 10X Challenges search/filter action row.

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

Fixed widths belonging to modal canvases, logo artwork, chat panels, tables, and horizontally scrolling category cards were excluded because their width is structural rather than a mobile card cap.

## Regression gate

`e2e/mobile-card-width-system-qa.mjs` covers Streaming, My Streaming, Signals Follower, Copy Trading, and 10X Challenges at 360, 390, 414, 430, 600, 768, and 1440 pixels. It checks parent/card width equality before each grid breakpoint, internal and document overflow, search/filter edge alignment, and single-row Copy Trading controls.
