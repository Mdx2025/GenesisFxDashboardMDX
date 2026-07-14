import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassBannerCard, SparkleButton, ModeToggle, GlowEllipse, SearchInput, GlowButton, StatCard, BannerStatBox } from '@/components/ui'
import { ChevronRightIcon } from '@/components/icons'
import { pammStrategies, pammTabs, pammFilterTabs } from '@/data/pamm'
import type { PammStrategy } from '@/data/pamm'

/* ─── Inline SVG Icons ─── */

function UserRoundedIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#808080" />
      <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill="#808080" />
    </svg>
  )
}

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
        <linearGradient id="pammChartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10BC83" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10BC83" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#pammChartGrad)" />
      <path d={pathD} stroke="#10BC83" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  )
}

/* ─── Strategy Card ─── */

function StrategyCard({ strategy }: { strategy: PammStrategy }) {
  const navigate = useNavigate()
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden flex flex-col">
      <div className="relative pt-[1.9375rem] pb-[2.1875rem] pl-[1.5625rem] pr-[1.5rem] flex flex-col items-center gap-[1.375rem]">
        {/* Header: Avatar + Name + Verified + Stats */}
        <div className="flex items-start gap-3 w-full">
          <div className="w-[3.9375rem] h-[3.9375rem] rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[1rem] font-acid font-medium">{strategy.initials}</span>
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex justify-between items-center w-full">
              <span className="text-white text-[1rem] font-acid font-medium truncate">{strategy.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <path d="M7.91243 0.550781L10.1869 5.15856L15.2731 5.90199L11.5928 9.48664L12.4613 14.5508L7.91243 12.1586L3.36354 14.5508L4.23209 9.48664L0.551758 5.90199L5.63798 5.15856L7.91243 0.550781Z" stroke="#808080" strokeWidth="1.1041" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-1">
                <UserRoundedIcon size={20} />
                <span className="text-gfx-neutral-500 text-[1rem] font-acid font-medium">{strategy.investors}</span>
              </div>
              <div className="w-px h-5 bg-gfx-green-900" />
              <span className="text-gfx-neutral-500 text-[1rem] font-acid font-medium">AUM: {strategy.aum}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gfx-green-900" />

        {/* ROI + Days Badge */}
        <div className="flex items-start justify-between w-full">
          <div>
            <p className="text-gfx-neutral-500 text-[1rem] font-acid font-medium leading-[24.44px]">ROI</p>
            <p className="text-gfx-green-500 text-[1.5rem] font-acid">{strategy.roi}%</p>
          </div>
          <div className="border border-gfx-neutral-250 rounded-full px-[0.6875rem] py-[0.6875rem]">
            <span className="text-white text-[1rem] font-acid font-medium leading-[24.44px]">{strategy.roiDays}D</span>
          </div>
        </div>

        {/* Chart area */}
        <div className="w-full h-[3.3125rem]">
          <MiniAreaChart data={strategy.chartData} />
        </div>

        {/* Bottom Stats */}
        <div className="w-full bg-gfx-green-900 rounded-[0.5625rem] px-5 py-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gfx-neutral-400 text-[1rem] font-acid font-medium leading-[24.44px]">Min Investment</p>
              <p className="text-white text-[1rem] font-acid font-medium leading-[24.44px] mt-2">${strategy.minInvestment.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-gfx-neutral-400 text-[1rem] font-acid font-medium leading-[24.44px]">Total P&L</p>
              <p className="text-gfx-green-300 text-[1rem] font-acid font-medium leading-[25.14px] mt-2">${strategy.totalPnl.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full px-6">
          <SparkleButton className="px-[1.375rem] flex-1" onClick={() => navigate('/gensocial/pamm/details-single-page')}>
            <span className="flex items-center justify-center gap-[0.5625rem]">
              <span>Details</span>
              <ChevronRightIcon size={27} color="#c6c6c6" />
            </span>
          </SparkleButton>
          <SparkleButton className="px-[1.375rem] flex-1">
            <span className="flex items-center justify-center gap-[0.5625rem]">
              <span>Connect</span>
              <ChevronRightIcon size={27} color="#c6c6c6" />
            </span>
          </SparkleButton>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Main Page ─── */

export default function PammPage() {
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)
  const [filterTab, setFilterTab] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStrategies = pammStrategies.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="pamm-page relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'GenSocial', href: '/gensocial/pamm' },
          { label: 'PAMM Strategies', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">

        {/* Page Title */}
        <h1 className="text-white text-h1 font-normal">PAMM Strategies</h1>

        {/* Top Tabs: Browse | Investments | Manager + Tutorial (Investments only) */}
        <div className="flex items-center justify-between">
          <div className="w-full overflow-x-auto max-w-lg">
            <ModeToggle
              options={[...pammTabs]}
              defaultIndex={0}
              activeIndex={activeTab}
              onChange={setActiveTab}
            />
          </div>
          {activeTab === 1 && (
            <SparkleButton className="px-5 shrink-0">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8 4.6C7.50294 4.6 7.1 5.00294 7.1 5.5C7.1 5.83137 6.83137 6.1 6.5 6.1C6.16863 6.1 5.9 5.83137 5.9 5.5C5.9 4.3402 6.8402 3.4 8 3.4C9.1598 3.4 10.1 4.3402 10.1 5.5C10.1 6.06867 9.87317 6.58558 9.50637 6.96317C9.43255 7.03915 9.36215 7.1095 9.29498 7.17661C9.12231 7.34913 8.97104 7.50027 8.83832 7.6708C8.6631 7.89594 8.6 8.06141 8.6 8.2V8.8C8.6 9.13137 8.33137 9.4 8 9.4C7.66863 9.4 7.4 9.13137 7.4 8.8V8.2C7.4 7.67585 7.64401 7.25155 7.89133 6.93377C8.07434 6.69863 8.30435 6.46907 8.49102 6.28277C8.54733 6.22657 8.5997 6.17431 8.64564 6.12702C8.80367 5.96435 8.9 5.74404 8.9 5.5C8.9 5.00294 8.49706 4.6 8 4.6ZM8 12C8.44183 12 8.8 11.6418 8.8 11.2C8.8 10.7582 8.44183 10.4 8 10.4C7.55817 10.4 7.2 10.7582 7.2 11.2C7.2 11.6418 7.55817 12 8 12Z" fill="#A0A0A0"/>
                </svg>
                <span>Tutorial</span>
              </span>
            </SparkleButton>
          )}
        </div>

        {activeTab === 0 && (
          <>
            {/* Hero Banner */}
            <GlassBannerCard>
              <div className="flex items-center justify-between gap-8">
                <div>
                  <h2 className="text-white text-[2.5rem] xl:text-[3.125rem] font-acid leading-none">Browse Strategies</h2>
                  <p className="text-gfx-neutral-500 text-[0.875rem] xl:text-[1rem] font-acid font-medium mt-4 max-w-[37rem] leading-relaxed">
                    Invest with proven money managers. Browse PAMM strategies, pick a manager, and let your capital trade alongside theirs.
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
                  options={[...pammFilterTabs]}
                  defaultIndex={0}
                  activeIndex={filterTab}
                  onChange={setFilterTab}
                />
              </div>
              <div className="flex items-center gap-3">
                <SearchInput
                  placeholder="Search strategies"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="w-[17.9375rem]"
                />
                <button
                  onClick={() => {}}
                  className="relative w-[2.9375rem] h-[2.75rem] flex items-center justify-center cursor-pointer"
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
                  className="relative w-[2.9375rem] h-[2.75rem] flex items-center justify-center cursor-pointer"
                >
                  <svg className="absolute inset-0" width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 0.599609H25C36.8189 0.599609 46.4004 10.1811 46.4004 22C46.4004 33.8189 36.8189 43.4004 25 43.4004H22C10.1811 43.4004 0.599609 33.8189 0.599609 22C0.599609 10.1811 10.1811 0.599609 22 0.599609Z" stroke={viewMode === 'list' ? '#064b34' : '#303030'} strokeWidth="1.2"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#listClip)">
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
                    <defs><clipPath id="listClip"><rect width="24" height="24" rx="5" fill="white"/></clipPath></defs>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className="relative w-[2.9375rem] h-[2.75rem] flex items-center justify-center cursor-pointer"
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

            {/* Strategy Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredStrategies.map(strategy => (
                <StrategyCard key={strategy.id} strategy={strategy} />
              ))}
            </div>
          </>
        )}

        {activeTab === 1 && (
          <>
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard label="Active Strategies" value="0" />
              <StatCard label="Total Balance" value="$0.00" />
              <StatCard label="Total Profit/loss" value="$0.00" valueColor="text-gfx-bullish-light" />
              <StatCard label="Total Withdrawals" value="$0.00" />
            </div>

            {/* My Investments Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-white text-[2.25rem] font-acid leading-none">My Investments</h2>
              <SearchInput
                placeholder="Search for investments"
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-[17.9375rem]"
              />
            </div>

            {/* Empty State */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <div className="flex flex-col items-center justify-center py-16 px-8">
                <div className="w-[4.375rem] h-[4.375rem] rounded-full bg-gfx-green-200 flex items-center justify-center mb-8">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="#10BC83" />
                    <ellipse cx="12" cy="18" rx="7" ry="4" fill="#10BC83" />
                  </svg>
                </div>
                <p className="text-white text-[1.5rem] font-acid leading-none">No PAMM Investments</p>
                <p className="text-gfx-neutral-400 text-[1rem] font-acid mt-4 leading-[1.2]">You don't have any active PAMM subscriptions yet</p>
                <button
                  onClick={() => setActiveTab(0)}
                  className="mt-10 h-[2.75rem] px-[1.9375rem] rounded-[18.75rem] bg-[#f1fffa] text-black text-[1rem] font-acid font-medium leading-[24.44px] cursor-pointer hover:bg-[#e0f5ec] transition-colors"
                >
                  Browse strategies
                </button>
              </div>
            </GlassCard>
          </>
        )}

        {activeTab === 2 && (
          <>
            {/* Manager Profile Banner */}
            <div className="relative w-full h-[7.8125rem] rounded-[1.1875rem] bg-gfx-green-900 overflow-hidden">
              <GlowEllipse className="left-1/2 -translate-x-1/4 -top-[12.5rem]" />
              <div className="relative flex items-center justify-between h-full px-8">
                <div className="flex items-center gap-5">
                  <div className="w-[3.9375rem] h-[3.9375rem] rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[1.0625rem] font-acid">M</span>
                  </div>
                  <div>
                    <p className="text-white text-[1.5rem] font-acid">marcelo cedeno</p>
                    <p className="text-gfx-neutral-400 text-[1rem] font-acid mt-1">Manage your copy trading strategies</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-5 h-[2.25rem]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.0427 1.04297H9.95602C9.2073 1.04295 8.58293 1.04293 8.08728 1.10956C7.56412 1.1799 7.09179 1.33463 6.71223 1.71419C6.33267 2.09374 6.17795 2.56608 6.10761 3.08924C6.05984 3.44454 6.04633 4.2942 6.04251 5.02269C4.3573 5.07773 3.34548 5.27446 2.64233 5.97761C1.66602 6.95392 1.66602 8.52527 1.66602 11.668C1.66602 14.8107 1.66602 16.382 2.64233 17.3583C3.61864 18.3346 5.18998 18.3346 8.33267 18.3346H11.666C14.8087 18.3346 16.3801 18.3346 17.3564 17.3583C18.3327 16.382 18.3327 14.8107 18.3327 11.668C18.3327 8.52527 18.3327 6.95392 17.3564 5.97761C16.6532 5.27446 15.6414 5.07773 13.9562 5.02269C13.9524 4.2942 13.9389 3.44454 13.8911 3.08924C13.8208 2.56608 13.666 2.09374 13.2865 1.71419C12.9069 1.33463 12.4346 1.1799 11.9114 1.10956C11.4158 1.04293 10.7914 1.04295 10.0427 1.04297ZM12.706 5.00287C12.7022 4.29733 12.6902 3.53803 12.6522 3.2558C12.6005 2.87125 12.5112 2.70667 12.4026 2.59807C12.294 2.48947 12.1294 2.40012 11.7449 2.34842C11.3423 2.2943 10.8027 2.29297 9.99935 2.29297C9.19601 2.29297 8.65637 2.2943 8.25384 2.34842C7.86929 2.40012 7.70471 2.48947 7.59611 2.59807C7.48752 2.70667 7.39817 2.87125 7.34646 3.2558C7.30852 3.53803 7.29653 4.29733 7.29275 5.00287C7.61893 5.0013 7.96506 5.0013 8.33268 5.0013H11.666C12.0336 5.0013 12.3798 5.0013 12.706 5.00287ZM9.99935 7.70964C10.3445 7.70964 10.6243 7.98946 10.6243 8.33464V8.34316C11.5317 8.57175 12.291 9.28714 12.291 10.2791C12.291 10.6243 12.0112 10.9041 11.666 10.9041C11.3208 10.9041 11.041 10.6243 11.041 10.2791C11.041 9.95905 10.6862 9.51519 9.99935 9.51519C9.31251 9.51519 8.95768 9.95905 8.95768 10.2791C8.95768 10.5991 9.31251 11.043 9.99935 11.043C11.1535 11.043 12.291 11.8428 12.291 13.0569C12.291 14.0488 11.5317 14.7642 10.6243 14.9928V15.0013C10.6243 15.3465 10.3445 15.6263 9.99935 15.6263C9.65417 15.6263 9.37435 15.3465 9.37435 15.0013V14.9928C8.46703 14.7642 7.70768 14.0488 7.70768 13.0569C7.70768 12.7117 7.9875 12.4319 8.33268 12.4319C8.67786 12.4319 8.95768 12.7117 8.95768 13.0569C8.95768 13.3769 9.31251 13.8207 9.99935 13.8207C10.6862 13.8207 11.041 13.3769 11.041 13.0569C11.041 12.7368 10.6862 12.293 9.99935 12.293C8.84523 12.293 7.70768 11.4932 7.70768 10.2791C7.70768 9.28714 8.46703 8.57175 9.37435 8.34316V8.33464C9.37435 7.98946 9.65417 7.70964 9.99935 7.70964Z" fill="white"/>
                    </svg>
                    <span className="text-gfx-neutral-400 text-[0.875rem] font-acid">Social Wallet</span>
                    <span className="text-white text-[0.875rem] font-acid">$100.00</span>
                  </div>
                  <GlowButton
                    label="Create Strategy"
                    width={200}
                    height={44}
                    icon={
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    }
                    onClick={() => navigate('/gensocial/pamm/create-strategy')}
                  />
                </div>
              </div>
            </div>

            {/* Manager Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard label="Total AUM" value="$0.00" />
              <StatCard label="Total Strategies" value="0" />
              <StatCard label="Total Followers" value="0" />
              <StatCard label="Total P&L Generated" value="$0.00" valueColor="text-gfx-bullish-light" />
              <StatCard label="Fee Earnings" value="$0.00" />
            </div>

            {/* Manager Dashboard Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-white text-[1.5625rem] font-acid leading-none">Manager Dashboard</h2>
              <SearchInput
                placeholder="Search strategies"
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-[17.9375rem]"
              />
            </div>

            {/* Strategies Table */}
            <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
              <GlowEllipse className="left-1/2 -translate-x-1/4 -top-[15.6250rem]" />
              <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px] bg-gradient-to-r from-transparent via-[rgba(0,240,160,0.3)] to-transparent" />
              <div className="relative overflow-x-auto">
                <table className="w-full min-w-[60rem]">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.04)]">
                      {['Strategy name', 'aum', 'Investors', 'P&L', 'Min Investment', 'managment fee', 'perfomance fee', 'status', 'actions'].map(h => (
                        <th key={h} className="text-left text-gfx-neutral-300 text-[0.75rem] font-acid font-bold uppercase tracking-[2.32px] leading-[15.68px] px-7 py-4 first:pl-7">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2].map(i => (
                      <tr key={i} className="border-b border-gfx-green-900 last:border-0">
                        <td className="px-7 py-5">
                          <span className="text-white text-[0.875rem] font-acid font-normal leading-[18.8px]">Testing PAMM</span>
                        </td>
                        <td className="px-7 py-5">
                          <span className="text-white text-[0.875rem] font-acid font-normal leading-[18.8px]">$0.00</span>
                        </td>
                        <td className="px-7 py-5">
                          <span className="text-white text-[0.875rem] font-acid font-normal leading-[18.8px]">0</span>
                        </td>
                        <td className="px-7 py-5">
                          <span className="text-white text-[0.875rem] font-acid font-normal leading-[18.8px]">$0.00</span>
                        </td>
                        <td className="px-7 py-5">
                          <span className="text-white text-[0.875rem] font-acid font-normal leading-[18.8px]">$100.00</span>
                        </td>
                        <td className="px-7 py-5">
                          <span className="text-white text-[0.875rem] font-acid font-normal leading-[18.8px]">2%</span>
                        </td>
                        <td className="px-7 py-5">
                          <span className="text-white text-[0.875rem] font-acid font-normal leading-[18.8px]">20%</span>
                        </td>
                        <td className="px-7 py-5">
                          <span className="inline-flex items-center justify-center px-4 py-[0.4375rem] rounded-[1.875rem] border-[1.16px] border-gfx-bullish text-gfx-bullish-light text-[0.75rem] font-acid leading-[18.8px]">Active</span>
                        </td>
                        <td className="px-7 py-5">
                          <div className="flex items-center gap-2">
                            <SparkleButton className="!px-[2.3750rem] !h-[2.8750rem]">
                              <span className="text-gfx-neutral-550 text-[1rem] font-acid font-medium leading-[24.44px]">View</span>
                            </SparkleButton>
                            <SparkleButton className="!px-[2.3750rem] !h-[2.8750rem]">
                              <span className="text-gfx-neutral-550 text-[1rem] font-acid font-medium leading-[24.44px]">Edit</span>
                            </SparkleButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </>
        )}

      </div>
    </div>
  )
}
