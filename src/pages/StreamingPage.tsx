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
  PrimaryPillButton,
  SearchInput,
  SecondaryButton,
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

function SectionHeading({ children, count }: { children: string; count?: string }) {
  return <h2 className="text-[30px] font-normal leading-none text-white">{children}{count && <span className="ml-2 text-gfx-neutral-500">({count})</span>}</h2>
}

function FeaturedStream() {
  return (
    <GlassCard variant="light" divider="none" glow={false} rounded="18.563px" className="h-[561px] overflow-hidden" data-featured-stream>
      <img src="/images/streaming-chart.png" alt="EURUSD trading chart" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-x-[19px] bottom-[26px] flex min-h-[111px] items-center rounded-full border-0 bg-white/[0.06] px-8 backdrop-blur-2xl">
        <span className="grid size-[70px] shrink-0 place-items-center rounded-full border border-gfx-green-200 bg-gfx-green-800 text-2xl text-white">S</span>
        <div className="ml-5">
          <h2 className="text-xl text-white">Stream Test</h2>
          <p className="mt-2 text-sm text-gfx-neutral-400">EURUSD</p>
        </div>
        <div className="ml-3 mt-8 flex gap-2">
          <span className="rounded-full bg-[#09241C] px-4 py-2 text-sm text-white">Forex</span>
          <span className="rounded-full bg-[#09241C] px-4 py-2 text-sm text-white">English</span>
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
    <section className="surface-raised surface-raised-border relative mt-9 min-h-[208px] overflow-hidden rounded-[18.563px] border-[1.16px] px-10 py-9" data-browse-hero>
      <img src="/images/streaming-browse-texture.png" alt="" className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 object-cover opacity-30 mix-blend-screen" />
      <span className="relative text-sm text-gfx-green-300">Genesis Live</span>
      <h2 className="relative mt-4 text-[40px] leading-none text-white">Browse live trading</h2>
      <span className="relative mt-5 inline-flex items-center gap-2 text-sm text-white"><i className="size-2 rounded-full bg-[#E7485D] shadow-[0_0_8px_#E7485D]" />1 stream live now</span>
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

function CardsState({ following, followed, onFollow }: { following?: boolean; followed: boolean; onFollow: () => void }) {
  const cards = useMemo(() => following ? ['FOREX'] : ['FOREX', 'NEWS & ANALYSIS', 'COMMODITIES'], [following])
  return (
    <section className="mt-[54px]" data-streaming-cards-state>
      <SectionHeading count="1 live">Recent replays</SectionHeading>
      <div className="mt-3 grid gap-[13px] md:grid-cols-2 2xl:grid-cols-3">{cards.map(category => <StreamCard key={category} category={category} followed={following && followed} onFollow={following ? onFollow : undefined} />)}</div>
    </section>
  )
}

export default function StreamingPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeIndex, setActiveIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [followed, setFollowed] = useState(true)
  const tab = STREAMING_TABS[activeIndex]

  return (
    <div className="relative px-4 py-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 4xl:py-6" data-streaming-page data-streaming-state={tab.toLowerCase()}>
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} menuOpen={sidebarOpen} breadcrumbItems={[{ label: 'Streaming', current: true }]} />
      <main className="pb-20 pt-10">
        <header className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div><div className="flex items-center gap-5"><h1 className="text-h1 font-normal text-white">Streaming</h1><StreamingLiveBadge /></div><div className="mt-8"><StreamingTabs activeIndex={activeIndex} onChange={setActiveIndex} /></div></div>
          <div className="xl:pt-4">
            <div className="flex flex-wrap items-center gap-3"><SecondaryButton className="min-w-[171px]">My streams</SecondaryButton><PrimaryPillButton className="min-w-[197px]">Start streaming</PrimaryPillButton></div>
            {tab === 'Browse' && <SearchInput value={query} onChange={setQuery} placeholder="Search streams, symbols.." ariaLabel="Search streaming content" className="mt-[19px] w-full xl:ml-auto xl:w-[393px]" />}
          </div>
        </header>

        {tab !== 'Home' && tab !== 'Browse' && <div className="mt-[34px] flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><SearchInput value={query} onChange={setQuery} placeholder="Search replays..." ariaLabel="Search streaming content" className="w-full max-w-[765px]" />{tab === 'Replays' && <div className="flex h-11 rounded-full border border-gfx-green-200 p-1 text-sm"><button className="rounded-full bg-[#F1FFFA] px-5 text-black">All replays</button><button className="px-5 text-gfx-neutral-400">♡ My favorites (0)</button></div>}</div>}
        {tab === 'Home' && <HomeState />}
        {tab === 'Browse' && <BrowseState />}
        {tab === 'Replays' && <CardsState followed={false} onFollow={() => {}} />}
        {tab === 'Following' && (followed ? <CardsState following followed={followed} onFollow={() => setFollowed(false)} /> : <div className="mt-[54px]"><StreamingEmptyState onBrowse={() => setActiveIndex(1)} /></div>)}
      </main>
    </div>
  )
}
