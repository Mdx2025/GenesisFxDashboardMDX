import { useEffect, useRef, useState } from 'react'
import { Breadcrumb } from '@/components/ui'
import { LanguageDropdown } from '@/components/ui/LanguageDropdown'
import { HelpIcon } from '@/components/icons'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface TopBarProps {
  onMenuClick: () => void
  menuOpen?: boolean
  breadcrumbItems?: BreadcrumbItem[]
}

const SCROLL_THRESHOLD = 8

export function TopBar({ onMenuClick, menuOpen = false, breadcrumbItems }: TopBarProps) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1279px)')
    setIsMobile(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)

    const main = document.querySelector('main')
    if (!main) return () => mq.removeEventListener('change', onChange)

    function onScroll() {
      const y = main!.scrollTop
      setScrolled(y > 10)
      if (Math.abs(y - lastY.current) < SCROLL_THRESHOLD) return
      setHidden(y > lastY.current && y > 56)
      lastY.current = y
    }

    main.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      main.removeEventListener('scroll', onScroll)
      mq.removeEventListener('change', onChange)
    }
  }, [])

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="topbar-blur" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="BackgroundImage" stdDeviation="11.5" result="blurred" />
            <feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="dimmed" />
            <feMerge>
              <feMergeNode in="dimmed" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <header
        className={`flex items-center justify-between gap-2 ${
          isMobile
            ? 'fixed top-0 left-0 right-0 z-40 px-4 py-3'
            : 'sticky top-0 z-40 py-4'
        }`}
        style={{
          background: scrolled ? 'rgba(10, 14, 12, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'url(#blur-23)' : 'none',
          WebkitBackdropFilter: scrolled ? 'url(#blur-23)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 400ms cubic-bezier(0.4, 0, 0.15, 1), background 300ms ease, border-bottom 300ms ease, backdrop-filter 300ms ease',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            className="lg:hidden shrink-0 cursor-pointer"
            onClick={onMenuClick}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg
              viewBox="0 0 32 32"
              className={`h-7 transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? '-rotate-45' : 'rotate-0'}`}
              aria-hidden="true"
            >
              <path
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                style={{
                  strokeDasharray: menuOpen ? '20 300' : '12 63',
                  strokeDashoffset: menuOpen ? -32.42 : 0,
                  transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                }} /* dynamic value */
              />
              <path
                d="M7 16 27 16"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </svg>
          </button>
          <div className="hidden sm:block">
            <Breadcrumb items={breadcrumbItems ?? [{ label: 'Overview' }, { label: 'Dashboard', current: true }]} />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <div className="flex items-center gap-2">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="shrink-0" aria-hidden="true">
              <g filter="url(#glow_market)">
                <rect x="12.5333" y="12.5333" width="8.77332" height="8.77332" rx="4.38666" fill="#10BC83"/>
              </g>
              <defs>
                <filter id="glow_market" x="0" y="0" width="33.84" height="33.84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="6.267"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.941 0 0 0 0 0.627 0 0 0 0.8 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
              </defs>
            </svg>
            <span className="text-gfx-green-500 text-body2 font-normal hidden sm:inline">Markets Open</span>
          </div>

          <div className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-[#0C1311]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.0427 1.04175H9.95602C9.2073 1.04173 8.58293 1.04171 8.08728 1.10834C7.56412 1.17868 7.09179 1.33341 6.71223 1.71296C6.33267 2.09252 6.17795 2.56486 6.10761 3.08802C6.05984 3.44332 6.04633 4.29298 6.04251 5.02146C4.3573 5.07651 3.34548 5.27323 2.64233 5.97639C1.66602 6.9527 1.66602 8.52405 1.66602 11.6667C1.66602 14.8094 1.66602 16.3808 2.64233 17.3571C3.61864 18.3334 5.18998 18.3334 8.33267 18.3334H11.666C14.8087 18.3334 16.3801 18.3334 17.3564 17.3571C18.3327 16.3808 18.3327 14.8094 18.3327 11.6667C18.3327 8.52405 18.3327 6.9527 17.3564 5.97639C16.6532 5.27323 15.6414 5.07651 13.9562 5.02146C13.9524 4.29298 13.9389 3.44332 13.8911 3.08802C13.8208 2.56486 13.666 2.09252 13.2865 1.71296C12.9069 1.33341 12.4346 1.17868 11.9114 1.10834C11.4158 1.04171 10.7914 1.04173 10.0427 1.04175ZM12.706 5.00165C12.7022 4.29611 12.6902 3.53681 12.6522 3.25458C12.6005 2.87003 12.5112 2.70545 12.4026 2.59685C12.294 2.48825 12.1294 2.3989 11.7449 2.3472C11.3423 2.29308 10.8027 2.29175 9.99935 2.29175C9.19601 2.29175 8.65637 2.29308 8.25384 2.3472C7.86929 2.3989 7.70471 2.48825 7.59611 2.59685C7.48752 2.70545 7.39817 2.87003 7.34646 3.25458C7.30852 3.53681 7.29653 4.29611 7.29275 5.00165C7.61893 5.00008 7.96506 5.00008 8.33268 5.00008H11.666C12.0336 5.00008 12.3798 5.00008 12.706 5.00165ZM9.99935 7.70842C10.3445 7.70842 10.6243 7.98824 10.6243 8.33342V8.34194C11.5317 8.57053 12.291 9.28592 12.291 10.2779C12.291 10.623 12.0112 10.9029 11.666 10.9029C11.3208 10.9029 11.041 10.623 11.041 10.2779C11.041 9.95783 10.6862 9.51397 9.99935 9.51397C9.31251 9.51397 8.95768 9.95783 8.95768 10.2779C8.95768 10.5979 9.31251 11.0417 9.99935 11.0417C11.1535 11.0417 12.291 11.8415 12.291 13.0556C12.291 14.0476 11.5317 14.763 10.6243 14.9916V15.0001C10.6243 15.3453 10.3445 15.6251 9.99935 15.6251C9.65417 15.6251 9.37435 15.3453 9.37435 15.0001V14.9916C8.46703 14.763 7.70768 14.0476 7.70768 13.0556C7.70768 12.7105 7.9875 12.4306 8.33268 12.4306C8.67786 12.4306 8.95768 12.7105 8.95768 13.0556C8.95768 13.3757 9.31251 13.8195 9.99935 13.8195C10.6862 13.8195 11.041 13.3757 11.041 13.0556C11.041 12.7356 10.6862 12.2917 9.99935 12.2917C8.84523 12.2917 7.70768 11.492 7.70768 10.2779C7.70768 9.28592 8.46703 8.57053 9.37435 8.34194V8.33342C9.37435 7.98824 9.65417 7.70842 9.99935 7.70842Z" fill="white"/>
            </svg>
            <span className="text-gfx-neutral-500 text-sm 3xl:text-base 4xl:text-lg font-normal">Wallet</span>
            <span className="text-white text-sm 3xl:text-base 4xl:text-lg font-normal">$100.00</span>
          </div>

          <button className="flex items-center justify-center h-9 w-12 rounded-lg bg-[#0C1311] hover:opacity-90 transition-opacity cursor-pointer" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 28 26" fill="none" aria-hidden="true">
              <path d="M11.1625 20.1881C11.8167 21.0197 12.8444 21.5556 14 21.5556C15.1556 21.5556 16.1833 21.0197 16.8375 20.1881C14.9539 20.4433 13.0461 20.4433 11.1625 20.1881Z" fill="white"/>
              <path d="M19.2493 11.4444V11.9921C19.2493 12.6493 19.4369 13.2918 19.7884 13.8386L20.6497 15.1787C21.4365 16.4027 20.8359 18.0664 19.4675 18.4534C15.8879 19.466 12.1121 19.466 8.5325 18.4534C7.1641 18.0664 6.5635 16.4027 7.3503 15.1787L8.2116 13.8386C8.5631 13.2918 8.7507 12.6493 8.7507 11.9921V11.4444C8.7507 8.4376 11.1009 6 14 6C16.8991 6 19.2493 8.4376 19.2493 11.4444Z" fill="white"/>
            </svg>
          </button>

          <LanguageDropdown />

          <button className="text-gfx-neutral-500 hover:text-white transition-colors rounded" aria-label="Help">
            <HelpIcon />
          </button>
        </div>
      </header>
      {isMobile && <div className="h-14" aria-hidden="true" />}
    </>
  )
}
