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

function TradeArrowIcon() {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="shrink-0">
      <path d="M0.5 3.18359C0.223858 3.18359 2.41411e-08 3.40745 0 3.68359C-2.41411e-08 3.95974 0.223858 4.18359 0.5 4.18359L0.5 3.68359L0.5 3.18359ZM15.8536 4.03715C16.0488 3.84189 16.0488 3.5253 15.8536 3.33004L12.6716 0.148061C12.4763 -0.0472013 12.1597 -0.0472013 11.9645 0.148061C11.7692 0.343323 11.7692 0.659905 11.9645 0.855168L14.7929 3.68359L11.9645 6.51202C11.7692 6.70728 11.7692 7.02387 11.9645 7.21913C12.1597 7.41439 12.4763 7.41439 12.6716 7.21913L15.8536 4.03715ZM0.5 3.68359L0.5 4.18359L15.5 4.1836L15.5 3.6836L15.5 3.1836L0.5 3.18359L0.5 3.68359Z" fill="currentColor" />
    </svg>
  )
}

/* ─── Trade History ─── */

interface ClosedTrade {
  symbol: string
  side: 'Buy' | 'Sell'
  lots: string
  entry: string
  exit: string
  closedAt: string
  pnl: string
  pnlTone: 'up' | 'down'
}

const closedTrades: ClosedTrade[] = [
  { symbol: 'XAUUSD', side: 'Buy', lots: '100 lots', entry: '4114.6', exit: '4114.6', closedAt: 'Jun 25, 7:15 AM', pnl: '+$0.40', pnlTone: 'down' },
  { symbol: 'XAUUSD', side: 'Sell', lots: '100 lots', entry: '4114.6', exit: '4114.6', closedAt: 'Jun 25, 7:15 AM', pnl: '+$0.40', pnlTone: 'up' },
  { symbol: 'XAUUSD', side: 'Buy', lots: '100 lots', entry: '4114.6', exit: '4114.6', closedAt: 'Jun 25, 7:15 AM', pnl: '+$0.40', pnlTone: 'down' },
]

function SideTag({ side }: { side: ClosedTrade['side'] }) {
  return (
    <span
      className={`h-6 px-3.5 rounded-full border text-xs font-acid leading-5 flex items-center ${
        side === 'Buy' ? 'border-gfx-bullish text-gfx-bullish-light' : 'border-gfx-red-deep text-gfx-red-muted'
      }`}
    >
      {side}
    </span>
  )
}

function Separator() {
  return <span className="w-0.5 h-0.5 rounded-full bg-current shrink-0" aria-hidden="true" />
}

function ClosedTradeRow({ trade }: { trade: ClosedTrade }) {
  return (
    <div className="flex items-start justify-between gap-4 px-7 py-[26px]">
      <div className="flex flex-col gap-2.5 min-w-0">
        <div className="flex items-center gap-4">
          <span className="text-white text-sm font-acid leading-5">{trade.symbol}</span>
          <SideTag side={trade.side} />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap text-gfx-neutral-400 text-base font-acid-medium leading-6">
          <span>{trade.lots}</span>
          <Separator />
          <span>@ {trade.entry}</span>
          <TradeArrowIcon />
          <span>{trade.exit}</span>
          <Separator />
          <span>{trade.closedAt}</span>
        </div>
      </div>
      <span
        className={`text-base font-acid leading-6 shrink-0 ${
          trade.pnlTone === 'up' ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'
        }`}
      >
        {trade.pnl}
      </span>
    </div>
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
      <div ref={modalRef} className="w-[571px] max-w-[95vw]">
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
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <p className="text-gfx-neutral-400 text-base font-acid-medium leading-6">TRADE HISTORY ({closedTrades.length})</p>
                    <p className="text-white text-base font-acid-medium leading-6">+$0.00</p>
                  </div>
                  <div className="border border-gfx-neutral-250 rounded-[20px] divide-y divide-gfx-neutral-250">
                    {closedTrades.map((trade, i) => (
                      <ClosedTradeRow key={i} trade={trade} />
                    ))}
                  </div>
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
