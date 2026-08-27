import { useRef, useState, type KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useSidebar, useTransfer } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassBannerCard, StatCard, SecondaryButton, SparkleButton, GlowButton, PeriodPill, ModeToggle, GlowEllipse } from '@/components/ui'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'
import { ChevronRightIcon, DepositIcon, WithdrawIcon, TransferIcon } from '@/components/icons'
import './PartnerPage.css'

function WalletIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.069 7.386C2 7.716 2 8.109 2 8.893V15.17c0 3.36 0 5.04 1.045 6.083C4.09 22.297 5.77 22.297 9.13 22.297h3.74c3.36 0 5.04 0 6.083-1.044C20 20.21 20 18.53 20 15.17v-1.96c0-2.35 0-3.524-.685-4.287a3.5 3.5 0 0 0-.225-.214c-.763-.685-1.937-.685-4.287-.685h-.333c-1.028 0-1.542 0-2.02-.136a4.2 4.2 0 0 1-.756-.313c-.435-.242-.802-.605-1.537-1.32l-.49-.49a6 6 0 0 0-.554-.475 3.5 3.5 0 0 0-2.18-.51c-.166.016-.338.016-.682.016-.785 0-1.178 0-1.506.062C3.436 5.09 2.31 6.128 2.069 7.386ZM12.25 10c0-.368.299-.667.667-.667H17c.368 0 .667.299.667.667s-.299.667-.667.667h-4.083A.667.667 0 0 1 12.25 10Z" fill={color} />
    </svg>
  )
}

function UsersGroupIcon({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="6" r="3.5" fill={color} />
      <ellipse cx="11" cy="16" rx="6" ry="3.5" fill={color} />
      <circle cx="17.5" cy="7.5" r="2.5" fill={color} opacity="0.5" />
      <ellipse cx="17.5" cy="16.5" rx="4" ry="2.5" fill={color} opacity="0.5" />
    </svg>
  )
}

function CommissionIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 1.667A8.333 8.333 0 1 0 18.333 10 8.341 8.341 0 0 0 10 1.667Zm3.577 9.91h-2.744v2.745a.833.833 0 1 1-1.666 0v-2.744H6.423a.833.833 0 1 1 0-1.667h2.744V7.168a.833.833 0 0 1 1.666 0v2.743h2.744a.833.833 0 1 1 0 1.667Z" fill={color} />
      <path d="M4.167 10a5.833 5.833 0 1 1 11.666 0 5.833 5.833 0 0 1-11.666 0Z" fill={color} fillOpacity="0.2" />
      <path d="M7.5 10h5M10 7.5v5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PieChartIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10.833 2.083v6.25c0 .46.373.834.834.834h6.25a7.5 7.5 0 0 1-7.084 7.083v-6.25" fill="none" />
      <path d="M10 1.667A8.333 8.333 0 1 0 18.333 10H10V1.667Z" fill={color} />
      <path d="M11.667 1.833A8.333 8.333 0 0 1 18.167 8.333H11.667V1.833Z" fill={color} opacity="0.6" />
    </svg>
  )
}

function MagicStickIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M11.25 2.25 15.75 6.75 6.75 15.75 2.25 11.25 11.25 2.25Z" fill={color} fillOpacity="0.2" />
      <path d="m10.5 3 4.5 4.5M2.25 11.25l4.5 4.5M6 1.5v2.25M1.5 6h2.25M14.25 12.75v2.25M12.75 14.25h2.25" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3.375 10.125 4.5-4.5 4.5 4.5-4.5 4.5-4.5-4.5Z" fill={color} />
    </svg>
  )
}

function QrCodeIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="5.5" height="5.5" rx="1" fill={color} />
      <rect x="9.5" y="1" width="5.5" height="5.5" rx="1" fill={color} />
      <rect x="1" y="9.5" width="5.5" height="5.5" rx="1" fill={color} />
      <rect x="3" y="3" width="1.5" height="1.5" rx="0.25" fill="black" />
      <rect x="11.5" y="3" width="1.5" height="1.5" rx="0.25" fill="black" />
      <rect x="3" y="11.5" width="1.5" height="1.5" rx="0.25" fill="black" />
      <rect x="9.5" y="9.5" width="2.5" height="2.5" rx="0.5" fill={color} />
      <rect x="13" y="9.5" width="2" height="2" rx="0.5" fill={color} />
      <rect x="9.5" y="13" width="2" height="2" rx="0.5" fill={color} />
      <rect x="13" y="13" width="2" height="2" rx="0.5" fill={color} />
    </svg>
  )
}

function CopyIcon({ size = 12, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" stroke={color} strokeWidth="1" />
      <path d="M8.5 3.5V2.5A1.5 1.5 0 0 0 7 1H2.5A1.5 1.5 0 0 0 1 2.5V7a1.5 1.5 0 0 0 1.5 1.5h1" stroke={color} strokeWidth="1" />
    </svg>
  )
}

function ShareIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="12" cy="3" r="2" fill={color} />
      <circle cx="4" cy="8" r="2" fill={color} />
      <circle cx="12" cy="13" r="2" fill={color} />
      <line x1="5.7" y1="7" x2="10.3" y2="4" stroke={color} strokeWidth="1" />
      <line x1="5.7" y1="9" x2="10.3" y2="12" stroke={color} strokeWidth="1" />
    </svg>
  )
}

function CalendarIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="3.333" width="15" height="14.167" rx="3" fill={color} />
      <path d="M2.5 7.5h15" stroke="black" strokeWidth="1.2" />
      <path d="M6.667 1.667v3.333M13.333 1.667v3.333" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function EmptyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#09241c" />
      <path d="M18 24h12M24 18v12" stroke="#00b38c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function HeroBanner() {
  return (
    <GlassCard variant="heavy" divider="none" rounded="19px" className="partner-hero shrink-0">
      <div className="theme-decorative-glow absolute w-[500px] h-[400px] -left-[200px] -top-[100px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
      <div className="theme-decorative-glow absolute w-[400px] h-[200px] left-1/3 -bottom-[120px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-100)] will-change-transform opacity-40" aria-hidden="true" />
      <div className="partner-hero-texture" aria-hidden="true" />

      <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 min-h-[320px]">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-acid text-white leading-tight mb-4">Partner Program</h2>
          <p className="text-base text-gfx-neutral-500 leading-relaxed max-w-[572px] mb-8">
            Grow your network and earn industry-leading commissions. Track referrals, monitor performance, and unlock new revenue streams.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="relative h-[44px] px-8 rounded-[300px] bg-gfx-green-100 text-black font-acid font-medium text-base flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity">
              <ShareIcon size={16} color="black" />
              Trade
            </button>
            <SecondaryButton>
              <ChevronRightIcon size={18} />
              New Account
              <ChevronRightIcon size={18} />
            </SecondaryButton>
          </div>
        </div>

        <div className="w-full lg:w-[359px] shrink-0">
          <div className="bg-gradient-to-b from-gfx-green-900 to-gfx-main border border-gfx-green-800 rounded-[30px] p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gfx-green-900 border border-gfx-green-300 rounded-[20px] px-3.5 py-2 flex items-center gap-3">
                <MagicStickIcon size={18} color="#00b38c" />
                <span className="text-gfx-green-300 text-sm font-acid">Marketing</span>
              </div>
            </div>
            <h3 className="text-white text-base font-acid font-medium mb-2 text-center">Real Time Statistics</h3>
            <p className="text-gfx-neutral-500 text-sm font-acid leading-relaxed mb-auto">
              Track signups, FTDs, lots, and revenue by referral link or sub-
            </p>
            <div className="mt-4">
              <span className="text-gfx-green-300 text-sm font-acid cursor-pointer hover:underline">Open library</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

const PARTNER_MARKETING_SLIDES = [
  {
    title: 'Real Time Statistics',
    description: 'Track signups, FTDs, lots, and referral revenue by link or sub-account.',
  },
  {
    title: 'Ready-Made Creatives',
    description: 'Download banners, social assets, and campaign visuals for every channel.',
  },
  {
    title: 'Landing Page Templates',
    description: 'Launch localized landing pages and track every campaign from one workspace.',
  },
  {
    title: 'Referral Link Manager',
    description: 'Create and measure referral links for each channel, campaign, and sub-partner.',
  },
] as const

function MarketingFeatureSwiper() {
  const swiperRef = useRef<SwiperType | null>(null)
  const paginationRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const selectSlide = (index: number, focusDot = false) => {
    const normalizedIndex = (index + PARTNER_MARKETING_SLIDES.length) % PARTNER_MARKETING_SLIDES.length
    swiperRef.current?.slideTo(normalizedIndex)

    if (focusDot) {
      requestAnimationFrame(() => {
        const dots = paginationRef.current?.querySelectorAll<HTMLButtonElement>('[data-partner-marketing-dot]')
        dots?.[normalizedIndex]?.focus()
      })
    }
  }

  const handlePaginationKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = activeIndex + 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = activeIndex - 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = PARTNER_MARKETING_SLIDES.length - 1

    if (nextIndex !== null) {
      event.preventDefault()
      selectSlide(nextIndex, true)
    }
  }

  return (
    <section
      className="partner-marketing-card relative h-[242px] w-full overflow-hidden rounded-[30px] border border-[#09241C] bg-gradient-to-b from-[#09241C] to-[#0C1311]"
      aria-label="Partner marketing tools"
      aria-roledescription="carousel"
      data-partner-marketing-card
      data-partner-marketing-carousel
    >
      <Swiper
        modules={[A11y]}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        slidesPerView={1}
        speed={300}
        a11y={{ enabled: true }}
        grabCursor
        className="partner-marketing-swiper h-full"
      >
        {PARTNER_MARKETING_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <article
              id={`partner-marketing-slide-${index + 1}`}
              className="relative h-full"
              aria-label={`${index + 1} of ${PARTNER_MARKETING_SLIDES.length}: ${slide.title}`}
              aria-hidden={activeIndex !== index}
              data-partner-marketing-slide
            >
              <div className="partner-marketing-badge partner-marketing-accent absolute left-[22px] top-[38px] inline-flex items-center gap-3 rounded-[20px] border border-current bg-gfx-surface-deep px-3.5 py-2">
                <MagicStickIcon size={18} color="currentColor" />
                <span className="font-acid text-sm">Marketing</span>
              </div>

              <h3 className="partner-marketing-title absolute inset-x-[22px] top-[114px] font-acid text-base font-medium leading-[24.44px] text-white">
                {slide.title}
              </h3>
              <p className="partner-marketing-description absolute inset-x-[22px] top-[141px] font-acid text-sm font-normal leading-[18.8px]" data-partner-marketing-description>
                {slide.description}
              </p>

              <Link
                to="/partner/marketing"
                tabIndex={activeIndex === index ? 0 : -1}
                className="partner-marketing-accent partner-marketing-focus absolute bottom-[15px] left-[22px] z-10 inline-flex min-h-6 items-center gap-2 rounded-sm font-acid text-sm leading-[18.8px] hover:underline"
              >
                Open library
                <svg width="5" height="9" viewBox="0 0 5 9" fill="none" aria-hidden="true">
                  <path d="M0.582031 7.58398L4.08203 4.08398L0.582031 0.583984" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        ref={paginationRef}
        className="absolute bottom-[7px] right-[10px] z-20 flex items-center"
        role="group"
        aria-label="Choose marketing feature"
        onKeyDown={handlePaginationKeyDown}
        data-partner-marketing-pagination
      >
        {PARTNER_MARKETING_SLIDES.map((slide, index) => {
          const active = activeIndex === index

          return (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-controls={`partner-marketing-slide-${index + 1}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => selectSlide(index)}
              className="partner-marketing-focus grid size-6 cursor-pointer place-items-center rounded-full"
              data-partner-marketing-dot
            >
              <span
                className={`partner-marketing-indicator block h-[7px] rounded-full transition-[width,opacity] duration-300 motion-reduce:transition-none ${active ? 'w-[25px]' : 'w-[7px] opacity-80'}`}
                aria-hidden="true"
              />
            </button>
          )
        })}
      </div>

      <span className="sr-only" aria-live="polite">
        Showing slide {activeIndex + 1} of {PARTNER_MARKETING_SLIDES.length}: {PARTNER_MARKETING_SLIDES[activeIndex].title}
      </span>
    </section>
  )
}

function PartnerWalletCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-[42px] h-[42px] rounded-xl bg-gfx-green-900 flex items-center justify-center shrink-0">
              <WalletIcon size={24} color="white" />
            </div>
            <p className="text-white text-base font-acid font-medium">Partner Wallet</p>
          </div>
          <p className="text-gfx-neutral-500 text-sm font-acid">$0.00</p>
        </div>
        <SparkleButton fullWidth>Request Payout</SparkleButton>
      </div>
    </GlassCard>
  )
}

function ReferralLinkCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-[42px] h-[42px] rounded-xl bg-gfx-green-900 flex items-center justify-center shrink-0">
            <ShareIcon size={18} color="white" />
          </div>
          <p className="text-white text-base font-acid font-medium mt-2">Referral Link</p>
        </div>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="partner-code-pill font-acid">GFX605D9D38</span>
          <div className="flex gap-2 ml-auto">
            <div className="partner-icon-circle" title="QR Code">
              <QrCodeIcon size={16} color="#a0a0a0" />
            </div>
            <div className="partner-icon-circle" title="Share">
              <ShareIcon size={16} color="#a0a0a0" />
            </div>
            <div className="partner-icon-circle" title="Copy">
              <CopyIcon size={12} color="#a0a0a0" />
            </div>
          </div>
        </div>

        <input
          className="partner-referral-input font-acid mb-5"
          type="text"
          readOnly
          value="https://dashboard.genesisfxmarkets.com/a"
        />

        <SparkleButton fullWidth>View Commission Rates</SparkleButton>
      </div>
    </GlassCard>
  )
}

function PortfolioEquitySection() {
  return (
    <GlassCard variant="heavy" divider="none" rounded="18px" className="h-full min-h-[400px] overflow-hidden">
      <div className="theme-decorative-glow absolute w-[400px] h-[200px] -left-[120px] -top-[80px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
      <div className="theme-decorative-glow absolute w-[300px] h-[150px] left-1/2 -translate-x-1/2 -bottom-[80px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-100)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-tab uppercase tracking-tab text-gfx-neutral-500 mb-2">PORTFOLIO EQUITY</h2>
            <div className="flex flex-row items-center gap-3">
              <p className="text-white text-card-value">$17,897.30</p>
              <p className="text-sm 3xl:text-base 4xl:text-lg text-gfx-green-500">+$6,437.21 (56.1%)</p>
            </div>
          </div>
          <PeriodPill />
        </div>
        <div className="flex-1 min-h-0">
          <PortfolioChart config={defaultChartConfig} />
        </div>
      </div>
    </GlassCard>
  )
}

const ACTIVITY_TABS = ['Referrals', 'Comissions', 'Payouts']

function ViewAllArrow() {
  return (
    <svg width="17" height="15" viewBox="0 0 17 15" fill="none">
      <path d="M1 6.363a1 1 0 0 0 0 2V6.363Zm15.707 1.707a1 1 0 0 0 0-1.414l-6.364-6.364a1 1 0 0 0-1.414 1.415L14.586 7.363l-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364ZM1 7.363v1h15v-1-1H1v1Z" fill="#00B38C" />
    </svg>
  )
}

function RecentActivity() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="surface-raised overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="theme-decorative-glow absolute w-[493px] h-[278px] right-0 -top-[252px] rounded-full pointer-events-none bg-[#064B34] [filter:url(#blur-157)]" aria-hidden="true" />
        <div className="theme-decorative-glow absolute w-[493px] h-[278px] -left-[415px] -top-[213px] rounded-full pointer-events-none bg-[#064B34] [filter:url(#blur-157)]" aria-hidden="true" />
        <div className="theme-decorative-glow absolute w-[639px] h-[361px] left-1/4 bottom-0 translate-y-full rounded-full pointer-events-none bg-[#0C1311] [filter:url(#blur-151)]" aria-hidden="true" />

        <div className="p-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-acid text-white">Recent Activity</h2>
            <button type="button" className="surface-raised flex items-center gap-2.5 px-6 h-[2.875rem] rounded-[36px] cursor-pointer hover:opacity-80 transition-opacity">
              <span className="optical-text text-base font-acid font-medium text-[#00B38C] leading-[24.44px]">View all</span>
              <ViewAllArrow />
            </button>
          </div>

          <div className="w-md">
            <ModeToggle options={ACTIVITY_TABS} activeIndex={activeTab} onChange={setActiveTab} size="sm" />
          </div>

          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <p className="text-white text-base font-acid font-medium leading-[24.44px]">No referrals yet</p>
            <p className="text-[#808080] text-sm font-acid leading-[18.8px] text-center">
              Start inviting people with your referral link to see them here
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default function PartnerPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const { openTransfer } = useTransfer()
  const navigate = useNavigate()

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/home' },
    { label: 'Partner Program', current: true },
  ]

  return (
    <>
      <div className="theme-decorative-glow absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <div className="flex items-center justify-between shrink-0 flex-wrap gap-4 pb-15">
          <h1 className="text-4xl lg:text-5xl font-acid text-white">Partner Program</h1>
          <div className="hidden lg:flex items-center gap-3">
            <SparkleButton onClick={() => navigate('/deposit')}>
              <span className="flex items-center gap-2">
                <DepositIcon />
                <span className="hidden sm:inline">Deposit</span>
              </span>
            </SparkleButton>
            <SparkleButton onClick={() => navigate('/withdraw')}>
              <span className="flex items-center gap-2">
                <WithdrawIcon />
                <span className="optical-text hidden sm:inline">Withdraw</span>
              </span>
            </SparkleButton>
            <SparkleButton onClick={openTransfer}>
              <span className="flex items-center gap-2">
                <TransferIcon />
                <span className="optical-text hidden sm:inline">Transfer</span>
              </span>
            </SparkleButton>
          </div>
        </div>

        <GlassBannerCard contentClassName="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 xl:p-8 gap-6 lg:min-h-[17.4375rem]">
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl 3xl:text-6xl font-acid text-white leading-tight mb-4">Partner Program</h2>
            <p className="text-base text-gfx-neutral-500 leading-relaxed max-w-[572px] mb-8">
              Grow your network and earn industry-leading commissions. Track referrals, monitor performance, and unlock new revenue streams.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <GlowButton label="Marketing Tools" icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none"><path d="M0.655023 11.0382L1.10437 12.7151C1.62889 14.6727 1.89115 15.6515 2.48571 16.2863C2.95516 16.7875 3.56271 17.1383 4.23152 17.2942C5.07855 17.4917 6.05733 17.2294 8.01488 16.7049C9.97243 16.1804 10.9512 15.9181 11.586 15.3236C11.6387 15.2742 11.6897 15.2234 11.739 15.171C11.4489 15.1467 11.1563 15.1 10.859 15.0409C10.2547 14.9207 9.5367 14.7283 8.68757 14.5008L8.59485 14.476L8.57338 14.4702C7.64943 14.2227 6.8775 14.0154 6.26114 13.7927C5.61296 13.5586 5.02401 13.2699 4.52389 12.8015C3.8347 12.156 3.3524 11.3206 3.13797 10.401C2.98238 9.73372 3.02686 9.07934 3.14817 8.40092C3.26442 7.75081 3.4732 6.9717 3.72334 6.03824L3.72335 6.03822L4.18723 4.30698L4.20355 4.24609C2.53639 4.6952 1.65888 4.9609 1.07368 5.509C0.572447 5.97845 0.22168 6.586 0.0657366 7.25481C-0.131764 8.10184 0.130499 9.08062 0.655023 11.0382Z" fill="black"/><path fillRule="evenodd" clipRule="evenodd" d="M16.3445 7.56554L15.8952 9.2425C15.3706 11.2001 15.1084 12.1788 14.5138 12.8136C14.0444 13.3149 13.4368 13.6656 12.768 13.8216C12.6844 13.8411 12.5996 13.8561 12.5127 13.8668C11.7183 13.9648 10.7491 13.7051 8.98465 13.2323C7.0271 12.7078 6.04832 12.4455 5.41352 11.8509C4.91229 11.3815 4.56152 10.7739 4.40558 10.1051C4.20808 9.25811 4.47034 8.27933 4.99487 6.32178L5.44421 4.64481C5.51963 4.36335 5.58967 4.10195 5.65601 3.85907C6.05104 2.41284 6.3165 1.61719 6.82555 1.07368C7.29501 0.572447 7.90255 0.22168 8.57136 0.0657366C9.41839 -0.131764 10.3972 0.130499 12.3547 0.655023C14.3123 1.17955 15.291 1.44181 15.9259 2.03637C16.4271 2.50582 16.7779 3.11337 16.9338 3.78217C17.1313 4.62921 16.869 5.60798 16.3445 7.56554ZM7.85759 6.776C7.95065 6.42869 8.30765 6.22258 8.65496 6.31564L12.8474 7.439C13.1947 7.53206 13.4008 7.88905 13.3077 8.23636C13.2147 8.58368 12.8577 8.78979 12.5104 8.69672L8.31795 7.57337C7.97064 7.48031 7.76453 7.12331 7.85759 6.776ZM7.18323 9.29118C7.27629 8.94387 7.63329 8.73776 7.9806 8.83082L10.4961 9.50483C10.8434 9.5979 11.0495 9.95489 10.9564 10.3022C10.8634 10.6495 10.5064 10.8556 10.159 10.7626L7.64359 10.0885C7.29628 9.99548 7.09017 9.63849 7.18323 9.29118Z" fill="black"/></svg>} width={210} />
              <SparkleButton>
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none"><path d="M0.655023 11.0382L1.10437 12.7151C1.62889 14.6727 1.89115 15.6515 2.48571 16.2863C2.95516 16.7875 3.56271 17.1383 4.23152 17.2942C5.07855 17.4917 6.05733 17.2294 8.01488 16.7049C9.97243 16.1804 10.9512 15.9181 11.586 15.3236C11.6387 15.2742 11.6897 15.2234 11.739 15.171C11.4489 15.1467 11.1563 15.1 10.859 15.0409C10.2547 14.9207 9.5367 14.7283 8.68757 14.5008L8.59485 14.476L8.57338 14.4702C7.64943 14.2227 6.8775 14.0154 6.26114 13.7927C5.61296 13.5586 5.02401 13.2699 4.52389 12.8015C3.8347 12.156 3.3524 11.3206 3.13797 10.401C2.98238 9.73372 3.02686 9.07934 3.14817 8.40092C3.26442 7.75081 3.4732 6.9717 3.72334 6.03824L3.72335 6.03822L4.18723 4.30698L4.20355 4.24609C2.53639 4.6952 1.65888 4.9609 1.07368 5.509C0.572447 5.97845 0.22168 6.586 0.0657366 7.25481C-0.131764 8.10184 0.130499 9.08062 0.655023 11.0382Z" fill="#808080"/><path fillRule="evenodd" clipRule="evenodd" d="M16.3445 7.56554L15.8952 9.2425C15.3706 11.2001 15.1084 12.1788 14.5138 12.8136C14.0444 13.3149 13.4368 13.6656 12.768 13.8216C12.6844 13.8411 12.5996 13.8561 12.5127 13.8668C11.7183 13.9648 10.7491 13.7051 8.98465 13.2323C7.0271 12.7078 6.04832 12.4455 5.41352 11.8509C4.91229 11.3815 4.56152 10.7739 4.40558 10.1051C4.20808 9.25811 4.47034 8.27933 4.99487 6.32178L5.44421 4.64481C5.51963 4.36335 5.58967 4.10195 5.65601 3.85907C6.05104 2.41284 6.3165 1.61719 6.82555 1.07368C7.29501 0.572447 7.90255 0.22168 8.57136 0.0657366C9.41839 -0.131764 10.3972 0.130499 12.3547 0.655023C14.3123 1.17955 15.291 1.44181 15.9259 2.03637C16.4271 2.50582 16.7779 3.11337 16.9338 3.78217C17.1313 4.62921 16.869 5.60798 16.3445 7.56554ZM7.85759 6.776C7.95065 6.42869 8.30765 6.22258 8.65496 6.31564L12.8474 7.439C13.1947 7.53206 13.4008 7.88905 13.3077 8.23636C13.2147 8.58368 12.8577 8.78979 12.5104 8.69672L8.31795 7.57337C7.97064 7.48031 7.76453 7.12331 7.85759 6.776ZM7.18323 9.29118C7.27629 8.94387 7.63329 8.73776 7.9806 8.83082L10.4961 9.50483C10.8434 9.5979 11.0495 9.95489 10.9564 10.3022C10.8634 10.6495 10.5064 10.8556 10.159 10.7626L7.64359 10.0885C7.29628 9.99548 7.09017 9.63849 7.18323 9.29118Z" fill="#808080"/></svg>
                  View statistics
                </span>
              </SparkleButton>
            </div>
          </div>
          <div className="w-full lg:w-[359px] shrink-0">
            <MarketingFeatureSwiper />
          </div>
        </GlassBannerCard>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 3xl:gap-6 4xl:gap-8">
          <div className="relative overflow-hidden clip-radius rounded-[19px]">
            <StatCard
              dense
              label="Total Referrals"
              value="16"
              icon={<UsersGroupIcon size={22} color="white" />}
            />
            <GlowEllipse className="!w-[20rem] !h-[10rem] bottom-0 right-0 translate-x-1/4 translate-y-1/4 !blur-[5rem] opacity-60" />
          </div>
          <div className="relative overflow-hidden clip-radius rounded-[19px]">
            <StatCard
              dense
              label="Total Business"
              value="$900.00"
              icon={<WalletIcon size={24} color="white" />}
            />
            <GlowEllipse className="!w-[20rem] !h-[10rem] bottom-0 left-0 -translate-x-1/4 translate-y-1/4 !blur-[5rem] opacity-60" />
          </div>
          <div className="relative overflow-hidden clip-radius rounded-[19px]">
            <StatCard
              dense
              label="Comission Earned"
              value="$200.00"
              icon={<CommissionIcon size={20} color="white" />}
            />
            <GlowEllipse className="!w-[20rem] !h-[10rem] bottom-0 right-0 translate-x-1/4 translate-y-1/4 !blur-[5rem] opacity-60" />
          </div>
          <div className="relative overflow-hidden clip-radius rounded-[19px]">
            <StatCard
              dense
              label="Active Clients"
              value="$900.00"
              icon={<PieChartIcon size={20} color="white" />}
            />
            <GlowEllipse className="!w-[20rem] !h-[10rem] bottom-0 left-0 -translate-x-1/4 translate-y-1/4 !blur-[5rem] opacity-60" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 3xl:gap-6 4xl:gap-8">
          <div className="xl:col-span-3 flex flex-col min-h-0">
            <PortfolioEquitySection />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
            <PartnerWalletCard />
            <ReferralLinkCard />
          </div>
        </div>

        <RecentActivity />
      </div>
    </>
  )
}
