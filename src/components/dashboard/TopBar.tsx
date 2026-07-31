import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Breadcrumb, ThemeSwitch } from '@/components/ui'
import { LanguageDropdown } from '@/components/ui/LanguageDropdown'
import { HelpIcon } from '@/components/icons'
import './NotificationPanel.css'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
  onClick?: () => void
}

interface TopBarProps {
  onMenuClick: () => void
  menuOpen?: boolean
  breadcrumbItems?: BreadcrumbItem[]
}

const SCROLL_THRESHOLD = 8

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'trade' as const, title: 'Trade Executed', message: 'EUR/USD Buy order filled at 1.0892', time: '2m ago', unread: true },
  { id: '2', type: 'alert' as const, title: 'Price Alert', message: 'GBP/USD reached your target of 1.2750', time: '15m ago', unread: true },
  { id: '3', type: 'system' as const, title: 'Margin Warning', message: 'Your margin level is approaching 120%', time: '1h ago', unread: false },
  { id: '4', type: 'trade' as const, title: 'Stop Loss Triggered', message: 'USD/JPY position closed at 149.32', time: '3h ago', unread: false },
  { id: '5', type: 'system' as const, title: 'Market Closed', message: 'Weekend maintenance window starting', time: '1d ago', unread: false },
]

function NotificationIcon({ type }: { type: 'trade' | 'alert' | 'system' }) {
  if (type === 'trade') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11L6 7L9 10L14 5" stroke="#00B38C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 5H14V9" stroke="#00B38C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
  if (type === 'alert') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3V8.5" stroke="#e29d58" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="11.5" r="0.75" fill="#e29d58"/><path d="M3.5 13.5H12.5L8 2.5L3.5 13.5Z" stroke="#e29d58" strokeWidth="1.2" strokeLinejoin="round" fill="none"/></svg>
  )
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#5b9cf5" strokeWidth="1.2"/><path d="M8 5.5V8.5" stroke="#5b9cf5" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="10.75" r="0.6" fill="#5b9cf5"/></svg>
  )
}

function ChevronRight() {
  return (
    <svg width="4" height="7" viewBox="0 0 4 7" fill="none" aria-hidden="true">
      <path d="M0.5 6.5L3.5 3.5L0.5 0.5" stroke="#808080" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d="M6.1953 14.4541H3.44205C3.07695 14.4541 2.7268 14.309 2.46863 14.0509C2.21047 13.7927 2.06543 13.4425 2.06543 13.0774V3.44108C2.06543 3.07597 2.21047 2.72582 2.46863 2.46766C2.7268 2.20949 3.07695 2.06445 3.44205 2.06445H6.1953" stroke="#808080" strokeWidth="1.239"/>
      <path d="M11.0117 11.6995L14.4533 8.25797L11.0117 4.81641" stroke="#808080" strokeWidth="1.239"/>
      <path d="M14.456 8.25977H6.19629" stroke="#808080" strokeWidth="1.239"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M7.62 1H5.67292C4.7908 0.999993 4.09209 0.999987 3.54527 1.0738C2.98251 1.14977 2.52701 1.30982 2.1678 1.67048C1.80858 2.03114 1.64917 2.48846 1.57351 3.05348C1.49999 3.6025 1.49999 4.30401 1.5 5.18967V8.10843C1.5 8.8625 1.95998 9.50869 2.61358 9.77961C2.57994 9.32488 2.57997 8.68684 2.58 8.15602L2.58 5.6988L2.58 5.65121C2.57996 5.01037 2.57993 4.45822 2.63914 4.01606C2.7026 3.54219 2.84569 3.08796 3.21265 2.71953C3.57961 2.3511 4.03202 2.20743 4.50399 2.14372C4.94439 2.08427 5.49433 2.0843 6.1326 2.08434L6.18 2.08434H7.62L7.6674 2.08434C8.30567 2.0843 8.85442 2.08427 9.29481 2.14372C9.03135 1.47389 8.3808 1 7.62 1Z" fill="#808080"/>
      <path d="M3.2998 5.69821C3.2998 4.33511 3.2998 3.65356 3.72157 3.2301C4.14334 2.80664 4.82216 2.80664 6.1798 2.80664H7.6198C8.97745 2.80664 9.65627 2.80664 10.078 3.2301C10.4998 3.65356 10.4998 4.33511 10.4998 5.69821V8.10785C10.4998 9.47094 10.4998 10.1525 10.078 10.576C9.65627 10.9994 8.97745 10.9994 7.6198 10.9994H6.1798C4.82216 10.9994 4.14334 10.9994 3.72157 10.576C3.2998 10.1525 3.2998 9.47094 3.2998 8.10785V5.69821Z" fill="#808080"/>
    </svg>
  )
}

const USER_MENU_ITEMS = [
  { label: 'Profile', href: '/settings', active: true },
  { label: 'Verification', href: '/kyc' },
  { label: 'Partner', href: '/partner' },
  { label: 'Support', href: '#' },
  { label: 'Settings', href: '/settings' },
  { label: 'Language', href: '#' },
]

export function TopBar({ onMenuClick, menuOpen = false, breadcrumbItems }: TopBarProps) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userMenuMounted, setUserMenuMounted] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const userMenuPanelRef = useRef<HTMLDivElement>(null)
  const userMenuBackdropRef = useRef<HTMLDivElement>(null)
  const userMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const userMenuTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const lastY = useRef(0)

  function openUserMenu() {
    setUserMenuMounted(true)
    setUserMenuOpen(true)
  }

  function closeUserMenu(restoreFocus = true) {
    setUserMenuOpen(false)
    if (restoreFocus) requestAnimationFrame(() => userMenuTriggerRef.current?.focus())
  }

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1279px)')
    setIsMobile(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)

    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 10)
      if (Math.abs(y - lastY.current) < SCROLL_THRESHOLD) return
      setHidden(y > lastY.current && y > 56)
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      mq.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        closeUserMenu()
      }
    }
    if (notifOpen || userMenuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [notifOpen, userMenuOpen])

  useEffect(() => {
    if (!userMenuMounted) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeUserMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [userMenuMounted])

  useLayoutEffect(() => {
    if (!userMenuMounted || !userMenuPanelRef.current || !userMenuBackdropRef.current) return

    const panel = userMenuPanelRef.current
    const backdrop = userMenuBackdropRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let focusTimer: number | undefined
    userMenuTimelineRef.current?.kill()

    if (reduceMotion) {
      gsap.set(panel, { autoAlpha: userMenuOpen ? 1 : 0, y: 0, scale: 1 })
      gsap.set(backdrop, { autoAlpha: userMenuOpen ? 1 : 0 })
      if (!userMenuOpen) setUserMenuMounted(false)
      return
    }

    if (userMenuOpen) {
      userMenuTimelineRef.current = gsap
        .timeline()
        .set([panel, backdrop], { visibility: 'visible' })
        .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: 'power2.out' }, 0)
        .fromTo(
          panel,
          { autoAlpha: 0, y: -9, scale: 0.975, transformOrigin: 'top right' },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.34, ease: 'power3.out' },
          0,
        )
        .fromTo(
          panel.querySelectorAll('[data-user-menu-item]'),
          { autoAlpha: 0, y: -3 },
          { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.018, ease: 'power2.out' },
          0.07,
        )

      focusTimer = window.setTimeout(() => {
        panel.querySelector<HTMLElement>('[data-user-menu-item]')?.focus()
      }, 120)

    } else {
      userMenuTimelineRef.current = gsap
        .timeline({ onComplete: () => setUserMenuMounted(false) })
        .to(panel, { autoAlpha: 0, y: -6, scale: 0.985, duration: 0.2, ease: 'power2.in' }, 0)
        .to(backdrop, { opacity: 0, duration: 0.18, ease: 'power2.in' }, 0)
    }

    return () => {
      if (focusTimer) window.clearTimeout(focusTimer)
      userMenuTimelineRef.current?.kill()
    }
  }, [userMenuMounted, userMenuOpen])

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => n.unread).length

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
            ? 'fixed left-0 right-0 z-40 px-4 py-3'
            : 'sticky z-40 py-4 -mx-4 xl:-mx-5 2xl:-mx-7 3xl:-mx-10 4xl:-mx-14 px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14'
        }`}
        style={{
          top: hidden ? '-5rem' : '0',
          background: scrolled ? 'var(--color-gfx-surface-blur)' : 'transparent',
          backdropFilter: scrolled ? 'url(#blur-23)' : 'none',
          WebkitBackdropFilter: scrolled ? 'url(#blur-23)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
          transition: 'top 400ms cubic-bezier(0.4, 0, 0.15, 1), background 300ms ease, border-bottom 300ms ease, backdrop-filter 300ms ease',
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

        <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 shrink-0 min-w-0">
          <div className="hidden lg:flex items-center gap-2">
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

          <div className="flex items-center gap-1.5 h-9 px-3 rounded-sm bg-gfx-green-800">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.0427 1.04175H9.95602C9.2073 1.04173 8.58293 1.04171 8.08728 1.10834C7.56412 1.17868 7.09179 1.33341 6.71223 1.71296C6.33267 2.09252 6.17795 2.56486 6.10761 3.08802C6.05984 3.44332 6.04633 4.29298 6.04251 5.02146C4.3573 5.07651 3.34548 5.27323 2.64233 5.97639C1.66602 6.9527 1.66602 8.52405 1.66602 11.6667C1.66602 14.8094 1.66602 16.3808 2.64233 17.3571C3.61864 18.3334 5.18998 18.3334 8.33267 18.3334H11.666C14.8087 18.3334 16.3801 18.3334 17.3564 17.3571C18.3327 16.3808 18.3327 14.8094 18.3327 11.6667C18.3327 8.52405 18.3327 6.9527 17.3564 5.97639C16.6532 5.27323 15.6414 5.07651 13.9562 5.02146C13.9524 4.29298 13.9389 3.44332 13.8911 3.08802C13.8208 2.56486 13.666 2.09252 13.2865 1.71296C12.9069 1.33341 12.4346 1.17868 11.9114 1.10834C11.4158 1.04171 10.7914 1.04173 10.0427 1.04175ZM12.706 5.00165C12.7022 4.29611 12.6902 3.53681 12.6522 3.25458C12.6005 2.87003 12.5112 2.70545 12.4026 2.59685C12.294 2.48825 12.1294 2.3989 11.7449 2.3472C11.3423 2.29308 10.8027 2.29175 9.99935 2.29175C9.19601 2.29175 8.65637 2.29308 8.25384 2.3472C7.86929 2.3989 7.70471 2.48825 7.59611 2.59685C7.48752 2.70545 7.39817 2.87003 7.34646 3.25458C7.30852 3.53681 7.29653 4.29611 7.29275 5.00165C7.61893 5.00008 7.96506 5.00008 8.33268 5.00008H11.666C12.0336 5.00008 12.3798 5.00008 12.706 5.00165ZM9.99935 7.70842C10.3445 7.70842 10.6243 7.98824 10.6243 8.33342V8.34194C11.5317 8.57053 12.291 9.28592 12.291 10.2779C12.291 10.623 12.0112 10.9029 11.666 10.9029C11.3208 10.9029 11.041 10.623 11.041 10.2779C11.041 9.95783 10.6862 9.51397 9.99935 9.51397C9.31251 9.51397 8.95768 9.95783 8.95768 10.2779C8.95768 10.5979 9.31251 11.0417 9.99935 11.0417C11.1535 11.0417 12.291 11.8415 12.291 13.0556C12.291 14.0476 11.5317 14.763 10.6243 14.9916V15.0001C10.6243 15.3453 10.3445 15.6251 9.99935 15.6251C9.65417 15.6251 9.37435 15.3453 9.37435 15.0001V14.9916C8.46703 14.763 7.70768 14.0476 7.70768 13.0556C7.70768 12.7105 7.9875 12.4306 8.33268 12.4306C8.67786 12.4306 8.95768 12.7105 8.95768 13.0556C8.95768 13.3757 9.31251 13.8195 9.99935 13.8195C10.6862 13.8195 11.041 13.3757 11.041 13.0556C11.041 12.7356 10.6862 12.2917 9.99935 12.2917C8.84523 12.2917 7.70768 11.492 7.70768 10.2779C7.70768 9.28592 8.46703 8.57053 9.37435 8.34194V8.33342C9.37435 7.98824 9.65417 7.70842 9.99935 7.70842Z" fill="white"/>
            </svg>
            <span className="text-gfx-neutral-500 text-sm 3xl:text-base 4xl:text-lg font-normal">Wallet</span>
            <span className="text-white text-sm 3xl:text-base 4xl:text-lg font-normal">$100.00</span>
          </div>

          <div className="relative" ref={notifRef}>
            <button
              className="notif-btn flex items-center justify-center h-9 w-12 rounded-sm bg-gfx-green-800 hover:opacity-90 transition-opacity cursor-pointer"
              aria-label="Notifications"
              onClick={() => setNotifOpen(prev => !prev)}
            >
              <svg width="20" height="20" viewBox="0 0 28 26" fill="none" aria-hidden="true">
                <path d="M11.1625 20.1881C11.8167 21.0197 12.8444 21.5556 14 21.5556C15.1556 21.5556 16.1833 21.0197 16.8375 20.1881C14.9539 20.4433 13.0461 20.4433 11.1625 20.1881Z" fill="white"/>
                <path d="M19.2493 11.4444V11.9921C19.2493 12.6493 19.4369 13.2918 19.7884 13.8386L20.6497 15.1787C21.4365 16.4027 20.8359 18.0664 19.4675 18.4534C15.8879 19.466 12.1121 19.466 8.5325 18.4534C7.1641 18.0664 6.5635 16.4027 7.3503 15.1787L8.2116 13.8386C8.5631 13.2918 8.7507 12.6493 8.7507 11.9921V11.4444C8.7507 8.4376 11.1009 6 14 6C16.8991 6 19.2493 8.4376 19.2493 11.4444Z" fill="white"/>
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-gfx-green-300 text-tiny text-white font-medium">{unreadCount}</span>
              )}
            </button>

            {notifOpen && (
              <div className="notif-panel absolute right-0 top-[calc(100%+0.5rem)] w-80 z-50">
                <div className="notif-panel-inner rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gfx-green-200/30">
                    <span className="text-white text-sm font-medium tracking-wide">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-gfx-green-300 text-xs">{unreadCount} new</span>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto notif-scrollbar">
                    {MOCK_NOTIFICATIONS.map(n => (
                      <div key={n.id} className={`notif-item flex gap-3 px-4 py-3 cursor-pointer ${n.unread ? 'notif-unread' : ''}`}>
                        <div className="flex items-center justify-center w-8 h-8 rounded-md shrink-0" style={{ background: 'rgba(6, 75, 52, 0.3)' }}>
                          <NotificationIcon type={n.type} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white text-xs font-medium truncate">{n.title}</span>
                            {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-gfx-green-300 shrink-0" />}
                          </div>
                          <p className="text-gfx-neutral-300 text-xs leading-relaxed mt-0.5 line-clamp-2">{n.message}</p>
                          <span className="text-gfx-neutral-350 text-tiny mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center px-4 py-2.5 border-t border-gfx-green-200/30">
                    <button className="text-gfx-green-300 text-xs hover:text-gfx-green-500 transition-colors cursor-pointer">View All Notifications</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <LanguageDropdown />
          </div>

          <button className="hidden lg:flex items-center justify-center h-9 w-12 rounded-sm bg-gfx-green-800 hover:opacity-90 transition-opacity cursor-pointer" aria-label="Help">
            <HelpIcon />
          </button>

          <div className="relative" ref={userMenuRef}>
            <button
              ref={userMenuTriggerRef}
              className="flex items-center justify-center w-[2.3rem] h-[2.3rem] rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: '#064B34' }}
              onClick={() => (userMenuOpen ? closeUserMenu(false) : openUserMenu())}
              aria-label="User menu"
              aria-haspopup="dialog"
              aria-expanded={userMenuOpen}
              aria-controls="user-account-menu"
            >
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" className="absolute -top-1 left-[0.5625rem]" aria-hidden="true">
                <g filter="url(#avatar_glow)">
                  <ellipse cx="18.5" cy="1.5" rx="9.5" ry="5.5" fill="#4CFFC4"/>
                </g>
                <defs>
                  <filter id="avatar_glow" x="-51" y="-64" width="139" height="131" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur"/>
                  </filter>
                </defs>
              </svg>
              <span className="theme-preserve-light relative text-white text-[1.0625rem] font-acid">J</span>
            </button>

            {userMenuMounted && (
              <>
                <div ref={userMenuBackdropRef} className="fixed inset-0 z-40" onClick={() => closeUserMenu()} aria-hidden="true" />
                <div
                  ref={userMenuPanelRef}
                  id="user-account-menu"
                  data-user-menu-panel
                  role="dialog"
                  aria-modal="false"
                  aria-label="Account options"
                  className="user-menu-panel absolute right-0 top-[calc(100%+0.5rem)] w-[17.25rem] z-50 rounded-[0.9375rem] overflow-hidden"
                >
                  {/* User info */}
                  <div className="flex items-center gap-3 px-[0.9375rem] pt-[1.375rem] pb-4">
                    <div className="relative w-[1.875rem] h-[1.875rem] rounded-full overflow-hidden shrink-0" style={{ background: '#064B34' }}>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="absolute left-[0.458rem] -top-[0.204rem]" aria-hidden="true">
                        <g filter="url(#avatar_glow_sm)">
                          <ellipse cx="15.07" cy="1.22" rx="7.74" ry="4.48" fill="#4CFFC4"/>
                        </g>
                        <defs>
                          <filter id="avatar_glow_sm" x="-41.56" y="-52.15" width="113.26" height="106.74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="24.44" result="effect1_foregroundBlur"/>
                          </filter>
                        </defs>
                      </svg>
                      <span className="theme-preserve-light relative flex items-center justify-center w-full h-full text-white text-[0.866rem] font-acid">J</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-acid leading-[1.175rem]">Joe Doe</p>
                      <p className="text-[#808080] text-xs font-acid leading-[1.175rem]">joedoe@gmail.com</p>
                    </div>
                    <button className="shrink-0 text-[#808080] hover:text-white transition-colors cursor-pointer" aria-label="Copy email">
                      <CopyIcon />
                    </button>
                  </div>

                  {/* Menu items */}
                  <div className="flex flex-col">
                    {USER_MENU_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        data-user-menu-item
                        className={`relative flex items-center justify-between px-5 h-[2.5rem] ${item.active ? 'user-menu-link-active mx-[0.5625rem] rounded-sm' : ''} hover:opacity-80 transition-opacity`}
                        onClick={() => closeUserMenu(false)}
                      >
                        <span className="text-white text-sm font-acid leading-[1.175rem]">{item.label}</span>
                        <ChevronRight />
                      </Link>
                    ))}
                  </div>

                  {/* Theme */}
                  <div className="flex items-center justify-between px-5 mt-3 min-h-11">
                    <span className="text-white text-sm font-acid leading-[1.175rem]">Theme</span>
                    <ThemeSwitch />
                  </div>

                  {/* Logout */}
                  <button
                    className="flex items-center gap-2 px-5 mt-4 pb-5 text-[#808080] hover:text-white transition-colors cursor-pointer"
                    data-user-menu-item
                    onClick={() => closeUserMenu(false)}
                  >
                    <LogoutIcon />
                    <span className="text-[0.831rem] font-acid leading-[1.116rem]">Logout</span>
                  </button>

                  {/* Bottom decorative glow */}
                  <div className="absolute bottom-0 right-0 w-full h-[6rem] pointer-events-none overflow-hidden" aria-hidden="true">
                    <svg width="276" height="148" viewBox="0 0 276 148" fill="none" className="absolute right-[-0.5rem] bottom-[-8.5rem]">
                      <g opacity="0.2" filter="url(#usermenu_glow1)">
                        <path d="M249.717 52.9467C238.492 50.3744 228.866 70.5826 225.456 81.0083L31.3633 274.292H220.194C222.825 264.158 255.271 92.5255 262.286 76.6239C269.302 60.7224 256.83 54.2135 249.717 52.9467Z" fill="url(#usermenu_grad1)"/>
                      </g>
                      <defs>
                        <filter id="usermenu_glow1" x="-21.36" y="0" width="338.44" height="327.02" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                          <feGaussianBlur stdDeviation="26.36" result="effect1_foregroundBlur"/>
                        </filter>
                        <linearGradient id="usermenu_grad1" x1="197.62" y1="75.46" x2="113.5" y2="227.23" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#06AE76"/>
                          <stop offset="1" stopColor="#CBFFF4" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      {isMobile && <div className="h-14" aria-hidden="true" />}
    </>
  )
}
