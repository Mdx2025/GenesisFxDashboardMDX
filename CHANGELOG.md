# Changelog

## 2026-08-04

- Rebuilt the Total Balance mini chart with Chart.js to match the supplied six-month equalizer reference, including bar geometry, rounded tops, emerald-to-dark gradients, and compact month labels.
- Preserved the existing Total Balance title, value, and change copy.
- Refactored the reusable Period Selector active item to the supplied Tailwind geometry, colors, border, typography, and clipped bottom bloom.
- Lowered the August Total Balance bar and raised September to become the chart peak.
- Rebuilt the Total Equity candlestick chart in Chart.js from the supplied eight-candle reference while preserving the KPI copy.
- Restored the Period Selector selected-state border to the previous subtle top-edge fade.

## 2026-07-31

- Replaced the static profile-menu theme mockup with an accessible, persisted light/dark switch.
- Added premium GSAP motion for the account menu enter/exit and the theme gradient transition, with reduced-motion fallbacks.
- Added semantic light-theme surface tokens for the dashboard shell, cards, sidebar, overlays, and menu states.
- Restored the supplied three-layer SVG gradient glow behind the Theme row with its original path, color stops, and blur treatment.

All notable changes to this project will be documented in this file.

## 2026-07-04

### Changed

- Replaced the Tradelocker sidebar icon with the provided PNG asset.
- Reworked the Total Equity candlestick preview to use glowing custom SVG candles with visible wicks.
- Removed horizontal grid lines and hidden month/value labels from the Portfolio Equity line chart.

### Documentation

- Added initial changelog for project work tracking.
