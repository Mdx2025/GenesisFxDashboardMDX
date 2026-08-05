# Genesis Score Radar Reference Map

STATUS: VERIFIED — independent verifier verify_genesis_radar_map

## Source

- file: `/home/clawd/.openclaw/media/inbound/Group_2085662830---ee487db5-c8dd-45d8-b51c-d95cd56c71d0.png`
- native dimensions: `454x357`
- format: transparent grayscale-alpha PNG
- target: `/tradelocker/journal` → `Statistics` → `Genesis Score`
- fidelity: visual/structural; preserve the existing card shell and title, reproduce the chart geometry and label placement.

## Observed Construction

- transparent background; the surrounding GenesisFX card provides the dark surface.
- five concentric pentagon outlines centered near the visual middle; the raster geometry is optically wide/vertically compressed rather than mathematically regular.
- no center-to-vertex spokes or other radial axis lines are drawn; the five metrics are represented by the pentagon vertices and labels only.
- pentagon orientation: one vertex points straight up; the lower edge is horizontal.
- grid/axes: muted gray, approximately `#303030` with anti-aliased alpha; visually thin (`~1px`).
- labels: medium gray approximately `#808080`; grotesk/sans; clockwise from top: `Win%`, `Profit factor`, `Avg win/loss`, `Risk to Reward`, `Consistency`.
- no plotted data polygon, fill, markers, score dots, or legend. The opaque white blob near the center and the white blob overlapping the lower-left grid vertex are raster artifacts and must not be reproduced.
- label anchors: top centered; right labels left-aligned/outward; left labels right-aligned/outward; bottom labels sit below the lower vertices with very tight clearance to the raster's bottom edge.

## Responsive Mapping

- use one responsive SVG with `viewBox="0 0 454 357"`, `width="100%"`, and `height="100%"`.
- preserve aspect ratio with centered meet behavior; never stretch the pentagons.
- the chart wrapper consumes the full available height between the Genesis Score heading and score section.
- prevent label clipping at mobile/tablet/desktop widths; keep visible label text at or above the 12px project floor.

## Locked / Allowed

- locked: five rings, no drawn radial axes, empty plot, label copy/order, top-up orientation, muted monochrome treatment, transparent background.
- allowed: optical offsets of up to 2 CSS px to avoid clipping and fit the existing card; font fallback to the project `font-acid` stack; scalable stroke via `vector-effect="non-scaling-stroke"`.
- forbidden: new data values, green shape/dots, glow, animation, library dependency, raster image runtime.

## Acceptance

- reference labels, five-ring count, and absence of drawn radial axes are exact.
- chart fills the available Genesis Score chart height without colliding with the score section.
- no horizontal overflow at 390, 1024, or 1536 widths.
- no visible text below 12px; labels meet measured contrast target against the effective card background.
- SVG has `role="img"` and an accessible name describing an empty five-metric Genesis Score radar.
