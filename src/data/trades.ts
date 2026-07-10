export interface Trade {
  dateTime: string
  instrument: string
  side: 'Buy' | 'Sell'
  size: string
  entry: string
  exit: string
  exitPositive: boolean
  netPnl: string
  netPnlPositive: boolean
}

export const tradeHistory: Trade[] = [
  {
    dateTime: 'Apr 21, 2026 12:36',
    instrument: 'NAS100',
    side: 'Buy',
    size: '10.00',
    entry: '$13,102.50',
    exit: '+$2,841.71',
    exitPositive: true,
    netPnl: '$-155.20',
    netPnlPositive: false,
  },
]
