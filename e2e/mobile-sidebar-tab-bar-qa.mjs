import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
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

async function gotoTarget() {
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    window.history.pushState({}, '', '/assets-management')
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  await page.getByRole('heading', { name: 'Funding', exact: true }).waitFor()
}

async function inspectDrawer(width, height) {
  await page.setViewportSize({ width, height })
  await gotoTarget()

  const menuButton = page.getByRole('button', { name: 'Open navigation menu' })
  const tabBar = page.locator('[data-mobile-tab-bar]')
  const sidebar = page.getByRole('complementary', { name: 'Main navigation' })
  const backdrop = page.locator('.fixed.inset-0.bg-black\\/60.lg\\:hidden')

  const closedVisible = await tabBar.isVisible()
  await menuButton.click()
  await sidebar.waitFor({ state: 'visible' })
  const openCount = await tabBar.count()
  const sidebarOpenTransform = await sidebar.evaluate(element => getComputedStyle(element).transform)
  const backdropPointerEvents = await backdrop.evaluate(element => getComputedStyle(element).pointerEvents)

  await backdrop.click({ position: { x: width - 8, y: Math.min(height - 8, 700) } })
  await page.locator('[data-mobile-tab-bar]').waitFor({ state: 'visible' })

  return {
    viewport: { width, height },
    closedVisible,
    openCount,
    sidebarOpenTransform,
    backdropPointerEvents,
    restoredVisible: await page.locator('[data-mobile-tab-bar]').isVisible(),
    overflowX: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  }
}

try {
  const mobile390 = await inspectDrawer(390, 844)
  const tablet960 = await inspectDrawer(960, 900)

  await page.setViewportSize({ width: 1440, height: 960 })
  await gotoTarget()
  const desktop = {
    tabBarCount: await page.locator('[data-mobile-tab-bar]:visible').count(),
    sidebarVisible: await page.getByRole('complementary', { name: 'Main navigation' }).isVisible(),
    overflowX: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  }

  const failures = []
  for (const result of [mobile390, tablet960]) {
    if (!result.closedVisible) failures.push(`${result.viewport.width}px tab bar missing while drawer closed`)
    if (result.openCount !== 0) failures.push(`${result.viewport.width}px tab bar remains mounted while drawer open`)
    if (result.sidebarOpenTransform !== 'matrix(1, 0, 0, 1, 0, 0)' && result.sidebarOpenTransform !== 'none') failures.push(`${result.viewport.width}px sidebar did not open: ${result.sidebarOpenTransform}`)
    if (result.backdropPointerEvents === 'none') failures.push(`${result.viewport.width}px backdrop is not interactive`)
    if (!result.restoredVisible) failures.push(`${result.viewport.width}px tab bar did not return after close`)
    if (result.overflowX > 0) failures.push(`${result.viewport.width}px horizontal overflow: ${result.overflowX}`)
  }
  if (desktop.tabBarCount !== 0) failures.push('desktop tab bar should remain hidden')
  if (!desktop.sidebarVisible) failures.push('desktop sidebar is hidden')
  if (desktop.overflowX > 0) failures.push(`desktop horizontal overflow: ${desktop.overflowX}`)
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  console.log(JSON.stringify({ targetUrl, mobile390, tablet960, desktop, runtimeErrors, failedResponses, failures }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
