import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassBannerCard, SparkleButton, ModeToggle, GlowEllipse, SearchInput, GlowButton, FaqCard } from '@/components/ui'
import { ChevronRightIcon } from '@/components/icons'
import { signalProviders, signalTabs, signalFilterTabs, providerFaqs } from '@/data/signals'
import type { SignalProvider } from '@/data/signals'

/* ─── Inline SVG Icons ─── */

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
      <path d="M21 15V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V15" stroke="#C6C6C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 10L12 15L17 10" stroke="#C6C6C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15V3" stroke="#C6C6C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#00b38c" />
    </svg>
  )
}

function TrophyIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 21H16" stroke="#00b38c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17V21" stroke="#00b38c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 4V7C7 9.76 9.24 12 12 12C14.76 12 17 9.76 17 7V4" stroke="#00b38c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4H19" stroke="#00b38c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 7C17 7 19 8 20 10C21 12 20 14 18 14" stroke="#00b38c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7C7 7 5 8 4 10C3 12 4 14 6 14" stroke="#00b38c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProviderBadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1L8.5 4.5L12.5 5L9.75 7.5L10.5 11.5L7 9.5L3.5 11.5L4.25 7.5L1.5 5L5.5 4.5L7 1Z" fill="#00b38c" />
    </svg>
  )
}

function SignalPulseIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M3 18H9L13.5 4.5L22.5 31.5L27 18H33" stroke="#00b38c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XauusdIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
      <g clipPath="url(#xauClipSig)">
        <path d="M0 0H38V38H0V0Z" fill="#D69A00" />
        <path d="M14.42 14.63H23.77L22.41 10.97C22.36 10.82 22.26 10.69 22.13 10.59L14.42 14.63ZM14.39 10.28C14.73 9.39 15.45 8.82 16.26 8.82H21.79C22.59 8.82 23.32 9.39 23.65 10.28L25.02 13.94C25.42 15.04 24.76 16.28 23.77 16.28H14.27C13.28 16.28 12.62 15.04 13.03 13.94L14.39 10.28ZM6.95 24.13H16.28L14.92 20.47C14.86 20.32 14.77 20.19 14.64 20.09L6.95 24.13ZM6.92 19.78C7.25 18.89 7.98 18.32 8.78 18.32H14.3C15.1 18.32 15.83 18.89 16.16 19.78L17.52 23.44C17.93 24.54 17.27 25.78 16.28 25.78H6.8C5.81 25.78 5.15 24.54 5.56 23.44L6.92 19.78ZM31.27 24.13H21.88L29.63 20.09C29.75 20.18 29.85 20.31 29.91 20.47L31.27 24.13ZM23.71 18.32C22.91 18.32 22.18 18.89 21.85 19.78L20.49 23.44C20.08 24.54 20.74 25.78 21.73 25.78H31.27C32.27 25.78 32.93 24.54 32.52 23.44L31.15 19.78C30.82 18.89 30.09 18.32 29.29 18.32H23.71Z" fill="white" />
      </g>
      <defs>
        <clipPath id="xauClipSig"><rect width="38" height="38" rx="19" fill="white" /></clipPath>
      </defs>
    </svg>
  )
}

/* ─── Mini P&L Chart ─── */

function PnlChart({ data, negative }: { data: number[]; negative: boolean }) {
  const w = 280
  const h = 80
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)
  const color = negative ? '#d46356' : '#10BC83'

  const points = data.map((v, i) => [i * step, h - ((v - min) / range) * h * 0.8 - h * 0.1])
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${w},${h} L0,${h} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sigGrad${negative ? 'R' : 'G'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sigGrad${negative ? 'R' : 'G'})`} />
      <path d={pathD} stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  )
}

/* ─── Signal Provider Card ─── */

function SignalCard({ provider, onToggleFollow }: { provider: SignalProvider; onToggleFollow: (id: string) => void }) {
  const isNegative = provider.pnl30d < 0

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden flex flex-col">
      <div className="relative p-6 pb-0 flex flex-col flex-1">
        {/* Header: Avatar + Username + Tag + Follow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[63px] h-[63px] rounded-full bg-[#064b34] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[16px] font-acid font-medium">{provider.initials}</span>
            </div>
            <div>
              <p className="text-[#a0a0a0] text-[16px] font-acid font-medium">{provider.username}</p>
              <span className="inline-block mt-1 text-white text-[16px] font-acid font-medium">{provider.tag}</span>
            </div>
          </div>
          <button
            onClick={() => onToggleFollow(provider.id)}
            className={`h-[34px] px-4 rounded-full flex items-center gap-1.5 text-[14px] font-acid font-medium transition-colors cursor-pointer ${
              provider.following
                ? 'bg-[#09241c] border border-[#303030] text-white'
                : 'bg-[#10BC83] text-white'
            }`}
          >
            {provider.following && <CheckIcon />}
            <span>{provider.following ? 'Following' : 'Follow'}</span>
          </button>
        </div>

        {/* Trading Pair */}
        <div className="flex items-center gap-2.5 mt-4">
          <XauusdIcon />
          <span className="border border-[#303030] rounded-full px-3 py-1 text-white text-[14px] font-acid font-medium">
            {provider.pair}
          </span>
        </div>

        {/* P&L Chart Box */}
        <div className="border border-[#1a2e28] rounded-[14px] p-4 mt-4 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className={`text-[34px] font-acid leading-none ${isNegative ? 'text-[#d46356]' : 'text-[#10BC83]'}`}>
                {isNegative ? '-' : '+'}${Math.abs(provider.pnl30d).toFixed(2)}
              </p>
              <p className="text-[#808080] text-[14px] font-acid font-medium mt-1">30D P&L</p>
            </div>
            <span className="border border-[#303030] rounded-full px-3 py-1 text-[#808080] text-[12px] font-acid font-medium">
              {provider.trades} trades
            </span>
          </div>
          <div className="mt-1">
            <PnlChart data={provider.chartData} negative={isNegative} />
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 mt-4 border border-[#1a2e28] rounded-[14px] overflow-hidden">
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-[16px] font-acid font-medium">{provider.pricePerMonth}</span>
            <span className="text-[#808080] text-[12px] font-acid font-medium">Price/mo</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5 border-x border-[#1a2e28]">
            <span className="text-white text-[16px] font-acid font-medium">{provider.profitShare}</span>
            <span className="text-[#808080] text-[12px] font-acid font-medium">Profit Share</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-[16px] font-acid font-medium">{provider.followers}</span>
            <span className="text-[#808080] text-[12px] font-acid font-medium">Followers</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 pt-5">
        <SparkleButton fullWidth className="px-5">
          <span className="flex items-center justify-center gap-2">
            <span>View Strategy</span>
            <ChevronRightIcon size={18} color="#c6c6c6" />
          </span>
        </SparkleButton>
      </div>
    </GlassCard>
  )
}

/* ─── Follower Provider Card ─── */

function FollowerProviderCard({ provider, onToggleFollow }: { provider: SignalProvider; onToggleFollow: (id: string) => void }) {
  const isNegative = provider.pnl30d < 0

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden w-full max-w-[504px]">
      <div className="relative p-6 lg:p-[31px_24px_35px_25px] flex flex-col gap-[17px]">
        {/* Header: Avatar + Username + Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[22px]">
            <div className="w-[63px] h-[63px] rounded-full bg-[#064b34] flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span className="text-white text-[16px] font-acid font-medium">{provider.initials}</span>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className="text-[#a0a0a0] text-[16px] font-acid leading-[1.2]">{provider.username}</p>
              <p className="text-white text-[16px] font-acid leading-[1.2]">{provider.tag}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="border border-[#303030] rounded-[16px] px-3 py-[10px]">
              <span className="text-[#ececec] text-[14px] font-acid leading-[18.8px]">{provider.pricePerMonth}</span>
            </div>
            <button
              onClick={() => onToggleFollow(provider.id)}
              className="bg-[#09241c] rounded-[12px] px-3 py-2 flex items-center gap-[10px] cursor-pointer"
            >
              <CheckCircleIcon />
              <span className="text-[#00b38c] text-[14px] font-acid leading-[18.8px]">Follow</span>
            </button>
          </div>
        </div>

        {/* Trading Pair */}
        <div className="flex items-center gap-[7px]">
          <XauusdIcon />
          <span className="border border-[#303030] rounded-full px-[14px] py-[14px] text-white text-[14px] font-acid leading-[18.8px]">
            {provider.pair}
          </span>
        </div>

        {/* P&L Chart Box */}
        <div className="border border-[#303030] rounded-[28px] relative h-[194px]">
          <div className="absolute left-[23px] top-[27px]">
            <p className="text-[#a0a0a0] text-[14px] font-acid leading-[18.8px]">{`30D P&L`}</p>
          </div>
          <p className={`absolute left-[23px] top-[56px] text-[34px] font-acid leading-none ${isNegative ? 'text-[#d46356]' : 'text-[#10BC83]'}`}>
            {isNegative ? '-' : '+'}${Math.abs(provider.pnl30d).toFixed(2)}
          </p>
          <div className="absolute right-[23px] top-[27px]">
            <span className="border border-[#303030] rounded-full px-[14px] py-[14px] text-white text-[14px] font-acid leading-[18.8px]">
              {provider.trades} trades
            </span>
          </div>
          <div className="absolute left-[23px] right-[23px] bottom-[12px] h-[64px]">
            <PnlChart data={provider.chartData} negative={isNegative} />
          </div>
        </div>

        {/* Metrics Row */}
        <div className="flex gap-[10px] w-full">
          <div className="flex-1 border border-[#303030] rounded-[12px] h-[80px] flex flex-col items-center justify-center gap-[6px]">
            <span className="text-white text-[16px] font-acid-medium leading-[24.44px]">{provider.pricePerMonth}</span>
            <span className="text-[#a0a0a0] text-[16px] font-acid-medium leading-[24.44px]">Price/mo</span>
          </div>
          <div className="flex-1 border border-[#303030] rounded-[12px] h-[80px] flex flex-col items-center justify-center gap-[6px]">
            <span className="text-white text-[16px] font-acid-medium leading-[24.44px]">{provider.profitShare}</span>
            <span className="text-[#a0a0a0] text-[16px] font-acid-medium leading-[24.44px]">Profit Share</span>
          </div>
          <div className="flex-1 border border-[#303030] rounded-[12px] h-[80px] flex flex-col items-center justify-center gap-[6px]">
            <span className="text-white text-[16px] font-acid-medium leading-[24.44px]">{provider.followers}</span>
            <span className="text-[#a0a0a0] text-[16px] font-acid-medium leading-[24.44px]">Followers</span>
          </div>
        </div>

        {/* Manage Button */}
        <SparkleButton fullWidth className="px-5">
          <span className="flex items-center justify-center">Manage</span>
        </SparkleButton>
      </div>
    </GlassCard>
  )
}

/* ─── Main Page ─── */

export default function SignalsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)
  const [filterTab, setFilterTab] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [providers, setProviders] = useState(signalProviders)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleToggleFollow = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, following: !p.following } : p))
  }

  const filteredProviders = providers.filter(p =>
    p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="signals-page relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'GenSocial', href: '/gensocial/signals' },
          { label: 'Signals', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">

        {/* Page Title */}
        <h1 className="text-white text-h1 font-normal">Signals</h1>

        {/* Top Tabs: Marketplace | Signal Feed | Follower | Provider */}
        <div className="w-full overflow-x-auto max-w-2xl">
          <ModeToggle
            options={[...signalTabs]}
            defaultIndex={0}
            activeIndex={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Signal Feed Tab */}
        {activeTab === 1 && (
          <div className="flex flex-col gap-5">
            {/* Live Signal Feed Banner */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-white text-[clamp(1.25rem,1rem+0.5vw,1.75rem)] font-acid leading-tight">Live Signal Feed</h2>
                    <span className="inline-flex items-center h-[22px] px-2.5 rounded-full bg-[#09241c] border border-[#00b38c] text-[#00b38c] text-[11px] font-acid">
                      Online
                    </span>
                  </div>
                  <p className="text-[#808080] text-[14px] font-acid leading-[18.8px] mt-2 max-w-[500px]">
                    Real-time trading signals from verified analysts. Click on any signal to view details and place trades.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <SparkleButton className="px-5">Become Provider</SparkleButton>
                  <SparkleButton className="px-5">Marketplace</SparkleButton>
                </div>
              </div>
            </GlassCard>

            {/* Enable Push Notifications */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="relative p-6 lg:p-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#09241c] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-[16px] font-acid-medium leading-[24.44px]">Enable push notifications</p>
                      <span className="inline-flex items-center h-[22px] px-2.5 rounded-full bg-[#09241c] border border-[#00b38c] text-[#00b38c] text-[11px] font-acid">
                        Active
                      </span>
                    </div>
                    <p className="text-[#808080] text-[14px] font-acid leading-[18.8px] mt-1">
                      Get notified instantly when followed providers post new signals
                    </p>
                  </div>
                </div>
                <SparkleButton className="px-5 shrink-0">Enable</SparkleButton>
              </div>
            </GlassCard>

            {/* Search + View Toggle */}
            <div className="flex items-center gap-3">
              <SearchInput
                placeholder="Search instrument or analyst"
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-[287px]"
              />
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

            {/* Empty State */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-[56px] h-[56px] rounded-full bg-[#09241c] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#00b38c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-white text-[18px] font-acid-medium leading-tight mb-2">No signals</h3>
                <p className="text-[#808080] text-[14px] font-acid leading-[18.8px] max-w-[320px]">
                  There are no signals from the past 7 days matching your filters. Check back soon or browse the marketplace for top providers.
                </p>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Follower Tab */}
        {activeTab === 2 && (
          <div className="flex flex-col gap-5">
            {/* Followed Provider Card */}
            <FollowerProviderCard provider={providers[0]} onToggleFollow={handleToggleFollow} />

            {/* Signals Executed Section */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="relative p-6 lg:p-8 min-h-[421px] flex flex-col">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-[24px] font-acid leading-none">Signals Executed</h3>
                  <SearchInput
                    placeholder="Search strategies"
                    className="w-[287px]"
                  />
                </div>

                {/* Empty State */}
                <div className="flex-1 flex flex-col items-center justify-center py-10">
                  <div className="w-[70px] h-[70px] rounded-full bg-[#09241c] flex items-center justify-center mb-6">
                    <SignalPulseIcon />
                  </div>
                  <h3 className="text-white text-[24px] font-acid leading-none mb-3 text-center">No signals taken yet</h3>
                  <p className="text-[#808080] text-[16px] font-acid leading-[1.2] max-w-[396px] text-center mb-6">
                    Signals you execute will appear here
                  </p>
                  <GlowButton label="Trade" width={160} />
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Provider Tab */}
        {activeTab === 3 && (
          <div className="flex flex-col gap-10">
            {/* Hero Banner */}
            <GlassCard variant="light" divider="none" rounded="22px" className="relative overflow-hidden">
              <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[280px] !w-[45rem] !h-[28rem]" />
              <GlowEllipse className="right-[-200px] -bottom-[200px] !w-[45rem] !h-[28rem]" />
              <GlowEllipse className="left-[-300px] bottom-[-100px] !w-[31rem] !h-[17rem]" />

              <div className="relative flex flex-col items-center text-center px-6 py-14 lg:py-16 min-h-[412px] justify-center">
                {/* Trophy icon — top right */}
                <div className="absolute right-8 top-8 hidden lg:block">
                  <TrophyIcon size={32} />
                </div>

                {/* Program badge */}
                <div className="inline-flex items-center gap-2 h-[27px] px-4 rounded-full bg-[#09241c] border border-[#064b34] mb-8">
                  <ProviderBadgeIcon />
                  <span className="text-[#00b38c] text-[12px] font-acid leading-[18.8px] whitespace-nowrap">Genesis Signal Provider Program</span>
                </div>

                {/* Heading */}
                <h2 className="text-white text-[clamp(2rem,1.5rem+1.5vw,3.125rem)] font-acid leading-none max-w-[633px]">
                  Turn Your Trades Into Recurring Income
                </h2>

                {/* Subtitle */}
                <p className="text-[#a0a0a0] text-[14px] font-acid leading-[18.8px] mt-5 max-w-[366px]">
                  Publish your signals, grow a following, and earn monthly subscription plus performance fees.
                </p>

                {/* CTA Button */}
                <div className="mt-7">
                  <GlowButton label="Become a provider" width={220} />
                </div>

                {/* Caption */}
                <p className="text-[#a0a0a0] text-[12px] font-acid leading-[18.8px] mt-5">
                  Free to start · No upfront cost
                </p>
              </div>
            </GlassCard>

            {/* FAQ Section */}
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-white text-[clamp(1.5rem,1.25rem+0.75vw,3.125rem)] font-acid leading-none self-start lg:self-center">
                Frequently Asked Questions
              </h2>
              <div className="w-full max-w-[756px] flex flex-col gap-4 mx-auto">
                {providerFaqs.map((faq, i) => (
                  <FaqCard
                    key={i}
                    question={faq.question}
                    answer={faq.answer}
                    expanded={expandedFaq === i}
                    onToggle={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hero Banner */}
        {activeTab === 0 && (<>
        <GlassBannerCard contentClassName="p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-white text-[3.125rem] font-acid leading-none">Trade Signals</h2>
            <p className="text-[#a0a0a0] text-[1rem] font-acid font-medium mt-5 max-w-[35.875rem] leading-relaxed">
              Follow expert signal providers, execute trade ideas in one click, and join active trading communities — all from one feed.
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
          <div className="relative w-[22.4375rem] h-[8.375rem] bg-[#09241c] rounded-[1.875rem]">
            <div className="absolute left-[1.125rem] top-[1.125rem] w-[6.125rem] h-[6.125rem] bg-[#064b34] rounded-[0.78rem] flex items-center justify-center">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.3346 11.6673L27.7096 11.668C30.1259 11.6683 32.0849 9.7099 32.0853 7.29366C32.0857 4.87741 30.1273 2.91835 27.711 2.91797C25.2948 2.91759 23.3357 4.87603 23.3353 7.29228L23.3346 11.6673L11.6687 11.6673L11.668 7.29228C11.6676 4.87603 9.70853 2.91759 7.29228 2.91797C4.87603 2.91835 2.91759 4.87741 2.91797 7.29366C2.91835 9.7099 4.87741 11.6683 7.29366 11.668L11.6687 11.6673L11.668 23.3339H23.3346V11.6673Z" fill="white"/>
                <path d="M23.3346 23.3339L27.7096 23.3346C30.1259 23.3343 32.0849 25.2927 32.0853 27.7089C32.0857 30.1252 30.1273 32.0843 27.711 32.0846C25.2948 32.085 23.3357 30.1266 23.3353 27.7103L23.3346 23.3339Z" fill="white"/>
                <path d="M7.29366 23.3346L11.6687 23.3353L11.668 27.7103C11.6676 30.1266 9.70853 32.085 7.29228 32.0846C4.87603 32.0843 2.91759 30.1252 2.91797 27.7089C2.91835 25.2927 4.87741 23.3343 7.29366 23.3346Z" fill="white"/>
              </svg>
            </div>
            <p className="absolute left-[8.9375rem] top-[2.375rem] text-white text-[3.125rem] font-acid leading-none">71</p>
            <p className="absolute left-[8.9375rem] top-[5.5625rem] text-[#808080] text-[1rem] font-acid font-medium leading-[1.5275rem]">Active signals</p>
          </div>
        </GlassBannerCard>

        {/* Filter Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="w-full overflow-x-auto max-w-lg">
            <ModeToggle
              options={[...signalFilterTabs]}
              defaultIndex={0}
              activeIndex={filterTab}
              onChange={setFilterTab}
            />
          </div>
          <div className="flex items-center gap-3">
            <SearchInput
              placeholder="Search signals"
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

        {/* Signal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProviders.map(provider => (
            <SignalCard key={provider.id} provider={provider} onToggleFollow={handleToggleFollow} />
          ))}
        </div>
        </>)}

      </div>
    </div>
  )
}
