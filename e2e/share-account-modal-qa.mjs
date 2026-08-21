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

async function observe(viewport, theme) {
  await page.setViewportSize(viewport)
  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await page.evaluate((nextTheme) => localStorage.setItem('genesis-fx-theme', nextTheme), theme)
  await page.reload({ waitUntil: 'networkidle' })
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
  const expectedScale = Math.min(1, (viewport.width * 0.95) / 1318, (viewport.height * 0.95) / 835)
  await page.waitForFunction(({ width, height }) => {
    const surface = document.querySelector('[data-share-modal-surface]')
    if (!surface) return false
    const rect = surface.getBoundingClientRect()
    return Math.abs(rect.width - width) <= 1 && Math.abs(rect.height - height) <= 1
  }, { width: 1318 * expectedScale, height: 835 * expectedScale })

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
  const themeStyles = await dialog.evaluate((element) => {
    const read = (selector) => {
      const target = element.querySelector(selector)
      if (!target) return null
      const style = getComputedStyle(target)
      return { backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.color }
    }
    const chartAxis = element.querySelector('[data-share-performance-chart] text')
    return {
      rootTheme: document.documentElement.dataset.theme,
      modal: read('[data-share-modal-surface]'),
      settings: read('[data-share-settings-surface]'),
      stat: read('[data-share-stat-surface]'),
      chart: read('[data-share-chart-surface]'),
      link: read('[data-share-link]'),
      heading: read('#share-account-title'),
      body: read('#share-account-title + p'),
      chartAxisFill: chartAxis ? getComputedStyle(chartAxis).fill : null,
    }
  })

  return {
    theme,
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
    themeStyles,
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

const desktop = await observe({ width: 1920, height: 1027 }, 'dark')
if (outputPath) await page.screenshot({ path: outputPath })

const dialog = page.getByRole('dialog', { name: 'Share Account' })
const masterSwitch = dialog.getByRole('switch', { name: 'Enable public sharing' })
await masterSwitch.click()
const masterSwitchChanged = await masterSwitch.getAttribute('aria-checked') === 'false'
const privacyDisabled = await dialog.getByRole('switch', { name: 'Show Account Name' }).isDisabled()

await page.keyboard.press('Escape')
await dialog.waitFor({ state: 'detached' })
const focusReturned = await page.getByRole('button', { name: 'Share account', exact: true }).evaluate((element) => document.activeElement === element)

const mobile = await observe({ width: 390, height: 844 }, 'dark')
await page.keyboard.press('Escape')
await page.getByRole('dialog', { name: 'Share Account' }).waitFor({ state: 'detached' })
const lightDesktop = await observe({ width: 1920, height: 1027 }, 'light')
const lightScreenshotPath = process.env.LIGHT_OUTPUT_PATH
if (lightScreenshotPath) await page.screenshot({ path: lightScreenshotPath })
const lightMobile = await observe({ width: 390, height: 844 }, 'light')

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
if (lightDesktop.overflow.x || lightMobile.overflow.x) failures.push('light theme horizontal overflow detected')
const expectedThemeStyles = {
  dark: {
    surface: 'rgb(12, 19, 17)',
    border: 'rgb(22, 45, 37)',
    link: 'rgb(15, 30, 25)',
    heading: 'rgb(255, 255, 255)',
    body: 'rgb(128, 128, 128)',
    axis: 'rgb(96, 96, 96)',
  },
  light: {
    surface: 'rgb(255, 255, 255)',
    border: 'rgb(236, 236, 236)',
    link: 'rgb(217, 236, 229)',
    heading: 'rgb(0, 0, 0)',
    body: 'rgb(64, 84, 76)',
    axis: 'rgb(82, 99, 92)',
  },
}
for (const observation of [desktop, lightDesktop]) {
  const expected = expectedThemeStyles[observation.theme]
  const styles = observation.themeStyles
  if (styles.rootTheme !== observation.theme) failures.push(`${observation.theme} root theme mismatch: ${styles.rootTheme}`)
  for (const key of ['modal', 'settings', 'stat', 'chart']) {
    if (styles[key]?.backgroundColor !== expected.surface) failures.push(`${observation.theme} ${key} surface mismatch: ${styles[key]?.backgroundColor}`)
    if (styles[key]?.borderColor !== expected.border) failures.push(`${observation.theme} ${key} border mismatch: ${styles[key]?.borderColor}`)
  }
  if (styles.link?.backgroundColor !== expected.link) failures.push(`${observation.theme} link surface mismatch: ${styles.link?.backgroundColor}`)
  if (styles.heading?.color !== expected.heading) failures.push(`${observation.theme} heading mismatch: ${styles.heading?.color}`)
  if (styles.body?.color !== expected.body) failures.push(`${observation.theme} body mismatch: ${styles.body?.color}`)
  if (styles.chartAxisFill !== expected.axis) failures.push(`${observation.theme} chart axis mismatch: ${styles.chartAxisFill}`)
}
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

const result = {
  status: failures.length ? 'FAIL' : 'PASS',
  baseUrl,
  desktop,
  mobile,
  lightDesktop,
  lightMobile,
  interactions: { masterSwitchChanged, privacyDisabled, focusReturned },
  runtimeErrors,
  failedResponses,
  failures,
}

console.log(JSON.stringify(result, null, 2))
await browser.close()
if (failures.length) process.exit(1)
