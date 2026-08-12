import { useEffect, useRef, useState, useLayoutEffect, useCallback, type ComponentType, type CSSProperties } from 'react'
import gsap from 'gsap'
import { GlowButton, SparkleButton } from '@/components/ui'
import {
  GlobeIcon,
  BitcoinIcon,
  BarChartIcon,
  RecordCircleIcon,
  DiagramUpIcon,
  CourseUpIcon,
  BoltIcon,
  ClockCircleIcon,
  CalendarSolidIcon,
  TargetIcon,
} from './becomeProviderIcons'

interface IconProps {
  size?: number
  className?: string
}

const STEP_NAMES = ['Profile', 'Markets', 'Style'] as const

const PROFILE_FIELDS = [
  { label: 'Username', placeholder: '@ you_username' },
  { label: 'BIO', hint: '(Optional)', placeholder: 'Tell followers about your trading style...', maxLength: 500 },
]

const MARKETS: { name: string; Icon: ComponentType<IconProps>; size: number }[] = [
  { name: 'Forex', Icon: GlobeIcon, size: 21 },
  { name: 'Crypto', Icon: BitcoinIcon, size: 20 },
  { name: 'Commodities', Icon: BarChartIcon, size: 20 },
  { name: 'Metals', Icon: RecordCircleIcon, size: 20 },
  { name: 'Indices', Icon: DiagramUpIcon, size: 19 },
  { name: 'Stocks', Icon: CourseUpIcon, size: 20 },
]

const TIMEFRAMES: { name: string; hint: string; Icon: ComponentType<IconProps>; size: number }[] = [
  { name: 'Scalping', hint: 'Seconds to minutes', Icon: BoltIcon, size: 22 },
  { name: 'Day Trading', hint: 'Intraday positions', Icon: ClockCircleIcon, size: 24 },
  { name: 'Swing Trading', hint: 'Days to weeks', Icon: CalendarSolidIcon, size: 24 },
  { name: 'Position Trading', hint: 'Weeks to months', Icon: TargetIcon, size: 24 },
]

const RISK_LEVELS = ['Conservative', 'Moderate', 'Aggresive']
const EXPERIENCE_LEVELS = ['1 year', '1-3 years', '3-5 years', '5+ years']

// Every vertical gap is expressed as `calc(var(--u) * <figma px>)`. `--u` is 1px while the
// viewport is tall enough for the untouched Figma frame (765px for steps 1-2, 974px for step 3)
// and shrinks below that so the modal always stays inside 100dvh instead of spilling out.
// `fixed` is the sum of the step's non-collapsible heights, `gaps` the sum of its Figma gaps.
const STEP_METRICS = [
  { fixed: 347, gaps: 418 },
  { fixed: 351, gaps: 414 },
  { fixed: 520, gaps: 454 },
]
const MIN_GAP_SCALE = 0.2

const STEP_PADDING_BOTTOM = ['pb-[calc(var(--u)*115)]', 'pb-[calc(var(--u)*114)]', 'pb-[calc(var(--u)*56)]']

const SELECTABLE_BASE =
  'cursor-pointer rounded-[0.9375rem] border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-300'

export interface ProviderApplication {
  profile: Record<string, string>
  markets: string[]
  timeframe: string | null
  risk: string | null
  experience: string | null
}

interface BecomeProviderModalProps {
  open: boolean
  onClose: () => void
  onSubmit?: (values: ProviderApplication) => void
}

function CheckIcon({ size = 19, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 19 19" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.35 9.9L7.72 13.27L14.65 6.34"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <p className={`font-acid text-base leading-none text-gfx-neutral-400 ${className ?? ''}`}>{children}</p>
  )
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`${SELECTABLE_BASE} h-[2.625rem] flex items-center justify-center font-acid text-base text-white ${
        selected ? 'bg-gfx-green-900 border-gfx-green-300' : 'border-gfx-neutral-250 hover:border-gfx-neutral-500'
      }`}
    >
      {label}
    </button>
  )
}

export function BecomeProviderModal({ open, onClose, onSubmit }: BecomeProviderModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<Record<string, string>>({})
  const [markets, setMarkets] = useState<string[]>([])
  const [timeframe, setTimeframe] = useState<string | null>(null)
  const [risk, setRisk] = useState<string | null>(null)
  const [experience, setExperience] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)

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
    if (step < STEP_NAMES.length - 1) {
      setStep(step + 1)
      return
    }
    onSubmit?.({ profile, markets, timeframe, risk, experience })
    handleClose()
  }

  function toggleMarket(name: string) {
    setMarkets(prev => (prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]))
  }

  useEffect(() => {
    if (open) {
      setMounted(true)
      setStep(0)
      setProfile({})
      setMarkets([])
      setTimeframe(null)
      setRisk(null)
      setExperience(null)
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
        className="relative w-[49.5625rem] max-w-[95vw] my-auto max-h-[calc(100dvh-2rem)] flex flex-col bg-gfx-green-800 rounded-[1.875rem] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)]"
        style={{
          '--u': `clamp(${MIN_GAP_SCALE}px, (100dvh - ${STEP_METRICS[step].fixed + 32}px) / ${STEP_METRICS[step].gaps}, 1px)`,
        } as CSSProperties}
      >
        {/* Modal background (clipped to contain glows) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-[1.875rem] border border-gfx-green-800"
          aria-hidden="true"
        >
          <div className="theme-decorative-glow absolute w-[30.8125rem] h-[17.375rem] left-[-12.375rem] top-[35.0625rem] bg-gfx-green-200 rounded-full blur-[9.8225rem]" />
          <div className="theme-decorative-glow absolute w-[30.8125rem] h-[17.375rem] left-[39.25rem] top-[-1.125rem] bg-gfx-green-200 rounded-full blur-[9.8225rem]" />
          <div className="theme-decorative-glow absolute w-[36.6875rem] h-[27.175rem] left-[21.9044rem] top-[-8.3125rem] rotate-[48deg] origin-top-left bg-gfx-green-800 rounded-full blur-[9.8225rem]" />
          <div className="theme-decorative-glow absolute w-[30.8125rem] h-[17.375rem] left-[50.375rem] top-[-22.75rem] bg-gfx-green-175 rounded-full blur-[9.8225rem]" />
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

        <div className={`relative z-10 overflow-y-auto px-6 sm:px-[7.75rem] pt-[calc(var(--u)*97)] ${STEP_PADDING_BOTTOM[step]}`}>
          {/* Title */}
          <h2 className="text-white font-acid font-normal text-center text-[2.25rem] leading-none">
            Become a Signal Provider
          </h2>

          {/* Stepper */}
          <div className="mt-[calc(var(--u)*77)] flex items-start justify-center">
            {STEP_NAMES.map((name, i) => (
              <div key={name} className="flex items-start">
                {i > 0 && <span className={`mt-5 w-[4.125rem] h-px rounded-full ${step >= i ? 'bg-gfx-green-300' : 'bg-gfx-green-200'}`} />}
                <div className="relative flex flex-col items-center">
                  {step === i && (
                    <span className="absolute -top-[0.1875rem] w-[2.875rem] h-[2.875rem] rounded-full bg-gfx-green-350/20" aria-hidden="true" />
                  )}
                  <span
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center font-acid text-base text-white ${
                      step >= i ? 'bg-gfx-green-350' : 'bg-gfx-green-900'
                    }`}
                  >
                    {step > i ? <CheckIcon size={20} /> : i + 1}
                  </span>
                  <span className="mt-[0.9375rem] font-acid text-base text-white leading-none whitespace-nowrap">{name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Step body */}
          <div ref={stepRef}>
            {step === 0 && (
              <div className="mt-[calc(var(--u)*25)]">
                {PROFILE_FIELDS.map((field, i) => {
                  const key = field.label
                  const value = profile[key] ?? ''
                  const isFocused = focused === key
                  return (
                    <div key={key} className={i > 0 ? 'mt-[calc(var(--u)*38)]' : ''}>
                      <label
                        htmlFor={`provider-field-${i}`}
                        className="block font-acid font-medium text-base leading-[1.5275rem] text-gfx-neutral-600 mb-[0.5625rem]"
                      >
                        {field.label}
                        {field.hint && <span className="ml-1.5">{field.hint}</span>}
                      </label>
                      <input
                        id={`provider-field-${i}`}
                        type="text"
                        value={value}
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        onChange={(e) => setProfile(v => ({ ...v, [key]: e.target.value }))}
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
            )}

            {step === 1 && (
              <>
                <p className="mt-[calc(var(--u)*42)] text-center font-acid text-base leading-none text-gfx-neutral-400">
                  Select the markets you provide signals for
                </p>
                <div className="mt-[calc(var(--u)*25)] mx-auto w-full max-w-[31.625rem] grid grid-cols-2 gap-x-[0.5rem] gap-y-[0.625rem]">
                  {MARKETS.map(({ name, Icon, size }) => {
                    const selected = markets.includes(name)
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => toggleMarket(name)}
                        aria-pressed={selected}
                        className={`${SELECTABLE_BASE} h-[3.375rem] flex items-center pl-[1.3125rem] pr-[0.875rem] gap-[0.6875rem] ${
                          selected
                            ? 'bg-gfx-green-900 border-gfx-green-300 text-white'
                            : 'border-gfx-neutral-250 text-gfx-neutral-400 hover:border-gfx-neutral-500'
                        }`}
                      >
                        <span className={`w-6 flex justify-center shrink-0 ${selected ? 'text-gfx-green-300' : 'text-gfx-neutral-400'}`}>
                          <Icon size={size} />
                        </span>
                        <span className="font-acid text-base leading-none">{name}</span>
                        {selected && <CheckIcon className="ml-auto text-gfx-green-300" />}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="mt-[calc(var(--u)*42)] text-center font-acid text-base leading-none text-gfx-neutral-400">
                  Tell followers about how you trade
                </p>

                <div className="mx-auto w-full max-w-[33.1875rem]">
                  <SectionLabel className="mt-[calc(var(--u)*38)]">Trading Timeframe</SectionLabel>
                </div>
                <div className="mt-[calc(var(--u)*10)] mx-auto w-full max-w-[31.875rem] grid grid-cols-2 gap-[0.75rem]">
                  {TIMEFRAMES.map(({ name, hint, Icon, size }) => {
                    const selected = timeframe === name
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setTimeframe(selected ? null : name)}
                        aria-pressed={selected}
                        className={`${SELECTABLE_BASE} h-[4.8125rem] flex items-center text-left pl-[1.25rem] pr-[0.875rem] gap-[0.75rem] ${
                          selected
                            ? 'bg-gfx-green-900 border-gfx-green-300 text-white'
                            : 'border-gfx-neutral-250 text-gfx-neutral-400 hover:border-gfx-neutral-500'
                        }`}
                      >
                        <span className={`w-6 flex justify-center shrink-0 ${selected ? 'text-gfx-green-300' : 'text-gfx-neutral-400'}`}>
                          <Icon size={size} />
                        </span>
                        <span className="font-acid text-base leading-[1.3125rem]">
                          <span className="block">{name}</span>
                          <span className="block">{hint}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="mx-auto w-full max-w-[33.1875rem]">
                  <SectionLabel className="mt-[calc(var(--u)*29)]">Risk Appetite</SectionLabel>
                  <div className="mt-[calc(var(--u)*9)] grid grid-cols-3 gap-[0.75rem]">
                    {RISK_LEVELS.map(level => (
                      <Chip key={level} label={level} selected={risk === level} onClick={() => setRisk(risk === level ? null : level)} />
                    ))}
                  </div>

                  <SectionLabel className="mt-[calc(var(--u)*30)]">Experience</SectionLabel>
                  <div className="mt-[calc(var(--u)*8)] grid grid-cols-2 gap-x-[0.75rem] gap-y-[0.6875rem]">
                    {EXPERIENCE_LEVELS.map(level => (
                      <Chip
                        key={level}
                        label={level}
                        selected={experience === level}
                        onClick={() => setExperience(experience === level ? null : level)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          {step === 0 ? (
            <div className="mt-[calc(var(--u)*66)] -mx-1">
              <GlowButton label="Continue" width="100%" height={44} onClick={handleContinue} />
            </div>
          ) : (
            <div className={`${step === 1 ? 'mt-[calc(var(--u)*59)]' : 'mt-[calc(var(--u)*58)]'} flex gap-2 -mr-[0.3125rem]`}>
              <SparkleButton className="!w-[16.8125rem] !min-w-0 !h-[2.875rem] !rounded-3xl !px-5.5" onClick={() => setStep(step - 1)}>
                Back
              </SparkleButton>
              <div className="w-[17.0625rem] min-w-0">
                <GlowButton label="Continue" width="100%" height={44} onClick={handleContinue} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
