export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
  active?: boolean
  activeOn?: string[]
  submenu?: { label: string; href: string }[]
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
    { label: 'PAMM', href: '/pamm' },
    { label: 'Copy Trading', href: '/copy-trading' },
    { label: 'Signals', href: '/signals' },
  ]},
  { id: 'news', label: 'Market News', icon: 'news', href: '/news' },
  { id: 'academy', label: 'Genesis Academy', icon: 'academy', href: '/academy' },
]
