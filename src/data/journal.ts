export interface DayStatCard {
  day: string
  label: string
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

export const weeklyStats: DayStatCard[] = [
  { day: 'Mon', label: 'Apr 21', pnl: 1240.50, trades: 5 },
  { day: 'Tue', label: 'Apr 22', pnl: -320.00, trades: 3 },
  { day: 'Wed', label: 'Apr 23', pnl: 4285.40, trades: 8, active: true },
  { day: 'Thu', label: 'Apr 24', pnl: 0, trades: 0 },
  { day: 'Fri', label: 'Apr 25', pnl: 890.20, trades: 4 },
  { day: 'Sat', label: 'Apr 26', pnl: 0, trades: 0 },
  { day: 'Sun', label: 'Apr 27', pnl: 0, trades: 0 },
  { day: 'Mon', label: 'Apr 28', pnl: 150.00, trades: 2 },
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
