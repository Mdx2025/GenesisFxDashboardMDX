/* ─── Strategy DNA — mock data ─── */

export interface TraderPassport {
  name: string
  location: string
  level: number
  archetype: string
  archetypeDescription: string
  trades: number
  winRate: string
  pctl: string
  xpCurrent: number
  xpMax: number
  accounts: number
  greenDays: number
  streak: number
  dailyStreakDays: number
  dailyStreakTarget: number
  dailyStreakReward: string
}

export interface DnaStat {
  label: string
  value: string
  unit?: string
  peer: string
  color: 'purple' | 'warning'
}

export interface TraderTrait {
  name: string
  value: number
  max: number
  icon: 'target' | 'faceScan' | 'bomb' | 'bolt'
  barColor: 'purple' | 'orange' | 'none'
}

export interface StyleRow {
  label: string
  percentage: number
  isTop?: boolean
}

export const traderPassport: TraderPassport = {
  name: 'Tshepang Masuku',
  location: 'South Africa',
  level: 1,
  archetype: 'The News Sniper',
  archetypeDescription: 'Reacts in seconds. Volatility is the playground.',
  trades: 5,
  winRate: '0%',
  pctl: '1th',
  xpCurrent: 0,
  xpMax: 200,
  accounts: 5,
  greenDays: 0,
  streak: 0,
  dailyStreakDays: 1,
  dailyStreakTarget: 5,
  dailyStreakReward: '$5 credit',
}

export const dnaStats: DnaStat[] = [
  { label: 'PERCENTILE', value: '1', unit: 'th', peer: 'vs News Traders', color: 'purple' },
  { label: 'WIN RATE', value: '0', unit: '%', peer: 'peer 49%', color: 'warning' },
  { label: 'PROFIT FACTOR', value: '0.00', peer: 'peer 1.35', color: 'warning' },
  { label: 'AVG HOLD', value: '2m', peer: 'peer 22m', color: 'purple' },
]

export const traderTraits: TraderTrait[] = [
  { name: 'PRECISION', value: 0, max: 100, icon: 'target', barColor: 'none' },
  { name: 'PATIENCE', value: 12, max: 100, icon: 'faceScan', barColor: 'purple' },
  { name: 'AGGRESSION', value: 13, max: 100, icon: 'bomb', barColor: 'orange' },
  { name: 'EDGE', value: 0, max: 100, icon: 'bolt', barColor: 'none' },
]

export const styleCompositionLeft: StyleRow[] = [
  { label: 'News Traders', percentage: 48, isTop: true },
  { label: 'Momentum Traders', percentage: 36 },
  { label: 'Range Traders', percentage: 33 },
  { label: 'Breakout Traders', percentage: 27 },
  { label: 'Position Traders', percentage: 15 },
]

export const styleCompositionRight: StyleRow[] = [
  { label: 'Scalpers', percentage: 47 },
  { label: 'Mean-Reversion', percentage: 34 },
  { label: 'Trend Followers', percentage: 28 },
  { label: 'Swing Traders', percentage: 20 },
]

export const aiStrategySummary =
  'You are currently attempting to trade the fastest part of the market with zero precision and no identifiable edge. While you fit the archetype of a news sniper by reacting quickly to headlines, you lack the aggression and conviction necessary to actually capture the volatility you seek. Your data shows you are essentially an observer who enters late and exits without a plan, failing to execute even a single profitable trade. You must stop trading live news immediately and spend hours drilling entry execution in a simulator to bridge the gap between seeing a move and actually capturing it.'
