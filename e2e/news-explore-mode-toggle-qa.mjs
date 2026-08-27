import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const screenshotPath = process.env.SCREENSHOT_PATH || '/home/clawd/genesis-news-mode-toggle-mobile.png'
const expectedLabels = ['For you', 'All', 'Trending', 'Gainers', 'Losers', 'AI Picks', 'FX', 'Metals', 'Indices', 'Crypto', 'Energy']
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

async function gotoDiscover() {
  await page.goto(`${baseUrl}/news/discover`, { waitUntil: 'networkidle' })
  await page.locator('[data-explore-markets-controls] .mode-toggle[aria-label="Market category"]').waitFor()
}

async function inspect() {
  return page.locator('[data-explore-markets-controls]').evaluate((controls, labels) => {
    const round = value => Math.round(value * 100) / 100
    const parseColor = color => {
      const values = color.match(/[\d.]+/g)?.map(Number) || []
      return { r: values[0] || 0, g: values[1] || 0, b: values[2] || 0, a: values[3] ?? 1 }
    }
    const composite = (foreground, background) => ({
      r: foreground.r * foreground.a + background.r * (1 - foreground.a),
      g: foreground.g * foreground.a + background.g * (1 - foreground.a),
      b: foreground.b * foreground.a + background.b * (1 - foreground.a),
      a: 1,
    })
    const luminance = color => {
      const channel = value => {
        const normalized = value / 255
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
      }
      return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b)
    }
    const contrast = (first, second) => {
      const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a)
      return (lighter + 0.05) / (darker + 0.05)
    }

    const toggle = controls.querySelector('.mode-toggle')
    const indicator = toggle?.querySelector('.mode-indicator')
    const buttons = toggle ? [...toggle.querySelectorAll('button')] : []
    const active = buttons.find(button => button.getAttribute('aria-pressed') === 'true')
    const inactive = buttons.find(button => button.getAttribute('aria-pressed') !== 'true')
    const search = controls.querySelector('input[aria-label="Search markets"]')?.parentElement
    const controlBox = controls.getBoundingClientRect()
    const toggleBox = toggle?.getBoundingClientRect()
    const searchBox = search?.getBoundingClientRect()
    const pageBackground = parseColor(getComputedStyle(document.body).backgroundColor)
    const toggleBackground = composite(parseColor(getComputedStyle(toggle).backgroundColor), pageBackground)

    return {
      labels: buttons.map(button => button.textContent?.trim()),
      labelsMatch: buttons.every((button, index) => button.textContent?.trim() === labels[index]),
      activeLabel: active?.textContent?.trim(),
      direction: getComputedStyle(controls).flexDirection,
      control: { x: round(controlBox.x), right: round(controlBox.right) },
      toggle: toggleBox ? {
        x: round(toggleBox.x),
        right: round(toggleBox.right),
        clientWidth: toggle.clientWidth,
        scrollWidth: toggle.scrollWidth,
        overflowX: getComputedStyle(toggle).overflowX,
        scrollbarWidth: getComputedStyle(toggle).scrollbarWidth,
      } : null,
      search: searchBox ? { x: round(searchBox.x), right: round(searchBox.right), y: round(searchBox.y) } : null,
      toggleBottom: toggleBox ? round(toggleBox.bottom) : null,
      fontSize: active ? parseFloat(getComputedStyle(active).fontSize) : null,
      activeContrast: active && indicator
        ? round(contrast(parseColor(getComputedStyle(active).color), parseColor(getComputedStyle(indicator).backgroundColor)))
        : null,
      inactiveContrast: inactive
        ? round(contrast(parseColor(getComputedStyle(inactive).color), toggleBackground))
        : null,
      documentOverflow: document.documentElement.scrollWidth - innerWidth,
    }
  }, expectedLabels)
}

try {
  const results = []
  const failures = []

  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 600, height: 960 },
    { width: 768, height: 1024 },
    { width: 1440, height: 960 },
  ]) {
    await page.setViewportSize(viewport)
    await gotoDiscover()
    const result = await inspect()
    results.push({ viewport, ...result })

    if (!result.labelsMatch || result.labels.length !== expectedLabels.length) failures.push(`${viewport.width}px labels: ${JSON.stringify(result.labels)}`)
    if (result.activeLabel !== 'For you') failures.push(`${viewport.width}px initial active label: ${result.activeLabel}`)
    if (result.documentOverflow > 0) failures.push(`${viewport.width}px document overflow: ${result.documentOverflow}`)
    if (result.fontSize < 14) failures.push(`${viewport.width}px font size: ${result.fontSize}`)
    if (result.activeContrast < 4.5) failures.push(`${viewport.width}px active contrast: ${result.activeContrast}`)
    if (result.inactiveContrast < 4.5) failures.push(`${viewport.width}px inactive contrast: ${result.inactiveContrast}`)
    if (result.toggle.overflowX !== 'auto') failures.push(`${viewport.width}px contained toggle overflow: ${result.toggle.overflowX}`)
    if (result.toggle.scrollbarWidth !== 'none') failures.push(`${viewport.width}px visible scrollbar`)

    if (viewport.width < 768) {
      if (result.direction !== 'column') failures.push(`${viewport.width}px direction: ${result.direction}`)
      if (Math.abs(result.search.x - result.control.x) > 1 || Math.abs(result.search.right - result.control.right) > 1) failures.push(`${viewport.width}px search alignment`)
      if (result.search.y <= result.toggleBottom) failures.push(`${viewport.width}px search order`)
      if (result.toggle.scrollWidth <= result.toggle.clientWidth) failures.push(`${viewport.width}px contained toggle scroll`)
    }
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await gotoDiscover()
  const trending = page.getByRole('button', { name: 'Trending', exact: true })
  await trending.click()
  await page.waitForTimeout(250)
  if (await trending.getAttribute('aria-pressed') !== 'true') failures.push('Trending does not become active after click')

  await page.keyboard.press('Tab')
  await trending.focus()
  const focus = await trending.evaluate(button => {
    const style = getComputedStyle(button)
    return { width: parseFloat(style.outlineWidth), style: style.outlineStyle, color: style.outlineColor }
  })
  if (focus.style === 'none' || focus.width < 2) failures.push(`focus indicator: ${JSON.stringify(focus)}`)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  if (!(await page.locator('.mode-toggle[aria-label="Market category"]').isVisible())) failures.push('ModeToggle hidden with reduced motion')
  await page.screenshot({ path: screenshotPath, fullPage: true })

  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  console.log(JSON.stringify({
    baseUrl,
    screenshotPath,
    viewportCount: results.length,
    focus,
    runtimeErrors,
    failedResponses,
    failureCount: failures.length,
    failures,
    results,
  }, null, 2))

  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
