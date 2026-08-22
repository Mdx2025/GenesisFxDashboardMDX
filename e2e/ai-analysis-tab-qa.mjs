import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = process.env.BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const shotDir = process.env.SHOT_DIR || '/home/clawd/.openclaw/media/genesis-aianalysis-qa'
const targetUrl = `${baseUrl}/news`
const viewport = { width: 1600, height: 1100 }

fs.mkdirSync(shotDir, { recursive: true })

const browser = await connectQaBrowser({ url: targetUrl })
const context = browser.contexts()[0] || (await browser.newContext())
const page = context.pages()[0] || (await context.newPage())
const runtimeErrors = []
page.on('pageerror', (error) => runtimeErrors.push(error.message))

await page.setViewportSize(viewport)
await page.goto(targetUrl, { waitUntil: 'networkidle' })

const tabLabels = await page.locator('h1').first().waitFor({ state: 'visible' }).then(async () => {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('button')).map((b) => b.textContent?.trim()).filter(Boolean)
  )
})

const report = { tabsSeen: tabLabels.filter((t) => ['Terminal', 'Market News', 'AI analysis', 'Daily News', 'Economic Calendar', 'Trade Sessions', 'Podcast'].includes(t)) }

await page.getByRole('button', { name: 'AI analysis', exact: true }).first().click()
await page.waitForTimeout(1200)
await page.evaluate(() => window.scrollTo(0, 0))

report.title = await page.locator('h1').first().textContent()
report.assetPills = await page.getByRole('button', { pressed: true }).count()

const themes = ['dark', 'light']
for (const theme of themes) {
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme)
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(shotDir, `${theme}-viewport.png`) })
  await page.screenshot({ path: path.join(shotDir, `${theme}-full.png`), fullPage: true })
}

report.overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth))
report.runtimeErrors = runtimeErrors

console.log(JSON.stringify(report, null, 2))
await browser.close()
