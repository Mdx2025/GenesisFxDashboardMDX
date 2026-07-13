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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Follow Strategy"
    >
      <div
        ref={modalRef}
        className="relative w-[510px] max-w-[95vw] bg-[#0c1311] rounded-[22px] border border-[#0c1311] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[26px] top-[26px] w-[24px] h-[24px]"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="px-[39px] pt-[46px] pb-[44px]">
          {/* Title */}
          <h2 className="text-white font-acid text-[24px] leading-none">Follow Strategy</h2>
          <p className="text-[#a0a0a0] text-[14px] font-acid leading-[18.8px] mt-[12px]">
            Review the fees and terms before following this strategy
          </p>

          {/* Strategy info */}
          <div className="flex items-center gap-[22px] mt-[27px]">
            <div className="w-[40px] h-[40px] rounded-full bg-[#064b34] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[12px] font-acid font-medium">{initials}</span>
            </div>
            <div>
              <p className="text-white text-[18px] font-acid leading-none">{strategyName}</p>
              <p className="text-[#a0a0a0] text-[12px] font-acid leading-[18.8px] mt-[4px]">{username}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#303030] mt-[22px]" />

          {/* Subscription Fees */}
          <p className="text-white text-[12px] font-acid leading-[18.8px] mt-[24px]">Subscription Fees</p>

          <div className="border border-[#303030] rounded-[12px] mt-[12px] overflow-hidden">
            {/* Monthly subscription */}
            <div className="flex items-center justify-between px-[24px] py-[14px]">
              <span className="text-[#ececec] text-[12px] font-acid leading-[18.8px]">Monthly subscription</span>
              <span className="text-[#ececec] text-[12px] font-acid leading-[18.8px]">
                {monthlyAmount}<span className="text-[#a0a0a0]"> / mo</span>
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#303030]" />

            {/* Performance fee */}
            <div className="flex items-center justify-between px-[24px] py-[14px]">
              <span className="text-[#ececec] text-[12px] font-acid leading-[18.8px]">Perfomance fee</span>
              <span className="text-[#ececec] text-[12px] font-acid leading-[18.8px]">
                {perfFee}<span className="text-[#a0a0a0]"> of profits</span>
              </span>
            </div>

            {/* Charges today (highlighted row) */}
            <div className="flex items-center justify-between px-[24px] py-[14px] bg-[rgba(16,188,131,0.08)]">
              <span className="text-[#ececec] text-[12px] font-acid leading-[18.8px]">Charges today</span>
              <span className="text-[#ececec] text-[12px] font-acid leading-[18.8px]">{monthlyAmount}</span>
            </div>
          </div>

          {/* Legal notice */}
          <div className="flex gap-[12px] mt-[20px]">
            <div className="flex-shrink-0 mt-[2px]">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M16 2H2C0.9 2 0 2.9 0 4V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V4C18 2.9 17.1 2 16 2ZM16 16H2V4H16V16Z" fill="#00b38c"/>
                <path d="M9 14L4 9L5.4 7.6L9 11.2L14.6 5.6L16 7L9 14Z" fill="#00b38c"/>
              </svg>
            </div>
            <p className="text-[#a0a0a0] text-[14px] font-acid leading-[18.8px]">
              By following this strategy you agree to our{' '}
              <span className="text-white">Signal Subscription Terms & Conditions.</span>{' '}
              You acknowledge that trading signals are for informational purposes only and do not constitute financial advice. Past performance does not guarantee future results. You may unfollow at any time. Applicable fees will be charged as described above.
            </p>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-[12px] mt-[16px]">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`flex-shrink-0 w-[13px] h-[13px] rounded-[2.4px] mt-[3px] cursor-pointer flex items-center justify-center transition-colors ${
                agreed ? 'bg-[#00b38c]' : 'border border-[#303030] bg-transparent'
              }`}
            >
              {agreed && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <p className="text-white text-[14px] font-acid leading-[18.8px]">
              I have read and agree to the{' '}
              <span className="text-[#00b38c] underline cursor-pointer">Signal Subscription Terms</span>
              <br />
              <span className="text-[#00b38c] underline cursor-pointer">& Conditions</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-[10px] mt-[30px] justify-center">
            <SparkleButton className="px-[22px] w-[152px]" onClick={handleClose}>
              <span className="text-[#c6c6c6]">Cancel</span>
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
