import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { SparkleButton, GlowButton } from '@/components/ui'
import { COURSE_DETAILS } from '@/data/academy-lessons'
import type { Lesson } from '@/data/academy-lessons'

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 19 19" fill="none" className="shrink-0">
      <path d="M18.29 9.145a9.145 9.145 0 1 1-18.29 0 9.145 9.145 0 0 1 18.29 0Z" fill="#808080" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.145 4.8a.686.686 0 0 1 .686.687v3.374l2.085 2.085a.686.686 0 0 1-.97.97L8.66 9.63a.686.686 0 0 1-.201-.485V5.487A.686.686 0 0 1 9.145 4.8Z" fill="#021B13" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 17 17" fill="none" className="shrink-0">
      <path d="M15 6.556a2.5 2.5 0 0 1 0 3.71L6.022 15.15c-1.445.786-3.222-.237-3.222-1.856V3.528c0-1.618 1.777-2.641 3.222-1.855L15 6.556Z" fill="#00B38C" />
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

function VideoPlayerControls() {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex items-center gap-3">
        <button type="button" className="text-white/70 hover:text-white transition-colors cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
        </button>
        <button type="button" className="text-white hover:text-gfx-green-500 transition-colors cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </button>
        <button type="button" className="text-white/70 hover:text-white transition-colors cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
        </button>
        <span className="text-white text-sm font-acid ml-1">0:19 / 0:50</span>
        <div className="flex-1 mx-4 h-[0.1875rem] bg-gfx-neutral-250 rounded-full overflow-hidden">
          <div className="h-full bg-gfx-green-500 rounded-full" style={{ width: '38%' }} />
        </div>
        <button type="button" className="text-white/70 hover:text-white transition-colors cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.3v7.4a4.5 4.5 0 0 0 2.5-3.7z" /></svg>
        </button>
        <button type="button" className="text-white/70 hover:text-white transition-colors cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
        </button>
        <button type="button" className="text-white/70 hover:text-white transition-colors cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
        </button>
      </div>
    </div>
  )
}

function ChapterItem({ lesson, isActive, onClick }: { lesson: Lesson; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full h-[3.8125rem] rounded-md overflow-hidden flex items-start gap-3 px-[0.8125rem] py-3 cursor-pointer transition-colors text-left ${
        isActive
          ? 'bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.3)]'
          : 'hover:bg-gfx-green-800/50'
      }`}
    >
      {isActive && (
        <>
          <div className="absolute -left-[5rem] bottom-[-20px] w-[10.6250rem] h-[7.5rem] rounded-full bg-gfx-green-200 [filter:url(#blur-40)] opacity-40 pointer-events-none" />
          <div className="absolute right-[0.625rem] top-[0.625rem]">
            <PlayIcon />
          </div>
        </>
      )}
      <div className="w-[1.5rem] h-[1.5rem] rounded-[0.4375rem] bg-gfx-green-800 flex items-center justify-center shrink-0">
        <span className={`text-xs font-acid leading-none ${isActive ? 'text-gfx-green-300' : 'text-gfx-neutral-400'}`}>
          {lesson.id}
        </span>
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <span className={`text-sm font-acid leading-[18.8px] truncate ${isActive ? 'text-white' : 'text-gfx-neutral-400'}`}>
          {lesson.title}
        </span>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <span className="text-sm font-acid text-gfx-neutral-400 leading-[18.8px]">{lesson.duration}</span>
        </div>
      </div>
    </button>
  )
}

export default function VideoSinglePage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('course') || 'forex-trading'
  const course = COURSE_DETAILS[courseId] || COURSE_DETAILS['forex-trading']
  const totalLessons = course.lessons.length

  const [activeLesson, setActiveLesson] = useState(1)
  const currentLesson = course.lessons.find(l => l.id === activeLesson) || course.lessons[0]
  const completedCount = 0
  const progress = Math.round((completedCount / totalLessons) * 100)

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
              { label: 'Video Courses', onClick: () => navigate('/academy') },
              { label: course.title },
              { label: `Lesson ${activeLesson}`, current: true },
            ]}
          />
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Course Contents Panel */}
          <div className="hidden xl:flex flex-col w-[17.5000rem] 3xl:w-[20rem] shrink-0 px-5 pb-6">
            <div className="mb-2">
              <p className="text-xs font-acid-bold text-gfx-neutral-500 tracking-[2.32px] uppercase leading-[15.68px]">
                COURSE CONTENTS
              </p>
              <p className="text-xs font-acid text-gfx-neutral-400 leading-[18.8px] mt-1">
                {completedCount} of {totalLessons} chapters completed
              </p>
            </div>

            <div className="h-[0.25rem] bg-gfx-green-900 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gfx-green-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progress, 0)}%` }}
              />
            </div>

            <div className="flex flex-col gap-0 overflow-y-auto flex-1 -mx-1 px-1">
              {course.lessons.map(lesson => (
                <ChapterItem
                  key={lesson.id}
                  lesson={lesson}
                  isActive={lesson.id === activeLesson}
                  onClick={() => setActiveLesson(lesson.id)}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 px-4 xl:px-0 xl:pr-5 2xl:pr-7 3xl:pr-10 4xl:pr-14 pb-4">
            {/* Video Player */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-gfx-green-800 aspect-video">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a4a] to-[#0c2030]" />
              <VideoPlayerControls />
            </div>

            {/* Lesson Info */}
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center h-[1.75rem] px-3 rounded-full bg-gfx-green-900 border border-gfx-green-200">
                  <span className="text-xs font-acid text-gfx-neutral-400 leading-[18.8px]">
                    Lesson {activeLesson} of {totalLessons}
                  </span>
                </div>
                <h2 className="text-white text-[clamp(1.5rem,1rem+1vw,2.5rem)] font-acid leading-tight">
                  {currentLesson.title}
                </h2>
              </div>

              <SparkleButton className="px-5 shrink-0">
                <CheckIcon /> Mark as Complete
              </SparkleButton>
            </div>

            {/* Mobile chapter list */}
            <div className="xl:hidden mt-6">
              <p className="text-xs font-acid-bold text-gfx-neutral-500 tracking-[2.32px] uppercase leading-[15.68px] mb-2">
                COURSE CONTENTS
              </p>
              <p className="text-xs font-acid text-gfx-neutral-400 leading-[18.8px] mb-4">
                {completedCount} of {totalLessons} chapters completed
              </p>
              <div className="h-[0.25rem] bg-gfx-green-900 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-gfx-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(progress, 0)}%` }}
                />
              </div>
              <div className="flex flex-col gap-0">
                {course.lessons.map(lesson => (
                  <ChapterItem
                    key={lesson.id}
                    lesson={lesson}
                    isActive={lesson.id === activeLesson}
                    onClick={() => setActiveLesson(lesson.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="shrink-0 border-t border-gfx-neutral-250 bg-gfx-green-800 px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14">
          <div className="flex items-center justify-between h-[5.5rem] gap-4">
            <SparkleButton onClick={() => setActiveLesson(prev => Math.max(1, prev - 1))} className="px-5.5 shrink-0">
              <ChevronLeftIcon /> Previous Lesson
            </SparkleButton>

            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden sm:flex flex-col items-end gap-0.5">
                <span className="text-sm font-acid text-gfx-neutral-400 leading-[18.8px]">PROGRESS</span>
                <span className="text-base font-acid-medium text-white leading-[24.44px]">{progress}%</span>
                <div className="w-[10rem] h-[0.25rem] bg-gfx-green-900 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-gfx-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(progress, 0)}%` }}
                  />
                </div>
              </div>
              <GlowButton
                label="Next Lesson"
                width={180}
                height={46}
                onClick={() => setActiveLesson(prev => Math.min(totalLessons, prev + 1))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
