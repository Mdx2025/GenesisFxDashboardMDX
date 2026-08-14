import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { chromium } = require('playwright')

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const outputPath = process.env.OUTPUT_PATH || '/tmp/genesis-hardcoded-dark-light-audit.json'
const screenshotPath = process.env.SCREENSHOT_PATH
const forbiddenLightBackgrounds = new Set([
  'rgb(13, 21, 18)',
  'rgba(13, 21, 18, 1)',
  'rgb(12, 19, 17)',
  'rgba(12, 19, 17, 1)',
])
const expectedProfileBackground = {
  light: new Set(['rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)']),
  dark: new Set(['rgb(12, 19, 17)', 'rgba(12, 19, 17, 1)']),
}
const viewports = [
  { width: 390, height: 844 },
  { width: 1440, height: 1000 },
]

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(absolute)
    return /\.(?:css|tsx?|jsx?)$/.test(entry.name) ? [absolute] : []
  })
}

const literalPattern = /(?:bg-\[\s*#0[dD]1512\s*\]|background(?:-color)?\s*:\s*#0[dD]1512\b)/g
const staticOffenders = sourceFiles(path.join(projectRoot, 'src')).flatMap(file => {
  const source = fs.readFileSync(file, 'utf8')
  return [...source.matchAll(literalPattern)].map(match => ({
    file: path.relative(projectRoot, file),
    line: source.slice(0, match.index).split('\n').length,
    match: match[0],
  }))
})

const registrySource = fs.readFileSync(path.join(projectRoot, 'src/data/pages.tsx'), 'utf8')
const registryRoutes = [...registrySource.matchAll(/path:\s*'([^']+)'/g)]
  .map(match => match[1].replace(':accountId', 'qa-account'))
  .concat(['/login', '/register'])
const routes = process.env.ROUTES
  ? process.env.ROUTES.split(',').map(route => route.trim()).filter(Boolean)
  : registryRoutes

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--num-raster-threads=1', '--disable-software-rasterizer'],
})
const results = []
const failures = staticOffenders.map(item => `static:${item.file}:${item.line}`)

async function inspect(page, route, theme, viewport, runtimeErrors) {
  const observation = await page.locator('body').evaluate((body, forbiddenColors) => {
    const isVisible = element => {
      const style = getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      return style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number(style.opacity) > 0
        && rect.width > 0
        && rect.height > 0
    }
    const describe = element => ({
      tag: element.tagName.toLowerCase(),
      className: typeof element.className === 'string' ? element.className : '',
      text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
      backgroundColor: getComputedStyle(element).backgroundColor,
    })
    const visibleElements = [...body.querySelectorAll('*')].filter(isVisible)
    const profileCard = body.querySelector('[data-settings-profile-card]')
    return {
      darkBackgrounds: visibleElements
        .filter(element => !element.closest('svg, defs, clipPath, mask, filter'))
        .filter(element => forbiddenColors.includes(getComputedStyle(element).backgroundColor))
        .filter(element => !element.classList.contains('theme-decorative-glow'))
        .map(describe),
      profileBackground: profileCard ? getComputedStyle(profileCard).backgroundColor : null,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    }
  }, [...forbiddenLightBackgrounds])

  const id = `${route}:${theme}@${viewport.width}`
  const checks = {
    hardcodedDark: theme === 'dark' || observation.darkBackgrounds.length === 0,
    profileSurface: route !== '/settings' || expectedProfileBackground[theme].has(observation.profileBackground),
    overflow: !observation.overflow,
    runtime: runtimeErrors.length === 0,
  }
  for (const [check, passed] of Object.entries(checks)) {
    if (!passed) failures.push(`${id}:${check}`)
  }
  results.push({ id, checks, observation, runtimeErrors: [...runtimeErrors] })
}

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport })
    await context.addInitScript(() => localStorage.setItem('genesis-fx-theme', 'light'))
    const page = await context.newPage()
    const runtimeErrors = []
    page.on('pageerror', error => runtimeErrors.push(error.message))

    for (const route of routes) {
      runtimeErrors.length = 0
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle', timeout: 60_000 })
      if (response?.status() !== 200) failures.push(`${route}:light@${viewport.width}:HTTP-${response?.status()}`)
      await page.evaluate(() => document.fonts.ready)
      await inspect(page, route, 'light', viewport, runtimeErrors)
      if (screenshotPath && route === '/settings' && viewport.width === 1440) {
        await page.locator('[data-settings-profile-card]').screenshot({ path: screenshotPath })
      }
    }
    await context.close()
  }

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport })
    await context.addInitScript(() => localStorage.setItem('genesis-fx-theme', 'dark'))
    const page = await context.newPage()
    const runtimeErrors = []
    page.on('pageerror', error => runtimeErrors.push(error.message))
    const response = await page.goto(`${baseUrl}/settings`, { waitUntil: 'networkidle', timeout: 60_000 })
    if (response?.status() !== 200) failures.push(`/settings:dark@${viewport.width}:HTTP-${response?.status()}`)
    await page.evaluate(() => document.fonts.ready)
    await inspect(page, '/settings', 'dark', viewport, runtimeErrors)
    await context.close()
  }
} finally {
  await browser.close()
}

const report = {
  status: failures.length === 0 ? 'PASS' : 'FAIL',
  baseUrl,
  routes: routes.length,
  scenarios: results.length,
  staticOffenders,
  failures,
  results,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2))
console.log(JSON.stringify({
  status: report.status,
  baseUrl,
  routes: report.routes,
  scenarios: report.scenarios,
  staticOffenders: staticOffenders.length,
  failures,
}, null, 2))
process.exitCode = report.status === 'PASS' ? 0 : 2
