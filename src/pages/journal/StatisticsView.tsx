import { useState } from 'react'
import { GlassCard } from '@/components/ui'
import {
  periodOptions,
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

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M16.5 10.5V9C16.5 8.37 16.5 7.81 16.49 7.31H1.51C1.5 7.81 1.5 8.37 1.5 9V10.5C1.5 13.33 1.5 14.74 2.38 15.62C3.26 16.5 4.67 16.5 7.5 16.5H10.5C13.33 16.5 14.74 16.5 15.62 15.62C16.5 14.74 16.5 13.33 16.5 10.5Z" fill="white" fillOpacity={0.35}/>
      <path d="M5.81 1.88C5.81 1.56 5.56 1.31 5.25 1.31C4.94 1.31 4.69 1.56 4.69 1.88V3.06C3.61 3.15 2.9 3.36 2.38 3.88C1.86 4.4 1.65 5.11 1.56 6.19H16.44C16.35 5.11 16.14 4.4 15.62 3.88C15.1 3.36 14.39 3.15 13.31 3.06V1.88C13.31 1.56 13.06 1.31 12.75 1.31C12.44 1.31 12.19 1.56 12.19 1.88V3.01C11.69 3 11.13 3 10.5 3H7.5C6.87 3 6.31 3 5.81 3.01V1.88Z" fill="white" fillOpacity={0.35}/>
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

/* ─── Period Selector ─── */

function PeriodSelector({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center h-[39px] rounded-full bg-[#09241c] overflow-hidden">
        {periodOptions.map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`h-full px-3.5 text-[12px] font-acid font-medium rounded-full transition-colors cursor-pointer ${
              active === p
                ? 'bg-[#064b34] text-white border border-[#00b38c]'
                : 'text-gfx-neutral-300 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button className="w-[39px] h-[39px] rounded-full bg-[#09241c] flex items-center justify-center hover:bg-[#0d2e24] transition-colors cursor-pointer">
        <CalendarIcon />
      </button>
    </div>
  )
}

/* ─── Stat Card ─── */

const COLOR_MAP = {
  green: '#37c92e',
  red: '#d46356',
  teal: '#10bc83',
  white: '#ffffff',
} as const

function MetricCard({ label, value, color }: { label: string; value: string; color: keyof typeof COLOR_MAP }) {
  const isPill = label === 'Most Profitable Asset'

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden h-[147px]">
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-gfx-neutral-500 text-[16px] font-acid font-medium">{label}</span>
          <InfoIcon />
        </div>
        <div className="flex-1 flex items-center mt-2">
          {isPill ? (
            <span className="h-[36px] px-5 rounded-full bg-gradient-to-t from-[#09241c] to-[#0c1311] border border-white/10 flex items-center text-white text-[24px] font-acid">
              {value}
            </span>
          ) : (
            <span className="text-[36px] font-acid" style={{ color: COLOR_MAP[color] }}>
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
        <span className="text-[#808080] text-[16px] font-acid">Your Genesis Score</span>
        <span className="text-white text-[24px] font-acid">15.00</span>
      </div>
      <div className="relative h-[8px] rounded-full overflow-hidden">
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(to right, #EE4741, #EC7F23, #DCB40E, #28C45B)',
        }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#0c1311]"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {[0, 20, 40, 60, 80, 100].map(v => (
          <span key={v} className="text-white text-[12px] font-acid">{v}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Session & Time Analysis ─── */

function SessionAnalysis() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="p-6">
        <h3 className="text-white text-[16px] font-acid font-medium mb-5">Session & Time Analysis</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-[103px] rounded-[19px] bg-[#09241c] p-4 flex flex-col justify-between">
            <span className="text-[#808080] text-[14px] font-acid">Best Hour</span>
            <span className="text-[#00b38c] text-[16px] font-acid font-medium">14:00 — 15:00</span>
          </div>
          <div className="h-[103px] rounded-[19px] bg-[#09241c] p-4 flex flex-col justify-between">
            <span className="text-[#808080] text-[14px] font-acid">Best Session</span>
            <span className="text-[#00b38c] text-[16px] font-acid font-medium">Asian Cross</span>
          </div>
        </div>

        <p className="text-gfx-neutral-500 text-[16px] font-acid font-medium mb-3">Session Performance</p>
        <div className="grid grid-cols-3 px-4 mb-3">
          <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Date / Time</span>
          <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Win Rate</span>
          <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider text-right">Net P&L</span>
        </div>
        {sessionPerformance.map((row, i) => (
          <div key={i} className="grid grid-cols-3 items-center px-4 h-[68px] border-t border-[#09241c]">
            <span className="text-white text-[14px] font-acid">{row.session}</span>
            <span className="text-white text-[14px] font-acid">{row.winRate}</span>
            <span className={`text-[14px] font-acid text-right ${row.pnl >= 0 ? 'text-[#37c92e]' : 'text-[#d46356]'}`}>
              {row.pnl >= 0 ? '+' : '-'}${Math.abs(row.pnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

/* ─── Symbol Exposure ─── */

function SymbolExposure() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white text-[16px] font-acid font-medium">Symbol Exposure</h3>
          <button className="cursor-pointer hover:opacity-80 transition-opacity">
            <ExpandIcon />
          </button>
        </div>

        <div className="grid grid-cols-4 px-4 mb-3">
          <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Symbol</span>
          <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Trades</span>
          <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider">Volume</span>
          <span className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider text-right">P&L</span>
        </div>
        {symbolExposure.map((row, i) => (
          <div key={i} className="grid grid-cols-4 items-center px-4 h-[68px] border-t border-[#09241c]">
            <span className="text-white text-[14px] font-acid">{row.symbol}</span>
            <span className="text-white text-[14px] font-acid">{row.trades}</span>
            <span className="text-gfx-neutral-500 text-[14px] font-acid">{row.volume}</span>
            <span className={`text-[14px] font-acid text-right ${row.pnl >= 0 ? 'text-[#37c92e]' : 'text-[#d46356]'}`}>
              {row.pnl >= 0 ? '+' : '-'}${Math.abs(row.pnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

/* ─── Technical Statistics ─── */

function TechnicalStatistics() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="p-6">
        <h3 className="text-white text-[16px] font-acid font-medium mb-5">Technical Statistics</h3>

        <div className="flex flex-col">
          {technicalStats.map((row, i) => (
            <div key={i} className="flex items-center justify-between h-[56px] border-t border-[#09241c] first:border-t-0">
              <span className="text-gfx-neutral-500 text-[16px] font-acid">{row.label}</span>
              <span className={`text-[16px] font-acid ${row.teal ? 'text-[#00b38c]' : 'text-[#ececec]'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Main Statistics View ─── */

export default function StatisticsView() {
  const [period, setPeriod] = useState('ALL')

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
        <div className="px-[30px] py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white text-[24px] font-acid">Trading Statistics</h2>
            <p className="text-[#808080] text-[16px] font-acid font-medium mt-1">All time</p>
          </div>
          <PeriodSelector active={period} onChange={setPeriod} />
        </div>
      </GlassCard>

      {/* Genesis Score + Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        {/* Genesis Score */}
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white text-[24px] font-acid">Genesis Score</h3>
              <div className="flex items-center gap-2 h-[30px] px-3 rounded-full border border-[rgba(0,240,160,0.15)] bg-[rgba(0,240,160,0.1)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17L9 11L13 15L21 7" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-gfx-green-500 text-[12px] font-acid">24H +$0.00(0.0%)</span>
              </div>
            </div>
            <RadarChart />
            <ScoreBar score={15} />
          </div>
        </GlassCard>

        {/* Stats Grid: 3 cols × 4 rows */}
        <div className="grid grid-cols-3 gap-4">
          {statsGrid.flatMap((row, ri) =>
            row.map((stat, ci) => (
              <MetricCard key={`${ri}-${ci}`} label={stat.label} value={stat.value} color={stat.color} />
            ))
          )}
        </div>
      </div>

      {/* Session Analysis + (placeholder for right card) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SessionAnalysis />
        <TechnicalStatistics />
      </div>

      {/* Symbol Exposure + Technical Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SymbolExposure />
      </div>
    </div>
  )
}
