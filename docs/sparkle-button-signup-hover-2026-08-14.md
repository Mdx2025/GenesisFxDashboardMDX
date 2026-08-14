# SparkleButton Sign Up Hover Parity — 2026-08-14

## Outcome

The shared dashboard `SparkleButton` now uses the hover interaction from the GenesisFX Markets header `Sign Up` button while retaining its existing rest state, dimensions, content alignment, and focus treatment.

## Measured reference

The public `Sign Up` control at `https://genesisfxmarkets.mdxpreview.xyz` was measured in Chromium before, during, and after hover:

- No scale, translation, or geometry change.
- A white `5%` surface wash transitions in over `350ms`.
- Eight 2px sparkles run staggered `2.4s` twinkle cycles.
- Sparkle opacity follows `0 → 0.35 → 0`.
- Delays: `0s`, `0.7s`, `1.4s`, `0.3s`, `1.1s`, `1.9s`, `0.5s`, and `1.6s`.
- Animations remain paused until hover.

## Implementation

- `src/components/ui/SparkleButton.tsx` owns the reusable hover surface and eight decorative sparkle nodes.
- `src/app.css` owns the reference timing, positions, stagger, and fine-pointer hover gate.
- Dark theme uses the reference white paint. Light theme keeps the same motion contract with semantic GenesisFX green paint.
- Disabled buttons do not activate the hover. Reduced motion replaces twinkling with a static `0.25`-opacity sparkle state and removes the surface transition.
- Existing static sparkle artwork remains untouched, so the component's rest appearance does not change.

## Local validation

- `pnpm build`: passed, 245 transformed modules.
- `e2e/sparkle-button-hover-qa.mjs`: passed in dark and light for rest, hover, disabled, geometry, exact timing/stagger, and reduced motion; zero runtime errors.
- `e2e/sparkle-button-optical-qa.mjs`: passed on `/home`; Deposit `+1px`, Withdraw/Transfer `-0.5px`, icon paint and content union within `+1px`; zero runtime errors.
