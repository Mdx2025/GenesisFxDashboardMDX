import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, Badge, GreenDot, SearchInput, GlowButton, GlassSelect, ModeToggle } from '@/components/ui'
import type { GlassSelectOption } from '@/components/ui/GlassSelect'
import { UserIcon } from '@/components/icons'
import { tradingAccounts } from '@/data/trading-accounts'

const FILTER_TABS = ['All Accounts', 'Live', 'Demo', 'Platforms'] as const

const TYPE_OPTIONS: GlassSelectOption[] = [
  { value: 'all', label: 'All Types' },
  { value: 'genfx', label: 'GenFX' },
  { value: '10x', label: '10X' },
]

const GRID_COLS = '15% 11% 7.5% 10.8% 10.8% 10.8% 9.5% 6% auto'

export default function AccountsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Dashboard', href: '/home' },
          { label: 'Accounts', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 pb-12">
        {/* Title + Subtitle */}
        <div>
          <h1 className="text-white text-h1 font-normal">TradeLocker Accounts</h1>
          <p className="text-gfx-neutral-300 text-body2 mt-2">Choose yor preferred withdrawal  method to get started</p>
        </div>

        {/* Filter Tabs */}
        <div className="w-full max-w-lg">
          <ModeToggle options={[...FILTER_TABS]} activeIndex={activeTab} onChange={setActiveTab} />
        </div>

        {/* Type Dropdown */}
        <div className="w-[10.5rem]">
          <GlassSelect
            options={TYPE_OPTIONS}
            placeholder="Type"
            size="sm"
          />
        </div>

        {/* Trading Accounts Table */}
        <GlassCard variant="heavy" divider="white" rounded="26px">
          <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[500px] h-[200px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 xl:px-10 pt-6 xl:pt-8 pb-4 xl:pb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-[1.1875rem] font-bold tracking-tight text-white">Trading Accounts</h2>
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
                style={{ gridTemplateColumns: GRID_COLS }}
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
                  style={{ gridTemplateColumns: GRID_COLS }}
                >
                  <div>
                    <p className="text-white text-[0.9375rem] font-bold leading-tight">{acc.account}</p>
                    <p className="text-gfx-neutral-300 text-[0.8125rem] mt-0.5">{acc.username}</p>
                  </div>
                  <p className="text-[0.9375rem] text-white/60">{acc.platform}</p>
                  <div>
                    <Badge variant={acc.type}>{acc.type === 'genfx' ? 'GenFX' : '10X'}</Badge>
                  </div>
                  <p className="text-white text-[0.9375rem] font-semibold">{acc.balance}</p>
                  <p className="text-white text-[0.9375rem] font-semibold">{acc.equity}</p>
                  <p className={`text-[0.9375rem] font-semibold ${acc.closedPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.closedPL}</p>
                  <p className={`text-[0.9375rem] font-semibold ${acc.openPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.openPL}</p>
                  <div className="flex items-center gap-2">
                    <GreenDot size={8} />
                    <span className="text-gfx-neutral-300 text-[0.875rem]">{acc.status}</span>
                  </div>
                  <div className="flex items-center justify-end gap-6">
                    <button className="text-gfx-neutral-300 text-[0.875rem] hover:text-white transition-colors cursor-pointer">View</button>
                    <GlowButton label="Trade" width={100} height={36} fontSize={14} />
                    <button className="text-gfx-neutral-300 hover:text-white transition-colors text-lg tracking-widest cursor-pointer" aria-label="More options">
                      ···
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-6" />
        </GlassCard>
      </div>
    </div>
  )
}
