import type { ReactNode } from 'react'
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

function FollowButton({ following, onClick }: { following: boolean; onClick?: () => void }) {
  if (following) {
    return (
      <button
        onClick={onClick}
        className="h-[34px] px-3 rounded-[12px] bg-[#09241c] border border-[#303030] flex items-center gap-1.5 text-[0.875rem] font-acid font-medium text-white transition-colors cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Following</span>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-[12px] flex items-center gap-[10px] text-[0.875rem] font-acid transition-colors cursor-pointer"
      style={{
        background: 'var(--color-button-primary-bg, #F1FFFA)',
        color: 'var(--color-button-primary-text, black)',
      }}
    >
      <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
        <circle cx="3.5" cy="3.5" r="3.5" fill="currentColor" />
      </svg>
      <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.0625 6.125C1.61882 6.125 0.896986 6.125 0.448493 5.67651C0 5.22801 0 4.50618 0 3.0625C0 1.61882 0 0.896986 0.448493 0.448493C0.896986 0 1.61882 0 3.0625 0C4.50618 0 5.22801 0 5.67651 0.448493C6.125 0.896986 6.125 1.61882 6.125 3.0625C6.125 4.50618 6.125 5.22801 5.67651 5.67651C5.22801 6.125 4.50618 6.125 3.0625 6.125ZM3.57292 1.70139C3.57292 1.41949 3.3444 1.19097 3.0625 1.19097C2.7806 1.19097 2.55208 1.41949 2.55208 1.70139V2.55208H1.70139C1.41949 2.55208 1.19097 2.7806 1.19097 3.0625C1.19097 3.3444 1.41949 3.57292 1.70139 3.57292H2.55208V4.42361C2.55208 4.70551 2.7806 4.93403 3.0625 4.93403C3.3444 4.93403 3.57292 4.70551 3.57292 4.42361V3.57292H4.42361C4.70551 3.57292 4.93403 3.3444 4.93403 3.0625C4.93403 2.7806 4.70551 2.55208 4.42361 2.55208H3.57292V1.70139Z" fill="currentColor" />
      </svg>
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
        <path d="M10.2184 0.43994C9.80448 0.444953 9.41865 0.460049 9.08243 0.505254C8.51991 0.580883 7.90419 0.761648 7.39543 1.2704C6.88667 1.77916 6.70591 2.39488 6.63028 2.9574C6.56232 3.46291 6.56241 4.08054 6.56251 4.73727V4.88771C6.56241 5.54444 6.56232 6.16207 6.63028 6.66757C6.68335 7.0623 6.78819 7.48322 7.0218 7.87499C7.01454 7.875 7.00727 7.875 7 7.875C0 7.875 0 6.11212 0 3.9375C0 1.76288 3.13401 0 7 0C8.16041 0 9.25487 0.158826 10.2184 0.43994Z" fill="currentColor" />
      </svg>
      <span className="leading-[18.8px]">Follow</span>
    </button>
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
                <span className="text-white text-[1rem] font-acid font-medium">{initials}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[var(--signal-text-muted,#a0a0a0)] text-[1rem] font-acid font-medium leading-[1.2]">{username}</p>
              <span className="text-white text-[1rem] font-acid font-medium leading-[1.2]">{tag}</span>
            </div>
          </div>
          <FollowButton following={following} onClick={onFollow} />
        </div>

        {/* Trading Pair */}
        <div className="flex items-center gap-[7px]">
          {pairIcon}
          <span className="border border-[#303030] rounded-full px-3 py-1 text-white text-[0.875rem] font-acid font-medium">
            {pair}
          </span>
        </div>

        {/* P&L Chart */}
        <div className="border border-[#303030] rounded-[14px] p-4 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[var(--signal-text-dim,#808080)] text-[0.875rem] font-acid font-medium mb-1">{pnlLabel}</p>
              <p className={`text-[2.125rem] font-acid leading-none ${isNegative ? 'text-[var(--signal-pnl-negative,#d46356)]' : 'text-[var(--signal-pnl-positive,#10BC83)]'}`}>
                {isNegative ? '-' : '+'}${Math.abs(pnl).toFixed(2)}
              </p>
            </div>
            <span className="border border-[#303030] rounded-full px-3 py-1 text-[var(--signal-text-dim,#808080)] text-[0.75rem] font-acid font-medium">
              {trades} trades
            </span>
          </div>
          <div className="mt-1">
            <PnlMiniChart data={chartData} negative={isNegative} />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 border border-[#303030] rounded-[14px] overflow-hidden">
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-[1rem] font-acid font-medium">{pricePerMonth}</span>
            <span className="text-[var(--signal-text-dim,#808080)] text-[1rem] font-acid font-medium">Price/mo</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5 border-x border-[#303030]">
            <span className="text-white text-[1rem] font-acid font-medium">{profitShare}</span>
            <span className="text-[var(--signal-text-dim,#808080)] text-[1rem] font-acid font-medium">Profit Share</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-[1rem] font-acid font-medium">{followers}</span>
            <span className="text-[var(--signal-text-dim,#808080)] text-[1rem] font-acid font-medium">Followers</span>
          </div>
        </div>

        {/* View Strategy */}
        <SparkleButton fullWidth className="px-5" onClick={onViewStrategy}>
          <span className="flex items-center justify-center text-[#C6C6C6]">View Strategy</span>
        </SparkleButton>
      </div>
    </div>
  )
}
