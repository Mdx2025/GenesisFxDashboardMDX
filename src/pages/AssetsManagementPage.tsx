import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, Breadcrumb, FloatingNavBar } from '@/components/ui'
import { DepositIcon, WithdrawIcon, TransferIcon, ChevronDownIcon } from '@/components/icons'
import { AreaChart } from '@/components/charts/AreaChart'
import { assetTransactions } from '@/data/assets-history'
import type { AssetTransaction } from '@/data/assets-history'

const tabs = ['Deposits', 'Withdrawals', 'Transfers', 'Credits'] as const

const statusStyles: Record<AssetTransaction['status'], { bg: string; border: string; color: string }> = {
  pending: { bg: 'rgba(226,157,88,0.10)', border: '1px solid rgba(226,157,88,0.25)', color: '#e29d58' },
  canceled: { bg: 'rgba(255,77,106,0.10)', border: '1px solid rgba(255,77,106,0.25)', color: '#ff4d6a' },
  routed: { bg: 'rgba(16,188,131,0.10)', border: '1px solid rgba(16,188,131,0.25)', color: '#10BC83' },
}

const coinStyles: Record<string, { bg: string; border: string; color: string }> = {
  USDT: { bg: 'rgba(0,240,160,0.10)', border: '1px solid rgba(0,240,160,0.15)', color: '#10BC83' },
  BTC: { bg: 'rgba(255,180,0,0.12)', border: '1px solid rgba(255,180,0,0.20)', color: '#e29d58' },
  ETH: { bg: 'rgba(91,156,245,0.12)', border: '1px solid rgba(91,156,245,0.20)', color: '#5b9cf5' },
}

const typeIcons: Record<AssetTransaction['type'], { icon: typeof DepositIcon; label: string }> = {
  deposit: { icon: DepositIcon, label: 'Deposit' },
  withdraw: { icon: WithdrawIcon, label: 'Withdraw' },
  transfer: { icon: TransferIcon, label: 'Transfer' },
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0427 1.04175H9.95602C9.2073 1.04173 8.58293 1.04171 8.08728 1.10834C7.56412 1.17868 7.09179 1.33341 6.71223 1.71296C6.33267 2.09252 6.17795 2.56486 6.10761 3.08802C6.05984 3.44332 6.04633 4.29298 6.04251 5.02146C4.3573 5.07651 3.34548 5.27323 2.64233 5.97639C1.66602 6.9527 1.66602 8.52405 1.66602 11.6667C1.66602 14.8094 1.66602 16.3808 2.64233 17.3571C3.61864 18.3334 5.18998 18.3334 8.33267 18.3334H11.666C14.8087 18.3334 16.3801 18.3334 17.3564 17.3571C18.3327 16.3808 18.3327 14.8094 18.3327 11.6667C18.3327 8.52405 18.3327 6.9527 17.3564 5.97639C16.6532 5.27323 15.6414 5.07651 13.9562 5.02146C13.9524 4.29298 13.9389 3.44332 13.8911 3.08802C13.8208 2.56486 13.666 2.09252 13.2865 1.71296C12.9069 1.33341 12.4346 1.17868 11.9114 1.10834C11.4158 1.04171 10.7914 1.04173 10.0427 1.04175ZM9.99935 7.70842C10.3445 7.70842 10.6243 7.98824 10.6243 8.33342V8.34194C11.5317 8.57053 12.291 9.28592 12.291 10.2779C12.291 10.623 12.0112 10.9029 11.666 10.9029C11.3208 10.9029 11.041 10.623 11.041 10.2779C11.041 9.95783 10.6862 9.51397 9.99935 9.51397C9.31251 9.51397 8.95768 9.95783 8.95768 10.2779C8.95768 10.5979 9.31251 11.0417 9.99935 11.0417C11.1535 11.0417 12.291 11.8415 12.291 13.0556C12.291 14.0476 11.5317 14.763 10.6243 14.9916V15.0001C10.6243 15.3453 10.3445 15.6251 9.99935 15.6251C9.65417 15.6251 9.37435 15.3453 9.37435 15.0001V14.9916C8.46703 14.763 7.70768 14.0476 7.70768 13.0556C7.70768 12.7105 7.9875 12.4306 8.33268 12.4306C8.67786 12.4306 8.95768 12.7105 8.95768 13.0556C8.95768 13.3757 9.31251 13.8195 9.99935 13.8195C10.6862 13.8195 11.041 13.3757 11.041 13.0556C11.041 12.7356 10.6862 12.2917 9.99935 12.2917C8.84523 12.2917 7.70768 11.492 7.70768 10.2779C7.70768 9.28592 8.46703 8.57053 9.37435 8.34194V8.33342C9.37435 7.98824 9.65417 7.70842 9.99935 7.70842Z" fill="#A0A0A0"/>
    </svg>
  )
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] text-gfx-neutral-300 text-sm hover:border-white/10 transition-colors cursor-pointer">
      <span>{label}</span>
      <ChevronDownIcon />
    </button>
  )
}

export default function AssetsManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="flex w-full min-h-screen bg-gfx-main text-white font-acid">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none" style={{ top: '-30%', background: '#104030', filter: 'url(#blur-157)', willChange: 'transform' }} aria-hidden="true" />
        <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
          <TopBar menuOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(v => !v)} />

          <div className="mt-4 sm:mt-0 mb-2">
            <Breadcrumb items={[{ label: 'Assets Management', href: '/assets-management' }, { label: 'Funding', current: true }]} />
          </div>

          <h1 className="text-white font-normal leading-none mb-6" style={{ fontSize: 'clamp(1.5rem, 0.75rem + 1.5vw, 3.5rem)' }}>Funding</h1>

          {/* Fiat Wallet + Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
            <GlassCard variant="heavy" divider="green" rounded="26px">
              <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[400px] h-[160px] rounded-full pointer-events-none" style={{ background: '#104030', filter: 'url(#blur-120)', willChange: 'transform' }} aria-hidden="true" />
              <div className="relative z-10 p-6 xl:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gfx-neutral-300 text-body2">Fiat Wallet</span>
                  <WalletIcon />
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-white font-normal" style={{ fontSize: 'clamp(2rem, 1.5rem + 1.5vw, 3.5rem)' }}>$100.00</span>
                  <span className="text-gfx-neutral-300 text-body2">USD</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gfx-neutral-500 text-sm">Trade Credit</span>
                  <span className="text-white text-sm font-semibold">$0.00</span>
                  <button className="text-gfx-green-500 text-sm hover:underline cursor-pointer">Redeem</button>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <SparkleButton>
                    <span className="flex items-center gap-2">
                      <DepositIcon />
                      <span>Deposit</span>
                    </span>
                  </SparkleButton>
                  <SparkleButton>
                    <span className="flex items-center gap-2">
                      <WithdrawIcon />
                      <span>Withdraw</span>
                    </span>
                  </SparkleButton>
                  <SparkleButton>
                    <span className="flex items-center gap-2">
                      <TransferIcon />
                      <span>Transfer</span>
                    </span>
                  </SparkleButton>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="light" divider="none" rounded="26px">
              <div className="relative h-full min-h-[200px] p-6">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle, #10BC83 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }} aria-hidden="true" />
                <AreaChart className="h-full relative z-10" />
              </div>
            </GlassCard>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-full text-sm font-normal transition-colors cursor-pointer ${
                  activeTab === i
                    ? 'bg-gfx-green-500/20 text-gfx-green-500 border border-gfx-green-500/30'
                    : 'text-gfx-neutral-300 hover:text-white border border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <FilterDropdown label="Type" />
            <FilterDropdown label="Time" />
            <FilterDropdown label="Coin" />
            <button className="px-4 py-2.5 rounded-full text-sm text-gfx-neutral-300 hover:text-white transition-colors cursor-pointer">
              Reset
            </button>
          </div>

          {/* Assets History Table */}
          <GlassCard variant="heavy" divider="white" rounded="26px">
            <div className="px-4 sm:px-6 xl:px-10 pt-6 xl:pt-8 pb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-[19px] font-bold tracking-tight text-white">Assets History</h2>
                <span className="text-gfx-neutral-500 text-sm">Total 16 records</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid items-center px-4 sm:px-6 xl:px-10 py-4 border-y border-white/5" style={{ gridTemplateColumns: '10% 20% 8% 10% 8% 16% 10% auto' }}>
                  <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Type</span>
                  <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Deposit Address</span>
                  <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase" />
                  <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase" />
                  <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Fees</span>
                  <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Date</span>
                  <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Status</span>
                  <span />
                </div>

                {assetTransactions.map((tx, i) => {
                  const { icon: Icon, label } = typeIcons[tx.type]
                  const coin = coinStyles[tx.coin]
                  const status = statusStyles[tx.status]
                  return (
                    <div
                      key={i}
                      className={`grid items-center px-4 sm:px-6 xl:px-10 py-4 xl:py-5 ${i > 0 ? 'border-t border-white/5' : ''}`}
                      style={{ gridTemplateColumns: '10% 20% 8% 10% 8% 16% 10% auto' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                          <Icon size={16} color="#A0A0A0" />
                        </div>
                        <span className="text-white text-[14px]">{label}</span>
                      </div>

                      <p className="text-[14px] text-gfx-neutral-300 truncate pr-4">{tx.address}</p>

                      <div>
                        <span
                          className="inline-flex items-center text-[11px] font-normal uppercase tracking-wider rounded-full px-2.5 py-1"
                          style={{ background: coin.bg, border: coin.border, color: coin.color }}
                        >
                          {tx.coin}
                        </span>
                      </div>

                      <p className="text-white text-[14px] font-semibold">{tx.amount}</p>

                      <p className="text-gfx-neutral-300 text-[14px]">{tx.network}</p>

                      <p className="text-gfx-neutral-300 text-[14px]">{tx.date}</p>

                      <div>
                        <span
                          className="inline-flex items-center text-[11px] font-normal capitalize tracking-wider rounded-full px-2.5 py-1"
                          style={{ background: status.bg, border: status.border, color: status.color }}
                        >
                          {tx.status}
                        </span>
                      </div>

                      <p className="text-white text-[14px] font-semibold text-right">{tx.total}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="h-6" />
          </GlassCard>
        </div>

        <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <FloatingNavBar />
        </div>
      </main>
    </div>
  )
}
