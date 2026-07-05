import { useState } from 'react'
import { CalendarIcon } from '@/components/icons'

interface PeriodPillProps {
  periods?: string[]
  defaultActive?: string
}

export function PeriodPill({ periods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'], defaultActive = 'ALL' }: PeriodPillProps) {
  const [selected, setSelected] = useState(defaultActive)

  return (
    <div className="inline-flex items-center gap-1 bg-[rgba(255,255,255,0.04)] rounded-full py-1 px-2">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => setSelected(p)}
          className={`relative px-3 py-1 rounded-full text-xs transition-all cursor-pointer overflow-hidden ${
            selected === p
              ? 'text-white'
              : 'text-gfx-neutral-300 hover:text-white'
          }`}
          style={selected === p ? {
            background: 'rgba(0, 240, 160, 0.15)',
            borderRadius: '60px',
            outline: '0.50px #00F0A0 solid',
            outlineOffset: '-0.50px',
          } : undefined}
        >
          {selected === p && (
            <svg className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] pointer-events-none" width="54" height="33" viewBox="0 0 54 33" fill="none" aria-hidden="true">
              <ellipse cx="27" cy="35" rx="14.5" ry="8" fill="#55FFC7" filter="blur(20px)" />
            </svg>
          )}
          {p}
        </button>
      ))}
      <button className="p-1.5 text-gfx-neutral-300 hover:text-white transition-colors cursor-pointer" aria-label="Calendar">
        <CalendarIcon size={18} />
      </button>
    </div>
  )
}
