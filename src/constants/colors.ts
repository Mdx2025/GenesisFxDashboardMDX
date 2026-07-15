export const GLOW_GREEN = 'var(--color-gfx-glow-green)'
export const GLOW_GREEN_SEMI = '#1040308f'
export const GLOW_RED = 'var(--color-gfx-glow-red)'

export const STATUS_STYLES = {
  pending:  { bg: 'rgba(226,157,88,0.10)', border: '1px solid rgba(226,157,88,0.25)', color: 'var(--color-gfx-amber)' },
  approved: { bg: 'rgba(16,188,131,0.10)', border: '1px solid rgba(16,188,131,0.25)', color: 'var(--color-gfx-success)' },
  expired:  { bg: 'rgba(255,77,106,0.10)', border: '1px solid rgba(255,77,106,0.25)', color: 'var(--color-gfx-danger)' },
  rejected: { bg: 'rgba(255,77,106,0.10)', border: '1px solid rgba(255,77,106,0.25)', color: 'var(--color-gfx-danger)' },
} as const

export const COIN_STYLES = {
  USDT: { bg: 'rgba(0,240,160,0.10)', border: '1px solid rgba(0,240,160,0.15)', color: 'var(--color-gfx-success)' },
  BTC:  { bg: 'rgba(255,180,0,0.12)', border: '1px solid rgba(255,180,0,0.20)', color: 'var(--color-gfx-amber)' },
  ETH:  { bg: 'rgba(91,156,245,0.12)', border: '1px solid rgba(91,156,245,0.20)', color: 'var(--color-gfx-info)' },
} as const

export const TOPBAR_BG = 'var(--color-gfx-surface-blur)'

export const GLOW_COLORS = [
  'var(--color-gfx-glow-green)',
  'var(--color-gfx-glow-red)',
  'var(--color-gfx-glow-amber)',
] as const
