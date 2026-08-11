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
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.5808 8.7904C17.5808 13.6452 13.6452 17.5808 8.7904 17.5808C3.93559 17.5808 0 13.6452 0 8.7904C0 3.93559 3.93559 0 8.7904 0C13.6452 0 17.5808 3.93559 17.5808 8.7904Z" fill="#808080"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.7904 4.61496C9.15451 4.61496 9.44968 4.91013 9.44968 5.27424V8.51731L11.4542 10.5218C11.7116 10.7793 11.7116 11.1967 11.4542 11.4542C11.1967 11.7116 10.7793 11.7116 10.5218 11.4542L8.32422 9.25658C8.20058 9.13294 8.13112 8.96525 8.13112 8.7904V5.27424C8.13112 4.91013 8.42629 4.61496 8.7904 4.61496Z" fill="black"/>
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
      <div className="relative min-h-[300px] lg:h-[510px] flex flex-col lg:flex-row">
        {/* Left image */}
        <div className="relative w-full lg:w-[50%] h-[200px] lg:h-auto shrink-0">
          <img
            src="/images/news/trading-globe.webp"
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gfx-green-800" />
        </div>

        {/* Glow background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <img src="/images/news/hero-glow-bg.webp" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col px-4 sm:px-8 lg:px-12 py-6 lg:py-10">
          {/* Region badge — in-flow, right aligned */}
          {article.region && (
            <div className="flex justify-end">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
                <GlobeIcon />
                <span className="text-white text-sm font-acid">{article.region}</span>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-5xl font-acid font-normal leading-none">{article.title}</h2>

          <p className="text-gfx-neutral-400 text-sm sm:text-base font-acid mt-4 leading-normal max-w-full lg:max-w-[470px]">
            {article.description}
          </p>

          <div className="flex items-center gap-2 mt-6">
            <ClockIcon />
            <span className="text-gfx-neutral-400 text-sm font-acid">{article.date}</span>
          </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Icons ─── */

function CommodityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8.85819 12.0508C9.50962 10.8232 11.6811 10.8232 11.6811 10.8232C13.9437 10.7996 14.2494 9.42578 14.4537 8.73141C14.088 11.6859 11.7676 14.0345 8.82658 14.443C8.61388 13.9954 8.36193 12.986 8.85819 12.0508Z" fill="white"/>
      <path d="M3.30017 3.84792L3.02878 3.61582C3.00619 3.59649 2.98458 3.57625 2.96399 3.55517C1.93974 4.71701 1.31836 6.24249 1.31836 7.91311C1.31836 11.5133 4.20407 14.4395 7.78864 14.5048C7.55567 13.8094 7.40368 12.6823 7.9847 11.5874C8.5188 10.5809 9.59339 10.1847 10.2779 10.0164C10.6516 9.92458 10.9951 9.8798 11.2433 9.85753C11.3685 9.84629 11.4725 9.84053 11.5475 9.83756C11.5851 9.83608 11.6156 9.83528 11.6381 9.83486L11.6659 9.83447L11.6733 9.83442C12.5836 9.82444 12.9369 9.55577 13.0999 9.37224C13.3016 9.1452 13.3807 8.87595 13.4908 8.50099L13.505 8.4524C13.6357 8.0085 14.0527 7.72144 14.5018 7.74371C14.4604 6.10241 13.8192 4.61014 12.7891 3.47791C12.7683 3.59507 12.7434 3.70398 12.7187 3.80041C12.6069 4.23657 12.4192 4.70713 12.1889 5.0567C11.9634 5.39881 11.563 5.70449 11.2969 5.89573C11.096 6.04005 10.8907 6.15994 10.7216 6.25744L10.6608 6.29239C10.5081 6.38027 10.3866 6.45026 10.271 6.52664C10.0363 6.6817 9.89549 6.81942 9.8001 7.00602C9.85817 7.21849 9.89937 7.46267 9.90003 7.71803C9.9016 8.32555 9.59063 8.80557 9.21891 9.10515C8.85323 9.39986 8.38003 9.56648 7.90059 9.56125C5.95584 9.54002 4.81516 7.95355 4.66828 6.31871C4.62557 5.84337 4.41173 5.33119 4.11291 4.85397C3.8223 4.38986 3.49382 4.02648 3.30017 3.84792Z" fill="white"/>
      <path d="M5.65323 6.23021C5.52977 4.85613 4.47011 3.57574 3.95571 3.10731L3.67155 2.86427C4.81776 1.90072 6.29679 1.32031 7.91139 1.32031C9.37063 1.32031 10.7191 1.7944 11.8113 2.59696C11.9656 3.06539 11.6717 4.04418 11.3631 4.51261C11.2513 4.68229 10.9977 4.89294 10.7198 5.09262C10.0932 5.54284 9.30239 5.76553 8.90031 6.59455C8.78537 6.83153 8.79028 7.06319 8.84557 7.26455C8.88531 7.40932 8.91072 7.56668 8.91112 7.72058C8.9124 8.21829 8.40907 8.57782 7.91139 8.57239C6.61637 8.55825 5.76863 7.5146 5.65323 6.23021Z" fill="white"/>
    </svg>
  )
}

/* ─── Secondary Card ─── */

function SecondaryCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden flex-1 min-w-0">
      <div className="relative h-fit flex flex-col justify-center px-7 py-10">
        <GlowEllipse className={index === 0 ? '-top-[6rem] -right-[4rem]' : '-top-[6rem] -left-[4rem]'} />
        <img src="/images/news/card-glow-corner.png" alt="" className="absolute bottom-0 right-0 pointer-events-none" aria-hidden="true" loading="lazy" />

        <div className="relative z-10">
          {/* Category + Commodity icon */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gfx-neutral-600 text-sm font-acid">
              {article.category}
            </span>
            <span className="flex items-center gap-2">
              <CommodityIcon />
              <span className="text-white text-sm font-acid">{article.category}</span>
            </span>
          </div>

          <h3 className="text-white text-xl sm:text-2xl lg:text-4xl font-acid font-normal leading-tight max-w-full lg:max-w-[535px]">
            {article.title}
          </h3>

          <p className="text-gfx-neutral-400 text-base font-acid mt-3 leading-normal max-w-[465px]">
            {article.description}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <ClockIcon />
            <span className="text-gfx-neutral-400 text-sm font-acid">{article.date}</span>
          </div>
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
            <span className="text-gfx-green-300 text-base font-acid font-medium">{article.category}</span>
            {article.countryCode && (
              <>
                <span className="text-gfx-neutral-600 text-base font-acid">{article.countryCode}</span>
                <span className="text-gfx-neutral-600 text-base font-acid">{article.countryName}</span>
              </>
            )}
          </div>

          <h4 className="text-white text-lg sm:text-xl lg:text-2xl font-acid font-normal leading-tight">{article.title}</h4>

          <p className="text-gfx-neutral-400 text-sm sm:text-base font-acid font-medium mt-3 leading-normal">
            {article.description}
          </p>
        </div>

        {/* Date + icon right */}
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-gfx-neutral-500 text-base font-acid font-medium whitespace-nowrap">{article.date}</span>
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
        {secondaryArticles.map((article, i) => (
          <SecondaryCard key={article.id} article={article} index={i} />
        ))}
      </div>

      {/* More Stories */}
      <h3 className="text-white text-2xl font-acid font-normal mt-4">More stories</h3>

      {/* List Articles */}
      <div className="flex flex-col gap-4">
        {listArticles.map(article => (
          <ListCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
