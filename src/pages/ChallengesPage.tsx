import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassBannerCard, SearchInput, GlowButton, SparkleButton, ModeToggle } from '@/components/ui'

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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M16.1667 2H4.5C3.32149 2 2.73223 2 2.36612 2.3435C2 2.687 2 3.23985 2 4.34555V4.9204C2 5.78527 2 6.2177 2.21633 6.57618C2.43267 6.93466 2.82789 7.15715 3.61835 7.60212L6.04587 8.96865C6.57622 9.2672 6.84139 9.41648 7.03126 9.58131C7.42665 9.92458 7.67007 10.3279 7.78037 10.8226C7.83333 11.0602 7.83333 11.3382 7.83333 11.8941V14.1187C7.83333 14.8766 7.83333 15.2556 8.04327 15.5511C8.25321 15.8465 8.62607 15.9923 9.3718 16.2838C10.9373 16.8958 11.7201 17.2018 12.2767 16.8537C12.8333 16.5055 12.8333 15.7099 12.8333 14.1187V11.8941C12.8333 11.3382 12.8333 11.0602 12.8863 10.8226C12.9966 10.3279 13.24 9.92458 13.6354 9.58131C13.8253 9.41648 14.0904 9.2672 14.6208 8.96865L17.0483 7.60212C17.8388 7.15715 18.234 6.93466 18.4503 6.57618C18.6667 6.2177 18.6667 5.78527 18.6667 4.9204V4.34555C18.6667 3.23985 18.6667 2.687 18.3005 2.3435C17.9344 2 17.3452 2 16.1667 2Z" fill="#808080"/>
    </svg>
  )
}

function PrizePoolTrophyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M16.5 6.12176L16.5 6.17615C16.4999 6.82171 16.4999 7.14449 16.3445 7.40857C16.1891 7.67266 15.907 7.82942 15.3427 8.14293L14.7477 8.47349C15.1577 7.08738 15.2945 5.59811 15.345 4.32448C15.3472 4.26987 15.3497 4.21459 15.3521 4.15872L15.3538 4.11959C15.8423 4.28922 16.1165 4.41568 16.2876 4.65306C16.5 4.94769 16.5 5.33905 16.5 6.12176Z" fill="#C6C6C6"/>
      <path d="M1.5 6.12176L1.5 6.17615C1.50002 6.82171 1.50003 7.14449 1.65542 7.40857C1.81081 7.67266 2.09297 7.82942 2.65729 8.14293L3.2526 8.47367C2.84255 7.08751 2.70575 5.59816 2.65519 4.32448C2.65302 4.26987 2.65058 4.21459 2.64811 4.15872L2.64638 4.1195C2.15775 4.28917 1.88344 4.41564 1.71232 4.65306C1.49997 4.94769 1.49998 5.33905 1.5 6.12176Z" fill="#C6C6C6"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2828 1.76006C11.4398 1.61782 10.3378 1.5 9.00012 1.5C7.66246 1.5 6.56043 1.61782 5.71738 1.76006C4.86334 1.90415 4.43631 1.9762 4.07952 2.41562C3.72274 2.85505 3.74159 3.32998 3.7793 4.27985C3.90877 7.54078 4.61247 11.6138 8.4375 11.9742V14.625H7.36485C7.00734 14.625 6.69953 14.8773 6.62942 15.2279L6.4875 15.9375H4.5C4.18934 15.9375 3.9375 16.1893 3.9375 16.5C3.9375 16.8107 4.18934 17.0625 4.5 17.0625H13.5C13.8107 17.0625 14.0625 16.8107 14.0625 16.5C14.0625 16.1893 13.8107 15.9375 13.5 15.9375H11.5125L11.3706 15.2279C11.3005 14.8773 10.9927 14.625 10.6351 14.625H9.5625V11.9743C13.3877 11.614 14.0915 7.54084 14.2209 4.27985C14.2586 3.32998 14.2775 2.85505 13.9207 2.41562C13.5639 1.9762 13.1369 1.90415 12.2828 1.76006Z" fill="#C6C6C6"/>
    </svg>
  )
}

function NewAccountUserIconDark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="4.5" r="3" fill="black"/>
      <ellipse cx="9" cy="12.75" rx="5.25" ry="3" fill="black"/>
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

        {/* Tabs + Actions Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="w-md">
            <ModeToggle options={['My Challenges', 'Leaderboard', 'Tiers']} />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <SearchInput placeholder="Search for" />
            <button className="h-11 w-[2.9375rem] rounded-full border border-[#303030] bg-transparent flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors shrink-0" aria-label="Filter">
              <FilterIcon />
            </button>
            <SparkleButton className="px-4">
              <PrizePoolTrophyIcon />
              <span>Prize Pool</span>
            </SparkleButton>
            <GlowButton label="New Account" width={192} height={44} fontSize={16} icon={<NewAccountUserIconDark />} />
          </div>
        </div>

        {/* Hero Banner */}
        <GlassBannerCard contentClassName="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 xl:p-8 gap-6 lg:min-h-[17.4375rem]">
          <div className="flex flex-col">
            <h2 className="text-white text-[clamp(1.5rem,1rem+1.5vw,3.125rem)] font-normal">10x Challenge</h2>
            <p className="text-[#808080] text-body2">
              Turn $125 into $1,000,000 — prove your skill, level up your capital
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#09241C] rounded-[1.875rem] px-6 py-4 shrink-0">
            <div className="w-[6.125rem] h-[6.125rem] rounded-xl bg-[#064B34] flex items-center justify-center">
              <TrophyIcon />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white text-[clamp(1.5rem,1rem+1.5vw,3.125rem)] font-normal">0</span>
              <span className="text-[#808080] text-[1rem] font-medium">My challenges</span>
            </div>
          </div>
        </GlassBannerCard>

        {/* Empty State */}
        <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 gap-6">
            <div className="w-[4.375rem] h-[4.375rem] rounded-full bg-[#09241C] flex items-center justify-center">
              <UserRoundedIcon />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-white text-[1.5rem] font-normal">No 10x Accounts Yet</h3>
              <p className="text-[#808080] text-body2 text-center max-w-lg">
                Create your first 10X account to start trading with enhanced leverage
              </p>
            </div>
            <GlowButton label="Trade" width={183} height={44} fontSize={16} />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
