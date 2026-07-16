import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, SparkleButton, GlowButton } from '../ui'

interface ChangePasswordModalProps {
  open: boolean
  onClose: () => void
}

function LockIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.48773 8.59889V6.84205C4.48773 3.65441 7.07182 1.07031 10.2595 1.07031C13.4471 1.07031 16.0312 3.65441 16.0312 6.84205V8.59889C16.9844 8.67008 17.6051 8.8498 18.0589 9.30353C18.8102 10.0549 18.8102 11.2641 18.8102 13.6826C18.8102 16.1011 18.8102 17.3104 18.0589 18.0617C17.3075 18.8131 16.0983 18.8131 13.6798 18.8131H6.83918C4.42066 18.8131 3.21141 18.8131 2.46008 18.0617C1.70874 17.3104 1.70874 16.1011 1.70874 13.6826C1.70874 11.2641 1.70874 10.0549 2.46008 9.30353C2.9138 8.8498 3.53453 8.67008 4.48773 8.59889ZM5.77033 6.84205C5.77033 4.36277 7.78019 2.35292 10.2595 2.35292C12.7387 2.35292 14.7486 4.36277 14.7486 6.84205V8.55525C14.4211 8.5522 14.0658 8.5522 13.6798 8.5522H6.83918C6.4531 8.5522 6.09784 8.5522 5.77033 8.55525V6.84205Z" fill="#00B38C" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
      <path d="M7.75 8.69565C7.75 7.34496 8.75736 6.25 10 6.25C11.2426 6.25 12.25 7.34496 12.25 8.69565C12.25 10.0463 11.2426 11.1413 10 11.1413C8.75736 11.1413 7.75 10.0463 7.75 8.69565Z" fill="#808080" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 8.69565C0 10.4776 0.424964 11.0777 1.27489 12.2779C2.97196 14.6744 5.81811 17.3913 10 17.3913C14.1819 17.3913 17.028 14.6744 18.7251 12.2779C19.575 11.0777 20 10.4776 20 8.69565C20 6.91372 19.575 6.31362 18.7251 5.1134C17.028 2.71691 14.1819 0 10 0C5.81811 0 2.97196 2.71691 1.27489 5.1134C0.424964 6.31362 0 6.91372 0 8.69565ZM10 4.61957C7.92893 4.61957 6.25 6.44449 6.25 8.69565C6.25 10.9468 7.92893 12.7717 10 12.7717C12.0711 12.7717 13.75 10.9468 13.75 8.69565C13.75 6.44449 12.0711 4.61957 10 4.61957Z" fill="#808080" />
    </svg>
  )
}

export function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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
      setNewPassword('')
      setConfirmPassword('')
      setShowNew(false)
      setShowConfirm(false)
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

  const hasMinLength = newPassword.length >= 6
  const hasNumber = /\d/.test(newPassword)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  const hasCase = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Change Password"
    >
      <div ref={modalRef} className="relative w-[49.5625rem] max-w-[95vw]">
        <GlassCard variant="light" rounded="1.875rem" className="overflow-hidden" style={{ backgroundColor: '#0C1311' }}>
          {/* Green glow blurs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[1.875rem]" aria-hidden="true">
            <div className="absolute w-[30.8125rem] h-[17.375rem] -left-[9.125rem] bottom-0 translate-y-1/2 bg-[#064B34] rounded-full" style={{ filter: 'blur(157.15px)' }} />
            <div className="absolute w-[30.8125rem] h-[17.375rem] right-0 translate-x-1/2 -top-[9.4375rem] bg-[#064B34] rounded-full" style={{ filter: 'blur(157.15px)' }} />
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

          <div className="relative flex flex-col items-center px-[7.75rem] pt-[4.1875rem] pb-[4.6875rem]">
            {/* Lock icon circle */}
            <div className="w-[3.6875rem] h-[3.6875rem] rounded-full bg-[#09241C] flex items-center justify-center mb-[1.3125rem]">
              <LockIcon />
            </div>

            {/* Title */}
            <h3 className="text-white text-[2.25rem] font-acid mb-[0.625rem]">Change Password</h3>

            {/* Subtitle */}
            <p className="text-[#808080] text-[0.875rem] font-acid leading-[1.175rem] text-center max-w-[17.875rem]">
              Create a secure new password for your Tradelocker account.
            </p>

            {/* New password field */}
            <div className="w-[34.125rem] mt-[2.1875rem]">
              <label className="text-white text-base font-acid font-medium leading-[1.5275rem] mb-[0.6875rem] block">
                New password
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full h-[3.125rem] bg-[#0C1311] border border-[#064B34] rounded-[1.875rem] px-[1.625rem] text-white text-base font-acid placeholder:text-[#808080] outline-none focus:border-gfx-green-300 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(v => !v)}
                  className="absolute right-[1.375rem] top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label={showNew ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            {/* Confirm password field */}
            <div className="w-[34.125rem] mt-[1.5rem]">
              <label className="text-white text-base font-acid font-medium leading-[1.5275rem] mb-[0.6875rem] block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full h-[3.125rem] bg-[#0C1311] border border-[#064B34] rounded-[1.875rem] px-[1.625rem] text-white text-base font-acid placeholder:text-[#808080] outline-none focus:border-gfx-green-300 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-[1.375rem] top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            {/* Password requirements */}
            <div className="w-[34.125rem] mt-[1.5rem]">
              <p className="text-white text-base font-acid font-medium leading-[1.5275rem]">Password requirements:</p>
              <div className="flex flex-col gap-[0.375rem] mt-[0.375rem]">
                <RequirementLine met={hasMinLength} label="At least 6 characters" />
                <RequirementLine met={hasNumber} label="At least 1 number" />
                <RequirementLine met={hasSpecial} label="At least 1 special character" />
                <RequirementLine met={hasCase} label="Uppercase and lowercase letters" />
                <RequirementLine met={passwordsMatch} label="Password match" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-[2.625rem]">
              <SparkleButton onClick={handleClose}>Cancel</SparkleButton>
              <GlowButton label="Save Changes" width={171} height={44} />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

function RequirementLine({ met, label }: { met: boolean; label: string }) {
  return (
    <p className={`text-[0.875rem] font-acid leading-[1.175rem] transition-colors ${met ? 'text-[#00B38C]' : 'text-[#808080]'}`}>
      {label}
    </p>
  )
}
