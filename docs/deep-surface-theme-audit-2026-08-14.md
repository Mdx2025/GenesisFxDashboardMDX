# Design System Audit — `#09241C` deep surfaces

Date: 2026-08-14  
Scope: GenesisFxDashboardMDX hardcoded `bg-[#09241C]` UI backgrounds

## Outcome

- Added `--color-gfx-surface-deep`: `#09241C` in dark theme and `#FFF` in light theme.
- Migrated visible content surfaces, badges, icon wells, and modal controls from the raw background literal.
- Routed dividers, inactive toggle tracks, progress tracks, and borders through their existing semantic tokens.
- Preserved `#09241C` used as SVG/chart paint, scrollbar paint, gradients, and borders outside the reported background scope.

## Affected UI

- Home Server Time.
- Partner marketing badge, referral-link action buttons, and Statistics icon well/progress track.
- Settings Verification tip, ETA pill, identity icon well, feature dividers, inactive toggles, and Security panel.
- Two-Factor Authentication secret control and modal icon well.
- Change Picture, Change Password, and Change Email modal icon wells.
- Journal Statistics dividers.
- `/design-system` semantic-surface catalogue.

## Reproducible checks

```bash
pnpm build
OUTPUT_PATH=/tmp/genesis-deep-surface-theme-audit.json \
  node e2e/deep-surface-theme-audit.mjs
```

The browser audit covers light and dark themes at 390×844 and 1440×1000. It verifies exact semantic colors, source-literal absence, horizontal overflow, and runtime errors across the affected routes, tabs, and modals.

## Local validation

- Production build: passed, 245 transformed modules.
- Static `bg-[#09241C]` census: 0 offenders.
- Focused Playwright matrix: 44/44 scenarios passed.
- Light deep surfaces: exact `rgb(255, 255, 255)`.
- Dark deep surfaces: exact `rgb(9, 36, 28)`.
- Horizontal overflow: 0 failures.
- Runtime errors: 0.
- Final visual evidence: `/home/clawd/genesis-deep-surface-light-2fa.png`.

## Remaining intentional literals

`#09241C` remains where it is not a CSS background surface: token definitions, SVG/chart strokes and fills, scrollbar paint, gradients, and explicit borders. These require role-specific treatment and are not interchangeable with a white surface.

## Public validation and delivery

- Focused public Playwright matrix: 44/44 scenarios passed.
- Static `bg-[#09241C]` offenders: 0.
- Exact colors: `rgb(255, 255, 255)` in light and `rgb(9, 36, 28)` in dark.
- Horizontal overflow: 0 failures.
- Runtime errors: 0.
- HTTP smokes for `/`, `/home`, `/settings`, `/partner/marketing`, and `/tradelocker/journal`: 200.
- Implementation commit: `c6fb9e3`.
- Dokploy deployment: `cVqeoK3kkkM_zhn7_D446`, completed `2026-08-15T01:19:44.420Z`.
- Public visual evidence: `/home/clawd/genesis-deep-surface-light-2fa-production.png`.
