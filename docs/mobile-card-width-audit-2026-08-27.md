# Mobile card width audit — 2026-08-27

## Scope

Reviewed reusable card components and their page consumers for fixed `max-width` constraints that leave unused horizontal space below the `md` breakpoint. Also reviewed the 10X Challenges search/filter action row.

## Confirmed shared cases

- `StreamCard` (`381px` cap): used by Streaming Home, Browse, Replays, and Following, plus My Streaming Streams and Replays.
- `MyStreamFollowerCard` (`374px` cap): used by My Streaming Followers.
- 10X Challenges search/filter controls: the action group was content-sized, so the filter could not reach the mobile content edge.

## Resolution

- Both reusable card families use the full parent width below `md` and retain their original design cap from `md` upward.
- Search and filter share a dedicated full-width row below `lg`; search grows and the filter remains fixed at the right edge. The desktop action layout is preserved with `lg:contents`.

## Exclusions

Fixed widths belonging to modal canvases, logo artwork, chat panels, tables, and horizontally scrolling category cards were excluded because their width is structural rather than a mobile card cap.

## Regression gate

`e2e/mobile-card-width-system-qa.mjs` covers Streaming and My Streaming tab states plus 10X Challenges at 360, 390, 414, 430, 768, and 1440 pixels. It checks parent/card width equality on mobile, internal and document overflow, and search/filter edge alignment.
