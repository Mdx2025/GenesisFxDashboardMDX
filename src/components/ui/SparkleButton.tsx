import type { ReactNode } from 'react'

interface SparkleButtonProps {
  children: ReactNode
  onClick?: () => void
  fullWidth?: boolean
  className?: string
}

export function SparkleButton({ children, onClick, fullWidth, className }: SparkleButtonProps) {
  return (
    <button className={`min-w-12 ${fullWidth ? 'w-full' : 'w-auto sm:w-auto'} h-12 ${className ?? 'px-6'} relative overflow-hidden cursor-pointer group focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none rounded-2xl`} type="button" onClick={onClick}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#1040308f] to-black/0" aria-hidden="true" />
      <div
        className="absolute inset-0 rounded-2xl border border-zinc-300/60 pointer-events-none [mask-image:linear-gradient(to_bottom,white_0%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_bottom,white_0%,transparent_80%)]"
        aria-hidden="true"
      />
      <svg className="absolute left-[75%] top-[58%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[65%] top-[68%] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[42%] top-[12%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[55%] top-[77%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[68%] top-[20%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[30%] top-[70%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[18%] top-[26%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#8C8C8C" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[85%] top-[62%]" width="4" height="3" viewBox="0 0 4 3" fill="none" aria-hidden="true">
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
