import type { ReactNode } from 'react'
import {
  traderPassport,
  dnaStats,
  traderTraits,
  styleCompositionLeft,
  styleCompositionRight,
  aiStrategySummary,
} from '@/data/strategyDna'
import type { DnaStat, TraderTrait, StyleRow } from '@/data/strategyDna'

/* ═══════════════════════════════════════════════
   Inline SVG Icons
   ═══════════════════════════════════════════════ */

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 0L9.79 5.53h5.81l-4.7 3.42 1.8 5.53L8 11.06l-4.7 3.42 1.8-5.53-4.7-3.42h5.81z"
        fill="#c8afff"
      />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#948aa3" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" stroke="#948aa3" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="#948aa3" />
    </svg>
  )
}

function FaceScanIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" stroke="#948aa3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" stroke="#948aa3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" stroke="#948aa3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" stroke="#948aa3" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="10" r="1" fill="#948aa3" />
      <circle cx="15" cy="10" r="1" fill="#948aa3" />
      <path d="M9 15c1.5 1.5 4.5 1.5 6 0" stroke="#948aa3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BombIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="13" r="7" stroke="#948aa3" strokeWidth="1.5" />
      <path d="M14 6l2-3" stroke="#948aa3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 4l-1-1" stroke="#948aa3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="#948aa3" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function TraitPillIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="#d760ff" strokeWidth="1.5" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#d760ff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function DnaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 3c0 4 6 5 6 9s-6 5-6 9" stroke="#d760ff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 3c0 4-6 5-6 9s6 5 6 9" stroke="#d760ff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 7h10M7 17h10" stroke="#d760ff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SubtitlesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="#d760ff" strokeWidth="1.5" />
      <path d="M6 12h4M6 16h8M14 12h4" stroke="#d760ff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function AiCoachSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M15.98.353c.19-.47.85-.47 1.04 0l.65 1.66a.5.5 0 0 0 .31.31l1.66.65c.47.19.47.85 0 1.04l-1.66.65a.5.5 0 0 0-.31.31l-.65 1.66c-.19.47-.85.47-1.04 0l-.65-1.66a.5.5 0 0 0-.31-.31l-1.66-.65c-.47-.19-.47-.85 0-1.04l1.66-.65a.5.5 0 0 0 .31-.31l.65-1.66Z"
        fill="#c8afff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 12.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-5 2.25a.75.75 0 0 0 0-1.5H8a.75.75 0 0 0 0 1.5h2Zm2-4.25c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5.448-1.5 1-1.5 1 .672 1 1.5Zm-4 1.5c.552 0 1-.672 1-1.5S8.552 9 8 9s-1 .672-1 1.5.448 1.5 1 1.5Z"
        fill="#c8afff"
      />
    </svg>
  )
}

const TRAIT_ICON_MAP: Record<TraderTrait['icon'], () => ReactNode> = {
  target: TargetIcon,
  faceScan: FaceScanIcon,
  bomb: BombIcon,
  bolt: BoltIcon,
}

/* ═══════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════ */

/* ── Section header pill icon ── */

function SectionPillIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center justify-center w-[34px] h-[34px] rounded-[10px] bg-[rgba(215,96,255,0.15)] border border-[rgba(168,85,247,0.25)]">
      {children}
    </span>
  )
}

/* ── Trader Passport (Left Column) ── */

function TraderPassportCard() {
  const p = traderPassport
  const xpPct = p.xpMax > 0 ? (p.xpCurrent / p.xpMax) * 100 : 0
  const streakPct = p.dailyStreakTarget > 0 ? (p.dailyStreakDays / p.dailyStreakTarget) * 100 : 0
  const daysRemaining = p.dailyStreakTarget - p.dailyStreakDays

  return (
    <div
      className="rounded-[20px] border border-[#2d1f4b] p-8 flex flex-col items-center gap-6"
      style={{
        background:
          'radial-gradient(circle at center, rgba(45,31,75,1) 16%, rgba(27,18,48,1) 58%, rgba(18,11,34,1) 79%, rgba(9,4,20,1) 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 self-start">
        <SparkleIcon />
        <span className="text-[12px] text-[#c8afff] uppercase tracking-[2.3px] font-acid font-bold">
          Trader Passport
        </span>
        <span className="ml-auto px-3 py-0.5 rounded-full bg-[#422e6d] border border-[#8163c5] text-white text-[12px] font-acid font-bold">
          LVL {p.level}
        </span>
      </div>

      {/* Avatar */}
      <div
        className="w-[112px] h-[112px] rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, #d760ff, #9877e2)',
          boxShadow: '0 0 0 6px rgba(168,85,247,0.12), 0 0 40px rgba(168,85,247,0.35)',
        }}
      >
        <span className="text-white text-[46px] font-bold leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
          T
        </span>
      </div>

      {/* Name */}
      <span className="text-[24px] text-[#f3eef9] font-acid text-center">{p.name}</span>

      {/* Location badge */}
      <span className="px-4 py-1 rounded-full bg-white/5 border border-white/8 text-[12px] text-[#f3eef9] font-acid">
        &#127487;&#127462; {p.location}
      </span>

      {/* Archetype box */}
      <div className="w-full rounded-[20px] bg-[#090414] border border-[#2d1f4b] p-5 flex flex-col gap-1">
        <span className="text-[12px] text-[#c8afff] uppercase tracking-[2.3px] font-acid font-bold">
          &#10022; ARCHETYPE
        </span>
        <span className="text-[24px] text-white font-acid">{p.archetype}</span>
        <span className="text-[12px] text-[#808080] font-acid">{p.archetypeDescription}</span>
      </div>

      {/* Three stat pills */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {[
          { value: p.pctl, label: 'PCTL' },
          { value: p.winRate, label: 'WIN RATE' },
          { value: String(p.trades), label: 'TRADES' },
        ].map((s, i) => (
          <div
            key={i}
            className="h-[73px] rounded-[14px] bg-white/3 border border-white/6 flex flex-col items-center justify-center gap-1"
          >
            <span className="text-[24px] text-[#f3eef9] font-acid">{s.value}</span>
            <span className="text-[12px] text-[#808080] font-acid">{s.label}</span>
          </div>
        ))}
      </div>

      {/* XP Progress */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#c9a6fb] font-acid font-bold uppercase tracking-[2.3px]">
            XP Progress
          </span>
          <span className="text-[12px] text-[#808080] font-acid">
            {p.xpCurrent} / {p.xpMax} XP
          </span>
        </div>
        <div className="w-full h-[7px] rounded-full bg-[#2d1f4b] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${xpPct}%`,
              background: 'linear-gradient(90deg, #d760ff, #9877e2)',
            }}
          />
        </div>
        <span className="text-[12px] text-[#808080] font-acid text-center">
          ALL ACCOUNTS &middot; {p.trades} TRADES &middot; {p.greenDays} GREEN DAYS &middot; {p.streak}-STREAK
        </span>
      </div>

      {/* Daily Streak */}
      <div
        className="w-full rounded-[14px] p-4 flex flex-col gap-3"
        style={{
          background: 'linear-gradient(135deg, rgba(242,153,74,0.14), rgba(242,153,74,0.03))',
          border: '1px solid rgba(242,153,74,0.3)',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#f2994a] font-acid font-bold uppercase tracking-[2.3px]">
            &#128293; Daily Streak
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[24px] text-[#f3eef9] font-acid">{p.dailyStreakDays}</span>
          <span className="text-[12px] text-[#808080] font-acid">days</span>
        </div>
        <div className="w-full h-[6px] rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${streakPct}%`,
              background: 'linear-gradient(90deg, #f2994a, #f2c94c)',
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#f2994a] font-acid font-semibold">{daysRemaining}d to</span>
          <span className="text-[12px] text-[#f2994a] font-acid font-semibold">{p.dailyStreakReward}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Top Stats Row ── */

function StatCard({ stat }: { stat: DnaStat }) {
  const valueColor = stat.color === 'purple' ? '#c8afff' : '#ffb400'

  return (
    <div className="bg-[#090414] border border-[#2d1f4b] rounded-[20px] h-[133px] p-[22px] flex flex-col justify-between">
      <span className="text-[12px] text-[#808080] uppercase tracking-[2.3px] font-acid font-bold">
        {stat.label}
      </span>
      <div className="flex items-baseline gap-0.5">
        <span className="text-[36px] font-acid" style={{ color: valueColor }}>
          {stat.value}
        </span>
        {stat.unit && (
          <span className="text-[16px] text-[#808080] font-acid">{stat.unit}</span>
        )}
      </div>
      <span className="text-[12px] text-[#808080] font-acid">{stat.peer}</span>
    </div>
  )
}

function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {dnaStats.map((stat, i) => (
        <StatCard key={i} stat={stat} />
      ))}
    </div>
  )
}

/* ── Trait Progress Bar ── */

function TraitBar({ trait }: { trait: TraderTrait }) {
  const pct = trait.max > 0 ? (trait.value / trait.max) * 100 : 0
  const Icon = TRAIT_ICON_MAP[trait.icon]

  let barBg = ''
  if (trait.barColor === 'purple') barBg = 'linear-gradient(90deg, #d760ff, #9877e2)'
  else if (trait.barColor === 'orange') barBg = '#f2994a'

  return (
    <div className="bg-[#090414] border border-[#2d1f4b] rounded-[14px] h-[104px] p-4 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <Icon />
        <span className="text-[12px] text-[#948aa3] uppercase tracking-wider font-acid">{trait.name}</span>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-[24px] text-white font-acid">{trait.value}</span>
        <span className="text-[12px] text-[#808080] font-acid">/100</span>
      </div>
      <div className="w-full h-[5px] rounded-full bg-[#2d1f4b] overflow-hidden">
        {trait.barColor !== 'none' && (
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: barBg }}
          />
        )}
      </div>
    </div>
  )
}

function TraderTraitsCard() {
  return (
    <div className="bg-[#090414] border border-[#2d1f4b] rounded-[20px] p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SectionPillIcon>
          <TraitPillIcon />
        </SectionPillIcon>
        <div className="flex flex-col">
          <span className="text-[16px] text-white font-acid font-medium">Trader Traits</span>
          <span className="text-[12px] text-[#808080] font-acid">Core strengths &amp; weaknesses</span>
        </div>
      </div>

      {/* 4 trait cards */}
      <div className="grid grid-cols-4 gap-4">
        {traderTraits.map((trait, i) => (
          <TraitBar key={i} trait={trait} />
        ))}
      </div>
    </div>
  )
}

/* ── Style Composition ── */

function StyleProgressRow({ row, variant }: { row: StyleRow; variant: 'purple' | 'gray' }) {
  const barBg =
    variant === 'purple'
      ? 'linear-gradient(90deg, #d760ff, #9877e2)'
      : 'linear-gradient(90deg, #b9b3c4, #e6e2ec)'

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-white font-acid">{row.label}</span>
          {row.isTop && (
            <span className="px-2 py-0.5 rounded-full bg-[#422e6d] border border-[#8163c5] text-[#c8afff] text-[10px] font-acid font-bold">
              TOP
            </span>
          )}
        </div>
        <span className="text-[12px] text-[#808080] font-acid">{row.percentage}%</span>
      </div>
      <div className="w-full h-[6px] rounded-full bg-[#2d1f4b] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${row.percentage}%`, background: barBg }}
        />
      </div>
    </div>
  )
}

function StyleCompositionCard() {
  return (
    <div className="bg-[#090414] border border-[#2d1f4b] rounded-[20px] p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SectionPillIcon>
          <DnaIcon />
        </SectionPillIcon>
        <div className="flex flex-col flex-1">
          <span className="text-[16px] text-white font-acid font-medium">Style Composition</span>
          <span className="text-[12px] text-[#808080] font-acid">
            Moderate conviction &middot; top strand 48%
          </span>
        </div>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-[12px] text-[#808080] font-acid">
          0 STYLES
        </span>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col gap-4">
          {styleCompositionLeft.map((row, i) => (
            <StyleProgressRow key={i} row={row} variant="purple" />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {styleCompositionRight.map((row, i) => (
            <StyleProgressRow key={i} row={row} variant="gray" />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── AI Strategy Summary ── */

function AiStrategySummaryCard() {
  return (
    <div className="bg-[#090414] border border-[#2d1f4b] rounded-[20px] p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SectionPillIcon>
          <SubtitlesIcon />
        </SectionPillIcon>
        <div className="flex flex-col flex-1">
          <span className="text-[16px] text-white font-acid font-medium">AI Strategy Summary</span>
          <span className="text-[12px] text-[#808080] font-acid">Personalized analysis of your trading DNA</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#422e6d] border border-[#8163c5] text-[#c8afff] text-[12px] font-acid font-bold">
          AI
        </span>
      </div>

      {/* Body */}
      <p
        className="text-[#808080] leading-[24px]"
        style={{ fontSize: '14.5px', fontFamily: 'Inter, sans-serif' }}
      >
        {aiStrategySummary}
      </p>

      {/* AI Coach button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(168,85,247,0.16)] border border-[rgba(168,85,247,0.4)] cursor-pointer hover:opacity-90 transition-opacity">
          <AiCoachSmallIcon />
          <span className="text-[12px] text-[#c8afff] font-acid">AI Coach</span>
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Main View
   ═══════════════════════════════════════════════ */

export default function StrategyDnaView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-6">
      {/* LEFT — Trader Passport */}
      <div className="h-fit">
        <TraderPassportCard />
      </div>

      {/* RIGHT — Stats, Traits, Composition, AI Summary */}
      <div className="flex flex-col gap-6">
        <StatsRow />
        <TraderTraitsCard />
        <StyleCompositionCard />
        <AiStrategySummaryCard />
      </div>
    </div>
  )
}
