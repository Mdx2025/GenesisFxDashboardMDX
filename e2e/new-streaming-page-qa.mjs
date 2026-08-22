import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')
const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const browser = await connectQaBrowser({ url: `${baseUrl}/streaming`, local: process.env.QA_BROWSER_LOCAL === '1' })
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

async function openApplicationForm() {
  const gate = page.locator('[data-streaming-application-gate]')
  if (await gate.count()) await page.getByRole('button', { name: 'Apply to become a streamer' }).click()
  await page.locator('[data-streaming-application-form]').waitFor()
}

async function box(selector) {
  return page.locator(selector).evaluate(element => {
    const rect = element.getBoundingClientRect()
    const style = getComputedStyle(element)
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, radius: style.borderRadius, background: style.backgroundColor }
  })
}

await page.setViewportSize({ width: 1920, height: 1171 })
await page.goto(`${baseUrl}/streaming`, { waitUntil: 'networkidle' })
await setTheme('dark')
await page.getByRole('button', { name: 'Start streaming' }).click()
await page.waitForURL(/\/streaming\/newstreaming$/)
await page.locator('[data-streaming-application-gate]').waitFor()

const route = new URL(page.url()).pathname
const breadcrumb = await page.locator('header').getByText(/Streaming|My channel|Go live/).allTextContents()
const gate = await box('[data-streaming-application-gate]')
const gateActions = await page.locator('[data-streaming-application-actions] button').evaluateAll(elements => elements.map(element => {
  const rect = element.getBoundingClientRect()
  const style = getComputedStyle(element)
  return {
    label: element.textContent.trim(),
    width: rect.width,
    height: rect.height,
    fontSize: style.fontSize,
    hasGlowButton: element.classList.contains('glow-btn'),
    hasSparkleButton: element.classList.contains('sparkle-button'),
  }
}))
const applyAction = page.locator('[data-streaming-application-actions] button').first()
await page.evaluate(() => (document.activeElement instanceof HTMLElement) && document.activeElement.blur())
for (let index = 0; index < 40; index += 1) {
  await page.keyboard.press('Tab')
  if (await applyAction.evaluate(element => document.activeElement === element)) break
}
const gateKeyboardFocus = await applyAction.evaluate(element => ({
  focused: document.activeElement === element,
  focusVisible: element.matches(':focus-visible'),
  outlineWidth: getComputedStyle(element).outlineWidth,
}))
if (process.env.NEW_STREAMING_REQUIRED_OUTPUT_PATH) await page.screenshot({ path: process.env.NEW_STREAMING_REQUIRED_OUTPUT_PATH, animations: 'disabled' })

await page.keyboard.press('Enter')
await page.locator('[data-streaming-application-form]').waitFor()
const form = await box('[data-streaming-application-form]')
const fields = await page.locator('[data-streaming-application-field] input').evaluateAll(elements => elements.map(element => {
  const rect = element.getBoundingClientRect()
  return { width: rect.width, height: rect.height, radius: getComputedStyle(element).borderRadius }
}))
const textarea = await box('[data-streaming-application-form] textarea')
const submitAction = await page.getByRole('button', { name: 'Submit application' }).evaluate(element => {
  const rect = element.getBoundingClientRect()
  return {
    type: element.getAttribute('type'),
    width: rect.width,
    height: rect.height,
    fontSize: getComputedStyle(element).fontSize,
    hasGlowButton: element.classList.contains('glow-btn'),
  }
})
const topicCount = await page.locator('[data-streaming-topic]').count()
const topicHeights = await page.locator('[data-streaming-topic]').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().height))
await page.getByRole('button', { name: 'Forex', exact: true }).click()
const forexSelected = await page.getByRole('button', { name: 'Forex', exact: true }).getAttribute('aria-pressed')
await page.getByRole('checkbox').check({ force: true })
const checkboxChecked = await page.getByRole('checkbox').isChecked()
if (process.env.NEW_STREAMING_APPLICATION_OUTPUT_PATH) await page.screenshot({ path: process.env.NEW_STREAMING_APPLICATION_OUTPUT_PATH, animations: 'disabled' })

await setTheme('light')
await openApplicationForm()
const lightForm = await box('[data-streaming-application-form]')
const lightHeadingColor = await page.getByText('Display name*', { exact: true }).evaluate(element => getComputedStyle(element).color)
if (process.env.NEW_STREAMING_APPLICATION_LIGHT_OUTPUT_PATH) await page.screenshot({ path: process.env.NEW_STREAMING_APPLICATION_LIGHT_OUTPUT_PATH, animations: 'disabled' })

await page.setViewportSize({ width: 960, height: 900 })
await page.reload({ waitUntil: 'networkidle' })
await openApplicationForm()
const intermediateOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
await page.setViewportSize({ width: 390, height: 844 })
await page.reload({ waitUntil: 'networkidle' })
await openApplicationForm()
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
const mobileFormVisible = await page.locator('[data-streaming-application-form]').isVisible()
await page.emulateMedia({ reducedMotion: 'reduce' })
await page.reload({ waitUntil: 'networkidle' })
await openApplicationForm()
const reducedMotionVisible = await page.locator('[data-streaming-application-form]').isVisible()

const failures = []
if (route !== '/streaming/newstreaming') failures.push(`route mismatch: ${route}`)
if (!breadcrumb.some(item => item.includes('Streaming')) || !breadcrumb.some(item => item.includes('My channel')) || !breadcrumb.some(item => item.includes('Go live'))) failures.push(`breadcrumb mismatch: ${JSON.stringify(breadcrumb)}`)
if (Math.abs(gate.width - 1133) > 1 || Math.abs(gate.height - 614) > 1 || gate.radius !== '30px' || Math.abs(gate.y - 159) > 2) failures.push(`gate geometry mismatch: ${JSON.stringify(gate)}`)
if (gateActions.length !== 2 || !gateActions[0].hasGlowButton || gateActions[0].hasSparkleButton || !gateActions[1].hasSparkleButton || gateActions[1].hasGlowButton || Math.abs(gateActions[0].width - 280) > 1 || Math.abs(gateActions[0].height - 44) > 1 || Math.abs(gateActions[1].width - 248) > 1 || Math.abs(gateActions[1].height - 46) > 1 || gateActions.some(action => Number.parseFloat(action.fontSize) < 12)) failures.push(`gate actions mismatch: ${JSON.stringify(gateActions)}`)
if (!gateKeyboardFocus.focused || !gateKeyboardFocus.focusVisible || Number.parseFloat(gateKeyboardFocus.outlineWidth) < 2) failures.push(`gate keyboard focus mismatch: ${JSON.stringify(gateKeyboardFocus)}`)
if (Math.abs(form.width - 1133) > 1 || Math.abs(form.height - 913) > 1 || form.radius !== '30px' || Math.abs(form.y - 159) > 2) failures.push(`form geometry mismatch: ${JSON.stringify(form)}`)
if (fields.length !== 2 || fields.some(field => Math.abs(field.width - 699) > 1 || Math.abs(field.height - 50) > 1 || field.radius !== '30px')) failures.push(`field geometry mismatch: ${JSON.stringify(fields)}`)
if (Math.abs(textarea.width - 699) > 1 || Math.abs(textarea.height - 145) > 1 || textarea.radius !== '30px') failures.push(`textarea mismatch: ${JSON.stringify(textarea)}`)
if (submitAction.type !== 'submit' || !submitAction.hasGlowButton || Math.abs(submitAction.width - 208) > 1 || Math.abs(submitAction.height - 44) > 1 || Number.parseFloat(submitAction.fontSize) < 12) failures.push(`submit action mismatch: ${JSON.stringify(submitAction)}`)
if (topicCount !== 8 || topicHeights.some(height => Math.abs(height - 49) > 1) || forexSelected !== 'true' || !checkboxChecked) failures.push(`topic/form interaction mismatch: ${JSON.stringify({ topicCount, topicHeights, forexSelected, checkboxChecked })}`)
if (lightForm.background === 'rgb(12, 19, 17)' || lightHeadingColor !== 'rgb(0, 0, 0)') failures.push(`light theme mismatch: ${JSON.stringify({ lightForm, lightHeadingColor })}`)
if (intermediateOverflow || mobileOverflow || !mobileFormVisible || !reducedMotionVisible) failures.push(`responsive/accessibility mismatch: ${JSON.stringify({ intermediateOverflow, mobileOverflow, mobileFormVisible, reducedMotionVisible })}`)
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

console.log(JSON.stringify({ status: failures.length ? 'FAIL' : 'PASS', baseUrl, route, breadcrumb, gate, gateActions, gateKeyboardFocus, form, fields, textarea, submitAction, topicCount, topicHeights, forexSelected, checkboxChecked, lightForm, lightHeadingColor, intermediateOverflow, mobileOverflow, mobileFormVisible, reducedMotionVisible, runtimeErrors, failedResponses, failures }, null, 2))
await browser.close()
if (failures.length) process.exit(1)
