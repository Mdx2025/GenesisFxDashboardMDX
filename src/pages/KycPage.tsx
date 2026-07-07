import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlowButton, FloatingNavBar } from '@/components/ui'

function KycIllustration() {
  return (
    <div className="relative w-[286px] h-[286px] mx-auto overflow-hidden">
      {/* Gradient rings */}
      <div className="absolute left-[20.46px] top-[20.46px] w-[245.47px] h-[245.47px]">
        <div
          className="absolute left-[13.64px] top-[13.64px] w-[218.19px] h-[218.19px] rounded-full"
          style={{ background: 'radial-gradient(ellipse 128.59% 128.59% at 50% 50%, #F8F8F8 0%, rgba(248,248,248,0) 36%)' }}
        />
        <div
          className="absolute inset-0 w-[245.47px] h-[245.47px] rounded-full border-[1.28px] border-[#F8F8F8]"
          style={{ background: 'radial-gradient(ellipse 148.45% 148.45% at 50% 53.57%, rgba(248,248,248,0.06) 0%, rgba(248,248,248,0) 100%)' }}
        />
      </div>

      {/* Foreground ellipse */}
      <div
        className="absolute left-[52.84px] top-[52.84px] w-[180.69px] h-[180.69px] rounded-full opacity-50"
        style={{ background: 'linear-gradient(180deg, rgba(18,18,18,0) 0%, #121212 100%)' }}
      />

      {/* Side dividers */}
      <svg className="absolute left-[119.33px] top-0" width="15" height="47" viewBox="0 0 15 47" fill="none">
        <g opacity="0.25">
          <path d="M0.639 0V22.07c0 2.01.886 3.92 2.422 5.21l8.794 7.42c1.535 1.3 2.422 3.2 2.422 5.21v6.11" stroke="url(#sdl1)" strokeWidth="1.278"/>
          <path d="M0.639 0V22.07c0 2.01.886 3.92 2.422 5.21l8.794 7.42c1.535 1.3 2.422 3.2 2.422 5.21v6.11" stroke="url(#sdl2)" strokeOpacity="0.5" strokeWidth="1.278"/>
        </g>
        <defs>
          <linearGradient id="sdl1" x1="-46.35" y1="34.26" x2="14.28" y2="34.26" gradientUnits="userSpaceOnUse">
            <stop offset="0.523" stopColor="white" stopOpacity="0"/>
            <stop offset="1" stopColor="white" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="sdl2" x1="7.26" y1="28.99" x2="4.34" y2="35.71" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0"/>
            <stop offset="1" stopColor="white"/>
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute left-[153.42px] top-0" width="15" height="47" viewBox="0 0 15 47" fill="none">
        <g opacity="0.25">
          <path d="M14.276 0V22.07c0 2.01-.886 3.92-2.421 5.21l-8.794 7.42c-1.536 1.3-2.422 3.2-2.422 5.21v6.11" stroke="url(#sdr1)" strokeWidth="1.278"/>
          <path d="M14.276 0V22.07c0 2.01-.886 3.92-2.421 5.21l-8.794 7.42c-1.536 1.3-2.422 3.2-2.422 5.21v6.11" stroke="url(#sdr2)" strokeOpacity="0.5" strokeWidth="1.278"/>
        </g>
        <defs>
          <linearGradient id="sdr1" x1="61.27" y1="34.26" x2="0.64" y2="34.26" gradientUnits="userSpaceOnUse">
            <stop offset="0.523" stopColor="white" stopOpacity="0"/>
            <stop offset="1" stopColor="white" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="sdr2" x1="7.66" y1="28.99" x2="10.57" y2="35.71" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0"/>
            <stop offset="1" stopColor="white"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Geometric container shapes */}
      <div className="absolute left-[-28.13px] top-[-30.68px] w-[341.78px] h-[347.75px]">
        {/* Background rectangle gradient */}
        <div
          className="absolute left-[18.75px] top-0 w-[310.25px] h-[347.75px]"
          style={{ background: 'linear-gradient(90deg, rgba(217,217,217,0) 5%, #737373 50%, rgba(115,115,115,0) 95%)' }}
        />

        {/* Top row */}
        <svg className="absolute left-0 top-0" width="81" height="79" viewBox="0 0 81 79" fill="none">
          <path opacity="0.1" d="M80.97-27.27V58.77c0 .85-.32 1.66-.89 2.29L65.2 77.31c-.65.7-1.56 1.1-2.52 1.1H26.42-9.84c-.96 0-1.87-.4-2.51-1.1L-27.23 61.05c-.58-.63-.9-1.44-.9-2.29V-27.27c0-1.88 1.53-3.41 3.41-3.41h101.28c1.88 0 3.41 1.53 3.41 3.41z" fill="url(#trl)"/>
          <defs>
            <linearGradient id="trl" x1="26.42" y1="-30.68" x2="26.42" y2="78.41" gradientUnits="userSpaceOnUse">
              <stop offset="0.523" stopColor="#F8F8F8" stopOpacity="0"/>
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute left-[115.92px] top-0" width="110" height="79" viewBox="0 0 110 79" fill="none">
          <path opacity="0.5" d="M109.1-27.27V58.77c0 .85-.32 1.66-.89 2.29L93.33 77.31c-.65.7-1.56 1.1-2.52 1.1H54.55 18.29c-.96 0-1.87-.4-2.51-1.1L.89 61.05C.32 60.43 0 59.62 0 58.77V-27.27C0-29.16 1.53-30.68 3.41-30.68h102.28c1.88 0 3.41 1.53 3.41 3.41z" fill="url(#tml)"/>
          <defs>
            <linearGradient id="tml" x1="54.55" y1="-30.68" x2="54.55" y2="78.41" gradientUnits="userSpaceOnUse">
              <stop offset="0.523" stopColor="#F8F8F8" stopOpacity="0"/>
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute left-[115.92px] top-0" width="111" height="80" viewBox="0 0 111 80" fill="none">
          <path opacity="0.5" d="M109.74-27.27V58.77c0 .85-.32 1.66-.89 2.29L93.97 77.31c-.65.7-1.56 1.1-2.52 1.1H55.19 18.92c-.96 0-1.87-.4-2.51-1.1L1.53 61.05c-.58-.63-.9-1.44-.9-2.29V-27.27c0-1.88 1.53-3.41 3.41-3.41h102.28c1.88 0 3.41 1.53 3.41 3.41z" stroke="url(#tmr)" strokeWidth="1.278"/>
          <defs>
            <linearGradient id="tmr" x1="55.19" y1="-30.68" x2="55.19" y2="78.41" gradientUnits="userSpaceOnUse">
              <stop offset="0.523" stopColor="#F8F8F8" stopOpacity="0"/>
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute left-[231.83px] top-0" width="83" height="79" viewBox="0 0 83 79" fill="none">
          <path opacity="0.1" d="M109.1-27.27V58.77c0 .85-.32 1.66-.89 2.29L93.33 77.31c-.65.7-1.56 1.1-2.52 1.1H54.55 18.29c-.96 0-1.87-.4-2.51-1.1L.89 61.05C.32 60.43 0 59.62 0 58.77V-27.27C0-29.16 1.53-30.68 3.41-30.68h102.28c1.88 0 3.41 1.53 3.41 3.41z" fill="url(#trr)"/>
          <defs>
            <linearGradient id="trr" x1="54.55" y1="-30.68" x2="54.55" y2="78.41" gradientUnits="userSpaceOnUse">
              <stop offset="0.523" stopColor="#F8F8F8" stopOpacity="0"/>
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom row */}
        <svg className="absolute left-0 top-[238.65px]" width="82" height="79" viewBox="0 0 82 79" fill="none">
          <path opacity="0.1" d="M81.82 105.69V19.65c0-.85-.32-1.66-.89-2.29L65.05 1.11C64.41.4 63.49 0 62.54 0H27.27-8.99c-.96 0-1.87.4-2.51 1.11L-26.38 17.36c-.58.63-.9 1.44-.9 2.29v86.04c0 1.88 1.53 3.41 3.41 3.41h101.28c1.88 0 3.41-1.53 3.41-3.41z" fill="url(#brl)"/>
          <defs>
            <linearGradient id="brl" x1="27.27" y1="109.1" x2="27.27" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0.523" stopColor="#F8F8F8" stopOpacity="0"/>
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute left-[115.92px] top-[238.65px]" width="110" height="79" viewBox="0 0 110 79" fill="none">
          <path opacity="0.5" d="M109.1 105.69V19.65c0-.85-.32-1.66-.89-2.29L93.33 1.11C92.68.4 91.77 0 90.81 0H54.55 18.29c-.96 0-1.87.4-2.51 1.11L.89 17.36C.32 17.99 0 18.8 0 19.65v86.04c0 1.88 1.53 3.41 3.41 3.41h102.28c1.88 0 3.41-1.53 3.41-3.41z" fill="url(#bml)"/>
          <defs>
            <linearGradient id="bml" x1="54.55" y1="109.1" x2="54.55" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0.523" stopColor="#F8F8F8" stopOpacity="0"/>
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute left-[115.92px] top-[238.65px]" width="111" height="80" viewBox="0 0 111 80" fill="none">
          <path opacity="0.5" d="M109.74 106.33V20.29c0-.85-.32-1.66-.89-2.29L93.97 1.75C93.32 1.04 92.41.64 91.45.64H55.19 18.92c-.96 0-1.87.4-2.51 1.11L1.53 18c-.58.63-.9 1.44-.9 2.29v86.04c0 1.88 1.53 3.41 3.41 3.41h102.28c1.88 0 3.41-1.53 3.41-3.41z" stroke="url(#bmr)" strokeWidth="1.278"/>
          <defs>
            <linearGradient id="bmr" x1="55.19" y1="109.74" x2="55.19" y2="0.64" gradientUnits="userSpaceOnUse">
              <stop offset="0.523" stopColor="#F8F8F8" stopOpacity="0"/>
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute left-[231.83px] top-[238.65px]" width="82" height="79" viewBox="0 0 82 79" fill="none">
          <path opacity="0.1" d="M109.1 105.69V19.65c0-.85-.32-1.66-.89-2.29L93.33 1.11C92.68.4 91.77 0 90.81 0H54.55 18.29c-.96 0-1.87.4-2.51 1.11L.89 17.36C.32 17.99 0 18.8 0 19.65v86.04c0 1.88 1.53 3.41 3.41 3.41h102.28c1.88 0 3.41-1.53 3.41-3.41z" fill="url(#brr)"/>
          <defs>
            <linearGradient id="brr" x1="54.55" y1="109.1" x2="54.55" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0.523" stopColor="#F8F8F8" stopOpacity="0"/>
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text overlay mask */}
      <div
        className="absolute left-[-13.64px] top-[-13.64px] w-[313.65px] h-[313.65px] rounded-full"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, #D9D9D9 0%, rgba(115,115,115,0) 57%)' }}
      />
    </div>
  )
}

export default function KycPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={[
            { label: 'Assets Management', href: '/assets-management' },
            { label: 'Funding', href: '/assets-management' },
            { label: 'Withdraw', current: true },
          ]}
        />

        <div className="mt-8 mb-10">
          <h1 className="text-white font-normal leading-none text-[clamp(1.5rem,0.75rem+1.5vw,3.5rem)]">
            Withdraw Funds
          </h1>
          <p className="text-gfx-neutral-300 text-[16px] font-medium mt-1 max-w-[522px] leading-[24.44px]">
            Choose your preferred withdrawal method to get started.
          </p>
        </div>

        {/* Main KYC Card */}
        <GlassCard variant="heavy" divider="none" rounded="20.05px" className="max-w-[1549px]">
          <div className="relative z-10 h-[730px] overflow-hidden">
            {/* Horizontal divider at top */}
            <div
              className="absolute left-[157.64px] top-[0.84px] h-[1.25px] w-[1233.72px] pointer-events-none"
              style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)' }}
              aria-hidden="true"
            />

            {/* Internal glow ellipses */}
            <div className="absolute w-[587px] h-[435px] left-[392.47px] -top-[235px] rounded-full [filter:url(#blur-157)] pointer-events-none rotate-[48deg] origin-top-left" style={{ background: '#00110B' }} aria-hidden="true" />
            <div className="absolute w-[493px] h-[278px] left-[124px] top-[70px] rounded-full [filter:url(#blur-157)] pointer-events-none" style={{ background: '#114131' }} aria-hidden="true" />
            <div className="absolute w-[493px] h-[278px] left-[848px] -top-[466px] rounded-full [filter:url(#blur-157)] pointer-events-none" style={{ background: '#114131' }} aria-hidden="true" />

            {/* Illustration */}
            <div className="absolute z-10 left-[243.62px] top-[120px]">
              <KycIllustration />
            </div>

            {/* Title */}
            <h2 className="absolute z-10 left-[169px] top-[355.38px] text-white text-[36px] font-normal">
              KYC Verification Required
            </h2>

            {/* Description */}
            <p className="absolute z-10 left-[96px] top-[404.38px] w-[609px] text-gfx-neutral-500 text-[16px] font-medium leading-[24.44px] text-center">
              To protect your account and comply with financial regulations, you must complete KYC verification before making withdrawals. Please submit your verification documents to unlock this feature.
            </p>

            {/* CTA Button */}
            <div className="absolute z-10 left-[303px] top-[485.38px]">
              <GlowButton label="Complete KYC" width={193} height={44} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingNavBar />
      </div>
    </>
  )
}
