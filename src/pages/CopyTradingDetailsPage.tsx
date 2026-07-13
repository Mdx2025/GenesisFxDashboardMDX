import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, ModeToggle, GlowEllipse, GlowButton, TradingCalendar, PeriodPill, Badge } from '@/components/ui'

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

function VerifiedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 0L8.5 1.5L10.5 1L11 3L13 3.5L12.5 5.5L14 7L12.5 8.5L13 10.5L11 11L10.5 13L8.5 12.5L7 14L5.5 12.5L3.5 13L3 11L1 10.5L1.5 8.5L0 7L1.5 5.5L1 3.5L3 3L3.5 1L5.5 1.5L7 0Z" fill="#10BC83" />
      <path d="M5 7L6.5 8.5L9 5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

/* ─── Portfolio Area Chart ─── */

function PortfolioChart() {
  const data = [150, 160, 145, 170, 190, 175, 200, 220, 210, 240, 260, 250, 280, 305, 290, 270, 260, 250, 240, 260, 280, 300, 290, 270, 260, 245, 230, 250, 270, 260]
  const w = 1100
  const h = 290
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)
  const points = data.map((v, i) => [i * step, h - ((v - min) / range) * h * 0.85 - h * 0.05])
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${w},${h} L0,${h} Z`
  const yLabels = ['$305', '$253', '$202', '$150', '$98']

  return (
    <div className="relative w-full">
      <div className="flex">
        <div className="flex flex-col justify-between pr-4 py-1" style={{ height: `${h}px` }}>
          {yLabels.map(label => (
            <span key={label} className="text-gfx-neutral-400 text-[0.75rem] font-acid">{label}</span>
          ))}
        </div>
        <div className="flex-1">
          <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height: `${h}px` }}>
            <defs>
              <linearGradient id="copyPortfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10BC83" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10BC83" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="copyLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10BC83" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#10BC83" stopOpacity="1" />
                <stop offset="100%" stopColor="#10BC83" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {[0.15, 0.38, 0.6, 0.83].map((y, i) => (
              <line key={i} x1="0" y1={h * y} x2={w} y2={h * y} stroke="#1a2e26" strokeWidth="0.5" strokeDasharray="4 4" />
            ))}
            <path d={areaD} fill="url(#copyPortfolioGrad)" />
            <path d={pathD} stroke="url(#copyLineGrad)" strokeWidth="2" fill="none" />
            <circle cx={points[20][0]} cy={points[20][1]} r="12" fill="#10BC83" opacity="0.15" />
            <circle cx={points[20][0]} cy={points[20][1]} r="4" fill="#10BC83" />
            <line x1={points[20][0]} y1={points[20][1] + 16} x2={points[20][0]} y2={h} stroke="#10BC83" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
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
  positive: 'bg-[#09241c] border border-[#00B38C]',
  negative: 'bg-[#2A1411] border border-[#7F3B34]',
  empty: 'border border-[#064B34]',
} as const

const TEXT_STYLES = {
  positive: 'text-[#00B38C]',
  negative: 'text-[#D46356]',
  empty: '',
} as const

function PerformanceGrid() {
  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 -top-[259px] w-[493px] h-[278px] rounded-full bg-gfx-green-200 blur-[157px]" />
      <div className="relative">
        <div className="flex items-start">
          <div className="flex flex-col items-start w-[60px] flex-shrink-0">
            <span className="text-gfx-neutral-600 text-[1rem] font-acid font-medium leading-[24.44px]">Year</span>
            <div className="h-[45px] flex items-center mt-3">
              <span className="text-gfx-neutral-600 text-[1rem] font-acid font-medium leading-[24.44px]">2026</span>
            </div>
          </div>
          <div className="flex-1 flex gap-[10px]">
            {monthlyPerformance.map(m => (
              <div key={m.month} className="flex flex-col items-center flex-1 min-w-0">
                <span className="text-gfx-neutral-600 text-[1rem] font-acid font-medium leading-[24.44px] mb-3">{m.month}</span>
                <div className={`w-full h-[45px] rounded-[8px] flex items-center justify-center ${CELL_STYLES[m.type]}`}>
                  {m.value && <span className={`text-[1rem] font-acid font-medium leading-[24.44px] ${TEXT_STYLES[m.type]}`}>{m.value}</span>}
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <span className="text-gfx-neutral-600 text-[1rem] font-acid font-medium leading-[24.44px] mb-3">Ann</span>
              <div className={`w-full h-[45px] rounded-[8px] flex items-center justify-center ${CELL_STYLES.positive}`}>
                <span className={`text-[1rem] font-acid font-medium leading-[24.44px] ${TEXT_STYLES.positive}`}>+3.42%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 0.5H18C18.8284 0.5 19.5 1.17157 19.5 2V18C19.5 18.8284 18.8284 19.5 18 19.5H2C1.17157 19.5 0.5 18.8284 0.5 18V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="#09241C" stroke="#00B38C"/></svg>
            <span className="text-gfx-neutral-500 text-[1rem] font-acid font-medium leading-[24.44px]">Positive turn</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="#2A1411" stroke="#7F3B34"/></svg>
            <span className="text-gfx-neutral-500 text-[1rem] font-acid font-medium leading-[24.44px]">Negative turn</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#064B34"/></svg>
            <span className="text-gfx-neutral-500 text-[1rem] font-acid font-medium leading-[24.44px]">No trades</span>
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
          <div className="flex items-center justify-between py-[1.1rem] px-[1.75rem]">
            <div className="flex items-center gap-[0.625rem]">
              <span className="text-gfx-neutral-500 text-[1rem] font-acid font-medium leading-[24.44px]">{row.label}</span>
              <StatInfoIcon />
            </div>
            <div className="flex items-center gap-3">
              {row.progressBar && (
                <div className="flex items-center gap-2">
                  <span className="text-white text-[1rem] font-acid font-medium leading-[24.44px]">{row.value}</span>
                  <div className="w-[88px] h-[9px] rounded-[60px] bg-gfx-green-900 relative">
                    <div className="h-full rounded-[4.5px] bg-gfx-green-200" style={{ width: `${(row.progressBar.percent / 100) * 88}px` }} />
                  </div>
                </div>
              )}
              {!row.progressBar && (
                <span className="text-[1rem] font-acid font-medium leading-[24.44px]" style={{ color: row.valueColor || 'white' }}>{row.value}</span>
              )}
            </div>
          </div>
          {i < rows.length - 1 && <div className="mx-[1.75rem] h-[0.61px] bg-gfx-green-900" />}
        </div>
      ))}
    </div>
  )
}

function TradingStatistics() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[259px] w-[493px] h-[278px] rounded-full bg-gfx-green-200 blur-[157px]" />
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

export default function CopyTradingDetailsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const navigate = useNavigate()
  const [perfTab, setPerfTab] = useState(0)
  const [tradeTab, setTradeTab] = useState(1)
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

        {/* Header Row */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/gensocial/copy-trading')}
            className="w-[2.375rem] h-[2.375rem] rounded-[0.5rem] bg-gfx-green-900 flex items-center justify-center cursor-pointer hover:bg-[#0d3227] transition-colors flex-shrink-0"
          >
            <BackArrowIcon />
          </button>
          <div className="w-[3.4375rem] h-[3.4375rem] rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-white text-[1rem] font-acid font-medium">EA</span>
          </div>
          <h1 className="text-white text-h1 font-normal">KingEasy</h1>
          <VerifiedIcon />
          <div className="flex items-center gap-2 ml-2">
            <Badge variant="active">GenFX</Badge>
            <Badge variant="active">Rank 2</Badge>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-[2.9375rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
              <svg className="absolute inset-0" width="47" height="44" viewBox="0 0 47 44" fill="none">
                <path d="M22 0.599609H25C36.8189 0.599609 46.4004 10.1811 46.4004 22C46.4004 33.8189 36.8189 43.4004 25 43.4004H22C10.1811 43.4004 0.599609 33.8189 0.599609 22C0.599609 10.1811 10.1811 0.599609 22 0.599609Z" stroke="#303030" strokeWidth="1.2"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <GlowButton label="Copy Trader" width={180} height={44} />
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: 'AUM', value: '$3,000.00', icon: <ChartUpIcon /> },
            { label: 'ROI', value: '+194.12%', valueColor: 'text-gfx-green-500', icon: <GraphUpIcon /> },
            { label: 'Closed P&L', value: '$400.53', icon: <PieChartIcon /> },
            { label: 'Followers', value: '0', icon: <CalendarIcon /> },
          ].map((stat, i) => (
            <GlassCard key={i} variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <GlowEllipse className="left-1/2 -translate-x-1/2 -bottom-[12.5rem]" />
              <div className="relative p-6 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-gfx-neutral-400 text-[0.625rem] font-acid uppercase tracking-wider">{stat.label}</p>
                    <InfoIcon />
                  </div>
                  <p className={`${stat.valueColor || 'text-white'} text-[1.5625rem] font-acid leading-none mt-3`}>{stat.value}</p>
                </div>
                <div className="w-[2.625rem] h-[2.625rem] rounded-[0.625rem] bg-gfx-green-900 flex items-center justify-center">
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
                  <p className="text-gfx-neutral-400 text-[0.625rem] font-acid">Portfolio Equity</p>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-white text-[1.5625rem] font-acid">$3,000.30</span>
                    <span className="text-gfx-green-500 text-[0.625rem] font-acid">+$400.53 (194.12%)</span>
                  </div>
                </div>
                <PeriodPill />
              </div>
              <PortfolioChart />
            </div>
          </GlassCard>

          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white text-[1.0625rem] font-acid">Trader Details</h3>
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
                    {i > 0 && <div className="w-full h-px bg-[#0d2b22] my-4" />}
                    <div className="flex justify-between items-center">
                      <span className="text-gfx-neutral-400 text-[0.625rem] font-acid">{item.label}</span>
                      <span className="text-white text-[0.625rem] font-acid">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Performance Tabs */}
        <div className="w-full overflow-x-auto max-w-[40.5rem]">
          <ModeToggle options={[...perfTabs]} defaultIndex={0} activeIndex={perfTab} onChange={setPerfTab} />
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
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
          <GlowEllipse className="left-1/2 -translate-x-1/4 -top-[15.625rem]" />
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[60rem]">
              <thead>
                <tr className="border-b border-gfx-green-900">
                  {['Open Time', 'Close Time', 'Symbol', 'Side', 'Volume', 'Open Price', 'Close Price', 'Closed P&L'].map(h => (
                    <th key={h} className="text-left text-gfx-neutral-400 text-[0.5rem] font-acid font-normal uppercase tracking-wider px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {closedTrades.map((trade, i) => (
                  <tr key={i} className="border-b border-gfx-green-900 last:border-0">
                    <td className="px-6 py-4">
                      <p className="text-white text-[0.6875rem] font-acid">{trade.openDate}</p>
                      <p className="text-gfx-neutral-400 text-[0.6875rem] font-acid">{trade.openTime}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-[0.6875rem] font-acid">{trade.closeDate}</p>
                      <p className="text-gfx-neutral-400 text-[0.6875rem] font-acid">{trade.closeTime}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-[2.375rem] h-[2.375rem] rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                          <span className="text-[#ffd700] text-[0.625rem] font-acid font-bold">XAU</span>
                        </div>
                        <span className="text-white text-[0.6875rem] font-acid">{trade.symbol}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-4 py-1.5 rounded-full border border-gfx-green-500 text-gfx-green-500 text-[0.5rem] font-acid">{trade.side}</span>
                    </td>
                    <td className="px-6 py-4"><span className="text-white text-[0.6875rem] font-acid">{trade.volume}</span></td>
                    <td className="px-6 py-4"><span className="text-white text-[0.6875rem] font-acid">{trade.openPrice}</span></td>
                    <td className="px-6 py-4"><span className="text-white text-[0.6875rem] font-acid">{trade.closePrice}</span></td>
                    <td className="px-6 py-4"><span className="text-[#ff4d4d] text-[0.6875rem] font-acid">{trade.pnl}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </div>
  )
}
