interface CandleData {
  wickTop: number
  body: number
  wickBottom: number
  bullish: boolean
}

interface CandlestickChartProps {
  data: CandleData[]
  className?: string
}

interface NormalizedCandle {
  x: number
  wickTop: number
  wickBottom: number
  bodyTop: number
  bodyBottom: number
  bullish: boolean
}

const CHART_WIDTH = 240
const CHART_HEIGHT = 118
const CANDLE_WIDTH = 13
const BODY_RADIUS = 4

function normalizeCandles(data: CandleData[]): NormalizedCandle[] {
  const source = data.length ? data : []
  const max = Math.max(...source.flatMap((c) => [c.wickTop, c.body, c.wickBottom]), 100)
  const min = Math.min(...source.flatMap((c) => [c.wickTop, c.body, c.wickBottom]), 0)
  const range = Math.max(max - min, 1)
  const topPad = 10
  const bottomPad = 12
  const usable = CHART_HEIGHT - topPad - bottomPad

  const y = (value: number) => topPad + ((max - value) / range) * usable
  const step = source.length > 1 ? CHART_WIDTH / (source.length + 0.8) : CHART_WIDTH / 2

  return source.map((candle, index) => {
    const x = step * (index + 0.7)
    const bodyHalf = Math.max(8, candle.body / max * 24)
    const center = y((candle.wickTop + candle.wickBottom) / 2)
    const bodyTop = Math.max(topPad, center - bodyHalf)
    const bodyBottom = Math.min(CHART_HEIGHT - bottomPad, center + bodyHalf)

    return {
      x,
      wickTop: y(candle.wickTop),
      wickBottom: y(candle.wickBottom),
      bodyTop,
      bodyBottom,
      bullish: candle.bullish,
    }
  })
}

export function CandlestickChart({ data, className = 'h-full' }: CandlestickChartProps) {
  const candles = normalizeCandles(data)

  return (
    <div className={`${className} flex items-end justify-end`}>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Candlestick chart"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="candlestick-green-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.063 0 0 0 0 0.737 0 0 0 0 0.514 0 0 0 0.9 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="candlestick-red-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 1 0 0 0 0 0.306 0 0 0 0 0.357 0 0 0 0.9 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {candles.map((candle, index) => {
          const color = candle.bullish ? '#10BC83' : '#FF4E5B'
          const bodyHeight = candle.bodyBottom - candle.bodyTop
          const filter = candle.bullish ? 'url(#candlestick-green-glow)' : 'url(#candlestick-red-glow)'

          return (
            <g key={`${candle.x}-${index}`} filter={filter}>
              <line
                x1={candle.x}
                x2={candle.x}
                y1={candle.wickTop}
                y2={candle.wickBottom}
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <rect
                x={candle.x - CANDLE_WIDTH / 2}
                y={candle.bodyTop}
                width={CANDLE_WIDTH}
                height={bodyHeight}
                rx={BODY_RADIUS}
                fill={color}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
