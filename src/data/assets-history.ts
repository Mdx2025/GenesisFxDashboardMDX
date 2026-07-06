export interface AssetTransaction {
  type: 'deposit' | 'withdraw' | 'transfer'
  address: string
  coin: 'USDT' | 'BTC' | 'ETH'
  amount: string
  network: string
  date: string
  status: 'pending' | 'canceled' | 'routed'
  total: string
}

export const assetTransactions: AssetTransaction[] = [
  { type: 'deposit', address: 'brlarn@bitsmail.a...', coin: 'USDT', amount: '$90.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'pending', total: '$990.00' },
  { type: 'withdraw', address: 'brlarn@bitsmail.a...', coin: 'BTC', amount: '$80.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'canceled', total: '$900.00' },
  { type: 'transfer', address: 'brlarn@bitsmail.a...', coin: 'USDT', amount: '$80.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'routed', total: '$900.00' },
  { type: 'deposit', address: 'brlarn@bitsmail.a...', coin: 'USDT', amount: '$120.00', network: 'ETH', date: 'Apr 20, 2026 09:15', status: 'routed', total: '$1,120.00' },
  { type: 'withdraw', address: 'brlarn@bitsmail.a...', coin: 'ETH', amount: '$50.00', network: 'ETH', date: 'Apr 19, 2026 14:22', status: 'pending', total: '$950.00' },
  { type: 'transfer', address: 'brlarn@bitsmail.a...', coin: 'BTC', amount: '$200.00', network: 'ETH', date: 'Apr 18, 2026 11:40', status: 'routed', total: '$1,200.00' },
]
