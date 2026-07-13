import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassCard, GlassInput, GlassTextarea, GlassSelect, GlowButton, SparkleButton, GlowEllipse } from '@/components/ui'

/* ─── Section Header ─── */

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 bg-[#09241c] rounded-[20px] p-5">
      <div className="w-[51px] h-[51px] rounded-[20px] bg-[#0c1311] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-[1.5rem] font-acid leading-normal">{title}</h3>
        <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}

/* ─── Icons ─── */

function MasterAccountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="3" stroke="#808080" strokeWidth="1.5"/>
      <path d="M6 15V13" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 15V11" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 15V9" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 15V7" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function BasicDetailsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13H8" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17H8" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 9H8" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function FeeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 1V23" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#808080" strokeWidth="1.5"/>
      <path d="M12 16V12" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1" fill="#808080"/>
    </svg>
  )
}

/* ─── Options ─── */

const riskOptions = [
  { value: 'conservative', label: 'Conservative' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'aggressive', label: 'Aggressive' },
  { value: 'high-risk', label: 'High Risk' },
]

const performanceFeeOptions = [
  { value: '10', label: '10%' },
  { value: '15', label: '15%' },
  { value: '20', label: '20%' },
  { value: '25', label: '25%' },
  { value: '30', label: '30%' },
]

const monthlySubOptions = [
  { value: '0', label: '0' },
  { value: '49', label: '$49' },
  { value: '98', label: '$98' },
  { value: '149', label: '$149' },
]

const minInvestmentOptions = [
  { value: '500', label: '$500' },
  { value: '1000', label: '$1,000' },
  { value: '2500', label: '$2,500' },
  { value: '5000', label: '$5,000' },
]

/* ─── Modal ─── */

interface CreateStrategyModalProps {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
}

export function CreateStrategyModal({ open, onClose, onConfirm }: CreateStrategyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  const [username, setUsername] = useState('')
  const [strategyName, setStrategyName] = useState('')
  const [description, setDescription] = useState('')
  const [riskProfile, setRiskProfile] = useState('moderate')
  const [minInvestment, setMinInvestment] = useState('1000')
  const [performanceFee, setPerformanceFee] = useState('20')
  const [monthlySub, setMonthlySub] = useState('0')

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
      setUsername('')
      setStrategyName('')
      setDescription('')
      setRiskProfile('moderate')
      setMinInvestment('1000')
      setPerformanceFee('20')
      setMonthlySub('0')
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px] overflow-y-auto py-8"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Create Copy Trading Strategy"
    >
      <div ref={modalRef} className="w-[700px] max-w-[95vw] my-auto max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden" style={{ background: '#0C1311' }}>
          <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[200px]" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[28px] top-[28px] w-[24px] h-[24px]"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="relative p-8 flex flex-col gap-8">

            {/* Title */}
            <h1 className="text-white text-[2.25rem] font-acid leading-normal text-center">
              Create Copy Trading Strategy
            </h1>

            {/* Master Account */}
            <SectionHeader
              icon={<MasterAccountIcon />}
              title="Master Account"
              subtitle="Choose the live account that will broadcast trades to followers"
            />

            {/* Account */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-1">Account</label>
              <GlassSelect
                options={[
                  { value: 'anapinzon-genFX-716446', label: 'anapinzon.ux-GenFX  L#716446' },
                  { value: 'mt5-001', label: 'MT5 - 001' },
                  { value: 'mt5-002', label: 'MT5 - 002' },
                ]}
                placeholder="Select an account"
                value="anapinzon-genFX-716446"
              />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#064b34] to-transparent" />

            {/* Basic Details */}
            <SectionHeader
              icon={<BasicDetailsIcon />}
              title="Basic Details"
              subtitle="Define your strategy identity and requirements"
            />

            {/* Username */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2]">Username</label>
                <InfoIcon />
              </div>
              <GlassInput placeholder="Enter username" value={username} onChange={setUsername} />
            </div>

            {/* Strategy Name */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-1">Strategy Name*</label>
              <GlassInput placeholder="Enter Strategy Name" value={strategyName} onChange={(v) => setStrategyName(v.slice(0, 20))} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">{strategyName.length}/20 characters</p>
            </div>

            {/* Description */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-1">Description</label>
              <GlassTextarea placeholder="Enter Strategy Description" value={description} onChange={setDescription} rows={4} />
            </div>

            {/* Risk Profile */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-1">Risk Profile</label>
              <GlassSelect options={riskOptions} placeholder="Select risk profile..." value={riskProfile} onChange={setRiskProfile} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">Choose the risk level that best describes your trading strategy</p>
            </div>

            {/* Minimum Investment */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-1">Minimum Investment(USD) *</label>
              <GlassSelect options={minInvestmentOptions} placeholder="Select minimum..." value={minInvestment} onChange={setMinInvestment} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">Minimun amount required to invest in this strategy</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#064b34] to-transparent" />

            {/* Fee Structure */}
            <SectionHeader
              icon={<FeeIcon />}
              title="Fee Structure"
              subtitle="Configure your managment and perfomance fees"
            />

            {/* Performance Fee */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-1">Performance Fee(%)</label>
              <GlassSelect options={performanceFeeOptions} placeholder="Select..." value={performanceFee} onChange={setPerformanceFee} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">Charged on profits generated for followers</p>
            </div>

            {/* Monthly Subscription */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-1">Monthly Subscription(%)</label>
              <GlassSelect options={monthlySubOptions} placeholder="Select..." value={monthlySub} onChange={setMonthlySub} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">MAx $10,000/mo</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <SparkleButton onClick={handleClose}>
                Cancel
              </SparkleButton>
              <GlowButton
                label="Authenticate & Create Strategy"
                width={305}
                height={44}
                onClick={() => { handleClose(); onConfirm?.() }}
              />
            </div>

          </div>
        </GlassCard>
      </div>
    </div>
  )
}
