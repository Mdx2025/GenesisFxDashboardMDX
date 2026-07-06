interface GreenDotProps {
  size?: number
}

export function GreenDot({ size = 8 }: GreenDotProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }} /* dynamic */
      className="rounded-full bg-gfx-green-glow shadow-[0_0_6px_rgba(0,240,160,0.6),0_0_12px_rgba(0,240,160,0.3)] inline-block"
    />
  )
}
