export type TransactionType = 'deposit' | 'withdraw' | 'transfer' | 'credit'
export type TransactionStatus = 'pending' | 'approved' | 'expired' | 'rejected'
export type CoinType = 'USDT' | 'BTC' | 'USDC' | 'ETH'

export interface AssetTransaction {
  type: TransactionType
  address: string
  coin: CoinType
  amount: string
  network: string
  date: string
  status: TransactionStatus
  total: string
}

export const assetTransactions: AssetTransaction[] = [
  // Deposits
  { type: 'deposit', address: 'bctqm8983xmq8', coin: 'USDT', amount: '$100.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'pending', total: '$1,000.00' },
  { type: 'deposit', address: '0x4f2e9a71cb3', coin: 'ETH', amount: '$2,500.00', network: 'ETH', date: 'Apr 18, 2026 09:12', status: 'approved', total: '$3,500.00' },
  { type: 'deposit', address: 'bc1qxy2kgdyg', coin: 'BTC', amount: '$5,000.00', network: 'BTC', date: 'Apr 15, 2026 14:05', status: 'approved', total: '$8,500.00' },
  { type: 'deposit', address: '0x7d1f3b8c9e2', coin: 'USDC', amount: '$750.00', network: 'ETH', date: 'Apr 10, 2026 16:42', status: 'expired', total: '$9,250.00' },
  { type: 'deposit', address: 'TRx8nHq7ypWk', coin: 'USDT', amount: '$300.00', network: 'TRC20', date: 'Mar 28, 2026 11:20', status: 'approved', total: '$9,550.00' },
  { type: 'deposit', address: '0xa9c3d7e1f54', coin: 'ETH', amount: '$1,200.00', network: 'ETH', date: 'Mar 15, 2026 08:30', status: 'approved', total: '$10,750.00' },

  // Withdrawals
  { type: 'withdraw', address: 'bctqm8983xmq8', coin: 'BTC', amount: '$100.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'approved', total: '$900.00' },
  { type: 'withdraw', address: '0x9b3f2c8d1a7', coin: 'USDT', amount: '$500.00', network: 'ETH', date: 'Apr 19, 2026 10:15', status: 'pending', total: '$400.00' },
  { type: 'withdraw', address: 'bc1q5y7k3m9p', coin: 'BTC', amount: '$1,000.00', network: 'BTC', date: 'Apr 12, 2026 15:30', status: 'approved', total: '$7,500.00' },
  { type: 'withdraw', address: '0x2e8f4a6c3d1', coin: 'ETH', amount: '$800.00', network: 'ETH', date: 'Apr 05, 2026 09:45', status: 'rejected', total: '$8,300.00' },
  { type: 'withdraw', address: 'TJx7mPq3yrNk', coin: 'USDC', amount: '$250.00', network: 'TRC20', date: 'Mar 22, 2026 14:10', status: 'approved', total: '$8,050.00' },

  // Transfers
  { type: 'transfer', address: 'bctqm8983xmq8', coin: 'USDC', amount: '$100.00', network: 'ETH', date: 'Apr 21, 2026 12:36', status: 'expired', total: '$800.00' },
  { type: 'transfer', address: '0x6c9d3a7e2f1', coin: 'USDT', amount: '$200.00', network: 'ETH', date: 'Apr 17, 2026 11:22', status: 'approved', total: '$600.00' },
  { type: 'transfer', address: '0x1a5b8c4d7e3', coin: 'ETH', amount: '$1,500.00', network: 'ETH', date: 'Apr 08, 2026 16:55', status: 'approved', total: '$7,000.00' },
  { type: 'transfer', address: 'bc1q8k2n5p7m', coin: 'BTC', amount: '$3,000.00', network: 'BTC', date: 'Mar 30, 2026 13:18', status: 'pending', total: '$4,000.00' },

  // Credits
  { type: 'credit', address: 'PROMO-2026Q2', coin: 'USDT', amount: '$50.00', network: 'ETH', date: 'Apr 20, 2026 00:00', status: 'approved', total: '$50.00' },
  { type: 'credit', address: 'REF-8X7K2M', coin: 'USDC', amount: '$25.00', network: 'ETH', date: 'Apr 14, 2026 00:00', status: 'approved', total: '$75.00' },
  { type: 'credit', address: 'BONUS-TRADE', coin: 'USDT', amount: '$100.00', network: 'ETH', date: 'Mar 25, 2026 00:00', status: 'pending', total: '$175.00' },
  { type: 'credit', address: 'CASHBACK-Q1', coin: 'BTC', amount: '$15.00', network: 'BTC', date: 'Mar 01, 2026 00:00', status: 'approved', total: '$190.00' },
]

export const TAB_TO_TYPE: Record<number, TransactionType | null> = {
  0: 'deposit',
  1: 'withdraw',
  2: 'transfer',
  3: 'credit',
}
