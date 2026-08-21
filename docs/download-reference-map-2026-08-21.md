# GenesisFX Download — Visual Reference Map

STATUS: VERIFIED by independent verifier

Source: Figma file `Q5LFMKpcKD2ChXj9pyiHwk`, section `4037:117546`.

Reference frames:
- `frame_1.png` — `/home/clawd/genesis-download-reference/frame_1.png` — Figma `download/ IOS` (`4037:117547`), 1920×1027.
- `frame_2.png` — `/home/clawd/genesis-download-reference/frame_2.png` — Figma `download/ ANDROID` (`4037:117667`), 1920×1027.
- `frame_3.png` — `/home/clawd/genesis-download-reference/frame_3.png` — Figma `download/ Desktop` (`4037:117782`), 1920×1027.

## Section map

### 1. Page shell and header
- Citation: `frame_1.png`, `frame_2.png`, `frame_3.png`.
- Canvas: 1920×1027, dark screen `#000705`, outer 30px Figma-frame radius.
- Header divider at y=122. Header content aligns to the page content rail at x=295.
- Back control: 38×38 at x=295/y=42, `#09241c`, 10.227px radius; chevron centered.
- Heading `Install GenesisFX`: 24px Acid Grotesk regular, white, starts at x=348 and is vertically centered with the back control.

### 2. Left product introduction
- Citation: `frame_2.png` and `frame_3.png`; `frame_1.png` contains a large opaque black occlusion over the left introduction region and must not be used to infer alternate geometry.
- Logo card: x=295/y=226, 178×154, 30px radius, `#0c1311`, thin green-tinted edge and subtle `0 4.64px 23.2px rgba(0,0,0,.03)` shadow. Genesis globe mark is centered at about 103×115.
- H1 `Get the App`: x=295/y=419, 50px Acid Grotesk regular, 1.0 line height, `#f5f5f7`.
- Supporting sentence: x=295/y=474, 14px/18.8px, `#9c9ca4`. Figma copy says `Install on your iphone / ipad — instant access, offline support, no app store.` for all three frames.
- Feature stack begins x=295/y=521; three rows, each 584×80, 14px radius, 15px vertical gap, `#0c1311`, subtle border/shadow.
- Feature icon well: 44×44, 12px radius, `#09241c`, with 24px emerald icon. Text starts x=374: 16.5px bold title and 14px/18.8px muted description.
- Feature copy: `Offline Ready / Works without internet`, `Instant Launch / Opens in milliseconds`, `Fully Secure / Bank-grade encryption`.
- Footer note at x=295/y=818: 12px/18.8px, `#8b8b93`.

### 3. Installation panel
- Citation: `frame_1.png`, `frame_2.png`, `frame_3.png`.
- Desktop geometry: x=937/y=285, 697×551, 24px radius, `#0c1311`, 1.16px green-toned glass edge, clipped decoration, subtle shadow.
- Content rail is 481–484px wide and centered inside the panel at x≈1043.
- Decorative bottom: emerald glow ellipse centered near panel bottom and a low-opacity pixel/texture mask. Decoration must never cover readable content.

### 4. Platform tabs
- Citation: `frame_1.png`, `frame_2.png`, `frame_3.png`.
- Track: 481×46, top 70px inside the panel, `rgba(255,255,255,.04)`, 60px radius.
- Three options: iOS, Android, Desktop. Active segment is 136px for iOS/Android and 145px for Desktop, 45px tall, emerald translucent fill, 0.5px `#00f0a0` edge, soft glow/sparkle treatment.
- Labels: 16px/24.44px Acid Grotesk medium. Active label/icon white; inactive labels/icons `#808080`/`#606060`.
- Visible reference truth: the three exports show iOS, Android, and Desktop as the active tab, each with corresponding title/steps. The implementation detail that a selection swaps content without route navigation is an interaction inference, not something proven by the still images.

### 5. Installation title and steps
- Citation: iOS `frame_1.png`, Android `frame_2.png`, Desktop `frame_3.png`.
- Section title begins 106px from the panel left, y≈156 inside panel, 16px/24.44px medium, `#808080`.
- Step cards: 484×97, left=106 inside panel, 6px vertical gap (top positions 193, 300, 403), 28px radius, `#0c1311`, 0.5px edge.
- Icon well: 50×44, 12px radius, `#09241c`; 24px icon centered. Step badge: 14×14 emerald circle offset at the well's top-left, 7.47px black number.
- Step title: 16px/24.44px medium white. Step description: 14px/18.8px `#808080`.
- iOS: `Iphone / Ipad Installation`; Share → Add to Home Screen → Confirm & Launch.
- Android: `Android Installation`; three-dot Chrome menu → Add to Home Screen → Confirm & Launch.
- Desktop: the visible section title is exactly `Android Installation` (despite the active Desktop tab); Use Chrome or Edge → Click Install → Launch the App. Treat this as the required reference-copy truth, not a normalization opportunity.

### 6. Responsive behavior
- Visible reference truth: all three frames are desktop exports at 1920×1027. The breakpoints and stacking guidance below are inferred implementation requirements, not depicted reference states.
- ≥1280px: two-column composition matching the Figma anchors and proportions.
- <1280px: header remains full width; product intro and installation panel stack vertically, retain the same component anatomy, and fit without horizontal overflow.
- Mobile: use full-width cards, maintain ≥44px interactive tab targets, readable wrapping, and no clipped text or decoration.

## Token map

- Figma `surface-screen #000705` → `bg-gfx-sidebar` / existing screen token.
- Figma `container-box #0c1311` → `bg-gfx-green-800` / `GlassCard variant=light` base.
- Figma `container-box-alternative #09241c` → `bg-gfx-green-900` / semantic deep surface where applicable.
- Figma `container-border-middle-tone #064b34` → `border-gfx-green-200` or GlassCard gradient edge.
- Figma `surface-icon-alternative #00b38c` → `text/bg-gfx-green-300`.
- Figma body/tab text `#808080`, `#606060` → existing `gfx-neutral-400/300` tokens.
- Typography → existing `font-acid`, H1 50px, body 14px/18.8px, title 16px/24.44px, header 24px.

## Design-system reuse/new primitives

- Reuse `GlassCard` with `divider="none"` for the logo card, feature cards, installation panel, and step cards where its computed surface/edge matches.
- Add a reusable `PlatformTabs` design-system primitive for the 3-option active segment.
- Add reusable `AppFeatureCard` and `InstallStepCard` primitives rather than page-local copies.
- Export new primitives through `src/components/ui/index.ts` and show their canonical states on `/design-system`.
- Reuse existing icon library where the Figma asset is a standard semantic icon; use the exact existing Genesis logo asset if it matches the Figma artwork.

## Signature moments

- `frame_1.png`: iOS tab active inside the emerald-bottom installation glass panel, but a large opaque black rectangle obscures most of the left product introduction and the left edge of the panel. This is not an intended UI state: the identical region is fully rendered in frames 2 and 3, while the tabs/steps remain visible through the supposed overlay boundary—evidence of a broken Figma/source-layer export.
- `frame_2.png`: balanced 1920px two-column composition with Android active and Android-specific three-step content; no large occlusion is visible.
- `frame_3.png`: Desktop active pill with `Use Chrome or Edge`, `Click Install`, and `Launch the App`, while the visible section title remains exactly `Android Installation` and the left product-introduction geometry matches frame 2.

## Verification questions for the independent verifier

- Confirm each exact geometry/copy claim above against all three full-resolution references.
- Resolved: the large occlusion is in `frame_1.png`, not `frame_2.png`, and is a broken source-layer/export artifact rather than an intended state.
- Confirmed: Desktop's visible section title is `Android Installation`; do not normalize it to `Desktop Installation` for reference fidelity.
- If corrections are needed, edit this file directly, then apply exactly: `STATUS: VERIFIED by independent verifier`.
