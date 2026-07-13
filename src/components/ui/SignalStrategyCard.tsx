import type { ReactNode } from 'react'
import { ChevronRightIcon } from '@/components/icons'
import { SparkleButton } from './SparkleButton'

interface SignalStrategyCardProps {
  initials: string
  avatarUrl?: string
  username: string
  tag: string
  pair: string
  pairIcon?: ReactNode
  pnl: number
  pnlLabel?: string
  trades: number
  pricePerMonth: string
  profitShare: string
  followers: number
  following?: boolean
  onFollow?: () => void
  onViewStrategy?: () => void
}

function PnlMiniChart({ data, negative }: { data: number[]; negative: boolean }) {
  const w = 280
  const h = 80
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)
  const color = negative ? 'var(--signal-pnl-negative, #d46356)' : 'var(--signal-pnl-positive, #10BC83)'

  const points = data.map((v, i) => [i * step, h - ((v - min) / range) * h * 0.8 - h * 0.1])
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${w},${h} L0,${h} Z`
  const gradId = `sigGrad${negative ? 'Neg' : 'Pos'}`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={negative ? '#d46356' : '#10BC83'} stopOpacity="0.2" />
          <stop offset="100%" stopColor={negative ? '#d46356' : '#10BC83'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} />
      <path d={pathD} stroke={negative ? '#d46356' : '#10BC83'} strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SignalStrategyCard({
  initials,
  avatarUrl,
  username,
  tag,
  pair,
  pairIcon,
  pnl,
  pnlLabel = '30D P&L',
  trades,
  pricePerMonth,
  profitShare,
  followers,
  following = false,
  onFollow,
  onViewStrategy,
}: SignalStrategyCardProps) {
  const isNegative = pnl < 0
  const chartData = Array.from({ length: 12 }, (_, i) => 80 - i * 4 + Math.random() * 4)

  return (
    <div
      className="signal-strategy-card flex flex-col"
      style={{
        background: 'var(--signal-card-bg, #0C1311)',
        borderRadius: 'var(--signal-card-radius, 18.56px)',
        outline: '1.16px solid var(--signal-card-border, #0C1311)',
        outlineOffset: '-1.16px',
        boxShadow: '0px 4.64px 23.2px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div className="flex flex-col gap-[17px] pt-[31px] pb-[35px] px-[25px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[22px]">
            <div className="w-[63px] h-[63px] rounded-full bg-[var(--signal-avatar-bg,#064b34)] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-[16px] font-acid font-medium">{initials}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[var(--signal-text-muted,#a0a0a0)] text-[16px] font-acid font-medium leading-[1.2]">{username}</p>
              <span className="text-white text-[16px] font-acid font-medium leading-[1.2]">{tag}</span>
            </div>
          </div>
          <button
            onClick={onFollow}
            className={`h-[34px] px-4 rounded-full flex items-center gap-1.5 text-[14px] font-acid font-medium transition-colors cursor-pointer ${
              following
                ? 'bg-[var(--signal-follow-active-bg,#09241c)] border border-[var(--signal-border-subtle,#303030)] text-white'
                : 'bg-[var(--signal-accent,#10BC83)] text-white'
            }`}
          >
            {following && <CheckIcon />}
            <span>{following ? 'Following' : 'Follow'}</span>
          </button>
        </div>

        {/* Trading Pair */}
        <div className="flex items-center gap-[7px]">
          {pairIcon}
          <span className="border border-[var(--signal-border-subtle,#303030)] rounded-full px-3 py-1 text-white text-[14px] font-acid font-medium">
            {pair}
          </span>
        </div>

        {/* P&L Chart */}
        <div className="border border-[var(--signal-border-subtle,#1a2e28)] rounded-[14px] p-4 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className={`text-[34px] font-acid leading-none ${isNegative ? 'text-[var(--signal-pnl-negative,#d46356)]' : 'text-[var(--signal-pnl-positive,#10BC83)]'}`}>
                {isNegative ? '-' : '+'}${Math.abs(pnl).toFixed(2)}
              </p>
              <p className="text-[var(--signal-text-dim,#808080)] text-[14px] font-acid font-medium mt-1">{pnlLabel}</p>
            </div>
            <span className="border border-[var(--signal-border-subtle,#303030)] rounded-full px-3 py-1 text-[var(--signal-text-dim,#808080)] text-[12px] font-acid font-medium">
              {trades} trades
            </span>
          </div>
          <div className="mt-1">
            <PnlMiniChart data={chartData} negative={isNegative} />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 border border-[var(--signal-border-subtle,#1a2e28)] rounded-[14px] overflow-hidden">
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-[16px] font-acid font-medium">{pricePerMonth}</span>
            <span className="text-[var(--signal-text-dim,#808080)] text-[12px] font-acid font-medium">Price/mo</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5 border-x border-[var(--signal-border-subtle,#1a2e28)]">
            <span className="text-white text-[16px] font-acid font-medium">{profitShare}</span>
            <span className="text-[var(--signal-text-dim,#808080)] text-[12px] font-acid font-medium">Profit Share</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-[16px] font-acid font-medium">{followers}</span>
            <span className="text-[var(--signal-text-dim,#808080)] text-[12px] font-acid font-medium">Followers</span>
          </div>
        </div>

        {/* View Strategy */}
        <SparkleButton fullWidth className="px-5" onClick={onViewStrategy}>
          <span className="flex items-center justify-center gap-2">
            <span>View Strategy</span>
            <ChevronRightIcon size={18} color="#c6c6c6" />
          </span>
        </SparkleButton>
      </div>
    </div>
  )
}
