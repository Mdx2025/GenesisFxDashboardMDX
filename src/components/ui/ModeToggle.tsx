import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import './ModeToggle.css'

interface ModeToggleProps {
  options?: string[]
  defaultIndex?: number
}

export function ModeToggle({ options = ['Client', 'Partner'], defaultIndex = 0 }: ModeToggleProps) {
  const [active, setActive] = useState(defaultIndex)
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
        style={{ width: `${100 / options.length}%` }}
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
      {options.map((option, i) => (
        <button
          key={option}
          className={active === i ? 'active' : ''}
          onClick={() => setActive(i)}
          aria-pressed={active === i}
        >
          <span className="btn-label">{option}</span>
        </button>
      ))}
    </div>
  )
}
