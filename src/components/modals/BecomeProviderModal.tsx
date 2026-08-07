import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlowButton } from '@/components/ui'

interface StepField {
  label: string
  hint?: string
  placeholder: string
  maxLength?: number
}

interface WizardStep {
  name: string
  fields: StepField[]
}

const STEPS: WizardStep[] = [
  {
    name: 'Profile',
    fields: [
      { label: 'Username', placeholder: '@ you_username' },
      { label: 'BIO', hint: '(Optional)', placeholder: 'Tell followers about your trading style...', maxLength: 500 },
    ],
  },
  {
    name: 'Markets',
    fields: [
      { label: 'Primary market', placeholder: 'XAUUSD, EURUSD, BTCUSD...' },
      { label: 'Signals per week', hint: '(Estimate)', placeholder: 'e.g. 12' },
    ],
  },
  {
    name: 'Style',
    fields: [
      { label: 'Trading style', placeholder: 'Scalping, intraday, swing...' },
      { label: 'Risk per trade', hint: '(Optional)', placeholder: 'e.g. 1.5%' },
    ],
  },
]

interface BecomeProviderModalProps {
  open: boolean
  onClose: () => void
  onSubmit?: (values: Record<string, string>) => void
}

export function BecomeProviderModal({ open, onClose, onSubmit }: BecomeProviderModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})
  const [focused, setFocused] = useState<string | null>(null)

  const currentStep = STEPS[step]

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

  function handleContinue() {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
      return
    }
    onSubmit?.(values)
    handleClose()
  }

  useEffect(() => {
    if (open) {
      setMounted(true)
      setStep(0)
      setValues({})
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

  useLayoutEffect(() => {
    if (!mounted || !stepRef.current) return
    gsap.fromTo(stepRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
  }, [mounted, step])

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
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Become a Signal Provider"
    >
      <div
        ref={modalRef}
        className="relative w-[49.5625rem] max-w-[95vw] my-auto bg-gfx-green-800 rounded-[1.875rem] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)]"
      >
        {/* Modal background (clipped to contain glows) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-[1.875rem] border border-gfx-green-800"
          aria-hidden="true"
        >
          <div className="absolute w-[30.8125rem] h-[17.375rem] left-[-12.375rem] top-[35.0625rem] bg-gfx-green-200 rounded-full blur-[9.8225rem]" />
          <div className="absolute w-[30.8125rem] h-[17.375rem] left-[39.25rem] top-[-1.125rem] bg-gfx-green-200 rounded-full blur-[9.8225rem]" />
          <div className="absolute w-[36.6875rem] h-[27.175rem] left-[21.9044rem] top-[-8.3125rem] rotate-[48deg] origin-top-left bg-gfx-green-800 rounded-full blur-[9.8225rem]" />
          <div className="absolute w-[30.8125rem] h-[17.375rem] left-[50.375rem] top-[-22.75rem] bg-gfx-green-175 rounded-full blur-[9.8225rem]" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[1.875rem] top-[1.9375rem] w-6 h-6"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative z-10 px-6 sm:px-[7.75rem] pt-[6.0625rem] pb-[7.1875rem]">
          {/* Title */}
          <h2 className="text-white font-acid font-normal text-center text-[2.25rem] leading-none">
            Become a Signal Provider
          </h2>

          {/* Stepper */}
          <div className="mt-[4.8125rem] flex items-start justify-center">
            {STEPS.map((s, i) => (
              <div key={s.name} className="flex items-start">
                {i > 0 && <span className={`mt-5 w-[4.125rem] h-px rounded-full ${step >= i ? 'bg-gfx-green-300' : 'bg-gfx-green-200'}`} />}
                <div className="relative flex flex-col items-center">
                  {step === i && (
                    <span className="absolute -top-[0.1875rem] w-[2.875rem] h-[2.875rem] rounded-full bg-gfx-green-350/20" aria-hidden="true" />
                  )}
                  <span
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center font-acid text-base text-white ${
                      step === i ? 'bg-gfx-green-350' : 'bg-gfx-green-900'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="mt-[0.9375rem] font-acid text-base text-white leading-none whitespace-nowrap">{s.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Step fields */}
          <div ref={stepRef} className="mt-[1.5625rem]">
            {currentStep.fields.map((field, i) => {
              const key = field.label
              const value = values[key] ?? ''
              const isFocused = focused === key
              return (
                <div key={key} className={i > 0 ? 'mt-[2.375rem]' : ''}>
                  <label
                    htmlFor={`provider-field-${step}-${i}`}
                    className="block font-acid font-medium text-base leading-[1.5275rem] text-gfx-neutral-600 mb-[0.5625rem]"
                  >
                    {field.label}
                    {field.hint && <span className="ml-1.5">{field.hint}</span>}
                  </label>
                  <input
                    id={`provider-field-${step}-${i}`}
                    type="text"
                    value={value}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    onChange={(e) => setValues(v => ({ ...v, [key]: e.target.value }))}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused(null)}
                    className={`w-full h-[3.125rem] rounded-[1.875rem] px-[1.625rem] bg-gfx-green-800 font-acid text-base text-white placeholder:text-gfx-neutral-400 outline-none transition-[border-color] duration-200 border ${
                      isFocused ? 'border-gfx-green-300' : 'border-gfx-green-200'
                    }`}
                  />
                  {field.maxLength && (
                    <p className="mt-[0.3125rem] text-right font-acid font-medium text-base leading-[1.5275rem] text-gfx-neutral-400">
                      {value.length}/{field.maxLength}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {/* Continue */}
          <div className="mt-[4.125rem] -mx-1">
            <GlowButton label="Continue" width="100%" height={44} onClick={handleContinue} />
          </div>
        </div>
      </div>
    </div>
  )
}
