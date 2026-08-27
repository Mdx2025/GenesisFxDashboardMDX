import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = (process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz').replace(/\/$/, '')
const routes = [
  '/assets-management',
  '/academy',
  '/challenges',
  '/leaderboards',
  '/streaming',
  '/streaming/mystreaming',
  '/settings',
  '/tradelocker/accounts',
  '/gensocial/signals',
  '/gensocial/pamm',
  '/partner/referrals',
  '/news/discover',
]
const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
]

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

async function gotoRoute(route) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.evaluate(nextRoute => {
    window.history.pushState({}, '', nextRoute)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, route)
  await page.locator('body').waitFor()
  await page.waitForTimeout(500)
  await page.evaluate(() => document.fonts.ready)
}

async function inspectRoute(route, viewport) {
  await page.setViewportSize(viewport)
  await gotoRoute(route)

  const results = await page.evaluate(() => {
    const visibleToggles = [...document.querySelectorAll('.mode-toggle')].filter(element => {
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight
    })

    return visibleToggles.map((element, index) => {
      const rect = element.getBoundingClientRect()
      const indicator = element.querySelector('.mode-indicator')?.getBoundingClientRect()
      const buttons = [...element.querySelectorAll('button')]
      const activeButton = element.querySelector('button.active')?.getBoundingClientRect()
      const labels = buttons.map(button => button.querySelector('.btn-label'))
      return {
        index,
        before: {
          labels: labels.map(label => label?.textContent?.trim() || ''),
          overflowX: element.scrollWidth - element.clientWidth,
          buttonHeights: buttons.map(button => button.getBoundingClientRect().height),
          fontSizes: buttons.map(button => parseFloat(getComputedStyle(button).fontSize)),
          clippedLabels: labels.flatMap((label, labelIndex) => {
            if (!label) return []
            const button = buttons[labelIndex]
            return label.scrollWidth > button.clientWidth + 1 ? [label.textContent?.trim() || `button-${labelIndex}`] : []
          }),
          labelGaps: labels.slice(0, -1).map((label, labelIndex) => {
            const current = label?.getBoundingClientRect()
            const next = labels[labelIndex + 1]?.getBoundingClientRect()
            return current && next ? next.left - current.right : null
          }),
          indicatorWidthDelta: indicator && activeButton ? Math.abs(indicator.width - activeButton.width) : null,
          indicatorLeftDelta: indicator && activeButton ? Math.abs(indicator.left - activeButton.left) : null,
          withinViewport: rect.left >= -1 && rect.right <= innerWidth + 1,
        },
        after: null,
      }
    })
  })

  if (results.length) {
    await page.evaluate(() => {
      const visibleToggle = [...document.querySelectorAll('.mode-toggle')].find(element => {
        const rect = element.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight
      })
      const buttons = visibleToggle?.querySelectorAll('button')
      buttons?.[buttons.length - 1]?.click()
    })
    await page.waitForTimeout(250)

    results[0].after = await page.evaluate(() => {
      const visibleToggle = [...document.querySelectorAll('.mode-toggle')].find(element => {
        const rect = element.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight
      })
      const indicator = visibleToggle?.querySelector('.mode-indicator')?.getBoundingClientRect()
      const activeButton = visibleToggle?.querySelector('button.active')?.getBoundingClientRect()
      return {
        indicatorWidthDelta: indicator && activeButton ? Math.abs(indicator.width - activeButton.width) : null,
        indicatorLeftDelta: indicator && activeButton ? Math.abs(indicator.left - activeButton.left) : null,
      }
    })
  }

  return {
    route,
    viewport,
    documentOverflowX: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    toggleCount: results.length,
    toggles: results,
  }
}

try {
  const results = []
  for (const viewport of viewports) {
    for (const route of routes) results.push(await inspectRoute(route, viewport))
  }

  await page.setViewportSize(viewports[1])
  await gotoRoute('/assets-management')
  const firstModeButton = page.locator('[data-assets-history-tabs] .mode-toggle').getByRole('button').first()
  await page.evaluate(() => document.activeElement?.blur())
  let focusVisible = false
  for (let index = 0; index < 40; index += 1) {
    await page.keyboard.press('Tab')
    if (await firstModeButton.evaluate(element => document.activeElement === element)) {
      focusVisible = await firstModeButton.evaluate(element => {
        const style = getComputedStyle(element)
        return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2
      })
      break
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const reducedMotionVisible = await page.locator('[data-assets-history-tabs] .mode-toggle').isVisible()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  let axeViolations = []
  try {
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js' })
    axeViolations = await page.evaluate(async () => {
      const result = await window.axe.run(document.querySelector('.mode-toggle'))
      return result.violations.map(violation => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length }))
    })
  } catch (error) {
    axeViolations = [{ id: 'axe-runtime', impact: 'not-tested', nodes: 0, error: error.message }]
  }

  const failures = []
  for (const result of results) {
    if (!result.toggleCount) failures.push(`${result.route} at ${result.viewport.width}px has no visible ModeToggle`)
    if (result.documentOverflowX > 1) failures.push(`${result.route} at ${result.viewport.width}px document overflow: ${result.documentOverflowX}`)
    for (const toggle of result.toggles) {
      const label = `${result.route} toggle ${toggle.index} at ${result.viewport.width}px`
      if (toggle.before.clippedLabels.length) failures.push(`${label} clips labels: ${toggle.before.clippedLabels.join(', ')}`)
      if (toggle.before.labelGaps.some(gap => gap !== null && gap < 8)) failures.push(`${label} has label gap below 8px`)
      if (toggle.before.buttonHeights.some(height => height < 24)) failures.push(`${label} has target below 24px`)
      if (toggle.before.fontSizes.some(size => size < 12)) failures.push(`${label} has text below 12px`)
      if ((toggle.before.indicatorWidthDelta ?? 999) > 1 || (toggle.before.indicatorLeftDelta ?? 999) > 1) failures.push(`${label} initial indicator mismatch`)
      if (toggle.after && ((toggle.after.indicatorWidthDelta ?? 999) > 1 || (toggle.after.indicatorLeftDelta ?? 999) > 1)) failures.push(`${label} moved indicator mismatch`)
    }
  }
  if (axeViolations.some(violation => violation.impact !== 'not-tested')) failures.push(`axe violations: ${JSON.stringify(axeViolations)}`)
  if (!focusVisible) failures.push('ModeToggle keyboard focus indicator is not visible')
  if (!reducedMotionVisible) failures.push('ModeToggle is hidden with reduced motion')
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  console.log(JSON.stringify({ baseUrl, routes, viewports, results, focusVisible, reducedMotionVisible, axeViolations, runtimeErrors, failedResponses, failures }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
