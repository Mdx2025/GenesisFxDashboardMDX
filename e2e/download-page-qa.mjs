import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const outputPrefix = process.env.OUTPUT_PREFIX
const viewportWidth = Number(process.env.VIEWPORT_WIDTH || 1920)
const viewportHeight = Number(process.env.VIEWPORT_HEIGHT || 1027)
const desktop = viewportWidth >= 1280
const browser = await connectQaBrowser({ url: `${baseUrl}/download` })
const context = browser.contexts()[0]
await context.addInitScript(() => localStorage.setItem('genesis-fx-theme', 'dark'))
const page = context.pages()[0] || await context.newPage()
await page.setViewportSize({ width: viewportWidth, height: viewportHeight })

const runtimeErrors = []
const consoleErrors = []
const failedResponses = []
page.on('pageerror', error => runtimeErrors.push(error.message))
page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()) })
page.on('response', response => { if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() }) })
await page.goto(`${baseUrl}/home`, { waitUntil: 'networkidle' })
const sidebarLink = await page.locator('a[href="/download"]').first().textContent()
if (desktop) {
  await page.getByRole('button', { name: /GenSocial/ }).click()
  await page.getByRole('link', { name: 'Download App', exact: true }).click()
  await page.waitForURL(/\/download$/)
} else {
  await page.goto(`${baseUrl}/download`, { waitUntil: 'networkidle' })
}
await page.evaluate(() => document.fonts.ready)
await page.locator('[data-download-page]').waitFor({ state: 'visible' })

const observation = await page.evaluate(() => {
  const box = selector => {
    const rect = document.querySelector(selector)?.getBoundingClientRect()
    return rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null
  }
  return {
    page: box('[data-download-page]'),
    logo: box('[data-download-logo-card]'),
    featureCards: [...document.querySelectorAll('[data-app-feature-card]')].map(element => {
      const rect = element.getBoundingClientRect()
      return { width: rect.width, height: rect.height }
    }),
    panel: box('[data-install-panel]'),
    tabs: box('[data-platform-tabs]'),
    steps: [...document.querySelectorAll('[data-install-step-card]')].map(element => {
      const rect = element.getBoundingClientRect()
      return { width: rect.width, height: rect.height }
    }),
    activeTab: document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim(),
    title: document.querySelector('[data-install-panel] h3')?.textContent?.trim(),
    sidebarLink: null,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  }
})

const platformResults = []
for (const label of ['IOS', 'Android', 'Desktop']) {
  await page.getByRole('tab', { name: label, exact: true }).click()
  const state = await page.evaluate(() => ({
    activeTab: document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim(),
    title: document.querySelector('[data-install-panel] h3')?.textContent?.trim(),
    stepTitles: [...document.querySelectorAll('[data-install-step-card] strong')].map(element => element.textContent?.trim()),
  }))
  platformResults.push({ label, ...state })
  if (outputPrefix) await page.screenshot({ path: `${outputPrefix}-${label.toLowerCase()}.png`, fullPage: true })
}

const failures = []
if (sidebarLink?.trim() !== 'Download App') failures.push('sidebar Download App link missing')
if (observation.featureCards.length !== 3) failures.push(`expected 3 feature cards, found ${observation.featureCards.length}`)
if (observation.steps.length !== 3) failures.push(`expected 3 install steps, found ${observation.steps.length}`)
if (observation.overflow) failures.push('horizontal overflow detected')
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

if (desktop) {
  if (Math.abs((observation.page?.width || 0) - viewportWidth) > 2) failures.push(`unexpected page width ${observation.page?.width}`)
  if (Math.abs((observation.logo?.width || 0) - 178) > 1 || Math.abs((observation.logo?.height || 0) - 154) > 1) failures.push(`logo geometry mismatch ${JSON.stringify(observation.logo)}`)
  if (observation.featureCards.some(card => Math.abs(card.width - 584) > 1 || Math.abs(card.height - 80) > 1)) failures.push(`feature geometry mismatch ${JSON.stringify(observation.featureCards)}`)
  if (Math.abs((observation.panel?.width || 0) - 697) > 1 || Math.abs((observation.panel?.height || 0) - 551) > 1) failures.push(`panel geometry mismatch ${JSON.stringify(observation.panel)}`)
  if (Math.abs((observation.tabs?.height || 0) - 46) > 1) failures.push(`tab height mismatch ${observation.tabs?.height}`)
  if (observation.steps.some(step => Math.abs(step.height - 97) > 1)) failures.push(`step geometry mismatch ${JSON.stringify(observation.steps)}`)
}

const expectedPlatforms = [
  { label: 'IOS', title: 'Iphone / Ipad Installation', first: 'Tap the Share button' },
  { label: 'Android', title: 'Android Installation', first: 'Tap the Share button' },
  { label: 'Desktop', title: 'Android Installation', first: 'Use Chrome or Edge' },
]
for (const expected of expectedPlatforms) {
  const actual = platformResults.find(item => item.label === expected.label)
  if (!actual || actual.activeTab !== expected.label || actual.title !== expected.title || actual.stepTitles[0] !== expected.first) failures.push(`platform state mismatch ${expected.label}: ${JSON.stringify(actual)}`)
}

console.log(JSON.stringify({ status: failures.length ? 'FAIL' : 'PASS', baseUrl, viewport: { width: viewportWidth, height: viewportHeight }, sidebarLink: sidebarLink?.trim(), observation, platformResults, runtimeErrors, consoleErrors, failedResponses, failures }, null, 2))
await browser.close()
if (failures.length) process.exit(1)
