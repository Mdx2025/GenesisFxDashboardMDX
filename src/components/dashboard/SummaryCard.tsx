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
  red: 'text-[#D46356]',
  amber: 'text-gfx-amber',
}

const valueColorMap = {
  white: 'text-white',
  green: 'text-gfx-bullish-light',
  red: 'text-[#D46356]',
}

export function SummaryCard({ title, value, changeText, changeColor = 'green', valueColor = 'white', glowColor = GLOW_GREEN, chartClassName, children }: SummaryCardProps) {
  const arrow = changeColor === 'red' ? '▼' : '▲'

  return (
    <GlassCard variant="light" divider="white" rounded="16px" className="overflow-hidden aspect-[1.6/1] isolate [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
      <div
        className="absolute w-[493px] h-72 -left-[72px] top-[105px] rounded-full pointer-events-none [filter:url(#blur-157)] will-change-transform"
        style={{ background: glowColor }}
        aria-hidden="true"
      />
      <div className="relative z-10 px-4 pt-4 sm:px-6 sm:pt-6">
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
