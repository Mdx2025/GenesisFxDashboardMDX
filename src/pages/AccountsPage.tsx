import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SparkleButton, Badge, GreenDot, SearchInput, GlowButton, GlassSelect, ModeToggle, SuccessSnackbar } from '@/components/ui'
import type { GlassSelectOption } from '@/components/ui/GlassSelect'
import { UserIcon } from '@/components/icons'
import { tradingAccounts, type TradingAccount } from '@/data/trading-accounts'
import { CreateAccountModal } from '@/components/accounts/CreateAccountModal'
import { AccountProcessingModal } from '@/components/accounts/AccountProcessingModal'
import { PlatformsView } from '@/components/accounts/PlatformsView'

const FILTER_TABS = ['All Accounts', 'Live', 'Demo', 'Platforms'] as const

const TYPE_OPTIONS: GlassSelectOption[] = [
  { value: 'all', label: 'All Types' },
  { value: 'genfx', label: 'GenFX' },
  { value: '10x', label: '10X' },
]

const GRID_COLS = '15% 11% 7.5% 10.8% 10.8% 10.8% 9.5% 6% auto'

function AccountCard({ acc }: { acc: TradingAccount }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-5 border-b border-white/5 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-white text-[0.9375rem] font-bold leading-tight">{acc.account}</p>
            <p className="text-gfx-neutral-300 text-[0.75rem] mt-0.5">{acc.username}</p>
          </div>
          <Badge variant={acc.type}>{acc.type === 'genfx' ? 'GenFX' : '10X'}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <GreenDot size={8} />
          <span className="text-gfx-neutral-300 text-[0.8125rem]">{acc.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-gfx-neutral-300 text-[0.6875rem] uppercase tracking-wider mb-1">Balance</p>
          <p className="text-white text-[0.875rem] font-semibold">{acc.balance}</p>
        </div>
        <div>
          <p className="text-gfx-neutral-300 text-[0.6875rem] uppercase tracking-wider mb-1">Equity</p>
          <p className="text-white text-[0.875rem] font-semibold">{acc.equity}</p>
        </div>
        <div>
          <p className="text-gfx-neutral-300 text-[0.6875rem] uppercase tracking-wider mb-1">Closed P&L</p>
          <p className={`text-[0.875rem] font-semibold ${acc.closedPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.closedPL}</p>
        </div>
        <div>
          <p className="text-gfx-neutral-300 text-[0.6875rem] uppercase tracking-wider mb-1">Open P&L</p>
          <p className={`text-[0.875rem] font-semibold ${acc.openPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.openPL}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <p className="text-white/60 text-[0.8125rem]">{acc.platform}</p>
        <div className="flex items-center gap-3">
          <button className="text-gfx-neutral-300 text-[0.8125rem] hover:text-white transition-colors cursor-pointer">View</button>
          <GlowButton label="Trade" width={88} height={34} fontSize={13} />
          <button className="text-gfx-neutral-300 hover:text-white transition-colors cursor-pointer" aria-label="More options">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4.66667 7.99935C4.66667 8.73573 4.06971 9.33268 3.33333 9.33268C2.59695 9.33268 2 8.73573 2 7.99935C2 7.26297 2.59695 6.66602 3.33333 6.66602C4.06971 6.66602 4.66667 7.26297 4.66667 7.99935Z" fill="white"/>
              <path d="M9.33333 7.99935C9.33333 8.73573 8.73638 9.33268 8 9.33268C7.26362 9.33268 6.66667 8.73573 6.66667 7.99935C6.66667 7.26297 7.26362 6.66602 8 6.66602C8.73638 6.66602 9.33333 7.26297 9.33333 7.99935Z" fill="white"/>
              <path d="M14 7.99935C14 8.73573 13.403 9.33268 12.6667 9.33268C11.9303 9.33268 11.3333 8.73573 11.3333 7.99935C11.3333 7.26297 11.9303 6.66602 12.6667 6.66602C13.403 6.66602 14 7.26297 14 7.99935Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AccountsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)
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
            <p className="text-gfx-neutral-300 text-body2 mt-1 sm:mt-2">
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

            <GlassCard variant="light" divider="white" rounded="26px" className="overflow-hidden">
              <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[500px] h-[200px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />

              <div className="flex flex-col gap-3 px-4 sm:px-6 xl:px-10 pt-5 sm:pt-6 xl:pt-8 pb-3 sm:pb-4 xl:pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <h2 className="text-[1rem] sm:text-[1.1875rem] font-bold tracking-tight text-white">Trading Accounts</h2>
                    <Badge variant="status">{filteredAccounts.length} ACTIVE</Badge>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none min-w-0">
                      <SearchInput />
                    </div>
                    <SparkleButton onClick={() => setCreateModalOpen(true)}>
                      <span className="flex items-center gap-2">
                        <UserIcon size={18} color="#A0A0A0" />
                        <span className="hidden sm:inline">New Account</span>
                        <span className="inline sm:hidden">New</span>
                      </span>
                    </SparkleButton>
                  </div>
                </div>
              </div>

              {/* Mobile/tablet card layout */}
              <div className="lg:hidden">
                {filteredAccounts.map((acc) => (
                  <AccountCard key={acc.account} acc={acc} />
                ))}
              </div>

              {/* Desktop table layout */}
              <div className="hidden lg:block overflow-x-auto">
                <div className="min-w-[900px]">
                  <div
                    className="grid items-center px-4 sm:px-6 xl:px-10 py-4 border-y border-white/5"
                    style={{ gridTemplateColumns: GRID_COLS }}
                  >
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Account</span>
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Platform</span>
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Type</span>
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Balance</span>
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Equity</span>
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Closed P&L</span>
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Open P&L</span>
                    <span className="text-[0.75rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase">Status</span>
                    <span />
                  </div>

                  {filteredAccounts.map((acc, i) => (
                    <div
                      key={acc.account}
                      className={`grid items-center px-4 sm:px-6 xl:px-10 py-4 xl:py-6 ${i > 0 ? 'border-t border-white/5' : ''}`}
                      style={{ gridTemplateColumns: GRID_COLS }}
                    >
                      <div>
                        <p className="text-white text-[0.9375rem] font-bold leading-tight">{acc.account}</p>
                        <p className="text-gfx-neutral-300 text-[0.8125rem] mt-0.5">{acc.username}</p>
                      </div>
                      <p className="text-[0.9375rem] text-white/60">{acc.platform}</p>
                      <div>
                        <Badge variant={acc.type}>{acc.type === 'genfx' ? 'GenFX' : '10X'}</Badge>
                      </div>
                      <p className="text-white text-[0.9375rem] font-semibold">{acc.balance}</p>
                      <p className="text-white text-[0.9375rem] font-semibold">{acc.equity}</p>
                      <p className={`text-[0.9375rem] font-semibold ${acc.closedPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.closedPL}</p>
                      <p className={`text-[0.9375rem] font-semibold ${acc.openPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{acc.openPL}</p>
                      <div className="flex items-center gap-2">
                        <GreenDot size={8} />
                        <span className="text-gfx-neutral-300 text-[0.875rem]">{acc.status}</span>
                      </div>
                      <div className="flex items-center justify-end gap-6">
                        <button className="text-gfx-neutral-300 text-[0.875rem] hover:text-white transition-colors cursor-pointer">View</button>
                        <GlowButton label="Trade" width={100} height={36} fontSize={14} />
                        <button className="text-gfx-neutral-300 hover:text-white transition-colors cursor-pointer" aria-label="More options">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4.66667 7.99935C4.66667 8.73573 4.06971 9.33268 3.33333 9.33268C2.59695 9.33268 2 8.73573 2 7.99935C2 7.26297 2.59695 6.66602 3.33333 6.66602C4.06971 6.66602 4.66667 7.26297 4.66667 7.99935Z" fill="white"/>
                            <path d="M9.33333 7.99935C9.33333 8.73573 8.73638 9.33268 8 9.33268C7.26362 9.33268 6.66667 8.73573 6.66667 7.99935C6.66667 7.26297 7.26362 6.66602 8 6.66602C8.73638 6.66602 9.33333 7.26297 9.33333 7.99935Z" fill="white"/>
                            <path d="M14 7.99935C14 8.73573 13.403 9.33268 12.6667 9.33268C11.9303 9.33268 11.3333 8.73573 11.3333 7.99935C11.3333 7.26297 11.9303 6.66602 12.6667 6.66602C13.403 6.66602 14 7.26297 14 7.99935Z" fill="white"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
