import './Sidebar.css'
import { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import gsap from 'gsap'
import { NavButton, ModeToggle } from '@/components/ui'
import {
  DashboardIcon, AssetsIcon, TradelockerIcon, ChallengesIcon,
  GenSocialIcon, MarketNewsIcon, AcademyIcon, LogoutIcon,
  ChevronDownIcon,
} from '@/components/icons'
import { navItems } from '@/data/navigation'
import { GLOW_GREEN } from '@/constants/colors'
import type { ComponentType } from 'react'

const iconMap: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  dashboard: DashboardIcon,
  assets: AssetsIcon,
  tradelocker: TradelockerIcon,
  challenges: ChallengesIcon,
  gensocial: GenSocialIcon,
  news: MarketNewsIcon,
  academy: AcademyIcon,
}

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const [collapsed, setCollapsed] = useState(false)
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const submenuInitialized = useRef<Set<string>>(new Set())
  const navListRef = useRef<HTMLUListElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const isFirstHighlight = useRef(true)

  const updateHighlight = useCallback(() => {
    const list = navListRef.current
    const highlight = highlightRef.current
    if (!list || !highlight) return
    const activeEl = list.querySelector('.nav-btn.active') as HTMLElement | null
    if (activeEl) {
      const listRect = list.getBoundingClientRect()
      const elRect = activeEl.getBoundingClientRect()
      const top = elRect.top - listRect.top
      const height = elRect.height
      if (isFirstHighlight.current) {
        highlight.style.transition = 'none'
        isFirstHighlight.current = false
      } else {
        highlight.style.transition = 'top 0.35s cubic-bezier(0.4, 0, 0.2, 1), height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease'
      }
      highlight.style.top = `${top}px`
      highlight.style.height = `${height}px`
      highlight.style.opacity = '1'
    } else {
      highlight.style.opacity = '0'
    }
  }, [])

  useEffect(() => {
    updateHighlight()
  }, [location.pathname, updateHighlight])

  useLayoutEffect(() => {
    for (const [id, isOpen] of Object.entries(openMenus)) {
      const el = submenuRefs.current[id]
      if (!el) continue
      if (!submenuInitialized.current.has(id)) {
        submenuInitialized.current.add(id)
      }
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
        className={`sidebar w-[260px] 2xl:w-xs 3xl:w-[var(--width-sidebar-3xl)] 4xl:w-[var(--width-sidebar-4xl)] h-dvh bg-black border-r border-zinc-900 flex flex-col shrink-0 overflow-hidden p-3.5 lg:p-4 2xl:p-6 3xl:p-8 4xl:p-10 fixed inset-y-0 left-0 z-[60] lg:sticky lg:top-0 lg:translate-x-0 lg:relative lg:z-auto transition-transform duration-300 ease-in-out lg:transition-[width,padding] lg:duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'sidebar-collapsed' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-top-glow" aria-hidden="true" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sidebar-logo">
              <img src="/genfx-logo.png" alt="GenesisFX" className="h-10 3xl:h-14 4xl:h-18 w-auto" />
            </div>
            <button
              className="shrink-0 hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded-xl cursor-pointer"
              onClick={handleToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                width="33" height="33" viewBox="0 0 33 33" fill="none"
                className={`transition-transform duration-300 ease-in-out ${collapsed ? 'rotate-180' : 'rotate-0'}`}
              >
                <path d="M0 10.227C0 4.579 4.579 0 10.227 0H22.5c5.648 0 10.227 4.579 10.227 10.227V22.5c0 5.648-4.579 10.227-10.227 10.227H10.227C4.579 32.727 0 28.148 0 22.5V10.227z" fill="#04281C"/>
                <path d="M19.431 22.5L13.295 16.364 19.431 10.227" stroke="#808080" strokeWidth="1.023" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <span className="px-4 text-sidebar-label text-white sidebar-hide">AI-Powered Trading</span>
        </div>

        <div className="w-full py-2.5 2xl:py-4 sidebar-hide" aria-hidden="true">
          <svg viewBox="0 0 269 2" fill="none"><path d="M0.511368 0.51136H268.466" stroke="url(#sidebar-grad-1)" strokeWidth="1.02273" strokeLinecap="round"/><defs><linearGradient id="sidebar-grad-1" x1="7.67" y1="1.01" x2="268.47" y2="1.01" gradientUnits="userSpaceOnUse"><stop stopColor="#0F221C"/><stop offset="0.56" stopColor="#005C3D"/><stop offset="1" stopColor="#0F221C"/></linearGradient></defs></svg>
        </div>

        <div className="relative z-10 mb-1.5 2xl:mb-2">
          <h2 className="text-sidebar-label text-gfx-neutral-300 mb-2 2xl:mb-3 font-normal sidebar-hide">User Account</h2>
          <div className="user-card flex items-center gap-3 p-3 rounded-lg bg-zinc-950 outline outline-1 outline-offset-[-1px] outline-[#064B34] relative overflow-hidden">
            <div className="user-card-glow" aria-hidden="true" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-[200px] h-[80px] rounded-full blur-[80px] pointer-events-none bg-gfx-glow-green" aria-hidden="true" />
            <div className="relative z-10 w-9 h-9 3xl:w-12 3xl:h-12 4xl:w-16 4xl:h-16 rounded-2xl bg-teal-950 flex items-center justify-center text-white text-sidebar-btn overflow-hidden shrink-0">
              <svg className="absolute top-[-4px] left-[9px]" width="37" height="37" viewBox="0 0 37 37" fill="none" aria-hidden="true">
                <ellipse cx="18.5" cy="1.5" rx="9.5" ry="5.5" fill="#4CFFC4" filter="url(#blur-30)" />
              </svg>
              <span className="relative z-10">M</span>
            </div>
            <div className="relative z-10 sidebar-hide">
              <p className="text-white text-sidebar-label leading-5">Marcelo Cedeno</p>
              <time className="text-gfx-neutral-300 text-sidebar-label leading-5 block" dateTime="2025-09-27">Sep 27th, 2025</time>
            </div>
          </div>
        </div>

        <div className="w-full py-2.5 2xl:py-4 sidebar-hide" aria-hidden="true">
          <svg viewBox="0 0 269 2" fill="none"><path d="M0.511368 0.51136H268.466" stroke="url(#sidebar-grad-2)" strokeWidth="1.02273" strokeLinecap="round"/><defs><linearGradient id="sidebar-grad-2" x1="7.67" y1="1.01" x2="268.47" y2="1.01" gradientUnits="userSpaceOnUse"><stop stopColor="#0F221C"/><stop offset="0.56" stopColor="#005C3D"/><stop offset="1" stopColor="#0F221C"/></linearGradient></defs></svg>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto">
          <h2 className="text-sidebar-label text-gfx-neutral-300 mb-2 2xl:mb-3 font-normal sidebar-hide">Overview</h2>
          <nav aria-label="Main menu">
            <ul ref={navListRef} className="flex flex-col gap-1 relative" role="list">
              <div
                ref={highlightRef}
                className="absolute left-0 right-0 rounded-md bg-[#171717] outline outline-1 outline-[#171717] outline-offset-[-1px] pointer-events-none z-0"
                style={{ opacity: 0, top: 0, height: 0 }}
                aria-hidden="true"
              />
              {navItems.map((item) => {
                const Icon = iconMap[item.icon]
                const isActive = location.pathname === item.href || !!item.activeOn?.includes(location.pathname)
                const navContent = (
                  <NavButton
                    active={isActive}
                    expanded={item.submenu ? !!openMenus[item.id] : undefined}
                    onClick={item.submenu ? () => !collapsed && setOpenMenus(prev => ({ ...prev, [item.id]: !prev[item.id] })) : undefined}
                    as={item.submenu ? 'button' : 'div'}
                  >
                    {Icon && <Icon />}
                    <span className="sidebar-hide">{item.label}</span>
                    {item.submenu && (
                      <span
                        className={`ml-auto text-gfx-neutral-500 transition-transform duration-200 sidebar-hide ${openMenus[item.id] ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <ChevronDownIcon />
                      </span>
                    )}
                  </NavButton>
                )
                return (
                  <li key={item.id} className="relative z-[1]">
                    {item.submenu ? navContent : (
                      <Link to={item.href} aria-current={isActive ? 'page' : undefined}>
                        {navContent}
                      </Link>
                    )}
                    {item.submenu && (
                      <div ref={el => { submenuRefs.current[item.id] = el }} className="sidebar-hide overflow-hidden h-0 opacity-0">
                        <ul className="flex flex-col gap-0" role="list">
                          {item.submenu.map((sub) => (
                            <li key={sub.href}>
                              <Link to={sub.href} className="text-gfx-neutral-500 hover:text-white text-sidebar-label py-2 px-6 hover:bg-[rgba(255,255,255,0.03)] transition-colors block rounded-md border-l-2 border-transparent hover:border-[#00B38C]">
                                {sub.label}
                              </Link>
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

        <div className="relative z-10 flex flex-col gap-3 2xl:gap-6">
          <div className="flex flex-col gap-2 sidebar-hide">
            <h3 className="text-sidebar-label text-[#A0A0A0] font-normal">Switch Modes</h3>
            <ModeToggle />
          </div>
          <NavButton>
            <LogoutIcon />
            <span className="text-[1rem] text-[#A0A0A0] sidebar-hide">Logout</span>
          </NavButton>
        </div>
      </aside>
    </>
  )
}
