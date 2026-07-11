import { useState, useRef, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import './ModeToggle.css'

const folderIcon = (color: string) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.72442 4.38329C1.66663 4.68959 1.66663 5.05732 1.66663 5.79276V11.668C1.66663 14.8107 1.66663 16.382 2.64294 17.3583C3.61925 18.3346 5.1906 18.3346 8.33329 18.3346H11.6666C14.8093 18.3346 16.3807 18.3346 17.357 17.3583C18.3333 16.382 18.3333 14.8107 18.3333 11.668V9.83289C18.3333 7.63925 18.3333 6.54243 17.6921 5.82949C17.6331 5.76392 17.5707 5.7015 17.5051 5.64252C16.7922 5.0013 15.6953 5.0013 13.5017 5.0013H13.1903C12.2289 5.0013 11.7482 5.0013 11.3003 4.87362C11.0542 4.80347 10.817 4.70523 10.5934 4.58082C10.1863 4.35436 9.84644 4.01445 9.16663 3.33464L8.70808 2.87609C8.48023 2.64824 8.3663 2.53431 8.24658 2.43506C7.73039 2.00716 7.09717 1.74487 6.4296 1.68245C6.27476 1.66797 6.11365 1.66797 5.79142 1.66797C5.05597 1.66797 4.68825 1.66797 4.38195 1.72576C3.03355 1.98017 1.97883 3.03489 1.72442 4.38329ZM10.2083 8.33464C10.2083 7.98946 10.4881 7.70964 10.8333 7.70964H15C15.3451 7.70964 15.625 7.98946 15.625 8.33464C15.625 8.67981 15.3451 8.95964 15 8.95964H10.8333C10.4881 8.95964 10.2083 8.67981 10.2083 8.33464Z" fill={color} />
  </svg>
)

const OPTION_ICONS: Record<string, (color: string) => ReactNode> = {
  Client: (color) => (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="4.5" r="3" fill={color} />
      <ellipse cx="9" cy="12.75" rx="5.25" ry="3" fill={color} />
    </svg>
  ),
  Partner: (color) => (
    <svg width="16" height="16" viewBox="0 0 20 18" fill="none">
      <circle cx="7" cy="4.5" r="2.8" fill={color} />
      <ellipse cx="7" cy="12.5" rx="4.5" ry="2.8" fill={color} />
      <circle cx="14" cy="5.5" r="2.2" fill={color} opacity="0.55" />
      <ellipse cx="14" cy="13" rx="3.5" ry="2.2" fill={color} opacity="0.55" />
    </svg>
  ),
  'All notes': folderIcon,
  Trade: folderIcon,
  Day: folderIcon,
  Account: folderIcon,
  Text1: folderIcon,
}

interface ModeToggleProps {
  options?: string[]
  defaultIndex?: number
  activeIndex?: number
  onChange?: (index: number) => void
  size?: 'default' | 'sm'
}

export function ModeToggle({ options = ['Client', 'Partner'], defaultIndex = 0, activeIndex, onChange, size = 'default' }: ModeToggleProps) {
  const [internalActive, setInternalActive] = useState(defaultIndex)
  const active = activeIndex ?? internalActive
  const indicatorRef = useRef<HTMLDivElement>(null)
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    if (!indicatorRef.current) return

    const xPct = active * 100

    if (isFirst.current) {
      gsap.set(indicatorRef.current, { xPercent: xPct })
      isFirst.current = false
    } else {
      gsap.to(indicatorRef.current, {
        xPercent: xPct,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }, [active])

  return (
    <div className={`mode-toggle${size === 'sm' ? ' mode-toggle-sm' : ''}`} role="group" aria-label="Mode selection">
      <div
        ref={indicatorRef}
        className="mode-indicator"
        style={{ width: `${100 / options.length}%` }} /* dynamic */
        aria-hidden="true"
      >
        <div className="glow-emerald-mode" aria-hidden="true" />
        <div className="fading-border" aria-hidden="true" />
        <svg className="absolute" style={{ left: '78%', top: '60%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute opacity-50" style={{ left: '67%', top: '72%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '40%', top: '10%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '55%', top: '80%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '69%', top: '18%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '39%', top: '73%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '26%', top: '25%' }} width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
          <circle cx="1.5" cy="1.5" r="0.5" fill="#8C8C8C" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute" style={{ left: '10%', top: '64%' }} width="4" height="3" viewBox="0 0 4 3" fill="none" aria-hidden="true">
          <ellipse cx="2" cy="1.5" rx="1" ry="0.5" fill="#8C8C8C" filter="url(#mt_sparkle)" />
        </svg>
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <filter id="mt_sparkle" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
        </svg>
      </div>
      {options.map((option, i) => {
        const isActive = active === i
        const iconFn = OPTION_ICONS[option]
        return (
          <button
            key={option}
            className={isActive ? 'active' : ''}
            onClick={() => { setInternalActive(i); onChange?.(i) }}
            aria-pressed={isActive}
          >
            {iconFn && <span className="btn-icon">{iconFn(isActive ? '#fff' : '#606060')}</span>}
            <span className="btn-label">{option}</span>
          </button>
        )
      })}
    </div>
  )
}
