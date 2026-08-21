const VALUES = [2.7, 0.7, 1.2, 0.6, 2.3, 1.0, 3.6, 2.7, 3.0, 0.9, 3.2, 1.9, 2.9, 4]
const PLOT = { left: 46, top: 34, right: 625, bottom: 218 }

function point(value: number, index: number) {
  const x = PLOT.left + (index / (VALUES.length - 1)) * (PLOT.right - PLOT.left)
  const y = PLOT.bottom - (value / 4) * (PLOT.bottom - PLOT.top)
  return [x, y] as const
}

const LINE_POINTS = VALUES.map((value, index) => point(value, index))
const LINE_PATH = LINE_POINTS.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')
const AREA_PATH = `${LINE_PATH} L ${PLOT.right} ${PLOT.bottom} L ${PLOT.left} ${PLOT.bottom} Z`

/** Static analytics preview that mirrors the public-share Figma chart. */
export function SharePerformanceChart() {
  const marker = LINE_POINTS[7]

  return (
    <svg
      viewBox="0 0 661 294"
      className="block size-full"
      role="img"
      aria-label="Public account views for August, ranging from zero to four views per day"
      data-share-performance-chart
    >
      <defs>
        <linearGradient id="share-performance-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00B38C" stopOpacity="0.34" />
          <stop offset="1" stopColor="var(--color-gfx-surface-raised)" stopOpacity="0" />
        </linearGradient>
        <filter id="share-performance-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <path d={AREA_PATH} fill="url(#share-performance-area)" />
      <path d={LINE_PATH} fill="none" stroke="#00B38C" strokeWidth="1.35" strokeLinejoin="round" />
      <path d={LINE_PATH} fill="none" stroke="#00B38C" strokeOpacity="0.28" strokeWidth="5" filter="url(#share-performance-glow)" />

      <line x1={marker[0]} y1={marker[1]} x2={marker[0]} y2={PLOT.bottom} stroke="#00B38C" strokeOpacity="0.16" />
      <circle cx={marker[0]} cy={marker[1]} r="9" fill="#064B34" fillOpacity="0.72" />
      <circle cx={marker[0]} cy={marker[1]} r="3" fill="#00B38C" />

      {[4, 3, 2, 1, 0].map((label) => (
        <text key={label} x="22" y={PLOT.bottom - (label / 4) * (PLOT.bottom - PLOT.top) + 4} fill="var(--color-gfx-neutral-300)" fontFamily="Acid Grotesk" fontSize="10">{label}</text>
      ))}
      {Array.from({ length: 31 }, (_, day) => (
        <text key={day} x={PLOT.left + (day / 30) * (PLOT.right - PLOT.left)} y="261" fill="var(--color-gfx-neutral-300)" fontFamily="Acid Grotesk" fontSize="8" textAnchor="middle">{day}</text>
      ))}
    </svg>
  )
}
