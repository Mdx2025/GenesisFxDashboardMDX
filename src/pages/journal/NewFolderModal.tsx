import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlowButton, SparkleButton, GlassInput, GlowEllipse } from '@/components/ui'

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#808080" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

interface NewFolderModalProps {
  open: boolean
  onClose: () => void
  onSave?: (name: string) => void
}

export default function NewFolderModal({ open, onClose, onSave }: NewFolderModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [folderName, setFolderName] = useState('')

  useEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    if (!overlay) return
    const blockLenis = (e: WheelEvent) => { e.stopPropagation() }
    overlay.addEventListener('wheel', blockLenis, true)
    return () => overlay.removeEventListener('wheel', blockLenis, true)
  }, [mounted])

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
      setFolderName('')
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
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [mounted, handleClose])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        ref={modalRef}
        className="glass-card relative w-[500px] max-w-[95vw] rounded-[30px] p-6 sm:p-[40px] overflow-hidden bg-gfx-green-800"
      >
        <GlowEllipse className="-right-[80px] -top-[60px]" />
        <GlowEllipse className="-left-[80px] -bottom-[60px]" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-[20px] right-[20px] z-10 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="relative text-white text-[2rem] font-acid font-normal text-center mb-[30px]">
          Create a New Folder
        </h2>

        {/* Folder Name */}
        <div className="relative mb-[30px]">
          <GlassInput
            label="Folder Name"
            placeholder="Enter folder name"
            value={folderName}
            onChange={setFolderName}
          />
        </div>

        {/* Actions */}
        <div className="relative flex items-center justify-center gap-4">
          <SparkleButton onClick={handleClose}>
            Cancel
          </SparkleButton>
          <GlowButton
            label="Save Changes"
            width={180}
            height={44}
            radius={300}
            onClick={() => {
              if (folderName.trim()) {
                onSave?.(folderName.trim())
                handleClose()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
