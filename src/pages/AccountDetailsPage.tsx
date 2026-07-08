import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, Badge, GreenDot, SparkleButton, GlowButton, GlassSelect, GlassInput, ModeToggle } from '@/components/ui'
import { DepositIcon, ChevronDownIcon } from '@/components/icons'
import { SummaryCard } from '@/components/dashboard/SummaryCard'
import { PortfolioChart, defaultChartConfig } from '@/components/charts/PortfolioChart'
import { tradingAccounts } from '@/data/trading-accounts'
import { GLOW_GREEN, GLOW_RED } from '@/constants/colors'

const ACCOUNT_DETAILS_FIELDS = [
  { label: 'Account Number', key: 'account' },
  { label: 'Account Name', key: 'username' },
  { label: 'Type', key: 'type' },
  { label: 'Platform', key: 'platform' },
  { label: 'Server', key: 'server' },
  { label: 'Currency', key: 'currency' },
  { label: 'Leverage', key: 'leverage' },
  { label: 'Status', key: 'status' },
  { label: 'Created Date', key: 'createdDate' },
] as const

const ORDER_COLS = ['Open Time', 'Symbol', 'Type', 'Volume', 'Open Price', 'S/L', 'T/P', 'Close Time', 'Close Price', 'Profit']

const MOCK_ORDERS = [
  { openTime: 'Apr 15, 2026', symbol: 'EURUSD', type: 'Buy', volume: '0.10', openPrice: '1.08450', sl: '1.08200', tp: '1.08900', closeTime: 'Apr 15, 2026', closePrice: '1.08720', profit: '+$27.00', profitColor: 'green' as const },
  { openTime: 'Apr 14, 2026', symbol: 'GBPJPY', type: 'Sell', volume: '0.05', openPrice: '191.350', sl: '191.800', tp: '190.500', closeTime: 'Apr 14, 2026', closePrice: '190.680', profit: '+$33.50', profitColor: 'green' as const },
  { openTime: 'Apr 13, 2026', symbol: 'XAUUSD', type: 'Buy', volume: '0.02', openPrice: '2345.50', sl: '2340.00', tp: '2360.00', closeTime: 'Apr 13, 2026', closePrice: '2338.20', profit: '-$14.60', profitColor: 'red' as const },
  { openTime: 'Apr 12, 2026', symbol: 'USDJPY', type: 'Sell', volume: '0.08', openPrice: '154.200', sl: '154.600', tp: '153.500', closeTime: 'Apr 12, 2026', closePrice: '153.750', profit: '+$36.00', profitColor: 'green' as const },
  { openTime: 'Apr 11, 2026', symbol: 'EURUSD', type: 'Buy', volume: '0.15', openPrice: '1.07980', sl: '1.07700', tp: '1.08400', closeTime: 'Apr 11, 2026', closePrice: '1.07850', profit: '-$19.50', profitColor: 'red' as const },
]

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.167 12.5a1.375 1.375 0 00.275 1.517l.05.05a1.667 1.667 0 01-1.18 2.846 1.667 1.667 0 01-1.179-.488l-.05-.05a1.375 1.375 0 00-1.516-.275 1.375 1.375 0 00-.834 1.258v.142a1.667 1.667 0 11-3.333 0v-.075a1.375 1.375 0 00-.9-1.258 1.375 1.375 0 00-1.517.275l-.05.05a1.667 1.667 0 11-2.358-2.358l.05-.05a1.375 1.375 0 00.275-1.517 1.375 1.375 0 00-1.258-.833h-.142a1.667 1.667 0 110-3.334h.075a1.375 1.375 0 001.258-.9 1.375 1.375 0 00-.275-1.516l-.05-.05A1.667 1.667 0 115.575 3.55l.05.05a1.375 1.375 0 001.517.275h.066a1.375 1.375 0 00.834-1.258v-.142a1.667 1.667 0 013.333 0v.075a1.375 1.375 0 00.834 1.258 1.375 1.375 0 001.516-.275l.05-.05a1.667 1.667 0 112.358 2.358l-.05.05a1.375 1.375 0 00-.275 1.517v.066a1.375 1.375 0 001.258.834h.142a1.667 1.667 0 010 3.333h-.075a1.375 1.375 0 00-1.258.834z" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BackArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ModalOverlay({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 w-full max-w-[50rem] mx-4" onClick={(e) => e.stopPropagation()}>
        <GlassCard variant="light" divider="none" rounded="30px" className="overflow-hidden">
          <div className="absolute left-1/2 -translate-x-1/2 -top-[20%] w-[400px] h-[200px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
          <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gfx-neutral-300 transition-colors cursor-pointer z-10" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {children}
        </GlassCard>
      </div>
    </div>
  )
}

export default function AccountDetailsPage() {
  const { accountId } = useParams<{ accountId: string }>()
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [leverageModal, setLeverageModal] = useState(false)
  const [ordersTab, setOrdersTab] = useState(0)

  const account = tradingAccounts.find(a => a.account === accountId) ?? tradingAccounts[0]

  const details: Record<string, string> = {
    account: account.account,
    username: account.username,
    type: account.type === 'genfx' ? 'GenFX' : '10X',
    platform: account.platform,
    server: 'GENFX',
    currency: 'USD',
    leverage: '1200',
    status: account.status,
    createdDate: '03/13/2026',
  }

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Tradelocker', href: '/tradelocker/accounts' },
          { label: 'Accounts', href: '/tradelocker/accounts' },
          { label: 'Account Details', current: true },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 3xl:mt-8 4xl:mt-10">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/tradelocker/accounts')}
            className="w-[38px] h-[38px] rounded-[10px] bg-[#09241C] flex items-center justify-center hover:bg-[#0C3126] transition-colors cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <BackArrow />
          </button>
          <h1 className="text-white text-h1 font-normal">{account.account}</h1>
          <span className="text-gfx-neutral-300 text-body2">Born To Outperform</span>
          <Badge variant={account.type}>{account.type === 'genfx' ? 'GenFX' : '10X'}</Badge>
          <div className="flex items-center gap-2">
            <GreenDot size={7} />
            <span className="text-white text-body2">{account.status}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SparkleButton>
            <span className="flex items-center gap-2">
              <DepositIcon size={16} color="#A0A0A0" />
              <span>Deposit</span>
            </span>
          </SparkleButton>
          <GlowButton label="Trade" width={106} height={44} fontSize={16} />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 3xl:mt-8">
        <SummaryCard title="Balance" value="$1,200.00" changeText="+12.4% this month" changeColor="green" />
        <SummaryCard title="Credit" value="$5,000.00" changeText="+$3,517.30" changeColor="red" glowColor={GLOW_RED} />
        <SummaryCard title="Equity" value="$200.00" changeText="+12.4% this month" changeColor="green" />
        <SummaryCard title="Open P&L" value="$1,500.00" changeText="+12.4% this month" changeColor="green" />
        <SummaryCard title="Closed P&L" value="$700.00" changeText="+$3,517.30" changeColor="red" glowColor={GLOW_RED} />
      </div>

      {/* Chart + Account Details */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5 mt-6 3xl:mt-8">
        {/* Portfolio Chart */}
        <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden p-5 xl:p-8">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[200px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
          <div className="relative z-10">
            <p className="text-gfx-neutral-300 text-body2">Portfolio Equity</p>
            <p className="text-white text-h2 font-normal mt-1">$17,897.30</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-gfx-green-500 text-body2">▲</span>
              <span className="text-gfx-green-500 text-body2">+$6,437.21 (56.1%)</span>
            </div>
            <div className="h-[280px] mt-6">
              <PortfolioChart config={{ ...defaultChartConfig, highlightIndex: -1 }} />
            </div>
          </div>
        </GlassCard>

        {/* Account Details Panel */}
        <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden p-5 xl:p-6">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-[1.5rem] font-normal">Account Details</h2>
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="w-9 h-9 rounded-[6px] border border-[#064B34] flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Settings"
                >
                  <SettingsIcon />
                </button>
                {settingsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 w-[185px] rounded-[20px] bg-[#0C1311] border border-[#064B34] shadow-lg backdrop-blur-[50px] z-50 overflow-hidden">
                      <button onClick={() => { setSettingsOpen(false); setEditModal(true) }} className="w-full text-left px-5 py-3.5 text-white text-[1rem] font-medium hover:bg-white/5 transition-colors cursor-pointer">Change Username</button>
                      <div className="h-px bg-[#09241C] mx-4" />
                      <button onClick={() => { setSettingsOpen(false); setPasswordModal(true) }} className="w-full text-left px-5 py-3.5 text-white text-[1rem] font-medium hover:bg-white/5 transition-colors cursor-pointer">Change Password</button>
                      <div className="h-px bg-[#09241C] mx-4" />
                      <button onClick={() => { setSettingsOpen(false); setLeverageModal(true) }} className="w-full text-left px-5 py-3.5 text-white text-[1rem] font-medium hover:bg-white/5 transition-colors cursor-pointer">Change Leverage</button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              {ACCOUNT_DETAILS_FIELDS.map((field, i) => (
                <div key={field.key}>
                  {i > 0 && <div className="h-px bg-[#09241C]" />}
                  <div className="flex items-center justify-between py-3.5">
                    <span className="text-gfx-neutral-300 text-[0.875rem]">{field.label}</span>
                    <span className="text-white text-[0.875rem]">{details[field.key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Orders Table */}
      <div className="mt-6 3xl:mt-8">
        <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden">
          <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[400px] h-[160px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-[1.1875rem] font-bold tracking-tight text-white">Orders</h2>
                <Badge variant="status">{MOCK_ORDERS.length} records</Badge>
              </div>
              <div className="w-full max-w-xs">
                <ModeToggle options={['Open', 'Closed', 'Pending']} activeIndex={ordersTab} onChange={setOrdersTab} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto" role="region" aria-label="Orders table, scrollable">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-y border-white/5">
                  {ORDER_COLS.map((col, i) => (
                    <th key={col} className={`text-${i === ORDER_COLS.length - 1 ? 'right' : 'left'} text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase ${i === 0 ? 'px-4 sm:px-6' : ''} ${i === ORDER_COLS.length - 1 ? 'pr-4 sm:pr-6' : ''} py-4`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_ORDERS.map((order, i) => (
                  <tr key={i} className={i > 0 ? 'border-t border-white/5' : ''}>
                    <td className="px-4 sm:px-6 py-4 xl:py-5 text-white text-[0.875rem]">{order.openTime}</td>
                    <td className="py-4 xl:py-5 text-white text-[0.875rem] font-semibold">{order.symbol}</td>
                    <td className="py-4 xl:py-5">
                      <span className={`text-[0.875rem] ${order.type === 'Buy' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{order.type}</span>
                    </td>
                    <td className="py-4 xl:py-5 text-white text-[0.875rem]">{order.volume}</td>
                    <td className="py-4 xl:py-5 text-white text-[0.875rem]">{order.openPrice}</td>
                    <td className="py-4 xl:py-5 text-white text-[0.875rem]">{order.sl}</td>
                    <td className="py-4 xl:py-5 text-white text-[0.875rem]">{order.tp}</td>
                    <td className="py-4 xl:py-5 text-white text-[0.875rem]">{order.closeTime}</td>
                    <td className="py-4 xl:py-5 text-white text-[0.875rem]">{order.closePrice}</td>
                    <td className={`text-right pr-4 sm:pr-6 py-4 xl:py-5 text-[0.875rem] font-semibold ${order.profitColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}`}>{order.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-6" />
        </GlassCard>
      </div>

      {/* Edit Account Modal */}
      <ModalOverlay open={editModal} onClose={() => setEditModal(false)}>
        <div className="relative z-10 flex flex-col items-center p-8 sm:p-12">
          <div className="w-[59px] h-[59px] rounded-full bg-[#09241C] flex items-center justify-center mb-6">
            <SettingsIcon />
          </div>
          <h2 className="text-white text-h2 font-normal mb-8">Edit Account Details</h2>
          <div className="w-full max-w-[34rem]">
            <GlassInput label="Account Name" placeholder={account.username} />
          </div>
          <div className="flex items-center gap-4 mt-8">
            <SparkleButton onClick={() => setEditModal(false)}>Cancel</SparkleButton>
            <GlowButton label="Save Changes" width={171} height={44} fontSize={16} onClick={() => setEditModal(false)} />
          </div>
        </div>
      </ModalOverlay>

      {/* Change Password Modal */}
      <ModalOverlay open={passwordModal} onClose={() => setPasswordModal(false)}>
        <div className="relative z-10 flex flex-col items-center p-8 sm:p-12">
          <div className="w-[59px] h-[59px] rounded-full bg-[#09241C] flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="text-white text-h2 font-normal mb-2">Change Password</h2>
          <p className="text-gfx-neutral-300 text-body2 mb-8 text-center">Create a secure new password for your Tradelocker account.</p>
          <div className="w-full max-w-[34rem] flex flex-col gap-4">
            <GlassInput label="New password" placeholder="Enter new password" />
            <GlassInput label="Confirm Password" placeholder="Confirm new password" />
          </div>
          <div className="w-full max-w-[34rem] mt-6">
            <p className="text-white text-[0.875rem] font-medium mb-2">Password requirements:</p>
            <ul className="text-gfx-neutral-300 text-[0.8125rem] space-y-1 list-disc pl-5">
              <li>At least 8 characters</li>
              <li>At least 1 number</li>
              <li>At least 1 special character</li>
              <li>Uppercase and lowercase letters</li>
              <li>Password match</li>
            </ul>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <SparkleButton onClick={() => setPasswordModal(false)}>Cancel</SparkleButton>
            <GlowButton label="Save Changes" width={171} height={44} fontSize={16} onClick={() => setPasswordModal(false)} />
          </div>
        </div>
      </ModalOverlay>

      {/* Change Leverage Modal */}
      <ModalOverlay open={leverageModal} onClose={() => setLeverageModal(false)}>
        <div className="relative z-10 flex flex-col items-center p-8 sm:p-12">
          <h2 className="text-white text-h2 font-normal mb-6">Change Leverage</h2>
          <div className="flex items-center gap-8 mb-8 text-[0.875rem]">
            <div><span className="text-gfx-neutral-300">Account: </span><span className="text-white">{account.account}</span></div>
            <div><span className="text-gfx-neutral-300">Current: </span><span className="text-white">1200</span></div>
          </div>
          <div className="w-full max-w-[34rem]">
            <GlassSelect
              options={[
                { value: '100', label: '1:100' },
                { value: '200', label: '1:200' },
                { value: '500', label: '1:500' },
                { value: '1000', label: '1:1000' },
                { value: '1200', label: '1:1200' },
              ]}
              placeholder="Select your Leverage"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="flex items-center gap-4 mt-8">
            <SparkleButton onClick={() => setLeverageModal(false)}>Cancel</SparkleButton>
            <GlowButton label="Save Changes" width={171} height={44} fontSize={16} onClick={() => setLeverageModal(false)} />
          </div>
        </div>
      </ModalOverlay>
    </div>
  )
}
