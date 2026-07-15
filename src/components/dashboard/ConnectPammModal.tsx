import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlowButton, GlassCard, GlassInput, GlowEllipse } from '@/components/ui'

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12V9" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 6H9.00833" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface ConnectPammModalProps {
  open: boolean
  onClose: () => void
  strategyName?: string
  strategyInitials?: string
  aum?: string
  roi?: string
  minInvestment?: string
  performanceFee?: string
  schedule?: string
  managementFee?: string
  availableBalance?: string
}

export function ConnectPammModal({
  open,
  onClose,
  strategyName = 'K Dizzy Capital 1.0',
  strategyInitials = 'KC',
  aum = '$0.0k',
  roi = '194.12%',
  minInvestment = '$50',
  performanceFee = '20%',
  schedule = 'Monthly',
  managementFee = '1.7%',
  availableBalance = '$100.00',
}: ConnectPammModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [amount, setAmount] = useState('')
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [agreedRisk, setAgreedRisk] = useState(true)

  const isValid = amount !== '' && parseFloat(amount) >= 50 && agreedTerms && agreedRisk

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
      setAmount('')
      setAgreedTerms(false)
      setAgreedRisk(true)
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

  const details = [
    { label: 'Min Investment', value: minInvestment },
    { label: 'Perfomance Fee', value: performanceFee },
    { label: 'Schedule', value: schedule },
    { label: 'Managment Fee', value: managementFee },
  ]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-sticky flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Connect to PAMM"
    >
      <div
        ref={modalRef}
        className="w-[1290px] max-w-[95vw] max-h-[90vh]"
      >
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden !bg-gfx-green-800">
          <GlowEllipse className="left-1/2 -translate-x-1/2 bottom-[-200px]" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[40px] top-[33px] w-[24px] h-[24px]"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="relative z-10 flex min-h-[719px]">
          {/* Left Column — Strategy Info */}
          <div className="w-[534px] flex-shrink-0 flex flex-col items-center relative">
            {/* Glass card background */}
            <div
              className="absolute left-[32px] top-[33px] right-0 bottom-[33px] rounded-[18.67px] border-[1.167px] border-[rgba(255,255,255,0.06)] overflow-hidden"
              style={{ boxShadow: '0px 9.34px 37.34px rgba(0, 0, 0, 0.3)' }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gfx-green-800 rounded-[18.67px]" />
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_1.167px_0px_1.167px_rgba(255,255,255,0.05)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-[55px] px-[40px] w-full">
              {/* Avatar */}
              <div className="w-[150px] h-[150px] rounded-full bg-gfx-green-900 flex items-center justify-center">
                <span className="text-white text-4xl font-acid">{strategyInitials}</span>
              </div>

              {/* Strategy Name */}
              <h3 className="text-white text-4xl font-acid font-normal mt-6 text-center">{strategyName}</h3>

              {/* AUM / ROI Cards */}
              <div className="flex gap-3 mt-8 w-full max-w-[350px]">
                <div className="flex-1 h-[118px] rounded-md border border-gfx-green-300 bg-gfx-green-800 flex flex-col items-center justify-center">
                  <span className="text-gfx-green-300 text-base font-acid font-medium leading-[24.44px]">Aum</span>
                  <span className="text-gfx-green-300 text-2xl font-acid mt-1">{aum}</span>
                </div>
                <div className="flex-1 h-[118px] rounded-md border border-gfx-green-300 bg-gfx-green-800 flex flex-col items-center justify-center">
                  <span className="text-gfx-green-300 text-base font-acid font-medium leading-[24.44px]">ROI</span>
                  <span className="text-gfx-green-300 text-2xl font-acid mt-1">{roi}</span>
                </div>
              </div>

              {/* Details List */}
              <div className="flex flex-col gap-3.5 mt-10 w-full max-w-[350px]">
                {details.map((d) => (
                  <div key={d.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-gfx-neutral-400 text-base font-acid font-medium leading-[24.44px]">{d.label}</span>
                      <InfoIcon />
                    </div>
                    <span className="text-white text-base font-acid font-medium leading-[24.44px]">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Investment Form */}
          <div className="flex-1 flex flex-col pt-[106px] pr-[75px] pl-[75px]">
            <h2 className="text-white text-4xl font-acid font-normal">Connect to PAMM</h2>

            {/* Available Balance */}
            <div className="mt-[38px] h-[50px] rounded-2xl bg-gfx-green-100 border border-[#404040] flex items-center justify-between px-[18px]">
              <span className="text-gfx-neutral-400 text-base font-acid">Available Balance</span>
              <span className="text-white text-base font-acid">{availableBalance}</span>
            </div>

            {/* Investment Input */}
            <div className="mt-[35px]">
              <GlassInput
                label="Investment"
                type="number"
                placeholder="Min $50.00"
                value={amount}
                onChange={setAmount}
                suffix={
                  <button
                    onClick={() => setAmount('100')}
                    className="text-gfx-neutral-400 text-base font-acid cursor-pointer hover:text-white transition-colors"
                  >
                    MAX
                  </button>
                }
              />
            </div>

            {/* Checkboxes */}
            <div className="mt-[38px] flex flex-col gap-[20px]">
              <label className="flex items-start gap-3.5 cursor-pointer">
                <button
                  onClick={() => setAgreedTerms(!agreedTerms)}
                  className={`w-[20px] h-[20px] rounded-full border-[1.5px] flex-shrink-0 flex items-center justify-center mt-[2px] cursor-pointer transition-colors ${
                    agreedTerms ? 'border-gfx-green-500 bg-gfx-green-500' : 'border-[#404040] bg-transparent'
                  }`}
                >
                  {agreedTerms && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <span className="text-gfx-neutral-400 text-base font-acid leading-[24.44px]">
                  I have read and agree to the PAMM investment agreement
                </span>
              </label>

              <label className="flex items-start gap-3.5 cursor-pointer">
                <button
                  onClick={() => setAgreedRisk(!agreedRisk)}
                  className={`w-[20px] h-[20px] rounded-full border-[1.5px] flex-shrink-0 flex items-center justify-center mt-[2px] cursor-pointer transition-colors ${
                    agreedRisk ? 'border-gfx-green-500 bg-gfx-green-500' : 'border-[#404040] bg-transparent'
                  }`}
                >
                  {agreedRisk && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <span className="text-gfx-neutral-400 text-base font-acid leading-[24.44px]">
                  I acknoweledge that investments in PAMM strategies carry risk. PAst perfomance does not guarantee future results.
                </span>
              </label>
            </div>

            {/* Invest Now button */}
            <div className="mt-[38px]">
              <GlowButton
                label="Invest Now"
                width="100%"
                disabled={!isValid}
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
        </GlassCard>
      </div>
    </div>
  )
}
