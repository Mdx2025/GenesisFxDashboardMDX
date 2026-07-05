import { useEffect, useRef } from 'react'

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

export function CandlestickChart({ data, className = 'h-full' }: CandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (!mounted || !canvasRef.current) return

      const max = Math.max(...data.flatMap((c) => [c.wickTop, c.body, c.wickBottom]))
      const min = Math.min(...data.flatMap((c) => [c.wickTop, c.body, c.wickBottom]))

      const bodies = data.map((c) => {
        const center = (c.wickTop + c.wickBottom) / 2
        const halfSpread = Math.max(c.body * 0.35, 6)
        const lo = c.bullish ? center - halfSpread : center - halfSpread * 0.8
        const hi = c.bullish ? center + halfSpread * 0.8 : center + halfSpread
        return [lo, hi] as [number, number]
      })

      const colors = data.map((c) => (c.bullish ? '#00FF00' : '#FF0000'))

      const wickPlugin = {
        id: 'candlestickWicks',
        afterDatasetDraw(chart: any) {
          const { ctx } = chart
          const meta = chart.getDatasetMeta(0)
          meta.data.forEach((bar: any, i: number) => {
            const x = bar.x
            const yScale = chart.scales.y
            const wickHi = yScale.getPixelForValue(data[i].wickTop)
            const wickLo = yScale.getPixelForValue(data[i].wickBottom)
            const color = colors[i]

            ctx.save()
            ctx.shadowColor = color
            ctx.shadowBlur = 12
            ctx.strokeStyle = color
            ctx.lineWidth = 2.5
            ctx.lineCap = 'round'
            ctx.globalAlpha = 0.9
            ctx.beginPath()
            ctx.moveTo(x, wickHi)
            ctx.lineTo(x, wickLo)
            ctx.stroke()
            ctx.restore()
          })
        },
      }

      const glowPlugin = {
        id: 'candlestickGlow',
        beforeDatasetDraw(chart: any) {
          const { ctx } = chart
          const meta = chart.getDatasetMeta(0)
          meta.data.forEach((bar: any, i: number) => {
            ctx.save()
            ctx.shadowColor = colors[i]
            ctx.shadowBlur = 12
            ctx.restore()
          })
        },
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: data.map((_, i) => String(i)),
          datasets: [{
            data: bodies,
            backgroundColor: colors,
            borderRadius: 4,
            borderSkipped: false,
            barPercentage: 0.55,
            categoryPercentage: 0.8,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: {
            x: { display: false },
            y: { display: false, min: min - 5, max: max + 5 },
          },
        },
        plugins: [wickPlugin, glowPlugin],
      })
    }
    init()
    return () => { mounted = false; chartRef.current?.destroy() }
  }, [data])

  return (
    <div className={`${className} flex items-end justify-end`}>
      <canvas ref={canvasRef} className="w-full h-full" aria-label="Candlestick chart" role="img" />
    </div>
  )
}
