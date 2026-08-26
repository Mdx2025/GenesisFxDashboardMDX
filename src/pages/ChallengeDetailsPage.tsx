import { useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/dashboard/TopBar'
import { Badge, ChallengeDrawdownCard, ChallengeMetricCard, ChallengePerformanceCard, SecondaryButton } from '@/components/ui'
import { useSidebar } from '@/layouts/RootLayout'

function BackArrowIcon() {
  return (
    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" aria-hidden="true">
      <path d="M5.75 1.25 1.25 6.5l4.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="13.5" cy="3.75" r="2.25" fill="currentColor" />
      <circle cx="4.5" cy="9" r="2.25" fill="currentColor" />
      <circle cx="13.5" cy="14.25" r="2.25" fill="currentColor" />
      <path d="m6.45 7.88 5.1-2.98M6.45 10.12l5.1 2.98" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  )
}

function WithdrawIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="3" y="3.75" width="12" height="11.25" rx="2" fill="currentColor" opacity=".9" />
      <path d="M9 12V6.75m0 0L6.75 9M9 6.75 11.25 9" stroke="#0c1311" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const metrics = [
  { label: 'AUM', value: '$125.00' },
  { label: 'ROI', value: '$1,250.00' },
  { label: 'Closed P&L', value: '$1,250.00' },
  { label: 'AUM', value: '$0.00' },
  { label: 'RETURN', value: '+0.00%', valueClassName: 'text-gfx-bullish-light' },
  { label: 'NET P&L', value: '$0.00' },
  { label: 'TO FLOOR', value: '$125.00' },
  { label: 'TRADING DAYS', value: '0/5' },
]

export default function ChallengeDetailsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const navigate = useNavigate()

  return (
    <div className="relative px-4 py-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen((previous) => !previous)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: '10x Challenges', href: '/challenges' },
          { label: 'View', current: true },
        ]}
      />

      <div className="mt-12 flex flex-col gap-4 3xl:mt-14">
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <button
              type="button"
              aria-label="Back to 10x Challenges"
              onClick={() => navigate('/challenges')}
              className="flex size-[2.375rem] shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-gfx-green-900 text-gfx-neutral-400 transition-colors hover:bg-gfx-green-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500"
            >
              <BackArrowIcon />
            </button>
            <h1 className="font-acid text-[2.5rem] font-normal leading-none text-white sm:text-[3.125rem]">L#795028</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="active">10X Challenge</Badge>
              <Badge variant="active">Tier 1</Badge>
              <span className="inline-flex h-7 items-center rounded-full bg-gfx-green-50 px-4 font-acid text-xs leading-[18.8px] text-gfx-bullish-light">+0.00%</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <button
              type="button"
              aria-label="Share challenge"
              className="flex size-[2.875rem] cursor-pointer items-center justify-center rounded-full border border-gfx-neutral-250 bg-gradient-to-t from-gfx-green-900 to-gfx-green-800 text-gfx-neutral-550 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500"
            >
              <ShareIcon />
            </button>
            <SecondaryButton className="w-[7.5rem]">Trade</SecondaryButton>
            <SecondaryButton className="w-[8.875rem]"><WithdrawIcon />Withdraw</SecondaryButton>
          </div>
        </div>

        <ChallengeDrawdownCard
          amount="$125.00"
          equity="$1,250.00"
          breachFloor="$1,125.00"
          bufferRemaining="100%"
          progress={20}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <ChallengeMetricCard
              key={`${metric.label}-${index}`}
              {...metric}
              glow={index % 3 === 0 ? 'right' : 'left'}
            />
          ))}
        </div>

        <ChallengePerformanceCard />
      </div>
    </div>
  )
}
