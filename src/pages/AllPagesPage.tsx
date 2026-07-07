import { Link } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard } from '@/components/ui'
import {
  DashboardIcon, AssetsIcon, TradelockerIcon, ChallengesIcon,
  PammIcon, MarketNewsIcon, AcademyIcon,
} from '@/components/icons'
import type { ComponentType } from 'react'

interface PageLink {
  path: string
  label: string
  description: string
  icon: ComponentType<{ size?: number; color?: string }>
}

const PAGES: PageLink[] = [
  { path: '/', label: 'Dashboard', description: 'Portfolio overview, charts, and trading accounts', icon: DashboardIcon },
  { path: '/assets-management', label: 'Assets Management', description: 'Fiat wallet, funding, and transaction history', icon: AssetsIcon },
  { path: '/deposit', label: 'Deposit', description: 'Deposit crypto to your Genesis account', icon: AssetsIcon },
  { path: '/withdraw', label: 'Withdraw', description: 'Withdraw funds to your external wallet', icon: AssetsIcon },
  { path: '/challenges', label: '10x Challenges', description: 'Trading challenges and competitions', icon: ChallengesIcon },
  { path: '/pamm', label: 'PAMM Portal', description: 'Managed accounts and PAMM investments', icon: PammIcon },
  { path: '/news', label: 'Market News', description: 'Latest market updates and analysis', icon: MarketNewsIcon },
  { path: '/academy', label: 'Genesis Academy', description: 'Trading courses and educational resources', icon: AcademyIcon },
  { path: '/design-system', label: 'Design System', description: 'UI components, tokens, and guidelines', icon: TradelockerIcon },
]

export default function AllPagesPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />
      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={[{ label: 'All Pages', current: true }]}
        />

        <h1 className="text-white font-normal leading-none text-[clamp(1.5rem,0.75rem+1.5vw,3.5rem)] mb-8">All Pages</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 3xl:gap-6">
          {PAGES.map((page) => {
            const Icon = page.icon
            return (
              <Link key={page.path} to={page.path} className="group">
                <GlassCard variant="heavy" rounded="18px" className="h-full transition-all duration-300 group-hover:outline group-hover:outline-1 group-hover:outline-gfx-green-500/30">
                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gfx-green-100 flex items-center justify-center">
                        <Icon size={18} color="#10BC83" />
                      </div>
                      <h2 className="text-white text-lg font-normal">{page.label}</h2>
                    </div>
                    <p className="text-gfx-neutral-300 text-sm leading-relaxed">{page.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-gfx-green-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span>{page.path}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
