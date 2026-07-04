export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/', active: true },
  { id: 'assets', label: 'Assets Management', icon: 'assets', href: '/assets' },
  { id: 'tradelocker', label: 'Tradelocker', icon: 'tradelocker', href: '#', submenu: [
    { label: 'Accounts', href: '/tradelocker/accounts' },
    { label: 'Journal', href: '/tradelocker/journal' },
    { label: 'Platforms', href: '/tradelocker/platforms' },
  ]},
  { id: 'challenges', label: '10x Challenges', icon: 'challenges', href: '/challenges' },
  { id: 'pamm', label: 'PAMM Portal', icon: 'pamm', href: '/pamm' },
  { id: 'news', label: 'Market News', icon: 'news', href: '/news' },
  { id: 'academy', label: 'Genesis Academy', icon: 'academy', href: '/academy' },
];
