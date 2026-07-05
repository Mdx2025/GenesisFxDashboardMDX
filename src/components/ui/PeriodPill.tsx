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
          className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
            selected === p
              ? 'bg-teal-500/20 outline outline-[0.50px] outline-teal-500 text-white'
              : 'text-gfx-neutral-300 hover:text-white'
          }`}
        >
          {p}
        </button>
      ))}
      <button className="p-1.5 text-gfx-neutral-300 hover:text-white transition-colors cursor-pointer" aria-label="Calendar">
        <CalendarIcon size={16} />
      </button>
    </div>
  )
}
