import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'
import { GlassCard } from './GlassCard'
import { GlassBannerCard } from './GlassBannerCard'
import { PeriodPill } from './PeriodPill'
import { SparkleButton } from './SparkleButton'

interface ChallengeDrawdownCardProps {
  amount: string
  equity: string
  breachFloor: string
  bufferRemaining: string
  progress?: number
}

/** Challenge drawdown summary on the canonical GenesisFX banner surface. */
export function ChallengeDrawdownCard({
  amount,
  equity,
  breachFloor,
  bufferRemaining,
  progress = 20,
}: ChallengeDrawdownCardProps) {
  const boundedProgress = Math.min(100, Math.max(0, progress))

  return (
    <GlassBannerCard
      rounded="19px"
      className="challenge-drawdown-card min-h-[16.75rem]"
      contentClassName="relative flex min-h-[16.75rem] flex-col justify-between px-5 py-7 sm:px-8 sm:py-10"
      data-challenge-drawdown-banner
    >
      <div className="flex items-start justify-between gap-8">
          <div>
            <p className="font-acid text-xs font-bold uppercase leading-[15.68px] tracking-[2.323px] text-gfx-neutral-500">
              Drawdown to breach floor
            </p>
            <p className="mt-4 font-acid text-4xl font-normal leading-none text-white sm:text-[2.25rem]">
              {amount}<span className="ml-1.5 text-sm text-gfx-neutral-400">left</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-acid text-xs font-bold uppercase leading-[15.68px] tracking-[2.323px] text-gfx-neutral-500">
              Buffer remaining
            </p>
            <p className="mt-4 font-acid text-4xl font-normal leading-none text-gfx-bullish-emphasis sm:text-[2.25rem]">
              {bufferRemaining}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="relative h-2.5 overflow-visible rounded-full bg-gfx-green-50">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#40c99c] via-[#10bc83] to-[#ecfff9] shadow-[0_0_14px_4px_rgba(207,242,230,0.58)]"
              style={{ width: `${boundedProgress}%` }}
              data-challenge-drawdown-progress
            />
          </div>
          <div className="mt-5 flex items-center justify-between gap-6 font-acid text-sm leading-[18.8px] text-gfx-neutral-400">
            <span>Equity {equity}</span>
            <span className="text-right">Breach floor (10% DD) {breachFloor}</span>
          </div>
      </div>
    </GlassBannerCard>
  )
}

interface ChallengeMetricCardProps {
  label: string
  value: string
  valueClassName?: string
  glow?: 'left' | 'right'
}

/** Compact 148px metric surface used by challenge details dashboards. */
export function ChallengeMetricCard({ label, value, valueClassName = 'text-white', glow = 'right' }: ChallengeMetricCardProps) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="min-h-[7.5rem] overflow-hidden sm:min-h-[9.25rem]">
      <div
        className={`pointer-events-none absolute top-[-4rem] h-[14rem] w-[16rem] rounded-full bg-gfx-glow-green opacity-50 blur-[95px] ${glow === 'right' ? '-right-[7rem]' : '-left-[7rem]'}`}
        aria-hidden="true"
      />
      <div className="relative flex min-h-[7.5rem] flex-col justify-center px-4 py-4 sm:min-h-[9.25rem] sm:px-6 sm:py-5">
        <p className="font-acid text-sm font-normal leading-[18.8px] text-gfx-neutral-500">{label}</p>
        <p className={`mt-2 font-acid text-2xl font-normal leading-none sm:text-4xl ${valueClassName}`}>{value}</p>
      </div>
    </GlassCard>
  )
}

interface ChallengePerformanceCardProps {
  title?: string
  actions?: ReactNode
}

/** Challenge performance panel using the design system's portfolio chart. */
export function ChallengePerformanceCard({ title = 'Performance Chart', actions }: ChallengePerformanceCardProps) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="min-h-[35rem] overflow-hidden xl:min-h-[40.75rem]">
      <div className="relative flex min-h-[35rem] flex-col px-5 py-7 sm:px-7 sm:py-9 xl:min-h-[40.75rem]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-acid text-2xl font-normal leading-none text-white">{title}</h2>
          {actions ?? <PeriodPill fillOnMobile />}
        </div>
        <div className="relative mt-7 h-[27rem] shrink-0 overflow-hidden xl:h-[32rem]">
          <PortfolioChart config={defaultChartConfig} />
        </div>
      </div>
    </GlassCard>
  )
}

interface ChallengeAccountDetailsCardProps {
  onWithdraw?: () => void
}

const accountDetailColumns = [
  [
    { label: 'Trading power', value: '$1,250.00 (10×)', valueClassName: 'text-gfx-value-positive' },
    { label: 'Breach floor (10% DD)', value: '$1,125.00', valueClassName: 'text-gfx-value-negative' },
    { label: 'Trading days', value: '0 / 5', valueClassName: 'text-gfx-value-warning' },
    { label: 'Opened', value: 'Jul 29, 2026', valueClassName: 'text-white' },
  ],
  [
    { label: 'Deposit', value: '$125.00', valueClassName: 'text-white' },
    { label: 'Buffer to floor', value: '$125.00 · 100%', valueClassName: 'text-gfx-value-positive' },
    { label: 'Available to cash out', value: '$125.00', valueClassName: 'text-white' },
    { label: 'Net P&L', value: '+$0.00', valueClassName: 'text-gfx-value-positive' },
  ],
]

/** Account funding and drawdown ledger shown below challenge performance. */
export function ChallengeAccountDetailsCard({ onWithdraw }: ChallengeAccountDetailsCardProps) {
  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="19px"
      className="overflow-hidden"
      data-challenge-account-details
    >
      <div className="relative px-5 py-7 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-acid text-2xl font-normal leading-none text-white">Account details</h2>
          <SparkleButton
            className="!h-11 !min-w-[7.25rem] !rounded-3xl !px-5"
            onClick={onWithdraw}
          >
            Withdraw
          </SparkleButton>
        </div>

        <div className="mt-7 grid gap-x-12 lg:grid-cols-2">
          {accountDetailColumns.map((column, columnIndex) => (
            <dl key={columnIndex} className={columnIndex === 1 ? 'border-t border-gfx-surface-divider lg:border-t-0' : ''}>
              {column.map((item) => (
                <div
                  key={item.label}
                  className="grid min-h-10 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-gfx-surface-divider py-2 last:border-b-0"
                >
                  <dt className="min-w-0 font-acid text-sm font-normal leading-5 text-gfx-neutral-500">{item.label}</dt>
                  <dd className={`max-w-[13rem] text-right font-acid text-base font-medium leading-5 ${item.valueClassName}`}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          ))}
        </div>

        <p className="mt-6 rounded-xl border border-gfx-warning/40 bg-gfx-glow-amber px-4 py-3 font-acid text-sm font-normal leading-5 text-gfx-warning">
          Trade on 5 more days to unlock cash-out. You can always cash out at breakeven or a loss once 5 trading days are met.
        </p>
      </div>
    </GlassCard>
  )
}

interface ChallengeTradesCardProps {
  onStartTrading?: () => void
}

const challengeTradeTabs = [
  {
    label: 'Open Positions',
    title: 'No open positions. The markets are waiting!',
  },
  {
    label: 'Closed Trades',
    title: 'No closed trades yet.',
  },
]

function TradeArrowsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.75 6h10.5m0 0-2.5-2.5M14.25 6l-2.5 2.5M14.25 12H3.75m0 0 2.5 2.5M3.75 12l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Keyboard-operable challenge trade tabs with honest empty states. */
export function ChallengeTradesCard({ onStartTrading }: ChallengeTradesCardProps) {
  const [activeTab, setActiveTab] = useState(0)
  const tabsId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeState = challengeTradeTabs[activeTab]

  const selectFromKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()

    let nextIndex = index
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = challengeTradeTabs.length - 1
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + challengeTradeTabs.length) % challengeTradeTabs.length
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % challengeTradeTabs.length

    setActiveTab(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="19px"
      className="min-h-[19rem] overflow-hidden sm:min-h-[20rem]"
      data-challenge-trades
    >
      <div className="relative flex min-h-[19rem] flex-col px-5 py-7 sm:min-h-[20rem] sm:px-7">
        <div className="flex border-b border-gfx-surface-divider" role="tablist" aria-label="Challenge trades">
          {challengeTradeTabs.map((tab, index) => {
            const selected = index === activeTab
            return (
              <button
                key={tab.label}
                ref={(node) => { tabRefs.current[index] = node }}
                id={`${tabsId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${tabsId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(index)}
                onKeyDown={(event) => selectFromKeyboard(event, index)}
                className={`relative min-h-11 px-1 pb-3 pt-2 font-acid text-base font-medium leading-5 transition-colors first:mr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gfx-green-500 ${selected ? 'text-white after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-gfx-green-300' : 'text-gfx-neutral-500 hover:text-white [[data-theme=light]_&]:text-gfx-neutral-600'}`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          id={`${tabsId}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-${activeTab}`}
          tabIndex={0}
          className="flex flex-1 flex-col items-center justify-center px-2 py-12 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500"
        >
          <p className="font-acid text-xl font-normal leading-7 text-white sm:text-2xl">{activeState.title}</p>
          {activeTab === 0 && (
            <SparkleButton className="mt-7 !h-11 !min-w-[9.5rem] !rounded-3xl !px-5" onClick={onStartTrading}>
              <TradeArrowsIcon />
              Start Trading
            </SparkleButton>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
