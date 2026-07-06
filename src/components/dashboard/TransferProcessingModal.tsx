import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'

function LinkCircleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.04058 23.9588C5.74912 25.6673 8.49898 25.6673 13.9987 25.6673C19.4984 25.6673 22.2483 25.6673 23.9568 23.9588C25.6654 22.2502 25.6654 19.5004 25.6654 14.0007C25.6654 8.50093 25.6654 5.75107 23.9568 4.04253C22.2483 2.33398 19.4984 2.33398 13.9987 2.33398C8.49898 2.33398 5.74912 2.33398 4.04058 4.04253C2.33203 5.75107 2.33203 8.50093 2.33203 14.0007C2.33203 19.5004 2.33203 22.2502 4.04058 23.9588ZM11.082 10.209C8.98795 10.209 7.29036 11.9066 7.29036 14.0007C7.29036 16.0947 8.98795 17.7923 11.082 17.7923C13.1761 17.7923 14.8737 16.0947 14.8737 14.0007C14.8737 13.5174 15.2655 13.1257 15.7487 13.1257C16.2319 13.1257 16.6237 13.5174 16.6237 14.0007C16.6237 17.0612 14.1426 19.5423 11.082 19.5423C8.02145 19.5423 5.54036 17.0612 5.54036 14.0007C5.54036 10.9401 8.02145 8.45898 11.082 8.45898C11.5653 8.45898 11.957 8.85074 11.957 9.33398C11.957 9.81723 11.5653 10.209 11.082 10.209ZM20.707 14.0007C20.707 16.0947 19.0094 17.7923 16.9154 17.7923C16.4321 17.7923 16.0404 18.1841 16.0404 18.6673C16.0404 19.1506 16.4321 19.5423 16.9154 19.5423C19.9759 19.5423 22.457 17.0612 22.457 14.0007C22.457 10.9401 19.9759 8.45898 16.9154 8.45898C13.8548 8.45898 11.3737 10.9401 11.3737 14.0007C11.3737 14.4839 11.7654 14.8757 12.2487 14.8757C12.7319 14.8757 13.1237 14.4839 13.1237 14.0007C13.1237 11.9066 14.8213 10.209 16.9154 10.209C19.0094 10.209 20.707 11.9066 20.707 14.0007Z" fill="#606060"/>
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.3333 9.66667C19.3333 15.0054 15.0054 19.3333 9.66667 19.3333C4.32791 19.3333 0 15.0054 0 9.66667C0 4.32791 4.32791 0 9.66667 0C15.0054 0 19.3333 4.32791 19.3333 9.66667ZM13.5627 6.73735C13.8458 7.02048 13.8458 7.47952 13.5627 7.76265L8.72932 12.596C8.44619 12.8791 7.98714 12.8791 7.70401 12.596L5.77068 10.6627C5.48755 10.3795 5.48755 9.92048 5.77068 9.63735C6.05381 9.35422 6.51286 9.35422 6.79599 9.63735L8.21667 11.058L10.377 8.89769L12.5373 6.73735C12.8205 6.45422 13.2795 6.45422 13.5627 6.73735Z" fill="#606060"/>
    </svg>
  )
}

interface TransferProcessingModalProps {
  open: boolean
  onClose: () => void
  onComplete?: () => void
}

export function TransferProcessingModal({ open, onClose, onComplete }: TransferProcessingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
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
    const progress = progressRef.current
    if (!overlay || !modal || !progress) return

    gsap.set(overlay, { opacity: 0 })
    gsap.set(modal, { opacity: 0, scale: 0.96 })
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modal, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })

    gsap.fromTo(progress,
      { scaleX: 0, transformOrigin: 'right center' },
      {
        scaleX: 1, duration: 3, ease: 'power1.inOut', delay: 0.4,
        onComplete: () => {
          handleClose()
          setTimeout(() => onComplete?.(), 300)
        },
      }
    )
  }, [mounted, handleClose, onComplete])

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
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Transfer Processing"
    >
      <div
        ref={modalRef}
        className="relative overflow-hidden"
        style={{
          width: 793,
          height: 479,
          maxWidth: '95vw',
          background: '#09090b',
          boxShadow: '0px 1.16px 0px 1.16px rgba(255,255,255,0.05) inset, 0px 9.29px 37.17px rgba(0,0,0,0.30)',
          borderRadius: 40,
          outline: '1.16px rgba(0,0,0,0.20) solid',
          outlineOffset: -1.16,
          backdropFilter: 'blur(23.23px)',
        }}
      >
        {/* Bottom glow */}
        <div className="absolute pointer-events-none" style={{ width: 493, height: 288, left: 190, top: 540, background: '#14532d', borderRadius: 9999, filter: 'blur(157px)' }} aria-hidden="true" />

        {/* Title */}
        <div className="absolute text-white font-acid font-normal text-center" style={{ left: 0, right: 0, top: 111, fontSize: 36 }}>
          Sending 0.1 ETH
        </div>

        {/* Subtitle */}
        <div className="absolute font-acid font-normal text-center" style={{ left: 0, right: 0, top: 158, fontSize: 24, color: '#A0A0A0' }}>
          Processing Internal Transfer
        </div>

        {/* Progress bar */}
        <div className="absolute" style={{ left: 43, right: 43, top: 269, height: 10 }}>
          {/* Track */}
          <div className="absolute inset-0" style={{ background: '#18181b', borderRadius: 30 }} />
          {/* Animated fill (grows right to left = transformOrigin right) */}
          <div ref={progressRef} className="absolute inset-0" style={{ background: 'linear-gradient(to left, #10B981 10%, #047857 40%, #064E3B 100%)', borderRadius: 30, transform: 'scaleX(0)', transformOrigin: 'right center' }} />
          {/* Glow layers */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(16,185,129,0.5), rgba(4,120,87,0.3), transparent)', borderRadius: 30, filter: 'blur(3px)' }} aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(16,185,129,0.3), rgba(4,120,87,0.2), transparent)', borderRadius: 30, filter: 'blur(6px)' }} aria-hidden="true" />
        </div>

        {/* Endpoint circles */}
        <div className="absolute" style={{ width: 64, height: 64, left: 364, top: 241, background: '#18181b', borderRadius: 9999 }} aria-hidden="true" />
        <div className="absolute" style={{ width: 64, height: 64, left: 698, top: 241, background: '#18181b', borderRadius: 9999 }} aria-hidden="true" />

        {/* Icons */}
        <div className="absolute" style={{ left: 383, top: 260 }}><LinkCircleIcon /></div>
        <div className="absolute" style={{ left: 721, top: 264 }}><CheckCircleIcon /></div>

        {/* Disclaimer */}
        <div className="absolute font-acid font-normal text-center" style={{ left: 0, right: 0, top: 354, fontSize: 16, color: '#606060', lineHeight: '24px' }}>
          Your transfer is being processed. Please do<br/>not close this window or navigate away.
        </div>
      </div>
    </div>
  )
}
