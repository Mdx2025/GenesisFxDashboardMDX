import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, SparkleButton } from '../ui'

interface CloseAccountModalProps {
  open: boolean
  onClose: () => void
}

export function CloseAccountModal({ open, onClose }: CloseAccountModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [confirmText, setConfirmText] = useState('')

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
      setConfirmText('')
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

  const isConfirmed = confirmText === 'CLOSE'

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Close Account"
    >
      <div ref={modalRef} className="relative w-[49.5625rem] max-w-[95vw]">
        <GlassCard variant="light" rounded="1.875rem" className="surface-raised overflow-hidden">
          {/* Green glow blurs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[1.875rem]" aria-hidden="true">
            <div className="theme-decorative-glow absolute w-[30.8125rem] h-[17.375rem] -left-[11.6875rem] bottom-0 translate-y-[20%] bg-[#064B34] rounded-full" style={{ filter: 'url(#blur-157)' }} />
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

          <div className="relative flex flex-col items-center px-5 sm:px-10 lg:px-[7.1875rem] pt-10 lg:pt-[7.9375rem] pb-10 lg:pb-40">
            {/* Title — danger red */}
            <h3 className="text-[#D46356] text-[2.25rem] font-acid mb-[0.9375rem]">Close Account</h3>

            {/* Warning paragraph 1 */}
            <p className="text-[#808080] text-[0.875rem] font-acid leading-[1.175rem] text-center max-w-[35.1875rem]">
              Are you sure you want to close your account? This action will submit a request to our support team to permanently delete your account
              <br />and all associated data.
            </p>

            {/* Warning paragraph 2 */}
            <p className="text-[#808080] text-[0.875rem] font-acid leading-[1.175rem] text-center max-w-[35.1875rem] mt-[2.5625rem]">
              This action cannot be undone. All your data, including trading
              <br />history, wallets, and settings will be permanently removed
            </p>

            {/* Type CLOSE to confirm */}
            <div className="w-full max-w-[34.125rem] mt-[2.625rem]">
              <div className="flex items-center mb-[0.6875rem]">
                <span className="text-white text-base font-acid font-medium leading-[1.5275rem]">Type</span>
                <span className="text-[#D46356] text-base font-acid font-medium leading-[1.5275rem]">&nbsp;CLOSE</span>
                <span className="text-white text-base font-acid font-medium leading-[1.5275rem]">&nbsp;to confirm</span>
              </div>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type CLOSE"
                className="surface-raised w-full h-[3.125rem] border border-[#064B34] rounded-[1.875rem] px-[1.625rem] text-white text-base font-acid placeholder:text-[#808080] outline-none focus:border-[#D46356] transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-[5.625rem]">
              <SparkleButton onClick={handleClose}>Cancel</SparkleButton>
              <button
                disabled={!isConfirmed}
                className={`h-[2.75rem] px-[1.9375rem] rounded-[18.75rem] text-base font-acid font-medium leading-[1.5275rem] transition-opacity ${
                  isConfirmed
                    ? 'bg-[#2A1411] text-[#D46356] cursor-pointer hover:opacity-80'
                    : 'bg-[#2A1411] text-[#D46356] opacity-50 cursor-not-allowed'
                }`}
              >
                Close Account
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
