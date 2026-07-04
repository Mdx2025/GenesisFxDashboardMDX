import type { ReactNode } from 'react'

interface BadgeProps {
  variant: 'genfx' | '10x' | 'status'
  children: ReactNode
}

const styles = {
  genfx: { background: 'rgba(16,188,131,0.15)', color: '#10BC83', padding: '4px 10px', borderRadius: '6px', fontSize: '11px' },
  '10x': { background: 'rgba(226,157,88,0.15)', color: '#e29d58', padding: '4px 10px', borderRadius: '6px', fontSize: '11px' },
  status: { background: 'rgba(16,188,131,0.12)', color: '#10BC83', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px' },
} as const

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span style={styles[variant]} className="inline-flex items-center font-normal uppercase tracking-wider">
      {children}
    </span>
  )
}
