export interface AssetTransaction {
  type: 'deposit' | 'withdraw' | 'transfer'
  address: string
  coin: 'USDT' | 'BTC' | 'USDC' | 'ETH'
  amount: string
  network: string
  date: string
  status: 'pending' | 'approved' | 'expired'
  total: string
}

export const assetTransactions: AssetTransaction[] = [
  { type: 'deposit', address: 'bctqm8983xmq8', coin: 'USDT', amount: '$100.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'pending', total: '$1,000.00' },
  { type: 'withdraw', address: 'bctqm8983xmq8', coin: 'BTC', amount: '$100.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'approved', total: '$900.00' },
  { type: 'transfer', address: 'bctqm8983xmq8', coin: 'USDC', amount: '$100.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'expired', total: '$800.00' },
]
