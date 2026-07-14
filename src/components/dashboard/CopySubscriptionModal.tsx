import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, GlassSelect, GlowButton } from '@/components/ui'

function InfoIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="7" stroke="#808080" strokeWidth="1"/>
      <text x="7.5" y="11" textAnchor="middle" fill="#808080" fontSize="9" fontFamily="Arial">i</text>
    </svg>
  )
}

const LOT_MODES = [
  { id: 'proportional', title: 'Proportional to Balance', subtitle: "Copies master's risk %" },
  { id: 'percent', title: '% of Balance', subtitle: 'Fixed % risk per trade' },
  { id: 'same', title: 'Same Lot', subtitle: '1:1 mirror of master lot size' },
  { id: 'fixed', title: 'Fixed Lot', subtitle: 'Always open the same lot size' },
] as const

const LOT_MODE_LABELS: Record<string, string> = {
  proportional: 'Proportional',
  percent: '% of Balance',
  same: 'Same Lot',
  fixed: 'Fixed Lot',
}

const ACCOUNT_OPTIONS = [
  { value: 'mt5-001', label: 'MT5 - 001' },
  { value: 'mt5-002', label: 'MT5 - 002' },
  { value: 'mt5-003', label: 'MT5 - 003' },
]

interface CopySubscriptionModalProps {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  traderName?: string
  traderUsername?: string
  traderInitials?: string
  aum?: string
  roi?: string
  minInvestment?: string
  performanceFee?: string
  monthlySubscription?: string
}

export function CopySubscriptionModal({
  open,
  onClose,
  onConfirm,
  traderName = 'H4H',
  traderUsername = '@H4H',
  traderInitials = 'H4',
  aum = '$0.00',
  roi = '+0.00%',
  minInvestment = '$1,000.00',
  performanceFee = '30%',
  monthlySubscription = '$98.00',
}: CopySubscriptionModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [account, setAccount] = useState('')
  const [lotMode, setLotMode] = useState('proportional')

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
      setAccount('')
      setLotMode('proportional')
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
      aria-label="Configure Subscription"
    >
      <div ref={modalRef} className="w-[1024px] max-w-[95vw]">
      <GlassCard variant="light" divider="none" rounded="19px" className="flex overflow-hidden" style={{ background: '#0C1311' }}>
        {/* Left Column — Configuration Form */}
        <div className="flex-1 p-10 flex flex-col" style={{ minWidth: 0 }}>
          {/* Step indicator + title */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full border border-[#10BC83] flex items-center justify-center flex-shrink-0">
              <span className="text-[#10BC83] text-[0.875rem] font-acid font-medium">1</span>
            </div>
            <h2 className="text-white text-[1.0625rem] font-acid font-medium">Configure Subscription</h2>
          </div>

          {/* Select Account */}
          <div className="mb-8">
            <label className="block text-[#A0A0A0] text-[0.6875rem] font-acid font-medium mb-2">Select Account</label>
            <GlassSelect
              options={ACCOUNT_OPTIONS}
              placeholder="Select an account"
              value={account}
              onChange={setAccount}
            />
          </div>

          {/* Lot Size Mode */}
          <div className="mb-8">
            <div className="flex items-center gap-1.5 mb-4">
              <label className="text-[#A0A0A0] text-[0.6875rem] font-acid font-medium">Lot Size Mode</label>
              <InfoIcon />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {LOT_MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setLotMode(mode.id)}
                  className={`h-20 rounded-[12px] text-left px-[17px] flex flex-col justify-center cursor-pointer transition-colors ${
                    lotMode === mode.id
                      ? 'bg-[#09241C] border border-[#10BC83]'
                      : 'bg-[#0C1311] border border-[#064B34] hover:border-[#0a7a55]'
                  }`}
                >
                  <span className={`text-[0.6875rem] font-acid font-medium ${lotMode === mode.id ? 'text-white' : 'text-[#A0A0A0]'}`}>
                    {mode.title}
                  </span>
                  <span className="text-[#808080] text-[0.625rem] font-acid font-medium mt-1">
                    {mode.subtitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subscription Amount */}
          <div className="mb-10">
            <div className="flex items-center gap-1.5 mb-3">
              <label className="text-white text-[1rem] font-acid font-medium">Subscription Amount</label>
              <InfoIcon />
            </div>
            <div className="h-[62px] rounded-[30px] bg-[#0C1311] border border-[#064B34] flex items-center justify-between px-[17px]">
              <span className="text-[#808080] text-[1rem] font-acid font-medium">Account Balance</span>
              <span className="text-white text-[0.625rem] font-acid font-medium">$0.00</span>
            </div>
          </div>

          {/* Start Copying button */}
          <div className="mt-auto">
            <GlowButton
              label="Start copying"
              width="100%"
              height={44}
              onClick={() => { handleClose(); onConfirm?.() }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-[#303030]" />

        {/* Right Column — Profile & Summary */}
        <div className="w-[460px] flex-shrink-0 p-10 flex flex-col">
          {/* Profile */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-full bg-[#064B34] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[0.875rem] font-acid font-medium">{traderInitials}</span>
            </div>
            <div>
              <span className="text-white text-[0.6875rem] font-acid font-medium block">{traderName}</span>
              <span className="text-[#808080] text-[0.6875rem] font-acid font-medium block mt-0.5">{traderUsername}</span>
            </div>
          </div>

          {/* AUM / ROI stat cards */}
          <div className="flex gap-4 mb-8">
            <GlassCard variant="light" divider="none" rounded="12px" className="flex-1 py-4 px-5 flex flex-col items-center">
              <span className="text-[#A0A0A0] text-[1rem] font-acid font-medium">AUM</span>
              <span className="text-[#10BC83] text-[0.6875rem] font-acid font-medium mt-1">{aum}</span>
            </GlassCard>
            <GlassCard variant="light" divider="none" rounded="12px" className="flex-1 py-4 px-5 flex flex-col items-center">
              <span className="text-[#A0A0A0] text-[1rem] font-acid font-medium">ROI</span>
              <span className="text-[#10BC83] text-[0.6875rem] font-acid font-medium mt-1">{roi}</span>
            </GlassCard>
          </div>

          {/* Subscription Summary */}
          <GlassCard variant="light" divider="none" rounded="19px" className="flex-1 px-7 py-7">
            <h3 className="text-white text-[1rem] font-acid font-medium mb-6">Subscription Summary</h3>

            <div className="space-y-5">
              <SummaryRow label="Strategy Status" value="Active" valueClass="text-[#10BC83]" />
              <SummaryRow label="Account" value={account ? ACCOUNT_OPTIONS.find(o => o.value === account)?.label ?? '-' : '-'} />
              <SummaryRow label="Lot Sizing" value={LOT_MODE_LABELS[lotMode] ?? '-'} />
              <SummaryRow label="Amount" value="-" />
              <SummaryRow label="Min Investment" value={minInvestment} />
            </div>

            <div className="border-t border-[#064B34] mt-5 pt-5 space-y-5">
              <SummaryRow label="Performance Fee" value={performanceFee} />
              <SummaryRow label="Monthly Subscription" value={monthlySubscription} />
            </div>
          </GlassCard>
        </div>
      </GlassCard>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, valueClass = 'text-white' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#A0A0A0] text-[1rem] font-acid font-medium">{label}</span>
      <span className={`text-[1rem] font-acid font-medium ${valueClass}`}>{value}</span>
    </div>
  )
}
