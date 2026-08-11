import type { ReactNode } from 'react'
import { GlassCard } from '@/components/ui'
import { GLOW_GREEN } from '@/constants/colors'

interface SummaryCardProps {
  title: string
  value: string
  changeText: string
  changeColor?: 'green' | 'red' | 'amber'
  valueColor?: 'green' | 'red' | 'white'
  glowColor?: string
  chartClassName?: string
  children?: ReactNode
}

const colorMap = {
  green: 'text-gfx-bullish-light',
  red: 'text-gfx-red-muted',
  amber: 'text-gfx-amber',
}

const valueColorMap = {
  white: 'text-white',
  green: 'text-gfx-bullish-light',
  red: 'text-gfx-red-muted',
}

export function SummaryCard({ title, value, changeText, changeColor = 'green', valueColor = 'white', glowColor = GLOW_GREEN, chartClassName, children }: SummaryCardProps) {
  const arrow = changeColor === 'red' ? '▼' : '▲'

  return (
    <GlassCard variant="light" divider="none" rounded="16px" className={`overflow-hidden h-full isolate [-webkit-mask-image:-webkit-radial-gradient(white,black)] ${children ? 'pb-10' : ''}`}>
      <div
        className="summary-card__glow absolute w-[493px] h-72 -left-[72px] top-[105px] rounded-full pointer-events-none [filter:url(#blur-157)] will-change-transform"
        style={{ background: glowColor }}
        aria-hidden="true"
      />
      <div className="relative z-10 px-4 py-5 sm:px-6 sm:py-10">
        <h3 className="text-card-label text-gfx-neutral-500 mb-2 font-normal">{title}</h3>
        <p className={`text-card-value ${valueColorMap[valueColor]} mb-2`}>{value}</p>
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
    </GlassCard>
  )
}
