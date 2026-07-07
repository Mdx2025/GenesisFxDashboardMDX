import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlowButton, FloatingNavBar } from '@/components/ui'

function KycIllustration() {
  return (
    <div className="relative w-auto h-fit">
      {/* Gradient ellipse behind the image */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16,188,131,0.15) 0%, rgba(16,188,131,0) 70%)' }}
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
          <h1 className="text-white font-normal leading-none text-[clamp(1.5rem,0.75rem+1.5vw,3.5rem)]">
            Withdraw Funds
          </h1>
          <p className="text-gfx-neutral-300 text-[16px] 3xl:text-[20px] 4xl:text-[28px] font-medium mt-1 max-w-[522px] 3xl:max-w-[700px] 4xl:max-w-[900px] leading-[24.44px] 3xl:leading-[30px] 4xl:leading-[42px]">
            Choose your preferred withdrawal method to get started.
          </p>
        </div>

        {/* Main KYC Card */}
        <GlassCard variant="heavy" divider="none" rounded="20.05px" className="max-w-[1549px] 3xl:max-w-[2200px] 4xl:max-w-[3400px]">
          <div className="relative z-10 min-h-[730px] 3xl:min-h-[900px] 4xl:min-h-[1200px] overflow-hidden">
            {/* Horizontal divider at top */}
            <div
              className="absolute left-[10%] right-[10%] top-[0.84px] h-[1.25px] pointer-events-none"
              style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)' }}
              aria-hidden="true"
            />

            {/* Internal glow ellipses */}
            <div className="absolute w-[587px] h-[435px] left-[25%] -top-[235px] rounded-full [filter:url(#blur-157)] pointer-events-none rotate-[48deg] origin-top-left" style={{ background: '#00110B' }} aria-hidden="true" />
            <div className="absolute w-[493px] h-[278px] left-[8%] top-[70px] rounded-full [filter:url(#blur-157)] pointer-events-none" style={{ background: '#114131' }} aria-hidden="true" />
            <div className="absolute w-[493px] h-[278px] right-0 -top-[466px] rounded-full [filter:url(#blur-157)] pointer-events-none" style={{ background: '#114131' }} aria-hidden="true" />

            {/* Two-panel layout */}
            <div className="relative z-10 flex flex-col xl:flex-row min-h-[730px] 3xl:min-h-[900px] 4xl:min-h-[1200px]">
              {/* Left panel — KYC Verification */}
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full h-full border border-[rgba(255,255,255,0.04)] rounded-lg flex flex-col items-center justify-center py-12 px-6">
                  <KycIllustration />

                  <div className="flex flex-col gap-6 3xl:gap-8 4xl:gap-12 items-center">
                    <h2 className="text-white text-[28px] xl:text-[36px] 3xl:text-[48px] 4xl:text-[64px] font-normal text-center leading-none">
                      KYC Verification Required
                    </h2>

                    <p className="text-gfx-neutral-500 text-[16px] 3xl:text-[20px] 4xl:text-[28px] font-medium leading-[24.44px] 3xl:leading-[30px] 4xl:leading-[42px] text-center max-w-[609px] 3xl:max-w-[750px] 4xl:max-w-[1000px]">
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

                <h3 className="text-[#606060] text-[28px] xl:text-[32px] 3xl:text-[42px] 4xl:text-[56px] font-normal text-center">
                  Choose Withdrawal Method
                </h3>

                <p className="text-[#606060] text-[16px] 3xl:text-[20px] 4xl:text-[28px] font-medium leading-[24.44px] 3xl:leading-[30px] 4xl:leading-[42px] text-center mt-2 3xl:mt-4 4xl:mt-6">
                  Select your preferred withdrawal method to get started
                </p>

                <h4 className="text-[#606060] text-[24px] 3xl:text-[32px] 4xl:text-[44px] font-normal text-center mt-8 3xl:mt-10 4xl:mt-14">
                  Cryptocurrency
                </h4>

                <p className="text-[#606060] text-[16px] 3xl:text-[20px] 4xl:text-[28px] font-medium leading-[24.44px] 3xl:leading-[30px] 4xl:leading-[42px] text-center mt-2 3xl:mt-4 4xl:mt-6">
                  Bitcoin, Ethereum, USDT, USDC, and more
                </p>

                <div className="flex items-center gap-2 3xl:gap-3 mt-4 3xl:mt-6 4xl:mt-8">
                  <svg className="w-[18px] h-[18px] 3xl:w-[24px] 3xl:h-[24px] 4xl:w-[32px] 4xl:h-[32px]" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="#606060" strokeWidth="1.5"/>
                    <path d="M9 5v4l2.5 2.5" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#606060] text-[14px] 3xl:text-[18px] 4xl:text-[24px] font-medium">Avrg 4 hours</span>
                </div>
              </div>
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
