import { GlassCard, PeriodPill, GlowEllipse } from '@/components/ui'
import {
  statsGrid,
  sessionPerformance,
  symbolExposure,
  technicalStats,
  radarAxes,
} from '@/data/statistics'

/* ─── Icons ─── */

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="#606060" strokeWidth="1.2" />
      <path d="M9 8V13" stroke="#606060" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="0.75" fill="#606060" />
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 3H8M3 3V8M3 3L8 8M17 17H12M17 17V12M17 17L12 12" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─── Stat Card ─── */

const COLOR_MAP = {
  green: '#37c92e',
  red: '#d46356',
  teal: '#10bc83',
  white: '#ffffff',
} as const

const GLOW_POSITIONS = [
  '-left-[2.5rem] -top-[3.125rem]',
  '-right-[2.5rem] -bottom-[3.125rem]',
  '-right-[2.5rem] -top-[3.125rem]',
  '-left-[2.5rem] -bottom-[3.125rem]',
  '-right-[2.5rem] -top-[3.125rem]',
  '-left-[2.5rem] -top-[3.125rem]',
  '-left-[2.5rem] -bottom-[3.125rem]',
  '-right-[2.5rem] -top-[3.125rem]',
  '-right-[2.5rem] -bottom-[3.125rem]',
  '-left-[2.5rem] -top-[3.125rem]',
  '-left-[2.5rem] -bottom-[3.125rem]',
  '-right-[2.5rem] -top-[3.125rem]',
] as const

function MetricCard({ label, value, color, index }: { label: string; value: string; color: keyof typeof COLOR_MAP; index: number }) {
  const isPill = label === 'Most Profitable Asset'

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden h-[9.1875rem]">
      <GlowEllipse className={`!w-[10rem] !h-[6rem] !blur-[3rem] ${GLOW_POSITIONS[index % GLOW_POSITIONS.length]}`} />
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-gfx-neutral-500 text-base font-acid font-medium">{label}</span>
          <InfoIcon />
        </div>
        <div className="flex-1 flex items-center mt-2">
          {isPill ? (
            <span className="h-[2.25rem] px-5 rounded-full bg-gradient-to-t from-gfx-green-900 to-gfx-green-800 border border-white/10 flex items-center text-white text-2xl font-acid">
              {value}
            </span>
          ) : (
            <span className="text-4xl font-acid" style={{ color: COLOR_MAP[color] }}>
              {value}
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Radar Chart ─── */

function RadarChart() {
  const cx = 160, cy = 160
  const levels = [140, 117, 91, 67, 42]
  const n = 5
  const angleStep = (2 * Math.PI) / n
  const startAngle = -Math.PI / 2

  function polyPoints(r: number) {
    return Array.from({ length: n }, (_, i) => {
      const a = startAngle + i * angleStep
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
    }).join(' ')
  }

  const labelPositions = radarAxes.map((_, i) => {
    const a = startAngle + i * angleStep
    const r = 155
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })

  return (
    <div className="relative flex items-center justify-center">
      <svg width="320" height="320" viewBox="0 0 320 320">
        {levels.map((r, i) => (
          <polygon
            key={i}
            points={polyPoints(r)}
            fill="none"
            stroke="#09241c"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: n }, (_, i) => {
          const a = startAngle + i * angleStep
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={cx + 140 * Math.cos(a)}
              y2={cy + 140 * Math.sin(a)}
              stroke="#09241c"
              strokeWidth="1"
            />
          )
        })}
        <polygon
          points={polyPoints(15)}
          fill="#10BC83"
          fillOpacity="0.15"
          stroke="#10BC83"
          strokeWidth="1.5"
        />
        {labelPositions.map((pos, i) => (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#808080"
            fontSize="13"
            fontFamily="Acid Grotesk, sans-serif"
          >
            {radarAxes[i]}
          </text>
        ))}
      </svg>
    </div>
  )
}

/* ─── Score Bar ─── */

function ScoreBar({ score }: { score: number }) {
  const pct = Math.min(100, Math.max(0, score))

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gfx-neutral-400 text-base font-acid">Your Genesis Score</span>
        <span className="text-white text-2xl font-acid">15.00</span>
      </div>
      <div className="relative h-[0.5rem] rounded-full overflow-hidden">
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(to right, #EE4741, #EC7F23, #DCB40E, #28C45B)',
        }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gfx-green-800"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {[0, 20, 40, 60, 80, 100].map(v => (
          <span key={v} className="text-white text-xs font-acid">{v}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Session & Time Analysis ─── */

function SessionAnalysis() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <GlowEllipse className="-right-[5rem] -top-[3.75rem]" />
      <div className="p-6">
        <h3 className="text-white text-base font-acid font-medium mb-5">Session & Time Analysis</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-[6.4375rem] rounded-lg bg-gfx-green-900 p-4 flex flex-col justify-between">
            <span className="text-gfx-neutral-400 text-sm font-acid">Best Hour</span>
            <span className="text-gfx-green-300 text-base font-acid font-medium">14:00 — 15:00</span>
          </div>
          <div className="h-[6.4375rem] rounded-lg bg-gfx-green-900 p-4 flex flex-col justify-between">
            <span className="text-gfx-neutral-400 text-sm font-acid">Best Session</span>
            <span className="text-gfx-green-300 text-base font-acid font-medium">Asian Cross</span>
          </div>
        </div>

        <p className="text-gfx-neutral-500 text-base font-acid font-medium mb-3">Session Performance</p>
        <div className="overflow-x-auto">
        <div className="grid grid-cols-3 px-4 mb-3 min-w-[21.8750rem]">
          <span className="text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-wider">Date / Time</span>
          <span className="text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-wider">Win Rate</span>
          <span className="text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-wider text-right">Net P&L</span>
        </div>
        {sessionPerformance.map((row, i) => (
          <div key={i} className="grid grid-cols-3 items-center px-4 h-[4.25rem] border-t border-gfx-green-900 min-w-[21.8750rem]">
            <span className="text-white text-sm font-acid">{row.session}</span>
            <span className="text-white text-sm font-acid">{row.winRate}</span>
            <span className={`text-sm font-acid text-right ${row.pnl >= 0 ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>
              {row.pnl >= 0 ? '+' : '-'}${Math.abs(row.pnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Symbol Exposure ─── */

function SymbolExposure() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <GlowEllipse className="-right-[5rem] -top-[3.75rem]" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white text-base font-acid font-medium">Symbol Exposure</h3>
          <button className="cursor-pointer hover:opacity-80 transition-opacity">
            <ExpandIcon />
          </button>
        </div>

        <div className="overflow-x-auto">
        <div className="grid grid-cols-4 px-4 mb-3 min-w-[28.1250rem]">
          <span className="text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-wider">Symbol</span>
          <span className="text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-wider">Trades</span>
          <span className="text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-wider">Volume</span>
          <span className="text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-wider text-right">P&L</span>
        </div>
        {symbolExposure.map((row, i) => (
          <div key={i} className="grid grid-cols-4 items-center px-4 h-[4.25rem] border-t border-gfx-green-900 min-w-[28.1250rem]">
            <span className="text-white text-sm font-acid">{row.symbol}</span>
            <span className="text-white text-sm font-acid">{row.trades}</span>
            <span className="text-gfx-neutral-500 text-sm font-acid">{row.volume}</span>
            <span className={`text-sm font-acid text-right ${row.pnl >= 0 ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>
              {row.pnl >= 0 ? '+' : '-'}${Math.abs(row.pnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Technical Statistics ─── */

function TechnicalStatistics() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <GlowEllipse className="-left-[5rem] -top-[3.75rem]" />
      <div className="p-6">
        <h3 className="text-white text-base font-acid font-medium mb-5">Technical Statistics</h3>

        <div className="flex flex-col">
          {technicalStats.map((row, i) => (
            <div key={i} className="flex items-center justify-between h-[3.5000rem] border-t border-gfx-green-900 first:border-t-0">
              <span className="text-gfx-neutral-500 text-base font-acid">{row.label}</span>
              <span className={`text-base font-acid ${row.teal ? 'text-gfx-green-300' : 'text-gfx-neutral-600'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Avg P&L by Day of Week Chart ─── */

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const Y_LABELS = ['$4.00', '$3.00', '$2.00', '$1.00', '$0.00']

function AvgPnlByDayChart() {
  const profitPath = 'M0 120 L40 20 L93 100 L145 60 L186 30 L248 80 L290 40 L341 100 L393 60 L434 80 L496 20 L538 80 L579 60 L621 20'
  const profitArea = `${profitPath} L621 258 L0 258 Z`
  const lossPath = 'M0 60 L62 100 L124 40 L186 80 L207 80 L248 120 L310 60 L372 100 L434 80 L496 140 L558 80 L621 60'
  const lossArea = `${lossPath} L621 258 L0 258 Z`

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <GlowEllipse className="-left-[5rem] -top-[3.75rem]" />
      <div className="relative p-7">
        <div className="flex items-center gap-2 mb-8">
          <h3 className="text-white text-base font-acid font-medium">Avg P&L by Day of Week</h3>
          <InfoIcon />
        </div>

        <div className="flex">
          <div className="flex flex-col justify-between pr-3 text-gfx-neutral-300 text-xs font-acid font-bold uppercase tracking-tab h-[16.1250rem]">
            {Y_LABELS.map(l => <span key={l}>{l}</span>)}
          </div>

          <div className="flex-1 relative h-[19.3750rem]">
            <svg className="absolute inset-0" width="100%" height="258" viewBox="0 0 621 258" preserveAspectRatio="none" fill="none">
              {[0, 51.6, 103.2, 154.8, 206.4].map((y, i) => (
                <line key={`h${i}`} x1="0" y1={y} x2="621" y2={y} stroke="#09241C" strokeWidth="1.29" strokeDasharray={i === 4 ? 'none' : '4.69 4.69'} />
              ))}
              <line x1="0" y1="0" x2="0" y2="258" stroke="#09241C" strokeWidth="1.29" />
              {[93, 186, 279, 372, 465, 558].map(x => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="258" stroke="#09241C" strokeWidth="1.29" strokeDasharray="4.69 4.69" />
              ))}
            </svg>

            <svg className="absolute inset-0" width="100%" height="258" viewBox="0 0 621 258" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="profitGrad" x1="621" y1="-9" x2="621" y2="176" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#064B34" />
                  <stop offset="0.92" stopColor="#0C1311" />
                </linearGradient>
                <linearGradient id="lossGrad" x1="0" y1="-11" x2="0" y2="163" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D46356" stopOpacity="0.2" />
                  <stop offset="0.8" stopColor="#D46356" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={profitArea} fill="url(#profitGrad)" />
              <path d={lossArea} fill="url(#lossGrad)" />
              <path d={profitPath} stroke="#00B38C" strokeWidth="0.86" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d={lossPath} stroke="#D46356" strokeWidth="0.58" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-3 top-[16.7500rem]">
              {DAYS.map(d => (
                <span key={d} className="text-gfx-neutral-500 text-base font-acid font-medium">{d}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-10 mt-6">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="0.48" y="0.48" width="19.04" height="19.04" rx="8" fill="#0C1311" stroke="#00B38C" strokeWidth="0.96" />
            </svg>
            <span className="text-gfx-neutral-500 text-base font-acid font-medium">Profitable</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="0.48" y="0.48" width="19.04" height="19.04" rx="8" fill="#2A1411" stroke="#D46356" strokeWidth="0.96" />
            </svg>
            <span className="text-gfx-neutral-500 text-base font-acid font-medium">Loss</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Main Statistics View ─── */

export default function StatisticsView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
        <GlowEllipse className="bottom-[-30%] left-1/2 -translate-x-1/2" />
        <div className="relative px-[1.875rem] py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-acid">Trading Statistics</h2>
            <p className="text-gfx-neutral-400 text-base font-acid font-medium mt-1">All time</p>
          </div>
          <PeriodPill />
        </div>
      </GlassCard>

      {/* Genesis Score + Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        {/* Genesis Score */}
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white text-2xl font-acid">Genesis Score</h3>
              <div className="flex items-center gap-2 h-[1.875rem] px-3 rounded-full border border-[rgba(0,240,160,0.15)] bg-[rgba(0,240,160,0.1)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17L9 11L13 15L21 7" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-gfx-green-500 text-xs font-acid">24H +$0.00(0.0%)</span>
              </div>
            </div>
            <RadarChart />
            <ScoreBar score={15} />
          </div>
        </GlassCard>

        {/* Stats Grid: 3 cols × 4 rows */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statsGrid.flatMap((row, ri) =>
            row.map((stat, ci) => (
              <MetricCard key={`${ri}-${ci}`} label={stat.label} value={stat.value} color={stat.color} index={ri * row.length + ci} />
            ))
          )}
        </div>
      </div>

      {/* Session & Time Analysis | Avg P&L by Day of Week */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
        <SessionAnalysis />
        <AvgPnlByDayChart />
      </div>

      {/* Symbol Exposure | Technical Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
        <SymbolExposure />
        <TechnicalStatistics />
      </div>
    </div>
  )
}
