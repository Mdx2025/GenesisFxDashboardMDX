import type { ReactNode } from 'react'

interface TradeButtonProps {
  children: ReactNode
  onClick?: () => void
}

export function TradeButton({ children, onClick }: TradeButtonProps) {
  return (
    <button className="w-28 h-12 relative" onClick={onClick}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-teal-700 to-teal-500 blur-xl opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-teal-400 to-teal-300 blur-md opacity-20" aria-hidden="true" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-neutral-300 to-teal-100" aria-hidden="true" />
      <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-white/20 to-transparent blur-xs" aria-hidden="true" />
      <span className="relative z-10 flex items-center justify-center h-full text-black text-sm font-medium">
        {children}
      </span>
    </button>
  )
}
