import type { ReactNode } from 'react'

interface BadgeProps {
  variant: 'genfx' | '10x' | 'status'
  children: ReactNode
}

const variantClasses = {
  genfx: 'bg-[rgba(0,240,160,0.10)] border-[1.162px] border-[rgba(0,240,160,0.15)] text-gfx-green-500 px-[10px] py-[4px] rounded-full text-[11px]',
  '10x': 'bg-[rgba(255,180,0,0.12)] border-[1.162px] border-[rgba(255,180,0,0.20)] text-[#e29d58] px-[10px] py-[4px] rounded-full text-[11px]',
  status: 'bg-gfx-green-100 border-[1.162px] border-gfx-green-200 text-gfx-green-500 px-[12px] py-[4px] rounded-full text-[11px]',
} as const

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`${variantClasses[variant]} inline-flex items-center font-normal uppercase tracking-wider`}>
      {children}
    </span>
  )
}
