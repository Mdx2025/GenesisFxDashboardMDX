import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard, GlowEllipse } from '@/components/ui'
import { featuredEpisode, episodes } from '@/data/dailyNews'

/* ─── Icons ─── */

function PlayIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#606060" strokeWidth="1.5" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Hero Card ─── */

function HeroCard({ onVideoClick }: { onVideoClick: () => void }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden p-8">
      <img src="/images/news/card-glow-corner.png" alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0" aria-hidden="true" />
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-25 min-h-[441px]">
        {/* Video thumbnail */}
        <div className="relative w-full lg:w-[45%] min-h-[280px] lg:min-h-0 rounded-3xl overflow-hidden cursor-pointer" onClick={onVideoClick}>
          <img
            src={featuredEpisode.imageUrl}
            alt={featuredEpisode.title}
            className="w-full h-full object-cover"
          />

          {/* Play button */}
          <button className="absolute inset-0 flex items-center justify-center cursor-pointer group" aria-label="Play video">
            <div className="w-[76px] h-[76px] rounded-full bg-black/40 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-black/60 transition-colors">
              <PlayIcon size={32} />
            </div>
          </button>

          {/* Duration badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M12 7v5l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-white text-[13px] font-acid">{featuredEpisode.duration}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col justify-center px-8 lg:px-12 py-8 lg:py-10">
          {/* Decorative glow */}
          <GlowEllipse className="right-[10%] top-[20%]" />

          <h2 className="text-white text-[36px] font-acid font-normal leading-[1.05] relative">
            {featuredEpisode.title}
          </h2>

          <div className="mt-5 relative">
            <span className="inline-flex items-center justify-center px-[14px] py-[14px] rounded-[10px] bg-[#09241c] text-white text-[16px] font-acid font-medium">
              Latest episode
            </span>
          </div>

          <p className="text-white text-[16px] font-acid font-medium mt-6 relative">What's Covered</p>

          <ul className="mt-3 space-y-1.5 text-[#808080] text-[16px] font-acid leading-[1.2] list-disc pl-6 relative">
            <li>Key forex pair movements &amp; technical setups</li>
            <li>Major economic data releases &amp; impact analysis</li>
            <li>Commodities, indices &amp; crypto market outlook</li>
          </ul>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Episode Card ─── */

function EpisodeCard({ episode, onClick }: { episode: typeof episodes[0]; onClick: () => void }) {
  return (
    <div
      className="shrink-0 w-[440px] relative rounded-md overflow-hidden h-[310px] cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={episode.imageUrl}
        alt={episode.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(182deg, rgba(0,0,0,0) 30%, rgb(0,0,0) 98%)' }} />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[76px] h-[76px] rounded-full bg-black/40 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-black/60 transition-colors">
          <PlayIcon size={32} />
        </div>
      </div>

      {/* Info overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8">
        <h4 className="text-white text-[24px] font-acid font-normal leading-[1]">{episode.title}</h4>
        <div className="flex items-center gap-1.5 mt-2">
          <CalendarIcon />
          <span className="text-[#606060] text-[16px] font-acid font-medium">{episode.date}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Episodes Carousel ─── */

function EpisodesCarousel({ onEpisodeClick }: { onEpisodeClick: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const updateProgress = () => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => el.removeEventListener('scroll', updateProgress)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = 460
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {episodes.map(ep => (
          <EpisodeCard key={ep.id} episode={ep} onClick={onEpisodeClick} />
        ))}
      </div>

      {/* Progress bar + arrows */}
      <div className="flex items-center justify-between">
        {/* Progress bar */}
        <div className="relative h-[4px] w-[619px] max-w-[50%] rounded-full bg-[#064b34]">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-[#00b38c] transition-all duration-200"
            style={{ width: `${Math.max(30, scrollProgress * 100)}%` }}
          />
        </div>

        {/* Nav arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="w-[45px] h-[45px] rounded-full border border-[#00b38c] flex items-center justify-center cursor-pointer hover:bg-[#00b38c]/10 transition-colors"
            aria-label="Previous episodes"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-[45px] h-[45px] rounded-full border border-[#00b38c] flex items-center justify-center cursor-pointer hover:bg-[#00b38c]/10 transition-colors"
            aria-label="Next episodes"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */

export default function DailyNewsView() {
  const navigate = useNavigate()
  const goToSingle = () => navigate('/news/daily-single-page')

  return (
    <div className="flex flex-col gap-8">
      <HeroCard onVideoClick={goToSingle} />
      <EpisodesCarousel onEpisodeClick={goToSingle} />
    </div>
  )
}
