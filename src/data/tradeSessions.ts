export interface TradeSession {
  city: string
  time: string
  status: 'open' | 'closed'
  countdown: string
  countdownLabel: 'Opens' | 'Closes'
}

export const tradeSessions: TradeSession[] = [
  { city: 'Sydney', time: '04:07 AM', status: 'closed', countdown: '2h 53m', countdownLabel: 'Opens' },
  { city: 'New York', time: '12:07 PM', status: 'open', countdown: '4h 53m', countdownLabel: 'Closes' },
  { city: 'Tokyo', time: '02:07 AM', status: 'closed', countdown: '6h 53m', countdownLabel: 'Opens' },
  { city: 'London', time: '05:07 PM', status: 'closed', countdown: '14h 53m', countdownLabel: 'Opens' },
]
