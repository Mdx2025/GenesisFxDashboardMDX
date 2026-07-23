export interface TradeSession {
  id: string
  city: string
  time: string
  status: 'open' | 'closed'
  countdown: string
  countdownLabel: 'Opens' | 'Closes'
  lat: number
  lon: number
}

export const tradeSessions: TradeSession[] = [
  { id: 'sydney', city: 'Sydney', time: '04:07 AM', status: 'closed', countdown: '2h 53m', countdownLabel: 'Opens', lat: -33.87, lon: 151.21 },
  { id: 'newYork', city: 'New York', time: '12:07 PM', status: 'open', countdown: '4h 53m', countdownLabel: 'Closes', lat: 40.71, lon: -74.0 },
  { id: 'tokyo', city: 'Tokyo', time: '02:07 AM', status: 'closed', countdown: '6h 53m', countdownLabel: 'Opens', lat: 35.68, lon: 139.65 },
  { id: 'london', city: 'London', time: '05:07 PM', status: 'closed', countdown: '14h 53m', countdownLabel: 'Opens', lat: 51.5, lon: -0.12 },
]
