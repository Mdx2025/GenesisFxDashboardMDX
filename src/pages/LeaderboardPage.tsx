import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, LeaderboardPodium, LeaderboardTable, LeaderboardTabs } from '@/components/ui'

const STATES = [
  {
    title: 'Top Traders–Monthly ROI',
    note: 'Ranked by ROI%. Minimum 5 closed trades',
    metricLabel: 'MONTH ROI',
    metricValue: '+243.20%',
    challenge: false,
  },
  {
    title: 'Most Profitable — Monthly P/L',
    note: 'Ranked by net profit ($) across TradeLocker accounts.',
    metricLabel: 'MONTH P/L',
    metricValue: '+$26,327.40',
    challenge: false,
  },
  {
    title: '10X Challenge - Leaderboard',
    note: 'Top 25 challenge accounts ranked by return %.',
    metricLabel: 'RETURN%',
    metricValue: '+219.50%',
    challenge: true,
  },
  {
    title: 'Top Demo Traders - Monthly ROI',
    note: 'Demo TradeLocker accounts ranked by ROI %. Minimum 5 closed trades.',
    metricLabel: 'MONTH ROI',
    metricValue: '+243.20%',
    challenge: false,
  },
] as const

function WarningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M8.999 2.25 16 14.625H2L8.999 2.25Z" fill="#F4AD00" />
      <path d="M9 6.5v4" stroke="#201700" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="12.7" r=".75" fill="#201700" />
    </svg>
  )
}

export default function LeaderboardPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeIndex, setActiveIndex] = useState(0)
  const state = STATES[activeIndex]

  return (
    <div className="relative px-4 py-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 4xl:py-6" data-leaderboard-page data-leaderboard-state={activeIndex}>
      <TopBar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[{ label: 'GenSocial', href: '/home' }, { label: 'Leaderboards', current: true }]}
      />

      <main className="mx-auto pb-20 pt-10 sm:pt-14">
        <header className="text-center">
          <h1 className="text-h1 font-normal text-white">Leaderboard</h1>
          <div className="mt-8 flex justify-center px-1">
            <LeaderboardTabs activeIndex={activeIndex} onChange={setActiveIndex} className="max-w-full overflow-x-auto" />
          </div>
        </header>

        <section className="mx-auto mt-[54px] max-w-[1041px]" aria-labelledby="leaderboard-section-title">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-gfx-neutral-350 px-3 py-1.5 text-xs leading-none text-white">August 2026</span>
              <h2 id="leaderboard-section-title" className="mt-3 text-2xl font-normal leading-none text-white">{state.title}</h2>
            </div>
            <p className="flex self-start items-center gap-2 rounded-full border border-gfx-neutral-350 px-4 py-2 text-sm leading-none text-gfx-neutral-400 sm:self-auto">
              <span className="size-1.5 shrink-0 rounded-full bg-gfx-green-300" aria-hidden="true" />
              <span>{state.note}</span>
            </p>
          </div>

          {!state.challenge && <LeaderboardPodium />}
          <div className={state.challenge ? '' : 'mt-6'}>
            <LeaderboardTable
              variant={state.challenge ? 'challenge' : 'standard'}
              metricLabel={state.metricLabel}
              metricValue={state.metricValue}
            />
          </div>

          {!state.challenge && (
            <GlassCard divider="none" glow={false} rounded="18.563px" className="surface-raised surface-raised-border mt-6 flex min-h-[115px] items-center gap-5 border-[1.16px] px-8 py-6" data-leaderboard-disclaimer>
              <span className="shrink-0"><WarningIcon /></span>
              <p className="text-sm leading-[18.8px] text-gfx-neutral-400">
                <strong className="font-medium text-white">Disclaimer:</strong> Rankings update periodically and reflect live trading performance. Prizes are illustrative and awarded at the broker&apos;s discretion. Past performance doesn&apos;t guarantee future results.
              </p>
            </GlassCard>
          )}
        </section>
      </main>
    </div>
  )
}
