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

export function CandlestickChart({ data, className = 'h-14' }: CandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (!mounted || !canvasRef.current) return

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: data.map(() => ''),
          datasets: [{
            data: data.map(d => d.body),
            backgroundColor: data.map(d => d.bullish ? '#10BC83' : '#ff717e'),
            borderSkipped: false,
            barPercentage: 0.5,
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
  }, [data])

  return <div className={className}><canvas ref={canvasRef} className="w-full h-full" aria-label="Candlestick chart" role="img" /></div>
}
