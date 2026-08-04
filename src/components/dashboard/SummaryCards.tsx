import { SummaryCard } from './SummaryCard'
import { LiveAccountsCard } from './LiveAccountsCard'
import { MiniBarChart } from '@/components/charts/MiniBarChart'
import { CandlestickChart } from '@/components/charts/CandlestickChart'
import { AreaChart } from '@/components/charts/AreaChart'
import { summaryCards } from '@/data/summary-cards'
import type { CandleData } from '@/data/summary-cards'

import { GLOW_COLORS } from '@/constants/colors'

export function SummaryCards() {
  return (
    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 3xl:gap-6 4xl:gap-8">
      {summaryCards.slice(0, 3).map((card, i) => (
        <SummaryCard
          key={card.title}
          title={card.title}
          value={card.value}
          changeText={card.changeText}
          changeColor={card.changeColor}
          glowColor={GLOW_COLORS[i]}
          chartClassName={
            card.title === 'Total Balance' ? '!h-auto !w-[min(181px,58%)] aspect-[181/89]' :
            card.title === 'Total Equity' ? '!h-auto !w-[min(181px,58%)] aspect-[181/80]' :
            card.title === 'Closed P&L (30D)' ? '!bottom-0 !right-0' :
            undefined
          }
        >
          {card.chartType === 'bar' && card.chartData && (
            <MiniBarChart data={card.chartData as number[]} />
          )}
          {card.chartType === 'candlestick' && card.chartData && (
            <CandlestickChart
              data={card.chartData as CandleData[]}
              ariaLabel="Total equity candlestick chart with eight green and red candles matching the supplied market pattern"
            />
          )}
          {card.chartType === 'area' && (
            <AreaChart color={card.changeColor === 'amber' ? '#e29d58' : '#10BC83'} />
          )}
        </SummaryCard>
      ))}
      <LiveAccountsCard />
    </div>
  )
}
