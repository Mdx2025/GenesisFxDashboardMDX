import { useState } from 'react'
import { GlassCard } from '@/components/ui'
import { tradeSessions } from '@/data/tradeSessions'
import type { TradeSession } from '@/data/tradeSessions'
import { TradingGlobe } from '@/components/globe/TradingGlobe'

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

/* ─── Session Card ─── */

function SessionCard({ session, isActive, onClick }: { session: TradeSession; isActive?: boolean; onClick?: () => void }) {
  const isOpen = session.status === 'open'

  return (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={e => e.key === 'Enter' && onClick?.()} className="cursor-pointer">
    <GlassCard
      variant="light"
      divider="none"
      rounded="19px"
      className={`overflow-hidden clip-radius relative transition-all duration-300 ${isActive ? '!border-gfx-green-300/30 -translate-y-1' : ''} ${isOpen ? '!border-gfx-green-300/30' : ''}`}
    >
      {(isOpen || isActive) && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gfx-green-200/40 via-transparent to-transparent pointer-events-none" />
          <div className="theme-decorative-glow absolute -right-16 -bottom-8 w-[234px] h-[217px] rounded-full bg-gfx-green-glow/8 blur-[40px] mix-blend-screen pointer-events-none" />
        </>
      )}

      {isActive && (
        <div
          className="absolute inset-0 z-[-1] rounded-[inherit] pointer-events-none transition-opacity duration-500"
          style={{
            background: `url("/images/sessions/session_card_bck.webp") center / cover no-repeat, rgba(4, 33, 24, 0.85)`,
          }}
        />
      )}

      <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col gap-3 h-[218px]">
        <div className="flex items-start justify-between">
          <h3 className={`text-white font-acid leading-none ${isOpen ? 'text-3xl' : 'text-4xl'}`}>
            {session.city}
          </h3>
          {isOpen ? (
            <span className="px-3 py-3 rounded-full bg-gfx-green-900 text-gfx-neutral-600 text-base font-acid leading-none">
              OPEN
            </span>
          ) : (
            <span className="text-gfx-neutral-400 text-xl font-acid leading-5">CLOSED</span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          <img src="/images/sessions/clock.svg" alt="" className="w-4 h-4" aria-hidden="true" />
          <span className="text-gfx-neutral-400 text-2xl font-acid leading-none">{session.time}</span>
        </div>

        <span className="text-gfx-green-300 text-2xl font-acid leading-none mt-auto">
          {session.countdownLabel}: {session.countdown}
        </span>
      </div>

    </GlassCard>
    </div>
  )
}

/* ─── Active Session Floating Pill ─── */

function ActiveSessionPill({ city }: { city: string }) {
  return (
    <div
      className="inline-flex items-center gap-3.5 px-4.5 py-2.5 rounded-2xl backdrop-blur-[4.05px]"
      style={{
        background:
          'radial-gradient(ellipse 88.35% 307.01% at 65.73% 3.01%, rgba(8, 18, 15, 0.50) 19%, rgba(17, 31, 27, 0.50) 73%)',
      }}
    >
      <div className="relative w-[47px] h-[47px]">
        <svg className="absolute inset-0" width="47" height="47" viewBox="0 0 47 47" fill="none">
          <g filter="url(#pill-ring)">
            <circle cx="23.2" cy="23.2" r="20" stroke="#CFF2E6" />
          </g>
          <defs>
            <filter id="pill-ring" x="0" y="0" width="46.4" height="46.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="1.35" result="blur" />
            </filter>
          </defs>
        </svg>
        <svg className="absolute inset-0 m-auto" width="39" height="39" viewBox="0 0 39 39" fill="none">
          <g filter="url(#pill-glow)">
            <circle cx="19.1" cy="19.1" r="14.5" fill="#064B34" />
          </g>
          <defs>
            <filter id="pill-glow" x="0" y="0" width="38.2" height="38.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="2.3" result="blur" />
            </filter>
          </defs>
        </svg>
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="9" height="9" viewBox="0 0 9 9" fill="none">
          <circle cx="4.5" cy="4.5" r="4.5" fill="#CFF2E6" />
        </svg>
      </div>
      <span className="text-gfx-neutral-600 text-lg font-acid leading-none">{city}</span>
    </div>
  )
}

/* ─── Main Component ─── */

export default function TradeSessionsView() {
  const activeSessions = tradeSessions.filter(s => s.status === 'open')
  const activeCount = activeSessions.length
  const [focusedId, setFocusedId] = useState<string>('')

  return (
    <div className="relative w-full min-h-[700px] overflow-hidden">
      {/* 3D Globe background */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] aspect-square z-0">
        <TradingGlobe sessions={tradeSessions} onSessionFocus={setFocusedId} />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="trade-sessions-bottom-fade absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none z-base"
        data-trade-sessions-bottom-fade
      />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[430px_1fr_430px] gap-5 items-start px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 lg:order-2 lg:pt-6 mb-6 lg:mb-0">
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-acid leading-none">
            Trading Sessions
          </h2>
          <p className="text-gfx-neutral-400 text-base font-acid font-medium">
            Real-time market session status with liquidity flow visualization
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <GlobeIcon />
              <span className="text-gfx-neutral-400 text-sm font-acid leading-5">Global Markets</span>
            </div>
            <div className="flex items-center gap-2">
              <NetworkIcon />
              <span className="text-gfx-neutral-400 text-sm font-acid leading-5">
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

        {/* Left column: Sydney + Tokyo */}
        <div className="hidden lg:flex flex-col gap-5 lg:order-1">
          <SessionCard session={tradeSessions[0]} isActive={focusedId === tradeSessions[0].id} onClick={() => setFocusedId(tradeSessions[0].id)} />
          <SessionCard session={tradeSessions[2]} isActive={focusedId === tradeSessions[2].id} onClick={() => setFocusedId(tradeSessions[2].id)} />
        </div>

        {/* Right column: New York + London */}
        <div className="hidden lg:flex flex-col gap-5 lg:order-3">
          <SessionCard session={tradeSessions[1]} isActive={focusedId === tradeSessions[1].id} onClick={() => setFocusedId(tradeSessions[1].id)} />
          <SessionCard session={tradeSessions[3]} isActive={focusedId === tradeSessions[3].id} onClick={() => setFocusedId(tradeSessions[3].id)} />
        </div>

        {/* Mobile: 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:hidden">
          {tradeSessions.map(session => (
            <SessionCard key={session.city} session={session} isActive={focusedId === session.id} onClick={() => setFocusedId(session.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}
