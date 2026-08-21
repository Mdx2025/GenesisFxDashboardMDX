import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const shotDir = process.env.SHOT_DIR || '/home/clawd/.openclaw/media/genesis-aicoach-qa'
const targetUrl = `${baseUrl}/tradelocker/journal`
const CARD_W = 1270
const CARD_H = 906
const viewport = { width: 1440, height: 1000 }

fs.mkdirSync(shotDir, { recursive: true })

const browser = await connectQaBrowser({ url: targetUrl })
const context = browser.contexts()[0] || (await browser.newContext())
const page = context.pages()[0] || (await context.newPage())
const runtimeErrors = []
page.on('pageerror', (error) => runtimeErrors.push(error.message))

const report = []

async function shot(theme, name) {
  await page.screenshot({ path: path.join(shotDir, `${theme}-${name}.png`) })
}

async function readSurface(theme, view) {
  const surface = page.locator('[data-ai-coach-surface]')
  await surface.waitFor({ state: 'visible' })
  const info = await surface.evaluate((el) => {
    const style = getComputedStyle(el)
    return {
      view: el.getAttribute('data-ai-coach-view'),
      background: style.backgroundColor,
      accent: style.getPropertyValue('--ac-accent').trim(),
      text: style.getPropertyValue('--ac-text').trim(),
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
    }
  })
  const expected = Math.min(1, (viewport.width * 0.95) / CARD_W, (viewport.height * 0.95) / CARD_H)
  report.push({
    theme,
    requestedView: view,
    ...info,
    expectedScaledWidth: Number((CARD_W * expected).toFixed(2)),
    expectedScaledHeight: Number((CARD_H * expected).toFixed(2)),
  })
}

for (const theme of ['dark', 'light']) {
  await page.setViewportSize(viewport)
  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await page.evaluate((next) => localStorage.setItem('genesis-fx-theme', next), theme)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  await page.getByRole('button', { name: 'AI Coach', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'AI Coach' })
  await dialog.waitFor({ state: 'visible' })
  await page.waitForTimeout(600)
  await readSurface(theme, 'default')
  await shot(theme, '1-default')

  await dialog.getByRole('button', { name: 'Which asset should I focus on?' }).first().click()
  await page.waitForTimeout(300)
  await readSurface(theme, 'chat')
  await shot(theme, '2-chat')

  await dialog.getByRole('button', { name: 'Ideas' }).click()
  await page.waitForTimeout(200)
  await dialog.getByRole('menuitem', { name: /AI Trade Idea/ }).click()
  await page.waitForTimeout(300)
  await readSurface(theme, 'idea')
  await shot(theme, '3-idea')

  await dialog.getByRole('button', { name: 'Generate idea' }).click()
  await page.waitForTimeout(400)
  await readSurface(theme, 'response')
  await shot(theme, '4-response')

  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)
}

const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)

console.log(JSON.stringify({ baseUrl, shotDir, overflow, runtimeErrors, report }, null, 2))
await browser.close()
