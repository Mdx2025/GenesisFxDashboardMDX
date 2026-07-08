import { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react'
import gsap from 'gsap'

interface EmailVerificationSnackbarProps {
  open: boolean
  duration?: number
  onClose: () => void
}

function EmailIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.702944 0.702944C0 1.40589 0 2.53726 0 4.8C0 7.06274 0 8.19411 0.702944 8.89706C1.40589 9.6 2.53726 9.6 4.8 9.6H7.2C9.46274 9.6 10.5941 9.6 11.2971 8.89706C12 8.19411 12 7.06274 12 4.8C12 2.53726 12 1.40589 11.2971 0.702944C10.5941 0 9.46274 0 7.2 0H4.8C2.53726 0 1.40589 0 0.702944 0.702944ZM9.9457 2.11192C10.1048 2.30284 10.079 2.5866 9.88808 2.7457L8.57019 3.84394C8.03838 4.28714 7.60733 4.64635 7.22689 4.89103C6.8306 5.14592 6.44465 5.30693 6 5.30693C5.55535 5.30693 5.1694 5.14592 4.77311 4.89103C4.39267 4.64635 3.96163 4.28714 3.42981 3.84395L2.11192 2.7457C1.92099 2.5866 1.8952 2.30284 2.0543 2.11192C2.2134 1.92099 2.49716 1.8952 2.68808 2.0543L3.98342 3.13375C4.5432 3.60023 4.93184 3.92305 5.25995 4.13408C5.57757 4.33835 5.79296 4.40693 6 4.40693C6.20704 4.40693 6.42243 4.33835 6.74005 4.13408C7.06816 3.92305 7.4568 3.60023 8.01658 3.13375L9.31192 2.0543C9.50284 1.8952 9.7866 1.92099 9.9457 2.11192Z" fill="white" />
    </svg>
  )
}

export function EmailVerificationSnackbar({ open, duration = 5000, onClose }: EmailVerificationSnackbarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClose = useCallback(() => {
    const el = ref.current
    if (!el) { onClose(); return }
    gsap.to(el, {
      autoAlpha: 0, y: -20, duration: 0.3, ease: 'power2.in',
      onComplete: () => { setMounted(false); onClose() },
    })
  }, [onClose])

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return

    gsap.set(el, { autoAlpha: 0, y: -20 })
    gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' })

    timeoutRef.current = setTimeout(handleClose, duration)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [mounted, duration, handleClose])

  if (!mounted) return null

  return (
    <div
      ref={ref}
      className="fixed z-[200] top-[1.5rem] left-1/2 -translate-x-1/2"
      role="status"
      aria-live="polite"
    >
      <div
        className="relative w-[min(25.9375rem,calc(100vw-3rem))] overflow-hidden rounded-[1.16rem] bg-[#0C1311] font-acid shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)] outline outline-[1.16px] -outline-offset-[1.16px] outline-[#0C1311]"
      >
        {/* Decorative glows */}
        <div className="absolute pointer-events-none w-[587px] h-[435px] left-[477px] top-[-281px] rotate-[48deg] origin-top-left bg-[#064B34] rounded-full blur-[157px]" aria-hidden="true" />
        <div className="absolute pointer-events-none w-[493px] h-[278px] left-[-17px] top-[61px] bg-[#064B34] rounded-full blur-[157px]" aria-hidden="true" />
        <div className="absolute pointer-events-none w-[237px] h-[237px] left-[502px] top-[-61px] opacity-30 mix-blend-color bg-[#0D4532] rounded-full blur-[87px]" aria-hidden="true" />

        {/* Divider glow */}
        <div className="absolute left-4 top-0 w-[calc(100%-2rem)] h-[1.25px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)]" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 px-[1.4375rem] py-[2rem] flex flex-col gap-[0.25rem]">
          <div className="flex items-center gap-[0.5rem]">
            <span className="text-white text-[1rem] font-medium leading-[1.525rem]">Check your email</span>
            <EmailIcon />
          </div>
          <p className="text-[#808080] text-[1rem] font-medium leading-[1.525rem]">
            We've sent a verification link to your email.
          </p>
          <p className="text-[#808080] text-[1rem] font-medium leading-[1.525rem]">
            Please click it to confirm your account before<br />signing in
          </p>
        </div>
      </div>
    </div>
  )
}
