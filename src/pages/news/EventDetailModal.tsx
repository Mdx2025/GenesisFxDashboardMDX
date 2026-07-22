import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard } from '@/components/ui'
import type { EconomicEvent } from '@/data/economicCalendar'

function GlobalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.02783 11.25C2.41136 6.07745 6.72957 2 12.0001 2C11.1693 2 10.4295 2.36421 9.82093 2.92113C9.21541 3.47525 8.70371 4.24878 8.28983 5.16315C7.87352 6.08292 7.55013 7.15868 7.33126 8.32611C7.1558 9.26194 7.04903 10.2485 7.01344 11.25H2.02783ZM2.02783 12.75H7.01344C7.04903 13.7515 7.1558 14.7381 7.33126 15.6739C7.55013 16.8413 7.87351 17.9171 8.28983 18.8368C8.70371 19.7512 9.21541 20.5247 9.82093 21.0789C10.4295 21.6358 11.1693 22 12.0001 22C6.72957 22 2.41136 17.9226 2.02783 12.75Z" fill="var(--color-gfx-green-300)" />
      <path d="M12.0001 3.39535C11.7251 3.39535 11.3699 3.51236 10.9567 3.89042C10.5406 4.27126 10.1239 4.86815 9.75585 5.68137C9.3902 6.4892 9.09329 7.46441 8.88897 8.55419C8.72806 9.41242 8.62824 10.3222 8.59321 11.25H15.4071C15.372 10.3222 15.2722 9.41242 15.1113 8.5542C14.907 7.46441 14.6101 6.48921 14.2444 5.68137C13.8763 4.86815 13.4597 4.27126 13.0435 3.89042C12.6304 3.51236 12.2751 3.39535 12.0001 3.39535Z" fill="var(--color-gfx-green-300)" />
      <path d="M8.88897 15.4458C9.09329 16.5356 9.3902 17.5108 9.75585 18.3186C10.1239 19.1319 10.5406 19.7287 10.9567 20.1096C11.3698 20.4876 11.7251 20.6047 12.0001 20.6047C12.2751 20.6047 12.6304 20.4876 13.0435 20.1096C13.4597 19.7287 13.8763 19.1319 14.2444 18.3186C14.6101 17.5108 14.907 16.5356 15.1113 15.4458C15.2722 14.5876 15.372 13.6778 15.4071 12.75H8.59321C8.62824 13.6778 8.72806 14.5876 8.88897 15.4458Z" fill="var(--color-gfx-green-300)" />
      <path d="M12.0001 2C12.831 2 13.5708 2.36421 14.1793 2.92113C14.7849 3.47525 15.2966 4.24878 15.7104 5.16315C16.1267 6.08292 16.4501 7.15868 16.669 8.32612C16.8445 9.26194 16.9512 10.2485 16.9868 11.25H21.9724C21.5889 6.07745 17.2707 2 12.0001 2Z" fill="var(--color-gfx-green-300)" />
      <path d="M16.669 15.6739C16.4501 16.8413 16.1267 17.9171 15.7104 18.8368C15.2966 19.7512 14.7849 20.5247 14.1793 21.0789C13.5708 21.6358 12.831 22 12.0001 22C17.2707 22 21.5889 17.9226 21.9724 12.75H16.9868C16.9512 13.7515 16.8445 14.7381 16.669 15.6739Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

function FolderSmallIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.29334 3.28649C1.25 3.51622 1.25 3.79201 1.25 4.34359V8.75C1.25 11.107 1.25 12.2855 1.98223 13.0178C2.71447 13.75 3.89298 13.75 6.25 13.75H8.75C11.107 13.75 12.2855 13.75 13.0178 13.0178C13.75 12.2855 13.75 11.107 13.75 8.75V7.37369C13.75 5.72846 13.75 4.90584 13.2691 4.37114C13.2248 4.32196 13.178 4.27515 13.1289 4.23092C12.5942 3.75 11.7715 3.75 10.1263 3.75H9.89277C9.17171 3.75 8.81119 3.75 8.47522 3.65423C8.29066 3.60163 8.11277 3.52794 7.94507 3.43464C7.63979 3.26479 7.38486 3.00986 6.875 2.5L6.53109 2.15609C6.3602 1.9852 6.27476 1.89976 6.18496 1.82532C5.79783 1.5044 5.32291 1.30768 4.82223 1.26086C4.7061 1.25 4.58527 1.25 4.34359 1.25C3.79201 1.25 3.51622 1.25 3.28649 1.29334C2.27519 1.48415 1.48415 2.27519 1.29334 3.28649ZM7.65625 6.25C7.65625 5.99112 7.86612 5.78125 8.125 5.78125H11.25C11.5089 5.78125 11.7188 5.99112 11.7188 6.25C11.7188 6.50888 11.5089 6.71875 11.25 6.71875H8.125C7.86612 6.71875 7.65625 6.50888 7.65625 6.25Z" fill="#FFB400" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M9 6.5V9.5C9 9.76522 8.89464 10.0196 8.70711 10.2071C8.51957 10.3946 8.26522 10.5 8 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H5.5" stroke="var(--color-gfx-green-300)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 1.5H10.5V4.5" stroke="var(--color-gfx-green-300)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 7L10.5 1.5" stroke="var(--color-gfx-green-300)" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DotSeparator() {
  return (
    <svg width="3" height="3" viewBox="0 0 3 3" fill="none">
      <rect width="3" height="3" rx="1.5" fill="var(--color-gfx-neutral-400)" />
    </svg>
  )
}

interface EventDetailModalProps {
  open: boolean
  onClose: () => void
  event: EconomicEvent | null
}

export function EventDetailModal({ open, onClose, event }: EventDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

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
    if (open) setMounted(true)
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

  if (!mounted || !event) return null

  const impactColor = event.impactLabel === 'High' ? 'text-gfx-red-dark' :
    event.impactLabel === 'Medium' ? 'text-gfx-amber' :
    'text-gfx-amber'

  const actualColor = event.actualColor === 'red' ? 'text-gfx-red-muted' : 'text-gfx-green-300'

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={event.event}
    >
      <GlassCard
        ref={modalRef}
        variant="light"
        divider="none"
        rounded="22px"
        className="w-[460px] max-w-[95vw] !bg-gfx-green-800"
      >
        {/* Header */}
        <div className="flex items-center gap-[18px] px-[25px] pt-7">
          <GlobalIcon />
          <h2 className="text-white text-xl font-bold font-[Segoe_UI]">{event.event}</h2>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-[8px] px-[25px] mt-[13px]">
          <span className="text-gfx-neutral-400 text-sm font-acid leading-[18.8px]">{event.country}</span>
          <DotSeparator />
          <span className="text-gfx-neutral-400 text-sm font-acid leading-[18.8px]">{event.dateLabel ?? ''}</span>
          <DotSeparator />
          <span className="text-gfx-neutral-400 text-sm font-acid leading-[18.8px]">{event.timeUtc ?? ''}</span>
          <DotSeparator />
          <FolderSmallIcon />
          <span className={`text-[13.5px] font-bold font-[Segoe_UI] ${impactColor}`}>{event.impactLabel ?? ''}</span>
        </div>

        {/* Stat cards */}
        <div className="flex gap-[10px] px-[25px] mt-[16px]">
          {/* Actual */}
          <div className="w-[130px] h-[67px] rounded-xl bg-gradient-to-b from-gfx-green-800 to-gfx-green-900 outline outline-1 outline-offset-[-1px] outline-gfx-green-900 p-[15px]">
            <span className="block text-gfx-neutral-400 text-xs font-acid leading-[18.8px]">Actual</span>
            <span className={`block text-base font-acid font-medium leading-[24.44px] mt-[3px] ${actualColor}`}>{event.actual ?? '—'}</span>
          </div>

          {/* Forecast */}
          <div className="w-[130px] h-[67px] rounded-xl bg-gfx-green-800 outline outline-1 outline-offset-[-1px] outline-gfx-green-900 p-[15px]">
            <span className="block text-gfx-neutral-400 text-xs font-acid leading-[18.8px]">Forecast</span>
            <span className="block text-gfx-neutral-400 text-base font-acid font-medium leading-[24.44px] mt-[3px]">{event.forecast ?? '—'}</span>
          </div>

          {/* Previous */}
          <div className="w-[130px] h-[67px] rounded-xl bg-gfx-green-800 outline outline-1 outline-offset-[-1px] outline-gfx-green-900 p-[15px]">
            <span className="block text-gfx-neutral-400 text-xs font-acid leading-[18.8px]">Previous</span>
            <span className="block text-white text-base font-acid font-medium leading-[24.44px] mt-[3px]">{event.prior ?? '—'}</span>
          </div>
        </div>

        {/* Description */}
        <div className="px-[25px] mt-[22px]">
          <span className="block text-gfx-neutral-500 text-[13.4px] font-[Segoe_UI]">Description</span>
          <p className="text-gfx-neutral-400 text-xs font-acid leading-[18.8px] mt-[7px]">
            {event.description ?? ''}
          </p>
        </div>

        {/* Source */}
        <div className="flex items-center gap-[6px] px-[25px] mt-[24px] pb-[15px]">
          <span className="text-gfx-neutral-400 text-[13.5px] font-[Segoe_UI]">Source:</span>
          <a
            href={event.sourceUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gfx-green-300 text-[13.5px] font-[Segoe_UI] hover:underline"
          >
            {event.source ?? ''}
            <ExternalLinkIcon />
          </a>
        </div>
      </GlassCard>
    </div>
  )
}
