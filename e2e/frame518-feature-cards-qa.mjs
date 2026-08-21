import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const route = process.env.ROUTE || '/home'
const theme = process.env.THEME || 'dark'
const outputPath = process.env.OUTPUT_PATH

const browser = await connectQaBrowser({ url: `${baseUrl}${route}` })
const context = browser.contexts()[0]
await context.addInitScript((selectedTheme) => {
  localStorage.setItem('genesis-fx-theme', selectedTheme)
}, theme)

const page = context.pages()[0] || await context.newPage()
await page.setViewportSize({ width: 1440, height: 1000 })
const runtimeErrors = []
page.on('pageerror', error => runtimeErrors.push(error.message))
await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

const cards = page.locator('[data-feature-card]')
await cards.first().waitFor({ state: 'visible' })

const observation = await cards.evaluateAll(elements => ({
  count: elements.length,
  glassCards: elements.filter(element => element.classList.contains('glass-card')).length,
  dividers: elements.reduce((count, element) => count + element.querySelectorAll('.divider-glow, .divider-green').length, 0),
  labels: elements.map(element => element.querySelector('h2')?.textContent?.trim()),
  heights: elements.map(element => element.getBoundingClientRect().height),
  overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
}))

if (outputPath) await page.screenshot({ path: outputPath, fullPage: true })

const expectedLabels = [
  'Copy Trading',
  'Trade Signals',
  'Pamm Funds',
  'Leaderboards',
  'Copy Trading',
  'Trade Signals',
  'Pamm Funds',
  'Leaderboards',
]
const failures = []
if (observation.count !== 8) failures.push(`expected 8 feature cards, found ${observation.count}`)
if (observation.glassCards !== 8) failures.push(`expected 8 GlassCards, found ${observation.glassCards}`)
if (observation.dividers !== 0) failures.push(`expected no dividers, found ${observation.dividers}`)
if (JSON.stringify(observation.labels) !== JSON.stringify(expectedLabels)) failures.push('feature-card labels or order changed')
if (observation.heights.some(height => Math.abs(height - 148) > 1)) failures.push(`unexpected card heights: ${observation.heights.join(', ')}`)
if (observation.overflow) failures.push('horizontal overflow detected')
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)

console.log(JSON.stringify({
  status: failures.length ? 'FAIL' : 'PASS',
  baseUrl,
  route,
  theme,
  observation,
  runtimeErrors,
  failures,
}, null, 2))

await browser.close()
if (failures.length) process.exit(1)
