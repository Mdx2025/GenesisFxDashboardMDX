import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SearchInput, GlowEllipse, ModeToggle } from '@/components/ui'
import { AvatarCircle, ExportButton, RefreshButton } from '@/components/partner/shared'

interface Trade {
  name: string
  email: string
  initials: string
  account: string
  instrument: string
  side: 'Buy' | 'Sell'
  size: string
  openPrice: string
  currentPrice: string
  openTime: string
  pnl: string
  pnlPositive: boolean
}

const TRADES: Trade[] = [
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', account: 'MT5-88210', instrument: 'NAS100', side: 'Buy', size: '1.50', openPrice: '1.08420', currentPrice: '1.08650', openTime: '2026-06-05 08:14', pnl: '+$345.00', pnlPositive: true },
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', account: 'MT5-88210', instrument: 'NAS100', side: 'Buy', size: '1.50', openPrice: '1.08420', currentPrice: '1.08650', openTime: '2026-06-05 08:14', pnl: '$-165.20', pnlPositive: false },
]

const TRADE_TABS = ['Open Positions', 'Closed Trades']

function SideBadge({ side }: { side: 'Buy' | 'Sell' }) {
  const isBuy = side === 'Buy'
  return (
    <span className={`inline-flex items-center justify-center px-[18px] h-[24px] rounded-[30px] border-[1.16px] text-xs font-acid leading-[18.8px] ${
      isBuy
        ? 'border-[#0C9104] text-[#37C92E]'
        : 'border-[#D46356] text-[#ff717e]'
    }`}>
      {side}
    </span>
  )
}

const GRID_COLS = 'grid-cols-[minmax(14rem,2fr)_minmax(6rem,0.8fr)_minmax(6rem,0.8fr)_minmax(4.5rem,0.6fr)_minmax(4rem,0.5fr)_minmax(6rem,0.8fr)_minmax(7rem,0.9fr)_minmax(9rem,1.1fr)_minmax(5.5rem,0.7fr)]'

export default function TradesPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)

  const breadcrumbItems = [
    { label: 'Trades', current: true },
  ]

  return (
    <>
      <div className="theme-decorative-glow absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-acid text-white pb-6 lg:pb-15">Referral Trades</h1>

        <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
          <div className="relative">
            <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

            <div className="theme-decorative-glow absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

            <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

            <div className="border-b border-gfx-green-800 px-6 py-0 h-[84px] flex items-center">
              <h2 className="text-2xl font-acid text-white">Trade Data</h2>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap px-4 sm:px-6 py-4">
              <div className="w-full sm:w-[298px]">
                <ModeToggle options={TRADE_TABS} activeIndex={activeTab} onChange={setActiveTab} size="sm" />
              </div>
              <div className="flex items-center gap-3">
                <SearchInput placeholder="Search " className="w-[200px] sm:w-[287px]" />
                <ExportButton />
                <RefreshButton />
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="border-b border-gfx-green-800 h-[40px] flex items-center px-6 min-w-[56rem]">
                <div className={`grid ${GRID_COLS} w-full items-center`}>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Referred Client</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Account</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Instrument</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Side</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Size</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Open Price</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Current Price</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Open Time</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">P&L</span>
                </div>
              </div>

              {TRADES.map((trade, i) => (
                <div key={i} className="border-b border-gfx-green-800 last:border-b-0 h-[76px] flex items-center px-6 min-w-[56rem]">
                  <div className={`grid ${GRID_COLS} w-full items-center`}>
                    <div className="flex items-center gap-4">
                      <AvatarCircle initials={trade.initials} />
                      <div>
                        <p className="text-base font-acid font-medium text-[#ececec] leading-[24.44px]">{trade.name}</p>
                        <p className="text-sm font-acid text-gfx-neutral-400 leading-[18.8px]">{trade.email}</p>
                      </div>
                    </div>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{trade.account}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{trade.instrument}</span>

                    <div>
                      <SideBadge side={trade.side} />
                    </div>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{trade.size}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{trade.openPrice}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{trade.currentPrice}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{trade.openTime}</span>

                    <span className={`text-sm font-acid leading-[18.8px] ${trade.pnlPositive ? 'text-[#37C92E]' : 'text-[#D46356]'}`}>{trade.pnl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
