# Control optical-centering audit

Date: 2026-08-14

## Scope

- 40 registered and authentication routes.
- Light and dark themes.
- 390×844 and 1440×1000 viewports.
- Buttons, tabs, toggles, pills, badges, chips, tags, triggers, actions, and controls.
- Visible and off-viewport DOM controls, including responsive duplicates.

## Measurement method

The audit compares each control's border-box center with the union of its non-absolute text and icon geometry. It also records top and bottom content gaps, computed padding, line height, overflow, runtime errors, and active ModeToggle SVG paint.

Acceptance tolerance is 2 CSS pixels. Sub-pixel font-metric differences below 1 pixel are retained when the parent primitive is structurally centered; changing them would introduce cross-font and cross-browser drift.

## Production baseline

- 160 route/theme/viewport scenarios.
- 3,027 text-bearing controls inspected.
- 24 center offenders, all from one repeated Academy chapter-row component.
- 70 active ModeToggle SVG paint failures in light theme.
- 0 overflow scenarios.
- 0 runtime errors.

The Academy rows used `items-start` plus 12px vertical padding inside a fixed 61px control. Their visual content left 15–16px above and 7–8px below, producing a 3.5–4.5px downward center delta.

ModeToggle already supplied `#fff` to active SVGs, but the global light-theme white-SVG normalization overrode those attributes with `#00B38C !important`.

## Corrections

- Added a semantic active-state SVG exception for ModeToggle so every painted active fill or stroke resolves to `#fff`.
- Changed Academy chapter-row anatomy to `items-center` with horizontal padding only. The 61px target height, focus behavior, text hierarchy, active state, and responsive layout remain unchanged.

## Reproducible gate

```bash
node /home/clawd/.openclaw/workspace/scripts/gfx-control-optical-centering-audit.mjs \
  <base-url> \
  /tmp/gfx-control-optical-centering-audit.json
```

The final gate requires zero controls outside the 2px tolerance, exact white active ModeToggle paint, zero horizontal overflow, and zero runtime errors.

## Local result

- Build: 245 modules, passed.
- Geometry matrix: 3,027/3,027 controls within tolerance.
- Active ModeToggle SVG failures: 0.
- Keyboard activation and visible focus: passed.
- Minimum target size for modified controls: passed.
- Reduced motion: passed.
- 200%-equivalent reflow at 720 CSS pixels: passed without horizontal overflow.
- Mobile and desktop overflow/runtime errors: 0.
