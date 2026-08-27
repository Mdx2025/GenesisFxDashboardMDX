import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
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
const rect = box => box ? { x: round(box.x), width: round(box.width), right: round(box.right) } : null

async function gotoRoute(route, readySelector) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.evaluate(nextRoute => {
    window.history.pushState({}, '', nextRoute)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, route)
  await page.locator(readySelector).first().waitFor()
}

async function measureCard(cardSelector) {
  return page.locator(cardSelector).first().evaluate(card => {
    const parent = card.parentElement
    const cardBox = card.getBoundingClientRect()
    const parentBox = parent?.getBoundingClientRect()
    return {
      card: { x: cardBox.x, width: cardBox.width, right: cardBox.right },
      parent: parentBox ? { x: parentBox.x, width: parentBox.width, right: parentBox.right } : null,
      scrollWidth: card.scrollWidth,
      clientWidth: card.clientWidth,
      maxWidth: getComputedStyle(card).maxWidth,
    }
  })
}

async function inspectStreaming() {
  await gotoRoute('/streaming', '[data-streaming-page]')
  const tabs = page.locator('[data-streaming-tabs] button')
  const states = []
  for (const [index, name, selector] of [
    [0, 'home', '[data-streaming-home] [data-stream-card]'],
    [1, 'browse', '[data-streaming-browse] [data-stream-card]'],
    [2, 'replays', '[data-replay-grid] [data-stream-card]'],
    [3, 'following', '[data-streaming-cards-state] [data-stream-card]'],
  ]) {
    await tabs.nth(index).click()
    await page.locator(selector).first().waitFor()
    states.push({ name, ...(await measureCard(selector)) })
  }
  return states
}

async function inspectMyStreaming() {
  await gotoRoute('/streaming/mystreaming', '[data-my-streaming-page]')
  const tabs = page.locator('[data-my-streaming-tabs] button')
  const states = []
  for (const [index, name, selector] of [
    [1, 'streams', '[data-channel-streams] [data-stream-card]'],
    [2, 'replays', '[data-channel-replays] [data-stream-card]'],
    [3, 'followers', '[data-channel-followers] [data-follower-card]'],
  ]) {
    await tabs.nth(index).click()
    await page.locator(selector).first().waitFor()
    states.push({ name, ...(await measureCard(selector)) })
  }
  return states
}

async function inspectChallengeActions() {
  await gotoRoute('/challenges', '[aria-label="10X challenge accounts"]')
  return page.evaluate(() => {
    const search = document.querySelector('input[aria-label="Search accounts"]')
    const filter = document.querySelector('button[aria-label="Filter by status"]')
    const pageContent = search?.closest('.relative.px-4')
    const contentStyle = pageContent ? getComputedStyle(pageContent) : null
    const contentBox = pageContent?.getBoundingClientRect()
    const searchBox = search?.parentElement?.getBoundingClientRect()
    const filterBox = filter?.getBoundingClientRect()
    return {
      content: contentBox && contentStyle ? {
        left: contentBox.left + parseFloat(contentStyle.paddingLeft),
        right: contentBox.right - parseFloat(contentStyle.paddingRight),
      } : null,
      search: searchBox ? { x: searchBox.x, width: searchBox.width, right: searchBox.right } : null,
      filter: filterBox ? { x: filterBox.x, width: filterBox.width, right: filterBox.right } : null,
      gap: searchBox && filterBox ? filterBox.left - searchBox.right : null,
    }
  })
}

async function inspectCopyTrading() {
  await gotoRoute('/gensocial/copy-trading', '.copy-trader-card')
  const card = await measureCard('.copy-trader-card')
  const actions = await page.evaluate(() => {
    const search = document.querySelector('input[placeholder="Search traders"]')
    const searchBox = search?.parentElement?.getBoundingClientRect()
    const row = search?.closest('[data-copy-trading-actions]') || search?.parentElement?.parentElement
    const rowBox = row?.getBoundingClientRect()
    const buttons = ['Show favorites', 'List view', 'Grid view'].map(label => document.querySelector(`button[aria-label="${label}"]`)?.getBoundingClientRect())
    return {
      row: rowBox ? { x: rowBox.x, width: rowBox.width, right: rowBox.right } : null,
      search: searchBox ? { x: searchBox.x, width: searchBox.width, right: searchBox.right, y: searchBox.y, height: searchBox.height } : null,
      buttons: buttons.map(box => box ? { x: box.x, width: box.width, right: box.right, y: box.y, height: box.height } : null),
      flexWrap: row ? getComputedStyle(row).flexWrap : null,
    }
  })
  return { card, actions }
}

async function inspectSignalsFollower() {
  await gotoRoute('/gensocial/signals', '.signals-page')
  await page.locator('.signals-page [role="tablist"] button, .signals-page .mode-toggle button').nth(2).click()
  await page.locator('.signal-strategy-card').waitFor()
  return measureCard('.signal-strategy-card')
}

async function inspectExploreMarkets() {
  await gotoRoute('/news/discover', '[data-explore-markets-controls]')
  return page.locator('[data-explore-markets-controls]').evaluate(row => {
    const tabs = row.querySelector('.mode-toggle[aria-label="Market category"]')
    const tabButtons = tabs ? [...tabs.querySelectorAll('button')] : []
    const search = row.querySelector('input[aria-label="Search markets"]')?.parentElement
    const rowBox = row.getBoundingClientRect()
    const tabsBox = tabs?.getBoundingClientRect()
    const searchBox = search?.getBoundingClientRect()
    return {
      direction: getComputedStyle(row).flexDirection,
      row: { x: rowBox.x, width: rowBox.width, right: rowBox.right },
      tabs: tabsBox ? { x: tabsBox.x, width: tabsBox.width, right: tabsBox.right, y: tabsBox.y, bottom: tabsBox.bottom } : null,
      tabRail: tabs ? {
        clientWidth: tabs.clientWidth,
        scrollWidth: tabs.scrollWidth,
        overflowX: getComputedStyle(tabs).overflowX,
        scrollbarWidth: getComputedStyle(tabs).scrollbarWidth,
      } : null,
      tabCount: tabButtons.length,
      activeLabel: tabButtons.find(button => button.getAttribute('aria-pressed') === 'true')?.textContent?.trim(),
      search: searchBox ? { x: searchBox.x, width: searchBox.width, right: searchBox.right, y: searchBox.y } : null,
    }
  })
}

try {
  const results = []
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 414, height: 896 },
    { width: 430, height: 932 },
    { width: 600, height: 960 },
    { width: 768, height: 1024 },
    { width: 1440, height: 960 },
  ]) {
    await page.setViewportSize(viewport)
    results.push({
      viewport,
      streaming: await inspectStreaming(),
      myStreaming: await inspectMyStreaming(),
      challengeActions: await inspectChallengeActions(),
      copyTrading: await inspectCopyTrading(),
      signalsFollower: await inspectSignalsFollower(),
      exploreMarkets: await inspectExploreMarkets(),
      overflowX: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    })
  }

  const failures = []
  for (const result of results) {
    const mobile = result.viewport.width < 768
    for (const state of [...result.streaming, ...result.myStreaming]) {
      state.card = rect(state.card)
      state.parent = rect(state.parent)
      if (mobile && Math.abs(state.card.width - state.parent.width) > 1) failures.push(`${result.viewport.width}px ${state.name} card/parent mismatch: ${state.card.width}/${state.parent.width}`)
      if (state.scrollWidth > state.clientWidth) failures.push(`${result.viewport.width}px ${state.name} internal overflow: ${state.scrollWidth}/${state.clientWidth}`)
    }
    for (const [name, state] of [['copy-trading', result.copyTrading.card], ['signals-follower', result.signalsFollower]]) {
      state.card = rect(state.card)
      state.parent = rect(state.parent)
      if (result.viewport.width < 640 && Math.abs(state.card.width - state.parent.width) > 1) failures.push(`${result.viewport.width}px ${name} card/parent mismatch: ${state.card.width}/${state.parent.width}`)
      if (state.scrollWidth > state.clientWidth) failures.push(`${result.viewport.width}px ${name} internal overflow: ${state.scrollWidth}/${state.clientWidth}`)
    }
    if (mobile) {
      const actions = result.challengeActions
      if (Math.abs(actions.search.x - actions.content.left) > 1) failures.push(`${result.viewport.width}px search is not attached to content left`)
      if (Math.abs(actions.filter.right - actions.content.right) > 1) failures.push(`${result.viewport.width}px filter is not attached to content right: ${actions.filter.right}/${actions.content.right}`)
      if (Math.abs(actions.gap - 12) > 1) failures.push(`${result.viewport.width}px search/filter gap: ${actions.gap}`)

      const copyActions = result.copyTrading.actions
      if (copyActions.flexWrap !== 'nowrap') failures.push(`${result.viewport.width}px copy-trading actions wrap: ${copyActions.flexWrap}`)
      if (Math.abs(copyActions.search.x - copyActions.row.x) > 1) failures.push(`${result.viewport.width}px copy-trading search is not attached to row left`)
      if (Math.abs(copyActions.buttons.at(-1).right - copyActions.row.right) > 1) failures.push(`${result.viewport.width}px copy-trading actions do not reach row right`)
      const searchCenterY = copyActions.search.y + copyActions.search.height / 2
      if (copyActions.buttons.some(button => Math.abs(button.y + button.height / 2 - searchCenterY) > 1)) failures.push(`${result.viewport.width}px copy-trading controls are not vertically aligned in one row`)

      const explore = result.exploreMarkets
      if (explore.direction !== 'column') failures.push(`${result.viewport.width}px Explore Markets controls direction: ${explore.direction}`)
      if (Math.abs(explore.search.x - explore.row.x) > 1 || Math.abs(explore.search.right - explore.row.right) > 1) failures.push(`${result.viewport.width}px Explore Markets search does not fill the control row`)
      if (explore.search.y <= explore.tabs.bottom) failures.push(`${result.viewport.width}px Explore Markets search is not below the tabs`)
      if (explore.tabRail.overflowX !== 'auto') failures.push(`${result.viewport.width}px Explore Markets category rail is not scrollable`)
      if (explore.tabRail.scrollWidth <= explore.tabRail.clientWidth) failures.push(`${result.viewport.width}px Explore Markets category rail does not overflow its viewport`)
      if (explore.tabRail.scrollbarWidth !== 'none') failures.push(`${result.viewport.width}px Explore Markets native scrollbar is visible`)
      if (explore.tabCount !== 11) failures.push(`${result.viewport.width}px Explore Markets ModeToggle option count: ${explore.tabCount}`)
      if (explore.activeLabel !== 'For you') failures.push(`${result.viewport.width}px Explore Markets active ModeToggle option: ${explore.activeLabel}`)
    }
    if (result.overflowX > 0) failures.push(`${result.viewport.width}px document overflow: ${result.overflowX}`)
  }
  if (runtimeErrors.length) failures.push(`runtime errors: ${JSON.stringify(runtimeErrors)}`)
  if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

  console.log(JSON.stringify({
    baseUrl,
    viewportCount: results.length,
    runtimeErrors,
    failedResponses,
    failureCount: failures.length,
    failures,
    ...(process.env.QA_VERBOSE === '1' ? { results } : {}),
  }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  await browser.close()
}
