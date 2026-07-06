import type { ReactNode } from 'react'
import { DividerGlow } from './DividerGlow'

interface GlassCardProps {
  variant?: 'light' | 'heavy'
  divider?: 'white' | 'green' | 'none'
  rounded?: string
  className?: string
  children: ReactNode
}

export function GlassCard({ variant = 'light', divider = 'white', rounded = '19px', className = '', children }: GlassCardProps) {
  return (
    <div
      className={`${variant === 'heavy' ? 'glass-card-heavy' : 'glass-card'} relative overflow-hidden ${className}`}
      style={{ borderRadius: rounded }} /* dynamic */
    >
      {divider !== 'none' && <DividerGlow variant={divider} />}
      {children}
    </div>
  )
}
