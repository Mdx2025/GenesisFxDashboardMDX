import { GlassCard, PeriodPill } from '@/components/ui'
import { PortfolioChart } from '@/components/charts/PortfolioChart'

export function PortfolioEquity() {
  return (
    <GlassCard variant="heavy" divider="green" rounded="18px" className="h-full overflow-hidden">
      <div className="absolute w-[400px] h-[200px] -left-[120px] -top-[80px] rounded-full pointer-events-none" style={{ background: '#104030', filter: 'blur(120px)' }} aria-hidden="true" />
      <div className="absolute w-[300px] h-[150px] left-1/2 -translate-x-1/2 -bottom-[80px] rounded-full pointer-events-none" style={{ background: '#104030', filter: 'blur(100px)' }} aria-hidden="true" />
      <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-tab uppercase tracking-[2.32px] text-gfx-neutral-300 mb-2">PORTFOLIO EQUITY</h2>
            <div className="flex flex-row items-center gap-3">
              <p className="text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl text-white">$17,897.30</p>
              <p className="text-sm 3xl:text-base 4xl:text-lg text-gfx-green-500">+$6,437.21 (56.1%)</p>
            </div>
          </div>
          <PeriodPill />
        </div>
        <PortfolioChart />
      </div>
    </GlassCard>
  )
}
