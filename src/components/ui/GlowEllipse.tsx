interface GlowEllipseProps {
  className?: string
  variant?: 'green' | 'purple' | 'chat'
}

const VARIANT_STYLES = {
  green: 'w-[20rem] h-[12rem] bg-gfx-green-200 blur-[6rem]',
  purple: 'w-[7.5rem] h-[5rem] bg-gfx-purple-glow blur-[2.5rem] opacity-50 mix-blend-lighten',
  chat: 'w-[36.6875rem] h-[20.75rem] bg-gfx-green-300 opacity-90 blur-[158.05px]',
} as const

export function GlowEllipse({ className = '', variant = 'green' }: GlowEllipseProps) {
  return (
    <div
      className={`glow-ellipse theme-decorative-glow absolute rounded-full pointer-events-none ${VARIANT_STYLES[variant]} ${className}`}
      aria-hidden="true"
    />
  )
}
