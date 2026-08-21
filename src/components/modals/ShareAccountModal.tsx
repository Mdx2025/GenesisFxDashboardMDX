import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GlassCard, SharePerformanceChart, ToggleSwitch } from '@/components/ui'

interface ShareAccountModalProps {
  open: boolean
  onClose: () => void
}

const CARD_W = 1318
const CARD_H = 835
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

function IconAction({ label, onClick, children, left }: { label: string; onClick: () => void; children: React.ReactNode; left: number }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="surface-raised surface-raised-border absolute top-[329.84px] flex size-10 items-center justify-center rounded-[10px] border-[1.16px] text-gfx-neutral-400 shadow-[0_4.641px_23.204px_rgba(0,0,0,0.03)] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none"
      style={{ left }}
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
  const [scale, setScale] = useState(1)
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
    if (!mounted) return
    const measure = () => setScale(Math.min(1, (window.innerWidth * 0.95) / CARD_W, (window.innerHeight * 0.95) / CARD_H))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [mounted])

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(event) => { if (event.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-account-title"
      data-share-account-modal
    >
      <div ref={modalRef} style={{ width: CARD_W * scale, height: CARD_H * scale }}>
        <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <GlassCard
            variant="light"
            divider="none"
            glow={false}
            rounded="30px"
            className="surface-raised size-full overflow-hidden"
            style={{ border: '1.16px solid var(--color-gfx-surface-raised-border)', boxShadow: '0 4.641px 23.204px rgba(0,0,0,0.03)' }}
            data-share-modal-surface
          >
            <div className="absolute inset-0 overflow-hidden rounded-[30px] pointer-events-none" aria-hidden="true">
              <div className="theme-decorative-glow absolute h-[278px] w-[493px] rounded-full bg-[#064B34]" style={{ left: '-211px', top: '599px', filter: 'url(#blur-157)' }} />
              <div className="theme-decorative-glow absolute h-[278px] w-[493px] rounded-full bg-[#064B34]" style={{ left: '1053px', top: '-31px', filter: 'url(#blur-157)' }} />
              <div className="theme-decorative-glow absolute h-[278px] w-[493px] rounded-full bg-[#064B34]" style={{ left: '806px', top: '-341px', filter: 'url(#blur-157)' }} />
            </div>

            <button ref={closeRef} type="button" onClick={handleClose} aria-label="Close share account modal" className="absolute left-[1262.84px] top-[25.84px] z-20 size-6 text-white transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none">
              <CloseIcon />
            </button>

            <h2 id="share-account-title" className="absolute left-[33.84px] top-[84px] text-2xl font-normal leading-none text-white">Share Account</h2>
            <p className="absolute left-[33.84px] top-[111px] text-sm leading-[18.8px] text-gfx-neutral-400">Create a public link to share your trading account performance with anyone.</p>

            <GlassCard divider="none" glow={false} rounded="14px" position="absolute" className="surface-raised surface-raised-border left-[33.84px] top-[151.84px] h-[120px] w-[525px] overflow-hidden border-[1.16px] shadow-[0_4.641px_23.204px_rgba(0,0,0,0.03)]" data-share-settings-surface>
              <p className="absolute left-9 top-[34px] text-base font-medium leading-[24.44px] text-white">Enable Public Sharing</p>
              <p className="absolute left-9 top-[60px] text-sm leading-[18.8px] text-gfx-neutral-400">Allow anyone with the link to view your account</p>
              <ToggleSwitch checked={sharingEnabled} onCheckedChange={handleSharingChange} label="Enable public sharing" className="absolute left-[463px] top-[53px]" />
            </GlassCard>

            {sharingEnabled && (
              <div data-share-public-controls>
                <h3 className="absolute left-[33.84px] top-[285px] text-2xl font-normal leading-none text-white">Share Link</h3>
                <div className="absolute left-[33.84px] top-[325.84px] flex h-[50px] w-[329px] items-center overflow-hidden rounded-[30px] border border-gfx-neutral-350 bg-gfx-surface-progress px-[18px] text-sm leading-[18.8px] text-white" data-share-link>
                  <span className="truncate">{PUBLIC_LINK}</span>
                </div>

                <IconAction label={copied ? 'Link copied' : 'Copy public link'} onClick={() => void copyLink()} left={404.84}><CopyIcon /></IconAction>
                <IconAction label={qrVisible ? 'Hide QR code' : 'Show QR code'} onClick={() => setQrVisible((value) => !value)} left={456.84}><QrIcon /></IconAction>
                <IconAction label="Open public link" onClick={() => window.open(PUBLIC_LINK, '_blank', 'noopener,noreferrer')} left={508.84}><ExternalIcon /></IconAction>

                {qrVisible && (
                  <div className="absolute left-[456.84px] top-[381px] z-20 grid size-[112px] grid-cols-5 gap-1 rounded-xl border border-gfx-green-200 bg-[#F1FFFA] p-3 shadow-lg" aria-label="Public link QR preview">
                    {Array.from({ length: 25 }, (_, index) => <span key={index} className={`${[0,1,2,5,7,10,11,12,14,16,18,19,20,22,24].includes(index) ? 'bg-[#021B13]' : 'bg-transparent'} rounded-[1px]`} />)}
                  </div>
                )}

                <h3 className="absolute left-[33.84px] top-[402px] text-2xl font-normal leading-none text-white">Privacy Settings</h3>
                <p className="absolute left-[33.84px] top-[439px] text-sm leading-[18.8px] text-gfx-neutral-400">Choose what information is visible on your public page.</p>

                {PRIVACY_OPTIONS.map((label, index) => (
                  <div key={label} className="absolute left-[33.84px] flex h-[23px] w-[508px] items-center justify-between" style={{ top: 491.84 + index * 43 }}>
                    <span className="text-base leading-[1.2] text-white">{label}</span>
                    <ToggleSwitch
                      checked={privacy[label]}
                      onCheckedChange={(checked) => setPrivacy((current) => ({ ...current, [label]: checked }))}
                      label={label}
                    />
                  </div>
                ))}
              </div>
            )}

            {['This month', 'Avg/Day', 'Best Day'].map((label, index) => (
              <GlassCard key={label} divider="none" glow={false} rounded="14px" position="absolute" className="surface-raised surface-raised-border top-[162.84px] h-[124px] w-[210px] overflow-hidden border-[1.16px] shadow-[0_4.641px_23.204px_rgba(0,0,0,0.03)]" style={{ left: 629.84 + index * 220 }} data-share-stat-surface>
                <span className="absolute left-1/2 top-[34px] -translate-x-1/2 text-[36px] font-normal leading-none text-white">0</span>
                <span className="absolute left-1/2 top-[75px] -translate-x-1/2 whitespace-nowrap text-base leading-[1.2] text-gfx-neutral-400">{label}</span>
              </GlassCard>
            ))}

            <button type="button" aria-label="Previous month" className="absolute left-[629.84px] top-[327.84px] flex size-[18px] items-center justify-center text-gfx-neutral-400 hover:text-white focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none"><ChevronIcon direction="left" /></button>
            <p className="absolute left-[calc(50%+298.5px)] top-[329px] -translate-x-1/2 text-xs font-medium leading-[1.6] text-white">AUGUST</p>
            <button type="button" aria-label="Next month" className="absolute left-[1261.84px] top-[327.84px] flex size-[18px] items-center justify-center text-gfx-neutral-400 hover:text-white focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none"><ChevronIcon direction="right" /></button>

            <GlassCard divider="none" glow={false} rounded="24px" position="absolute" className="surface-raised surface-raised-border left-[629.84px] top-[387.84px] h-[294px] w-[661px] overflow-hidden border-[1.16px] shadow-[0_4.641px_23.204px_rgba(0,0,0,0.03)]" data-share-chart-surface>
              <SharePerformanceChart />
              <div className="theme-decorative-glow absolute bottom-[-183px] left-[176px] h-[228px] w-[404px] rounded-full bg-[#064B34] opacity-30 [filter:url(#blur-157)]" aria-hidden="true" />
            </GlassCard>

            <div className="absolute left-[644.84px] top-[703.84px] flex items-center gap-3 text-gfx-neutral-500">
              <EyeIcon />
              <span className="text-base leading-[1.2]">0 total views</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
