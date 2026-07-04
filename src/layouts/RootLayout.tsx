import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Lenis from 'lenis'

export default function RootLayout() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const wrapper = document.querySelector('main')
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
  }, [])

  return <Outlet />
}
