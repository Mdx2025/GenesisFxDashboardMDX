import type { ReactNode } from 'react'
import { DividerGlow } from './DividerGlow'

interface GlassCardProps {
  variant?: 'light' | 'heavy' | 'purple'
  divider?: 'white' | 'green' | 'none'
  glow?: boolean
  rounded?: string
  className?: string
  children: ReactNode
}

const VARIANT_CLASS = {
  light: 'glass-card',
  heavy: 'glass-card-heavy',
  purple: 'glass-card-purple',
} as const

export function GlassCard({ variant = 'light', divider = 'white', glow = true, rounded = '19px', className = '', children }: GlassCardProps) {
  return (
    <div
      className={`${VARIANT_CLASS[variant]} relative ${className}`}
      style={{ borderRadius: rounded }}
    >
      {divider !== 'none' && <DividerGlow variant={divider} />}
      {variant === 'purple' && glow && (
        <>
          <div className="absolute -left-[296px] -top-[66px] w-[300px] h-[194px] rounded-full opacity-50 mix-blend-lighten pointer-events-none bg-gfx-purple-glow blur-[80px]" aria-hidden="true" />
          <div className="absolute -left-[296px] -top-[66px] w-[300px] h-[194px] rounded-full opacity-50 mix-blend-lighten pointer-events-none bg-gfx-purple-glow blur-[80px]" aria-hidden="true" />
          <div className="absolute right-[-296px] bottom-[-66px] w-[300px] h-[194px] rounded-full opacity-50 mix-blend-lighten pointer-events-none bg-gfx-purple-glow blur-[80px]" aria-hidden="true" />
          <div className="absolute right-[-296px] bottom-[-66px] w-[300px] h-[194px] rounded-full opacity-50 mix-blend-lighten pointer-events-none bg-gfx-purple-glow blur-[80px]" aria-hidden="true" />
        </>
      )}
      {children}
    </div>
  )
}
