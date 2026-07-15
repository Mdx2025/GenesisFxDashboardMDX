import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassSelect, GlassSelectIcon, GlassInput, GlowButton } from '@/components/ui'
import { WithdrawCodeModal } from '@/components/modals/WithdrawCodeModal'
import { SearchIcon } from '@/components/icons'
import { UsdtIcon, BtcIcon, EthIcon, UsdcIcon } from '@/components/shared/CoinIcons'
import { StepCircle, StepConnector } from '@/components/shared/StepFlow'
import { FaqSection } from '@/components/ui/FaqCard'
import { RecentTransactions } from '@/components/shared/RecentTransactions'

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

const NETWORK_OPTIONS = [
  { value: 'erc20', label: 'Ethereum (ERC20)', shortLabel: 'ETH' },
  { value: 'trc20', label: 'Tron (TRC20)', shortLabel: 'TRX' },
  { value: 'bep20', label: 'BSC (BEP20)', shortLabel: 'BSC' },
  { value: 'sol', label: 'Solana (SOL)', shortLabel: 'SOL' },
]

const FAQS = [
  { question: 'How long does a withdrawal take?', answer: 'Withdrawals are typically processed within 1–3 business days depending on the network and verification status of your account.' },
  { question: 'Is there a minimum withdrawal amount?', answer: 'Yes, the minimum withdrawal varies by asset. For USDT it is $10, for BTC it is 0.0005 BTC, and for ETH it is 0.01 ETH.' },
  { question: 'Why is my withdrawal pending?', answer: 'Pending withdrawals may require additional verification for security purposes. Check your email for any confirmation requests.' },
  { question: 'Can I cancel a withdrawal request?', answer: 'You can cancel a withdrawal while it is still in "Pending" status. Once approved and sent to the blockchain, it cannot be reversed.' },
]

const TRANSACTIONS = [
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Deposit' as const, amount: '+$210', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
]

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
      <div className="absolute left-1/2 -translate-x-1/2 w-[37.5rem] h-[18.75rem] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

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
            <p className="text-gfx-neutral-300 text-base 3xl:text-xl 4xl:text-[1.75rem] font-medium mt-1 max-w-[32.625rem] 3xl:max-w-[43.75rem] 4xl:max-w-[56.25rem] leading-[1.528rem] 3xl:leading-[1.875rem] 4xl:leading-[2.625rem]">
              Choose your preferred withdrawal method to get started.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-10 xl:gap-14">
            <div className="xl:basis-1/2 xl:min-w-0">
              {/* Step 1: Select Coin */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <StepCircle stepNumber={1} status={getStepStatus(1)} />
                  {currentStep >= 2 && (
                    <StepConnector status={getStepStatus(1) === 'completed' ? 'completed' : 'inactive'} />
                  )}
                </div>
                <div className="pb-6 flex-1 min-w-0">
                  <h3 className={`text-2xl 3xl:text-[2rem] 4xl:text-[2.625rem] font-normal leading-[1.875rem] 3xl:leading-[2.5rem] 4xl:leading-[3.25rem] ${getStepStatus(1) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                    Select Coin
                  </h3>

                  <div className="mt-4 max-w-[34.125rem]">
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
                        className={`h-[3.125rem] 3xl:h-[4rem] 4xl:h-[5rem] px-4 3xl:px-6 4xl:px-8 rounded-3xl flex items-center gap-2.5 3xl:gap-4 cursor-pointer transition-colors ${
                          selectedCoin === coin.id
                            ? 'bg-gfx-green-200 border border-[#0a714f]'
                            : 'bg-[#111312] border border-transparent hover:bg-[#1a1c1b]'
                        }`}
                      >
                        {coin.icon}
                        <span className="text-white text-base 3xl:text-xl 4xl:text-[1.75rem] font-medium">{coin.label}</span>
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
                    <h3 className={`text-2xl 3xl:text-[2rem] 4xl:text-[2.625rem] font-normal leading-[1.875rem] 3xl:leading-[2.5rem] 4xl:leading-[3.25rem] ${getStepStatus(2) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                      Withdraw to
                    </h3>

                    <div className="mt-4 max-w-[34.125rem] space-y-3">
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
                    <h3 className={`text-2xl 3xl:text-[2rem] 4xl:text-[2.625rem] font-normal leading-[1.875rem] 3xl:leading-[2.5rem] 4xl:leading-[3.25rem] ${getStepStatus(3) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                      Withdraw Amount
                    </h3>

                    {getStepStatus(3) === 'active' && (
                      <div className="mt-6 max-w-[34.125rem] flex flex-col gap-6">
                        <div className="relative">
                          <GlassInput
                            type="number"
                            placeholder="0.00"
                            value={withdrawAmount}
                            onChange={setWithdrawAmount}
                          />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-base pointer-events-none">
                            {coinLabel}
                          </span>
                        </div>

                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gfx-neutral-300 text-base">Available Withdraw</span>
                              <span className="text-white text-base">$60.00</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gfx-neutral-300 text-base">24h remaining limit</span>
                              <span className="text-white text-base">7,996,320 {coinLabel}</span>
                            </div>
                          </div>

                          <div className="h-px bg-[#404040]" />

                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-3">
                              <p className="text-gfx-neutral-300 text-base leading-none">Total Amount</p>
                              <p className="text-white text-4xl font-normal leading-none">
                                {withdrawAmount || '0.00'} {coinLabel}
                              </p>
                              <p className="text-gfx-neutral-500 text-base">
                                Network Fee 0.00 {coinLabel}
                              </p>
                            </div>
                            <GlowButton label="Withdraw" width={145} height={44} onClick={() => setCodeModalOpen(true)} disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <FaqSection faqs={FAQS} expandedFaq={expandedFaq} onToggle={(i) => setExpandedFaq(expandedFaq === i ? null : i)} />
          </div>
        </div>

        <div className="px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 mt-16 pb-32 xl:pb-16">
          <RecentTransactions transactions={TRANSACTIONS} className="xl:max-w-[50%]" />
        </div>

      <WithdrawCodeModal open={codeModalOpen} onClose={() => setCodeModalOpen(false)} onSuccess={() => navigate(`/withdraw-processing?amount=${encodeURIComponent(withdrawAmount || '60.00')}&coin=${encodeURIComponent(coinLabel)}`)} />
    </>
  )
}
