import { useEffect, useRef } from 'react'

interface MiniBarChartProps {
  data: number[]
  className?: string
}

export function MiniBarChart({ data, className = 'h-14' }: MiniBarChartProps) {
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
      gradient.addColorStop(0, '#064B34')
      gradient.addColorStop(1, '#10BC83')

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(() => ''),
          datasets: [{ data, backgroundColor: gradient, borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: false }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: {
            backgroundColor: '#1a1a1a', bodyColor: '#fff', displayColors: false,
            callbacks: { label: (ctx) => `$${(ctx.parsed.y ?? 0).toLocaleString()}` },
          }},
          scales: {
            x: { grid: { display: false }, ticks: { color: '#606060', font: { size: 9 } } },
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
