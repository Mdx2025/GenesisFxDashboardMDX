import type { ReactNode } from 'react'

interface GreenPillButtonProps {
  children: ReactNode
  onClick?: () => void
}

export function GreenPillButton({ children, onClick }: GreenPillButtonProps) {
  return (
    <button
      className="h-12 px-6 relative cursor-pointer group rounded-full overflow-hidden focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none"
      type="button"
      onClick={onClick}
      style={{ background: '#0A2E1E', border: '1px solid #1A4A35' }}
    >
      <svg className="absolute left-[18%] top-[25%] opacity-70" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.7" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="absolute left-[42%] top-[18%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="absolute left-[55%] top-[70%] opacity-40" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.6" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="absolute left-[72%] top-[30%] opacity-60" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#gpb_blur)" />
      </svg>
      <svg className="absolute left-[82%] top-[55%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.7" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="absolute left-[28%] top-[65%] opacity-35" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#gpb_blur)" />
      </svg>
      <svg className="absolute left-[90%] top-[75%] opacity-55" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.6" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="absolute left-[12%] top-[72%] opacity-40" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <span className="relative flex items-center justify-center text-gfx-neutral-500 text-base font-normal font-acid leading-6 z-10">
        {children}
      </span>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="gpb_blur" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>
    </button>
  )
}
