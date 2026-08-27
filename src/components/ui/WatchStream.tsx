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
    <span className="absolute left-[17em] top-[19em] grid h-[8em] w-[5em] grid-cols-2 gap-x-[1em] gap-y-[1em]" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <i key={i} className="size-[2em] bg-gfx-neutral-400" />
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
      className={`h-[251em] w-[385em] overflow-hidden rounded-[12em] bg-black ${className}`}
      // Every value below is the Figma pixel measurement expressed in `em`, and this
      // root pins 1em to one design pixel scaled by the chart's container width. The
      // pip keeps its 385x251 geometry at the 1548px design width and shrinks with the
      // panel instead of overflowing it on a phone.
      style={{ fontSize: 'calc(100cqw / 1548)' }}
      data-broadcaster-pip
    >
      <div className="absolute inset-x-0 top-0 h-[44em] bg-gfx-green-900" aria-hidden="true" />

      <PipGrip />
      <span className="absolute left-[27em] top-[23em] -translate-y-1/2 text-gfx-neutral-400">
        <span className="text-[14em] leading-[1.3429]">{label}</span>
      </span>
      <span className="absolute left-[279em] top-[18em] size-[8em] rounded-full bg-gfx-green-300" aria-hidden="true" />
      <span className="absolute left-[291em] top-[22em] -translate-y-1/2 text-gfx-bullish-light">
        <span className="text-[14em] leading-[1.3429]">LIVE</span>
      </span>
      <span className="absolute left-[338em] top-[23em] h-[1em] w-[7em] bg-[#A0A0A0]" aria-hidden="true" />
      <ArrowUpRightIcon className="absolute left-[364em] top-[14em] size-[10.7207em] text-gfx-neutral-400" />
      <ArrowDownLeftIcon className="absolute left-[357em] top-[20.02em] size-[11em] text-gfx-neutral-400" />

      <div className="absolute left-[calc(50%-0.5em)] top-[200em] h-[32em] w-[364em] -translate-x-1/2 overflow-hidden rounded-[18.627em] bg-gfx-surface-raised">
        <PlayTriangleIcon className="absolute left-[4.4%] top-[calc(50%-0.46em)] h-[11.0873em] w-[10.0063em] -translate-y-1/2 text-white" />
        <span className="absolute left-[75em] top-[calc(50%-5em)] -translate-x-1/2 whitespace-nowrap text-white">
          <span className="text-[16em] leading-[1.5275] font-medium">
            {elapsed} / {duration}
          </span>
        </span>
        <SpeakerMutedIcon className="absolute left-[285em] top-[10em] size-[12.9557em] text-white" />
        <CornerFrameIcon className="absolute left-[315.4em] top-[10em] size-[11.7199em] text-white" />
        <DotsVerticalSmallIcon className="absolute left-[345.54em] top-[10em] h-[12.3184em] w-[2.63899em] text-white" />
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
      {/* Same `em`-per-design-pixel trick as the pip: the strip is 74px tall with 16px
          labels at the 1548px design width and shrinks with the panel, instead of
          claiming 43% of its height on a phone. */}
      <div
        className="surface-raised absolute inset-x-0 bottom-0 h-[74em] border border-gfx-neutral-250"
        style={{ fontSize: 'calc(100cqw / 1548)' }}
      >
        {AXIS_TICKS.map(([tick, left]) => (
          <span
            key={tick}
            className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-gfx-neutral-400"
            style={{ left: `${left}%` }}
          >
            <span className="text-[16em] leading-[1.5275] font-medium">{tick}</span>
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
