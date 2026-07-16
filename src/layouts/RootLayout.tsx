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
  const mainRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const wrapper = mainRef.current
    if (wrapper) wrapper.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    const wrapper = mainRef.current
    if (!wrapper) return

    const lenis = new Lenis({
      wrapper,
      content: wrapper.firstElementChild as HTMLElement,
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
  }, [pathname])

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <TransferContext.Provider value={{ openTransfer: () => setTransferOpen(true) }}>
        <div className="flex w-full min-h-screen bg-gfx-main text-white font-acid">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main ref={mainRef} className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden relative">
            <Outlet />
          </main>
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <FloatingNavBar />
          </div>
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
