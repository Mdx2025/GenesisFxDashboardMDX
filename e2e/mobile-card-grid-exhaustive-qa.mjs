import { createRequire } from 'node:module'
import { readFile } from 'node:fs/promises'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const pagesSource = await readFile(new URL('../src/data/pages.tsx', import.meta.url), 'utf8')
const routes = [...new Set([...pagesSource.matchAll(/path:\s*'([^']+)'/g)].map(match => match[1].replace(':accountId', '1')))]
const viewVariants = {
  '/tradelocker/journal': ['Overview', 'Statistics', 'Strategy DNA', 'Calendar', 'Trades', 'Notebook', 'Replay'],
  '/academy': ['Video Courses', 'E Books', 'Glossary', 'Calculators'],
  '/gensocial/pamm': ['Browse', 'Investments', 'Manager'],
  '/gensocial/copy-trading': ['Leaderboard', 'Follower', 'Master'],
  '/gensocial/signals': ['Marketplace', 'Signal Feed', 'Follower', 'Provider'],
}
const browser = await connectQaBrowser({ url: baseUrl })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()
const runtimeErrors = []
const failedResponses = []

page.on('pageerror', error => runtimeErrors.push(error.message))
page.on('response', response => {
  if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) failedResponses.push({ status: response.status(), url: response.url() })
})

async function navigate(route) {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.evaluate(nextRoute => {
    window.history.pushState({}, '', nextRoute)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, route)
  await page.locator('body').waitFor()
  await page.waitForTimeout(250)
}

async function measure(label) {
  return page.evaluate(currentLabel => {
    const visible = element => {
      const box = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      return box.width > 0 && box.height > 0 && style.display !== 'none' && style.visibility !== 'hidden'
    }
    const cardSelector = '.glass-card, [data-stream-card], [data-follower-card], [data-challenge-card], .signal-strategy-card, .copy-trader-card'
    const mismatches = []
    const grids = [...document.querySelectorAll('*')].filter(element => {
      if (!visible(element)) return false
      const style = getComputedStyle(element)
      return style.display === 'grid' && style.gridTemplateColumns.trim().split(/\s+/).length === 1
    })
    for (const grid of grids) {
      const gridStyle = getComputedStyle(grid)
      const gridBox = grid.getBoundingClientRect()
      const contentLeft = gridBox.left + parseFloat(gridStyle.paddingLeft)
      const contentWidth = gridBox.width - parseFloat(gridStyle.paddingLeft) - parseFloat(gridStyle.paddingRight)
      for (const child of grid.children) {
        if (!visible(child)) continue
        const descendantCards = [...child.querySelectorAll(cardSelector)].filter(visible)
        const card = child.matches(cardSelector) ? child : descendantCards.length === 1 ? descendantCards[0] : null
        if (!card || !visible(card)) continue
        const cardBox = card.getBoundingClientRect()
        const cardStyle = getComputedStyle(card)
        const intentionallyCentered = cardStyle.marginLeft === 'auto' && cardStyle.marginRight === 'auto'
        if (contentWidth - cardBox.width > 2 && !intentionallyCentered) {
          mismatches.push({
            label: currentLabel,
            card: card.getAttribute('data-stream-card') !== null ? 'data-stream-card' : card.className,
            gridWidth: Math.round(contentWidth * 100) / 100,
            cardWidth: Math.round(cardBox.width * 100) / 100,
            leftGap: Math.round((cardBox.left - contentLeft) * 100) / 100,
          })
        }
      }
    }
    return {
      label: currentLabel,
      oneColumnGrids: grids.length,
      visibleCards: [...document.querySelectorAll(cardSelector)].filter(visible).length,
      mismatches,
      overflowX: document.documentElement.scrollWidth - innerWidth,
    }
  }, label)
}

try {
  const results = []
  for (const viewport of [{ width: 360, height: 800 }, { width: 430, height: 932 }, { width: 600, height: 960 }]) {
    await page.setViewportSize(viewport)
    for (const route of routes) {
      await navigate(route)
      results.push({ viewport: viewport.width, route, ...(await measure('default')) })
      for (const label of viewVariants[route] || []) {
        const button = page.locator('.mode-toggle').first().getByRole('button', { name: label, exact: true })
        if (!await button.count()) continue
        await button.click()
        await page.waitForTimeout(100)
        results.push({ viewport: viewport.width, route, ...(await measure(label)) })
      }
    }
  }

  const failures = []
  for (const result of results) {
    if (result.overflowX > 0) failures.push(`${result.viewport}px ${result.route} ${result.label}: document overflow ${result.overflowX}px`)
    for (const mismatch of result.mismatches) failures.push(`${result.viewport}px ${result.route} ${result.label}: ${mismatch.cardWidth}/${mismatch.gridWidth}px card/grid (${mismatch.card})`)
  }
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)
  const summary = {
    baseUrl,
    routeCount: routes.length,
    stateCount: results.length,
    auditedCards: results.reduce((sum, result) => sum + result.visibleCards, 0),
    auditedOneColumnGrids: results.reduce((sum, result) => sum + result.oneColumnGrids, 0),
    runtimeErrors,
    failedResponses,
    failureCount: failures.length,
    failureSamples: failures.slice(0, 80),
    ...(process.env.AUDIT_VERBOSE === '1' ? { results } : {}),
  }
  console.log(JSON.stringify(summary, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
