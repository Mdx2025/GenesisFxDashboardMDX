import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, GlowEllipse, ModeToggle, GlassSelect } from '@/components/ui'

/* ─── Icons ─── */

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#808080" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#064b34"/>
      <path d="M8 12L11 15L16 9" stroke="#00b38c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─── Asset Tag ─── */

function AssetTag({ label }: { label: string }) {
  return (
    <span className="border border-gfx-neutral-250 rounded-full px-4 py-2 text-gfx-neutral-600 text-sm font-acid">
      {label}
    </span>
  )
}

/* ─── Options ─── */

const pricingOptions = [
  { value: 'free', label: 'Free' },
  { value: '9.99', label: '$9.99/mo' },
  { value: '29.99', label: '$29.99/mo' },
  { value: '49.99', label: '$49.99/mo' },
]

const billingOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
]

/* ─── Modal ─── */

interface ManageSubscriptionModalProps {
  open: boolean
  onClose: () => void
  providerName?: string
  providerSubtitle?: string
  providerInitials?: string
}

export function ManageSubscriptionModal({
  open,
  onClose,
  providerName = 'Genesis Assets',
  providerSubtitle = 'GFX',
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
      className="fixed inset-0 z-modal flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      onWheel={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Manage Subscription"
    >
      <div ref={modalRef} className="w-[560px] max-w-[95vw]">
        <GlassCard variant="light" divider="none" rounded="22px" className="relative overflow-hidden bg-gfx-green-800">
          <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[200px]" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute z-20 cursor-pointer hover:opacity-80 transition-opacity right-[24px] top-6"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>

          {/* Content */}
          <div className="relative p-[50px_50px_40px]">

            {/* Provider Header */}
            <div className="flex items-center gap-3 mb-1">
              <div className="w-[40px] h-[40px] rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-acid font-medium">{providerInitials}</span>
              </div>
              <div>
                <p className="text-white text-lg font-acid leading-tight">{providerName}</p>
                <p className="text-gfx-neutral-500 text-xs font-acid leading-5">{providerSubtitle}</p>
              </div>
            </div>

            {/* Active Badge */}
            <div className="flex items-center gap-2.5 bg-gfx-green-900 rounded-md px-3 py-2 w-fit mb-6 ml-[52px] -mt-1">
              <CheckCircleIcon />
              <span className="text-gfx-green-300 text-sm font-acid">Active</span>
            </div>

            {/* Tabs — ModeToggle */}
            <div className="flex justify-center mb-6">
              <ModeToggle
                options={['Open Positions', 'Trade History', 'Fees & Billing']}
                activeIndex={activeTab}
                onChange={setActiveTab}
              />
            </div>

            {/* Tab Content */}
            {activeTab === 0 && (
              <div className="flex flex-col gap-6">
                <div className="border border-gfx-neutral-250 rounded-xl min-h-[191px] flex items-center justify-center">
                  <p className="text-gfx-neutral-500 text-base font-acid-medium leading-6">No open positions yet.</p>
                </div>
                {/* Cancel Subscription */}
                <button className="w-full h-[46px] rounded-2xl border border-gfx-red-deep text-gfx-red-muted text-base font-acid-medium leading-6 cursor-pointer hover:bg-gfx-red-deep/10 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            )}

            {activeTab === 1 && (
              <div className="flex flex-col gap-6">
                <div className="border border-gfx-neutral-250 rounded-xl min-h-[191px] flex items-center justify-center">
                  <p className="text-gfx-neutral-500 text-base font-acid-medium leading-6">No closed trades yet.</p>
                </div>
                {/* Cancel Subscription */}
                <button className="w-full h-[46px] rounded-2xl border border-gfx-red-deep text-gfx-red-muted text-base font-acid-medium leading-6 cursor-pointer hover:bg-gfx-red-deep/10 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            )}

            {activeTab === 2 && (
              <div className="flex flex-col gap-5">
                {/* Pricing */}
                <GlassSelect
                  label="Pricing"
                  options={pricingOptions}
                  defaultValue="free"
                />

                {/* Billing Schedule */}
                <GlassSelect
                  label="Billing Schedule"
                  options={billingOptions}
                  defaultValue="monthly"
                />

                {/* Asset Focus */}
                <div>
                  <p className="text-gfx-neutral-500 text-sm font-acid mb-3">Asset Focus</p>
                  <div className="flex flex-wrap gap-2">
                    <AssetTag label="Forex" />
                    <AssetTag label="Gold" />
                    <AssetTag label="Indices" />
                  </div>
                </div>

                {/* Cancel Subscription */}
                <button className="w-full h-[46px] rounded-2xl border border-gfx-red-deep text-gfx-red-muted text-base font-acid-medium leading-6 cursor-pointer hover:bg-gfx-red-deep/10 transition-colors mt-2">
                  Cancel Subscription
                </button>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
