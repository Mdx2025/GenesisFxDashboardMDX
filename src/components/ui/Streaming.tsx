import type { ReactNode } from 'react'
import { ModeToggle } from './ModeToggle'

export const STREAMING_TABS = ['Home', 'Browse', 'Replays', 'Following'] as const
export type StreamingTab = (typeof STREAMING_TABS)[number]

export function StreamingTabs({ activeIndex, onChange, className = '' }: { activeIndex: number; onChange: (index: number) => void; className?: string }) {
  return (
    <div className={`w-[532px] max-w-full overflow-x-auto ${className}`} data-streaming-tabs>
      <ModeToggle options={[...STREAMING_TABS]} activeIndex={activeIndex} onChange={onChange} />
    </div>
  )
}

export function StreamingLiveBadge({ children = 'Live' }: { children?: ReactNode }) {
  return <span className="inline-flex h-[33px] items-center rounded-full border border-[#E7485D] px-[11px] text-sm leading-none text-[#FF697C]">{children}</span>
}

function CameraIcon({ size = 63 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="8" y="14" width="39" height="36" rx="9" stroke="currentColor" strokeWidth="3" />
      <path d="m47 26 8-5.5c1.3-.9 3 .03 3 1.6v19.8c0 1.57-1.7 2.5-3 1.6L47 38" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="27.5" cy="32" r="7" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

export function StreamCard({
  category = 'FOREX',
  followed = false,
  onFollow,
  className = '',
}: {
  category?: string
  followed?: boolean
  onFollow?: () => void
  className?: string
}) {
  return (
    <article className={`w-full max-w-[381px] ${className}`} data-stream-card data-followed={followed}>
      <div className="relative h-[220px] overflow-hidden rounded-[18.563px] border border-gfx-green-200 bg-[#09241C] text-gfx-green-300">
        <div className="absolute -left-16 -top-24 size-[260px] rounded-full bg-[#064B34]/80 blur-[80px]" aria-hidden="true" />
        <span className="absolute left-4 top-4 rounded-full bg-[#E8475D] px-3 py-1 text-xs font-medium text-[#F1FFFA]">LIVE</span>
        <span className="absolute right-4 top-4 rounded-full border border-[#23644F] bg-[#09241C]/90 px-3 py-1 text-xs text-[#CFF2E6]">Feature</span>
        <span className="absolute inset-0 grid place-items-center text-gfx-green-300/80"><CameraIcon /></span>
        <div className="absolute inset-x-4 bottom-4 flex gap-2">
          <span className="rounded-full bg-black/75 px-3 py-1 text-xs text-[#F1FFFA]">1 watching</span>
          <span className="rounded-full bg-black/75 px-3 py-1 text-xs text-gfx-green-300">EURUSD</span>
          <span className="rounded-full border border-white/50 bg-black/75 px-3 py-1 text-xs text-[#F1FFFA]">{category}</span>
          <span className="ml-auto rounded-full bg-black/75 px-3 py-1 text-xs text-[#F1FFFA]">2:15</span>
        </div>
      </div>
      <div className="flex h-[99px] items-center gap-3 px-2">
        <img src="/images/streaming-avatar.png" alt="" className="size-[51px] rounded-full border border-gfx-green-200 object-cover" />
        <div className="min-w-0">
          <p className="truncate text-base leading-5 text-white">@mr-dev</p>
          <p className="mt-1 truncate text-sm text-gfx-neutral-500">Stream test</p>
        </div>
        <button
          type="button"
          onClick={onFollow}
          className={`ml-auto inline-flex h-[34px] min-w-[91px] items-center justify-center gap-2 rounded-full border text-sm transition-colors ${followed ? 'border-gfx-green-300 bg-gfx-green-300 text-black' : 'border-[#F1FFFA] bg-[#F1FFFA] text-black'}`}
          aria-pressed={followed}
        >
          {followed && <span aria-hidden="true">✓</span>}
          Follow
        </button>
      </div>
    </article>
  )
}

const CATEGORY_ICONS: Record<string, string> = {
  All: '/images/streaming-category-all.svg',
  Forex: '/images/streaming-category-forex.svg',
  Crypto: '/images/streaming-category-crypto.svg',
  Indices: '/images/streaming-category-indices.svg',
  Stocks: '/images/streaming-category-stocks.svg',
  'News & Analysis': '/images/streaming-category-news.svg',
}

export function StreamingCategoryCard({ label, watching, live = false }: { label: string; watching: number; live?: boolean }) {
  return (
    <article className="surface-raised surface-raised-border relative h-[297px] min-w-[220px] overflow-hidden rounded-[18.563px] border-[1.16px] px-[27px]" data-stream-category>
      <div className="absolute -left-16 -top-[206px] h-[278px] w-[493px] rounded-full bg-[#064B34] opacity-80 blur-[70px]" aria-hidden="true" />
      {live && <span className="absolute left-[23px] top-7 flex items-center gap-2 text-sm text-[#FF697C]"><i className="size-2 rounded-full bg-[#E7485D] shadow-[0_0_8px_#E7485D]" />1 LIVE</span>}
      <span className="absolute left-1/2 top-[132px] grid size-[70px] -translate-x-1/2 -translate-y-1/2 place-items-center" aria-hidden="true"><img src={CATEGORY_ICONS[label]} alt="" className="max-h-[70px] max-w-[70px]" /></span>
      <h3 className="absolute bottom-[52px] left-[27px] text-base font-normal text-white">{label}</h3>
      <p className="absolute bottom-[29px] left-[27px] text-sm text-gfx-neutral-500">{watching} watching</p>
    </article>
  )
}

export function StreamingEmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="surface-raised-border grid min-h-[470px] place-items-center rounded-[18.563px] border-[1.16px] border-dashed px-6 text-center" data-streaming-empty>
      <div>
        <span className="mx-auto grid size-[74px] place-items-center rounded-[22px] border border-gfx-green-200 bg-gfx-surface-icon-well text-gfx-green-300"><CameraIcon size={38} /></span>
        <h2 className="mt-7 text-2xl font-normal text-white">You don&apos;t follow anyone yet</h2>
        <p className="mx-auto mt-3 max-w-[510px] text-base leading-6 text-gfx-neutral-500">Open a stream and tap Follow to see their live broadcasts here.</p>
        <button type="button" onClick={onBrowse} className="mt-7 h-11 rounded-full bg-[#F1FFFA] px-8 text-base font-medium text-black">Browse channels</button>
      </div>
    </div>
  )
}
