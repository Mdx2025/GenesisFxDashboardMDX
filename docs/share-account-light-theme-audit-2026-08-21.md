# Share Account — Light Theme Design System Audit

Date: 2026-08-21  
Route: `/tradelocker/accounts/L%23716445`  
Surface: `ShareAccountModal`

## Outcome

- Replaced six dark-only surface/color sites in `ShareAccountModal` with the existing semantic design-system contract.
- Kept the Figma geometry unchanged while allowing the modal shell, settings card, stat cards, chart card, action wells, share-link field, borders, supporting text, and chart axes to resolve per theme.
- Added a durable Playwright matrix for dark/light at 1920×1027 and 390×844.

## Inventory

- Theme source: `src/app.css` with 72 unique `--color-gfx-*` custom properties.
- Reused primitives: `GlassCard`, `ToggleSwitch`, and `SharePerformanceChart`; no duplicate component or new token was required.
- Before this fix: six dark-only UI sites used combinations of `#0C1311`, `#101E1A`, `#404040`, `#808080`, or `#A0A0A0` directly.
- After this fix: zero occurrences of those raw surface/text patterns remain in the modal or chart.
- Intentional literals remain only for the dark-only decorative glows hidden by `.theme-decorative-glow`, the self-contained QR preview, and the functional chart accent.

## Token mapping

- Modal and cards: `surface-raised` → `#0C1311` dark / `#FFF` light.
- Card borders: `surface-raised-border` → `#162D25` dark / `#ECECEC` light.
- Share-link field: `gfx-surface-progress` → `#0F1E19` dark / `#D9ECE5` light.
- Supporting copy and view count: `gfx-neutral-*` theme tokens.
- Chart axes and gradient endpoint: CSS custom properties instead of fixed dark paints.

## Accessibility and behavior

- Existing dialog labeling, seven accessible switches, Escape, click-outside, focus trap, and focus return remain covered.
- Light headings resolve to black, body copy to `rgb(64, 84, 76)`, and chart axes to `rgb(82, 99, 92)` on white/green-tinted surfaces.
- No direct API endpoint or service-layer call exists in this static sharing preview; this theme fix does not alter data behavior or network activity.

## Reproducible validation

```bash
pnpm build
/home/clawd/.openclaw/workspace/scripts/preview_ephemeral.sh \
  --serve-dir /home/clawd/.openclaw/workspace/GenesisFxDashboardMDX/dist -- \
  node /home/clawd/.openclaw/workspace/GenesisFxDashboardMDX/e2e/share-account-modal-qa.mjs
```

Expected result: `PASS`, exact semantic colors in both themes, unchanged desktop geometry (`1318×835` modal and `661×294` chart), centered responsive scaling, no horizontal overflow, runtime errors, or failed responses.
