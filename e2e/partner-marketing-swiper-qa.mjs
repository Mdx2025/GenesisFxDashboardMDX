import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const targetUrl = `${baseUrl.replace(/\/$/, '')}/partner`
const screenshotPath = process.env.SCREENSHOT_PATH || '/home/clawd/genesis-partner-marketing-swiper.png'
const expectedTitles = [
  'Real Time Statistics',
  'Ready-Made Creatives',
  'Landing Page Templates',
  'Referral Link Manager',
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

const round = value => Math.round(value * 100) / 100

async function gotoPartner() {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' })
  await page.locator('[data-partner-marketing-carousel]').waitFor({ state: 'visible' })
}

async function activeTitle() {
  return page.locator('.swiper-slide-active [data-partner-marketing-slide] h3').textContent()
}

async function waitForActiveTitle(title) {
  await page.waitForFunction(expected => (
    document.querySelector('.swiper-slide-active [data-partner-marketing-slide] h3')?.textContent?.trim() === expected
  ), title, { timeout: 5_000 })
}

async function inspectViewport(width, height, theme = 'dark') {
  await page.setViewportSize({ width, height })
  await page.evaluate(selectedTheme => { document.documentElement.dataset.theme = selectedTheme }, theme)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))

  return page.evaluate(({ width, height, theme }) => {
    const round = value => Math.round(value * 100) / 100
    const parseColor = value => {
      const match = value.match(/rgba?\(([^)]+)\)/)
      if (!match) return null
      const parts = match[1].split(/[ ,/]+/).map(Number)
      return { r: parts[0], g: parts[1], b: parts[2], a: Number.isFinite(parts[3]) ? parts[3] : 1 }
    }
    const channel = value => {
      const normalized = value / 255
      return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
    }
    const luminance = color => 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b)
    const ratio = (first, second) => {
      const lighter = Math.max(luminance(first), luminance(second))
      const darker = Math.min(luminance(first), luminance(second))
      return (lighter + 0.05) / (darker + 0.05)
    }
    const box = element => {
      const rect = element.getBoundingClientRect()
      return {
        x: round(rect.x), y: round(rect.y), width: round(rect.width), height: round(rect.height),
        right: round(rect.right), bottom: round(rect.bottom),
      }
    }
    const textMetric = (element, background) => {
      const style = getComputedStyle(element)
      const foreground = parseColor(style.color)
      return {
        text: element.textContent?.trim(),
        fontSize: parseFloat(style.fontSize),
        lineHeight: parseFloat(style.lineHeight),
        contrast: foreground ? round(ratio(foreground, background)) : 0,
        box: box(element),
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
      }
    }

    const card = document.querySelector('[data-partner-marketing-carousel]')
    const activeSlide = document.querySelector('.swiper-slide-active [data-partner-marketing-slide]')
    const title = activeSlide.querySelector('h3')
    const description = activeSlide.querySelector('[data-partner-marketing-description]')
    const cta = activeSlide.querySelector('a')
    const dots = [...document.querySelectorAll('[data-partner-marketing-dot]')]
    const visibleText = [...card.querySelectorAll('h3, p, a, span')].filter(element => {
      const style = getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0
    })
    const background = theme === 'light' ? { r: 255, g: 255, b: 255 } : { r: 12, g: 19, b: 17 }

    return {
      viewport: { width, height },
      theme,
      overflowX: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      card: box(card),
      cardScroll: { width: card.scrollWidth, clientWidth: card.clientWidth, height: card.scrollHeight, clientHeight: card.clientHeight },
      slideCount: document.querySelectorAll('[data-partner-marketing-slide]').length,
      activeIndex: dots.findIndex(dot => dot.getAttribute('aria-current') === 'true'),
      title: textMetric(title, background),
      description: textMetric(description, background),
      cta: textMetric(cta, background),
      dotTargets: dots.map(dot => ({ ...box(dot), name: dot.getAttribute('aria-label'), current: dot.getAttribute('aria-current') })),
      tinyText: visibleText.map(element => ({ text: element.textContent?.trim(), size: parseFloat(getComputedStyle(element).fontSize) })).filter(item => item.size < 12),
      hiddenFocusableLinks: [...document.querySelectorAll('[data-partner-marketing-slide][aria-hidden="true"] a')].filter(link => link.tabIndex >= 0).length,
      cardBackground: getComputedStyle(card).backgroundImage,
    }
  }, { width, height, theme })
}

try {
  await page.setViewportSize({ width: 360, height: 800 })
  await gotoPartner()

  const results = []
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 600, height: 960 },
    { width: 768, height: 900 },
    { width: 1440, height: 960 },
  ]) {
    results.push(await inspectViewport(viewport.width, viewport.height, 'dark'))
  }
  results.push(await inspectViewport(390, 844, 'light'))
  results.push(await inspectViewport(1440, 960, 'light'))

  await page.setViewportSize({ width: 390, height: 844 })
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark' })

  await page.locator('[data-partner-marketing-dot]').nth(1).click()
  await waitForActiveTitle(expectedTitles[1])
  const afterDotClick = await activeTitle()

  const secondDot = page.locator('[data-partner-marketing-dot]').nth(1)
  await secondDot.focus()
  await secondDot.press('ArrowRight')
  await waitForActiveTitle(expectedTitles[2])
  const afterKeyboard = {
    title: await activeTitle(),
    focusedDot: await page.locator('[data-partner-marketing-dot]:focus').getAttribute('aria-label'),
  }

  const cardBox = await page.locator('[data-partner-marketing-carousel]').boundingBox()
  if (!cardBox) throw new Error('Marketing carousel has no bounding box')
  await page.mouse.move(cardBox.x + cardBox.width * 0.78, cardBox.y + cardBox.height * 0.5)
  await page.mouse.down()
  await page.mouse.move(cardBox.x + cardBox.width * 0.18, cardBox.y + cardBox.height * 0.5, { steps: 12 })
  await page.mouse.up()
  await waitForActiveTitle(expectedTitles[3])
  const afterDrag = await activeTitle()

  const activeCta = page.locator('.swiper-slide-active [data-partner-marketing-slide] a')
  await activeCta.focus()
  const ctaFocus = await activeCta.evaluate(element => ({
    focused: document.activeElement === element,
    outlineColor: getComputedStyle(element).outlineColor,
    outlineStyle: getComputedStyle(element).outlineStyle,
    outlineWidth: getComputedStyle(element).outlineWidth,
  }))
  await activeCta.click()
  await page.waitForURL('**/partner/marketing')
  const ctaDestination = new URL(page.url()).pathname

  await gotoPartner()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('[data-partner-marketing-dot]').nth(1).click()
  await waitForActiveTitle(expectedTitles[1])
  const reducedMotion = await page.locator('.partner-marketing-swiper .swiper-wrapper').evaluate(element => ({
    transitionDuration: getComputedStyle(element).transitionDuration,
    activeTitle: document.querySelector('.swiper-slide-active [data-partner-marketing-slide] h3')?.textContent?.trim(),
  }))

  await page.setViewportSize({ width: 720, height: 900 })
  await page.evaluate(() => { document.body.style.zoom = '2' })
  const zoom = await page.locator('[data-partner-marketing-carousel]').evaluate(card => ({
    overflowX: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
    card: { width: card.clientWidth, height: card.clientHeight, scrollWidth: card.scrollWidth, scrollHeight: card.scrollHeight },
    description: (() => {
      const element = card.querySelector('.swiper-slide-active [data-partner-marketing-description]')
      return { scrollWidth: element.scrollWidth, clientWidth: element.clientWidth, scrollHeight: element.scrollHeight, clientHeight: element.clientHeight }
    })(),
  }))
  await page.evaluate(() => { document.body.style.zoom = '' })

  await page.addScriptTag({ path: '/home/clawd/.openclaw/workspace/scripts/node_modules/axe-core/axe.min.js' })
  const axe = await page.evaluate(async () => {
    const result = await window.axe.run(document.querySelector('[data-partner-marketing-carousel]'))
    return {
      violationCount: result.violations.length,
      violations: result.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
      })),
    }
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('[data-partner-marketing-carousel]').scrollIntoViewIfNeeded()
  await page.screenshot({ path: screenshotPath, fullPage: true })

  const failures = []
  for (const result of results) {
    const label = `${result.theme} ${result.viewport.width}px`
    if (result.slideCount !== 4) failures.push(`${label}: expected 4 slides, got ${result.slideCount}`)
    if (result.activeIndex !== 0) failures.push(`${label}: initial active index ${result.activeIndex}`)
    if (result.overflowX > 0) failures.push(`${label}: document overflow ${result.overflowX}px`)
    if (result.card.height !== 242) failures.push(`${label}: card height ${result.card.height}px`)
    if (result.card.right > result.viewport.width + 1 || result.card.x < -1) failures.push(`${label}: card leaves viewport`)
    if (result.description.scrollWidth > result.description.clientWidth + 1 || result.description.scrollHeight > result.description.clientHeight + 1) failures.push(`${label}: description clips`)
    if (result.title.fontSize < 14 || result.description.fontSize < 14 || result.cta.fontSize < 14) failures.push(`${label}: typography below 14px`)
    if (result.title.contrast < 4.5 || result.description.contrast < 4.5 || result.cta.contrast < 4.5) failures.push(`${label}: contrast ${result.title.contrast}/${result.description.contrast}/${result.cta.contrast}`)
    if (result.dotTargets.length !== 4 || result.dotTargets.some(dot => dot.width < 24 || dot.height < 24 || !dot.name)) failures.push(`${label}: invalid dot targets`)
    if (result.dotTargets.filter(dot => dot.current === 'true').length !== 1) failures.push(`${label}: pagination current state invalid`)
    if (result.tinyText.length) failures.push(`${label}: visible text below 12px ${JSON.stringify(result.tinyText)}`)
    if (result.hiddenFocusableLinks) failures.push(`${label}: hidden slide link is focusable`)
  }

  if (afterDotClick?.trim() !== expectedTitles[1]) failures.push(`dot click failed: ${afterDotClick}`)
  if (afterKeyboard.title?.trim() !== expectedTitles[2] || afterKeyboard.focusedDot !== `Show ${expectedTitles[2]}`) failures.push(`keyboard navigation failed: ${JSON.stringify(afterKeyboard)}`)
  if (afterDrag?.trim() !== expectedTitles[3]) failures.push(`drag failed: ${afterDrag}`)
  if (!ctaFocus.focused || ctaFocus.outlineStyle === 'none' || parseFloat(ctaFocus.outlineWidth) < 2) failures.push(`CTA focus ring missing: ${JSON.stringify(ctaFocus)}`)
  if (ctaDestination !== '/partner/marketing') failures.push(`CTA destination ${ctaDestination}`)
  if (reducedMotion.activeTitle !== expectedTitles[1] || parseFloat(reducedMotion.transitionDuration) > 0.001) failures.push(`reduced motion failed: ${JSON.stringify(reducedMotion)}`)
  if (zoom.overflowX > 0 || zoom.card.scrollHeight > zoom.card.height + 1 || zoom.description.scrollWidth > zoom.description.clientWidth + 1 || zoom.description.scrollHeight > zoom.description.clientHeight + 1) failures.push(`200% zoom reflow failed: ${JSON.stringify(zoom)}`)
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)
  if (axe.violationCount) failures.push(`axe violations: ${JSON.stringify(axe.violations)}`)

  console.log(JSON.stringify({
    targetUrl, screenshotPath, expectedTitles, results, afterDotClick, afterKeyboard,
    afterDrag, ctaFocus, ctaDestination, reducedMotion, zoom, axe,
    runtimeErrors, failedResponses, failures,
  }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
