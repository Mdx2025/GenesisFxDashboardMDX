import type { CSSProperties, ReactNode } from 'react'
import { AiChatIcon, AiMicIcon, AiSendIcon, AiSparkleIcon, ChevronDownIcon } from '../icons'

interface AiCoachChipProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
  className?: string
  style?: CSSProperties
}

/** Suggestion / filter pill used across every AI Coach state. */
export function AiCoachChip({ children, selected = false, onClick, className = '', style }: AiCoachChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={style}
      className={`h-[38px] px-[18px] inline-flex items-center justify-center whitespace-nowrap text-sm font-acid font-normal leading-[18.8px] cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)] ${
        selected
          ? 'rounded-[56px] bg-[image:var(--ac-badge-gradient)] opacity-80 text-[#ffffff]'
          : 'rounded-[36px] bg-[color:var(--ac-well)] border border-[color:var(--ac-border)] text-[color:var(--ac-accent)]'
      } ${className}`}
    >
      {children}
    </button>
  )
}

interface AiCoachIconChipProps {
  children: ReactNode
  label: string
  onClick?: () => void
  width?: number
  className?: string
  style?: CSSProperties
}

/** Translucent 33px-tall chip that hosts a single control in the chat header. */
export function AiCoachIconChip({ children, label, onClick, width = 40, className = '', style }: AiCoachIconChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{ width, ...style }}
      className={`h-[33px] inline-flex items-center justify-center gap-1.5 rounded-[200px] bg-[color:var(--ac-well)] border-[0.876px] border-[color:var(--ac-border)] opacity-50 text-[color:var(--ac-accent)] cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)] ${className}`}
    >
      {children}
    </button>
  )
}

interface AiCoachPromptBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onToggleIdeas: () => void
  ideasOpen: boolean
  inputId?: string
  className?: string
  style?: CSSProperties
}

/** Composer of the AI Coach chat: prompt field, mode picker, send and mic. */
export function AiCoachPromptBar({
  value,
  onChange,
  onSubmit,
  onToggleIdeas,
  ideasOpen,
  inputId = 'ai-coach-prompt',
  className = '',
  style,
}: AiCoachPromptBarProps) {
  return (
    <div className={`absolute h-[64px] ${className}`} style={style}>
      <div className="absolute left-0 top-0 h-[64px] w-[726px]">
        <div
          className="absolute inset-0 rounded-[60px] border border-[color:var(--ac-border-hl)] bg-[color:var(--ac-panel)] opacity-50 shadow-[inset_0_-2px_13.9px_-5px_var(--ac-glow),inset_0_-1px_23.9px_-16px_var(--ac-accent)] pointer-events-none"
          aria-hidden="true"
        />
        <AiSparkleIcon size={16} className="absolute left-[24px] top-1/2 -translate-y-1/2 text-[color:var(--ac-text)]" />
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit()
          }}
          placeholder="Type here..."
          aria-label="Ask the AI Coach"
          className="absolute left-[56px] top-0 h-[64px] w-[560px] bg-transparent outline-none focus-visible:!outline-none text-sm font-acid font-normal leading-[18.8px] text-[color:var(--ac-text)] placeholder:text-[color:var(--ac-muted)]"
        />
        <button
          type="button"
          onClick={onToggleIdeas}
          aria-expanded={ideasOpen}
          aria-haspopup="menu"
          className="absolute left-[625px] top-1/2 -translate-y-1/2 inline-flex items-center gap-[9px] cursor-pointer text-[color:var(--ac-muted)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)] rounded-full"
        >
          <AiChatIcon size={18} />
          <span className="text-sm font-acid font-normal leading-[18.8px]">Ideas</span>
          <ChevronDownIcon size={20} color="currentColor" />
        </button>
      </div>

      <button
        type="button"
        aria-label="Voice input"
        className="absolute left-[734px] top-0 size-[64px] rounded-[60px] cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
      >
        <span
          className="absolute inset-0 rounded-[60px] border border-[color:var(--ac-border-hl)] bg-[color:var(--ac-panel)] opacity-50 shadow-[inset_0_-2px_13.9px_-5px_var(--ac-glow),inset_0_-1px_23.9px_-16px_var(--ac-accent)]"
          aria-hidden="true"
        />
        <AiMicIcon size={24} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[color:var(--ac-muted)]" />
      </button>

      <button
        type="button"
        onClick={onSubmit}
        aria-label="Send message"
        className="absolute left-[807px] top-[4px] h-[60px] w-[64px] rounded-[300px] cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ac-border-hl)]"
      >
        <span
          className="ac-glow absolute inset-0 rounded-[300px] bg-[linear-gradient(90deg,#fff_0%,#b392fb_100%)] opacity-50 blur-[10.55px]"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-[300px] bg-[linear-gradient(90deg,#fff_0%,var(--ac-accent)_100%)] blur-[4.65px]"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-[300px] bg-[linear-gradient(90deg,#fff_0%,var(--ac-accent)_100%)]"
          aria-hidden="true"
        />
        <AiSendIcon size={18} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black" />
      </button>
    </div>
  )
}

const IDEA_SERIES = [
  2318, 2322, 2319, 2327, 2331, 2326, 2334, 2329, 2338, 2333, 2341, 2336, 2344,
  2339, 2347, 2342, 2336, 2330, 2335, 2328, 2333, 2326, 2331, 2324, 2329,
]

interface AiCoachTradeChartProps {
  data?: number[]
  entry?: number
  stop?: number
  target?: number
  className?: string
  style?: CSSProperties
}

/** Compact price panel that illustrates a generated trade idea. */
export function AiCoachTradeChart({
  data = IDEA_SERIES,
  entry = 2336,
  stop = 2342,
  target = 2320,
  className = '',
  style,
}: AiCoachTradeChartProps) {
  const w = 589
  const h = 192
  const max = Math.max(...data, stop)
  const min = Math.min(...data, target)
  const range = max - min || 1
  const y = (v: number) => h - ((v - min) / range) * (h - 24) - 12
  const step = w / (data.length - 1)
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(' ')

  return (
    <div className={`overflow-hidden rounded-[15px] bg-[color:var(--ac-well)] ${className}`} style={style}>
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label="Trade idea price levels">
        <defs>
          <linearGradient id="ai-coach-trade-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ac-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--ac-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y={y(stop)} width={w} height={Math.max(1, y(entry) - y(stop))} fill="var(--ac-glow)" opacity="0.12" />
        <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#ai-coach-trade-fill)" />
        <path d={line} fill="none" stroke="var(--ac-accent)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {[
          { value: stop, label: 'SL' },
          { value: entry, label: 'Entry' },
          { value: target, label: 'TP' },
        ].map((level) => (
          <g key={level.label}>
            <line x1="0" y1={y(level.value)} x2={w} y2={y(level.value)} stroke="var(--ac-border-hl)" strokeWidth="1" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
            <text x="8" y={y(level.value) - 5} fill="var(--ac-muted)" fontSize="10" fontFamily="inherit">
              {level.label} {level.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
