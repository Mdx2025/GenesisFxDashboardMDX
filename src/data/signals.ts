export interface SignalProvider {
  id: string
  initials: string
  username: string
  tag: string
  following: boolean
  recommended: boolean
  pair: string
  pnl30d: number
  trades: number
  pricePerMonth: string
  profitShare: string
  followers: number
  chartData: number[]
}

export const signalProviders: SignalProvider[] = [
  { id: '1', initials: 'EA', username: '@king_easy', tag: 'GFX', following: false, recommended: false, pair: 'XAUUSD', pnl30d: -84.70, trades: 4, pricePerMonth: 'Free', profitShare: '0%', followers: 11, chartData: [80, 75, 70, 65, 60, 55, 50, 45, 42, 38, 35, 30] },
  { id: '2', initials: 'MR', username: '@mara_fx', tag: 'GFX', following: true, recommended: true, pair: 'XAUUSD', pnl30d: 1240.15, trades: 38, pricePerMonth: '$49', profitShare: '15%', followers: 842, chartData: [28, 32, 36, 40, 44, 48, 52, 58, 62, 68, 72, 78] },
  { id: '3', initials: 'TV', username: '@trend_vault', tag: 'GFX', following: false, recommended: true, pair: 'EURUSD', pnl30d: 612.40, trades: 21, pricePerMonth: '$29', profitShare: '10%', followers: 317, chartData: [32, 36, 40, 44, 46, 50, 54, 56, 60, 64, 68, 70] },
  { id: '4', initials: 'SC', username: '@scalp_club', tag: 'GFX', following: true, recommended: false, pair: 'GBPUSD', pnl30d: 188.90, trades: 96, pricePerMonth: '$19', profitShare: '5%', followers: 154, chartData: [40, 44, 42, 48, 46, 52, 50, 56, 54, 60, 58, 64] },
  { id: '5', initials: 'NX', username: '@nova_x', tag: 'GFX', following: false, recommended: true, pair: 'BTCUSD', pnl30d: 2130.60, trades: 12, pricePerMonth: '$79', profitShare: '20%', followers: 1204, chartData: [24, 30, 34, 42, 46, 54, 58, 66, 70, 76, 82, 88] },
  { id: '6', initials: 'QD', username: '@quiet_desk', tag: 'GFX', following: false, recommended: false, pair: 'USDJPY', pnl30d: -212.35, trades: 9, pricePerMonth: 'Free', profitShare: '0%', followers: 46, chartData: [70, 66, 64, 60, 58, 54, 52, 48, 46, 42, 40, 36] },
]

export const signalTabs = ['Marketplace', 'Signal Feed', 'Follower', 'Provider'] as const
export const signalFilterTabs = ['All strategies', 'Recommended', 'Following'] as const

export const providerFaqs = [
  { question: 'What is a Signal Provider?', answer: 'A Signal Provider is a verified trader who shares their trading signals with followers on the Genesis platform. When you publish a signal, your followers can see your trade ideas in real time and choose to execute them.' },
  { question: 'How do I earn as a Signal Provider?', answer: 'You earn through two streams: monthly subscription fees from followers who subscribe to your signal feed, and performance fees based on the profits your signals generate for your followers.' },
  { question: 'What are the requirements to apply?', answer: 'You need a verified Genesis account with a linked trading account showing at least 30 days of trading history. A minimum track record of positive returns and consistent activity is required for approval.' },
  { question: 'How long does approval take?', answer: "Most applications are reviewed within 3–5 business days. You'll receive a notification once your application has been approved or if additional information is needed." },
  { question: 'Can I run multiple strategies?', answer: 'Yes. Once approved, you can create and manage multiple signal strategies targeting different instruments, timeframes, or risk profiles. Each strategy has its own subscriber base and performance metrics.' },
  { question: 'When are fees paid out?', answer: 'Subscription fees are credited to your wallet at the end of each billing cycle. Performance fees are calculated and distributed monthly based on the net profits generated for your subscribers.' },
  { question: 'Can my account be removed later?', answer: 'You can deactivate your provider account at any time. Active subscriptions will run until their current period ends. Your trading history and performance record are retained for compliance purposes.' },
] as const
