import type { ReactNode } from 'react'
import { GlassCard, GlowEllipse } from '@/components/ui'
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
    <span className="flex items-center justify-center w-[2.1250rem] h-[2.1250rem] rounded-md bg-[rgba(215,96,255,0.15)] border border-[rgba(168,85,247,0.25)]">
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
    <GlassCard variant="purple" divider="none" rounded="20px" glow={false}>
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 54.29% 52.77% at 50% 46.64%, var(--color-gfx-purple-surface) 16%, var(--color-gfx-purple-bg) 100%)' }}
        aria-hidden="true"
      />
      <GlowEllipse variant="purple" className="left-[-40px] top-[-30px]" />
      <GlowEllipse variant="purple" className="right-[-40px] bottom-[-30px]" />
      <div className="relative p-8 flex flex-col items-center gap-6">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <SparkleIcon />
            <span className="text-xs text-gfx-purple-accent uppercase tracking-tab font-acid font-bold">
              Trader Passport
            </span>
          </div>
          <span className="px-3 py-0.5 rounded-full bg-gfx-purple-badge border border-gfx-purple-border-highlight text-white text-xs font-acid font-bold">
            LVL {p.level}
          </span>
        </div>

        {/* Avatar */}
        <div
          className="w-[7rem] h-[7rem] rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, #d760ff, #9877e2)',
            boxShadow: '0 0 0 6px rgba(168,85,247,0.12), 0 0 40px rgba(168,85,247,0.35)',
          }}
        >
          <span className="text-white text-subtitle-4xl font-acid font-bold leading-none">
            T
          </span>
        </div>

        {/* Name */}
        <span className="text-2xl text-gfx-purple-text font-acid text-center">{p.name}</span>

        {/* Location badge */}
        <span className="px-4 py-1 rounded-full bg-white/5 border border-white/8 text-xs text-gfx-purple-text font-acid">
          &#127487;&#127462; {p.location}
        </span>

        {/* Archetype box */}
        <div className="w-full rounded-full bg-gfx-purple-bg border border-gfx-purple-border p-5 flex flex-col gap-1">
          <span className="text-xs text-gfx-purple-accent uppercase tracking-tab font-acid font-bold">
            &#10022; ARCHETYPE
          </span>
          <span className="text-2xl text-white font-acid">{p.archetype}</span>
          <span className="text-xs text-gfx-neutral-400 font-acid">{p.archetypeDescription}</span>
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
              className="h-[4.5625rem] rounded-md bg-white/3 border border-white/6 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-2xl text-gfx-purple-text font-acid">{s.value}</span>
              <span className="text-xs text-gfx-neutral-400 font-acid">{s.label}</span>
            </div>
          ))}
        </div>

        {/* XP Progress */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gfx-purple-accent font-acid font-bold uppercase tracking-tab">
              XP Progress
            </span>
            <span className="text-xs text-gfx-neutral-400 font-acid">
              {p.xpCurrent} / {p.xpMax} XP
            </span>
          </div>
          <div className="relative w-full h-[0.4375rem] rounded-full bg-gfx-purple-surface overflow-visible">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${xpPct}%`,
                background: 'linear-gradient(90deg, #d760ff, #9877e2)',
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: `${xpPct}%`,
                height: '14px',
                background: 'linear-gradient(270deg, #D760FF 50%, #D760FF 58.39%, rgba(152, 119, 226, 0.00) 77.98%)',
                filter: 'url(#blur-3)',
              }}
            />
          </div>
          <span className="text-xs text-gfx-neutral-400 font-acid text-left">
            ALL ACCOUNTS &middot; {p.trades} TRADES &middot; {p.greenDays} GREEN DAYS &middot; {p.streak}-STREAK
          </span>
        </div>

        {/* Daily Streak */}
        <div
          className="w-full rounded-md p-4 flex flex-col gap-3"
          style={{
            background: 'linear-gradient(135deg, rgba(242,153,74,0.14), rgba(242,153,74,0.03))',
            border: '1px solid rgba(242,153,74,0.3)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gfx-amber font-acid font-bold uppercase tracking-tab">
              &#128293; Daily Streak
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-gfx-purple-text font-acid">{p.dailyStreakDays}</span>
            <span className="text-xs text-gfx-neutral-400 font-acid">days</span>
          </div>
          <div className="w-full h-[0.375rem] rounded-full bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${streakPct}%`,
                background: 'linear-gradient(90deg, #f2994a, #f2c94c)',
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gfx-amber font-acid font-semibold">{daysRemaining}d to</span>
            <span className="text-xs text-gfx-amber font-acid font-semibold">{p.dailyStreakReward}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

/* ── Top Stats Row ── */

function StatCard({ stat, glowCorner }: { stat: DnaStat; glowCorner: 'top-left' | 'top-right' }) {
  const valueColor = stat.color === 'purple' ? '#c8afff' : '#ffb400'
  const ellipsePos = glowCorner === 'top-left'
    ? 'left-[-40px] top-[-30px]'
    : 'right-[-40px] top-[-30px]'

  return (
    <GlassCard variant="purple" divider="none" rounded="20px" className="h-[8.3125rem]" glow={false}>
      <GlowEllipse variant="purple" className={ellipsePos} />
      <div className="relative p-[1.375rem] h-full flex flex-col justify-between">
        <span className="text-xs text-gfx-neutral-400 uppercase tracking-tab font-acid font-bold">
          {stat.label}
        </span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-4xl font-acid" style={{ color: valueColor }}>
            {stat.value}
          </span>
          {stat.unit && (
            <span className="text-base text-gfx-neutral-400 font-acid">{stat.unit}</span>
          )}
        </div>
        <span className="text-xs text-gfx-neutral-400 font-acid">{stat.peer}</span>
      </div>
    </GlassCard>
  )
}

const STAT_GLOW_CORNERS: Array<'top-right' | 'top-left'> = ['top-right', 'top-left', 'top-right', 'top-left']

function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dnaStats.map((stat, i) => (
        <StatCard key={i} stat={stat} glowCorner={STAT_GLOW_CORNERS[i]} />
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
    <GlassCard variant="purple" divider="none" rounded="14px" className="h-[6.5000rem]" glow={false}>
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <Icon />
          <span className="text-xs text-[#948aa3] uppercase tracking-wider font-acid">{trait.name}</span>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl text-white font-acid">{trait.value}</span>
          <span className="text-xs text-gfx-neutral-400 font-acid">/100</span>
        </div>
        <div className="w-full h-[0.3125rem] rounded-full bg-gfx-purple-surface overflow-hidden">
          {trait.barColor !== 'none' && (
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: barBg }}
            />
          )}
        </div>
      </div>
    </GlassCard>
  )
}

function TraderTraitsCard() {
  return (
    <GlassCard variant="purple" divider="none" rounded="20px" glow={false}>
      <GlowEllipse variant="purple" className="left-1/2 -translate-x-1/2 top-[-30px]" />
      <div className="relative p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <SectionPillIcon>
            <TraitPillIcon />
          </SectionPillIcon>
          <div className="flex flex-col">
            <span className="text-base text-white font-acid font-medium">Trader Traits</span>
            <span className="text-xs text-gfx-neutral-400 font-acid">Core strengths &amp; weaknesses</span>
          </div>
        </div>

        {/* 4 trait cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {traderTraits.map((trait, i) => (
            <TraitBar key={i} trait={trait} />
          ))}
        </div>
      </div>
    </GlassCard>
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
          <span className="text-sm text-white font-acid">{row.label}</span>
          {row.isTop && (
            <span className="px-2 py-0.5 rounded-full bg-gfx-purple-badge border border-gfx-purple-border-highlight text-gfx-purple-accent text-tiny font-acid font-bold">
              TOP
            </span>
          )}
        </div>
        <span className="text-xs text-gfx-neutral-400 font-acid">{row.percentage}%</span>
      </div>
      <div className="w-full h-[0.375rem] rounded-full bg-gfx-purple-surface overflow-hidden">
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
    <GlassCard variant="purple" divider="none" rounded="20px" glow={false}>
      <GlowEllipse variant="purple" className="left-[-40px] top-[-30px]" />
      <GlowEllipse variant="purple" className="left-[-40px] top-[-30px]" />
      <div className="relative p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SectionPillIcon>
          <DnaIcon />
        </SectionPillIcon>
        <div className="flex flex-col flex-1">
          <span className="text-base text-white font-acid font-medium">Style Composition</span>
          <span className="text-xs text-gfx-neutral-400 font-acid">
            Moderate conviction &middot; top strand 48%
          </span>
        </div>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs text-gfx-neutral-400 font-acid">
          0 STYLES
        </span>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
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
    </GlassCard>
  )
}

/* ── AI Strategy Summary ── */

function AiStrategySummaryCard() {
  return (
    <GlassCard variant="purple" divider="none" rounded="20px" glow={false}>
      <GlowEllipse variant="purple" className="right-[-40px] bottom-[-30px]" />
      <GlowEllipse variant="purple" className="right-[-40px] bottom-[-30px]" />
      <div className="relative p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <SectionPillIcon>
            <SubtitlesIcon />
          </SectionPillIcon>
          <div className="flex flex-col flex-1">
            <span className="text-base text-white font-acid font-medium">AI Strategy Summary</span>
            <span className="text-xs text-gfx-neutral-400 font-acid">Personalized analysis of your trading DNA</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-gfx-purple-badge border border-gfx-purple-border-highlight text-gfx-purple-accent text-xs font-acid font-bold">
            AI
          </span>
        </div>

        {/* Body */}
        <p
          className="text-gfx-neutral-400 font-acid leading-6"
          style={{ fontSize: '14.5px' }}
        >
          {aiStrategySummary}
        </p>

        {/* AI Coach button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(168,85,247,0.16)] border border-[rgba(168,85,247,0.4)] cursor-pointer hover:opacity-90 transition-opacity">
            <AiCoachSmallIcon />
            <span className="text-xs text-gfx-purple-accent font-acid">AI Coach</span>
          </button>
        </div>
      </div>
    </GlassCard>
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
