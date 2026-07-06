import { useEffect, useRef } from 'react'

const DEFAULT_HIGHLIGHT_INDEX = 15

const defaultWaveData = [
  120, 125, 135, 160, 210, 280, 310, 295, 240, 200,
  185, 190, 205, 195, 180, 175, 185, 220, 250, 235,
  215, 200, 195, 210, 240, 260, 245, 220, 200, 195,
]

export interface ChartConfig {
  data: number[]
  lineColor: string
  fillOpacity: number
  tension: number
  lineWidth: number
  glowIntensity: number
  highlightIndex: number
  gridOpacity: number
  waveHeight: number
}

export const defaultChartConfig: ChartConfig = {
  data: defaultWaveData,
  lineColor: '#00f0a0',
  fillOpacity: 0.28,
  tension: 0.45,
  lineWidth: 2,
  glowIntensity: 8,
  highlightIndex: DEFAULT_HIGHLIGHT_INDEX,
  gridOpacity: 0.04,
  waveHeight: 0.6,
}

interface PortfolioChartProps {
  config?: ChartConfig
}

export function PortfolioChart({ config = defaultChartConfig }: PortfolioChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      if (!mounted || !canvasRef.current) return

      const dataMin = Math.min(...config.data)
      const dataMax = Math.max(...config.data)
      const dataRange = dataMax - dataMin || 1
      const padding = dataRange * ((1 - config.waveHeight) * 3)
      const yMin = dataMin - padding
      const yMax = dataMax + padding

      const ctx = canvasRef.current.getContext('2d')!

      const greenGradient = ctx.createLinearGradient(0, 0, 0, canvasRef.current.height)
      greenGradient.addColorStop(0, config.lineColor + hexOpacity(config.fillOpacity))
      greenGradient.addColorStop(0.6, config.lineColor + hexOpacity(config.fillOpacity * 0.28))
      greenGradient.addColorStop(1, config.lineColor + '00')

      const highlightPlugin = {
        id: 'highlightPoint',
        afterDatasetsDraw(chart: any) {
          const meta = chart.getDatasetMeta(0)
          if (config.highlightIndex < 0 || !meta.data[config.highlightIndex]) return
          const point = meta.data[config.highlightIndex]
          const { ctx: c, chartArea } = chart

          c.save()

          c.setLineDash([4, 4])
          c.strokeStyle = config.lineColor + '4D'
          c.lineWidth = 1
          c.beginPath()
          c.moveTo(point.x, point.y)
          c.lineTo(point.x, chartArea.bottom)
          c.stroke()

          c.setLineDash([])

          c.fillStyle = 'rgba(4, 11, 9, 0.85)'
          c.beginPath()
          c.arc(point.x, point.y, 12, 0, Math.PI * 2)
          c.fill()

          c.strokeStyle = config.lineColor + '59'
          c.lineWidth = 1.5
          c.beginPath()
          c.arc(point.x, point.y, 12, 0, Math.PI * 2)
          c.stroke()

          c.fillStyle = config.lineColor
          c.shadowColor = config.lineColor
          c.shadowBlur = 8
          c.beginPath()
          c.arc(point.x, point.y, 4, 0, Math.PI * 2)
          c.fill()
          c.shadowBlur = 0

          c.restore()
        },
      }

      const neonGlowPlugin = {
        id: 'neonGlow',
        afterDatasetsDraw(chart: any) {
          const meta = chart.getDatasetMeta(0)
          if (!meta.dataset) return
          const c = chart.ctx
          const passes = [
            { blur: config.glowIntensity * 4, opacity: '25', offsetY: 12 },
            { blur: config.glowIntensity * 2.5, opacity: '40', offsetY: 8 },
            { blur: config.glowIntensity * 1.5, opacity: '60', offsetY: 4 },
            { blur: config.glowIntensity, opacity: '90', offsetY: 2 },
          ]
          for (const pass of passes) {
            c.save()
            c.shadowColor = config.lineColor + pass.opacity
            c.shadowBlur = pass.blur
            c.shadowOffsetX = 0
            c.shadowOffsetY = pass.offsetY
            c.strokeStyle = config.lineColor + '40'
            c.lineWidth = config.lineWidth
            c.lineJoin = 'round'
            c.lineCap = 'round'
            meta.dataset.draw(c)
            c.restore()
          }
        },
      }

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: config.data.map(() => ''),
          datasets: [{
            data: config.data,
            fill: true,
            backgroundColor: greenGradient,
            borderColor: config.lineColor,
            borderWidth: config.lineWidth,
            tension: config.tension,
            pointRadius: 0,
            pointHoverRadius: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'nearest', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(10, 15, 13, 0.9)',
              titleColor: '#A0A0A0',
              bodyColor: config.lineColor,
              borderColor: config.lineColor + '33',
              borderWidth: 1,
              padding: 10,
              displayColors: false,
              callbacks: { label: (c) => `$${((c.parsed.y ?? 0) * 70).toFixed(2)}` },
            },
          },
          scales: {
            x: {
              border: { display: false },
              grid: { display: false },
              ticks: { display: false },
            },
            y: {
              suggestedMin: yMin,
              suggestedMax: yMax,
              border: { display: false },
              grid: { color: `rgba(255,255,255,${config.gridOpacity})` },
              ticks: {
                display: config.gridOpacity > 0,
                color: 'rgba(255,255,255,0.25)',
                font: { size: 10 },
                padding: 8,
                callback: (v: any) => `$${v}`,
              },
            },
          },
        },
        plugins: [neonGlowPlugin, highlightPlugin],
      })
    }

    init()
    return () => { mounted = false; chartRef.current?.destroy() }
  }, [config])

  return (
    <div className="relative flex-1 min-h-0 w-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

function hexOpacity(opacity: number): string {
  return Math.round(Math.min(1, Math.max(0, opacity)) * 255).toString(16).padStart(2, '0')
}
