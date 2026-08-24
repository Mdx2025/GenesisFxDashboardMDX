import type { ReactNode } from 'react'
import { SearchIcon } from '@/components/icons'
import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'
import { GlowButton } from './GlowButton'
import type { DiscoverFlag, DiscoverMarketRow, DiscoverMover } from '@/data/discover'
import { openTradeLocker } from '@/constants/links'

const ASSETS = '/images/news/discover'

const FLAG_SRC: Record<Exclude<DiscoverFlag, 'composite' | 'usdils'>, string> = {
  'xagusd-1': `${ASSETS}/flag-xagusd-1.svg`,
  'xagusd-2': `${ASSETS}/flag-xagusd-2.svg`,
  'xagusd-3': `${ASSETS}/flag-xagusd-3.svg`,
}

/** 31px round flag. Cards 4-6 stack a base swatch, a vector overlay and a photo crop. */
function MoverFlag({ flag }: { flag: DiscoverFlag }) {
  if (flag === 'composite') {
    return (
      <div className="relative size-[31px] shrink-0 overflow-hidden rounded-[60px]">
        <img src={`${ASSETS}/flag-usdzar.svg`} alt="" className="absolute inset-0 block size-full max-w-none" />
        <div className="absolute inset-[23.21%_14.11%_32.15%_14.3%]">
          <img src={`${ASSETS}/flag-usdchf.svg`} alt="" className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="absolute left-[-12.9%] right-[-41.61%] top-0 aspect-[496/321] rounded-[2.897px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.897px]">
            <img
              src={`${ASSETS}/flag-overlay-image173.png`}
              alt=""
              className="absolute left-[-22.58%] top-[-65.73%] h-[230.53%] w-[149.19%] max-w-none"
            />
          </div>
        </div>
      </div>
    )
  }

  if (flag === 'usdils') {
    return (
      <div className="relative size-[31px] shrink-0 overflow-hidden rounded-[60px]">
        <img src={`${ASSETS}/flag-usdhuf.svg`} alt="" className="absolute inset-0 block size-full max-w-none" />
        <span className="absolute inset-[38.71%_25.81%_38.71%_29.03%] text-white text-[10.182px] font-medium font-acid leading-[15.553px]">
          US
        </span>
      </div>
    )
  }

  return (
    <div className="relative size-[31px] shrink-0 overflow-hidden rounded-[60px]">
      <img src={FLAG_SRC[flag]} alt="" className="absolute inset-0 block size-full max-w-none" />
    </div>
  )
}

export function DiscoverMoverCard({ mover }: { mover: DiscoverMover }) {
  const tone = mover.positive ? 'text-gfx-green-300' : 'text-gfx-red-muted'
  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="14.198px"
      className="trades-table-card relative h-[149px] w-full min-w-0 overflow-hidden"
    >
      <div className="flex items-center gap-[6px] px-[9.11px] pt-[14px]">
        <MoverFlag flag={mover.flag} />
        <span className="min-w-0 flex-1 truncate text-white text-[14px] font-medium font-acid leading-[24.44px]">
          {mover.symbol}
        </span>
      </div>

      <p className="truncate px-[9.11px] pt-[2px] text-gfx-neutral-400 text-[11px] font-normal font-acid leading-[18.8px]">
        {mover.description}
      </p>

      <div className="flex items-center gap-[6px] px-[9.11px] pt-[12px]">
        <span className="min-w-0 flex-1 truncate text-white text-base font-medium font-acid leading-[24.44px]">
          {mover.price}
        </span>
        <span className={`flex shrink-0 items-center gap-[3px] ${tone}`}>
          <img
            src={`${ASSETS}/${mover.positive ? 'arrow-up' : 'arrow-down'}.svg`}
            alt=""
            className="h-[8px] w-[6px] shrink-0"
          />
          <span className="text-[11px] font-normal font-acid leading-[18.8px]">{mover.change}</span>
        </span>
      </div>

      <img
        src={`${ASSETS}/${mover.positive ? 'sparkline-up' : 'sparkline-down'}.svg`}
        alt=""
        className="absolute left-1/2 top-[108.11px] block h-[25.838px] w-[83.2%] -translate-x-1/2 [[data-theme=light]_&]:hidden"
      />
      <img
        src={`${ASSETS}/${mover.positive ? 'sparkline-up-light' : 'sparkline-down'}.svg`}
        alt=""
        className="absolute left-1/2 top-[108.11px] hidden h-[25.838px] w-[83.2%] -translate-x-1/2 [[data-theme=light]_&]:block"
      />
    </GlassCard>
  )
}

export function DiscoverLivePill({ children }: { children: ReactNode }) {
  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="30px"
      className="trades-table-card inline-flex h-[35px] items-center justify-center gap-[17px] px-[11px]"
    >
      <img src={`${ASSETS}/dot-live.svg`} alt="" className="size-[8px] shrink-0" />
      <span className="text-white text-base font-medium font-acid leading-none whitespace-nowrap">{children}</span>
    </GlassCard>
  )
}

export function DiscoverSearchInput({
  value,
  onChange,
  placeholder = 'Search markets',
  className = '',
}: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`relative h-[44px] w-[287px] max-w-full ${className}`}>
      <SearchIcon size={14} color="#A0A0A0" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={event => onChange?.(event.target.value)}
        aria-label={placeholder}
        className="discover-search h-full w-full rounded-[30px] border border-gfx-green-200 bg-gfx-green-800 pl-10 pr-4 text-white text-body2 font-acid transition-colors placeholder:text-gfx-neutral-500 focus:border-gfx-green-500 focus:outline-none"
      />
    </div>
  )
}

interface CategoryBarProps {
  primary: readonly string[]
  assets: readonly string[]
  active: string
  onChange: (value: string) => void
  forYouLabel?: string
}

export function DiscoverCategoryBar({ primary, assets, active, onChange, forYouLabel = 'For you' }: CategoryBarProps) {
  const isForYou = active === forYouLabel
  return (
    <div className="discover-category-bar flex h-[46px] w-full items-center rounded-[60px] bg-[var(--color-gfx-tab-default,#111312)] pr-[19px]">
      <button
        type="button"
        onClick={() => onChange(forYouLabel)}
        aria-pressed={isForYou}
        className={`relative flex h-[45px] w-[136px] shrink-0 items-center overflow-hidden rounded-[60px] border-[1.35px] transition-colors ${
          isForYou ? 'border-gfx-green-300 bg-gfx-green-200' : 'border-transparent bg-transparent'
        }`}
      >
        {isForYou && (
          <>
            <img
              src={`${ASSETS}/tab-stars.svg`}
              alt=""
              className="pointer-events-none absolute left-[15px] top-[4px] block h-[32px] w-[109px] max-w-none"
              aria-hidden="true"
            />
            <img
              src={`${ASSETS}/tab-glow.svg`}
              alt=""
              className="pointer-events-none absolute left-1/2 top-1/2 block w-[34.255px] -translate-x-1/2 -translate-y-1/2 max-w-none mix-blend-plus-lighter"
              aria-hidden="true"
            />
          </>
        )}
        <span
          className={`relative z-base pl-[19px] text-base font-medium font-acid leading-[24.44px] whitespace-nowrap ${
            isForYou ? 'text-white' : 'text-gfx-neutral-400'
          }`}
        >
          {forYouLabel}
        </span>
      </button>

      <div className="ml-[25px] flex min-w-0 items-center gap-[28px] overflow-x-auto">
        {primary.map(label => (
          <CategoryLabel key={label} label={label} active={active === label} onChange={onChange} />
        ))}
        <img
          src={`${ASSETS}/tabs-divider.svg`}
          alt=""
          className="block h-[20.5px] w-[1.31px] shrink-0 max-w-none"
          aria-hidden="true"
        />
        {assets.map(label => (
          <CategoryLabel key={label} label={label} active={active === label} onChange={onChange} />
        ))}
      </div>
    </div>
  )
}

function CategoryLabel({ label, active, onChange }: { label: string; active: boolean; onChange: (value: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(label)}
      aria-pressed={active}
      className={`shrink-0 text-base font-medium font-acid leading-[24.44px] whitespace-nowrap transition-colors ${
        active ? 'text-white' : 'text-gfx-neutral-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}

const TABLE_COLUMNS = ['Asset', 'BID', 'ASK', 'Spread', '24H%'] as const

export function DiscoverMarketTable({ rows, onTrade = openTradeLocker }: { rows: DiscoverMarketRow[]; onTrade?: (row: DiscoverMarketRow) => void }) {
  return (
    <GlassCard
      variant="light"
      divider="none"
      rounded="18.563px"
      className="trades-table-card relative w-full overflow-hidden"
    >
      <GlowEllipse className="left-1/2 -top-[150px] -translate-x-1/2" />

      <div className="relative z-base overflow-x-auto">
        <div className="min-w-[1100px]">
          <div className="grid grid-cols-[minmax(280px,1.6fr)_repeat(3,minmax(120px,1fr))_minmax(150px,1fr)_minmax(190px,auto)_minmax(124px,auto)] items-center border-b-[0.774px] border-white/[0.04] px-[45px] py-[12px]">
            {TABLE_COLUMNS.map(column => (
              <span
                key={column}
                className="text-gfx-neutral-300 text-xs font-bold font-acid uppercase leading-[15.683px] tracking-[2.3234px]"
              >
                {column}
              </span>
            ))}
            <span className="sr-only">Chart</span>
            <span className="sr-only">Action</span>
          </div>

          {rows.map(row => (
            <div
              key={row.symbol}
              className="grid h-[75px] grid-cols-[minmax(280px,1.6fr)_repeat(3,minmax(120px,1fr))_minmax(150px,1fr)_minmax(190px,auto)_minmax(124px,auto)] items-center border-b-[0.774px] border-gfx-green-900 px-[45px] last:border-b-0"
            >
              <div className="flex items-center gap-[10px]">
                <img src={`${ASSETS}/flag-table-xauusd.svg`} alt="" className="size-[38px] shrink-0" />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-white text-base font-medium font-acid leading-[24.44px]">{row.symbol}</span>
                  <span className="truncate text-gfx-neutral-400 text-base font-normal font-acid leading-[24.44px]">{row.name}</span>
                </div>
              </div>
              <span className="text-gfx-green-300 text-base font-medium font-acid leading-[24.44px]">{row.bid}</span>
              <span className="text-gfx-red-muted text-base font-medium font-acid leading-[24.44px]">{row.ask}</span>
              <span className="text-white text-base font-medium font-acid leading-[24.44px]">{row.spread}</span>
              <span
                className={`flex items-center gap-[6px] ${row.positive ? 'text-gfx-green-300' : 'text-gfx-red-muted'}`}
              >
                <img
                  src={`${ASSETS}/${row.positive ? 'arrow-up' : 'arrow-down'}.svg`}
                  alt=""
                  className="h-[8.79px] w-[11.5px] shrink-0 object-contain"
                />
                <span className="text-base font-medium font-acid leading-[24.44px]">{row.change}</span>
              </span>
              <img
                src={`${ASSETS}/${row.positive ? 'sparkline-up' : 'sparkline-down'}.svg`}
                alt=""
                className="block h-[25.838px] w-[173px] max-w-none [[data-theme=light]_&]:hidden"
              />
              <img
                src={`${ASSETS}/${row.positive ? 'sparkline-up-light' : 'sparkline-down'}.svg`}
                alt=""
                className="hidden h-[25.838px] w-[173px] max-w-none [[data-theme=light]_&]:block"
              />
              <GlowButton label="Trade" width={108} height={46} fontSize={16} onClick={() => onTrade?.(row)} />
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export function DiscoverPagination({
  page,
  pages,
  onChange,
}: {
  page: number
  pages: number
  onChange: (page: number) => void
}) {
  return (
    <nav className="flex items-center justify-center gap-[39px]" aria-label="Market pages">
      {Array.from({ length: pages }, (_, index) => index + 1).map(value => {
        const isActive = value === page
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex h-[45px] items-center justify-center text-h2 font-normal font-acid leading-none transition-colors ${
              isActive
                ? 'w-[45px] rounded-[60px] bg-gfx-green-500 text-white'
                : 'w-[17px] text-white/70 hover:text-white'
            }`}
          >
            {value}
          </button>
        )
      })}
    </nav>
  )
}

export function DiscoverPlayStreamButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open live stream"
      className="relative flex size-[49px] shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500"
    >
      <img src={`${ASSETS}/play-stream-circle.svg`} alt="" className="absolute inset-0 block size-full" />
      <svg className="relative z-base size-[24px] text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.46689 4.39207C5.75949 4.68526 5.75902 5.16013 5.46583 5.45273C3.78722 7.128 2.75 9.44218 2.75 12C2.75 14.5878 3.81163 16.9262 5.52503 18.6059C5.82082 18.8959 5.82554 19.3707 5.53557 19.6665C5.24561 19.9623 4.77076 19.967 4.47497 19.677C2.48564 17.7269 1.25 15.0071 1.25 12C1.25 9.02783 2.45721 6.33616 4.40623 4.39102C4.69941 4.09842 5.17429 4.09889 5.46689 4.39207ZM18.6164 4.46446C18.9122 4.17449 19.387 4.17921 19.677 4.475C21.5771 6.41326 22.75 9.07043 22.75 12C22.75 14.9645 21.5491 17.6499 19.609 19.5938C19.3164 19.887 18.8415 19.8875 18.5484 19.5949C18.2552 19.3023 18.2547 18.8274 18.5473 18.5342C20.2182 16.86 21.25 14.5512 21.25 12C21.25 9.47873 20.2422 7.1943 18.6059 5.52507C18.3159 5.22928 18.3206 4.75443 18.6164 4.46446ZM8.30923 7.48757C8.59226 7.79001 8.57652 8.26462 8.27408 8.54765C7.32517 9.43564 6.75 10.6502 6.75 11.9822C6.75 13.3297 7.33869 14.5573 8.30756 15.4479C8.61251 15.7282 8.63248 16.2026 8.35216 16.5076C8.07185 16.8125 7.59739 16.8325 7.29244 16.5522C6.03967 15.4006 5.25 13.7824 5.25 11.9822C5.25 10.203 6.02148 8.60128 7.24916 7.45242C7.5516 7.16939 8.02621 7.18513 8.30923 7.48757ZM15.7429 7.52559C16.0292 7.22626 16.5039 7.21571 16.8033 7.50202C18.0005 8.64714 18.75 10.2286 18.75 11.9822C18.75 13.7568 17.9825 15.3548 16.7604 16.503C16.4586 16.7867 15.9839 16.7719 15.7003 16.47C15.4167 16.1681 15.4315 15.6935 15.7333 15.4099C16.6778 14.5225 17.25 13.3108 17.25 11.9822C17.25 10.6692 16.6911 9.47046 15.7664 8.58599C15.4671 8.29968 15.4566 7.82492 15.7429 7.52559Z" fill="currentColor"/>
        <path d="M13.6563 10.4512C14.5521 11.1088 15 11.4376 15 12.0001C15 12.5625 14.5521 12.8913 13.6563 13.549C13.4091 13.7305 13.1638 13.9014 12.9384 14.0439C12.7407 14.1688 12.5168 14.2981 12.2849 14.425C11.3913 14.9141 10.9444 15.1586 10.5437 14.8879C10.1429 14.6171 10.1065 14.0503 10.0337 12.9167C10.0131 12.5961 10 12.2818 10 12.0001C10 11.7183 10.0131 11.404 10.0337 11.0834C10.1065 9.94982 10.1429 9.38301 10.5437 9.11226C10.9444 8.8415 11.3913 9.08605 12.2849 9.57515C12.5168 9.70203 12.7407 9.83129 12.9384 9.95625C13.1638 10.0987 13.4091 10.2696 13.6563 10.4512Z" fill="currentColor"/>
      </svg>
    </button>
  )
}
