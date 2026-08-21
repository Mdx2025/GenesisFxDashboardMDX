import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const outputPath = process.env.OUTPUT_PATH
const targetUrl = `${baseUrl}/tradelocker/accounts/L%23716445`
const browser = await connectQaBrowser({ url: targetUrl })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()
const runtimeErrors = []
const failedResponses = []

page.on('pageerror', (error) => runtimeErrors.push(error.message))
page.on('response', (response) => {
  if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() })
})

async function observe(viewport) {
  await page.setViewportSize(viewport)
  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  const trigger = page.getByRole('button', { name: 'Share account', exact: true })
  await trigger.waitFor({ state: 'visible' })
  const headerActions = trigger.locator('xpath=..')
  const deposit = headerActions.getByRole('button', { name: 'Deposit', exact: true })
  const trade = headerActions.getByRole('button', { name: 'Trade', exact: true })
  const [depositRect, triggerRect, tradeRect] = await Promise.all([deposit.boundingBox(), trigger.boundingBox(), trade.boundingBox()])
  const triggerIconFill = await trigger.locator('svg[viewBox="0 0 18 18"] path').evaluate((element) => getComputedStyle(element).fill)

  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Share Account' })
  await dialog.waitFor({ state: 'visible' })
  await page.waitForTimeout(450)

  const modal = dialog.locator(':scope > div').first()
  const rect = await modal.boundingBox()
  const closeRect = await dialog.getByRole('button', { name: 'Close share account modal' }).boundingBox()
  const chartRect = await dialog.locator('[data-share-performance-chart]').locator('xpath=..').boundingBox()
  const heading = await page.getByRole('heading', { name: 'Share Account' }).evaluate((element) => {
    const style = getComputedStyle(element)
    return { fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight, lineHeight: style.lineHeight }
  })
  const switches = dialog.getByRole('switch')
  const switchCount = await switches.count()
  const checkedStates = await switches.evaluateAll((elements) => elements.map((element) => element.getAttribute('aria-checked')))

  return {
    viewport,
    depositRect,
    triggerRect,
    tradeRect,
    triggerIconFill,
    rect,
    closeRect,
    chartRect,
    heading,
    switchCount,
    checkedStates,
    centered: !!rect
      && Math.abs(rect.x + rect.width / 2 - viewport.width / 2) <= 1
      && Math.abs(rect.y + rect.height / 2 - viewport.height / 2) <= 1,
    link: await dialog.locator('[data-share-link]').innerText(),
    viewCountVisible: await dialog.getByText('0 total views', { exact: true }).isVisible(),
    overflow: await page.evaluate(() => ({
      x: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      y: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1,
    })),
  }
}

const desktop = await observe({ width: 1920, height: 1027 })
if (outputPath) await page.screenshot({ path: outputPath })

const dialog = page.getByRole('dialog', { name: 'Share Account' })
const masterSwitch = dialog.getByRole('switch', { name: 'Enable public sharing' })
await masterSwitch.click()
const masterSwitchChanged = await masterSwitch.getAttribute('aria-checked') === 'false'
const privacyDisabled = await dialog.getByRole('switch', { name: 'Show Account Name' }).isDisabled()

await page.keyboard.press('Escape')
await dialog.waitFor({ state: 'detached' })
const focusReturned = await page.getByRole('button', { name: 'Share account', exact: true }).evaluate((element) => document.activeElement === element)

const mobile = await observe({ width: 390, height: 844 })

const failures = []
if (!desktop.triggerRect || Math.abs(desktop.triggerRect.width - 61) > 1 || Math.abs(desktop.triggerRect.height - 46) > 1) failures.push(`trigger geometry mismatch: ${JSON.stringify(desktop.triggerRect)}`)
if (!desktop.depositRect || !desktop.triggerRect || Math.abs(desktop.triggerRect.x - desktop.depositRect.x - desktop.depositRect.width - 12) > 1) failures.push('share trigger is not 12px after Deposit')
if (!desktop.tradeRect || !desktop.triggerRect || Math.abs(desktop.tradeRect.x - desktop.triggerRect.x - desktop.triggerRect.width - 12) > 1) failures.push('Trade is not 12px after share trigger')
if (desktop.triggerIconFill !== 'rgb(198, 198, 198)') failures.push(`share icon fill mismatch: ${desktop.triggerIconFill}`)
if (!desktop.rect || Math.abs(desktop.rect.width - 1318) > 1 || Math.abs(desktop.rect.height - 835) > 1) failures.push(`desktop modal geometry mismatch: ${JSON.stringify(desktop.rect)}`)
if (!desktop.closeRect || !desktop.rect || Math.abs(desktop.closeRect.x - desktop.rect.x - 1262.84) > 1 || Math.abs(desktop.closeRect.y - desktop.rect.y - 25.84) > 1) failures.push(`close geometry mismatch: ${JSON.stringify(desktop.closeRect)}`)
if (!desktop.chartRect || !desktop.rect || Math.abs(desktop.chartRect.x - desktop.rect.x - 629.84) > 1 || Math.abs(desktop.chartRect.y - desktop.rect.y - 387.84) > 1 || Math.abs(desktop.chartRect.width - 661) > 1 || Math.abs(desktop.chartRect.height - 294) > 1) failures.push(`chart geometry mismatch: ${JSON.stringify(desktop.chartRect)}`)
if (!desktop.centered || !mobile.centered) failures.push('modal is not centered')
if (desktop.heading.fontSize !== '24px' || desktop.heading.fontWeight !== '400') failures.push(`heading typography mismatch: ${JSON.stringify(desktop.heading)}`)
if (desktop.switchCount !== 7 || desktop.checkedStates.some((value) => value !== 'true')) failures.push(`switch state mismatch: ${JSON.stringify({ count: desktop.switchCount, states: desktop.checkedStates })}`)
if (desktop.link !== 'https://dashboard.genesisfxmarkets.cr' || !desktop.viewCountVisible) failures.push('reference content mismatch')
if (!masterSwitchChanged || !privacyDisabled) failures.push('master privacy interaction mismatch')
if (!focusReturned) failures.push('focus did not return to the share trigger')
if (desktop.overflow.x || mobile.overflow.x) failures.push('horizontal overflow detected')
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

const result = {
  status: failures.length ? 'FAIL' : 'PASS',
  baseUrl,
  desktop,
  mobile,
  interactions: { masterSwitchChanged, privacyDisabled, focusReturned },
  runtimeErrors,
  failedResponses,
  failures,
}

console.log(JSON.stringify(result, null, 2))
await browser.close()
if (failures.length) process.exit(1)
