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

export interface AiAnalysisCandle {
  wickTop: number
  body: number
  wickBottom: number
  bullish: boolean
}

/**
 * EURUSD 1H price action: base drift, breakout spike, range, then the fade into resistance.
 * Values are pips above 1.1370, because CandlestickChart derives body spread from the raw
 * numbers and a price-scale series would collapse under its minimum-spread floor.
 */
export const aiAnalysisCandles: AiAnalysisCandle[] = [
  { wickTop: 19, body: 6, wickBottom: 11, bullish: true },
  { wickTop: 24, body: 5, wickBottom: 16, bullish: true },
  { wickTop: 21, body: 4, wickBottom: 14, bullish: false },
  { wickTop: 28, body: 7, wickBottom: 18, bullish: true },
  { wickTop: 35, body: 8, wickBottom: 24, bullish: true },
  { wickTop: 32, body: 5, wickBottom: 23, bullish: false },
  { wickTop: 42, body: 9, wickBottom: 29, bullish: true },
  { wickTop: 91, body: 28, wickBottom: 38, bullish: true },
  { wickTop: 87, body: 16, wickBottom: 58, bullish: false },
  { wickTop: 71, body: 12, wickBottom: 49, bullish: false },
  { wickTop: 62, body: 8, wickBottom: 45, bullish: false },
  { wickTop: 58, body: 6, wickBottom: 47, bullish: true },
  { wickTop: 66, body: 9, wickBottom: 51, bullish: true },
  { wickTop: 74, body: 7, wickBottom: 60, bullish: true },
  { wickTop: 70, body: 6, wickBottom: 57, bullish: false },
  { wickTop: 64, body: 10, wickBottom: 42, bullish: false },
  { wickTop: 53, body: 8, wickBottom: 36, bullish: false },
  { wickTop: 61, body: 11, wickBottom: 39, bullish: true },
  { wickTop: 72, body: 9, wickBottom: 54, bullish: true },
  { wickTop: 111, body: 30, wickBottom: 68, bullish: true },
  { wickTop: 106, body: 14, wickBottom: 85, bullish: false },
  { wickTop: 102, body: 8, wickBottom: 88, bullish: true },
  { wickTop: 108, body: 10, wickBottom: 92, bullish: true },
  { wickTop: 104, body: 7, wickBottom: 91, bullish: false },
  { wickTop: 100, body: 9, wickBottom: 85, bullish: false },
  { wickTop: 98, body: 6, wickBottom: 84, bullish: true },
  { wickTop: 95, body: 16, wickBottom: 66, bullish: false },
  { wickTop: 79, body: 12, wickBottom: 58, bullish: false },
  { wickTop: 68, body: 7, wickBottom: 55, bullish: true },
  { wickTop: 74, body: 6, wickBottom: 62, bullish: true },
  { wickTop: 78, body: 5, wickBottom: 67, bullish: true },
  { wickTop: 76, body: 6, wickBottom: 64, bullish: false },
  { wickTop: 73, body: 5, wickBottom: 62, bullish: false },
  { wickTop: 82, body: 8, wickBottom: 66, bullish: true },
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
