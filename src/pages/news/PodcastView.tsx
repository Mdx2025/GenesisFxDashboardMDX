import { useState } from 'react'
import { GlassCard } from '@/components/ui'
import { podcastEpisodes } from '@/data/podcast'
import type { PodcastEpisode } from '@/data/podcast'

/* ─── Icons ─── */

function MicrophoneIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
      <rect x="8" y="2" width="8" height="12" rx="4" fill="#808080" opacity="0.3" />
      <rect x="9" y="3" width="6" height="10" rx="3" fill="#606060" />
      <path d="M5 11C5 14.866 8.134 18 12 18C15.866 18 19 14.866 19 11" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 18V22" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 22H15" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PlayIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <rect x="1" y="0" width="3" height="10" rx="1" fill="white" />
      <rect x="6" y="0" width="3" height="10" rx="1" fill="white" />
    </svg>
  )
}

function SkipBackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 20L9 12L19 4V20Z" fill="#808080" />
      <rect x="5" y="4" width="2" height="16" rx="1" fill="#808080" />
    </svg>
  )
}

function SkipForwardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 4L15 12L5 20V4Z" fill="#808080" />
      <rect x="17" y="4" width="2" height="16" rx="1" fill="#808080" />
    </svg>
  )
}

function RepeatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M17 2L21 6L17 10" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 22L3 18L7 14" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function VolumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="#808080" />
      <path d="M15.54 8.46a5 5 0 010 7.07" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.07 4.93a10 10 0 010 14.14" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Episode Card ─── */

function EpisodeCard({ episode, onPlay }: { episode: PodcastEpisode; onPlay: () => void }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="flex items-start p-8 h-[198px]">
        <div className="shrink-0 w-[70px] h-[70px] rounded-full border border-[#00b38c] flex items-center justify-center">
          <span className="text-[#10bc83] text-[35px] font-acid">{episode.id}</span>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0 ml-6">
          <span className="text-white text-[21px] font-acid">{episode.date}</span>
          <p className="text-[#808080] text-[16px] font-acid font-medium leading-[24.44px] max-w-[362px]">
            {episode.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-4">
          <span className="text-[#808080] text-[16px] font-acid">{episode.duration}</span>
          <button
            onClick={onPlay}
            className="relative w-[58px] h-[58px] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Play episode"
          >
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" className="absolute inset-0">
              <circle cx="29" cy="29" r="28.4" fill="url(#epPlayGrad)" stroke="#09241C" />
              <defs>
                <radialGradient id="epPlayGrad" cx="0" cy="0" r="1" gradientTransform="matrix(-13.96 49.11 -73.75 -161.35 37.98 1.74)" gradientUnits="userSpaceOnUse">
                  <stop offset="0.19" stopColor="#0C1311" />
                  <stop offset="0.73" stopColor="#09241C" />
                </radialGradient>
              </defs>
            </svg>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="relative z-10">
              <path d="M14.36 6.28C15.79 7.05 15.79 9.06 14.36 9.83L5.77 14.51C4.38 15.26 2.68 14.28 2.68 12.73V3.38C2.68 1.83 4.38 0.85 5.77 1.6L14.36 6.28Z" fill="#00B38C" />
            </svg>
          </button>
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Player Bar ─── */

function PlayerBar() {
  return (
    <div className="sticky bottom-0 z-40 bg-[#0d1512] border-t border-[rgba(16,185,129,0.12)] -mx-4 xl:-mx-5 2xl:-mx-7 3xl:-mx-10 4xl:-mx-14 px-8 py-5">
      <div className="mx-auto container flex items-center gap-6">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-[52px] h-[52px] rounded-[10px] bg-[#09241c] flex items-center justify-center">
          <span className="text-white text-[16px] font-acid">1</span>
        </div>
        <span className="text-white text-[16px] font-acid">10.02.2026</span>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-center">
        <button className="cursor-pointer hover:opacity-80 transition-opacity">
          <SkipBackIcon />
        </button>

        <button className="w-[32px] h-[32px] rounded-full bg-[#00b38c] flex items-center justify-center cursor-pointer hover:bg-[#10bc83] transition-colors">
          <PauseIcon />
        </button>

        <button className="cursor-pointer hover:opacity-80 transition-opacity">
          <SkipForwardIcon />
        </button>

        <button className="cursor-pointer hover:opacity-80 transition-opacity">
          <RepeatIcon />
        </button>
      </div>

      <div className="flex items-center gap-3 flex-1 max-w-[400px]">
        <span className="text-[#808080] text-[12px] font-acid shrink-0">2:45</span>
        <div className="flex-1 h-[4px] bg-[#09241c] rounded-full overflow-hidden">
          <div className="w-[46%] h-full bg-[#00b38c] rounded-full" />
        </div>
        <span className="text-[#808080] text-[12px] font-acid shrink-0">3:33</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button className="cursor-pointer hover:opacity-80 transition-opacity">
          <VolumeIcon />
        </button>
        <div className="w-[80px] h-[4px] bg-[#09241c] rounded-full overflow-hidden">
          <div className="w-[70%] h-full bg-[#00b38c] rounded-full" />
        </div>
      </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */

export default function PodcastView() {
  const [_playing, setPlaying] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-5">
      {/* Hero Card */}
      <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
        <div className="flex items-center h-[397px] p-8 relative">
          <div className="w-auto h-full flex items-center justify-center shrink-0">
            <img src="/images/news/podcast-mic.png" alt="Microphone" className="w-auto h-full" />
          </div>

          <div className="flex flex-col gap-4 px-8 py-10 relative z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-[#09241c] text-[#ececec] text-[14px] font-acid">
                Basics
              </span>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                <rect x="8" y="2" width="8" height="12" rx="4" fill="#808080" />
                <path d="M5 11C5 14.866 8.134 18 12 18C15.866 18 19 14.866 19 11" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 18V22" stroke="#808080" strokeWidth="1.5" />
              </svg>
              <span className="text-[#ececec] text-[16px] font-acid">5 episodes</span>
            </div>

            <h2 className="text-white text-[52px] font-acid leading-none">Deep Dive Podcast</h2>

            <p className="text-[#808080] text-[16px] font-acid leading-[24px] max-w-[725px]">
              Your daily dose of market clarity. The Deep Dive delivers sharp insights on stocks, crypto, commodities, and global trends—cutting through the noise to bring you what matters.
            </p>

            <span className="text-[#808080] text-[16px] font-acid">Total: 27 min</span>
          </div>
        </div>
      </GlassCard>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {podcastEpisodes.map(episode => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            onPlay={() => setPlaying(episode.id)}
          />
        ))}
      </div>

      {/* Player Bar */}
      <PlayerBar />
    </div>
  )
}
