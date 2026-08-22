import type { ReactNode } from 'react'
import { GlowButton } from './GlowButton'
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
  variant = 'browse',
}: {
  category?: string
  followed?: boolean
  onFollow?: () => void
  className?: string
  variant?: 'browse' | 'owner'
}) {
  const owner = variant === 'owner'
  return (
    <article className={`w-full max-w-[381px] ${className}`} data-stream-card data-stream-card-variant={variant} data-followed={followed}>
      <div className="relative h-[220px] overflow-hidden rounded-[20px] bg-[#09241C] text-[#808080]" data-stream-card-media>
        <span className="absolute left-[14px] top-[14px] inline-flex h-[35px] items-center gap-1.5 rounded-[15px] bg-[#2A1411] px-[10px] text-sm leading-[18.8px] text-[#D46356]"><i className="size-1 rounded-full bg-[#D46356]" aria-hidden="true" />Live</span>
        {!owner && <span className="absolute right-[14px] top-[14px] inline-flex h-[30px] items-center gap-1.5 rounded-[30px] bg-[#0C1311] px-2 text-sm leading-[18.8px] text-[#808080]"><svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden="true"><path d="m7 1.2 1.7 3.1 3.5.7-2.4 2.6.4 3.6L7 9.7l-3.2 1.5.4-3.6L1.8 5l3.5-.7L7 1.2Z" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" /></svg>Feature</span>}
        <span className="absolute left-1/2 top-[63px] grid size-[63px] -translate-x-1/2 place-items-center text-[#808080]"><CameraIcon /></span>
        <span className="absolute left-[14px] top-[178px] inline-flex h-[34px] items-center rounded-[15px] bg-[#0C1311] px-4 text-sm leading-[18.8px] text-[#FFFFFF]">1 watching</span>
        <span className="absolute left-[119px] top-[178px] inline-flex h-[34px] items-center rounded-[15px] bg-[#0C1311] px-4 text-sm leading-[18.8px] text-[#00B38C]">EURUSD</span>
        <span className="absolute left-[211px] top-[177px] inline-flex h-[34px] max-w-[89px] items-center truncate rounded-[15px] border border-[#A0A0A0] bg-[#0C1311] px-4 text-sm leading-[18.8px] text-[#FFFFFF]">{category}</span>
        <span className="absolute right-[14px] top-[178px] inline-flex h-[34px] items-center rounded-[15px] bg-[#0C1311] px-4 text-sm leading-[18.8px] text-[#FFFFFF]">2:15</span>
      </div>
      <div className="relative h-[99px]" data-stream-card-details>
        {owner ? <span className="absolute left-[14px] top-[22px] grid size-[51px] place-items-center rounded-full bg-gfx-green-800 text-base text-white" aria-hidden="true">J</span> : <img src="/images/streaming-avatar.png" alt="" className="absolute left-[14px] top-[22px] size-[51px] rounded-full object-cover" />}
        <div className="absolute left-[81px] top-[31px] min-w-0 max-w-[170px]">
          <p className="truncate text-base leading-[19.2px] text-white">{owner ? 'Joe Doe' : '@mr-dev'}</p>
          <p className="mt-[3px] truncate text-sm leading-[18.8px] text-gfx-neutral-500">Stream test</p>
        </div>
        {!owner && <button
          type="button"
          onClick={onFollow}
          className={`absolute right-[14px] top-[31px] inline-flex h-[35px] min-w-[95px] items-center justify-center gap-2 rounded-[12px] px-3 text-sm leading-[18.8px] text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000705] ${followed ? 'bg-gfx-green-300' : 'bg-[#F1FFFA]'}`}
          aria-pressed={followed}
        >
          <svg viewBox="0 0 18 18" className="size-[18px]" fill="none" aria-hidden="true"><circle cx="6" cy="5" r="2.25" stroke="currentColor" strokeWidth="1.4" /><path d="M2.5 13.6c.4-2.3 1.7-3.5 3.5-3.5s3.1 1.2 3.5 3.5M13.3 5.2v5M10.8 7.7h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />{followed && <path d="m11.2 13.1 1.3 1.3 2.8-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />}</svg>
          Follow
        </button>}
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
        <GlowButton className="mt-7" width={200} label="Browse channels" onClick={onBrowse} />
      </div>
    </div>
  )
}
