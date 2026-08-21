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
  AiFullscreenIcon,
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
const SIDEBAR_W = 329
const CHAT_W = 941

type CoachView = 'default' | 'chat' | 'response' | 'idea'

const SIDEBAR_TABS = ['Chats', 'Trades', 'Strategies'] as const

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

const IDEA_GROUPS = [
  {
    label: 'ASSET CLASS',
    top: 135,
    options: [
      { label: 'Forex', left: 28, width: 68 },
      { label: 'Metals', left: 106, width: 74 },
      { label: 'Indices', left: 190, width: 73 },
      { label: 'Any', left: 273, width: 50 },
    ],
  },
  {
    label: 'DIRECTION BIAS',
    top: 223,
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
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    function measure() {
      setScale(Math.min(1, (window.innerWidth * 0.95) / CARD_W, (window.innerHeight * 0.95) / CARD_H))
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
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (ideasOpen) {
          setIdeasOpen(false)
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
  }, [mounted, ideasOpen, animateClose])

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
          className="ai-coach-surface relative overflow-hidden rounded-[24px]"
          style={{
            width: CARD_W,
            height: CARD_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            background: 'var(--ac-bg)',
            border: '1px solid var(--ac-border)',
            boxShadow: '0 24px 72px rgba(0, 0, 0, 0.45)',
          }}
        >
          <div
            className="ac-glow absolute -left-[80px] -top-[120px] h-[420px] w-[520px] rounded-full pointer-events-none"
            style={{ background: 'var(--ac-glow)', opacity: 0.16, filter: 'blur(140px)' }}
            aria-hidden="true"
          />
          <div
            className="ac-glow absolute right-[60px] bottom-[-160px] h-[380px] w-[560px] rounded-full pointer-events-none"
            style={{ background: 'var(--ac-badge-start)', opacity: 0.14, filter: 'blur(150px)' }}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <aside
            className="absolute left-0 top-0 h-full overflow-hidden border-r border-[color:var(--ac-sidebar-border)]"
            style={{ width: SIDEBAR_W, background: 'var(--ac-sidebar-bg)' }}
          >
            <div className="absolute left-[24px] top-[22px] flex size-[38px] items-center justify-center rounded-[10.227px] bg-[color:var(--ac-panel)] text-[color:var(--ac-accent)]">
              <AiCoachFaceIcon size={22} />
            </div>
            <button
              type="button"
              onClick={animateClose}
              aria-label="Collapse AI Coach"
              className="absolute left-[288px] top-[30px] cursor-pointer text-[color:var(--ac-muted)] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ac-border-hl)]"
            >
              <ChevronLeftIcon size={16} color="currentColor" />
            </button>

            <div className="absolute left-[74px] top-[24px] flex items-baseline gap-2">
              <h2 id="ai-coach-title" className="ac-text text-2xl font-acid font-normal leading-none text-[color:var(--ac-text)]">
                AI Coach
              </h2>
              <span className="text-xs font-acid font-normal text-[color:var(--ac-accent)]">v2.2</span>
            </div>

            <PrimaryPillButton
              className="ai-coach-cta !absolute left-[26px] top-[89px] !w-[276px] !pl-[22px] !pr-[31px]"
              onClick={() => setView('idea')}
            >
              <span className="flex items-center gap-2.5">
                <AiPlusIcon size={18} />
                Trade
              </span>
            </PrimaryPillButton>

            <div className="absolute left-[26px] top-[152px] flex h-11 w-[276px] items-center gap-3 rounded-full border border-[color:var(--ac-sidebar-border)] px-[9px]">
              <SearchIcon size={18} color="var(--ac-muted)" />
              <span className="text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">Search trades</span>
            </div>

            <div className="absolute left-[26px] top-[214px] flex w-[276px] items-center gap-6">
              {SIDEBAR_TABS.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`text-xs font-acid font-normal cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)] ${
                    activeTab === i ? 'ac-text text-[color:var(--ac-text)]' : 'text-[color:var(--ac-muted)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <p className="absolute left-[26px] top-[268px] text-xs font-acid font-normal text-[color:var(--ac-muted)]">RECENT CHATS</p>

            <button
              type="button"
              onClick={() => setView('chat')}
              className="absolute left-[26px] top-[306px] flex h-[52.733px] w-[276.85px] items-center rounded-[14px] border border-[color:var(--ac-sidebar-border)] bg-[color:var(--ac-well)] px-4 text-left cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
            >
              <span className="ac-text text-xs font-acid font-normal text-[color:var(--ac-text)]">Which asset should I focus on?</span>
            </button>

            <div className="absolute left-[20px] top-[693px] h-[139px] w-[289px] overflow-hidden rounded-[18px] border border-[color:var(--ac-sidebar-border)] bg-[color:var(--ac-well)]">
              <div className="absolute left-[25px] top-[27px] text-[color:var(--ac-accent)]">
                <AiBulbIcon size={18} />
              </div>
              <p
                className="absolute left-[53px] top-[27px] text-xs font-acid font-bold uppercase text-[color:var(--ac-promo-label)]"
                style={{ letterSpacing: '2.3233533px', lineHeight: '15.682634px' }}
              >
                AI Coach
              </p>
              <p className="ac-text absolute left-[25px] top-[57px] text-base font-acid font-medium text-[color:var(--ac-text)]">AI Trade Ideas</p>
              <p className="absolute left-[25px] top-[85px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-promo-body)]">
                Uses your trade history, live prices &amp;
                <br />
                market watch to generate trade ideas.
              </p>
            </div>
          </aside>

          {/* Chat panel */}
          <section className="absolute top-0 h-full" style={{ left: SIDEBAR_W, width: CHAT_W }}>
            <div className="absolute left-[650px] top-[23px] inline-flex h-[33px] w-[62px] items-center justify-center gap-1.5 rounded-[60px] border-[0.824px] border-[color:var(--ac-border-hl)] bg-[color:var(--ac-panel)] opacity-50 text-[color:var(--ac-accent)]">
              <AiBoltIcon size={15} />
              <span className="text-xs font-acid font-normal">152</span>
            </div>
            <AiCoachIconChip label="Open notebook" className="!absolute left-[722px] top-[23px]">
              <AiNotebookIcon size={14} />
            </AiCoachIconChip>
            <AiCoachIconChip label="Toggle fullscreen" className="!absolute left-[772px] top-[23px]">
              <AiFullscreenIcon size={15} />
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
                <h3
                  className="ac-text absolute top-[447px] whitespace-nowrap text-2xl font-acid font-normal leading-none text-[color:var(--ac-text)]"
                  style={{ left: 'calc(50% - 199.5px)' }}
                >
                  Ask me anything about your trades
                </h3>
                <p
                  className="absolute top-[488px] whitespace-nowrap text-base font-acid font-medium text-[color:var(--ac-muted)]"
                  style={{ left: 'calc(50% - 175.5px)' }}
                >
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

                <p className="absolute left-[29px] top-[427px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">
                  HELPFUL?
                </p>
                <div className="absolute left-[101px] top-[412px] flex items-center gap-[21px] text-[color:var(--ac-accent)]">
                  <button type="button" aria-label="Helpful" className="cursor-pointer transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]">
                    <AiThumbUpIcon size={18} />
                  </button>
                  <button type="button" aria-label="Not helpful" className="cursor-pointer transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]">
                    <AiThumbDownIcon size={18} />
                  </button>
                  <button type="button" aria-label="Copy answer" className="cursor-pointer transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]">
                    <AiCopyIcon size={18} />
                  </button>
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
                  className="ac-glow absolute -left-[40px] -top-[110px] h-[220px] w-[320px] rounded-full pointer-events-none"
                  style={{ background: 'var(--ac-glow)', opacity: 0.2, filter: 'blur(110px)' }}
                  aria-hidden="true"
                />
                <AiSparkleIcon size={16} className="absolute left-[33.18px] top-[33.18px] text-[color:var(--ac-accent)]" />
                <div className="absolute left-[33.18px] top-[33.18px] w-[599px] pl-[26px] text-sm font-acid font-normal leading-[18.8px]">
                  {RESPONSE_BLOCKS.map((block, i) => (
                    <p key={block.label ?? block.body} className={i === 0 ? '' : 'mt-[18.8px] pl-0 -ml-[26px]'}>
                      {block.label && <span className="ac-text text-[color:var(--ac-text)]">{block.label}</span>}
                      <span className="text-[color:var(--ac-muted)]">{block.body}</span>
                    </p>
                  ))}
                </div>
                <AiCoachTradeChart className="absolute left-[37px] top-[397.18px] h-[192px] w-[589px]" />
                <PrimaryPillButton
                  className="ai-coach-cta !absolute left-[36.5px] top-[607.18px] !w-[590px] !pl-[22px] !pr-[31px]"
                  onClick={() => setView('idea')}
                >
                  <span className="flex items-center gap-2.5">
                    <AiPlusIcon size={18} />
                    Trade
                  </span>
                </PrimaryPillButton>
              </div>
            )}

            {view === 'idea' && (
              <div className="absolute left-[29px] top-[67px] h-[614px] w-[663px] overflow-hidden rounded-[30px] border-[0.824px] border-[color:var(--ac-border)] bg-[color:var(--ac-bg)]">
                <div
                  className="ac-glow absolute left-[179px] -top-[183px] h-[194px] w-[300px] rounded-full pointer-events-none"
                  style={{ background: 'var(--ac-glow)', opacity: 0.22, filter: 'blur(120px)' }}
                  aria-hidden="true"
                />
                <AiSparkleIcon size={16} className="absolute left-[28px] top-[33px] text-[color:var(--ac-accent)]" />
                <p className="ac-text absolute left-[49.18px] top-[33.18px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)]">
                  Let´s plan your trade
                </p>
                <p className="absolute left-[27.18px] top-[80.18px] text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-muted)]">
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
                        className="!absolute"
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
                  style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(215,96,255,1) 0%, rgba(152,119,226,1) 76.923%)',
                  }}
                  className="absolute left-[477px] top-[548px] inline-flex h-9 w-[156px] items-center justify-center gap-2 rounded-[56px] text-xs font-acid font-normal text-[color:var(--ac-quiet-text)] opacity-80 cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
                >
                  <AiSparkleIcon size={16} />
                  Generate idea
                </button>
              </div>
            )}

            <AiCoachPromptBar
              className="left-[29px] top-[768px] w-[883px]"
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
                  className="ac-glow absolute -left-[20px] -top-[60px] h-[140px] w-[200px] rounded-full pointer-events-none"
                  style={{ background: 'var(--ac-glow)', opacity: 0.2, filter: 'blur(90px)' }}
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

            <p className="absolute bottom-[38px] left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-xs font-acid font-normal text-[color:var(--ac-muted)]">
              AI can only discuss your trading data. Not financial advice.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
