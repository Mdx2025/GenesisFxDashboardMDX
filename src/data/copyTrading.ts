export interface CopyTrader {
  id: string
  initials: string
  name: string
  username: string
  verified: boolean
  followers: number
  aum: string
  totalPnlPercent: number
  totalPnlAmount: string
  equity: string
  winRate: string
  maxDrawdown: string
  chartData: number[]
  recommended: boolean
  favorite: boolean
}

export const copyTraders: CopyTrader[] = [
  { id: '1', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90], recommended: true, favorite: true },
  { id: '2', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [30, 45, 40, 55, 50, 65, 60, 75, 70, 80, 72, 85], recommended: false, favorite: false },
  { id: '3', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [50, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92], recommended: true, favorite: false },
  { id: '4', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [35, 50, 42, 58, 52, 68, 62, 78, 72, 82, 76, 88], recommended: false, favorite: true },
  { id: '5', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [45, 55, 48, 62, 58, 72, 68, 82, 78, 88, 82, 90], recommended: true, favorite: false },
  { id: '6', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [38, 52, 46, 60, 54, 70, 64, 80, 74, 84, 78, 86], recommended: false, favorite: false },
  { id: '7', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [42, 56, 50, 64, 58, 74, 68, 84, 78, 88, 82, 92], recommended: true, favorite: true },
  { id: '8', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [32, 48, 38, 56, 48, 66, 58, 76, 68, 78, 72, 84], recommended: false, favorite: false },
  { id: '9', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90], recommended: true, favorite: false },
  { id: '10', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [30, 45, 40, 55, 50, 65, 60, 75, 70, 80, 72, 85], recommended: false, favorite: true },
  { id: '11', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [50, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92], recommended: true, favorite: false },
  { id: '12', initials: 'EA', name: 'KingEasy', username: '@king_easy', verified: true, followers: 0, aum: '$3,000.00', totalPnlPercent: 194.12, totalPnlAmount: '$400.53', equity: '$3,000.30', winRate: '66.88%', maxDrawdown: '-4.24%', chartData: [35, 50, 42, 58, 52, 68, 62, 78, 72, 82, 76, 88], recommended: false, favorite: false },
]

export const copyTradingTabs = ['Leaderboard', 'Follower', 'Master'] as const
export const copyTradingFilterTabs = ['All strategies', 'Recommended', 'Favorites'] as const
