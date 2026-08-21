# Leaderboards username modal — visual reference map

STATUS: VERIFIED by independent verifier

## 1. Source references

- Figma file: `Q5LFMKpcKD2ChXj9pyiHwk`
- Screen node: `4037:115805` — `If the user has not created a username`
- Modal node: `4037:116043` — `Frame 2085662761`
- Streaming screen node: `4037:107534` — `Streaming`
- Streaming modal node: `4037:107838` — the same `Frame 2085662761` component at `755×551px`
- Full-screen export: `/home/clawd/genesis-leaderboards-figma-full.png`
- Modal export: `/home/clawd/genesis-leaderboards-figma-modal.png`
- Streaming modal export: `/home/clawd/genesis-streaming-claim-username-figma.png`
- Validator aliases: `frame_1.png` = Streaming modal export; `frame_2.png` = Leaderboards modal export; `frame_3.png` = Leaderboards full-screen export.

## 2. Section map

### Overlay and modal shell

- The full dashboard is dimmed by a black translucent overlay while the modal is centered.
- Modal node `4037:116043` is exactly `755×551px`, radius `18.563px`, surface `#0C1311`, with a subtle `0 4.641px 23.204px rgba(0,0,0,.03)` shadow.
- The shell also has a thin teal/green outline visible around its perimeter.
- A broad green decorative glow rises from below the card: `493×278px`, centered at `calc(50% + 19px)`, bottom `-197.16px`.
- Close control is `24×24px` at `x=721.84`, `y=18.84`.
- Citation: `frame_3.png` (`genesis-leaderboards-figma-full.png`), `frame_2.png` (`genesis-leaderboards-figma-modal.png`).
- The duplicate component at node `4037:107838` confirms the Streaming item uses the same modal geometry and visual contract; citation: `frame_1.png` (`genesis-streaming-claim-username-figma.png`).

### Intro block

- Icon tile is `73×73px` at `x=95.84`, `y=119.84`, radius `18px`, with the teal `@` glyph centered and internal top/bottom glow.
- Heading is `Claim your username`, 36px regular Acid Grotesk, positioned from `x=189.84`, centered around `y=135.34`.
- Supporting copy is 16px/24.44px, `#808080`, two lines beginning at `x=189.84`, `y=166.84`.
- Citation: `frame_1.png`, `frame_2.png`.

### Username field and availability

- Label `User Name` is 16px medium at `x=102`, centered around `y=251.5`.
- Input is `562×50px`, x-center `calc(50% - .5px)`, `y=272`, radius `30px`, surface `#0C1311`, border `#00B38C`.
- Prefix glyph is a 14px teal `@`; placeholder/reference value is `t.shepang`; the right check is `17.039px`.
- `Available` is 16px regular teal at `x=102`, centered around `y=342.5`, visible when a non-empty username is present.
- Citation: `frame_1.png`, `frame_2.png`.

### Primary action

- `Continue` is a `561×44px` pill at `x=97`, `y=377.84`, surface `#F1FFFA`, black 16px medium label.
- Hover may use the existing design-system green/white glow treatment, but the default state must remain visually identical to the reference.
- Citation: `frame_1.png`, `frame_2.png`.

## 3. Behavior map

- **Not visually verifiable from the two supplied static images.** The images show a `Leaderboards` sidebar item, a close icon, username input, availability state, and `Continue` control, but cannot establish click behavior, route changes, reset behavior, keyboard interaction, ARIA attributes, or API behavior.

## 4. Signature moments

- `frame_1.png`: `755×551px` dark opaque shell with a thin teal outline, low green glow, and small top-right close control.
- `frame_2.png`: 73px teal `@` identity tile aligned with the 36px heading and two-line unlock explanation.
- `frame_3.png`: full-screen overlay context with the modal centered over the dashboard shell.

## 5. Responsive inference

- Only the desktop frame is depicted. Smaller-viewport behavior is not visually verifiable from the supplied images; no scaling rule is established by these references.
