import './Sidebar.css'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { NavButton, ModeToggle } from '@/components/ui'
import {
  DashboardIcon, AssetsIcon, TradelockerIcon, ChallengesIcon,
  GenSocialIcon, LeaderboardsIcon, StreamingIcon, MarketNewsIcon, AcademyIcon, LogoutIcon,
  ChevronDownIcon,
  IBDashboardIcon, ReferralsIcon, LinksIcon, TradesIcon,
  ComissionsIcon, PayoutsIcon, MarketingIcon, StatisticsIcon,
} from '@/components/icons'
import { navItems, partnerNavItems } from '@/data/navigation'
import type { ComponentType } from 'react'

const iconMap: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  dashboard: DashboardIcon,
  assets: AssetsIcon,
  tradelocker: TradelockerIcon,
  challenges: ChallengesIcon,
  gensocial: GenSocialIcon,
  leaderboards: LeaderboardsIcon,
  streaming: StreamingIcon,
  news: MarketNewsIcon,
  academy: AcademyIcon,
  'ib-dashboard': IBDashboardIcon,
  referrals: ReferralsIcon,
  links: LinksIcon,
  trades: TradesIcon,
  comissions: ComissionsIcon,
  payouts: PayoutsIcon,
  marketing: MarketingIcon,
  statistics: StatisticsIcon,
}

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const isPartner = location.pathname.startsWith('/partner')
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const [collapsed, setCollapsed] = useState(false)
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const navListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    onClose()
    setOpenMenus({})
  }, [location.pathname, isPartner])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = () => { if (mq.matches) onClose() }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [onClose])

  useLayoutEffect(() => {
    for (const [id, el] of Object.entries(submenuRefs.current)) {
      if (!el) continue
      const isOpen = !!openMenus[id]
      if (isOpen) {
        gsap.set(el, { height: 'auto', opacity: 1 })
        gsap.from(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
      }
    }
  }, [openMenus])

  function handleToggleCollapse() {
    if (window.innerWidth < 1024) {
      onClose()
      return
    }
    const next = !collapsed
    if (next) setOpenMenus({})
    setCollapsed(next)
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        role="presentation"
      />
      <aside
        className={`sidebar w-[315px] h-dvh bg-gfx-sidebar border-r border-[#064b34] flex flex-col shrink-0 overflow-x-hidden overflow-y-auto p-5 fixed inset-y-0 left-0 z-50 lg:sticky lg:top-0 lg:translate-x-0 lg:relative lg:z-auto transition-transform duration-300 ease-in-out lg:transition-[width,padding] lg:duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'sidebar-collapsed' : ''}`}
        aria-label="Main navigation"
      >
        <div className="relative z-10">
          <div className="sidebar-header-row flex items-center justify-between">
            <div className="flex items-center gap-3 sidebar-logo">
              <img src="/genfx-logo.png" alt="GenesisFX" className="sidebar-logo-dark w-40 h-auto [[data-theme=light]_&]:hidden" />
              {/* 1.3x the dark heights: this export's artwork occupies 33 of its 55px
                  canvas, against 70 of 90px in the dark one, so equal CSS heights
                  would render the light wordmark visibly smaller. */}
              <img src="/genfx-logo-light.png" alt="GenesisFX" className="hidden h-[52px] w-auto [[data-theme=light]_&]:block" />
            </div>
            <button
              className="shrink-0 hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded-xl cursor-pointer"
              onClick={handleToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                width="33" height="33" viewBox="0 0 33 33" fill="none"
                className={`sidebar-collapse-icon transition-transform duration-300 ease-in-out ${collapsed ? 'rotate-180' : 'rotate-0'}`}
              >
                <path className="sidebar-collapse-icon__box" d="M10.2275 0.5H22.5C27.8722 0.5 32.2275 4.85531 32.2275 10.2275V22.5C32.2275 27.8722 27.8722 32.2275 22.5 32.2275H10.2275C4.85532 32.2275 0.500001 27.8722 0.5 22.5V10.2275C0.5 4.85532 4.85531 0.5 10.2275 0.5Z"/>
                <path className="sidebar-collapse-icon__chevron" d="M19.4313 22.4993L13.2949 16.3629L19.4313 10.2266" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <span className="sidebar-tagline optical-text sidebar-hide">AI-Powered Trading</span>
        </div>

        <div className="sidebar-divider w-full sidebar-hide" aria-hidden="true">
          <svg viewBox="0 0 269 2" fill="none"><path d="M0.511368 0.51136H268.466" stroke="url(#sidebar-grad-1)" strokeWidth="1.02273" strokeLinecap="round"/><defs><linearGradient id="sidebar-grad-1" x1="7.67" y1="1.01" x2="268.47" y2="1.01" gradientUnits="userSpaceOnUse"><stop className="sidebar-divider-edge" stopColor="#0F221C"/><stop className="sidebar-divider-center" offset="0.56" stopColor="#005C3D"/><stop className="sidebar-divider-edge" offset="1" stopColor="#0F221C"/></linearGradient></defs></svg>
        </div>

        <div className="relative z-10">
          <h2 className="sidebar-overview-label text-gfx-neutral-500 font-normal sidebar-hide">Overview</h2>
          <nav aria-label="Main menu">
            <ul ref={navListRef} className="sidebar-nav-list flex flex-col relative" role="list">
              {(isPartner ? partnerNavItems : navItems).map((item) => {
                const Icon = iconMap[item.icon]
                const isRouteActive = location.pathname === item.href || !!item.activeOn?.includes(location.pathname) || !!item.submenu?.some(sub => !sub.disabled && (location.pathname === sub.href || location.pathname.startsWith(sub.href + '/')))
                const isActive = isRouteActive || !!(item.submenu && openMenus[item.id])
                const navContent = (
                  <NavButton
                    active={isActive}
                    expanded={item.submenu ? !!openMenus[item.id] : undefined}
                    onClick={item.submenu ? () => !collapsed && setOpenMenus(prev => {
                      const wasOpen = !!prev[item.id]
                      const next: Record<string, boolean> = {}
                      if (!wasOpen) next[item.id] = true
                      return next
                    }) : undefined}
                    as={item.submenu ? 'button' : 'div'}
                  >
                    {Icon && <Icon />}
                    <span className="optical-text sidebar-hide">{item.label}</span>
                    {item.submenu && (
                      <span
                        className={`nav-btn-chevron ml-auto text-gfx-neutral-500 transition-transform duration-200 sidebar-hide ${openMenus[item.id] ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <ChevronDownIcon />
                      </span>
                    )}
                  </NavButton>
                )
                return (
                  <li key={item.id}>
                    {item.submenu ? navContent : item.disabled ? (
                      <div aria-disabled="true">{navContent}</div>
                    ) : (
                      <Link to={item.href} aria-current={isActive ? 'page' : undefined}>
                        {navContent}
                      </Link>
                    )}
                    {item.submenu && (
                      <div ref={el => { submenuRefs.current[item.id] = el }} className="sidebar-hide overflow-hidden h-0 opacity-0">
                        <ul className="flex flex-col gap-0" role="list">
                          {item.submenu.map((sub) => (
                            <li key={sub.href}>
                              {sub.disabled ? (
                                <span className="sidebar-submenu-link sidebar-submenu-link--disabled optical-text" aria-disabled="true">{sub.label}</span>
                              ) : (
                                <Link to={sub.href} className="sidebar-submenu-link optical-text">{sub.label}</Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {!isPartner && (
          <Link to="/academy/video-single-page" className="sidebar-tutorial-card sidebar-hide relative z-10" aria-label="Open Genesis Tutorials">
            <span className="sidebar-tutorial-play" aria-hidden="true">
              <svg width="15" height="18" viewBox="0 0 15 18" fill="none"><path d="M14 7.268C15.333 8.038 15.333 9.962 14 10.732L3.5 16.794C2.167 17.564.5 16.602.5 15.062V2.938C.5 1.398 2.167.436 3.5 1.206L14 7.268Z" fill="white"/></svg>
            </span>
            <span className="sidebar-tutorial-copy">
              <strong className="optical-text">Genesis Tutorials</strong>
              <small className="optical-text">Step-by-step video guides</small>
            </span>
            <svg className="sidebar-tutorial-arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true"><path d="M1 1L7 7L1 13" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        )}

        <div className="sidebar-footer relative z-10 flex flex-col">
          <div className="flex flex-col gap-3 sidebar-hide">
            <h3 className="sidebar-switch-label optical-text font-medium">Switch Modes</h3>
            <ModeToggle
              activeIndex={location.pathname.startsWith('/partner') ? 1 : 0}
              onChange={(index) => navigate(index === 1 ? '/partner' : '/home')}
            />
          </div>
          <div className="sidebar-logout">
          <NavButton>
            <LogoutIcon />
            <span className="optical-text sidebar-hide">Logout</span>
          </NavButton>
          </div>
        </div>
      </aside>
    </>
  )
}
