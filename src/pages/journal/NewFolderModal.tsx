import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'

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
    >
      <div
        ref={modalRef}
        className="relative w-[500px] max-w-[95vw] rounded-[30px] bg-[#0c1311] border border-white/6 p-6 sm:p-[40px] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.2)]"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-[20px] right-[20px] cursor-pointer hover:opacity-80 transition-opacity"
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="text-white text-[32px] font-acid font-normal text-center mb-[30px]">
          Create a New Folder
        </h2>

        {/* Folder Name */}
        <div className="mb-[30px]">
          <label className="text-white text-[16px] font-acid font-medium mb-[10px] block">
            Folder Name
          </label>
          <input
            type="text"
            value={folderName}
            onChange={e => setFolderName(e.target.value)}
            placeholder="Enter folder name"
            className="w-full h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] px-[26px] text-white text-[16px] font-acid outline-none focus:border-[#00b38c] transition-colors placeholder:text-[#808080]"
            autoFocus
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleClose}
            className="h-[44px] px-[36px] rounded-[300px] border border-[#303030] bg-transparent text-white text-[16px] font-acid cursor-pointer hover:border-[#505050] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (folderName.trim()) {
                onSave?.(folderName.trim())
                handleClose()
              }
            }}
            className="h-[44px] px-[36px] rounded-[300px] bg-[#00b38c] text-[#0c1311] text-[16px] font-acid font-medium cursor-pointer hover:bg-[#00c99a] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
