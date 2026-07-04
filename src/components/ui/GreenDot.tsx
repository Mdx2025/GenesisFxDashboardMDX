interface GreenDotProps {
  size?: number
}

export function GreenDot({ size = 8 }: GreenDotProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#00f0a0',
        boxShadow: '0 0 6px rgba(0,240,160,0.6), 0 0 12px rgba(0,240,160,0.3)',
        display: 'inline-block',
      }}
    />
  )
}
