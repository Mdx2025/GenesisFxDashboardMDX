import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SearchInput } from '@/components/ui'

const LEVELS = ['All Levels', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10']

interface Referral {
  name: string
  email: string
  initials: string
  level: string
  country: string
  totalBalance: string
  dateJoined: string
}

const REFERRALS: Referral[] = [
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', level: 'Level 1', country: 'United Kingdom', totalBalance: '$12,450.00', dateJoined: 'Oct 24, 2025' },
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', level: 'Level 2', country: 'Germany', totalBalance: '$8,120.50', dateJoined: 'Nov 12, 2025' },
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', level: 'Level 3', country: 'Italy', totalBalance: '$8,120.50', dateJoined: 'Dec 05, 2025' },
]

function LevelTabs({ active, onChange }: { active: string; onChange: (level: string) => void }) {
  return (
    <div className="bg-gfx-green-800 rounded-[60px] inline-flex items-center gap-[31px] px-4 py-[3px]">
      {LEVELS.map(level => {
        const isActive = active === level
        return (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`relative text-xs font-acid whitespace-nowrap cursor-pointer transition-all leading-[18.8px] ${
              isActive
                ? 'bg-gfx-green-200 border-[1.35px] border-gfx-green-500 text-white rounded-[60px] px-4 py-1.5 overflow-hidden'
                : 'text-gfx-neutral-300 hover:text-white'
            }`}
          >
            <span className="relative z-10">{level}</span>
            {isActive && (
              <svg className="absolute left-1/2 -translate-x-1/2 bottom-[-12px]" width="54" height="33" viewBox="0 0 54 33" fill="none" style={{ mixBlendMode: 'plus-lighter' }}>
                <g filter="url(#lvl_glow)">
                  <ellipse cx="27" cy="35" rx="14.5" ry="8" fill="#CFF2E6" />
                </g>
                <defs>
                  <filter id="lvl_glow" x="-27.5" y="-13" width="109" height="96" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="bg" />
                    <feBlend in="SourceGraphic" in2="bg" result="shape" />
                    <feGaussianBlur stdDeviation="20" result="blur" />
                  </filter>
                </defs>
              </svg>
            )}
          </button>
        )
      })}
    </div>
  )
}

function DropdownSelect() {
  return (
    <div className="relative bg-[#0c1311] border border-gfx-green-200 rounded-[30px] h-[46px] w-[259px] flex items-center">
      <div className="flex items-center gap-2.5 pl-4 py-2.5">
        <span className="text-gfx-neutral-300 text-base font-acid">All Referrals</span>
      </div>
      <svg className="absolute right-6 top-1/2 -translate-y-1/2" width="13" height="8" viewBox="0 0 13 8" fill="none">
        <path d="M5.036 7.107L0.433 2.504C-0.49 1.58 0.164 0 1.47 0h9.206c1.306 0 1.961 1.58 1.037 2.504L7.11 7.107a1.465 1.465 0 0 1-2.074 0z" fill="#808080" />
      </svg>
    </div>
  )
}

function AvatarCircle({ initials }: { initials: string }) {
  return (
    <div className="w-[47px] h-[47px] rounded-full bg-gfx-green-800 flex items-center justify-center shrink-0">
      <span className="text-gfx-green-500 text-[16.3px] font-acid">{initials}</span>
    </div>
  )
}

function LevelBadge({ level }: { level: string }) {
  return (
    <span className="inline-flex items-center justify-center px-[26px] py-2.5 rounded-[32px] border border-[#303030] text-white text-sm font-acid leading-[18.8px]">
      {level}
    </span>
  )
}

function EyeIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <path d="M4.263 4.4a1.237 1.237 0 1 1 2.475 0 1.237 1.237 0 0 1-2.475 0z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 4.4c0 .902.234 1.206.701 1.813C1.635 7.426 3.2 8.8 5.5 8.8c2.3 0 3.866-1.374 4.8-2.587.467-.607.7-.911.7-1.813s-.233-1.205-.7-1.813C9.366 1.375 7.8 0 5.5 0S1.635 1.375.701 2.588C.234 3.195 0 3.499 0 4.4zm5.5-2.063a2.063 2.063 0 1 0 0 4.126 2.063 2.063 0 0 0 0-4.126z" fill="white" />
    </svg>
  )
}

function DetailsButton() {
  return (
    <button type="button" className="inline-flex items-center gap-3.5 h-[46px] px-[18px] rounded-[32px] border border-[#303030] text-[#ececec] text-base font-acid font-medium leading-[24.44px] cursor-pointer hover:border-gfx-green-200 transition-colors">
      <EyeIcon />
      Details
    </button>
  )
}

export default function ReferralsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeLevel, setActiveLevel] = useState('L10')

  const breadcrumbItems = [
    { label: 'Referrals', current: true },
  ]

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <h1 className="text-5xl font-acid text-white">Referrals</h1>

        <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
          <div className="relative">
            {/* Green glow inside card */}
            <div className="absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

            {/* Green gradient divider at top */}
            <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

            {/* Header: "All Referals" */}
            <div className="border-b border-gfx-green-800 px-6 py-0 h-[84px] flex items-center">
              <h2 className="text-2xl font-acid text-white">All Referals</h2>
            </div>

            {/* Filters row */}
            <div className="flex items-center justify-between gap-4 flex-wrap px-6 py-4">
              <LevelTabs active={activeLevel} onChange={setActiveLevel} />
              <div className="flex items-center gap-3">
                <SearchInput placeholder="Search " className="w-[287px]" />
                <DropdownSelect />
              </div>
            </div>

            {/* Table header row */}
            <div className="border-b border-gfx-green-800 h-[40px] flex items-center px-6">
              <div className="grid grid-cols-[minmax(15rem,2fr)_minmax(6rem,0.8fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)] w-full items-center">
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">User</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">LEvel</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">country</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">total balance</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">date joined</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">actions</span>
              </div>
            </div>

            {/* Table rows */}
            {REFERRALS.map((referral, i) => (
              <div key={i} className="border-b border-gfx-green-800 last:border-b-0 h-[76px] flex items-center px-6">
                <div className="grid grid-cols-[minmax(15rem,2fr)_minmax(6rem,0.8fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)] w-full items-center">
                  {/* User */}
                  <div className="flex items-center gap-4">
                    <AvatarCircle initials={referral.initials} />
                    <div>
                      <p className="text-base font-acid font-medium text-[#ececec] leading-[24.44px]">{referral.name}</p>
                      <p className="text-sm font-acid text-[#606060] leading-[18.8px]">{referral.email}</p>
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <LevelBadge level={referral.level} />
                  </div>

                  {/* Country */}
                  <span className="text-sm font-acid text-white leading-[18.8px]">{referral.country}</span>

                  {/* Total Balance */}
                  <span className="text-sm font-acid text-white leading-[18.8px]">{referral.totalBalance}</span>

                  {/* Date Joined */}
                  <span className="text-sm font-acid text-white leading-[18.8px]">{referral.dateJoined}</span>

                  {/* Actions */}
                  <div>
                    <DetailsButton />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  )
}
