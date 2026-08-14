import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { chromium } = require('playwright')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const theme = process.env.THEME || 'dark'
const outputPath = process.env.OUTPUT_PATH
const route = process.env.ROUTE || '/home'

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--num-raster-threads=1', '--disable-software-rasterizer'],
})

const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
await context.addInitScript((selectedTheme) => {
  localStorage.setItem('genesis-fx-theme', selectedTheme)
}, theme)

const page = await context.newPage()
const runtimeErrors = []
page.on('pageerror', (error) => runtimeErrors.push(error.message))
await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

const labels = ['Deposit', 'Withdraw', 'Transfer']
const measurements = []

for (const label of labels) {
  const button = page.locator('button.sparkle-button').filter({ hasText: label }).first()
  await button.waitFor({ state: 'visible' })
  measurements.push(await button.evaluate((element, buttonLabel) => {
    const rect = element.getBoundingClientRect()
    const content = element.querySelector('.sparkle-button__content')
    const labelNode = [...element.querySelectorAll('span')].find((node) => node.textContent?.trim() === buttonLabel && node.children.length === 0)
    const icon = content?.querySelector(':scope > span > svg')
    if (!(content instanceof HTMLElement) || !(labelNode instanceof HTMLElement) || !(icon instanceof SVGGraphicsElement)) {
      throw new Error(`Missing SparkleButton anatomy for ${buttonLabel}`)
    }

    const contentRect = content.getBoundingClientRect()
    const labelRect = labelNode.getBoundingClientRect()
    const style = getComputedStyle(labelNode)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas context unavailable')
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
    const metrics = ctx.measureText(buttonLabel)
    const lineCenter = labelRect.top + labelRect.height / 2
    const fontBoxHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    const baseline = labelRect.top + (labelRect.height - fontBoxHeight) / 2 + metrics.fontBoundingBoxAscent
    const glyphTop = baseline - metrics.actualBoundingBoxAscent
    const glyphBottom = baseline + metrics.actualBoundingBoxDescent
    const glyphCenter = (glyphTop + glyphBottom) / 2

    const iconRect = icon.getBoundingClientRect()
    const iconBox = icon.getBBox()
    const iconPaintTop = iconRect.top + (iconBox.y / icon.viewBox.baseVal.height) * iconRect.height
    const iconPaintBottom = iconRect.top + ((iconBox.y + iconBox.height) / icon.viewBox.baseVal.height) * iconRect.height
    const iconPaintCenter = (iconPaintTop + iconPaintBottom) / 2
    const unionTop = Math.min(glyphTop, iconPaintTop)
    const unionBottom = Math.max(glyphBottom, iconPaintBottom)
    const unionCenter = (unionTop + unionBottom) / 2
    const buttonCenter = rect.top + rect.height / 2

    return {
      label: buttonLabel,
      button: { top: rect.top, height: rect.height, center: buttonCenter },
      content: { top: contentRect.top, height: contentRect.height, center: contentRect.top + contentRect.height / 2 },
      labelBox: { top: labelRect.top, height: labelRect.height, center: lineCenter },
      glyph: {
        ascent: metrics.actualBoundingBoxAscent,
        descent: metrics.actualBoundingBoxDescent,
        fontAscent: metrics.fontBoundingBoxAscent,
        fontDescent: metrics.fontBoundingBoxDescent,
        baseline,
        top: glyphTop,
        bottom: glyphBottom,
        center: glyphCenter,
        delta: glyphCenter - buttonCenter,
      },
      iconPaint: { top: iconPaintTop, bottom: iconPaintBottom, center: iconPaintCenter, delta: iconPaintCenter - buttonCenter },
      contentUnion: { top: unionTop, bottom: unionBottom, center: unionCenter, delta: unionCenter - buttonCenter },
      computed: {
        paddingTop: getComputedStyle(content).paddingTop,
        lineHeight: style.lineHeight,
        fontSize: style.fontSize,
      },
    }
  }, label))
}

if (outputPath) {
  await page.locator('.sparkle-button').first().locator('xpath=..').screenshot({ path: outputPath })
}

const result = {
  status: measurements.every((item) => (
    Math.abs(item.glyph.delta) <= 1
    && Math.abs(item.iconPaint.delta) <= 1
    && Math.abs(item.contentUnion.delta) <= 1
  )) && runtimeErrors.length === 0 ? 'PASS' : 'FAIL',
  baseUrl,
  route,
  theme,
  measurements,
  runtimeErrors,
}

console.log(JSON.stringify(result, null, 2))
await browser.close()
process.exitCode = result.status === 'PASS' ? 0 : 2
