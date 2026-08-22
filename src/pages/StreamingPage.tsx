import { useMemo, useRef, useState } from 'react'
import { A11y, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import {
  GlassBannerCard,
  GlassCard,
  GlowButton,
  PrimaryPillButton,
  SearchInput,
  SparkleButton,
  StreamCard,
  StreamingCategoryCard,
  StreamingEmptyState,
  StreamingLiveBadge,
  StreamingTabs,
  STREAMING_TABS,
} from '@/components/ui'

const CATEGORIES = [
  ['All', 1, true], ['Forex', 1, true], ['Crypto', 0, false], ['Indices', 0, false], ['Stocks', 0, false], ['News & Analysis', 0, false],
] as const

type ReplayFilter = 'all' | 'favorites'

function StartStreamingIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-[18px] text-black" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.48138 3.18179C3.72295 3.42384 3.72256 3.81589 3.48051 4.05745C2.09469 5.44052 1.23837 7.35106 1.23837 9.46278C1.23837 11.5992 2.11484 13.5297 3.52939 14.9165C3.77359 15.1558 3.77748 15.5479 3.53809 15.7921C3.2987 16.0363 2.90667 16.0402 2.66247 15.8008C1.02012 14.1908 0 11.9453 0 9.46278C0 7.00898 0.996647 4.78679 2.60572 3.18092C2.84777 2.93935 3.23982 2.93974 3.48138 3.18179ZM14.3374 3.24155C14.5816 3.00216 14.9736 3.00606 15.213 3.25025C16.7817 4.85045 17.75 7.04415 17.75 9.46278C17.75 11.9102 16.7586 14.1272 15.1569 15.7321C14.9153 15.9741 14.5232 15.9745 14.2812 15.7329C14.0392 15.4914 14.0388 15.0993 14.2803 14.8573C15.6598 13.4751 16.5116 11.569 16.5116 9.46278C16.5116 7.38124 15.6796 5.49526 14.3287 4.11717C14.0893 3.87297 14.0932 3.48094 14.3374 3.24155ZM5.82797 5.73738C6.06163 5.98707 6.04864 6.3789 5.79895 6.61256C5.01555 7.34567 4.5407 8.34841 4.5407 9.44809C4.5407 10.5605 5.02671 11.574 5.82659 12.3093C6.07835 12.5407 6.09484 12.9324 5.86341 13.1841C5.63199 13.4359 5.24029 13.4524 4.98853 13.221C3.95427 12.2703 3.30233 10.9343 3.30233 9.44809C3.30233 7.97918 3.93925 6.65683 4.95279 5.70835C5.20248 5.47469 5.59431 5.48769 5.82797 5.73738ZM11.965 5.76877C12.2014 5.52165 12.5934 5.51293 12.8405 5.7493C13.8289 6.6947 14.4477 8.00031 14.4477 9.44809C14.4477 10.9131 13.8141 12.2324 12.8051 13.1804C12.5559 13.4145 12.1641 13.4023 11.9299 13.1531C11.6957 12.9039 11.708 12.512 11.9572 12.2779C12.7369 11.5453 13.2093 10.5449 13.2093 9.44809C13.2093 8.36405 12.7479 7.37441 11.9845 6.64421C11.7374 6.40784 11.7287 6.01589 11.965 5.76877Z"
        fill="currentColor"
      />
      <path d="M10.2424 8.18406C10.982 8.72701 11.3517 8.99849 11.3517 9.4628C11.3517 9.92712 10.982 10.1986 10.2424 10.7415C10.0383 10.8914 9.83581 11.0325 9.64975 11.1501C9.48651 11.2533 9.30164 11.36 9.11025 11.4648C8.37245 11.8686 8.00355 12.0704 7.67269 11.8469C7.34183 11.6234 7.31176 11.1554 7.25162 10.2195C7.23461 9.95487 7.22384 9.69541 7.22384 9.4628C7.22384 9.2302 7.23461 8.97073 7.25162 8.70606C7.31176 7.77017 7.34183 7.30222 7.67269 7.07869C8.00355 6.85515 8.37245 7.05705 9.11025 7.46084C9.30164 7.56559 9.48651 7.67231 9.64975 7.77547C9.83581 7.89306 10.0383 8.03418 10.2424 8.18406Z" fill="currentColor" />
    </svg>
  )
}

function SectionHeading({ children, count }: { children: string; count?: string }) {
  return <h2 className="text-[30px] font-normal leading-none text-white">{children}{count && <span className="ml-2 text-gfx-neutral-500">({count})</span>}</h2>
}

function ReplayFilterSwitch({ value, onChange }: { value: ReplayFilter; onChange: (value: ReplayFilter) => void }) {
  const options: Array<{ value: ReplayFilter; label: string; icon?: boolean }> = [
    { value: 'all', label: 'All replays' },
    { value: 'favorites', label: 'My favorites (0)', icon: true },
  ]

  return (
    <div
      className="inline-flex h-11 shrink-0 items-center rounded-full border border-gfx-green-200 p-0 text-sm"
      role="group"
      aria-label="Replay filter"
      data-replay-filter
    >
      {options.map((option) => {
        const active = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`relative inline-flex items-center justify-center gap-2 rounded-full px-5 transition-colors focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000705] ${active ? `z-10 -my-px h-[46px] bg-[#F1FFFA] text-black shadow-[0_6px_18px_rgba(0,0,0,0.18)] ${option.value === 'all' ? '-ml-px' : '-mr-px'}` : 'h-11 text-gfx-neutral-400 hover:text-white'}`}
          >
            {option.icon && (
              <svg viewBox="0 0 18 18" className="size-[18px]" fill="none" aria-hidden="true">
                <path d="M9 14.5 3.8 9.7A3.4 3.4 0 0 1 8.6 4.9L9 5.3l.4-.4a3.4 3.4 0 0 1 4.8 4.8L9 14.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function FeaturedStream() {
  return (
    <GlassCard variant="light" divider="none" glow={false} rounded="18.563px" className="h-[561px] overflow-hidden" data-featured-stream>
      <img src="/images/streaming-chart.png" alt="EURUSD trading chart" className="absolute inset-0 size-full object-cover" />
      <div
        className="absolute inset-x-[19px] bottom-[26px] flex min-h-[111px] items-center rounded-full border-0 bg-[rgba(12,19,17,0.24)] px-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-[32px] backdrop-saturate-[135%]"
        data-featured-stream-overlay
      >
        <span className="theme-preserve-light grid size-[70px] shrink-0 place-items-center rounded-full border border-[#064B34] bg-[#021B13] text-2xl text-white">S</span>
        <div className="ml-5">
          <h2 className="theme-preserve-light text-xl text-white">Stream Test</h2>
          <p className="mt-2 text-sm text-[#A0A0A0]">EURUSD</p>
        </div>
        <div className="ml-3 mt-8 flex gap-2">
          <span className="theme-preserve-light rounded-full bg-[#09241C] px-4 py-2 text-sm text-white">Forex</span>
          <span className="theme-preserve-light rounded-full bg-[#09241C] px-4 py-2 text-sm text-white">English</span>
        </div>
        <PrimaryPillButton className="ml-auto min-w-[206px]">Watch now</PrimaryPillButton>
      </div>
    </GlassCard>
  )
}

function ChatPanel() {
  return (
    <section className="h-[561px]" aria-label="Live chat" data-stream-chat>
      <GlassCard variant="light" divider="none" glow={false} rounded="18.563px" className="h-full overflow-hidden p-[19px]">
        <header className="flex h-[49px] items-center gap-3 border-b border-gfx-green-200/60 px-1 text-white">
          <span className="size-4 rounded-full border border-current" aria-hidden="true" />
          <h2 className="text-xl">Chat</h2>
          <span className="ml-auto text-sm text-[#FF697C]">LIVE</span>
        </header>
        <div className="relative mt-5 h-[448px] w-[493px] max-w-[calc(100%+1px)] overflow-hidden rounded-[30px] bg-[#0C1311]" data-live-chat-panel>
          <div className="pointer-events-none absolute -top-[264px] left-0 h-[332px] w-[587px] rounded-full bg-[#00B38C] opacity-45 blur-[158.05px]" aria-hidden="true" />
          <h3 className="absolute left-[26px] top-[30px] text-base font-medium leading-[24.44px] text-[#FFFFFF]">Live Chat</h3>
          <span className="absolute right-[26px] top-[30px] text-base font-medium leading-[24.44px] text-[#FFFFFF]">1 watching</span>
          <p className="absolute left-1/2 top-[96px] -translate-x-1/2 whitespace-nowrap text-base leading-[19.2px] text-[#C6C6C6]">Tshepang-Genesis joined</p>
          <form className="absolute inset-x-1 bottom-0 flex h-[70px] items-center rounded-[47px] border border-[rgba(0,66,44,0.5)] bg-[#1C1C1C] pl-[29px] pr-[18px]" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="stream-chat-message" className="sr-only">Chat message</label>
            <input id="stream-chat-message" type="text" placeholder="Say something" className="min-w-0 flex-1 bg-transparent text-base leading-[19.2px] text-[#FFFFFF] outline-none placeholder:text-[#FFFFFF] focus-visible:ring-0" />
            <button type="submit" className="group relative ml-3 grid h-11 w-[62px] shrink-0 place-items-center overflow-visible rounded-[300px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10BC83] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1C]" aria-label="Send message">
              <span className="absolute inset-0 rounded-[300px] bg-gradient-to-br from-[#D1D1D1] via-[#D2F5ED] to-[#D5FFF1]" aria-hidden="true" />
              <span className="absolute inset-0 rounded-[300px] bg-gradient-to-l from-[#F0FEFE] to-transparent opacity-80 blur-[4.65px]" aria-hidden="true" />
              <svg viewBox="0 0 18 18" className="relative size-[18px] text-black" fill="none" aria-hidden="true"><path d="M15.6 2.7 7.2 11.1M15.6 2.7l-5.3 12.6-3.1-4.2-4.5-2.4 12.9-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </form>
        </div>
      </GlassCard>
    </section>
  )
}

function HomeState() {
  const categorySwiper = useRef<SwiperType | null>(null)

  return (
    <div data-streaming-home>
      <div className="mt-[55px] grid gap-6 xl:grid-cols-[minmax(0,992px)_minmax(360px,532px)]"><FeaturedStream /><ChatPanel /></div>
      <section className="mt-[74px]" aria-labelledby="top-live-categories-heading">
        <div className="flex items-center justify-between gap-4">
          <h2 id="top-live-categories-heading" className="text-[30px] font-normal leading-none text-white">Top Live Categories</h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => categorySwiper.current?.slidePrev()} className="grid size-11 place-items-center rounded-full border border-gfx-green-200 bg-gfx-green-900 text-white transition-colors hover:bg-gfx-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500" aria-label="Previous live categories"><ChevronLeftIcon size={18} /></button>
            <button type="button" onClick={() => categorySwiper.current?.slideNext()} className="grid size-11 place-items-center rounded-full border border-gfx-green-200 bg-gfx-green-900 text-white transition-colors hover:bg-gfx-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500" aria-label="Next live categories"><ChevronRightIcon size={18} /></button>
          </div>
        </div>
        <Swiper modules={[A11y, Keyboard]} onSwiper={(swiper) => { categorySwiper.current = swiper }} slidesPerView="auto" spaceBetween={15} grabCursor keyboard={{ enabled: true }} a11y={{ enabled: true }} className="mt-8 !overflow-hidden" data-category-carousel>
          {CATEGORIES.map(([label, watching, live]) => <SwiperSlide key={label} className="!w-[255px]"><StreamingCategoryCard label={label} watching={watching} live={live} /></SwiperSlide>)}
        </Swiper>
      </section>
      <section className="mt-5 max-w-[1529px]" data-prize-banner>
        <GlassBannerCard className="min-h-[217px]" contentClassName="flex min-h-[217px] flex-col items-start gap-6 px-10 py-8 sm:px-16 lg:flex-row lg:items-center">
          <span className="relative grid size-[79px] shrink-0 place-items-center rounded-[18px] border border-gfx-green-200 bg-gfx-green-800 text-4xl text-gfx-green-300">♕</span>
          <div className="relative lg:ml-3"><h2 className="text-[30px] text-white">Win $10,000 Cash Prize</h2><p className="mt-5 text-xl text-gfx-neutral-400">Stream live • Compete • Get Paid</p></div>
          <PrimaryPillButton className="relative lg:ml-auto min-w-[180px]">Enter Now</PrimaryPillButton>
        </GlassBannerCard>
      </section>
      <section className="mt-[74px]"><SectionHeading count="1">Live channels</SectionHeading><div className="mt-9"><StreamCard /></div></section>
    </div>
  )
}

function BrowseHero() {
  return (
    <section className="mt-9" data-browse-hero>
      <GlassBannerCard
        glowSrc={null}
        rounded="18.563px"
        className="h-[208px]"
        contentClassName="h-full px-10 py-9"
      >
        <span className="relative text-sm text-gfx-green-300">Genesis Live</span>
        <h2 className="relative mt-4 text-[40px] leading-none text-white">Browse live trading</h2>
        <span className="relative mt-5 inline-flex items-center gap-2 text-sm text-white"><i className="size-2 rounded-full bg-[#E7485D] shadow-[0_0_8px_#E7485D]" />1 stream live now</span>
      </GlassBannerCard>
    </section>
  )
}

function BrowseState() {
  const filters = ['Forex 1', 'Crypto 0', 'Indices 0', 'Stocks 1', 'Commodities 1', 'News & Analysis 0', 'Scalping 0', 'Education 0']
  return (
    <div data-streaming-browse>
      <BrowseHero />
      <div className="mt-7 flex gap-3 overflow-x-auto pb-2">{filters.map((item, i) => <button key={item} className={`h-9 shrink-0 rounded-full border px-5 text-sm ${i === 0 ? 'border-gfx-green-300 bg-gfx-green-800 text-white' : 'border-gfx-green-200 text-gfx-neutral-400'}`}>{item}</button>)}</div>
      <section className="mt-7"><SectionHeading count="1">Live now</SectionHeading><div className="mt-3"><StreamCard /></div></section>
      <div className="my-10 flex items-center gap-5 text-base text-gfx-neutral-500"><i className="h-px flex-1 bg-gfx-green-200" /><span>Browse by category</span><i className="h-px flex-1 bg-gfx-green-200" /></div>
      <section><SectionHeading count="1 live">Forex</SectionHeading><div className="mt-3"><StreamCard /></div></section>
    </div>
  )
}

function CardsState({ following, followed, onFollow, replayFilter = 'all', onShowAll }: { following?: boolean; followed: boolean; onFollow: () => void; replayFilter?: ReplayFilter; onShowAll?: () => void }) {
  const cards = useMemo(() => following ? ['FOREX'] : replayFilter === 'favorites' ? [] : ['FOREX', 'NEWS & ANALYSIS', 'COMMODITIES'], [following, replayFilter])
  const favoritesEmpty = !following && replayFilter === 'favorites'

  return (
    <section className="mt-[54px]" data-streaming-cards-state>
      <span className="sr-only" aria-live="polite">{favoritesEmpty ? 'Showing zero favorite replays.' : `Showing ${cards.length} replays.`}</span>
      <SectionHeading count={favoritesEmpty ? '0' : '1 live'}>{favoritesEmpty ? 'My favorite replays' : 'Recent replays'}</SectionHeading>
      {favoritesEmpty ? (
        <div className="mt-3 flex min-h-[319px] flex-col items-center justify-center rounded-[18.563px] border border-gfx-green-200 bg-white/[0.02] px-6 text-center" data-replay-favorites-empty>
          <span className="grid size-16 place-items-center rounded-full border border-gfx-green-200 bg-gfx-green-900 text-gfx-green-300" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-7" fill="none"><path d="M12 20 4.7 13.3A4.8 4.8 0 0 1 11.5 6.5l.5.5.5-.5a4.8 4.8 0 0 1 6.8 6.8L12 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <h3 className="mt-5 text-xl text-white">No favorite replays yet</h3>
          <p className="mt-2 text-sm text-gfx-neutral-400">Favorite a replay and it will appear here.</p>
          <PrimaryPillButton className="mt-6 min-w-[168px]" onClick={onShowAll}>Browse all replays</PrimaryPillButton>
        </div>
      ) : (
        <div className="mt-3 grid gap-[13px] md:grid-cols-2 2xl:grid-cols-4" data-replay-grid>{cards.map(category => <StreamCard key={category} category={category} followed={following && followed} onFollow={following ? onFollow : undefined} />)}</div>
      )}
    </section>
  )
}

export default function StreamingPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeIndex, setActiveIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [followed, setFollowed] = useState(true)
  const [replayFilter, setReplayFilter] = useState<ReplayFilter>('all')
  const tab = STREAMING_TABS[activeIndex]

  return (
    <div className="relative px-4 py-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 4xl:py-6" data-streaming-page data-streaming-state={tab.toLowerCase()}>
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} menuOpen={sidebarOpen} breadcrumbItems={[{ label: 'Streaming', current: true }]} />
      <main className="pb-20 pt-10">
        <header className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div><div className="flex items-center gap-5"><h1 className="text-h1 font-normal text-white">Streaming</h1><StreamingLiveBadge /></div><div className="mt-8"><StreamingTabs activeIndex={activeIndex} onChange={setActiveIndex} /></div></div>
          <div className="xl:pt-4">
            <div className="flex flex-wrap items-center gap-3" data-streaming-header-actions>
              <SparkleButton className="!h-[46px] !min-w-[171px] !rounded-[30px] px-6" data-streaming-my-streams>
                My streams
              </SparkleButton>
              <GlowButton
                label="Start streaming"
                icon={<StartStreamingIcon />}
                width={197}
                height={44}
                className="streaming-start-button"
              />
            </div>
            {tab === 'Browse' && <SearchInput value={query} onChange={setQuery} placeholder="Search streams, symbols.." ariaLabel="Search streaming content" className="mt-[19px] w-full xl:ml-auto xl:w-[393px]" />}
          </div>
        </header>

        {tab !== 'Home' && tab !== 'Browse' && <div className="mt-[34px] flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><SearchInput value={query} onChange={setQuery} placeholder="Search replays..." ariaLabel="Search streaming content" className="w-full max-w-[765px]" />{tab === 'Replays' && <ReplayFilterSwitch value={replayFilter} onChange={setReplayFilter} />}</div>}
        {tab === 'Home' && <HomeState />}
        {tab === 'Browse' && <BrowseState />}
        {tab === 'Replays' && <CardsState followed={false} onFollow={() => {}} replayFilter={replayFilter} onShowAll={() => setReplayFilter('all')} />}
        {tab === 'Following' && (followed ? <CardsState following followed={followed} onFollow={() => setFollowed(false)} /> : <div className="mt-[54px]"><StreamingEmptyState onBrowse={() => setActiveIndex(1)} /></div>)}
      </main>
    </div>
  )
}
