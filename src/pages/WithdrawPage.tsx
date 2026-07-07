import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassSelect, GlassSelectIcon, GlassInput, GlowButton, FloatingNavBar, DividerGlow } from '@/components/ui'
import { WithdrawCodeModal } from '@/components/modals/WithdrawCodeModal'
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

interface CoinConfig {
  id: string
  label: string
  name: string
  icon: React.ReactNode
}

const COINS: CoinConfig[] = [
  { id: 'btc', label: 'BTC', name: 'Bitcoin', icon: <BtcIcon /> },
  { id: 'eth', label: 'ETH', name: 'Ethereum', icon: <EthIcon /> },
  { id: 'usdt', label: 'USDT', name: 'Tether US', icon: <UsdtIcon /> },
  { id: 'usdc', label: 'USDC', name: 'USD Coin', icon: <UsdcIcon /> },
]

interface NetworkConfig {
  value: string
  label: string
  shortLabel: string
}

const NETWORK_OPTIONS: NetworkConfig[] = [
  { value: 'erc20', label: 'Ethereum (ERC20)', shortLabel: 'ETH' },
  { value: 'trc20', label: 'Tron (TRC20)', shortLabel: 'TRX' },
  { value: 'bep20', label: 'BSC (BEP20)', shortLabel: 'BSC' },
  { value: 'sol', label: 'Solana (SOL)', shortLabel: 'SOL' },
]

const FAQS = [
  { question: 'How long does a withdrawal take?', tag: 'Withdrawals', answer: 'Withdrawals are typically processed within 1–3 business days depending on the network and verification status of your account.' },
  { question: 'Is there a minimum withdrawal amount?', tag: 'Withdrawals', answer: 'Yes, the minimum withdrawal varies by asset. For USDT it is $10, for BTC it is 0.0005 BTC, and for ETH it is 0.01 ETH.' },
  { question: 'Why is my withdrawal pending?', tag: 'Withdrawals', answer: 'Pending withdrawals may require additional verification for security purposes. Check your email for any confirmation requests.' },
  { question: 'Can I cancel a withdrawal request?', tag: 'Withdrawals', answer: 'You can cancel a withdrawal while it is still in "Pending" status. Once approved and sent to the blockchain, it cannot be reversed.' },
]

const TRANSACTIONS = [
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Deposit' as const, amount: '+$210', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
]

function StepCircle({ stepNumber, status }: { stepNumber: number; status: 'completed' | 'active' | 'inactive' }) {
  if (status === 'inactive') {
    return (
      <div className="w-10 h-10 rounded-full bg-[#404040] flex items-center justify-center">
        <span className="text-[#a0a0a0] text-[16px] font-medium">{stepNumber}</span>
      </div>
    )
  }

  return (
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0px_4px_15.7px_5px_rgba(255,255,255,0.25)]">
      {status === 'completed' ? (
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true">
          <path d="M1 3.5L3.5 6L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <span className="text-black text-[16px] font-medium">{stepNumber}</span>
      )}
    </div>
  )
}

function StepConnector({ status }: { status: 'completed' | 'inactive' }) {
  return <div className={`flex-1 w-px mt-3 mb-1 ${status === 'completed' ? 'bg-white' : 'bg-[#404040]'}`} />
}

function FaqTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-3 py-[5px] rounded-[60px] border border-[#3d3d3d] bg-[linear-gradient(38deg,#1e1e1e_24%,#3f4341_128%)] text-[12px] text-[#bebebe] leading-[20px]">
      {label}
    </span>
  )
}

export default function WithdrawPage() {
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [codeModalOpen, setCodeModalOpen] = useState(false)

  const selectedCoinConfig = COINS.find(c => c.id === selectedCoin)
  const coinLabel = selectedCoinConfig?.label ?? 'USDT'

  const getStepStatus = useCallback((step: number): 'completed' | 'active' | 'inactive' => {
    if (step < currentStep) return 'completed'
    if (step === currentStep) return 'active'
    return 'inactive'
  }, [currentStep])

  const handleCoinSelect = (coinId: string) => {
    setSelectedCoin(coinId)
    setCurrentStep(2)
  }

  const handleStep2Complete = () => {
    if (walletAddress.trim() && selectedNetwork) {
      setCurrentStep(3)
    }
  }

  const handleNetworkSelect = (networkValue: string) => {
    setSelectedNetwork(networkValue)
    if (walletAddress.trim()) {
      setCurrentStep(3)
    }
  }

  const handleAddressChange = (value: string) => {
    setWalletAddress(value)
    if (value.trim() && selectedNetwork && currentStep === 2) {
      setCurrentStep(3)
    }
  }

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

          <div className="flex flex-col xl:flex-row gap-10 xl:gap-20">
            {/* Steps column */}
            <div className="flex-1 max-w-[650px]">
              {/* Step 1: Select Coin */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <StepCircle stepNumber={1} status={getStepStatus(1)} />
                  {currentStep >= 2 && (
                    <StepConnector status={getStepStatus(1) === 'completed' ? 'completed' : 'inactive'} />
                  )}
                </div>
                <div className="pb-6 flex-1 min-w-0">
                  <h3 className={`text-[24px] font-normal leading-[30px] ${getStepStatus(1) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                    Select Coin
                  </h3>

                  <div className="mt-4 max-w-[546px]">
                    <GlassSelectIcon
                      icon={selectedCoin ? (selectedCoinConfig?.icon ?? <SearchIcon size={18} color="#808080" />) : <SearchIcon size={18} color="#808080" />}
                      options={COINS.map(c => ({ value: c.id, label: `${c.label}  ${c.name}` }))}
                      placeholder="Search Coin"
                      value={selectedCoin || undefined}
                      onChange={handleCoinSelect}
                    />
                  </div>
                  <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                    {COINS.map(coin => (
                      <button
                        key={coin.id}
                        type="button"
                        onClick={() => handleCoinSelect(coin.id)}
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
                  </div>
                </div>
              </div>

              {/* Step 2: Withdraw to */}
              {currentStep >= 2 && (
                <div className="flex gap-5 animate-[fadeInStep_0.4s_ease-out]">
                  <div className="flex flex-col items-center shrink-0">
                    <StepCircle stepNumber={2} status={getStepStatus(2)} />
                    {currentStep >= 3 && (
                      <StepConnector status={getStepStatus(2) === 'completed' ? 'completed' : 'inactive'} />
                    )}
                  </div>
                  <div className="pb-10 flex-1 min-w-0">
                    <h3 className={`text-[24px] font-normal leading-[30px] ${getStepStatus(2) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                      Withdraw to
                    </h3>

                    <div className="mt-4 max-w-[546px] space-y-3">
                      <GlassInput
                        placeholder="Enter wallet address"
                        value={walletAddress}
                        onChange={handleAddressChange}
                      />
                      <GlassSelect
                        options={NETWORK_OPTIONS.map(n => ({ value: n.value, label: `${n.shortLabel}  ${n.label}` }))}
                        placeholder="Select Network"
                        value={selectedNetwork || undefined}
                        onChange={handleNetworkSelect}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Withdraw Amount */}
              {currentStep >= 3 && (
                <div className="flex gap-5 animate-[fadeInStep_0.4s_ease-out]">
                  <div className="flex flex-col items-center shrink-0">
                    <StepCircle stepNumber={3} status={getStepStatus(3)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-[24px] font-normal leading-[30px] ${getStepStatus(3) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                      Withdraw Amount
                    </h3>

                    {getStepStatus(3) === 'active' && (
                      <div className="mt-4 max-w-[546px]">
                        <div className="relative">
                          <GlassInput
                            type="number"
                            placeholder="0.00"
                            value={withdrawAmount}
                            onChange={setWithdrawAmount}
                          />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-[16px] pointer-events-none">
                            {coinLabel}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-gfx-neutral-300 text-[16px]">Available Withdraw</span>
                          <span className="text-white text-[16px]">$60.00</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gfx-neutral-300 text-[16px]">24h remaining limit</span>
                          <span className="text-white text-[16px]">7,996,320 {coinLabel}</span>
                        </div>

                        <div className="h-px bg-[#404040] my-5" />

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex flex-col gap-2">
                            <p className="text-[#606060] text-[1rem] leading-none">Total Amount</p>
                            <p className="text-white text-[36px] font-normal leading-none">
                              {withdrawAmount || '0.00'} {coinLabel}
                            </p>
                            <p className="text-[#A0A0A0] text-[16px]">
                              Network Fee 0.00 {coinLabel}
                            </p>
                          </div>
                          <GlowButton label="Withdraw" width={145} height={44} onClick={() => setCodeModalOpen(true)} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* FAQs column */}
            <div className="w-full xl:flex-1">
              <h2 className="text-[24px] font-normal mb-6 leading-[30px]">FAQs</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-[30px] border border-[#00422c] px-8 py-7"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <span className="text-[18px] text-white font-normal leading-[22.5px]">{faq.question}</span>
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className={`w-11 h-11 rounded-[15px] bg-gradient-to-b from-[#011b12] to-[#08291e] flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 ease-in-out ${expandedFaq === i ? 'rotate-180' : ''}`}
                      >
                        <ChevronDownIcon size={14} color="#00f0a0" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <FaqTag label={faq.tag} />
                    </div>
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
                      style={{
                        gridTemplateRows: expandedFaq === i ? '1fr' : '0fr',
                        opacity: expandedFaq === i ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-4 text-gfx-neutral-300 text-[15px] leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 mt-16 pb-32 xl:pb-16">
          <div className="max-w-[700px]">
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

      <WithdrawCodeModal open={codeModalOpen} onClose={() => setCodeModalOpen(false)} onSuccess={() => navigate(`/withdraw-processing?amount=${encodeURIComponent(withdrawAmount || '60.00')}&coin=${encodeURIComponent(coinLabel)}`)} />
    </>
  )
}
