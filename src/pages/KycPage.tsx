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

                <p className="text-gfx-neutral-500 text-[16px] font-medium leading-[24.44px] text-center max-w-[609px] mt-[13px]">
                  To protect your account and comply with financial regulations, you must complete KYC verification before making withdrawals. Please submit your verification documents to unlock this feature.
                </p>

                <div className="mt-[37px]">
                  <GlowButton label="Complete KYC" width={193} height={44} />
                </div>
              </div>

              {/* Right panel — Choose Withdrawal Method */}
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-8">
                {/* Crypto coin stack */}
                <div className="flex items-center -space-x-4 mb-10">
                  <div className="w-[72px] h-[72px] rounded-full bg-[#F7931A] flex items-center justify-center z-[4] shadow-lg">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M15.5 10.8c.2-1.4-.8-2.1-2.3-2.6l.5-1.9-1.2-.3-.5 1.9c-.3-.1-.6-.2-1-.2l.5-1.9-1.2-.3-.5 1.9c-.3-.1-.5-.1-.7-.2l-1.6-.4-.3 1.3s.9.2.9.2c.5.1.6.4.5.7l-.5 2.1c0 0 .1 0 .1 0l-.1 0-.8 3c-.1.2-.2.4-.6.3 0 0-.9-.2-.9-.2l-.6 1.4 1.5.4c.3.1.6.1.8.2l-.5 2 1.2.3.5-1.9c.3.1.7.2 1 .3l-.5 1.9 1.2.3.5-2c2.1.4 3.6.2 4.3-1.6.5-1.5 0-2.3-1.1-2.9.8-.2 1.4-.7 1.5-1.8z" fill="white"/></svg>
                  </div>
                  <div className="w-[72px] h-[72px] rounded-full bg-[#627EEA] flex items-center justify-center z-[3] shadow-lg">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M12 4v5.9l5 2.2L12 4z" fill="white" fillOpacity="0.6"/><path d="M12 4L7 12.1l5-2.2V4z" fill="white"/><path d="M12 16.5v3.5l5-6.9-5 3.4z" fill="white" fillOpacity="0.6"/><path d="M12 20v-3.5L7 13.1l5 6.9z" fill="white"/></svg>
                  </div>
                  <div className="w-[72px] h-[72px] rounded-full bg-[#26A17B] flex items-center justify-center z-[2] shadow-lg">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M13.4 10.9v-1.5h3.1V7H7.5v2.4h3.1v1.5c-2.7.1-4.7.7-4.7 1.4 0 .7 2 1.3 4.7 1.4v4.3h1.8v-4.3c2.7-.1 4.7-.7 4.7-1.4 0-.7-2-1.3-4.7-1.4z" fill="white"/></svg>
                  </div>
                  <div className="w-[72px] h-[72px] rounded-full bg-[#2775CA] flex items-center justify-center z-[1] shadow-lg">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M15.2 13.8c0-1.5-0.9-2-2.7-2.2-1.3-.2-1.5-.5-1.5-1.1s.5-1 1.3-1c.7 0 1.2.3 1.4.9.1.1.1.2.3.2h.6c.1 0 .2-.1.2-.2v-.1c-.2-.8-.9-1.4-1.7-1.5V8.2c0-.1-.1-.2-.3-.2h-.5c-.1 0-.3.1-.3.2v.6c-1.2.2-1.9.9-1.9 1.9 0 1.4.9 1.9 2.7 2.2 1.2.2 1.5.6 1.5 1.2 0 .7-.6 1.1-1.4 1.1-.9 0-1.3-.4-1.5-1-.1-.1-.1-.2-.3-.2h-.6c-.1 0-.2.1-.2.2v.1c.2.9.8 1.5 2 1.7v.6c0 .1.1.2.3.2h.5c.1 0 .3-.1.3-.2v-.6c1.2-.2 2-.9 2-2z" fill="white"/></svg>
                  </div>
                </div>

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
