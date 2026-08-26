import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GlassCard, SharePerformanceChart, ToggleSwitch } from '@/components/ui'

interface ShareAccountModalProps {
  open: boolean
  onClose: () => void
}

const PUBLIC_LINK = 'https://dashboard.genesisfxmarkets.cr'

const PRIVACY_OPTIONS = [
  'Show Account Name',
  'Show Balance',
  'Show Equity',
  'Show P&L',
  'Show Closed Trades',
  'Show Open Positions',
] as const

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <rect x="5.3" y="5.3" width="8.7" height="8.7" rx="1.8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11.3 5.2V3.9A1.9 1.9 0 0 0 9.4 2H3.9A1.9 1.9 0 0 0 2 3.9v5.5a1.9 1.9 0 0 0 1.9 1.9h1.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function QrIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d="M2 2h5v5H2V2Zm8 0h5v5h-5V2ZM2 10h5v5H2v-5Zm8 0h2v2h-2v-2Zm3 0h2v2h-2v-2Zm-3 3h2v2h-2v-2Zm3 0h2v2h-2v-2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d="M9.2 2.5H14.5V7.8M14.2 2.8L7.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.2 4H4.3A2.3 2.3 0 0 0 2 6.3v6.4A2.3 2.3 0 0 0 4.3 15h6.4a2.3 2.3 0 0 0 2.3-2.3V9.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={direction === 'left' ? 'rotate-180' : ''}>
      <path d="m7 4.5 4.5 4.5L7 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconAction({ label, onClick, children, className = '' }: { label: string; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`surface-raised surface-raised-border flex size-10 shrink-0 items-center justify-center rounded-[10px] border-[1.16px] text-gfx-neutral-400 shadow-[0_4.641px_23.204px_rgba(0,0,0,0.03)] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none ${className}`}
    >
      {children}
    </button>
  )
}

export function ShareAccountModal({ open, onClose }: ShareAccountModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [sharingEnabled, setSharingEnabled] = useState(true)
  const [privacy, setPrivacy] = useState<Record<(typeof PRIVACY_OPTIONS)[number], boolean>>(
    () => Object.fromEntries(PRIVACY_OPTIONS.map((label) => [label, true])) as Record<(typeof PRIVACY_OPTIONS)[number], boolean>,
  )
  const [copied, setCopied] = useState(false)
  const [qrVisible, setQrVisible] = useState(false)

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) {
      onClose()
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
        triggerRef.current?.focus()
      },
    })
  }, [onClose])

  useEffect(() => {
    if (!open) return
    triggerRef.current = document.activeElement as HTMLElement | null
    setSharingEnabled(true)
    setPrivacy(Object.fromEntries(PRIVACY_OPTIONS.map((label) => [label, true])) as Record<(typeof PRIVACY_OPTIONS)[number], boolean>)
    setCopied(false)
    setQrVisible(false)
    setMounted(true)
  }, [open])

  useLayoutEffect(() => {
    if (!mounted || !overlayRef.current || !modalRef.current) return
    gsap.set(overlayRef.current, { opacity: 0 })
    gsap.set(modalRef.current, { opacity: 0, scale: 0.96 })
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modalRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
      delay: 0.05,
      onComplete: () => gsap.set(modalRef.current, { clearProps: 'transform' }),
    })
    const frame = requestAnimationFrame(() => closeRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
      if (event.key !== 'Tab') return
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, handleClose])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(PUBLIC_LINK)
    } catch {
      // Clipboard access can be unavailable in preview browsers; the visible state still confirms the action.
    }
    setCopied(true)
  }

  const handleSharingChange = (checked: boolean) => {
    setSharingEnabled(checked)
    if (!checked) {
      setCopied(false)
      setQrVisible(false)
    }
  }

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4 bg-gfx-overlay backdrop-blur-sm"
      onClick={(event) => { if (event.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-account-title"
      data-share-account-modal
    >
      <div ref={modalRef} className="w-full max-w-[1318px]">
        <GlassCard
          variant="light"
          divider="none"
          glow={false}
          rounded="30px"
          className="surface-raised w-full overflow-hidden"
          style={{ border: '1.16px solid var(--color-gfx-surface-raised-border)', boxShadow: '0 4.641px 23.204px rgba(0,0,0,0.03)' }}
          data-share-modal-surface
        >
          <div className="absolute inset-0 overflow-hidden rounded-[30px] pointer-events-none" aria-hidden="true">
            <div className="theme-decorative-glow absolute h-[278px] w-[493px] rounded-full bg-[#064B34]" style={{ left: '-211px', top: '599px', filter: 'url(#blur-157)' }} />
            <div className="theme-decorative-glow absolute h-[278px] w-[493px] rounded-full bg-[#064B34]" style={{ left: '1053px', top: '-31px', filter: 'url(#blur-157)' }} />
            <div className="theme-decorative-glow absolute h-[278px] w-[493px] rounded-full bg-[#064B34]" style={{ left: '806px', top: '-341px', filter: 'url(#blur-157)' }} />
          </div>

          <button ref={closeRef} type="button" onClick={handleClose} aria-label="Close share account modal" className="absolute right-4 top-4 sm:right-[25.84px] sm:top-[25.84px] z-20 size-6 text-white transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none">
            <CloseIcon />
          </button>

          <div className="relative z-10 flex flex-col gap-8 px-4 pb-8 pt-16 sm:flex-row sm:items-start sm:gap-[71px] sm:pl-[33.84px] sm:pr-[27px] sm:pb-[105px] sm:pt-[84px]">
            <div className="w-full sm:w-[525px] sm:shrink-0">
              <h2 id="share-account-title" className="text-2xl font-normal leading-none text-white">Share Account</h2>
              <p className="mt-2 sm:mt-[3px] text-sm leading-[18.8px] text-gfx-neutral-400">Create a public link to share your trading account performance with anyone.</p>

              <GlassCard divider="none" glow={false} rounded="14px" className="surface-raised surface-raised-border mt-6 sm:mt-[22px] w-full overflow-hidden border-[1.16px] px-5 py-6 sm:px-9 sm:py-[34px] shadow-[0_4.641px_23.204px_rgba(0,0,0,0.03)]" data-share-settings-surface>
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-base font-medium leading-[24.44px] text-white">Enable Public Sharing</p>
                    <p className="mt-1 text-sm leading-[18.8px] text-gfx-neutral-400">Allow anyone with the link to view your account</p>
                  </div>
                  <ToggleSwitch checked={sharingEnabled} onCheckedChange={handleSharingChange} label="Enable public sharing" className="shrink-0" />
                </div>
              </GlassCard>

              {sharingEnabled && (
                <div data-share-public-controls>
                  <h3 className="mt-6 sm:mt-[13px] text-2xl font-normal leading-none text-white">Share Link</h3>

                  <div className="relative mt-4 sm:mt-[16.84px] flex items-center gap-3">
                    <div className="flex h-[50px] min-w-0 flex-1 items-center overflow-hidden rounded-[30px] border border-gfx-neutral-350 bg-gfx-surface-progress px-[18px] text-sm leading-[18.8px] text-white sm:w-[329px] sm:flex-none" data-share-link>
                      <span className="truncate">{PUBLIC_LINK}</span>
                    </div>

                    <IconAction label={copied ? 'Link copied' : 'Copy public link'} onClick={() => void copyLink()} className="sm:ml-[30px]"><CopyIcon /></IconAction>
                    <IconAction label={qrVisible ? 'Hide QR code' : 'Show QR code'} onClick={() => setQrVisible((value) => !value)}><QrIcon /></IconAction>
                    <IconAction label="Open public link" onClick={() => window.open(PUBLIC_LINK, '_blank', 'noopener,noreferrer')}><ExternalIcon /></IconAction>

                    {qrVisible && (
                      <div className="absolute right-0 top-[55px] sm:left-[423px] sm:right-auto z-20 grid size-[112px] grid-cols-5 gap-1 rounded-xl border border-gfx-green-200 bg-[#F1FFFA] p-3 shadow-lg" aria-label="Public link QR preview">
                        {Array.from({ length: 25 }, (_, index) => <span key={index} className={`${[0,1,2,5,7,10,11,12,14,16,18,19,20,22,24].includes(index) ? 'bg-[#021B13]' : 'bg-transparent'} rounded-[1px]`} />)}
                      </div>
                    )}
                  </div>

                  <h3 className="mt-8 sm:mt-[26px] text-2xl font-normal leading-none text-white">Privacy Settings</h3>
                  <p className="mt-2 sm:mt-[13px] text-sm leading-[18.8px] text-gfx-neutral-400">Choose what information is visible on your public page.</p>

                  <div className="mt-6 sm:mt-[34px] flex flex-col gap-5 sm:w-[508px]">
                    {PRIVACY_OPTIONS.map((label) => (
                      <div key={label} className="flex h-[23px] items-center justify-between gap-4">
                        <span className="text-base leading-[1.2] text-white">{label}</span>
                        <ToggleSwitch
                          checked={privacy[label]}
                          onCheckedChange={(checked) => setPrivacy((current) => ({ ...current, [label]: checked }))}
                          label={label}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full min-w-0 sm:mt-[78.84px] sm:flex-1">
              <div className="grid grid-cols-3 gap-[10px]">
                {['This month', 'Avg/Day', 'Best Day'].map((label) => (
                  <GlassCard key={label} divider="none" glow={false} rounded="14px" className="surface-raised surface-raised-border h-[124px] overflow-hidden border-[1.16px] shadow-[0_4.641px_23.204px_rgba(0,0,0,0.03)]" data-share-stat-surface>
                    <span className="absolute left-1/2 top-[34px] -translate-x-1/2 text-[28px] sm:text-[36px] font-normal leading-none text-white">0</span>
                    <span className="absolute left-1/2 top-[75px] -translate-x-1/2 whitespace-nowrap text-sm sm:text-base leading-[1.2] text-gfx-neutral-400">{label}</span>
                  </GlassCard>
                ))}
              </div>

              <div className="mt-8 sm:mt-[41px] flex items-center justify-between">
                <button type="button" aria-label="Previous month" className="flex size-[18px] items-center justify-center text-gfx-neutral-400 hover:text-white focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none"><ChevronIcon direction="left" /></button>
                <p className="text-xs font-medium leading-[1.6] text-white">AUGUST</p>
                <button type="button" aria-label="Next month" className="flex size-[18px] items-center justify-center text-gfx-neutral-400 hover:text-white focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none"><ChevronIcon direction="right" /></button>
              </div>

              <GlassCard divider="none" glow={false} rounded="24px" className="surface-raised surface-raised-border mt-6 sm:mt-[42px] h-[294px] w-full overflow-hidden border-[1.16px] shadow-[0_4.641px_23.204px_rgba(0,0,0,0.03)]" data-share-chart-surface>
                <SharePerformanceChart />
                <div className="theme-decorative-glow absolute bottom-[-183px] left-[176px] h-[228px] w-[404px] rounded-full bg-[#064B34] opacity-30 [filter:url(#blur-157)]" aria-hidden="true" />
              </GlassCard>

              <div className="mt-5 sm:mt-[22px] flex items-center gap-3 pl-0 sm:pl-[15px] text-gfx-neutral-500">
                <EyeIcon />
                <span className="text-sm sm:text-base leading-[1.2]">0 total views</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
