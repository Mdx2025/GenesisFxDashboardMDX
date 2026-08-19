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
      className={`nav-btn ${active ? 'active' : ''}`}
      aria-current={active ? 'page' : undefined}
      aria-expanded={expanded}
      onClick={onClick}
    >
      {children}
      {active && (
        <>
          <div className="active-indicator" aria-hidden="true" />
          <div className="star star-1" aria-hidden="true" />
          <div className="star star-2" aria-hidden="true" />
          <div className="star star-3" aria-hidden="true" />
          <div className="star star-4" aria-hidden="true" />
          <div className="star star-5" aria-hidden="true" />
          <div className="star star-6" aria-hidden="true" />
        </>
      )}
    </Tag>
  )
}
