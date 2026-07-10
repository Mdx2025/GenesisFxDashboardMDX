import { GlassCard } from '@/components/ui'
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

function ExternalLinkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Hero Card ─── */

function HeroCard({ article }: { article: NewsArticle }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative h-[510px] flex">
        {/* Background image */}
        <div className="absolute inset-0 w-[55%]">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0c1311]/70 to-[#0c1311]" />
        </div>

        {/* Decorative glow */}
        <div className="absolute right-[20%] top-[10%] w-[400px] h-[400px] rounded-full bg-[#064b34] blur-[120px] opacity-20" aria-hidden="true" />

        {/* Content */}
        <div className="relative ml-auto w-[50%] flex flex-col justify-center px-12 py-10">
          {/* Region badge */}
          {article.region && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 w-fit mb-6">
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
      <div className="flex items-start justify-between p-6 h-[245px]">
        <div className="flex flex-col justify-center h-full flex-1 min-w-0 pr-6">
          {/* Category + Country */}
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

          <div className="flex items-center gap-2 mt-4">
            <span className="text-[#a0a0a0] text-[16px] font-acid font-medium">{article.date}</span>
          </div>
        </div>

        <button className="shrink-0 mt-2 hover:opacity-80 transition-opacity cursor-pointer">
          <ExternalLinkIcon />
        </button>
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
