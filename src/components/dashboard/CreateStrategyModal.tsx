import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassInput, GlassTextarea, GlassSelect, GlowButton, SparkleButton } from '@/components/ui'

/* ─── Icons ─── */

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#808080" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

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
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      onWheel={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Create Copy Trading Strategy"
    >
      <div
        ref={modalRef}
        className="glass-card relative w-full max-w-3xl max-w-[95vw] max-h-[90vh] rounded-[30px] bg-[#0C1311] flex flex-col overflow-hidden"
      >
        {/* Background glow effects */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[587px] h-[435px] rotate-[48deg] rounded-full bg-[#064b34] blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2 w-[493px] h-[278px] rounded-full bg-[#064b34] blur-[100px] opacity-15 pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-[35px] right-[30px] z-20 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        <div
          className="relative px-4 sm:px-8 lg:pl-[123px] lg:pr-[100px] pt-6 sm:pt-[35px] pb-8 sm:pb-[50px] overflow-y-auto modal-scroll-green"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#00b38c #09241c' }}
        >
          {/* Title */}
          <h2 className="text-white text-3xl sm:text-4xl lg:text-[50px] font-acid font-normal text-center leading-none">
            Create Copy Trading Strategy
          </h2>

          {/* Form */}
          <div className="flex flex-col gap-[18px] mt-[24px]">

            {/* Master Account Section */}
            <SectionHeader
              icon={<MasterAccountIcon />}
              title="Master Account"
              subtitle="Choose the live account that will broadcast trades to followers"
            />

            {/* Account */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-2">Account</label>
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

            {/* Basic Details Section */}
            <SectionHeader
              icon={<BasicDetailsIcon />}
              title="Basic Details"
              subtitle="Define your strategy identity and requirements"
            />

            {/* Username */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2]">Username</label>
                <InfoIcon />
              </div>
              <GlassInput placeholder="Enter username" value={username} onChange={setUsername} />
            </div>

            {/* Strategy Name */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-2">Strategy Name*</label>
              <GlassInput placeholder="Enter Strategy Name" value={strategyName} onChange={(v) => setStrategyName(v.slice(0, 20))} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">{strategyName.length}/20 characters</p>
            </div>

            {/* Description */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-2">Description</label>
              <GlassTextarea placeholder="Enter Strategy Description" value={description} onChange={setDescription} rows={4} />
            </div>

            {/* Risk Profile */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-2">Risk Profile</label>
              <GlassSelect options={riskOptions} placeholder="Select risk profile..." value={riskProfile} onChange={setRiskProfile} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">Choose the risk level that best describes your trading strategy</p>
            </div>

            {/* Minimum Investment */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-2">Minimum Investment(USD) *</label>
              <GlassSelect options={minInvestmentOptions} placeholder="Select minimum..." value={minInvestment} onChange={setMinInvestment} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">Minimun amount required to invest in this strategy</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#064b34] to-transparent" />

            {/* Fee Structure Section */}
            <SectionHeader
              icon={<FeeIcon />}
              title="Fee Structure"
              subtitle="Configure your managment and perfomance fees"
            />

            {/* Performance Fee */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-2">Performance Fee(%)</label>
              <GlassSelect options={performanceFeeOptions} placeholder="Select..." value={performanceFee} onChange={setPerformanceFee} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">Charged on profits generated for followers</p>
            </div>

            {/* Monthly Subscription */}
            <div>
              <label className="text-[#ececec] text-[1rem] font-acid leading-[1.2] block mb-2">Monthly Subscription(%)</label>
              <GlassSelect options={monthlySubOptions} placeholder="Select..." value={monthlySub} onChange={setMonthlySub} />
              <p className="text-[#a0a0a0] text-[1rem] font-acid leading-[1.2] mt-1">MAx $10,000/mo</p>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-center gap-3 mt-[30px]">
            <SparkleButton onClick={handleClose}>
              Cancel
            </SparkleButton>
            <GlowButton
              label="Authenticate & Create Strategy"
              width={305}
              height={44}
              radius={300}
              onClick={() => { handleClose(); onConfirm?.() }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
