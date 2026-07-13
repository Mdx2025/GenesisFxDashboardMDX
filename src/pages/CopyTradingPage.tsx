import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { useNavigate } from 'react-router-dom'
import { GlassCard, GlassBannerCard, SparkleButton, ModeToggle, GlowEllipse, GlowButton, SearchInput, StatCard } from '@/components/ui'
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

function CourseUpIcon() {
  return (
    <div className="w-[70px] h-[70px] rounded-full bg-[#064b34] flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7H22V13" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3.33V12.67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.33 8H12.67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 10H23" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
  const navigate = useNavigate()
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
            <GlassBannerCard>
              <div className="flex items-center justify-between gap-8">
                <div>
                  <h2 className="text-white text-[2.5rem] xl:text-[3.125rem] font-acid leading-none">Copy Trading</h2>
                  <p className="text-[#a0a0a0] text-[0.875rem] xl:text-[1rem] font-acid font-medium mt-4 max-w-[37rem] leading-relaxed">
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
                <div className="hidden xl:flex items-center gap-4 bg-[#0a2e1f] rounded-[1rem] px-6 py-5 shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-[#10BC83]/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L5 7.5M5 7.5L7.5 10M5 7.5H15M12.5 10L15 12.5M15 12.5L12.5 15M15 12.5H5" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <p className="text-white text-[2rem] font-acid leading-none">71</p>
                    <p className="text-[#a0a0a0] text-[0.75rem] font-acid mt-1">Active strategies</p>
                  </div>
                </div>
              </div>
            </GlassBannerCard>

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
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <div className="flex flex-col items-center justify-center py-[60px] px-8 min-h-[421px]">
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
          </GlassCard>
        )}

        {/* Master Tab */}
        {activeTab === 2 && (
          <>
            {/* Profile Banner */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="relative flex items-center justify-between p-6 lg:p-8">
                <div className="flex items-center gap-5">
                  <div className="w-[63px] h-[63px] rounded-full bg-[#064b34] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[1.5rem] font-acid">M</span>
                  </div>
                  <div>
                    <h3 className="text-white text-[1.5rem] font-acid leading-normal">marcelo cedeno</h3>
                    <p className="text-[#a0a0a0] text-[1rem] font-acid font-medium leading-[24.44px]">Manage your copy trading strategies</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#0c1311] rounded-[8px] px-4 py-2 flex items-center gap-2.5">
                    <WalletIcon />
                    <span className="text-[#808080] text-[0.875rem] font-acid">Social Wallet</span>
                    <span className="text-[#ececec] text-[0.875rem] font-acid">$100.00</span>
                  </div>
                  <GlowButton
                    label="Create strategy"
                    icon={<PlusIcon />}
                    width={180}
                    height={44}
                    onClick={() => navigate('/gensocial/pamm/create-strategy')}
                  />
                </div>
              </div>
            </GlassCard>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total AUM" value="$0.00" />
              <StatCard label="Total Strategies" value="$0.00" />
              <StatCard label="Total Followers" value="$0.00" valueColor="text-[#37c92e]" />
              <StatCard label="Fee Earnings" value="$0.00" />
            </div>

            {/* Master Dashboard */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="relative">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between p-6 lg:p-8 pb-6">
                  <h3 className="text-white text-[1.5rem] font-acid leading-normal">Master Dashboard</h3>
                  <SearchInput placeholder="Search strategies" className="w-[287px]" />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />

                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-[60px] px-8">
                  <CourseUpIcon />
                  <h3 className="text-white text-[1.5rem] font-acid leading-normal mt-8">
                    No Strategies Created
                  </h3>
                  <p className="text-[#808080] text-[1rem] font-acid leading-[1.2] text-center mt-2 max-w-[396px]">
                    {`You haven't subscribed to any copy trading strategies yet. Browse available strategies and start copying successful traders`}
                  </p>
                  <div className="mt-8">
                    <GlowButton
                      label="Create strategy"
                      icon={<PlusIcon />}
                      width={200}
                      height={44}
                      onClick={() => navigate('/gensocial/pamm/create-strategy')}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </>
        )}

      </div>
    </div>
  )
}
