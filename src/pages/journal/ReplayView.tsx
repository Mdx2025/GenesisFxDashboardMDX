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
      <div className="flex flex-col items-center pt-0 pb-8 px-9 h-[419px]">
        {/* Illustration */}
        <div className="relative w-[240px] h-[240px] flex items-center justify-center shrink-0">
          <div className="absolute w-[380px] h-[214px] rounded-full bg-[#064b34] blur-[80px] opacity-30 top-[20px]" aria-hidden="true" />
          <img
            src={illustration}
            alt={title}
            className="relative w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h4 className="text-white text-[16px] font-acid font-medium text-center -mt-2">{title}</h4>

        {/* Description */}
        <p className="text-[#808080] text-[14px] font-acid text-center mt-3 max-w-[360px] leading-[18px]">
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
            <div className="w-full max-w-[387px] h-[44px] rounded-[300px] border border-[#303030] flex items-center justify-center">
              <span className="text-[#606060] text-[14px] font-acid">Coming soon</span>
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
        <GlowEllipse variant="purple" className="left-[-20px] top-[-20px]" />
        <div className="relative flex items-center justify-between px-6 py-7">
          <div>
            <h3 className="text-white text-[24px] font-acid font-normal leading-tight">
              Replay Your Trades
            </h3>
            <p className="text-[#808080] text-[14px] font-acid mt-1">
              Relive and analyze your trading sessions with interactive playback
            </p>
          </div>
          <button className="flex items-center gap-3 h-[44px] px-3 pr-5 rounded-[12px] bg-[#0c1311] hover:bg-[#111816] transition-colors cursor-pointer border-0">
            <QuestionIcon />
            <span className="text-white text-[14px] font-acid">How it works</span>
          </button>
        </div>
      </GlassCard>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReplayCard
          title="Trade Replay"
          description="Replay individual trades candle-by-candle with entry/exit markers and P&L tracking"
          illustration="/images/replay/trade-replay.png"
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
          illustration="/images/replay/account-replay.png"
        />
      </div>
    </div>
  )
}
