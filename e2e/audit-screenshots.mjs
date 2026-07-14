import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
import { join } from 'path'

const BASE = 'https://genesis-fx-dashboard.apps.mdxpreview.xyz'
const OUT = '/home/clawd/.openclaw/media/genesis-audit-screenshots'

const pages = [
  { path: '/gensocial/pamm', slug: 'pamm' },
  { path: '/gensocial/pamm/details-single-page', slug: 'pamm-details' },
  { path: '/gensocial/copy-trading', slug: 'copy-trading' },
  { path: '/gensocial/copy-trading/details-single-page', slug: 'copy-trading-details' },
  { path: '/gensocial/signals', slug: 'signals' },
  { path: '/gensocial/signals/details-single-page', slug: 'signals-details' },
  { path: '/tradelocker/journal', slug: 'journal' },
  { path: '/academy', slug: 'academy' },
]

const viewports = [
  { w: 3840, h: 2160, name: '4K-3840x2160' },
  { w: 2560, h: 1440, name: 'QHD-2560x1440' },
  { w: 1920, h: 1080, name: 'FHD-1920x1080' },
  { w: 1536, h: 864, name: 'Laptop-1536x864' },
  { w: 1440, h: 900, name: 'Laptop-1440x900' },
  { w: 1366, h: 768, name: 'Laptop-1366x768' },
  { w: 1024, h: 768, name: 'Tablet-1024x768' },
  { w: 768, h: 1024, name: 'TabletPortrait-768x1024' },
  { w: 390, h: 844, name: 'iPhone-390x844' },
  { w: 360, h: 800, name: 'Android-360x800' },
]

async function run() {
  const browser = await chromium.launch({ headless: true })
  let total = 0, errors = 0

  for (const page of pages) {
    const dir = join(OUT, page.slug)
    mkdirSync(dir, { recursive: true })

    for (const vp of viewports) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } })
      const p = await ctx.newPage()
      try {
        await p.goto(`${BASE}${page.path}`, { waitUntil: 'networkidle', timeout: 30000 })
        await p.waitForTimeout(1500)
        const file = join(dir, `${vp.name}.png`)
        await p.screenshot({ fullPage: true, path: file })
        total++
        console.log(`✓ ${page.slug}/${vp.name}`)
      } catch (e) {
        errors++
        console.error(`✗ ${page.slug}/${vp.name}: ${e.message}`)
      }
      await ctx.close()
    }
  }

  await browser.close()
  console.log(`\nDone: ${total} screenshots, ${errors} errors`)
}

run().catch(e => { console.error(e); process.exit(1) })
