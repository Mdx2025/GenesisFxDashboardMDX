import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, StatCard, SecondaryButton, PeriodPill } from '@/components/ui'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'
import { ChevronRightIcon } from '@/components/icons'
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
      <div className="absolute w-[500px] h-[400px] -left-[200px] -top-[100px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
      <div className="absolute w-[400px] h-[200px] left-1/3 -bottom-[120px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-100)] will-change-transform opacity-40" aria-hidden="true" />
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

function PartnerWalletCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-[42px] h-[42px] rounded-xl bg-gfx-green-900 flex items-center justify-center shrink-0">
            <WalletIcon size={24} color="white" />
          </div>
          <div>
            <p className="text-white text-base font-acid font-medium">Partner Wallet</p>
            <p className="text-gfx-neutral-500 text-sm font-acid mt-1">$0.00</p>
          </div>
        </div>
        <SecondaryButton className="w-full">
          <ChevronRightIcon size={18} />
          New Account
          <ChevronRightIcon size={18} />
        </SecondaryButton>
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

        <SecondaryButton className="w-full">
          <ChevronRightIcon size={18} />
          New Account
          <ChevronRightIcon size={18} />
        </SecondaryButton>
      </div>
    </GlassCard>
  )
}

function PortfolioEquitySection() {
  return (
    <GlassCard variant="heavy" divider="none" rounded="18px" className="h-full min-h-[400px] overflow-hidden">
      <div className="absolute w-[400px] h-[200px] -left-[120px] -top-[80px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
      <div className="absolute w-[300px] h-[150px] left-1/2 -translate-x-1/2 -bottom-[80px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-100)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-tab uppercase tracking-tab text-gfx-neutral-300 mb-2">PORTFOLIO EQUITY</h2>
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

const TABLE_HEADERS = [
  'Referral Name', 'Email Address', 'Country', 'Status',
  'Type', 'Total Deposit', 'Commission', 'Date',
]

function RecentActivity() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-tab uppercase tracking-tab text-gfx-neutral-300">Recent Activity</h2>
          <SecondaryButton>
            <CalendarIcon size={16} color="#c6c6c6" />
            Filter
          </SecondaryButton>
        </div>
        <div className="overflow-x-auto">
          <table className="partner-table w-full font-acid">
            <thead>
              <tr className="border-b border-zinc-800/60">
                {TABLE_HEADERS.map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={TABLE_HEADERS.length}>
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <EmptyIcon />
                    <p className="text-white text-base font-acid font-medium">No referrals yet</p>
                    <p className="text-gfx-neutral-500 text-sm font-acid text-center">
                      Start inviting people with your referral link to see them here
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </GlassCard>
  )
}

export default function PartnerPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/home' },
    { label: 'Partner Program', current: true },
  ]

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <div className="flex items-center justify-between shrink-0 flex-wrap gap-4">
          <h1 className="text-4xl lg:text-5xl font-acid text-white">Partner Program</h1>
          <div className="hidden lg:flex gap-3">
            <SecondaryButton>
              <ChevronRightIcon size={18} />
              New Account
              <ChevronRightIcon size={18} />
            </SecondaryButton>
            <SecondaryButton>
              <ChevronRightIcon size={18} />
              New Account
              <ChevronRightIcon size={18} />
            </SecondaryButton>
            <SecondaryButton>
              <ChevronRightIcon size={18} />
              New Account
              <ChevronRightIcon size={18} />
            </SecondaryButton>
          </div>
        </div>

        <HeroBanner />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 3xl:gap-6 4xl:gap-8">
          <StatCard
            label="Total Referrals"
            value="16"
            icon={<UsersGroupIcon size={22} color="white" />}
          />
          <StatCard
            label="Total Business"
            value="$900.00"
            icon={<WalletIcon size={24} color="white" />}
          />
          <StatCard
            label="Comission Earned"
            value="$200.00"
            icon={<CommissionIcon size={20} color="white" />}
          />
          <StatCard
            label="Active Clients"
            value="$900.00"
            icon={<PieChartIcon size={20} color="white" />}
          />
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
