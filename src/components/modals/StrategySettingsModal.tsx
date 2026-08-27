import { useEffect, useRef, useState, useLayoutEffect, useCallback, type CSSProperties } from 'react'
import gsap from 'gsap'
import { GlowButton, SparkleButton, ModeToggle, GlassCard } from '@/components/ui'

// Same fluid-gap trick as BecomeProviderModal: every vertical gap is `calc(var(--u) * <figma px>)`.
// `--u` is 1px while the viewport can host the untouched 973px Figma frame and shrinks below that,
// so the modal stays inside 100dvh instead of spilling out. `fixed` is the sum of the
// non-collapsible heights, `gaps` the sum of the Figma gaps — both per tab, since the three
// frames reach the same 975px with a different mix of content and empty space.
const TAB_METRICS = [
  { fixed: 523, gaps: 452, actionsGap: 66 },
  { fixed: 442, gaps: 541, actionsGap: 250.5 },
  { fixed: 332, gaps: 651, actionsGap: 418.5 },
]
const MIN_GAP_SCALE = 0.2

const FIELD =
  'w-full bg-gfx-green-800 border border-gfx-green-200 text-white placeholder:text-gfx-neutral-400 font-acid text-base outline-none transition-colors focus:border-gfx-green-300'
const LABEL = 'block pl-1.5 font-acid text-base leading-[1.2] text-gfx-neutral-600'
const HINT = 'font-acid text-base leading-[1.2] text-gfx-neutral-500'

interface StrategySettingsModalProps {
  open: boolean
  onClose: () => void
}

function GearIcon({ size = 30 }: { size?: number }) {
  return (
    <span className="relative block shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <svg
        className="absolute"
        style={{ left: size * 0.125, top: size * 0.0833, width: size * 0.7917, height: size * 0.8334 }}
        viewBox="0 0 12.6667 13.3333"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.51921 0.101494C7.27231 0 6.95932 0 6.33333 0C5.70735 0 5.39435 0 5.14746 0.101494C4.81827 0.236819 4.55673 0.496385 4.42037 0.823089C4.35813 0.972227 4.33377 1.14567 4.32423 1.39866C4.31022 1.77045 4.11811 2.1146 3.79344 2.30062C3.46879 2.48664 3.07243 2.47969 2.74099 2.30584C2.51545 2.18753 2.35192 2.12175 2.19066 2.10068C1.83739 2.05452 1.48012 2.14953 1.19744 2.3648C0.985425 2.52625 0.828928 2.79526 0.515935 3.33329C0.202943 3.87131 0.046446 4.14032 0.0115647 4.40327C-0.0349436 4.75387 0.0607874 5.10844 0.277698 5.38899C0.376704 5.51704 0.515849 5.62468 0.731803 5.75935C1.04928 5.95732 1.25355 6.29457 1.25353 6.66668C1.25351 7.03875 1.04924 7.37595 0.731801 7.5739C0.515811 7.70858 0.376648 7.81624 0.277632 7.9443C0.0607216 8.22485 -0.0350094 8.57942 0.0114989 8.93002C0.0463802 9.19297 0.202877 9.46198 0.51587 10C0.828863 10.538 0.985359 10.807 1.19737 10.9685C1.48005 11.1838 1.83733 11.2788 2.19059 11.2326C2.35185 11.2115 2.51537 11.1458 2.74089 11.0275C3.07235 10.8536 3.46873 10.8467 3.79341 11.0327C4.11809 11.2187 4.31022 11.5629 4.32424 11.9347C4.33377 12.1877 4.35813 12.3611 4.42037 12.5102C4.55673 12.837 4.81827 13.0965 5.14746 13.2318C5.39435 13.3333 5.70735 13.3333 6.33333 13.3333C6.95932 13.3333 7.27231 13.3333 7.51921 13.2318C7.8484 13.0965 8.10994 12.837 8.2463 12.5102C8.30854 12.3611 8.3329 12.1877 8.34243 11.9347C8.35644 11.5629 8.54854 11.2187 8.87318 11.0327C9.19786 10.8466 9.59427 10.8536 9.92574 11.0274C10.1512 11.1457 10.3148 11.2115 10.476 11.2326C10.8293 11.2787 11.1865 11.1837 11.4692 10.9684C11.6812 10.807 11.8377 10.538 12.1507 9.99995C12.4637 9.46193 12.6202 9.19292 12.6551 8.92997C12.7016 8.57938 12.6059 8.2248 12.389 7.94426C12.29 7.8162 12.1508 7.70855 11.9348 7.57387C11.6174 7.37591 11.4131 7.03869 11.4131 6.66661C11.4132 6.29457 11.6174 5.95739 11.9348 5.75946C12.1508 5.62476 12.29 5.5171 12.389 5.38903C12.6059 5.10849 12.7017 4.75391 12.6552 4.40332C12.6203 4.14037 12.4638 3.87136 12.1508 3.33333C11.8378 2.79531 11.6813 2.5263 11.4693 2.36485C11.1866 2.14957 10.8293 2.05457 10.4761 2.10072C10.3148 2.12179 10.1513 2.18757 9.92578 2.30586C9.59432 2.47973 9.19793 2.48668 8.87325 2.30064C8.54857 2.1146 8.35644 1.77044 8.34243 1.39863C8.3329 1.14565 8.30854 0.97222 8.2463 0.823089C8.10994 0.496385 7.8484 0.236819 7.51921 0.101494ZM6.33333 8.66667C7.44631 8.66667 8.34856 7.77124 8.34856 6.66667C8.34856 5.5621 7.44631 4.66667 6.33333 4.66667C5.22035 4.66667 4.3181 5.5621 4.3181 6.66667C4.3181 7.77124 5.22035 8.66667 6.33333 8.66667Z"
          fill="white"
        />
      </svg>
    </span>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-[1.5625rem] top-1/2 -translate-y-1/2 w-[12.1448px] h-[7.53611px]"
      viewBox="0 0 12.1448 7.53611"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5.03529 7.10653L0.432517 2.50376C-0.491432 1.57981 0.162948 0 1.46961 0H10.6752C11.9818 0 12.6362 1.57981 11.7122 2.50376L7.10947 7.10653C6.5367 7.6793 5.60806 7.6793 5.03529 7.10653Z" fill="#808080" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg className="shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M8.99988 16.5C13.142 16.5 16.4999 13.1421 16.4999 9C16.4999 4.85786 13.142 1.5 8.99988 1.5C4.85774 1.5 1.49988 4.85786 1.49988 9C1.49988 13.1421 4.85774 16.5 8.99988 16.5Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12V9" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 6H9.00875" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <span className="relative block shrink-0 w-6 h-6" aria-hidden="true">
      <svg className="absolute left-0.5 top-1" width="20" height="16" viewBox="0 0 20 16" fill="none">
        <path d="M7.75 8C7.75 6.75736 8.75736 5.75 10 5.75C11.2426 5.75 12.25 6.75736 12.25 8C12.25 9.24264 11.2426 10.25 10 10.25C8.75736 10.25 7.75 9.24264 7.75 8Z" fill="#ECECEC" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 9.63938 0.424964 10.1915 1.27489 11.2957C2.97196 13.5004 5.81811 16 10 16C14.1819 16 17.028 13.5004 18.7251 11.2957C19.575 10.1915 20 9.63938 20 8C20 6.36062 19.575 5.80853 18.7251 4.70433C17.028 2.49956 14.1819 0 10 0C5.81811 0 2.97196 2.49956 1.27489 4.70433C0.424964 5.80853 0 6.36062 0 8ZM10 4.25C7.92893 4.25 6.25 5.92893 6.25 8C6.25 10.0711 7.92893 11.75 10 11.75C12.0711 11.75 13.75 10.0711 13.75 8C13.75 5.92893 12.0711 4.25 10 4.25Z" fill="#ECECEC" />
      </svg>
    </span>
  )
}

function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative mt-px shrink-0 w-11 h-[23px] rounded-[60px] cursor-pointer transition-colors ${checked ? 'bg-gfx-green-350' : 'bg-gfx-green-900'}`}
    >
      <span
        className={`absolute top-0.5 w-[19px] h-[19px] rounded-[60px] transition-all ${checked ? 'left-[22px] bg-white' : 'left-[3px] bg-gfx-neutral-250'}`}
      />
    </button>
  )
}

function SettingRow({
  title, description, checked, onChange, height, narrow = false,
}: { title: string; description: string; checked: boolean; onChange: (v: boolean) => void; height: string; narrow?: boolean }) {
  return (
    <div className={`flex items-start justify-between gap-4 rounded-[30px] border border-gfx-neutral-250 px-5 py-6 lg:pl-[2.375rem] lg:pr-[2.3125rem] lg:pt-[1.875rem] lg:pb-0 h-auto ${height}`}>
      <div className="min-w-0">
        <p className="font-acid text-base leading-[1.2] text-gfx-neutral-600">{title}</p>
        <p className={`mt-[4.8px] font-acid text-base leading-[1.2] text-gfx-neutral-400 ${narrow ? 'lg:max-w-[14.8125rem]' : ''}`}>{description}</p>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} label={title} />
    </div>
  )
}

export function StrategySettingsModal({ open, onClose }: StrategySettingsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState(0)
  const [hideOpen, setHideOpen] = useState(true)
  const [hideClosed, setHideClosed] = useState(false)
  const [privateStrategy, setPrivateStrategy] = useState(false)
  const [hideLeaderboard, setHideLeaderboard] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [risk, setRisk] = useState('')
  const [minInvestment, setMinInvestment] = useState('')
  const [maxInvestors, setMaxInvestors] = useState('')
  const [thumb, setThumb] = useState<{ ratio: number; offset: number } | null>(null)

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

  const syncThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const overflow = el.scrollHeight - el.clientHeight
    if (overflow <= 1) { setThumb(null); return }
    setThumb({ ratio: el.clientHeight / el.scrollHeight, offset: el.scrollTop / overflow })
  }, [])

  useEffect(() => {
    if (open) {
      setMounted(true)
      setTab(0)
      setName('')
      setDescription('')
      setRisk('')
      setMinInvestment('')
      setMaxInvestors('')
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
    syncThumb()
    window.addEventListener('resize', syncThumb)
    return () => window.removeEventListener('resize', syncThumb)
  }, [mounted, tab, syncThumb])

  useEffect(() => {
    if (!mounted) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, handleClose])

  if (!mounted) return null

  const metrics = TAB_METRICS[tab]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 lg:p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Strategy Settings"
    >
      <GlassCard
        ref={modalRef}
        variant="light"
        divider="none"
        rounded="1.75rem"
        className="w-[47.625rem] max-w-full lg:max-w-[95vw] my-auto max-h-[calc(100dvh-1.5rem)] lg:max-h-[calc(100dvh-2rem)] flex flex-col bg-gfx-green-800"
        style={{
          '--u': `clamp(${MIN_GAP_SCALE}px, (100dvh - ${metrics.fixed + 32}px) / ${metrics.gaps}, 1px)`,
        } as CSSProperties}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-4 top-4 lg:right-[2.75rem] lg:top-[1.625rem] w-6 h-6"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Custom scrollbar, only while the content actually overflows */}
        {thumb && (
          <div className="absolute right-[0.8125rem] top-[3.8125rem] bottom-[1.25rem] w-1 rounded-[60px] bg-gfx-green-900" aria-hidden="true">
            <div
              className="absolute inset-x-0 rounded-[60px] bg-gfx-green-300"
              style={{ height: `${thumb.ratio * 100}%`, top: `${thumb.offset * (1 - thumb.ratio) * 100}%` }}
            />
          </div>
        )}

        <div
          ref={scrollRef}
          onScroll={syncThumb}
          className="relative overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-5 pt-7 pb-7 lg:pl-[7.3125rem] lg:pr-[6.1875rem] lg:pt-[calc(var(--u)*72)] lg:pb-[calc(var(--u)*55)]"
        >
          {/* Title */}
          <div className="flex items-center gap-3 lg:gap-[17px] pr-8 lg:pr-0">
            <GearIcon size={30} />
            <h2 className="text-white font-acid font-normal text-[1.75rem] lg:text-[2.25rem] leading-none">Strategy Settings</h2>
          </div>

          {/* Tabs */}
          <div className="mt-[calc(var(--u)*41.5)] w-[27.6875rem] max-w-full">
            <ModeToggle options={['General', 'Visibility', 'Access']} activeIndex={tab} onChange={setTab} />
          </div>

          {tab === 0 && (
            <>
          {/* Strategy name */}
          <label className={`${LABEL} mt-[calc(var(--u)*46)]`} htmlFor="strategy-name">Strategy Name*</label>
          <input
            id="strategy-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            placeholder="Enter Strategy Name"
            className={`${FIELD} mt-[calc(var(--u)*11)] h-[3.125rem] rounded-[30px] px-4`}
          />
          <p className={`${HINT} mt-[calc(var(--u)*8)]`}>{name.length}/20 characters</p>

          {/* Strategy description */}
          <label className={`${LABEL} mt-[calc(var(--u)*34)]`} htmlFor="strategy-description">Strategy Description</label>
          <textarea
            id="strategy-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Strategy Description"
            className={`${FIELD} mt-[calc(var(--u)*11)] block h-[8.0625rem] rounded-[1.25rem] px-4 py-[0.9375rem] resize-none`}
          />

          {/* Risk profile */}
          <label className={`${LABEL} mt-[calc(var(--u)*41)]`} htmlFor="strategy-risk">Risk Profile</label>
          <div className="relative mt-[calc(var(--u)*11)]">
            <select
              id="strategy-risk"
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className={`${FIELD} h-[3.125rem] rounded-[30px] pl-4 pr-12 appearance-none cursor-pointer ${risk ? '' : 'text-gfx-neutral-400'}`}
            >
              <option value="" disabled>Select risk profile</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
            <ChevronDownIcon />
          </div>
          <p className={`${HINT} mt-[calc(var(--u)*8)]`}>Choose the risk level that best describes your trading strategy</p>

          {/* Min investment / Max investors */}
          <div className="mt-[calc(var(--u)*37)] grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-4 lg:gap-y-0">
            <div>
              <label className={LABEL} htmlFor="strategy-min">Min Investment ($)</label>
              <input
                id="strategy-min"
                inputMode="numeric"
                value={minInvestment}
                onChange={(e) => setMinInvestment(e.target.value)}
                placeholder="100"
                className={`${FIELD} mt-[calc(var(--u)*11)] h-[3.125rem] rounded-[30px] px-4`}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="strategy-max">Max Investors</label>
              <input
                id="strategy-max"
                inputMode="numeric"
                value={maxInvestors}
                onChange={(e) => setMaxInvestors(e.target.value)}
                placeholder="9"
                className={`${FIELD} mt-[calc(var(--u)*11)] h-[3.125rem] rounded-[30px] px-4`}
              />
            </div>
          </div>
            </>
          )}

          {tab === 1 && (
            <>
              <div className="mt-[calc(var(--u)*50)] flex items-start gap-3">
                <span className="mt-[0.375rem]"><InfoIcon /></span>
                <p className="w-full lg:w-[21.75rem] font-acid text-base leading-[1.2] text-gfx-neutral-400">
                  Control what trading information is visible to investors and the public
                </p>
              </div>

              <div className="mt-[calc(var(--u)*40)] flex items-center gap-[7px]">
                <EyeIcon />
                <p className="font-acid text-base leading-[1.2] text-gfx-neutral-600">Visibility</p>
              </div>

              <div className="mt-[calc(var(--u)*22)]">
                <SettingRow
                  title="Hide Open Positions"
                  description="Hide current open positions from public view"
                  narrow
                  height="lg:h-[7.4375rem]"
                  checked={hideOpen}
                  onChange={setHideOpen}
                />
              </div>
              <div className="mt-4">
                <SettingRow
                  title="Hide Closed Trades"
                  description="Hide trade history from public view"
                  height="lg:h-[7.4375rem]"
                  checked={hideClosed}
                  onChange={setHideClosed}
                />
              </div>
            </>
          )}

          {tab === 2 && (
            <>
              <div className="mt-[calc(var(--u)*51)]">
                <SettingRow
                  title="Private Strategy"
                  description="Require approval for new investors"
                  height="lg:h-[6.125rem]"
                  checked={privateStrategy}
                  onChange={setPrivateStrategy}
                />
              </div>
              <div className="mt-[13px]">
                <SettingRow
                  title="Hide from Leaderboard"
                  description="Remove this strategy from public  leaderboards"
                  height="lg:h-[6.125rem]"
                  checked={hideLeaderboard}
                  onChange={setHideLeaderboard}
                />
              </div>
            </>
          )}

          {/* Actions */}
          <div
            className="flex flex-col-reverse lg:flex-row items-center justify-center gap-3"
            style={{ marginTop: `calc(var(--u) * ${metrics.actionsGap})` }}
          >
            <SparkleButton className="!w-full lg:!w-[12.375rem] !h-[2.875rem] !rounded-[1.875rem]" onClick={handleClose}>Cancel</SparkleButton>
            <GlowButton label="Save changes" width={200} height={44} radius={300} className="!w-full lg:!w-[200px]" onClick={handleClose} />
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
