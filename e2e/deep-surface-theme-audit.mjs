import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { chromium } = require('playwright')

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const outputPath = process.env.OUTPUT_PATH || '/tmp/genesis-deep-surface-theme-audit.json'
const screenshotPath = process.env.SCREENSHOT_PATH
const expectedDeep = {
  light: new Set(['rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)']),
  dark: new Set(['rgb(9, 36, 28)', 'rgba(9, 36, 28, 1)']),
}
const expectedIconWell = {
  light: new Set(['rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)']),
  dark: new Set(['rgb(2, 27, 19)', 'rgba(2, 27, 19, 1)']),
}
const expectedBorder = {
  light: new Set(['rgb(236, 236, 236)', 'rgba(236, 236, 236, 1)']),
  dark: new Set(['rgb(22, 45, 37)', 'rgba(22, 45, 37, 1)']),
}
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 1000 },
]

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(absolute)
    return /\.(?:css|tsx?|jsx?)$/.test(entry.name) ? [absolute] : []
  })
}

const literalPattern = /bg-\[\s*#(?:09241c|021b13)\s*\]/ig
const staticOffenders = sourceFiles(path.join(projectRoot, 'src')).flatMap(file => {
  const source = fs.readFileSync(file, 'utf8')
  return [...source.matchAll(literalPattern)].map(match => ({
    file: path.relative(projectRoot, file),
    line: source.slice(0, match.index).split('\n').length,
    match: match[0],
  }))
})

const scenarios = [
  { id: 'home', route: '/home', minDeep: 1 },
  { id: 'partner', route: '/partner', minDeep: 1 },
  {
    id: 'partner-marketing-referral-links', route: '/partner/marketing', minDeep: 3,
    open: page => page.getByRole('button', { name: 'Referral Links', exact: true }).click(),
  },
  { id: 'partner-statistics', route: '/partner/statistics', minDeep: 1 },
  {
    id: 'settings-verification', route: '/settings', minDeep: 3,
    open: page => page.getByRole('button', { name: 'Verification', exact: true }).click(),
  },
  {
    id: 'settings-security', route: '/settings', minDeep: 1,
    open: page => page.getByRole('button', { name: 'Security', exact: true }).click(),
    minIconWell: 2,
  },
  {
    id: 'settings-support', route: '/settings', minDeep: 0, minIconWell: 4,
    open: page => page.getByRole('button', { name: 'Support', exact: true }).click(),
  },
  {
    id: 'settings-two-factor', route: '/settings', minDeep: 3,
    open: async page => {
      await page.getByRole('button', { name: 'Security', exact: true }).click()
      await page.getByText('Two-Factor Authentication', { exact: true })
        .locator('xpath=ancestor::div[contains(@class,"justify-between")][1]')
        .locator('.cursor-pointer')
        .click()
      await page.getByRole('dialog', { name: 'Two-Factor Authentication Setup' }).waitFor()
    },
  },
  {
    id: 'settings-change-picture', route: '/settings', minDeep: 2,
    open: async page => {
      await page.getByRole('button', { name: 'Settings', exact: true }).click()
      await page.getByRole('button', { name: 'Change Picture', exact: true }).click()
      await page.getByRole('dialog', { name: 'Change Profile Picture' }).waitFor()
    },
  },
  {
    id: 'settings-change-password', route: '/settings', minDeep: 1,
    open: async page => {
      await page.getByRole('button', { name: 'Settings', exact: true }).click()
      await page.getByRole('button', { name: 'Change Password', exact: true }).click()
      await page.getByRole('dialog', { name: 'Change Password' }).waitFor()
    },
  },
  {
    id: 'settings-change-email', route: '/settings', minDeep: 1,
    open: async page => {
      await page.getByRole('button', { name: 'Settings', exact: true }).click()
      await page.getByRole('button', { name: 'Change Email', exact: true }).click()
      await page.getByRole('dialog', { name: 'Change Email Address' }).waitFor()
    },
  },
  {
    id: 'journal-statistics', route: '/tradelocker/journal', minDeep: 0,
    open: page => page.getByRole('button', { name: 'Statistics', exact: true }).click(),
  },
]

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--num-raster-threads=1', '--disable-software-rasterizer'],
})
const results = []
const failures = staticOffenders.map(item => `static:${item.file}:${item.line}`)

async function inspect(page, scenario, theme, viewport, runtimeErrors) {
  const observation = await page.locator('body').evaluate((body, currentTheme) => {
    const visible = element => {
      const style = getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0
        && rect.width > 0 && rect.height > 0
    }
    const describe = element => ({
      tag: element.tagName.toLowerCase(),
      className: typeof element.className === 'string' ? element.className : '',
      text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 90),
      computed: getComputedStyle(element).backgroundColor,
    })
    const elements = [...body.querySelectorAll('*')].filter(visible)
    const deep = elements.filter(element => element.classList.contains('bg-gfx-surface-deep')).map(describe)
    const iconWells = elements.filter(element => element.classList.contains('bg-gfx-surface-icon-well')).map(describe)
    const borders = elements
      .filter(element => element.classList.contains('border-gfx-surface-raised-border'))
      .map(element => ({ ...describe(element), computed: getComputedStyle(element).borderTopColor }))
    return {
      deep,
      iconWells,
      borders,
      rawDarkBackgrounds: currentTheme === 'light'
        ? elements
          .filter(element => !element.closest('svg, defs, clipPath, mask, filter'))
          .filter(element => [
            'rgb(9, 36, 28)', 'rgba(9, 36, 28, 1)',
            'rgb(2, 27, 19)', 'rgba(2, 27, 19, 1)',
          ].includes(getComputedStyle(element).backgroundColor))
          .map(describe)
        : [],
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    }
  }, theme)

  const id = `${scenario.id}:${theme}@${viewport.width}`
  const checks = {
    deepCoverage: observation.deep.length >= scenario.minDeep,
    deepSurface: observation.deep.every(item => expectedDeep[theme].has(item.computed)),
    iconWellCoverage: observation.iconWells.length >= (scenario.minIconWell || 0),
    iconWellSurface: observation.iconWells.every(item => expectedIconWell[theme].has(item.computed)),
    borders: observation.borders.every(item => expectedBorder[theme].has(item.computed)),
    rawDarkBackgrounds: observation.rawDarkBackgrounds.length === 0,
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
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport })
      await context.addInitScript(currentTheme => localStorage.setItem('genesis-fx-theme', currentTheme), theme)
      const page = await context.newPage()
      const runtimeErrors = []
      page.on('pageerror', error => runtimeErrors.push(error.message))

      for (const scenario of scenarios) {
        runtimeErrors.length = 0
        const response = await page.goto(`${baseUrl}${scenario.route}`, { waitUntil: 'networkidle', timeout: 60_000 })
        if (response?.status() !== 200) failures.push(`${scenario.id}:${theme}@${viewport.width}:HTTP-${response?.status()}`)
        await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' })
        await page.evaluate(() => document.fonts.ready)
        if (scenario.open) await scenario.open(page)
        await inspect(page, scenario, theme, viewport, runtimeErrors)
        if (screenshotPath && scenario.id === 'settings-security' && theme === 'light' && viewport.name === 'desktop') {
          await page.getByText('Security Settings', { exact: true })
            .locator('xpath=ancestor::div[contains(@class,"overflow-hidden")][1]')
            .screenshot({ path: screenshotPath })
        }
      }
      await context.close()
    }
  }
} finally {
  await browser.close()
}

const report = {
  status: failures.length === 0 ? 'PASS' : 'FAIL',
  baseUrl,
  scenarios: results.length,
  staticOffenders,
  failures,
  results,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2))
console.log(JSON.stringify({
  status: report.status,
  baseUrl,
  scenarios: report.scenarios,
  staticOffenders: staticOffenders.length,
  failures,
}, null, 2))
process.exitCode = report.status === 'PASS' ? 0 : 2
