import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ActionItemProps {
  title: string
  subtitle: string
  icon: ReactNode
  href?: string
}

export function ActionItem({ title, subtitle, icon, href }: ActionItemProps) {
  const className = 'w-full flex-1 min-h-0 py-1.5 xl:py-2 rounded-md outline outline-1 outline-white/5 flex items-center gap-2.5 xl:gap-3 px-2.5 xl:px-3 bg-transparent hover:bg-white/[0.02] transition-colors text-left cursor-pointer'

  const content = (
    <>
      <div className="size-8 xl:size-10 bg-teal-500/5 rounded-md outline outline-1 outline-offset-[-1.25px] outline-teal-500/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-base xl:text-btn text-white block leading-tight truncate">{title}</span>
        <span className="text-gfx-neutral-300 text-sm xl:text-body2 block leading-tight truncate">{subtitle}</span>
      </div>
    </>
  )

  if (href) {
    return <Link to={href} className={className}>{content}</Link>
  }

  return <button className={className}>{content}</button>
}
