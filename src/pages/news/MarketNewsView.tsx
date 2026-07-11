import { GlassCard, GlowEllipse } from '@/components/ui'
import { heroArticle, secondaryArticles, listArticles } from '@/data/marketNews'
import type { NewsArticle } from '@/data/marketNews'

/* ─── Icons ─── */

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="white" strokeWidth="1.5" />
      <path d="M2 12H22" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#808080" strokeWidth="1.5" />
      <path d="M12 7V12L15 15" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CornerArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 14L20 9L15 4" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20V13C4 11.9391 4.42143 10.9217 5.17157 10.1716C5.92172 9.42143 6.93913 9 8 9H20" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Hero Card ─── */

function HeroCard({ article }: { article: NewsArticle }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative h-[510px] flex">
        {/* Left image — 100% height */}
        <div className="relative w-[50%] shrink-0">
          <img
            src="/images/news/trading-globe.png"
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c1311]" />
        </div>

        {/* Pixels pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
          <img src="/images/news/pixels-pattern.png" alt="" className="w-full h-full object-cover" />
        </div>

        {/* GlowEllipse bottom-center */}
        <GlowEllipse className="left-1/2 -translate-x-1/2 -bottom-[250px]" />

        {/* Content */}
        <div className="relative flex-1 flex flex-col justify-center px-12 py-10">
          {/* Region badge — right aligned, no border */}
          {article.region && (
            <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
              <GlobeIcon />
              <span className="text-white text-[14px] font-acid">{article.region}</span>
            </div>
          )}

          <h2 className="text-white text-[50px] font-acid font-normal leading-[1.05]">{article.title}</h2>

          <p className="text-[#808080] text-[16px] font-acid mt-4 leading-[1.5] max-w-[470px]">
            {article.description}
          </p>

          <div className="flex items-center gap-2 mt-6">
            <ClockIcon />
            <span className="text-[#808080] text-[14px] font-acid">{article.date}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Secondary Card ─── */

function SecondaryCard({ article }: { article: NewsArticle }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden flex-1 min-w-0">
      <div className="relative h-[315px] flex flex-col justify-end p-7">
        {/* Decorative glow */}
        <div className="absolute right-[10%] top-[10%] w-[300px] h-[200px] rounded-full bg-[#064b34] blur-[100px] opacity-25" aria-hidden="true" />

        {/* Category pills */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-4 py-1 rounded-full bg-[#09241c] text-[#ececec] text-[14px] font-acid">
            {article.category}
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10">
            <GlobeIcon />
            <span className="text-white text-[14px] font-acid">{article.category}</span>
          </span>
        </div>

        <h3 className="text-white text-[36px] font-acid font-normal leading-[1.1] max-w-[535px]">
          {article.title}
        </h3>

        <p className="text-[#808080] text-[16px] font-acid mt-3 leading-[1.5] max-w-[465px]">
          {article.description}
        </p>

        <div className="flex items-center gap-2 mt-4">
          <ClockIcon />
          <span className="text-[#808080] text-[14px] font-acid">{article.date}</span>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── List Card ─── */

function ListCard({ article }: { article: NewsArticle }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="flex justify-between items-start p-6 h-fit">
        {/* Left content */}
        <div className="flex flex-col h-full flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#00b38c] text-[16px] font-acid font-medium">{article.category}</span>
            {article.countryCode && (
              <>
                <span className="text-[#ececec] text-[16px] font-acid">{article.countryCode}</span>
                <span className="text-[#ececec] text-[16px] font-acid">{article.countryName}</span>
              </>
            )}
          </div>

          <h4 className="text-white text-[24px] font-acid font-normal leading-[1.2]">{article.title}</h4>

          <p className="text-[#808080] text-[16px] font-acid font-medium mt-3 leading-[1.5] max-w-[1115px]">
            {article.description}
          </p>
        </div>

        {/* Date + icon right */}
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[#a0a0a0] text-[16px] font-acid font-medium whitespace-nowrap">{article.date}</span>
          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <CornerArrowIcon />
          </button>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Main Component ─── */

export default function MarketNewsView() {
  return (
    <div className="flex flex-col gap-4">
      {/* Hero Article */}
      <HeroCard article={heroArticle} />

      {/* Secondary Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {secondaryArticles.map(article => (
          <SecondaryCard key={article.id} article={article} />
        ))}
      </div>

      {/* More Stories */}
      <h3 className="text-white text-[24px] font-acid font-normal mt-4">More stories</h3>

      {/* List Articles */}
      <div className="flex flex-col gap-4">
        {listArticles.map(article => (
          <ListCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
