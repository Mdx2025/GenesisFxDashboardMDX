import { useId } from 'react'
import { GlassCard } from './GlassCard'
import { PillTabs } from './PillTabs'

export const LEADERBOARD_TABS = ['Top traders', 'Most Profitable', '10X Challenge', 'Demo Accounts'] as const
export type LeaderboardTab = (typeof LEADERBOARD_TABS)[number]

interface LeaderboardTabsProps {
  activeIndex: number
  onChange: (index: number) => void
  className?: string
}

export function LeaderboardTabs({ activeIndex, onChange, className = '' }: LeaderboardTabsProps) {
  return (
    <PillTabs
      options={[...LEADERBOARD_TABS]}
      activeIndex={activeIndex}
      onChange={onChange}
      className={`leaderboard-tabs [&>button]:!px-8 ${className}`}
    />
  )
}

export function LeaderboardAvatar({ initials = 'CP', size = 44 }: { initials?: string; size?: number }) {
  return (
    <span
      className="inline-grid shrink-0 place-items-center rounded-full border border-gfx-green-900 bg-gfx-surface-icon-well text-base font-medium text-gfx-green-300"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export function LeaderboardSparkline({ className = '' }: { className?: string }) {
  const gradientId = useId().replace(/:/g, '')
  return (
    <svg className={`h-8 w-[92px] text-gfx-green-300 ${className}`} viewBox="0 0 92 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="46" y1="5" x2="46" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M1 27C10 23 16 19 25 16C34 13 39 12 47 11C57 9.8 65 9 72 7.6C80 6 85 5 91 3V31H1V27Z" fill={`url(#${gradientId})`} />
      <path d="M1 27C10 23 16 19 25 16C34 13 39 12 47 11C57 9.8 65 9 72 7.6C80 6 85 5 91 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

const PODIUM_TRADERS = [
  { rank: 2, initials: 'BH', name: '@GLotrades', result: '+352.75%', award: 'Runner-up', tone: 'neutral' },
  { rank: 1, initials: 'MB', name: 'Maiya B.', result: '+863.07%', award: 'Champion', tone: 'champion' },
  { rank: 3, initials: 'DH', name: '@Dhall', result: '+352.75%', award: 'Bronze', tone: 'bronze' },
] as const

export function LeaderboardPodium() {
  return (
    <GlassCard
      divider="none"
      glow={false}
      rounded="18.563px"
      className="surface-raised surface-raised-border relative min-h-[514px] overflow-hidden border-[1.16px] px-6 py-12 sm:px-10"
      data-leaderboard-podium
    >
      <div className="theme-decorative-glow absolute left-1/2 top-[-190px] h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-gfx-green-200 opacity-70 [filter:url(#blur-157)]" aria-hidden="true" />
      <div className="relative z-10 grid min-h-[418px] grid-cols-1 items-end gap-10 sm:grid-cols-3 sm:gap-4">
        {PODIUM_TRADERS.map((trader) => {
          const champion = trader.rank === 1
          return (
            <article key={trader.rank} className={`flex flex-col items-center text-center ${champion ? 'sm:-translate-y-8' : ''}`}>
              <span className={`theme-preserve-light mb-3 inline-grid size-9 place-items-center rounded-full text-base text-white ${trader.tone === 'champion' ? 'bg-gfx-gold' : trader.tone === 'bronze' ? 'bg-[#8a4b28]' : 'bg-gfx-green-250'}`}>
                {trader.rank}
              </span>
              <div
                className={`relative grid place-items-center rounded-full border-[3px] border-gfx-gold bg-[radial-gradient(circle_at_50%_35%,#23dca1_0%,#0b9d72_48%,#064b34_76%,#021b13_100%)] shadow-[0_0_0_7px_rgba(244,173,0,0.18),inset_0_0_32px_rgba(255,255,255,0.22),0_0_28px_rgba(0,240,160,0.2)] ${champion ? 'size-[224px]' : 'size-[184px]'}`}
              >
                <span className={`theme-preserve-light text-white ${champion ? 'text-[46px]' : 'text-[38px]'} font-normal`}>{trader.initials}</span>
              </div>
              <h3 className="mt-7 text-2xl font-normal leading-none text-white">{trader.name}</h3>
              <p className="mt-3 text-base font-medium leading-none text-gfx-green-300">{trader.result}</p>
              <span className={`mt-4 rounded-full border px-4 py-1 text-sm leading-none ${trader.tone === 'champion' ? 'border-gfx-gold/60 bg-[#201700] text-gfx-gold' : trader.tone === 'bronze' ? 'border-[#8a4b28]/60 bg-[#2a1608] text-[#e29d58]' : 'border-gfx-neutral-350 text-white'}`}>
                {trader.award}
              </span>
            </article>
          )
        })}
      </div>
    </GlassCard>
  )
}

interface LeaderboardTableProps {
  variant?: 'standard' | 'challenge'
  metricLabel?: string
  metricValue?: string
  rowCount?: number
}

export function LeaderboardTable({ variant = 'standard', metricLabel = 'MONTH ROI', metricValue = '+243.20%', rowCount }: LeaderboardTableProps) {
  const challenge = variant === 'challenge'
  const count = rowCount ?? (challenge ? 25 : 24)

  return (
    <GlassCard
      divider="none"
      glow={false}
      rounded="18.563px"
      className="surface-raised surface-raised-border overflow-hidden border-[1.16px]"
      data-leaderboard-table={variant}
    >
      <div className="overflow-x-auto" role="region" aria-label={`${challenge ? '10X challenge' : 'Trader'} leaderboard table, scrollable`}>
        <table className={`w-full border-collapse ${challenge ? 'min-w-[970px]' : 'min-w-[760px]'}`}>
          <thead>
            <tr className="h-[72px] border-b border-gfx-green-900 text-left text-xs font-bold uppercase tracking-[2.323px] text-gfx-neutral-300">
              <th className="w-[126px] px-10">RANK</th>
              <th className="px-4">{challenge ? 'USER' : 'USERNAME'}</th>
              {challenge && <th className="px-4">CHALLENGUE TIER</th>}
              <th className="px-4">{challenge ? 'RETURN%' : metricLabel}</th>
              {challenge && <th className="px-4">CHART</th>}
              {challenge && <th className="px-10">REWARD</th>}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: count }, (_, index) => (
              <tr
                key={index}
                className={`h-[75px] border-b border-gfx-green-900 text-base font-medium last:border-b-0 ${challenge && index === 0 ? 'bg-gfx-green-300/18' : ''}`}
              >
                <td className="px-10 text-gfx-neutral-300">{index + 1}</td>
                <td className="px-4">
                  <span className="flex items-center gap-4 text-white"><LeaderboardAvatar /><span>Curtis P.</span></span>
                </td>
                {challenge && <td className="px-4 text-white"><span>Tier 1</span> <span className="text-gfx-neutral-400">Rookie</span></td>}
                <td className="px-4 text-gfx-green-300">{challenge ? '+219.50%' : metricValue}</td>
                {challenge && <td className="px-4"><LeaderboardSparkline /></td>}
                {challenge && <td className="px-10 text-white">$500</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
