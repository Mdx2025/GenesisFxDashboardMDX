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

function HandCursorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.74976 1.5C8.51636 1.5 7.49976 2.5166 7.49976 3.75V12.6094L7.00757 12.0938L6.82007 11.9297C5.95581 11.0654 4.5437 11.0654 3.67944 11.9297C2.81519 12.7939 2.81519 14.2061 3.67944 15.0703V15.0938L9.82007 21.1641L9.86694 21.1875L9.89038 21.2344C10.9011 21.9932 12.1902 22.5 13.6404 22.5H14.9294C18.3308 22.5 21.0701 19.7607 21.0701 16.3594V10.5C21.0701 9.2666 20.0535 8.25 18.8201 8.25C18.5007 8.25 18.2048 8.33789 17.9294 8.46094C17.6833 7.48535 16.7957 6.75 15.7498 6.75C15.1755 6.75 14.6482 6.97559 14.2498 7.33594C13.8513 6.97559 13.324 6.75 12.7498 6.75C12.4861 6.75 12.2371 6.80566 11.9998 6.89062V3.75C11.9998 2.5166 10.9832 1.5 9.74976 1.5ZM9.74976 3C10.1658 3 10.4998 3.33398 10.4998 3.75V12H11.9998V9C11.9998 8.58398 12.3337 8.25 12.7498 8.25C13.1658 8.25 13.4998 8.58398 13.4998 9V12H14.9998V9C14.9998 8.58398 15.3337 8.25 15.7498 8.25C16.1658 8.25 16.4998 8.58398 16.4998 9V12H18.0701V10.5C18.0701 10.084 18.4041 9.75 18.8201 9.75C19.2361 9.75 19.5701 10.084 19.5701 10.5V16.3594C19.5701 18.958 17.5281 21 14.9294 21H13.6404C12.5417 21 11.5925 20.6074 10.8044 20.0156L4.73413 14.0156C4.40015 13.6816 4.40015 13.3184 4.73413 12.9844C5.06812 12.6504 5.4314 12.6504 5.76538 12.9844L8.99976 16.2188V3.75C8.99976 3.33398 9.33374 3 9.74976 3Z" fill="white"/>
    </svg>
  )
}

interface CreateAccountModalProps {
  open: boolean
  onClose: () => void
}

export function CreateAccountModal({ open, onClose }: CreateAccountModalProps) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px]"
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
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-[30px] bg-[#0C1311] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)] outline outline-[1.16px] outline-offset-[-1.16px] outline-[#0C1311]"
          aria-hidden="true"
        >
          <div className="absolute w-[493px] h-[278px] -left-[198px] bottom-[136px] bg-[#064B34] rounded-full blur-[157px]" />
          <div className="absolute w-[493px] h-[278px] right-[-335px] -top-[18px] bg-[#064B34] rounded-full blur-[157px]" />
          <div className="absolute w-[587px] h-[435px] left-[350px] -top-[133px] rotate-[48deg] origin-top-left bg-[#0C1311] rounded-full blur-[157px]" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[26px] top-[31px] w-[24px] h-[24px]"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10 px-25 py-15">
          {/* Title */}
          <h2 className="text-white font-acid font-normal text-[clamp(2rem,6vw,3.125rem)] leading-none text-center">
            Create Account
          </h2>

          {/* Subtitle with info icon + tooltip */}
          <div className="flex flex-col items-center mt-[12px] mb-[24px]">
            <div className="flex items-center gap-1.5">
              <InfoIcon />
              <span className="text-[#808080] text-[1rem] font-medium font-acid leading-[1.528rem]">Account Details</span>
            </div>

            {/* Tooltip popover */}
            <div className="relative mt-[8px]">
              <HandCursorIcon />
              <div className="mt-1 bg-[#09241C] rounded-[14px] px-[2px] py-4 shadow-[0px_4px_8.9px_rgba(0,0,0,0.25)] text-center max-w-[221px]">
                <p className="text-[#ECECEC] text-[1rem] font-medium font-acid leading-[1.528rem]">Account Details Email</p>
                <p className="text-[#808080] text-[0.875rem] font-normal font-acid leading-[1.175rem] mt-2.5">Your TradeLocker account details will be emailed to you once your account is created.</p>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-[22px]">
            <div>
              <label className="block text-[#ECECEC] font-acid font-medium text-[1rem] leading-[1.528rem] mb-[0.375rem]">From Account</label>
              <GlassInput placeholder="Gen.01" value={fromAccount} onChange={setFromAccount} />
            </div>

            <div>
              <label className="block text-[#ECECEC] font-acid font-medium text-[1rem] leading-[1.528rem] mb-[0.375rem]">Account Type</label>
              <GlassSelect options={ACCOUNT_TYPE_OPTIONS} placeholder="0.00" value={accountType} onChange={setAccountType} />
            </div>

            <div>
              <label className="block text-[#ECECEC] font-acid font-medium text-[1rem] leading-[1.528rem] mb-[0.375rem]">Leverage</label>
              <GlassSelect options={LEVERAGE_OPTIONS} placeholder="1200" value={leverage} onChange={setLeverage} />
            </div>

            <div>
              <label className="block text-[#ECECEC] font-acid font-medium text-[1rem] leading-[1.528rem] mb-[0.375rem]">Demo Account Size</label>
              <GlassSelect options={DEMO_SIZE_OPTIONS} placeholder="$10,000" value={demoSize} onChange={setDemoSize} />
            </div>
          </div>

          {/* Create Account button */}
          <div className="mt-[44px]">
            <GlowButton
              label="Create Account"
              width="100%"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
