import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartSeriesConfig } from '@/components/ui/chart'

export interface PriceChangeDatum {
  period: string
  pips: number
}

const BULLISH = '#00B38C'
const BEARISH = '#D46356'

const chartConfig = {
  pips: { label: 'Change' },
} satisfies ChartSeriesConfig

interface PriceChangeBarChartProps {
  data: PriceChangeDatum[]
  className?: string
  ariaLabel?: string
}

/** Per-bar price change, built on the shadcn negative bar chart. */
export function PriceChangeBarChart({
  data,
  className = 'aspect-auto h-full w-full',
  ariaLabel = 'Price change per period',
}: PriceChangeBarChartProps) {
  return (
    <ChartContainer config={chartConfig} className={className} role="img" aria-label={ariaLabel}>
      <BarChart accessibilityLayer data={data} margin={{ top: 16, left: 0, right: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              valueFormatter={(value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)} pips`}
            />
          }
        />
        <Bar dataKey="pips" radius={4} isAnimationActive={false}>
          <LabelList position="top" dataKey="period" fill="#808080" fontSize={12} fillOpacity={1} />
          {data.map((item) => (
            <Cell key={item.period} fill={item.pips > 0 ? BULLISH : BEARISH} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
