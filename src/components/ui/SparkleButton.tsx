import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface SparkleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  fullWidth?: boolean
}

export function SparkleButton({ children, fullWidth, className, type = 'button', ...props }: SparkleButtonProps) {
  return (
    <button
      className={`sparkle-button min-w-12 ${fullWidth ? 'w-full' : 'w-auto sm:w-auto'} h-12 ${className ?? 'px-6'} relative overflow-hidden cursor-pointer group focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none rounded-2xl [[data-theme=light]_&]:h-[2.875rem] [[data-theme=light]_&]:px-[1.375rem] [[data-theme=light]_&]:py-[0.875rem] [[data-theme=light]_&]:rounded-[1.875rem] [[data-theme=light]_&]:bg-[linear-gradient(0deg,#fff_29%,#F1FFFA_88%)] [[data-theme=light]_&]:border [[data-theme=light]_&]:border-[#9FE4CD]`}
      type={type}
      {...props}
    >
      <span className="sparkle-button__hover-surface absolute inset-0 rounded-[inherit] pointer-events-none" aria-hidden="true" />
      <span className="sparkle-button__hover-sparkles absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <span className="sparkle-button__hover-sparkle" key={index} />
        ))}
      </span>
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-[#1040308f] to-black/0 [[data-theme=light]_&]:hidden" aria-hidden="true" />
      <div
        className="absolute inset-0 rounded-[inherit] border border-zinc-300/60 pointer-events-none [mask-image:linear-gradient(to_bottom,white_0%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_bottom,white_0%,transparent_80%)] [[data-theme=light]_&]:hidden"
        aria-hidden="true"
      />
      <svg className="absolute left-[75%] top-[58%] [[data-theme=light]_&]:left-[96.5%] [[data-theme=light]_&]:top-[60.6%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[65%] top-[68%] opacity-50 [[data-theme=light]_&]:left-[87.8%] [[data-theme=light]_&]:top-[71.5%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[42%] top-[12%] [[data-theme=light]_&]:left-[67%] [[data-theme=light]_&]:top-[12.8%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[55%] top-[77%] [[data-theme=light]_&]:left-[79.1%] [[data-theme=light]_&]:top-[80.2%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[68%] top-[20%] [[data-theme=light]_&]:left-[89.5%] [[data-theme=light]_&]:top-[21.5%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[30%] top-[70%] [[data-theme=light]_&]:left-[66.4%] [[data-theme=light]_&]:top-[73.6%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[18%] top-[26%] [[data-theme=light]_&]:left-[56.6%] [[data-theme=light]_&]:top-[28%]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#8C8C8C" filter="url(#sparkle_blur)" />
      </svg>
      <svg className="absolute left-[85%] top-[62%] [[data-theme=light]_&]:left-[23.1%] [[data-theme=light]_&]:top-[64.9%]" width="4" height="3" viewBox="0 0 4 3" fill="none" aria-hidden="true">
        <ellipse cx="2" cy="1.5" rx="1" ry="0.5" fill="#8C8C8C" filter="url(#sparkle_blur)" />
      </svg>
      <span className="sparkle-button__content relative z-10 flex h-full w-full items-center justify-center gap-2 text-gfx-neutral-500 text-base font-normal font-acid leading-6 [[data-theme=light]_&]:gap-[0.5625rem] [[data-theme=light]_&]:text-[#111312] [[data-theme=light]_&]:font-medium [[data-theme=light]_&]:leading-[1.5275rem]">
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
