import type { ReactNode } from 'react'

interface BadgeProps {
  variant: 'genfx' | '10x' | 'status' | 'active'
  children: ReactNode
}

const variantClasses = {
  genfx: 'bg-[rgba(0,240,160,0.10)] border-[1.162px] border-[rgba(0,240,160,0.15)] text-gfx-green-500 px-[0.625rem] py-[0.25rem] rounded-full text-[0.6875rem]',
  '10x': 'bg-[rgba(255,180,0,0.12)] border-[1.162px] border-[rgba(255,180,0,0.20)] text-[#e29d58] px-[0.625rem] py-[0.25rem] rounded-full text-[0.6875rem]',
  status: 'bg-gfx-green-100 border-[1.162px] border-gfx-green-200 text-gfx-green-500 px-[0.75rem] py-[0.25rem] rounded-full text-[0.6875rem]',
  active: 'bg-gfx-green-100 border-[1.162px] border-gfx-green-200 text-gfx-green-500 px-[0.75rem] py-[0.25rem] rounded-full text-[0.6875rem]',
} as const

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`${variantClasses[variant]} inline-flex items-center font-normal uppercase tracking-wider`}>
      {children}
    </span>
  )
}
