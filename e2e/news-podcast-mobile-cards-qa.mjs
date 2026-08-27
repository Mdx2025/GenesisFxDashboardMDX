import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const targetUrl = `${baseUrl.replace(/\/$/, '')}/news/podcast`
const screenshotPath = process.env.SCREENSHOT_PATH || '/home/clawd/genesis-news-podcast-mobile-cards.png'
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

async function gotoPodcast() {
  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await page.locator('[data-podcast-episode-card]').first().waitFor({ state: 'visible' })
}

async function inspectViewport(width, height) {
  await page.setViewportSize({ width, height })
  await gotoPodcast()

  return page.evaluate(({ width, height }) => {
    const parseColor = value => {
      const match = value.match(/rgba?\(([^)]+)\)/)
      if (!match) return null
      const parts = match[1].split(/[ ,/]+/).map(Number)
      return { r: parts[0], g: parts[1], b: parts[2], a: Number.isFinite(parts[3]) ? parts[3] : 1 }
    }
    const composite = (front, back) => ({
      r: front.r * front.a + back.r * (1 - front.a),
      g: front.g * front.a + back.g * (1 - front.a),
      b: front.b * front.a + back.b * (1 - front.a),
      a: 1,
    })
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
    const effectiveBackground = element => {
      const layers = []
      let current = element.parentElement
      while (current) {
        const color = parseColor(getComputedStyle(current).backgroundColor)
        if (color && color.a > 0) layers.push(color)
        current = current.parentElement
      }
      return layers.reduceRight((back, front) => composite(front, back), { r: 0, g: 0, b: 0, a: 1 })
    }
    const textContrast = element => {
      const foreground = parseColor(getComputedStyle(element).color)
      return foreground ? ratio(composite(foreground, effectiveBackground(element)), effectiveBackground(element)) : 0
    }
    const box = element => {
      const rect = element.getBoundingClientRect()
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom }
    }

    const cards = [...document.querySelectorAll('[data-podcast-episode-card]')]
    const samples = cards.map(card => {
      const layout = [...card.querySelectorAll('[data-podcast-episode-layout]')].find(element => getComputedStyle(element).display !== 'none')
      const description = layout.querySelector('[data-podcast-episode-description]') || layout.querySelector('p')
      const date = layout.querySelector('time')
      const duration = [...layout.querySelectorAll('span')].find(element => element.textContent?.trim().endsWith('min'))
      const play = layout.querySelector('[data-podcast-play-button]')
      const cardBox = box(card)
      const descriptionBox = box(description)
      const playBox = box(play)
      return {
        card: Object.fromEntries(Object.entries(cardBox).map(([key, value]) => [key, Math.round(value * 100) / 100])),
        layout: layout.dataset.podcastEpisodeLayout,
        description: {
          ...Object.fromEntries(Object.entries(descriptionBox).map(([key, value]) => [key, Math.round(value * 100) / 100])),
          fontSize: parseFloat(getComputedStyle(description).fontSize),
          lineHeight: parseFloat(getComputedStyle(description).lineHeight),
          contrast: Math.round(textContrast(description) * 100) / 100,
          scrollWidth: description.scrollWidth,
          clientWidth: description.clientWidth,
          scrollHeight: description.scrollHeight,
          clientHeight: description.clientHeight,
        },
        date: {
          fontSize: parseFloat(getComputedStyle(date).fontSize),
          contrast: Math.round(textContrast(date) * 100) / 100,
        },
        duration: {
          fontSize: parseFloat(getComputedStyle(duration).fontSize),
          contrast: Math.round(textContrast(duration) * 100) / 100,
        },
        play: {
          ...Object.fromEntries(Object.entries(playBox).map(([key, value]) => [key, Math.round(value * 100) / 100])),
          rightInset: Math.round((cardBox.right - playBox.right) * 100) / 100,
          bottomInset: Math.round((cardBox.bottom - playBox.bottom) * 100) / 100,
          accessibleName: play.getAttribute('aria-label'),
        },
      }
    })

    const tinyText = [...document.querySelectorAll('[data-podcast-episode-card] *')]
      .filter(element => element.textContent?.trim() && element.children.length === 0 && getComputedStyle(element).display !== 'none')
      .map(element => ({ text: element.textContent.trim(), fontSize: parseFloat(getComputedStyle(element).fontSize) }))
      .filter(item => item.fontSize < 12)

    return {
      viewport: { width, height },
      overflowX: document.documentElement.scrollWidth - innerWidth,
      cardCount: cards.length,
      cardHeightDelta: Math.max(...samples.map(item => item.card.height)) - Math.min(...samples.map(item => item.card.height)),
      tinyText,
      samples,
    }
  }, { width, height })
}

try {
  const results = []
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 600, height: 960 },
    { width: 768, height: 900 },
    { width: 1440, height: 960 },
  ]) {
    results.push(await inspectViewport(viewport.width, viewport.height))
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await gotoPodcast()
  await page.locator('[data-podcast-episode-card]').first().scrollIntoViewIfNeeded()
  await page.screenshot({ path: screenshotPath, fullPage: true })

  const firstPlay = page.locator('[data-podcast-episode-layout="mobile"]:visible [data-podcast-play-button]').first()
  await firstPlay.focus()
  const focus = await firstPlay.evaluate(element => {
    const style = getComputedStyle(element)
    return { focused: document.activeElement === element, boxShadow: style.boxShadow }
  })

  await page.emulateMedia({ reducedMotion: 'reduce' })
  const reducedMotion = await firstPlay.evaluate(element => ({
    transitionDuration: getComputedStyle(element).transitionDuration,
    visible: element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().height > 0,
  }))

  const failures = []
  for (const result of results) {
    const mobile = result.viewport.width < 768
    if (result.cardCount !== 4) failures.push(`${result.viewport.width}px expected 4 episode cards, got ${result.cardCount}`)
    if (result.overflowX > 0) failures.push(`${result.viewport.width}px document overflow ${result.overflowX}px`)
    if (result.cardHeightDelta > 1) failures.push(`${result.viewport.width}px card heights differ by ${round(result.cardHeightDelta)}px`)
    if (result.tinyText.length) failures.push(`${result.viewport.width}px text below 12px: ${JSON.stringify(result.tinyText)}`)

    for (const [index, sample] of result.samples.entries()) {
      const label = `${result.viewport.width}px card ${index + 1}`
      if (sample.layout !== (mobile ? 'mobile' : 'desktop')) failures.push(`${label} wrong layout ${sample.layout}`)
      if (sample.description.scrollWidth > sample.description.clientWidth + 1 || sample.description.scrollHeight > sample.description.clientHeight + 1) failures.push(`${label} description clips`)
      if (sample.description.bottom > sample.card.bottom + 1) failures.push(`${label} description leaves the card`)
      if (sample.description.fontSize < 14 || sample.date.fontSize < 14 || sample.duration.fontSize < 14) failures.push(`${label} typography below 14px`)
      if (sample.description.contrast < 4.5 || sample.date.contrast < 4.5 || sample.duration.contrast < 4.5) failures.push(`${label} text contrast fails: ${sample.description.contrast}/${sample.date.contrast}/${sample.duration.contrast}`)
      if (sample.play.width < 44 || sample.play.height < 44) failures.push(`${label} play target below 44px`)
      if (!sample.play.accessibleName?.includes(String(index + 1))) failures.push(`${label} play name is not specific`)
      if (mobile) {
        const expectedDescriptionWidth = sample.card.width - (result.viewport.width < 640 ? 42 : 50)
        if (Math.abs(sample.description.width - expectedDescriptionWidth) > 1) failures.push(`${label} description does not use full inner width`)
        if (sample.play.rightInset < 19) failures.push(`${label} play right inset is cramped`)
      }
      if (sample.card.right > result.viewport.width + 1 || sample.card.x < -1) failures.push(`${label} leaves viewport`)
    }
  }

  if (!focus.focused || focus.boxShadow === 'none') failures.push(`focus ring missing: ${JSON.stringify(focus)}`)
  if (!reducedMotion.visible) failures.push('play control hidden in reduced motion')
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  console.log(JSON.stringify({ targetUrl, screenshotPath, results, focus, reducedMotion, runtimeErrors, failedResponses, failures }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
