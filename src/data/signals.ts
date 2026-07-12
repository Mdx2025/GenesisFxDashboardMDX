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

export const providerFaqs = [
  { question: 'What is a Signal Provider?', answer: 'A Signal Provider is a verified trader who shares their trading signals with followers on the Genesis platform. When you publish a signal, your followers can see your trade ideas in real time and choose to execute them.' },
  { question: 'How do I earn as a Signal Provider?', answer: 'You earn through two streams: monthly subscription fees from followers who subscribe to your signal feed, and performance fees based on the profits your signals generate for your followers.' },
  { question: 'What are the requirements to apply?', answer: 'You need a verified Genesis account with a linked trading account showing at least 30 days of trading history. A minimum track record of positive returns and consistent activity is required for approval.' },
  { question: 'How long does approval take?', answer: "Most applications are reviewed within 3–5 business days. You'll receive a notification once your application has been approved or if additional information is needed." },
  { question: 'Can I run multiple strategies?', answer: 'Yes. Once approved, you can create and manage multiple signal strategies targeting different instruments, timeframes, or risk profiles. Each strategy has its own subscriber base and performance metrics.' },
  { question: 'When are fees paid out?', answer: 'Subscription fees are credited to your wallet at the end of each billing cycle. Performance fees are calculated and distributed monthly based on the net profits generated for your subscribers.' },
  { question: 'Can my account be removed later?', answer: 'You can deactivate your provider account at any time. Active subscriptions will run until their current period ends. Your trading history and performance record are retained for compliance purposes.' },
] as const
