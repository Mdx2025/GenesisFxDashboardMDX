import { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react'
import gsap from 'gsap'

interface SuccessSnackbarProps {
  open: boolean
  message?: string
  duration?: number
  onClose: () => void
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.3333 9.66667C19.3333 15.0054 15.0054 19.3333 9.66667 19.3333C4.32791 19.3333 0 15.0054 0 9.66667C0 4.32791 4.32791 0 9.66667 0C15.0054 0 19.3333 4.32791 19.3333 9.66667ZM13.5627 6.73735C13.8458 7.02048 13.8458 7.47952 13.5627 7.76265L8.72932 12.596C8.44619 12.8791 7.98714 12.8791 7.70401 12.596L5.77068 10.6627C5.48755 10.3795 5.48755 9.92048 5.77068 9.63735C6.05381 9.35422 6.51286 9.35422 6.79599 9.63735L8.21667 11.058L10.377 8.89769L12.5373 6.73735C12.8205 6.45422 13.2795 6.45422 13.5627 6.73735Z" fill="#10BC83"/>
    </svg>
  )
}

export function SuccessSnackbar({ open, message = 'Successful Transfer', duration = 4000, onClose }: SuccessSnackbarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClose = useCallback(() => {
    const el = ref.current
    if (!el) { onClose(); return }
    gsap.to(el, {
      opacity: 0, x: 40, duration: 0.25, ease: 'power2.in',
      onComplete: () => { setMounted(false); onClose() },
    })
  }, [onClose])

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    const el = ref.current
    const bar = barRef.current
    if (!el || !bar) return

    gsap.set(el, { opacity: 0, x: 40 })
    gsap.to(el, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' })

    gsap.set(bar, { scaleX: 1, transformOrigin: 'right center' })
    gsap.to(bar, { scaleX: 0, duration: duration / 1000, ease: 'none' })

    timeoutRef.current = setTimeout(handleClose, duration)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [mounted, duration, handleClose])

  if (!mounted) return null

  return (
    <div
      ref={ref}
      className="fixed z-[200] overflow-hidden"
      style={{
        top: 24,
        right: 24,
        width: 384,
        height: 80,
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        boxShadow: '0px 1.25px 0px 1.25px rgba(255,255,255,0.04) inset, 0px 5.01px 25.07px rgba(0,0,0,0.20)',
        outline: '1.25px rgba(255,255,255,0.05) solid',
        outlineOffset: -1.25,
        backdropFilter: 'blur(25px)',
      }}
      role="status"
      aria-live="polite"
    >
      {/* Decorative glows */}
      <div className="absolute pointer-events-none" style={{ width: 587, height: 384, left: 251, top: -333, transform: 'rotate(48deg)', transformOrigin: 'top left', background: '#09090b', borderRadius: 9999, filter: 'blur(157px)' }} aria-hidden="true" />
      <div className="absolute pointer-events-none" style={{ width: 493, height: 288, left: -17, top: -28, background: '#14532d', borderRadius: 9999, filter: 'blur(157px)' }} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3" style={{ paddingLeft: 29, paddingTop: 25 }}>
        {/* Glow check icon */}
        <div className="relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute" style={{ left: -2, top: -2, filter: 'blur(1px)' }} aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M21.4242 11.7575C21.4242 17.0962 17.0962 21.4242 11.7575 21.4242C6.41873 21.4242 2.09082 17.0962 2.09082 11.7575C2.09082 6.41873 6.41873 2.09082 11.7575 2.09082C17.0962 2.09082 21.4242 6.41873 21.4242 11.7575ZM15.6535 8.82817C15.9366 9.1113 15.9366 9.57034 15.6535 9.85347L10.8201 14.6868C10.537 14.9699 10.078 14.9699 9.79483 14.6868L7.8615 12.7535C7.57837 12.4703 7.57837 12.0113 7.8615 11.7282C8.14463 11.445 8.60368 11.445 8.88681 11.7282L10.3075 13.1488L12.4678 10.9885L14.6282 8.82817C14.9113 8.54504 15.3703 8.54504 15.6535 8.82817Z" fill="#10BC83"/>
          </svg>
          <CheckIcon />
        </div>
        <span className="text-white font-acid font-medium text-base leading-6">{message}</span>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute left-0 right-0 bottom-[6px]" style={{ height: 4 }}>
        {/* Track */}
        <div className="absolute inset-0" style={{ background: '#01130D', borderRadius: 30 }} />
        {/* Animated fill */}
        <div
          ref={barRef}
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(6,75,52,0) 0%, #CFF2E6 100%)', borderRadius: 30, filter: 'blur(3.95px)' }}
        />
        {/* Glow layers */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(16,185,129,0.4), rgba(4,120,87,0.3))', borderRadius: 30, filter: 'blur(2px)' }} aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(16,185,129,0.2), rgba(4,120,87,0.2))', borderRadius: 30, filter: 'blur(4px)' }} aria-hidden="true" />
      </div>
    </div>
  )
}
