import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { chromium } = require('playwright')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const route = process.env.ROUTE || '/design-system'
const themes = process.env.THEME ? [process.env.THEME] : ['dark', 'light']
const expectedDelays = ['0s', '0.7s', '1.4s', '0.3s', '1.1s', '1.9s', '0.5s', '1.6s']

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--num-raster-threads=1', '--disable-software-rasterizer'],
})

const runtimeErrors = []

async function inspect(theme, reducedMotion) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
  })
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem('genesis-fx-theme', selectedTheme)
  }, theme)

  const page = await context.newPage()
  page.on('pageerror', (error) => runtimeErrors.push(error.message))
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  const button = page.locator('button.sparkle-button').filter({ hasText: 'Deposit' }).first()
  await button.waitFor({ state: 'visible' })

  const sample = () => button.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    const surface = element.querySelector('.sparkle-button__hover-surface')
    const sparkles = [...element.querySelectorAll('.sparkle-button__hover-sparkle')]
    if (!(surface instanceof HTMLElement) || sparkles.some((node) => !(node instanceof HTMLElement))) {
      throw new Error('SparkleButton hover anatomy is incomplete')
    }
    const surfaceStyle = getComputedStyle(surface)
    return {
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      surface: {
        backgroundColor: surfaceStyle.backgroundColor,
        opacity: surfaceStyle.opacity,
        transitionDuration: surfaceStyle.transitionDuration,
      },
      sparkles: sparkles.map((node) => {
        const style = getComputedStyle(node)
        return {
          backgroundColor: style.backgroundColor,
          opacity: style.opacity,
          animationName: style.animationName,
          animationDuration: style.animationDuration,
          animationDelay: style.animationDelay,
          animationPlayState: style.animationPlayState,
        }
      }),
    }
  })

  const rest = await sample()
  await button.evaluate((element) => { element.disabled = true })
  await button.hover({ force: true })
  await page.waitForTimeout(50)
  const disabledHover = await sample()
  await page.mouse.move(0, 500)
  await button.evaluate((element) => { element.disabled = false })
  await button.hover()
  await page.waitForTimeout(reducedMotion ? 100 : 500)
  const hover = await sample()

  await context.close()
  return { theme, reducedMotion, rest, hover, disabledHover }
}

const sameSize = (first, second) => ['width', 'height'].every((key) => Math.abs(first[key] - second[key]) <= 0.01)
const themeResults = []

for (const theme of themes) {
  const expectedSurface = theme === 'light' ? 'rgba(0, 179, 140, 0.08)' : 'rgba(255, 255, 255, 0.05)'
  const expectedSparkle = theme === 'light' ? 'rgb(0, 179, 140)' : 'rgb(255, 255, 255)'
  const motion = await inspect(theme, false)
  const reduced = await inspect(theme, true)
  const checks = {
    restStateUnchanged: motion.rest.surface.opacity === '0' && motion.rest.sparkles.every((item) => item.opacity === '0'),
    surfaceParity: motion.hover.surface.backgroundColor === expectedSurface
      && Number(motion.hover.surface.opacity) >= 0.99
      && motion.rest.surface.transitionDuration === '0.35s',
    sparkleCount: motion.hover.sparkles.length === 8,
    sparkleParity: motion.hover.sparkles.every((item, index) => (
      item.backgroundColor === expectedSparkle
      && item.animationName === 'sparkle-button-twinkle'
      && item.animationDuration === '2.4s'
      && item.animationDelay === expectedDelays[index]
      && item.animationPlayState === 'running'
    )),
    geometryStable: sameSize(motion.rest.rect, motion.hover.rect),
    disabledStatic: motion.disabledHover.surface.opacity === '0'
      && motion.disabledHover.sparkles.every((item) => item.animationPlayState === 'paused' && item.opacity === '0'),
    reducedMotionSafe: reduced.hover.surface.opacity === '1'
      && ['0s', '1e-05s'].includes(reduced.hover.surface.transitionDuration)
      && reduced.hover.sparkles.every((item) => item.animationName === 'none' && item.opacity === '0.25'),
  }
  themeResults.push({ theme, checks, motion, reduced })
}

const checksPass = themeResults.every((entry) => Object.values(entry.checks).every(Boolean))

const result = {
  status: checksPass && runtimeErrors.length === 0 ? 'PASS' : 'FAIL',
  baseUrl,
  route,
  themeResults,
  runtimeErrors,
}

console.log(JSON.stringify(result, null, 2))
await browser.close()
process.exitCode = result.status === 'PASS' ? 0 : 2
