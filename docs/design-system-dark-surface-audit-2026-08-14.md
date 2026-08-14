# Design System Audit — dark surface literals

Date: 2026-08-14  
Scope: GenesisFxDashboardMDX theme-aware UI surfaces using `#0C1311`

## Executive summary

- Production light-theme measurement found 18 visible elements still rendering `rgb(12, 19, 17)` across Partner, Referral Details, Statistics, Marketing Tools, and Settings.
- The codebase also contained dormant modal surfaces whose dark literals were currently hidden only by CSS cascade order.
- All UI-surface uses now resolve through `--color-gfx-surface-raised` (`#0C1311` dark / `#FFF` light).
- Raised-surface borders now resolve through `--color-gfx-surface-raised-border` (`#162D25` dark / `#ECECEC` light).
- Signal cards now use the same semantic contract instead of literal fallback colors.

## Files corrected

- `src/pages/PartnerPage.tsx` and `src/pages/PartnerPage.css`
- `src/pages/partner/{Links,Marketing,Referrals,Statistics}Page.tsx`
- `src/pages/SettingsPage.tsx`
- `src/components/modals/{ChangeEmail,ChangePassword,ChangePicture,CloseAccount,TwoFactor}Modal.tsx`
- `src/components/ui/SignalStrategyCard.tsx`
- `src/pages/SignalsPage.tsx`
- `src/app.css`

## Intentional `#0C1311` exceptions

The remaining literals are not page surfaces and must not be theme-swapped as cards:

- Canonical token definitions and `/design-system` documentation.
- ThemeSwitch dark-track artwork.
- SVG/QR/icon internal paint that provides contrast against colored shapes.
- Canvas and SVG gradient stops in charts and news/journal artwork.
- Partner decorative glow and the dark endpoint of the Partner marketing illustration; both have explicit light-theme behavior.

## Reproducible checks

- Runtime surface audit: `/home/clawd/.openclaw/workspace/scripts/gfx-semantic-dark-surface-audit.mjs`
- Static literal census: `rg -n --glob '!dist/**' --glob '!graphify-out/**' '#0[Cc]1311' src`
- Build: `pnpm build`

## Acceptance criteria

- Light theme: no visible non-SVG element computes to `rgb(12, 19, 17)` in the audited scenarios.
- Dark theme: semantic raised surfaces retain `rgb(12, 19, 17)`.
- No inline background literals remain on audited cards, fields, dropdowns, or modal shells.
- No horizontal overflow or runtime console errors at mobile and desktop widths.

## Validation result

- Production pre-fix census: **18** visible dark surfaces in light mode.
- Final local matrix: **72/72** scenarios passed at 390×844 and 1440×1000, in light and dark themes.
- Final matrix: **0** light-theme dark-surface offenders, **0** semantic color mismatches, **0** horizontal-overflow failures, and **0** runtime errors.
- Production build: **245 modules**, completed successfully; the existing large-chunk advisory is unchanged.
