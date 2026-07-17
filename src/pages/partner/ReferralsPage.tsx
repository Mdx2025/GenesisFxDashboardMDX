import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SearchInput } from '@/components/ui'
import { ChevronRightIcon } from '@/components/icons'

const LEVELS = ['All Levels', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10']

const TABLE_HEADERS = ['USER', 'LEVEL', 'COUNTRY', 'TOTAL BALANCE', 'DATE JOINED', 'ACTIONS']

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
    <div className="bg-gfx-green-800 rounded-[60px] px-4 py-1 flex items-center gap-0 flex-wrap">
      {LEVELS.map(level => (
        <button
          key={level}
          type="button"
          onClick={() => onChange(level)}
          className={`relative px-3 py-1.5 rounded-[60px] text-xs font-acid whitespace-nowrap cursor-pointer transition-all ${
            active === level
              ? 'bg-gfx-green-200 border border-gfx-green-500 text-white'
              : 'text-gfx-neutral-300 hover:text-white'
          }`}
        >
          {level}
          {active === level && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-4 rounded-full bg-gfx-green-500 mix-blend-plus-lighter blur-md" />
          )}
        </button>
      ))}
    </div>
  )
}

function DropdownSelect() {
  return (
    <div className="relative bg-[#0c1311] border border-gfx-green-200 rounded-full h-[2.875rem] w-[16.1875rem] flex items-center px-4">
      <span className="text-gfx-neutral-300 text-base font-acid">All Referrals</span>
      <ChevronRightIcon size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gfx-neutral-300" />
    </div>
  )
}

function AvatarCircle({ initials }: { initials: string }) {
  return (
    <div className="w-[2.9375rem] h-[2.9375rem] rounded-full bg-gfx-green-800 border border-gfx-green-200 flex items-center justify-center shrink-0">
      <span className="text-gfx-green-500 text-base font-acid">{initials}</span>
    </div>
  )
}

function LevelBadge({ level }: { level: string }) {
  return (
    <span className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#303030] text-white text-sm font-acid">
      {level}
    </span>
  )
}

function DetailsButton() {
  return (
    <button type="button" className="inline-flex items-center gap-3.5 px-4.5 h-[2.875rem] rounded-full border border-[#303030] text-gfx-neutral-100 text-base font-acid font-medium cursor-pointer hover:border-gfx-green-200 transition-colors">
      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
        <path d="M5.5 0C3 0 0.88 1.49 0 3.6C0.88 5.71 3 7.2 5.5 7.2C8 7.2 10.12 5.71 11 3.6C10.12 1.49 8 0 5.5 0ZM5.5 6C4.17 6 3.1 4.93 3.1 3.6C3.1 2.27 4.17 1.2 5.5 1.2C6.83 1.2 7.9 2.27 7.9 3.6C7.9 4.93 6.83 6 5.5 6ZM5.5 2.16C4.7 2.16 4.06 2.8 4.06 3.6C4.06 4.4 4.7 5.04 5.5 5.04C6.3 5.04 6.94 4.4 6.94 3.6C6.94 2.8 6.3 2.16 5.5 2.16Z" fill="#ECECEC"/>
      </svg>
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

        <GlassCard variant="heavy" divider="none" rounded="19px" className="overflow-hidden">
          <div className="relative p-6">
            {/* Header */}
            <div className="border-b border-gfx-green-800 pb-6 mb-6">
              <h2 className="text-2xl font-acid text-white">All Referals</h2>
            </div>

            {/* Filters row */}
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
              <LevelTabs active={activeLevel} onChange={setActiveLevel} />
              <div className="flex items-center gap-3">
                <SearchInput placeholder="Search " className="w-[17.9375rem]" />
                <DropdownSelect />
              </div>
            </div>

            {/* Table header */}
            <div className="border-b border-gfx-green-800">
              <div className="grid grid-cols-[minmax(15rem,1.5fr)_minmax(6rem,0.7fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)] gap-4 py-3 px-4">
                {TABLE_HEADERS.map(header => (
                  <span key={header} className="text-xs font-acid font-bold uppercase tracking-[0.145rem] text-[#606060]">
                    {header}
                  </span>
                ))}
              </div>
            </div>

            {/* Table rows */}
            {REFERRALS.map((referral, i) => (
              <div key={i} className="border-b border-gfx-green-800 last:border-b-0">
                <div className="grid grid-cols-[minmax(15rem,1.5fr)_minmax(6rem,0.7fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)] gap-4 py-3.5 px-4 items-center">
                  {/* User */}
                  <div className="flex items-center gap-4">
                    <AvatarCircle initials={referral.initials} />
                    <div>
                      <p className="text-base font-acid font-medium text-gfx-neutral-100">{referral.name}</p>
                      <p className="text-sm font-acid text-[#606060]">{referral.email}</p>
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <LevelBadge level={referral.level} />
                  </div>

                  {/* Country */}
                  <span className="text-sm font-acid text-white">{referral.country}</span>

                  {/* Total Balance */}
                  <span className="text-sm font-acid text-white">{referral.totalBalance}</span>

                  {/* Date Joined */}
                  <span className="text-sm font-acid text-white">{referral.dateJoined}</span>

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
