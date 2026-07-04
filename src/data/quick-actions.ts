export interface QuickAction {
  icon: string
  title: string
  subtitle: string
}

export const quickActions: QuickAction[] = [
  { icon: 'deposit', title: 'Deposit Funds', subtitle: 'Add capital to wallet' },
  { icon: 'user', title: 'New Account', subtitle: 'Open trading account' },
  { icon: 'chart', title: 'Market News', subtitle: 'Latest market updates' },
  { icon: 'book', title: 'Journal', subtitle: 'Review trading log' },
]
