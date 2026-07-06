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
    const indicator = indicatorRef.current
    if (!btn || !indicator) return

    const place = (animate: boolean) => {
      const left = btn.offsetLeft
      const width = btn.offsetWidth
      if (animate) {
        gsap.to(indicator, { x: left, width, duration: 0.35, ease: 'power2.inOut' })
      } else {
        gsap.set(indicator, { x: left, width })
      }
    }

    if (isFirst.current) {
      place(false)
      document.fonts?.ready.then(() => place(false))
      isFirst.current = false
    } else {
      place(true)
    }
  }, [selected, periods])

  return (
    <div ref={containerRef} className="inline-flex items-center gap-1 bg-[rgba(255,255,255,0.04)] rounded-full py-1 px-2 relative overflow-hidden">
      <div
        ref={indicatorRef}
        className="absolute left-0 top-1 bottom-1 rounded-full pointer-events-none bg-[rgba(0,240,160,0.15)]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-full border-[0.5px] border-gfx-green-glow [mask:linear-gradient(to_bottom,black_0%,transparent_60%)] [-webkit-mask:linear-gradient(to_bottom,black_0%,transparent_60%)]"
        />
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
