import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

interface WaveTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  duration?: number
  stagger?: number
}

export function WaveText({ children, as: Tag = 'span', className = '', delay = 0.2, duration = 0.6, stagger = 0.03 }: WaveTextProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const split = SplitText.create(el, { type: 'chars', mask: 'chars' })

    gsap.set(split.chars, { yPercent: 110 })
    gsap.to(split.chars, {
      yPercent: 0,
      duration,
      stagger: { each: stagger, from: 'start' },
      ease: 'power3.out',
      delay,
    })

    return () => { split.revert() }
  }, [children, delay, duration, stagger])

  return <Tag ref={ref as any} className={className}>{children}</Tag>
}
