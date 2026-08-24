import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { FollowStrategyModal } from '@/components/dashboard/FollowStrategyModal'
import { ManageSubscriptionModal } from '@/components/dashboard/ManageSubscriptionModal'
import { BecomeProviderModal } from '@/components/modals/BecomeProviderModal'
import { GlassCard, GlassBannerCard, SparkleButton, ModeToggle, GlowEllipse, SearchInput, GlowButton, FaqCard, BannerStatBox, SignalStrategyCard, EmptyState } from '@/components/ui'
import { AreaChart } from '@/components/charts/AreaChart'
import { signalProviders, signalTabs, signalFilterTabs, providerFaqs } from '@/data/signals'
import type { SignalProvider } from '@/data/signals'

/* ─── Inline SVG Icons ─── */

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

/* ─── Signal Provider Card ─── */

function SignalCard({ provider, onToggleFollow, onFollowClick }: { provider: SignalProvider; onToggleFollow: (id: string) => void; onFollowClick: (provider: SignalProvider) => void }) {
  const navigate = useNavigate()
  const isNegative = provider.pnl30d < 0

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden flex flex-col">
      <div className="relative p-6 pb-0 flex flex-col flex-1">
        {/* Header: Avatar + Username + Tag + Follow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-base font-acid font-medium">{provider.initials}</span>
            </div>
            <div>
              <p className="text-gfx-neutral-500 text-base font-acid font-medium">{provider.username}</p>
              <span className="inline-block mt-1 text-white text-base font-acid font-medium">{provider.tag}</span>
            </div>
          </div>
          {provider.following ? (
            <button
              onClick={() => onToggleFollow(provider.id)}
              className="h-[2.1250rem] px-3 rounded-md bg-gfx-green-900 border border-gfx-neutral-250 flex items-center gap-1.5 text-sm font-acid font-medium text-white transition-colors cursor-pointer"
            >
              <CheckIcon />
              <span>Following</span>
            </button>
          ) : (
            <button
              onClick={() => onFollowClick(provider)}
              className="px-3 py-2 rounded-md flex items-center gap-2.5 text-sm font-acid transition-colors cursor-pointer"
              style={{ background: '#F1FFFA', color: 'black' }}
            >
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                <circle cx="7" cy="3.5" r="3.5" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.9375 17.5C9.49382 17.5 8.77199 17.5 8.32349 17.0515C7.875 16.603 7.875 15.8812 7.875 14.4375C7.875 12.9938 7.875 12.272 8.32349 11.8235C8.77199 11.375 9.49382 11.375 10.9375 11.375C12.3812 11.375 13.103 11.375 13.5515 11.8235C14 12.272 14 12.9938 14 14.4375C14 15.8812 14 16.603 13.5515 17.0515C13.103 17.5 12.3812 17.5 10.9375 17.5ZM11.4479 13.0764C11.4479 12.7945 11.2194 12.566 10.9375 12.566C10.6556 12.566 10.4271 12.7945 10.4271 13.0764V13.9271H9.57639C9.29449 13.9271 9.06597 14.1556 9.06597 14.4375C9.06597 14.7194 9.29449 14.9479 9.57639 14.9479H10.4271V15.7986C10.4271 16.0805 10.6556 16.309 10.9375 16.309C11.2194 16.309 11.4479 16.0805 11.4479 15.7986V14.9479H12.2986C12.5805 14.9479 12.809 14.7194 12.809 14.4375C12.809 14.1556 12.5805 13.9271 12.2986 13.9271H11.4479V13.0764Z" fill="black"/>
                <path d="M10.2184 10.0649C9.80448 10.07 9.41865 10.085 9.08243 10.1303C8.51991 10.2059 7.90419 10.3866 7.39543 10.8954C6.88667 11.4042 6.70591 12.0199 6.63028 12.5824C6.56232 13.0879 6.56241 13.7055 6.56251 14.3623V14.5127C6.56241 15.1694 6.56232 15.7871 6.63028 16.2926C6.68335 16.6873 6.78819 17.1082 7.0218 17.5C7.01454 17.5 7.00727 17.5 7 17.5C0 17.5 0 15.7371 0 13.5625C0 11.3879 3.13401 9.625 7 9.625C8.16041 9.625 9.25487 9.78383 10.2184 10.0649Z" fill="black"/>
              </svg>
              <span className="leading-5">Follow</span>
            </button>
          )}
        </div>

        {/* Trading Pair */}
        <div className="flex items-center gap-2.5 mt-4">
          <XauusdIcon />
          <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-white text-sm font-acid font-medium">
            {provider.pair}
          </span>
        </div>

        {/* P&L Chart Box */}
        <div className="border border-gfx-neutral-250 rounded-md p-4 mt-4 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-gfx-neutral-400 text-sm font-acid font-medium mb-1">30D P&L</p>
              <p className={`text-4xl font-acid leading-none ${isNegative ? 'text-gfx-red-muted' : 'text-gfx-green-500'}`}>
                {isNegative ? '-' : '+'}${Math.abs(provider.pnl30d).toFixed(2)}
              </p>
            </div>
            <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-gfx-neutral-400 text-xs font-acid font-medium">
              {provider.trades} trades
            </span>
          </div>
          <div className="mt-1">
            <AreaChart data={provider.chartData} color={isNegative ? '#d46356' : '#10BC83'} className="h-[5rem]" />
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 mt-4 border border-gfx-neutral-250 rounded-md overflow-hidden">
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-base font-acid font-medium">{provider.pricePerMonth}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Price/mo</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5 border-x border-gfx-neutral-250">
            <span className="text-white text-base font-acid font-medium">{provider.profitShare}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Profit Share</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-base font-acid font-medium">{provider.followers}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Followers</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 pt-5">
        <SparkleButton fullWidth className="px-5" onClick={() => navigate('/gensocial/signals/details-single-page')}>
          <span className="flex items-center justify-center text-gfx-neutral-550">View Strategy</span>
        </SparkleButton>
      </div>
    </GlassCard>
  )
}

/* ─── Follower Provider Card ─── */

function FollowerProviderCard({ provider, onToggleFollow, onManage }: { provider: SignalProvider; onToggleFollow: (id: string) => void; onManage?: () => void }) {
  const isNegative = provider.pnl30d < 0
  const chartData = Array.from({ length: 12 }, (_, i) => 80 - i * 4 + Math.random() * 4)

  return (
    <div
      className="signal-strategy-card flex flex-col w-full max-w-[31.5000rem]"
      style={{
        background: 'var(--signal-card-bg)',
        borderRadius: 'var(--signal-card-radius, 18.56px)',
        outline: '1.16px solid var(--signal-card-border)',
        outlineOffset: '-1.16px',
        boxShadow: '0px 4.64px 23.2px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div className="flex flex-col gap-4 pt-8 pb-9 px-[1.5625rem]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[1.375rem]">
            <div className="w-16 h-16 rounded-full bg-[var(--signal-avatar-bg,#064b34)] flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span className="text-white text-base font-acid font-medium">{provider.initials}</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-tight">{provider.username}</p>
              <span className="text-white text-base font-acid font-medium leading-tight">{provider.tag}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-gfx-neutral-600 text-sm font-acid font-medium">
              {provider.pricePerMonth}
            </span>
            <button
              onClick={() => onToggleFollow(provider.id)}
              className="bg-gfx-green-900 rounded-md px-3 py-2 flex items-center gap-2.5 cursor-pointer"
            >
              <CheckCircleIcon />
              <span className="text-gfx-green-300 text-sm font-acid leading-5">Follow</span>
            </button>
          </div>
        </div>

        {/* Trading Pair */}
        <div className="flex items-center gap-2">
          <XauusdIcon />
          <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-white text-sm font-acid font-medium">
            {provider.pair}
          </span>
        </div>

        {/* P&L Chart */}
        <div className="border border-gfx-neutral-250 rounded-md p-4 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-gfx-neutral-400 text-sm font-acid font-medium mb-1">{`30D P&L`}</p>
              <p className={`text-4xl font-acid leading-none ${isNegative ? 'text-gfx-red-muted' : 'text-gfx-green-500'}`}>
                {isNegative ? '-' : '+'}${Math.abs(provider.pnl30d).toFixed(2)}
              </p>
            </div>
            <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-gfx-neutral-400 text-xs font-acid font-medium">
              {provider.trades} trades
            </span>
          </div>
          <div className="mt-1">
            <AreaChart data={chartData} color={isNegative ? '#d46356' : '#10BC83'} className="h-[5rem]" />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 border border-gfx-neutral-250 rounded-md overflow-hidden">
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-base font-acid font-medium">{provider.pricePerMonth}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Price/mo</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5 border-x border-gfx-neutral-250">
            <span className="text-white text-base font-acid font-medium">{provider.profitShare}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Profit Share</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-base font-acid font-medium">{provider.followers}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Followers</span>
          </div>
        </div>

        {/* Manage Button */}
        <SparkleButton fullWidth className="px-5" onClick={onManage}>
          <span className="flex items-center justify-center text-gfx-neutral-550">Manage</span>
        </SparkleButton>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */

export default function SignalsPage() {
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)
  const [filterTab, setFilterTab] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [providers, setProviders] = useState(signalProviders)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [followModalOpen, setFollowModalOpen] = useState(false)
  const [followTarget, setFollowTarget] = useState<SignalProvider | null>(null)
  const [manageModalOpen, setManageModalOpen] = useState(false)
  const [becomeProviderOpen, setBecomeProviderOpen] = useState(false)

  const handleToggleFollow = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, following: !p.following } : p))
  }

  const handleFollowClick = (provider: SignalProvider) => {
    setFollowTarget(provider)
    setFollowModalOpen(true)
  }

  const handleConfirmFollow = () => {
    if (followTarget) {
      setProviders(prev => prev.map(p => p.id === followTarget.id ? { ...p, following: true } : p))
    }
    setFollowModalOpen(false)
    setFollowTarget(null)
  }

  const filteredProviders = providers.filter(p => {
    const query = searchQuery.trim().toLowerCase()
    const matchesQuery = !query ||
      p.username.toLowerCase().includes(query) ||
      p.tag.toLowerCase().includes(query) ||
      p.pair.toLowerCase().includes(query)
    const matchesTab =
      filterTab === 1 ? p.recommended :
      filterTab === 2 ? p.following :
      true
    return matchesQuery && matchesTab
  })

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
              <GlowEllipse className="left-0 -top-[6.25rem]" />
              <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-white text-h3 font-acid leading-tight">Live Signal Feed</h2>
                    <span className="inline-flex items-center h-[1.375rem] px-2.5 rounded-full bg-gfx-green-900 border border-gfx-green-300 text-gfx-green-300 text-xs font-acid">
                      Online
                    </span>
                  </div>
                  <p className="text-gfx-neutral-400 text-sm font-acid leading-5 mt-2 max-w-[31.25rem]">
                    Real-time trading signals from verified analysts. Click on any signal to view details and place trades.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <SparkleButton className="px-5" onClick={() => setActiveTab(3)}>Become Provider</SparkleButton>
                  <SparkleButton className="px-5" onClick={() => setActiveTab(0)}>Marketplace</SparkleButton>
                </div>
              </div>
            </GlassCard>

            {/* Enable Push Notifications */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="relative p-6 lg:p-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-[2.75rem] h-11 rounded-full bg-gfx-green-900 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-base font-acid-medium leading-6">Enable push notifications</p>
                      <span className="inline-flex items-center h-[1.375rem] px-2.5 rounded-full bg-gfx-green-900 border border-gfx-green-300 text-gfx-green-300 text-xs font-acid">
                        Active
                      </span>
                    </div>
                    <p className="text-gfx-neutral-400 text-sm font-acid leading-5 mt-1">
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
                className="w-full sm:w-[17.9375rem]"
              />
              <button
                onClick={() => setViewMode('list')}
                className={`w-12 h-11 rounded-md flex items-center justify-center transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-gfx-green-200' : 'bg-gfx-green-900 hover:bg-gfx-green-150'}`}
              >
                <ListViewIcon active={viewMode === 'list'} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`w-12 h-11 rounded-md flex items-center justify-center transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-gfx-green-200' : 'bg-gfx-green-900 hover:bg-gfx-green-150'}`}
              >
                <GridViewIcon active={viewMode === 'grid'} />
              </button>
            </div>

            {/* Empty State */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-[3.5000rem] h-[3.5000rem] rounded-full bg-gfx-green-900 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#00b38c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-acid-medium leading-tight mb-2">No signals</h3>
                <p className="text-gfx-neutral-400 text-sm font-acid leading-5 max-w-[20rem]">
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
            <FollowerProviderCard provider={providers[0]} onToggleFollow={handleToggleFollow} onManage={() => setManageModalOpen(true)} />

            {/* Signals Executed Section */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="relative p-6 lg:p-8 min-h-[26.3125rem] flex flex-col">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-2xl font-acid leading-none">Signals Executed</h3>
                  <SearchInput
                    placeholder="Search strategies"
                    className="w-full sm:w-[17.9375rem]"
                  />
                </div>

                {/* Empty State */}
                <div className="flex-1 flex flex-col items-center justify-center py-10">
                  <div className="w-[4.375rem] h-[4.375rem] rounded-full bg-gfx-green-900 flex items-center justify-center mb-6">
                    <SignalPulseIcon />
                  </div>
                  <h3 className="text-white text-2xl font-acid leading-none mb-3 text-center">No signals taken yet</h3>
                  <p className="text-gfx-neutral-400 text-base font-acid leading-tight max-w-[24.7500rem] text-center mb-6">
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
              <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[17.5000rem] !w-[45rem] !h-[28rem]" />
              <GlowEllipse className="right-[-200px] -bottom-[12.5rem] !w-[45rem] !h-[28rem]" />
              <GlowEllipse className="left-[-300px] bottom-[-100px] !w-[31rem] !h-[17rem]" />

              <div className="relative flex flex-col items-center text-center px-6 py-14 lg:py-16 min-h-[25.7500rem] justify-center">
                {/* Trophy icon — top right */}
                <div className="absolute right-8 top-8 hidden lg:block">
                  <TrophyIcon size={32} />
                </div>

                {/* Program badge */}
                <div className="inline-flex items-center gap-2 h-[1.6875rem] px-4 rounded-full bg-gfx-green-900 border border-gfx-green-200 mb-8">
                  <ProviderBadgeIcon />
                  <span className="text-gfx-green-300 text-xs font-acid leading-5 whitespace-nowrap">Genesis Signal Provider Program</span>
                </div>

                {/* Heading */}
                <h2 className="text-white text-hero font-acid leading-none max-w-[39.5625rem]">
                  Turn Your Trades Into Recurring Income
                </h2>

                {/* Subtitle */}
                <p className="text-gfx-neutral-500 text-sm font-acid leading-5 mt-5 max-w-[22.8750rem]">
                  Publish your signals, grow a following, and earn monthly subscription plus performance fees.
                </p>

                {/* CTA Button */}
                <div className="mt-7">
                  <GlowButton label="Become a provider" width={220} onClick={() => setBecomeProviderOpen(true)} />
                </div>

                {/* Caption */}
                <p className="text-gfx-neutral-500 text-xs font-acid leading-5 mt-5">
                  Free to start · No upfront cost
                </p>
              </div>
            </GlassCard>

            {/* FAQ Section */}
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-white text-h2 font-acid leading-none self-start lg:self-center">
                Frequently Asked Questions
              </h2>
              <div className="w-full max-w-[47.2500rem] flex flex-col gap-4 mx-auto">
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
        <GlassBannerCard>
          <div className="flex items-center justify-between gap-8">
            <div>
              <h2 className="text-white text-section-title xl:text-5xl 3xl:text-6xl font-acid leading-none">Trade Signals</h2>
              <p className="text-gfx-neutral-500 text-sm xl:text-base font-acid font-medium mt-4 max-w-[37rem] leading-relaxed">
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
            <BannerStatBox value={71} label="Active signals" />
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
              className="w-full sm:w-[17.9375rem]"
            />
            <button
              type="button"
              aria-label="Show favorites"
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
              type="button"
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              className="relative w-12 h-11 flex items-center justify-center cursor-pointer"
            >
              <svg className="absolute inset-0" width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 0.599609H25C36.8189 0.599609 46.4004 10.1811 46.4004 22C46.4004 33.8189 36.8189 43.4004 25 43.4004H22C10.1811 43.4004 0.599609 33.8189 0.599609 22C0.599609 10.1811 10.1811 0.599609 22 0.599609Z" stroke={viewMode === 'list' ? '#064b34' : '#303030'} strokeWidth="1.2"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#listClipSig)">
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
                <defs><clipPath id="listClipSig"><rect width="24" height="24" rx="5" fill="white"/></clipPath></defs>
              </svg>
            </button>
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
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

        {/* Signal Cards Grid */}
        {filteredProviders.length === 0 ? (
          <EmptyState
            title="No strategies found"
            description={
              filterTab === 2
                ? "You are not following any strategy yet. Follow a provider to see it here."
                : "Try a different filter or search term to find a signal provider."
            }
          />
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProviders.map(provider => (
            <SignalStrategyCard
              key={provider.id}
              initials={provider.initials}
              username={provider.username}
              tag={provider.tag}
              pair={provider.pair}
              pairIcon={<XauusdIcon />}
              pnl={provider.pnl30d}
              trades={provider.trades}
              pricePerMonth={provider.pricePerMonth}
              profitShare={provider.profitShare}
              followers={provider.followers}
              chartData={provider.chartData}
              following={provider.following}
              onFollow={() => provider.following ? handleToggleFollow(provider.id) : handleFollowClick(provider)}
              onViewStrategy={() => navigate('/gensocial/signals/details-single-page')}
            />
          ))}
        </div>
        )}
        </>)}

      </div>

      {followTarget && (
        <FollowStrategyModal
          open={followModalOpen}
          onClose={() => { setFollowModalOpen(false); setFollowTarget(null) }}
          onConfirm={handleConfirmFollow}
          strategyName={followTarget.tag}
          username={followTarget.username}
          initials={followTarget.initials}
          pricePerMonth={followTarget.pricePerMonth}
          profitShare={followTarget.profitShare}
        />
      )}

      <ManageSubscriptionModal
        open={manageModalOpen}
        onClose={() => setManageModalOpen(false)}
        providerName={providers[0]?.tag ?? 'Genesis Assets'}
        providerInitials={providers[0]?.initials ?? 'GA'}
      />

      <BecomeProviderModal
        open={becomeProviderOpen}
        onClose={() => setBecomeProviderOpen(false)}
      />
    </div>
  )
}
