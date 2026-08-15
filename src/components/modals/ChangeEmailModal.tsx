import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, SparkleButton, GlowButton } from '../ui'

interface ChangeEmailModalProps {
  open: boolean
  onClose: () => void
}

function LetterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157ZM18.5762 7.51986C18.8413 7.83807 18.7983 8.31099 18.4801 8.57617L16.2837 10.4066C15.3973 11.1452 14.6789 11.7439 14.0448 12.1517C13.3843 12.5765 12.7411 12.8449 12 12.8449C11.2589 12.8449 10.6157 12.5765 9.95518 12.1517C9.32112 11.7439 8.60271 11.1452 7.71636 10.4066L5.51986 8.57617C5.20165 8.31099 5.15866 7.83807 5.42383 7.51986C5.68901 7.20165 6.16193 7.15866 6.48014 7.42383L8.63903 9.22291C9.57199 10.0004 10.2197 10.5384 10.7666 10.8901C11.2959 11.2306 11.6549 11.3449 12 11.3449C12.3451 11.3449 12.7041 11.2306 13.2334 10.8901C13.7803 10.5384 14.428 10.0004 15.361 9.22291L17.5199 7.42383C17.8381 7.15866 18.311 7.20165 18.5762 7.51986Z" fill="#00B38C" />
    </svg>
  )
}

export function ChangeEmailModal({ open, onClose }: ChangeEmailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) { onClose(); return }

    gsap.to(modal, { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlay, {
      opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => { setMounted(false); onClose() },
    })
  }, [onClose])

  useEffect(() => {
    if (open) {
      setMounted(true)
      setEmail('')
    }
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) return

    gsap.set(overlay, { opacity: 0 })
    gsap.set(modal, { opacity: 0, scale: 0.96 })
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modal, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, handleClose])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Change Email Address"
    >
      <div ref={modalRef} className="relative w-[49.5625rem] max-w-[95vw]">
        <GlassCard variant="light" rounded="1.875rem" className="surface-raised overflow-hidden">
          {/* Green glow blurs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[1.875rem]" aria-hidden="true">
            <div className="theme-decorative-glow absolute w-[30.8125rem] h-[17.375rem] -left-[9.125rem] bottom-0 translate-y-1/2 bg-[#064B34] rounded-full" style={{ filter: 'url(#blur-157)' }} />
            <div className="theme-decorative-glow absolute w-[30.8125rem] h-[17.375rem] right-0 translate-x-1/2 -top-[9.4375rem] bg-[#064B34] rounded-full" style={{ filter: 'url(#blur-157)' }} />
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[1.875rem] top-[1.875rem] w-6 h-6"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative flex flex-col items-center px-5 sm:px-10 lg:px-[7.75rem] pt-10 lg:pt-[9.6875rem] pb-10 lg:pb-[13.75rem]">
            {/* Letter icon circle */}
            <div className="w-[3.6875rem] h-[3.6875rem] rounded-full bg-gfx-surface-deep flex items-center justify-center mb-[1.625rem]">
              <LetterIcon />
            </div>

            {/* Title */}
            <h3 className="text-white text-[2.25rem] font-acid mb-[0.625rem]">Change Email Address</h3>

            {/* Subtitle */}
            <p className="text-[#808080] text-[0.875rem] font-acid leading-[1.175rem] text-center max-w-[17.875rem]">
              Enter your new email address. A verification code will be sent to confirm the change
            </p>

            {/* Email field */}
            <div className="w-full max-w-[34.125rem] mt-[1.375rem]">
              <label className="text-white text-base font-acid font-medium leading-[1.5275rem] mb-[0.6875rem] block">
                New Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email address"
                className="surface-raised w-full h-[3.125rem] border border-[#064B34] rounded-[1.875rem] px-[1.625rem] text-white text-base font-acid placeholder:text-[#808080] outline-none focus:border-gfx-green-300 transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-[4.375rem]">
              <SparkleButton onClick={handleClose}>Cancel</SparkleButton>
              <GlowButton label="Send verification" width={171} height={44} />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
