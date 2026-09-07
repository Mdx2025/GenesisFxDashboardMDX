import type { PriceChangeDatum } from '@/components/charts/PriceChangeBarChart'

export const AI_ANALYSIS_ASSETS = ['EUROUSD', 'GBPUSD', 'USDJPY', 'ZAUUSD', 'US500', 'BTCUSD', 'USOIL'] as const

export const aiAnalysisQuote = {
  symbol: 'EUROUSD',
  market: 'FX',
  price: '1.1443',
  change: '+0.01 %',
  flag: '/images/news/ai-analysis-eurusd.webp',
}

export const aiAnalysisSentiment = {
  /** 0 = fully bearish, 100 = fully bullish. */
  value: 31,
  verdict: 'Sell',
  buy: '2 buy',
  neutral: '2 neutral',
  sell: '2 sell',
}

/** EURUSD net move per 1H bar, in pips: breakout spike, range, then the fade into resistance. */
export const aiAnalysisPriceChanges: PriceChangeDatum[] = [
  { period: '09:00', pips: 6.2 },
  { period: '10:00', pips: 9.4 },
  { period: '11:00', pips: -4.1 },
  { period: '12:00', pips: 14.8 },
  { period: '13:00', pips: -7.6 },
  { period: '14:00', pips: 3.9 },
  { period: '15:00', pips: -11.2 },
  { period: '16:00', pips: 5.1 },
]

export interface AiAnalysisMetric {
  label: string
  value: string
  caption: string
  positive?: boolean
}

export const aiAnalysisMetrics: AiAnalysisMetric[] = [
  { label: 'RSI  (14)', value: '41.399', caption: 'Neutral' },
  { label: 'Volability', value: '0.20%', caption: 'ATR / price' },
  { label: 'RSI  (14)', value: '1.144', caption: 'Neutral', positive: true },
  { label: 'Volability', value: '1.1448', caption: 'ATR / price', positive: true },
]

export const aiAnalysisRange = {
  label: 'Range(recent)',
  caption: '52%',
  low: '1,1429',
  high: '1,1447',
  percent: 37,
}

export interface AiAnalysisSignal {
  name: string
  reading: string
  verdict: string
  tone: 'success' | 'danger' | 'neutral'
}

export const aiAnalysisSignals: AiAnalysisSignal[] = [
  { name: 'Price vs SMA20', reading: 'above', verdict: 'BUY', tone: 'success' },
  { name: 'Price vs SMA50', reading: 'below', verdict: 'SELL', tone: 'danger' },
  { name: 'MA cross', reading: 'None', verdict: 'NEUTRAL', tone: 'neutral' },
  { name: 'RSI (14)', reading: 'Neutral', verdict: 'NEUTRAL', tone: 'neutral' },
  { name: 'MACD', reading: 'bearish', verdict: 'SELL', tone: 'danger' },
  { name: 'Momentum', reading: '-0.30% / 10 bars', verdict: 'SELL', tone: 'danger' },
]

export const aiAnalysisKeyLevels = {
  resistance: ['1.1441', '1.1444', '1.1447'],
  support: ['1.1429', '1.1432', '1.1435'],
}

export const aiAnalysisTradeIdea = {
  direction: 'Short',
  entry:
    'Sell near 1.1445-1.1450, where price is pressing against clustered intraday resistance and just below the recent range high, with signs of fading momentum.',
  stop:
    'Above 1.1485, beyond the upper resistance band to protect against a false breakout and a push toward the broader 1.16 target highlighted in recent technical commentary [7].',
  target:
    'First target near 1.1405- 1.1410 (just below S1/S2 cluster), with an extended objective toward the 1.1350-1.1360 zone if USyields or risk sentiment turn more supportive of the dollar[5] [7]. Trail stops if price decisively breaks below the upward correction trendline referenced in recent chart analysis[7].',
}

export const aiAnalysisTechnical =
  'EURUSD is trading around 1.1443, sitting slightly above the short-term 20-day moving average (~1.1440) but marginally below the 50-day average (~1.1448), reflecting a very tight, late-rally consolidation[3][5]. Daily RSI(14) near 41 suggests ** neutral-to-mildly bearish ** momentum rather than any overbought or oversold extreme[5]. Pivot-based levels show an immediate intraday range between 1.1429 and 1.1447, with price currently just above the central pivot (1.1438), indicating the pair is trading around the middle of its short-term range with slightly more room to the downside than the upside[5]. The clustering of resistance between 1.1441-1.1447 and the fact that the full moving-average set from 5 to 200 days skews to a "sell" bias (7 sell vs 5 buy signals on Investing.com) point to ** fading strength into resistance ** rather than a clean breakout setup[5]. MACD and short-horizon momentum are indicative of waning upside (bearish histogram), consistent with the pairstalling into a major trendline cited by recent technical commentary[7]. Overall, price action argues for a ** slight bearish bias within a tight range ** , with limited upside unless the 1.1450-1.1470 area is decisively cleared.'

export const aiAnalysisFundamental =
  'EURUSD is trading moderately firm after soft recent US inflation data weakened the dollar and led markets to scale back the probability of near-term Fed rate hikes, pushing expectations for the next fully priced hike toward year-end rather than July[7]. At the same time, Eurozone June inflation eased and falling energy prices have reduced pressure on the ECB to tighten further, with policymakers signaling and markets pricing a pause in July and only modest additional tightening by year-end (about 43 bps, next hike around September) [7]. This leaves policy-rate expectations on both sides more balanced and limits upside in EURUSD: the softer USD narrative supports the euro in the short run, but lingering geopolitical risks (e.g., US-Iran tensions keeping medium-term inflation risks to the upside) and already significant EURUSD gains argue against aggressive bullish expectations and favor a more range-bound to slightly corrective outlook[7].'

/* ─────────────────────────────────────────────────────────────────────────────
 * Per-symbol analysis
 *
 * The screen used to render the EUROUSD fixture no matter what the toolbar was
 * doing, so the instrument pills and the symbol search were purely decorative.
 * `buildAiAnalysis` returns the handwritten EUROUSD copy verbatim and derives a
 * full analysis for every other instrument from a PRNG seeded with the symbol
 * itself: the same symbol always yields the same numbers, so the view stays
 * stable across re-renders, reloads and back-navigation instead of reshuffling
 * on every keystroke.
 * ────────────────────────────────────────────────────────────────────────── */

export interface AiAnalysisQuote {
  symbol: string
  market: string
  price: string
  change: string
  /** Rising instrument: drives the arrow direction and the badge tone. */
  up: boolean
  /** Only EUROUSD ships artwork; everything else falls back to a monogram tile. */
  flag?: string
}

export interface AiAnalysisSentiment {
  value: number
  verdict: string
  buy: string
  neutral: string
  sell: string
}

export interface AiAnalysisRange {
  label: string
  caption: string
  low: string
  high: string
  percent: number
}

export interface AiAnalysisTradeIdea {
  direction: string
  entry: string
  stop: string
  target: string
}

export interface AiAnalysisDataset {
  quote: AiAnalysisQuote
  sentiment: AiAnalysisSentiment
  priceChanges: PriceChangeDatum[]
  metrics: AiAnalysisMetric[]
  range: AiAnalysisRange
  signals: AiAnalysisSignal[]
  keyLevels: { resistance: string[]; support: string[] }
  tradeIdea: AiAnalysisTradeIdea
  technical: string
  fundamental: string
}

/** Uppercases and drops the separators traders type (`eur/usd`, `btc-usd`). */
export function normalizeSymbol(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
}

/* ─── Deterministic noise ─── */

/** FNV-1a: same symbol in, same seed out, across reloads and machines. */
function seedOf(symbol: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < symbol.length; i += 1) {
    hash ^= symbol.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

/** mulberry32 — small, fast, and good enough for fixture data. */
function makeRng(seed: number): () => number {
  let state = seed || 1
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ─── Instrument classification ─── */

interface SymbolProfile {
  market: string
  /** Mid price the generated session oscillates around. */
  base: number
  decimals: number
}

const KNOWN_SYMBOLS: Record<string, SymbolProfile> = {
  GBPUSD: { market: 'FX', base: 1.2748, decimals: 4 },
  USDJPY: { market: 'FX', base: 156.82, decimals: 3 },
  AUDUSD: { market: 'FX', base: 0.6612, decimals: 4 },
  USDCAD: { market: 'FX', base: 1.3684, decimals: 4 },
  USDCHF: { market: 'FX', base: 0.8931, decimals: 4 },
  NZDUSD: { market: 'FX', base: 0.6094, decimals: 4 },
  EURGBP: { market: 'FX', base: 0.8477, decimals: 4 },
  EURJPY: { market: 'FX', base: 169.44, decimals: 3 },
  // The toolbar ships the gold ticker with a Z; both spellings resolve to gold.
  ZAUUSD: { market: 'Metals', base: 2412.6, decimals: 2 },
  XAUUSD: { market: 'Metals', base: 2412.6, decimals: 2 },
  XAGUSD: { market: 'Metals', base: 28.74, decimals: 3 },
  US500: { market: 'Index', base: 5487.3, decimals: 2 },
  US30: { market: 'Index', base: 38941.2, decimals: 2 },
  US100: { market: 'Index', base: 19624.8, decimals: 2 },
  NAS100: { market: 'Index', base: 19624.8, decimals: 2 },
  GER40: { market: 'Index', base: 18342.5, decimals: 2 },
  UK100: { market: 'Index', base: 8215.4, decimals: 2 },
  JP225: { market: 'Index', base: 38703.0, decimals: 2 },
  BTCUSD: { market: 'Crypto', base: 68420.5, decimals: 2 },
  ETHUSD: { market: 'Crypto', base: 3564.2, decimals: 2 },
  SOLUSD: { market: 'Crypto', base: 148.37, decimals: 2 },
  XRPUSD: { market: 'Crypto', base: 0.5218, decimals: 4 },
  USOIL: { market: 'Commodity', base: 78.35, decimals: 2 },
  UKOIL: { market: 'Commodity', base: 82.14, decimals: 2 },
  NGAS: { market: 'Commodity', base: 2.784, decimals: 3 },
}

const CRYPTO_HINTS = ['BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE', 'LTC', 'BNB', 'AVAX', 'DOT', 'USDT', 'USDC']
const METAL_HINTS = ['XAU', 'XAG', 'XPT', 'XPD', 'GOLD', 'SILVER']
const COMMODITY_HINTS = ['OIL', 'GAS', 'WTI', 'BRENT', 'COPPER', 'WHEAT', 'CORN']
const FX_CODES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'NZD', 'CAD', 'SEK', 'NOK', 'MXN', 'ZAR', 'TRY']

/** Classifies an unlisted ticker so a crypto pair never renders at a 1.14 handle. */
function profileFor(symbol: string, rng: () => number): SymbolProfile {
  const known = KNOWN_SYMBOLS[symbol]
  if (known) return known

  const has = (hints: string[]) => hints.some(hint => symbol.includes(hint))

  if (has(CRYPTO_HINTS)) return { market: 'Crypto', base: 40 + rng() * 3200, decimals: 2 }
  if (has(METAL_HINTS)) return { market: 'Metals', base: 25 + rng() * 2400, decimals: 2 }
  if (has(COMMODITY_HINTS)) return { market: 'Commodity', base: 3 + rng() * 95, decimals: 2 }
  if (/^(US|GER|UK|JP|FR|EU|AUS)\d{2,3}$/.test(symbol)) return { market: 'Index', base: 3800 + rng() * 16000, decimals: 2 }
  if (symbol.includes('JPY')) return { market: 'FX', base: 95 + rng() * 90, decimals: 3 }
  if (symbol.length === 6 && FX_CODES.includes(symbol.slice(0, 3)) && FX_CODES.includes(symbol.slice(3))) {
    return { market: 'FX', base: 0.6 + rng() * 1.1, decimals: 4 }
  }
  // Single-name equities and anything else unrecognised.
  return { market: 'Stocks', base: 12 + rng() * 380, decimals: 2 }
}

/* ─── Formatting ─── */

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

function fmt(value: number, decimals: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

/* ─── Generator ─── */

const SIGNAL_NAMES = ['Price vs SMA20', 'Price vs SMA50', 'MA cross', 'RSI (14)', 'MACD', 'Momentum'] as const

/** Indicator readings phrased the way each row is phrased in the handwritten fixture. */
function readingFor(name: string, tone: 'success' | 'danger' | 'neutral', rng: () => number): string {
  if (name === 'Price vs SMA20' || name === 'Price vs SMA50') {
    return tone === 'success' ? 'above' : tone === 'danger' ? 'below' : 'flat'
  }
  if (name === 'MA cross') {
    return tone === 'success' ? 'Golden' : tone === 'danger' ? 'Death' : 'None'
  }
  if (name === 'RSI (14)') {
    return tone === 'success' ? 'Rising' : tone === 'danger' ? 'Falling' : 'Neutral'
  }
  if (name === 'MACD') {
    return tone === 'success' ? 'bullish' : tone === 'danger' ? 'bearish' : 'flat'
  }
  const magnitude = round((tone === 'success' ? 1 : tone === 'danger' ? -1 : 0.1) * (0.1 + rng() * 0.6), 2)
  return `${magnitude > 0 ? '+' : ''}${magnitude.toFixed(2)}% / 10 bars`
}

function buildGenerated(symbol: string): AiAnalysisDataset {
  const rng = makeRng(seedOf(symbol))
  const { market, base, decimals } = profileFor(symbol, rng)

  // Session skew in [-1, 1]: negative reads bearish, positive bullish.
  const bias = rng() * 2 - 1
  const price = round(base * (1 + (rng() - 0.5) * 0.01), decimals)
  const changePct = round(bias * (0.05 + rng() * 1.15), 2)
  const up = changePct >= 0

  // One tick of the quoted precision, so the derived levels stay meaningful per instrument.
  const tick = 10 ** -decimals

  // Eight 1H bars, drifting with the session bias.
  const priceChanges: PriceChangeDatum[] = Array.from({ length: 8 }, (_, index) => ({
    period: `${String(9 + index).padStart(2, '0')}:00`,
    pips: round((rng() - 0.5) * 24 + bias * 6, 1),
  }))

  // Signals lean with the bias but keep enough disagreement to read like a real table.
  const signals: AiAnalysisSignal[] = SIGNAL_NAMES.map(name => {
    const draw = rng() + bias * 0.45
    if (draw > 0.62) return { name, reading: readingFor(name, 'success', rng), verdict: 'BUY', tone: 'success' as const }
    if (draw < 0.38) return { name, reading: readingFor(name, 'danger', rng), verdict: 'SELL', tone: 'danger' as const }
    return { name, reading: readingFor(name, 'neutral', rng), verdict: 'NEUTRAL', tone: 'neutral' as const }
  })

  const buyCount = signals.filter(signal => signal.tone === 'success').length
  const sellCount = signals.filter(signal => signal.tone === 'danger').length
  const neutralCount = signals.length - buyCount - sellCount

  // The gauge reads straight off the signal tally, so the needle never contradicts the table.
  const sentimentValue = Math.round(((buyCount + neutralCount * 0.5) / signals.length) * 100)
  const verdict = sentimentValue >= 60 ? 'Buy' : sentimentValue <= 40 ? 'Sell' : 'Neutral'

  const rsi = round(38 + bias * 18 + rng() * 12, 3)
  const atrPct = round(0.08 + rng() * 1.4, 2)
  const sma20 = round(price * (1 - bias * 0.0012), decimals)
  const sma50 = round(price * (1 + bias * 0.0009), decimals)

  const metrics: AiAnalysisMetric[] = [
    { label: 'RSI  (14)', value: fmt(rsi, 3), caption: rsi >= 70 ? 'Overbought' : rsi <= 30 ? 'Oversold' : 'Neutral' },
    { label: 'Volability', value: `${atrPct.toFixed(2)}%`, caption: 'ATR / price' },
    { label: 'RSI  (14)', value: fmt(sma20, decimals), caption: 'Neutral', positive: true },
    { label: 'Volability', value: fmt(sma50, decimals), caption: 'ATR / price', positive: true },
  ]

  const span = Math.max(tick * 6, price * (0.0008 + rng() * 0.006))
  const low = round(price - span * (0.4 + rng() * 0.4), decimals)
  const high = round(price + span * (0.4 + rng() * 0.4), decimals)
  const percent = Math.round(Math.min(96, Math.max(4, ((price - low) / Math.max(high - low, tick)) * 100)))

  const range: AiAnalysisRange = {
    label: 'Range(recent)',
    caption: `${percent}%`,
    low: fmt(low, decimals),
    high: fmt(high, decimals),
    percent,
  }

  const step = Math.max(tick * 3, span * 0.35)
  const keyLevels = {
    resistance: [1, 2, 3].map(n => fmt(round(price + step * n, decimals), decimals)),
    support: [1, 2, 3].map(n => fmt(round(price - step * n, decimals), decimals)),
  }

  const short = verdict === 'Sell' || (verdict === 'Neutral' && bias < 0)
  // Entry zone always reads low-to-high, whichever side of price it sits on.
  const entryNear = round(price + step * (short ? 0.5 : -1.1), decimals)
  const entryFar = round(price + step * (short ? 1.1 : -0.5), decimals)
  const entryLow = fmt(entryNear, decimals)
  const entryHigh = fmt(entryFar, decimals)
  const stopLevel = fmt(round(short ? price + step * 3.4 : price - step * 3.4, decimals), decimals)
  const target1 = fmt(round(short ? price - step * 2.2 : price + step * 2.2, decimals), decimals)
  const target2 = fmt(round(short ? price - step * 4.1 : price + step * 4.1, decimals), decimals)

  const tradeIdea: AiAnalysisTradeIdea = {
    direction: short ? 'Short' : 'Long',
    entry: `${short ? 'Sell' : 'Buy'} near ${entryLow}-${entryHigh}, where ${symbol} is ${
      short ? 'pressing into clustered intraday resistance' : 'holding the intraday support shelf'
    } and ${short ? 'momentum is fading off the session high' : 'buyers keep defending the higher low'}.`,
    stop: `${short ? 'Above' : 'Below'} ${stopLevel}, beyond the ${
      short ? 'upper resistance band' : 'lower support band'
    } so a ${short ? 'false breakout' : 'stop run'} does not close the position before the level is genuinely lost.`,
    target: `First target near ${target1}, at the opposite edge of the recent ${range.caption} range, with an extended objective toward ${target2} if ${
      market === 'FX' ? 'rate expectations keep moving the same way' : 'flows stay one-directional'
    }. Trail the stop once price closes beyond the first target.`,
  }

  const technical = `${symbol} is trading around ${fmt(price, decimals)}, ${
    price >= sma20 ? 'above' : 'below'
  } its short-term 20-period average (~${fmt(sma20, decimals)}) and ${
    price >= sma50 ? 'above' : 'below'
  } the 50-period average (~${fmt(sma50, decimals)}), which frames the session as ${
    Math.abs(changePct) < 0.3 ? 'a tight consolidation' : up ? 'a controlled advance' : 'a steady give-back'
  }. RSI(14) near ${rsi.toFixed(0)} argues for ${
    rsi >= 70 ? 'stretched, overbought' : rsi <= 30 ? 'washed-out, oversold' : `neutral-to-mildly ${up ? 'bullish' : 'bearish'}`
  } momentum rather than an extreme. The recent range runs ${range.low} to ${range.high} and price sits ${percent}% of the way up it, so there is ${
    percent > 55 ? 'more room to the downside than the upside' : 'more room to the upside than the downside'
  }. The indicator set splits ${buyCount} buy / ${neutralCount} neutral / ${sellCount} sell, and the resistance cluster between ${
    keyLevels.resistance[0]
  } and ${keyLevels.resistance[2]} is what decides whether this resolves or stalls. Overall the read is a ${
    verdict === 'Neutral' ? 'range-bound bias' : `${verdict.toLowerCase()}-side bias`
  } while ${fmt(price, decimals)} holds.`

  const fundamental = `${symbol} is trading ${up ? 'firm' : 'soft'} into the session, with the ${
    market === 'FX'
      ? 'move driven mostly by the rate differential and the latest inflation prints on both legs of the pair'
      : market === 'Crypto'
        ? 'move driven by spot ETF flows and the leverage sitting in perpetual funding'
        : market === 'Index'
          ? 'move driven by earnings revisions and the path the market is pricing for policy rates'
          : market === 'Metals'
            ? 'move driven by real yields and the safe-haven bid'
            : market === 'Commodity'
              ? 'move driven by inventories and supply headlines'
              : 'move driven by sector rotation and positioning into the next print'
  }. Positioning is ${
    Math.abs(changePct) > 0.8 ? 'already crowded on this side, which caps the follow-through' : 'not stretched, so the move still has room'
  }, and the ${atrPct.toFixed(2)}% ATR means the instrument is currently ${
    atrPct > 0.9 ? 'moving fast enough that stops need real width' : 'quiet enough for tight risk'
  }. Net of that, the fundamental picture ${
    verdict === 'Neutral'
      ? 'is balanced and argues for fading the edges of the range rather than chasing a breakout'
      : `leans ${verdict.toLowerCase()}-side, but not strongly enough to justify pressing the position beyond the levels above`
  }.`

  return {
    quote: {
      symbol,
      market,
      price: fmt(price, decimals),
      change: `${up ? '+' : ''}${changePct.toFixed(2)} %`,
      up,
    },
    sentiment: {
      value: sentimentValue,
      verdict,
      buy: `${buyCount} buy`,
      neutral: `${neutralCount} neutral`,
      sell: `${sellCount} sell`,
    },
    priceChanges,
    metrics,
    range,
    signals,
    keyLevels,
    tradeIdea,
    technical,
    fundamental,
  }
}

/** The handwritten EUROUSD copy, shaped like every generated instrument. */
const EUROUSD_DATASET: AiAnalysisDataset = {
  quote: { ...aiAnalysisQuote, up: true },
  sentiment: aiAnalysisSentiment,
  priceChanges: aiAnalysisPriceChanges,
  metrics: aiAnalysisMetrics,
  range: aiAnalysisRange,
  signals: aiAnalysisSignals,
  keyLevels: aiAnalysisKeyLevels,
  tradeIdea: aiAnalysisTradeIdea,
  technical: aiAnalysisTechnical,
  fundamental: aiAnalysisFundamental,
}

/**
 * Analysis for `symbol`. EUROUSD returns the curated copy untouched; anything
 * else is generated deterministically from the ticker, so the same search
 * always produces the same numbers.
 */
export function buildAiAnalysis(symbol: string): AiAnalysisDataset {
  const normalized = normalizeSymbol(symbol)
  if (!normalized || normalized === 'EUROUSD' || normalized === 'EURUSD') return EUROUSD_DATASET
  return buildGenerated(normalized)
}
