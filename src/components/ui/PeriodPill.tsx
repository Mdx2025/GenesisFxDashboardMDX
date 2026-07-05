import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { CalendarIcon } from '@/components/icons'

interface PeriodPillProps {
  periods?: string[]
  defaultActive?: string
}

export function PeriodPill({ periods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'], defaultActive = 'ALL' }: PeriodPillProps) {
  const [selected, setSelected] = useState(defaultActive)
  const containerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    const idx = periods.indexOf(selected)
    const btn = buttonRefs.current[idx]
    const container = containerRef.current
    const indicator = indicatorRef.current
    if (!btn || !container || !indicator) return

    const containerRect = container.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const left = btnRect.left - containerRect.left
    const width = btnRect.width

    if (isFirst.current) {
      gsap.set(indicator, { x: left, width })
      isFirst.current = false
    } else {
      gsap.to(indicator, {
        x: left,
        width,
        duration: 0.35,
        ease: 'power2.inOut',
      })
    }
  }, [selected, periods])

  return (
    <div ref={containerRef} className="inline-flex items-center gap-1 bg-[rgba(255,255,255,0.04)] rounded-full py-1 px-2 relative overflow-hidden">
      <div
        ref={indicatorRef}
        className="absolute top-1 bottom-1 rounded-full pointer-events-none"
        style={{
          background: 'rgba(0, 240, 160, 0.15)',
          boxShadow: 'inset 0 0 0 0.5px #00F0A0',
        }}
        aria-hidden="true"
      >
        <svg className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] pointer-events-none" width="54" height="33" viewBox="0 0 54 33" fill="none" aria-hidden="true">
          <ellipse cx="27" cy="35" rx="14.5" ry="8" fill="#55FFC7" filter="blur(20px)" />
        </svg>
      </div>
      {periods.map((p, i) => (
        <button
          key={p}
          ref={(el) => { buttonRefs.current[i] = el }}
          onClick={() => setSelected(p)}
          className={`relative px-3 py-1 rounded-full text-xs cursor-pointer z-[1] transition-colors ${
            selected === p ? 'text-white' : 'text-gfx-neutral-300 hover:text-white'
          }`}
        >
          {p}
        </button>
      ))}
      <button className="p-1.5 text-gfx-neutral-300 hover:text-white transition-colors cursor-pointer z-[1]" aria-label="Calendar">
        <CalendarIcon size={18} />
      </button>
    </div>
  )
}
