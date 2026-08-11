import { GlassCard, GlowEllipse, GlowButton } from '@/components/ui'

/* ─── Icons ─── */

function QuestionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="white" />
      <path d="M9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5C14.5 10.88 13.38 12 12 12V13" stroke="#0c1311" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.75" fill="#0c1311" />
    </svg>
  )
}

/* ─── Replay Card ─── */

interface ReplayCardProps {
  title: string
  description: string
  illustration: string
  active?: boolean
}

function ReplayCard({ title, description, illustration, active }: ReplayCardProps) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden flex-1 min-w-0">
      <div className="flex flex-col items-center pt-0 pb-8 px-9 h-[26.1875rem]">
        {/* Illustration */}
        <div className="relative w-[15rem] h-[15rem] flex items-center justify-center shrink-0">
          <div className="absolute w-[23.7500rem] h-[13.3750rem] rounded-full bg-gfx-green-200 [filter:url(#blur-80)] opacity-30 top-[1.25rem]" aria-hidden="true" />
          <img
            src={illustration}
            alt={title}
            className="relative w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h4 className="text-white text-base font-acid font-medium text-center -mt-2">{title}</h4>

        {/* Description */}
        <p className="text-gfx-neutral-400 text-sm font-acid text-center mt-3 max-w-[22.5000rem] leading-5">
          {description}
        </p>

        {/* Button */}
        <div className="mt-auto w-full flex justify-center">
          {active ? (
            <GlowButton
              label="Select trade"
              width="100%"
              height={44}
              radius={300}
            />
          ) : (
            <div className="w-full max-w-[24.1875rem] h-11 rounded-full border border-gfx-neutral-250 flex items-center justify-center">
              <span className="text-gfx-neutral-500 text-sm font-acid">Coming soon</span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Main Component ─── */

export default function ReplayView() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header Card */}
      <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
        <GlowEllipse className="left-[10%] top-[-20%]" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-6 sm:py-10">
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-acid font-normal leading-tight">
              Replay Your Trades
            </h3>
            <p className="text-gfx-neutral-400 text-sm font-acid mt-1">
              Relive and analyze your trading sessions with interactive playback
            </p>
          </div>
          <button className="flex items-center gap-3 h-11 px-3 pr-5 rounded-sm bg-transparent transition-colors cursor-pointer border border-gfx-neutral-250">
            <QuestionIcon />
            <span className="text-white text-sm font-acid">How it works</span>
          </button>
        </div>
      </GlassCard>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ReplayCard
          title="Trade Replay"
          description="Replay individual trades candle-by-candle with entry/exit markers and P&L tracking"
          illustration="/images/replay/trade-replay-v2.png"
          active
        />
        <ReplayCard
          title="Day Replay"
          description="Replay an entire trading day to review all your trades and market movements"
          illustration="/images/replay/day-replay.png"
        />
        <ReplayCard
          title="Account Replay"
          description="Replay your complete account history from the beginning"
          illustration="/images/replay/account-replay.webp"
        />
      </div>
    </div>
  )
}
