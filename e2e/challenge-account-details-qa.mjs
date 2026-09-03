import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const targetUrl = `${baseUrl.replace(/\/$/, '')}/challenges/details-single-page`
const screenshotPath = process.env.SCREENSHOT_PATH || '/home/clawd/genesis-challenge-account-details.png'
const axeSource = readFileSync('/home/clawd/.openclaw/workspace/scripts/node_modules/axe-core/axe.min.js', 'utf8')

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

async function gotoRoute() {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => {
    window.history.pushState({}, '', '/challenges/details-single-page')
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  await page.locator('[data-challenge-account-details]').waitFor({ state: 'visible' })
  await page.evaluate(() => document.fonts?.ready)
}

async function inspect(width, height, theme) {
  await page.setViewportSize({ width, height })
  await page.evaluate(selectedTheme => { document.documentElement.dataset.theme = selectedTheme }, theme)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))

  return page.evaluate(({ width, height, theme }) => {
    const round = value => Math.round(value * 100) / 100
    const box = element => {
      const rect = element.getBoundingClientRect()
      return { x: round(rect.x), y: round(rect.y), width: round(rect.width), height: round(rect.height), right: round(rect.right), bottom: round(rect.bottom) }
    }
    const parseColor = value => {
      const channels = value.match(/[\d.]+/g)?.map(Number)
      return channels?.length >= 3 ? { r: channels[0], g: channels[1], b: channels[2], a: channels[3] ?? 1 } : null
    }
    const composite = (foreground, background) => ({
      r: foreground.r * foreground.a + background.r * (1 - foreground.a),
      g: foreground.g * foreground.a + background.g * (1 - foreground.a),
      b: foreground.b * foreground.a + background.b * (1 - foreground.a),
      a: 1,
    })
    const effectiveBackground = element => {
      let background = { r: 4, g: 11, b: 9, a: 1 }
      const layers = []
      for (let node = element; node; node = node.parentElement) {
        const color = parseColor(getComputedStyle(node).backgroundColor)
        if (color && color.a > 0) layers.push(color)
      }
      for (const layer of layers.reverse()) background = composite(layer, background)
      return background
    }
    const linear = value => {
      const normalized = value / 255
      return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
    }
    const luminance = color => 0.2126 * linear(color.r) + 0.7152 * linear(color.g) + 0.0722 * linear(color.b)
    const contrast = (foreground, background) => {
      const fg = luminance(foreground)
      const bg = luminance(background)
      return round((Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05))
    }
    const textContrast = element => {
      const color = parseColor(getComputedStyle(element).color)
      return color ? contrast(composite(color, effectiveBackground(element)), effectiveBackground(element)) : 0
    }

    const account = document.querySelector('[data-challenge-account-details]')
    const trades = document.querySelector('[data-challenge-trades]')
    const performance = [...document.querySelectorAll('h2')].find(element => element.textContent?.trim() === 'Performance Chart')?.closest('.glass-card')
    const rows = [...account.querySelectorAll('dl > div')]
    const visibleText = [...account.querySelectorAll('h2, dt, dd, p, button'), ...trades.querySelectorAll('button, p')].filter(element => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none'
    })
    const labels = [...account.querySelectorAll('dt')]
    const values = [...account.querySelectorAll('dd')]
    const banner = account.querySelector('p')
    const tabButtons = [...trades.querySelectorAll('[role="tab"]')]

    return {
      viewport: { width, height },
      theme,
      documentOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      account: box(account),
      trades: box(trades),
      performance: box(performance),
      orderAndGap: {
        performanceBeforeAccount: performance.getBoundingClientRect().bottom <= account.getBoundingClientRect().top,
        accountBeforeTrades: account.getBoundingClientRect().bottom <= trades.getBoundingClientRect().top,
        accountGap: round(account.getBoundingClientRect().top - performance.getBoundingClientRect().bottom),
        tradesGap: round(trades.getBoundingClientRect().top - account.getBoundingClientRect().bottom),
      },
      twoColumns: rows[0].getBoundingClientRect().x !== rows[4].getBoundingClientRect().x,
      rowsContained: rows.every(row => {
        const rect = row.getBoundingClientRect()
        const card = account.getBoundingClientRect()
        return rect.left >= card.left - 1 && rect.right <= card.right + 1
      }),
      tinyText: visibleText.map(element => ({ text: element.textContent?.trim(), size: parseFloat(getComputedStyle(element).fontSize) })).filter(item => item.size < 12),
      contrast: {
        labelMinimum: Math.min(...labels.map(textContrast)),
        valueMinimum: Math.min(...values.map(textContrast)),
        banner: textContrast(banner),
        inactiveTab: textContrast(tabButtons[1]),
      },
      controls: {
        withdraw: box([...account.querySelectorAll('button')].find(button => button.textContent?.includes('Withdraw'))),
        tabs: tabButtons.map(box),
        startTrading: box([...trades.querySelectorAll('button')].find(button => button.textContent?.includes('Start Trading'))),
      },
      copy: {
        accountHeading: account.querySelector('h2')?.textContent?.trim(),
        banner: banner?.textContent?.trim(),
        activeTitle: trades.querySelector('[role="tabpanel"] p')?.textContent?.trim(),
        labels: labels.map(element => element.textContent?.trim()),
      },
    }
  }, { width, height, theme })
}

try {
  await gotoRoute()

  const results = []
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1024, height: 768 },
    { width: 1536, height: 960 },
  ]) {
    results.push(await inspect(viewport.width, viewport.height, 'dark'))
  }
  results.push(await inspect(390, 844, 'light'))
  results.push(await inspect(1536, 960, 'light'))

  await page.setViewportSize({ width: 1024, height: 768 })
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark' })
  const openTab = page.getByRole('tab', { name: 'Open Positions' })
  const closedTab = page.getByRole('tab', { name: 'Closed Trades' })
  await openTab.focus()
  await openTab.press('ArrowRight')
  const arrowSelection = {
    closedSelected: await closedTab.getAttribute('aria-selected'),
    activeElement: await page.evaluate(() => document.activeElement?.textContent?.trim()),
    panelCopy: await page.getByRole('tabpanel').locator('p').first().textContent(),
  }
  await closedTab.press('Home')
  const homeSelection = {
    openSelected: await openTab.getAttribute('aria-selected'),
    activeElement: await page.evaluate(() => document.activeElement?.textContent?.trim()),
  }
  const focusEvidence = await page.evaluate(() => {
    const active = document.activeElement
    const style = active ? getComputedStyle(active) : null
    return { outline: style?.outline, boxShadow: style?.boxShadow }
  })

  await page.emulateMedia({ reducedMotion: 'reduce' })
  const reducedMotion = {
    matches: await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches),
    accountVisible: await page.locator('[data-challenge-account-details]').isVisible(),
    tradesVisible: await page.locator('[data-challenge-trades]').isVisible(),
    tabsOperable: await openTab.isEnabled() && await closedTab.isEnabled(),
  }

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.getByRole('button', { name: 'Start Trading' }).click()
  const startTradingDestination = new URL(page.url()).pathname
  await page.goBack()
  await page.locator('[data-challenge-account-details]').waitFor({ state: 'visible' })
  await page.locator('[data-challenge-account-details]').getByRole('button', { name: 'Withdraw' }).click()
  const withdrawDestination = new URL(page.url()).pathname
  await page.goBack()
  await page.locator('[data-challenge-account-details]').waitFor({ state: 'visible' })
  const navigationEvidence = { startTradingDestination, withdrawDestination }

  await page.setViewportSize({ width: 780, height: 844 })
  await page.evaluate(() => { document.documentElement.style.zoom = '2' })
  const zoomEvidence = await page.evaluate(() => {
    const account = document.querySelector('[data-challenge-account-details]')
    const trades = document.querySelector('[data-challenge-trades]')
    const contained = element => {
      const rect = element.getBoundingClientRect()
      return rect.left >= -1 && rect.right <= document.documentElement.clientWidth + 1
    }
    return {
      zoom: getComputedStyle(document.documentElement).zoom,
      documentOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      accountContained: contained(account),
      tradesContained: contained(trades),
    }
  })
  await page.evaluate(() => { document.documentElement.style.zoom = '' })

  await page.addScriptTag({ content: axeSource })
  const axe = await page.evaluate(async () => {
    const root = document.createElement('div')
    root.setAttribute('data-qa-root', '')
    const account = document.querySelector('[data-challenge-account-details]')
    const trades = document.querySelector('[data-challenge-trades]')
    account.parentElement.insertBefore(root, account)
    root.append(account, trades)
    const result = await window.axe.run(root)
    root.replaceWith(account, trades)
    return result.violations.map(violation => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length }))
  })

  await page.setViewportSize({ width: 1536, height: 960 })
  await page.screenshot({ path: screenshotPath, fullPage: true })

  const failures = []
  const expectedLabels = ['Trading power', 'Breach floor (10% DD)', 'Trading days', 'Opened', 'Deposit', 'Buffer to floor', 'Available to cash out', 'Net P&L']
  for (const result of results) {
    const label = `${result.theme} ${result.viewport.width}px`
    if (result.documentOverflow > 0) failures.push(`${label}: document overflow ${result.documentOverflow}px`)
    if (!result.orderAndGap.performanceBeforeAccount || !result.orderAndGap.accountBeforeTrades) failures.push(`${label}: card order mismatch`)
    if (Math.abs(result.orderAndGap.accountGap - 16) > 1 || Math.abs(result.orderAndGap.tradesGap - 16) > 1) failures.push(`${label}: section gaps ${JSON.stringify(result.orderAndGap)}`)
    if ((result.viewport.width >= 1024) !== result.twoColumns) failures.push(`${label}: responsive column mismatch`)
    if (!result.rowsContained) failures.push(`${label}: account row leaves card`)
    if (result.tinyText.length) failures.push(`${label}: visible text below 12px ${JSON.stringify(result.tinyText)}`)
    if (result.contrast.labelMinimum < 4.5 || result.contrast.valueMinimum < 4.5 || result.contrast.banner < 4.5 || result.contrast.inactiveTab < 4.5) failures.push(`${label}: contrast failure ${JSON.stringify(result.contrast)}`)
    if (result.controls.withdraw.height < 44 || result.controls.startTrading.height < 44 || result.controls.tabs.some(tab => tab.height < 44)) failures.push(`${label}: control below 44px ${JSON.stringify(result.controls)}`)
    if (result.copy.accountHeading !== 'Account details' || result.copy.activeTitle !== 'No open positions. The markets are waiting!') failures.push(`${label}: primary copy mismatch ${JSON.stringify(result.copy)}`)
    if (result.copy.banner !== 'Trade on 5 more days to unlock cash-out. You can always cash out at breakeven or a loss once 5 trading days are met.') failures.push(`${label}: banner copy mismatch`)
    if (JSON.stringify(result.copy.labels) !== JSON.stringify(expectedLabels)) failures.push(`${label}: ledger labels mismatch ${JSON.stringify(result.copy.labels)}`)
  }
  if (arrowSelection.closedSelected !== 'true' || arrowSelection.activeElement !== 'Closed Trades' || arrowSelection.panelCopy?.trim() !== 'No closed trades yet.') failures.push(`ArrowRight tab behavior: ${JSON.stringify(arrowSelection)}`)
  if (homeSelection.openSelected !== 'true' || homeSelection.activeElement !== 'Open Positions') failures.push(`Home tab behavior: ${JSON.stringify(homeSelection)}`)
  if (focusEvidence.outline === 'none' && focusEvidence.boxShadow === 'none') failures.push(`focus indicator missing: ${JSON.stringify(focusEvidence)}`)
  if (!reducedMotion.matches || !reducedMotion.accountVisible || !reducedMotion.tradesVisible || !reducedMotion.tabsOperable) failures.push(`reduced motion failure: ${JSON.stringify(reducedMotion)}`)
  if (navigationEvidence.startTradingDestination !== '/tradelocker/accounts' || navigationEvidence.withdrawDestination !== '/withdraw') failures.push(`navigation failure: ${JSON.stringify(navigationEvidence)}`)
  if (zoomEvidence.zoom !== '2' || zoomEvidence.documentOverflow > 0 || !zoomEvidence.accountContained || !zoomEvidence.tradesContained) failures.push(`200% zoom failure: ${JSON.stringify(zoomEvidence)}`)
  if (axe.length) failures.push(`axe violations: ${JSON.stringify(axe)}`)
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  const report = { targetUrl, screenshotPath, results, arrowSelection, homeSelection, focusEvidence, reducedMotion, navigationEvidence, zoomEvidence, axe, runtimeErrors, failedResponses, failures }
  console.log(JSON.stringify(report, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
