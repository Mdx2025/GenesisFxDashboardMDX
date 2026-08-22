import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import {
  ModeToggle,
  GlowEllipse,
  GlowButton,
  SearchInput,
  AiGradientPill,
  AiCreditBoltIcon,
  DiscoverPlayStreamButton,
  PrimaryPillButton,
} from '@/components/ui'
import DiscoverView from '@/pages/news/DiscoverView'
import MarketNewsView from '@/pages/news/MarketNewsView'
import EconomicCalendarView from '@/pages/news/EconomicCalendarView'
import TradeSessionsView from '@/pages/news/TradeSessionsView'
import PodcastView from '@/pages/news/PodcastView'
import AiAnalysisView from '@/pages/news/AiAnalysisView'

// Daily News is hidden from the tab bar; DailyNewsView stays in the codebase and
// its single-episode route (/news/daily-single-page) is still reachable.
const TABS = ['Discover', 'Terminal', 'Market News', 'AI analysis', 'Economic Calendar', 'Trade Sessions', 'Podcast'] as const
const TITLES = ['Market Watch', 'Daily analysis', 'Market News', 'Market Watch', 'Market News', 'Daily analysis', 'Daily analysis'] as const
const NEWS_CHANNELS =['Bloomberg', 'Sky News', 'CNBC', 'France24', 'AL JAZEERA', 'DW News'] as const
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
    <div className="news-live-stream-icon text-white w-10 h-10 rounded-full border border-gfx-card-border flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.46689 4.39207C5.75949 4.68526 5.75902 5.16013 5.46583 5.45273C3.78722 7.128 2.75 9.44218 2.75 12C2.75 14.5878 3.81163 16.9262 5.52503 18.6059C5.82082 18.8959 5.82554 19.3707 5.53557 19.6665C5.24561 19.9623 4.77076 19.967 4.47497 19.677C2.48564 17.7269 1.25 15.0071 1.25 12C1.25 9.02783 2.45721 6.33616 4.40623 4.39102C4.69941 4.09842 5.17429 4.09889 5.46689 4.39207ZM18.6164 4.46446C18.9122 4.17449 19.387 4.17921 19.677 4.475C21.5771 6.41326 22.75 9.07043 22.75 12C22.75 14.9645 21.5491 17.6499 19.609 19.5938C19.3164 19.887 18.8415 19.8875 18.5484 19.5949C18.2552 19.3023 18.2547 18.8274 18.5473 18.5342C20.2182 16.86 21.25 14.5512 21.25 12C21.25 9.47873 20.2422 7.1943 18.6059 5.52507C18.3159 5.22928 18.3206 4.75443 18.6164 4.46446ZM8.30923 7.48757C8.59226 7.79001 8.57652 8.26462 8.27408 8.54765C7.32517 9.43564 6.75 10.6502 6.75 11.9822C6.75 13.3297 7.33869 14.5573 8.30756 15.4479C8.61251 15.7282 8.63248 16.2026 8.35216 16.5076C8.07185 16.8125 7.59739 16.8325 7.29244 16.5522C6.03967 15.4006 5.25 13.7824 5.25 11.9822C5.25 10.203 6.02148 8.60128 7.24916 7.45242C7.5516 7.16939 8.02621 7.18513 8.30923 7.48757ZM15.7429 7.52559C16.0292 7.22626 16.5039 7.21571 16.8033 7.50202C18.0005 8.64714 18.75 10.2286 18.75 11.9822C18.75 13.7568 17.9825 15.3548 16.7604 16.503C16.4586 16.7867 15.9839 16.7719 15.7003 16.47C15.4167 16.1681 15.4315 15.6935 15.7333 15.4099C16.6778 14.5225 17.25 13.3108 17.25 11.9822C17.25 10.6692 16.6911 9.47046 15.7664 8.58599C15.4671 8.29968 15.4566 7.82492 15.7429 7.52559Z" fill="currentColor"/>
        <path d="M13.6563 10.4512C14.5521 11.1088 15 11.4376 15 12.0001C15 12.5625 14.5521 12.8913 13.6563 13.549C13.4091 13.7305 13.1638 13.9014 12.9384 14.0439C12.7407 14.1688 12.5168 14.2981 12.2849 14.425C11.3913 14.9141 10.9444 15.1586 10.5437 14.8879C10.1429 14.6171 10.1065 14.0503 10.0337 12.9167C10.0131 12.5961 10 12.2818 10 12.0001C10 11.7183 10.0131 11.404 10.0337 11.0834C10.1065 9.94982 10.1429 9.38301 10.5437 9.11226C10.9444 8.8415 11.3913 9.08605 12.2849 9.57515C12.5168 9.70203 12.7407 9.83129 12.9384 9.95625C13.1638 10.0987 13.4091 10.2696 13.6563 10.4512Z" fill="currentColor"/>
      </svg>
    </div>
  )
}

function Card({ title, titleRight, children, className = '' }: { title: string; titleRight?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-lg overflow-hidden relative flex flex-col min-h-0 ${className}`}>
      <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[250px]" />
      <div className="flex items-center justify-between px-4.5 py-5 border-b border-white/[0.04] relative z-base shrink-0">
        <h3 className="text-white text-body1 font-normal">{title}</h3>
        {titleRight}
      </div>
      <div className="relative z-base flex-1 min-h-0 overflow-y-auto">{children}</div>
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
            <span className="w-2 h-2 rounded-full bg-gfx-danger animate-pulse" />
            <span className="text-gfx-danger text-xs font-normal">LIVE</span>
          </div>
        </div>
      }
      className="row-span-1"
    >
      <div className="px-5 py-3 max-w-lg">
        <ModeToggle options={[...NEWS_CHANNELS]} activeIndex={channel} onChange={setChannel} size="sm" />
      </div>
      <div className="relative mx-5 mb-4 rounded-xl bg-gfx-surface-video aspect-video flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gfx-green-150 to-gfx-main" />
        <button className="relative z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/15 transition-colors" aria-label="Play video">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><rect x="5" y="4" width="3" height="10" rx="1"/><rect x="10" y="4" width="3" height="10" rx="1"/></svg>
        </button>
        <div className="absolute bottom-3 right-3 z-10">
          <svg width="72" height="16" viewBox="0 0 72 16" fill="none" aria-hidden="true">
            <rect width="72" height="16" rx="2" fill="#282828"/>
            <path d="M18.5 4l4.5 4-4.5 4V4z" fill="#FF0000"/>
            <text x="28" y="11.5" fill="white" fontSize="8" fontFamily="Acid Grotesk, sans-serif">YouTube</text>
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
          <div key={cam.id} className="relative rounded-xl overflow-hidden border border-[rgba(94,255,169,0.10)]">
            <img src="/images/news/nyc-webcam.webp" alt={cam.label} className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-3 left-3 z-10 flex flex-row items-center gap-2">
              {/* Fox5 logo */}
              <div className="relative shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#0C2C47" />
                </svg>
                <svg width="21" height="9" viewBox="0 0 21 9" fill="none" className="absolute left-[6px] top-3">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.61145 2.4519C6.79261 2.4519 6.93999 2.60172 7.04739 2.90744C7.15492 3.21624 7.20707 3.64125 7.20707 4.18234C7.20707 4.7144 7.1548 5.13941 7.04739 5.445C6.93999 5.75392 6.79249 5.9129 6.61145 5.9129C6.43018 5.9129 6.27981 5.75392 6.1631 5.43597C6.05569 5.12705 6.00342 4.70216 6.00342 4.18234C6.00342 3.64125 6.05569 3.21624 6.1631 2.90744C6.27969 2.60172 6.43018 2.4519 6.61145 2.4519ZM4.2223 4.18234C4.2223 5.03223 4.42494 5.68964 4.83952 6.14828C5.2572 6.61297 5.84375 6.84846 6.61145 6.84846C7.36686 6.84846 7.95341 6.61309 8.37097 6.14828C8.78555 5.68964 9.00036 5.03223 9.00036 4.18234C9.00036 3.3233 8.78543 2.66588 8.37097 2.1981C7.95329 1.74256 7.36686 1.50719 6.61145 1.50719C5.84375 1.50719 5.2572 1.74256 4.83952 2.1981C4.42494 2.666 4.2223 3.3233 4.2223 4.18234ZM9.75577 3.88577V4.1947L8.49676 6.86985H10.0659L10.7046 5.46651L11.1746 6.86985H12.7528L11.4939 4.1947V3.88577L12.7528 1.3696H11.1746L10.7046 2.76985L10.0659 1.3696H8.49687L9.75577 3.88577ZM0.948857 6.86973H2.36755V5.03223H3.79543V3.61986H2.53641V2.94106H4.05034V1.3696H0.948857V6.86973ZM0.224117 1.26266C0.245598 0.996632 0.331521 0.797972 0.491315 0.648144C0.65099 0.489168 0.853745 0.39447 1.10853 0.360845H13.4992V7.87575H1.10853C0.565066 7.81456 0.267198 7.53653 0.211945 7.03797L0.224117 1.26266ZM13.754 5.02011H15.9405C15.9495 5.2006 16.0571 5.32892 16.2383 5.41447C16.4195 5.50928 16.6989 5.55205 17.0705 5.55205C17.4236 5.55205 17.7 5.50001 17.8811 5.39308C18.0623 5.29826 18.1482 5.13929 18.1482 4.92518C18.1482 4.72343 18.0501 4.56445 17.8687 4.4574C17.6785 4.35344 17.3897 4.29842 17.0059 4.29842C16.8248 4.29842 16.6652 4.31066 16.5055 4.34108C16.3459 4.3747 16.1862 4.4176 16.048 4.46952H13.9997L14.5218 1.39075H19.9908V2.70854H15.8545L15.7471 3.30167C15.9868 3.22387 16.2337 3.1706 16.4842 3.14269C16.7704 3.10739 17.0586 3.09001 17.347 3.09065C18.3173 3.09065 19.0544 3.24963 19.5547 3.56758C20.0554 3.88554 20.3011 4.35332 20.3011 4.95869C20.3011 5.62513 20.0247 6.12653 19.4687 6.46599C18.9038 6.80533 18.0839 6.97346 17.0059 6.97346C15.8883 6.97346 15.0652 6.81448 14.5556 6.50877C14.0518 6.20032 13.7877 5.71103 13.754 5.02011ZM0 8.23956H20.9734V0H0V8.23956Z" fill="white" />
                </svg>
              </div>
              {/* Red glow dot + texts */}
              <div className="flex flex-row items-center gap-1">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
                  <g filter="url(#webcamLive)">
                    <rect x="8" y="8" width="6" height="6" rx="3" fill="#D46356" />
                  </g>
                  <defs>
                    <filter id="webcamLive" x="0" y="0" width="22" height="22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.831373 0 0 0 0 0.388235 0 0 0 0 0.337255 0 0 0 1 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                    </filter>
                  </defs>
                </svg>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-acid leading-5">{cam.label}</span>
                  <span className="text-gfx-neutral-400 text-xs font-acid leading-5">{cam.source}</span>
                </div>
              </div>
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
          <div className="relative w-[31px] h-[29px]">
            <svg width="31" height="29" viewBox="0 0 31 29" fill="none" className="absolute inset-0">
              <path d="M14.3408 0.390625H16.2959C23.9999 0.390625 30.2451 6.63682 30.2451 14.3408C30.2449 22.0446 23.9998 28.29 16.2959 28.29H14.3408C6.63695 28.29 0.390838 22.0446 0.390625 14.3408C0.390625 6.63682 6.63682 0.390625 14.3408 0.390625Z" stroke="#303030" strokeWidth="0.782205"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-[7.82px] top-[6.52px]">
              <path d="M7.82209 1.30469L9.83626 5.38519L14.3405 6.04355L11.0813 9.218L11.8504 13.7026L7.82209 11.5842L3.79373 13.7026L4.5629 9.218L1.30371 6.04355L5.80791 5.38519L7.82209 1.30469Z" stroke="#808080" strokeWidth="1.19504" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div className="flex items-center gap-1 text-gfx-neutral-500 text-xs">
            ALL
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
        </div>
      }
    >
      <div className="px-5 py-3">
        <SearchInput placeholder="Search for" />
      </div>
      <div className="px-5">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-x-3 text-tiny text-gfx-neutral-500 uppercase tracking-wider pb-2 border-b border-white/[0.04]">
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
        <div className="grid grid-cols-[3.5rem_1fr_4.5rem_2.5rem] gap-x-3 text-tiny text-gfx-neutral-500 uppercase tracking-wider py-3 border-b border-white/[0.04]">
          <span>Bias</span>
          <span>Headline</span>
          <span>Source</span>
          <span className="text-right">Age</span>
        </div>
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-[3.5rem_1fr_4.5rem_2.5rem] gap-x-3 items-center py-3 border-b border-white/[0.04] last:border-0">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-0.5 bg-gfx-neutral-500" />
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
          <div key={i} className="bg-gfx-surface-video rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gfx-green-500/10 flex items-center justify-center text-tiny">
                  {m.flag || m.icon}
                </span>
                <span className="text-white text-xs">{m.symbol}</span>
              </div>
              <span className={`text-xs ${m.positive ? 'text-gfx-green-500' : 'text-gfx-danger'}`}>
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

function ChartBarsIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.2929 2.29289C17 2.58579 17 3.05719 17 4V17C17 17.9428 17 18.4142 17.2929 18.7071C17.5858 19 18.0572 19 19 19C19.9428 19 20.4142 19 20.7071 18.7071C21 18.4142 21 17.9428 21 17V4C21 3.05719 21 2.58579 20.7071 2.29289C20.4142 2 19.9428 2 19 2C18.0572 2 17.5858 2 17.2929 2.29289Z" fill="#00B38C"/>
      <path d="M10 7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5C12.9428 5 13.4142 5 13.7071 5.29289C14 5.58579 14 6.05719 14 7V17C14 17.9428 14 18.4142 13.7071 18.7071C13.4142 19 12.9428 19 12 19C11.0572 19 10.5858 19 10.2929 18.7071C10 18.4142 10 17.9428 10 17V7Z" fill="#00B38C"/>
      <path d="M3.29289 9.29289C3 9.58579 3 10.0572 3 11V17C3 17.9428 3 18.4142 3.29289 18.7071C3.58579 19 4.05719 19 5 19C5.94281 19 6.41421 19 6.70711 18.7071C7 18.4142 7 17.9428 7 17V11C7 10.0572 7 9.58579 6.70711 9.29289C6.41421 9 5.94281 9 5 9C4.05719 9 3.58579 9 3.29289 9.29289Z" fill="#00B38C"/>
      <path d="M3 21.25C2.58579 21.25 2.25 21.5858 2.25 22C2.25 22.4142 2.58579 22.75 3 22.75H21C21.4142 22.75 21.75 22.4142 21.75 22C21.75 21.5858 21.4142 21.25 21 21.25H3Z" fill="#00B38C"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9L12 15L18 9" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function EconEventRow() {
  return (
    <div className="flex items-center gap-0 py-3 border-b border-gfx-green-900 last:border-0 pl-[23px] pr-5">
      <span className="text-white text-sm font-acid w-[86px] shrink-0">10:00</span>
      <span className="text-xl shrink-0 leading-5">🇺🇸</span>
      <span className="text-white text-sm font-acid ml-[10px] shrink-0">US</span>
      <span className="shrink-0 ml-[14px]"><ChartBarsIcon /></span>
      <span className="text-white text-sm font-acid ml-[22px] shrink-0">Riyad Bank  PMI</span>
      <span className="shrink-0 ml-[4px]"><ChevronDownIcon /></span>
      <span className="text-white text-sm font-acid ml-auto shrink-0">53.3</span>
      <span className="shrink-0 ml-[32px]">
        <svg width="19" height="1" viewBox="0 0 19 1" fill="none"><path d="M0 0.5H19" stroke="#A0A0A0"/></svg>
      </span>
      <span className="text-gfx-neutral-500 text-sm font-acid ml-[26px] shrink-0">52.8</span>
    </div>
  )
}

function EconomicCalendarCard() {
  return (
    <Card title="Economic Calendar" className="flex-1">
      <div className="relative flex flex-col h-full">
        {/* Top preview row */}
        <EconEventRow />

        {/* Date bar */}
        <div className="flex items-center gap-[21px] px-[35px] py-3.5 bg-gfx-green-900">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="5" fill="#00B38C"/></svg>
          <span className="text-white text-base font-acid">Today, April 28</span>
        </div>

        {/* Column headers */}
        <div className="flex items-center border-b border-gfx-green-900 pl-6 pr-5 py-3.5">
          <span className="text-gfx-neutral-500 text-sm font-acid w-[85px] shrink-0">Time</span>
          <span className="text-gfx-neutral-500 text-sm font-acid flex-1">Event</span>
          <span className="text-gfx-neutral-500 text-sm font-acid w-[55px] shrink-0">Act</span>
          <span className="text-gfx-neutral-500 text-sm font-acid w-[67px] shrink-0">FCST</span>
          <span className="text-gfx-neutral-500 text-sm font-acid shrink-0">PREV</span>
        </div>

        {/* Scrollable data rows */}
        <div className="flex-1 min-h-0 overflow-y-auto econ-calendar-scroll relative">
          {[1, 2, 3, 4, 5].map(i => (
            <EconEventRow key={i} />
          ))}

          {/* Custom scrollbar track bg */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gfx-green-900 rounded-full pointer-events-none" />
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
              <span className="text-gfx-neutral-500 text-tiny">{s.hours}</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className={`px-2.5 py-0.5 rounded text-tiny font-normal ${
                s.open
                  ? 'bg-gfx-green-500/15 text-gfx-green-500 border border-gfx-green-500/20'
                  : 'bg-gfx-danger/15 text-gfx-danger border border-gfx-danger/20'
              }`}>
                {s.open ? 'OPEN' : 'CLOSED'}
              </span>
              <span className="text-gfx-neutral-500 text-tiny">Opens Mon</span>
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
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 pt-4 4xl:pt-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Dashboard', href: '/home' },
          { label: 'Market News', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">
        {/* Title */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-h1 font-normal">{TITLES[activeTab]}</h1>
            {activeTab === 1 && <BullishBadge />}
            {(activeTab === 0 || activeTab === 3) && <AiGradientPill>AI</AiGradientPill>}
          </div>
          {(activeTab === 0 || activeTab === 3) && (
            <AiGradientPill>
              <AiCreditBoltIcon />
              152
            </AiGradientPill>
          )}
        </div>

        {/* Tabs + Trade Now */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <ModeToggle
              options={[...TABS]}
              defaultIndex={0}
              activeIndex={activeTab}
              onChange={setActiveTab}
            />
          </div>
          {activeTab === 0 && (
            <div className="hidden lg:flex items-center gap-[15px] shrink-0">
              <DiscoverPlayStreamButton />
              <PrimaryPillButton className="!w-[158px]">Trade</PrimaryPillButton>
            </div>
          )}
          {(activeTab === 1 || activeTab === 3) && (
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <LiveStreamIcon />
              <GlowButton label="Trade Now" width="auto" height={40} fontSize={14} />
            </div>
          )}
        </div>

        {/* Discover Tab (index 0) */}
        {activeTab === 0 && <DiscoverView />}

        {/* Terminal Tab (index 1) */}
        {activeTab === 1 && (
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

        {/* Market News Tab (index 2) */}
        {activeTab === 2 && <MarketNewsView />}

        {/* AI Analysis Tab (index 3) */}
        {activeTab === 3 && <AiAnalysisView />}

        {/* Economic Calendar Tab (index 4) */}
        {activeTab === 4 && <EconomicCalendarView />}

        {/* Trade Sessions Tab (index 5) */}
        {activeTab === 5 && <TradeSessionsView />}

        {/* Podcast Tab (index 6) */}
        {activeTab === 6 && <PodcastView />}
      </div>
    </div>
  )
}
