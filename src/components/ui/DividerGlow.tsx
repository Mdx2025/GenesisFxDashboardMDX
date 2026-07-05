interface DividerGlowProps {
  variant?: 'white' | 'green'
  className?: string
}

export function DividerGlow({ variant = 'white', className }: DividerGlowProps) {
  return (
    <div
      className={`${variant === 'green' ? 'divider-green' : 'divider-glow'} ${className ?? 'absolute top-0 left-[10%] right-[10%]'}`}
      aria-hidden="true"
    />
  )
}
