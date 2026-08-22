import process from 'node:process'
import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = (process.env.START_STREAMING_BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz').replace(/\/$/, '')
const runtimeErrors = []
const failedResponses = []
const browser = await connectQaBrowser({ url: `${baseUrl}/streaming/newstreaming`, local: process.env.QA_BROWSER_LOCAL === '1' })
const context = browser.contexts()[0] || await browser.newContext({ viewport: { width: 1920, height: 1027 }, reducedMotion: 'no-preference' })
const page = context.pages()[0] || await context.newPage()
await page.setViewportSize({ width: 1920, height: 1027 })
page.on('pageerror', (error) => runtimeErrors.push(error.message))
page.on('response', (response) => { if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() }) })

async function setTheme(theme) {
  await page.evaluate((value) => { document.documentElement.dataset.theme = value; localStorage.setItem('theme', value) }, theme)
}

async function rect(selector) {
  return page.locator(selector).first().evaluate((element) => {
    const box = element.getBoundingClientRect(); const style = getComputedStyle(element)
    return { x: box.x, y: box.y, width: box.width, height: box.height, radius: style.borderRadius, background: style.backgroundColor }
  })
}

await page.goto(`${baseUrl}/streaming/newstreaming`, { waitUntil: 'networkidle' })
await setTheme('dark')
await page.getByRole('button', { name: 'Apply to become a streamer' }).click()
await page.getByRole('button', { name: 'Submit application' }).click()
await page.waitForURL(/\/streaming\/startstreaming$/)
await page.locator('[data-start-streaming-page]').waitFor()

const redirectPath = new URL(page.url()).pathname
const hero = await rect('[data-broadcast-ready-hero]')
const session = await rect('[data-broadcast-session-details]')
const channel = await rect('[data-broadcast-channel]')
const checklist = await rect('[data-broadcast-checklist]')
const headingStyles = await page.getByRole('heading', { name: 'Ready to go live?' }).evaluate((element) => { const s = getComputedStyle(element); return { fontSize: s.fontSize, color: s.color } })
const readyViewport = await page.evaluate(() => ({
  viewportHeight: innerHeight,
  scrollHeight: document.documentElement.scrollHeight,
  verticalOverflow: document.documentElement.scrollHeight > innerHeight + 1,
}))
if (process.env.START_STREAMING_READY_OUTPUT_PATH) await page.screenshot({ path: process.env.START_STREAMING_READY_OUTPUT_PATH, animations: 'disabled' })

const goLive = page.getByRole('button', { name: 'Go live now' })
await page.setViewportSize({ width: 1920, height: 1086 })
await goLive.click()
const terms = await rect('[data-broadcast-modal="terms"] > *')
const termsScroll = await rect('[data-broadcast-terms-scroll]')
const termsConsent = await page.getByRole('checkbox').isChecked()
const termsActions = await page.locator('[data-broadcast-modal="terms"] button').evaluateAll((nodes) => nodes.map((node) => ({ label: node.textContent.trim(), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })))
const termsFocusInside = await page.evaluate(() => Boolean(document.activeElement?.closest('[data-broadcast-modal="terms"]')))
if (process.env.START_STREAMING_TERMS_OUTPUT_PATH) await page.screenshot({ path: process.env.START_STREAMING_TERMS_OUTPUT_PATH, animations: 'disabled' })

await page.getByRole('button', { name: 'Continue' }).click()
const permissions = await rect('[data-broadcast-modal="permissions"] > *')
const permissionRows = await page.locator('[data-broadcast-permission-rows] > div').evaluateAll((nodes) => nodes.map((node) => { const b = node.getBoundingClientRect(); return { width: b.width, height: b.height, radius: getComputedStyle(node).borderRadius } }))
const startBeforeAccepted = await page.getByRole('button', { name: 'Start streaming' }).isDisabled()
if (process.env.START_STREAMING_PERMISSIONS_OUTPUT_PATH) await page.screenshot({ path: process.env.START_STREAMING_PERMISSIONS_OUTPUT_PATH, animations: 'disabled' })

for (let index = 0; index < 3; index += 1) await page.getByRole('button', { name: 'Enable' }).first().click()
const activeCount = await page.locator('[data-permission-active]').count()
const startAfterAccepted = await page.getByRole('button', { name: 'Start streaming' }).isEnabled()
if (process.env.START_STREAMING_ACCEPTED_OUTPUT_PATH) await page.screenshot({ path: process.env.START_STREAMING_ACCEPTED_OUTPUT_PATH, animations: 'disabled' })
await page.getByRole('button', { name: 'Start streaming' }).click()
const started = await page.locator('[data-start-streaming-page]').getAttribute('data-stream-started')

await page.getByRole('button', { name: 'Cancel' }).click()
await goLive.focus()
await goLive.click()
await page.keyboard.press('Escape')
await page.waitForTimeout(50)
const escapeClosed = await page.locator('[data-broadcast-modal]').count() === 0
const focusReturned = await goLive.evaluate((element) => document.activeElement === element)

await setTheme('light')
const lightHero = await rect('[data-broadcast-ready-hero]')
const lightHeading = await page.getByRole('heading', { name: 'Ready to go live?' }).evaluate((element) => getComputedStyle(element).color)

await page.setViewportSize({ width: 960, height: 900 })
const intermediateOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
await page.setViewportSize({ width: 390, height: 844 })
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
const mobileReadyVisible = await page.locator('[data-broadcast-ready-hero]').isVisible()
await goLive.click()
const mobileModalContained = await page.locator('[data-broadcast-modal="terms"] > *').evaluate((element) => { const b = element.getBoundingClientRect(); return b.left >= 0 && b.right <= innerWidth + 1 && b.top >= 0 && b.bottom <= innerHeight + 1 })

await page.emulateMedia({ reducedMotion: 'reduce' })
const reducedMotionVisible = await page.locator('[data-broadcast-modal="terms"]').isVisible()

const failures = []
if (redirectPath !== '/streaming/startstreaming') failures.push(`submit redirect mismatch: ${redirectPath}`)
if (Math.abs(hero.width - 1549) > 2 || Math.abs(hero.height - 279) > 1 || hero.radius !== '18.563px' || Math.abs(hero.x - 343) > 2 || Math.abs(hero.y - 144) > 3) failures.push(`hero geometry mismatch: ${JSON.stringify(hero)}`)
if (Math.abs(session.width - 842) > 2 || Math.abs(session.height - 566) > 1 || session.radius !== '30px') failures.push(`session geometry mismatch: ${JSON.stringify(session)}`)
if (Math.abs(channel.width - 692) > 2 || Math.abs(channel.height - 283) > 1 || Math.abs(checklist.height - 265) > 1) failures.push(`support cards mismatch: ${JSON.stringify({ channel, checklist })}`)
if (headingStyles.fontSize !== '50px') failures.push(`heading typography mismatch: ${JSON.stringify(headingStyles)}`)
if (readyViewport.verticalOverflow || readyViewport.scrollHeight > readyViewport.viewportHeight + 1) failures.push(`ready viewport height mismatch: ${JSON.stringify(readyViewport)}`)
if (Math.abs(terms.width - 677) > 1 || Math.abs(terms.height - 704) > 1 || terms.radius !== '18.563px' || Math.abs(termsScroll.width - 519) > 2 || Math.abs(termsScroll.height - 331) > 1) failures.push(`terms geometry mismatch: ${JSON.stringify({ terms, termsScroll })}`)
if (!termsConsent || !termsFocusInside || !termsActions.some((action) => action.label === 'Cancel' && Math.abs(action.width - 230) <= 1 && Math.abs(action.height - 46) <= 1) || !termsActions.some((action) => action.label === 'Continue' && Math.abs(action.width - 230) <= 1 && Math.abs(action.height - 44) <= 1)) failures.push(`terms interaction mismatch: ${JSON.stringify({ termsConsent, termsFocusInside, termsActions })}`)
if (Math.abs(permissions.width - 677) > 1 || Math.abs(permissions.height - 643) > 1 || permissions.radius !== '18.563px') failures.push(`permissions geometry mismatch: ${JSON.stringify(permissions)}`)
if (permissionRows.length !== 3 || permissionRows.some((row) => Math.abs(row.width - 520) > 2 || Math.abs(row.height - 91) > 1 || row.radius !== '18.563px')) failures.push(`permission rows mismatch: ${JSON.stringify(permissionRows)}`)
if (!startBeforeAccepted || activeCount !== 3 || !startAfterAccepted || started !== 'true') failures.push(`permission state mismatch: ${JSON.stringify({ startBeforeAccepted, activeCount, startAfterAccepted, started })}`)
if (!escapeClosed || !focusReturned) failures.push(`modal escape/focus mismatch: ${JSON.stringify({ escapeClosed, focusReturned })}`)
if (lightHeading !== 'rgb(0, 0, 0)' || lightHero.background === 'rgb(12, 19, 17)') failures.push(`light theme mismatch: ${JSON.stringify({ lightHeading, lightHero })}`)
if (intermediateOverflow || mobileOverflow || !mobileReadyVisible || !mobileModalContained || !reducedMotionVisible) failures.push(`responsive/reduced motion mismatch: ${JSON.stringify({ intermediateOverflow, mobileOverflow, mobileReadyVisible, mobileModalContained, reducedMotionVisible })}`)
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

console.log(JSON.stringify({ status: failures.length ? 'FAIL' : 'PASS', baseUrl, redirectPath, hero, session, channel, checklist, headingStyles, readyViewport, terms, termsScroll, termsConsent, termsActions, termsFocusInside, permissions, permissionRows, startBeforeAccepted, activeCount, startAfterAccepted, started, escapeClosed, focusReturned, lightHero, lightHeading, intermediateOverflow, mobileOverflow, mobileReadyVisible, mobileModalContained, reducedMotionVisible, runtimeErrors, failedResponses, failures }, null, 2))
await browser.close()
if (failures.length) process.exit(1)
