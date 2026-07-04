import { useEffect, useRef } from 'react'

interface AreaChartProps {
  color?: string
  className?: string
}

export function AreaChart({ color = '#10BC83', className = 'h-14' }: AreaChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (!mounted || !canvasRef.current) return

      const ctx = canvasRef.current.getContext('2d')!
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.current.height)
      gradient.addColorStop(0, color + '4D')
      gradient.addColorStop(1, color + '00')

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', ''],
          datasets: [{
            data: [10, 15, 12, 25, 22, 35, 50],
            fill: true, backgroundColor: gradient,
            borderColor: color, borderWidth: 1.5, tension: 0.4,
            pointRadius: [0, 0, 0, 0, 4, 0, 0],
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
  }, [color])

  return <div className={className}><canvas ref={canvasRef} className="w-full h-full" /></div>
}
