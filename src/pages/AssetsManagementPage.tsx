import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar, useTransfer } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, ModeToggle, FloatingNavBar, Badge, GlassSelect, GreenPillButton, GlassBannerCard } from '@/components/ui'
import { DepositIcon, WithdrawIcon, TransferIcon, ChevronDownIcon } from '@/components/icons'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'
import { assetTransactions, TAB_TO_TYPE } from '@/data/assets-history'
import { STATUS_STYLES } from '@/constants/colors'
import type { AssetTransaction, TransactionType, CoinType } from '@/data/assets-history'
import { useMemo } from 'react'

const TYPE_CONFIG: Record<TransactionType, { icon: typeof DepositIcon; label: string }> = {
  deposit: { icon: DepositIcon, label: 'Deposit' },
  withdraw: { icon: WithdrawIcon, label: 'Withdraw' },
  transfer: { icon: TransferIcon, label: 'Transfer' },
  credit: { icon: DepositIcon, label: 'Credit' },
}

const COIN_ICON_COLORS: Record<string, string> = {
  USDT: '#26A17B',
  BTC: '#F7931A',
  ETH: '#627EEA',
  USDC: '#2775CA',
}

function CoinLogo({ coin }: { coin: string }) {
  const bg = COIN_ICON_COLORS[coin] || '#A0A0A0'
  if (coin === 'USDT') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill={bg} />
        <path d="M13.4 10.9v-1.5h3.1V7H7.5v2.4h3.1v1.5c-2.7.1-4.7.7-4.7 1.4 0 .7 2 1.3 4.7 1.4v4.3h1.8v-4.3c2.7-.1 4.7-.7 4.7-1.4 0-.7-2-1.3-4.7-1.4zm0 2.3v0c-.1 0-.5 0-.9 0s-.7 0-.9 0v0c-2.4-.1-4.2-.6-4.2-1.1 0-.5 1.8-1 4.2-1.1v1.7c.2 0 .6 0 .9 0 .4 0 .7 0 .9 0v-1.7c2.4.1 4.2.6 4.2 1.1 0 .5-1.8 1-4.2 1.1z" fill="white" />
      </svg>
    )
  }
  if (coin === 'BTC') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill={bg} />
        <path d="M15.5 10.8c.2-1.4-0.8-2.1-2.3-2.6l.5-1.9-1.2-.3-.5 1.9c-.3-.1-.6-.2-1-.2l.5-1.9-1.2-.3-.5 1.9c-.3-.1-.5-.1-.7-.2l-1.6-.4-.3 1.3s.9.2.9.2c.5.1.6.4.5.7l-.5 2.1c0 0 .1 0 .1 0l-.1 0-.8 3c-.1.2-.2.4-.6.3 0 0-.9-.2-.9-.2l-.6 1.4 1.5.4c.3.1.6.1.8.2l-.5 2 1.2.3.5-1.9c.3.1.7.2 1 .3l-.5 1.9 1.2.3.5-2c2.1.4 3.6.2 4.3-1.6.5-1.5 0-2.3-1.1-2.9.8-.2 1.4-.7 1.5-1.8zm-2.8 3.9c-.4 1.5-2.8.7-3.6.5l.6-2.6c.8.2 3.4.6 3 2.1zm.4-3.9c-.3 1.3-2.3.7-3 .5l.6-2.3c.7.2 2.8.5 2.4 1.8z" fill="white" />
      </svg>
    )
  }
  if (coin === 'USDC') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill={bg} />
        <path d="M12 17.5c-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm0-10c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z" fill="white" />
        <path d="M13.2 13.6c0-.7-.5-1-1.5-1.1-.7-.1-0.9-.3-.9-.6 0-.3.3-.5.7-.5.4 0 .7.2.8.5l.7-.3c-.2-.5-.6-.8-1.1-.9V10h-.8v.7c-.7.2-1.2.7-1.2 1.3 0 .8.5 1.1 1.5 1.2.7.1.9.3.9.6 0 .4-.3.6-.8.6-.5 0-.8-.2-.9-.6l-.7.3c.2.5.7.9 1.2 1v.7h.8v-.7c.8-.1 1.3-.7 1.3-1.4z" fill="white" />
      </svg>
    )
  }
  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: bg }} /* dynamic */>
      <span className="text-[0.625rem] font-bold text-white">{coin.charAt(0)}</span>
    </div>
  )
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0427 1.04175H9.95602C9.2073 1.04173 8.58293 1.04171 8.08728 1.10834C7.56412 1.17868 7.09179 1.33341 6.71223 1.71296C6.33267 2.09252 6.17795 2.56486 6.10761 3.08802C6.05984 3.44332 6.04633 4.29298 6.04251 5.02146C4.3573 5.07651 3.34548 5.27323 2.64233 5.97639C1.66602 6.9527 1.66602 8.52405 1.66602 11.6667C1.66602 14.8094 1.66602 16.3808 2.64233 17.3571C3.61864 18.3334 5.18998 18.3334 8.33267 18.3334H11.666C14.8087 18.3334 16.3801 18.3334 17.3564 17.3571C18.3327 16.3808 18.3327 14.8094 18.3327 11.6667C18.3327 8.52405 18.3327 6.9527 17.3564 5.97639C16.6532 5.27323 15.6414 5.07651 13.9562 5.02146C13.9524 4.29298 13.9389 3.44332 13.8911 3.08802C13.8208 2.56486 13.666 2.09252 13.2865 1.71296C12.9069 1.33341 12.4346 1.17868 11.9114 1.10834C11.4158 1.04171 10.7914 1.04173 10.0427 1.04175ZM9.99935 7.70842C10.3445 7.70842 10.6243 7.98824 10.6243 8.33342V8.34194C11.5317 8.57053 12.291 9.28592 12.291 10.2779C12.291 10.623 12.0112 10.9029 11.666 10.9029C11.3208 10.9029 11.041 10.623 11.041 10.2779C11.041 9.95783 10.6862 9.51397 9.99935 9.51397C9.31251 9.51397 8.95768 9.95783 8.95768 10.2779C8.95768 10.5979 9.31251 11.0417 9.99935 11.0417C11.1535 11.0417 12.291 11.8415 12.291 13.0556C12.291 14.0476 11.5317 14.763 10.6243 14.9916V15.0001C10.6243 15.3453 10.3445 15.6251 9.99935 15.6251C9.65417 15.6251 9.37435 15.3453 9.37435 15.0001V14.9916C8.46703 14.763 7.70768 14.0476 7.70768 13.0556C7.70768 12.7105 7.9875 12.4306 8.33268 12.4306C8.67786 12.4306 8.95768 12.7105 8.95768 13.0556C8.95768 13.3757 9.31251 13.8195 9.99935 13.8195C10.6862 13.8195 11.041 13.3757 11.041 13.0556C11.041 12.7356 10.6862 12.2917 9.99935 12.2917C8.84523 12.2917 7.70768 11.492 7.70768 10.2779C7.70768 9.28592 8.46703 8.57053 9.37435 8.34194V8.33342C9.37435 7.98824 9.65417 7.70842 9.99935 7.70842Z" fill="currentColor" className="text-gfx-neutral-500" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M16.9717 7.63672H9.33398C8.39661 7.63672 7.63672 8.39661 7.63672 9.33398V16.9717C7.63672 17.9091 8.39661 18.6689 9.33398 18.6689H16.9717C17.9091 18.6689 18.6689 17.9091 18.6689 16.9717V9.33398C18.6689 8.39661 17.9091 7.63672 16.9717 7.63672Z" stroke="white" strokeWidth="1.69727" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.24316 12.7295H3.39453C2.94439 12.7295 2.51268 12.5507 2.19438 12.2324C1.87608 11.9141 1.69727 11.4824 1.69727 11.0322V3.39453C1.69727 2.94439 1.87608 2.51268 2.19438 2.19438C2.51268 1.87608 2.94439 1.69727 3.39453 1.69727H11.0322C11.4824 1.69727 11.9141 1.87608 12.2324 2.19438C12.5507 2.51268 12.7295 2.94439 12.7295 3.39453V4.24316" stroke="white" strokeWidth="1.69727" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function FilterDropdown({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <button
      className={`flex items-center justify-between gap-4 px-4 py-2.5 rounded-sm border border-white/[0.06] bg-white/[0.03] text-gfx-neutral-300 text-sm hover:border-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none ${wide ? 'min-w-[160px]' : 'min-w-[100px]'}`}
      aria-label={`Filter by ${label}`}
      aria-haspopup="listbox"
    >
      <span>{label}</span>
      <ChevronDownIcon />
    </button>
  )
}

function parseDate(dateStr: string): Date {
  return new Date(dateStr.replace(/,/, ''))
}

export default function AssetsManagementPage() {
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const { openTransfer } = useTransfer()
  const [activeTab, setActiveTab] = useState(0)
  const [filterType, setFilterType] = useState('all')
  const [filterTime, setFilterTime] = useState('all')
  const [filterCoin, setFilterCoin] = useState('all')

  const filteredTransactions = useMemo(() => {
    const tabType = TAB_TO_TYPE[activeTab]
    let filtered = assetTransactions.filter(tx => tx.type === tabType)

    if (filterType !== 'all') {
      filtered = filtered.filter(tx => tx.status === filterType)
    }

    if (filterCoin !== 'all') {
      filtered = filtered.filter(tx => tx.coin.toLowerCase() === filterCoin)
    }

    if (filterTime !== 'all') {
      const now = new Date()
      const cutoff = new Date()
      if (filterTime === '24h') cutoff.setDate(now.getDate() - 1)
      else if (filterTime === '7d') cutoff.setDate(now.getDate() - 7)
      else if (filterTime === '30d') cutoff.setDate(now.getDate() - 30)
      else if (filterTime === '90d') cutoff.setDate(now.getDate() - 90)
      filtered = filtered.filter(tx => parseDate(tx.date) >= cutoff)
    }

    return filtered
  }, [activeTab, filterType, filterTime, filterCoin])

  function resetFilters() {
    setFilterType('all')
    setFilterTime('all')
    setFilterCoin('all')
  }

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />
      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={[{ label: 'Assets Management', href: '/assets-management' }, { label: 'Funding', current: true }]}
        />

          <h1 className="text-white font-normal leading-none text-[clamp(1.5rem,0.75rem+1.5vw,3.5rem)]">Funding</h1>

          <section aria-label="Fiat Wallet" className="py-7 md:py-15">
            <GlassBannerCard contentClassName="py-8 px-5 xl:py-17 xl:px-8 3xl:py-21 3xl:px-10 4xl:py-26 4xl:px-14">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-[54px] h-[54px] rounded-[16px] bg-[#011b12] flex items-center justify-center shrink-0">
                    <WalletIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-[clamp(1.25rem,0.75rem+1vw,2.25rem)] font-normal leading-none">
                      Fiat Wallet
                    </h2>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white text-[clamp(1.25rem,0.75rem+1vw,2.25rem)] font-normal">$100.00</span>
                      <span className="text-gfx-neutral-500 text-[clamp(0.75rem,0.5rem+0.4vw,1.125rem)]">USD</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xl:shrink-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <SparkleButton onClick={() => navigate('/deposit')}>
                      <span className="flex items-center gap-2">
                        <DepositIcon />
                        <span>Deposit</span>
                      </span>
                    </SparkleButton>
                    <SparkleButton aria-label="Withdraw funds" onClick={() => navigate('/withdraw')}>
                      <span className="flex items-center gap-2">
                        <WithdrawIcon />
                        <span>Withdraw</span>
                      </span>
                    </SparkleButton>
                    <SparkleButton aria-label="Transfer funds" onClick={openTransfer}>
                      <span className="flex items-center gap-2">
                        <TransferIcon />
                        <span>Transfer</span>
                      </span>
                    </SparkleButton>
                  </div>
                  <div className="h-[100px] w-full min-w-0 -mt-3 relative">
                    <PortfolioChart config={{ ...defaultChartConfig, gridOpacity: 0, highlightIndex: -1 }} />
                  </div>
                </div>
              </div>
            </GlassBannerCard>
          </section>

          <div className="mb-4 md:mb-8 w-full max-w-xl">
            <ModeToggle options={['Deposits', 'Withdrawals', 'Transfers', 'Credits']} activeIndex={activeTab} onChange={(i) => { setActiveTab(i); resetFilters() }} />
          </div>

          <section aria-label="Assets History">
            <div className="flex items-center gap-3 mb-6 flex-wrap" role="group" aria-label="Transaction filters">
              <div className="w-[18rem]">
                <GlassSelect
                  size="sm"
                  placeholder="Type"
                  value={filterType}
                  onChange={setFilterType}
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'approved', label: 'Approved' },
                    { value: 'expired', label: 'Expired' },
                    { value: 'rejected', label: 'Rejected' },
                  ]}
                />
              </div>
              <div className="w-[18rem]">
                <GlassSelect
                  size="sm"
                  placeholder="Time"
                  value={filterTime}
                  onChange={setFilterTime}
                  options={[
                    { value: 'all', label: 'All Time' },
                    { value: '24h', label: 'Last 24h' },
                    { value: '7d', label: 'Last 7 Days' },
                    { value: '30d', label: 'Last 30 Days' },
                    { value: '90d', label: 'Last 90 Days' },
                  ]}
                />
              </div>
              <div className="w-[18rem]">
                <GlassSelect
                  size="sm"
                  placeholder="Coin"
                  value={filterCoin}
                  onChange={setFilterCoin}
                  options={[
                    { value: 'all', label: 'All Coins' },
                    { value: 'usdt', label: 'USDT' },
                    { value: 'btc', label: 'BTC' },
                    { value: 'usdc', label: 'USDC' },
                    { value: 'eth', label: 'ETH' },
                  ]}
                />
              </div>
              <GreenPillButton onClick={resetFilters}>Reset</GreenPillButton>
              <div className="ml-auto">
                <button className="p-2 rounded-sm border border-white/[0.06] bg-white/[0.03] text-gfx-neutral-500 hover:text-white hover:border-white/10 transition-colors cursor-pointer" aria-label="Export table">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>
              </div>
            </div>
            <GlassCard variant="heavy" divider="white" rounded="26px">
              <div className="divider-green absolute top-0 left-[10%] right-[10%]" aria-hidden="true" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[400px] h-[160px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-[1.1875rem] font-bold tracking-tight text-white">Assets History</h2>
                  <Badge variant="status">Total ({filteredTransactions.length} records)</Badge>
                </div>
              </div>

              <div className="overflow-x-auto" role="region" aria-label="Assets history table, scrollable">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-y border-white/5">
                      <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase px-4 sm:px-6 py-4 w-[8%]">Type</th>
                      <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[18%]">Deposit Address</th>
                      <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[12%]">Coin</th>
                      <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[10%]">Network</th>
                      <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[18%]">Date</th>
                      <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[12%]">Status</th>
                      <th className="text-right text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase pr-4 sm:pr-6 py-4 w-[10%]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((tx, i) => {
                      const { icon: Icon, label } = TYPE_CONFIG[tx.type]
                      const status = STATUS_STYLES[tx.status]
                      return (
                        <tr key={`${tx.type}-${tx.date}-${i}`} className={i > 0 ? 'border-t border-white/5' : ''}>
                          <td className="px-4 sm:px-6 py-4 xl:py-5">
                            <div className="flex items-center gap-3">
                              <Icon size={16} color="#A0A0A0" />
                              <span className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem]">{label}</span>
                            </div>
                          </td>
                          <td className="py-4 xl:py-5">
                            <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 cursor-pointer hover:opacity-80 transition-opacity bg-gfx-green-100">
                              <span className="text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] text-white truncate">{tx.address}</span>
                              <CopyIcon />
                            </div>
                          </td>
                          <td className="py-4 xl:py-5">
                            <div className="flex items-center gap-2">
                              <CoinLogo coin={tx.coin} />
                              <span className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] font-semibold">{tx.coin}</span>
                            </div>
                          </td>
                          <td className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] py-4 xl:py-5">{tx.network}</td>
                          <td className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] py-4 xl:py-5"><time>{tx.date}</time></td>
                          <td className="py-4 xl:py-5">
                            <span
                              className="inline-flex items-center text-[0.6875rem] font-normal capitalize tracking-wider rounded-full px-3 py-1"
                              style={{ background: status.bg, border: status.border, color: status.color }} /* dynamic */
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] font-semibold text-right pr-4 sm:pr-6 py-4 xl:py-5">{tx.amount}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="h-6" />
            </GlassCard>
          </section>
        </div>

      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingNavBar />
      </div>
    </>
  )
}
