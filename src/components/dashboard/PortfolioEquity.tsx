import { GlassCard, PeriodPill } from '@/components/ui'
import { GLOW_GREEN } from '@/constants/colors'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'

export function PortfolioEquity() {
  return (
    <GlassCard variant="heavy" divider="none" rounded="18px" className="h-full min-h-[320px] sm:min-h-[400px] overflow-hidden">
      <div className="absolute w-[400px] h-[200px] -left-[120px] -top-[80px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
      <div className="absolute w-[300px] h-[150px] left-1/2 -translate-x-1/2 -bottom-[80px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-100)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-tab uppercase tracking-tab text-gfx-neutral-300 mb-2">PORTFOLIO EQUITY</h2>
            <div className="flex flex-row items-center gap-3">
              <p className="text-white text-card-value">$17,897.30</p>
              <p className="text-sm 3xl:text-base 4xl:text-lg text-gfx-green-500">+$6,437.21 (56.1%)</p>
            </div>
          </div>
          <PeriodPill />
        </div>
        <div className="flex-1 min-h-0">
          <PortfolioChart config={defaultChartConfig} />
        </div>
      </div>
    </GlassCard>
  )
}
