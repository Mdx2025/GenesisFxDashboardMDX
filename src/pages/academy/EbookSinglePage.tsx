import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { SparkleButton, GlowButton } from '@/components/ui'
import { EBOOK_DETAILS } from '@/data/academy-ebook-chapters'
import type { EbookChapter } from '@/data/academy-ebook-chapters'

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M15.233 7.617a7.617 7.617 0 1 1-15.233 0 7.617 7.617 0 0 1 15.233 0Z" fill="#404040" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.616 3.999a.571.571 0 0 1 .571.57v2.81l1.737 1.738a.571.571 0 1 1-.808.808L7.212 8.02a.571.571 0 0 1-.167-.403V4.57a.571.571 0 0 1 .57-.571Z" fill="black" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" fill="currentColor" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59Z" fill="currentColor" />
    </svg>
  )
}

function ChapterItem({ chapter, isActive, onClick }: { chapter: EbookChapter; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-md overflow-hidden flex items-center gap-3 px-3 py-3.5 cursor-pointer transition-colors text-left ${
        isActive
          ? 'bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.3)]'
          : 'hover:bg-gfx-green-800/50'
      }`}
    >
      {isActive && (
        <div className="theme-decorative-glow absolute -left-[5rem] bottom-[-20px] w-[10.6250rem] h-[7.5rem] rounded-full bg-gfx-green-200 [filter:url(#blur-40)] opacity-40 pointer-events-none" />
      )}
      <div className="w-[1.5rem] h-6 rounded-sm bg-gfx-green-800 flex items-center justify-center shrink-0">
        <span className={`text-xs font-acid leading-none ${isActive ? 'text-gfx-green-300' : 'text-gfx-neutral-400'}`}>
          {chapter.id}
        </span>
      </div>
      <span className={`text-sm font-acid leading-5 ${isActive ? 'text-white' : 'text-gfx-neutral-400'}`}>
        {chapter.title}
      </span>
    </button>
  )
}

export default function EbookSinglePage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const ebookId = searchParams.get('ebook') || 'crypto-1'
  const ebook = EBOOK_DETAILS[ebookId] || EBOOK_DETAILS['crypto-1']
  const totalChapters = ebook.chapters.length

  const [activeChapter, setActiveChapter] = useState(1)
  const currentChapter = ebook.chapters.find(c => c.id === activeChapter) || ebook.chapters[0]
  const completedCount = 0
  const progress = Math.round((completedCount / totalChapters) * 100)

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[37.5000rem] h-[18.75rem] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative flex flex-col h-full">
        <div className="px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
          <TopBar
            menuOpen={sidebarOpen}
            onMenuClick={() => setSidebarOpen(v => !v)}
            breadcrumbItems={[
              { label: 'Genesis Academy', onClick: () => navigate('/academy') },
              { label: 'E-Books', onClick: () => navigate('/academy') },
              { label: ebook.title },
              { label: `Chapter ${activeChapter}`, current: true },
            ]}
          />
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chapter Contents Panel */}
          <div className="hidden xl:flex flex-col w-[17.5000rem] 3xl:w-[20rem] shrink-0 px-5 pb-6">
            <div className="mb-2">
              <p className="text-xs font-acid-bold text-gfx-neutral-500 tracking-tab uppercase leading-4">
                CHAPTERS
              </p>
              <p className="text-xs font-acid text-gfx-neutral-400 leading-5 mt-1">
                {completedCount} of {totalChapters} chapters completed
              </p>
            </div>

            <div className="h-1 bg-gfx-green-900 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gfx-green-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progress, 0)}%` }}
              />
            </div>

            <div className="flex flex-col gap-0 overflow-y-auto flex-1 -mx-1 px-1">
              {ebook.chapters.map(chapter => (
                <ChapterItem
                  key={chapter.id}
                  chapter={chapter}
                  isActive={chapter.id === activeChapter}
                  onClick={() => setActiveChapter(chapter.id)}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 px-4 xl:px-0 xl:pr-5 2xl:pr-7 3xl:pr-10 4xl:pr-14 pb-4 overflow-y-auto">
            {/* Cover Image */}
            <div className="relative w-full rounded-lg overflow-hidden aspect-[1228/360]">
              <img
                src={ebook.image}
                alt={ebook.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gfx-green-500 mix-blend-color opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Title + Tags */}
            <div className="mt-6">
              <h1 className="text-white text-card-value font-acid leading-tight">
                {ebook.title}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="inline-flex items-center h-[1.75rem] px-4 rounded-full bg-gfx-green-900 border border-gfx-green-300">
                  <span className="text-xs font-acid text-gfx-green-300 leading-5">
                    Chapter {activeChapter}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 h-[1.75rem] px-3 rounded-full bg-gfx-green-800 border border-gfx-green-900">
                  <ClockIcon />
                  <span className="text-xs font-acid text-gfx-neutral-400 leading-5">
                    {ebook.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="flex flex-col gap-4 mt-6">
              {ebook.sections.map((section, i) => (
                <div
                  key={i}
                  className="bg-gfx-green-800 border border-[rgba(255,255,255,0.05)] rounded-lg p-6"
                >
                  <h3 className="text-white text-base font-acid-medium leading-6 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gfx-neutral-400 text-sm font-acid leading-5">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-gfx-neutral-400 text-xs font-acid leading-5 mt-6 mb-4">
              Any news, opinions, research, data, or other information contained within this e-book is provided as general market commentary and does not constitute investment or trading advice. We expressly disclaim any liability for any lost principal or profits without limitation which may arise directly or indirectly from the use of or reliance on such information.
            </p>

            {/* Mobile chapter list */}
            <div className="xl:hidden mt-6">
              <p className="text-xs font-acid-bold text-gfx-neutral-500 tracking-tab uppercase leading-4 mb-2">
                CHAPTERS
              </p>
              <p className="text-xs font-acid text-gfx-neutral-400 leading-5 mb-4">
                {completedCount} of {totalChapters} chapters completed
              </p>
              <div className="h-1 bg-gfx-green-900 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-gfx-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(progress, 0)}%` }}
                />
              </div>
              <div className="flex flex-col gap-0">
                {ebook.chapters.map(chapter => (
                  <ChapterItem
                    key={chapter.id}
                    chapter={chapter}
                    isActive={chapter.id === activeChapter}
                    onClick={() => setActiveChapter(chapter.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="shrink-0 border-t border-gfx-neutral-250 bg-gfx-green-800 px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14">
          <div className="flex items-center justify-between h-[5.5rem] gap-4">
            <button
              type="button"
              onClick={() => setActiveChapter(prev => Math.max(1, prev - 1))}
              className="flex items-center gap-2 text-gfx-neutral-500 text-base font-acid leading-6 cursor-pointer shrink-0 bg-transparent border-none hover:text-white transition-colors"
            >
              <ChevronLeftIcon /> Previous
            </button>

            <div className="flex flex-row items-center gap-8 shrink-0">
              <div className="hidden sm:flex flex-col items-end gap-0.5">
                <span className="text-sm font-acid text-gfx-neutral-400 leading-5">PROGRESS</span>
                <span className="text-base font-acid-medium text-white leading-6">{progress}%</span>
                <div className="w-[10rem] h-1 bg-gfx-green-900 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-gfx-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(progress, 0)}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <SparkleButton className="px-5 shrink-0">
                  <CheckIcon /> Mark as read
                </SparkleButton>
                <GlowButton
                  label="Next Chapter"
                  width={180}
                  height={46}
                  onClick={() => setActiveChapter(prev => Math.min(totalChapters, prev + 1))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
