import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { FollowStrategyModal } from '@/components/dashboard/FollowStrategyModal'
import { GlassCard, SparkleButton, ModeToggle, GlowEllipse, GlowButton, PeriodPill, Badge, BannerStatBox, StatCard } from '@/components/ui'

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

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 20V10" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 20V4" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 20V14" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PieChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21.21 15.89A10 10 0 118 2.83" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 12A10 10 0 0012 2V12H22Z" fill="#10BC83" opacity="0.3" stroke="#10BC83" strokeWidth="1.5"/>
    </svg>
  )
}

function GraphUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 7H22V13" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="#10BC83" strokeWidth="1.5"/>
      <path d="M23 21V19C23 18.0544 22.6839 17.1392 22.1049 16.4003C21.5259 15.6614 20.7168 15.1415 19.808 14.9278" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13C16.8604 3.35 17.623 3.87 18.1676 4.60 18.7122 5.33 19.0078 6.23 19.0078 7.16 19.0078 8.08 18.7122 8.98 18.1676 9.72 17.623 10.45 16.8604 10.97 16 11.19" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function XauusdSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 38 38" fill="none">
      <g clipPath="url(#xauClipSm)">
        <path d="M0 0H38V38H0V0Z" fill="#D69A00" />
        <path d="M14.42 14.63H23.77L22.41 10.97C22.36 10.82 22.26 10.69 22.13 10.59L14.42 14.63ZM14.39 10.28C14.73 9.39 15.45 8.82 16.26 8.82H21.79C22.59 8.82 23.32 9.39 23.65 10.28L25.02 13.94C25.42 15.04 24.76 16.28 23.77 16.28H14.27C13.28 16.28 12.62 15.04 13.03 13.94L14.39 10.28ZM6.95 24.13H16.28L14.92 20.47C14.86 20.32 14.77 20.19 14.64 20.09L6.95 24.13ZM6.92 19.78C7.25 18.89 7.98 18.32 8.78 18.32H14.3C15.1 18.32 15.83 18.89 16.16 19.78L17.52 23.44C17.93 24.54 17.27 25.78 16.28 25.78H6.8C5.81 25.78 5.15 24.54 5.56 23.44L6.92 19.78ZM31.27 24.13H21.88L29.63 20.09C29.75 20.18 29.85 20.31 29.91 20.47L31.27 24.13ZM23.71 18.32C22.91 18.32 22.18 18.89 21.85 19.78L20.49 23.44C20.08 24.54 20.74 25.78 21.73 25.78H31.27C32.27 25.78 32.93 24.54 32.52 23.44L31.15 19.78C30.82 18.89 30.09 18.32 29.29 18.32H23.71Z" fill="white" />
      </g>
      <defs><clipPath id="xauClipSm"><rect width="38" height="38" rx="19" fill="white" /></clipPath></defs>
    </svg>
  )
}

function FollowPersonIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
      <circle cx="7" cy="3.5" r="3.5" fill="black"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9375 17.5C9.49382 17.5 8.77199 17.5 8.32349 17.0515C7.875 16.603 7.875 15.8812 7.875 14.4375C7.875 12.9938 7.875 12.272 8.32349 11.8235C8.77199 11.375 9.49382 11.375 10.9375 11.375C12.3812 11.375 13.103 11.375 13.5515 11.8235C14 12.272 14 12.9938 14 14.4375C14 15.8812 14 16.603 13.5515 17.0515C13.103 17.5 12.3812 17.5 10.9375 17.5ZM11.4479 13.0764C11.4479 12.7945 11.2194 12.566 10.9375 12.566C10.6556 12.566 10.4271 12.7945 10.4271 13.0764V13.9271H9.57639C9.29449 13.9271 9.06597 14.1556 9.06597 14.4375C9.06597 14.7194 9.29449 14.9479 9.57639 14.9479H10.4271V15.7986C10.4271 16.0805 10.6556 16.309 10.9375 16.309C11.2194 16.309 11.4479 16.0805 11.4479 15.7986V14.9479H12.2986C12.5805 14.9479 12.809 14.7194 12.809 14.4375C12.809 14.1556 12.5805 13.9271 12.2986 13.9271H11.4479V13.0764Z" fill="black"/>
      <path d="M10.2184 10.0649C9.80448 10.07 9.41865 10.085 9.08243 10.1303C8.51991 10.2059 7.90419 10.3866 7.39543 10.8954C6.88667 11.4042 6.70591 12.0199 6.63028 12.5824C6.56232 13.0879 6.56241 13.7055 6.56251 14.3623V14.5127C6.56241 15.1694 6.56232 15.7871 6.63028 16.2926C6.68335 16.6873 6.78819 17.1082 7.0218 17.5C7.01454 17.5 7.00727 17.5 7 17.5C0 17.5 0 15.7371 0 13.5625C0 11.3879 3.13401 9.625 7 9.625C8.16041 9.625 9.25487 9.78383 10.2184 10.0649Z" fill="black"/>
    </svg>
  )
}

/* ─── P&L Chart ─── */

function PnlPerformanceChart() {
  const data = [20, 25, 22, 30, 35, 28, 40, 45, 38, 50, 48, 42, 38, 35, 30, 28, 25, 22, 20, 18, 15, 12, 10, 8, 5]
  const w = 1100
  const h = 290
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)
  const points = data.map((v, i) => [i * step, h - ((v - min) / range) * h * 0.85 - h * 0.05])
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${w},${h} L0,${h} Z`

  const yLabels = ['$60', '$45', '$30', '$15', '$0']

  return (
    <div className="relative w-full">
      <div className="flex">
        <div className="flex flex-col justify-between pr-4 py-1" style={{ height: `${h}px` }}>
          {yLabels.map(label => (
            <span key={label} className="text-gfx-neutral-400 text-xs font-acid">{label}</span>
          ))}
        </div>
        <div className="flex-1">
          <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height: `${h}px` }}>
            <defs>
              <linearGradient id="signalPnlGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10BC83" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10BC83" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="signalLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10BC83" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#10BC83" stopOpacity="1" />
                <stop offset="100%" stopColor="#10BC83" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {[0.15, 0.38, 0.6, 0.83].map((y, i) => (
              <line key={i} x1="0" y1={h * y} x2={w} y2={h * y} stroke="#1a2e26" strokeWidth="0.5" strokeDasharray="4 4" />
            ))}
            <path d={areaD} fill="url(#signalPnlGrad)" />
            <path d={pathD} stroke="url(#signalLineGrad)" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
      <div className="flex justify-between mt-2 pl-[2.7500rem]">
        <span className="text-gfx-neutral-400 text-[0.625rem] font-acid">Jun 22</span>
        <span className="text-gfx-neutral-400 text-[0.625rem] font-acid">Jun 22</span>
        <span className="text-gfx-neutral-400 text-[0.625rem] font-acid">Jun 22</span>
      </div>
    </div>
  )
}

/* ─── Trades Table Data ─── */

const closedTrades = [
  { openDate: 'Apr 01,2026', openTime: '4:54 PM', closeDate: 'Apr 01,2026', closeTime: '5:26 PM', symbol: 'XAUUSD', side: 'Buy', volume: '0.10', openPrice: 'N/A', closePrice: '4764.550', pnl: '-$15.30' },
  { openDate: 'Apr 01,2026', openTime: '4:54 PM', closeDate: 'Apr 01,2026', closeTime: '5:26 PM', symbol: 'XAUUSD', side: 'Buy', volume: '0.10', openPrice: 'N/A', closePrice: '4764.550', pnl: '-$15.30' },
]

/* ─── Main Page ─── */

export default function SignalsDetailsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const navigate = useNavigate()
  const [tradeTab, setTradeTab] = useState(1)
  const [followModalOpen, setFollowModalOpen] = useState(false)
  const tradeTabs = ['Open Positions', 'Closed Trades'] as const

  return (
    <div className="signals-details-page relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'GenSocial', href: '/gensocial/signals' },
          { label: 'Signals', href: '/gensocial/signals' },
          { label: 'Signal Details', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">

        {/* Header Row */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/gensocial/signals')}
            className="w-[2.375rem] h-[2.375rem] rounded-[0.5rem] bg-gfx-green-900 flex items-center justify-center cursor-pointer hover:bg-[#0d3227] transition-colors flex-shrink-0"
          >
            <BackArrowIcon />
          </button>
          <div className="w-[3.4375rem] h-[3.4375rem] rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-white text-base font-acid font-medium">CS</span>
          </div>
          <div>
            <h1 className="text-white text-h1 font-normal">C$ Signals</h1>
            <p className="text-gfx-neutral-500 text-sm font-acid">@csescoe — Signals Provider — 11 followers</p>
          </div>
          <div className="ml-2"><Badge variant="active">Active</Badge></div>
          <div className="ml-auto">
            <GlowButton
              label="Connect now"
              width={140}
              height={44}
              onClick={() => setFollowModalOpen(true)}
            />
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total Signals" value="2" icon={<ChartIcon />} />
          <StatCard label="Win Rate" value="100%" valueColor="text-gfx-bullish-light" icon={<PieChartIcon />} />
          <StatCard label="Total P&L" value="$50.35" valueColor="text-gfx-bullish-light" icon={<GraphUpIcon />} />
          <StatCard label="Max Drawdown" value="196" icon={<UsersIcon />} />
        </div>

        {/* Chart (left) + Strategy Details (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_23.5rem] gap-5">
          {/* P&L Performance Chart */}
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-white text-2xl font-acid">P&L Perfomance</h3>
                <PeriodPill />
              </div>
              <PnlPerformanceChart />
            </div>
          </GlassCard>

          {/* Strategy Details Sidebar */}
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white text-2xl font-acid">Strategy Details</h3>
              </div>
              <div className="flex flex-col">
                {[
                  { label: 'Strategy Name', value: 'C$ Signals' },
                  { label: 'Provider', value: 'Csescoe' },
                  { label: 'Status', value: 'Active', isBadge: true },
                  { label: 'Asset Focus', value: 'XAUUSD' },
                  { label: 'Monthly Fee', value: 'Free' },
                  { label: 'Performance Fee', value: '--' },
                  { label: 'One-time Fee', value: '--' },
                  { label: 'Launch Date', value: 'Jun 19, 2026' },
                ].map((item, i) => (
                  <div key={i}>
                    {i > 0 && <div className="w-full h-px bg-[#0d2b22] my-4" />}
                    <div className="flex justify-between items-center">
                      <span className="text-gfx-neutral-500 text-sm font-acid">{item.label}</span>
                      {item.isBadge ? (
                        <Badge variant="active">{item.value}</Badge>
                      ) : (
                        <span className="text-gfx-neutral-600 text-sm font-acid">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Performance & Frequency (left) + Follow Card (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_23.5rem] gap-5">
          {/* Performance & Frequency */}
          <GlassCard variant="light" divider="none" rounded="18.56px" className="p-[2.7500rem]">
            <div className="flex justify-between items-start">
              <h3 className="text-white text-2xl font-acid font-normal">Performance & Frequency</h3>
              <div className="flex flex-col items-end">
                <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-[24.44px] mb-2">Most Traded</p>
                <div className="flex items-center gap-2 bg-gfx-green-800 rounded-[0.496rem] border-[1.32px] border-gfx-green-900 px-3 py-2">
                  <XauusdSmallIcon />
                  <span className="text-white text-[1.075rem] font-bold tracking-[0.43px]" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '25.81px' }}>XAUUSD</span>
                  <span className="text-gfx-neutral-400 text-sm font-acid leading-[18.8px]">2</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-[3.3125rem]">
              {[
                { value: '2', label: 'Total Signals' },
                { value: '100%', label: 'Win Rate', green: true },
                { value: '$50.35', label: 'Total P&L', green: true },
                { value: '$25.18', label: 'Avg P&L / Trade', green: true },
                { value: '0', label: 'Open Positions' },
                { value: '3', label: 'Active Days' },
                { value: '0.7', label: 'Signals / Day' },
                { value: '4.7', label: 'Signals / Week' },
                { value: '20.0', label: 'Signals / Month' },
              ].map((s, i) => (
                <div key={i}>
                  <p className={`${s.green ? 'text-gfx-bullish-light' : 'text-white'} text-2xl font-acid font-normal`}>{s.value}</p>
                  <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-[24.44px] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Follow this Strategy Card */}
          <div className="bg-gfx-green-900 rounded-lg overflow-hidden px-8 py-25 h-fit">
            <h3 className="text-white text-base font-acid-medium mb-2">Follow this Strategy</h3>
            <p className="text-gfx-neutral-500 text-sm font-acid mb-6">Remote trade signals — not copy trading.</p>
            <GlowButton
              label="Follow"
              width="100%"
              height={44}
              onClick={() => setFollowModalOpen(true)}
            />
          </div>
        </div>

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
        <GlassCard variant="light" divider="none" rounded="18.56px" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[60rem]">
              <thead>
                <tr style={{ borderBottom: '0.77px solid rgba(255,255,255,0.04)' }}>
                  {['Open Time', 'Close Time', 'Symbol', 'Side', 'Volume', 'Open Price', 'Close Price', 'Closed P&L'].map(h => (
                    <th key={h} className="text-left text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-[2.32px] leading-[15.68px] px-12 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tradeTab === 1 && closedTrades.map((trade, i) => (
                  <tr key={i} style={{ borderBottom: '0.77px solid #09241C' }}>
                    <td className="px-12 py-4">
                      <p className="text-white text-base font-acid font-medium leading-[24.44px]">{trade.openDate}</p>
                      <p className="text-gfx-neutral-300 text-base font-acid font-medium leading-[24.44px]">{trade.openTime}</p>
                    </td>
                    <td className="px-12 py-4">
                      <p className="text-white text-base font-acid font-medium leading-[24.44px]">{trade.closeDate}</p>
                      <p className="text-gfx-neutral-300 text-base font-acid font-medium leading-[24.44px]">{trade.closeTime}</p>
                    </td>
                    <td className="px-12 py-4">
                      <div className="flex items-center gap-3">
                        <XauusdSmallIcon />
                        <span className="text-white text-base font-acid font-medium leading-[24.44px]">{trade.symbol}</span>
                      </div>
                    </td>
                    <td className="px-12 py-4">
                      <span className="inline-flex items-center justify-center px-[1.125rem] h-[1.5rem] rounded-full text-gfx-bullish-light text-xs font-acid leading-[18.8px]" style={{ outline: '1.16px solid #0C9104', outlineOffset: '-1.16px' }}>{trade.side}</span>
                    </td>
                    <td className="px-12 py-4">
                      <span className="text-white text-base font-acid font-medium leading-[24.44px]">{trade.volume}</span>
                    </td>
                    <td className="px-12 py-4">
                      <span className="text-white text-base font-acid font-medium leading-[24.44px]">{trade.openPrice}</span>
                    </td>
                    <td className="px-12 py-4">
                      <span className="text-white text-base font-acid font-medium leading-[24.44px]">{trade.closePrice}</span>
                    </td>
                    <td className="px-12 py-4">
                      <span className="text-gfx-red-muted text-base font-acid font-medium leading-[24.44px]">{trade.pnl}</span>
                    </td>
                  </tr>
                ))}
                {tradeTab === 0 && (
                  <tr>
                    <td colSpan={8} className="px-12 py-12 text-center text-gfx-neutral-300 text-sm font-acid">No open positions</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>

      <FollowStrategyModal
        open={followModalOpen}
        onClose={() => setFollowModalOpen(false)}
        onConfirm={() => setFollowModalOpen(false)}
        strategyName="C$ Signals"
        username="@csescoe"
        initials="CS"
        pricePerMonth="Free"
        profitShare="0%"
      />
    </div>
  )
}
