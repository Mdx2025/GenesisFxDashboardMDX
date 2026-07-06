import { useRef, useEffect, useCallback } from 'react'

interface GlowButtonProps {
  label?: string
  width?: number | string
  height?: number
  radius?: number
  smoothing?: number
  intensity?: number
  glowBlur?: number
  surface?: [string, string, string]
  surfaceAngle?: number
  glow?: [string, string, string, string]
  textColor?: string
  fontSize?: number
  fontWeight?: number
  onClick?: () => void
}

export function GlowButton({
  label = 'Transfer Funds',
  width = 300,
  height = 44,
  radius = 300,
  smoothing = 0.15,
  intensity = 0.75,
  glowBlur = 0.5,
  surface = ['#D1D1D1', '#D2F5ED', '#D5FFF1'],
  surfaceAngle = 54,
  glow = ['#38846B', '#38FFBD', '#D1D1D1', '#F0FEFE'],
  textColor = '#000000',
  fontSize = 16,
  fontWeight = 500,
  onClick,
}: GlowButtonProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const glowRRef = useRef<HTMLDivElement>(null)
  const glowLRef = useRef<HTMLDivElement>(null)
  const uRef = useRef(1)
  const tRef = useRef(1)
  const rafRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      const cur = uRef.current
      const t = tRef.current
      const next = cur + (t - cur) * smoothing
      uRef.current = Math.abs(next - t) < 0.0005 ? t : next
      const u = uRef.current
      if (glowRRef.current) glowRRef.current.style.opacity = String(u * intensity)
      if (glowLRef.current) glowLRef.current.style.opacity = String((1 - u) * intensity)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [smoothing, intensity])

  const handleMove = useCallback((e: React.PointerEvent) => {
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    tRef.current = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
  }, [])

  const b = (px: number) => `blur(${px * glowBlur}px)`
  const cTop = (lh: number) => (height - lh) / 2

  const layers = (
    <>
      <div
        className="absolute pointer-events-none w-[90%] left-[5%]"
        style={{ height, top: cTop(height), borderRadius: radius, filter: b(25), background: `linear-gradient(92deg, rgba(209,209,210,0) 0%, ${glow[0]} 100%)` }} /* dynamic */
      />
      <div
        className="absolute pointer-events-none w-full left-0"
        style={{ height: height + 8, top: cTop(height + 8), borderRadius: radius, filter: b(12.65), background: `linear-gradient(118deg, rgba(209,209,210,0) 0%, ${glow[1]} 100%)` }} /* dynamic */
      />
      <div
        className="absolute pointer-events-none w-full left-0"
        style={{ height, top: cTop(height), borderRadius: radius, filter: b(4.65), background: `linear-gradient(270deg, ${glow[2]} 0%, rgba(162,245,227,0) 100%)` }} /* dynamic */
      />
      <div
        className="absolute pointer-events-none w-full left-0"
        style={{ height, top: cTop(height), borderRadius: radius, filter: b(4.65), background: `linear-gradient(270deg, ${glow[3]} 0%, rgba(162,245,227,0) 100%)` }} /* dynamic */
      />
    </>
  )

  return (
    <div ref={stageRef} className="relative" style={{ width }} /* dynamic */>
      <div ref={glowRRef} className="absolute inset-0 pointer-events-none" style={{ opacity: intensity }} /* dynamic */>{layers}</div>
      <div ref={glowLRef} className="absolute inset-0 pointer-events-none -scale-x-100" style={{ opacity: 0 }} /* dynamic */>{layers}</div>
      <button
        type="button"
        onPointerMove={handleMove}
        onClick={onClick}
        className="relative w-full flex items-center justify-center cursor-pointer select-none border-none font-acid"
        style={{
          height,
          borderRadius: radius,
          color: textColor,
          fontSize,
          fontWeight,
          lineHeight: '24.44px',
          background: `linear-gradient(${surfaceAngle}deg, ${surface[0]} 18%, ${surface[1]} 64%, ${surface[2]} 80%)`,
        }} /* dynamic */
      >
        {label}
      </button>
    </div>
  )
}
