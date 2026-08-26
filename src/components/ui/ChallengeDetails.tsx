import type { ReactNode } from 'react'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'
import { GlassCard } from './GlassCard'
import { PeriodPill } from './PeriodPill'

interface ChallengeDrawdownCardProps {
  amount: string
  equity: string
  breachFloor: string
  bufferRemaining: string
  progress?: number
}

/** Challenge drawdown summary from the GenesisFX challenge details pattern. */
export function ChallengeDrawdownCard({
  amount,
  equity,
  breachFloor,
  bufferRemaining,
  progress = 20,
}: ChallengeDrawdownCardProps) {
  const boundedProgress = Math.min(100, Math.max(0, progress))

  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="19px"
      className="challenge-drawdown-card min-h-[16.75rem] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-[8%] top-[-120%] size-[32rem] rounded-full bg-gfx-glow-green opacity-35 blur-[150px]" />
        <div className="absolute left-[21%] top-[-30%] h-[22rem] w-[36rem] opacity-25 [background-image:radial-gradient(circle,#10bc83_1px,transparent_1.4px)] [background-size:10px_10px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />
      </div>

      <div className="relative flex min-h-[16.75rem] flex-col justify-between px-5 py-7 sm:px-8 sm:py-10">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="font-acid text-xs font-bold uppercase leading-[15.68px] tracking-[2.323px] text-gfx-neutral-500">
              Drawdown to breach floor
            </p>
            <p className="mt-4 font-acid text-4xl font-normal leading-none text-white sm:text-[2.25rem]">
              {amount}<span className="ml-1.5 text-sm text-gfx-neutral-400">left</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-acid text-xs font-bold uppercase leading-[15.68px] tracking-[2.323px] text-gfx-neutral-500">
              Buffer remaining
            </p>
            <p className="mt-4 font-acid text-4xl font-normal leading-none text-gfx-bullish-light sm:text-[2.25rem]">
              {bufferRemaining}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="relative h-2.5 overflow-visible rounded-full bg-gfx-green-50">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#40c99c] via-[#10bc83] to-[#ecfff9] shadow-[0_0_14px_4px_rgba(207,242,230,0.58)]"
              style={{ width: `${boundedProgress}%` }}
            />
          </div>
          <div className="mt-5 flex items-center justify-between gap-6 font-acid text-sm leading-[18.8px] text-gfx-neutral-400">
            <span>Equity {equity}</span>
            <span className="text-right">Breach floor (10% DD) {breachFloor}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

interface ChallengeMetricCardProps {
  label: string
  value: string
  valueClassName?: string
  glow?: 'left' | 'right'
}

/** Compact 148px metric surface used by challenge details dashboards. */
export function ChallengeMetricCard({ label, value, valueClassName = 'text-white', glow = 'right' }: ChallengeMetricCardProps) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="min-h-[7.5rem] overflow-hidden sm:min-h-[9.25rem]">
      <div
        className={`pointer-events-none absolute top-[-4rem] h-[14rem] w-[16rem] rounded-full bg-gfx-glow-green opacity-50 blur-[95px] ${glow === 'right' ? '-right-[7rem]' : '-left-[7rem]'}`}
        aria-hidden="true"
      />
      <div className="relative flex min-h-[7.5rem] flex-col justify-center px-4 py-4 sm:min-h-[9.25rem] sm:px-6 sm:py-5">
        <p className="font-acid text-sm font-normal leading-[18.8px] text-gfx-neutral-500">{label}</p>
        <p className={`mt-2 font-acid text-2xl font-normal leading-none sm:text-4xl ${valueClassName}`}>{value}</p>
      </div>
    </GlassCard>
  )
}

interface ChallengePerformanceCardProps {
  title?: string
  actions?: ReactNode
}

/** Challenge performance panel using the design system's portfolio chart. */
export function ChallengePerformanceCard({ title = 'Performance Chart', actions }: ChallengePerformanceCardProps) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="min-h-[35rem] overflow-hidden xl:min-h-[40.75rem]">
      <div className="relative flex min-h-[35rem] flex-col px-5 py-7 sm:px-7 sm:py-9 xl:min-h-[40.75rem]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-acid text-2xl font-normal leading-none text-white">{title}</h2>
          {actions ?? <PeriodPill fillOnMobile />}
        </div>
        <div className="relative mt-7 h-[27rem] shrink-0 overflow-hidden xl:h-[32rem]">
          <PortfolioChart config={defaultChartConfig} />
        </div>
      </div>
    </GlassCard>
  )
}
