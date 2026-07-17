import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SearchInput, GlowEllipse, ModeToggle } from '@/components/ui'

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

function AvatarCircle({ initials }: { initials: string }) {
  return (
    <div className="w-[47px] h-[47px] rounded-full bg-gfx-green-800 flex items-center justify-center shrink-0">
      <span className="text-gfx-green-500 text-[16.3px] font-acid">{initials}</span>
    </div>
  )
}

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

function ExportButton() {
  return (
    <button type="button" className="flex items-center justify-center p-[10px] rounded-[60px] border border-[#303030] cursor-pointer hover:border-gfx-green-200 transition-colors">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M20.3708 3.46447C18.9063 2 16.5493 2 11.8352 2C7.12119 2 4.76417 2 3.2997 3.46447C2.54222 4.22195 2.17653 5.21824 2 6.65598C2.53066 6.06532 3.16829 5.57328 3.8843 5.20846C4.66578 4.81027 5.50258 4.6488 6.4291 4.5731C7.32423 4.49997 8.42564 4.49998 9.7724 4.5H13.8981C15.2448 4.49998 16.3462 4.49997 17.2414 4.5731C18.1679 4.6488 19.0047 4.81027 19.7862 5.20846C20.5022 5.57328 21.1398 6.06532 21.6705 6.65598C21.4939 5.21824 21.1283 4.22195 20.3708 3.46447Z" fill="#808080" />
        <path fillRule="evenodd" clipRule="evenodd" d="M2 14.6562C2 11.856 2 10.4559 2.54497 9.3863C3.02433 8.44549 3.78924 7.68058 4.73005 7.20122C5.79961 6.65625 7.19974 6.65625 10 6.65625H14C16.8003 6.65625 18.2004 6.65625 19.27 7.20122C20.2108 7.68058 20.9757 8.44549 21.455 9.3863C22 10.4559 22 11.856 22 14.6562C22 17.4565 22 18.8566 21.455 19.9262C20.9757 20.867 20.2108 21.6319 19.27 22.1113C18.2004 22.6562 16.8003 22.6562 14 22.6562H10C7.19974 22.6562 5.79961 22.6562 4.73005 22.1113C3.78924 21.6319 3.02433 20.867 2.54497 19.9262C2 18.8566 2 17.4565 2 14.6562ZM12.5303 18.1866C12.3897 18.3272 12.1989 18.4062 12 18.4062C11.8011 18.4062 11.6103 18.3272 11.4697 18.1866L8.96967 15.6866C8.67678 15.3937 8.67678 14.9188 8.96967 14.6259C9.26256 14.333 9.73744 14.333 10.0303 14.6259L11.25 15.8456V11.6562C11.25 11.242 11.5858 10.9062 12 10.9062C12.4142 10.9062 12.75 11.242 12.75 11.6562V15.8456L13.9697 14.6259C14.2626 14.333 14.7374 14.333 15.0303 14.6259C15.3232 14.9188 15.3232 15.3937 15.0303 15.6866L12.5303 18.1866Z" fill="#808080" />
      </svg>
    </button>
  )
}

function RefreshButton() {
  return (
    <button type="button" className="flex items-center justify-center p-[10px] rounded-[60px] border border-[#303030] cursor-pointer hover:border-gfx-green-200 transition-colors">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM5.46058 11.0833C5.83333 7.79988 8.62406 5.25 12.0096 5.25C13.9916 5.25 15.7702 6.12471 16.9775 7.50653C17.25 7.81846 17.2181 8.29226 16.9061 8.56479C16.5942 8.83733 16.1204 8.80539 15.8479 8.49347C14.9136 7.42409 13.541 6.75 12.0096 6.75C9.45215 6.75 7.33642 8.63219 6.97332 11.0833H7.33654C7.63998 11.0833 7.91353 11.2662 8.02955 11.5466C8.14558 11.8269 8.08122 12.1496 7.86651 12.364L6.69825 13.5307C6.40544 13.8231 5.93113 13.8231 5.63832 13.5307L4.47005 12.364C4.25534 12.1496 4.19099 11.8269 4.30701 11.5466C4.42304 11.2662 4.69658 11.0833 5.00002 11.0833H5.46058ZM17.3018 10.4693C17.5947 10.1769 18.069 10.1769 18.3618 10.4693L19.53 11.636C19.7448 11.8504 19.8091 12.1731 19.6931 12.4534C19.5771 12.7338 19.3035 12.9167 19.0001 12.9167H18.5395C18.1668 16.2001 15.376 18.75 11.9905 18.75C10.0085 18.75 8.22995 17.8753 7.02263 16.4935C6.7501 16.1815 6.78203 15.7077 7.09396 15.4352C7.40589 15.1627 7.87968 15.1946 8.15222 15.5065C9.08654 16.5759 10.4591 17.25 11.9905 17.25C14.548 17.25 16.6637 15.3678 17.0268 12.9167H16.6636C16.3601 12.9167 16.0866 12.7338 15.9705 12.4534C15.8545 12.1731 15.9189 11.8504 16.1336 11.636L17.3018 10.4693Z" fill="#808080" />
      </svg>
    </button>
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

        <h1 className="text-5xl font-acid text-white">Comissions</h1>

        <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
          <div className="relative">
            <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

            <div className="absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

            <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

            <div className="border-b border-gfx-green-800 px-6 py-0 h-[84px] flex items-center">
              <h2 className="text-2xl font-acid text-white">All Comissions</h2>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap px-4 sm:px-6 py-4">
              <div className="overflow-x-auto max-w-full w-[556px]">
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
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Client</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Account</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Instrument</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Date & Time</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Lots</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Rate</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Comission</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Open Time</span>
                  <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Status</span>
                </div>
              </div>

              {COMMISSIONS.map((item, i) => (
                <div key={i} className="border-b border-gfx-green-800 last:border-b-0 h-[76px] flex items-center px-6 min-w-[56rem]">
                  <div className={`grid ${GRID_COLS} w-full items-center`}>
                    <div className="flex items-center gap-4">
                      <AvatarCircle initials={item.initials} />
                      <div>
                        <p className="text-base font-acid font-medium text-[#ececec] leading-[24.44px]">{item.name}</p>
                        <p className="text-sm font-acid text-[#606060] leading-[18.8px]">{item.email}</p>
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
