import type { ReactNode } from 'react'
import { DividerGlow } from './DividerGlow'
import { GlowEllipse } from './GlowEllipse'

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
          <GlowEllipse variant="purple" className="left-[-40px] top-[-30px]" />
          <GlowEllipse variant="purple" className="right-[-40px] bottom-[-30px]" />
        </>
      )}
      {children}
    </div>
  )
}
