import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, GreenDot, ModeToggle, AiCoachButton, ChatButton } from '@/components/ui'
import { ChevronRightIcon } from '@/components/icons'
import { weeklyStats, recentTrades, highImpactNews, journalStats, journalTabs } from '@/data/journal'
import type { DayStatCard, RecentTrade, NewsEvent } from '@/data/journal'
import StatisticsView from '@/pages/journal/StatisticsView'
import StrategyDnaView from '@/pages/journal/StrategyDnaView'
import CalendarView from '@/pages/journal/CalendarView'
import TradesView from '@/pages/journal/TradesView'
import NotebookView from '@/pages/journal/NotebookView'
import ReplayView from '@/pages/journal/ReplayView'
import NewNoteModal from '@/pages/journal/NewNoteModal'
import NewFolderModal from '@/pages/journal/NewFolderModal'

/* ─── Inline SVG Icons ─── */

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
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.3523 4C10.3523 2.61929 11.4766 1.5 12.8636 1.5C14.2506 1.5 15.375 2.61929 15.375 4C15.375 5.38071 14.2506 6.5 12.8636 6.5C12.1633 6.5 11.5303 6.21447 11.0753 5.7551L7.59875 8.12216C7.63089 8.28186 7.64773 8.44684 7.64773 8.61539C7.64773 8.94916 7.58178 9.26818 7.46219 9.55977L11.2743 12.0644C11.7069 11.712 12.2605 11.5 12.8636 11.5C14.2506 11.5 15.375 12.6193 15.375 14C15.375 15.3807 14.2506 16.5 12.8636 16.5C11.4766 16.5 10.3523 15.3807 10.3523 14C10.3523 13.6384 10.4297 13.2941 10.5688 12.9834L6.78755 10.499C6.34647 10.8824 5.7687 11.1154 5.13636 11.1154C3.74938 11.1154 2.625 9.9961 2.625 8.61539C2.625 7.23467 3.74938 6.11539 5.13636 6.11539C5.93393 6.11539 6.64389 6.48544 7.10359 7.06138L10.4729 4.76732C10.3946 4.5252 10.3523 4.2672 10.3523 4Z" fill="#C6C6C6"/>
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
    <GlassCard
      variant="light"
      divider="none"
      rounded="19px"
      className={`flex-1 min-w-0 h-[114px] overflow-hidden ${
        stat.active ? 'border border-[#00b38c] weekly-stat-active' : 'weekly-stat-inactive'
      }`}
    >
      <div className="h-full px-[22px] py-[14px]">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <p className="text-[#808080] text-[16px] font-acid font-medium">{stat.day}</p>
            {stat.active && <GreenDot size={5} />}
          </div>
          <p className={`text-[16px] font-acid font-medium ${
            isPositive ? 'text-[#37c92e]' : isNegative ? 'text-[#d46356]' : 'text-[#ececec]'
          }`}>
            {isZero ? '$0.00' : `${isPositive ? '+' : '-'}$${Math.abs(stat.pnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </p>
          <p className="text-[#808080] text-[16px] font-acid">{stat.trades} trades</p>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Recent Trades Card ─── */

function RecentTradesCard({ trades }: { trades: RecentTrade[] }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="absolute -right-[100px] -top-[100px] w-[260px] h-[260px] rounded-full bg-gfx-green-200 opacity-70 blur-[60px] pointer-events-none" aria-hidden="true" />
      <div className="relative p-6 pb-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-white text-[24px] font-acid font-normal">Recent Trades</h3>
            <p className="text-[#808080] text-[16px] font-acid font-medium mt-1">Last 4 registed trades</p>
          </div>
          <SparkleButton className="px-10">
            <span className="flex items-center gap-2">
              <span>See all</span>
            </span>
          </SparkleButton>
        </div>

        <div className="mt-5">
          <div className="overflow-x-auto">
          <div className="grid grid-cols-4 px-4 mb-3 min-w-[500px]">
            <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Date / Time</span>
            <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Instrument</span>
            <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Side</span>
            <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider text-right">P&L</span>
          </div>
          <div className="flex flex-col min-w-[500px]">
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
      <div className="absolute -left-[100px] -top-[100px] w-[260px] h-[260px] rounded-full bg-gfx-green-200 opacity-70 blur-[60px] pointer-events-none" aria-hidden="true" />
      <div className="relative p-6 pb-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-white text-[24px] font-acid font-normal">High Impact News</h3>
            <p className="text-[#808080] text-[16px] font-acid font-medium mt-1">Last 4 registed trades</p>
          </div>
          <SparkleButton className="px-10">
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
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden h-[182px]">
      <div className="absolute -left-[100px] -top-[100px] w-[260px] h-[260px] rounded-full bg-gfx-green-200 opacity-70 blur-[60px] pointer-events-none" aria-hidden="true" />
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-2">
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
  const [activeTab, setActiveTab] = useState(0)
  const [newNoteOpen, setNewNoteOpen] = useState(false)
  const [newFolderOpen, setNewFolderOpen] = useState(false)

  return (
    <div className="journal-page relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
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
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-h1 font-normal">Trading Journal</h1>
            <p className="text-[#808080] text-[14px] font-acid">Track and analyze your trading performance</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <AiCoachButton />
            <ChatButton />
            <button className="flex items-center gap-3 h-[72px] px-[19px] rounded-[20px] border border-[#303030] hover:border-[#404040] transition-colors cursor-pointer">
              <div className="relative w-[18px] h-[18px] flex items-center justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-[#37C92E] shadow-[0_0_4px_rgba(12,145,4,1)]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white text-[16px] font-acid font-medium leading-[24px]">All Accounts</span>
                <span className="text-white text-[16px] font-acid font-medium leading-[24px]">$0.00</span>
              </div>
              <ChevronRightIcon size={20} color="#808080" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full overflow-x-auto max-w-4xl">
          <ModeToggle
            options={[...journalTabs]}
            defaultIndex={0}
            activeIndex={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {activeTab === 0 && (
          <>
            {/* Weekly Stats Carousel */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-gfx-green-200 opacity-45 blur-[80px] pointer-events-none" aria-hidden="true" />
              <div className="relative p-[30px]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white text-[24px] font-acid">Welcome back, marcelo</p>
                    <p className="text-[#808080] text-[16px] font-acid font-medium mt-1">This week</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <SparkleButton className="!w-[52px] !h-[52px] !rounded-full px-0">
                      <ShareIcon />
                    </SparkleButton>
                    <button className="w-[52px] h-[52px] rounded-[15px] bg-[#09241c] flex items-center justify-center hover:bg-[#0d2e24] transition-colors cursor-pointer">
                      <ChevronLeftSmall />
                    </button>
                    <button className="w-[52px] h-[52px] rounded-[15px] bg-[#09241c] flex items-center justify-center hover:bg-[#0d2e24] transition-colors cursor-pointer">
                      <ChevronRightSmall />
                    </button>
                  </div>
                </div>
                <div className="flex gap-[13px] overflow-x-auto pb-2 scrollbar-hide">
                  {weeklyStats.map((stat, i) => (
                    <WeeklyStatCard key={i} stat={stat} />
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Stats Row: Net P&L + 2x2 grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
              <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
                <div className="absolute -right-[100px] -top-[100px] w-[260px] h-[260px] rounded-full bg-gfx-green-200 opacity-70 blur-[60px] pointer-events-none" aria-hidden="true" />
                <div className="relative p-6 h-full flex flex-col min-h-[340px]">
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

              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Most Traded Asset">
                  <div className="flex items-center gap-3">
                    <XauusdIcon />
                    <span className="text-white text-[22px] font-acid">XAUUSD</span>
                  </div>
                </StatCard>
                <StatCard label="Total Trades">
                  <div className="flex items-center gap-3">
                    <DiagramUpIcon />
                    <span className="text-white text-[24px] font-acid">{journalStats.totalTrades}</span>
                  </div>
                </StatCard>
                <StatCard label="Win rate">
                  <DonutChart value={journalStats.winRate} label={`${journalStats.winRate}%`} />
                </StatCard>
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
          </>
        )}

        {activeTab === 1 && <StatisticsView />}
        {activeTab === 2 && <StrategyDnaView />}
        {activeTab === 3 && <CalendarView />}
        {activeTab === 4 && <TradesView />}
        {activeTab === 5 && (
          <NotebookView
            onNewNote={() => setNewNoteOpen(true)}
            onNewFolder={() => setNewFolderOpen(true)}
          />
        )}
        {activeTab === 6 && <ReplayView />}

      </div>

      <NewNoteModal open={newNoteOpen} onClose={() => setNewNoteOpen(false)} />
      <NewFolderModal open={newFolderOpen} onClose={() => setNewFolderOpen(false)} />
    </div>
  )
}
