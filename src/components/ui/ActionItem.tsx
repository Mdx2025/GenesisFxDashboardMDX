import type { ReactNode } from 'react'

interface ActionItemProps {
  title: string
  subtitle: string
  icon: ReactNode
}

export function ActionItem({ title, subtitle, icon }: ActionItemProps) {
  return (
    <button className="w-full h-24 rounded-2xl outline outline-[1.25px] outline-white/5 flex items-center gap-4 px-5 bg-transparent hover:bg-white/[0.02] transition-colors text-left">
      <div className="size-14 bg-teal-500/5 rounded-xl outline outline-[1.25px] outline-offset-[-1.25px] outline-teal-500/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[16px] text-white">{title}</div>
        <div className="text-gfx-neutral-300 text-[14px]">{subtitle}</div>
      </div>
    </button>
  )
}
