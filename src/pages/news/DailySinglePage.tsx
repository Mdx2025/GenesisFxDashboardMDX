import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'

function BackArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SkipBackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 20L9 12L19 4V20Z" fill="white" />
      <rect x="5" y="4" width="2" height="16" rx="1" fill="white" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function SkipForwardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 4L15 12L5 20V4Z" fill="white" />
      <rect x="17" y="4" width="2" height="16" rx="1" fill="white" />
    </svg>
  )
}

function VolumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white" />
      <path d="M15.54 8.46a5 5 0 010 7.07" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.07 4.93a10 10 0 010 14.14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  )
}

export default function DailySinglePage() {
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Market News', href: '/news' },
          { label: 'Daily News', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 pb-12 mt-6 3xl:mt-8 4xl:mt-10">
        {/* Back + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/news')}
            className="w-[38px] h-[38px] rounded-[10px] bg-[#09241c] flex items-center justify-center cursor-pointer hover:bg-[#0a714f] transition-colors shrink-0"
            aria-label="Back to news"
          >
            <BackArrow />
          </button>
          <h1 className="text-white font-normal leading-none text-[clamp(1.5rem,0.75rem+1.5vw,3.5rem)]">
            News: 27/04/2026
          </h1>
        </div>

        {/* Video Container */}
        <div className="relative rounded-[30px] 2xl:rounded-[60px] overflow-hidden bg-[#0c1311]">
          <div className="relative aspect-[16/9] w-full">
            <img
              src="/images/news/daily-hero-thumbnail.png"
              alt="Daily Market Analysis"
              className="w-full h-full object-cover"
            />

            {/* Video player controls bar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[75%] max-w-[1165px] h-[78px] bg-[#0c1311] rounded-[28px] overflow-hidden flex flex-col px-6">
              {/* Controls row */}
              <div className="flex items-center gap-4 flex-1">
                {/* Left: Volume */}
                <button className="cursor-pointer hover:opacity-80 transition-opacity shrink-0">
                  <VolumeIcon />
                </button>

                {/* Center: Play controls */}
                <div className="flex items-center gap-3 ml-4">
                  <button className="cursor-pointer hover:opacity-80 transition-opacity">
                    <SkipBackIcon />
                  </button>
                  <button className="w-[28px] h-[28px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </button>
                  <button className="cursor-pointer hover:opacity-80 transition-opacity">
                    <SkipForwardIcon />
                  </button>
                </div>

                {/* Timestamp */}
                <span className="text-white text-[16px] font-acid font-medium ml-4 shrink-0">0:19 / 0:50</span>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right controls */}
                <div className="flex items-center gap-3">
                  {/* Volume slider */}
                  <div className="flex items-center gap-2">
                    <div className="w-[62px] h-[4px] bg-[#09241c] rounded-full overflow-hidden">
                      <div className="w-[20%] h-full bg-[#0a714f] rounded-full" />
                    </div>
                  </div>
                  <button className="cursor-pointer hover:opacity-80 transition-opacity">
                    <FullscreenIcon />
                  </button>
                  <button className="cursor-pointer hover:opacity-80 transition-opacity">
                    <MoreIcon />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[4px] bg-[#09241c] rounded-full overflow-hidden mb-3">
                <div className="w-[23%] h-full bg-[#0a714f] rounded-full" />
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-6 flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-white text-[16px] font-acid">00:02:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
