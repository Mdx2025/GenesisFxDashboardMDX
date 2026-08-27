import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const targetUrl = `${baseUrl.replace(/\/$/, '')}/challenges`
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
  width: round(rect.width),
  right: round(rect.right),
} : null

async function inspect(width, height) {
  await page.setViewportSize({ width, height })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    window.history.pushState({}, '', '/challenges')
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  await page.getByRole('article').first().waitFor()

  return page.evaluate(() => {
    const grid = document.querySelector('[aria-label="10X challenge accounts"]')
    const card = grid?.querySelector('[data-challenge-card]')
    const pageContent = grid?.closest('.relative.px-4')
    const gridRect = grid?.getBoundingClientRect()
    const cardRect = card?.getBoundingClientRect()
    const pageStyle = pageContent ? getComputedStyle(pageContent) : null
    const cardStyle = card ? getComputedStyle(card) : null

    return {
      viewport: { width: innerWidth, height: innerHeight },
      overflowX: document.documentElement.scrollWidth - innerWidth,
      gridRect,
      cardRect,
      pageContentWidth: pageContent && pageStyle
        ? pageContent.getBoundingClientRect().width - parseFloat(pageStyle.paddingLeft) - parseFloat(pageStyle.paddingRight)
        : null,
      cardScrollWidth: card?.scrollWidth ?? null,
      cardClientWidth: card?.clientWidth ?? null,
      cardMaxWidth: cardStyle?.maxWidth ?? null,
    }
  })
}

try {
  const results = []
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 414, height: 896 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1440, height: 960 },
  ]) {
    const result = await inspect(viewport.width, viewport.height)
    results.push({
      ...result,
      gridRect: normalizeRect(result.gridRect),
      cardRect: normalizeRect(result.cardRect),
    })
  }

  const failures = []
  for (const result of results) {
    if (result.overflowX > 0) failures.push(`${result.viewport.width}px horizontal overflow: ${result.overflowX}`)
    if (result.viewport.width < 768) {
      if (Math.abs(result.cardRect.width - result.gridRect.width) > 1) failures.push(`${result.viewport.width}px card/grid width mismatch: ${result.cardRect.width}/${result.gridRect.width}`)
      if (Math.abs(result.cardRect.width - result.pageContentWidth) > 1) failures.push(`${result.viewport.width}px card/content width mismatch: ${result.cardRect.width}/${result.pageContentWidth}`)
      if (Math.abs(result.cardRect.x - result.gridRect.x) > 1 || Math.abs(result.cardRect.right - result.gridRect.right) > 1) failures.push(`${result.viewport.width}px card edges do not match grid edges`)
    } else if (Math.abs(result.cardRect.width - 374) > 1) {
      failures.push(`${result.viewport.width}px desktop card width changed: ${result.cardRect.width}`)
    }
    if (result.cardScrollWidth > result.cardClientWidth) failures.push(`${result.viewport.width}px card content overflows horizontally: ${result.cardScrollWidth}/${result.cardClientWidth}`)
  }
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  console.log(JSON.stringify({ targetUrl, results, runtimeErrors, failedResponses, failures }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
