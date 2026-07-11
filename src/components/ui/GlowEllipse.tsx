interface GlowEllipseProps {
  className?: string
  variant?: 'green' | 'purple'
}

const VARIANT_STYLES = {
  green: 'w-[520px] h-[300px] bg-gfx-green-200 blur-[157px]',
  purple: 'w-[120px] h-[80px] bg-gfx-purple-glow blur-[40px] opacity-50 mix-blend-lighten',
} as const

export function GlowEllipse({ className = '', variant = 'green' }: GlowEllipseProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${VARIANT_STYLES[variant]} ${className}`}
      aria-hidden="true"
    />
  )
}
