import './NavButton.css'
import type { ReactNode } from 'react'

interface NavButtonProps {
  active?: boolean
  expanded?: boolean
  children: ReactNode
  onClick?: () => void
  as?: 'button' | 'div'
}

export function NavButton({ active = false, expanded, children, onClick, as = 'button' }: NavButtonProps) {
  const Tag = as
  return (
    <Tag
      className={`nav-btn rounded-sm py-2.5 lg:py-2 2xl:py-3 3xl:py-4 4xl:py-5 px-2 3xl:px-4 4xl:px-5 ${active ? 'active' : ''}`}
      aria-current={active ? 'page' : undefined}
      aria-expanded={expanded}
      onClick={onClick}
    >
      {children}
      {active && (
        <div className="active-indicator" aria-hidden="true" />
      )}
    </Tag>
  )
}
