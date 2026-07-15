interface GreenDotProps {
  size?: number
}

export function GreenDot({ size = 8 }: GreenDotProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }} /* dynamic */
      className="rounded-full bg-gfx-green-glow shadow-glow-green inline-block"
    />
  )
}
