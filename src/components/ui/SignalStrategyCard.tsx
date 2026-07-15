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
        className="h-[34px] px-3 rounded-md bg-gfx-green-900 border border-gfx-neutral-250 flex items-center gap-1.5 text-sm font-acid font-medium text-white transition-colors cursor-pointer"
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
      className="px-3 py-2 rounded-md flex items-center gap-2.5 text-sm font-acid transition-colors cursor-pointer"
      style={{
        background: 'var(--color-button-primary-bg, #F1FFFA)',
        color: 'var(--color-button-primary-text, black)',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
        <circle cx="7" cy="3.5" r="3.5" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.9375 17.5C9.49382 17.5 8.77199 17.5 8.32349 17.0515C7.875 16.603 7.875 15.8812 7.875 14.4375C7.875 12.9938 7.875 12.272 8.32349 11.8235C8.77199 11.375 9.49382 11.375 10.9375 11.375C12.3812 11.375 13.103 11.375 13.5515 11.8235C14 12.272 14 12.9938 14 14.4375C14 15.8812 14 16.603 13.5515 17.0515C13.103 17.5 12.3812 17.5 10.9375 17.5ZM11.4479 13.0764C11.4479 12.7945 11.2194 12.566 10.9375 12.566C10.6556 12.566 10.4271 12.7945 10.4271 13.0764V13.9271H9.57639C9.29449 13.9271 9.06597 14.1556 9.06597 14.4375C9.06597 14.7194 9.29449 14.9479 9.57639 14.9479H10.4271V15.7986C10.4271 16.0805 10.6556 16.309 10.9375 16.309C11.2194 16.309 11.4479 16.0805 11.4479 15.7986V14.9479H12.2986C12.5805 14.9479 12.809 14.7194 12.809 14.4375C12.809 14.1556 12.5805 13.9271 12.2986 13.9271H11.4479V13.0764Z" fill="currentColor"/>
        <path d="M10.2184 10.0649C9.80448 10.07 9.41865 10.085 9.08243 10.1303C8.51991 10.2059 7.90419 10.3866 7.39543 10.8954C6.88667 11.4042 6.70591 12.0199 6.63028 12.5824C6.56232 13.0879 6.56241 13.7055 6.56251 14.3623V14.5127C6.56241 15.1694 6.56232 15.7871 6.63028 16.2926C6.68335 16.6873 6.78819 17.1082 7.0218 17.5C7.01454 17.5 7.00727 17.5 7 17.5C0 17.5 0 15.7371 0 13.5625C0 11.3879 3.13401 9.625 7 9.625C8.16041 9.625 9.25487 9.78383 10.2184 10.0649Z" fill="currentColor"/>
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
          <div className="flex items-center gap-5.5">
            <div className="w-[63px] h-[63px] rounded-full bg-[var(--signal-avatar-bg,#064b34)] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-base font-acid font-medium">{initials}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gfx-neutral-500 text-base font-acid font-medium leading-tight">{username}</p>
              <span className="text-white text-base font-acid font-medium leading-tight">{tag}</span>
            </div>
          </div>
          <FollowButton following={following} onClick={onFollow} />
        </div>

        {/* Trading Pair */}
        <div className="flex items-center gap-[7px]">
          {pairIcon}
          <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-white text-sm font-acid font-medium">
            {pair}
          </span>
        </div>

        {/* P&L Chart */}
        <div className="border border-gfx-neutral-250 rounded-md p-4 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-gfx-neutral-400 text-sm font-acid font-medium mb-1">{pnlLabel}</p>
              <p className={`text-4xl font-acid leading-none ${isNegative ? 'text-gfx-red-muted' : 'text-gfx-green-500'}`}>
                {isNegative ? '-' : '+'}${Math.abs(pnl).toFixed(2)}
              </p>
            </div>
            <span className="border border-gfx-neutral-250 rounded-full px-3 py-1 text-gfx-neutral-400 text-xs font-acid font-medium">
              {trades} trades
            </span>
          </div>
          <div className="mt-1">
            <PnlMiniChart data={chartData} negative={isNegative} />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 border border-gfx-neutral-250 rounded-md overflow-hidden">
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-base font-acid font-medium">{pricePerMonth}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Price/mo</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5 border-x border-gfx-neutral-250">
            <span className="text-white text-base font-acid font-medium">{profitShare}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Profit Share</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5">
            <span className="text-white text-base font-acid font-medium">{followers}</span>
            <span className="text-gfx-neutral-400 text-base font-acid font-medium">Followers</span>
          </div>
        </div>

        {/* View Strategy */}
        <SparkleButton fullWidth className="px-5" onClick={onViewStrategy}>
          <span className="flex items-center justify-center text-gfx-neutral-550">View Strategy</span>
        </SparkleButton>
      </div>
    </div>
  )
}
