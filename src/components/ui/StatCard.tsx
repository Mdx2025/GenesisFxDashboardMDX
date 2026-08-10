import { type ReactNode } from 'react'
import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'

interface StatCardProps {
  label?: string
  value?: string
  valueColor?: string
  icon?: ReactNode
  /** Small glyph sitting inline to the left of the label, instead of the 42px badge on the right. */
  inlineIcon?: ReactNode
  /** Muted trailing unit rendered next to the value, e.g. "lots". */
  unit?: string
  action?: string
  /** Side the ambient glow bleeds in from. */
  glow?: 'left' | 'right'
  children?: ReactNode
  className?: string
}

const GLOW_POSITION = {
  left: '-left-[8rem] -top-[4rem]',
  right: '-right-[8rem] -top-[4rem]',
} as const

export function StatCard({ label, value, valueColor = 'text-white', icon, inlineIcon, unit, action, glow, children, className = '' }: StatCardProps) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className={`relative overflow-hidden ${className}`}>
      {glow && <GlowEllipse className={GLOW_POSITION[glow]} />}
      {children ? (
        children
      ) : (
        <div className="relative z-10 p-6 min-h-[148px] flex flex-col justify-center">
          {icon ? (
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gfx-neutral-500 text-sm font-acid leading-tight">{label}</p>
                <p className={`${valueColor} text-4xl font-acid leading-normal mt-2`}>{value}</p>
                {action && <p className="text-gfx-green-300 text-base font-acid mt-1">{action}</p>}
              </div>
              <div className="w-[42px] h-[42px] rounded-xl bg-gfx-green-900 flex items-center justify-center">
                {icon}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-[0.3125rem]">
                {inlineIcon}
                <p className="text-gfx-neutral-500 text-sm font-acid leading-tight">{label}</p>
              </div>
              <p className={`${valueColor} text-4xl font-acid leading-normal mt-2`}>
                {value}
                {unit && <span className="text-gfx-neutral-400 text-base font-acid ml-2">{unit}</span>}
              </p>
              {action && <p className="text-gfx-green-300 text-base font-acid mt-1">{action}</p>}
            </>
          )}
        </div>
      )}
    </GlassCard>
  )
}
