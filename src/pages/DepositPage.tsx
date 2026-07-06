import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassSelect, FloatingNavBar, DividerGlow } from '@/components/ui'
import { ChevronDownIcon, SearchIcon } from '@/components/icons'

function UsdtIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#26A17B" />
      <path d="M13.4 10.9v-1.5h3.1V7H7.5v2.4h3.1v1.5c-2.7.1-4.7.7-4.7 1.4 0 .7 2 1.3 4.7 1.4v4.3h1.8v-4.3c2.7-.1 4.7-.7 4.7-1.4 0-.7-2-1.3-4.7-1.4zm0 2.3v0c-.1 0-.5 0-.9 0s-.7 0-.9 0v0c-2.4-.1-4.2-.6-4.2-1.1 0-.5 1.8-1 4.2-1.1v1.7c.2 0 .6 0 .9 0 .4 0 .7 0 .9 0v-1.7c2.4.1 4.2.6 4.2 1.1 0 .5-1.8 1-4.2 1.1z" fill="white" />
    </svg>
  )
}

function BtcIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#F7931A" />
      <path d="M15.5 10.8c.2-1.4-.8-2.1-2.3-2.6l.5-1.9-1.2-.3-.5 1.9c-.3-.1-.6-.2-1-.2l.5-1.9-1.2-.3-.5 1.9c-.3-.1-.5-.1-.7-.2l-1.6-.4-.3 1.3s.9.2.9.2c.5.1.6.4.5.7l-.5 2.1c0 0 .1 0 .1 0l-.1 0-.8 3c-.1.2-.2.4-.6.3 0 0-.9-.2-.9-.2l-.6 1.4 1.5.4c.3.1.6.1.8.2l-.5 2 1.2.3.5-1.9c.3.1.7.2 1 .3l-.5 1.9 1.2.3.5-2c2.1.4 3.6.2 4.3-1.6.5-1.5 0-2.3-1.1-2.9.8-.2 1.4-.7 1.5-1.8zm-2.8 3.9c-.4 1.5-2.8.7-3.6.5l.6-2.6c.8.2 3.4.6 3 2.1zm.4-3.9c-.3 1.3-2.3.7-3 .5l.6-2.3c.7.2 2.8.5 2.4 1.8z" fill="white" />
    </svg>
  )
}

function EthIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#627EEA" />
      <path d="M12 4v5.9l5 2.2L12 4z" fill="white" fillOpacity="0.6" />
      <path d="M12 4L7 12.1l5-2.2V4z" fill="white" />
      <path d="M12 16.5v3.5l5-6.9-5 3.4z" fill="white" fillOpacity="0.6" />
      <path d="M12 20v-3.5L7 13.1l5 6.9z" fill="white" />
      <path d="M12 15.4l5-3.3-5-2.2v5.5z" fill="white" fillOpacity="0.2" />
      <path d="M7 12.1l5 3.3V9.9l-5 2.2z" fill="white" fillOpacity="0.6" />
    </svg>
  )
}

function UsdcIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#2775CA" />
      <path d="M15.2 13.8c0-1.5-0.9-2-2.7-2.2-1.3-.2-1.5-.5-1.5-1.1s.5-1 1.3-1c.7 0 1.2.3 1.4.9.1.1.1.2.3.2h.6c.1 0 .2-.1.2-.2v-.1c-.2-.8-.9-1.4-1.7-1.5V8.2c0-.1-.1-.2-.3-.2h-.5c-.1 0-.3.1-.3.2v.6c-1.2.2-1.9.9-1.9 1.9 0 1.4.9 1.9 2.7 2.2 1.2.2 1.5.6 1.5 1.2 0 .7-.6 1.1-1.4 1.1-.9 0-1.3-.4-1.5-1-.1-.1-.1-.2-.3-.2h-.6c-.1 0-.2.1-.2.2v.1c.2.9.8 1.5 2 1.7v.6c0 .1.1.2.3.2h.5c.1 0 .3-.1.3-.2v-.6c1.2-.2 2-.9 2-2z" fill="white" />
    </svg>
  )
}

function SolIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#658FFF" />
      <path d="M7.5 14.8c.1-.1.2-.1.3-.1h8.5c.2 0 .3.2.1.3l-1.6 1.6c-.1.1-.2.1-.3.1H6c-.2 0-.3-.2-.1-.3l1.6-1.6zm0-7.4c.1-.1.2-.1.3-.1h8.5c.2 0 .3.2.1.3L14.8 9.2c-.1.1-.2.1-.3.1H6c-.2 0-.3-.2-.1-.3l1.6-1.6zm8.9 3.6c-.1-.1-.2-.1-.3-.1H7.6c-.2 0-.3.2-.1.3l1.6 1.6c.1.1.2.1.3.1h8.5c.2 0 .3-.2.1-.3l-1.6-1.6z" fill="white" />
    </svg>
  )
}

const COINS = [
  { id: 'btc', label: 'BTC', icon: <BtcIcon /> },
  { id: 'eth', label: 'ETH', icon: <EthIcon /> },
  { id: 'usdt', label: 'USDT', icon: <UsdtIcon /> },
  { id: 'usdc', label: 'USDC', icon: <UsdcIcon /> },
]

const EXTRA_COINS = [
  <BtcIcon size={30} key="x-btc" />,
  <SolIcon size={30} key="x-sol" />,
  <UsdtIcon size={30} key="x-usdt" />,
  <EthIcon size={30} key="x-eth" />,
  <UsdcIcon size={30} key="x-usdc" />,
]

const NETWORK_OPTIONS = [
  { value: 'erc20', label: 'Ethereum (ERC-20)' },
  { value: 'trc20', label: 'Tron (TRC-20)' },
  { value: 'bep20', label: 'BSC (BEP-20)' },
  { value: 'sol', label: 'Solana (SOL)' },
]

const FAQS = [
  'What is TradeLocker and how does it work?',
  'Is my money secure in a Genesis trading account?',
  'What is the minimum age to trade with Genesis?',
  'How does Genesis keep client funds safe?',
]

const TRANSACTIONS = [
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Deposit' as const, amount: '+$210', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
]

export default function DepositPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState('usdt')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="flex w-full min-h-screen bg-gfx-main text-white font-acid">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

        <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
          <TopBar
            menuOpen={sidebarOpen}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            breadcrumbItems={[
              { label: 'Assets Management', href: '/assets-management' },
              { label: 'Funding', href: '/assets-management' },
              { label: 'Deposit', current: true },
            ]}
          />

          <div className="mt-8 mb-10">
            <h1 className="text-white font-normal leading-none text-[clamp(1.5rem,0.75rem+1.5vw,3.5rem)]">
              Deposit Funds
            </h1>
            <p className="text-gfx-neutral-300 text-[16px] font-medium mt-1 max-w-[522px] leading-[24.44px]">
              All payments will be credited to your main wallet. You can then transfer funds to your trading accounts.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-10 xl:gap-20">
            {/* Steps column */}
            <div className="flex-1 max-w-[600px]">
              {/* Step 1: Select Coin */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_15.7px_5px_rgba(255,255,255,0.25)] [filter:blur(0.3px)]">
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true">
                      <path d="M1 3.5L3.5 6L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1 w-px bg-white mt-3 mb-1" />
                </div>
                <div className="pb-6 flex-1 min-w-0">
                  <h3 className="text-[24px] text-white font-normal leading-[30px]">Select Coin</h3>
                  <div className="mt-4 flex items-center h-[50px] bg-[#0f1e19] rounded-[30px] px-5 gap-3 max-w-[546px]">
                    <SearchIcon size={24} color="#808080" />
                    <span className="text-[#808080] text-[16px] flex-1">Search Coin</span>
                    <ChevronDownIcon size={14} color="#606060" />
                  </div>
                  <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                    {COINS.map(coin => (
                      <button
                        key={coin.id}
                        type="button"
                        onClick={() => setSelectedCoin(coin.id)}
                        className={`h-[50px] px-4 rounded-[30px] flex items-center gap-2.5 cursor-pointer transition-colors ${
                          selectedCoin === coin.id
                            ? 'bg-[#064b34] border border-[#0a714f]'
                            : 'bg-[#011b12] border border-transparent hover:bg-[#021B13]'
                        }`}
                      >
                        {coin.icon}
                        <span className="text-white text-[16px] font-medium">{coin.label}</span>
                      </button>
                    ))}
                    <div className="flex -space-x-1 ml-2">
                      {EXTRA_COINS.map((icon, i) => (
                        <div key={i} className="w-[30px] h-[30px] rounded-full ring-2 ring-gfx-main">
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Select Network */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <span className="text-black text-[16px] font-medium">2</span>
                  </div>
                  <div className="flex-1 w-px bg-[#404040] mt-3 mb-1" />
                </div>
                <div className="pb-6 flex-1 min-w-0">
                  <h3 className="text-[24px] text-white font-normal leading-[30px]">Select Network</h3>
                  <div className="mt-4 max-w-[546px]">
                    <GlassSelect
                      options={NETWORK_OPTIONS}
                      placeholder="Select Network"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Deposit Address */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#404040] flex items-center justify-center">
                    <span className="text-[#a0a0a0] text-[16px] font-medium">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-[24px] text-gfx-neutral-300 font-normal leading-[30px]">Deposit Address</h3>
                </div>
              </div>
            </div>

            {/* FAQs column */}
            <div className="xl:w-[380px] 2xl:w-[420px] shrink-0">
              <h2 className="text-[24px] font-normal mb-6 leading-[30px]">FAQs</h2>
              <div className="space-y-4">
                {FAQS.map((question, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full rounded-[30px] border border-[rgba(0,240,160,0.2)] px-8 py-7 flex items-center justify-between gap-6 text-left cursor-pointer hover:border-[rgba(0,240,160,0.35)] transition-colors"
                  >
                    <span className="text-[18px] text-white font-normal leading-[22.5px]">{question}</span>
                    <div className={`w-11 h-11 rounded-[15px] bg-gradient-to-b from-[#011b12] to-[#08291e] flex items-center justify-center shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}>
                      <ChevronDownIcon size={14} color="#00f0a0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-16 max-w-[700px]">
            <h2 className="text-[24px] font-normal mb-6 leading-[30px]">Recent Transactions</h2>
            <GlassCard variant="heavy" rounded="19px">
              <div className="relative z-10">
                <DividerGlow variant="green" />
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr>
                        <th className="px-6 pt-6 pb-4 text-left text-[12px] font-bold uppercase tracking-[2.32px] text-gfx-neutral-300 whitespace-nowrap">Time (UTC+)</th>
                        <th className="px-4 pt-6 pb-4 text-left text-[12px] font-bold uppercase tracking-[2.32px] text-gfx-neutral-300">Type</th>
                        <th className="px-4 pt-6 pb-4 text-left text-[12px] font-bold uppercase tracking-[2.32px] text-gfx-neutral-300">Coin</th>
                        <th className="px-4 pt-6 pb-4 text-left text-[12px] font-bold uppercase tracking-[2.32px] text-gfx-neutral-300">Amount</th>
                        <th className="px-4 pt-6 pb-4 text-left text-[12px] font-bold uppercase tracking-[2.32px] text-gfx-neutral-300">Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TRANSACTIONS.map((tx, i) => (
                        <tr key={i} className={i > 0 ? 'border-t border-white/5' : ''}>
                          <td className="px-6 py-5 text-[14px] text-white whitespace-nowrap">{tx.date}</td>
                          <td className="px-4 py-5 text-[14px] text-white">{tx.type}</td>
                          <td className="px-4 py-5"><UsdtIcon size={30} /></td>
                          <td className={`px-4 py-5 text-[14px] font-medium ${tx.type === 'Deposit' ? 'text-gfx-green-500' : 'text-[#d46356]'}`}>{tx.amount}</td>
                          <td className="px-4 py-5 text-[14px] text-white">{tx.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <FloatingNavBar />
        </div>
      </main>
    </div>
  )
}
