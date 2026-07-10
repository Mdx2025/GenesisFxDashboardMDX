import type { ReactNode } from 'react'

interface SecondaryButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function SecondaryButton({ children, onClick, className }: SecondaryButtonProps) {
  return (
    <button
      className={`h-[2.875rem] relative overflow-hidden cursor-pointer group focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none rounded-[1.875rem] bg-gradient-to-t from-[#09241c] to-[#0c1311] border border-[#a0a0a0] ${className ?? ''}`}
      type="button"
      onClick={onClick}
    >
      <svg className="absolute left-[75%] top-[58%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sec_sparkle)" />
      </svg>
      <svg className="absolute left-[65%] top-[68%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sec_sparkle)" />
      </svg>
      <svg className="absolute left-[42%] top-[12%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sec_sparkle)" />
      </svg>
      <svg className="absolute left-[55%] top-[77%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sec_sparkle)" />
      </svg>
      <svg className="absolute left-[18%] top-[26%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#8C8C8C" filter="url(#sec_sparkle)" />
      </svg>
      <svg className="absolute left-[85%] top-[62%] opacity-50" width="4" height="3" viewBox="0 0 4 3" fill="none" aria-hidden="true">
        <ellipse cx="2" cy="1.5" rx="1" ry="0.5" fill="#8C8C8C" filter="url(#sec_sparkle)" />
      </svg>
      <span className="relative flex items-center justify-center gap-[0.5625rem] text-[#c6c6c6] text-base font-medium font-acid leading-6 z-10 px-[1.375rem]">
        {children}
      </span>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="sec_sparkle" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>
    </button>
  )
}
