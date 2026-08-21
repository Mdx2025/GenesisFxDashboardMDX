import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const outputPath = process.env.OUTPUT_PATH
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

async function openModal(viewport) {
  await page.setViewportSize(viewport)
  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  if (viewport.width < 1024) await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.getByRole('button', { name: 'Leaderboards', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Claim your username' })
  await dialog.waitFor({ state: 'visible' })
  await page.waitForTimeout(450)
  return dialog
}

async function observe(viewport) {
  const dialog = await openModal(viewport)
  const input = page.getByLabel('User Name')
  const modal = dialog.locator(':scope > div').first()
  const rect = await modal.boundingBox()
  const closeRect = await dialog.getByRole('button', { name: 'Close modal' }).boundingBox()
  const identityGlyph = dialog.locator('svg[viewBox="0 0 27 27"]')
  const identityGlyphRect = await identityGlyph.boundingBox()
  const identityGlyphFill = await identityGlyph.locator('path').evaluate(element => getComputedStyle(element).fill)
  const computed = await page.getByRole('heading', { name: 'Claim your username' }).evaluate(element => {
    const style = getComputedStyle(element)
    return { fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight, lineHeight: style.lineHeight }
  })
  return {
    viewport,
    rect,
    closeRect,
    identityGlyphRect,
    identityGlyphFill,
    centered: !!rect
      && Math.abs(rect.x + rect.width / 2 - viewport.width / 2) <= 1
      && Math.abs(rect.y + rect.height / 2 - viewport.height / 2) <= 1,
    username: await input.inputValue(),
    availableVisible: await dialog.getByText('Available', { exact: true }).isVisible(),
    continueEnabled: await dialog.getByRole('button', { name: 'Continue' }).isEnabled(),
    heading: computed,
    overflow: await page.evaluate(() => ({
      x: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      y: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1,
    })),
  }
}

const desktop = await observe({ width: 1920, height: 1027 })
if (outputPath) {
  await page.waitForTimeout(200)
  await page.screenshot({ path: outputPath, fullPage: true })
}

await page.keyboard.press('Escape')
await page.getByRole('dialog', { name: 'Claim your username' }).waitFor({ state: 'detached' })
const escapeClosed = true

const mobile = await observe({ width: 390, height: 844 })
const input = page.getByLabel('User Name')
await input.fill('')
const emptyState = {
  availableHidden: !(await page.getByText('Available', { exact: true }).isVisible()),
  continueDisabled: !(await page.getByRole('button', { name: 'Continue' }).isEnabled()),
}

const failures = []
if (!desktop.rect || Math.abs(desktop.rect.width - 755) > 1 || Math.abs(desktop.rect.height - 551) > 1) failures.push(`desktop geometry mismatch: ${JSON.stringify(desktop.rect)}`)
if (!desktop.closeRect || !desktop.rect || Math.abs(desktop.closeRect.x - desktop.rect.x - 721.84) > 1 || Math.abs(desktop.closeRect.y - desktop.rect.y - 18.84) > 1) failures.push(`close geometry mismatch: ${JSON.stringify(desktop.closeRect)}`)
if (!desktop.identityGlyphRect || !desktop.rect || Math.abs(desktop.identityGlyphRect.x - desktop.rect.x - 118.84) > 1 || Math.abs(desktop.identityGlyphRect.y - desktop.rect.y - 142.84) > 1 || desktop.identityGlyphFill !== 'rgb(0, 179, 140)') failures.push(`identity glyph mismatch: ${JSON.stringify({ rect: desktop.identityGlyphRect, fill: desktop.identityGlyphFill })}`)
if (!desktop.centered || !mobile.centered) failures.push('modal is not centered')
if (desktop.username !== 't.shepang' || !desktop.availableVisible || !desktop.continueEnabled) failures.push('reference username state mismatch')
if (desktop.heading.fontSize !== '36px' || desktop.heading.fontWeight !== '400') failures.push(`heading typography mismatch: ${JSON.stringify(desktop.heading)}`)
if (desktop.overflow.x || mobile.overflow.x) failures.push('horizontal overflow detected')
if (!emptyState.availableHidden || !emptyState.continueDisabled) failures.push(`empty state mismatch: ${JSON.stringify(emptyState)}`)
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

const result = {
  status: failures.length ? 'FAIL' : 'PASS',
  baseUrl,
  desktop,
  mobile,
  escapeClosed,
  emptyState,
  runtimeErrors,
  failedResponses,
  failures,
}

console.log(JSON.stringify(result, null, 2))
await browser.close()
if (failures.length) process.exit(1)
