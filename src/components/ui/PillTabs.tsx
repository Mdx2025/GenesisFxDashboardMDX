import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './PillTabs.css'

interface PillTabsProps {
  options: string[]
  activeIndex: number
  onChange: (index: number) => void
  className?: string
}

// Unlike ModeToggle, tabs hug their label width instead of splitting the bar
// into equal columns — the Figma bar has six labels of very different lengths.
export function PillTabs({ options, activeIndex, onChange, className = '' }: PillTabsProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      const active = listRef.current?.children[activeIndex + 1] as HTMLElement | undefined
      if (active) setIndicator({ left: active.offsetLeft, width: active.offsetWidth })
    }
    measure()
    // Web fonts land after first paint and shift every label width.
    document.fonts?.ready.then(measure).catch(() => {})
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeIndex, options])

  useEffect(() => {
    const active = listRef.current?.children[activeIndex + 1] as HTMLElement | undefined
    active?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }, [activeIndex])

  return (
    <div ref={listRef} role="tablist" className={`pill-tabs ${className}`}>
      <div
        className="pill-tabs-indicator"
        style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
      >
        <div className="fading-border" />
        <div className="pill-tabs-glow" />
      </div>
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          className={index === activeIndex ? 'active font-acid' : 'font-acid'}
          onClick={() => onChange(index)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
