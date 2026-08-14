import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar, useTransfer } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, ModeToggle, Badge, GlassSelect, GreenPillButton, GlassBannerCard, EmptyState, SuccessSnackbar } from '@/components/ui'
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
      <span className="text-tiny font-bold text-white">{coin.charAt(0)}</span>
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
      className={`flex items-center justify-between gap-4 px-4 py-2.5 rounded-sm border border-white/[0.06] bg-white/[0.03] text-gfx-neutral-500 text-sm hover:border-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none ${wide ? 'min-w-[160px]' : 'min-w-[100px]'}`}
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
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [copied, setCopied] = useState(false)
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
      <SuccessSnackbar open={copied} message="Address copied to clipboard" duration={2000} onClose={() => setCopied(false)} />
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />
      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={[{ label: 'Assets Management', href: '/assets-management' }, { label: 'Funding', current: true }]}
        />

          <h1 className="text-white font-normal leading-none text-hero-lg mt-6 3xl:mt-8 4xl:mt-10">Funding</h1>

          <section aria-label="Fiat Wallet" className="py-7 md:py-15">
            <GlassBannerCard contentClassName="py-8 px-5 xl:py-17 xl:px-13 3xl:py-21 3xl:px-16 4xl:py-26 4xl:px-20">
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
                <div className="flex flex-col gap-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-gfx-neutral-400 text-2xl font-normal leading-none">
                      Fiat Wallet
                    </h2>
                    <button className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer" aria-label="Toggle balance visibility" onClick={() => setBalanceVisible(v => !v)}>
                      {balanceVisible ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M3.98 8.223A10.477 10.477 0 001.934 12.1c1.292 4.338 5.31 7.5 10.066 7.5 1.79 0 3.483-.45 4.95-1.238M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65a3 3 0 01-4.243-4.243m4.242 4.242L10.878 9.879" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-5xl font-normal leading-none">{balanceVisible ? '$100.00' : '****'}</span>
                    <span className="text-gfx-neutral-500 text-2xl font-normal">{balanceVisible ? 'USD' : ''}</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-md px-4 py-3 bg-transparent border border-gfx-green-200">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
                      <rect x="1" y="5" width="18" height="13" rx="2" stroke="#00B38C" strokeWidth="1.4" fill="none"/>
                      <path d="M5 5V4a3 3 0 013-3h4a3 3 0 013 3v1" stroke="#00B38C" strokeWidth="1.4" strokeLinecap="round"/>
                      <rect x="7" y="9" width="6" height="4" rx="1" fill="#00B38C"/>
                    </svg>
                    <span className="text-gfx-neutral-500 text-sm">Trade Credit</span>
                    <span className="text-white text-sm font-medium">{balanceVisible ? '$0.00' : '****'}</span>
                    <button className="ml-auto text-gfx-green-500 text-sm font-medium hover:text-white transition-colors cursor-pointer">Redeem</button>
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
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-gfx-neutral-250 p-2.5 cursor-pointer transition-colors hover:border-gfx-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gfx-main"
                  aria-label="Export table"
                >
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden="true">
                    <path d="M20.3708 3.46447C18.9063 2 16.5493 2 11.8352 2C7.12119 2 4.76417 2 3.2997 3.46447C2.54222 4.22195 2.17653 5.21824 2 6.65598C2.53066 6.06532 3.16829 5.57328 3.8843 5.20846C4.66578 4.81027 5.50258 4.6488 6.4291 4.5731C7.32423 4.49997 8.42564 4.49998 9.7724 4.5H13.8981C15.2448 4.49998 16.3462 4.49997 17.2414 4.5731C18.1679 4.6488 19.0047 4.81027 19.7862 5.20846C20.5022 5.57328 21.1398 6.06532 21.6705 6.65598C21.4939 5.21824 21.1283 4.22195 20.3708 3.46447Z" fill="#A0A0A0" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 14.6562C2 11.856 2 10.4559 2.54497 9.3863C3.02433 8.44549 3.78924 7.68058 4.73005 7.20122C5.79961 6.65625 7.19974 6.65625 10 6.65625H14C16.8003 6.65625 18.2004 6.65625 19.27 7.20122C20.2108 7.68058 20.9757 8.44549 21.455 9.3863C22 10.4559 22 11.856 22 14.6562C22 17.4565 22 18.8566 21.455 19.9262C20.9757 20.867 20.2108 21.6319 19.27 22.1113C18.2004 22.6562 16.8003 22.6562 14 22.6562H10C7.19974 22.6562 5.79961 22.6562 4.73005 22.1113C3.78924 21.6319 3.02433 20.867 2.54497 19.9262C2 18.8566 2 17.4565 2 14.6562ZM12.5303 18.1866C12.3897 18.3272 12.1989 18.4062 12 18.4062C11.8011 18.4062 11.6103 18.3272 11.4697 18.1866L8.96967 15.6866C8.67678 15.3937 8.67678 14.9188 8.96967 14.6259C9.26256 14.333 9.73744 14.333 10.0303 14.6259L11.25 15.8456V11.6562C11.25 11.242 11.5858 10.9062 12 10.9062C12.4142 10.9062 12.75 11.242 12.75 11.6562V15.8456L13.9697 14.6259C14.2626 14.333 14.7374 14.333 15.0303 14.6259C15.3232 14.9188 15.3232 15.3937 15.0303 15.6866L12.5303 18.1866Z" fill="#808080" />
                  </svg>
                </button>
              </div>
            </div>
            <GlassCard variant="light" divider="white" rounded="26px" className="overflow-hidden">
              <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[400px] h-[160px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold tracking-tight text-white">Assets History</h2>
                  <Badge variant="status">Total ({filteredTransactions.length} records)</Badge>
                </div>
              </div>

              <div className="overflow-x-auto" role="region" aria-label="Assets history table, scrollable">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-y border-white/5">
                      <th className="text-left text-xs font-bold tracking-label text-gfx-neutral-500 uppercase px-4 sm:px-6 py-4 w-[8%]">Type</th>
                      <th className="text-left text-xs font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[18%]">Deposit Address</th>
                      <th className="text-left text-xs font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[12%]">Coin</th>
                      <th className="text-left text-xs font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[10%]">Network</th>
                      <th className="text-left text-xs font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[18%]">Date</th>
                      <th className="text-left text-xs font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[12%]">Status</th>
                      <th className="text-right text-xs font-bold tracking-label text-gfx-neutral-500 uppercase pr-4 sm:pr-6 py-4 w-[10%]">Amount</th>
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
                              <span className="text-white text-sm 3xl:text-lg 4xl:text-2xl">{label}</span>
                            </div>
                          </td>
                          <td className="py-4 xl:py-5">
                            <button
                              type="button"
                              onClick={() => { navigator.clipboard.writeText(tx.address); setCopied(true) }}
                              className="inline-flex items-center gap-3 rounded-full px-4 py-2 cursor-pointer hover:opacity-80 transition-opacity bg-gfx-green-100"
                            >
                              <span className="optical-text text-sm 3xl:text-lg 4xl:text-2xl text-white truncate">{tx.address}</span>
                              <CopyIcon />
                            </button>
                          </td>
                          <td className="py-4 xl:py-5">
                            <div className="flex items-center gap-2">
                              <CoinLogo coin={tx.coin} />
                              <span className="text-white text-sm 3xl:text-lg 4xl:text-2xl font-semibold">{tx.coin}</span>
                            </div>
                          </td>
                          <td className="text-white text-sm 3xl:text-lg 4xl:text-2xl py-4 xl:py-5">{tx.network}</td>
                          <td className="text-white text-sm 3xl:text-lg 4xl:text-2xl py-4 xl:py-5"><time>{tx.date}</time></td>
                          <td className="py-4 xl:py-5">
                            <span
                              className="inline-flex items-center text-xs font-normal capitalize tracking-wider rounded-full px-3 py-1"
                              style={{ background: status.bg, border: status.border, color: status.color }} /* dynamic */
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="text-white text-sm 3xl:text-lg 4xl:text-2xl font-semibold text-right pr-4 sm:pr-6 py-4 xl:py-5">{tx.amount}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {filteredTransactions.length === 0 && (
                <div className="py-8 px-6">
                  <EmptyState title="No records found" description="There are no transactions matching your current filters." />
                </div>
              )}

              <div className="h-6" />
            </GlassCard>
          </section>
        </div>

    </>
  )
}
