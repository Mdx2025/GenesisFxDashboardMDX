import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { GlassCard, GlowEllipse } from '@/components/ui'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartSeriesConfig } from '@/components/ui/chart'

export interface AvgPnlByDayDatum {
  day: string
  profitable: number
  loss: number
}

const defaultData: AvgPnlByDayDatum[] = [
  { day: 'Sun', profitable: 2.15, loss: 3.05 },
  { day: 'Mon', profitable: 3.68, loss: 2.42 },
  { day: 'Tue', profitable: 2.45, loss: 3.38 },
  { day: 'Wed', profitable: 3.06, loss: 2.75 },
  { day: 'Thu', profitable: 3.55, loss: 1.92 },
  { day: 'Fri', profitable: 2.78, loss: 3.14 },
  { day: 'Sat', profitable: 3.62, loss: 2.68 },
]

const chartConfig = {
  profitable: { label: 'Profitable', color: '#00B38C' },
  loss: { label: 'Loss', color: '#D46356' },
} satisfies ChartSeriesConfig

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="#606060" strokeWidth="1.2" />
      <path d="M9 8V13" stroke="#606060" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="0.75" fill="#606060" />
    </svg>
  )
}

interface AvgPnlByDayChartProps {
  data?: AvgPnlByDayDatum[]
  title?: string
}

/** Average P&L per weekday, built on the shadcn interactive area chart. */
export function AvgPnlByDayChart({ data = defaultData, title = 'Avg P&L by Day of Week' }: AvgPnlByDayChartProps) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden h-full">
      <GlowEllipse className="-left-[5rem] -top-[3.75rem]" />
      <div className="relative p-7 h-full flex flex-col">
        <div className="mb-6 flex items-center gap-2">
          <h3 className="text-base font-acid font-medium text-white">{title}</h3>
          <InfoIcon />
        </div>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto w-full flex-1 min-h-[19.375rem]"
          role="img"
          aria-label="Average profit and loss per weekday, Sunday through Saturday"
        >
          <AreaChart accessibilityLayer data={data} margin={{ top: 8, left: 0, right: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="fillProfitable" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-profitable)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-profitable)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-loss)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-loss)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={56}
              tickFormatter={(value: number) => `$${value.toFixed(2)}`}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(label) => `${label}`}
                  valueFormatter={(value) => `$${value.toFixed(2)}`}
                />
              }
            />

            <Area
              dataKey="loss"
              type="linear"
              fill="url(#fillLoss)"
              fillOpacity={0.35}
              stroke="var(--color-loss)"
              strokeWidth={1.5}
              isAnimationActive={false}
            />
            <Area
              dataKey="profitable"
              type="linear"
              fill="url(#fillProfitable)"
              fillOpacity={0.35}
              stroke="var(--color-profitable)"
              strokeWidth={1.5}
              isAnimationActive={false}
            />

            <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />
          </AreaChart>
        </ChartContainer>
      </div>
    </GlassCard>
  )
}
