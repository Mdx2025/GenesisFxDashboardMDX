import { useRef, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'

export function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    const children = el.children
    gsap.set(children, { autoAlpha: 0, y: 24 })
    gsap.to(children, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.15 })
  }, [])
  useLayoutEffect(() => { animate() }, [animate])
  return ref
}
