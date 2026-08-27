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
  General: (color) => (
    <svg width="16" height="16" viewBox="0 0 12.6667 13.3333" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.51921 0.101494C7.27231 0 6.95932 0 6.33333 0C5.70735 0 5.39435 0 5.14746 0.101494C4.81827 0.236819 4.55673 0.496385 4.42037 0.823089C4.35813 0.972227 4.33377 1.14567 4.32423 1.39866C4.31022 1.77045 4.11811 2.1146 3.79344 2.30062C3.46879 2.48664 3.07243 2.47969 2.74099 2.30584C2.51545 2.18753 2.35192 2.12175 2.19066 2.10068C1.83739 2.05452 1.48012 2.14953 1.19744 2.3648C0.985425 2.52625 0.828928 2.79526 0.515935 3.33329C0.202943 3.87131 0.046446 4.14032 0.0115647 4.40327C-0.0349436 4.75387 0.0607874 5.10844 0.277698 5.38899C0.376704 5.51704 0.515849 5.62468 0.731803 5.75935C1.04928 5.95732 1.25355 6.29457 1.25353 6.66668C1.25351 7.03875 1.04924 7.37595 0.731801 7.5739C0.515811 7.70858 0.376648 7.81624 0.277632 7.9443C0.0607216 8.22485 -0.0350094 8.57942 0.0114989 8.93002C0.0463802 9.19297 0.202877 9.46198 0.51587 10C0.828863 10.538 0.985359 10.807 1.19737 10.9685C1.48005 11.1838 1.83733 11.2788 2.19059 11.2326C2.35185 11.2115 2.51537 11.1458 2.74089 11.0275C3.07235 10.8536 3.46873 10.8467 3.79341 11.0327C4.11809 11.2187 4.31022 11.5629 4.32424 11.9347C4.33377 12.1877 4.35813 12.3611 4.42037 12.5102C4.55673 12.837 4.81827 13.0965 5.14746 13.2318C5.39435 13.3333 5.70735 13.3333 6.33333 13.3333C6.95932 13.3333 7.27231 13.3333 7.51921 13.2318C7.8484 13.0965 8.10994 12.837 8.2463 12.5102C8.30854 12.3611 8.3329 12.1877 8.34243 11.9347C8.35644 11.5629 8.54854 11.2187 8.87318 11.0327C9.19786 10.8466 9.59427 10.8536 9.92574 11.0274C10.1512 11.1457 10.3148 11.2115 10.476 11.2326C10.8293 11.2787 11.1865 11.1837 11.4692 10.9684C11.6812 10.807 11.8377 10.538 12.1507 9.99995C12.4637 9.46193 12.6202 9.19292 12.6551 8.92997C12.7016 8.57938 12.6059 8.2248 12.389 7.94426C12.29 7.8162 12.1508 7.70855 11.9348 7.57387C11.6174 7.37591 11.4131 7.03869 11.4131 6.66661C11.4132 6.29457 11.6174 5.95739 11.9348 5.75946C12.1508 5.62476 12.29 5.5171 12.389 5.38903C12.6059 5.10849 12.7017 4.75391 12.6552 4.40332C12.6203 4.14037 12.4638 3.87136 12.1508 3.33333C11.8378 2.79531 11.6813 2.5263 11.4693 2.36485C11.1866 2.14957 10.8293 2.05457 10.4761 2.10072C10.3148 2.12179 10.1513 2.18757 9.92578 2.30586C9.59432 2.47973 9.19793 2.48668 8.87325 2.30064C8.54857 2.1146 8.35644 1.77044 8.34243 1.39863C8.3329 1.14565 8.30854 0.97222 8.2463 0.823089C8.10994 0.496385 7.8484 0.236819 7.51921 0.101494ZM6.33333 8.66667C7.44631 8.66667 8.34856 7.77124 8.34856 6.66667C8.34856 5.5621 7.44631 4.66667 6.33333 4.66667C5.22035 4.66667 4.3181 5.5621 4.3181 6.66667C4.3181 7.77124 5.22035 8.66667 6.33333 8.66667Z" fill={color} />
    </svg>
  ),
  Visibility: (color) => (
    <svg width="18" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M7.75 8C7.75 6.75736 8.75736 5.75 10 5.75C11.2426 5.75 12.25 6.75736 12.25 8C12.25 9.24264 11.2426 10.25 10 10.25C8.75736 10.25 7.75 9.24264 7.75 8Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 9.63938 0.424964 10.1915 1.27489 11.2957C2.97196 13.5004 5.81811 16 10 16C14.1819 16 17.028 13.5004 18.7251 11.2957C19.575 10.1915 20 9.63938 20 8C20 6.36062 19.575 5.80853 18.7251 4.70433C17.028 2.49956 14.1819 0 10 0C5.81811 0 2.97196 2.49956 1.27489 4.70433C0.424964 5.80853 0 6.36062 0 8ZM10 4.25C7.92893 4.25 6.25 5.92893 6.25 8C6.25 10.0711 7.92893 11.75 10 11.75C12.0711 11.75 13.75 10.0711 13.75 8C13.75 5.92893 12.0711 4.25 10 4.25Z" fill={color} />
    </svg>
  ),
  Access: (color) => (
    <svg width="16" height="17" viewBox="0 0 20 20.75" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.25 8.80461V6.75C3.25 3.02208 6.27208 0 10 0C13.7279 0 16.75 3.02208 16.75 6.75V8.80461C17.8648 8.88786 18.5907 9.09805 19.1213 9.62868C20 10.5074 20 11.9216 20 14.75C20 17.5784 20 18.9926 19.1213 19.8713C18.2426 20.75 16.8284 20.75 14 20.75H6C3.17157 20.75 1.75736 20.75 0.87868 19.8713C0 18.9926 0 17.5784 0 14.75C0 11.9216 0 10.5074 0.87868 9.62868C1.40931 9.09805 2.13525 8.88786 3.25 8.80461ZM4.75 6.75C4.75 3.85051 7.10051 1.5 10 1.5C12.8995 1.5 15.25 3.85051 15.25 6.75V8.75357C14.867 8.75 14.4515 8.75 14 8.75H6C5.54849 8.75 5.13301 8.75 4.75 8.75357V6.75Z" fill={color} />
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
  buttonClassName?: string
  ariaLabel?: string
  scrollable?: boolean
}

export function ModeToggle({ options = ['Client', 'Partner'], defaultIndex = 0, activeIndex, onChange, size = 'default', buttonClassName = '', ariaLabel = 'Mode selection', scrollable = false }: ModeToggleProps) {
  const [internalActive, setInternalActive] = useState(defaultIndex)
  const active = activeIndex ?? internalActive
  const containerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    const container = containerRef.current
    const indicator = indicatorRef.current
    if (!container || !indicator) return

    // Tracks are no longer guaranteed to be equal, so the indicator follows the
    // measured active button instead of an assumed 1/n slice.
    const mobileQuery = window.matchMedia('(max-width: 639px)')
    const applyGeometry = (animate: boolean) => {
      const activeButton = buttonRefs.current[active]
      const geometry = activeButton
        ? { x: activeButton.offsetLeft, xPercent: 0, width: activeButton.offsetWidth }
        : { x: 0, xPercent: active * 100, width: `${100 / options.length}%` }

      if (animate) {
        gsap.to(indicator, { ...geometry, duration: 0.2, ease: 'power2.out' })
      } else {
        gsap.set(indicator, geometry)
      }
    }

    applyGeometry(!isFirst.current)
    isFirst.current = false

    const handleGeometryChange = () => applyGeometry(false)
    const resizeObserver = new ResizeObserver(handleGeometryChange)
    resizeObserver.observe(container)
    // The container is always full width, so only the tracks report the reflow
    // that follows a webfont swap or a label change.
    buttonRefs.current.forEach((button) => button && resizeObserver.observe(button))
    mobileQuery.addEventListener('change', handleGeometryChange)

    return () => {
      resizeObserver.disconnect()
      mobileQuery.removeEventListener('change', handleGeometryChange)
    }
  }, [active, options.length])

  return (
    <div
      ref={containerRef}
      className={`mode-toggle${size === 'sm' ? ' mode-toggle-sm' : ''}${scrollable ? ' mode-toggle-scrollable' : ''}`}
      role="group"
      aria-label={ariaLabel}
    >
      <div
        ref={indicatorRef}
        className="mode-indicator"
        style={{ width: `${100 / options.length}%` }}
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
            ref={(node) => { buttonRefs.current[i] = node }}
            className={`${isActive ? 'active' : ''} ${buttonClassName}`}
            onClick={() => { setInternalActive(i); onChange?.(i) }}
            aria-pressed={isActive}
          >
            {iconFn && <span className="btn-icon">{iconFn(isActive ? '#fff' : '#A3A3A3')}</span>}
            <span className="btn-label optical-text">{option}</span>
          </button>
        )
      })}
    </div>
  )
}
