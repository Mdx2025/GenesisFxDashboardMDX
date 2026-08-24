import { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'

interface SuccessSnackbarProps {
  open: boolean
  message?: string
  duration?: number
  /** Replaces the default check glyph. Falls back to the success check when omitted. */
  icon?: ReactNode
  onClose: () => void
}

export function FollowIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <circle cx="7" cy="3.5" r="3.5" fill="#10BC83" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9375 17.5C9.49382 17.5 8.77199 17.5 8.32349 17.0515C7.875 16.603 7.875 15.8812 7.875 14.4375C7.875 12.9938 7.875 12.272 8.32349 11.8235C8.77199 11.375 9.49382 11.375 10.9375 11.375C12.3812 11.375 13.103 11.375 13.5515 11.8235C14 12.272 14 12.9938 14 14.4375C14 15.8812 14 16.603 13.5515 17.0515C13.103 17.5 12.3812 17.5 10.9375 17.5ZM11.4479 13.0764C11.4479 12.7945 11.2194 12.566 10.9375 12.566C10.6556 12.566 10.4271 12.7945 10.4271 13.0764V13.9271H9.57639C9.29449 13.9271 9.06597 14.1556 9.06597 14.4375C9.06597 14.7194 9.29449 14.9479 9.57639 14.9479H10.4271V15.7986C10.4271 16.0805 10.6556 16.309 10.9375 16.309C11.2194 16.309 11.4479 16.0805 11.4479 15.7986V14.9479H12.2986C12.5805 14.9479 12.809 14.7194 12.809 14.4375C12.809 14.1556 12.5805 13.9271 12.2986 13.9271H11.4479V13.0764Z" fill="#10BC83" />
      <path d="M10.2184 10.0649C9.80448 10.07 9.41865 10.085 9.08243 10.1303C8.51991 10.2059 7.90419 10.3866 7.39543 10.8954C6.88667 11.4042 6.70591 12.0199 6.63028 12.5824C6.56232 13.0879 6.56241 13.7055 6.56251 14.3623V14.5127C6.56241 15.1694 6.56232 15.7871 6.63028 16.2926C6.68335 16.6873 6.78819 17.1082 7.0218 17.5C7.01454 17.5 7.00727 17.5 7 17.5C0 17.5 0 15.7371 0 13.5625C0 11.3879 3.13401 9.625 7 9.625C8.16041 9.625 9.25487 9.78383 10.2184 10.0649Z" fill="#10BC83" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.3333 9.66667C19.3333 15.0054 15.0054 19.3333 9.66667 19.3333C4.32791 19.3333 0 15.0054 0 9.66667C0 4.32791 4.32791 0 9.66667 0C15.0054 0 19.3333 4.32791 19.3333 9.66667ZM13.5627 6.73735C13.8458 7.02048 13.8458 7.47952 13.5627 7.76265L8.72932 12.596C8.44619 12.8791 7.98714 12.8791 7.70401 12.596L5.77068 10.6627C5.48755 10.3795 5.48755 9.92048 5.77068 9.63735C6.05381 9.35422 6.51286 9.35422 6.79599 9.63735L8.21667 11.058L10.377 8.89769L12.5373 6.73735C12.8205 6.45422 13.2795 6.45422 13.5627 6.73735Z" fill="#10BC83"/>
    </svg>
  )
}

export function SuccessSnackbar({ open, message = 'Successful Transfer', duration = 4000, icon, onClose }: SuccessSnackbarProps) {
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
      className="fixed z-toast overflow-hidden top-6 right-[1.5rem] w-[24rem] h-[5rem] bg-[rgba(255,255,255,0.05)] rounded-md shadow-[0px_1.25px_0px_1.25px_rgba(255,255,255,0.04)_inset,0px_5.01px_25.07px_rgba(0,0,0,0.20)] outline outline-1 outline-offset-[-1.25px] outline-[rgba(255,255,255,0.05)] backdrop-blur-[25px]"
      role="status"
      aria-live="polite"
    >
      {/* Decorative glows */}
      <div className="theme-decorative-glow absolute pointer-events-none w-[587px] h-[384px] left-[251px] top-[-333px] rotate-[48deg] origin-top-left bg-gfx-surface-dark rounded-full blur-[157px]" aria-hidden="true" />
      <div className="theme-decorative-glow absolute pointer-events-none w-[493px] h-[288px] left-[-17px] top-[-28px] bg-gfx-green-dark rounded-full blur-[157px]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3 pl-[1.8125rem] pt-[1.5625rem]">
        {/* Glow check icon */}
        {icon ?? (
          <div className="relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute left-[-2px] top-[-2px] blur-[1px]" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.4242 11.7575C21.4242 17.0962 17.0962 21.4242 11.7575 21.4242C6.41873 21.4242 2.09082 17.0962 2.09082 11.7575C2.09082 6.41873 6.41873 2.09082 11.7575 2.09082C17.0962 2.09082 21.4242 6.41873 21.4242 11.7575ZM15.6535 8.82817C15.9366 9.1113 15.9366 9.57034 15.6535 9.85347L10.8201 14.6868C10.537 14.9699 10.078 14.9699 9.79483 14.6868L7.8615 12.7535C7.57837 12.4703 7.57837 12.0113 7.8615 11.7282C8.14463 11.445 8.60368 11.445 8.88681 11.7282L10.3075 13.1488L12.4678 10.9885L14.6282 8.82817C14.9113 8.54504 15.3703 8.54504 15.6535 8.82817Z" fill="#10BC83"/>
            </svg>
            <CheckIcon />
          </div>
        )}
        <span className="text-white font-acid font-medium text-base leading-6">{message}</span>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute left-0 right-0 bottom-[6px] h-1">
        {/* Track */}
        <div className="absolute inset-0 bg-gfx-green-100 rounded-2xl" />
        {/* Animated fill */}
        <div
          ref={barRef}
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,75,52,0)_0%,#CFF2E6_100%)] rounded-2xl blur-[3.95px]"
        />
        {/* Glow layers */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(16,185,129,0.4),rgba(4,120,87,0.3))] rounded-2xl blur-[2px]" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(16,185,129,0.2),rgba(4,120,87,0.2))] rounded-2xl blur-sm" aria-hidden="true" />
      </div>
    </div>
  )
}
