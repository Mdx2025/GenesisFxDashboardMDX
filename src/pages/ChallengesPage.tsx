import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassBannerCard, SearchInput, GlowButton, SparkleButton, ModeToggle } from '@/components/ui'

function UserRoundedSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="10" rx="5.5" ry="5.5" fill="white"/>
      <ellipse cx="16" cy="25" rx="9.5" ry="5.5" fill="white"/>
    </svg>
  )
}
import { ChallengesIcon } from '@/components/icons'

function TrophyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M28.5 10.5V10.6c0 1.1 0 1.65-.27 2.1-.27.3-.73.57-1.7 1.1l-1-.01c.7-2.37.93-4.91 1.01-7.1l.01-.28c.83.29 1.3.5 1.6.9.35.5.35 1.17.35 2.5z" fill="white"/>
      <path d="M3.5 10.5V10.6c0 1.1 0 1.65.27 2.1.27.3.73.57 1.7 1.1l1-.01c-.7-2.37-.93-4.91-1.01-7.1l-.01-.28c-.83.29-1.3.5-1.6.9-.35.5-.35 1.17-.35 2.5z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.5 3.2c-1.44-.24-3.32-.44-5.6-.44-2.28 0-4.17.2-5.6.44-1.46.25-2.19.37-2.8 1.12-.6.75-.57 1.56-.51 3.18.22 5.56 1.42 12.5 7.95 13.11v4.52h-1.83c-.6 0-1.13.43-1.25 1.02l-.24 1.21h-3.39c-.53 0-.96.43-.96.96s.43.96.96.96h15.36c.53 0 .96-.43.96-.96s-.43-.96-.96-.96h-3.39l-.24-1.21c-.12-.6-.65-1.02-1.25-1.02h-1.83v-4.52c6.53-.61 7.73-7.55 7.95-13.11.06-1.62.1-2.43-.51-3.18-.61-.75-1.34-.87-2.8-1.12z" fill="white"/>
    </svg>
  )
}

function UserRoundedIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="10" rx="5.5" ry="5.5" fill="#00B38C"/>
      <ellipse cx="16" cy="25" rx="9.5" ry="5.5" fill="#00B38C"/>
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 18" fill="none">
      <path d="M1 1h18M4 9h12M7 17h6" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M10 6l7 7-7 7" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ChallengesPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Dashboard', href: '/home' },
          { label: '10X Challenges', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">
        {/* Page Title */}
        <h1 className="text-white text-h1 font-normal">10X Challenges</h1>

        {/* Hero Banner */}
        <GlassBannerCard contentClassName="flex items-center justify-between p-6 xl:p-8 min-h-[16rem]">
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-[clamp(1.5rem,1rem+1.5vw,3.125rem)] font-normal">10x Challenge</h2>
            <p className="text-[#808080] text-body2">
              Turn $125 into $1,000,000 — prove your skill, level up your capital
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#09241C] rounded-[30px] px-6 py-4">
            <div className="w-[98px] h-[98px] rounded-xl bg-[#064B34] flex items-center justify-center">
              <TrophyIcon />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white text-[clamp(1.5rem,1rem+1.5vw,3.125rem)] font-normal">0</span>
              <span className="text-[#808080] text-[1rem] font-medium">My challenges</span>
            </div>
          </div>
        </GlassBannerCard>

        {/* Tabs + Actions Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="w-md">
            <ModeToggle options={['My Challenges', 'Leaderboard', 'Tiers']} />
          </div>
          <div className="flex items-center gap-3">
            <SearchInput placeholder="Search for" />
            <button className="h-11 w-11 rounded-full border border-[#064B34] bg-transparent flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors shrink-0" aria-label="Filter">
              <FilterIcon />
            </button>
            <SparkleButton className="px-4">
              <ChallengesIcon size={16} color="white" />
              <span>Prize Pool</span>
            </SparkleButton>
            <GlowButton label="New Account" width={192} height={44} fontSize={16} />
          </div>
        </div>

        {/* Empty State */}
        <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center py-20 gap-6">
            <div className="w-[70px] h-[70px] rounded-full bg-[#09241C] flex items-center justify-center">
              <UserRoundedIcon />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-white text-[1.5rem] font-normal">No 10x Accounts Yet</h3>
              <p className="text-[#808080] text-body2 text-center max-w-lg">
                Create your first 10X account to start trading with enhanced leverage
              </p>
            </div>
            <GlowButton label="Create Account" width={183} height={44} fontSize={16} />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
