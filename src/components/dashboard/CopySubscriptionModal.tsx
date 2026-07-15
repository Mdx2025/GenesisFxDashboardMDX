import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassSelect, GlowButton } from '@/components/ui'

function InfoIcon({ color = '#9CA3AF' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 10V7.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 5H7.50625" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
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
      className="fixed inset-0 z-sticky flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Configure Subscription"
    >
      <div
        ref={modalRef}
        className="w-[1024px] max-w-[95vw] rounded-[22px] flex overflow-hidden"
        style={{ background: '#0C1311', boxShadow: '0px 4.64px 23.2px rgba(0,0,0,0.03), 0px 25px 50px -12px rgba(0,0,0,0.25)', outline: '1.16px solid #0C1311' }}
      >
        {/* Left Column — Configuration Form */}
        <div className="flex-1 p-10 flex flex-col" style={{ minWidth: 0, borderRight: '1px solid #303030' }}>
          {/* Step indicator + title */}
          <div className="flex items-center gap-4 mb-[39px]">
            <div className="w-8 h-8 rounded-full bg-gfx-green-900 border border-gfx-green-300 flex items-center justify-center flex-shrink-0">
              <span className="text-gfx-green-300 text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '20px' }}>1</span>
            </div>
            <h2 className="text-white text-2xl font-acid font-normal">Configure Subscription</h2>
          </div>

          {/* Select Account */}
          <div className="mb-[39px]">
            <label className="block text-white text-base font-acid font-medium leading-[24.44px] mb-3">Select Account</label>
            <GlassSelect
              options={ACCOUNT_OPTIONS}
              placeholder="Select an account"
              value={account}
              onChange={setAccount}
            />
          </div>

          {/* Lot Size Mode */}
          <div className="mb-8">
            <div className="flex items-center gap-1.5 mb-[12.5px]">
              <label className="text-white text-base font-acid font-medium leading-[24.44px]">Lot Size Mode</label>
              <InfoIcon />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {LOT_MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setLotMode(mode.id)}
                  className={`h-20 rounded-sm text-left px-4 flex flex-col justify-center cursor-pointer transition-colors ${
                    lotMode === mode.id
                      ? 'bg-gfx-green-900 border border-gfx-green-300'
                      : 'bg-gfx-green-800 border border-gfx-green-900 hover:border-gfx-green-200'
                  }`}
                >
                  <span className={`text-base font-acid font-medium leading-[24.44px] ${lotMode === mode.id ? 'text-gfx-green-300' : 'text-white'}`}>
                    {mode.title}
                  </span>
                  <span className="text-gfx-neutral-400 text-sm font-acid leading-[18.8px] mt-0.5">
                    {mode.subtitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subscription Amount */}
          <div className="mb-10">
            <div className="flex items-center gap-1.5 mb-[12.5px]">
              <label className="text-white text-base font-semibold leading-[22.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>Subscription Amount</label>
              <InfoIcon color="#808080" />
            </div>
            <div className="h-[62px] rounded-sm bg-gfx-green-900 flex items-center justify-between px-4">
              <span className="text-gfx-neutral-500 text-sm font-acid leading-[18.8px]">Account Balance</span>
              <span className="text-white text-sm font-acid leading-[18.8px]">$0.00</span>
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

        {/* Right Column — Profile & Summary */}
        <div className="w-[460px] flex-shrink-0 p-10 flex flex-col">
          {/* Profile */}
          <div className="flex items-center gap-4 mb-[32px]">
            <div className="w-14 h-14 rounded-full bg-gfx-green-200 flex items-center justify-center flex-shrink-0 border border-[#222]">
              <span className="text-white text-sm font-acid font-medium">{traderInitials}</span>
            </div>
            <div>
              <span className="text-white text-base font-acid font-medium leading-[24.44px] block">{traderName}</span>
              <span className="text-gfx-neutral-500 text-base font-acid font-medium leading-[24.44px] block">{traderUsername}</span>
            </div>
          </div>

          {/* AUM / ROI stat cards */}
          <div className="flex gap-4 mb-[32px]">
            <div className="flex-1 py-4 px-5 flex flex-col items-center bg-gfx-green-900 rounded-sm border border-gfx-green-200">
              <span className="text-gfx-green-300 text-xs font-acid leading-[18.8px]">AUM</span>
              <span className="text-gfx-green-300 text-base font-acid font-medium leading-[24.44px] mt-2">{aum}</span>
            </div>
            <div className="flex-1 py-4 px-5 flex flex-col items-center bg-gfx-green-900 rounded-sm border border-gfx-green-200">
              <span className="text-gfx-green-300 text-xs font-acid leading-[18.8px]">ROI</span>
              <span className="text-gfx-green-300 text-base font-acid font-medium leading-[24.44px] mt-2">{roi}</span>
            </div>
          </div>

          {/* Subscription Summary */}
          <div className="flex-1 px-[29px] py-[29px] rounded-md border border-gfx-neutral-250">
            <h3 className="text-white text-base font-acid font-medium leading-[24.44px] mb-[24.5px]">Subscription Summary</h3>

            <div className="space-y-[17.5px]">
              <SummaryRow label="Strategy Status" value="Active" valueClass="text-gfx-green-300" />
              <SummaryRow label="Account" value={account ? ACCOUNT_OPTIONS.find(o => o.value === account)?.label ?? '-' : '-'} />
              <SummaryRow label="Lot Sizing" value={LOT_MODE_LABELS[lotMode] ?? '-'} />
              <SummaryRow label="Amount" value="-" />
              <SummaryRow label="Min Investment" value={minInvestment} />
            </div>

            <div className="mt-[21.5px] space-y-[17.5px]">
              <div className="border-b border-[#6B7280] pb-[3px]">
                <SummaryRow label="Performance Fee" value={performanceFee} />
              </div>
              <div className="border-b border-[#6B7280] pb-[3px]">
                <SummaryRow label="Monthly Subscription" value={monthlySubscription} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, valueClass = 'text-white' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gfx-neutral-500 text-sm font-acid leading-[18.8px]">{label}</span>
      <span className={`text-sm font-acid leading-[18.8px] ${valueClass}`}>{value}</span>
    </div>
  )
}
