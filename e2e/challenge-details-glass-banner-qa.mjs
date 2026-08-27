import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const targetUrl = `${baseUrl.replace(/\/$/, '')}/challenges/details-single-page`
const screenshotPath = process.env.SCREENSHOT_PATH || '/home/clawd/genesis-challenge-details-glass-banner.png'
const axeSource = readFileSync('/home/clawd/.openclaw/workspace/scripts/node_modules/axe-core/axe.min.js', 'utf8')

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

async function gotoRoute() {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' })
  await page.locator('[data-challenge-drawdown-banner]').waitFor({ state: 'visible' })
}

async function inspect(width, height, theme) {
  await page.setViewportSize({ width, height })
  await page.evaluate(selectedTheme => { document.documentElement.dataset.theme = selectedTheme }, theme)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))

  return page.evaluate(({ width, height, theme }) => {
    const round = value => Math.round(value * 100) / 100
    const box = element => {
      const rect = element.getBoundingClientRect()
      return { x: round(rect.x), y: round(rect.y), width: round(rect.width), height: round(rect.height), right: round(rect.right), bottom: round(rect.bottom) }
    }
    const parseColor = value => {
      const parts = value.match(/[\d.]+/g)?.map(Number)
      return parts?.length >= 3 ? { r: parts[0], g: parts[1], b: parts[2] } : null
    }
    const channel = value => {
      const normalized = value / 255
      return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
    }
    const luminance = color => 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b)
    const contrast = (foreground, background) => {
      const light = Math.max(luminance(foreground), luminance(background))
      const dark = Math.min(luminance(foreground), luminance(background))
      return round((light + 0.05) / (dark + 0.05))
    }
    const metric = (element, background) => {
      const style = getComputedStyle(element)
      const foreground = parseColor(style.color)
      return {
        text: element.textContent?.trim(),
        fontSize: parseFloat(style.fontSize),
        contrast: foreground ? contrast(foreground, background) : 0,
        box: box(element),
        clipped: element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1,
      }
    }

    const card = document.querySelector('[data-challenge-drawdown-banner]')
    const progress = card.querySelector('[data-challenge-drawdown-progress]')
    const text = [...card.querySelectorAll('p, span')]
    const firstLabel = text.find(element => element.textContent?.trim() === 'Drawdown to breach floor')
    const secondLabel = text.find(element => element.textContent?.trim() === 'Buffer remaining')
    const amount = text.find(element => element.tagName === 'P' && element.textContent?.includes('$125.00'))
    const buffer = text.find(element => element.tagName === 'P' && element.textContent?.trim() === '100%')
    const cardRect = card.getBoundingClientRect()
    const progressTrack = progress.parentElement.getBoundingClientRect()
    const progressRect = progress.getBoundingClientRect()
    const background = theme === 'light' ? { r: 255, g: 255, b: 255 } : { r: 12, g: 19, b: 17 }
    const pseudo = getComputedStyle(card, '::before')
    const glowImage = card.querySelector('.glass-banner-card__glow-image')
    const visibleText = text.filter(element => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none'
    })

    return {
      viewport: { width, height },
      theme,
      documentOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      card: box(card),
      className: card.className,
      canonicalCount: document.querySelectorAll('[data-challenge-drawdown-banner].glass-banner-card').length,
      pseudoBorder: {
        content: pseudo.content,
        backgroundImage: pseudo.backgroundImage,
        maskComposite: pseudo.maskComposite,
      },
      glowImage: glowImage ? { present: true, display: getComputedStyle(glowImage).display } : { present: false },
      metrics: {
        firstLabel: metric(firstLabel, background),
        secondLabel: metric(secondLabel, background),
        amount: metric(amount, background),
        buffer: metric(buffer, background),
      },
      progressPercent: round((progressRect.width / progressTrack.width) * 100),
      contained: [...card.querySelectorAll('p, span, [data-challenge-drawdown-progress]')].every(element => {
        const rect = element.getBoundingClientRect()
        return rect.left >= cardRect.left - 1 && rect.right <= cardRect.right + 1 && rect.top >= cardRect.top - 1 && rect.bottom <= cardRect.bottom + 1
      }),
      tinyText: visibleText.map(element => ({ text: element.textContent?.trim(), fontSize: parseFloat(getComputedStyle(element).fontSize) })).filter(item => item.fontSize < 12),
    }
  }, { width, height, theme })
}

try {
  await gotoRoute()

  const results = []
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 900 },
    { width: 1440, height: 960 },
  ]) {
    results.push(await inspect(viewport.width, viewport.height, 'dark'))
  }
  results.push(await inspect(390, 844, 'light'))
  results.push(await inspect(1440, 960, 'light'))

  await page.setViewportSize({ width: 390, height: 844 })
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark' })
  await page.addScriptTag({ content: axeSource })
  const axe = await page.evaluate(async () => {
    const result = await window.axe.run(document.querySelector('[data-challenge-drawdown-banner]'))
    return result.violations.map(violation => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length }))
  })

  await page.locator('[data-challenge-drawdown-banner]').screenshot({ path: screenshotPath })

  const failures = []
  for (const result of results) {
    const label = `${result.theme} ${result.viewport.width}px`
    if (result.canonicalCount !== 1 || !result.className.includes('glass-card-heavy')) failures.push(`${label}: canonical GlassBannerCard classes missing`)
    if (result.pseudoBorder.content === 'none' || !result.pseudoBorder.backgroundImage.includes('linear-gradient')) failures.push(`${label}: canonical gradient border missing`)
    if (!result.glowImage.present) failures.push(`${label}: canonical glow image missing`)
    if (result.theme === 'dark' && result.glowImage.display === 'none') failures.push(`${label}: dark glow image hidden`)
    if (result.theme === 'light' && result.glowImage.display !== 'none') failures.push(`${label}: light glow image should be hidden`)
    if (result.documentOverflow > 0) failures.push(`${label}: document overflow ${result.documentOverflow}px`)
    if (result.card.x < -1 || result.card.right > result.viewport.width + 1) failures.push(`${label}: card outside viewport`)
    if (!result.contained) failures.push(`${label}: banner content leaves card`)
    if (result.tinyText.length) failures.push(`${label}: text below 12px ${JSON.stringify(result.tinyText)}`)
    if (Object.values(result.metrics).some(item => item.clipped)) failures.push(`${label}: clipped metric text`)
    if (Object.values(result.metrics).some(item => item.contrast < 4.5)) failures.push(`${label}: metric contrast failure ${JSON.stringify(result.metrics)}`)
    if (Math.abs(result.progressPercent - 20) > 0.5) failures.push(`${label}: progress width ${result.progressPercent}%`)
  }
  if (axe.length) failures.push(`axe violations: ${JSON.stringify(axe)}`)
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  const report = { targetUrl, screenshotPath, results, axe, runtimeErrors, failedResponses, failures }
  console.log(JSON.stringify(report, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
