import { Area, AreaChart, CartesianGrid, ReferenceDot, ReferenceLine, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartSeriesConfig } from '@/components/ui/chart'

const DEFAULT_HIGHLIGHT_INDEX = 15

const defaultWaveData = [
  120, 126, 138, 154, 182, 224, 276, 312, 286, 244,
  218, 198, 184, 188, 201, 208, 196, 181, 172, 184,
  216, 248, 255, 238, 220, 207, 198, 192, 204, 226,
  251, 264, 252, 232, 211, 198, 194,
]

export interface ChartConfig {
  data: number[]
  lineColor: string
  fillOpacity: number
  tension: number
  lineWidth: number
  glowIntensity: number
  highlightIndex: number
  gridOpacity: number
  waveHeight: number
}

export const defaultChartConfig: ChartConfig = {
  data: defaultWaveData,
  lineColor: '#00f0a0',
  fillOpacity: 0.35,
  tension: 0,
  lineWidth: 2,
  glowIntensity: 6,
  highlightIndex: DEFAULT_HIGHLIGHT_INDEX,
  gridOpacity: 0.04,
  waveHeight: 0.85,
}

interface PortfolioChartProps {
  config?: ChartConfig
}

/** Portfolio equity curve, built on the shadcn linear area chart. */
export function PortfolioChart({ config = defaultChartConfig }: PortfolioChartProps) {
  const chartConfig = {
    equity: { label: 'Equity', color: config.lineColor },
  } satisfies ChartSeriesConfig

  const chartData = config.data.map((equity, index) => ({ index, equity }))

  const dataMin = Math.min(...config.data)
  const dataMax = Math.max(...config.data)
  const padding = (dataMax - dataMin || 1) * ((1 - config.waveHeight) * 3)

  const highlight =
    config.highlightIndex >= 0 && config.highlightIndex < config.data.length
      ? { x: config.highlightIndex, y: config.data[config.highlightIndex] }
      : null

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto size-full"
      data-chart-text
      style={{ filter: `drop-shadow(0 0 ${config.glowIntensity}px ${config.lineColor}55)` }}
      role="img"
      aria-label="Portfolio equity curve showing gains, drawdowns, and recoveries over the selected period"
    >
      <AreaChart accessibilityLayer data={chartData} margin={{ top: 12, left: 6, right: 12, bottom: 4 }}>
        <CartesianGrid vertical={false} strokeOpacity={config.gridOpacity > 0 ? 1 : 0} />
        <XAxis dataKey="index" hide />
        <YAxis
          dataKey="equity"
          domain={[dataMin - padding, dataMax + padding]}
          hide={config.gridOpacity <= 0}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={52}
          tickFormatter={(value: number) => `$${Math.round(value)}`}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dot"
              hideLabel
              valueFormatter={(value) => `$${(value * 70).toFixed(2)}`}
            />
          }
        />

        {highlight && (
          <ReferenceLine
            x={highlight.x}
            stroke="var(--color-equity)"
            strokeOpacity={0.3}
            strokeDasharray="4 4"
          />
        )}

        <Area
          dataKey="equity"
          type={config.tension > 0 ? 'monotone' : 'linear'}
          fill="var(--color-equity)"
          fillOpacity={config.fillOpacity}
          stroke="var(--color-equity)"
          strokeWidth={config.lineWidth}
          isAnimationActive={false}
        />

        {highlight && (
          <ReferenceDot
            x={highlight.x}
            y={highlight.y}
            r={4}
            fill="var(--color-equity)"
            stroke="var(--color-equity)"
            strokeOpacity={0.35}
            strokeWidth={8}
          />
        )}
      </AreaChart>
    </ChartContainer>
  )
}
