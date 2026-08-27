import { createRequire } from 'node:module'

const require = createRequire('/home/clawd/.openclaw/skills/playwright-browser-automation/qa_check_layout.js')
const { connectQaBrowser } = require('/home/clawd/.openclaw/workspace/scripts/qa-remote-browser.js')

const baseUrl = (process.env.BASE_URL || 'https://genesis-fx-dashboard.apps.mdxpreview.xyz').replace(/\/$/, '')
const useLocal = process.env.QA_LOCAL === '1'
const strict = process.env.STRICT === '1'

const ROUTES = process.env.QA_ROUTES ? process.env.QA_ROUTES.split(',') : [
  '/partner/referrals',
  '/partner/comissions',
  '/partner',
  '/partner/trades',
  '/partner/statistics',
  '/partner/marketing',
  '/assets-management',
  '/academy',
  '/tradelocker/journal',
  '/tradelocker/accounts',
  '/news',
  '/news/discover',
  '/challenges',
  '/gensocial/copy-trading',
  '/gensocial/signals',
  '/gensocial/pamm',
  '/settings',
]

const VIEWPORTS = [
  { label: '1920x1080', width: 1920, height: 1080 },
  { label: '1440x960', width: 1440, height: 960 },
  { label: '1024x768', width: 1024, height: 768 },
  { label: '390x844', width: 390, height: 844 },
]

const round = v => Math.round(v * 100) / 100

const browser = await connectQaBrowser(useLocal ? { local: true } : { url: baseUrl })
const context = browser.contexts()[0] || await browser.newContext()
const page = context.pages()[0] || await context.newPage()

const runtimeErrors = []
const failedResponses = []
page.on('pageerror', e => runtimeErrors.push(e.message))
page.on('response', r => {
  if (r.status() >= 400 && !r.url().endsWith('/favicon.ico') && !/AcidGrotesk/.test(r.url())) {
    failedResponses.push({ status: r.status(), url: r.url() })
  }
})

const samples = []

for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height })
  for (const route of ROUTES) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' }).catch(() => {})
    await page.waitForTimeout(450)

    const pageData = await page.evaluate(() => {
      const docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth
      const toggles = [...document.querySelectorAll('.mode-toggle')].map(toggle => {
        const cs = getComputedStyle(toggle)
        const tRect = toggle.getBoundingClientRect()
        const buttons = [...toggle.querySelectorAll('button')].map(b => {
          const label = b.querySelector('.btn-label')
          const bRect = b.getBoundingClientRect()
          const lRect = label ? label.getBoundingClientRect() : null
          return {
            text: label ? label.textContent.trim() : b.textContent.trim(),
            left: bRect.left,
            width: bRect.width,
            labelLeft: lRect ? lRect.left : null,
            labelRight: lRect ? lRect.right : null,
            labelWidth: lRect ? lRect.width : null,
            active: b.classList.contains('active'),
            fontSize: parseFloat(getComputedStyle(label || b).fontSize),
          }
        })
        const ind = toggle.querySelector('.mode-indicator')
        const iRect = ind ? ind.getBoundingClientRect() : null
        return {
          key: buttons.map(b => b.text).join('|'),
          containerLeft: tRect.left,
          containerRight: tRect.right,
          containerWidth: tRect.width,
          paddingInline: cs.paddingLeft + '/' + cs.paddingRight,
          scrolls: toggle.scrollWidth > toggle.clientWidth + 0.5,
          indicatorLeft: iRect ? iRect.left : null,
          indicatorWidth: iRect ? iRect.width : null,
          buttons,
        }
      })
      return { docOverflow, toggles }
    }).catch(() => null)

    if (!pageData) continue

    for (const t of pageData.toggles) {
      if (!t.buttons.length) continue
      const first = t.buttons[0]
      const last = t.buttons[t.buttons.length - 1]
      const activeBtn = t.buttons.find(b => b.active)
      const clipped = t.buttons.filter(b => b.labelWidth != null && b.labelWidth > b.width + 0.5)
      const tinyText = t.buttons.filter(b => b.fontSize < 12)

      samples.push({
        route,
        viewport: vp.label,
        key: t.key,
        optionCount: t.buttons.length,
        containerWidth: round(t.containerWidth),
        paddingInline: t.paddingInline,
        scrolls: t.scrolls,
        firstLabelGap: first.labelLeft == null ? null : round(first.labelLeft - t.containerLeft),
        lastLabelGap: last.labelRight == null ? null : round(t.containerRight - last.labelRight),
        trackWidths: t.buttons.map(b => round(b.width)),
        clippedLabels: clipped.map(b => ({ t: b.text, w: round(b.width), lw: round(b.labelWidth) })),
        tinyText: tinyText.map(b => ({ t: b.text, fs: b.fontSize })),
        indicatorDrift: activeBtn && t.indicatorLeft != null ? round(t.indicatorLeft - activeBtn.left) : null,
        indicatorWidthDelta: activeBtn && t.indicatorWidth != null ? round(t.indicatorWidth - activeBtn.width) : null,
        docOverflow: round(pageData.docOverflow),
      })
    }
  }
}

const failures = []
for (const s of samples) {
  const where = `${s.route} @ ${s.viewport} [${s.key.slice(0, 40)}]`
  if (s.clippedLabels.length) failures.push(`CLIPPED ${where}: ${JSON.stringify(s.clippedLabels)}`)
  if (s.firstLabelGap != null && s.firstLabelGap < 4) failures.push(`EDGE-COLLISION ${where}: firstLabelGap=${s.firstLabelGap}px`)
  if (s.indicatorDrift != null && Math.abs(s.indicatorDrift) > 1.5) failures.push(`INDICATOR-DRIFT ${where}: ${s.indicatorDrift}px`)
  if (s.indicatorWidthDelta != null && Math.abs(s.indicatorWidthDelta) > 1.5) failures.push(`INDICATOR-WIDTH ${where}: ${s.indicatorWidthDelta}px`)
  if (s.tinyText.length) failures.push(`TYPE-FLOOR ${where}: ${JSON.stringify(s.tinyText)}`)
  if (s.docOverflow > 1) failures.push(`DOC-OVERFLOW ${where}: ${s.docOverflow}px`)
}

const report = {
  baseUrl,
  mode: useLocal ? 'local' : 'remote',
  toggleSamples: samples.length,
  routes: ROUTES.length,
  failures,
  runtimeErrors,
  failedResponses,
  samples,
}

console.log(JSON.stringify(report, null, 2))
await page.close().catch(() => {})
await browser.close().catch(() => {})

if (strict && (failures.length || runtimeErrors.length)) process.exit(2)
