import { GlassCard } from '@/components/ui'
import { tradeSessions } from '@/data/tradeSessions'
import type { TradeSession } from '@/data/tradeSessions'

/* ─── Icons ─── */

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

function SessionStatusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L12 22" stroke="#064b34" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 9L12 2L19 9" stroke="#064b34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Session Card ─── */

function SessionCard({ session }: { session: TradeSession }) {
  const isOpen = session.status === 'open'

  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="19px"
      className={`overflow-hidden relative ${isOpen ? '!border-gfx-green-300/30' : ''}`}
    >
      {/* Glow effect for open sessions */}
      {isOpen && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#064b34]/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -right-16 -bottom-8 w-[234px] h-[217px] rounded-full bg-[#00f0a0]/8 blur-[40px] mix-blend-screen pointer-events-none" />
        </>
      )}

      <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-3 h-[218px]">
        {/* Header: City + Status */}
        <div className="flex items-start justify-between">
          <h3 className={`text-white font-acid leading-none ${isOpen ? 'text-[30px]' : 'text-[36px]'}`}>
            {session.city}
          </h3>
          {isOpen ? (
            <span className="px-3 py-3 rounded-full bg-[#09241c] text-[#ececec] text-[16px] font-acid leading-none">
              OPEN
            </span>
          ) : (
            <span className="text-[#808080] text-[20px] font-acid leading-[20px]">CLOSED</span>
          )}
        </div>

        {/* Time */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-[#808080] text-[24px] font-acid leading-none">{session.time}</span>
        </div>

        {/* Countdown */}
        <span className="text-[#00b38c] text-[24px] font-acid leading-none mt-auto">
          {session.countdownLabel}: {session.countdown}
        </span>
      </div>

      {/* Status indicator line */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30">
        <SessionStatusIcon />
      </div>
    </GlassCard>
  )
}

/* ─── Active Session Floating Pill ─── */

function ActiveSessionPill({ city }: { city: string }) {
  return (
    <div className="flex items-center gap-3.5 px-[18px] py-2.5 rounded-full backdrop-blur-[4px] bg-stat-pill border border-white/5">
      <div className="relative w-[41px] h-[41px]">
        <div className="absolute inset-0 rounded-full bg-[#00f0a0]/15 animate-pulse" />
        <div className="absolute inset-[6px] rounded-full bg-[#00f0a0]/25" />
        <div className="absolute inset-[12px] rounded-full bg-[#00f0a0] shadow-glow-green" />
      </div>
      <span className="text-[#ececec] text-[18px] font-acid leading-none">{city}</span>
    </div>
  )
}

/* ─── Main Component ─── */

export default function TradeSessionsView() {
  const activeSessions = tradeSessions.filter(s => s.status === 'open')
  const activeCount = activeSessions.length

  return (
    <div className="relative w-full min-h-[700px] overflow-hidden">
      {/* Globe background — centered behind everything */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] aspect-square pointer-events-none z-0">
        <img
          src="/images/sessions/globe.png"
          alt=""
          className="w-full h-full object-contain opacity-90"
        />
      </div>

      {/* Bottom gradient fade — blends globe into background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, #000705 20%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[430px_1fr_430px] gap-5 items-start pt-2 px-4">
        {/* Header — full width on mobile, center column on desktop */}
        <div className="flex flex-col items-center text-center gap-4 lg:order-2 lg:pt-6 mb-6 lg:mb-0">
          <h2 className="text-white text-[36px] sm:text-[48px] lg:text-[60px] font-acid leading-none">
            Trading Sessions
          </h2>
          <p className="text-[#808080] text-[16px] font-acid font-medium">
            Real-time market session status with liquidity flow visualization
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <GlobeIcon />
              <span className="text-[#808080] text-[14px] font-acid leading-[18.8px]">Global Markets</span>
            </div>
            <div className="flex items-center gap-2">
              <NetworkIcon />
              <span className="text-[#808080] text-[14px] font-acid leading-[18.8px]">
                {activeCount} Active Session{activeCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="mt-4">
            {activeSessions.map(s => (
              <ActiveSessionPill key={s.city} city={s.city} />
            ))}
          </div>
        </div>

        {/* Left column: Sydney + Tokyo — desktop only */}
        <div className="hidden lg:flex flex-col gap-5 lg:order-1">
          <SessionCard session={tradeSessions[0]} />
          <SessionCard session={tradeSessions[2]} />
        </div>

        {/* Right column: New York + London — desktop only */}
        <div className="hidden lg:flex flex-col gap-5 lg:order-3">
          <SessionCard session={tradeSessions[1]} />
          <SessionCard session={tradeSessions[3]} />
        </div>

        {/* Mobile/Tablet: 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:hidden">
          {tradeSessions.map(session => (
            <SessionCard key={session.city} session={session} />
          ))}
        </div>
      </div>
    </div>
  )
}
