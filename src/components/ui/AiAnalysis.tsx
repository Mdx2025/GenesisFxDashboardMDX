import type { CSSProperties, ReactNode } from 'react'
import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'
import './AiAnalysis.css'

/* ─── Card shell ─── */

const GLOW_POSITION = {
  'top-left': 'left-[15px] -top-[170px]',
  'top-center': 'left-1/2 -translate-x-1/2 -top-[190px]',
  bottom: 'left-[15px] -bottom-[120px]',
  none: '',
} as const

interface AnalysisCardProps {
  children: ReactNode
  /** Corner the ambient glow bleeds in from; matches the per-card Ellipse 15 of the Figma frame. */
  glow?: keyof typeof GLOW_POSITION
  className?: string
  style?: CSSProperties
}

/**
 * Opaque `container-box` surface of the AI analysis screen: green-800 fill,
 * 1.16px same-tone outline and the subtle drop shadow. `trades-table-card`
 * carries the light-theme repaint already used by the PAMM/Signals tables.
 */
export function AnalysisCard({ children, glow = 'top-left', className = '', style }: AnalysisCardProps) {
  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="18.56px"
      className={`trades-table-card overflow-hidden ${className}`}
      style={style}
    >
      {glow !== 'none' && <GlowEllipse className={GLOW_POSITION[glow]} />}
      <div className="relative z-base h-full">{children}</div>
    </GlassCard>
  )
}

/* ─── Pills ─── */

interface AssetPillProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
  className?: string
}

/** Instrument selector chip of the analysis toolbar. */
export function AssetPill({ children, selected = false, onClick, className = '' }: AssetPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`h-[38px] px-[11px] inline-flex items-center justify-center rounded-[30px] border border-gfx-neutral-250 text-base font-medium font-acid leading-none whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 ${
        selected ? 'bg-gfx-green-250 text-white' : 'bg-gfx-green-900 text-white hover:bg-gfx-green-250/40'
      } ${className}`}
    >
      {children}
    </button>
  )
}

type SignalTone = 'success' | 'danger' | 'neutral'

interface SignalPillProps {
  children: ReactNode
  tone?: SignalTone
  /** `wide` matches the 10px side padding the KEY LEVELS chips use. */
  wide?: boolean
  className?: string
}

const SIGNAL_TONE_CLASS: Record<SignalTone, string> = {
  success: 'ai-signal-pill--success',
  danger: 'ai-signal-pill--danger',
  neutral: '',
}

/** BUY / SELL / NEUTRAL verdict chip, also used for the key-level values. */
export function SignalPill({ children, tone = 'neutral', wide = false, className = '' }: SignalPillProps) {
  return (
    <span
      className={`ai-signal-pill ${SIGNAL_TONE_CLASS[tone]} h-[26px] ${wide ? 'px-2.5' : 'px-2'} inline-flex items-center justify-center rounded-xl text-base font-medium font-acid leading-none whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  )
}

interface AiGradientPillProps {
  children: ReactNode
  className?: string
}

/** Purple AI accent chip: the `AI` marker next to the page title and the credit counter. */
export function AiGradientPill({ children, className = '' }: AiGradientPillProps) {
  return (
    <span
      className={`ai-gradient-pill inline-flex items-center gap-2.5 rounded-[60px] p-3.5 text-base font-medium font-acid leading-none whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  )
}

/* ─── Metric card ─── */

interface AnalysisMetricCardProps {
  label: string
  value: string
  caption: string
  valueClassName?: string
  className?: string
}

/** 241x136 indicator tile (RSI, volatility) of the right-hand rail. */
export function AnalysisMetricCard({ label, value, caption, valueClassName = 'text-white', className = '' }: AnalysisMetricCardProps) {
  return (
    <AnalysisCard glow="bottom" className={className}>
      <div className="flex h-full min-h-[136px] flex-col justify-center gap-1 px-[27px]">
        <p className="text-gfx-neutral-400 text-body1 font-acid leading-[18.8px]">{label}</p>
        <p className={`${valueClassName} text-4xl font-acid leading-none`}>{value}</p>
        <p className="text-gfx-neutral-400 text-body1 font-acid leading-[18.8px]">{caption}</p>
      </div>
    </AnalysisCard>
  )
}

/* ─── Range meter ─── */

interface RangeMeterProps {
  label: string
  caption: string
  low: string
  high: string
  /** Filled portion of the track, 0-100. */
  percent: number
  className?: string
}

/** Recent-range progress track with the lighten-blended glow of the Figma bar. */
export function RangeMeter({ label, caption, low, high, percent, className = '' }: RangeMeterProps) {
  const width = `${Math.min(100, Math.max(0, percent))}%`
  return (
    <AnalysisCard glow="none" className={className}>
      <div className="flex h-full min-h-[149px] flex-col justify-center gap-[18px] px-[30px]">
        <div className="flex items-center justify-between text-gfx-neutral-400 text-body1 font-acid leading-[18.8px]">
          <span>{label}</span>
          <span>{caption}</span>
        </div>
        <div className="relative h-2 w-full rounded-[18px] bg-gfx-green-900">
          <div
            className="absolute inset-y-0 left-0 rounded-l-[18px] bg-[linear-gradient(-86.78deg,var(--color-gfx-green-300)_5.5%,#004d3c_79.7%)]"
            style={{ width }}
          />
          <div
            className="theme-decorative-glow absolute inset-y-0 left-0 rounded-l-[18px] bg-[linear-gradient(-86.78deg,var(--color-gfx-green-300)_5.5%,#004d3c_79.7%)] blur-[2.2px] mix-blend-lighten"
            style={{ width }}
            aria-hidden="true"
          />
        </div>
        <div className="flex items-center justify-between text-white text-body1 font-acid leading-[18.8px]">
          <span>{low}</span>
          <span>{high}</span>
        </div>
      </div>
    </AnalysisCard>
  )
}

/* ─── Sentiment gauge ─── */

interface SentimentGaugeProps {
  /** 0 = fully bearish (left), 100 = fully bullish (right). */
  value: number
  verdict: string
  verdictClassName?: string
  buy: string
  neutral: string
  sell: string
  className?: string
}

const GAUGE_ARC =
  'M204.057 105.477C207.756 105.477 210.777 102.476 210.542 98.7839C209.807 87.222 207.171 75.8444 202.726 65.1129C197.425 52.3158 189.656 40.6881 179.861 30.8936C170.067 21.0991 158.439 13.3297 145.642 8.02898C132.845 2.72825 119.129 0 105.278 0C91.426 0 77.7102 2.72825 64.9131 8.02898C52.116 13.3297 40.4883 21.0991 30.6938 30.8936C20.8993 40.6881 13.1299 52.3158 7.82921 65.1129C3.38407 75.8444 0.747985 87.222 0.0128171 98.7839C-0.221918 102.476 2.79894 105.477 6.49804 105.477C10.1971 105.477 13.1705 102.475 13.4393 98.7853C14.1535 88.9839 16.4333 79.3451 20.2051 70.2392C24.8327 59.0673 31.6154 48.9163 40.1659 40.3657C48.7165 31.8151 58.8675 25.0325 70.0394 20.4049C81.2113 15.7774 93.1852 13.3956 105.278 13.3956C117.37 13.3956 129.344 15.7774 140.516 20.4049C151.688 25.0325 161.839 31.8151 170.389 40.3657C178.94 48.9163 185.722 59.0673 190.35 70.2392C194.122 79.3451 196.402 88.9839 197.116 98.7853C197.385 102.475 200.358 105.477 204.057 105.477Z'

/** Half-donut buy/sell meter with the white needle of the market watch header. */
export function SentimentGauge({ value, verdict, verdictClassName = 'text-gfx-red-muted', buy, neutral, sell, className = '' }: SentimentGaugeProps) {
  // The needle sweeps the 180deg the arc covers, so each point of value is 1.8deg.
  const angle = (Math.min(100, Math.max(0, value)) - 50) * 1.8

  return (
    <div className={`w-[219px] shrink-0 ${className}`}>
      <div className="relative mx-auto h-[105.5px] w-[211px]">
        <svg width="211" height="105.5" viewBox="0 0 210.555 105.477" fill="none" aria-hidden="true">
          <path d={GAUGE_ARC} fill="url(#ai-gauge-sweep)" />
          <defs>
            <linearGradient id="ai-gauge-sweep" x1="0" y1="0" x2="210.555" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EE4741" />
              <stop offset="0.366" stopColor="#EC7F23" />
              <stop offset="0.601" stopColor="#DCB40E" />
              <stop offset="1" stopColor="#28C45B" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="ai-gauge-needle absolute bottom-0 left-1/2 h-[83px] w-[1.9px] origin-bottom rounded-full"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
          aria-hidden="true"
        />
        <span className="ai-gauge-needle absolute -bottom-[3.8px] left-1/2 size-[7.63px] -translate-x-1/2 rounded-full" aria-hidden="true" />
      </div>
      <p className={`mt-2 text-center text-base font-medium font-acid leading-none ${verdictClassName}`} role="status">
        {verdict}
      </p>
      <div className="mt-[19px] flex items-center justify-between text-body1 font-acid leading-[18.8px]">
        <span className="text-gfx-bullish-light">{buy}</span>
        <span className="text-gfx-neutral-400">{neutral}</span>
        <span className="text-gfx-red-muted">{sell}</span>
      </div>
    </div>
  )
}

/* ─── Quote sparkline ─── */

const SPARK_AREA =
  'M28.232 20.0116L68.1499 50.3218C68.8441 50.8489 69.6919 51.1343 70.5635 51.1343L85.0627 51.1343C86.2712 51.1343 87.4147 51.6819 88.1723 52.6235L118.461 90.2679C120.056 92.2511 123.076 92.254 124.675 90.2738L147.077 62.5382C148.429 60.8637 150.866 60.5633 152.585 61.8593L162.802 69.5634C164.502 70.8454 166.909 70.5669 168.272 68.9305L218.609 8.47682C220.998 5.60754 225.668 7.29697 225.668 11.0307V111.259C225.668 113.463 223.881 115.25 221.676 115.25H7.68534C5.48107 115.25 3.69416 113.463 3.69416 111.259V84.9028C3.69416 84.5219 3.74868 84.1431 3.85605 83.7776L21.9891 22.0651C22.7771 19.3835 26.0061 18.3214 28.232 20.0116Z'

const SPARK_LINE =
  'M3.69487 84.3306L21.9898 22.0672C22.7778 19.3856 26.0068 18.3235 28.2327 20.0137L68.1506 50.3238C68.8449 50.851 69.6926 51.1363 70.5642 51.1363L85.0634 51.1363C86.2719 51.1363 87.4154 51.6839 88.173 52.6256L118.461 90.27C120.057 92.2532 123.076 92.2561 124.676 90.2758L147.078 62.5403C148.43 60.8658 150.867 60.5654 152.586 61.8613L162.803 69.5655C164.503 70.8475 166.91 70.569 168.273 68.9326L218.637 8.44691C219.954 6.86489 222.258 6.54433 223.957 7.70675L225.336 8.64963'

/** Compact price silhouette shown beside the quote of the market watch header. */
export function QuoteSparkline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 229.37 118.759"
      className={className}
      fill="none"
      role="img"
      aria-label="Recent price action"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ai-spark-fill" x1="0" y1="0" x2="0" y2="115.25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D46356" stopOpacity="0.2" />
          <stop offset="0.8" stopColor="#D46356" stopOpacity="0.02" />
        </linearGradient>
        <filter id="ai-spark-blur" x="0" y="3.33" width="229.37" height="115.43" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.75453" />
        </filter>
      </defs>
      <path d={SPARK_AREA} fill="url(#ai-spark-fill)" />
      <path d={SPARK_LINE} stroke="#7F3B34" strokeWidth="0.386" strokeLinejoin="round" filter="url(#ai-spark-blur)" />
      <path d={SPARK_LINE} stroke="#D46356" strokeWidth="0.386" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Icons ─── */

/** Magnifier of the Analyze button. */
export function AnalyzeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M15.7508 15.7469L12.4883 12.4844" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** Stepped upward trend glyph of the intraday change badge. */
export function TrendUpIcon({ size = 21.5 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 12.5) / 21.5} viewBox="0 0 21.5 12.5" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4179 0.75C14.4179 0.335786 14.7536 0 15.1679 0H20.75C21.1642 0 21.5 0.335786 21.5 0.75V6.29583C21.5 6.71005 21.1642 7.04583 20.75 7.04583C20.3358 7.04583 20 6.71005 20 6.29583V2.55286L13.8642 8.65129C13.3952 9.11744 12.991 9.51923 12.6239 9.79771C12.2304 10.0962 11.7932 10.322 11.255 10.322C10.7168 10.3219 10.2797 10.096 9.88624 9.7974C9.51923 9.51884 9.11512 9.11697 8.64629 8.65072L8.37203 8.37801C7.85787 7.86675 7.52452 7.53751 7.24695 7.32686C6.98672 7.12937 6.86506 7.10734 6.78449 7.10737C6.70393 7.1074 6.58228 7.12952 6.32219 7.3272C6.04478 7.53805 5.71167 7.86753 5.19789 8.37917L1.27922 12.2814C0.985711 12.5737 0.510838 12.5727 0.218559 12.2792C-0.0737192 11.9857 -0.0727238 11.5108 0.220783 11.2186L4.17433 7.28155C4.64326 6.81453 5.04742 6.41202 5.41452 6.133C5.80802 5.83391 6.24535 5.60756 6.78395 5.60737C7.32254 5.60717 7.76003 5.8332 8.15375 6.13199C8.52105 6.41074 8.9255 6.81296 9.39477 7.27963L9.66903 7.55235C10.1827 8.06316 10.5158 8.39209 10.7931 8.60257C11.0531 8.79989 11.1747 8.82197 11.2552 8.82198C11.3357 8.82199 11.4573 8.79994 11.7173 8.60268C11.9947 8.39226 12.3278 8.06341 12.8416 7.55272L18.9315 1.5H15.1679C14.7536 1.5 14.4179 1.16421 14.4179 0.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Lightning bolt of the AI credit counter. */
export function AiCreditBoltIcon({ size = 13.22 }: { size?: number }) {
  return (
    <svg width={(size * 10.75) / 13.22} height={size} viewBox="0 0 10.75 13.22" fill="none" aria-hidden="true">
      <path d="M6.72 0L0 7.55h3.6l-.34 5.67L10.75 5.6H6.4L6.72 0Z" fill="currentColor" />
    </svg>
  )
}
