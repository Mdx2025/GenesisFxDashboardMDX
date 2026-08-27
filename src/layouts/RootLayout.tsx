import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { FloatingNavBar } from '@/components/ui'
import { TransferModal } from '@/components/dashboard/TransferModal'
import { TransferProcessingModal } from '@/components/dashboard/TransferProcessingModal'
import Lenis from 'lenis'

interface SidebarContextValue {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextValue>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

const TransferContext = createContext<{ openTransfer: () => void }>({ openTransfer: () => {} })

export function useTransfer() {
  return useContext(TransferContext)
}



export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [transferProcessing, setTransferProcessing] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const { pathname } = useLocation()
  const mobileTabBarBottom = pathname === '/news/podcast' ? 'bottom-[116px]' : 'bottom-6'

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      autoResize: true,
    })

    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <TransferContext.Provider value={{ openTransfer: () => setTransferOpen(true) }}>
        <div className="theme-root flex w-full min-h-dvh bg-gfx-main text-white font-acid">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 min-w-0 relative" style={{ overflowX: 'clip' }}>
            <Outlet />
          </main>
          {!sidebarOpen && (
            <div className={`lg:hidden fixed ${mobileTabBarBottom} left-1/2 -translate-x-1/2 z-50`} data-mobile-tab-bar>
              <FloatingNavBar />
            </div>
          )}
        </div>
        <TransferModal
          open={transferOpen}
          onClose={() => setTransferOpen(false)}
          onTransfer={() => { setTransferOpen(false); setTransferProcessing(true) }}
        />
        <TransferProcessingModal
          open={transferProcessing}
          onClose={() => setTransferProcessing(false)}
          onComplete={() => setTransferProcessing(false)}
        />
      </TransferContext.Provider>
    </SidebarContext.Provider>
  )
}
