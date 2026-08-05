import { useState } from 'react'
import { CalendarIcon } from '@/components/icons'

interface PeriodPillProps {
  periods?: string[]
  defaultActive?: string
}

export function PeriodPill({ periods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'], defaultActive = 'ALL' }: PeriodPillProps) {
  const [selected, setSelected] = useState(defaultActive)

  return (
    <div className="relative inline-flex items-center gap-1 overflow-hidden rounded-full bg-white/[0.04] px-2 py-1">
      {periods.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setSelected(p)}
          aria-pressed={selected === p}
          className={`relative h-[32.35px] cursor-pointer rounded-full px-3 text-center font-acid text-xs font-normal leading-[18.8px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gfx-green-500 ${
            selected === p ? 'z-10 text-white' : 'z-base text-gfx-neutral-500 hover:text-white'
          }`}
        >
          {selected === p && (
            <span
              data-layer="Button"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[32.35px] w-[53.06px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[60px] bg-[#064B34]"
              aria-hidden="true"
            >
              <span className="absolute inset-0 rounded-[60px] border-[0.5px] border-gfx-green-glow [mask:linear-gradient(to_bottom,black_0%,transparent_60%)] [-webkit-mask:linear-gradient(to_bottom,black_0%,transparent_60%)]" />
              <span
                data-layer="Ellipse 15"
                className="absolute left-[24.94px] top-[54px] h-4 w-[29px] rounded-full bg-[#CFF2E6] blur-[20px] mix-blend-plus-lighter"
              />
            </span>
          )}
          <span className="relative z-base">{p}</span>
        </button>
      ))}
      <button type="button" className="z-base cursor-pointer rounded-full p-1.5 text-gfx-neutral-500 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gfx-green-500" aria-label="Calendar">
        <CalendarIcon size={18} />
      </button>
    </div>
  )
}
