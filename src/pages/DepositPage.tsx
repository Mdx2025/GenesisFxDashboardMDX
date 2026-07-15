import { useState, useCallback } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassSelect, GlassSelectIcon, SuccessSnackbar } from '@/components/ui'
import { SearchIcon } from '@/components/icons'
import { UsdtIcon, BtcIcon, EthIcon, UsdcIcon, CopyIcon } from '@/components/shared/CoinIcons'
import { StepCircle, StepConnector } from '@/components/shared/StepFlow'
import { FaqSection } from '@/components/ui/FaqCard'
import { RecentTransactions } from '@/components/shared/RecentTransactions'

function QrCodePlaceholder() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 157 159" fill="none" aria-hidden="true">
      <rect width="157" height="159" rx="5" fill="white" />
      <rect x="12" y="12" width="40" height="40" rx="4" fill="black" />
      <rect x="16" y="16" width="32" height="32" rx="2" fill="white" />
      <rect x="22" y="22" width="20" height="20" rx="1" fill="black" />
      <rect x="105" y="12" width="40" height="40" rx="4" fill="black" />
      <rect x="109" y="16" width="32" height="32" rx="2" fill="white" />
      <rect x="115" y="22" width="20" height="20" rx="1" fill="black" />
      <rect x="12" y="107" width="40" height="40" rx="4" fill="black" />
      <rect x="16" y="111" width="32" height="32" rx="2" fill="white" />
      <rect x="22" y="117" width="20" height="20" rx="1" fill="black" />
      <rect x="60" y="12" width="8" height="8" fill="black" />
      <rect x="60" y="28" width="8" height="8" fill="black" />
      <rect x="76" y="12" width="8" height="8" fill="black" />
      <rect x="76" y="28" width="8" height="8" fill="black" />
      <rect x="60" y="44" width="8" height="8" fill="black" />
      <rect x="76" y="44" width="8" height="8" fill="black" />
      <rect x="68" y="20" width="8" height="8" fill="black" />
      <rect x="68" y="36" width="8" height="8" fill="black" />
      <rect x="84" y="20" width="8" height="8" fill="black" />
      <rect x="92" y="12" width="8" height="8" fill="black" />
      <rect x="12" y="60" width="8" height="8" fill="black" />
      <rect x="28" y="60" width="8" height="8" fill="black" />
      <rect x="44" y="60" width="8" height="8" fill="black" />
      <rect x="20" y="68" width="8" height="8" fill="black" />
      <rect x="36" y="68" width="8" height="8" fill="black" />
      <rect x="12" y="76" width="8" height="8" fill="black" />
      <rect x="28" y="76" width="8" height="8" fill="black" />
      <rect x="44" y="76" width="8" height="8" fill="black" />
      <rect x="20" y="84" width="8" height="8" fill="black" />
      <rect x="36" y="84" width="8" height="8" fill="black" />
      <rect x="12" y="92" width="8" height="8" fill="black" />
      <rect x="28" y="92" width="8" height="8" fill="black" />
      <rect x="60" y="60" width="8" height="8" fill="black" />
      <rect x="76" y="60" width="8" height="8" fill="black" />
      <rect x="92" y="60" width="8" height="8" fill="black" />
      <rect x="68" y="68" width="8" height="8" fill="black" />
      <rect x="84" y="68" width="8" height="8" fill="black" />
      <rect x="60" y="76" width="8" height="8" fill="black" />
      <rect x="76" y="76" width="8" height="8" fill="black" />
      <rect x="92" y="76" width="8" height="8" fill="black" />
      <rect x="108" y="60" width="8" height="8" fill="black" />
      <rect x="124" y="60" width="8" height="8" fill="black" />
      <rect x="140" y="60" width="8" height="8" fill="black" />
      <rect x="116" y="68" width="8" height="8" fill="black" />
      <rect x="132" y="68" width="8" height="8" fill="black" />
      <rect x="108" y="76" width="8" height="8" fill="black" />
      <rect x="124" y="76" width="8" height="8" fill="black" />
      <rect x="140" y="76" width="8" height="8" fill="black" />
      <rect x="68" y="84" width="8" height="8" fill="black" />
      <rect x="84" y="84" width="8" height="8" fill="black" />
      <rect x="60" y="92" width="8" height="8" fill="black" />
      <rect x="76" y="92" width="8" height="8" fill="black" />
      <rect x="92" y="92" width="8" height="8" fill="black" />
      <rect x="108" y="84" width="8" height="8" fill="black" />
      <rect x="124" y="84" width="8" height="8" fill="black" />
      <rect x="108" y="92" width="8" height="8" fill="black" />
      <rect x="140" y="92" width="8" height="8" fill="black" />
      <rect x="108" y="107" width="8" height="8" fill="black" />
      <rect x="124" y="107" width="8" height="8" fill="black" />
      <rect x="140" y="107" width="8" height="8" fill="black" />
      <rect x="116" y="115" width="8" height="8" fill="black" />
      <rect x="132" y="115" width="8" height="8" fill="black" />
      <rect x="108" y="123" width="8" height="8" fill="black" />
      <rect x="124" y="123" width="8" height="8" fill="black" />
      <rect x="140" y="123" width="8" height="8" fill="black" />
      <rect x="60" y="107" width="8" height="8" fill="black" />
      <rect x="76" y="107" width="8" height="8" fill="black" />
      <rect x="92" y="107" width="8" height="8" fill="black" />
      <rect x="68" y="115" width="8" height="8" fill="black" />
      <rect x="60" y="123" width="8" height="8" fill="black" />
      <rect x="76" y="123" width="8" height="8" fill="black" />
      <rect x="92" y="123" width="8" height="8" fill="black" />
      <rect x="68" y="131" width="8" height="8" fill="black" />
      <rect x="84" y="131" width="8" height="8" fill="black" />
      <rect x="60" y="139" width="8" height="8" fill="black" />
      <rect x="116" y="131" width="8" height="8" fill="black" />
      <rect x="108" y="139" width="8" height="8" fill="black" />
      <rect x="124" y="139" width="8" height="8" fill="black" />
      <rect x="140" y="139" width="8" height="8" fill="black" />
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

const NETWORK_OPTIONS = [
  { value: 'erc20', label: 'Ethereum (ERC20)', shortLabel: 'ETH' },
  { value: 'trc20', label: 'Tron (TRC20)', shortLabel: 'TRX' },
  { value: 'bep20', label: 'BSC (BEP20)', shortLabel: 'BSC' },
  { value: 'sol', label: 'Solana (SOL)', shortLabel: 'SOL' },
]

const FAQS = [
  { question: 'How do I deposit funds?', answer: 'Select your preferred cryptocurrency, copy the deposit address, and send funds from your external wallet. The deposit will appear once confirmed on the blockchain.' },
  { question: 'What is the minimum deposit amount?', answer: 'Minimum deposits vary by asset: USDT requires $10, BTC requires 0.0001 BTC, and ETH requires 0.005 ETH. Amounts below the minimum will not be credited.' },
  { question: 'How long does a deposit take to confirm?', answer: 'Confirmation times depend on the network. Bitcoin takes 10–60 minutes, Ethereum 2–5 minutes, and Tron under 1 minute on average.' },
  { question: 'Are there fees for depositing?', answer: 'Genesis does not charge deposit fees. However, the sending network may charge a gas or miner fee which is outside our control.' },
]

const TRANSACTIONS = [
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Deposit' as const, amount: '+$210', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
  { date: '04/30/2026 12', type: 'Withdraw' as const, amount: '-$170', status: 'Completed' },
]

const DEPOSIT_ADDRESS = '0x0a3e23bf27c99b93d2ce8e6572d71188c7e75671'

export default function DepositPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

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
    setCurrentStep(3)
  }

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(DEPOSIT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <SuccessSnackbar open={copied} message="Address copied to clipboard" duration={2000} onClose={() => setCopied(false)} />
      <div className="absolute left-1/2 -translate-x-1/2 w-[37.5rem] h-[18.75rem] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
            breadcrumbItems={[
              { label: 'Assets Management', href: '/assets-management' },
              { label: 'Funding', href: '/assets-management' },
              { label: 'Deposit', current: true },
            ]}
          />

          <div className="mt-8 mb-10">
            <h1 className="text-white font-normal leading-none text-hero-lg">
              Deposit Funds
            </h1>
            <p className="text-gfx-neutral-300 text-base 3xl:text-xl 4xl:text-3xl font-medium mt-1 max-w-[32.625rem] 3xl:max-w-[43.75rem] 4xl:max-w-[56.25rem] leading-6 3xl:leading-8 4xl:leading-10">
              All payments will be credited to your main wallet. You can then transfer funds to your trading accounts.
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
                  <h3 className={`text-2xl 3xl:text-3xl 4xl:text-[2.625rem] font-normal leading-8 3xl:leading-10 4xl:leading-13 ${getStepStatus(1) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                    Select Coin
                  </h3>

                  <div className="mt-4 max-w-[34.125rem]">
                    <GlassSelectIcon
                      icon={selectedCoin ? (COINS.find(c => c.id === selectedCoin)?.icon ?? <SearchIcon size={18} color="#808080" />) : <SearchIcon size={18} color="#808080" />}
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
                        className={`h-12 3xl:h-[4rem] 4xl:h-[5rem] px-4 3xl:px-6 4xl:px-8 rounded-3xl flex items-center gap-2.5 3xl:gap-4 cursor-pointer transition-colors ${
                          selectedCoin === coin.id
                            ? 'bg-gfx-green-200 border border-gfx-green-250'
                            : 'bg-gfx-green-800 border border-transparent hover:bg-[#1a1c1b]'
                        }`}
                      >
                        {coin.icon}
                        <span className="text-white text-base 3xl:text-xl 4xl:text-3xl font-medium">{coin.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Select Network */}
              {currentStep >= 2 && (
                <div className="flex gap-5 animate-[fadeInStep_0.4s_ease-out]">
                  <div className="flex flex-col items-center shrink-0">
                    <StepCircle stepNumber={2} status={getStepStatus(2)} />
                    {currentStep >= 3 && (
                      <StepConnector status={getStepStatus(2) === 'completed' ? 'completed' : 'inactive'} />
                    )}
                  </div>
                  <div className="pb-10 flex-1 min-w-0">
                    <h3 className={`text-2xl 3xl:text-3xl 4xl:text-[2.625rem] font-normal leading-8 3xl:leading-10 4xl:leading-13 ${getStepStatus(2) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                      Select Network
                    </h3>

                    <div className="mt-4 max-w-[34.125rem]">
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

              {/* Step 3: Deposit Address */}
              {currentStep >= 3 && (
                <div className="flex gap-5 animate-[fadeInStep_0.4s_ease-out]">
                  <div className="flex flex-col items-center shrink-0">
                    <StepCircle stepNumber={3} status={getStepStatus(3)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-2xl 3xl:text-3xl 4xl:text-[2.625rem] font-normal leading-8 3xl:leading-10 4xl:leading-13 ${getStepStatus(3) === 'inactive' ? 'text-gfx-neutral-300' : 'text-white'}`}>
                      Deposit Address
                    </h3>

                    {getStepStatus(3) === 'active' && (
                      <div className="mt-4 max-w-[34.125rem]">
                        <GlassCard rounded="20px">
                          <svg className="absolute w-0 h-0" aria-hidden="true">
                            <defs>
                              <filter id="deposit-glow-lg" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="60" /></filter>
                              <filter id="deposit-glow-sm" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="50" /></filter>
                            </defs>
                          </svg>
                          <div className="absolute w-[200px] h-[200px] -top-[30%] -right-[15%] rounded-full pointer-events-none bg-gfx-glow-green opacity-40 [filter:url(#deposit-glow-lg)]" aria-hidden="true" />
                          <div className="absolute w-[120px] h-[120px] -bottom-[20%] -left-[10%] rounded-full pointer-events-none bg-gfx-glow-green opacity-30 [filter:url(#deposit-glow-sm)]" aria-hidden="true" />
                          <div className="relative z-10 p-5 flex flex-col sm:flex-row gap-5">
                            <div className="w-[9.8125rem] h-[9.9375rem] shrink-0 rounded-sm overflow-hidden">
                              <QrCodePlaceholder />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm 3xl:text-lg 4xl:text-2xl text-gfx-neutral-300 leading-5 3xl:leading-6 4xl:leading-8">Address</span>
                              <div className="flex items-start gap-2 mt-3">
                                <p className="text-base text-white leading-6 break-all">
                                  {DEPOSIT_ADDRESS}
                                </p>
                                <button
                                  type="button"
                                  onClick={handleCopyAddress}
                                  className="shrink-0 cursor-pointer hover:opacity-80 transition-opacity mt-0.5"
                                  aria-label="Copy address"
                                >
                                  <CopyIcon size={24} color={copied ? '#10BC83' : '#A0A0A0'} />
                                </button>
                              </div>
                              <p className="text-sm 3xl:text-lg 4xl:text-2xl text-gfx-neutral-300 leading-5 3xl:leading-6 4xl:leading-8 mt-3">
                                Send exactly the amount shown above to this address. Your deposit will be credited automatically after blockchain confirmation.
                              </p>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <FaqSection faqs={FAQS} expandedFaq={expandedFaq} onToggle={(i) => setExpandedFaq(expandedFaq === i ? null : i)} />
          </div>

          <RecentTransactions transactions={TRANSACTIONS} className="mt-16 xl:max-w-[50%]" />
        </div>

    </>
  )
}
