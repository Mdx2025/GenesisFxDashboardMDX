interface GlowEllipseProps {
  className?: string
}

export function GlowEllipse({ className = '' }: GlowEllipseProps) {
  return (
    <div
      className={`absolute w-[520px] h-[300px] rounded-full bg-gfx-green-200 blur-[157px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
