import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, Badge, GreenDot, SearchInput, GlowButton, GlassSelect, ModeToggle, SuccessSnackbar } from '@/components/ui'
import type { GlassSelectOption } from '@/components/ui/GlassSelect'
import { MoreDotsIcon, UserIcon } from '@/components/icons'
import { tradingAccounts } from '@/data/trading-accounts'
import { CreateAccountModal } from '@/components/accounts/CreateAccountModal'
import { AccountProcessingModal } from '@/components/accounts/AccountProcessingModal'
import { PlatformsView } from '@/components/accounts/PlatformsView'
import { openTradeLocker } from '@/constants/links'

const FILTER_TABS = ['All Accounts', 'Live', 'Demo', 'Platforms'] as const

const TYPE_OPTIONS: GlassSelectOption[] = [
  { value: 'all', label: 'All Types' },
  { value: 'genfx', label: 'GenFX' },
  { value: '10x', label: '10X' },
]

export default function AccountsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'platforms' ? 3 : 0)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [processingOpen, setProcessingOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [typeFilter, setTypeFilter] = useState('')

  const filteredAccounts = typeFilter && typeFilter !== 'all'
    ? tradingAccounts.filter(acc => acc.type === typeFilter)
    : tradingAccounts

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Dashboard', href: '/home' },
          { label: 'Accounts', current: true },
        ]}
      />

      <div className="flex flex-col gap-4 mt-6 3xl:mt-8 4xl:mt-10">
        <div className="flex flex-col gap-5 sm:gap-8">
          <div>
            <h1 className="text-white text-h1 font-normal">TradeLocker Accounts</h1>
            <p className="text-gfx-neutral-500 text-body2 mt-1 sm:mt-2">
              {activeTab === 3
                ? 'Advanced trading platform with powerful charting tools and real-time market data'
                : 'Choose your preferred withdrawal method to get started'}
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <ModeToggle options={[...FILTER_TABS]} activeIndex={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        {activeTab === 3 ? (
          <PlatformsView />
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="w-[10.5rem]">
              <GlassSelect
                options={TYPE_OPTIONS}
                placeholder="Type"
                size="sm"
                value={typeFilter}
                onChange={setTypeFilter}
              />
            </div>

            <GlassCard variant="light" divider="white" rounded="1.5rem" className="overflow-hidden">
              <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[400px] h-[160px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold tracking-tight text-white">Trading Accounts</h2>
                    <Badge variant="status">{filteredAccounts.length} ACTIVE</Badge>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none min-w-0">
                      <SearchInput />
                    </div>
                    <SparkleButton onClick={() => setCreateModalOpen(true)}>
                      <span className="flex items-center gap-2">
                        <UserIcon size={18} color="#A0A0A0" />
                        <span>New Account</span>
                      </span>
                    </SparkleButton>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto" role="region" aria-label="Trading accounts table, scrollable">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-y border-white/5">
                      <th className="text-left text-caption font-bold tracking-label text-gfx-neutral-500 uppercase px-4 sm:px-6 py-4 w-[15%]">Account</th>
                      <th className="text-left text-caption font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[11%]">Platform</th>
                      <th className="text-left text-caption font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[8%]">Type</th>
                      <th className="text-left text-caption font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[12%]">Balance</th>
                      <th className="text-left text-caption font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[12%]">Equity</th>
                      <th className="text-left text-caption font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[11%]">Closed P&L</th>
                      <th className="text-left text-caption font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[10%]">Open P&L</th>
                      <th className="text-left text-caption font-bold tracking-label text-gfx-neutral-500 uppercase py-4 w-[7%]">Status</th>
                      <th className="text-right text-caption font-bold tracking-label text-gfx-neutral-500 uppercase pr-4 sm:pr-6 py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.map((acc, i) => (
                      <tr key={acc.account} className={i > 0 ? 'border-t border-white/5' : ''}>
                        <td className="px-4 sm:px-6 py-4 xl:py-5">
                          <div>
                            <p className="text-white text-sm 3xl:text-lg 4xl:text-2xl font-bold leading-tight">{acc.account}</p>
                            <p className="text-gfx-neutral-500 text-label mt-0.5">{acc.username}</p>
                          </div>
                        </td>
                        <td className="trading-account-platform text-sm 3xl:text-lg 4xl:text-2xl py-4 xl:py-5" data-trading-account-platform>{acc.platform}</td>
                        <td className="py-4 xl:py-5">
                          <Badge variant={acc.type}>{acc.type === 'genfx' ? 'GenFX' : '10X'}</Badge>
                        </td>
                        <td className="text-white text-sm 3xl:text-lg 4xl:text-2xl font-semibold py-4 xl:py-5">{acc.balance}</td>
                        <td className="text-white text-sm 3xl:text-lg 4xl:text-2xl font-semibold py-4 xl:py-5">{acc.equity}</td>
                        <td className={`text-sm 3xl:text-lg 4xl:text-2xl font-semibold py-4 xl:py-5 ${acc.closedPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.closedPL}</td>
                        <td className={`text-sm 3xl:text-lg 4xl:text-2xl font-semibold py-4 xl:py-5 ${acc.openPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.openPL}</td>
                        <td className="py-4 xl:py-5">
                          <div className="flex items-center gap-2">
                            <GreenDot size={8} />
                            <span className="text-gfx-neutral-500 text-sm 3xl:text-lg 4xl:text-2xl">{acc.status}</span>
                          </div>
                        </td>
                        <td className="text-right pr-4 sm:pr-6 py-4 xl:py-5">
                          <div className="flex items-center justify-end gap-6">
                            <button onClick={() => navigate(`/tradelocker/accounts/${encodeURIComponent(acc.account)}`)} className="trading-account-action text-gfx-neutral-500 text-sm hover:text-white transition-colors cursor-pointer">View</button>
                            <GlowButton
                              label="Trade"
                              width={100}
                              height={36}
                              fontSize={14}
                              onClick={openTradeLocker}
                            />
                            <button className="trading-account-action trading-account-more text-gfx-neutral-500 hover:text-white transition-colors cursor-pointer" aria-label="More options" data-trading-account-more>
                              <MoreDotsIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="h-6" />
            </GlassCard>
          </div>
        )}
      </div>

      <CreateAccountModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateAccount={() => setProcessingOpen(true)}
      />
      <AccountProcessingModal
        open={processingOpen}
        onClose={() => setProcessingOpen(false)}
        onComplete={() => setShowSuccess(true)}
      />
      <SuccessSnackbar
        open={showSuccess}
        message="Account created successfully"
        onClose={() => setShowSuccess(false)}
      />
    </div>
  )
}
