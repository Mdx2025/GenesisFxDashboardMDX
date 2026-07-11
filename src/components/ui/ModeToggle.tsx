import { useState, useRef, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import './ModeToggle.css'

const OPTION_ICONS: Record<string, (color: string) => ReactNode> = {
  Client: (color) => (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="4.5" r="3" fill={color} />
      <ellipse cx="9" cy="12.75" rx="5.25" ry="3" fill={color} />
    </svg>
  ),
  Partner: (color) => (
    <svg width="16" height="16" viewBox="0 0 20 18" fill="none">
      <circle cx="7" cy="4.5" r="2.8" fill={color} />
      <ellipse cx="7" cy="12.5" rx="4.5" ry="2.8" fill={color} />
      <circle cx="14" cy="5.5" r="2.2" fill={color} opacity="0.55" />
      <ellipse cx="14" cy="13" rx="3.5" ry="2.2" fill={color} opacity="0.55" />
    </svg>
  ),
}

interface ModeToggleProps {
  options?: string[]
  defaultIndex?: number
  activeIndex?: number
  onChange?: (index: number) => void
  size?: 'default' | 'sm'
}

export function ModeToggle({ options = ['Client', 'Partner'], defaultIndex = 0, activeIndex, onChange, size = 'default' }: ModeToggleProps) {
  const [internalActive, setInternalActive] = useState(defaultIndex)
  const active = activeIndex ?? internalActive
  const indicatorRef = useRef<HTMLDivElement>(null)
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    if (!indicatorRef.current) return

    const xPct = active * 100

    if (isFirst.current) {
      gsap.set(indicatorRef.current, { xPercent: xPct })
      isFirst.current = false
    } else {
      gsap.to(indicatorRef.current, {
        xPercent: xPct,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }, [active])

  return (
    <div className={`mode-toggle${size === 'sm' ? ' mode-toggle-sm' : ''}`} role="group" aria-label="Mode selection">
      <div
        ref={indicatorRef}
        className="mode-indicator"
        style={{ width: `${100 / options.length}%` }} /* dynamic */
        aria-hidden="true"
      >
        <div className="glow-emerald-mode" aria-hidden="true" />
        <div className="fading-border" aria-hidden="true" />
        <svg className="absolute" style={{ left: '78%', top: '60%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute opacity-50" style={{ left: '67%', top: '72%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '40%', top: '10%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '55%', top: '80%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '69%', top: '18%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '39%', top: '73%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '26%', top: '25%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#8C8C8C" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '10%', top: '64%' }} width="4" height="3" viewBox="0 0 4 3" fill="none" aria-hidden="true">
          <ellipse cx="2" cy="1.5" rx="1" ry="0.5" fill="#8C8C8C" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <filter id="mt_sparkle" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
        </svg>
      </div>
      {options.map((option, i) => {
        const isActive = active === i
        const iconFn = OPTION_ICONS[option]
        return (
          <button
            key={option}
            className={isActive ? 'active' : ''}
            onClick={() => { setInternalActive(i); onChange?.(i) }}
            aria-pressed={isActive}
          >
            {iconFn && <span className="btn-icon">{iconFn(isActive ? '#fff' : '#606060')}</span>}
            <span className="btn-label">{option}</span>
          </button>
        )
      })}
    </div>
  )
}
