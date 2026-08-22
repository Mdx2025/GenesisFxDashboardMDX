import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './AiCoachModal.css'
import { AiCoachChip, AiCoachIconChip, AiCoachPromptBar, AiCoachTradeChart } from '../ui/AiCoach'
import { PrimaryPillButton } from '../ui/PrimaryPillButton'
import {
  AiBoltIcon,
  AiBulbIcon,
  AiChatIcon,
  AiCoachFaceIcon,
  AiCopyIcon,
  AiHistoryIcon,
  AiNotebookIcon,
  AiPlusIcon,
  AiSparkleIcon,
  AiThumbDownIcon,
  AiThumbUpIcon,
  ChevronLeftIcon,
  SearchIcon,
} from '../icons'

interface AiCoachModalProps {
  open: boolean
  onClose: () => void
}

const CARD_W = 1270
const CARD_H = 906

type CoachView = 'default' | 'chat' | 'response' | 'idea'

const SIDEBAR_TABS = ['Chats', 'Trades', 'Strategies'] as const

/** Segmented-control slots, relative to the 276.85px tab track. */
const TAB_SLOTS = [
  { left: 5.45, width: 82.4 },
  { left: 98.8, width: 82.4 },
  { left: 177, width: 96 },
]

const DEFAULT_PROMPTS = [
  { label: 'What are my biggest weaknesses?', left: 337, top: 542, width: 266 },
  { label: 'Which asset should I focus on?', left: 263, top: 590, width: 237 },
  { label: 'Am I overtrading?', left: 510, top: 590, width: 167 },
]

const FOLLOW_UPS = [
  { label: 'Give me a 3-step action plan', left: 29, width: 228 },
  { label: 'Which asset should I focus on?', left: 267, width: 237 },
  { label: 'Am I overtrading?', left: 514, width: 152 },
]

const FEEDBACK_ACTIONS = [
  { label: 'Helpful', left: 72.51, Icon: AiThumbUpIcon },
  { label: 'Not helpful', left: 112.03, Icon: AiThumbDownIcon },
  { label: 'Copy answer', left: 151.56, Icon: AiCopyIcon },
]

const CHAT_ANSWER =
  'I apologize, but I cannot generate a trade idea right now. The "Live prices (right now)" section states "No live prices available right now." Without current price data, I cannot formulate an actionable trade with valid entry, stop loss, and take profit levels. Please provide live prices to proceed.'

const RESPONSE_BLOCKS: { label?: string; body: string }[] = [
  { body: 'Trade Idea: No Tradeable Instruments (Alternative Idea)' },
  {
    label: 'Setup: ',
    body: 'No metals instruments are available in the current live price feed to match your SHORT bias, so this alternative idea on XAUUSD presents a short opportunity if prices rally into resistance.',
  },
  {
    label: 'Entry zone:',
    body: ' 2335.00 - 2337.00 Stop loss: 2342.00 (approx 700 pips/points) Take profit: 2320.00 (R:R~ 2.1)',
  },
  {
    label: 'Why this fits the trader: ',
    body: 'Given your current win rate, focusing on well-defined resistance areas for short entries, even with a slight pullback first, could improve your entry timing and P&L.',
  },
  {
    label: 'Fundamental backdrop:',
    body: ' Gold remains sensitive to potential shifts in Fed policy and geopolitical tensions, with current market positioning suggesting some overextension at higher levels.',
  },
  {
    label: 'Risk:',
    body: ' A strong break above the 2342.00 level would invalidate this idea, signaling renewed bullish momentum.',
  },
]

const IDEA_GROUPS: {
  label: string
  top: number
  compact?: boolean
  options: { label: string; left: number; width: number }[]
}[] = [
  {
    label: 'ASSET CLASS',
    top: 135,
    options: [
      { label: 'Forex', left: 28, width: 68 },
      { label: 'Metals', left: 102, width: 74 },
      { label: 'Indices', left: 182, width: 73 },
      { label: 'Any', left: 261, width: 50 },
    ],
  },
  {
    label: 'DIRECTION BIAS',
    top: 223,
    compact: true,
    options: [
      { label: 'Long', left: 28, width: 63 },
      { label: 'Short', left: 97, width: 63 },
      { label: 'Either', left: 166, width: 63 },
    ],
  },
  {
    label: 'TRADING STYLE',
    top: 311,
    options: [
      { label: 'Scalp (mins)', left: 28, width: 112 },
      { label: 'Intraday', left: 146, width: 83 },
      { label: 'Swingdays', left: 235, width: 100 },
    ],
  },
  {
    label: 'RISK APPETITE',
    top: 399,
    options: [
      { label: 'Low', left: 28, width: 63 },
      { label: 'Medium', left: 97, width: 86 },
      { label: 'High', left: 189, width: 61 },
    ],
  },
]

export function AiCoachModal({ open, onClose }: AiCoachModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [view, setView] = useState<CoachView>('default')
  const [prompt, setPrompt] = useState('')
  const [ideasOpen, setIdeasOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [ideaChoice, setIdeaChoice] = useState<Record<string, string>>({ 'TRADING STYLE': 'Scalp (mins)' })

  const animateClose = useCallback(() => {
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) {
      onClose()
      return
    }
    gsap.to(modal, { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setMounted(false)
        onClose()
        requestAnimationFrame(() => triggerRef.current?.focus())
      },
    })
  }, [onClose])

  useEffect(() => {
    if (!open) return
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setMounted(true)
    setView('default')
    setPrompt('')
    setIdeasOpen(false)
    setDrawerOpen(false)
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    function measure() {
      setScale(Math.min(1, (window.innerWidth * 0.95) / CARD_W, (window.innerHeight * 0.95) / CARD_H))
      setIsMobile(window.innerWidth < 768)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [mounted])

  useLayoutEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) return
    gsap.set(overlay, { opacity: 0 })
    gsap.set(modal, { opacity: 0, scale: 0.96 })
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modal, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
  }, [mounted, isMobile])

  useEffect(() => {
    if (!mounted) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (ideasOpen) {
          setIdeasOpen(false)
          return
        }
        if (drawerOpen) {
          setDrawerOpen(false)
          return
        }
        animateClose()
      }
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, ideasOpen, drawerOpen, animateClose])

  if (!mounted) return null

  function askPrompt(text: string) {
    setPrompt(text)
    setView('chat')
  }

  function submitPrompt() {
    if (!prompt.trim()) return
    setPrompt('')
    setView('response')
  }

  // Below `md` the fixed 1270x906 canvas would scale to ~29%, so the modal
  // becomes a native full-screen sheet instead: header / scrolling body /
  // docked composer, with the sidebar demoted to an off-canvas drawer.
  if (isMobile) {
    return (
      <div ref={overlayRef} className="fixed inset-0 z-[9999] bg-gfx-overlay" role="dialog" aria-modal="true" aria-labelledby="ai-coach-title">
        <div ref={modalRef} className="h-full w-full">
          <div
            data-ai-coach-surface
            data-ai-coach-view={view}
            className="ai-coach-surface relative flex h-full w-full flex-col overflow-hidden bg-[color:var(--ac-bg)]"
          >
            <header className="relative z-20 flex h-14 shrink-0 items-center gap-2 border-b border-[color:var(--ac-border)] px-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open chat history"
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[color:var(--ac-panel)] text-[color:var(--ac-muted)] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ac-border-hl)]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2.25 4.5H15.75M2.25 9H15.75M2.25 13.5H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <span className="flex shrink-0 items-center justify-center text-[color:var(--ac-accent)]">
                <AiCoachFaceIcon size={26} />
              </span>
              <h2 id="ai-coach-title" className="ac-text truncate text-lg font-acid font-normal text-[color:var(--ac-text)]">
                AI Coach
              </h2>
              <span className="ml-auto inline-flex h-[30px] shrink-0 items-center gap-1 rounded-[60px] border-[0.824px] border-[color:var(--ac-border-hl)] px-2.5 text-[color:var(--ac-accent)]">
                <AiBoltIcon size={14} />
                <span className="text-xs font-acid font-normal">152</span>
              </span>
              <AiCoachIconChip label="Close modal" width={36} onClick={animateClose}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </AiCoachIconChip>
            </header>

            <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-4 py-6">
              <div
                className="ac-glow pointer-events-none absolute -left-[80px] -top-[160px] h-[320px] w-[380px] rounded-full bg-[color:var(--ac-blob)] opacity-60 blur-[120px]"
                aria-hidden="true"
              />

              {view === 'default' && (
                <div className="relative flex min-h-full flex-col items-center justify-center gap-3 text-center">
                  <h3 className="ac-text text-xl font-acid font-normal text-[color:var(--ac-text)]">
                    Ask me anything about your trades
                  </h3>
                  <p className="text-sm font-acid font-medium text-[color:var(--ac-muted)]">
                    I can only see your trading data - nothing else.
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {DEFAULT_PROMPTS.map((p) => (
                      <AiCoachChip key={p.label} onClick={() => askPrompt(p.label)}>
                        {p.label}
                      </AiCoachChip>
                    ))}
                  </div>
                </div>
              )}

              {view === 'chat' && (
                <div className="relative flex flex-col gap-3">
                  <div className="max-w-[85%] self-end rounded-[22px] bg-[color:var(--ac-bubble)] px-4 py-2.5">
                    <span className="ac-text text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">
                      Which asset should I focus on?
                    </span>
                  </div>
                  <div className="flex max-w-[85%] items-start gap-2 self-end rounded-[22px] bg-[color:var(--ac-bubble)] px-4 py-2.5">
                    <AiSparkleIcon size={16} className="mt-0.5 shrink-0 text-[color:var(--ac-accent)]" />
                    <span className="ac-text text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">
                      Generate a trade idea for me (Asset: forex)
                    </span>
                  </div>

                  <div className="relative overflow-hidden rounded-[24px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] p-5">
                    <div
                      className="ac-glow pointer-events-none absolute left-1/3 -top-[140px] h-[194px] w-[260px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80px]"
                      aria-hidden="true"
                    />
                    <p className="relative text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-body)]">{CHAT_ANSWER}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-sm font-acid font-normal text-[color:var(--ac-muted)]">HELPFUL?</p>
                    {FEEDBACK_ACTIONS.map(({ label, Icon }) => (
                      <button
                        key={label}
                        type="button"
                        aria-label={label}
                        className="flex size-[31.52px] cursor-pointer items-center justify-center bg-[color:var(--ac-well)] text-[color:var(--ac-muted)] [outline:0.88px_solid_var(--ac-border)] [outline-offset:-0.44px] transition-opacity hover:opacity-70"
                      >
                        <Icon size={15} />
                      </button>
                    ))}
                  </div>

                  <p className="mt-1 text-sm font-acid font-normal text-[color:var(--ac-muted)]">Suggested follow ups</p>
                  <div className="flex flex-wrap gap-2">
                    {FOLLOW_UPS.map((p) => (
                      <AiCoachChip key={p.label} onClick={() => askPrompt(p.label)}>
                        {p.label}
                      </AiCoachChip>
                    ))}
                  </div>
                </div>
              )}

              {view === 'response' && (
                <div className="relative overflow-hidden rounded-[24px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] p-5">
                  <div
                    className="ac-glow pointer-events-none absolute left-1/3 -top-[140px] h-[194px] w-[260px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80px]"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <AiSparkleIcon size={15} className="float-left mr-2 mt-1 text-[color:var(--ac-accent)]" />
                    {RESPONSE_BLOCKS.map((block, i) => (
                      <p
                        key={block.label ?? block.body}
                        className={`text-sm font-acid font-normal leading-[18.8px] ${i === 0 ? '' : 'mt-[18.8px]'}`}
                      >
                        {block.label && <span className="ac-text text-[color:var(--ac-text)]">{block.label}</span>}
                        <span className="text-[color:var(--ac-muted)]">{block.body}</span>
                      </p>
                    ))}
                    <AiCoachTradeChart className="mt-5 h-[160px] w-full overflow-hidden rounded-[15px]" />
                    <PrimaryPillButton className="ai-coach-cta mt-5 w-full" onClick={() => setView('idea')}>
                      <span className="text-base font-medium leading-[24.44px]">Place Sell Trade</span>
                    </PrimaryPillButton>
                  </div>
                </div>
              )}

              {view === 'idea' && (
                <div className="relative overflow-hidden rounded-[24px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] p-5">
                  <div
                    className="ac-glow pointer-events-none absolute left-1/3 -top-[140px] h-[194px] w-[260px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80px]"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-center gap-2">
                    <AiSparkleIcon size={15} className="shrink-0 text-[color:var(--ac-accent)]" />
                    <p className="ac-text text-sm font-acid font-normal text-[color:var(--ac-text)]">Let´s plan your trade</p>
                  </div>
                  <p className="relative mt-3 text-sm font-acid font-normal text-[color:var(--ac-muted)]">
                    Pick what you have in mind. Skip any let me decide.
                  </p>

                  {IDEA_GROUPS.map((group) => (
                    <div key={group.label} className="relative mt-5">
                      <p className="text-sm font-acid font-normal text-[color:var(--ac-muted)]">{group.label}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.options.map((option) => (
                          <AiCoachChip
                            key={option.label}
                            selected={ideaChoice[group.label] === option.label}
                            onClick={() => setIdeaChoice((prev) => ({ ...prev, [group.label]: option.label }))}
                          >
                            {option.label}
                          </AiCoachChip>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="relative mt-6 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setView('default')}
                      className="h-9 flex-1 rounded-[56px] border border-[color:var(--ac-border)] text-xs font-acid font-normal text-[color:var(--ac-quiet-text)] opacity-80 cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setView('response')}
                      className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-[56px] bg-[image:var(--ac-badge-gradient)] text-xs font-acid font-normal text-[color:var(--ac-quiet-text)] opacity-80 cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                    >
                      <AiSparkleIcon size={16} />
                      Generate idea
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-20 shrink-0 border-t border-[color:var(--ac-border)] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
              {ideasOpen && (
                <div
                  className="absolute bottom-full left-4 right-4 mb-2 overflow-hidden rounded-[24px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] py-2"
                  role="menu"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIdeasOpen(false)
                      setView('chat')
                    }}
                    className="flex w-full items-start gap-3 px-5 py-2.5 text-left cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                  >
                    <AiChatIcon size={18} className="mt-0.5 shrink-0 -scale-x-100 text-[color:var(--ac-accent)]" />
                    <span>
                      <span className="ac-text block text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">Chat Mode</span>
                      <span className="block text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">Ask about your trades</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIdeasOpen(false)
                      setView('idea')
                    }}
                    className="flex w-full items-start gap-3 px-5 py-2.5 text-left cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                  >
                    <AiSparkleIcon size={18} className="mt-0.5 shrink-0 text-[color:var(--ac-accent)]" />
                    <span>
                      <span className="ac-text block text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">AI Trade Idea</span>
                      <span className="block text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">Generate a trade idea</span>
                    </span>
                  </button>
                </div>
              )}

              <AiCoachPromptBar
                fluid
                value={prompt}
                onChange={setPrompt}
                onSubmit={submitPrompt}
                ideasOpen={ideasOpen}
                onToggleIdeas={() => setIdeasOpen((v) => !v)}
              />
              <p className="mt-2 text-center text-[11px] font-acid font-normal text-[color:var(--ac-muted)]">
                AI can only discuss your trading data. Not financial advice.
              </p>
            </div>

            {drawerOpen && (
              <div className="absolute inset-0 z-30 flex">
                <aside className="flex h-full w-[86%] max-w-[320px] flex-col gap-4 overflow-y-auto border-r border-[color:var(--ac-sidebar-border)] bg-[color:var(--ac-sidebar-bg)] p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex shrink-0 items-center justify-center text-[color:var(--ac-accent)]">
                      <AiCoachFaceIcon size={30} />
                    </span>
                    <span className="ac-text text-lg font-acid font-normal text-[color:var(--ac-text)]">AI Coach</span>
                    <span className="inline-flex h-[24.72px] items-center justify-center rounded-[16.48px] border-[0.82px] border-[color:var(--ac-border)] px-2 text-xs font-acid font-normal text-[color:var(--ac-accent)]">
                      v2.2
                    </span>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      aria-label="Close chat history"
                      className="ml-auto flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[color:var(--ac-panel)] text-[color:var(--ac-muted)] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                    >
                      <ChevronLeftIcon size={12} color="currentColor" />
                    </button>
                  </div>

                  <PrimaryPillButton
                    className="ai-coach-cta w-full"
                    onClick={() => {
                      setDrawerOpen(false)
                      setView('idea')
                    }}
                  >
                    <span className="flex items-center gap-2.5">
                      <AiPlusIcon size={18} />
                      New chat
                    </span>
                  </PrimaryPillButton>

                  <div className="relative h-11 w-full rounded-[60px] border border-[color:var(--ac-border)]">
                    <div className="absolute inset-0 rounded-[60px] bg-[color:var(--ac-panel)] opacity-50" aria-hidden="true" />
                    <SearchIcon size={18} color="var(--ac-muted)" className="absolute left-[14px] top-1/2 -translate-y-1/2" />
                    <span className="absolute left-[42px] top-1/2 -translate-y-1/2 text-sm font-acid font-normal text-[color:var(--ac-muted)]">
                      Search trades
                    </span>
                  </div>

                  <div
                    className="flex w-full gap-1 rounded-[60px] bg-[color:var(--ac-tab-track)] p-[5px]"
                    role="tablist"
                    aria-label="AI Coach sidebar sections"
                  >
                    {SIDEBAR_TABS.map((tab, i) => (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === i}
                        onClick={() => setActiveTab(i)}
                        className={`h-[29.66px] flex-1 rounded-[56px] text-xs font-acid font-normal cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)] ${
                          activeTab === i
                            ? 'bg-[image:var(--ac-badge-gradient)] opacity-80 text-[#ffffff]'
                            : 'text-[color:var(--ac-muted)]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs font-acid font-normal text-[color:var(--ac-muted)]">RECENT CHATS</p>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false)
                      setView('chat')
                    }}
                    className="relative flex h-[52.73px] w-full items-center gap-3 overflow-hidden rounded-[16.48px] border-[0.82px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] px-5 text-left cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                  >
                    <span
                      className="ac-glow pointer-events-none absolute left-[54px] -top-[98px] h-[104px] w-[160px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                      aria-hidden="true"
                    />
                    <AiChatIcon size={13} className="relative shrink-0 text-[color:var(--ac-accent)]" />
                    <span className="ac-text relative truncate text-xs font-acid font-normal text-[color:var(--ac-text)]">
                      Which asset should I focus on?
                    </span>
                  </button>

                  <div className="relative mt-auto overflow-hidden rounded-[16.48px] border-[0.82px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] p-4">
                    <div
                      className="ac-glow pointer-events-none absolute left-[58px] -top-[83px] h-[104px] w-[160px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-center gap-3">
                      <div className="flex size-[32.96px] shrink-0 items-center justify-center rounded-[56px] bg-[image:var(--ac-badge-gradient)] opacity-80">
                        <AiBulbIcon size={18} className="text-[#ffffff]" />
                      </div>
                      <div>
                        <p className="text-xs font-acid font-bold uppercase leading-[15.68px] tracking-[2.32px] text-[color:var(--ac-promo-label)]">
                          AI Coach
                        </p>
                        <p className="ac-text text-base font-acid font-medium text-[color:var(--ac-text)]">AI Trade Ideas</p>
                      </div>
                    </div>
                    <p className="relative mt-3 text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-promo-body)]">
                      Uses your trade history, live prices &amp; market watch to generate trade ideas.
                    </p>
                  </div>
                </aside>
                <button
                  type="button"
                  aria-label="Close chat history"
                  onClick={() => setDrawerOpen(false)}
                  className="h-full flex-1 cursor-pointer bg-black/60"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) animateClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-coach-title"
    >
      <div ref={modalRef} style={{ width: CARD_W * scale, height: CARD_H * scale }}>
        <div
          data-ai-coach-surface
          data-ai-coach-view={view}
          className="ai-coach-surface relative overflow-hidden rounded-[24px] border border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] shadow-[0_24px_72px_rgba(0,0,0,0.45)]"
          style={{
            width: CARD_W,
            height: CARD_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div
            className="ac-glow pointer-events-none absolute -left-[31.54px] top-[675.65px] h-[197.75px] w-[379.02px] opacity-50 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(168,85,247,0.55)_0%,rgba(168,85,247,0)_100%)]"
            aria-hidden="true"
          />

          {/* Sidebar */}
          <aside
            className="absolute left-0 top-0 h-full w-[329px] overflow-hidden border-r border-[color:var(--ac-sidebar-border)] bg-[color:var(--ac-sidebar-bg)]"
          >
            <button
              type="button"
              onClick={animateClose}
              aria-label="Collapse AI Coach"
              className="absolute left-[24px] top-[22px] flex size-[38px] cursor-pointer items-center justify-center rounded-[10.23px] bg-[color:var(--ac-panel)] text-[color:var(--ac-muted)] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ac-border-hl)]"
            >
              <ChevronLeftIcon size={12} color="currentColor" />
            </button>

            <div className="absolute left-[56px] top-[15px] flex h-[51px] w-[60px] items-center justify-center text-[color:var(--ac-accent)]">
              <AiCoachFaceIcon size={40} />
            </div>

            <h2
              id="ai-coach-title"
              className="ac-text absolute left-[116.13px] top-[27px] text-2xl font-acid font-normal leading-none text-[color:var(--ac-text)]"
            >
              AI Coach
            </h2>
            <span className="absolute left-[231.13px] top-[27.19px] inline-flex h-[24.72px] w-[47.79px] items-center justify-center rounded-[16.48px] border-[0.82px] border-[color:var(--ac-border)] text-xs font-acid font-normal leading-[18.8px] text-[color:var(--ac-accent)]">
              v2.2
            </span>

            <PrimaryPillButton
              className="ai-coach-cta !absolute left-[21px] top-[89px] !w-[276px] !pl-[22px] !pr-[31px]"
              onClick={() => setView('idea')}
            >
              <span className="flex items-center gap-2.5">
                <AiPlusIcon size={18} />
                New chat
              </span>
            </PrimaryPillButton>

            <div className="absolute left-[21px] top-[152px] h-11 w-[276px] rounded-[60px] border border-[color:var(--ac-border)]">
              <div className="absolute inset-0 rounded-[60px] bg-[color:var(--ac-panel)] opacity-50" aria-hidden="true" />
              <SearchIcon size={18} color="var(--ac-muted)" className="absolute left-[14px] top-1/2 -translate-y-1/2" />
              <span className="absolute left-[42px] top-1/2 -translate-y-1/2 text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">
                Search trades
              </span>
            </div>

            <div
              className="absolute left-[26px] top-[215px] h-[39.55px] w-[276.85px] rounded-[60px] bg-[color:var(--ac-tab-track)]"
              role="tablist"
              aria-label="AI Coach sidebar sections"
            >
              {SIDEBAR_TABS.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === i}
                  onClick={() => setActiveTab(i)}
                  style={{ left: TAB_SLOTS[i].left, width: TAB_SLOTS[i].width }}
                  className={`absolute top-[4.95px] h-[29.66px] inline-flex items-center justify-center rounded-[56px] text-xs font-acid font-normal leading-[18.8px] cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)] ${
                    activeTab === i
                      ? 'bg-[image:var(--ac-badge-gradient)] opacity-80 text-[#ffffff]'
                      : 'text-[color:var(--ac-muted)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <p className="absolute left-[26px] top-[284px] text-xs font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">
              RECENT CHATS
            </p>

            <button
              type="button"
              onClick={() => setView('chat')}
              className="absolute left-[26px] top-[306.24px] h-[52.73px] w-[276.85px] overflow-hidden rounded-[16.48px] border-[0.82px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] text-left cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
            >
              <span
                className="ac-glow pointer-events-none absolute left-[54px] -top-[98px] h-[104px] w-[160px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                aria-hidden="true"
              />
              <AiChatIcon size={13} className="absolute left-[22px] top-[20.67px] text-[color:var(--ac-accent)]" />
              <span className="ac-text absolute left-[47.79px] top-1/2 -translate-y-1/2 text-xs font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">
                Which asset should I focus on?
              </span>
            </button>

            <div className="absolute left-[20px] top-[693px] h-[139px] w-[289px] overflow-hidden rounded-[16.48px] border-[0.82px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)]">
              <div
                className="ac-glow pointer-events-none absolute left-[58.45px] -top-[82.98px] h-[104px] w-[160px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                aria-hidden="true"
              />
              <div className="absolute left-[17.78px] top-[19.79px] flex size-[32.96px] items-center justify-center rounded-[56px] bg-[image:var(--ac-badge-gradient)] opacity-80">
                <AiBulbIcon size={18} className="text-[#ffffff]" />
              </div>
              <p className="absolute left-[61px] top-[21px] text-xs font-acid font-bold uppercase leading-[15.68px] tracking-[2.32px] text-[color:var(--ac-promo-label)]">
                AI Coach
              </p>
              <p className="ac-text absolute left-[61px] top-[34px] text-base font-acid font-medium leading-[24.44px] text-[color:var(--ac-text)]">
                AI Trade Ideas
              </p>
              <p className="absolute left-[17.78px] top-[67px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-promo-body)]">
                Uses your trade history, live prices &amp;
                <br />
                market watch to generate trade ideas.
              </p>
            </div>
          </aside>

          {/* Chat panel */}
          <section className="absolute left-[329px] top-0 h-full w-[941px] overflow-hidden">
            {/* Spec stacks this blurred wash three times to deepen the falloff. */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="ac-glow pointer-events-none absolute -left-[1px] -top-[295px] h-[437.5px] w-[943.33px] bg-[color:var(--ac-blob)] blur-[150px]"
                aria-hidden="true"
              />
            ))}
            <div
              className="ac-glow pointer-events-none absolute left-[266.73px] top-[182.03px] size-[341.17px] rounded-full bg-[color:var(--ac-orb)] mix-blend-color blur-[120.48px]"
              aria-hidden="true"
            />

            <div className="absolute left-[700px] top-[23px] inline-flex h-[33px] w-[62px] items-center justify-center rounded-[60px] text-[color:var(--ac-accent)]">
              <span
                className="pointer-events-none absolute inset-0 rounded-[60px] border-[0.824px] border-[color:var(--ac-border-hl)] bg-[color:var(--ac-panel)] opacity-50"
                aria-hidden="true"
              />
              <span className="relative inline-flex items-center gap-[4.28px]">
                <AiBoltIcon size={15} />
                <span className="text-xs font-acid font-normal leading-[18.8px]">152</span>
              </span>
            </div>
            <AiCoachIconChip label="Open notebook" className="!absolute left-[772px] top-[23px]">
              <AiNotebookIcon size={14} />
            </AiCoachIconChip>
            <AiCoachIconChip label="Chat history" className="!absolute left-[822px] top-[23px]" onClick={() => setView('default')}>
              <AiHistoryIcon size={15} />
            </AiCoachIconChip>
            <AiCoachIconChip label="Close modal" className="!absolute left-[872px] top-[23px]" onClick={animateClose}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </AiCoachIconChip>

            {view === 'default' && (
              <>
                <h3 className="ac-text absolute top-[447px] left-[calc(50%-199.5px)] whitespace-nowrap text-2xl font-acid font-normal leading-none text-[color:var(--ac-text)]">
                  Ask me anything about your trades
                </h3>
                <p className="absolute top-[488px] left-[calc(50%-175.5px)] whitespace-nowrap text-base font-acid font-medium text-[color:var(--ac-muted)]">
                  I can only see your trading data - nothing else.
                </p>
                {DEFAULT_PROMPTS.map((p) => (
                  <AiCoachChip
                    key={p.label}
                    className="!absolute"
                    style={{ left: p.left, top: p.top, width: p.width }}
                    onClick={() => askPrompt(p.label)}
                  >
                    {p.label}
                  </AiCoachChip>
                ))}
              </>
            )}

            {view === 'chat' && (
              <>
                <div className="absolute left-[671px] top-[92px] flex h-[45px] w-[241px] items-center justify-center rounded-[22px] bg-[color:var(--ac-bubble)] px-4">
                  <span className="ac-text whitespace-nowrap text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">
                    Which asset should I focus on?
                  </span>
                </div>
                <div className="absolute left-[563px] top-[150px] flex h-[45px] w-[349px] items-center gap-2 rounded-[22px] bg-[color:var(--ac-bubble)] px-4">
                  <AiSparkleIcon size={16} className="text-[color:var(--ac-accent)] shrink-0" />
                  <span className="ac-text whitespace-nowrap text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">
                    Generate a trade idea for me (Asset: forex)
                  </span>
                </div>

                <div className="absolute left-[29px] top-[253px] h-[146px] w-[663px] overflow-hidden rounded-[30px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)]">
                  <div
                    className="ac-glow pointer-events-none absolute left-[177px] -top-[178px] h-[194px] w-[300px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                    aria-hidden="true"
                  />
                  <div
                    className="ac-glow pointer-events-none absolute left-[177px] -top-[178px] h-[194px] w-[300px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                    aria-hidden="true"
                  />
                  <p className="absolute left-[25px] top-[32px] w-[597px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-body)]">
                    {CHAT_ANSWER}
                  </p>
                </div>

                <div className="absolute left-[29px] top-[412.08px] h-[31.52px] w-[183.08px]">
                  <p className="absolute left-0 top-[14.92px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">
                    HELPFUL?
                  </p>
                  {FEEDBACK_ACTIONS.map(({ label, left, Icon }) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      style={{ left }}
                      className="absolute top-0 flex h-[31.52px] w-[31.52px] cursor-pointer items-center justify-center bg-[color:var(--ac-well)] text-[color:var(--ac-muted)] [outline:0.88px_solid_var(--ac-border)] [outline-offset:-0.44px] transition-opacity hover:opacity-70"
                    >
                      <Icon size={15} />
                    </button>
                  ))}
                </div>

                <p className="absolute left-[29px] top-[477px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">
                  Suggested follow ups
                </p>
                {FOLLOW_UPS.map((p) => (
                  <AiCoachChip
                    key={p.label}
                    className="!absolute"
                    style={{ left: p.left, top: 504, width: p.width }}
                    onClick={() => askPrompt(p.label)}
                  >
                    {p.label}
                  </AiCoachChip>
                ))}
              </>
            )}

            {view === 'response' && (
              <div className="absolute left-[29px] top-[67px] h-[680px] w-[663px] overflow-hidden rounded-[30px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)]">
                <div
                  className="ac-glow pointer-events-none absolute left-[252px] -top-[82.98px] h-[104px] w-[160px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                  aria-hidden="true"
                />
                <AiSparkleIcon size={15} className="absolute left-[40px] top-[32px] text-[color:var(--ac-accent)]" />
                <div className="absolute left-[34px] top-[34px] w-[599px] pl-[26px] text-sm font-acid font-normal leading-[18.8px]">
                  {RESPONSE_BLOCKS.map((block, i) => (
                    <p key={block.label ?? block.body} className={i === 0 ? '' : 'mt-[18.8px] pl-0 -ml-[26px]'}>
                      {block.label && <span className="ac-text text-[color:var(--ac-text)]">{block.label}</span>}
                      <span className="text-[color:var(--ac-muted)]">{block.body}</span>
                    </p>
                  ))}
                </div>
                <AiCoachTradeChart className="absolute left-[37px] top-[398px] h-[192px] w-[589px] overflow-hidden rounded-[15px]" />
                <PrimaryPillButton
                  className="ai-coach-cta !absolute left-[34px] top-[608px] !w-[590px] !pl-[22px] !pr-[31px]"
                  onClick={() => setView('idea')}
                >
                  <span className="text-base font-medium leading-[24.44px]">Place Sell Trade</span>
                </PrimaryPillButton>
              </div>
            )}

            {view === 'idea' && (
              <div className="absolute left-[29px] top-[67px] h-[614px] w-[663px] overflow-hidden rounded-[30px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)]">
                <div
                  className="ac-glow pointer-events-none absolute left-[180px] -top-[182px] h-[194px] w-[300px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                  aria-hidden="true"
                />
                <div
                  className="ac-glow pointer-events-none absolute left-[180px] -top-[182px] h-[194px] w-[300px] rounded-full bg-[color:var(--ac-glow)] opacity-50 mix-blend-lighten blur-[80.2px]"
                  aria-hidden="true"
                />
                <AiSparkleIcon size={15} className="absolute left-[28px] top-[31px] text-[color:var(--ac-accent)]" />
                <p className="ac-text absolute left-[50px] top-[34px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">
                  Let´s plan your trade
                </p>
                <p className="absolute left-[28px] top-[81px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">
                  Pick what you have in mind. Skip any let me decide.
                </p>

                {IDEA_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p
                      className="absolute left-[28px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]"
                      style={{ top: group.top }}
                    >
                      {group.label}
                    </p>
                    {group.options.map((option) => (
                      <AiCoachChip
                        key={option.label}
                        className={group.compact ? '!absolute !text-xs' : '!absolute'}
                        style={{ left: option.left, top: group.top + 22, width: option.width }}
                        selected={ideaChoice[group.label] === option.label}
                        onClick={() => setIdeaChoice((prev) => ({ ...prev, [group.label]: option.label }))}
                      >
                        {option.label}
                      </AiCoachChip>
                    ))}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setView('default')}
                  className="absolute left-[368px] top-[548px] h-9 w-[104px] rounded-[56px] border border-[color:var(--ac-border)] text-xs font-acid font-normal text-[color:var(--ac-quiet-text)] opacity-80 cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setView('response')}
                  className="absolute left-[477px] top-[548px] inline-flex h-9 w-[156px] items-center justify-center gap-2 rounded-[56px] bg-[image:var(--ac-badge-gradient)] text-xs font-acid font-normal text-[color:var(--ac-quiet-text)] opacity-80 cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                >
                  <AiSparkleIcon size={16} />
                  Generate idea
                </button>
              </div>
            )}

            <AiCoachPromptBar
              className="left-[29px] top-[768px] w-[871px]"
              value={prompt}
              onChange={setPrompt}
              onSubmit={submitPrompt}
              ideasOpen={ideasOpen}
              onToggleIdeas={() => setIdeasOpen((v) => !v)}
            />

            {ideasOpen && (
              <div
                className="absolute left-[529px] top-[628px] h-[148px] w-[226px] overflow-hidden rounded-[30px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)] z-20"
                role="menu"
              >
                <div
                  className="ac-glow pointer-events-none absolute -left-[20px] -top-[60px] h-[140px] w-[200px] rounded-full bg-[color:var(--ac-glow)] opacity-20 blur-[90px]"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIdeasOpen(false)
                    setView('chat')
                  }}
                  className="absolute left-0 top-[16px] flex w-full items-start gap-3 px-5 py-2 text-left cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                >
                  <AiChatIcon size={18} className="mt-0.5 shrink-0 -scale-x-100 text-[color:var(--ac-accent)]" />
                  <span>
                    <span className="ac-text block text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">Chat Mode</span>
                    <span className="block text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">Ask about your trades</span>
                  </span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIdeasOpen(false)
                    setView('idea')
                  }}
                  className="absolute left-0 top-[82px] flex w-full items-start gap-3 px-5 py-2 text-left cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                >
                  <AiSparkleIcon size={18} className="mt-0.5 shrink-0 text-[color:var(--ac-accent)]" />
                  <span>
                    <span className="ac-text block text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">AI Trade Idea</span>
                    <span className="block text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">Generate a trade idea</span>
                  </span>
                </button>
              </div>
            )}

            <p className="absolute top-[853px] left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-xs font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">
              AI can only discuss your trading data. Not financial advice.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
