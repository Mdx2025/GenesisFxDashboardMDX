# New Streaming application — verified visual reference map

STATUS: VERIFIED by independent verifier

## Source references

- Figma file `Q5LFMKpcKD2ChXj9pyiHwk`, section `4037:109164` — `streamer aplication( when the user is no registered)`.
- `frame_1.png`: Frame 4211364, node `4037:109165` — `/home/clawd/genesis-new-streaming-required-figma.png` (`1920×1171`).
- `frame_2.png`: Frame 234464, node `4037:109271` — `/home/clawd/genesis-new-streaming-application-figma.png` (`1920×1171`).
- `frame_3.png`: application-required panel, node `4037:109173` — `/home/clawd/genesis-new-streaming-required-panel-figma.png` (`1179×660` export including effects).
- `frame_4.png`: streamer application panel, node `4037:109281` — `/home/clawd/genesis-new-streaming-application-panel-figma.png` (`1179×959` export including effects).
- The references were read through Figma MCP metadata, variable definitions, screenshots, and design context before implementation. Code Connect was unavailable for this file/seat, so matching uses verified project primitives.

## Design route

- `surface=dashboard`, `archetype=creator onboarding`, `pattern_pack=existing GenesisFX streaming workspace`.
- Visual thesis: preserve the current RootLayout, 315px sidebar, TopBar, Acid Grotesk typography, semantic green glass, and compact form density while introducing only the application-specific primitives required by these frames.
- Dials: `design_variance=1`, `motion_intensity=1`, `visual_density=7`, `art_direction=3`, `implementation_clarity=10`, `image_usage_priority=1`, `spacing_generosity=3`.

## Section map

- Shared shell: `frame_1.png` and `frame_2.png`; dashboard sidebar, TopBar, and breadcrumb `Streaming / My channel / Go live` remain unchanged.
- Application gate: `frame_1.png` and `frame_3.png`; centered `1133×614px` glass panel at whole-canvas `x≈551/y≈159`, 94px broadcast well, 50px title, two-line explanation, primary Apply action, and secondary Back action.
- Application form: `frame_2.png` and `frame_4.png`; centered `1133×913px` glass panel at the same top anchor with a `699px` field column.
- Form controls: two `699×50px` pill inputs, eight `49px` topic chips across two rows, one `699×145px` textarea, a broadcasting-guidelines checkbox, and a right-aligned `208×44px` submit action.

## Geometry and token locks

- Desktop reference viewport is `1920×1171`; content begins after the `315px` sidebar and uses the existing `28px` 2xl page gutters.
- Gate panel: `1133×614px`, radius `30px`; icon well `94×94px`; heading `50px`; button row `543×46px` with `280×44px` and `248×46px` actions.
- Form panel: `1133×913px`, radius `30px`; control width `699px`; fields `50px`; chips `49px`; textarea `145px`; submit `208×44px`.
- Figma variables map to project tokens: container `#0C1311` → `gfx-green-800`/GlassCard; field border `#064B34` → `gfx-green-200`; chip border `#303030` → `gfx-neutral-250`; supporting text `#808080`; primary `#F1FFFA`; accent `#00B38C`.

## Signature moments

- `frame_1.png`: the sparse 1133×614 application gate, centered beneath the breadcrumb with a single broadcast glyph and paired pill actions.
- `frame_2.png`: the 699px-wide form rhythm inside the taller 1133×913 shell, with fields and topic chips aligned to one left edge.
- `frame_3.png`: the 94px green broadcast well and 50px `Streamer application required` title form the gate's visual center.
- `frame_4.png`: the two-row topic selector, 145px rounded textarea, consent copy, and isolated bottom-right submit action are the form's signature composition.

## Interaction map

- `Start streaming` on `/streaming` navigates to `/streaming/newstreaming`.
- The new route opens in the application-required state. `Apply to become a streamer` switches to the form without changing routes.
- `Back to Streaming` navigates to `/streaming`.
- Topic chips are multi-select native buttons with `aria-pressed`; the consent control is a native checkbox; the form prevents network submission because no application API is defined by the references or repository.
- Responsive behavior is inferred because Figma provides desktop only: preserve hierarchy, stack gate actions, wrap chips, keep fields within the viewport, and prevent document-level horizontal overflow.

## Quality contract

- WCAG 2.2 AA; normal text contrast `>=4.5:1`, large/UI `>=3:1`; typography floor `12px`; native controls; visible focus; reduced-motion parity.
- Validate `1920×1171`, `960×900`, and `390×844`; dark/light themes; route navigation; both application states; no horizontal overflow, runtime errors, or failed responses.
- Visual comparison must use `frame_1.png`/`frame_2.png` alongside the implementation in the same QA turn.
