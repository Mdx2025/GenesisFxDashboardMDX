import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { ModeToggle } from '@/components/ui'
import MarketNewsView from '@/pages/news/MarketNewsView'

const TABS = ['Terminal', 'Market News', 'Daily News', 'Economic Calendar', 'Trade Sessions', 'Podcast'] as const
const NEWS_CHANNELS = ['Bloomberg', 'Sky News', 'CNBC', 'France24', 'AL JAZEERA', 'DW News'] as const
const WEBCAM_REGIONS = ['All', 'Middle East', 'Europe', 'Americas', 'Asia'] as const

function BullishBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gfx-green-500/20 bg-gfx-green-500/10 text-gfx-green-500 text-xs">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="1" y="7" width="2" height="4" rx="0.5" fill="currentColor"/>
        <rect x="5" y="4" width="2" height="7" rx="0.5" fill="currentColor"/>
        <rect x="9" y="1" width="2" height="10" rx="0.5" fill="currentColor"/>
      </svg>
      Bullish
    </span>
  )
}

function SignalIcon() {
  return (
    <div className="w-10 h-10 rounded-full border border-gfx-card-border flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="2" fill="#A0A0A0"/>
        <path d="M6.5 6.5a5 5 0 0 1 7 0" stroke="#A0A0A0" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M13.5 13.5a5 5 0 0 1-7 0" stroke="#A0A0A0" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M4.5 4.5a8 8 0 0 1 11 0" stroke="#A0A0A0" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M15.5 15.5a8 8 0 0 1-11 0" stroke="#A0A0A0" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function Card({ title, titleRight, children, className = '' }: { title: string; titleRight?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-[1.16rem] overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
        <h3 className="text-white text-body1 font-normal">{title}</h3>
        {titleRight}
      </div>
      {children}
    </div>
  )
}

function PillTabs({ options, active, onChange }: { options: readonly string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {options.map((opt, i) => (
        <button
          key={opt}
          onClick={() => onChange(i)}
          className={`px-3.5 py-1.5 rounded-full text-xs cursor-pointer transition-colors ${
            active === i
              ? 'bg-gfx-green-500/15 text-white border border-gfx-green-500/30'
              : 'text-gfx-neutral-500 hover:text-white'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function LiveNewsCard() {
  const [channel, setChannel] = useState(0)
  return (
    <Card
      title="Live News"
      titleRight={
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 13V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" stroke="#A0A0A0" strokeWidth="1.2"/>
            <path d="M13 7l3-2v8l-3-2" stroke="#A0A0A0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff4d6a] animate-pulse" />
            <span className="text-[#ff4d6a] text-xs font-normal">LIVE</span>
          </div>
        </div>
      }
      className="row-span-1"
    >
      <div className="px-5 py-3">
        <PillTabs options={NEWS_CHANNELS} active={channel} onChange={setChannel} />
      </div>
      <div className="relative mx-5 mb-4 rounded-xl bg-[#0a0f0d] aspect-video flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a14] to-[#080d0b]" />
        <button className="relative z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/15 transition-colors" aria-label="Play video">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><rect x="5" y="4" width="3" height="10" rx="1"/><rect x="10" y="4" width="3" height="10" rx="1"/></svg>
        </button>
        <div className="absolute bottom-3 right-3 z-10">
          <svg width="72" height="16" viewBox="0 0 72 16" fill="none" aria-hidden="true">
            <rect width="72" height="16" rx="2" fill="#282828"/>
            <path d="M18.5 4l4.5 4-4.5 4V4z" fill="#FF0000"/>
            <text x="28" y="11.5" fill="white" fontSize="8" fontFamily="sans-serif">YouTube</text>
          </svg>
        </div>
      </div>
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gfx-green-500" />
          <span className="text-gfx-neutral-500 text-xs">Bloomberg Television</span>
        </div>
        <p className="text-white text-body2 font-normal mb-0.5">Bloomberg Business News Live</p>
        <p className="text-gfx-neutral-500 text-xs">SK Hynix Seeks Access to AI Investors in $20B Raise</p>
      </div>
    </Card>
  )
}

function WebcamCard() {
  const [region, setRegion] = useState(0)
  const webcams = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    label: '24/7 NYC',
    source: 'Fox 5 New York',
  }))
  return (
    <Card
      title="Live Webcams"
      titleRight={
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center cursor-pointer" aria-label="Grid view">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" fill="#10BC83"/><rect x="8" y="1" width="5" height="5" rx="1" fill="#10BC83"/><rect x="1" y="8" width="5" height="5" rx="1" fill="#10BC83"/><rect x="8" y="8" width="5" height="5" rx="1" fill="#10BC83"/></svg>
          </button>
          <button className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer" aria-label="List view">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="3" rx="1" stroke="#606060" strokeWidth="1"/><rect x="1" y="6" width="12" height="3" rx="1" stroke="#606060" strokeWidth="1"/><rect x="1" y="11" width="12" height="3" rx="1" stroke="#606060" strokeWidth="1"/></svg>
          </button>
        </div>
      }
    >
      <div className="px-5 py-3">
        <PillTabs options={WEBCAM_REGIONS} active={region} onChange={setRegion} />
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-5">
        {webcams.map(cam => (
          <div key={cam.id} className="relative rounded-xl overflow-hidden bg-[#0a0f0d] aspect-[16/10]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a14] to-[#080d0b]" />
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#1a1a1a]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d6a]" />
                <span className="text-white text-[0.625rem] font-normal">{cam.label}</span>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 z-10">
              <span className="text-gfx-neutral-500 text-[0.625rem]">{cam.source}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function AIInsightsCard() {
  return (
    <Card
      title="AI Insights"
      titleRight={<span className="text-gfx-neutral-500 text-xs">Next in 13:32</span>}
    >
      <div className="px-5 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-gfx-neutral-500 text-xs">— NEUTRAL</span>
          <span className="text-gfx-neutral-500 text-xs">46m ago</span>
        </div>
        <p className="text-gfx-neutral-500 text-xs leading-relaxed">
          China's escalation of tariffs to 125% on U.S. goods and President Trump's threats against Mexico over water treaty violations have introduced a fresh layer of trade-war risk just as the U.S. Dollar Index struggles below the 100 level. While the reopening of the Strait of Hormuz has stabilized energy markets, these new protectionist measures threaten to offset the disinflationary benefits of lower oil prices.
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gfx-green-500" />
          <a href="#" className="text-gfx-green-500 text-xs hover:underline">China's 125% tariff hike on U.S. goods</a>
        </div>
      </div>
    </Card>
  )
}

function LiveQuotesCard() {
  const quotes = [
    { symbol: 'ADAUSD', bid: '0.19059', ask: '0.19071', spread: '1.2' },
    { symbol: 'ADAUSD', bid: '0.19059', ask: '0.19071', spread: '1.2' },
  ]
  return (
    <Card
      title="Live Quotes"
      titleRight={
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2l1.5 3.5L13 7l-3 2.5.5 4L8 11.5 5.5 13.5l.5-4L3 7l3.5-1.5L8 2z" stroke="#A0A0A0" strokeWidth="1" fill="none"/></svg>
          <div className="flex items-center gap-1 text-gfx-neutral-500 text-xs">
            ALL
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
        </div>
      }
    >
      <div className="px-5 py-3">
        <div className="relative">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" stroke="#606060" strokeWidth="1.2"/>
            <path d="M10 10l3 3" stroke="#606060" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input type="search" placeholder="Search for" className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0a0f0d] border border-gfx-card-border text-white text-xs placeholder:text-gfx-neutral-300 outline-none focus:border-gfx-green-500/30 transition-colors" />
        </div>
      </div>
      <div className="px-5">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-x-3 text-[0.625rem] text-gfx-neutral-500 uppercase tracking-wider pb-2 border-b border-white/[0.04]">
          <span />
          <span>Symbol</span>
          <span className="text-right">Bid</span>
          <span className="text-right">Ask</span>
          <span className="text-right">Spread</span>
          <span>Spark</span>
        </div>
        {quotes.map((q, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-x-3 items-center py-3 border-b border-white/[0.04] last:border-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2l1.2 2.8L11 6l-2.4 2 .5 3.2L7 9.5 4.9 11.2l.5-3.2L3 6l2.8-1.2L7 2z" stroke="#606060" strokeWidth="0.8" fill="none"/></svg>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-gfx-green-500/20 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-gfx-green-500" />
              </span>
              <span className="text-white text-xs">{q.symbol}</span>
            </div>
            <span className="text-white text-xs text-right">{q.bid}</span>
            <span className="text-white text-xs text-right">{q.ask}</span>
            <span className="text-white text-xs text-right">{q.spread}</span>
            <div className="w-14 h-5">
              <svg viewBox="0 0 56 20" className="w-full h-full">
                <polyline points="0,15 8,12 16,18 24,8 32,14 40,6 48,10 56,4" fill="none" stroke="#ff4d6a" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function NewsFeedCard() {
  const items = Array.from({ length: 4 }, () => ({
    bias: 'NTRL',
    headline: 'Three sons of Iran\'s slain leader Khamenei ap...',
    source: 'Reuters',
    age: '2h',
  }))
  return (
    <Card title="News Feed">
      <div className="px-5">
        <div className="grid grid-cols-[3.5rem_1fr_4.5rem_2.5rem] gap-x-3 text-[0.625rem] text-gfx-neutral-500 uppercase tracking-wider py-3 border-b border-white/[0.04]">
          <span>Bias</span>
          <span>Headline</span>
          <span>Source</span>
          <span className="text-right">Age</span>
        </div>
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-[3.5rem_1fr_4.5rem_2.5rem] gap-x-3 items-center py-3 border-b border-white/[0.04] last:border-0">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-[2px] bg-gfx-neutral-500" />
              <span className="text-gfx-neutral-500 text-xs">{item.bias}</span>
            </div>
            <span className="text-white text-xs truncate">{item.headline}</span>
            <a href="#" className="text-gfx-green-500 text-xs hover:underline">{item.source}</a>
            <span className="text-gfx-neutral-500 text-xs text-right">{item.age}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function TopMoversCard() {
  const movers = [
    { symbol: 'XAGUSD', change: '+2.41%', price: '62.4', positive: true, icon: '🥈' },
    { symbol: 'XPTUSD', change: '-1.56%', price: '1653.5', positive: false, icon: '🪙' },
    { symbol: 'XAGUSD', change: '+2.41%', price: '62.4', positive: true, icon: '🥈' },
    { symbol: 'USDHUF', change: '+0.54%', price: '311.763', positive: true, flag: '🇭🇺' },
  ]
  return (
    <Card title="Top movers">
      <div className="grid grid-cols-2 gap-3 p-5">
        {movers.map((m, i) => (
          <div key={i} className="bg-[#0a0f0d] rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gfx-green-500/10 flex items-center justify-center text-[0.625rem]">
                  {m.flag || m.icon}
                </span>
                <span className="text-white text-xs">{m.symbol}</span>
              </div>
              <span className={`text-xs ${m.positive ? 'text-gfx-green-500' : 'text-[#ff4d6a]'}`}>
                {m.change}
              </span>
            </div>
            <span className="text-white text-body1 font-normal">{m.price}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function EconomicCalendarCard() {
  return (
    <Card title="Economic Calendar">
      <div className="px-5 py-3">
        <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-[#0a0f0d] mb-3">
          <span className="text-white text-xs">10:00</span>
          <span className="text-base">🇺🇸</span>
          <span className="text-xs">US</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="2" y="4" width="2.5" height="8" rx="0.5" fill="#ff4d6a"/><rect x="5.75" y="2" width="2.5" height="10" rx="0.5" fill="#e29d58"/><rect x="9.5" y="6" width="2.5" height="6" rx="0.5" fill="#10BC83"/>
          </svg>
          <span className="text-white text-xs">Riyad Bank PMI</span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 2l5 4 5-4" stroke="#A0A0A0" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span className="text-white text-xs ml-auto">53.3</span>
          <span className="text-gfx-neutral-500 text-xs">—</span>
          <span className="text-white text-xs">52.8</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-gfx-green-500" />
          <span className="text-white text-body2 font-normal">Today, April 28</span>
        </div>

        <div className="grid grid-cols-[3rem_1fr_2.5rem_2.5rem_2.5rem] gap-x-3 text-[0.625rem] text-gfx-neutral-500 uppercase tracking-wider pb-2 border-b border-white/[0.04]">
          <span>Time</span>
          <span>Event</span>
          <span className="text-right">Act</span>
          <span className="text-right">FCST</span>
          <span className="text-right">PREV</span>
        </div>

        {[1, 2, 3].map(i => (
          <div key={i} className="grid grid-cols-[3rem_1fr_2.5rem_2.5rem_2.5rem] gap-x-3 items-center py-3 border-b border-white/[0.04] last:border-0">
            <span className="text-white text-xs">10:00</span>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm shrink-0">🇺🇸</span>
              <span className="text-xs shrink-0">US</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden="true">
                <rect x="2" y="4" width="2.5" height="8" rx="0.5" fill="#ff4d6a"/><rect x="5.75" y="2" width="2.5" height="10" rx="0.5" fill="#e29d58"/><rect x="9.5" y="6" width="2.5" height="6" rx="0.5" fill="#10BC83"/>
              </svg>
              <span className="text-white text-xs truncate">Riyad Bank PMI</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="shrink-0"><path d="M1 1l4 4 4-4" stroke="#A0A0A0" strokeWidth="1" strokeLinecap="round"/></svg>
            </div>
            <span className="text-white text-xs text-right">53.3</span>
            <span className="text-gfx-neutral-500 text-xs text-right">—</span>
            <span className="text-white text-xs text-right">52.8</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function TradeSessionsCard() {
  const sessions = [
    { city: 'Sydney', hours: '07:00 - 16:00', open: false },
    { city: 'Sydney', hours: '07:00 - 16:00', open: false },
    { city: 'New York', hours: '07:00 - 16:00', open: true },
    { city: 'Sydney', hours: '07:00 - 16:00', open: false },
  ]
  return (
    <Card
      title="Trade Sessions"
      titleRight={<span className="text-gfx-neutral-500 text-xs">0/4 Open</span>}
    >
      <div className="px-5 pb-2">
        {sessions.map((s, i) => (
          <div key={i} className="flex items-center justify-between py-3.5 border-b border-white/[0.04] last:border-0">
            <div className="flex flex-col gap-0.5">
              <span className="text-white text-xs font-normal">{s.city}</span>
              <span className="text-gfx-neutral-500 text-[0.625rem]">{s.hours}</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className={`px-2.5 py-0.5 rounded text-[0.625rem] font-normal ${
                s.open
                  ? 'bg-gfx-green-500/15 text-gfx-green-500 border border-gfx-green-500/20'
                  : 'bg-[#ff4d6a]/15 text-[#ff4d6a] border border-[#ff4d6a]/20'
              }`}>
                {s.open ? 'OPEN' : 'CLOSED'}
              </span>
              <span className="text-gfx-neutral-500 text-[0.625rem]">Opens Mon</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function NewsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Dashboard', href: '/home' },
          { label: 'Market News', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 pb-12 mt-6 3xl:mt-8 4xl:mt-10">
        {/* Title */}
        <div className="flex items-center gap-4">
          <h1 className="text-white text-h1 font-normal">{activeTab === 1 ? 'Market News' : 'Daily analysis'}</h1>
          {activeTab === 0 && <BullishBadge />}
        </div>

        {/* Tabs + Trade Now */}
        <div className="flex items-center justify-between gap-4">
          <div className="w-4xl">
            <ModeToggle
              options={[...TABS]}
              defaultIndex={0}
              activeIndex={activeTab}
              onChange={setActiveTab}
            />
          </div>
          {activeTab === 0 && (
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <SignalIcon />
              <button className="px-6 py-2.5 rounded-full border border-gfx-green-500 text-gfx-green-500 text-sm font-normal cursor-pointer hover:bg-gfx-green-500/10 transition-colors">
                Trade Now
              </button>
            </div>
          )}
        </div>

        {/* Terminal Tab (index 0) */}
        {activeTab === 0 && (
          <>
            {/* Top Row: Live News + Live Webcams + AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_0.75fr] gap-4">
              <LiveNewsCard />
              <WebcamCard />
              <AIInsightsCard />
            </div>

            {/* Bottom Row: Live Quotes + News Feed + Top Movers */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr_0.8fr] gap-4">
              <LiveQuotesCard />
              <div className="flex flex-col gap-4">
                <NewsFeedCard />
                <EconomicCalendarCard />
              </div>
              <div className="flex flex-col gap-4">
                <TopMoversCard />
                <TradeSessionsCard />
              </div>
            </div>
          </>
        )}

        {/* Market News Tab (index 1) */}
        {activeTab === 1 && <MarketNewsView />}
      </div>
    </div>
  )
}
