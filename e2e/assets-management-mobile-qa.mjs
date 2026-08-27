import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const outputPath = process.env.ASSETS_MOBILE_OUTPUT_PATH
const filteredOutputPath = process.env.ASSETS_MOBILE_FILTERED_OUTPUT_PATH
const targetUrl = `${baseUrl.replace(/\/$/, '')}/assets-management`
const browser = await connectQaBrowser({ url: baseUrl })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()
const runtimeErrors = []
const failedResponses = []

page.on('pageerror', error => runtimeErrors.push(error.message))
page.on('response', response => {
  if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) {
    failedResponses.push({ status: response.status(), url: response.url() })
  }
})

const round = value => Math.round(value * 100) / 100
const normalizeRect = rect => rect ? {
  x: round(rect.x),
  y: round(rect.y),
  width: round(rect.width),
  height: round(rect.height),
  right: round(rect.x + rect.width),
  bottom: round(rect.y + rect.height),
} : null

async function gotoAssetsManagement() {
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    window.history.pushState({}, '', '/assets-management')
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  await page.getByRole('heading', { name: 'Funding', exact: true }).waitFor()
}

async function inspectMobile(width, height) {
  await page.setViewportSize({ width, height })
  await gotoAssetsManagement()
  await page.evaluate(() => document.fonts.ready)

  const metrics = await page.evaluate(() => {
    const tabs = document.querySelector('[data-assets-history-tabs] .mode-toggle')
    const indicator = tabs?.querySelector('.mode-indicator')
    const buttons = [...(tabs?.querySelectorAll('button') || [])]
    const labels = buttons.map(button => button.querySelector('.btn-label')?.getBoundingClientRect())
    const nav = document.querySelector('.lg\\:hidden.fixed.bottom-6')
    const selectButtons = [...document.querySelectorAll('section[aria-label="Assets History"] [role="group"] > div > div > button')]
    const belowTwelve = [...document.querySelectorAll('[data-assets-history-tabs] *, section[aria-label="Assets History"] *')].filter(element => {
      const style = getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0 && element.childNodes.length === 1 && element.firstChild?.nodeType === Node.TEXT_NODE && parseFloat(style.fontSize) < 12
    }).map(element => ({ text: element.textContent?.trim(), fontSize: getComputedStyle(element).fontSize }))
    return {
      viewport: { width: innerWidth, height: innerHeight },
      overflowX: document.documentElement.scrollWidth - innerWidth,
      tabRect: tabs?.getBoundingClientRect() || null,
      indicatorRect: indicator?.getBoundingClientRect() || null,
      buttonRects: buttons.map(button => button.getBoundingClientRect()),
      labelRects: labels,
      labelFontSizes: buttons.map(button => getComputedStyle(button).fontSize),
      firstLabelGap: labels[0] && labels[1] ? labels[1].left - labels[0].right : null,
      navRect: nav?.getBoundingClientRect() || null,
      selectRects: selectButtons.map(button => button.getBoundingClientRect()),
      resetCount: document.querySelectorAll('[data-assets-reset-filters]').length,
      safeAreaRect: document.querySelector('[data-assets-mobile-action-safe-area]')?.getBoundingClientRect() || null,
      exportRect: document.querySelector('[data-assets-export]')?.getBoundingClientRect() || null,
      belowTwelve,
    }
  })

  const statusTrigger = page.getByRole('button', { name: 'All Status', exact: true })
  await statusTrigger.click()
  await page.getByRole('button', { name: 'Pending', exact: true }).click()
  const reset = page.locator('[data-assets-reset-filters]')
  const resetRect = await reset.boundingBox()
  const navRect = await page.locator('.lg\\:hidden.fixed.bottom-6').boundingBox()
  await page.keyboard.press('Tab')
  for (let index = 0; index < 20 && !(await reset.evaluate(element => document.activeElement === element)); index += 1) {
    await page.keyboard.press('Tab')
  }
  const resetKeyboardFocused = await reset.evaluate(element => document.activeElement === element)
  const resetFocus = await reset.evaluate(element => {
    const style = getComputedStyle(element)
    return { boxShadow: style.boxShadow, outline: style.outline }
  })
  await reset.click()

  return {
    ...metrics,
    tabRect: normalizeRect(metrics.tabRect),
    indicatorRect: normalizeRect(metrics.indicatorRect),
    buttonRects: metrics.buttonRects.map(normalizeRect),
    labelRects: metrics.labelRects.map(normalizeRect),
    navRect: normalizeRect(metrics.navRect),
    selectRects: metrics.selectRects.map(normalizeRect),
    safeAreaRect: normalizeRect(metrics.safeAreaRect),
    exportRect: normalizeRect(metrics.exportRect),
    resetFilteredRect: normalizeRect(resetRect),
    resetNavGap: resetRect && navRect ? round(navRect.x - (resetRect.x + resetRect.width)) : null,
    filtersNavGap: metrics.selectRects.length && metrics.navRect ? round(metrics.navRect.y - Math.max(...metrics.selectRects.map(rect => rect.bottom))) : null,
    resetKeyboardFocused,
    resetFocus,
    resetCleared: await page.locator('[data-assets-reset-filters]').count() === 0 && await statusTrigger.innerText() === 'All Status',
  }
}

async function inspectWide(width, height) {
  await page.setViewportSize({ width, height })
  await gotoAssetsManagement()
  return await page.evaluate(() => {
    const title = document.querySelector('section[aria-label="Assets History"] h2')
    const titleRect = title?.getBoundingClientRect()
    const exportRect = document.querySelector('[data-assets-export]')?.getBoundingClientRect()
    return {
      viewport: { width: innerWidth, height: innerHeight },
      overflowX: document.documentElement.scrollWidth - innerWidth,
      titleHeight: titleRect?.height ?? null,
      titleLineHeight: title ? parseFloat(getComputedStyle(title).lineHeight) : null,
      exportWithinViewport: Boolean(exportRect && exportRect.left >= 0 && exportRect.right <= innerWidth),
      desktopResetVisible: Boolean(document.querySelector('.green-pill-button')?.getBoundingClientRect().height),
      mobileSafeAreaVisible: Boolean(document.querySelector('[data-assets-mobile-action-safe-area]')?.getBoundingClientRect().height),
    }
  })
}

try {
  const mobile360 = await inspectMobile(360, 800)
  const mobile390 = await inspectMobile(390, 844)
  const intermediate768 = await inspectWide(768, 1024)
  const desktop1440 = await inspectWide(1440, 960)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await gotoAssetsManagement()
  const reducedMotionVisible = await page.locator('[data-assets-history-tabs]').isVisible() && await page.locator('section[aria-label="Assets History"]').isVisible()

  let axeViolations = null
  try {
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js' })
    axeViolations = await page.evaluate(async () => {
      const result = await window.axe.run(document.querySelector('section[aria-label="Assets History"]'))
      return result.violations.map(violation => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length }))
    })
  } catch (error) {
    axeViolations = [{ id: 'axe-runtime', impact: 'not-tested', nodes: 0, error: error.message }]
  }

  if (outputPath) {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await gotoAssetsManagement()
    await page.screenshot({ path: outputPath, fullPage: true, animations: 'disabled' })
  }
  if (filteredOutputPath) {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoAssetsManagement()
    await page.getByRole('button', { name: 'All Status', exact: true }).click()
    await page.getByRole('button', { name: 'Pending', exact: true }).click()
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({ path: filteredOutputPath, fullPage: true, animations: 'disabled' })
  }

  const failures = []
  for (const result of [mobile360, mobile390]) {
    if (result.overflowX > 0) failures.push(`${result.viewport.width}px horizontal overflow: ${result.overflowX}`)
    if (result.firstLabelGap < 12) failures.push(`${result.viewport.width}px Deposits/Withdrawals label gap: ${result.firstLabelGap}`)
    if (result.labelFontSizes.some(size => parseFloat(size) < 14)) failures.push(`${result.viewport.width}px tab label below 14px`)
    if (Math.abs(result.indicatorRect.width - result.buttonRects[0].width) > 1) failures.push(`${result.viewport.width}px indicator/button width mismatch`)
    if (result.resetCount !== 0) failures.push(`${result.viewport.width}px default Reset should be hidden`)
    if (result.filtersNavGap < 4) failures.push(`${result.viewport.width}px filters overlap floating nav: ${result.filtersNavGap}`)
    if (!result.resetFilteredRect || result.resetFilteredRect.height < 44) failures.push(`${result.viewport.width}px filtered Reset target below 44px`)
    if (result.resetNavGap < 4) failures.push(`${result.viewport.width}px filtered Reset overlaps floating nav: ${result.resetNavGap}`)
    if (!result.resetKeyboardFocused || (result.resetFocus.boxShadow === 'none' && result.resetFocus.outline.includes('none'))) failures.push(`${result.viewport.width}px Reset keyboard focus is not visible`)
    if (!result.resetCleared) failures.push(`${result.viewport.width}px Reset did not restore All Status`)
    if (result.belowTwelve.length) failures.push(`${result.viewport.width}px visible text below 12px: ${JSON.stringify(result.belowTwelve)}`)
  }
  if (!reducedMotionVisible) failures.push('reduced-motion content hidden')
  if (axeViolations.some(violation => violation.impact !== 'not-tested')) failures.push(`axe violations: ${JSON.stringify(axeViolations)}`)
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)
  for (const result of [intermediate768, desktop1440]) {
    if (result.overflowX > 0) failures.push(`${result.viewport.width}px horizontal overflow: ${result.overflowX}`)
    if (!result.exportWithinViewport) failures.push(`${result.viewport.width}px Export is outside the viewport`)
    if (!result.desktopResetVisible) failures.push(`${result.viewport.width}px desktop Reset is hidden`)
    if (result.mobileSafeAreaVisible) failures.push(`${result.viewport.width}px mobile safe area should be hidden`)
    if (result.titleHeight > result.titleLineHeight * 1.2) failures.push(`${result.viewport.width}px Assets History title wrapped`)
  }

  const result = { targetUrl, mobile360, mobile390, intermediate768, desktop1440, reducedMotionVisible, axeViolations, runtimeErrors, failedResponses, failures }
  console.log(JSON.stringify(result, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
