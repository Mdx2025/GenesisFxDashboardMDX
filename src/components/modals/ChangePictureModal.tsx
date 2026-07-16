import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard } from '../ui'

interface ChangePictureModalProps {
  open: boolean
  onClose: () => void
}

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M1.6665 4.16667C1.6665 3.38099 1.6665 2.98816 1.91058 2.74408C2.15466 2.5 2.5475 2.5 3.33317 2.5H16.6665C17.4522 2.5 17.845 2.5 18.0891 2.74408C18.3332 2.98816 18.3332 3.38099 18.3332 4.16667C18.3332 4.95234 18.3332 5.34518 18.0891 5.58926C17.845 5.83333 17.4522 5.83333 16.6665 5.83333H3.33317C2.5475 5.83333 2.15466 5.83333 1.91058 5.58926C1.6665 5.34518 1.6665 4.95234 1.6665 4.16667Z" fill="#00B38C" />
      <path d="M16.7239 7.0836C16.8416 7.08365 16.9625 7.0837 17.0832 7.08203V10.8336C17.0832 13.9763 17.0832 15.5476 16.1069 16.5239C15.1524 17.4784 13.6291 17.4997 10.6248 17.5002L10.6248 11.6289L12.0353 13.1961C12.2662 13.4527 12.6614 13.4735 12.9179 13.2426C13.1745 13.0117 13.1953 12.6165 12.9644 12.3599L10.4644 9.58212C10.3459 9.45043 10.177 9.37523 9.99984 9.37523C9.82266 9.37523 9.65381 9.45043 9.53528 9.58212L7.03528 12.3599C6.80437 12.6165 6.82517 13.0117 7.08174 13.2426C7.33831 13.4735 7.73349 13.4527 7.9644 13.1961L9.37484 11.6289L9.37484 17.5002C6.37055 17.4997 4.84731 17.4784 3.89281 16.5239C2.9165 15.5476 2.9165 13.9763 2.9165 10.8336V7.08203C3.03724 7.0837 3.15816 7.08365 3.27579 7.0836H16.7239Z" fill="#00B38C" />
    </svg>
  )
}

function AvatarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9.99984" cy="5.0013" r="3.33333" fill="#00B38C" />
      <ellipse cx="9.99984" cy="14.1654" rx="5.83333" ry="3.33333" fill="#00B38C" />
    </svg>
  )
}

function CameraAddIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.99935 5.97917C7.24097 5.97917 7.43685 6.17504 7.43685 6.41667V7.14583H8.16602C8.40764 7.14583 8.60352 7.34171 8.60352 7.58333C8.60352 7.82496 8.40764 8.02083 8.16602 8.02083H7.43685V8.75C7.43685 8.99162 7.24097 9.1875 6.99935 9.1875C6.75772 9.1875 6.56185 8.99162 6.56185 8.75V8.02083H5.83268C5.59106 8.02083 5.39518 7.82496 5.39518 7.58333C5.39518 7.34171 5.59106 7.14583 5.83268 7.14583H6.56185V6.41667C6.56185 6.17504 6.75772 5.97917 6.99935 5.97917Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.70305 12.25H8.29565C10.1162 12.25 11.0265 12.25 11.6805 11.821C11.9635 11.6353 12.2066 11.3967 12.3958 11.1187C12.8327 10.4767 12.8327 9.58295 12.8327 7.79545C12.8327 6.00796 12.8327 5.11421 12.3958 4.47218C12.2066 4.19425 11.9635 3.95561 11.6805 3.7699C11.2603 3.49424 10.7342 3.39572 9.92885 3.3605C9.54452 3.3605 9.21361 3.07456 9.13824 2.70455C9.02518 2.14952 8.52882 1.75 7.95232 1.75H6.04638C5.46988 1.75 4.97352 2.14952 4.86046 2.70455C4.78509 3.07456 4.45418 3.3605 4.06985 3.3605C3.26446 3.39572 2.73842 3.49424 2.31824 3.7699C2.03516 3.95561 1.7921 4.19425 1.60295 4.47218C1.16602 5.11421 1.16602 6.00796 1.16602 7.79545C1.16602 9.58295 1.16602 10.4767 1.60295 11.1187C1.7921 11.3967 2.03516 11.6353 2.31824 11.821C2.97215 12.25 3.88245 12.25 5.70305 12.25ZM9.33268 7.58333C9.33268 8.872 8.28801 9.91667 6.99935 9.91667C5.71068 9.91667 4.66602 8.872 4.66602 7.58333C4.66602 6.29467 5.71068 5.25 6.99935 5.25C8.28801 5.25 9.33268 6.29467 9.33268 7.58333ZM10.4993 5.39583C10.2577 5.39583 10.0618 5.59171 10.0618 5.83333C10.0618 6.07496 10.2577 6.27083 10.4993 6.27083H11.0827C11.3243 6.27083 11.5202 6.07496 11.5202 5.83333C11.5202 5.59171 11.3243 5.39583 11.0827 5.39583H10.4993Z" fill="white" />
    </svg>
  )
}

export function ChangePictureModal({ open, onClose }: ChangePictureModalProps) {
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

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Change Profile Picture"
    >
      <div ref={modalRef} className="relative w-[36.6875rem] max-w-[95vw]">
        <GlassCard variant="light" rounded="1.16rem" className="overflow-hidden" style={{ backgroundColor: '#0C1311' }}>
          {/* Hero banner */}
          <div
            className="relative h-[18rem] border-b border-white/5"
            style={{ background: 'radial-gradient(ellipse 109.82% 733.29% at -11.35% 41.20%, rgba(16, 185, 129, 0.35) 0%, rgba(16, 185, 129, 0) 41%), linear-gradient(168deg, #0A1F18 0%, #071410 70%)' }}
          >
            {/* Texture overlay */}
            <div className="absolute w-[41.5rem] h-[25.0625rem] -left-[0.625rem] -top-[8.0625rem] pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(57.5% 33.85% at 51.43% 51.34%, black 0%, rgba(102, 102, 102, 0) 100%)', borderRadius: '44.8rem' }} />

            {/* Avatar */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[3.75rem] w-[7.25rem] h-[7.25rem] rounded-full bg-[#0C1311] border-4 border-[#0C1311] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-[1.975rem] font-bold font-['Segoe_UI']">JD</span>
              </div>
              {/* Green glow beneath avatar */}
              <div className="absolute w-[17.1875rem] h-[7.27rem] left-1/2 -translate-x-1/2 bottom-[-7rem] rounded-full pointer-events-none" style={{ background: '#00B38C', filter: 'blur(9.88rem)' }} aria-hidden="true" />
              <div className="absolute w-[8.6375rem] h-[6rem] left-1/2 -translate-x-1/2 bottom-[-6.38rem] rounded-full pointer-events-none mix-blend-plus-lighter" style={{ background: '#40C99C', filter: 'blur(8.71rem)' }} aria-hidden="true" />
            </div>

            {/* Camera button */}
            <div className="absolute left-1/2 translate-x-[1.625rem] top-[8.5625rem] w-8 h-8 rounded-full bg-[#40C99C] border-[3px] border-[#0C1311] flex items-center justify-center">
              <CameraAddIcon />
            </div>
          </div>

          {/* Content */}
          <div className="relative px-[3.125rem] pt-5 pb-8">
            <h3 className="text-white text-2xl font-acid mb-2">Profile Picture</h3>
            <p className="text-[#808080] text-base font-acid leading-[1.2]">Upload a photo or pick a generated avatar.</p>

            {/* Option cards */}
            <div className="grid grid-cols-2 gap-[0.3125rem] mt-[3.4375rem]">
              {/* Upload */}
              <div className="h-[6.625rem] rounded-[1.25rem] border border-[#303030] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gfx-green-300 transition-colors">
                <div className="w-[2.625rem] h-[2.625rem] rounded-full bg-[#09241C] flex items-center justify-center">
                  <UploadIcon />
                </div>
                <p className="text-white text-base font-acid leading-[1.2]">Upload</p>
              </div>

              {/* Pick avatar */}
              <div className="h-[6.625rem] rounded-[1.25rem] border border-[#303030] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gfx-green-300 transition-colors">
                <div className="w-[2.625rem] h-[2.625rem] rounded-full bg-[#09241C] flex items-center justify-center">
                  <AvatarIcon />
                </div>
                <p className="text-white text-base font-acid leading-[1.2]">Pick avatar</p>
              </div>
            </div>

            <p className="text-[#808080] text-base font-acid leading-[1.2] text-center mt-6">Recommended: Square image, at least 200 x 200 pixels</p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-5 top-5 w-6 h-6"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </GlassCard>
      </div>
    </div>
  )
}
