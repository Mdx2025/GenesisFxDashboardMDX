import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart'
import type { ChartSeriesConfig } from './chart'

const FILL_GRADIENT_ID = 'share-performance-fill'

const VALUES = [2.7, 0.7, 1.2, 0.6, 2.3, 1.0, 3.6, 2.7, 3.0, 0.9, 3.2, 1.9, 2.9, 4]

const chartData = VALUES.map((views, index) => ({
  day: String(Math.round((index / (VALUES.length - 1)) * 30)),
  views,
}))

const chartConfig = {
  views: { label: 'Views', color: '#00B38C' },
} satisfies ChartSeriesConfig

/** Public-share analytics preview, built on the shadcn linear area chart. */
export function SharePerformanceChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto size-full"
      data-share-performance-chart
      role="img"
      aria-label="Public account views for August, ranging from zero to four views per day"
    >
      <AreaChart accessibilityLayer data={chartData} margin={{ top: 20, left: 6, right: 18, bottom: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} minTickGap={12} />
        <YAxis
          dataKey="views"
          domain={[0, 4]}
          ticks={[0, 1, 2, 3, 4]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={28}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
        <defs>
          <linearGradient id={FILL_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-views)" stopOpacity={0.4} />
            <stop offset="55%" stopColor="var(--color-views)" stopOpacity={0.14} />
            <stop offset="100%" stopColor="var(--color-views)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          dataKey="views"
          type="linear"
          fill={`url(#${FILL_GRADIENT_ID})`}
          fillOpacity={1}
          stroke="var(--color-views)"
          strokeWidth={1.35}
        />
      </AreaChart>
    </ChartContainer>
  )
}
