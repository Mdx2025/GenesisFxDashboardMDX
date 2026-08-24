import { createContext, useContext, useId, useMemo } from 'react'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { ResponsiveContainer, Tooltip } from 'recharts'

export type ChartSeriesConfig = {
  [key: string]: {
    label?: ReactNode
    color?: string
  }
}

type ChartContextValue = { config: ChartSeriesConfig }

const ChartContext = createContext<ChartContextValue | null>(null)

function useChart() {
  const context = useContext(ChartContext)
  if (!context) throw new Error('useChart must be used within a <ChartContainer />')
  return context
}

interface ChartContainerProps extends ComponentProps<'div'> {
  config: ChartSeriesConfig
  children: ComponentProps<typeof ResponsiveContainer>['children']
}

/** shadcn-style chart shell: scopes `--color-<key>` vars and owns the responsive box. */
export function ChartContainer({ id, className = '', children, config, style, ...props }: ChartContainerProps) {
  const uniqueId = useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {}
    for (const [key, item] of Object.entries(config)) {
      if (item.color) vars[`--color-${key}`] = item.color
    }
    return vars as CSSProperties
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        data-slot="chart"
        className={`flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-gfx-neutral-300 [&_.recharts-cartesian-grid_line]:stroke-current [&_.recharts-cartesian-grid_line]:opacity-10 [&_.recharts-surface]:outline-none ${className}`}
        style={{ ...cssVars, ...style }}
        {...props}
      >
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

export const ChartTooltip = Tooltip

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: any
  indicator?: 'dot' | 'line'
  hideLabel?: boolean
  labelFormatter?: (label: any) => ReactNode
  valueFormatter?: (value: number, key: string) => ReactNode
}

/** shadcn-style tooltip body, restyled onto the GenesisFX glass tokens. */
export function ChartTooltipContent({
  active,
  payload,
  label,
  indicator = 'dot',
  hideLabel = false,
  labelFormatter,
  valueFormatter,
}: ChartTooltipContentProps) {
  const { config } = useChart()

  if (!active || !payload?.length) return null

  return (
    <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-white/10 bg-gfx-surface-raised/95 px-2.5 py-1.5 text-xs shadow-xl [backdrop-filter:blur(12px)]">
      {!hideLabel && (
        <div data-chart-text className="font-medium text-gfx-neutral-300">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = String(item.dataKey ?? item.name ?? index)
          const color = item.color || `var(--color-${key})`
          return (
            <div key={key} className="flex w-full items-center gap-2">
              <span
                className={indicator === 'dot' ? 'size-2.5 shrink-0 rounded-[2px]' : 'h-0.5 w-2.5 shrink-0 rounded-[2px]'}
                style={{ backgroundColor: color }}
              />
              <span data-chart-text className="flex-1 text-gfx-neutral-300">
                {config[key]?.label ?? item.name}
              </span>
              <span className="font-mono font-medium tabular-nums" style={{ color }}>
                {valueFormatter ? valueFormatter(item.value, key) : item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
