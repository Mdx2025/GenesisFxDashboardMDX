# Start Streaming — visual reference map

STATUS: VERIFIED by independent verifier

## Source references

- Figma file `Q5LFMKpcKD2ChXj9pyiHwk`, section `4037:110661`.
- `frame_1.png`: `Ready to go live?`, node `4037:110662` — `/home/clawd/genesis-startstreaming-ready-figma.png`.
- `frame_2.png`: `Broadcaster Terms & Conditions`, node `4037:110819` (modal `4037:110976`) — `/home/clawd/genesis-startstreaming-terms-figma.png`.
- `frame_3.png`: `Grant broadcast permissions`, node `4037:110998` (modal `4037:111155`) — `/home/clawd/genesis-startstreaming-permissions-figma.png`.
- `frame_4.png`: `Grant broadcast permissions - accepted`, node `4037:111184` (modal `4037:111341`) — `/home/clawd/genesis-startstreaming-permissions-accepted-figma.png`.
- Evidence was read through Figma MCP metadata, variable definitions, screenshots, and design context. Code Connect is unavailable for this file/seat, so verified project primitives are mapped manually.

## Design route

- `surface=dashboard`, `archetype=broadcast workspace`, `pattern_pack=existing GenesisFX streaming workspace`.
- Visual thesis: preserve the current RootLayout, 315px sidebar, TopBar, Acid Grotesk typography, compact dark glass surfaces, and green broadcast affordances; introduce only the broadcast-session and permission primitives required by the four frames.
- Dials: `design_variance=1`, `motion_intensity=1`, `visual_density=8`, `art_direction=3`, `implementation_clarity=10`, `image_usage_priority=1`, `spacing_generosity=3`.

## Section map

- Shared shell: all frames retain the dashboard sidebar, TopBar, and breadcrumb `Streaming / My channel / Go live`.
- Ready hero: `frame_1.png`; `1549×279px`, radius `18.563px`, 73px broadcast icon well, `NEW SESSION` badge, 50px `Ready to go live?` heading, and supporting copy.
- Session details: `frame_1.png`; left `842×566px` panel containing title, category, symbol, and a `693×44px` `Go live now` action.
- Channel: `frame_1.png`; right `691×283px` panel with channel URL, copy action, and `Reset key` control.
- Before you go live: `frame_1.png`; right `691×265px` checklist panel.
- Broadcaster Terms modal: `frame_2.png`; centered `677×704px` shell, terms copy panel `519×331px`, checked consent, `230×46px` Cancel and `230×44px` Continue actions.
- Grant permissions modal: `frame_3.png`; centered `677×643px` shell with three `520×91px` permission rows and `Enable` actions.
- Accepted permissions: `frame_4.png`; same modal geometry, each row swaps `Enable` for an `87×40px` Active pill with green check.

## Geometry and token locks

- Desktop references are `1920px` wide; Ready frame is `1171px` high and modal frames are `1086px` high.
- Ready hero whole-canvas anchor is approximately `x=344/y=144`; cards below form an `842px + 15px + 691px` grid.
- Terms modal: `677×704px`, radius `18.563px`; Permissions modal: `677×643px`, radius `18.563px`.
- Permission rows: `520×91px`, radius `18.563px`; icon wells `46×46px`, radius `10px`.
- Figma variables map to project tokens: container `#0C1311`; field/border `#064B34`; middle-tone border `#303030`; primary text `#ECECEC`; body `#808080`; accent `#00B38C`; primary action `#F1FFFA` with `#CFF2E6` glow.

## Copy locks

- Hero: `Ready to go live?`, `Set your title and market, then stream from your browser - no OBS needed. Your channel URL stays the same every session.`
- Session labels: `Session details`, `Stream title`, `Category`, `Symbol`, `Test`, `4/120. Viewers see this in the browse list.`, `Go live now`.
- Channel: `Your channel`, `Share your channel URL - viewers land here every time you go to live`, `Reset key`, `Channel URL`, `https://dashboard.genesisfxmarkets.com`.
- Before you go live: `Share your @channel URL in advance - followers get notified.`; `Use the built-in browser broadcaster - no OBS setup required.`; `Your stream is recorded automatically - you'll be asked to approve the replay when you golive.` The source's `golive` spelling is intentional reference copy.
- Terms title/subtitle: `Broadcaster Terms & Conditions`; `You must re-agree to the streaming terms every time you go live.`
- Terms body begins `These Live Streaming Terms & Conditions ("Streaming Terms") govern any Client of Genesis FX Markets Ltd ("the Company," "Genesis," "we," "us," or "our") who initiates, hosts, participates in, or otherwise transmits live audio, video, screen, or other media content ("Broadcaster," "you," or "your") through any streaming surface operated by the Company.` It continues through the incorporation and precedence paragraph, then `1. Definitions` and `"Broadcaster" means the verified account holder who transmits a Stream`.
- Terms consent: `I have read and agree to the Broadcaster Terms & Conditions, and I consent to turning on my camera and microphone and to my stream being recorded.` Actions are `Cancel` and `Continue`.
- Permissions title/subtitle: `Grant broadcast permissions`; `Camera, microphone, and screen share must all be approved before your stream can begin.`
- Permission rows: `Camera` / `Required- viewers see your camera feed.`; `Microphone` / `Required- viewers hear your commentary`; `Screen recording` / `Required - consent to session recording for replays.`
- Permissions helper: `Denied a permission by mistake? Enable it in your browser’s site settings, then tap the button again`. Actions are `Cancel` and `Start streaming`; the latter retains the light primary-action presentation in both permission screenshots.

## Interaction map

- Submitting the application at `/streaming/newstreaming` navigates to `/streaming/startstreaming`.
- `Go live now` opens Broadcaster Terms. Cancel closes and returns focus; Continue opens Grant broadcast permissions.
- Each `Enable` action grants one permission and replaces itself with the accepted `Active` pill. `Start streaming` is gated until all three permissions are active.
- Escape closes the active modal and restores focus. Tab remains trapped inside an open modal.
- Channel copy uses the clipboard when available and provides a visible copied state. `Reset key` is a local, non-destructive presentation action because no backend contract exists.
- Responsive behavior is inferred from desktop references: preserve hierarchy, stack the lower cards, keep modals within the viewport, allow internal scrolling, and prevent document-level horizontal overflow.

## Signature moments

- `frame_1.png`: the wide broadcast hero followed by one tall session card and two stacked supporting cards.
- `frame_2.png`: the dense legal terms panel floating over a dimmed Ready page, with consent and paired actions.
- `frame_3.png`: three equal permission rows with icon wells and right-aligned Enable pills.
- `frame_4.png`: all three rows resolve to compact green-check Active pills without moving the modal geometry.

## Quality contract

- WCAG 2.2 AA; normal text contrast `>=4.5:1`, large/UI `>=3:1`; typography floor `12px`; native controls; visible focus; modal focus trap and return; reduced-motion parity.
- Validate `1920×1171`, `960×900`, and `390×844`; dark/light themes; application redirect; Ready/Terms/Permissions/Accepted states; no horizontal overflow, runtime errors, or failed responses.
- Compare all four references alongside implementation screenshots in the same QA turn. Maximum two visual revision attempts after the initial implementation.
