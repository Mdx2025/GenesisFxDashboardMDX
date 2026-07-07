import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { FloatingNavBar, ModeToggle, GlassBannerCard, CourseCard, EBookCard } from '@/components/ui'
import { COURSES } from '@/data/academy-courses'
import { EBOOKS } from '@/data/academy-ebooks'

function AcademyCapIcon({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <path d="M3.75 11.25L15 5L26.25 11.25L15 17.5L3.75 11.25Z" fill="#10BC83" />
      <path d="M7.5 13.75V20C7.5 20 10 23.75 15 23.75C20 23.75 22.5 20 22.5 20V13.75L15 17.5L7.5 13.75Z" fill="#10BC83" />
      <path d="M25 12.5V20" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CupIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M10.667 6.667h10.666v12c0 2.946-2.388 5.333-5.333 5.333s-5.333-2.387-5.333-5.333v-12Z" fill="white" />
      <path d="M21.333 9.333h2.667A2.667 2.667 0 0 1 26.667 12v1.333a4 4 0 0 1-4 4h-1.334" stroke="white" strokeWidth="1.5" />
      <path d="M10.667 9.333H8A2.667 2.667 0 0 0 5.333 12v1.333a4 4 0 0 0 4 4h1.334" stroke="white" strokeWidth="1.5" />
      <path d="M10.667 26.667h10.666" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 24v2.667" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

function LearningJourneyCard() {
  const completed = 0
  const inProgress = 1
  const total = 12
  const notStarted = total - completed - inProgress
  const pct = Math.round((completed / total) * 100)

  return (
    <GlassBannerCard className="w-full" contentClassName="py-12 px-5 xl:py-27 xl:px-8 3xl:py-34 3xl:px-10 4xl:py-42 4xl:px-14">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-[54px] h-[54px] rounded-[16px] bg-[#011b12] flex items-center justify-center shrink-0">
            <AcademyCapIcon size={26} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-white text-[clamp(1.5rem,0.75rem+1.5vw,3.125rem)] font-normal leading-none">
              Your Learning Journey
            </h2>
            <p className="text-gfx-neutral-500 text-[clamp(0.75rem,0.5rem+0.4vw,1.125rem)] font-normal">
              {completed} of {total} courses completed
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0 xl:items-end">
          <div className="flex items-center gap-3 w-full xl:max-w-[420px]">
            <div className="flex-1 h-1 bg-[#0f1e19] rounded-full overflow-hidden">
              <div
                className="h-full bg-gfx-green-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(pct, 2)}%` }}
              />
            </div>
            <span className="text-white text-body2 font-medium shrink-0">{pct}%</span>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gfx-green-500" />
              <span className="text-white text-body2 font-medium">{completed} done</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gfx-green-500" />
              <span className="text-white text-body2 font-medium">{inProgress} in progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#606060]" />
              <span className="text-white text-body2 font-medium">{notStarted} not started</span>
            </div>
          </div>
        </div>
      </div>
    </GlassBannerCard>
  )
}

export default function AcademyPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={[
            { label: 'Genesis Academy', current: true },
          ]}
        />

        <div className="mt-6 3xl:mt-8 4xl:mt-10 mb-20">
          <h1 className="text-white font-normal leading-none text-[clamp(1.75rem,1rem+1.5vw,3.125rem)]">
            Genesis Academy
          </h1>
        </div>

        <div className="w-full max-w-xl">
          <ModeToggle options={['Video Courses', 'E Books', 'Glossary', 'Calculators']} activeIndex={activeTab} onChange={setActiveTab} />
        </div>

        {activeTab === 0 && (
          <>
            <div className="py-7 xl:py-15">
              <LearningJourneyCard />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 3xl:gap-8 4xl:gap-10 pb-10 3xl:pb-14 4xl:pb-18">
              {COURSES.map(course => (
                <CourseCard
                  key={course.id}
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  lessons={course.lessons}
                  duration={course.duration}
                  level={course.level}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 3xl:gap-5 4xl:gap-6 pt-10 xl:pt-16 pb-10 3xl:pb-14 4xl:pb-18">
            {EBOOKS.map(ebook => (
              <EBookCard
                key={ebook.id}
                category={ebook.category}
                image={ebook.image}
                readTime={ebook.readTime}
              />
            ))}
          </div>
        )}

        {activeTab === 2 && (
          <div className="pt-10 xl:pt-16 pb-10 text-gfx-neutral-500 text-body2">
            Glossary coming soon.
          </div>
        )}

        {activeTab === 3 && (
          <div className="pt-10 xl:pt-16 pb-10 text-gfx-neutral-500 text-body2">
            Calculators coming soon.
          </div>
        )}
      </div>

      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingNavBar />
      </div>
    </>
  )
}
