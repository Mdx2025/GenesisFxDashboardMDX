import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { ConnectPammModal } from '@/components/dashboard/ConnectPammModal'
import { GlassCard, SparkleButton, ModeToggle, GlowEllipse, GlowButton, TradingCalendar, PeriodPill, Badge, StatCard } from '@/components/ui'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'

/* ─── Inline SVG Icons ─── */

function BackArrowIcon() {
  return (
    <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
      <path d="M5 1L1 6L5 11" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

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


function XauusdSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 38 38" fill="none">
      <g clipPath="url(#xauClipSmPamm)">
        <path d="M0 0H38V38H0V0Z" fill="#D69A00" />
        <path d="M14.42 14.63H23.77L22.41 10.97C22.36 10.82 22.26 10.69 22.13 10.59L14.42 14.63ZM14.39 10.28C14.73 9.39 15.45 8.82 16.26 8.82H21.79C22.59 8.82 23.32 9.39 23.65 10.28L25.02 13.94C25.42 15.04 24.76 16.28 23.77 16.28H14.27C13.28 16.28 12.62 15.04 13.03 13.94L14.39 10.28ZM6.95 24.13H16.28L14.92 20.47C14.86 20.32 14.77 20.19 14.64 20.09L6.95 24.13ZM6.92 19.78C7.25 18.89 7.98 18.32 8.78 18.32H14.3C15.1 18.32 15.83 18.89 16.16 19.78L17.52 23.44C17.93 24.54 17.27 25.78 16.28 25.78H6.8C5.81 25.78 5.15 24.54 5.56 23.44L6.92 19.78ZM31.27 24.13H21.88L29.63 20.09C29.75 20.18 29.85 20.31 29.91 20.47L31.27 24.13ZM23.71 18.32C22.91 18.32 22.18 18.89 21.85 19.78L20.49 23.44C20.08 24.54 20.74 25.78 21.73 25.78H31.27C32.27 25.78 32.93 24.54 32.52 23.44L31.15 19.78C30.82 18.89 30.09 18.32 29.29 18.32H23.71Z" fill="white" />
      </g>
      <defs><clipPath id="xauClipSmPamm"><rect width="38" height="38" rx="19" fill="white" /></clipPath></defs>
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
          {/* Year column */}
          <div className="flex flex-col items-start w-[3.75rem] flex-shrink-0">
            <span className="text-gfx-neutral-600 text-base font-acid font-medium leading-6">Year</span>
            <div className="h-11 flex items-center mt-3">
              <span className="text-gfx-neutral-600 text-base font-acid font-medium leading-6">2026</span>
            </div>
          </div>
          {/* Month cells */}
          <div className="flex-1 flex gap-2.5">
            {monthlyPerformance.map(m => (
              <div key={m.month} className="flex flex-col items-center flex-1 min-w-0">
                <span className="text-gfx-neutral-600 text-base font-acid font-medium leading-6 mb-3">{m.month}</span>
                <div className={`w-full h-11 rounded-sm flex items-center justify-center ${CELL_STYLES[m.type]}`}>
                  {m.value && <span className={`text-base font-acid font-medium leading-6 ${TEXT_STYLES[m.type]}`}>{m.value}</span>}
                </div>
              </div>
            ))}
            {/* Ann column */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <span className="text-gfx-neutral-600 text-base font-acid font-medium leading-6 mb-3">Ann</span>
              <div className={`w-full h-11 rounded-sm flex items-center justify-center ${CELL_STYLES.positive}`}>
                <span className={`text-base font-acid font-medium leading-6 ${TEXT_STYLES.positive}`}>+3.42%</span>
              </div>
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 0.5H18C18.8284 0.5 19.5 1.17157 19.5 2V18C19.5 18.8284 18.8284 19.5 18 19.5H2C1.17157 19.5 0.5 18.8284 0.5 18V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="#09241C" stroke="#00B38C"/>
            </svg>
            <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">Positive turn</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="#2A1411" stroke="#7F3B34"/>
            </svg>
            <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">Negative turn</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#064B34"/>
            </svg>
            <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">No trades</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Trading Statistics ─── */

function StatInfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12V9" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 6H9.00833" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

type StatRow = {
  label: string
  value: string
  valueColor?: string
  progressBar?: { percent: number }
}

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
                    <div
                      className="h-full rounded bg-gfx-green-200"
                      style={{ width: `${(row.progressBar.percent / 100) * 88}px` }}
                    />
                  </div>
                </div>
              )}
              {!row.progressBar && (
                <span
                  className={`text-base font-acid font-medium leading-6 ${row.valueColor ? '' : 'text-white'}`}
                  style={{ color: row.valueColor }}
                >
                  {row.value}
                </span>
              )}
            </div>
          </div>
          {i < rows.length - 1 && (
            <div className="mx-7 h-[0.61px] bg-gfx-green-900" />
          )}
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

/* ─── Main Page ─── */

export default function PammDetailsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const navigate = useNavigate()
  const [perfTab, setPerfTab] = useState(0)
  const [tradeTab, setTradeTab] = useState(1)
  const [connectModalOpen, setConnectModalOpen] = useState(false)
  const perfTabs = ['Performance Statement', 'Trading Statistics', 'Trade Calendar'] as const
  const tradeTabs = ['Open Positions', 'Closed Trades'] as const

  return (
    <div className="pamm-details-page relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'GenSocial', href: '/gensocial/pamm' },
          { label: 'PAMM Strategies', href: '/gensocial/pamm' },
          { label: 'Details', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">

        {/* Header Row: Back + Avatar + Name + Badges + Star + Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Back to PAMM"
            onClick={() => navigate('/gensocial/pamm')}
            className="w-[2.375rem] h-[2.375rem] rounded-sm bg-gfx-green-900 flex items-center justify-center cursor-pointer hover:bg-gfx-green-150 transition-colors flex-shrink-0"
          >
            <BackArrowIcon />
          </button>
          <div className="w-[3.4375rem] h-[3.4375rem] rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-white text-base font-acid font-medium">BK</span>
          </div>
          <h1 className="text-white text-h1 font-normal">Bitcoin King</h1>
          <div className="flex items-center gap-2 ml-2">
            <Badge variant="active">GenFX</Badge>
            <Badge variant="active">Rank 2</Badge>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button type="button" aria-label="Add to favorites" className="relative w-12 h-11 flex items-center justify-center cursor-pointer">
              <svg className="absolute inset-0" width="47" height="44" viewBox="0 0 47 44" fill="none">
                <path d="M22 0.599609H25C36.8189 0.599609 46.4004 10.1811 46.4004 22C46.4004 33.8189 36.8189 43.4004 25 43.4004H22C10.1811 43.4004 0.599609 33.8189 0.599609 22C0.599609 10.1811 10.1811 0.599609 22 0.599609Z" stroke="#303030" strokeWidth="1.2"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <GlowButton
              label="Connect Row"
              width={180}
              height={44}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M13.7677 1.21068C13.9275 0.944292 14.273 0.857912 14.5394 1.01775L14.25 1.50008C14.5394 1.01775 14.5392 1.01759 14.5394 1.01775L14.5404 1.01837L14.5416 1.01908L14.5444 1.02077L14.5516 1.02521C14.5571 1.02864 14.564 1.03302 14.5723 1.03836C14.5888 1.04904 14.6106 1.06357 14.637 1.08204C14.6898 1.11896 14.761 1.17183 14.8445 1.2414C15.0111 1.38021 15.2289 1.58759 15.4459 1.86962C15.883 2.43792 16.3125 3.30559 16.3125 4.50009C16.3125 5.69458 15.883 6.56225 15.4459 7.13055C15.2289 7.41258 15.0111 7.61996 14.8445 7.75877C14.761 7.82834 14.6898 7.88121 14.637 7.91813C14.6106 7.9366 14.5888 7.95113 14.5723 7.96181C14.5682 7.96447 14.5644 7.9669 14.5609 7.96908C14.5575 7.97128 14.5544 7.97324 14.5516 7.97496L14.5444 7.9794L14.5416 7.98109L14.5404 7.9818C14.5402 7.98195 14.5394 7.98242 14.25 7.50009L14.5394 7.98242C14.273 8.14226 13.9275 8.05588 13.7677 7.78949C13.6085 7.52422 13.6935 7.18049 13.9572 7.01977L13.9614 7.01712C13.9669 7.01359 13.9773 7.00673 13.9919 6.99649C14.0212 6.97599 14.0671 6.94214 14.1243 6.89452C14.2389 6.79896 14.3961 6.65009 14.5541 6.44462C14.867 6.03792 15.1875 5.4056 15.1875 4.50009C15.1875 3.59458 14.867 2.96225 14.5541 2.55555C14.3961 2.35008 14.2389 2.20121 14.1243 2.10565C14.0671 2.05803 14.0212 2.02418 13.9919 2.00368C13.9773 1.99344 13.9669 1.98658 13.9614 1.98305L13.9572 1.9804C13.6935 1.81969 13.6085 1.47595 13.7677 1.21068Z" fill="black"/>
                  <path d="M7.5 7.50009C9.15685 7.50009 10.5 6.15694 10.5 4.50009C10.5 2.84323 9.15685 1.50008 7.5 1.50008C5.84315 1.50008 4.5 2.84323 4.5 4.50009C4.5 6.15694 5.84315 7.50009 7.5 7.50009Z" fill="black"/>
                  <path d="M1.5 13.1251C1.5 14.989 1.5 16.5001 7.5 16.5001C13.5 16.5001 13.5 14.989 13.5 13.1251C13.5 11.2611 10.8137 9.75009 7.5 9.75009C4.18629 9.75009 1.5 11.2611 1.5 13.1251Z" fill="black"/>
                  <path d="M13.0394 2.51775C12.773 2.35791 12.4275 2.44429 12.2677 2.71068L12.4538 3.4783L12.4597 3.48229C12.4684 3.48844 12.4851 3.5006 12.5071 3.51893C12.5514 3.55589 12.6149 3.61571 12.6791 3.6993C12.8045 3.86225 12.9375 4.11958 12.9375 4.50009C12.9375 4.88059 12.8045 5.13792 12.6791 5.30087C12.6149 5.38446 12.5514 5.44428 12.5071 5.48124C12.4851 5.49957 12.4684 5.51173 12.4597 5.51788L12.4538 5.52187C12.1928 5.68346 12.1092 6.02537 12.2677 6.28949C12.4275 6.55588 12.773 6.64226 13.0394 6.48242L12.75 6.00009C13.0394 6.48242 13.0392 6.48257 13.0394 6.48242L13.0404 6.48182L13.0415 6.48117L13.0439 6.47973L13.0494 6.47628L13.0639 6.46712C13.0749 6.46 13.0887 6.45081 13.1048 6.43952C13.137 6.41696 13.179 6.38576 13.2273 6.34549C13.3236 6.26527 13.4476 6.14696 13.5709 5.9868C13.8205 5.66225 14.0625 5.16958 14.0625 4.50009C14.0625 3.83059 13.8205 3.33792 13.5709 3.01337C13.4476 2.85321 13.3236 2.7349 13.2273 2.65468C13.179 2.61441 13.137 2.58321 13.1048 2.56065C13.0887 2.54936 13.0749 2.54017 13.0639 2.53305L13.0494 2.52389L13.0439 2.52044L13.0415 2.519L13.0404 2.51835C13.0402 2.5182 13.0394 2.51775 12.75 3.00008L13.0394 2.51775Z" fill="black"/>
                </svg>
              }
              onClick={() => setConnectModalOpen(true)}
            />
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="AUM" value="$3.50" icon={<ChartUpIcon />} labelClassName="!leading-[18.8px]" />
          <StatCard label="ROI" value="+194.12%" valueColor="text-gfx-green-500" icon={<GraphUpIcon />} labelClassName="!leading-[18.8px]" />
          <StatCard label="Closed P&L" value="$2.31" icon={<PieChartIcon />} labelClassName="!leading-[18.8px]" />
          <StatCard label="AUM" value="16.18%" icon={<CalendarIcon />} labelClassName="!leading-[18.8px]" />
        </div>

        {/* Main Content: Chart (left) + Strategy Details (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_23.5rem] gap-5">
          {/* Chart Area */}
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-gfx-neutral-400 text-sm font-acid font-normal leading-[18.8px]">Portfolio Equity</p>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-white text-[2.25rem] font-acid font-normal">$17,897.30</span>
                    <span className="text-gfx-green-500 text-sm font-acid font-normal leading-[18.8px]">+$6,437.21 (56.1%)</span>
                  </div>
                </div>
                <PeriodPill />
              </div>
              <div className="h-[18.125rem]">
                <PortfolioChart config={defaultChartConfig} />
              </div>
            </div>
          </GlassCard>

          {/* Strategy Details Sidebar */}
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white text-2xl font-acid font-normal">Strategy Details</h3>
              </div>
              <div className="flex flex-col">
                {[
                  { label: 'Strategy Name', value: 'Bitcoin King 1.0' },
                  { label: 'Minimum Investment', value: '$50.00' },
                  { label: 'Managment Fee', value: '1.7%' },
                  { label: 'Performance Fee', value: '20%' },
                  { label: 'Performance Fee Schedule', value: 'Monthly' },
                  { label: 'Currency', value: 'USD' },
                  { label: 'Launch Date', value: 'Nov 24,2025' },
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
          <ModeToggle
            options={[...perfTabs]}
            defaultIndex={0}
            activeIndex={perfTab}
            onChange={setPerfTab}
            buttonClassName="!font-medium !leading-[24.44px]"
          />
        </div>

        {/* Performance Calendar */}
        {perfTab === 0 && (
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="left-1/2 -translate-x-1/4 -top-[15.625rem]" />
            <div className="relative p-6 lg:p-8">
              <PerformanceGrid />
            </div>
          </GlassCard>
        )}

        {/* Trading Statistics */}
        {perfTab === 1 && (
          <TradingStatistics />
        )}

        {/* Trade Calendar */}
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
          <ModeToggle
            options={[...tradeTabs]}
            defaultIndex={1}
            activeIndex={tradeTab}
            onChange={setTradeTab}
          />
        </div>

        {/* Trades Table */}
        <GlassCard variant="light" divider="none" rounded="18.56px" className="trades-table-card overflow-hidden">
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
                        <XauusdSmallIcon />
                        <span className="text-white text-base font-acid font-medium leading-6">{trade.symbol}</span>
                      </div>
                    </td>
                    <td className="px-12 py-4">
                      <span className="inline-flex items-center justify-center px-4.5 h-6 rounded-full text-gfx-bullish-light text-xs font-acid leading-5" style={{ outline: '1.16px solid var(--color-gfx-bullish)', outlineOffset: '-1.16px' }}>{trade.side}</span>
                    </td>
                    <td className="px-12 py-4">
                      <span className="text-white text-base font-acid font-medium leading-6">{trade.volume}</span>
                    </td>
                    <td className="px-12 py-4">
                      <span className="text-white text-base font-acid font-medium leading-6">{trade.openPrice}</span>
                    </td>
                    <td className="px-12 py-4">
                      <span className="text-white text-base font-acid font-medium leading-6">{trade.closePrice}</span>
                    </td>
                    <td className="px-12 py-4">
                      <span className="text-gfx-red-muted text-base font-acid font-medium leading-6">{trade.pnl}</span>
                    </td>
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
        </GlassCard>

      </div>

      <ConnectPammModal
        open={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </div>
  )
}
