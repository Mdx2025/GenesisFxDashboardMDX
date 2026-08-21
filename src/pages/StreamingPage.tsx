import { useMemo, useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import {
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
    <article className="relative h-[561px] overflow-hidden rounded-[18.563px] border border-gfx-green-200 bg-[#07100d]" data-featured-stream>
      <img src="/images/streaming-chart.png" alt="EURUSD trading chart" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-x-[19px] bottom-[26px] flex min-h-[111px] items-center rounded-[18px] border border-white/10 bg-[#07100d]/95 px-6 backdrop-blur-sm">
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
    </article>
  )
}

function ChatPanel() {
  return (
    <section className="surface-raised surface-raised-border h-[561px] rounded-[18.563px] border-[1.16px] p-[19px]" aria-label="Live chat" data-stream-chat>
      <header className="flex h-[49px] items-center gap-3 border-b border-gfx-green-200/60 px-1 text-white"><span aria-hidden="true">◯</span><h2 className="text-xl">Chat</h2><span className="ml-auto text-sm text-[#FF697C]">LIVE</span></header>
      <div className="relative mt-5 h-[448px] overflow-hidden rounded-[18px] border border-gfx-green-200 bg-gfx-green-800/40">
        <div className="absolute -top-64 left-0 h-[332px] w-[587px] rounded-full bg-[#064B34]/80 blur-[90px]" aria-hidden="true" />
        <div className="relative flex h-[68px] items-center justify-between border-b border-gfx-green-200/50 px-6 text-sm text-white"><span>Live Chat</span><span className="text-gfx-neutral-400">1 watching</span></div>
        <p className="relative mt-8 text-center text-sm text-gfx-neutral-400">Tshepang-Genesis joined</p>
        <div className="absolute inset-x-1 bottom-0 flex h-[70px] items-center rounded-[18px] border border-gfx-green-200 bg-gfx-green-800 px-7">
          <span className="text-sm text-gfx-neutral-500">Say something</span>
          <button className="ml-auto grid size-11 place-items-center rounded-full bg-[#F1FFFA] text-black" aria-label="Send message">➤</button>
        </div>
      </div>
    </section>
  )
}

function HomeState() {
  return (
    <div data-streaming-home>
      <div className="mt-[55px] grid gap-6 xl:grid-cols-[minmax(0,992px)_minmax(360px,532px)]"><FeaturedStream /><ChatPanel /></div>
      <section className="mt-[74px]"><SectionHeading>Top Live Categories</SectionHeading><div className="mt-8 grid grid-flow-col auto-cols-[255px] gap-[15px] overflow-x-auto pb-2">{CATEGORIES.map(([label, watching, live]) => <StreamingCategoryCard key={label} label={label} watching={watching} live={live} />)}</div></section>
      <section className="surface-raised surface-raised-border relative mt-5 flex min-h-[217px] max-w-[1529px] items-center overflow-hidden rounded-[18.563px] border-[1.16px] px-10 sm:px-16" data-prize-banner>
        <div className="absolute left-1/2 top-[-264px] h-[332px] w-[587px] rounded-full bg-[#064B34]/80 blur-[90px]" aria-hidden="true" />
        <span className="relative grid size-[79px] shrink-0 place-items-center rounded-[18px] border border-gfx-green-200 bg-gfx-green-800 text-4xl text-gfx-green-300">♕</span>
        <div className="relative ml-9"><h2 className="text-[30px] text-white">Win $10,000 Cash Prize</h2><p className="mt-5 text-xl text-gfx-neutral-400">Stream live • Compete • Get Paid</p></div>
        <PrimaryPillButton className="relative ml-auto min-w-[180px]">Enter Now</PrimaryPillButton>
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
