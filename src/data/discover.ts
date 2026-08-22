export type DiscoverFlag = 'xagusd-1' | 'xagusd-2' | 'xagusd-3' | 'composite' | 'usdils'

export interface DiscoverMover {
  symbol: string
  description: string
  price: string
  change: string
  positive: boolean
  flag: DiscoverFlag
}

export const discoverMovers: DiscoverMover[] = [
  { symbol: 'XAGUSD', description: 'Spot Silver vs US D..', price: '63.3420', change: '+2.93%', positive: true, flag: 'xagusd-1' },
  { symbol: 'XAGUSD', description: 'Spot Silver vs US D..', price: '63.3420', change: '+2.93%', positive: true, flag: 'xagusd-2' },
  { symbol: 'XAGUSD', description: 'Spot Silver vs US D..', price: '63.3420', change: '+2.93%', positive: true, flag: 'xagusd-3' },
  { symbol: 'USDZAR', description: 'Spot Silver vs US D..', price: '63.3420', change: '+2.93%', positive: false, flag: 'composite' },
  { symbol: 'USDHUF', description: 'Spot Silver vs US D..', price: '63.3420', change: '+2.93%', positive: false, flag: 'composite' },
  { symbol: 'USDCHF', description: 'US Dollar vs Swiss..', price: '63.3420', change: '+2.93%', positive: false, flag: 'composite' },
  { symbol: 'USDILS', description: 'Spot Silver vs US D..', price: '63.3420', change: '+2.93%', positive: false, flag: 'usdils' },
]

export const DISCOVER_PRIMARY_CATEGORIES = ['All', 'Trending', 'Gainers', 'Losers', 'AI Picks'] as const
export const DISCOVER_ASSET_CATEGORIES = ['FX', 'Metals', 'Indices', 'Crypto', 'Energy'] as const

export interface DiscoverMarketRow {
  symbol: string
  name: string
  bid: string
  ask: string
  spread: string
  change: string
  positive: boolean
}

export const discoverMarketRows: DiscoverMarketRow[] = [
  { symbol: 'XAUUSD', name: 'Euro vs US Dollar', bid: '1.15648', ask: '1.15648', spread: '0.00012', change: '+0.33%', positive: true },
  { symbol: 'EURUSD', name: 'Euro vs US Dollar', bid: '1.08420', ask: '1.08434', spread: '0.00014', change: '+0.21%', positive: true },
  { symbol: 'GBPUSD', name: 'Great Britain Pound vs US Dollar', bid: '1.26315', ask: '1.26329', spread: '0.00014', change: '-0.18%', positive: false },
  { symbol: 'USDJPY', name: 'US Dollar vs Japanese Yen', bid: '151.842', ask: '151.856', spread: '0.014', change: '+0.47%', positive: true },
  { symbol: 'XAGUSD', name: 'Spot Silver vs US Dollar', bid: '31.2140', ask: '31.2360', spread: '0.0220', change: '+1.24%', positive: true },
  { symbol: 'USDCHF', name: 'US Dollar vs Swiss Franc', bid: '0.88214', ask: '0.88229', spread: '0.00015', change: '-0.09%', positive: false },
  { symbol: 'AUDUSD', name: 'Australian Dollar vs US Dollar', bid: '0.65718', ask: '0.65731', spread: '0.00013', change: '-0.26%', positive: false },
  { symbol: 'USDCAD', name: 'US Dollar vs Canadian Dollar', bid: '1.37092', ask: '1.37108', spread: '0.00016', change: '+0.12%', positive: true },
]
