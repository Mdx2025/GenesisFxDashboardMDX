import type { CSSProperties, ReactNode } from 'react'

interface PrimaryPillButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

export function PrimaryPillButton({ children, onClick, type = 'button', disabled = false, className, style }: PrimaryPillButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`group relative h-11 flex items-center justify-center gap-2.5 px-[31px] py-2.5 overflow-hidden rounded-[300px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none ${className ?? ''}`}
    >
      <span
        className="absolute inset-x-0 top-0 h-11 rounded-[239.726px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:!opacity-0"
        style={{
          backgroundImage: 'linear-gradient(95.6deg, rgba(209, 209, 210, 0) 41.229%, rgb(56, 255, 189) 95.948%)',
          filter: 'blur(12.65px)',
        }}
        aria-hidden="true"
      />
      <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-11 rounded-[300px] bg-[#F1FFFA]" aria-hidden="true" />
      <span
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-11 rounded-[300px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:!opacity-0"
        style={{
          backgroundImage: 'linear-gradient(-29.645deg, rgb(241, 255, 250) 25.264%, rgb(207, 242, 230) 59.725%)',
          filter: 'blur(4.65px)',
        }}
        aria-hidden="true"
      />
      <span className="relative z-10 text-black text-base font-acid font-medium leading-[24.44px] whitespace-nowrap">
        {children}
      </span>
    </button>
  )
}
