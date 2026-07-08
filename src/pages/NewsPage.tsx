import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { ModeToggle } from '@/components/ui'
import { FEATURED_ARTICLE, SECONDARY_ARTICLES, NEWS_LIST, NEWS_TABS } from '@/data/market-news'
import type { NewsArticle } from '@/data/market-news'

function EarthIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.33337C4.31811 1.33337 1.33334 4.31814 1.33334 8.00004C1.33334 11.6819 4.31811 14.6667 8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8 1.33337ZM7.33334 2.71538C5.15498 3.04874 3.42222 4.61071 2.84522 6.66671H5.50801C5.63498 5.27498 5.9713 3.89204 6.57137 2.83337H6.66667C6.89068 2.83337 7.11288 2.76771 7.33334 2.71538ZM8 3.66671C7.68534 3.66671 7.08534 4.68404 6.83868 6.66671H9.16134C8.91467 4.68404 8.31467 3.66671 8 3.66671ZM9.42867 2.83337C10.0287 3.89204 10.365 5.27498 10.492 6.66671H13.1548C12.5778 4.61071 10.845 3.04874 8.66667 2.71538C8.88714 2.76771 9.10934 2.83337 9.33334 2.83337H9.42867ZM13.1548 9.33337H10.492C10.365 10.7251 10.0287 12.108 9.42867 13.1667H9.33334C9.10934 13.1667 8.88714 13.2324 8.66667 13.2847C10.845 12.9514 12.5778 11.3894 13.1548 9.33337ZM9.16134 9.33337H6.83868C7.08534 11.316 7.68534 12.3334 8 12.3334C8.31467 12.3334 8.91467 11.316 9.16134 9.33337ZM5.50801 9.33337H2.84522C3.42222 11.3894 5.15498 12.9514 7.33334 13.2847C7.11288 13.2324 6.89068 13.1667 6.66667 13.1667H6.57137C5.9713 12.108 5.63498 10.7251 5.50801 9.33337Z" fill="white"/>
    </svg>
  )
}

function ClockIcon({ size = 21 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="8.5" stroke="#808080" strokeWidth="1.2"/>
      <path d="M10.5 6V10.5L13.5 13.5" stroke="#808080" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17 7L7 17" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 7H17V16" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SortIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7H21" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 12H18" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 17H14" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function FeaturedCard({ article }: { article: NewsArticle }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[2.2rem]" style={{ aspectRatio: '1547 / 510' }}>
      <div className="absolute inset-0 bg-[#0c1311]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#040b09] via-[#040b09]/80 to-transparent z-[2]" />
      <div className="absolute right-0 top-0 bottom-0 w-[60%] z-[1]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f17] to-[#0c1311]" />
        <div className="absolute bottom-0 right-0 w-[24.375rem] h-[13.5rem] rounded-full bg-[#064b34] blur-[12.375rem] opacity-60" />
      </div>
      <div className="relative z-[3] flex flex-col justify-end h-full p-8 lg:p-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-[0.44rem] px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-[0.875rem]">
            <EarthIcon size={16} />
            {article.region}
          </span>
        </div>
        <h2 className="text-white text-h1 max-w-[32.25rem] mb-3">{article.title}</h2>
        <p className="text-[#808080] text-[0.99rem] max-w-[29.3rem] leading-relaxed mb-4">{article.excerpt}</p>
        <div className="flex items-center gap-2">
          <span className="text-[#808080] text-[0.875rem]">{article.date}·{article.regionCode}</span>
        </div>
      </div>
    </div>
  )
}

function SecondaryCard({ article }: { article: NewsArticle }) {
  return (
    <div className="relative flex-1 min-w-0 overflow-hidden rounded-[1.65rem]" style={{ aspectRatio: '765 / 315' }}>
      <div className="absolute inset-0 bg-[#0c1311]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#040b09] via-[#040b09]/70 to-transparent z-[2]" />
      <div className="absolute right-0 top-0 bottom-0 w-[55%] z-[1]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f17] to-[#0c1311]" />
        <div className="absolute bottom-0 right-0 w-[14.375rem] h-[8.125rem] rounded-full bg-[#064b34] blur-[7.75rem] opacity-60" />
      </div>
      <div className="relative z-[3] flex flex-col justify-between h-full p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-[0.44rem] px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-[0.875rem]">
            <EarthIcon size={16} />
            {article.region}
          </span>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#09241c]">
            <span className="text-[#ececec] text-[0.875rem]">{article.category}</span>
          </div>
        </div>
        <div>
          <h3 className="text-white text-h3 mb-2">{article.title}</h3>
          <p className="text-[#808080] text-[0.99rem] leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
          <div className="flex items-center gap-2">
            <ClockIcon size={18} />
            <span className="text-[#808080] text-[0.875rem]">{article.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewsRow({ article }: { article: NewsArticle }) {
  return (
    <div className="relative bg-[#0c1311] rounded-[1.16rem] p-6 lg:p-8 shadow-md overflow-hidden group cursor-pointer hover:bg-[#0e1614] transition-colors">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gfx-green-500 text-body1 font-normal">{article.category}</span>
            <span className="text-[#ececec] text-body1 font-normal">{article.regionCode}</span>
            <span className="text-[#ececec] text-body1 font-normal">{article.region}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gfx-neutral-500 text-body1 font-normal">{article.date}</span>
            <ExternalLinkIcon />
          </div>
        </div>
        <h3 className="text-white text-h3 font-normal">{article.title}</h3>
        <p className="text-[#808080] text-body1 font-normal leading-relaxed line-clamp-3">{article.excerpt}</p>
      </div>
    </div>
  )
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          className={`w-[2.8125rem] h-[2.8125rem] rounded-full flex items-center justify-center text-h3 font-normal cursor-pointer transition-colors ${
            page === currentPage
              ? 'bg-gfx-green-500 text-white'
              : 'bg-transparent text-[#ececec] hover:bg-[#09241c]'
          }`}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default function NewsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Dashboard', href: '/home' },
          { label: 'Market News', current: true },
        ]}
      />

      <div className="flex flex-col gap-8 pb-12">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-h1 font-normal">Market News</h1>
            <button className="text-gfx-neutral-500 hover:text-white transition-colors cursor-pointer" aria-label="Sort articles">
              <SortIcon />
            </button>
          </div>

          {/* Tabs */}
          <ModeToggle
            options={[...NEWS_TABS]}
            defaultIndex={0}
            activeIndex={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Featured Article */}
        <FeaturedCard article={FEATURED_ARTICLE} />

        {/* Secondary Articles */}
        <div className="flex flex-col lg:flex-row gap-4">
          {SECONDARY_ARTICLES.map(article => (
            <SecondaryCard key={article.id} article={article} />
          ))}
        </div>

        {/* News List */}
        <div className="flex flex-col gap-4">
          {NEWS_LIST.map(article => (
            <NewsRow key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <h3 className="text-white text-h3 font-normal">More stories</h3>
          <Pagination currentPage={1} totalPages={3} />
        </div>
      </div>
    </>
  )
}
