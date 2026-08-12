import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlowButton } from '@/components/ui'

function KycIllustration() {
  return (
    <div className="relative w-auto h-fit">
      {/* Gradient ellipse behind the image */}
      <div
        className="theme-decorative-glow absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(16,188,131,0.15)_0%,rgba(16,188,131,0)_70%)]"
        aria-hidden="true"
      />
      <img
        src="/images/kyc-illustration.png"
        alt="KYC verification"
        className="relative z-10 w-full h-full object-contain"
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
          <h1 className="text-white font-normal leading-none text-hero-lg">
            Withdraw Funds
          </h1>
          <p className="text-gfx-neutral-500 text-base 3xl:text-xl 4xl:text-3xl font-medium mt-1 max-w-[522px] 3xl:max-w-[700px] 4xl:max-w-[900px] leading-6 3xl:leading-8 4xl:leading-10">
            Choose your preferred withdrawal method to get started.
          </p>
        </div>

        {/* Main KYC Card */}
        <GlassCard variant="heavy" divider="none" rounded="20.05px" className="max-w-[1549px] 3xl:max-w-[2200px] 4xl:max-w-[3400px]">
          <div className="relative z-10 min-h-[730px] 3xl:min-h-[900px] 4xl:min-h-[1200px] overflow-hidden">
            {/* Horizontal divider at top */}
            <div
              className="absolute left-[10%] right-[10%] top-[0.84px] h-[1.25px] pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0)_100%)]"
              aria-hidden="true"
            />

            {/* Internal glow ellipses */}
            <div className="theme-decorative-glow absolute w-[36.6875rem] h-[27.1875rem] left-[25%] -top-[14.6875rem] rounded-full [filter:url(#blur-157)] pointer-events-none rotate-[48deg] origin-top-left bg-gfx-green-50" aria-hidden="true" />
            <div className="theme-decorative-glow absolute w-[30.8125rem] h-[17.375rem] left-[8%] top-[4.375rem] rounded-full [filter:url(#blur-157)] pointer-events-none bg-gfx-green-175" aria-hidden="true" />
            <div className="theme-decorative-glow absolute w-[30.8125rem] h-[17.375rem] right-0 -top-[29.125rem] rounded-full [filter:url(#blur-157)] pointer-events-none bg-gfx-green-175" aria-hidden="true" />

            {/* Two-panel layout */}
            <div className="relative z-10 flex flex-col xl:flex-row min-h-[730px] 3xl:min-h-[900px] 4xl:min-h-[1200px]">
              {/* Left panel — KYC Verification */}
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full h-full border border-[rgba(255,255,255,0.04)] rounded-lg flex flex-col items-center justify-center py-12 px-6">
                  <KycIllustration />

                  <div className="flex flex-col gap-6 3xl:gap-8 4xl:gap-12 items-center">
                    <h2 className="text-white text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-normal text-center leading-none">
                      KYC Verification Required
                    </h2>

                    <p className="text-gfx-neutral-500 text-base 3xl:text-xl 4xl:text-3xl font-medium leading-6 3xl:leading-8 4xl:leading-10 text-center max-w-[609px] 3xl:max-w-[750px] 4xl:max-w-[1000px]">
                      To protect your account and comply with financial regulations, you must complete KYC verification before making withdrawals. Please submit your verification documents to unlock this feature.
                    </p>

                    <div>
                      <GlowButton label="Complete KYC" width={193} height={44} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel — Choose Withdrawal Method */}
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-8">
                {/* Crypto coin stack */}
                <img
                  src="/images/crypto-coins.png"
                  alt="Bitcoin, Ethereum, USDT, USDC"
                  className="w-auto h-[120px] 3xl:h-[160px] 4xl:h-[220px] object-contain mb-10 3xl:mb-14 4xl:mb-16"
                />

                <h3 className="text-gfx-neutral-500 text-3xl xl:text-3xl 3xl:text-title-4xl 4xl:text-[3.5rem] font-normal text-center">
                  Choose Withdrawal Method
                </h3>

                <p className="text-gfx-neutral-500 text-base 3xl:text-xl 4xl:text-3xl font-medium leading-6 3xl:leading-8 4xl:leading-10 text-center mt-2 3xl:mt-4 4xl:mt-6">
                  Select your preferred withdrawal method to get started
                </p>

                <h4 className="text-gfx-neutral-500 text-2xl 3xl:text-3xl 4xl:text-subtitle-4xl font-normal text-center mt-8 3xl:mt-10 4xl:mt-14">
                  Cryptocurrency
                </h4>

                <p className="text-gfx-neutral-500 text-base 3xl:text-xl 4xl:text-3xl font-medium leading-6 3xl:leading-8 4xl:leading-10 text-center mt-2 3xl:mt-4 4xl:mt-6">
                  Bitcoin, Ethereum, USDT, USDC, and more
                </p>

                <div className="flex items-center gap-2 3xl:gap-3 mt-4 3xl:mt-6 4xl:mt-8">
                  <svg className="w-[1.125rem] h-[1.125rem] 3xl:w-[1.5rem] 3xl:h-6 4xl:w-[2rem] 4xl:h-[2rem]" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" stroke="#606060" strokeWidth="1.5"/>
                    <path d="M9 5v4l2.5 2.5" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gfx-neutral-500 text-sm 3xl:text-lg 4xl:text-2xl font-medium">Avrg 4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

    </>
  )
}
