export interface QuickAction {
  icon: string
  title: string
  subtitle: string
  href: string
}

export const quickActions: QuickAction[] = [
  { icon: 'deposit', title: 'Deposit Funds', subtitle: 'Add capital to wallet', href: '/deposit' },
  { icon: 'user', title: 'New Account', subtitle: 'Open trading account', href: '/tradelocker/accounts' },
  { icon: 'chart', title: 'Market News', subtitle: 'Latest market updates', href: '/news' },
  { icon: 'book', title: 'Journal', subtitle: 'Review trading log', href: '/tradelocker/journal' },
]
