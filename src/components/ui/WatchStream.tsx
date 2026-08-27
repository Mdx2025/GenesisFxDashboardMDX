import type { ReactNode } from 'react'
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  ChartBarsIcon,
  ChartCandleIcon,
  ChartLineIcon,
  CornerFrameIcon,
  CursorIcon,
  DotsVerticalSmallIcon,
  FollowPersonIcon,
  GiftIcon,
  HeartFilledIcon,
  PlayCircleIcon,
  PlayTriangleIcon,
  QuestionCircleIcon,
  SendPlaneIcon,
  SpeakerMutedIcon,
  ViewersEyeIcon,
} from '@/components/icons'
import { GlowEllipse } from './GlowEllipse'

export const WATCH_TIMEFRAMES = ['1m', '5m', '15m', '30m', '1h', '4h', '1D'] as const
export type WatchTimeframe = (typeof WATCH_TIMEFRAMES)[number]

export const WATCH_CHART_TYPES = ['bars', 'line', 'candles'] as const
export type WatchChartType = (typeof WATCH_CHART_TYPES)[number]

// Figma lays the toolbar out on an absolute 660px canvas with irregular label
// spacing, so the row keeps those exact centers and scrolls instead of reflowing.
const TIMEFRAME_CENTER: Record<WatchTimeframe, number> = {
  '1m': 125,
  '5m': 166,
  '15m': 228.5,
  '30m': 291,
  '1h': 340,
  '4h': 376.5,
  '1D': 416,
}

const CHART_TYPE_CENTER: Record<WatchChartType, number> = {
  bars: 466.6,
  line: 515.3,
  candles: 565.2,
}

function ToolbarDivider({ left }: { left: number }) {
  return <span className="absolute top-1/2 h-[29px] w-px -translate-y-1/2 bg-gfx-neutral-250" style={{ left }} aria-hidden="true" />
}

export function ChartToolbar({
  symbol = 'EURUSD',
  timeframe = '15m',
  onTimeframeChange,
  chartType = 'bars',
  onChartTypeChange,
  live = true,
}: {
  symbol?: string
  timeframe?: WatchTimeframe
  onTimeframeChange?: (value: WatchTimeframe) => void
  chartType?: WatchChartType
  onChartTypeChange?: (value: WatchChartType) => void
  live?: boolean
}) {
  const chartIcons: Record<WatchChartType, ReactNode> = {
    bars: <ChartBarsIcon color={chartType === 'bars' ? '#00B38C' : '#808080'} />,
    line: <ChartLineIcon color={chartType === 'line' ? '#00B38C' : '#808080'} />,
    candles: <ChartCandleIcon color={chartType === 'candles' ? '#00B38C' : '#808080'} />,
  }

  return (
    <div className="h-[46px] w-full overflow-x-auto rounded-[60px] bg-white/5" data-chart-toolbar>
      <div className="relative h-full w-[660px]">
        <span className="absolute top-1/2 left-[5px] inline-flex h-[38px] -translate-y-1/2 items-center rounded-[30px] bg-gfx-neutral-250 px-[13px] text-base leading-[24.44px] font-medium text-white">
          {symbol}
        </span>

        <ToolbarDivider left={104.5} />

        {WATCH_TIMEFRAMES.map((value) => {
          const active = value === timeframe
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => onTimeframeChange?.(value)}
              className={`absolute top-1/2 flex h-[38px] w-[55px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[30px] text-base leading-[24.44px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 ${
                active ? 'bg-gfx-green-900 text-gfx-green-300 opacity-50' : 'text-gfx-neutral-400 hover:text-white'
              }`}
              style={{ left: TIMEFRAME_CENTER[value] }}
            >
              {value}
            </button>
          )
        })}

        <ToolbarDivider left={436} />

        {WATCH_CHART_TYPES.map((value) => {
          const active = value === chartType
          return (
            <button
              key={value}
              type="button"
              aria-label={`${value} chart`}
              aria-pressed={active}
              onClick={() => onChartTypeChange?.(value)}
              className={`absolute top-1/2 grid h-[41px] w-[55px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[30px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 ${
                active ? 'bg-gfx-green-900' : ''
              }`}
              style={{ left: CHART_TYPE_CENTER[value] }}
            >
              {chartIcons[value]}
            </button>
          )
        })}

        {live && (
          <>
            <span className="absolute top-1/2 left-[592px] size-[7px] -translate-y-1/2 rounded-full bg-gfx-green-300" aria-hidden="true" />
            <span className="absolute top-1/2 left-[605px] -translate-y-1/2 text-base leading-[24.44px] font-medium text-gfx-green-300">Live</span>
          </>
        )}
      </div>
    </div>
  )
}

function PipGrip() {
  return (
    <span className="absolute left-[17px] top-[19px] grid h-[8px] w-[5px] grid-cols-2 gap-x-[1px] gap-y-[1px]" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <i key={i} className="size-[2px] bg-gfx-neutral-400" />
      ))}
    </span>
  )
}

export function BroadcasterPip({
  label = 'Broadcaster',
  elapsed = '0:19',
  duration = '0:50',
  className = '',
}: {
  label?: string
  elapsed?: string
  duration?: string
  className?: string
}) {
  return (
    <div
      className={`h-[251px] w-[385px] origin-bottom-right overflow-hidden rounded-[12px] bg-black ${className}`}
      // The pip is a fixed-size Figma overlay; scaling it against the chart's
      // container width keeps it proportional instead of overflowing on mobile.
      style={{ scale: 'calc(100cqw / 1548px)' }}
      data-broadcaster-pip
    >
      <div className="absolute inset-x-0 top-0 h-[44px] bg-gfx-green-900" aria-hidden="true" />

      <PipGrip />
      <span className="absolute left-[27px] top-[23px] -translate-y-1/2 text-sm leading-[18.8px] text-gfx-neutral-400">{label}</span>
      <span className="absolute left-[279px] top-[18px] size-[8px] rounded-full bg-gfx-green-300" aria-hidden="true" />
      <span className="absolute left-[291px] top-[22px] -translate-y-1/2 text-sm leading-[18.8px] text-gfx-bullish-light">LIVE</span>
      <span className="absolute left-[338px] top-[23px] h-px w-[7px] bg-[#A0A0A0]" aria-hidden="true" />
      <ArrowUpRightIcon className="absolute left-[364px] top-[14px] text-gfx-neutral-400" />
      <ArrowDownLeftIcon className="absolute left-[357px] top-[20.02px] text-gfx-neutral-400" />

      <div className="absolute left-[calc(50%-0.5px)] top-[200px] h-[32px] w-[364px] -translate-x-1/2 overflow-hidden rounded-[18.627px] bg-gfx-surface-raised">
        <PlayTriangleIcon className="absolute left-[4.4%] top-[calc(50%-0.46px)] -translate-y-1/2 text-white" />
        <span className="absolute left-[75px] top-[calc(50%-5px)] -translate-x-1/2 text-base leading-[24.44px] font-medium whitespace-nowrap text-white">
          {elapsed} / {duration}
        </span>
        <SpeakerMutedIcon className="absolute left-[285px] top-[10px] text-white" />
        <CornerFrameIcon className="absolute left-[315.4px] top-[10px] text-white" />
        <DotsVerticalSmallIcon className="absolute left-[345.54px] top-[10px] text-white" />
      </div>
    </div>
  )
}

const AXIS_TICKS: Array<[string, number]> = [
  ['28', 8.79],
  ['Jul', 20.67],
  ['3', 32.82],
  ['7', 44.12],
  ['9', 55.3],
  ['12', 66.6],
  ['16', 78.23],
  ['26', 89.92],
]

export function StreamChartPanel({ src = '/images/streaming-chart.png', alt = 'EURUSD trading chart', children }: { src?: string; alt?: string; children?: ReactNode }) {
  return (
    <div
      className="@container surface-raised relative aspect-[1548/671] w-full overflow-hidden rounded-[46.815px] border-[1.81px] border-gfx-surface-raised shadow-[0px_7.242px_36.209px_0px_rgba(0,0,0,0.03)]"
      data-stream-chart-panel
    >
      {/* Figma places the raster oversized and offset so the source price axis stays cropped out. */}
      <img src={src} alt={alt} className="absolute top-[-8.185%] left-[-3.506%] h-[145.44%] w-[106.83%] max-w-none" />
      <div className="surface-raised absolute inset-x-0 bottom-0 h-[74px] border border-gfx-neutral-250">
        {AXIS_TICKS.map(([tick, left]) => (
          <span
            key={tick}
            className="absolute top-1/2 -translate-y-1/2 text-base leading-[24.44px] font-medium whitespace-nowrap text-gfx-neutral-400"
            style={{ left: `${left}%` }}
          >
            {tick}
          </span>
        ))}
      </div>
      {children}
    </div>
  )
}

export function WatchControlToggle({
  mode = 'watch',
  onChange,
  watchLabel = 'Watch',
  controlLabel = 'Control',
}: {
  mode?: 'watch' | 'control'
  onChange?: (mode: 'watch' | 'control') => void
  watchLabel?: string
  controlLabel?: string
}) {
  const watching = mode === 'watch'
  return (
    <div className="relative h-[49px] w-[323px] shrink-0 rounded-[60px] bg-white/5" role="group" aria-label="Stream mode" data-watch-control-toggle>
      <button
        type="button"
        aria-pressed={watching}
        onClick={() => onChange?.('watch')}
        className={`absolute top-[2px] left-[5px] flex h-[44px] w-[159px] items-center justify-center gap-[10px] rounded-[300px] px-[31px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 ${
          watching ? 'theme-preserve-light bg-gfx-green-lightest text-black' : 'text-gfx-neutral-400 hover:text-white'
        }`}
      >
        <PlayCircleIcon size={18} color="currentColor" />
        <span className="text-base leading-[24.44px] font-medium">{watchLabel}</span>
      </button>
      <button
        type="button"
        aria-pressed={!watching}
        onClick={() => onChange?.('control')}
        className={`absolute top-[2px] right-[5px] flex h-[44px] items-center gap-[6px] rounded-[300px] pr-[14px] pl-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 ${
          watching ? 'text-gfx-neutral-400 hover:text-white' : 'theme-preserve-light bg-gfx-green-lightest text-black'
        }`}
      >
        <CursorIcon size={24} color="currentColor" />
        <span className="text-sm leading-[18.8px]">{controlLabel}</span>
      </button>
    </div>
  )
}

export function StreamActionChip({ icon, children, className = '' }: { icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex h-[44px] shrink-0 items-center gap-[9px] rounded-[30px] border border-gfx-neutral-250 bg-gfx-green-900 px-[12px] text-base leading-[24.44px] font-medium text-gfx-neutral-400 ${className}`}
      data-stream-action-chip
    >
      {icon}
      {children}
    </span>
  )
}

export function StreamTagChip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex h-[38px] shrink-0 items-center justify-center gap-[10px] rounded-[30px] border border-gfx-neutral-250 bg-gfx-green-900 p-[10px] text-base leading-[24.44px] font-medium text-white ${className}`}
    >
      {children}
    </span>
  )
}

export function StreamViewersChip({ count, className = '' }: { count: number; className?: string }) {
  return (
    <StreamTagChip className={className}>
      <ViewersEyeIcon />
      {count}
    </StreamTagChip>
  )
}

export function StreamTipChip({ label = 'Tip' }: { label?: string }) {
  return <StreamActionChip icon={<GiftIcon size={24} color="currentColor" />}>{label}</StreamActionChip>
}

export function StreamLikeChip({ count = 0 }: { count?: number }) {
  return (
    <StreamActionChip icon={<HeartFilledIcon color="currentColor" />} className="!gap-[8px]">
      {count}
    </StreamActionChip>
  )
}

export function StreamFollowButton({ label = 'Follow', followed = false, onClick }: { label?: string; followed?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={followed}
      onClick={onClick}
      className="theme-preserve-light flex h-[44px] w-[112px] shrink-0 items-center justify-center gap-[10px] rounded-[30px] bg-gfx-green-lightest px-3 py-2 text-sm leading-[18.8px] text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gfx-main"
      data-stream-follow
    >
      <FollowPersonIcon />
      {label}
    </button>
  )
}

export function StreamHelpButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Stream help"
      onClick={onClick}
      className="grid h-[44px] w-[42px] shrink-0 place-items-center rounded-[20.5px] border border-gfx-neutral-250 bg-gfx-green-900 text-gfx-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500"
      data-stream-help
    >
      <QuestionCircleIcon size={20} color="currentColor" />
    </button>
  )
}

export interface StreamChatMessage {
  id: string
  author: string
  body: string
  age: string
}

export function StreamChatPanel({
  username = '@tshepang',
  messages,
  placeholder = 'Send a message',
}: {
  username?: string
  messages: StreamChatMessage[]
  placeholder?: string
}) {
  return (
    <section
      className="surface-raised relative h-[473px] overflow-hidden rounded-[30px] border-[1.16px] border-gfx-surface-raised shadow-[0px_4.641px_23.204px_0px_rgba(0,0,0,0.03)]"
      aria-label="Live chat"
      data-stream-chat-panel
    >
      <div className="surface-raised absolute inset-x-8 top-[-1.16px] h-[448px] overflow-hidden rounded-[30px]">
        <GlowEllipse variant="chat" className="bottom-[380px] left-1/2 -translate-x-1/2" />

        <p className="relative flex gap-[7px] px-[7px] pt-[26px] text-base leading-[24.44px] font-medium text-white">
          Chatting as
          <span className="text-gfx-green-300">{username}</span>
        </p>

        <hr className="relative mt-[17px] border-0 border-t border-gfx-neutral-250" />

        <ul className="relative mt-[22px] space-y-3 px-[7px]">
          {messages.map((message) => (
            <li key={message.id} className="flex flex-wrap items-baseline gap-x-[14px] text-base leading-[1.2]">
              <span className="text-gfx-red-muted">{message.author}</span>
              <span className="text-white">{message.body}</span>
              <span className="-ml-[7px] text-xs leading-[18.8px] text-gfx-neutral-400">{message.age}</span>
            </li>
          ))}
        </ul>

        <form
          className="absolute inset-x-[-2px] bottom-[13px] flex h-[70px] items-center rounded-[47px] border border-[#00422c] bg-[#1c1c1c] pr-[19px] pl-[36px]"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="watch-chat-message" className="sr-only">
            Chat message
          </label>
          <input
            id="watch-chat-message"
            type="text"
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-base leading-[1.2] text-white outline-none placeholder:text-white focus-visible:ring-0"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="relative grid h-[44px] w-[67px] shrink-0 place-items-center rounded-[300px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1c1c]"
          >
            <span
              className="absolute inset-[0_2.99%_0_13.43%] rounded-[276.316px] blur-[22.75px]"
              style={{ backgroundImage: 'linear-gradient(90.3029573714712deg, rgba(209, 209, 210, 0) 56.751%, rgb(56, 132, 107) 108.17%)' }}
              aria-hidden="true"
            />
            <span
              className="absolute inset-[-6.82%_0_-11.36%_8.96%] rounded-[239.726px] blur-[6.85px]"
              style={{ backgroundImage: 'linear-gradient(92.7333698023894deg, rgba(209, 209, 210, 0) 41.229%, rgb(56, 255, 189) 95.948%)' }}
              aria-hidden="true"
            />
            <span
              className="absolute inset-[0_2.99%_0_4.48%] rounded-[300px]"
              style={{ backgroundImage: 'linear-gradient(87.66854169942835deg, rgb(209, 209, 209) 30.257%, rgb(210, 245, 237) 61.142%, rgb(213, 255, 241) 71.875%)' }}
              aria-hidden="true"
            />
            <span
              className="absolute inset-[0_2.99%_0_4.48%] rounded-[300px] blur-[4.65px]"
              style={{ backgroundImage: 'linear-gradient(-44.21636932428271deg, rgb(209, 209, 209) 25.264%, rgba(162, 245, 227, 0) 115.21%)' }}
              aria-hidden="true"
            />
            <span
              className="absolute inset-[0_2.99%_0_4.48%] rounded-[300px] blur-[4.65px]"
              style={{ backgroundImage: 'linear-gradient(-44.21636335743091deg, rgb(240, 254, 254) 25.264%, rgba(162, 245, 227, 0) 59.725%)' }}
              aria-hidden="true"
            />
            <SendPlaneIcon size={15} color="black" className="relative" />
          </button>
        </form>
      </div>
    </section>
  )
}
