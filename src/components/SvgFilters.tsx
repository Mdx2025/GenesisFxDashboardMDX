const blurs = [2, 5, 6, 7, 12, 20, 23, 24, 30, 50, 77, 100, 120, 157, 161]

export function SvgFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {blurs.map((r) => (
          <filter key={r} id={`blur-${r}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={r} />
          </filter>
        ))}
      </defs>
    </svg>
  )
}
