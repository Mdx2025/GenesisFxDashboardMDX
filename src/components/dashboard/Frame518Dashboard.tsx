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
  StreamingIcon,
  TransferIcon,
  UserIcon,
  UsersIcon,
  WithdrawIcon,
} from '@/components/icons'
import {
  Badge,
  GlassBannerCard,
  GlassCard,
  GlowButton,
  GreenDot,
  ModeToggle,
  SearchInput,
  SparkleButton,
} from '@/components/ui'
import { tradingAccounts } from '@/data/trading-accounts'
import { openTradeLocker } from '@/constants/links'

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

const ACCOUNT_FILTER_OPTIONS = ['All Accounts', 'Live', 'Demo'] as const
const ACCOUNT_FILTER_VALUES: AccountFilter[] = ['all', 'live', 'demo']

function FeatureCard({ icon, label, glowSide }: FeatureCardProps) {
  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="1.1602rem"
      className="group h-37 overflow-hidden"
      role="article"
      data-feature-card
    >
      <div className={`pointer-events-none absolute -top-14 h-44 w-72 rounded-full bg-gfx-green-200/55 [filter:url(#blur-100)] ${glowSide === 'right' ? '-right-28' : '-left-28'}`} aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col justify-center px-5.5">
        <span className="flex size-10.5 items-center justify-center rounded-[0.729rem] bg-gfx-green-900 text-gfx-green-300">
          {icon}
        </span>
        <h2 className="ml-1 mt-2 font-acid text-base font-medium leading-[1.5275rem] text-white">{label}</h2>
      </div>
    </GlassCard>
  )
}

function BalanceHero({ onTransferClick }: Frame518DashboardProps) {
  const navigate = useNavigate()
  const [balanceVisible, setBalanceVisible] = useState(true)

  return (
    <section className="frame-518-balance-banner h-58.75">
      <GlassBannerCard className="h-full" contentClassName="flex h-full items-center px-10">
        <div className="min-w-0">
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

        <div className="ml-auto mr-1 hidden items-center gap-3.75 xl:flex" data-balance-actions>
          <SparkleButton className="px-6" onClick={() => navigate('/deposit')}>
            <DepositIcon size={18} color="currentColor" />
            <span>Deposit</span>
          </SparkleButton>
          <SparkleButton className="px-6" onClick={() => navigate('/withdraw')}>
            <WithdrawIcon size={18} color="currentColor" />
            <span>Withdraw</span>
          </SparkleButton>
          <SparkleButton className="px-6" onClick={onTransferClick}>
            <TransferIcon size={18} color="currentColor" />
            <span>Transfer</span>
          </SparkleButton>
          <SparkleButton className="px-6 whitespace-nowrap" onClick={() => navigate('/tradelocker/accounts')}>
            <UserIcon size={18} color="currentColor" />
            <span>New Account</span>
          </SparkleButton>
        </div>
      </GlassBannerCard>
    </section>
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
    <GlassCard variant="light" divider="white" rounded="1.1602rem" className="min-h-64 overflow-hidden" data-frame518-accounts-table>
      <div className="theme-decorative-glow pointer-events-none absolute -top-64 left-1/2 h-72 w-[31rem] -translate-x-1/2 rounded-full bg-gfx-glow-green [filter:url(#blur-157)]" aria-hidden="true" />
      <div className="h-9.5 border-b border-white/5" aria-hidden="true" />
      <div className="overflow-x-auto" role="region" aria-label="Trading accounts table, scrollable" data-lenis-prevent>
        <table className="w-full min-w-[75rem]">
          <thead>
            <tr className="h-10 border-b border-white/5">
              <th className="w-[15%] px-5.75 text-left font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-500">Account</th>
              <th className="w-[11%] text-left font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-500">Platform</th>
              <th className="w-[7.5%] text-left font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-500">Type</th>
              <th className="w-[10.8%] text-left font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-500">Balance</th>
              <th className="w-[10.8%] text-left font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-500">Equity</th>
              <th className="w-[10.8%] text-left font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-500">Closed P&amp;L</th>
              <th className="w-[9.5%] text-left font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-500">Open P&amp;L</th>
              <th className="w-[6%] text-left font-acid text-xs font-bold uppercase leading-[0.9802rem] tracking-[0.1452rem] text-gfx-neutral-500">Status</th>
              <th className="px-5.75 text-right"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(account => {
              const accountPath = `/tradelocker/accounts/${encodeURIComponent(account.account)}`
              return (
                <tr key={account.account} className="h-19 border-b border-white/5 last:border-b-0">
                  <td className="px-5.75 py-4">
                    <p className="font-acid text-base font-medium leading-[1.5275rem] text-gfx-neutral-600">{account.account}</p>
                    <p className="font-acid text-sm font-normal leading-[1.175rem] text-gfx-neutral-300">{account.username}</p>
                  </td>
                  <td className="py-4 font-acid text-sm font-normal leading-[1.175rem] text-gfx-neutral-300">{account.platform}</td>
                  <td className="py-4"><Badge variant={account.type}>{account.type === 'genfx' ? 'GenFX' : '10X'}</Badge></td>
                  <td className="py-4 font-acid text-sm font-normal leading-[1.175rem] text-white">{account.balance}</td>
                  <td className="py-4 font-acid text-sm font-normal leading-[1.175rem] text-white">{account.equity}</td>
                  <td className={`py-4 font-acid text-sm font-normal leading-[1.175rem] ${account.closedPLColor === 'green' ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>{account.closedPL}</td>
                  <td className={`py-4 font-acid text-sm font-normal leading-[1.175rem] ${account.openPLColor === 'green' ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>{account.openPL}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2"><GreenDot size={7} /><span className="font-acid text-sm text-white">{account.status}</span></div>
                  </td>
                  <td className="py-4 pl-4 pr-5.75">
                    <div className="flex items-center justify-end gap-6">
                      <button type="button" className="font-acid text-sm text-gfx-neutral-400 transition-colors hover:text-white" onClick={() => navigate(accountPath)}>View</button>
                      <GlowButton label="Trade" width={106} height={44} fontSize={16} onClick={openTradeLocker} />
                      <button type="button" className="text-gfx-neutral-400 transition-colors hover:text-white" aria-label={`More options for ${account.account}`}><MoreDotsIcon /></button>
                    </div>
                  </td>
                </tr>
              )
            })}

            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="h-38 text-center font-acid text-sm text-gfx-neutral-400">No accounts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="h-6.5" aria-hidden="true" />
    </GlassCard>
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
        <div className="w-[27.8125rem] max-w-full [&_.mode-toggle]:h-11.5" data-account-filter>
          <ModeToggle
            options={[...ACCOUNT_FILTER_OPTIONS]}
            activeIndex={ACCOUNT_FILTER_VALUES.indexOf(filter)}
            onChange={index => setFilter(ACCOUNT_FILTER_VALUES[index] ?? 'all')}
            buttonClassName="font-medium"
          />
        </div>
        <div className="flex w-full items-center gap-2 lg:w-auto">
          <SearchInput
            value={query}
            onChange={setQuery}
            className="w-full lg:w-[17.9375rem] [&_input]:h-11 [&_input]:bg-gfx-green-800 [&_input]:pl-11 [&_input]:text-base"
          />
          <SparkleButton className="w-36.5 shrink-0 px-4" onClick={() => navigate('/tradelocker/accounts')} data-add-account>
            <span className="text-xl leading-none">+</span>
            <span>Add New</span>
          </SparkleButton>
        </div>
      </div>

      <div className="-ml-px mr-0.5 mt-6.5">
        <Frame518AccountsTable filter={filter} query={query} />
      </div>
    </div>
  )
}
