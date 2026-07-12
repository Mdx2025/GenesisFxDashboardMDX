export interface SignalProvider {
  id: string
  initials: string
  username: string
  tag: string
  following: boolean
  pair: string
  pnl30d: number
  trades: number
  pricePerMonth: string
  profitShare: string
  followers: number
  chartData: number[]
}

export const signalProviders: SignalProvider[] = [
  { id: '1', initials: 'EA', username: '@king_easy', tag: 'GFX', following: false, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [80, 75, 70, 65, 60, 55, 50, 45, 42, 38, 35, 30] },
  { id: '2', initials: 'EA', username: '@king_easy', tag: 'GFX', following: true, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [78, 72, 68, 62, 58, 52, 48, 44, 40, 36, 32, 28] },
  { id: '3', initials: 'EA', username: '@king_easy', tag: 'GFX', following: false, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [82, 76, 72, 66, 62, 56, 52, 46, 44, 40, 36, 32] },
  { id: '4', initials: 'EA', username: '@king_easy', tag: 'GFX', following: false, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [76, 70, 66, 60, 56, 50, 46, 42, 38, 34, 30, 26] },
  { id: '5', initials: 'EA', username: '@king_easy', tag: 'GFX', following: false, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [80, 74, 70, 64, 60, 54, 50, 44, 42, 38, 34, 30] },
  { id: '6', initials: 'EA', username: '@king_easy', tag: 'GFX', following: true, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [84, 78, 74, 68, 64, 58, 54, 48, 46, 42, 38, 34] },
  { id: '7', initials: 'EA', username: '@king_easy', tag: 'GFX', following: false, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [78, 72, 68, 62, 58, 52, 48, 44, 40, 36, 32, 28] },
  { id: '8', initials: 'EA', username: '@king_easy', tag: 'GFX', following: false, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [82, 76, 72, 66, 62, 56, 52, 46, 44, 40, 36, 32] },
]

export const signalTabs = ['Marketplace', 'Signal Feed', 'Follower', 'Provider'] as const
export const signalFilterTabs = ['All strategies', 'Recommended', 'Following'] as const
