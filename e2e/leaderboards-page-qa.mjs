import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || process.env.PREVIEW_BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const homeUrl = `${baseUrl}/home`
const browser = await connectQaBrowser({ url: homeUrl })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()
const runtimeErrors = []
const failedResponses = []
page.on('pageerror', error => runtimeErrors.push(error.message))
page.on('response', response => { if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() }) })

async function setTheme(theme) {
  await page.evaluate(nextTheme => localStorage.setItem('genesis-fx-theme', nextTheme), theme)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
}

async function openClaimModal(theme) {
  await page.setViewportSize({ width: 1920, height: 1027 })
  await page.goto(homeUrl, { waitUntil: 'networkidle' })
  await setTheme(theme)
  await page.getByRole('button', { name: 'Leaderboards', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Claim your username' })
  await dialog.waitFor({ state: 'visible' })
  await page.waitForTimeout(350)
  const surface = dialog.locator('[data-claim-username-surface]')
  const styles = await surface.evaluate(element => {
    const style = getComputedStyle(element)
    const heading = getComputedStyle(element.querySelector('h3'))
    const body = getComputedStyle(element.querySelector('h3 + p'))
    return { background: style.backgroundColor, border: style.borderColor, heading: heading.color, body: body.color }
  })
  const rect = await surface.boundingBox()
  return { dialog, rect, styles }
}

const darkModal = await openClaimModal('dark')
await page.keyboard.press('Escape')
await darkModal.dialog.waitFor({ state: 'detached' })
const lightModal = await openClaimModal('light')
if (process.env.MODAL_OUTPUT_PATH) await page.screenshot({ path: process.env.MODAL_OUTPUT_PATH })
await lightModal.dialog.getByRole('button', { name: 'Continue' }).click()
await page.waitForURL(/\/leaderboards$/)
await page.getByRole('heading', { name: 'Leaderboard', exact: true }).waitFor({ state: 'visible' })

async function inspectState(index) {
  const tab = page.locator('[data-leaderboard-mode-toggle] button').nth(index)
  await tab.click()
  const sectionTitle = await page.locator('#leaderboard-section-title').innerText()
  const standardTable = page.locator('[data-leaderboard-table="standard"]')
  const challengeTable = page.locator('[data-leaderboard-table="challenge"]')
  const challenge = index === 2
  const table = challenge ? challengeTable : standardTable
  await table.waitFor({ state: 'visible' })
  const rows = await table.locator('tbody tr').count()
  const podiumVisible = await page.locator('[data-leaderboard-podium]').isVisible().catch(() => false)
  const sparklineCount = await table.locator('svg[viewBox="0 0 92 32"]').count()
  const firstValue = await table.locator('tbody tr').first().innerText()
  return { index, sectionTitle, rows, podiumVisible, sparklineCount, firstValue }
}

const lightStates = []
for (let index = 0; index < 4; index += 1) {
  const state = await inspectState(index)
  lightStates.push(state)
  const output = process.env[`STATE_${index}_OUTPUT_PATH`]
  if (output) await page.screenshot({ path: output, fullPage: true })
}

const lightStyles = await page.locator('[data-leaderboard-table]').evaluate(element => {
  const style = getComputedStyle(element)
  const heading = getComputedStyle(document.querySelector('#leaderboard-section-title'))
  return { theme: document.documentElement.dataset.theme, surface: style.backgroundColor, border: style.borderColor, heading: heading.color }
})

await page.goto(`${baseUrl}/leaderboards`, { waitUntil: 'networkidle' })
await setTheme('dark')
const darkState = await inspectState(0)
const darkStyles = await page.locator('[data-leaderboard-table]').evaluate(element => {
  const style = getComputedStyle(element)
  return { theme: document.documentElement.dataset.theme, surface: style.backgroundColor, border: style.borderColor }
})

await page.setViewportSize({ width: 390, height: 844 })
await page.reload({ waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const mobileOverflow = await page.evaluate(() => ({ x: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 }))

const failures = []
const leaderboardModeToggle = await page.locator('[data-leaderboard-mode-toggle] .mode-toggle').count()
const legacyPillTabs = await page.locator('[data-leaderboard-mode-toggle] .pill-tabs').count()
if (leaderboardModeToggle !== 1 || legacyPillTabs !== 0) failures.push(`leaderboard tabs primitive mismatch: ${JSON.stringify({ leaderboardModeToggle, legacyPillTabs })}`)
for (const modal of [darkModal, lightModal]) {
  if (!modal.rect || Math.abs(modal.rect.width - 755) > 1 || Math.abs(modal.rect.height - 551) > 1) failures.push(`modal geometry mismatch: ${JSON.stringify(modal.rect)}`)
}
if (darkModal.styles.background !== 'rgb(12, 19, 17)' || darkModal.styles.heading !== 'rgb(255, 255, 255)') failures.push(`dark modal tokens mismatch: ${JSON.stringify(darkModal.styles)}`)
if (lightModal.styles.background !== 'rgb(255, 255, 255)' || lightModal.styles.border !== 'rgb(236, 236, 236)' || lightModal.styles.heading !== 'rgb(0, 0, 0)') failures.push(`light modal tokens mismatch: ${JSON.stringify(lightModal.styles)}`)
const expectedTitles = ['Top Traders–Monthly ROI', 'Most Profitable — Monthly P/L', '10X Challenge - Leaderboard', 'Top Demo Traders - Monthly ROI']
for (const state of lightStates) {
  if (state.sectionTitle !== expectedTitles[state.index]) failures.push(`state ${state.index} title mismatch: ${state.sectionTitle}`)
  if (state.rows !== (state.index === 2 ? 25 : 24)) failures.push(`state ${state.index} row mismatch: ${state.rows}`)
  if (state.podiumVisible !== (state.index !== 2)) failures.push(`state ${state.index} podium mismatch: ${state.podiumVisible}`)
  if (state.index === 2 && state.sparklineCount !== 25) failures.push(`challenge sparkline mismatch: ${state.sparklineCount}`)
}
if (!lightStates[1].firstValue.includes('+$26,327.40')) failures.push('most profitable value mismatch')
if (!lightStates[2].firstValue.includes('Tier 1') || !lightStates[2].firstValue.includes('$500')) failures.push('challenge signature content mismatch')
if (lightStyles.theme !== 'light' || lightStyles.surface !== 'rgb(255, 255, 255)' || lightStyles.border !== 'rgb(236, 236, 236)' || lightStyles.heading !== 'rgb(0, 0, 0)') failures.push(`light page tokens mismatch: ${JSON.stringify(lightStyles)}`)
if (darkStyles.theme !== 'dark' || darkStyles.surface !== 'rgb(12, 19, 17)') failures.push(`dark page tokens mismatch: ${JSON.stringify(darkStyles)}`)
if (mobileOverflow.x) failures.push('mobile document horizontal overflow')
if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(' | ')}`)
if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`)

console.log(JSON.stringify({
  status: failures.length ? 'FAIL' : 'PASS',
  baseUrl,
  darkModal: { rect: darkModal.rect, styles: darkModal.styles },
  lightModal: { rect: lightModal.rect, styles: lightModal.styles },
  lightStates,
  darkState,
  lightStyles,
  darkStyles,
  mobileOverflow,
  runtimeErrors,
  failedResponses,
  failures,
}, null, 2))
await browser.close()
if (failures.length) process.exit(1)
