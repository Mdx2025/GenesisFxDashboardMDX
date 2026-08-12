import { useEffect, useRef } from 'react'

const DEFAULT_HIGHLIGHT_INDEX = 15

const defaultWaveData = [
  120, 126, 138, 154, 182, 224, 276, 312, 286, 244,
  218, 198, 184, 188, 201, 208, 196, 181, 172, 184,
  216, 248, 255, 238, 220, 207, 198, 192, 204, 226,
  251, 264, 252, 232, 211, 198, 194,
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
  fillOpacity: 0.35,
  tension: 0,
  lineWidth: 2,
  glowIntensity: 6,
  highlightIndex: DEFAULT_HIGHLIGHT_INDEX,
  gridOpacity: 0.04,
  waveHeight: 0.85,
}

interface PortfolioChartProps {
  config?: ChartConfig
}

export function PortfolioChart({ config = defaultChartConfig }: PortfolioChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    let themeObserver: MutationObserver | undefined

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
      const getThemeColors = () => {
        const isLight = document.documentElement.dataset.theme === 'light'
        return {
          text: isLight ? '#000000' : 'rgba(236,236,236,0.55)',
          grid: isLight ? `rgba(0,0,0,${config.gridOpacity})` : `rgba(255,255,255,${config.gridOpacity})`,
          tooltipBackground: isLight ? 'rgba(255,255,255,0.96)' : 'rgba(10,15,13,0.9)',
          tooltipTitle: isLight ? '#000000' : '#A0A0A0',
        }
      }

      const canvasH = canvasRef.current.height
      const greenGradient = ctx.createLinearGradient(0, 0, 0, canvasH)
      const steps = 16
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const ease = 1 - t * t
        greenGradient.addColorStop(t, config.lineColor + hexOpacity(config.fillOpacity * ease))
      }

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
            { blur: config.glowIntensity * 3, opacity: '15', offsetY: 6 },
            { blur: config.glowIntensity * 2, opacity: '25', offsetY: 3 },
            { blur: config.glowIntensity, opacity: '50', offsetY: 1 },
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

      const areaGlowPlugin = {
        id: 'areaGlow',
        beforeDatasetsDraw(chart: any) {
          const meta = chart.getDatasetMeta(0)
          if (!meta.data?.length) return
          const c = chart.ctx
          const { chartArea } = chart
          const points = meta.data

          c.save()
          c.globalCompositeOperation = 'lighter'

          const peakY = Math.min(...points.map((p: any) => p.y))
          const centerX = chartArea.left + (chartArea.right - chartArea.left) / 2
          const centerY = peakY + (chartArea.bottom - peakY) * 0.4
          const radiusX = (chartArea.right - chartArea.left) * 0.55
          const radiusY = (chartArea.bottom - peakY) * 0.7

          c.save()
          c.translate(centerX, centerY)
          c.scale(radiusX / radiusY, 1)
          const radial = c.createRadialGradient(0, 0, 0, 0, 0, radiusY)
          radial.addColorStop(0, config.lineColor + '14')
          radial.addColorStop(0.4, config.lineColor + '0A')
          radial.addColorStop(1, config.lineColor + '00')
          c.fillStyle = radial
          c.beginPath()
          c.arc(0, 0, radiusY, 0, Math.PI * 2)
          c.fill()
          c.restore()

          c.restore()
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
            cubicInterpolationMode: 'default',
            borderJoinStyle: 'miter',
            borderCapStyle: 'butt',
            pointRadius: 0,
            pointHoverRadius: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? false
            : { duration: 450 },
          interaction: { mode: 'nearest', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: () => getThemeColors().tooltipBackground,
              titleColor: () => getThemeColors().tooltipTitle,
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
              grid: { color: () => getThemeColors().grid },
              ticks: {
                display: config.gridOpacity > 0,
                color: () => getThemeColors().text,
                font: { size: 12 },
                padding: 8,
                callback: (v: any) => `$${v}`,
              },
            },
          },
        },
        plugins: [areaGlowPlugin, neonGlowPlugin, highlightPlugin],
      })

      themeObserver = new MutationObserver(() => chartRef.current?.update('none'))
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    }

    init()
    return () => {
      mounted = false
      themeObserver?.disconnect()
      chartRef.current?.destroy()
    }
  }, [config])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="!absolute inset-0 w-full h-full"
        data-chart-text
        aria-label="Portfolio equity curve showing angular gains, drawdowns, and recoveries over the selected period"
        role="img"
      />
    </div>
  )
}

function hexOpacity(opacity: number): string {
  return Math.round(Math.min(1, Math.max(0, opacity)) * 255).toString(16).padStart(2, '0')
}
