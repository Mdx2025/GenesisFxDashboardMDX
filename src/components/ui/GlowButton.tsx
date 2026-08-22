import { useRef, useCallback, type ReactNode } from 'react'
import './GlowButton.css'

interface GlowButtonProps {
  label?: string
  icon?: ReactNode
  width?: number | string
  height?: number
  radius?: number
  fontSize?: number
  fontWeight?: number
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  // Legacy props accepted for compatibility but ignored by the new visual
  smoothing?: number
  intensity?: number
  glowBlur?: number
  surface?: [string, string, string]
  surfaceAngle?: number
  glow?: [string, string, string, string]
  textColor?: string
}

export function GlowButton({
  label = 'Transfer Funds',
  width = 300,
  height = 44,
  fontSize = 16,
  fontWeight = 500,
  icon,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: GlowButtonProps) {
  const lightRef = useRef<HTMLSpanElement>(null)
  const ringRRef = useRef<HTMLSpanElement>(null)
  const ringLRef = useRef<HTMLSpanElement>(null)

  const handleMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return
    const btn = e.currentTarget
    const r = btn.getBoundingClientRect()
    const x = e.clientX - r.left

    if (lightRef.current) {
      const offset = x - lightRef.current.offsetWidth / 2
      lightRef.current.style.setProperty('--lx', `${Math.round(offset)}px`)
    }

    const frac = Math.min(1, Math.max(0, x / r.width))
    if (ringRRef.current) ringRRef.current.style.opacity = frac.toFixed(3)
    if (ringLRef.current) ringLRef.current.style.opacity = (1 - frac).toFixed(3)
  }, [disabled])

  return (
    <button
      type={type}
      className={`glow-btn ${className}`}
      style={{
        width,
        height,
        fontSize,
        fontWeight,
        paddingInline: typeof width === 'string' ? '1.25rem' : undefined,
      }}
      onPointerMove={handleMove}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className="glow-btn__ring glow-btn__ring--r" ref={ringRRef} aria-hidden="true">
        <span className="glow-btn__edge" />
      </span>
      <span className="glow-btn__ring glow-btn__ring--l" ref={ringLRef} aria-hidden="true">
        <span className="glow-btn__edge" />
      </span>
      <span className="glow-btn__fill" aria-hidden="true" />
      <span className="glow-btn__clip" aria-hidden="true">
        <span className="glow-btn__light" ref={lightRef}>
          <span className="glow-btn__core" />
          <span className="glow-btn__spread" />
        </span>
      </span>
      {icon && <span className="glow-btn__icon">{icon}</span>}
      <span className="glow-btn__label">{label}</span>
    </button>
  )
}
