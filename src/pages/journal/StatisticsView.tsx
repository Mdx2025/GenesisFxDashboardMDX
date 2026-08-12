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

function XauusdIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <g clipPath="url(#most-profitable-xau-clip)">
        <path d="M0 0H38V38H0V0Z" fill="#D69A00" />
        <path d="M14.42 14.63H23.77L22.41 10.97C22.36 10.82 22.26 10.69 22.13 10.59L14.42 14.63ZM14.39 10.28C14.73 9.39 15.45 8.82 16.26 8.82H21.79C22.59 8.82 23.32 9.39 23.65 10.28L25.02 13.94C25.42 15.04 24.76 16.28 23.77 16.28H14.27C13.28 16.28 12.62 15.04 13.03 13.94L14.39 10.28ZM6.95 24.13H16.28L14.92 20.47C14.86 20.32 14.77 20.19 14.64 20.09L6.95 24.13ZM6.92 19.78C7.25 18.89 7.98 18.32 8.78 18.32H14.3C15.1 18.32 15.83 18.89 16.16 19.78L17.52 23.44C17.93 24.54 17.27 25.78 16.28 25.78H6.8C5.81 25.78 5.15 24.54 5.56 23.44L6.92 19.78ZM31.27 24.13H21.88L29.63 20.09C29.75 20.18 29.85 20.31 29.91 20.47L31.27 24.13ZM23.71 18.32C22.91 18.32 22.18 18.89 21.85 19.78L20.49 23.44C20.08 24.54 20.74 25.78 21.73 25.78H31.27C32.27 25.78 32.93 24.54 32.52 23.44L31.15 19.78C30.82 18.89 30.09 18.32 29.29 18.32H23.71Z" fill="white" />
      </g>
      <defs>
        <clipPath id="most-profitable-xau-clip">
          <rect width="38" height="38" rx="19" fill="white" />
        </clipPath>
      </defs>
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
        <div className="flex items-center gap-2">
          <span className="text-gfx-neutral-500 text-base font-acid font-medium">{label}</span>
          <InfoIcon />
        </div>
        <div className="flex-1 flex items-center mt-2">
          {isPill ? (
            <div className="flex items-center justify-center gap-4 rounded-full px-5 py-2.5 bg-stat-pill">
              <XauusdIcon />
              <span className="text-white text-xl sm:text-2xl font-acid">{value}</span>
            </div>
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
  const rings = [
    '229,29 384,147 325,318 135,318 76,147',
    '229,56 356,153 308,294 151,294 103,153',
    '229,85 329,160 291,272 168,272 130,160',
    '229,113 302,168 274,250 185,250 157,168',
    '229,142 275,176 257,228 202,228 184,176',
  ]

  const labels = [
    { label: radarAxes[0], x: 229, y: 13, anchor: 'middle' },
    { label: radarAxes[1], x: 361, y: 132, anchor: 'start' },
    { label: radarAxes[2], x: 289, y: 347, anchor: 'start' },
    { label: radarAxes[3], x: 164, y: 347, anchor: 'end' },
    { label: radarAxes[4], x: 96, y: 132, anchor: 'end' },
  ] as const

  return (
    <div className="relative flex h-full min-h-[18rem] w-full items-center justify-center">
      <svg
        className="h-full w-full"
        viewBox="0 0 454 357"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Empty Genesis Score radar chart with Win percentage, Profit factor, Average win loss, Risk to Reward, and Consistency axes"
      >
        {rings.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#303030"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {labels.map(({ label, x, y, anchor }) => (
          <text
            key={label}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fill="#808080"
            fontSize="16"
            fontWeight="600"
            fontFamily="Acid Grotesk, Arial, sans-serif"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  )
}

/* ─── Score Bar ─── */

function ScoreSection({ score }: { score: number }) {
  const pct = Math.min(100, Math.max(0, score))

  return (
    <div className="mt-auto">
      <div className="w-full h-px bg-[#09241C]" />
      <div className="flex gap-0 pt-4">
        <div className="flex flex-col justify-center pr-4 shrink-0">
          <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-snug">Your Genesis Score</span>
          <span className="text-white text-2xl font-acid mt-1">15.00</span>
        </div>
        <div className="w-px bg-[#09241C] self-stretch shrink-0" />
        <div className="flex-1 flex flex-col justify-center pl-4">
          <div className="relative h-2.5 rounded-full overflow-hidden">
            <div className="absolute inset-0 rounded-full" style={{
              background: 'linear-gradient(90deg, #EE4741 0%, #EC7F23 37%, #DCB40E 60%, #28C45B 100%)',
            }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-black"
              style={{ left: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {[0, 20, 40, 60, 80, 100].map(v => (
              <span key={v} className="text-white text-base font-acid leading-tight">{v}</span>
            ))}
          </div>
        </div>
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
          <div className="relative z-10 h-[6.4375rem] rounded-lg bg-gfx-green-900 p-4 flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <span className="text-gfx-neutral-400 text-sm font-acid">Best Hour</span>
            <span className="text-gfx-green-300 text-base font-acid font-medium">14:00 — 15:00</span>
          </div>
          <div className="relative z-10 h-[6.4375rem] rounded-lg bg-gfx-green-900 p-4 flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <span className="text-gfx-neutral-400 text-sm font-acid">Best Session</span>
            <span className="text-gfx-green-300 text-base font-acid font-medium">Asian Cross</span>
          </div>
        </div>

        <p className="text-gfx-neutral-500 text-base font-acid font-medium mb-3">Session Performance</p>
        <div className="overflow-x-auto">
        <div className="grid grid-cols-3 px-4 mb-3 min-w-[21.8750rem]">
          <span className="text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-wider">Date / Time</span>
          <span className="text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-wider">Win Rate</span>
          <span className="text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-wider text-right">Net P&L</span>
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
          <span className="text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-wider">Symbol</span>
          <span className="text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-wider">Trades</span>
          <span className="text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-wider">Volume</span>
          <span className="text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-wider text-right">P&L</span>
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
          <div className="flex flex-col justify-between pr-3 text-gfx-neutral-500 text-xs font-acid font-bold uppercase tracking-tab h-[16.1250rem]">
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
      <div className="grid grid-cols-1 xl:grid-cols-[0.5fr_1fr] gap-6">
        {/* Genesis Score */}
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden h-full">
          <div className="glow-ellipse absolute w-[493px] h-[278px] -right-[60px] top-[182px] rounded-full pointer-events-none bg-[#064B34] blur-[157px]" aria-hidden="true" />
          <div className="p-6 flex flex-col h-full relative z-10">
            <div className="flex flex-row items-center gap-3 mb-2">
              <h3 className="text-white text-2xl font-acid">Genesis Score</h3>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_gs)">
                  <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 6H9.00833" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_gs">
                    <rect width="18" height="18" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex-1 min-h-0">
                <RadarChart />
              </div>
              <ScoreSection score={15} />
            </div>
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
