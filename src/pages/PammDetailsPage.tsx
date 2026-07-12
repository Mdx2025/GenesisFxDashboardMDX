import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, ModeToggle, GlowEllipse } from '@/components/ui'

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

function HandCursorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 8.5V15C18 18.31 15.31 21 12 21C8.69 21 6 18.31 6 15V11" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 11V4C8 3.45 8.45 3 9 3C9.55 3 10 3.45 10 4V10" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 10V3C12 2.45 12.45 2 13 2C13.55 2 14 2.45 14 3V10" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 10V5C16 4.45 16.45 4 17 4C17.55 4 18 4.45 18 5V8.5" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
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
            <span key={label} className="text-[#808080] text-[0.75rem] font-acid">{label}</span>
          ))}
        </div>
        <div className="flex-1">
          <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height: `${h}px` }}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10BC83" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10BC83" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10BC83" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#10BC83" stopOpacity="1" />
                <stop offset="100%" stopColor="#10BC83" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {[0.15, 0.38, 0.6, 0.83].map((y, i) => (
              <line key={i} x1="0" y1={h * y} x2={w} y2={h * y} stroke="#1a2e26" strokeWidth="0.5" strokeDasharray="4 4" />
            ))}
            <path d={areaD} fill="url(#portfolioGrad)" />
            <path d={pathD} stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
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

const monthlyPerformance = [
  { month: 'Jan', value: '+139.90%' },
  { month: 'Feb', value: '+3.42%' },
  { month: 'Mar', value: '+3.42%' },
  { month: 'Apr', value: '+3.42%' },
  { month: 'May', value: null },
  { month: 'Jun', value: null },
  { month: 'Jul', value: null },
  { month: 'Aug', value: null },
  { month: 'Sep', value: null },
  { month: 'Oct', value: null },
  { month: 'Nov', value: null },
  { month: 'Dec', value: null },
]

function PerformanceGrid() {
  return (
    <div className="w-full">
      <div className="flex items-start gap-0">
        <div className="flex flex-col items-start pt-[2.375rem]">
          <span className="text-[#808080] text-[0.6875rem] font-acid">Year</span>
          <div className="h-[2.8125rem] flex items-center mt-[0.6875rem]">
            <span className="text-white text-[0.6875rem] font-acid">2026</span>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-[0.0625rem] min-w-max pl-6">
            {monthlyPerformance.map(m => (
              <div key={m.month} className="flex flex-col items-center w-[6.1875rem]">
                <span className="text-[#808080] text-[0.6875rem] font-acid mb-[0.6875rem]">{m.month}</span>
                <div className={`w-full h-[2.8125rem] rounded-[0.375rem] flex items-center justify-center ${
                  m.value ? 'bg-[#0a2e1f]' : 'bg-[#09241c]'
                }`}>
                  {m.value && <span className="text-[#10BC83] text-[0.6875rem] font-acid">{m.value}</span>}
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center w-[6.1875rem]">
              <span className="text-[#808080] text-[0.6875rem] font-acid mb-[0.6875rem]">Ann</span>
              <div className="w-full h-[2.8125rem] rounded-[0.375rem] bg-[#0a2e1f] flex items-center justify-center">
                <span className="text-[#10BC83] text-[0.6875rem] font-acid">+3.42%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 mt-5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[0.25rem] bg-[#0a2e1f]" />
          <span className="text-[#808080] text-[0.6875rem] font-acid">Positive turn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[0.25rem] bg-[#2e0a0a]" />
          <span className="text-[#808080] text-[0.6875rem] font-acid">Negative turn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[0.25rem] bg-[#09241c]" />
          <span className="text-[#808080] text-[0.6875rem] font-acid">No trades</span>
        </div>
      </div>
    </div>
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
  const [chartPeriod, setChartPeriod] = useState(5)

  const perfTabs = ['Performance Statement', 'Trading Statistics', 'Trade Calendar'] as const
  const tradeTabs = ['Open Positions', 'Closed Trades'] as const
  const chartPeriods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const

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
            onClick={() => navigate('/gensocial/pamm')}
            className="w-[2.375rem] h-[2.375rem] rounded-[0.5rem] bg-[#09241c] flex items-center justify-center cursor-pointer hover:bg-[#0d3227] transition-colors flex-shrink-0"
          >
            <BackArrowIcon />
          </button>
          <div className="w-[3.4375rem] h-[3.4375rem] rounded-full bg-[#064b34] flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-white text-[1rem] font-acid font-medium">BK</span>
          </div>
          <h1 className="text-white text-h1 font-normal">Bitcoin King</h1>
          <div className="flex items-center gap-2 ml-2">
            <div className="px-[1.125rem] py-[0.625rem] rounded-full border border-[#303030] bg-transparent">
              <span className="text-white text-[0.5rem] font-acid">GenFX</span>
            </div>
            <div className="px-[1.125rem] py-[0.625rem] rounded-full border border-[#303030] bg-transparent">
              <span className="text-white text-[0.5rem] font-acid">Rank 2</span>
            </div>
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
            <button className="h-[2.75rem] px-8 rounded-full bg-[#10BC83] text-black text-[0.875rem] font-acid font-medium cursor-pointer hover:bg-[#0ea774] transition-colors">
              Connected
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: 'AUM', value: '$3.50', icon: <ChartUpIcon /> },
            { label: 'ROI', value: '+194.12%', valueColor: 'text-[#10BC83]', icon: <GraphUpIcon /> },
            { label: 'Closed P&L', value: '$2.31', icon: <PieChartIcon /> },
            { label: 'AUM', value: '16.18%', icon: <CalendarIcon /> },
          ].map((stat, i) => (
            <GlassCard key={i} variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <GlowEllipse className="left-1/2 -translate-x-1/2 -bottom-[12.5rem]" />
              <div className="relative p-6 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#808080] text-[0.625rem] font-acid uppercase tracking-wider">{stat.label}</p>
                    <InfoIcon />
                  </div>
                  <p className={`${stat.valueColor || 'text-white'} text-[1.5625rem] font-acid leading-none mt-3`}>{stat.value}</p>
                </div>
                <div className="w-[2.625rem] h-[2.625rem] rounded-[0.625rem] bg-[#09241c] flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Main Content: Chart (left) + Strategy Details (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_23.5rem] gap-5">
          {/* Chart Area */}
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[#808080] text-[0.625rem] font-acid">Portfolio Equity</p>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-white text-[1.5625rem] font-acid">$17,897.30</span>
                    <span className="text-[#10BC83] text-[0.625rem] font-acid">+$6,437.21 (56.1%)</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-[#09241c] rounded-full overflow-hidden">
                    {chartPeriods.map((p, i) => (
                      <button
                        key={p}
                        onClick={() => setChartPeriod(i)}
                        className={`px-3 py-2 text-[0.5rem] font-acid cursor-pointer transition-colors ${
                          chartPeriod === i ? 'bg-[#10BC83] text-black rounded-full' : 'text-[#808080] hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <button className="ml-2 w-8 h-8 flex items-center justify-center">
                    <CalendarIcon />
                  </button>
                </div>
              </div>
              <PortfolioChart />
            </div>
          </GlassCard>

          {/* Strategy Details Sidebar */}
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white text-[1.0625rem] font-acid">Strategy Details</h3>
                <HandCursorIcon />
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
                    {i > 0 && <div className="w-full h-px bg-[#0d2b22] my-4" />}
                    <div className="flex justify-between items-center">
                      <span className="text-[#808080] text-[0.625rem] font-acid">{item.label}</span>
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
          <ModeToggle
            options={[...perfTabs]}
            defaultIndex={0}
            activeIndex={perfTab}
            onChange={setPerfTab}
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
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
          <GlowEllipse className="left-1/2 -translate-x-1/4 -top-[15.625rem]" />
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[60rem]">
              <thead>
                <tr className="border-b border-[#09241c]">
                  {['Open Time', 'Close Time', 'Symbol', 'Side', 'Volume', 'Open Price', 'Close Price', 'Closed P&L'].map(h => (
                    <th key={h} className="text-left text-[#808080] text-[0.5rem] font-acid font-normal uppercase tracking-wider px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {closedTrades.map((trade, i) => (
                  <tr key={i} className="border-b border-[#09241c] last:border-0">
                    <td className="px-6 py-4">
                      <p className="text-white text-[0.6875rem] font-acid">{trade.openDate}</p>
                      <p className="text-[#808080] text-[0.6875rem] font-acid">{trade.openTime}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-[0.6875rem] font-acid">{trade.closeDate}</p>
                      <p className="text-[#808080] text-[0.6875rem] font-acid">{trade.closeTime}</p>
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
                      <span className="px-4 py-1.5 rounded-full border border-[#10BC83] text-[#10BC83] text-[0.5rem] font-acid">{trade.side}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white text-[0.6875rem] font-acid">{trade.volume}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white text-[0.6875rem] font-acid">{trade.openPrice}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white text-[0.6875rem] font-acid">{trade.closePrice}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#ff4d4d] text-[0.6875rem] font-acid">{trade.pnl}</span>
                    </td>
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
