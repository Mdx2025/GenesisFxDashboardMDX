import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ActionItemProps {
  title: string
  subtitle: string
  icon: ReactNode
  href?: string
}

export function ActionItem({ title, subtitle, icon, href }: ActionItemProps) {
  const className = "w-full flex-1 rounded-md outline outline-1 outline-white/5 flex items-center gap-3 2xl:gap-4 px-4 2xl:px-5 bg-transparent hover:bg-white/[0.02] transition-colors text-left cursor-pointer"

  const content = (
    <>
      <div className="size-10 2xl:size-14 bg-teal-500/5 rounded-md outline outline-1 outline-offset-[-1.25px] outline-teal-500/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <span className="text-btn text-white block">{title}</span>
        <span className="text-gfx-neutral-300 text-body1 block">{subtitle}</span>
      </div>
    </>
  )

  if (href) {
    return <Link to={href} className={className}>{content}</Link>
  }

  return <button className={className}>{content}</button>
}
