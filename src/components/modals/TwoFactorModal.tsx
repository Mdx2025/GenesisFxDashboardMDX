import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, SparkleButton, GlowButton } from '../ui'

interface TwoFactorModalProps {
  open: boolean
  onClose: () => void
}

export function TwoFactorModal({ open, onClose }: TwoFactorModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

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
      setCode(['', '', '', '', '', ''])
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

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Two-Factor Authentication Setup"
    >
      <div
        ref={modalRef}
        className="relative w-[793px] max-w-[95vw]"
      >
        <GlassCard variant="light" rounded="1.875rem" className="surface-raised overflow-hidden">
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none rounded-[1.875rem]"
            aria-hidden="true"
          >
            <div className="theme-decorative-glow absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 bg-[#064B34] rounded-full" style={{ filter: 'url(#blur-157)' }} />
          </div>

          <button
            onClick={handleClose}
            className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-7 top-7 w-6 h-6"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="relative flex flex-col items-center px-5 sm:px-8 lg:px-12 pt-10 lg:pt-16 pb-8 lg:pb-12">
            <div className="w-[3.6875rem] h-[3.6875rem] rounded-full bg-[#09241C] flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" fill="#00B38C"/>
              </svg>
            </div>

            <h3 className="text-white text-2xl font-acid mb-2">Set up Two-Factor Authentication</h3>
            <p className="text-[#A0A0A0] text-base font-acid mb-8">Scan this QR code with your authenticator app</p>

            <div className="w-[11.25rem] h-[11.4375rem] bg-white rounded-lg mb-8 flex items-center justify-center overflow-hidden">
              <QrPlaceholder />
            </div>

            <p className="text-[#A0A0A0] text-base font-acid mb-4">Can't scan? enter this code manually:</p>

            <div className="flex items-center gap-3 mb-8 w-full max-w-md">
              <div className="h-9 bg-[#09241C] border border-[#064B34] rounded-[0.625rem] flex items-center px-4 min-w-0 overflow-hidden">
                <span className="text-white text-xs sm:text-sm font-acid tracking-wide truncate">EIBIJPZZSOR4JCPXKH4LHEZ5LD476ZZN</span>
              </div>
              <button className="w-12 h-9 bg-[#09241C] border border-[#064B34] rounded-[0.625rem] flex items-center justify-center hover:border-gfx-green-300 transition-colors shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11.43 1.5H8.509C7.186 1.5 6.138 1.5 5.318 1.611C4.474 1.725 3.791 1.965 3.252 2.506C2.713 3.047 2.474 3.733 2.36 4.58C2.25 5.404 2.25 6.456 2.25 7.785V12.163C2.25 13.294 2.94 14.263 3.92 14.669C3.87 13.987 3.87 13.03 3.87 12.234V8.548C3.87 7.516 3.87 6.687 3.959 6.024C4.054 5.313 4.269 4.632 4.819 4.079C5.369 3.527 6.048 3.311 6.756 3.216C7.417 3.126 8.242 3.126 9.199 3.127H11.43C12.459 3.126 13.282 3.126 13.942 3.216C13.547 2.211 12.571 1.5 11.43 1.5Z" fill="#00B38C"/>
                  <path d="M4.95 8.548C4.95 6.504 4.95 5.481 5.583 4.846C6.215 4.211 7.234 4.211 9.27 4.211H11.43C13.467 4.211 14.485 4.211 15.118 4.846C15.75 5.481 15.75 6.504 15.75 8.548V12.163C15.75 14.207 15.75 15.23 15.118 15.865C14.485 16.5 13.467 16.5 11.43 16.5H9.27C7.234 16.5 6.215 16.5 5.583 15.865C4.95 15.23 4.95 14.207 4.95 12.163V8.548Z" fill="#00B38C"/>
                </svg>
              </button>
            </div>

            <p className="text-[#808080] text-base font-acid mb-4">Enter the 6-digit code from your app:</p>

            <div className="flex items-center gap-2 sm:gap-3 mb-8 lg:mb-10">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleCodeChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="w-10 h-12 sm:w-14 sm:h-16 lg:w-[4.28rem] lg:h-[5.035rem] rounded-[0.53rem] border border-[#303030] bg-transparent text-white text-xl sm:text-2xl lg:text-3xl font-acid text-center outline-none focus:border-gfx-green-300 transition-colors"
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <SparkleButton onClick={handleClose}>Cancel</SparkleButton>
              <GlowButton label="Verify & Enable" width={193} height={44} />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

function QrPlaceholder() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <rect width="140" height="140" fill="white"/>
      <rect x="10" y="10" width="40" height="40" rx="4" fill="#0C1311"/>
      <rect x="15" y="15" width="30" height="30" rx="2" fill="white"/>
      <rect x="20" y="20" width="20" height="20" rx="1" fill="#0C1311"/>
      <rect x="90" y="10" width="40" height="40" rx="4" fill="#0C1311"/>
      <rect x="95" y="15" width="30" height="30" rx="2" fill="white"/>
      <rect x="100" y="20" width="20" height="20" rx="1" fill="#0C1311"/>
      <rect x="10" y="90" width="40" height="40" rx="4" fill="#0C1311"/>
      <rect x="15" y="95" width="30" height="30" rx="2" fill="white"/>
      <rect x="20" y="100" width="20" height="20" rx="1" fill="#0C1311"/>
      <rect x="60" y="10" width="8" height="8" fill="#0C1311"/>
      <rect x="60" y="26" width="8" height="8" fill="#0C1311"/>
      <rect x="60" y="42" width="8" height="8" fill="#0C1311"/>
      <rect x="72" y="18" width="8" height="8" fill="#0C1311"/>
      <rect x="10" y="60" width="8" height="8" fill="#0C1311"/>
      <rect x="26" y="60" width="8" height="8" fill="#0C1311"/>
      <rect x="42" y="60" width="8" height="8" fill="#0C1311"/>
      <rect x="18" y="72" width="8" height="8" fill="#0C1311"/>
      <rect x="60" y="60" width="8" height="8" fill="#0C1311"/>
      <rect x="76" y="60" width="8" height="8" fill="#0C1311"/>
      <rect x="60" y="76" width="8" height="8" fill="#0C1311"/>
      <rect x="92" y="60" width="8" height="8" fill="#0C1311"/>
      <rect x="108" y="60" width="8" height="8" fill="#0C1311"/>
      <rect x="124" y="60" width="8" height="8" fill="#0C1311"/>
      <rect x="100" y="72" width="8" height="8" fill="#0C1311"/>
      <rect x="60" y="92" width="8" height="8" fill="#0C1311"/>
      <rect x="76" y="92" width="8" height="8" fill="#0C1311"/>
      <rect x="92" y="92" width="8" height="8" fill="#0C1311"/>
      <rect x="108" y="92" width="8" height="8" fill="#0C1311"/>
      <rect x="68" y="108" width="8" height="8" fill="#0C1311"/>
      <rect x="84" y="108" width="8" height="8" fill="#0C1311"/>
      <rect x="100" y="108" width="8" height="8" fill="#0C1311"/>
      <rect x="116" y="108" width="8" height="8" fill="#0C1311"/>
      <rect x="76" y="124" width="8" height="8" fill="#0C1311"/>
      <rect x="92" y="124" width="8" height="8" fill="#0C1311"/>
      <rect x="124" y="124" width="8" height="8" fill="#0C1311"/>
    </svg>
  )
}
