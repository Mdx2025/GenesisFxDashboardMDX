import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { ModeToggle, GlowEllipse, GlowButton } from '@/components/ui'
import MarketNewsView from '@/pages/news/MarketNewsView'
import EconomicCalendarView from '@/pages/news/EconomicCalendarView'
import TradeSessionsView from '@/pages/news/TradeSessionsView'
import PodcastView from '@/pages/news/PodcastView'
import DailyNewsView from '@/pages/news/DailyNewsView'

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

function LiveStreamIcon() {
  return (
    <div className="w-10 h-10 rounded-full border border-gfx-card-border flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.46689 4.39207C5.75949 4.68526 5.75902 5.16013 5.46583 5.45273C3.78722 7.128 2.75 9.44218 2.75 12C2.75 14.5878 3.81163 16.9262 5.52503 18.6059C5.82082 18.8959 5.82554 19.3707 5.53557 19.6665C5.24561 19.9623 4.77076 19.967 4.47497 19.677C2.48564 17.7269 1.25 15.0071 1.25 12C1.25 9.02783 2.45721 6.33616 4.40623 4.39102C4.69941 4.09842 5.17429 4.09889 5.46689 4.39207ZM18.6164 4.46446C18.9122 4.17449 19.387 4.17921 19.677 4.475C21.5771 6.41326 22.75 9.07043 22.75 12C22.75 14.9645 21.5491 17.6499 19.609 19.5938C19.3164 19.887 18.8415 19.8875 18.5484 19.5949C18.2552 19.3023 18.2547 18.8274 18.5473 18.5342C20.2182 16.86 21.25 14.5512 21.25 12C21.25 9.47873 20.2422 7.1943 18.6059 5.52507C18.3159 5.22928 18.3206 4.75443 18.6164 4.46446ZM8.30923 7.48757C8.59226 7.79001 8.57652 8.26462 8.27408 8.54765C7.32517 9.43564 6.75 10.6502 6.75 11.9822C6.75 13.3297 7.33869 14.5573 8.30756 15.4479C8.61251 15.7282 8.63248 16.2026 8.35216 16.5076C8.07185 16.8125 7.59739 16.8325 7.29244 16.5522C6.03967 15.4006 5.25 13.7824 5.25 11.9822C5.25 10.203 6.02148 8.60128 7.24916 7.45242C7.5516 7.16939 8.02621 7.18513 8.30923 7.48757ZM15.7429 7.52559C16.0292 7.22626 16.5039 7.21571 16.8033 7.50202C18.0005 8.64714 18.75 10.2286 18.75 11.9822C18.75 13.7568 17.9825 15.3548 16.7604 16.503C16.4586 16.7867 15.9839 16.7719 15.7003 16.47C15.4167 16.1681 15.4315 15.6935 15.7333 15.4099C16.6778 14.5225 17.25 13.3108 17.25 11.9822C17.25 10.6692 16.6911 9.47046 15.7664 8.58599C15.4671 8.29968 15.4566 7.82492 15.7429 7.52559Z" fill="white"/>
        <path d="M13.6563 10.4512C14.5521 11.1088 15 11.4376 15 12.0001C15 12.5625 14.5521 12.8913 13.6563 13.549C13.4091 13.7305 13.1638 13.9014 12.9384 14.0439C12.7407 14.1688 12.5168 14.2981 12.2849 14.425C11.3913 14.9141 10.9444 15.1586 10.5437 14.8879C10.1429 14.6171 10.1065 14.0503 10.0337 12.9167C10.0131 12.5961 10 12.2818 10 12.0001C10 11.7183 10.0131 11.404 10.0337 11.0834C10.1065 9.94982 10.1429 9.38301 10.5437 9.11226C10.9444 8.8415 11.3913 9.08605 12.2849 9.57515C12.5168 9.70203 12.7407 9.83129 12.9384 9.95625C13.1638 10.0987 13.4091 10.2696 13.6563 10.4512Z" fill="white"/>
      </svg>
    </div>
  )
}

function Card({ title, titleRight, children, className = '' }: { title: string; titleRight?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-[1.16rem] overflow-hidden relative flex flex-col min-h-0 ${className}`}>
      <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[250px]" />
      <div className="flex items-center justify-between px-[18px] py-5 border-b border-white/[0.04] relative z-[1] shrink-0">
        <h3 className="text-white text-body1 font-normal">{title}</h3>
        {titleRight}
      </div>
      <div className="relative z-[1] flex-1 min-h-0 overflow-y-auto">{children}</div>
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
      <div className="px-5 py-3 max-w-lg">
        <ModeToggle options={[...NEWS_CHANNELS]} activeIndex={channel} onChange={setChannel} size="sm" />
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
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-3 pt-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gfx-green-500" />
            <span className="text-gfx-neutral-500 text-xs">Bloomberg Television</span>
          </div>
          <p className="text-white text-body2 font-normal mb-0.5">Bloomberg Business News Live</p>
          <p className="text-gfx-neutral-500 text-xs">SK Hynix Seeks Access to AI Investors in $20B Raise</p>
        </div>
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
    <Card title="Live Webcams">
      <div className="px-5 py-3 flex justify-between items-center gap-6">
        <div className="max-w-lg flex-1">
          <ModeToggle options={[...WEBCAM_REGIONS]} activeIndex={region} onChange={setRegion} size="sm" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center cursor-pointer" aria-label="Grid view">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" fill="#10BC83"/><rect x="8" y="1" width="5" height="5" rx="1" fill="#10BC83"/><rect x="1" y="8" width="5" height="5" rx="1" fill="#10BC83"/><rect x="8" y="8" width="5" height="5" rx="1" fill="#10BC83"/></svg>
          </button>
          <button className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer" aria-label="List view">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="3" rx="1" stroke="#606060" strokeWidth="1"/><rect x="1" y="6" width="12" height="3" rx="1" stroke="#606060" strokeWidth="1"/><rect x="1" y="11" width="12" height="3" rx="1" stroke="#606060" strokeWidth="1"/></svg>
          </button>
        </div>
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
    <Card title="News Feed" className="flex-1">
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
    <Card title="Top movers" className="flex-1">
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
    <Card title="Economic Calendar" className="flex-1">
      <div className="flex flex-col h-full">
        {/* Preview row */}
        <div className="px-5 pt-3">
          <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-[#0a0f0d]">
            <span className="text-white text-xs font-medium">10:00</span>
            <span className="text-base">🇺🇸</span>
            <span className="text-gfx-neutral-500 text-xs">US</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="2.5" height="8" rx="0.5" fill="#ff4d6a"/><rect x="5.75" y="2" width="2.5" height="10" rx="0.5" fill="#e29d58"/><rect x="9.5" y="6" width="2.5" height="6" rx="0.5" fill="#10BC83"/>
            </svg>
            <span className="text-white text-xs">Riyad Bank PMI</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 2l5 4 5-4" stroke="#A0A0A0" strokeWidth="1.2" strokeLinecap="round"/></svg>
            <span className="text-white text-xs font-medium ml-auto">53.3</span>
            <span className="text-gfx-neutral-500 text-xs">—</span>
            <span className="text-gfx-neutral-500 text-xs">52.8</span>
          </div>
        </div>

        {/* Date label */}
        <div className="flex items-center gap-2 px-5 py-3">
          <span className="w-2 h-2 rounded-full bg-gfx-green-500" />
          <span className="text-white text-sm font-medium">Today, April 28</span>
        </div>

        {/* Table */}
        <div className="px-5 pb-4 flex-1 min-h-0 overflow-y-auto econ-calendar-scroll">
          <div className="grid grid-cols-[3.5rem_1fr_3rem_3rem_3rem] gap-x-4 text-[0.625rem] text-gfx-neutral-500 uppercase tracking-wider pb-2 border-b border-white/[0.06]">
            <span>Time</span>
            <span>Event</span>
            <span className="text-right">Act</span>
            <span className="text-right">FCST</span>
            <span className="text-right">PREV</span>
          </div>

          {[1, 2, 3, 4].map(i => (
            <div key={i} className="grid grid-cols-[3.5rem_1fr_3rem_3rem_3rem] gap-x-4 items-center py-3.5 border-b border-white/[0.04] last:border-0">
              <span className="text-white text-xs">10:00</span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm shrink-0">🇺🇸</span>
                <span className="text-gfx-neutral-500 text-xs shrink-0">US</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden="true">
                  <rect x="2" y="4" width="2.5" height="8" rx="0.5" fill="#ff4d6a"/><rect x="5.75" y="2" width="2.5" height="10" rx="0.5" fill="#e29d58"/><rect x="9.5" y="6" width="2.5" height="6" rx="0.5" fill="#10BC83"/>
                </svg>
                <span className="text-white text-xs truncate">Riyad Bank PMI</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="shrink-0"><path d="M1 1l4 4 4-4" stroke="#A0A0A0" strokeWidth="1" strokeLinecap="round"/></svg>
              </div>
              <span className="text-white text-xs text-right font-medium">53.3</span>
              <span className="text-gfx-neutral-500 text-xs text-right">—</span>
              <span className="text-gfx-neutral-500 text-xs text-right">52.8</span>
            </div>
          ))}
        </div>
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
      className="flex-1"
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
          <h1 className="text-white text-h1 font-normal">{activeTab === 1 || activeTab === 3 ? 'Market News' : 'Daily analysis'}</h1>
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
              <LiveStreamIcon />
              <GlowButton>Trade Now</GlowButton>
            </div>
          )}
        </div>

        {/* Terminal Tab (index 0) */}
        {activeTab === 0 && (
          <div className="flex flex-col gap-5">
            {/* Top Row: Live News + Live Webcams + AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_0.74fr] gap-5">
              <LiveNewsCard />
              <WebcamCard />
              <AIInsightsCard />
            </div>

            {/* Bottom Row: Live Quotes + News Feed + Top Movers */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.76fr_1fr_0.58fr] gap-5">
              <LiveQuotesCard />
              <div className="flex flex-col gap-5">
                <NewsFeedCard />
                <EconomicCalendarCard />
              </div>
              <div className="flex flex-col gap-5">
                <TopMoversCard />
                <TradeSessionsCard />
              </div>
            </div>
          </div>
        )}

        {/* Market News Tab (index 1) */}
        {activeTab === 1 && <MarketNewsView />}

        {/* Daily News Tab (index 2) */}
        {activeTab === 2 && <DailyNewsView />}

        {/* Economic Calendar Tab (index 3) */}
        {activeTab === 3 && <EconomicCalendarView />}

        {/* Trade Sessions Tab (index 4) */}
        {activeTab === 4 && <TradeSessionsView />}

        {/* Podcast Tab (index 5) */}
        {activeTab === 5 && <PodcastView />}
      </div>
    </div>
  )
}
