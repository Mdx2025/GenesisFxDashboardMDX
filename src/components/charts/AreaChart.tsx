import { useEffect, useRef } from 'react'

const defaultData = [10, 15, 12, 25, 22, 35, 50]

interface AreaChartProps {
  color?: string
  className?: string
  data?: number[]
  /** Index of the point rendered with a visible dot. Defaults to the 5th point of the default series. */
  highlightIndex?: number
}

export function AreaChart({ color = '#10BC83', className = 'h-full', data = defaultData, highlightIndex = data === defaultData ? 4 : -1 }: AreaChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)
  const series = data.join(',')

  useEffect(() => {
    let mounted = true
    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (!mounted || !canvasRef.current) return

      const values = series.split(',').map(Number)

      const ctx = canvasRef.current.getContext('2d')!
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.current.height)
      gradient.addColorStop(0, color + '4D')
      gradient.addColorStop(1, color + '00')

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: values.map(() => ''),
          datasets: [{
            data: values,
            fill: true, backgroundColor: gradient,
            borderColor: color, borderWidth: 1.5, tension: 0.4,
            pointRadius: values.map((_, i) => (i === highlightIndex ? 4 : 0)),
            pointBackgroundColor: color,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: { x: { display: false }, y: { display: false } },
        },
      })
    }
    init()
    return () => { mounted = false; chartRef.current?.destroy() }
  }, [color, series, highlightIndex])

  return <div className={className}><canvas ref={canvasRef} className="w-full h-full" aria-label="Trend chart" role="img" /></div>
}
