import type { ReactNode } from 'react'
import { GLOW_GREEN } from '@/constants/colors'

interface SummaryCardProps {
  title: string
  value: string
  changeText: string
  changeColor?: 'green' | 'red' | 'amber'
  glowColor?: string
  chartClassName?: string
  children?: ReactNode
}

const colorMap = {
  green: 'text-gfx-green-500',
  red: 'text-gfx-red',
  amber: 'text-gfx-amber',
}

export function SummaryCard({ title, value, changeText, changeColor = 'green', glowColor = GLOW_GREEN, chartClassName, children }: SummaryCardProps) {
  const arrow = changeColor === 'red' ? '▼' : '▲'

  return (
    <div className="relative overflow-hidden bg-white/5 rounded-2xl shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.2),inset_0px_1.16px_0px_1.16px_rgba(255,255,255,0.04)] outline outline-1 outline-offset-[-1.16px] outline-white/5 aspect-[1.6/1] isolate" style={{ backdropFilter: 'url(#blur-24)', WebkitBackdropFilter: 'url(#blur-24)', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
      <div className="absolute top-0 left-[10%] right-[10%] h-px divider-glow" aria-hidden="true" />
      <div
        className="absolute w-[493px] h-72 -left-[72px] top-[105px] rounded-full pointer-events-none"
        style={{ background: glowColor, filter: 'url(#blur-157)', willChange: 'transform' }}
        aria-hidden="true"
      />
      <div className="relative z-10 px-4 pt-4 sm:px-6 sm:pt-6">
        <h3 className="text-card-label text-gfx-neutral-500 mb-2 font-normal">{title}</h3>
        <p className="text-card-value text-white mb-2">{value}</p>
        <div className="flex items-center gap-1.5">
          <span className={`text-card-change ${colorMap[changeColor]}`}>{arrow}</span>
          <span className={`text-card-change ${colorMap[changeColor]}`}>{changeText}</span>
        </div>
      </div>
      {children && (
        <div className={`absolute bottom-3 right-3 w-3/5 sm:w-1/2 ${chartClassName ?? 'h-3/4'}`}>
          {children}
        </div>
      )}
    </div>
  )
}
