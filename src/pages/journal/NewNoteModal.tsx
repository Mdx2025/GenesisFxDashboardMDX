import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlowButton, SecondaryButton } from '@/components/ui'

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#808080" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
      <path d="M1 1L8 7L15 1" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="#808080" strokeWidth="1.5" />
      <path d="M3 10H21" stroke="#808080" strokeWidth="1.5" />
      <path d="M8 2V6M16 2V6" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V14" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

interface NewNoteModalProps {
  open: boolean
  onClose: () => void
}

export default function NewNoteModal({ open, onClose }: NewNoteModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [noteType] = useState('Day note')
  const [date, setDate] = useState('04/21/2026')
  const [account] = useState('L#716445')
  const [folder] = useState('L#716445')
  const [note, setNote] = useState('')
  const [tags, setTags] = useState('')

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
        className="relative w-[793px] max-w-[95vw] max-h-[90vh] rounded-[30px] border-[1.16px] border-[#0c1311] bg-[#0c1311] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        {/* Background glow effects */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[587px] h-[435px] rotate-[48deg] rounded-full bg-[#064b34] blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2 w-[493px] h-[278px] rounded-full bg-[#064b34] blur-[100px] opacity-15 pointer-events-none" />

        {/* Close button — fixed above scroll */}
        <button
          onClick={handleClose}
          className="absolute top-[35px] right-[30px] z-20 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <CloseIcon />
        </button>

        {/* Scrollable content with custom green scrollbar */}
        <div
          className="relative overflow-y-auto max-h-[90vh] modal-scroll-green px-[123px] pt-[35px] pb-[50px]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#00b38c #09241c' }}
        >
          {/* Title */}
          <h2 className="text-white text-[50px] font-acid font-normal text-center mt-[40px]">
            New Note
          </h2>

          {/* DEMO selector */}
          <div className="flex items-center gap-2 mt-[20px]">
            <span className="text-[#808080] text-[16px] font-acid">DEMO</span>
            <ChevronDownIcon />
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-[18px] mt-[24px]">
            {/* Note Type */}
            <div>
              <label className="text-white text-[16px] font-acid font-medium mb-[8px] block">
                Note Type
              </label>
              <div className="relative h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] flex items-center px-[26px]">
                <CalendarIcon />
                <span className="text-[#808080] text-[16px] font-acid ml-[10px] flex-1">{noteType}</span>
                <ChevronDownIcon />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-white text-[16px] font-acid font-medium mb-[8px] block">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] px-[26px] text-[#808080] text-[16px] font-acid outline-none focus:border-[#00b38c] transition-colors"
              />
            </div>

            {/* Account (Optional) */}
            <div>
              <label className="text-white text-[16px] font-acid font-medium mb-[8px] block">
                Account (Optional)
              </label>
              <div className="relative h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] flex items-center px-[26px]">
                <span className="text-[#808080] text-[16px] font-acid flex-1">{account}</span>
                <ChevronDownIcon />
              </div>
            </div>

            {/* Folder (Optional) */}
            <div>
              <label className="text-white text-[16px] font-acid font-medium mb-[8px] block">
                Folder (Optional)
              </label>
              <div className="relative h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] flex items-center px-[26px]">
                <span className="text-[#808080] text-[16px] font-acid flex-1">{folder}</span>
                <ChevronDownIcon />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="text-white text-[16px] font-acid font-medium mb-[8px] block">
                Note
              </label>
              <div className="relative h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] flex items-center px-[26px]">
                <input
                  type="text"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="example of a note"
                  className="w-full bg-transparent text-[#808080] text-[16px] font-acid outline-none placeholder:text-[#808080]"
                />
                <ChevronDownIcon />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-white text-[16px] font-acid font-medium mb-[8px] block">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="Add a tag"
                className="w-full h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] px-[26px] text-[#808080] text-[16px] font-acid outline-none focus:border-[#00b38c] transition-colors placeholder:text-[#808080]"
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="text-white text-[16px] font-acid font-medium mb-[8px] block">
                Attachments
              </label>
              <div className="h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] flex items-center justify-center gap-[10px] cursor-pointer hover:border-[#00b38c] transition-colors">
                <UploadIcon />
                <span className="text-[#808080] text-[16px] font-acid">Upload file</span>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-end gap-3 mt-[30px]">
            <SecondaryButton className="h-[44px]" onClick={handleClose}>
              <span>New Account</span>
            </SecondaryButton>
            <GlowButton
              label="Trade"
              width={115}
              height={44}
              radius={300}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
