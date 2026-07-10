import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, GreenDot } from '@/components/ui'
import { ChevronRightIcon } from '@/components/icons'
import { weeklyStats, recentTrades, highImpactNews, journalStats, journalTabs } from '@/data/journal'
import type { DayStatCard, RecentTrade, NewsEvent } from '@/data/journal'

/* ─── Inline SVG Icons ─── */

function AiCoachIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 1L12.39 7.26L19 8.27L14.12 12.97L15.18 19.52L10 16.77L4.82 19.52L5.88 12.97L1 8.27L7.61 7.26L10 1Z" fill="#B08CFF" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 2C5.58 2 2 5.13 2 9C2 11.38 3.19 13.47 5.06 14.78C4.9 15.82 4.5 16.9 3.5 17.5C5.57 17.5 7.09 16.71 7.97 16.01C8.63 16.15 9.31 16.23 10 16.23C14.42 16.23 18 13.1 18 9.23C18 5.36 14.42 2 10 2Z" fill="#B08CFF" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="#606060" strokeWidth="1.2" />
      <path d="M9 8V13" stroke="#606060" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="0.75" fill="#606060" />
    </svg>
  )
}

function DiagramUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 17L9 11L13 15L21 7" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7H21V13" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6L12 2L8 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2V15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronLeftSmall() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M7 1L1 7L7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightSmall() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M1 1L7 7L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Donut Chart Component ─── */

function DonutChart({ value, label, color = '#10BC83' }: { value: number; label: string; color?: string }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = (value / 100) * circumference
  const remaining = circumference - progress

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-[-90deg]">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#09241c" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={`${progress} ${remaining}`}
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_rgba(16,188,131,0.5)]"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-[14px] font-acid">{label}</span>
      </div>
    </div>
  )
}

/* ─── XAUUSD Icon ─── */

function XauusdIcon() {
  return (
    <div className="w-[38px] h-[38px] rounded-full bg-[#d69a00] flex items-center justify-center overflow-hidden">
      <svg width="27" height="17" viewBox="0 0 27 17" fill="none">
        <path d="M13.5 0L16.5 6H10.5L13.5 0ZM4 17L0 7H8L4 17ZM23 17L19 7H27L23 17ZM13.5 17L9 7H18L13.5 17Z" fill="white" />
      </svg>
    </div>
  )
}

/* ─── P&L Area Chart ─── */

function PnlAreaChart() {
  const points = [
    [0, 85], [30, 75], [55, 80], [80, 65], [110, 70], [140, 50],
    [170, 55], [200, 40], [230, 45], [260, 35], [290, 42],
    [320, 30], [350, 35], [380, 25], [410, 30], [440, 20],
  ]
  const w = 460
  const h = 120
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const areaD = `${pathD} L${w},${h} L0,${h} Z`

  const dotX = 350
  const dotY = 35

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mt-auto">
      <defs>
        <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10BC83" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10BC83" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#pnlGrad)" />
      <path d={pathD} stroke="#10BC83" strokeWidth="2" fill="none" />
      <circle cx={dotX} cy={dotY} r="4" fill="#10BC83" />
      <circle cx={dotX} cy={dotY} r="8" fill="#10BC83" fillOpacity="0.2" />
    </svg>
  )
}

/* ─── Weekly Stat Card ─── */

function WeeklyStatCard({ stat }: { stat: DayStatCard }) {
  const isPositive = stat.pnl > 0
  const isNegative = stat.pnl < 0
  const isZero = stat.pnl === 0

  return (
    <div
      className={`relative flex-shrink-0 w-[148px] h-[100px] rounded-[16px] flex flex-col justify-between p-3.5 overflow-hidden ${
        stat.active ? 'bg-[#0c1311] border border-white/10' : 'bg-[#09241c]'
      }`}
    >
      {stat.active && (
        <div className="absolute top-3 right-3">
          <GreenDot size={5} />
        </div>
      )}
      <p className="text-gfx-neutral-500 text-[12px] font-acid">{stat.day}</p>
      <div>
        <p className={`text-[14px] font-acid ${
          isPositive ? 'text-[#37c92e]' : isNegative ? 'text-[#d46356]' : 'text-white'
        }`}>
          {isZero ? '$0.00' : `${isPositive ? '+' : '-'}$${Math.abs(stat.pnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
        </p>
        <p className="text-gfx-neutral-300 text-[10px] font-acid">{stat.trades} trades</p>
      </div>
    </div>
  )
}

/* ─── Recent Trades Card ─── */

function RecentTradesCard({ trades }: { trades: RecentTrade[] }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[30%] w-[493px] h-[278px] rounded-full pointer-events-none bg-[#064b34] [filter:blur(314px)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-6 pb-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-white text-[24px] font-acid font-normal">Recent Trades</h3>
            <p className="text-[#808080] text-[16px] font-acid font-medium mt-1">Last 4 registed trades</p>
          </div>
          <SparkleButton className="px-5">
            <span className="flex items-center gap-2">
              <span>See all</span>
            </span>
          </SparkleButton>
        </div>

        <div className="mt-5">
          <div className="grid grid-cols-4 px-4 mb-3">
            <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Date / Time</span>
            <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Instrument</span>
            <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Side</span>
            <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider text-right">P&L</span>
          </div>
          <div className="flex flex-col">
            {trades.map((trade, i) => (
              <div key={i} className="grid grid-cols-4 items-center px-4 h-[68px] border-t border-white/5">
                <span className="text-white text-[14px] font-acid">{trade.date}</span>
                <span className="text-white text-[14px] font-acid">{trade.instrument}</span>
                <span className="text-gfx-neutral-500 text-[14px] font-acid">{trade.side}</span>
                <span className={`text-[14px] font-acid text-right ${trade.pnl >= 0 ? 'text-[#37c92e]' : 'text-[#d46356]'}`}>
                  {trade.pnl >= 0 ? '+' : '-'}${Math.abs(trade.pnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── High Impact News Card ─── */

function ImpactDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${i <= level ? 'bg-[#d46356]' : 'bg-white/10'}`}
        />
      ))}
    </div>
  )
}

function HighImpactNewsCard({ news }: { news: NewsEvent[] }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[30%] w-[493px] h-[278px] rounded-full pointer-events-none bg-[#064b34] [filter:blur(314px)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-6 pb-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-white text-[24px] font-acid font-normal">High Impact News</h3>
            <p className="text-[#808080] text-[16px] font-acid font-medium mt-1">Last 4 registed trades</p>
          </div>
          <SparkleButton className="px-5">
            <span className="flex items-center gap-2">
              <span>See all</span>
            </span>
          </SparkleButton>
        </div>

        <div className="flex flex-col mt-5">
          {news.map((event, i) => (
            <div key={i} className="flex items-center gap-4 px-4 h-[68px] border-t border-white/5">
              <div className="w-[47px] h-[48px] rounded-[18px] bg-[#2a1411] flex items-center justify-center flex-shrink-0">
                <span className="text-[#d46356] text-[17px] font-acid">{event.countryCode}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[16px] font-acid font-medium">{event.title}</p>
                <p className="text-[#808080] text-[14px] font-acid mt-0.5">
                  {event.time} &bull; Forecast: {event.forecast} &bull; Prev: {event.previous}
                </p>
              </div>
              <ImpactDots level={event.impact} />
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Stat Cards ─── */

function StatCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[40%] w-[493px] h-[278px] rounded-full pointer-events-none bg-[#064b34] [filter:blur(314px)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-5 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-gfx-neutral-500 text-[16px] font-acid font-medium">{label}</span>
          <InfoIcon />
        </div>
        <div className="flex-1 flex items-center justify-center mt-2">
          {children}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Main Page ─── */

export default function JournalPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState<string>('Overview')

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Tradelocker', href: '/tradelocker' },
          { label: 'Journal', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-white text-h1 font-normal">Trading Journal</h1>
            <p className="text-[#808080] text-[14px] font-acid mt-1">Track and analyze your trading performance</p>
          </div>
          <div className="flex items-center gap-3">
            {/* AI Coach */}
            <button className="flex items-center gap-2 h-12 px-5 rounded-full bg-transparent border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
              <AiCoachIcon />
              <span className="text-white text-[16px] font-acid font-medium">AI Coach</span>
              <div className="w-[1px] h-5 bg-white/10 mx-1" />
              <ChatIcon />
            </button>
            {/* All Accounts */}
            <button className="flex items-center gap-3 h-12 px-5 rounded-[16px] border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
              <GreenDot size={8} />
              <div className="flex flex-col items-start">
                <span className="text-white text-[14px] font-acid font-medium leading-tight">All Accounts</span>
                <span className="text-gfx-neutral-500 text-[12px] font-acid leading-tight">$0.00</span>
              </div>
              <ChevronRightIcon size={16} color="#606060" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1">
          {journalTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-10 px-5 rounded-full text-[14px] font-acid font-medium transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-gfx-green-500 text-white'
                  : 'bg-transparent text-gfx-neutral-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Weekly Stats Carousel */}
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
          <div className="absolute left-1/2 -translate-x-1/2 -top-[20%] w-[493px] h-[278px] rounded-full pointer-events-none bg-[#064b34] [filter:blur(314px)] will-change-transform" aria-hidden="true" />
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-white text-[24px] font-acid">Welcome back, marcelo</p>
                <p className="text-[#808080] text-[16px] font-acid font-medium mt-1">This week</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-[44px] h-[44px] rounded-[13px] border border-white/10 bg-transparent flex items-center justify-center hover:border-white/20 transition-colors cursor-pointer">
                  <ShareIcon />
                </button>
                <button className="w-[44px] h-[44px] rounded-[13px] border border-white/10 bg-transparent flex items-center justify-center hover:border-white/20 transition-colors cursor-pointer">
                  <ChevronLeftSmall />
                </button>
                <button className="w-[44px] h-[44px] rounded-[13px] border border-white/10 bg-transparent flex items-center justify-center hover:border-white/20 transition-colors cursor-pointer">
                  <ChevronRightSmall />
                </button>
              </div>
            </div>
            <div className="flex gap-[10px] overflow-x-auto pb-2 scrollbar-hide">
              {weeklyStats.map((stat, i) => (
                <WeeklyStatCard key={i} stat={stat} />
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Stats Row: Net P&L + 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
          {/* Net P&L Card */}
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 -top-[20%] w-[493px] h-[278px] rounded-full pointer-events-none bg-[#064b34] [filter:blur(314px)] will-change-transform" aria-hidden="true" />
            <div className="relative z-10 p-6 h-full flex flex-col min-h-[340px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gfx-neutral-500 text-[16px] font-acid font-medium">Net P&L</span>
                  <InfoIcon />
                </div>
                <div className="flex items-center gap-2 h-[30px] px-3 rounded-full border border-gfx-green-500/30 bg-gfx-green-500/5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 17L9 11L13 15L21 7" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-gfx-green-500 text-[12px] font-acid">24H +$0.00(0.0%)</span>
                </div>
              </div>
              <p className="text-[#37c92e] text-[36px] font-acid mt-3">
                +${journalStats.totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-gfx-neutral-500 text-[14px] font-acid mt-1">Last 30 days</p>
              <div className="flex-1 flex items-end mt-4">
                <PnlAreaChart />
              </div>
            </div>
          </GlassCard>

          {/* Right: 2x2 stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Most Traded Asset */}
            <StatCard label="Most Traded Asset">
              <div className="flex items-center gap-3">
                <XauusdIcon />
                <span className="text-white text-[22px] font-acid">XAUUSD</span>
              </div>
            </StatCard>

            {/* Total Trades */}
            <StatCard label="Total Trades">
              <div className="flex items-center gap-3">
                <DiagramUpIcon />
                <span className="text-white text-[24px] font-acid">{journalStats.totalTrades}</span>
              </div>
            </StatCard>

            {/* Win Rate */}
            <StatCard label="Win rate">
              <DonutChart value={journalStats.winRate} label={`${journalStats.winRate}%`} />
            </StatCard>

            {/* Profit Factor */}
            <StatCard label="Profit Factor">
              <DonutChart value={(journalStats.profitFactor / 3) * 100} label={`${journalStats.profitFactor}`} />
            </StatCard>
          </div>
        </div>

        {/* Bottom: Recent Trades + High Impact News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTradesCard trades={recentTrades} />
          <HighImpactNewsCard news={highImpactNews} />
        </div>

      </div>
    </div>
  )
}
