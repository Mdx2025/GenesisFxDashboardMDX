import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface ButtonGlowProps {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

const BORDER_LIGHT_BG =
  'linear-gradient(transparent,transparent) padding-box, linear-gradient(103.7deg, rgba(188,155,143,0.1) 38.66%, rgba(233,132,99,0.1) 68.55%, rgb(233,132,99) 85.01%, rgb(255,255,255) 92.12%) border-box'

const GLOW_RING_BG =
  'linear-gradient(transparent,transparent) padding-box, linear-gradient(91.96deg, rgba(255,177,153,0) 6.11%, rgba(255,177,153,0.2) 53.57%, rgb(255,121,80) 93.6%) border-box'

const BLUR_SOFT_BG =
  'linear-gradient(transparent,transparent) padding-box, linear-gradient(97.68deg, rgba(255,177,153,0) 38.1%, rgba(255,177,153,0.2) 82.47%, rgb(255,121,80) 93.3%) border-box'

const BLUR_HEAVY_BG =
  'linear-gradient(transparent,transparent) padding-box, linear-gradient(91.88deg, rgba(255,137,100,0.2) 46.45%, rgb(205,49,0) 98.59%) border-box'

const INNER_ORB_BG =
  'radial-gradient(50% 50% at 50% 50%, #FFFFF5 3.5%, #FFAA81 26.5%, #FFDA9F 37.5%, rgba(255,170,129,0.5) 49%, rgba(210,106,58,0) 92.5%)'

const INNER_DIFFUSE_BG =
  'radial-gradient(43.3% 44.23% at 50% 49.51%, #FFFFF7 29%, #FFFACD 48.5%, #F4D2BF 60.71%, rgba(214,211,209,0) 100%)'

function GlowBorder({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 rounded-full will-change-transform pointer-events-none"
      style={{
        width: 'calc(100% + 9px)',
        height: 'calc(100% + 9px)',
        transform: 'translate(-50%,-50%)',
        border: '3px solid transparent',
        ...style,
      }}
    >
      {/* blur-soft (replaces ::before) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: '-2px',
          border: '2px solid transparent',
          background: BLUR_SOFT_BG,
          filter: 'url(#blur-2)',
          zIndex: 10,
          boxSizing: 'content-box',
          width: '100%',
          height: '100%',
          borderRadius: '9999px',
        }}
        aria-hidden="true"
      />
      {/* blur-heavy (replaces ::after) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: '-3px',
          border: '3px solid transparent',
          background: BLUR_HEAVY_BG,
          filter: 'url(#blur-6)',
          zIndex: 20,
          boxSizing: 'content-box',
          width: '100%',
          height: '100%',
          borderRadius: '9999px',
        }}
        aria-hidden="true"
      />
      {/* border-button-light */}
      <div
        className="relative h-full w-full rounded-full"
        style={{
          border: '1px solid transparent',
          background: BORDER_LIGHT_BG,
        }}
      >
        {/* glow-ring (replaces border-button-light::before) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-2px',
            border: '2px solid transparent',
            background: GLOW_RING_BG,
            filter: 'url(#blur-7)',
            zIndex: 30,
            boxSizing: 'content-box',
            width: '100%',
            height: '100%',
            borderRadius: '9999px',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export function ButtonGlow({ children, className = '', onClick }: ButtonGlowProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const glowARef = useRef<HTMLDivElement>(null)
  const glowBRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const innerXTo = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (!innerRef.current) return
    innerXTo.current = gsap.quickTo(innerRef.current, 'x', {
      duration: 0.35,
      ease: 'power3.out',
    })
  }, [])

  const onMove = (e: React.MouseEvent) => {
    const wrap = wrapperRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI)
    const isLeft = e.clientX < cx

    gsap.to(glowARef.current, {
      rotation: angle,
      opacity: isLeft ? 0 : 1,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    gsap.to(glowBRef.current, {
      rotation: angle,
      opacity: isLeft ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    const relX = e.clientX - rect.left
    innerXTo.current?.(relX - rect.width / 2)
  }

  const onEnter = (e: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const angle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - cx) * (180 / Math.PI)
    const isLeft = e.clientX < cx

    gsap.set(glowARef.current, { rotation: angle })
    gsap.set(glowBRef.current, { rotation: angle })
    gsap.to(glowARef.current, { opacity: isLeft ? 0 : 1, duration: 0.2, overwrite: true })
    gsap.to(glowBRef.current, { opacity: isLeft ? 1 : 0, duration: 0.2, overwrite: true })
    gsap.to(innerRef.current, { opacity: 1, duration: 0.25, overwrite: true })

    const relX = e.clientX - rect.left
    gsap.set(innerRef.current, { x: relX - rect.width / 2 })
  }

  const onLeave = () => {
    gsap.to(glowARef.current, { opacity: 0, duration: 0.4, overwrite: true })
    gsap.to(glowBRef.current, { opacity: 0, duration: 0.4, overwrite: true })
    gsap.to(innerRef.current, { opacity: 0, duration: 0.4, overwrite: true })
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative inline-flex items-center cursor-pointer ${className}`}
    >
      {/* button face */}
      <a
        role="button"
        onClick={onClick}
        className="relative overflow-hidden rounded-full uppercase font-bold flex items-center justify-center text-sm tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gfx-green-500"
        style={{
          background: 'rgb(209,209,209)',
          border: '1px solid rgba(255,255,255,0.6)',
          padding: '0 64px',
          height: '40px',
          color: '#5A250A',
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children ?? (
            <>
              SEE IN ACTION
              <svg width="17" height="9" viewBox="0 0 17 9" fill="none" aria-hidden="true">
                <path d="M12.5 0.5L16 4.5M16 4.5L12.5 8.5M16 4.5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </span>

        {/* inner glow container — follows cursor X, behind text */}
        <div
          ref={innerRef}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{ width: '204px', height: '0px', zIndex: -1, opacity: 0, left: '50%', top: '50%', marginLeft: '-102px' }}
        >
          {/* focused orb */}
          <div
            className="absolute"
            style={{
              width: '121px',
              height: '121px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              background: INNER_ORB_BG,
            }}
            aria-hidden="true"
          />
          {/* diffuse glow */}
          <div
            className="absolute"
            style={{
              width: '204px',
              height: '103px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              background: INNER_DIFFUSE_BG,
              filter: 'url(#blur-5)',
            }}
            aria-hidden="true"
          />
        </div>
      </a>

      {/* border glow A — default (glow concentrated on right) */}
      <div ref={glowARef} style={{ position: 'absolute', inset: '-4px', opacity: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: '9999px' }} aria-hidden="true">
        <GlowBorder />
      </div>

      {/* border glow B — mirrored (glow concentrated on left) */}
      <div ref={glowBRef} style={{ position: 'absolute', inset: '-4px', opacity: 0, pointerEvents: 'none', transform: 'scaleX(-1)', overflow: 'hidden', borderRadius: '9999px' }} aria-hidden="true">
        <GlowBorder />
      </div>
    </div>
  )
}
