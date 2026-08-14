import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlowEllipse, SparkleButton } from '@/components/ui'
import { PartnerQrCodeIcon, PartnerShareIcon, PartnerCopyIcon } from '@/components/partner/shared'

function LinkIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <rect width="42" height="42" rx="11.6667" fill="#09241C" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4645 29.5355C13.929 31 16.286 31 21 31C25.714 31 28.071 31 29.5355 29.5355C31 28.071 31 25.714 31 21C31 16.286 31 13.929 29.5355 12.4645C28.071 11 25.714 11 21 11C16.286 11 13.929 11 12.4645 12.4645C11 13.929 11 16.286 11 21C11 25.714 11 28.071 12.4645 29.5355ZM18.5 17.75C16.705 17.75 15.25 19.205 15.25 21C15.25 22.795 16.705 24.25 18.5 24.25C20.295 24.25 21.75 22.795 21.75 21C21.75 20.586 22.086 20.25 22.5 20.25C22.914 20.25 23.25 20.586 23.25 21C23.25 23.623 21.123 25.75 18.5 25.75C15.877 25.75 13.75 23.623 13.75 21C13.75 18.377 15.877 16.25 18.5 16.25C18.914 16.25 19.25 16.586 19.25 17C19.25 17.414 18.914 17.75 18.5 17.75ZM26.75 21C26.75 22.795 25.295 24.25 23.5 24.25C23.086 24.25 22.75 24.586 22.75 25C22.75 25.414 23.086 25.75 23.5 25.75C26.123 25.75 28.25 23.623 28.25 21C28.25 18.377 26.123 16.25 23.5 16.25C20.877 16.25 18.75 18.377 18.75 21C18.75 21.414 19.086 21.75 19.5 21.75C19.914 21.75 20.25 21.414 20.25 21C20.25 19.205 21.705 17.75 23.5 17.75C25.295 17.75 26.75 19.205 26.75 21Z"
        fill="#00B38C"
      />
    </svg>
  )
}

function ActionCircle({ children, label, onClick }: { children: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex items-center justify-center size-[34px] rounded-full bg-gfx-green-800 cursor-pointer hover:bg-gfx-green-200 transition-colors"
    >
      {children}
    </button>
  )
}

export default function LinksPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  const breadcrumbItems = [
    { label: 'Links', current: true },
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

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-acid text-white pb-6 lg:pb-15">Partner Link</h1>

        <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
          <div className="relative">
            <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

            <div className="theme-decorative-glow absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

            <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

            <div className="flex flex-col lg:flex-row">
              {/* Left section — Referral Link info */}
              <div className="flex-1 px-6 py-10 lg:px-[53px] lg:py-[77px] flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <LinkIcon />
                  <h2 className="text-2xl font-acid text-white">Referral Link</h2>
                </div>

                <p className="text-sm font-acid leading-[18.8px] max-w-[739px]">
                  <span className="text-[#808080]">Earn multi-level commissions from your referral network up to </span>
                  <span className="text-gfx-green-300">10 levels deep.</span>
                  <span className="text-[#808080]"> Commission rates vary by asset class (Forex, Crypto, Metals, Indices) and account type. Share your links to build your trading community and generate passive income from every trade your network makes</span>
                </p>
              </div>

              {/* Right section — Referral code card */}
              <div className="lg:w-[587px] shrink-0 p-4 sm:p-5">
                <GlassCard
                  variant="light"
                  divider="none"
                  rounded="18.56px"
                  className="surface-raised shadow-none h-full flex flex-col justify-center px-6 py-8 xl:px-[76px] xl:py-[50px] gap-6"
                  data-partner-referral-code-card
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center h-[28px] px-[18px] rounded-[30px] border-[1.16px] border-gfx-green-200 bg-gfx-main text-gfx-green-300 text-xs font-acid leading-[18.8px]">
                      GFX605D9D38
                    </span>

                    <div className="flex items-center gap-2 ml-auto">
                      <ActionCircle label="Show QR code"><PartnerQrCodeIcon /></ActionCircle>
                      <ActionCircle label="Share link"><PartnerShareIcon /></ActionCircle>
                      <ActionCircle label="Copy link"><PartnerCopyIcon /></ActionCircle>
                    </div>
                  </div>

                  <div className="flex items-center h-[46px] px-4 rounded-[40px] border border-gfx-green-200 bg-gfx-main">
                    <span className="text-xs font-acid text-[#808080] leading-[18.8px] truncate">
                      https://dashboard.genesisfxmarkets.com/a
                    </span>
                  </div>

                  <SparkleButton fullWidth>View Commission Rates</SparkleButton>
                </GlassCard>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
