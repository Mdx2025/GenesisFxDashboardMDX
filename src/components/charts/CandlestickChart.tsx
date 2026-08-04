import { useEffect, useRef } from 'react'

interface CandleData {
  x?: number
  wickTop: number
  body?: number
  bodyTop?: number
  bodyBottom?: number
  bodyWidth?: number
  wickBottom: number
  bullish: boolean
}

interface CandlestickChartProps {
  data: CandleData[]
  className?: string
  ariaLabel?: string
}

export function CandlestickChart({ data, className = 'h-full', ariaLabel = 'Candlestick chart' }: CandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (!mounted || !canvasRef.current) return

      const usesReferenceGeometry = data.every(
        (c) => c.bodyTop !== undefined && c.bodyBottom !== undefined,
      )
      const values = data.flatMap((c) => [c.wickTop, c.body ?? 0, c.wickBottom])
      const max = Math.max(...values)
      const min = Math.min(...values)
      const range = Math.max(max - min, 1)

      const candlestickPlugin = {
        id: 'referenceCandlesticks',
        afterDraw(chart: any) {
          const { ctx, width, height } = chart
          const scaleX = width / 181
          const scaleY = height / 80
          const radius = 4 * Math.min(scaleX, scaleY)
          const valueToY = (value: number) => ((max - value) / range) * height

          data.forEach((candle, index) => {
            const x = usesReferenceGeometry && candle.x !== undefined
              ? candle.x * scaleX
              : ((index + 0.5) / data.length) * width
            const bodyWidth = (candle.bodyWidth ?? 8) * scaleX
            const wickTop = usesReferenceGeometry ? candle.wickTop * scaleY : valueToY(candle.wickTop)
            const wickBottom = usesReferenceGeometry ? candle.wickBottom * scaleY : valueToY(candle.wickBottom)

            let bodyTop: number
            let bodyBottom: number
            if (usesReferenceGeometry) {
              bodyTop = (candle.bodyTop ?? candle.wickTop) * scaleY
              bodyBottom = (candle.bodyBottom ?? candle.wickBottom) * scaleY
            } else {
              const center = (candle.wickTop + candle.wickBottom) / 2
              const halfSpread = Math.max((candle.body ?? 6) * 0.35, 6)
              const high = candle.bullish ? center + halfSpread * 0.8 : center + halfSpread
              const low = candle.bullish ? center - halfSpread : center - halfSpread * 0.8
              bodyTop = valueToY(high)
              bodyBottom = valueToY(low)
            }

            const fill = candle.bullish ? '#37C92E' : '#D46356'
            const glow = candle.bullish ? '#00FF00' : '#FF0000'

            ctx.save()
            ctx.shadowColor = glow
            ctx.shadowBlur = 7 * Math.min(scaleX, scaleY)
            ctx.strokeStyle = glow
            ctx.lineWidth = Math.max(1, scaleX)
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(x, wickTop)
            ctx.lineTo(x, wickBottom)
            ctx.stroke()

            ctx.fillStyle = fill
            ctx.beginPath()
            ctx.roundRect(
              x - bodyWidth / 2,
              bodyTop,
              bodyWidth,
              Math.max(bodyBottom - bodyTop, 2 * scaleY),
              radius,
            )
            ctx.fill()
            ctx.restore()
          })
        },
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: data.map((_, i) => String(i)),
          datasets: [{
            data: data.map(() => 0),
            backgroundColor: 'transparent',
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          events: [],
          layout: { padding: 0 },
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: {
            x: { display: false, offset: false },
            y: { display: false },
          },
        },
        plugins: [candlestickPlugin],
      })
    }
    init()
    return () => { mounted = false; chartRef.current?.destroy() }
  }, [data])

  return (
    <div className={`${className} flex items-end justify-end`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none h-full w-full"
        aria-label={ariaLabel}
        role="img"
      />
    </div>
  )
}
