import './NavButton.css'
import type { ReactNode } from 'react'

interface NavButtonProps {
  active?: boolean
  expanded?: boolean
  children: ReactNode
  onClick?: () => void
}

export function NavButton({ active = false, expanded, children, onClick }: NavButtonProps) {
  return (
    <button
      className={`nav-btn rounded-xl py-2.5 lg:py-2 2xl:py-3 px-2 ${active ? 'active' : ''}`}
      aria-current={active ? 'page' : undefined}
      aria-expanded={expanded}
      onClick={onClick}
    >
      {children}
      {active && (
        <>
          <div className="active-indicator" aria-hidden="true" />
          <div className="glow-teal" aria-hidden="true" />
          <div className="glow-emerald-bottom" aria-hidden="true" />
          <div className="glow-emerald-top" aria-hidden="true" />
          <div className="star star-1" aria-hidden="true" />
          <div className="star star-2" aria-hidden="true" />
          <div className="star star-3" aria-hidden="true" />
          <div className="star star-4" aria-hidden="true" />
          <div className="star star-5" aria-hidden="true" />
          <div className="star star-6" aria-hidden="true" />
        </>
      )}
    </button>
  )
}
