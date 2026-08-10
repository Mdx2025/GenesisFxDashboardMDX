import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/dashboard/TopBar'
import { useSidebar } from '@/layouts/RootLayout'
import {
  GlassCard,
  GlowEllipse,
  GlowButton,
  StatCard,
  PillTabs,
  EmptyState,
  InfoListCard,
  PortfolioChart,
  SearchInput,
  PeriodPill,
} from '@/components/ui'
import {
  BackArrowIcon,
  UserRoundedIcon,
  TradesIcon,
  WithdrawIcon,
  PayoutsIcon,
  ComissionsIcon,
  StarIcon,
  ChartUpIcon,
} from '@/components/icons'

const TABS = ['Investors', 'Trades', 'Comissions', 'Withdrawals', 'Payouts', 'Performance']

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <GlassCard variant="light" divider="none" rounded="18.563px" className="relative overflow-hidden bg-gfx-green-800">
      <GlowEllipse className="-left-[8rem] -top-[6rem]" />
      <GlowEllipse className="-right-[8rem] -bottom-[6rem]" />
      <div className="relative z-10 min-h-[24.375rem] flex flex-col items-center justify-center py-[4.25rem]">
        {children}
      </div>
    </GlassCard>
  )
}

function FeeCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <GlassCard variant="light" divider="none" rounded="18.563px" className="relative overflow-hidden bg-gfx-green-800">
      <GlowEllipse className="-left-[9rem] -top-[7rem]" />
      <div className="relative z-10 px-[1.625rem] py-[1.6875rem] min-h-[11.4375rem] flex flex-col">
        <div className="flex items-center gap-[0.5rem]">
          {icon}
          <p className="text-gfx-neutral-500 text-sm font-acid leading-tight">{label}</p>
        </div>
        <p className="mt-[1.0625rem] text-gfx-green-300 text-4xl font-acid leading-normal">{value}</p>
      </div>
    </GlassCard>
  )
}

export default function PammManagerPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="pamm-manager-page relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'GenSocial', href: '/gensocial/pamm' },
          { label: 'PAMM', href: '/gensocial/pamm' },
          { label: 'PAMM Details', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">
        {/* ─── Header ─── */}
        <div className="flex items-start gap-[0.9375rem]">
          <button
            type="button"
            onClick={() => navigate('/gensocial/pamm')}
            aria-label="Back to PAMM strategies"
            className="w-[2.375rem] h-[2.375rem] rounded-[0.639rem] bg-gfx-green-900 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gfx-green-200 transition-colors"
          >
            <BackArrowIcon />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <h1 className="text-white text-[3.125rem] font-acid font-normal leading-none">PAMM strategy</h1>
              <span className="inline-flex items-center h-[1.75rem] px-[1.125rem] rounded-[1.875rem] border-[1.162px] border-gfx-green-200 bg-gfx-green-800 text-gfx-green-300 text-xs font-acid font-normal leading-[1.175rem]">
                Active
              </span>
            </div>
            <p className="mt-[1.0625rem] text-sm font-acid font-normal text-gfx-neutral-400 leading-[1.34]">
              Strategy Managment Dashboard
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              aria-label="Favourite strategy"
              className="w-[2.9375rem] h-[2.75rem] rounded-[3.75rem] border-[1.2px] border-gfx-neutral-250 flex items-center justify-center cursor-pointer hover:border-gfx-neutral-400 transition-colors"
            >
              <StarIcon size={24} color="#808080" />
            </button>
            <GlowButton label="Connect now" width={192} height={44} icon={<ChartUpIcon size={18} color="#000000" />} />
          </div>
        </div>

        {/* ─── Summary stats ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Investors" value="0" glow="right" />
          <StatCard label="Total AUM" value="$0.00" glow="left" />
          <StatCard label="Total Profit" value="$0.00" valueColor="text-gfx-green-300" glow="right" />
          <StatCard label="ROI" value="+0.00%" valueColor="text-gfx-green-300" glow="left" />
        </div>

        {/* ─── Tabs + search ─── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <PillTabs options={TABS} activeIndex={activeTab} onChange={setActiveTab} />
          <SearchInput className="w-[17.9375rem]" />
        </div>

        {/* ─── Investors ─── */}
        {activeTab === 0 && (
          <EmptyCard>
            <EmptyState
              icon={<UserRoundedIcon size={32} color="#10BC83" />}
              title="No Investors Yet"
              description="No investors have joined this strategy yet."
              action={<GlowButton label="Browse strategies" width={200} height={44} onClick={() => navigate('/gensocial/pamm')} />}
            />
          </EmptyCard>
        )}

        {/* ─── Trades ─── */}
        {activeTab === 1 && (
          <EmptyCard>
            <EmptyState
              icon={<TradesIcon size={32} color="#10BC83" />}
              title="No trades found for this strategy."
              description=""
            />
          </EmptyCard>
        )}

        {/* ─── Comissions ─── */}
        {activeTab === 2 && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeeCard icon={<ComissionsIcon size={21} color="#10BC83" />} label="Managment Fees" value="$0.00" />
              <FeeCard icon={<ChartUpIcon size={16} color="#10BC83" />} label="Managment Fees" value="$0.00" />
              <FeeCard icon={<PayoutsIcon size={16} color="#10BC83" />} label="Total Earned" value="$0.00" />
            </div>
            <h2 className="text-white text-base font-acid font-medium leading-none">Comission History</h2>
            <EmptyCard>
              <EmptyState
                icon={<ComissionsIcon size={32} color="#10BC83" />}
                title="No Commissions Yet"
                description="Commissions will appear here when fees are collected from investors."
              />
            </EmptyCard>
          </div>
        )}

        {/* ─── Withdrawals ─── */}
        {activeTab === 3 && (
          <EmptyCard>
            <EmptyState
              icon={<WithdrawIcon size={32} color="#10BC83" />}
              title="No Withdrawal Requests"
              description="No withdrawal requests have been submitted yet."
            />
          </EmptyCard>
        )}

        {/* ─── Payouts ─── */}
        {activeTab === 4 && (
          <EmptyCard>
            <EmptyState
              icon={<PayoutsIcon size={32} color="#10BC83" />}
              title="No Payouts Yet"
              description="Payouts will appear here when fees are collected from investors."
            />
          </EmptyCard>
        )}

        {/* ─── Performance ─── */}
        {activeTab === 5 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard label="ROI" value="+0.00%" valueColor="text-gfx-green-300" />
              <StatCard label="Total P&L" value="+0.00" />
              <StatCard label="Win Rate" value="0.0%" valueColor="text-gfx-amber" />
              <StatCard label="Total Trades" value="0" />
              <StatCard label="Profit Factor" value="0.00" valueColor="text-gfx-amber" />
              <StatCard label="Avg Win/Loss">
                <div className="relative z-10 p-6 min-h-[148px] flex flex-col justify-center">
                  <p className="text-gfx-neutral-500 text-sm font-acid leading-tight">Avg Win/Loss</p>
                  <p className="text-4xl font-acid leading-normal mt-2">
                    <span className="text-gfx-green-300">$0.00</span>
                    <span className="text-gfx-neutral-400 mx-2">/</span>
                    <span className="text-red-500">$0.00</span>
                  </p>
                </div>
              </StatCard>
              <StatCard label="Days Active" value="0" />
              <StatCard label="Total Volume" value="0.00" unit="lots" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <InfoListCard
                title="Trade Breakdown"
                rows={[
                  { label: 'Winning Trades', value: '0', valueColor: 'text-gfx-green-300' },
                  { label: 'Losing Trades', value: '0', valueColor: 'text-red-500' },
                  { label: 'Largest Win', value: '$0.00', valueColor: 'text-gfx-green-300' },
                  { label: 'Largest Loss', value: '$0.00', valueColor: 'text-red-500' },
                ]}
              />
              <InfoListCard
                title="Strategy Info"
                rows={[
                  { label: 'Created', value: 'Apr 27, 2026' },
                  { label: 'Losing Trades', value: '2%' },
                  { label: 'Largest Win', value: '20%' },
                  { label: 'Largest Loss', value: '$100.00' },
                ]}
              />
            </div>

            <GlassCard variant="light" divider="none" rounded="18.563px" className="relative overflow-hidden bg-gfx-green-800">
              <GlowEllipse className="-left-[10rem] -top-[8rem]" />
              <div className="relative z-10 px-[1.875rem] py-[2.125rem]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-white text-base font-acid font-medium leading-none">Performance Chart</h3>
                  <PeriodPill />
                </div>
                <div className="mt-10">
                  <PortfolioChart />
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  )
}
