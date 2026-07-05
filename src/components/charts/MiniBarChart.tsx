import { useEffect, useRef } from 'react'

interface MiniBarChartProps {
  data: number[]
  className?: string
}

export function MiniBarChart({ data, className = 'h-full' }: MiniBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (!mounted || !canvasRef.current) return

      const ctx = canvasRef.current.getContext('2d')!
      const gradient = ctx.createLinearGradient(0, canvasRef.current.height, 0, 0)
      gradient.addColorStop(0, '#0D271F')
      gradient.addColorStop(1, '#10BC83')

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'].slice(0, data.length),
          datasets: [{ data, backgroundColor: gradient, borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: false }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: {
            backgroundColor: '#1a1a1a', bodyColor: '#fff', displayColors: false,
            callbacks: { label: (ctx) => `$${(ctx.parsed.y ?? 0).toLocaleString()}` },
          }},
          scales: {
            x: { grid: { display: false }, border: { display: false }, ticks: { color: 'rgba(255,255,255,1)', font: { size: 12 }, padding: 2 } },
            y: { display: false },
          },
        },
      })
    }
    init()
    return () => { mounted = false; chartRef.current?.destroy() }
  }, [data])

  return <div className={className}><canvas ref={canvasRef} className="w-full h-full" aria-label="Bar chart" role="img" /></div>
}
