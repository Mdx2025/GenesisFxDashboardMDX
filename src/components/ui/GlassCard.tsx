import { forwardRef, type ReactNode } from 'react'
import { DividerGlow } from './DividerGlow'
import { GlowEllipse } from './GlowEllipse'

interface GlassCardProps {
  variant?: 'light' | 'heavy' | 'purple'
  divider?: 'white' | 'green' | 'none'
  glow?: boolean
  rounded?: string
  className?: string
  style?: React.CSSProperties
  children: ReactNode
}

const VARIANT_CLASS = {
  light: 'glass-card',
  heavy: 'glass-card-heavy',
  purple: 'glass-card-purple',
} as const

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard({ variant = 'light', divider = 'white', glow = true, rounded = '1.125rem', className = '', style, children }, ref) {
  return (
    <div
      ref={ref}
      className={`${VARIANT_CLASS[variant]} relative ${className}`}
      style={{ borderRadius: rounded, ...style }}
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
})
