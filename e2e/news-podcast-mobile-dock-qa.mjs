import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const targetUrl = `${baseUrl.replace(/\/$/, '')}/news/podcast`
const browser = await connectQaBrowser({ url: baseUrl })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()
const screenshotPath = process.env.SCREENSHOT_PATH
const runtimeErrors = []
const failedResponses = []

page.on('pageerror', error => runtimeErrors.push(error.message))
page.on('response', response => {
  if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) {
    failedResponses.push({ status: response.status(), url: response.url() })
  }
})

async function goto(pathname, heading) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.evaluate(path => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, pathname)
  await page.getByRole('heading', { name: heading, exact: true }).waitFor()
}

async function inspectPodcast(width, height) {
  await page.setViewportSize({ width, height })
  await goto('/news/podcast', 'Daily analysis')

  return page.evaluate(() => {
    const tabBar = document.querySelector('[data-mobile-tab-bar]')
    const player = document.querySelector('[data-podcast-player-bar]')
    if (!tabBar || !player) throw new Error('Podcast dock surfaces are missing')

    const tabRect = tabBar.getBoundingClientRect()
    const playerRect = player.getBoundingClientRect()
    const tabStyle = getComputedStyle(tabBar)
    const playerStyle = getComputedStyle(player)

    return {
      viewport: { width: innerWidth, height: innerHeight },
      tabBar: { top: tabRect.top, bottom: tabRect.bottom, height: tabRect.height, zIndex: Number(tabStyle.zIndex) },
      player: { top: playerRect.top, bottom: playerRect.bottom, height: playerRect.height, zIndex: Number(playerStyle.zIndex) },
      gap: playerRect.top - tabRect.bottom,
      tabBottomOffset: innerHeight - tabRect.bottom,
      playerBottomOffset: innerHeight - playerRect.bottom,
      overflowX: document.documentElement.scrollWidth - innerWidth,
    }
  })
}

try {
  const mobile = []
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 600, height: 960 },
    { width: 960, height: 900 },
  ]) {
    mobile.push(await inspectPodcast(viewport.width, viewport.height))
  }

  if (screenshotPath) {
    await page.setViewportSize({ width: 390, height: 844 })
    await goto('/news/podcast', 'Daily analysis')
    await page.screenshot({ path: screenshotPath })
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await goto('/assets-management', 'Funding')
  const controlRoute = await page.locator('[data-mobile-tab-bar]').evaluate(element => {
    const rect = element.getBoundingClientRect()
    return { bottomOffset: innerHeight - rect.bottom }
  })

  await page.setViewportSize({ width: 1440, height: 960 })
  await goto('/news/podcast', 'Daily analysis')
  const desktop = {
    tabBarCount: await page.locator('[data-mobile-tab-bar]:visible').count(),
    playerVisible: await page.locator('[data-podcast-player-bar]').isVisible(),
    overflowX: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  }

  const failures = []
  for (const result of mobile) {
    const width = result.viewport.width
    if (Math.abs(result.gap - 24) > 1) failures.push(`${width}px dock gap is ${result.gap}px instead of 24px`)
    if (Math.abs(result.tabBottomOffset - 116) > 1) failures.push(`${width}px tab bar bottom offset is ${result.tabBottomOffset}px`)
    if (Math.abs(result.playerBottomOffset) > 1) failures.push(`${width}px player bottom offset is ${result.playerBottomOffset}px`)
    if (result.tabBar.top >= result.player.top) failures.push(`${width}px tab bar is not above the player`)
    if (result.tabBar.zIndex <= result.player.zIndex) failures.push(`${width}px tab bar does not lead the dock stack`)
    if (result.overflowX > 0) failures.push(`${width}px horizontal overflow: ${result.overflowX}`)
  }
  if (Math.abs(controlRoute.bottomOffset - 24) > 1) failures.push(`non-podcast tab bar offset changed to ${controlRoute.bottomOffset}px`)
  if (desktop.tabBarCount !== 0) failures.push('desktop tab bar should remain hidden')
  if (!desktop.playerVisible) failures.push('desktop podcast player is hidden')
  if (desktop.overflowX > 0) failures.push(`desktop horizontal overflow: ${desktop.overflowX}`)
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  console.log(JSON.stringify({ targetUrl, mobile, controlRoute, desktop, screenshotPath, runtimeErrors, failedResponses, failures }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
