export interface TradingAccount {
  account: string
  username: string
  platform: string
  type: 'genfx' | '10x'
  balance: string
  equity: string
  closedPL: string
  closedPLColor: 'green' | 'red'
  openPL: string
  openPLColor: 'green' | 'red'
  status: string
}

export const tradingAccounts: TradingAccount[] = [
  {
    account: 'L#716445',
    username: 'MarceloCed',
    platform: 'TradeLocker',
    type: 'genfx',
    balance: '$12,450.00',
    equity: '$11,246.00',
    closedPL: '+$6,437.21',
    closedPLColor: 'green',
    openPL: '-$1,204.00',
    openPLColor: 'red',
    status: 'Live',
  },
  {
    account: 'L#718302',
    username: 'MarceloCed',
    platform: 'TradeLocker',
    type: '10x',
    balance: '$5,447.30',
    equity: '$4,891.00',
    closedPL: '-$892.15',
    closedPLColor: 'red',
    openPL: '+$332.70',
    openPLColor: 'green',
    status: 'Live',
  },
]
