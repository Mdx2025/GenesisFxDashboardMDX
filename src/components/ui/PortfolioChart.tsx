const DEFAULT_SERIES = [150, 160, 145, 170, 190, 175, 200, 220, 210, 240, 260, 250, 280, 305, 290, 270, 260, 250, 240, 260, 280, 300, 290, 270, 260, 245, 230, 250, 270, 260]

interface PortfolioChartProps {
  data?: number[]
  yLabels?: string[]
  className?: string
}

export function PortfolioChart({
  data = DEFAULT_SERIES,
  yLabels = ['$305', '$253', '$202', '$150', '$98'],
  className = '',
}: PortfolioChartProps) {
  const w = 1100
  const h = 290
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)
  const points = data.map((v, i) => [i * step, h - ((v - min) / range) * h * 0.85 - h * 0.05])
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${w},${h} L0,${h} Z`
  const marker = points[Math.min(20, points.length - 1)]

  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex">
        <div className="flex flex-col justify-between pr-4 py-1" style={{ height: `${h}px` }}>
          {yLabels.map(label => (
            <span key={label} className="text-gfx-neutral-400 text-xs font-acid">{label}</span>
          ))}
        </div>
        <div className="flex-1">
          <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height: `${h}px` }}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10BC83" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10BC83" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10BC83" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#10BC83" stopOpacity="1" />
                <stop offset="100%" stopColor="#10BC83" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {[0.15, 0.38, 0.6, 0.83].map((y, i) => (
              <line key={i} x1="0" y1={h * y} x2={w} y2={h * y} stroke="#1a2e26" strokeWidth="0.5" strokeDasharray="4 4" />
            ))}
            <path d={areaD} fill="url(#portfolioGrad)" />
            <path d={pathD} stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
            <circle cx={marker[0]} cy={marker[1]} r="12" fill="#10BC83" opacity="0.15" />
            <circle cx={marker[0]} cy={marker[1]} r="4" fill="#10BC83" />
            <line x1={marker[0]} y1={marker[1] + 16} x2={marker[0]} y2={h} stroke="#10BC83" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  )
}
