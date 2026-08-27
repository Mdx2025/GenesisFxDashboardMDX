import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { FollowStrategyModal } from '@/components/dashboard/FollowStrategyModal'
import { ProfileHeader } from '@/components/dashboard/ProfileHeader'
import { GlassCard, SparkleButton, ModeToggle, GlowEllipse, GlowButton, PeriodPill, Badge, BannerStatBox, StatCard } from '@/components/ui'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'

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
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9.49995" cy="3.8" r="3.3" fill="black"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.2125 17.0016C11.8513 17.0016 11.1707 17.0016 10.7478 16.5787C10.325 16.1558 10.325 15.4752 10.325 14.1141C10.325 12.7529 10.325 12.0723 10.7478 11.6494C11.1707 11.2266 11.8513 11.2266 13.2125 11.2266C14.5736 11.2266 15.2542 11.2266 15.6771 11.6494C16.1 12.0723 16.1 12.7529 16.1 14.1141C16.1 15.4752 16.1 16.1558 15.6771 16.5787C15.2542 17.0016 14.5736 17.0016 13.2125 17.0016ZM13.6937 12.8307C13.6937 12.5649 13.4782 12.3495 13.2125 12.3495C12.9467 12.3495 12.7312 12.5649 12.7312 12.8307V13.6328H11.9291C11.6633 13.6328 11.4479 13.8483 11.4479 14.1141C11.4479 14.3798 11.6633 14.5953 11.9291 14.5953H12.7312V15.3974C12.7312 15.6632 12.9467 15.8786 13.2125 15.8786C13.4782 15.8786 13.6937 15.6632 13.6937 15.3974V14.5953H14.4958C14.7616 14.5953 14.977 14.3798 14.977 14.1141C14.977 13.8483 14.7616 13.6328 14.4958 13.6328H13.6937V12.8307Z" fill="black"/>
      <path d="M12.5344 9.98902C12.1441 9.99375 11.7803 10.008 11.4633 10.0506C10.933 10.1219 10.3524 10.2923 9.87274 10.772C9.39305 11.2517 9.22262 11.8322 9.15131 12.3626C9.08723 12.8392 9.08732 13.4216 9.08741 14.0408V14.1826C9.08732 14.8018 9.08723 15.3842 9.15131 15.8608C9.20135 16.233 9.3002 16.6298 9.52045 16.9992C9.51361 16.9992 9.50676 16.9992 9.4999 16.9992C2.8999 16.9992 2.8999 15.3371 2.8999 13.2867C2.8999 11.2364 5.85482 9.57422 9.4999 9.57422C10.594 9.57422 11.6259 9.72397 12.5344 9.98902Z" fill="black"/>
    </svg>
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

        {/* Header */}
        <ProfileHeader
          onBack={() => navigate('/gensocial/signals')}
          backLabel="Back to signals"
          initials="CS"
          name="C$ Signals"
          badges={<Badge variant="active">Active</Badge>}
          meta={['@csescoe', 'Signals Provider', '11 followers']}
          ctaLabel="Follow"
          ctaIcon={<FollowPersonIcon />}
          onCtaClick={() => setFollowModalOpen(true)}
        />

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard dense label="Total Signals" value="2" icon={<ChartIcon />} />
          <StatCard dense label="Win Rate" value="100%" valueColor="text-gfx-bullish-light" icon={<PieChartIcon />} />
          <StatCard dense label="Total P&L" value="$50.35" valueColor="text-gfx-bullish-light" icon={<GraphUpIcon />} />
          <StatCard dense label="Max Drawdown" value="196" icon={<UsersIcon />} />
        </div>

        {/* Chart (left) + Strategy Details (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_23.5rem] gap-5">
          {/* P&L Performance Chart */}
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden h-full">
            <GlowEllipse className="right-0 -top-[6.25rem]" />
            <div className="relative p-6 lg:p-8 h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-white text-2xl font-acid">P&L Perfomance</h3>
                <PeriodPill />
              </div>
              <div className="flex-1 min-h-[18.125rem] xl:min-h-0">
                <PortfolioChart config={defaultChartConfig} />
              </div>
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
                    {i > 0 && <div className="w-full h-px bg-gfx-green-150 my-4" />}
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
                <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-6 mb-2">Most Traded</p>
                <div className="flex items-center gap-2 bg-gfx-green-800 rounded-sm border-[1.32px] border-gfx-green-900 px-3 py-2">
                  <XauusdSmallIcon />
                  <span className="text-white text-base font-acid font-bold tracking-wide" style={{ lineHeight: '25.81px' }}>XAUUSD</span>
                  <span className="text-gfx-neutral-400 text-sm font-acid leading-5">2</span>
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
                  <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-6 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Follow this Strategy Card */}
          <div className="bg-gfx-green-900 rounded-lg overflow-hidden px-8 py-25 flex flex-col justify-center">
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
        <GlassCard variant="light" divider="none" rounded="18.56px" className="trades-table-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[60rem]">
              <thead>
                <tr style={{ borderBottom: '0.77px solid rgba(255,255,255,0.04)' }}>
                  {['Open Time', 'Close Time', 'Symbol', 'Side', 'Volume', 'Open Price', 'Close Price', 'Closed P&L'].map(h => (
                    <th key={h} className="text-left text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-tab leading-4 px-12 py-4">{h}</th>
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
