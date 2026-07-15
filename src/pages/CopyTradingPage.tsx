import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { useNavigate } from 'react-router-dom'
import { GlassCard, GlassBannerCard, SparkleButton, ModeToggle, GlowEllipse, GlowButton, SearchInput, StatCard, BannerStatBox } from '@/components/ui'
import { CopySubscriptionModal } from '@/components/dashboard/CopySubscriptionModal'
import { CreateStrategyModal } from '@/components/dashboard/CreateStrategyModal'
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
    <div className="w-[4.375rem] h-[4.375rem] rounded-full bg-gfx-green-200 flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function CourseUpIcon() {
  return (
    <div className="w-[4.375rem] h-[4.375rem] rounded-full bg-gfx-green-200 flex items-center justify-center">
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

function FavoriteStarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7.91243 0.550781L10.1869 5.15856L15.2731 5.90199L11.5928 9.48664L12.4613 14.5508L7.91243 12.1586L3.36354 14.5508L4.23209 9.48664L0.551758 5.90199L5.63798 5.15856L7.91243 0.550781Z" stroke="#808080" strokeWidth="1.1041" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TraderCard({ trader, onCopy }: { trader: CopyTrader; onCopy?: (trader: CopyTrader) => void }) {
  const navigate = useNavigate()
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden flex flex-col">
      <div className="relative p-6 pb-0 flex flex-col flex-1">
        {/* Header: Avatar + Name + Username + Star */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-base font-acid font-medium">{trader.initials}</span>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-base font-acid font-medium truncate">{trader.name}</span>
              </div>
              <p className="text-gfx-neutral-500 text-base font-acid font-medium mt-0.5">{trader.username}</p>
            </div>
          </div>
          <button className="p-2 cursor-pointer" aria-label="Favorite">
            <FavoriteStarIcon />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mt-4" />

        {/* Total P&L + Badges */}
        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-gfx-neutral-500 text-base font-acid font-medium">Total P&L</p>
            <div className="flex gap-2 ml-auto">
              <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-white text-xs font-acid font-medium">
                {trader.followers} Followers
              </span>
              <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-white text-xs font-acid font-medium">
                {trader.aum} AUM
              </span>
            </div>
          </div>
          <p className="text-gfx-green-500 text-2xl font-acid mt-2">{trader.totalPnlPercent}%</p>
        </div>

        {/* Chart area */}
        <div className="mt-4">
          <MiniAreaChart data={trader.chartData} />
        </div>

        {/* Stats Box */}
        <div className="bg-gfx-green-900 rounded-sm p-5 mt-4">
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between items-center">
              <span className="text-gfx-neutral-400 text-base font-acid font-medium">Total P&L</span>
              <span className="text-white text-base font-acid font-medium">{trader.totalPnlAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gfx-neutral-400 text-base font-acid font-medium">Equity</span>
              <span className="text-white text-base font-acid font-medium">{trader.equity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gfx-neutral-400 text-base font-acid font-medium">Win Rate</span>
              <span className="text-white text-base font-acid font-medium">{trader.winRate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gfx-neutral-400 text-base font-acid font-medium">Max Drawdown</span>
              <span className="text-white text-base font-acid font-medium">{trader.maxDrawdown}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 p-6 pt-5">
        <SparkleButton fullWidth onClick={() => navigate('/gensocial/copy-trading/details-single-page')}>View</SparkleButton>
        <GlowButton label="Copy" width="100%" onClick={() => onCopy?.(trader)} />
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
  const [copyModalOpen, setCopyModalOpen] = useState(false)
  const [copyTarget, setCopyTarget] = useState<CopyTrader | null>(null)
  const [createStrategyOpen, setCreateStrategyOpen] = useState(false)

  const handleCopyClick = (trader: CopyTrader) => {
    setCopyTarget(trader)
    setCopyModalOpen(true)
  }

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
                  <h2 className="text-white text-section-title xl:text-5xl font-acid leading-none">Copy Trading</h2>
                  <p className="text-gfx-neutral-500 text-sm xl:text-base font-acid font-medium mt-4 max-w-[37rem] leading-relaxed">
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
                <BannerStatBox value={71} label="Active strategies" />
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
                  className="w-[17.9375rem]"
                />
                <button
                  onClick={() => {}}
                  className="relative w-12 h-11 flex items-center justify-center cursor-pointer"
                >
                  <svg className="absolute inset-0" width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 0.599609H25C36.8189 0.599609 46.4004 10.1811 46.4004 22C46.4004 33.8189 36.8189 43.4004 25 43.4004H22C10.1811 43.4004 0.599609 33.8189 0.599609 22C0.599609 10.1811 10.1811 0.599609 22 0.599609Z" stroke="#303030" strokeWidth="1.2"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="relative w-12 h-11 flex items-center justify-center cursor-pointer"
                >
                  <svg className="absolute inset-0" width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 0.599609H25C36.8189 0.599609 46.4004 10.1811 46.4004 22C46.4004 33.8189 36.8189 43.4004 25 43.4004H22C10.1811 43.4004 0.599609 33.8189 0.599609 22C0.599609 10.1811 10.1811 0.599609 22 0.599609Z" stroke={viewMode === 'list' ? '#064b34' : '#303030'} strokeWidth="1.2"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#listClipCT)">
                      <path d="M0 5.5C0 4.4128 0 3.8692 0.171271 3.44041C0.399632 2.86867 0.837649 2.41443 1.38896 2.17761C1.80245 2 2.32663 2 3.375 2H5.625C6.67337 2 7.19755 2 7.61104 2.17761C8.16235 2.41443 8.60037 2.86867 8.82873 3.44041C9 3.8692 9 4.4128 9 5.5C9 6.5872 9 7.1308 8.82873 7.55959C8.60037 8.13133 8.16235 8.58557 7.61104 8.82239C7.19755 9 6.67337 9 5.625 9H3.375C2.32663 9 1.80245 9 1.38896 8.82239C0.837649 8.58557 0.399632 8.13133 0.171271 7.55959C0 7.1308 0 6.5872 0 5.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                      <path d="M10 3.5C10 3.03406 10 2.80109 10.2664 2.61732C10.6217 2.37229 11.303 2.17761 12.1606 2.07612C12.8038 2 13.6192 2 15.25 2H18.75C20.3808 2 21.1962 2 21.8394 2.07612C22.697 2.17761 23.3784 2.37229 23.7336 2.61732C24 2.80109 24 3.03406 24 3.5C24 3.96594 24 4.19891 23.7336 4.38268C23.3784 4.62771 22.697 4.82239 21.8394 4.92388C21.1962 5 20.3808 5 18.75 5H15.25C13.6192 5 12.8038 5 12.1606 4.92388C11.303 4.82239 10.6217 4.62771 10.2664 4.38268C10 4.19891 10 3.96594 10 3.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                      <path d="M10 7.5C10 7.03406 10 6.80109 10.2664 6.61732C10.6217 6.37229 11.303 6.17761 12.1606 6.07612C12.8038 6 13.6192 6 15.25 6H18.75C20.3808 6 21.1962 6 21.8394 6.07612C22.697 6.17761 23.3784 6.37229 23.7336 6.61732C24 6.80109 24 7.03406 24 7.5C24 7.96594 24 8.19891 23.7336 8.38268C23.3784 8.62771 22.697 8.82239 21.8394 8.92388C21.1962 9 20.3808 9 18.75 9H15.25C13.6192 9 12.8038 9 12.1606 8.92388C11.303 8.82239 10.6217 8.62771 10.2664 8.38268C10 8.19891 10 7.96594 10 7.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                      <path d="M0 13.5C0 12.4128 0 11.8692 0.171271 11.4404C0.399632 10.8687 0.837649 10.4144 1.38896 10.1776C1.80245 10 2.32663 10 3.375 10H5.625C6.67337 10 7.19755 10 7.61104 10.1776C8.16235 10.4144 8.60037 10.8687 8.82873 11.4404C9 11.8692 9 12.4128 9 13.5C9 14.5872 9 15.1308 8.82873 15.5596C8.60037 16.1313 8.16235 16.5856 7.61104 16.8224C7.19755 17 6.67337 17 5.625 17H3.375C2.32663 17 1.80245 17 1.38896 16.8224C0.837649 16.5856 0.399632 16.1313 0.171271 15.5596C0 15.1308 0 14.5872 0 13.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                      <path d="M10 11.5C10 11.0341 10 10.8011 10.2664 10.6173C10.6217 10.3723 11.303 10.1776 12.1606 10.0761C12.8038 10 13.6192 10 15.25 10H18.75C20.3808 10 21.1962 10 21.8394 10.0761C22.697 10.1776 23.3784 10.3723 23.7336 10.6173C24 10.8011 24 11.0341 24 11.5C24 11.9659 24 12.1989 23.7336 12.3827C23.3784 12.6277 22.697 12.8224 21.8394 12.9239C21.1962 13 20.3808 13 18.75 13H15.25C13.6192 13 12.8038 13 12.1606 12.9239C11.303 12.8224 10.6217 12.6277 10.2664 12.3827C10 12.1989 10 11.9659 10 11.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                      <path d="M10 15.5C10 15.0341 10 14.8011 10.2664 14.6173C10.6217 14.3723 11.303 14.1776 12.1606 14.0761C12.8038 14 13.6192 14 15.25 14H18.75C20.3808 14 21.1962 14 21.8394 14.0761C22.697 14.1776 23.3784 14.3723 23.7336 14.6173C24 14.8011 24 15.0341 24 15.5C24 15.9659 24 16.1989 23.7336 16.3827C23.3784 16.6277 22.697 16.8224 21.8394 16.9239C21.1962 17 20.3808 17 18.75 17H15.25C13.6192 17 12.8038 17 12.1606 16.9239C11.303 16.8224 10.6217 16.6277 10.2664 16.3827C10 16.1989 10 15.9659 10 15.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                      <path d="M0 21.5C0 20.4128 0 19.8692 0.171271 19.4404C0.399632 18.8687 0.837649 18.4144 1.38896 18.1776C1.80245 18 2.32663 18 3.375 18H5.625C6.67337 18 7.19755 18 7.61104 18.1776C8.16235 18.4144 8.60037 18.8687 8.82873 19.4404C9 19.8692 9 20.4128 9 21.5C9 22.5872 9 23.1308 8.82873 23.5596C8.60037 24.1313 8.16235 24.5856 7.61104 24.8224C7.19755 25 6.67337 25 5.625 25H3.375C2.32663 25 1.80245 25 1.38896 24.8224C0.837649 24.5856 0.399632 24.1313 0.171271 23.5596C0 23.1308 0 22.5872 0 21.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                      <path d="M10 19.5C10 19.0341 10 18.8011 10.2664 18.6173C10.6217 18.3723 11.303 18.1776 12.1606 18.0761C12.8038 18 13.6192 18 15.25 18H18.75C20.3808 18 21.1962 18 21.8394 18.0761C22.697 18.1776 23.3784 18.3723 23.7336 18.6173C24 18.8011 24 19.0341 24 19.5C24 19.9659 24 20.1989 23.7336 20.3827C23.3784 20.6277 22.697 20.8224 21.8394 20.9239C21.1962 21 20.3808 21 18.75 21H15.25C13.6192 21 12.8038 21 12.1606 20.9239C11.303 20.8224 10.6217 20.6277 10.2664 20.3827C10 20.1989 10 19.9659 10 19.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                      <path d="M10 23.5C10 23.0341 10 22.8011 10.2664 22.6173C10.6217 22.3723 11.303 22.1776 12.1606 22.0761C12.8038 22 13.6192 22 15.25 22H18.75C20.3808 22 21.1962 22 21.8394 22.0761C22.697 22.1776 23.3784 22.3723 23.7336 22.6173C24 22.8011 24 23.0341 24 23.5C24 23.9659 24 24.1989 23.7336 24.3827C23.3784 24.6277 22.697 24.8224 21.8394 24.9239C21.1962 25 20.3808 25 18.75 25H15.25C13.6192 25 12.8038 25 12.1606 24.9239C11.303 24.8224 10.6217 24.6277 10.2664 24.3827C10 24.1989 10 23.9659 10 23.5Z" fill={viewMode === 'list' ? '#10BC83' : '#808080'}/>
                    </g>
                    <defs><clipPath id="listClipCT"><rect width="24" height="24" rx="5" fill="white"/></clipPath></defs>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className="relative w-12 h-11 flex items-center justify-center cursor-pointer"
                >
                  <svg className="absolute inset-0" width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 0.599609H25C36.8189 0.599609 46.4004 10.1811 46.4004 22C46.4004 33.8189 36.8189 43.4004 25 43.4004H22C10.1811 43.4004 0.599609 33.8189 0.599609 22C0.599609 10.1811 10.1811 0.599609 22 0.599609Z" stroke={viewMode === 'grid' ? '#064b34' : '#303030'} strokeWidth="1.2"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6.21053C2 4.22567 2 3.23323 2.65901 2.61662C3.31802 2 4.37868 2 6.5 2C8.62132 2 9.68198 2 10.341 2.61662C11 3.23323 11 4.22567 11 6.21053V17.7895C11 19.7743 11 20.7668 10.341 21.3834C9.68198 22 8.62132 22 6.5 22C4.37868 22 3.31802 22 2.65901 21.3834C2 20.7668 2 19.7743 2 17.7895V6.21053Z" fill={viewMode === 'grid' ? '#10BC83' : '#808080'}/>
                    <path d="M13 15.4C13 13.3258 13 12.2887 13.659 11.6444C14.318 11 15.3787 11 17.5 11C19.6213 11 20.682 11 21.341 11.6444C22 12.2887 22 13.3258 22 15.4V17.6C22 19.6742 22 20.7113 21.341 21.3556C20.682 22 19.6213 22 17.5 22C15.3787 22 14.318 22 13.659 21.3556C13 20.7113 13 19.6742 13 17.6V15.4Z" fill={viewMode === 'grid' ? '#10BC83' : '#808080'}/>
                    <path d="M13 5.5C13 4.4128 13 3.8692 13.1713 3.44041C13.3996 2.86867 13.8376 2.41443 14.389 2.17761C14.8024 2 15.3266 2 16.375 2H18.625C19.6734 2 20.1976 2 20.611 2.17761C21.1624 2.41443 21.6004 2.86867 21.8287 3.44041C22 3.8692 22 4.4128 22 5.5C22 6.5872 22 7.1308 21.8287 7.55959C21.6004 8.13133 21.1624 8.58557 20.611 8.82239C20.1976 9 19.6734 9 18.625 9H16.375C15.3266 9 14.8024 9 14.389 8.82239C13.8376 8.58557 13.3996 8.13133 13.1713 7.55959C13 7.1308 13 6.5872 13 5.5Z" fill={viewMode === 'grid' ? '#10BC83' : '#808080'}/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Trader Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTraders.map(trader => (
                <TraderCard key={trader.id} trader={trader} onCopy={handleCopyClick} />
              ))}
            </div>
          </>
        )}

        {/* Follower Tab — Empty State */}
        {activeTab === 1 && (
          <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
            <div className="flex flex-col items-center justify-center py-15 px-8 min-h-[26.3125rem]">
              <SubscriptionIcon />
              <h3 className="text-white text-2xl font-acid leading-normal mt-8">
                No active Subscription
              </h3>
              <p className="text-gfx-neutral-400 text-base font-acid leading-tight text-center mt-2 max-w-[24.7500rem]">
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
                  <div className="w-16 h-16 rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-acid">M</span>
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-acid leading-normal">marcelo cedeno</h3>
                    <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-6">Manage your copy trading strategies</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gfx-green-800 rounded-sm px-4 py-2 flex items-center gap-2.5">
                    <WalletIcon />
                    <span className="text-gfx-neutral-400 text-sm font-acid">Social Wallet</span>
                    <span className="text-gfx-neutral-600 text-sm font-acid">$100.00</span>
                  </div>
                  <GlowButton
                    label="Create strategy"
                    icon={<PlusIcon />}
                    width={180}
                    height={44}
                    onClick={() => setCreateStrategyOpen(true)}
                  />
                </div>
              </div>
            </GlassCard>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total AUM" value="$0.00" />
              <StatCard label="Total Strategies" value="$0.00" />
              <StatCard label="Total Followers" value="$0.00" valueColor="text-gfx-bullish-light" />
              <StatCard label="Fee Earnings" value="$0.00" />
            </div>

            {/* Master Dashboard */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="relative">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between p-6 lg:p-8 pb-6">
                  <h3 className="text-white text-2xl font-acid leading-normal">Master Dashboard</h3>
                  <SearchInput placeholder="Search strategies" className="w-[17.9375rem]" />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />

                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-15 px-8">
                  <CourseUpIcon />
                  <h3 className="text-white text-2xl font-acid leading-normal mt-8">
                    No Strategies Created
                  </h3>
                  <p className="text-gfx-neutral-400 text-base font-acid leading-tight text-center mt-2 max-w-[24.7500rem]">
                    {`You haven't subscribed to any copy trading strategies yet. Browse available strategies and start copying successful traders`}
                  </p>
                  <div className="mt-8">
                    <GlowButton
                      label="Create strategy"
                      icon={<PlusIcon />}
                      width={200}
                      height={44}
                      onClick={() => setCreateStrategyOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </>
        )}

      </div>

      {copyTarget && (
        <CopySubscriptionModal
          open={copyModalOpen}
          onClose={() => { setCopyModalOpen(false); setCopyTarget(null) }}
          traderName={copyTarget.name}
          traderUsername={copyTarget.username}
          traderInitials={copyTarget.initials}
        />
      )}

      <CreateStrategyModal
        open={createStrategyOpen}
        onClose={() => setCreateStrategyOpen(false)}
      />
    </div>
  )
}
