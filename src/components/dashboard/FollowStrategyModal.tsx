import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { SparkleButton, GlowButton } from '@/components/ui'

interface FollowStrategyModalProps {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  strategyName: string
  username: string
  initials: string
  pricePerMonth: string
  profitShare: string
}

export function FollowStrategyModal({
  open,
  onClose,
  onConfirm,
  strategyName,
  username,
  initials,
  pricePerMonth,
  profitShare,
}: FollowStrategyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [agreed, setAgreed] = useState(false)

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
      setAgreed(false)
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

  const monthlyAmount = pricePerMonth === 'Free' ? '$0.00' : pricePerMonth
  const perfFee = profitShare === '0%' ? '0%' : profitShare

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-sticky flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Follow Strategy"
    >
      <div
        ref={modalRef}
        className="relative w-[510px] max-w-[95vw] bg-gfx-green-800 rounded-xl border border-gfx-green-800 shadow-md overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[26px] top-[26px] w-6 h-6"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="px-[39px] pt-[46px] pb-[44px]">
          {/* Title */}
          <h2 className="text-white font-acid text-2xl leading-none">Follow Strategy</h2>
          <p className="text-gfx-neutral-500 text-sm font-acid leading-5 mt-3">
            Review the fees and terms before following this strategy
          </p>

          {/* Strategy info */}
          <div className="flex items-center gap-5.5 mt-[27px]">
            <div className="w-[40px] h-[40px] rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-acid font-medium">{initials}</span>
            </div>
            <div>
              <p className="text-white text-lg font-acid leading-none">{strategyName}</p>
              <p className="text-gfx-neutral-500 text-xs font-acid leading-5 mt-[4px]">{username}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gfx-neutral-250 mt-[22px]" />

          {/* Subscription Fees */}
          <p className="text-white text-xs font-acid leading-5 mt-6">Subscription Fees</p>

          <div className="border border-gfx-neutral-250 rounded-md mt-3 overflow-hidden">
            {/* Monthly subscription */}
            <div className="flex items-center justify-between px-6 py-3.5">
              <span className="text-gfx-neutral-600 text-xs font-acid leading-5">Monthly subscription</span>
              <span className="text-gfx-neutral-600 text-xs font-acid leading-5">
                {monthlyAmount}<span className="text-gfx-neutral-500"> / mo</span>
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gfx-neutral-250" />

            {/* Performance fee */}
            <div className="flex items-center justify-between px-6 py-3.5">
              <span className="text-gfx-neutral-600 text-xs font-acid leading-5">Perfomance fee</span>
              <span className="text-gfx-neutral-600 text-xs font-acid leading-5">
                {perfFee}<span className="text-gfx-neutral-500"> of profits</span>
              </span>
            </div>

            {/* Charges today (highlighted row) */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-[rgba(16,188,131,0.08)]">
              <span className="text-gfx-neutral-600 text-xs font-acid leading-5">Charges today</span>
              <span className="text-gfx-neutral-600 text-xs font-acid leading-5">{monthlyAmount}</span>
            </div>
          </div>

          {/* Legal notice */}
          <div className="flex gap-3 mt-5">
            <div className="flex-shrink-0 mt-0.5">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M16 2H2C0.9 2 0 2.9 0 4V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V4C18 2.9 17.1 2 16 2ZM16 16H2V4H16V16Z" fill="#00b38c"/>
                <path d="M9 14L4 9L5.4 7.6L9 11.2L14.6 5.6L16 7L9 14Z" fill="#00b38c"/>
              </svg>
            </div>
            <p className="text-gfx-neutral-500 text-sm font-acid leading-5">
              By following this strategy you agree to our{' '}
              <span className="text-white">Signal Subscription Terms & Conditions.</span>{' '}
              You acknowledge that trading signals are for informational purposes only and do not constitute financial advice. Past performance does not guarantee future results. You may unfollow at any time. Applicable fees will be charged as described above.
            </p>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 mt-4">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`flex-shrink-0 w-[13px] h-[13px] rounded-[2.4px] mt-1 cursor-pointer flex items-center justify-center transition-colors ${
                agreed ? 'bg-gfx-green-300' : 'border border-gfx-neutral-250 bg-transparent'
              }`}
            >
              {agreed && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <p className="text-white text-sm font-acid leading-5">
              I have read and agree to the{' '}
              <span className="text-gfx-green-300 underline cursor-pointer">Signal Subscription Terms</span>
              <br />
              <span className="text-gfx-green-300 underline cursor-pointer">& Conditions</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5 mt-8 justify-center">
            <SparkleButton className="px-[22px] w-[152px]" onClick={handleClose}>
              <span className="text-gfx-neutral-550">Cancel</span>
            </SparkleButton>
            <GlowButton
              label="Confirm Follow"
              width="197px"
              disabled={!agreed}
              onClick={() => { handleClose(); onConfirm?.() }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
