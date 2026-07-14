import type { ReactNode } from 'react'

interface BadgeProps {
  variant: 'genfx' | '10x' | 'status' | 'active'
  children: ReactNode
}

const variantClasses = {
  genfx: 'bg-gfx-green-500/10 border border-gfx-green-500/15 text-gfx-green-500 px-2.5 py-1 rounded-full text-xs',
  '10x': 'bg-gfx-amber/12 border border-gfx-amber/20 text-gfx-amber px-2.5 py-1 rounded-full text-xs',
  status: 'bg-gfx-green-100 border border-gfx-green-200 text-gfx-green-500 px-3 py-1 rounded-full text-xs',
  active: 'bg-gfx-green-100 border border-gfx-green-200 text-gfx-green-500 px-3 py-1 rounded-full text-xs',
} as const

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`${variantClasses[variant]} inline-flex items-center font-normal uppercase tracking-wider`}>
      {children}
    </span>
  )
}
