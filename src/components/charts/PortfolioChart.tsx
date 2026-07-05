import { useEffect, useRef } from 'react'

export function PortfolioChart() {
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
      gradient.addColorStop(0, 'rgba(16,188,131,0.25)')
      gradient.addColorStop(1, 'rgba(16,188,131,0)')

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [{
            data: [98, 110, 125, 150, 165, 180, 195, 202, 220, 240, 253, 305],
            fill: true,
            backgroundColor: gradient,
            borderColor: '#10BC83',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#10BC83',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: {
            backgroundColor: '#1a1a1a',
            titleColor: '#A0A0A0',
            bodyColor: '#fff',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: { label: (ctx) => `$${(ctx.parsed.y ?? 0).toFixed(2)}` },
          }},
          scales: {
            x: {
              border: { display: false },
              grid: { display: false },
              ticks: { display: false },
            },
            y: {
              border: { display: false },
              grid: { color: 'rgba(255,255,255,0.06)' },
              ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 10 }, padding: 8, callback: (v: any) => `$${v}` },
            },
          },
        },
      })
    }

    init()
    return () => { mounted = false; chartRef.current?.destroy() }
  }, [])

  return (
    <div className="relative flex-1 min-h-0 w-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
