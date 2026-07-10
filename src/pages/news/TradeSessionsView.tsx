import { GlassCard } from '@/components/ui'
import { tradeSessions } from '@/data/tradeSessions'
import type { TradeSession } from '@/data/tradeSessions'

/* ─── Icons ─── */

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#808080" strokeWidth="1.5" />
      <path d="M12 7V12L15 15" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#808080" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#808080" strokeWidth="1.5" />
      <path d="M3 12H21" stroke="#808080" strokeWidth="1.5" />
      <path d="M3 8H21" stroke="#808080" strokeWidth="0.8" opacity="0.5" />
      <path d="M3 16H21" stroke="#808080" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

function NetworkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2" stroke="#808080" strokeWidth="1.5" />
      <circle cx="5" cy="19" r="2" stroke="#808080" strokeWidth="1.5" />
      <circle cx="19" cy="19" r="2" stroke="#808080" strokeWidth="1.5" />
      <path d="M12 7V12M12 12L5 17M12 12L19 17" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Session Card ─── */

function SessionCard({ session }: { session: TradeSession }) {
  const isOpen = session.status === 'open'

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className={`overflow-hidden relative ${isOpen ? 'border border-gfx-green-500/20' : ''}`}>
      {isOpen && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#064b34]/30 to-transparent pointer-events-none" />
      )}
      <div className="relative p-10 flex flex-col gap-4 h-[218px]">
        <div className="flex items-start justify-between">
          <h3 className="text-white text-[36px] font-acid leading-none">{session.city}</h3>
          <div className="flex items-center">
            {isOpen ? (
              <span className="px-4 py-2.5 rounded-full bg-[#09241c] text-[#ececec] text-[16px] font-acid">
                OPEN
              </span>
            ) : (
              <span className="text-[#808080] text-[20px] font-acid">CLOSED</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ClockIcon />
          <span className="text-[#808080] text-[24px] font-acid">{session.time}</span>
        </div>

        <span className="text-[#00b38c] text-[24px] font-acid">
          {session.countdownLabel}: {session.countdown}
        </span>
      </div>
    </GlassCard>
  )
}

/* ─── Main Component ─── */

export default function TradeSessionsView() {
  const activeSessions = tradeSessions.filter(s => s.status === 'open').length

  return (
    <div className="flex flex-col items-center gap-8 relative">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-white text-[60px] font-acid leading-none">Trading Sessions</h2>
        <p className="text-[#808080] text-[16px] font-acid">
          Real-time market session status with liquidity flow visualization
        </p>

        {/* Status badges */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <GlobeIcon />
            <span className="text-[#808080] text-[14px] font-acid">Global Markets</span>
          </div>
          <div className="flex items-center gap-2">
            <NetworkIcon />
            <span className="text-[#808080] text-[14px] font-acid">{activeSessions} Active Sessions</span>
          </div>
        </div>
      </div>

      {/* Session Cards Grid */}
      <div className="grid grid-cols-2 gap-5 w-full max-w-[900px] relative z-10">
        {tradeSessions.map(session => (
          <SessionCard key={session.city} session={session} />
        ))}
      </div>

      {/* Globe background */}
      <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] pointer-events-none z-0 opacity-80">
        <img
          src="/images/sessions/globe.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Floating active session pill */}
      {tradeSessions.filter(s => s.status === 'open').map(s => (
        <div key={s.city} className="absolute top-[380px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#08120f]/50 backdrop-blur-sm border border-white/5">
          <div className="w-[41px] h-[41px] rounded-full bg-gfx-green-500/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-gfx-green-500 shadow-[0_0_8px_rgba(0,240,160,0.5)]" />
          </div>
          <span className="text-[#ececec] text-[18px] font-acid">{s.city}</span>
        </div>
      ))}
    </div>
  )
}
