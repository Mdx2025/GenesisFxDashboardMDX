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
import { ClaimUsernameModal } from '@/components/modals/ClaimUsernameModal'
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
  const [activeModal, setActiveModal] = useState<string | null>(null)
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
        className={`sidebar w-[315px] h-dvh bg-gfx-sidebar border-r border-[#064b34] flex flex-col shrink-0 overflow-hidden px-5 py-3 fixed inset-y-0 left-0 z-50 lg:sticky lg:top-0 lg:translate-x-0 lg:relative lg:z-auto transition-transform duration-300 ease-in-out lg:transition-[width,padding] lg:duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'sidebar-collapsed' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-header relative z-10">
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

        <div className="sidebar-divider w-full py-5 sidebar-hide" aria-hidden="true">
          <svg viewBox="0 0 269 2" fill="none"><path d="M0.511368 0.51136H268.466" stroke="url(#sidebar-grad-1)" strokeWidth="1.02273" strokeLinecap="round"/><defs><linearGradient id="sidebar-grad-1" x1="7.67" y1="1.01" x2="268.47" y2="1.01" gradientUnits="userSpaceOnUse"><stop className="sidebar-divider-edge" stopColor="#0F221C"/><stop className="sidebar-divider-center" offset="0.56" stopColor="#005C3D"/><stop className="sidebar-divider-edge" offset="1" stopColor="#0F221C"/></linearGradient></defs></svg>
        </div>

        <div
          className="sidebar-overview-scroll relative z-10"
          data-lenis-prevent
          tabIndex={0}
          aria-label="Overview navigation"
        >
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
                    }) : item.opensModal ? () => setActiveModal(item.opensModal!) : undefined}
                    as={item.submenu || item.opensModal ? 'button' : 'div'}
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
                    {item.submenu || item.opensModal ? navContent : item.disabled ? (
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
          <Link
            to="/academy/video-single-page"
            className="sidebar-tutorial-card sidebar-hide relative z-10 mt-2 flex h-[71px] w-full shrink-0 items-center overflow-hidden rounded-[16px] border border-[#A0A0A0] bg-[linear-gradient(0deg,#09241C_29%,#0C1311_88%)] px-3"
            aria-label="Open Genesis Tutorials"
          >
            <span className="relative grid size-[47px] shrink-0 place-items-center rounded-full border border-[#064B34] bg-[linear-gradient(218deg,#064B34_0%,#0C1311_95%)]" aria-hidden="true">
              <svg className="theme-preserve-light ml-0.5 h-[13px] w-3 text-white drop-shadow-[8px_8px_4px_rgba(128,128,128,0.65)]" viewBox="0 0 12 13" fill="none">
                <path d="M11.25 5.201a1.5 1.5 0 0 1 0 2.598l-8.5 4.907A1.5 1.5 0 0 1 .5 11.407V1.593A1.5 1.5 0 0 1 2.75.294l8.5 4.907Z" fill="currentColor" />
              </svg>
            </span>
            <span className="ml-[9px] flex min-w-0 flex-col">
              <strong className="optical-text whitespace-nowrap font-acid text-[16px] font-normal leading-[19.2px] text-[#ECECEC]">Genesis Tutorials</strong>
              <small className="optical-text whitespace-nowrap font-acid text-[14px] font-normal leading-[18.8px] text-[#A0A0A0]">Step-by-step video guides</small>
            </span>
            <svg className="relative z-10 ml-auto mr-1 h-[11px] w-[6px] shrink-0" viewBox="0 0 6 11" fill="none" aria-hidden="true">
              <path d="M.75.75 5.5 5.5.75 10.25" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute bottom-[14px] right-[36px] size-[1.6px] rounded-full bg-white blur-[0.8px]" aria-hidden="true" />
            <span className="absolute bottom-[6px] right-[54px] size-[1.6px] rounded-full bg-white/50 blur-[0.8px]" aria-hidden="true" />
            <span className="absolute right-[98px] top-[20px] size-[1.6px] rounded-full bg-[#ACACAC] blur-[0.8px]" aria-hidden="true" />
            <span className="absolute bottom-0 right-[74px] size-[1.6px] rounded-full bg-[#ACACAC] blur-[0.8px]" aria-hidden="true" />
            <span className="absolute right-[51px] top-[26px] size-[1.6px] rounded-full bg-[#ACACAC] blur-[0.8px]" aria-hidden="true" />
            <span className="absolute bottom-[5px] right-[99px] size-[1.6px] rounded-full bg-[#ACACAC] blur-[0.8px]" aria-hidden="true" />
            <span className="absolute right-[120px] top-[31px] size-[1.6px] rounded-full bg-[#8C8C8C] blur-[0.8px]" aria-hidden="true" />
            <span className="absolute bottom-[11px] left-[85px] h-[1.6px] w-[2.4px] rounded-full bg-[#8C8C8C] blur-[0.8px]" aria-hidden="true" />
          </Link>
        )}

        <div className="sidebar-footer relative z-10 mt-7.5 flex flex-col gap-7.5 [@media(max-height:900px)]:mt-2 [@media(max-height:900px)]:gap-3">
          <div className="sidebar-hide flex flex-col gap-5 [@media(max-height:900px)]:gap-2">
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
      <ClaimUsernameModal
        open={activeModal === 'claim-username' || activeModal === 'claim-username-streaming'}
        onClose={() => setActiveModal(null)}
        onContinue={activeModal === 'claim-username' ? () => navigate('/leaderboards') : activeModal === 'claim-username-streaming' ? () => navigate('/streaming') : undefined}
      />
    </>
  )
}
