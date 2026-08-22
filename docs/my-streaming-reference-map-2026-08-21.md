# My Streaming — verified visual reference map

STATUS: VERIFIED by independent verifier

## Source and frame map

- Figma file: `Q5LFMKpcKD2ChXj9pyiHwk`, section `4037:109406`.
- `frame_1.png`: Overview `4037:109407` — `/home/clawd/genesis-mystreams-figma-overview.png` (`1920×1171`).
- `frame_2.png`: Streams `4037:109587` — `/home/clawd/genesis-mystreams-figma-streams.png` (`1920×1171`).
- `frame_3.png`: Replays `4037:109892` — `/home/clawd/genesis-mystreams-figma-replays.png` (`1920×1171`).
- `frame_4.png`: Earnings `4037:110196` — `/home/clawd/genesis-mystreams-figma-earnings.png` (`1920×1435`).
- `frame_5.png`: Followers populated `4037:110502` — `/home/clawd/genesis-mystreams-figma-followers.png` (`1920×1171`).
- Shared banner `4037:109477`, tabs `4037:109456`, owner stream card `4037:109595`, earnings summary `4037:110204`, follower card `4037:110641`.
- The supplied reference was read through Figma MCP metadata, variables, screenshots, and design context before implementation.

## Design route

- `surface=dashboard`, `archetype=analytics`, `pattern_pack=pattern-analytics-dashboard`.
- Evidence: Figma section plus the live GenesisFX component library and semantic tokens.
- Visual thesis: preserve the verified RootLayout, TopBar, Acid Grotesk typography, restrained green glass, 18.563px cards, and compact creator-operations density.
- Dials: `design_variance=1`, `motion_intensity=2`, `visual_density=7`, `art_direction=4`, `implementation_clarity=10`, `image_usage_priority=2`, `spacing_generosity=3`.

## Geometry and state locks

- Desktop content begins at whole-canvas `x=343`; channel banner `1549×279` at `y=265`, radius `18.563px`.
- Banner identity well `73×73`; title `Joe doe` at `50px`; Share `139×46`; Start streaming `197×44`.
- Five-state toggle is `740×46` at `y=607`, ordered Overview, Streams, Replays, Followers, Earnings.
- Overview contains four `148px` metric cards in one desktop row. Streams and Replays use the owner variant of the canonical `381×319` StreamCard without Feature or Follow controls.
- Followers uses one `374×380` performance card. Earnings uses a `1546×304` summary and a five-column activity table with the exact empty copy `No activity yet`.

## Section map

- Shared shell and channel banner: `frame_1.png` through `frame_5.png`; all preserve the dashboard sidebar, TopBar, identity, wallet balance, and two actions.
- Overview: `frame_1.png`; four metric cards for active streams, total replays, peak viewers, and Social Wallet.
- Streams and Replays: `frame_2.png` and `frame_3.png`; each uses the owner stream-card variant without viewer-facing Follow or Feature controls.
- Followers: `frame_5.png`; one strategy/follower card with identity, AUM/users, ROI, duration, sparkline, and Details action.
- Earnings: `frame_4.png`; two balance summaries, transfer action, and the five-column empty activity table.

## Signature moments

- `frame_1.png`: the 1549×279 textured channel banner leading into the five-state glass toggle and four evenly weighted metrics.
- `frame_2.png`: a deliberately sparse owner view with one 381×319 stream card and no viewer-facing controls.
- `frame_4.png`: paired 50px currency totals in the 304px summary, followed by the full-width empty earnings ledger.
- `frame_5.png`: a single 374×380 follower-performance card with green ROI curve and Details action.

## Tokens and assets

- Container `#0C1311`; border middle `#064B34`; headings `#FFFFFF`; supporting text `#808080/#A0A0A0`; primary green `#10BC83`; primary button `#F1FFFA`.
- Channel texture is the Figma-exported raster stored at `public/images/streaming-channel-texture.png`; it is decorative and hidden from assistive technology.

## Quality contract

- WCAG 2.2 AA; normal text contrast `4.5:1`, large/UI `3:1`; typography floor `12px`; native buttons and keyboard-accessible state switching; visible focus; reduced-motion parity.
- Validate desktop `1920×1171` and Earnings `1920×1435`, intermediate `960×900`, mobile `390×844`, dark/light, no horizontal overflow, no runtime errors or failed responses.
