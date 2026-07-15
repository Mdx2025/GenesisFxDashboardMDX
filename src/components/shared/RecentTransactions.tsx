import { UsdtIcon } from './CoinIcons'
import { GlassCard, DividerGlow } from '@/components/ui'

interface Transaction {
  date: string
  type: 'Withdraw' | 'Deposit'
  amount: string
  status: string
}

interface RecentTransactionsProps {
  transactions: Transaction[]
  className?: string
}

export function RecentTransactions({ transactions, className = '' }: RecentTransactionsProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-normal mb-6 leading-[1.875rem]">Recent Transactions</h2>
      <GlassCard variant="heavy" rounded="19px">
        <div className="relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[31.25rem]">
              <thead>
                <tr>
                  {['Time (UTC+)', 'Type', 'Coin', 'Amount', 'Remark'].map(header => (
                    <th key={header} className={`${header === 'Time (UTC+)' ? 'px-6' : 'px-4'} pt-6 pb-4 text-left text-xs 3xl:text-base 4xl:text-xl font-bold uppercase tracking-[2.32px] text-gfx-neutral-300 whitespace-nowrap`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className={i > 0 ? 'border-t border-white/5' : ''}>
                    <td className="px-6 py-5 text-sm 3xl:text-lg 4xl:text-2xl text-white whitespace-nowrap">{tx.date}</td>
                    <td className="px-4 py-5 text-sm 3xl:text-lg 4xl:text-2xl text-white">{tx.type}</td>
                    <td className="px-4 py-5"><UsdtIcon size={30} /></td>
                    <td className={`px-4 py-5 text-sm 3xl:text-lg 4xl:text-2xl font-medium ${tx.type === 'Deposit' ? 'text-gfx-green-500' : 'text-gfx-red-muted'}`}>{tx.amount}</td>
                    <td className="px-4 py-5 text-sm 3xl:text-lg 4xl:text-2xl text-white">{tx.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
