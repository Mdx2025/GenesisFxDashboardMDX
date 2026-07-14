import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { SparkleButton } from '@/components/ui'

/* ─── Icons ─── */

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#808080" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#808080" strokeWidth="1.5"/>
      <path d="M16 2V6M8 2V6M3 10H21" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Tab Pills ─── */

const TABS = ['Open Positions', 'Trade History', 'Fees & Billing'] as const

function TabPills({ active, onChange }: { active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex bg-[#0c1311] rounded-full p-1 gap-1">
      {TABS.map((label, i) => (
        <button
          key={label}
          onClick={() => onChange(i)}
          className={`px-5 py-2.5 rounded-full text-[0.875rem] font-acid cursor-pointer transition-colors ${
            active === i
              ? 'bg-[#064b34] text-white'
              : 'text-[#808080] hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/* ─── Info Row ─── */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <CalendarIcon />
        <span className="text-white text-[0.875rem] font-acid">{label}</span>
      </div>
      <span className="text-white text-[0.875rem] font-acid">{value}</span>
    </div>
  )
}

/* ─── Asset Tag ─── */

function AssetTag({ label }: { label: string }) {
  return (
    <span className="border border-[#303030] rounded-full px-4 py-2 text-[#ececec] text-[0.875rem] font-acid">
      {label}
    </span>
  )
}

/* ─── Modal ─── */

interface ManageSubscriptionModalProps {
  open: boolean
  onClose: () => void
  providerName?: string
  providerInitials?: string
}

export function ManageSubscriptionModal({
  open,
  onClose,
  providerName = 'Genesis Assets',
  providerInitials = 'GA',
}: ManageSubscriptionModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(2)

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
      setActiveTab(2)
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
    const overlay = overlayRef.current
    if (!overlay) return
    const blockLenis = (e: WheelEvent) => { e.stopPropagation() }
    overlay.addEventListener('wheel', blockLenis, true)
    return () => overlay.removeEventListener('wheel', blockLenis, true)
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
      onWheel={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Manage Subscription"
    >
      <div
        ref={modalRef}
        className="relative w-[480px] max-w-[95vw]"
      >
        {/* Modal background */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none bg-gfx-main rounded-[28px] backdrop-blur-[23.23px] border border-gfx-green-200"
          aria-hidden="true"
        >
          <div className="absolute w-[400px] h-[250px] left-1/2 -translate-x-1/2 top-[-150px] bg-[#114131] rounded-full blur-[120px] opacity-30" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-80 transition-opacity right-[20px] top-[20px]"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-8 pt-7 pb-8">

          {/* Provider Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[44px] h-[44px] rounded-full bg-[#064b34] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[0.875rem] font-acid font-medium">{providerInitials}</span>
            </div>
            <div>
              <p className="text-white text-[1rem] font-acid leading-tight">{providerName}</p>
              <div className="mt-1">
                <span className="bg-[#064b34] text-[#10BC83] text-[0.75rem] font-acid px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <TabPills active={activeTab} onChange={setActiveTab} />

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-[#808080] text-[1rem] font-acid">No open positions</p>
              </div>
            )}

            {activeTab === 1 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-[#808080] text-[1rem] font-acid">No trade history</p>
              </div>
            )}

            {activeTab === 2 && (
              <div className="flex flex-col gap-5">
                {/* Pricing */}
                <div>
                  <p className="text-[#a0a0a0] text-[0.875rem] font-acid mb-2">Pricing</p>
                  <InfoRow label="Monthly Fee" value="Free" />
                </div>

                {/* Billing Schedule */}
                <div>
                  <p className="text-[#a0a0a0] text-[0.875rem] font-acid mb-2">Billing Schedule</p>
                  <InfoRow label="Monthly Fee" value="" />
                </div>

                {/* Asset Focus */}
                <div>
                  <p className="text-[#a0a0a0] text-[0.875rem] font-acid mb-3">Asset Focus</p>
                  <div className="flex flex-wrap gap-2">
                    <AssetTag label="Forex" />
                    <AssetTag label="Gold" />
                    <AssetTag label="Indices" />
                  </div>
                </div>

                {/* Cancel Subscription */}
                <SparkleButton fullWidth className="mt-2">
                  Cancel Subscription
                </SparkleButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
