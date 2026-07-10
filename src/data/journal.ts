export interface DayStatCard {
  day: string
  pnl: number
  trades: number
  active?: boolean
}

export interface RecentTrade {
  date: string
  instrument: string
  side: 'Buy' | 'Sell'
  pnl: number
}

export interface NewsEvent {
  country: string
  countryCode: string
  title: string
  time: string
  forecast: string
  previous: string
  impact: 1 | 2 | 3
}

export interface JournalStats {
  totalPnl: number
  mostTradedAsset: { symbol: string; name: string }
  winRate: number
  profitFactor: number
  totalTrades: number
}

export const journalTabs = [
  'Overview',
  'Statistics',
  'Strategy DNA',
  'Calendar',
  'Trades',
  'Notebook',
  'Replay',
] as const

export const weeklyStats: DayStatCard[] = [
  { day: 'Sun 19', pnl: 0, trades: 0 },
  { day: 'Sun 19', pnl: 0, trades: 0 },
  { day: 'Sun 19', pnl: 0, trades: 0 },
  { day: 'Sun 19', pnl: 0, trades: 0, active: true },
  { day: 'Sun 19', pnl: 0, trades: 0 },
  { day: 'Sun 19', pnl: 0, trades: 0 },
  { day: 'Sun 19', pnl: 0, trades: 0 },
  { day: 'Sun 19', pnl: 0, trades: 0 },
]

export const recentTrades: RecentTrade[] = [
  { date: 'Apr 23, 15:42', instrument: 'NAS100', side: 'Buy', pnl: 1240.50 },
  { date: 'Apr 23, 15:42', instrument: 'NAS100', side: 'Sell', pnl: 1240.50 },
  { date: 'Apr 23, 15:42', instrument: 'NAS100', side: 'Buy', pnl: -1240.50 },
  { date: 'Apr 23, 15:42', instrument: 'NAS100', side: 'Buy', pnl: 1240.50 },
]

export const highImpactNews: NewsEvent[] = [
  { country: 'United Kingdom', countryCode: 'GB', title: 'Retail Sales Mom', time: '03:00', forecast: '0.2', previous: '-0.4', impact: 3 },
  { country: 'United Kingdom', countryCode: 'GB', title: 'Retail Sales Mom', time: '03:00', forecast: '0.2', previous: '-0.4', impact: 3 },
]

export const journalStats: JournalStats = {
  totalPnl: 4285.40,
  mostTradedAsset: { symbol: 'XAUUSD', name: 'Gold' },
  winRate: 39.2,
  profitFactor: 1.69,
  totalTrades: 120,
}
