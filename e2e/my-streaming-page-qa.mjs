import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')
const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const browser = await connectQaBrowser({ url: `${baseUrl}/streaming` })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()
const runtimeErrors = []
const failedResponses = []
page.on('pageerror', error => runtimeErrors.push(error.message))
page.on('response', response => { if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() }) })

async function setTheme(theme) {
  await page.evaluate(value => localStorage.setItem('genesis-fx-theme', value), theme)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
}

async function rect(selector) {
  return page.locator(selector).evaluate(element => {
    const box = element.getBoundingClientRect()
    const style = getComputedStyle(element)
    return { x: box.x, y: box.y, width: box.width, height: box.height, radius: style.borderRadius, background: style.backgroundColor }
  })
}

await page.setViewportSize({ width: 1920, height: 1171 })
await page.goto(`${baseUrl}/streaming`, { waitUntil: 'networkidle' })
await setTheme('dark')
await page.locator('[data-streaming-my-streams]').click()
await page.waitForURL(/\/streaming\/mystreaming$/)
await page.locator('[data-my-streaming-page]').waitFor()

const hero = await rect('[data-channel-hero]')
const tabs = await rect('[data-my-streaming-tabs]')
const tabButtons = page.locator('[data-my-streaming-tabs] button')
const labels = await tabButtons.allTextContents()
const states = []
for (let index = 0; index < 5; index += 1) {
  await tabButtons.nth(index).click()
  await page.waitForTimeout(120)
  states.push({
    name: labels[index].trim(),
    active: await tabButtons.nth(index).getAttribute('aria-pressed'),
    metrics: await page.locator('[data-channel-metric]').count(),
    ownerCards: await page.locator('[data-stream-card-variant="owner"]').count(),
    followerCards: await page.locator('[data-follower-card]').count(),
    earningsSummary: await page.locator('[data-earnings-summary]').count(),
    earningsTable: await page.locator('[data-earnings-activity]').count(),
  })
  const output = process.env[`MY_STREAMING_${labels[index].trim().toUpperCase()}_OUTPUT_PATH`]
  if (output) await page.screenshot({ path: output, fullPage: true, animations: 'disabled' })
}

await tabButtons.nth(0).click()
const metricRects = await page.locator('[data-channel-metric]').evaluateAll(elements => elements.map(element => {
  const box = element.getBoundingClientRect()
  return { width: box.width, height: box.height }
}))
const ownerControls = await page.locator('[data-my-streaming-tabs] button').nth(1).click().then(async () => ({
  feature: await page.getByText('Feature', { exact: true }).count(),
  follow: await page.getByRole('button', { name: 'Follow', exact: true }).count(),
}))

await page.locator('[data-my-streaming-tabs] button').nth(4).click()
const earningsGlow = await page.locator('[data-earnings-activity] .glow-ellipse').evaluate(element => {
  const glow = element.getBoundingClientRect()
  const table = element.closest('[data-earnings-activity]').getBoundingClientRect()
  return {
    count: element.closest('[data-earnings-activity]').querySelectorAll('.glow-ellipse').length,
    centerDelta: Math.abs((glow.left + glow.width / 2) - (table.left + table.width / 2)),
    topOffset: glow.top - table.top,
  }
})

await setTheme('light')
const lightHero = await rect('[data-channel-hero]')
const lightHeading = await page.getByRole('heading', { name: 'Joe doe' }).evaluate(element => getComputedStyle(element).color)
if (process.env.MY_STREAMING_LIGHT_OUTPUT_PATH) await page.screenshot({ path: process.env.MY_STREAMING_LIGHT_OUTPUT_PATH, fullPage: true, animations: 'disabled' })

await page.setViewportSize({ width: 960, height: 900 })
await page.reload({ waitUntil: 'networkidle' })
const intermediateOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
await page.setViewportSize({ width: 390, height: 844 })
await page.reload({ waitUntil: 'networkidle' })
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
const mobileTabsVisible = await page.locator('[data-my-streaming-tabs]').isVisible()

await page.emulateMedia({ reducedMotion: 'reduce' })
await page.reload({ waitUntil: 'networkidle' })
const reducedMotionContentVisible = await page.locator('[data-channel-hero]').isVisible()

const failures = []
if (hero.width < 1547 || hero.width > 1551 || Math.abs(hero.height - 279) > 1 || hero.radius !== '18.563px') failures.push(`hero geometry mismatch: ${JSON.stringify(hero)}`)
if (tabs.width < 738 || tabs.width > 742 || Math.abs(tabs.height - 46) > 1 || Math.abs(tabs.y - 607) > 1 || labels.join('|') !== 'Overview|Streams|Replays|Followers|Earnings') failures.push(`tabs mismatch: ${JSON.stringify({ tabs, labels })}`)
if (states[0].metrics !== 4 || states[1].ownerCards !== 1 || states[2].ownerCards !== 1 || states[3].followerCards !== 1 || states[4].earningsSummary !== 1 || states[4].earningsTable !== 1 || states.some(state => state.active !== 'true')) failures.push(`state mismatch: ${JSON.stringify(states)}`)
if (metricRects.length !== 4 || metricRects.some(item => Math.abs(item.height - 148) > 1)) failures.push(`metric geometry mismatch: ${JSON.stringify(metricRects)}`)
if (ownerControls.feature !== 0 || ownerControls.follow !== 0) failures.push(`owner card controls mismatch: ${JSON.stringify(ownerControls)}`)
if (earningsGlow.count !== 1 || earningsGlow.centerDelta > 1 || earningsGlow.topOffset >= 0) failures.push(`earnings glow mismatch: ${JSON.stringify(earningsGlow)}`)
if (lightHero.background === 'rgb(12, 19, 17)' || lightHeading !== 'rgb(0, 0, 0)') failures.push(`light theme mismatch: ${JSON.stringify({ lightHero, lightHeading })}`)
if (intermediateOverflow || mobileOverflow || !mobileTabsVisible || !reducedMotionContentVisible) failures.push(`responsive/accessibility mismatch: ${JSON.stringify({ intermediateOverflow, mobileOverflow, mobileTabsVisible, reducedMotionContentVisible })}`)
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

console.log(JSON.stringify({ status: failures.length ? 'FAIL' : 'PASS', baseUrl, hero, tabs, labels, states, metricRects, ownerControls, earningsGlow, lightHero, lightHeading, intermediateOverflow, mobileOverflow, mobileTabsVisible, reducedMotionContentVisible, runtimeErrors, failedResponses, failures }, null, 2))
await browser.close()
if (failures.length) process.exit(1)
