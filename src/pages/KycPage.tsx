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
          <p className="text-gfx-neutral-300 text-[16px] font-medium mt-1 max-w-[522px] leading-[24.44px]">
            Choose your preferred withdrawal method to get started.
          </p>
        </div>

        {/* Main KYC Card */}
        <GlassCard variant="heavy" divider="none" rounded="20.05px" className="max-w-[1549px]">
          <div className="relative z-10 min-h-[730px] overflow-hidden">
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
            <div className="relative z-10 flex flex-col xl:flex-row min-h-[730px]">
              {/* Left panel — KYC Verification */}
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-8 xl:border-r xl:border-white/[0.06]">
                <KycIllustration />

                <h2 className="text-white text-[28px] xl:text-[36px] font-normal text-center">
                  KYC Verification Required
                </h2>

                <p className="text-gfx-neutral-500 text-[16px] font-medium leading-[24.44px] text-center max-w-[609px]">
                  To protect your account and comply with financial regulations, you must complete KYC verification before making withdrawals. Please submit your verification documents to unlock this feature.
                </p>

                <div>
                  <GlowButton label="Complete KYC" width={193} height={44} />
                </div>
              </div>

              {/* Right panel — Choose Withdrawal Method */}
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-8">
                {/* Crypto coin stack */}
                <img
                  src="/images/crypto-coins.png"
                  alt="Bitcoin, Ethereum, USDT, USDC"
                  className="w-auto h-[120px] object-contain mb-10"
                />

                <h3 className="text-[#606060] text-[28px] xl:text-[32px] font-normal text-center">
                  Choose Withdrawal Method
                </h3>

                <p className="text-[#606060] text-[16px] font-medium leading-[24.44px] text-center mt-2">
                  Select your preferred withdrawal method to get started
                </p>

                <h4 className="text-[#606060] text-[24px] font-normal text-center mt-8">
                  Cryptocurrency
                </h4>

                <p className="text-[#606060] text-[16px] font-medium leading-[24.44px] text-center mt-2">
                  Bitcoin, Ethereum, USDT, USDC, and more
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="#606060" strokeWidth="1.5"/>
                    <path d="M9 5v4l2.5 2.5" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#606060] text-[14px] font-medium">Avrg 4 hours</span>
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
