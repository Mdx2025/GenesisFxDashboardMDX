export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
  active?: boolean
  activeOn?: string[]
  disabled?: boolean
  opensModal?: string
  submenu?: { label: string; href: string; disabled?: boolean }[]
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/home' },
  { id: 'assets', label: 'Assets Management', icon: 'assets', href: '/assets-management', activeOn: ['/deposit', '/withdraw'] },
  { id: 'tradelocker', label: 'Tradelocker', icon: 'tradelocker', href: '#', submenu: [
    { label: 'Accounts', href: '/tradelocker/accounts' },
    { label: 'Journal', href: '/tradelocker/journal' },
    { label: 'Platforms', href: '/tradelocker/accounts?tab=platforms' },
  ]},
  { id: 'challenges', label: '10x Challenges', icon: 'challenges', href: '/challenges' },
  { id: 'gensocial', label: 'GenSocial', icon: 'gensocial', href: '#', submenu: [
    { label: 'PAMM', href: '/gensocial/pamm' },
    { label: 'Copy Trading', href: '/gensocial/copy-trading' },
    { label: 'Signals', href: '/gensocial/signals' },
    { label: 'Download App', href: '/download' },
  ]},
  { id: 'leaderboards', label: 'Leaderboards', icon: 'leaderboards', href: '/leaderboards', opensModal: 'claim-username' },
  { id: 'streaming', label: 'Streaming', icon: 'streaming', href: '/streaming', opensModal: 'claim-username-streaming' },
  { id: 'news', label: 'Market Watch', icon: 'news', href: '/news' },
  { id: 'academy', label: 'Academy', icon: 'academy', href: '/academy' },
]

export const partnerNavItems: NavItem[] = [
  { id: 'ib-dashboard', label: 'IB Dashboard', icon: 'ib-dashboard', href: '/partner' },
  { id: 'referrals', label: 'Referrals', icon: 'referrals', href: '/partner/referrals' },
  { id: 'links', label: 'Links', icon: 'links', href: '/partner/links' },
  { id: 'trades', label: 'Trades', icon: 'trades', href: '/partner/trades' },
  { id: 'comissions', label: 'Comissions', icon: 'comissions', href: '/partner/comissions' },
  { id: 'payouts', label: 'Payouts', icon: 'payouts', href: '/partner/payouts' },
  { id: 'marketing', label: 'Marketing', icon: 'marketing', href: '/partner/marketing' },
  { id: 'statistics', label: 'Statistics', icon: 'statistics', href: '/partner/statistics' },
]
