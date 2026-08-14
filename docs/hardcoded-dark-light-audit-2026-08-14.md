# Design System Audit — hardcoded dark light-theme regression

Date: 2026-08-14  
Scope: GenesisFxDashboardMDX `#0D1512` backgrounds and the Settings profile header

## Executive summary

- The supplied light-theme screenshot was reproduced in `SettingsPage.tsx`: the profile shell used `bg-[#0D1512]` directly.
- The previous semantic-surface audit covered `#0C1311`; the one-step color variation bypassed that exact literal census.
- The profile shell now uses the established `surface-raised` contract: `#0C1311` in dark theme and `#fff` in light theme.
- A reusable source/runtime audit now guards both `#0D1512` and `#0C1311` computed light-theme backgrounds.

## File-level actions

- `src/pages/SettingsPage.tsx`: replaced `bg-[#0D1512]` with `surface-raised`; added `data-settings-profile-card` as a stable QA hook.
- `e2e/hardcoded-dark-light-audit.mjs`: added recursive source census, computed-color checks, mobile/desktop viewports, dark/light profile assertions, overflow checks, HTTP checks, runtime-error capture, and optional final screenshot output.

## Acceptance criteria

- No `bg-[#0D1512]` or equivalent CSS background declaration remains under `src/`.
- The Settings profile shell computes to exact white in light theme and canonical `#0C1311` in dark theme.
- The supplied banner artwork, badges, avatar, spacing, and border geometry remain unchanged.
- No horizontal overflow or runtime errors at 390×844 or 1440×1000.

## Local validation

- Build: passed, 245 transformed modules.
- Static source census: 0 offenders.
- Focused Playwright matrix: 4/4 scenarios passed (`/settings`, light/dark, 390×844 and 1440×1000).
- Computed profile surface: light `rgb(255, 255, 255)`; dark `rgb(12, 19, 17)`.
- Overflow: 0 failures.
- Runtime errors: 0.
- Final screenshot: `/home/clawd/genesis-settings-light-surface-fixed.png`.

## Reproducible command

```bash
ROUTES=/settings OUTPUT_PATH=/tmp/genesis-settings-dark-light.json \
  node e2e/hardcoded-dark-light-audit.mjs
```

When `ROUTES` is omitted, the script derives every route from `src/data/pages.tsx` and includes `/login` and `/register`.
