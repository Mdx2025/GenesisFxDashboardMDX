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
}

export function ModeToggle({ options = ['Client', 'Partner'], defaultIndex = 0, activeIndex, onChange }: ModeToggleProps) {
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
        duration: 0.4,
        ease: 'power2.inOut',
      })
    }
  }, [active])

  return (
    <div className="mode-toggle" role="group" aria-label="Mode selection">
      <div
        ref={indicatorRef}
        className="mode-indicator"
        style={{ width: `${100 / options.length}%` }} /* dynamic */
        aria-hidden="true"
      >
        <div className="glow-emerald-mode" aria-hidden="true" />
        <div className="fading-border" aria-hidden="true" />
        <div className="star star-m1" aria-hidden="true" />
        <div className="star star-m2" aria-hidden="true" />
        <div className="star star-m3" aria-hidden="true" />
        <div className="star star-m4" aria-hidden="true" />
        <div className="star star-m5" aria-hidden="true" />
        <div className="star star-m6" aria-hidden="true" />
        <div className="star star-m7" aria-hidden="true" />
        <div className="star star-m8" aria-hidden="true" />
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
