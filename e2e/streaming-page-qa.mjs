import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const browser = await connectQaBrowser({ url: `${baseUrl}/home` })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()
const runtimeErrors = []
const failedResponses = []
page.on('pageerror', error => runtimeErrors.push(error.message))
page.on('response', response => { if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() }) })

async function setTheme(theme) {
  await page.evaluate(value => localStorage.setItem('genesis-fx-theme', value), theme)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
}

await page.setViewportSize({ width: 1920, height: 1027 })
await page.goto(`${baseUrl}/home`, { waitUntil: 'networkidle' })
await setTheme('dark')
await page.getByRole('button', { name: 'Streaming', exact: true }).click()
await page.getByRole('dialog', { name: 'Claim your username' }).getByRole('button', { name: 'Continue' }).click()
await page.waitForURL(/\/streaming$/)
await page.getByRole('heading', { name: 'Streaming', exact: true }).waitFor()

async function inspect(index, name) {
  console.log(`[streaming-qa] state=${name} url=${page.url()} tabs=${await page.locator('[data-streaming-tabs] button').count()}`)
  await page.locator('[data-streaming-tabs] button').nth(index).evaluate(element => element.click())
  await page.waitForTimeout(200)
  const active = await page.locator('[data-streaming-tabs] button').nth(index).getAttribute('aria-pressed')
  const cards = await page.locator('[data-stream-card]').count()
  const categories = await page.locator('[data-stream-category]').count()
  const featuredLocator = page.locator('[data-featured-stream]')
  const chatLocator = page.locator('[data-stream-chat]')
  const featured = await featuredLocator.count() ? await featuredLocator.boundingBox() : null
  const chat = await chatLocator.count() ? await chatLocator.boundingBox() : null
  const output = process.env[`STREAMING_${name.toUpperCase()}_OUTPUT_PATH`]
  if (output) await page.screenshot({ path: output, animations: 'disabled' })
  return { name, active, cards, categories, featured, chat }
}

const states = []
states.push(await inspect(0, 'home'))

const homeRefinement = await page.evaluate(() => {
  const rect = selector => {
    const element = document.querySelector(selector)
    if (!element) return null
    const box = element.getBoundingClientRect()
    return { x: box.x, y: box.y, width: box.width, height: box.height }
  }
  const liveChat = document.querySelector('[data-live-chat-panel]')
  const carousel = document.querySelector('[data-category-carousel]')
  const streamCard = document.querySelector('[data-stream-card]')
  const myStreams = document.querySelector('[data-streaming-my-streams]')
  const startStreaming = document.querySelector('.streaming-start-button')
  const startIcon = startStreaming?.querySelector('.glow-btn__icon svg')
  const startLabel = startStreaming?.querySelector('.glow-btn__label')
  const featuredStream = document.querySelector('[data-featured-stream]')
  const featuredOverlay = document.querySelector('[data-featured-stream-overlay]')
  const visibleTextBelowTwelve = [...document.querySelectorAll('[data-streaming-home] *')].filter(element => {
    const style = getComputedStyle(element)
    const box = element.getBoundingClientRect()
    return box.width > 0 && box.height > 0 && element.childNodes.length === 1 && element.firstChild?.nodeType === Node.TEXT_NODE && parseFloat(style.fontSize) < 12
  }).length
  return {
    chatGlassCards: document.querySelectorAll('[data-stream-chat] .glass-card').length,
    liveChat: rect('[data-live-chat-panel]'),
    liveChatStyle: liveChat ? { background: getComputedStyle(liveChat).backgroundColor, radius: getComputedStyle(liveChat).borderRadius } : null,
    composer: rect('[data-live-chat-panel] form'),
    sendButton: rect('[data-live-chat-panel] button[aria-label="Send message"]'),
    prizeGlassBanners: document.querySelectorAll('[data-prize-banner] .glass-banner-card').length,
    swiperSlides: document.querySelectorAll('[data-category-carousel] .swiper-slide').length,
    carousel: carousel ? { overflowX: getComputedStyle(carousel).overflowX, allowTouchMove: Boolean(carousel.swiper?.allowTouchMove) } : null,
    streamCard: rect('[data-stream-card]'),
    streamMedia: rect('[data-stream-card-media]'),
    visibleTextBelowTwelve,
    liveLabel: streamCard?.querySelector('[data-stream-card-media] span')?.textContent?.trim(),
    featuredSurface: {
      usesLightGlassCard: Boolean(featuredStream?.classList.contains('glass-card')),
      overlay: rect('[data-featured-stream-overlay]'),
      overlayRadius: featuredOverlay ? getComputedStyle(featuredOverlay).borderRadius : null,
      overlayBorderWidth: featuredOverlay ? getComputedStyle(featuredOverlay).borderTopWidth : null,
      overlayBackground: featuredOverlay ? getComputedStyle(featuredOverlay).backgroundColor : null,
      overlayBackdropFilter: featuredOverlay ? getComputedStyle(featuredOverlay).backdropFilter : null,
    },
    headerActions: {
      myStreams: rect('[data-streaming-my-streams]'),
      startStreaming: rect('.streaming-start-button'),
      startIcon: rect('.streaming-start-button .glow-btn__icon svg'),
      usesSparkle: Boolean(myStreams?.classList.contains('sparkle-button')),
      usesGlow: Boolean(startStreaming?.classList.contains('glow-btn')),
      iconBeforeLabel: Boolean(startIcon && startLabel && startIcon.getBoundingClientRect().x < startLabel.getBoundingClientRect().x),
    },
  }
})

const carouselTransformBefore = await page.locator('[data-category-carousel] .swiper-wrapper').evaluate(element => getComputedStyle(element).transform)
await page.locator('[data-category-carousel]').scrollIntoViewIfNeeded()
const carouselBox = await page.locator('[data-category-carousel]').boundingBox()
if (carouselBox) {
  await page.mouse.move(carouselBox.x + carouselBox.width * 0.8, carouselBox.y + carouselBox.height / 2)
  await page.mouse.down()
  await page.mouse.move(carouselBox.x + carouselBox.width * 0.2, carouselBox.y + carouselBox.height / 2, { steps: 10 })
  await page.mouse.up()
  await page.waitForTimeout(450)
}
const carouselTransformAfterDrag = await page.locator('[data-category-carousel] .swiper-wrapper').evaluate(element => getComputedStyle(element).transform)
await page.getByRole('button', { name: 'Previous live categories' }).click()
await page.waitForTimeout(450)
await page.getByRole('button', { name: 'Next live categories' }).focus()
await page.keyboard.press('Enter')
await page.waitForTimeout(450)
const carouselTransformAfter = await page.locator('[data-category-carousel] .swiper-wrapper').evaluate(element => getComputedStyle(element).transform)
if (process.env.STREAMING_REFINEMENT_OUTPUT_PATH) {
  await page.getByRole('button', { name: 'Previous live categories' }).click()
  await page.waitForTimeout(450)
  await page.locator('[data-category-carousel]').evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 120, behavior: 'instant' }))
  await page.screenshot({ path: process.env.STREAMING_REFINEMENT_OUTPUT_PATH, animations: 'disabled' })
}

states.push(await inspect(1, 'browse'))
states.push(await inspect(2, 'replays'))
const replayGrid = await page.locator('[data-replay-grid]').evaluate(element => {
  const style = getComputedStyle(element)
  return {
    columnCount: style.gridTemplateColumns.split(' ').filter(Boolean).length,
    itemCount: element.querySelectorAll('[data-stream-card]').length,
    gridTemplateColumns: style.gridTemplateColumns,
  }
})
states.push(await inspect(3, 'following'))
await page.locator('[data-stream-card] button[aria-pressed="true"]').click()
const emptyVisible = await page.locator('[data-streaming-empty]').isVisible()
const emptyOutput = process.env.STREAMING_FOLLOWING_EMPTY_OUTPUT_PATH
if (emptyOutput) await page.screenshot({ path: emptyOutput, animations: 'disabled' })
await page.getByRole('button', { name: 'Browse channels' }).click()
const browseAfterEmpty = await page.locator('[data-streaming-page]').getAttribute('data-streaming-state')

await setTheme('light')
const lightFeaturedSurface = await page.locator('[data-featured-stream-overlay]').evaluate(element => {
  const title = getComputedStyle(element.querySelector('h2'))
  const metadata = getComputedStyle(element.querySelector('p'))
  return { title: title.color, metadata: metadata.color }
})
if (process.env.STREAMING_FEATURED_LIGHT_OUTPUT_PATH) await page.screenshot({ path: process.env.STREAMING_FEATURED_LIGHT_OUTPUT_PATH, animations: 'disabled' })
await page.locator('[data-streaming-tabs] button').nth(1).evaluate(element => element.click())
const browseHero = await page.locator('[data-browse-hero]').evaluate(element => {
  const shell = element.querySelector('.glass-banner-card')
  const box = shell?.getBoundingClientRect()
  return {
    usesGlassBannerCard: Boolean(shell),
    shellCount: element.querySelectorAll('.glass-banner-card').length,
    glowImageCount: element.querySelectorAll('.glass-banner-card__glow-image').length,
    rightTextureCount: element.querySelectorAll('img[src="/images/streaming-browse-texture.png"]').length,
    height: box?.height ?? null,
    radius: shell ? getComputedStyle(shell).borderRadius : null,
  }
})
const lightSurface = await page.locator('[data-browse-hero] .glass-banner-card').evaluate(element => {
  const style = getComputedStyle(element)
  const heading = getComputedStyle(document.querySelector('h1'))
  return { background: style.backgroundColor, border: style.borderColor, heading: heading.color }
})
if (process.env.STREAMING_LIGHT_OUTPUT_PATH) await page.screenshot({ path: process.env.STREAMING_LIGHT_OUTPUT_PATH, animations: 'disabled' })

await page.setViewportSize({ width: 960, height: 900 })
await page.goto(`${baseUrl}/streaming`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const zoomEquivalentOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)

await page.setViewportSize({ width: 390, height: 844 })
await page.goto(`${baseUrl}/streaming`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
const mobileTabsVisible = await page.locator('[data-streaming-tabs]').isVisible()
await page.emulateMedia({ reducedMotion: 'reduce' })
const reducedMotionContentVisible = await page.locator('[data-stream-chat], [data-category-carousel], [data-prize-banner], [data-stream-card]').evaluateAll(elements => elements.length === 4 && elements.every(element => {
  const box = element.getBoundingClientRect()
  return box.width > 0 && box.height > 0
}))
const sendButtonFocused = await page.locator('[data-live-chat-panel] button[aria-label="Send message"]').evaluate(element => {
  element.focus()
  return document.activeElement === element && getComputedStyle(element).boxShadow !== 'none'
})

const home = states[0]
const failures = []
if (!states.every(state => state.active === 'true')) failures.push(`tab state mismatch: ${JSON.stringify(states)}`)
if (home.categories !== 6 || home.cards !== 1) failures.push(`home content mismatch: ${JSON.stringify(home)}`)
if (!home.featured || Math.abs(home.featured.height - 561) > 1 || !home.chat || Math.abs(home.chat.height - 561) > 1) failures.push(`home geometry mismatch: ${JSON.stringify(home)}`)
if (homeRefinement.chatGlassCards !== 1 || homeRefinement.prizeGlassBanners !== 1) failures.push(`component primitive mismatch: ${JSON.stringify(homeRefinement)}`)
if (!homeRefinement.featuredSurface.usesLightGlassCard || homeRefinement.featuredSurface.overlayRadius !== '9999px' || homeRefinement.featuredSurface.overlayBorderWidth !== '0px' || homeRefinement.featuredSurface.overlayBackground !== 'rgba(12, 19, 17, 0.24)' || !homeRefinement.featuredSurface.overlayBackdropFilter.includes('blur(32px)') || !homeRefinement.featuredSurface.overlayBackdropFilter.includes('saturate(1.35)') || Math.abs(homeRefinement.featuredSurface.overlay?.height - 111) > 1) failures.push(`featured stream glass mismatch: ${JSON.stringify(homeRefinement.featuredSurface)}`)
if (!homeRefinement.headerActions.usesSparkle || !homeRefinement.headerActions.usesGlow || !homeRefinement.headerActions.iconBeforeLabel || Math.abs(homeRefinement.headerActions.myStreams?.width - 171) > 1 || Math.abs(homeRefinement.headerActions.myStreams?.height - 46) > 1 || Math.abs(homeRefinement.headerActions.startStreaming?.width - 197) > 1 || Math.abs(homeRefinement.headerActions.startStreaming?.height - 44) > 1 || Math.abs(homeRefinement.headerActions.startIcon?.width - 18) > 1 || Math.abs(homeRefinement.headerActions.startIcon?.height - 18) > 1) failures.push(`header action mismatch: ${JSON.stringify(homeRefinement.headerActions)}`)
if (!homeRefinement.liveChat || Math.abs(homeRefinement.liveChat.width - 493) > 1 || Math.abs(homeRefinement.liveChat.height - 448) > 1 || homeRefinement.liveChatStyle?.radius !== '30px' || homeRefinement.liveChatStyle?.background !== 'rgb(12, 19, 17)') failures.push(`live chat geometry mismatch: ${JSON.stringify(homeRefinement)}`)
if (!homeRefinement.composer || Math.abs(homeRefinement.composer.height - 70) > 1 || !homeRefinement.sendButton || Math.abs(homeRefinement.sendButton.width - 62) > 1 || Math.abs(homeRefinement.sendButton.height - 44) > 1) failures.push(`chat composer mismatch: ${JSON.stringify(homeRefinement)}`)
if (homeRefinement.swiperSlides !== 6 || homeRefinement.carousel?.overflowX !== 'hidden' || !homeRefinement.carousel?.allowTouchMove || carouselTransformBefore === carouselTransformAfterDrag || carouselTransformBefore === carouselTransformAfter) failures.push(`category carousel mismatch: ${JSON.stringify({ homeRefinement, carouselTransformBefore, carouselTransformAfterDrag, carouselTransformAfter })}`)
if (!homeRefinement.streamCard || Math.abs(homeRefinement.streamCard.width - 381) > 1 || Math.abs(homeRefinement.streamCard.height - 319) > 1 || !homeRefinement.streamMedia || Math.abs(homeRefinement.streamMedia.height - 220) > 1 || homeRefinement.liveLabel !== 'Live') failures.push(`stream card mismatch: ${JSON.stringify(homeRefinement)}`)
if (homeRefinement.visibleTextBelowTwelve) failures.push(`typography floor mismatch: ${homeRefinement.visibleTextBelowTwelve} visible nodes below 12px`)
if (states[1].cards !== 2 || states[2].cards !== 3 || states[3].cards !== 1) failures.push(`stream card counts mismatch: ${JSON.stringify(states)}`)
if (replayGrid.columnCount !== 4 || replayGrid.itemCount !== 3) failures.push(`replay grid mismatch: ${JSON.stringify(replayGrid)}`)
if (!emptyVisible || browseAfterEmpty !== 'browse') failures.push('following empty-state flow mismatch')
if (!browseHero.usesGlassBannerCard || browseHero.shellCount !== 1 || browseHero.glowImageCount !== 0 || browseHero.rightTextureCount !== 0 || Math.abs(browseHero.height - 208) > 1 || browseHero.radius !== '18.563px') failures.push(`browse hero component mismatch: ${JSON.stringify(browseHero)}`)
if (lightSurface.background !== 'rgba(255, 255, 255, 0.68)' || lightSurface.border !== 'rgba(6, 75, 52, 0.1)' || lightSurface.heading !== 'rgb(0, 0, 0)') failures.push(`light theme mismatch: ${JSON.stringify(lightSurface)}`)
if (lightFeaturedSurface.title !== 'rgb(255, 255, 255)' || lightFeaturedSurface.metadata !== 'rgb(160, 160, 160)') failures.push(`featured light-theme contrast mismatch: ${JSON.stringify(lightFeaturedSurface)}`)
if (mobileOverflow || !mobileTabsVisible) failures.push(`mobile mismatch: ${JSON.stringify({ mobileOverflow, mobileTabsVisible })}`)
if (zoomEquivalentOverflow) failures.push('960px intermediate / 200%-zoom-equivalent horizontal overflow')
if (!reducedMotionContentVisible || !sendButtonFocused) failures.push(`accessibility interaction mismatch: ${JSON.stringify({ reducedMotionContentVisible, sendButtonFocused })}`)
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

console.log(JSON.stringify({ status: failures.length ? 'FAIL' : 'PASS', baseUrl, states, replayGrid, homeRefinement, carouselTransformBefore, carouselTransformAfterDrag, carouselTransformAfter, emptyVisible, browseAfterEmpty, browseHero, lightFeaturedSurface, lightSurface, zoomEquivalentOverflow, mobileOverflow, mobileTabsVisible, reducedMotionContentVisible, sendButtonFocused, runtimeErrors, failedResponses, failures }, null, 2))
await browser.close()
if (failures.length) process.exit(1)
