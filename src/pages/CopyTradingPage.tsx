import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, ModeToggle, GlowEllipse, GlowButton, SearchInput } from '@/components/ui'
import { ChevronRightIcon } from '@/components/icons'
import { copyTraders, copyTradingTabs, copyTradingFilterTabs } from '@/data/copyTrading'
import type { CopyTrader } from '@/data/copyTrading'

/* ─── Inline SVG Icons ─── */

function VerifiedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 0L8.5 1.5L10.5 1L11 3L13 3.5L12.5 5.5L14 7L12.5 8.5L13 10.5L11 11L10.5 13L8.5 12.5L7 14L5.5 12.5L3.5 13L3 11L1 10.5L1.5 8.5L0 7L1.5 5.5L1 3.5L3 3L3.5 1L5.5 1.5L7 0Z" fill="#10BC83" />
      <path d="M5 7L6.5 8.5L9 5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GridViewIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke={active ? '#10BC83' : '#808080'} strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke={active ? '#10BC83' : '#808080'} strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke={active ? '#10BC83' : '#808080'} strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" stroke={active ? '#10BC83' : '#808080'} strokeWidth="1.5" />
    </svg>
  )
}

function ListViewIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="4" rx="1" stroke={active ? '#10BC83' : '#808080'} strokeWidth="1.5" />
      <rect x="3" y="10" width="18" height="4" rx="1" stroke={active ? '#10BC83' : '#808080'} strokeWidth="1.5" />
      <rect x="3" y="16" width="18" height="4" rx="1" stroke={active ? '#10BC83' : '#808080'} strokeWidth="1.5" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#C6C6C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 10L12 15L17 10" stroke="#C6C6C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15V3" stroke="#C6C6C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SubscriptionIcon() {
  return (
    <div className="w-[70px] h-[70px] rounded-full bg-[#064b34] flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ─── Mini Area Chart ─── */

function MiniAreaChart({ data }: { data: number[] }) {
  const w = 325
  const h = 52
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)

  const points = data.map((v, i) => [i * step, h - ((v - min) / range) * h * 0.8 - h * 0.1])
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${w},${h} L0,${h} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="copyChartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10BC83" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10BC83" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#copyChartGrad)" />
      <path d={pathD} stroke="#10BC83" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  )
}

/* ─── Leaderboard Trader Card ─── */

function TraderCard({ trader }: { trader: CopyTrader }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden flex flex-col">
      <div className="relative p-6 pb-0 flex flex-col flex-1">
        {/* Header: Avatar + Name + Username + Verified */}
        <div className="flex items-start gap-3">
          <div className="w-[63px] h-[63px] rounded-full bg-[#064b34] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[16px] font-acid font-medium">{trader.initials}</span>
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-[16px] font-acid font-medium truncate">{trader.name}</span>
              {trader.verified && <VerifiedIcon />}
            </div>
            <p className="text-[#a0a0a0] text-[16px] font-acid font-medium mt-0.5">{trader.username}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mt-4" />

        {/* Total P&L + Badges */}
        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[#a0a0a0] text-[16px] font-acid font-medium">Total P&L</p>
            <div className="flex gap-2 ml-auto">
              <span className="border border-[#303030] rounded-full px-3 py-1 text-white text-[12px] font-acid font-medium">
                {trader.followers} Followers
              </span>
              <span className="border border-[#303030] rounded-full px-3 py-1 text-white text-[12px] font-acid font-medium">
                {trader.aum} AUM
              </span>
            </div>
          </div>
          <p className="text-[#10BC83] text-[24px] font-acid mt-2">{trader.totalPnlPercent}%</p>
        </div>

        {/* Chart area */}
        <div className="mt-4">
          <MiniAreaChart data={trader.chartData} />
        </div>

        {/* Stats Box */}
        <div className="bg-[#09241c] rounded-[9px] p-5 mt-4">
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between items-center">
              <span className="text-[#808080] text-[16px] font-acid font-medium">Total P&L</span>
              <span className="text-white text-[16px] font-acid font-medium">{trader.totalPnlAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#808080] text-[16px] font-acid font-medium">Equity</span>
              <span className="text-white text-[16px] font-acid font-medium">{trader.equity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#808080] text-[16px] font-acid font-medium">Win Rate</span>
              <span className="text-white text-[16px] font-acid font-medium">{trader.winRate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#808080] text-[16px] font-acid font-medium">Max Drawdown</span>
              <span className="text-white text-[16px] font-acid font-medium">{trader.maxDrawdown}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons — stacked full-width */}
      <div className="flex flex-col gap-2.5 p-6 pt-5">
        <SparkleButton fullWidth className="px-5">
          <span className="flex items-center justify-center gap-2">
            <span>Copy Trader</span>
            <ChevronRightIcon size={18} color="#c6c6c6" />
          </span>
        </SparkleButton>
        <SparkleButton fullWidth className="px-5">
          <span className="flex items-center justify-center gap-2">
            <span>View Profile</span>
            <ChevronRightIcon size={18} color="#c6c6c6" />
          </span>
        </SparkleButton>
      </div>
    </GlassCard>
  )
}

/* ─── Main Page ─── */

export default function CopyTradingPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)
  const [filterTab, setFilterTab] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTraders = copyTraders.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="copy-trading-page relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'GenSocial', href: '/gensocial/copy-trading' },
          { label: 'Copy Trading', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">

        {/* Page Title */}
        <h1 className="text-white text-h1 font-normal">Copy Trading</h1>

        {/* Top Tabs: Leaderboard | Follower | Master */}
        <div className="w-full overflow-x-auto max-w-lg">
          <ModeToggle
            options={[...copyTradingTabs]}
            defaultIndex={0}
            activeIndex={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Leaderboard Tab */}
        {activeTab === 0 && (
          <>
            {/* Hero Banner */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <GlowEllipse className="left-1/2 -translate-x-1/4 -top-[200px]" />
              <GlowEllipse className="-left-[100px] -top-[80px] !w-[30rem] !h-[17rem]" />
              <div className="relative p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-white text-[50px] font-acid leading-none">Copy Trading</h2>
                  <p className="text-[#a0a0a0] text-[16px] font-acid font-medium mt-5 max-w-[574px] leading-relaxed">
                    Mirror trades from top-performing traders automatically. Browse the leaderboard, pick a strategy, and start copying in minutes.
                  </p>
                  <div className="mt-6">
                    <SparkleButton className="px-6">
                      <span className="flex items-center gap-2">
                        <DownloadIcon />
                        <span>Download App</span>
                      </span>
                    </SparkleButton>
                  </div>
                </div>
                <div className="relative w-[359px] h-[134px] bg-[#09241c] rounded-[30px]">
                  <div className="absolute left-[18px] top-[18px] w-[98px] h-[98px] bg-[#064b34] rounded-[12.51px] flex items-center justify-center">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.3346 11.6673L27.7096 11.668C30.1259 11.6683 32.0849 9.7099 32.0853 7.29366C32.0857 4.87741 30.1273 2.91835 27.711 2.91797C25.2948 2.91759 23.3357 4.87603 23.3353 7.29228L23.3346 11.6673L11.6687 11.6673L11.668 7.29228C11.6676 4.87603 9.70853 2.91759 7.29228 2.91797C4.87603 2.91835 2.91759 4.87741 2.91797 7.29366C2.91835 9.7099 4.87741 11.6683 7.29366 11.668L11.6687 11.6673L11.668 23.3339H23.3346V11.6673Z" fill="white"/>
                      <path d="M23.3346 23.3339L27.7096 23.3346C30.1259 23.3343 32.0849 25.2927 32.0853 27.7089C32.0857 30.1252 30.1273 32.0843 27.711 32.0846C25.2948 32.085 23.3357 30.1266 23.3353 27.7103L23.3346 23.3339Z" fill="white"/>
                      <path d="M7.29366 23.3346L11.6687 23.3353L11.668 27.7103C11.6676 30.1266 9.70853 32.085 7.29228 32.0846C4.87603 32.0843 2.91759 30.1252 2.91797 27.7089C2.91835 25.2927 4.87741 23.3343 7.29366 23.3346Z" fill="white"/>
                    </svg>
                  </div>
                  <p className="absolute left-[143px] top-[38px] text-white text-[50px] font-acid leading-none">71</p>
                  <p className="absolute left-[143px] top-[89px] text-[#808080] text-[16px] font-acid font-medium leading-[24.44px]">Active strategies</p>
                </div>
              </div>
            </GlassCard>

            {/* Filter Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="w-full overflow-x-auto max-w-lg">
                <ModeToggle
                  options={[...copyTradingFilterTabs]}
                  defaultIndex={0}
                  activeIndex={filterTab}
                  onChange={setFilterTab}
                />
              </div>
              <div className="flex items-center gap-3">
                <SearchInput
                  placeholder="Search traders"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="w-[287px]"
                />
                <button
                  onClick={() => {}}
                  className="w-[47px] h-[44px] rounded-[10px] bg-[#09241c] flex items-center justify-center hover:bg-[#0d2e24] transition-colors cursor-pointer"
                >
                  <StarIcon />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-[47px] h-[44px] rounded-[10px] flex items-center justify-center transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-[#064b34]' : 'bg-[#09241c] hover:bg-[#0d2e24]'}`}
                >
                  <ListViewIcon active={viewMode === 'list'} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-[47px] h-[44px] rounded-[10px] flex items-center justify-center transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#064b34]' : 'bg-[#09241c] hover:bg-[#0d2e24]'}`}
                >
                  <GridViewIcon active={viewMode === 'grid'} />
                </button>
              </div>
            </div>

            {/* Trader Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTraders.map(trader => (
                <TraderCard key={trader.id} trader={trader} />
              ))}
            </div>
          </>
        )}

        {/* Follower Tab — Empty State */}
        {activeTab === 1 && (
          <div className="bg-[#0c1311] rounded-[19px] shadow-[0px_4.64px_23.2px_0px_rgba(0,0,0,0.03)] border border-[#0c1311] flex flex-col items-center justify-center py-[60px] px-8 min-h-[421px]">
            <SubscriptionIcon />
            <h3 className="text-white text-[1.5rem] font-acid leading-normal mt-8">
              No active Subscription
            </h3>
            <p className="text-[#808080] text-[1rem] font-acid leading-[1.2] text-center mt-2 max-w-[396px]">
              {`You haven't subscribed to any copy trading strategies yet. Browse available strategies and start copying successful traders`}
            </p>
            <div className="mt-8">
              <GlowButton
                label="Browse strategies"
                width={200}
                height={44}
                onClick={() => setActiveTab(0)}
              />
            </div>
          </div>
        )}

        {/* Master Tab — Empty State */}
        {activeTab === 2 && (
          <div className="bg-[#0c1311] rounded-[19px] shadow-[0px_4.64px_23.2px_0px_rgba(0,0,0,0.03)] border border-[#0c1311] flex flex-col items-center justify-center py-[60px] px-8 min-h-[421px]">
            <SubscriptionIcon />
            <h3 className="text-white text-[1.5rem] font-acid leading-normal mt-8">
              No active Strategies
            </h3>
            <p className="text-[#808080] text-[1rem] font-acid leading-[1.2] text-center mt-2 max-w-[396px]">
              {`You haven't created any master trading strategies yet. Set up your first strategy and start attracting followers`}
            </p>
            <div className="mt-8">
              <GlowButton
                label="Create Strategy"
                width={200}
                height={44}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
