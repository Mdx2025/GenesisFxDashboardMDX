import { Link } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard } from '@/components/ui'
import { PAGE_REGISTRY } from '@/data/pages'

const DIRECTORY_PAGES = PAGE_REGISTRY.filter(p => p.showInDirectory !== false)

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
          {DIRECTORY_PAGES.map((page) => {
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
