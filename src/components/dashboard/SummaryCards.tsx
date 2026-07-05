import { SummaryCard } from './SummaryCard'
import { LiveAccountsCard } from './LiveAccountsCard'
import { MiniBarChart } from '@/components/charts/MiniBarChart'
import { CandlestickChart } from '@/components/charts/CandlestickChart'
import { AreaChart } from '@/components/charts/AreaChart'
import { summaryCards } from '@/data/summary-cards'
import type { CandleData } from '@/data/summary-cards'

const glowColors = ['#104030', '#241B1C', '#281E14']

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 3xl:gap-6 4xl:gap-8 mb-4 4xl:mb-6">
      {summaryCards.slice(0, 3).map((card, i) => (
        <SummaryCard
          key={card.title}
          title={card.title}
          value={card.value}
          changeText={card.changeText}
          changeColor={card.changeColor}
          glowColor={glowColors[i]}
          chartClassName={
            card.title === 'Total Balance' ? 'bottom-3 right-3 h-1/2' :
            card.title === 'Total Equity' ? 'bottom-0 right-0 h-[85%]' :
            undefined
          }
        >
          {card.chartType === 'bar' && card.chartData && (
            <MiniBarChart data={card.chartData as number[]} />
          )}
          {card.chartType === 'candlestick' && card.chartData && (
            <CandlestickChart data={card.chartData as CandleData[]} />
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
