import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, GlowButton } from '../ui'
import { AtIcon, AtGlyphIcon, CheckIcon } from '../icons'

interface ClaimUsernameModalProps {
  open: boolean
  onClose: () => void
  onContinue?: () => void
}

const REFERENCE_USERNAME = 't.shepang'

export function ClaimUsernameModal({ open, onClose, onContinue }: ClaimUsernameModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [username, setUsername] = useState(REFERENCE_USERNAME)

  const animateClose = useCallback((afterClose?: () => void) => {
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) {
      onClose()
      afterClose?.()
      return
    }
    gsap.to(modal, { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setMounted(false)
        onClose()
        afterClose?.()
        requestAnimationFrame(() => triggerRef.current?.focus())
      },
    })
  }, [onClose])

  const handleClose = useCallback(() => animateClose(), [animateClose])
  const handleContinue = useCallback(() => animateClose(onContinue), [animateClose, onContinue])

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setMounted(true)
      setUsername(REFERENCE_USERNAME)
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
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, handleClose])

  if (!mounted) return null

  const available = username.trim().length > 0

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4 bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-username-title"
    >
      <div ref={modalRef} className="w-full max-w-[755px]">
        <GlassCard
          variant="light"
          divider="none"
          glow={false}
          rounded="18.563px"
          className="surface-raised overflow-hidden w-full"
          style={{ border: '1.16px solid var(--color-gfx-surface-raised-border)', boxShadow: '0 4.641px 23.204px rgba(0,0,0,0.03)' }}
          data-claim-username-surface
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[18.563px]" aria-hidden="true">
            <div
              className="theme-decorative-glow absolute w-[493px] h-[278px] -translate-x-1/2 bg-[#064B34] rounded-full"
              style={{ left: 'calc(50% + 19px)', bottom: '-197.16px', filter: 'url(#blur-157)' }}
            />
          </div>

          <button
            onClick={handleClose}
            className="absolute z-20 right-4 top-4 sm:right-[9px] sm:top-[19px] w-6 h-6 cursor-pointer text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative z-10 px-5 pt-8 pb-8 sm:px-24 sm:pt-[108px] sm:pb-[129px]">
            <div className="flex items-start gap-4 sm:gap-[21px]">
              <div className="relative w-[73px] h-[73px] shrink-0 rounded-[18px] overflow-hidden sm:mt-3" aria-hidden="true">
                <div className="claim-username-icon-well absolute inset-0 overflow-hidden rounded-[22px] bg-gfx-surface-icon-well">
                  <div
                    className="absolute w-[133px] h-[74px] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#064B34] rounded-full theme-decorative-glow"
                    style={{ top: 'calc(50% - 57.5px)', filter: 'url(#blur-28)' }}
                  />
                  <div
                    className="absolute w-[133px] h-[74px] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#064B34] rounded-full theme-decorative-glow"
                    style={{ top: 'calc(50% + 64.5px)', filter: 'url(#blur-28)' }}
                  />
                  <AtGlyphIcon size={27} className="absolute inset-[31.51%]" />
                </div>
              </div>

              <div className="min-w-0">
                <h3
                  id="claim-username-title"
                  className="text-white text-2xl sm:text-[36px] font-acid font-normal leading-tight sm:leading-normal"
                >
                  Claim your username
                </h3>

                <p className="mt-2 sm:mt-1 text-gfx-neutral-400 text-sm sm:text-base font-acid font-medium leading-relaxed sm:leading-[24.44px]">
                  Required to unlock PAMM, Copy Trading, Signals &amp; Live.
                  <br className="hidden sm:inline" />{' '}
                  Shown publicly on leaderboards and your profile.
                </p>
              </div>
            </div>

            <label
              htmlFor="claim-username-input"
              className="block mt-6 sm:mt-[23px] text-gfx-neutral-600 text-sm sm:text-base font-acid font-medium leading-[24.44px]"
            >
              User Name
            </label>

            <div className="relative mt-2 sm:mt-[8px] w-full h-12 sm:h-[50px] rounded-[30px] bg-gfx-surface-progress border border-gfx-green-300">
              <AtIcon
                size={14}
                className="absolute left-[20px] sm:left-[25px] top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                id="claim-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="t.shepang"
                autoFocus
                autoComplete="username"
                className="w-full h-full bg-transparent outline-none focus-visible:!outline-none pl-[44px] pr-[48px] sm:pl-[48px] sm:pr-[60px] text-base font-acid font-medium leading-[24.44px] text-gfx-neutral-300 placeholder:text-gfx-neutral-300"
              />
              {available && (
                <CheckIcon size={17.039} className="absolute right-[22px] top-1/2 -translate-y-1/2 pointer-events-none" />
              )}
            </div>

            {available && (
              <span className="block mt-3 sm:mt-[11px] text-[#00B38C] text-sm sm:text-base font-acid font-normal leading-[1.2]">
                Available
              </span>
            )}

            <GlowButton
              onClick={handleContinue}
              disabled={!available}
              className="mt-6 sm:mt-[26px]"
              width="100%"
              label="Continue"
            />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
