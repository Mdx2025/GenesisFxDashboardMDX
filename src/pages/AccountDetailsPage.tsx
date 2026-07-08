import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, Badge, GreenDot, SparkleButton, GlowButton, GlassSelect, GlassInput, ModeToggle } from '@/components/ui'
import { DepositIcon, ChevronDownIcon } from '@/components/icons'
import { SummaryCard } from '@/components/dashboard/SummaryCard'
import { TradingCalendar } from '@/components/accounts/TradingCalendar'
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
        <div className="relative bg-[#0a0a0a] rounded-[2.5rem] glass-card shadow-[0px_9px_37px_0px_rgba(0,0,0,0.30)] backdrop-blur-xl overflow-hidden">
          <div className="absolute left-1/2 -translate-x-1/2 -top-[20%] w-[400px] h-[200px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
          <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gfx-neutral-300 transition-colors cursor-pointer z-10" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {children}
        </div>
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <SummaryCard title="Balance" value="$1,200.00" changeText="+12.4% this month" changeColor="green" />
        <SummaryCard title="Credit" value="$5,000.00" changeText="+$3,517.30" changeColor="green" />
        <SummaryCard title="Equity" value="$200.00" changeText="+12.4% this month" changeColor="green" />
        <SummaryCard title="Open P&L" value="$1,500.00" changeText="+12.4% this month" changeColor="green" />
        <SummaryCard title="Closed P&L" value="$700.00" changeText="+$3,517.30" changeColor="green" />
      </div>

      {/* Chart + Account Details */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">
        {/* Portfolio Chart */}
        <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden p-5 xl:p-8">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[200px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
          <div className="relative z-10">
            <p className="text-gfx-neutral-300 text-body2">Portfolio Equity</p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-white text-h2 font-normal">$17,897.30</p>
              <div className="flex items-center gap-1.5">
                <span className="text-gfx-green-500 text-body2">▲</span>
                <span className="text-gfx-green-500 text-body2">+$6,437.21 (56.1%)</span>
              </div>
            </div>
            <div className="h-full mt-6">
              <PortfolioChart config={{ ...defaultChartConfig, highlightIndex: -1 }} />
            </div>
          </div>
        </GlassCard>

        {/* Account Details Panel */}
        <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden p-5 xl:p-6">
          <div className="absolute -left-[60px] -top-[60px] w-[200px] h-[200px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-[1.5rem] font-normal">Account Details</h2>
              <div className="flex items-center gap-3 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" className="opacity-60">
                  <circle cx="8.19061" cy="4.09344" r="2.73016" fill="white"/>
                  <ellipse cx="8.19038" cy="11.6013" rx="4.77778" ry="2.73016" fill="white"/>
                </svg>
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="w-9 h-9 rounded-[6px] border border-[#064B34] flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Settings"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.48661 1.36719C7.72636 1.36719 7.03402 1.77719 5.64934 2.5972L5.18101 2.87455C3.79633 3.69456 3.10399 4.10456 2.72387 4.77989C2.34375 5.45521 2.34375 6.27522 2.34375 7.91524V8.46993C2.34375 10.1099 2.34375 10.93 2.72387 11.6053C3.10399 12.2806 3.79633 12.6906 5.18101 13.5106L5.64934 13.788C7.03402 14.608 7.72636 15.018 8.48661 15.018C9.24685 15.018 9.93919 14.608 11.3239 13.788L11.7922 13.5106C13.1769 12.6906 13.8692 12.2806 14.2493 11.6053C14.6295 10.93 14.6295 10.1099 14.6295 8.46993V7.91524C14.6295 6.27522 14.6295 5.45521 14.2493 4.77989C13.8692 4.10456 13.1769 3.69456 11.7922 2.87455L11.3239 2.5972C9.93919 1.77719 9.24685 1.36719 8.48661 1.36719ZM5.92708 8.19258C5.92708 6.779 7.07302 5.63306 8.48661 5.63306C9.90019 5.63306 11.0461 6.779 11.0461 8.19258C11.0461 9.60617 9.90019 10.7521 8.48661 10.7521C7.07302 10.7521 5.92708 9.60617 5.92708 8.19258Z" fill="white"/>
                  </svg>
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

      {/* Trading Calendar */}
      <div className="mt-6 3xl:mt-8">
        <TradingCalendar />
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
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.48773 8.59889V6.84205C4.48773 3.65441 7.07182 1.07031 10.2595 1.07031C13.4471 1.07031 16.0312 3.65441 16.0312 6.84205V8.59889C16.9844 8.67008 17.6051 8.8498 18.0589 9.30353C18.8102 10.0549 18.8102 11.2641 18.8102 13.6826C18.8102 16.1011 18.8102 17.3104 18.0589 18.0617C17.3075 18.8131 16.0983 18.8131 13.6798 18.8131H6.83918C4.42066 18.8131 3.21141 18.8131 2.46008 18.0617C1.70874 17.3104 1.70874 16.1011 1.70874 13.6826C1.70874 11.2641 1.70874 10.0549 2.46008 9.30353C2.9138 8.8498 3.53453 8.67008 4.48773 8.59889ZM5.77033 6.84205C5.77033 4.36277 7.78019 2.35292 10.2595 2.35292C12.7387 2.35292 14.7486 4.36277 14.7486 6.84205V8.55525C14.4211 8.5522 14.0658 8.5522 13.6798 8.5522H6.83918C6.4531 8.5522 6.09784 8.5522 5.77033 8.55525V6.84205Z" fill="#00B38C"/>
            </svg>
          </div>
          <h2 className="text-white text-h2 font-normal mb-2">Change Password</h2>
          <p className="text-gfx-neutral-300 text-body2 mb-8 text-center">Create a secure new password for your Tradelocker account.</p>
          <div className="w-full max-w-[34rem] flex flex-col gap-4">
            <GlassInput label="New password" placeholder="Enter new password" type="password" />
            <GlassInput label="Confirm Password" placeholder="Confirm new password" type="password" />
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
