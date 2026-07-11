import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlowButton, SparkleButton, GlassSelect } from '@/components/ui'

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#808080" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function TriangleDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
      <path d="M5.03524 7.10653L0.432468 2.50376C-0.491481 1.57981 0.162899 0 1.46956 0L10.6751 0C11.9818 0 12.6361 1.57981 11.7122 2.50376L7.10942 7.10653C6.53665 7.6793 5.60801 7.6793 5.03524 7.10653Z" fill="#606060"/>
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
  useEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    if (!overlay) return
    const blockLenis = (e: WheelEvent) => { e.stopPropagation() }
    overlay.addEventListener('wheel', blockLenis, true)
    return () => overlay.removeEventListener('wheel', blockLenis, true)
  }, [mounted])
  const [date, setDate] = useState('04/21/2026')
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
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        ref={modalRef}
        className="glass-card relative w-[793px] max-w-[95vw] max-h-[90vh] rounded-[30px] bg-[#0C1311] overflow-y-auto modal-scroll-green"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#00b38c #09241c' }}
      >
        {/* Background glow effects */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[587px] h-[435px] rotate-[48deg] rounded-full bg-[#064b34] blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2 w-[493px] h-[278px] rounded-full bg-[#064b34] blur-[100px] opacity-15 pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-[35px] right-[30px] z-20 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <CloseIcon />
        </button>

        <div className="relative pl-[123px] pr-[100px] pt-[35px] pb-[50px]">
          {/* Title */}
          <h2 className="text-white text-[50px] font-acid font-normal text-center leading-none">
            New Note
          </h2>

          {/* DEMO selector */}
          <div className="flex justify-between items-center">
            <span className="text-[#808080] text-[16px] font-acid">DEMO</span>
            <TriangleDownIcon />
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-[18px] mt-[24px]">
            {/* Note Type */}
            <GlassSelect
              label="Note Type"
              options={[
                { value: 'day', label: 'Day note' },
                { value: 'week', label: 'Week note' },
                { value: 'trade', label: 'Trade note' },
                { value: 'general', label: 'General note' },
              ]}
              defaultValue="day"
            />

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
            <GlassSelect
              label="Account (Optional)"
              options={[
                { value: 'L#716445', label: 'L#716445' },
                { value: 'L#716446', label: 'L#716446' },
                { value: 'L#716447', label: 'L#716447' },
              ]}
              defaultValue="L#716445"
            />

            {/* Folder (Optional) */}
            <GlassSelect
              label="Folder (Optional)"
              options={[
                { value: 'L#716445', label: 'L#716445' },
                { value: 'L#716446', label: 'L#716446' },
                { value: 'L#716447', label: 'L#716447' },
              ]}
              defaultValue="L#716445"
            />

            {/* Note */}
            <GlassSelect
              label="Note"
              options={[
                { value: 'example', label: 'example of a note' },
                { value: 'trade-review', label: 'Trade review' },
                { value: 'market-analysis', label: 'Market analysis' },
                { value: 'strategy', label: 'Strategy notes' },
              ]}
              placeholder="Select a note template"
            />

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
          <div className="flex items-center justify-center gap-3 mt-[30px]">
            <SparkleButton onClick={handleClose}>
              Cancel
            </SparkleButton>
            <GlowButton
              label="Create"
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
