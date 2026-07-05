import { GlassCard, SparkleButton, TradeButton, Badge, GreenDot, SearchInput } from '@/components/ui'
import { MoreDotsVerticalIcon, UserIcon } from '@/components/icons'
import { tradingAccounts } from '@/data/trading-accounts'

export function TradingAccountsTable() {
  return (
    <GlassCard variant="heavy" divider="white" rounded="19px">
      <div className="divider-green absolute top-0 left-[10%] right-[10%]" aria-hidden="true" />
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-btn text-white">Trading Accounts</h2>
            <Badge variant="status">2 ACTIVE</Badge>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput />
            <SparkleButton>
              <span className="flex items-center gap-2">
                <UserIcon size={16} color="#A0A0A0" />
                <span className="hidden sm:inline">New Account</span>
              </span>
            </SparkleButton>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="text-gfx-neutral-300 text-body2 border-b border-white/5">
                <th style={{ width: '12%' }} className="pb-3 4xl:pb-5 font-normal">Account</th>
                <th style={{ width: '11%' }} className="pb-3 4xl:pb-5 font-normal">Platform</th>
                <th style={{ width: '8%' }} className="pb-3 4xl:pb-5 font-normal">Type</th>
                <th style={{ width: '11%' }} className="pb-3 4xl:pb-5 font-normal text-right">Balance</th>
                <th style={{ width: '11%' }} className="pb-3 4xl:pb-5 font-normal text-right">Equity</th>
                <th style={{ width: '11%' }} className="pb-3 4xl:pb-5 font-normal text-right">Closed P&L</th>
                <th style={{ width: '11%' }} className="pb-3 4xl:pb-5 font-normal text-right">Open P&L</th>
                <th style={{ width: '7%' }} className="pb-3 4xl:pb-5 font-normal text-center">Status</th>
                <th style={{ width: '18%' }} className="pb-3 4xl:pb-5 font-normal text-right"></th>
              </tr>
            </thead>
            <tbody>
              {tradingAccounts.map((acc) => (
                <tr key={acc.account} className="border-b border-white/5 last:border-0">
                  <td className="py-4 4xl:py-6">
                    <div className="text-white text-sm 4xl:text-base">{acc.account}</div>
                    <div className="text-gfx-neutral-300 text-xs 4xl:text-sm">{acc.username}</div>
                  </td>
                  <td className="py-4 4xl:py-6 text-gfx-neutral-300 text-sm 4xl:text-base">{acc.platform}</td>
                  <td className="py-4"><Badge variant={acc.type}>{acc.type === 'genfx' ? 'GenFX' : '10X'}</Badge></td>
                  <td className="py-4 4xl:py-6 text-white text-sm 4xl:text-base text-right">{acc.balance}</td>
                  <td className="py-4 4xl:py-6 text-white text-sm 4xl:text-base text-right">{acc.equity}</td>
                  <td className={`py-4 4xl:py-6 text-sm 4xl:text-base text-right ${acc.closedPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.closedPL}</td>
                  <td className={`py-4 4xl:py-6 text-sm 4xl:text-base text-right ${acc.openPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.openPL}</td>
                  <td className="py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <GreenDot size={6} />
                      <span className="text-gfx-green-500 text-xs">{acc.status}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gfx-neutral-300 text-xs hover:text-white transition-colors">View</button>
                      <TradeButton>Trade</TradeButton>
                      <button className="text-gfx-neutral-300 hover:text-white transition-colors p-1" aria-label="More options">
                        <MoreDotsVerticalIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GlassCard>
  )
}
