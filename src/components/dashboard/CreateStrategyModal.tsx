import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, GlassSelect, GlassInput, GlowButton } from '@/components/ui'

function MasterAccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="16" height="16" rx="3" stroke="#A0A0A0" strokeWidth="1.5"/>
      <rect x="4" y="8" width="3" height="6" rx="0.5" fill="#A0A0A0"/>
      <rect x="7.5" y="5" width="3" height="9" rx="0.5" fill="#A0A0A0"/>
      <rect x="11" y="3" width="3" height="11" rx="0.5" fill="#A0A0A0"/>
    </svg>
  )
}

function BasicDetailsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="6" r="3.5" stroke="#A0A0A0" strokeWidth="1.5"/>
      <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

const ACCOUNT_OPTIONS = [
  { value: 'smartinvest-genFX-1478448', label: 'smartinvest-GenFX  1478448' },
  { value: 'mt5-001', label: 'MT5 - 001' },
  { value: 'mt5-002', label: 'MT5 - 002' },
]

interface CreateStrategyModalProps {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
}

export function CreateStrategyModal({ open, onClose, onConfirm }: CreateStrategyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [account, setAccount] = useState('smartinvest-genFX-1478448')
  const [username, setUsername] = useState('')
  const [strategyName, setStrategyName] = useState('')
  const [description, setDescription] = useState('')

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
      setAccount('smartinvest-genFX-1478448')
      setUsername('')
      setStrategyName('')
      setDescription('')
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Create Copy Trading Strategy"
    >
      <div ref={modalRef} className="w-[480px] max-w-[95vw]">
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-5 top-5 w-6 h-6"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="relative px-8 pt-8 pb-8">
            {/* Title */}
            <h2 className="text-white text-[1.25rem] font-acid font-medium text-center mb-8">
              Create Copy Trading Strategy
            </h2>

            {/* Section 1: Master Account */}
            <div className="flex items-start gap-3 bg-[#09241C] rounded-[12px] px-4 py-4 mb-6">
              <div className="w-8 h-8 rounded-[8px] bg-[#0C1311] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MasterAccountIcon />
              </div>
              <div>
                <h3 className="text-white text-[0.875rem] font-acid font-medium">Master Account</h3>
                <p className="text-[#808080] text-[0.75rem] font-acid font-medium mt-0.5 leading-snug">
                  Choose the live account that will broadcast trades to followers
                </p>
              </div>
            </div>

            {/* Account dropdown */}
            <div className="mb-8">
              <label className="block text-[#A0A0A0] text-[0.75rem] font-acid font-medium mb-2">Account</label>
              <GlassSelect
                options={ACCOUNT_OPTIONS}
                placeholder="Select an account"
                value={account}
                onChange={setAccount}
              />
            </div>

            {/* Section 2: Basic Details */}
            <div className="flex items-start gap-3 bg-[#09241C] rounded-[12px] px-4 py-4 mb-6">
              <div className="w-8 h-8 rounded-[8px] bg-[#0C1311] flex items-center justify-center flex-shrink-0 mt-0.5">
                <BasicDetailsIcon />
              </div>
              <div>
                <h3 className="text-white text-[0.875rem] font-acid font-medium">Basic Details</h3>
                <p className="text-[#808080] text-[0.75rem] font-acid font-medium mt-0.5 leading-snug">
                  Define your strategy identity and requirements.
                </p>
              </div>
            </div>

            {/* Username */}
            <div className="mb-5">
              <label className="block text-[#A0A0A0] text-[0.75rem] font-acid font-medium mb-2">
                Username <span className="text-[#808080]">ⓘ</span>
              </label>
              <GlassInput
                placeholder="Enter username"
                value={username}
                onChange={setUsername}
              />
            </div>

            {/* Strategy Name */}
            <div className="mb-1">
              <label className="block text-[#A0A0A0] text-[0.75rem] font-acid font-medium mb-2">
                Strategy Name<span className="text-[#10BC83]">*</span>
              </label>
              <GlassInput
                placeholder="Enter Strategy Name"
                value={strategyName}
                onChange={(v) => setStrategyName(v.slice(0, 20))}
              />
            </div>
            <p className="text-[#808080] text-[0.625rem] font-acid font-medium mb-5">
              {strategyName.length}/20 characters
            </p>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-[#A0A0A0] text-[0.75rem] font-acid font-medium mb-2">Description</label>
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Strategy Description"
                  rows={3}
                  className="w-full bg-[#0C1311] font-acid text-white placeholder:text-[#808080] rounded-[16px] px-4 py-3 text-[1rem] outline-none border border-[#064B34] focus:border-[rgba(16,188,131,0.5)] transition-[border-color] duration-200 resize-none"
                />
              </div>
            </div>

            {/* Submit button */}
            <GlowButton
              label="Create Strategy"
              width="100%"
              height={44}
              disabled={!strategyName.trim()}
              onClick={() => { handleClose(); onConfirm?.() }}
            />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
