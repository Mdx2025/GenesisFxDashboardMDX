export const periodOptions = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const

export interface StatMetric {
  label: string
  value: string
  color: 'green' | 'red' | 'teal' | 'white'
}

export const statsGrid: StatMetric[][] = [
  [
    { label: 'Genesis Score', value: '0', color: 'white' },
    { label: 'Win Rate', value: '0.0%', color: 'red' },
    { label: 'Total P&L', value: '$0.00', color: 'green' },
  ],
  [
    { label: 'Profit Factor', value: '0.00', color: 'red' },
    { label: 'Risk-Reward Ratio', value: '0.00', color: 'red' },
    { label: 'Average Win', value: '$0.00', color: 'teal' },
  ],
  [
    { label: 'Average Loss', value: '$0.00', color: 'red' },
    { label: 'Best trade', value: '$0.00', color: 'green' },
    { label: 'Worst trade', value: '$0.00', color: 'red' },
  ],
  [
    { label: 'Average Loss', value: '$0.00', color: 'red' },
    { label: 'Max Consecutive Wins', value: '0', color: 'red' },
    { label: 'Most Profitable Asset', value: 'XAAUSD', color: 'white' },
  ],
]

export const sessionPerformance = [
  { session: 'Asian', winRate: '54%', pnl: 1240.00 },
  { session: 'New York', winRate: '54%', pnl: -150.00 },
  { session: 'London', winRate: '42%', pnl: 300.00 },
]

export const symbolExposure = [
  { symbol: 'NAS100', trades: 48, volume: '240.00 Lots', pnl: 8420.50 },
  { symbol: 'NAS100', trades: 48, volume: '160.00 Lots', pnl: 3150.00 },
  { symbol: 'NAS100', trades: 48, volume: '12.50 BTC', pnl: 1980.00 },
  { symbol: 'NAS100', trades: 48, volume: '95.00 ETH', pnl: -420.00 },
  { symbol: 'NAS100', trades: 48, volume: '60.00 Lots', pnl: 8420.50 },
]

export const technicalStats = [
  { label: 'Average Hold Time', value: 'N/A' },
  { label: 'Breakeven Trades', value: '0' },
  { label: 'Total Volume', value: '0.00 lots' },
  { label: 'Total Pips', value: '+0.0', teal: true },
  { label: 'Avg Trade Pips', value: '+0.0', teal: true },
  { label: 'Longs Won', value: '0/0 (0.0%)', teal: true },
  { label: 'Shorts Won', value: '0/0 (0.0%)', teal: true },
  { label: 'Expectancy', value: '$0.00' },
]

export const radarAxes = ['Win%', 'Profit factor', 'Avg win/loss', 'Risk to Reward', 'Consistency'] as const
