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
    let themeObserver: MutationObserver | undefined
    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (!mounted || !canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')!

      const getLabelColor = () => getComputedStyle(canvas).color
      const createBarGradient = (top: number, bottom: number) => {
        const gradient = ctx.createLinearGradient(0, top, 0, bottom)
        gradient.addColorStop(0, '#00B38C')
        gradient.addColorStop(0.18, '#00A37D')
        gradient.addColorStop(0.58, '#064B34')
        gradient.addColorStop(1, '#0C1311')
        return gradient
      }
      const monthLabelsPlugin = {
        id: 'mini-bar-month-labels',
        afterDraw: (chart: any) => {
          const labels = chart.data.labels ?? []
          const bars = chart.getDatasetMeta(0).data

          chart.ctx.save()
          chart.ctx.fillStyle = getLabelColor()
          chart.ctx.font = '600 12px "Acid Grotesk", Arial, sans-serif'
          chart.ctx.textAlign = 'center'
          chart.ctx.textBaseline = 'bottom'
          labels.forEach((label: string, index: number) => {
            if (bars[index]) chart.ctx.fillText(label, bars[index].x, chart.height)
          })
          chart.ctx.restore()
        },
      }

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        plugins: [monthLabelsPlugin],
        data: {
          labels: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'].slice(0, data.length),
          datasets: [{
            data,
            backgroundColor: ({ chart }) => {
              const { chartArea } = chart
              if (!chartArea) return '#00B38C'
              return createBarGradient(chartArea.top, chartArea.bottom)
            },
            borderRadius: { topLeft: 7, topRight: 7, bottomLeft: 0, bottomRight: 0 },
            borderSkipped: false,
            barPercentage: 0.68,
            categoryPercentage: 1,
            maxBarThickness: 20,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          layout: { padding: { top: 0, right: 0, bottom: 23, left: 0 } },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
          scales: {
            x: {
              display: false,
              offset: true,
              grid: { display: false },
              border: { display: false },
            },
            y: {
              display: false,
              beginAtZero: true,
              min: 0,
              max: 100,
            },
          },
        },
      })

      themeObserver = new MutationObserver(() => {
        if (!chartRef.current) return
        chartRef.current.update('none')
      })
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    }
    init()
    return () => {
      mounted = false
      themeObserver?.disconnect()
      chartRef.current?.destroy()
    }
  }, [data])

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none h-full w-full text-[#ECECEC]"
        aria-label="Total balance from June to November: June 42, July 64, August 100, September 27, October 74, November 9"
        role="img"
      />
    </div>
  )
}
