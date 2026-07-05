import type { ReactNode } from 'react'

interface BadgeProps {
  variant: 'genfx' | '10x' | 'status'
  children: ReactNode
}

const styles = {
  genfx: { background: 'rgba(0,240,160,0.10)', border: '1.162px solid rgba(0,240,160,0.15)', color: '#10BC83', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px' },
  '10x': { background: 'rgba(255,180,0,0.12)', border: '1.162px solid rgba(255,180,0,0.20)', color: '#e29d58', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px' },
  status: { background: '#021B13', border: '1.162px solid #064B34', color: '#10BC83', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px' },
} as const

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span style={styles[variant]} className="inline-flex items-center font-normal uppercase tracking-wider">
      {children}
    </span>
  )
}
