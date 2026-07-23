import { useRef, useEffect, useCallback, useState } from 'react'
import type { TradingGlobeHandle, MarkerScreenPos } from './trading-globe'
import type { TradeSession } from '@/data/tradeSessions'

interface TradingGlobeProps {
  sessions: TradeSession[]
  onSessionFocus?: (id: string) => void
}

export function TradingGlobe({ sessions, onSessionFocus }: TradingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<TradingGlobeHandle | null>(null)
  const [pinPositions, setPinPositions] = useState<MarkerScreenPos[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false

    import('./trading-globe').then(({ initTradingGlobe }) => {
      if (disposed) return

      const markers = sessions.map(s => ({
        id: s.id,
        lat: s.lat,
        lon: s.lon,
      }))

      const openSession = sessions.find(s => s.status === 'open')

      const handle = initTradingGlobe(canvas, markers, {
        autoCycleMs: 5000,
        initialId: openSession?.id ?? sessions[0]?.id ?? 'newYork',
        loop: true,
      })

      handleRef.current = handle

      handle.onFocusChange((id) => {
        setActiveId(id)
        onSessionFocus?.(id)
      })

      handle.onFrame((positions) => {
        setPinPositions(positions)
      })
    })

    return () => {
      disposed = true
      handleRef.current?.dispose()
      handleRef.current = null
    }
  }, [sessions, onSessionFocus])

  const focusSession = useCallback((id: string) => {
    handleRef.current?.focus(id)
  }, [])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* HTML pin overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {pinPositions.map(pos => {
          const session = sessions.find(s => s.id === pos.id)
          if (!session) return null

          const isActive = pos.id === activeId
          const isNear = pos.facing > (isActive ? 0.45 : 0.6)

          return (
            <button
              key={pos.id}
              type="button"
              className="absolute top-0 left-0 inline-flex items-center rounded-full border border-transparent backdrop-blur-[6px] pointer-events-auto cursor-pointer transition-all duration-300"
              style={{
                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
                opacity: pos.visible ? 1 : 0,
                pointerEvents: pos.visible ? 'auto' : 'none',
                height: '2.5rem',
                paddingInline: '0.75rem',
                background: isNear
                  ? isActive ? 'rgba(4, 33, 24, 0.85)' : 'rgba(4, 20, 15, 0.72)'
                  : 'rgba(4, 20, 15, 0)',
                borderColor: 'transparent',
              }}
              onClick={() => focusSession(pos.id)}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#064b34' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent' }}
            >
              <span className="relative flex-shrink-0 inline-flex w-6 h-6">
                <img
                  src="/images/sessions/location_icon.svg"
                  alt=""
                  className="w-full h-full"
                  aria-hidden="true"
                />
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full border-[1.5px] border-gfx-green-300 animate-ping"
                    style={{ animationDuration: '1.8s' }}
                  />
                )}
              </span>
              <span
                className="text-white font-acid text-sm leading-[120%] select-none origin-left transition-all duration-400"
                style={{
                  maxWidth: isNear ? '10rem' : 0,
                  marginLeft: isNear ? '0.4rem' : 0,
                  opacity: isNear ? 1 : 0,
                  transform: isNear ? 'scale(1)' : 'scale(0.5)',
                  overflow: 'hidden',
                }}
              >
                {session.city}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
