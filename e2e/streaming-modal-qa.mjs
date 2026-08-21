import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const targetUrl = `${baseUrl}/home`
const browser = await connectQaBrowser({ url: targetUrl })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()
const runtimeErrors = []
const failedResponses = []

page.on('pageerror', error => runtimeErrors.push(error.message))
page.on('response', response => {
  if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() })
})

async function setTheme(theme) {
  await page.evaluate(nextTheme => localStorage.setItem('genesis-fx-theme', nextTheme), theme)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
}

async function openStreamingModal(theme, viewport) {
  await page.setViewportSize(viewport)
  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await setTheme(theme)
  if (viewport.width < 1024) await page.getByRole('button', { name: 'Open navigation menu' }).click()
  const trigger = page.getByRole('button', { name: 'Streaming', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Claim your username' })
  await dialog.waitFor({ state: 'visible' })
  await page.waitForTimeout(450)
  const surface = dialog.locator('[data-claim-username-surface]')
  const rect = await surface.boundingBox()
  const styles = await surface.evaluate(element => {
    const surfaceStyle = getComputedStyle(element)
    const headingStyle = getComputedStyle(element.querySelector('h3'))
    const bodyStyle = getComputedStyle(element.querySelector('h3 + p'))
    return {
      background: surfaceStyle.backgroundColor,
      border: surfaceStyle.borderColor,
      heading: headingStyle.color,
      headingSize: headingStyle.fontSize,
      headingWeight: headingStyle.fontWeight,
      body: bodyStyle.color,
    }
  })
  const identityWell = await dialog.locator('.claim-username-icon-well').evaluate(element => {
    const wellStyle = getComputedStyle(element)
    const glyphStyle = getComputedStyle(element.querySelector('svg g'))
    return { background: wellStyle.backgroundColor, blendMode: glyphStyle.mixBlendMode }
  })
  return {
    trigger,
    dialog,
    rect,
    styles,
    identityWell,
    username: await dialog.getByLabel('User Name').inputValue(),
    copy: await dialog.locator('h3 + p').innerText(),
    centered: !!rect
      && Math.abs(rect.x + rect.width / 2 - viewport.width / 2) <= 1
      && Math.abs(rect.y + rect.height / 2 - viewport.height / 2) <= 1,
    overflowX: await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1),
  }
}

const dark = await openStreamingModal('dark', { width: 1920, height: 1027 })
if (process.env.OUTPUT_PATH) await page.screenshot({ path: process.env.OUTPUT_PATH })
await dark.dialog.getByRole('button', { name: 'Continue' }).click()
await dark.dialog.waitFor({ state: 'detached' })
const continueStayedHome = new URL(page.url()).pathname === '/home'
const continueReturnedFocus = await dark.trigger.evaluate(element => document.activeElement === element)

const light = await openStreamingModal('light', { width: 1920, height: 1027 })
if (process.env.LIGHT_OUTPUT_PATH) await page.screenshot({ path: process.env.LIGHT_OUTPUT_PATH })
await page.keyboard.press('Escape')
await light.dialog.waitFor({ state: 'detached' })
await page.waitForFunction(() => document.activeElement?.textContent?.trim() === 'Streaming')
const escapeReturnedFocus = await light.trigger.evaluate(element => document.activeElement === element)

const mobile = await openStreamingModal('light', { width: 390, height: 844 })
const failures = []
for (const state of [dark, light]) {
  if (!state.rect || Math.abs(state.rect.width - 755) > 1 || Math.abs(state.rect.height - 551) > 1) failures.push(`modal geometry mismatch: ${JSON.stringify(state.rect)}`)
  if (!state.centered) failures.push('desktop modal is not centered')
}
if (!mobile.centered || mobile.overflowX) failures.push(`mobile layout mismatch: ${JSON.stringify({ centered: mobile.centered, overflowX: mobile.overflowX })}`)
if (dark.styles.background !== 'rgb(12, 19, 17)' || dark.styles.heading !== 'rgb(255, 255, 255)' || dark.styles.body !== 'rgb(128, 128, 128)') failures.push(`dark token mismatch: ${JSON.stringify(dark.styles)}`)
if (light.styles.background !== 'rgb(255, 255, 255)' || light.styles.border !== 'rgb(236, 236, 236)' || light.styles.heading !== 'rgb(0, 0, 0)') failures.push(`light token mismatch: ${JSON.stringify(light.styles)}`)
if (light.identityWell.background !== 'rgb(217, 236, 229)' || light.identityWell.blendMode !== 'normal') failures.push(`light identity well mismatch: ${JSON.stringify(light.identityWell)}`)
if (dark.styles.headingSize !== '36px' || dark.styles.headingWeight !== '400') failures.push(`heading typography mismatch: ${JSON.stringify(dark.styles)}`)
if (dark.username !== 't.shepang' || !dark.copy.includes('Signals & Live.') || !dark.copy.includes('leaderboards and your profile.')) failures.push('reference content mismatch')
if (!continueStayedHome || !continueReturnedFocus || !escapeReturnedFocus) failures.push(`interaction mismatch: ${JSON.stringify({ continueStayedHome, continueReturnedFocus, escapeReturnedFocus })}`)
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

console.log(JSON.stringify({
  status: failures.length ? 'FAIL' : 'PASS',
  baseUrl,
  dark: { rect: dark.rect, styles: dark.styles },
  light: { rect: light.rect, styles: light.styles },
  mobile: { rect: mobile.rect, centered: mobile.centered, overflowX: mobile.overflowX },
  interactions: { continueStayedHome, continueReturnedFocus, escapeReturnedFocus },
  runtimeErrors,
  failedResponses,
  failures,
}, null, 2))

await browser.close()
if (failures.length) process.exit(1)
