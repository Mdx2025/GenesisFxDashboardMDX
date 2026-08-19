import { useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AcademyIcon,
  ChallengesIcon,
  DepositIcon,
  EyeIcon,
  LeaderboardsIcon,
  MarketNewsIcon,
  MoreDotsIcon,
  PieChartIcon,
  ReferralsIcon,
  SearchIcon,
  StreamingIcon,
  TransferIcon,
  UserIcon,
  UsersIcon,
  WithdrawIcon,
} from '@/components/icons'
import { Badge, GreenDot, SecondaryButton } from '@/components/ui'
import { tradingAccounts } from '@/data/trading-accounts'

type AccountFilter = 'all' | 'live' | 'demo'

interface Frame518DashboardProps {
  onTransferClick: () => void
}

interface FeatureCardProps {
  icon: ReactNode
  label: string
  glowSide: 'left' | 'right'
}

const FEATURE_CARDS: FeatureCardProps[] = [
  { label: 'Copy Trading', icon: <UsersIcon size={24} color="currentColor" />, glowSide: 'right' },
  { label: 'Trade Signals', icon: <StreamingIcon size={24} color="currentColor" />, glowSide: 'left' },
  { label: 'Pamm Funds', icon: <PieChartIcon size={24} color="currentColor" />, glowSide: 'right' },
  { label: 'Leaderboards', icon: <ChallengesIcon size={24} color="currentColor" />, glowSide: 'left' },
  { label: 'Copy Trading', icon: <LeaderboardsIcon size={24} color="currentColor" />, glowSide: 'right' },
  { label: 'Trade Signals', icon: <AcademyIcon size={24} color="currentColor" />, glowSide: 'left' },
  { label: 'Pamm Funds', icon: <MarketNewsIcon size={24} color="currentColor" />, glowSide: 'right' },
  { label: 'Leaderboards', icon: <ReferralsIcon size={24} color="currentColor" />, glowSide: 'left' },
]

const TABLE_GRID = '15% 11% 7.5% 10.8% 10.8% 10.8% 9.5% 6% auto'

function FeatureCard({ icon, label, glowSide }: FeatureCardProps) {
  return (
    <article className="group relative h-37 overflow-hidden rounded-[1.1602rem] border border-gfx-green-200 bg-gfx-green-800 shadow-[0_0.29rem_1.45rem_rgba(0,0,0,0.03)]">
      <div className={`pointer-events-none absolute -top-14 h-44 w-72 rounded-full bg-gfx-green-200/55 [filter:url(#blur-100)] ${glowSide === 'right' ? '-right-28' : '-left-28'}`} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-[2.5%] top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col justify-center px-5.5">
        <span className="flex size-10.5 items-center justify-center rounded-[0.729rem] bg-gfx-green-900 text-gfx-green-300">
          {icon}
        </span>
        <h2 className="ml-1 mt-2 font-acid text-base font-medium leading-[1.5275rem] text-white">{label}</h2>
      </div>
    </article>
  )
}

function BalanceHero({ onTransferClick }: Frame518DashboardProps) {
  const navigate = useNavigate()
  const [balanceVisible, setBalanceVisible] = useState(true)

  return (
    <section className="relative flex h-58.75 items-center overflow-hidden rounded-[1.1602rem] border border-gfx-green-200 bg-gfx-green-800 px-10 shadow-[0_0.29rem_1.45rem_rgba(0,0,0,0.03)]">
      <div className="pointer-events-none absolute -left-44 -top-24 h-[27rem] w-[52rem] rounded-full bg-gfx-green-200/65 [filter:url(#blur-157)]" aria-hidden="true" />
      <img className="pointer-events-none absolute -top-24 left-80 h-[25.2rem] w-[39.4rem] object-cover opacity-14" src="/images/pixels.png" alt="" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" aria-hidden="true" />

      <div className="relative z-10 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-acid text-base font-medium leading-[1.5275rem] text-gfx-neutral-400">Good afternoon, Marcelo</p>
          <button type="button" className="text-gfx-neutral-400 transition-colors hover:text-white" onClick={() => setBalanceVisible(value => !value)} aria-label={balanceVisible ? 'Hide balance' : 'Show balance'}>
            <EyeIcon open={balanceVisible} size={18} />
          </button>
        </div>
        <div className="mt-1 flex items-end gap-2">
          <p className="font-acid text-[3.125rem] font-normal leading-none text-white">{balanceVisible ? '$100.00' : '••••••'}</p>
          <span className="mb-1 font-acid text-2xl font-normal leading-none text-gfx-neutral-400">USD</span>
        </div>
        <p className="mt-2 font-acid text-base font-medium leading-[1.5275rem] text-gfx-green-300">+$0.00(+0.00%)</p>
      </div>

      <div className="relative z-10 ml-auto mr-1 hidden -translate-y-5.5 items-center gap-3.75 xl:flex">
        <SecondaryButton className="w-32.75" onClick={() => navigate('/deposit')}>
          <DepositIcon size={18} color="currentColor" />
          <span>Deposit</span>
        </SecondaryButton>
        <SecondaryButton className="w-35.75" onClick={() => navigate('/withdraw')}>
          <WithdrawIcon size={18} color="currentColor" />
          <span>Withdraw</span>
        </SecondaryButton>
        <SecondaryButton className="w-33.25" onClick={onTransferClick}>
          <TransferIcon size={18} color="currentColor" />
          <span>Transfer</span>
        </SecondaryButton>
        <SecondaryButton className="w-43.25 whitespace-nowrap" onClick={() => navigate('/tradelocker/accounts')}>
          <UserIcon size={18} color="currentColor" />
          <span>New Account</span>
        </SecondaryButton>
      </div>
    </section>
  )
}

function AccountTabs({ active, onChange }: { active: AccountFilter; onChange: (filter: AccountFilter) => void }) {
  const tabs: Array<{ value: AccountFilter; label: string }> = [
    { value: 'all', label: 'All Accounts' },
    { value: 'live', label: 'Live' },
    { value: 'demo', label: 'Demo' },
  ]

  return (
    <div className="grid h-11.5 w-[27.8125rem] max-w-full grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] rounded-full bg-white/4 xl:grid-cols-[10.5625rem_6.6875rem_6.6875rem]" role="tablist" aria-label="Account type">
      {tabs.map(tab => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={active === tab.value}
          className={`relative rounded-full font-acid text-base font-medium leading-[1.5275rem] transition-colors ${active === tab.value ? 'border border-gfx-green-300 bg-gfx-green-200 text-white' : 'text-gfx-neutral-300 hover:text-white'}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function Frame518AccountsTable({ filter, query }: { filter: AccountFilter; query: string }) {
  const navigate = useNavigate()
  const rows = useMemo(() => tradingAccounts.filter(account => {
    const matchesFilter = filter === 'all' || (filter === 'live' && account.status.toLowerCase() === 'live') || (filter === 'demo' && account.status.toLowerCase() === 'demo')
    const normalizedQuery = query.trim().toLowerCase()
    const matchesQuery = !normalizedQuery || [account.account, account.username, account.platform, account.type].some(value => value.toLowerCase().includes(normalizedQuery))
    return matchesFilter && matchesQuery
  }), [filter, query])

  return (
    <section className="relative min-h-64 overflow-hidden rounded-[1.1602rem] border border-gfx-green-200 bg-gfx-green-800 shadow-[0_0.29rem_1.45rem_rgba(0,0,0,0.03)]">
      <div className="pointer-events-none absolute -top-64 left-1/2 h-72 w-[31rem] -translate-x-1/2 rounded-full bg-gfx-green-200/40 [filter:url(#blur-157)]" aria-hidden="true" />
      <div className="h-9.5 border-b border-gfx-green-900" aria-hidden="true" />
      <div className="overflow-x-auto" data-lenis-prevent>
        <div className="min-w-[75rem]">
          <div className="grid h-10 items-center px-5.75" style={{ gridTemplateColumns: TABLE_GRID }}>
            {['Account', 'Platform', 'Type', 'Balance', 'Equity', 'Closed P&L', 'Open P&L', 'Status'].map(label => (
              <span key={label} className="font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-300">{label}</span>
            ))}
            <span />
          </div>

          {rows.map((account, index) => {
            const accountPath = `/tradelocker/accounts/${encodeURIComponent(account.account)}`
            return (
              <div key={account.account} className={`grid h-19 items-center px-5.75 ${index > 0 ? 'border-t border-gfx-green-900' : ''}`} style={{ gridTemplateColumns: TABLE_GRID }}>
                <div>
                  <p className="font-acid text-base font-medium leading-[1.5275rem] text-gfx-neutral-600">{account.account}</p>
                  <p className="font-acid text-sm font-normal leading-[1.175rem] text-gfx-neutral-300">{account.username}</p>
                </div>
                <p className="font-acid text-sm font-normal leading-[1.175rem] text-gfx-neutral-300">{account.platform}</p>
                <div><Badge variant={account.type}>{account.type === 'genfx' ? 'GenFX' : '10X'}</Badge></div>
                <p className="font-acid text-sm font-normal leading-[1.175rem] text-white">{account.balance}</p>
                <p className="font-acid text-sm font-normal leading-[1.175rem] text-white">{account.equity}</p>
                <p className={`font-acid text-sm font-normal leading-[1.175rem] ${account.closedPLColor === 'green' ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>{account.closedPL}</p>
                <p className={`font-acid text-sm font-normal leading-[1.175rem] ${account.openPLColor === 'green' ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>{account.openPL}</p>
                <div className="flex items-center gap-2"><GreenDot size={7} /><span className="font-acid text-sm text-white">{account.status}</span></div>
                <div className="flex items-center justify-end gap-6 pr-1.5">
                  <button type="button" className="font-acid text-sm text-gfx-neutral-400 transition-colors hover:text-white" onClick={() => navigate(accountPath)}>View</button>
                  <button type="button" className="h-11 w-26.5 rounded-full bg-[#F1FFFA] font-acid text-base font-medium text-black transition-colors hover:bg-[#D5FFF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gfx-green-300" onClick={() => navigate(accountPath)}>Trade</button>
                  <button type="button" className="text-gfx-neutral-400 transition-colors hover:text-white" aria-label={`More options for ${account.account}`}><MoreDotsIcon /></button>
                </div>
              </div>
            )
          })}

          {rows.length === 0 && <div className="flex h-38 items-center justify-center border-t border-gfx-green-900 font-acid text-sm text-gfx-neutral-400">No accounts found</div>}
        </div>
      </div>
      <div className="h-6.5" aria-hidden="true" />
    </section>
  )
}

export function Frame518Dashboard({ onTransferClick }: Frame518DashboardProps) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<AccountFilter>('all')
  const [query, setQuery] = useState('')

  return (
    <div className="frame-518-dashboard">
      <BalanceHero onTransferClick={onTransferClick} />

      <section className="ml-1 mt-13.5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Trading products">
        {FEATURE_CARDS.map((card, index) => <FeatureCard key={`${card.label}-${index}`} {...card} />)}
      </section>

      <div className="-ml-px mr-0.5 mt-[3.4375rem] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <AccountTabs active={filter} onChange={setFilter} />
        <div className="flex w-full items-center gap-2 lg:w-auto">
          <label className="relative block h-11 w-full lg:w-[17.9375rem]">
            <SearchIcon size={14} color="currentColor" className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-gfx-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search for"
              aria-label="Search accounts"
              className="h-full w-full rounded-full border border-gfx-green-200 bg-gfx-green-800 pl-11 pr-4 font-acid text-base text-white outline-none placeholder:text-gfx-neutral-400 focus:border-gfx-green-300"
            />
          </label>
          <SecondaryButton className="w-36.5 shrink-0" onClick={() => navigate('/tradelocker/accounts')}>
            <span className="text-xl leading-none">+</span>
            <span>Add New</span>
          </SecondaryButton>
        </div>
      </div>

      <div className="-ml-px mr-0.5 mt-6.5">
        <Frame518AccountsTable filter={filter} query={query} />
      </div>
    </div>
  )
}
