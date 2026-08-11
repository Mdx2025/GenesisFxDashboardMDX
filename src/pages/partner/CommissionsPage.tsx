import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SearchInput, GlowEllipse, ModeToggle } from '@/components/ui'
import { AvatarCircle, ExportButton, RefreshButton } from '@/components/partner/shared'

const LEVELS = ['All Levels', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10']

interface Commission {
  name: string
  email: string
  initials: string
  account: string
  instrument: string
  dateTime: string
  lots: string
  rate: string
  commission: string
  openTime: string
  status: 'Paid' | 'Pending'
}

const COMMISSIONS: Commission[] = [
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', account: 'MT5-88210', instrument: 'AUDUSD', dateTime: '2026-06-05 10:24', lots: '2.50', rate: '$5.00', commission: '+$12.50', openTime: '2026-06-05 08:14', status: 'Paid' },
]

function StatusBadge({ status }: { status: 'Paid' | 'Pending' }) {
  const isPaid = status === 'Paid'
  return (
    <span className={`inline-flex items-center justify-center px-[18px] h-[24px] rounded-[30px] border-[1.16px] text-xs font-acid leading-[18.8px] ${
      isPaid
        ? 'border-[#0C9104] text-[#37C92E]'
        : 'border-[#303030] text-gfx-neutral-400'
    }`}>
      {status}
    </span>
  )
}

const GRID_COLS = 'grid-cols-[minmax(14rem,2fr)_minmax(6rem,0.8fr)_minmax(6rem,0.8fr)_minmax(9rem,1.1fr)_minmax(4rem,0.5fr)_minmax(4.5rem,0.6fr)_minmax(5.5rem,0.7fr)_minmax(9rem,1.1fr)_minmax(4.5rem,0.6fr)]'

export default function CommissionsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeLevelIndex, setActiveLevelIndex] = useState(LEVELS.length - 1)

  const breadcrumbItems = [
    { label: 'Comissions', current: true },
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

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-acid text-white pb-6 lg:pb-15">Comissions</h1>

        <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
          <div className="relative">
            <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

            <div className="absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

            <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

            <div className="border-b border-gfx-green-800 px-6 py-0 h-[84px] flex items-center">
              <h2 className="text-2xl font-acid text-white">All Comissions</h2>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap px-4 sm:px-6 py-4">
              <div className="overflow-x-auto max-w-full w-full lg:w-[556px]">
                <ModeToggle options={LEVELS} activeIndex={activeLevelIndex} onChange={setActiveLevelIndex} size="sm" />
              </div>
              <div className="flex items-center gap-3">
                <SearchInput placeholder="Search " className="w-[200px] sm:w-[287px]" />
                <ExportButton />
                <RefreshButton />
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="border-b border-gfx-green-800 h-[40px] flex items-center px-6 min-w-[56rem]">
                <div className={`grid ${GRID_COLS} w-full items-center`}>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Client</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Account</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Instrument</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Date & Time</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Lots</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Rate</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Comission</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Open Time</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Status</span>
                </div>
              </div>

              {COMMISSIONS.map((item, i) => (
                <div key={i} className="border-b border-gfx-green-800 last:border-b-0 h-[76px] flex items-center px-6 min-w-[56rem]">
                  <div className={`grid ${GRID_COLS} w-full items-center`}>
                    <div className="flex items-center gap-4">
                      <AvatarCircle initials={item.initials} />
                      <div>
                        <p className="text-base font-acid font-medium text-[#ececec] leading-[24.44px]">{item.name}</p>
                        <p className="text-sm font-acid text-gfx-neutral-400 leading-[18.8px]">{item.email}</p>
                      </div>
                    </div>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{item.account}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{item.instrument}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{item.dateTime}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{item.lots}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{item.rate}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{item.commission}</span>

                    <span className="text-sm font-acid text-white leading-[18.8px]">{item.openTime}</span>

                    <div>
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
