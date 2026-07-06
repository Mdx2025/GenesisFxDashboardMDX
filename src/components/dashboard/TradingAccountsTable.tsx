import { GlassCard, SparkleButton, TradeButton, Badge, GreenDot, SearchInput } from '@/components/ui'
import { GLOW_GREEN } from '@/constants/colors'
import { MoreDotsVerticalIcon, UserIcon } from '@/components/icons'
import { tradingAccounts } from '@/data/trading-accounts'

const GRID_COLS = '15% 11% 7.5% 10.8% 10.8% 10.8% 9.5% 6% auto'

export function TradingAccountsTable() {
  return (
    <GlassCard variant="heavy" divider="white" rounded="26px">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[500px] h-[200px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
      <div className="divider-green absolute top-0 left-[10%] right-[10%]" aria-hidden="true" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 xl:px-10 pt-6 xl:pt-8 pb-4 xl:pb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[19px] font-bold tracking-tight text-white">Trading Accounts</h2>
          <Badge variant="status">2 ACTIVE</Badge>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none min-w-0">
            <SearchInput />
          </div>
          <SparkleButton>
            <span className="flex items-center gap-2">
              <UserIcon size={18} color="#A0A0A0" />
              <span>New Account</span>
            </span>
          </SparkleButton>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div
            className="grid items-center px-4 sm:px-6 xl:px-10 py-4 border-y border-white/5"
            style={{ gridTemplateColumns: GRID_COLS }} /* dynamic value */
          >
            <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Account</span>
            <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Platform</span>
            <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Type</span>
            <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Balance</span>
            <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Equity</span>
            <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Closed P&L</span>
            <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Open P&L</span>
            <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Status</span>
            <span />
          </div>

          {tradingAccounts.map((acc, i) => (
            <div
              key={acc.account}
              className={`grid items-center px-4 sm:px-6 xl:px-10 py-4 xl:py-6 ${i > 0 ? 'border-t border-white/5' : ''}`}
              style={{ gridTemplateColumns: GRID_COLS }} /* dynamic value */
            >
              <div>
                <p className="text-white text-[15px] font-bold leading-tight">{acc.account}</p>
                <p className="text-gfx-neutral-300 text-[13px] mt-0.5">{acc.username}</p>
              </div>
              <p className="text-[15px] text-white/60">{acc.platform}</p>
              <div>
                <Badge variant={acc.type}>{acc.type === 'genfx' ? 'GenFX' : '10X'}</Badge>
              </div>
              <p className="text-white text-[15px] font-semibold">{acc.balance}</p>
              <p className="text-white text-[15px] font-semibold">{acc.equity}</p>
              <p className={`text-[15px] font-semibold ${acc.closedPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.closedPL}</p>
              <p className={`text-[15px] font-semibold ${acc.openPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.openPL}</p>
              <div className="flex items-center gap-2">
                <GreenDot size={8} />
                <span className="text-gfx-neutral-300 text-[14px]">{acc.status}</span>
              </div>
              <div className="flex items-center justify-end gap-6">
                <button className="text-gfx-neutral-300 text-[14px] hover:text-white transition-colors">View</button>
                <TradeButton>Trade</TradeButton>
                <button className="text-gfx-neutral-300 hover:text-white transition-colors text-lg tracking-widest" aria-label="More options">
                  ···
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-6" />
    </GlassCard>
  )
}
