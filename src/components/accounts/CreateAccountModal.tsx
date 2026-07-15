import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassSelect, GlassInput, GlowButton } from '@/components/ui'
import type { GlassSelectOption } from '@/components/ui/GlassSelect'

const ACCOUNT_TYPE_OPTIONS: GlassSelectOption[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'ecn', label: 'ECN' },
  { value: 'raw', label: 'Raw Spread' },
]

const LEVERAGE_OPTIONS: GlassSelectOption[] = [
  { value: '100', label: '1:100' },
  { value: '200', label: '1:200' },
  { value: '500', label: '1:500' },
  { value: '1200', label: '1:1200' },
]

const DEMO_SIZE_OPTIONS: GlassSelectOption[] = [
  { value: '5000', label: '$5,000' },
  { value: '10000', label: '$10,000' },
  { value: '25000', label: '$25,000' },
  { value: '50000', label: '$50,000' },
  { value: '100000', label: '$100,000' },
]

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12V9" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 6H9.00833" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface CreateAccountModalProps {
  open: boolean
  onClose: () => void
  onCreateAccount?: () => void
}

export function CreateAccountModal({ open, onClose, onCreateAccount }: CreateAccountModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [fromAccount, setFromAccount] = useState('')
  const [accountType, setAccountType] = useState('')
  const [leverage, setLeverage] = useState('')
  const [demoSize, setDemoSize] = useState('')

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
      setFromAccount('')
      setAccountType('')
      setLeverage('')
      setDemoSize('')
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
      className="fixed inset-0 z-modal flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Create Account"
    >
      <div
        ref={modalRef}
        className="relative w-[793px] max-w-[95vw]"
      >
        {/* Modal background with decorative glows */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl bg-gfx-green-800 shadow-md outline outline-1 outline-offset-[-1.16px] outline-gfx-green-800"
          aria-hidden="true"
        >
          <div className="absolute w-[493px] h-[278px] -left-[198px] bottom-[136px] bg-gfx-green-200 rounded-full blur-[157px]" />
          <div className="absolute w-[493px] h-[278px] right-[-335px] -top-[18px] bg-gfx-green-200 rounded-full blur-[157px]" />
          <div className="absolute w-[587px] h-[435px] left-[350px] -top-[133px] rotate-[48deg] origin-top-left bg-gfx-green-800 rounded-full blur-[157px]" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[26px] top-[31px] w-6 h-6"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10 px-25 py-25">
          {/* Title */}
          <h2 className="text-white font-acid font-normal text-hero leading-none text-center">
            Create Account
          </h2>

          {/* Subtitle with info icon + hover tooltip */}
          <div className="flex justify-center mt-3 mb-6">
            <div className="flex items-center gap-1.5">
              <div className="relative group flex items-center">
                <span className="cursor-pointer"><InfoIcon /></span>
                {/* Tooltip on hover */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                  <div className="bg-gfx-green-900 rounded-md px-4 py-4 shadow-sm text-center w-[221px]">
                    <p className="text-gfx-neutral-600 text-base font-medium font-acid leading-6">Account Details Email</p>
                    <p className="text-gfx-neutral-400 text-sm font-normal font-acid leading-5 mt-2.5">Your TradeLocker account details will be emailed to you once your account is created.</p>
                  </div>
                </div>
              </div>
              <span className="text-gfx-neutral-400 text-base font-medium font-acid leading-6">Account Details</span>
            </div>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-5.5">
            <div>
              <label className="block text-gfx-neutral-600 font-acid font-medium text-base leading-6 mb-1.5">From Account</label>
              <GlassInput placeholder="Gen.01" value={fromAccount} onChange={setFromAccount} />
            </div>

            <div>
              <label className="block text-gfx-neutral-600 font-acid font-medium text-base leading-6 mb-1.5">Account Type</label>
              <GlassSelect options={ACCOUNT_TYPE_OPTIONS} placeholder="0.00" value={accountType} onChange={setAccountType} />
            </div>

            <div>
              <label className="block text-gfx-neutral-600 font-acid font-medium text-base leading-6 mb-1.5">Leverage</label>
              <GlassSelect options={LEVERAGE_OPTIONS} placeholder="1200" value={leverage} onChange={setLeverage} />
            </div>

            <div>
              <label className="block text-gfx-neutral-600 font-acid font-medium text-base leading-6 mb-1.5">Demo Account Size</label>
              <GlassSelect options={DEMO_SIZE_OPTIONS} placeholder="$10,000" value={demoSize} onChange={setDemoSize} />
            </div>
          </div>

          {/* Create Account button */}
          <div className="mt-11">
            <GlowButton
              label="Create Account"
              width="100%"
              disabled={!fromAccount || !accountType || !leverage || !demoSize}
              onClick={() => {
                handleClose()
                setTimeout(() => onCreateAccount?.(), 300)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
