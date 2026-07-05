import type { ReactNode } from 'react'

interface ActionItemProps {
  title: string
  subtitle: string
  icon: ReactNode
}

export function ActionItem({ title, subtitle, icon }: ActionItemProps) {
  return (
    <button className="w-full h-16 xl:h-[68px] 2xl:h-24 rounded-md outline outline-[1.25px] outline-white/5 flex items-center gap-3 2xl:gap-4 px-4 2xl:px-5 bg-transparent hover:bg-white/[0.02] transition-colors text-left cursor-pointer">
      <div className="size-10 2xl:size-14 bg-teal-500/5 rounded-md outline outline-[1.25px] outline-offset-[-1.25px] outline-teal-500/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <span className="text-btn text-white block">{title}</span>
        <span className="text-gfx-neutral-300 text-body1 block">{subtitle}</span>
      </div>
    </button>
  )
}
