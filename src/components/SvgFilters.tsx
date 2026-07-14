const blurs = [2, 5, 6, 7, 12, 20, 23, 24, 25, 30, 40, 50, 68, 74, 77, 80, 87, 100, 120, 157, 161]

export function SvgFilters() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        {blurs.map((r) => (
          <filter key={r} id={`blur-${r}`} x="-200%" y="-200%" width="500%" height="500%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={r} />
          </filter>
        ))}
      </defs>
    </svg>
  )
}
