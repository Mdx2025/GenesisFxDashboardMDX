import type { ReactNode } from 'react'

interface SparkleButtonProps {
  children: ReactNode
  onClick?: () => void
}

export function SparkleButton({ children, onClick }: SparkleButtonProps) {
  return (
    <button className="min-w-12 w-auto sm:w-auto h-12 px-4 relative cursor-pointer group" type="button" onClick={onClick}>
      <div className="absolute inset-0 rounded-[30px] bg-gradient-to-t from-[#1040308f] to-black/0" aria-hidden="true" />
      <div
        className="absolute inset-0 rounded-[30px] border border-zinc-300/60 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to bottom, white 0%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 80%)' }}
        aria-hidden="true"
      />
      <svg className="absolute left-[139.89px] top-[27.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[124.89px] top-[32.87px] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[88.89px] top-[5.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[109.89px] top-[36.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[127.89px] top-[9.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[87.89px] top-[33.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[70.89px] top-[12.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#8C8C8C" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[12.89px] top-[29.87px]" width="4" height="3" viewBox="0 0 4 3" fill="none" aria-hidden="true">
        <ellipse cx="2" cy="1.5" rx="1" ry="0.5" fill="#8C8C8C" filter="url(#sparkle_blur)" />
      </svg>
      <span className="relative flex items-center justify-center gap-2 text-gfx-neutral-500 text-base font-normal font-acid leading-6 z-10">
        {children}
      </span>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="sparkle_blur" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>
    </button>
  )
}
