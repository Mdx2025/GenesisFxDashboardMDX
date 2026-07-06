import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'

function LinkCircleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.04058 23.9588C5.74912 25.6673 8.49898 25.6673 13.9987 25.6673C19.4984 25.6673 22.2483 25.6673 23.9568 23.9588C25.6654 22.2502 25.6654 19.5004 25.6654 14.0007C25.6654 8.50093 25.6654 5.75107 23.9568 4.04253C22.2483 2.33398 19.4984 2.33398 13.9987 2.33398C8.49898 2.33398 5.74912 2.33398 4.04058 4.04253C2.33203 5.75107 2.33203 8.50093 2.33203 14.0007C2.33203 19.5004 2.33203 22.2502 4.04058 23.9588ZM11.082 10.209C8.98795 10.209 7.29036 11.9066 7.29036 14.0007C7.29036 16.0947 8.98795 17.7923 11.082 17.7923C13.1761 17.7923 14.8737 16.0947 14.8737 14.0007C14.8737 13.5174 15.2655 13.1257 15.7487 13.1257C16.2319 13.1257 16.6237 13.5174 16.6237 14.0007C16.6237 17.0612 14.1426 19.5423 11.082 19.5423C8.02145 19.5423 5.54036 17.0612 5.54036 14.0007C5.54036 10.9401 8.02145 8.45898 11.082 8.45898C11.5653 8.45898 11.957 8.85074 11.957 9.33398C11.957 9.81723 11.5653 10.209 11.082 10.209ZM20.707 14.0007C20.707 16.0947 19.0094 17.7923 16.9154 17.7923C16.4321 17.7923 16.0404 18.1841 16.0404 18.6673C16.0404 19.1506 16.4321 19.5423 16.9154 19.5423C19.9759 19.5423 22.457 17.0612 22.457 14.0007C22.457 10.9401 19.9759 8.45898 16.9154 8.45898C13.8548 8.45898 11.3737 10.9401 11.3737 14.0007C11.3737 14.4839 11.7654 14.8757 12.2487 14.8757C12.7319 14.8757 13.1237 14.4839 13.1237 14.0007C13.1237 11.9066 14.8213 10.209 16.9154 10.209C19.0094 10.209 20.707 11.9066 20.707 14.0007Z" fill="currentColor"/>
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.3333 9.66667C19.3333 15.0054 15.0054 19.3333 9.66667 19.3333C4.32791 19.3333 0 15.0054 0 9.66667C0 4.32791 4.32791 0 9.66667 0C15.0054 0 19.3333 4.32791 19.3333 9.66667ZM13.5627 6.73735C13.8458 7.02048 13.8458 7.47952 13.5627 7.76265L8.72932 12.596C8.44619 12.8791 7.98714 12.8791 7.70401 12.596L5.77068 10.6627C5.48755 10.3795 5.48755 9.92048 5.77068 9.63735C6.05381 9.35422 6.51286 9.35422 6.79599 9.63735L8.21667 11.058L10.377 8.89769L12.5373 6.73735C12.8205 6.45422 13.2795 6.45422 13.5627 6.73735Z" fill="currentColor"/>
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
  const glow1Ref = useRef<HTMLDivElement>(null)
  const glow2Ref = useRef<HTMLDivElement>(null)
  const icon1Ref = useRef<HTMLDivElement>(null)
  const icon2Ref = useRef<HTMLDivElement>(null)
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
    const glow1 = glow1Ref.current
    const glow2 = glow2Ref.current
    if (!overlay || !modal || !progress) return

    gsap.set(overlay, { opacity: 0 })
    gsap.set(modal, { opacity: 0, scale: 0.96 })
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modal, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })

    const tl = gsap.timeline({ delay: 0.4 })

    tl.fromTo(progress,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1, duration: 3, ease: 'power1.inOut',
        onComplete: () => {
          handleClose()
          setTimeout(() => onComplete?.(), 300)
        },
      },
      0
    )

    if (glow1) {
      tl.to(glow1, { opacity: 0.8, duration: 0.5, ease: 'power2.out' }, 1.5)
    }
    if (glow2) {
      tl.to(glow2, { opacity: 0.8, duration: 0.5, ease: 'power2.out' }, 2.85)
    }

    if (icon1Ref.current) {
      tl.to(icon1Ref.current, { color: '#70D7B5', duration: 0.4, ease: 'power2.out' }, 1.5)
    }
    if (icon2Ref.current) {
      tl.to(icon2Ref.current, { color: '#70D7B5', duration: 0.4, ease: 'power2.out' }, 2.85)
    }

    return () => { tl.kill() }
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
      className="fixed inset-0 z-[110] flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px]"
      role="dialog"
      aria-modal="true"
      aria-label="Transfer Processing"
    >
      <div
        ref={modalRef}
        className="relative overflow-hidden w-[793px] h-[479px] max-w-[95vw] bg-[#09090b] rounded-[40px] backdrop-blur-[23.23px] border border-gfx-green-200"
      >
        {/* SVG filter for circle glow */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="circle-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>
        </svg>

        {/* Bottom glow */}
        <div className="absolute pointer-events-none w-[493px] h-[288px] left-[190px] top-[540px] bg-[#14532d] rounded-full blur-[157px]" aria-hidden="true" />

        {/* Title */}
        <div className="absolute text-white font-acid font-normal text-center left-0 right-0 top-[111px] text-[36px]">
          Sending 0.1 ETH
        </div>

        {/* Subtitle */}
        <div className="absolute font-acid font-normal text-center left-0 right-0 top-[158px] text-[24px] text-gfx-neutral-500">
          Processing Internal Transfer
        </div>

        {/* Progress bar */}
        <div className="absolute left-[5.4%] right-[5.4%] top-[56.2%] h-[10px]">
          {/* Track */}
          <div className="absolute inset-0 bg-[#101E1A] rounded-2xl" />
          {/* Animated fill + glow (all scale together) */}
          <div ref={progressRef} className="absolute inset-0 scale-x-0 origin-left">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#064E3B_0%,#10B981_40%,#70D7B5_70%,#ffffff_100%)] rounded-2xl" />
            <div className="absolute -inset-y-[6px] inset-x-0 pointer-events-none bg-[linear-gradient(to_right,transparent_10%,rgba(16,185,129,0.4)_50%,rgba(112,215,181,0.6)_80%,rgba(255,255,255,0.5)_100%)] rounded-2xl blur-[8px]" aria-hidden="true" />
            <div className="absolute -inset-y-[12px] inset-x-0 pointer-events-none bg-[linear-gradient(to_right,transparent_20%,rgba(16,185,129,0.2)_50%,rgba(112,215,181,0.3)_80%,rgba(255,255,255,0.2)_100%)] rounded-2xl blur-[20px]" aria-hidden="true" />
          </div>
        </div>

        {/* Endpoint circle glow layers (SVG filter blur, animated by gsap) */}
        <div ref={glow1Ref} className="absolute pointer-events-none w-[10%] aspect-square left-[44.9%] top-[48.6%] bg-gfx-green-500 rounded-full [filter:url(#circle-glow)] opacity-0" aria-hidden="true" />
        <div ref={glow2Ref} className="absolute pointer-events-none w-[10%] aspect-square left-[87%] top-[48.6%] bg-gfx-green-500 rounded-full [filter:url(#circle-glow)] opacity-0" aria-hidden="true" />

        {/* Endpoint circles */}
        <div className="absolute w-[8%] aspect-square left-[45.9%] top-[50.3%] bg-[#101E1A] rounded-full" aria-hidden="true" />
        <div className="absolute w-[8%] aspect-square left-[88%] top-[50.3%] bg-[#101E1A] rounded-full" aria-hidden="true" />

        {/* Icons */}
        <div ref={icon1Ref} className="absolute left-[48.3%] top-[54.3%] text-gfx-neutral-300"><LinkCircleIcon /></div>
        <div ref={icon2Ref} className="absolute left-[90.9%] top-[55.1%] text-gfx-neutral-300"><CheckCircleIcon /></div>

        {/* Disclaimer */}
        <div className="absolute font-acid font-normal text-center left-0 right-0 top-[354px] text-[16px] text-gfx-neutral-300 leading-[24px]">
          Your transfer is being processed. Please do<br/>not close this window or navigate away.
        </div>
      </div>
    </div>
  )
}
