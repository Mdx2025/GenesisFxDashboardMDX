import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, ModeToggle, GlowEllipse, TradingCalendar, PeriodPill } from '@/components/ui'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'
import { CopySubscriptionModal } from '@/components/dashboard/CopySubscriptionModal'
import { ProfileHeader, ProfileHeaderPill } from '@/components/dashboard/ProfileHeader'

/* ─── Inline SVG Icons ─── */

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="#808080" strokeWidth="1.2"/>
      <path d="M9 8V13" stroke="#808080" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="9" cy="5.5" r="0.75" fill="#808080"/>
    </svg>
  )
}

function GraphUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 7H22V13" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PieChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M21.21 15.89A10 10 0 118 2.83" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 12A10 10 0 0012 2V12H22Z" fill="#10BC83" opacity="0.3" stroke="#10BC83" strokeWidth="1.5"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#10BC83" strokeWidth="1.5"/>
      <path d="M16 2V6M8 2V6M3 10H21" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChartUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M18 15L12 9L8 13L2 7" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 3V9H16" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-4 6)"/>
    </svg>
  )
}

function StatInfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12V9" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 6H9.00833" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─── Performance Calendar Grid ─── */

type MonthEntry = { month: string; value: string | null; type: 'positive' | 'negative' | 'empty' }

const monthlyPerformance: MonthEntry[] = [
  { month: 'Jan', value: '+139.90%', type: 'positive' },
  { month: 'Feb', value: '+3.42%', type: 'positive' },
  { month: 'Mar', value: '+3.42%', type: 'negative' },
  { month: 'Apr', value: '+3.42%', type: 'negative' },
  { month: 'May', value: null, type: 'empty' },
  { month: 'Jun', value: null, type: 'empty' },
  { month: 'Jul', value: null, type: 'empty' },
  { month: 'Aug', value: null, type: 'empty' },
  { month: 'Sep', value: null, type: 'empty' },
  { month: 'Oct', value: null, type: 'empty' },
  { month: 'Nov', value: null, type: 'empty' },
  { month: 'Dec', value: null, type: 'empty' },
]

const CELL_STYLES = {
  positive: 'bg-gfx-green-900 border border-gfx-green-300',
  negative: 'bg-gfx-red-surface border border-gfx-red-deep',
  empty: 'border border-gfx-green-200',
} as const

const TEXT_STYLES = {
  positive: 'text-gfx-green-300',
  negative: 'text-gfx-red-muted',
  empty: '',
} as const

function PerformanceGrid() {
  return (
    <>
      <div className="relative">
        <div className="flex items-start">
          <div className="flex flex-col items-start w-[3.75rem] flex-shrink-0">
            <span className="text-gfx-neutral-600 text-base font-acid font-medium leading-6">Year</span>
            <div className="h-11 flex items-center mt-3">
              <span className="text-gfx-neutral-600 text-base font-acid font-medium leading-6">2026</span>
            </div>
          </div>
          <div className="flex-1 flex gap-2.5">
            {monthlyPerformance.map(m => (
              <div key={m.month} className="flex flex-col items-center flex-1 min-w-0">
                <span className="text-gfx-neutral-600 text-base font-acid font-medium leading-6 mb-3">{m.month}</span>
                <div className={`w-full h-11 rounded-sm flex items-center justify-center ${CELL_STYLES[m.type]}`}>
                  {m.value && <span className={`text-base font-acid font-medium leading-6 ${TEXT_STYLES[m.type]}`}>{m.value}</span>}
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <span className="text-gfx-neutral-600 text-base font-acid font-medium leading-6 mb-3">Ann</span>
              <div className={`w-full h-11 rounded-sm flex items-center justify-center ${CELL_STYLES.positive}`}>
                <span className={`text-base font-acid font-medium leading-6 ${TEXT_STYLES.positive}`}>+3.42%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 0.5H18C18.8284 0.5 19.5 1.17157 19.5 2V18C19.5 18.8284 18.8284 19.5 18 19.5H2C1.17157 19.5 0.5 18.8284 0.5 18V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="#09241C" stroke="#00B38C"/></svg>
            <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">Positive turn</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="#2A1411" stroke="#7F3B34"/></svg>
            <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">Negative turn</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#064B34"/></svg>
            <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">No trades</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Trading Statistics ─── */

type StatRow = { label: string; value: string; valueColor?: string; progressBar?: { percent: number } }

const leftStats: StatRow[] = [
  { label: 'Total Trades', value: '266' },
  { label: 'Profit Factor', value: '1.05' },
  { label: 'Total Volume', value: '29.88' },
  { label: 'Consecutive Wins', value: '8' },
  { label: 'Consecutive Losses', value: '11' },
  { label: 'Monthly Average', value: '+6.72%', valueColor: '#37C92E' },
]

const rightStats: StatRow[] = [
  { label: 'Win Rate', value: '38.35%', progressBar: { percent: 38.35 } },
  { label: 'Risk-Reward Ratio', value: '0.59' },
  { label: 'Average Loss', value: '-$52.37', valueColor: '#D46356' },
  { label: 'Average Win', value: '8' },
  { label: 'Best Trade', value: '11' },
  { label: 'Worst Trade', value: '-$523.37', valueColor: '#D46356' },
]

function StatColumn({ rows }: { rows: StatRow[] }) {
  return (
    <div className="flex-1">
      {rows.map((row, i) => (
        <div key={row.label}>
          <div className="flex items-center justify-between py-4 px-7">
            <div className="flex items-center gap-2.5">
              <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">{row.label}</span>
              <StatInfoIcon />
            </div>
            <div className="flex items-center gap-3">
              {row.progressBar && (
                <div className="flex items-center gap-2">
                  <span className="text-white text-base font-acid font-medium leading-6">{row.value}</span>
                  <div className="w-[5.5rem] h-[0.5625rem] rounded-full bg-gfx-green-900 relative">
                    <div className="h-full rounded bg-gfx-green-200" style={{ width: `${(row.progressBar.percent / 100) * 88}px` }} />
                  </div>
                </div>
              )}
              {!row.progressBar && (
                <span className={`text-base font-acid font-medium leading-6 ${row.valueColor ? '' : 'text-white'}`} style={{ color: row.valueColor }}>{row.value}</span>
              )}
            </div>
          </div>
          {i < rows.length - 1 && <div className="mx-7 h-[0.61px] bg-gfx-green-900" />}
        </div>
      ))}
    </div>
  )
}

function TradingStatistics() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="px-8 py-13">
      <div className="relative flex">
        <StatColumn rows={leftStats} />
        <StatColumn rows={rightStats} />
      </div>
    </GlassCard>
  )
}

/* ─── Trades Table ─── */

const closedTrades = [
  { openDate: 'Apr 01,2026', openTime: '4:54 PM', closeDate: 'Apr 01,2026', closeTime: '5:26 PM', symbol: 'XAUUSD', side: 'Buy', volume: '0.10', openPrice: 'N/A', closePrice: '4764.550', pnl: '-$15.30' },
  { openDate: 'Apr 01,2026', openTime: '4:54 PM', closeDate: 'Apr 01,2026', closeTime: '5:26 PM', symbol: 'XAUUSD', side: 'Buy', volume: '0.10', openPrice: 'N/A', closePrice: '4764.550', pnl: '-$15.30' },
]

/* ─── Header Pill Icons ─── */

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <circle cx="5.9" cy="3.7" r="3.6" fill="#A0A0A0" />
      <ellipse cx="5.9" cy="12.8" rx="5.9" ry="2.9" fill="#A0A0A0" />
      <path d="M11.6 1.5a2.7 2.7 0 0 1 0 5.4c-.35 0-.68-.06-.99-.18a5.2 5.2 0 0 0 0-5.04c.31-.12.64-.18.99-.18Z" fill="#A0A0A0" />
      <path d="M12.6 10.2c1.9.28 3.4 1.12 3.4 2.12s-1.5 1.84-3.4 2.12c.32-.62.5-1.34.5-2.12s-.18-1.5-.5-2.12Z" fill="#A0A0A0" />
    </svg>
  )
}

function BriefcaseDollarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <path d="M5.6 4.4V2.9a1.5 1.5 0 0 1 1.5-1.5h3.8a1.5 1.5 0 0 1 1.5 1.5v1.5" stroke="#A0A0A0" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="0.5" y="4.4" width="17" height="13.1" rx="1.7" fill="#A0A0A0" />
      <path d="M9.3 6.9v1.2M9.3 13.6v1.2M11 9.1H8.5a1.2 1.2 0 0 0 0 2.4h1.6a1.2 1.2 0 0 1 0 2.4H7.6" stroke="#0C1311" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Main Page ─── */

export default function CopyTradingDetailsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const navigate = useNavigate()
  const [perfTab, setPerfTab] = useState(0)
  const [tradeTab, setTradeTab] = useState(1)
  const [copyModalOpen, setCopyModalOpen] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const perfTabs = ['Performance Statement', 'Trading Statistics', 'Trade Calendar'] as const
  const tradeTabs = ['Open Positions', 'Closed Trades'] as const

  return (
    <div className="copy-trading-details-page relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'GenSocial', href: '/gensocial/copy-trading' },
          { label: 'Copy Trading', href: '/gensocial/copy-trading' },
          { label: 'Details', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">

        {/* Header */}
        <ProfileHeader
          onBack={() => navigate('/gensocial/copy-trading')}
          backLabel="Back to copy trading"
          initials="EA"
          name="KingEasy"
          badges={
            <>
              <ProfileHeaderPill tone="gold">Medium Risk</ProfileHeaderPill>
              <ProfileHeaderPill icon={<PeopleIcon />}>5 Followers</ProfileHeaderPill>
              <ProfileHeaderPill icon={<BriefcaseDollarIcon />}>$13,884.16 AUM</ProfileHeaderPill>
            </>
          }
          favorite={favorite}
          onToggleFavorite={() => setFavorite(prev => !prev)}
          ctaLabel="Connect now"
          onCtaClick={() => setCopyModalOpen(true)}
        />

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: 'AUM', value: '$3,000.00', icon: <ChartUpIcon /> },
            { label: 'ROI', value: '+194.12%', valueColor: 'text-gfx-green-500', icon: <GraphUpIcon /> },
            { label: 'Closed P&L', value: '$400.53', icon: <PieChartIcon /> },
            { label: 'Followers', value: '0', icon: <CalendarIcon /> },
          ].map((stat, i) => (
            <GlassCard key={i} variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <GlowEllipse className="left-1/2 -translate-x-1/2 -bottom-[12.5rem]" />
              <div className="relative p-4 sm:p-6 flex justify-between items-start">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-gfx-neutral-400 text-sm font-acid font-normal leading-[18.8px] uppercase tracking-wider">{stat.label}</p>
                    <InfoIcon />
                  </div>
                  <p className={`${stat.valueColor || 'text-white'} text-2xl sm:text-[2.25rem] font-acid font-normal leading-none mt-3`}>{stat.value}</p>
                </div>
                <div className="w-9 h-9 sm:w-[2.625rem] sm:h-[2.625rem] shrink-0 rounded-md bg-gfx-green-900 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Main Content: Chart (left) + Trader Details (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_23.5rem] gap-5">
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-gfx-neutral-400 text-sm font-acid font-normal leading-[18.8px]">Portfolio Equity</p>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-white text-[2.25rem] font-acid font-normal">$3,000.30</span>
                    <span className="text-gfx-green-500 text-sm font-acid font-normal leading-[18.8px]">+$400.53 (194.12%)</span>
                  </div>
                </div>
                <PeriodPill />
              </div>
              <div className="h-[18.125rem]">
                <PortfolioChart config={defaultChartConfig} />
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white text-2xl font-acid font-normal">Trader Details</h3>
              </div>
              <div className="flex flex-col">
                {[
                  { label: 'Trader Name', value: 'KingEasy' },
                  { label: 'Minimum Copy', value: '$100.00' },
                  { label: 'Management Fee', value: '2.0%' },
                  { label: 'Performance Fee', value: '25%' },
                  { label: 'Performance Fee Schedule', value: 'Monthly' },
                  { label: 'Currency', value: 'USD' },
                  { label: 'Since', value: 'Jan 15,2026' },
                ].map((item, i) => (
                  <div key={i}>
                    {i > 0 && <div className="w-full h-px bg-gfx-green-150 my-4" />}
                    <div className="flex justify-between items-center">
                      <span className="text-gfx-neutral-400 text-sm font-acid font-normal leading-[18.8px]">{item.label}</span>
                      <span className="text-white text-sm font-acid font-normal leading-[18.8px]">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Performance Tabs */}
        <div className="w-full overflow-x-auto max-w-[40.5rem]">
          <ModeToggle options={[...perfTabs]} defaultIndex={0} activeIndex={perfTab} onChange={setPerfTab} buttonClassName="!font-medium !leading-[24.44px]" />
        </div>

        {perfTab === 0 && (
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="left-1/2 -translate-x-1/4 -top-[15.625rem]" />
            <div className="relative p-6 lg:p-8">
              <PerformanceGrid />
            </div>
          </GlassCard>
        )}

        {perfTab === 1 && <TradingStatistics />}

        {perfTab === 2 && (
          <TradingCalendar
            trades={{
              '2026-6-1': { profit: 120.50, trades: 5 },
              '2026-6-2': { profit: -45.30, trades: 3 },
              '2026-6-3': { profit: 89.20, trades: 4 },
              '2026-6-5': { profit: -22.10, trades: 2 },
              '2026-6-6': { profit: 156.80, trades: 6 },
              '2026-6-9': { profit: 45.60, trades: 3 },
              '2026-6-10': { profit: -78.40, trades: 4 },
              '2026-6-11': { profit: 234.50, trades: 7 },
              '2026-6-12': { profit: 12.30, trades: 2 },
              '2026-6-13': { profit: -95.20, trades: 5 },
              '2026-6-16': { profit: 67.80, trades: 3 },
              '2026-6-17': { profit: 145.90, trades: 4 },
              '2026-6-18': { profit: -33.60, trades: 2 },
              '2026-6-19': { profit: 78.40, trades: 3 },
              '2026-6-20': { profit: -12.50, trades: 1 },
              '2026-6-23': { profit: 198.30, trades: 5 },
              '2026-6-24': { profit: 56.70, trades: 3 },
              '2026-6-25': { profit: -67.80, trades: 4 },
              '2026-6-26': { profit: 89.10, trades: 2 },
              '2026-6-27': { profit: 134.60, trades: 6 },
            }}
          />
        )}

        {/* Trade Tabs */}
        <div className="w-full overflow-x-auto max-w-[27.25rem]">
          <ModeToggle options={[...tradeTabs]} defaultIndex={1} activeIndex={tradeTab} onChange={setTradeTab} />
        </div>

        {/* Trades Table */}
        <div className="trades-table-card trades-table-card--plain rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[60rem]">
              <thead>
                <tr style={{ borderBottom: '0.77px solid rgba(255,255,255,0.04)' }}>
                  {['Open Time', 'Close Time', 'Symbol', 'Side', 'Volume', 'Open Price', 'Close Price', 'Closed P&L'].map(h => (
                    <th key={h} className="text-left text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-[2.323px] leading-[15.6826px] px-12 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tradeTab === 1 && closedTrades.map((trade, i) => (
                  <tr key={i} style={{ borderBottom: '0.77px solid var(--color-gfx-green-900)' }}>
                    <td className="px-12 py-4">
                      <p className="text-white text-base font-acid font-medium leading-6">{trade.openDate}</p>
                      <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">{trade.openTime}</p>
                    </td>
                    <td className="px-12 py-4">
                      <p className="text-white text-base font-acid font-medium leading-6">{trade.closeDate}</p>
                      <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">{trade.closeTime}</p>
                    </td>
                    <td className="px-12 py-4">
                      <div className="flex items-center gap-3">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><g clipPath="url(#xauClipCT)"><path d="M0 0H38V38H0V0Z" fill="#D69A00"/><path d="M14.42 14.63H23.77L22.41 10.97C22.36 10.82 22.26 10.69 22.13 10.59L14.42 14.63ZM14.39 10.28C14.73 9.39 15.45 8.82 16.26 8.82H21.79C22.59 8.82 23.32 9.39 23.65 10.28L25.02 13.94C25.42 15.04 24.76 16.28 23.77 16.28H14.27C13.28 16.28 12.62 15.04 13.03 13.94L14.39 10.28ZM6.95 24.13H16.28L14.92 20.47C14.86 20.32 14.77 20.19 14.64 20.09L6.95 24.13ZM6.92 19.78C7.25 18.89 7.98 18.32 8.78 18.32H14.3C15.1 18.32 15.83 18.89 16.16 19.78L17.52 23.44C17.93 24.54 17.27 25.78 16.28 25.78H6.8C5.81 25.78 5.15 24.54 5.56 23.44L6.92 19.78ZM31.27 24.13H21.88L29.63 20.09C29.75 20.18 29.85 20.31 29.91 20.47L31.27 24.13ZM23.71 18.32C22.91 18.32 22.18 18.89 21.85 19.78L20.49 23.44C20.08 24.54 20.74 25.78 21.73 25.78H31.27C32.27 25.78 32.93 24.54 32.52 23.44L31.15 19.78C30.82 18.89 30.09 18.32 29.29 18.32H23.71Z" fill="white"/></g><defs><clipPath id="xauClipCT"><rect width="38" height="38" rx="19" fill="white"/></clipPath></defs></svg>
                        <span className="text-white text-base font-acid font-medium leading-6">{trade.symbol}</span>
                      </div>
                    </td>
                    <td className="px-12 py-4">
                      <span className="inline-flex items-center justify-center px-4.5 h-6 rounded-full text-gfx-bullish-light text-xs font-acid leading-5" style={{ outline: '1.16px solid var(--color-gfx-bullish)', outlineOffset: '-1.16px' }}>{trade.side}</span>
                    </td>
                    <td className="px-12 py-4"><span className="text-white text-base font-acid font-medium leading-6">{trade.volume}</span></td>
                    <td className="px-12 py-4"><span className="text-white text-base font-acid font-medium leading-6">{trade.openPrice}</span></td>
                    <td className="px-12 py-4"><span className="text-white text-base font-acid font-medium leading-6">{trade.closePrice}</span></td>
                    <td className="px-12 py-4"><span className="text-gfx-red-muted text-base font-acid font-medium leading-6">{trade.pnl}</span></td>
                  </tr>
                ))}
                {tradeTab === 0 && (
                  <tr>
                    <td colSpan={8} className="px-12 py-12 text-center text-gfx-neutral-500 text-sm font-acid">No open positions</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <CopySubscriptionModal
        open={copyModalOpen}
        onClose={() => setCopyModalOpen(false)}
        traderName="KingEasy"
        traderUsername="@KingEasy"
        traderInitials="EA"
        aum="$3,000.00"
        roi="+194.12%"
      />
    </div>
  )
}
