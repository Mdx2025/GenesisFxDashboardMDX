interface DividerGlowProps {
  variant?: 'white' | 'green'
}

export function DividerGlow({ variant = 'white' }: DividerGlowProps) {
  return (
    <div
      className={`${variant === 'green' ? 'divider-green' : 'divider-glow'} absolute top-0 left-[10%] right-[10%]`}
      aria-hidden="true"
    />
  )
}
