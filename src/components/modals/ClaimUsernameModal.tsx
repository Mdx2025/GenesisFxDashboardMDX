import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, PrimaryPillButton } from '../ui'
import { AtIcon, AtGlyphIcon, CheckIcon } from '../icons'

interface ClaimUsernameModalProps {
  open: boolean
  onClose: () => void
  onContinue?: () => void
}

const CARD_W = 755
const CARD_H = 551
const REFERENCE_USERNAME = 't.shepang'

export function ClaimUsernameModal({ open, onClose, onContinue }: ClaimUsernameModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [username, setUsername] = useState(REFERENCE_USERNAME)
  const [scale, setScale] = useState(1)

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
      },
    })
  }, [onClose])

  const handleClose = useCallback(() => animateClose(), [animateClose])
  const handleContinue = useCallback(() => animateClose(onContinue), [animateClose, onContinue])

  useEffect(() => {
    if (open) {
      setMounted(true)
      setUsername(REFERENCE_USERNAME)
    }
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    function measure() {
      setScale(Math.min(1, (window.innerWidth * 0.95) / CARD_W, (window.innerHeight * 0.95) / CARD_H))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [mounted])

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

  const available = username.trim().length > 0

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-username-title"
    >
      <div ref={modalRef} style={{ width: CARD_W * scale, height: CARD_H * scale }}>
        <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <GlassCard
            variant="light"
            divider="none"
            glow={false}
            rounded="18.563px"
            className="surface-raised overflow-hidden w-full h-full"
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
              className="absolute z-20 w-6 h-6 cursor-pointer text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500"
              style={{ left: '721.84px', top: '18.84px' }}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className="absolute w-[73px] h-[73px] rounded-[18px] overflow-hidden"
              style={{ left: '95.84px', top: '119.84px' }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 overflow-hidden rounded-[22px] bg-gfx-surface-icon-well">
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

            <h3
              id="claim-username-title"
              className="absolute -translate-y-1/2 text-white text-[36px] font-acid font-normal leading-normal whitespace-nowrap"
              style={{ left: '189.84px', top: '135.34px' }}
            >
              Claim your username
            </h3>

            <p
              className="absolute text-gfx-neutral-400 text-base font-acid font-medium leading-[24.44px]"
              style={{ left: '189.84px', top: '166.84px' }}
            >
              Required to unlock PAMM, Copy Trading, Signals &amp; Live.
              <br />
              Shown publicly on leaderboards and your profile.
            </p>

            <label
              htmlFor="claim-username-input"
              className="absolute -translate-y-1/2 text-gfx-neutral-600 text-base font-acid font-medium leading-[24.44px]"
              style={{ left: '102px', top: '251.5px' }}
            >
              User Name
            </label>

            <div
              className="absolute -translate-x-1/2 w-[562px] h-[50px] rounded-[30px] bg-gfx-surface-progress border border-gfx-green-300"
              style={{ left: 'calc(50% - 0.5px)', top: '272px' }}
            >
              <AtIcon
                size={14}
                className="absolute left-[25px] top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                id="claim-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="t.shepang"
                autoFocus
                autoComplete="username"
                className="w-full h-full bg-transparent outline-none focus-visible:!outline-none pl-[48px] pr-[60px] text-base font-acid font-medium leading-[24.44px] text-gfx-neutral-300 placeholder:text-gfx-neutral-300"
              />
              {available && (
                <CheckIcon size={17.039} className="absolute left-[529px] top-[16px] pointer-events-none" />
              )}
            </div>

            {available && (
              <span
                className="absolute -translate-y-1/2 text-[#00B38C] text-base font-acid font-normal leading-[1.2]"
                style={{ left: '102px', top: '342.5px' }}
              >
                Available
              </span>
            )}

            <PrimaryPillButton
              onClick={handleContinue}
              disabled={!available}
              className="absolute left-1/2 -translate-x-1/2 !w-[561px]"
              style={{ top: '377.84px' }}
            >
              Continue
            </PrimaryPillButton>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
