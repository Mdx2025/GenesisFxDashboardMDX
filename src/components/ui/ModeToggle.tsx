import { useState } from 'react'
import './ModeToggle.css'

interface ModeToggleProps {
  options?: string[]
  defaultIndex?: number
}

export function ModeToggle({ options = ['Client', 'Partner'], defaultIndex = 0 }: ModeToggleProps) {
  const [active, setActive] = useState(defaultIndex)

  return (
    <div className="mode-toggle" role="group" aria-label="Mode selection">
      {options.map((option, i) => (
        <button
          key={option}
          className={active === i ? 'active' : ''}
          onClick={() => setActive(i)}
          aria-pressed={active === i}
        >
          <span className="btn-label">{option}</span>
          {active === i && (
            <>
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
            </>
          )}
        </button>
      ))}
    </div>
  )
}
