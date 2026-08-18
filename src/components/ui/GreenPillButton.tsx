import type { ReactNode } from 'react'

interface GreenPillButtonProps {
  children: ReactNode
  onClick?: () => void
}

export function GreenPillButton({ children, onClick }: GreenPillButtonProps) {
  return (
    <button
      className="green-pill-button h-12 px-12 relative inline-flex items-center justify-center cursor-pointer group rounded-full overflow-hidden focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none bg-gfx-green-100 border-none"
      type="button"
      onClick={onClick}
    >
      <div
        className="green-pill-button__edge absolute inset-0 rounded-full pointer-events-none border border-gfx-neutral-600 [mask-image:radial-gradient(25%_60%_at_0_10%,#fff,#0000),radial-gradient(25%_60%_at_100%_10%,#fff,#0000)] [-webkit-mask-image:radial-gradient(25%_60%_at_0_10%,#fff,#0000),radial-gradient(25%_60%_at_100%_10%,#fff,#0000)] [mask-composite:add] [-webkit-mask-composite:destination-over]"
        aria-hidden="true"
      />
      <svg className="green-pill-button__decoration absolute left-[18%] top-[25%] opacity-70" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.7" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="green-pill-button__decoration absolute left-[42%] top-[18%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="green-pill-button__decoration absolute left-[55%] top-[70%] opacity-40" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.6" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="green-pill-button__decoration absolute left-[72%] top-[30%] opacity-60" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#gpb_blur)" />
      </svg>
      <svg className="green-pill-button__decoration absolute left-[82%] top-[55%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.7" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="green-pill-button__decoration absolute left-[28%] top-[65%] opacity-35" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#gpb_blur)" />
      </svg>
      <svg className="green-pill-button__decoration absolute left-[90%] top-[75%] opacity-55" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.6" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <svg className="green-pill-button__decoration absolute left-[12%] top-[72%] opacity-40" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#gpb_blur)" />
      </svg>
      <span className="green-pill-button__label relative inline-flex items-center justify-center text-gfx-neutral-500 text-base font-normal font-acid leading-6 z-10">
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
