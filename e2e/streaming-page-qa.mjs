import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const browser = await connectQaBrowser({ url: `${baseUrl}/home` })
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

await page.setViewportSize({ width: 1920, height: 1027 })
await page.goto(`${baseUrl}/home`, { waitUntil: 'networkidle' })
await setTheme('dark')
await page.getByRole('button', { name: 'Streaming', exact: true }).click()
await page.getByRole('dialog', { name: 'Claim your username' }).getByRole('button', { name: 'Continue' }).click()
await page.waitForURL(/\/streaming$/)
await page.getByRole('heading', { name: 'Streaming', exact: true }).waitFor()

async function inspect(index, name) {
  console.log(`[streaming-qa] state=${name} url=${page.url()} tabs=${await page.locator('[data-streaming-tabs] button').count()}`)
  await page.locator('[data-streaming-tabs] button').nth(index).evaluate(element => element.click())
  await page.waitForTimeout(200)
  const active = await page.locator('[data-streaming-tabs] button').nth(index).getAttribute('aria-pressed')
  const cards = await page.locator('[data-stream-card]').count()
  const categories = await page.locator('[data-stream-category]').count()
  const featuredLocator = page.locator('[data-featured-stream]')
  const chatLocator = page.locator('[data-stream-chat]')
  const featured = await featuredLocator.count() ? await featuredLocator.boundingBox() : null
  const chat = await chatLocator.count() ? await chatLocator.boundingBox() : null
  const output = process.env[`STREAMING_${name.toUpperCase()}_OUTPUT_PATH`]
  if (output) await page.screenshot({ path: output, animations: 'disabled' })
  return { name, active, cards, categories, featured, chat }
}

const states = []
states.push(await inspect(0, 'home'))
states.push(await inspect(1, 'browse'))
states.push(await inspect(2, 'replays'))
states.push(await inspect(3, 'following'))
await page.locator('[data-stream-card] button[aria-pressed="true"]').click()
const emptyVisible = await page.locator('[data-streaming-empty]').isVisible()
const emptyOutput = process.env.STREAMING_FOLLOWING_EMPTY_OUTPUT_PATH
if (emptyOutput) await page.screenshot({ path: emptyOutput, animations: 'disabled' })
await page.getByRole('button', { name: 'Browse channels' }).click()
const browseAfterEmpty = await page.locator('[data-streaming-page]').getAttribute('data-streaming-state')

await setTheme('light')
await page.locator('[data-streaming-tabs] button').nth(1).evaluate(element => element.click())
const lightSurface = await page.locator('[data-browse-hero]').evaluate(element => {
  const style = getComputedStyle(element)
  const heading = getComputedStyle(document.querySelector('h1'))
  return { background: style.backgroundColor, border: style.borderColor, heading: heading.color }
})
if (process.env.STREAMING_LIGHT_OUTPUT_PATH) await page.screenshot({ path: process.env.STREAMING_LIGHT_OUTPUT_PATH, animations: 'disabled' })

await page.setViewportSize({ width: 390, height: 844 })
await page.goto(`${baseUrl}/streaming`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
const mobileTabsVisible = await page.locator('[data-streaming-tabs]').isVisible()

const home = states[0]
const failures = []
if (!states.every(state => state.active === 'true')) failures.push(`tab state mismatch: ${JSON.stringify(states)}`)
if (home.categories !== 6 || home.cards !== 1) failures.push(`home content mismatch: ${JSON.stringify(home)}`)
if (!home.featured || Math.abs(home.featured.height - 561) > 1 || !home.chat || Math.abs(home.chat.height - 561) > 1) failures.push(`home geometry mismatch: ${JSON.stringify(home)}`)
if (states[1].cards !== 2 || states[2].cards !== 3 || states[3].cards !== 1) failures.push(`stream card counts mismatch: ${JSON.stringify(states)}`)
if (!emptyVisible || browseAfterEmpty !== 'browse') failures.push('following empty-state flow mismatch')
if (lightSurface.background !== 'rgb(255, 255, 255)' || lightSurface.heading !== 'rgb(0, 0, 0)') failures.push(`light theme mismatch: ${JSON.stringify(lightSurface)}`)
if (mobileOverflow || !mobileTabsVisible) failures.push(`mobile mismatch: ${JSON.stringify({ mobileOverflow, mobileTabsVisible })}`)
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

console.log(JSON.stringify({ status: failures.length ? 'FAIL' : 'PASS', baseUrl, states, emptyVisible, browseAfterEmpty, lightSurface, mobileOverflow, mobileTabsVisible, runtimeErrors, failedResponses, failures }, null, 2))
await browser.close()
if (failures.length) process.exit(1)
