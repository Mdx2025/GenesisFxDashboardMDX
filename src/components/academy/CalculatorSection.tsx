import { useState, useCallback } from 'react'
import { GlassSelect } from '@/components/ui/GlassSelect'
import { GlowButton } from '@/components/ui/GlowButton'
import './CalculatorSection.css'

const CURRENCY_PAIRS = [
  { value: 'EURUSD', label: 'EURUSD' },
  { value: 'GBPUSD', label: 'GBPUSD' },
  { value: 'USDJPY', label: 'USDJPY' },
  { value: 'AUDUSD', label: 'AUDUSD' },
  { value: 'USDCHF', label: 'USDCHF' },
  { value: 'USDCAD', label: 'USDCAD' },
]
const RISK_OPTIONS = ['25%', '50%', '75%', 'MAX'] as const

function CodeScanIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M2.625 7.875V5.25C2.625 4.55381 2.90156 3.88613 3.39384 3.39384C3.88613 2.90156 4.55381 2.625 5.25 2.625H7.875" stroke="#00B38C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.125 2.625H15.75C16.4462 2.625 17.1139 2.90156 17.6062 3.39384C18.0984 3.88613 18.375 4.55381 18.375 5.25V7.875" stroke="#00B38C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.375 13.125V15.75C18.375 16.4462 18.0984 17.1139 17.6062 17.6062C17.1139 18.0984 16.4462 18.375 15.75 18.375H13.125" stroke="#00B38C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.875 18.375H5.25C4.55381 18.375 3.88613 18.0984 3.39384 17.6062C2.90156 17.1139 2.625 16.4462 2.625 15.75V13.125" stroke="#00B38C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5625 10.5H14.4375" stroke="#00B38C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10.5 6.5625V14.4375" stroke="#00B38C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DangerIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M9.14 3.5L2.37 15.75C2.22 16.01 2.14 16.31 2.14 16.61C2.14 16.91 2.22 17.21 2.37 17.47C2.52 17.73 2.74 17.95 3 18.1C3.26 18.25 3.56 18.33 3.86 18.33H17.14C17.44 18.33 17.74 18.25 18 18.1C18.26 17.95 18.48 17.73 18.63 17.47C18.78 17.21 18.86 16.91 18.86 16.61C18.86 16.31 18.78 16.01 18.63 15.75L11.86 3.5C11.71 3.24 11.49 3.03 11.23 2.88C10.97 2.73 10.67 2.65 10.37 2.65C10.07 2.65 9.77 2.73 9.51 2.88C9.25 3.03 9.03 3.24 8.88 3.5H9.14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 7.875V11.375" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10.5 14.875H10.509" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function RestartIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M3.5 10.5C3.5 14.366 6.634 17.5 10.5 17.5C14.366 17.5 17.5 14.366 17.5 10.5C17.5 6.634 14.366 3.5 10.5 3.5C7.84 3.5 5.52 5.01 4.375 7.219" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 3.5L4.375 7.219L8.094 8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.5545 19.3487C15.4121 19.3487 19.3499 15.4109 19.3499 10.5533C19.3499 5.69567 15.4121 1.75781 10.5545 1.75781C5.69689 1.75781 1.75903 5.69567 1.75903 10.5533C1.75903 15.4109 5.69689 19.3487 10.5545 19.3487ZM14.0152 4.91677C14.2636 5.01796 14.426 5.25947 14.426 5.52768V7.91522C14.426 8.27954 14.1306 8.57488 13.7663 8.57488H11.4341C11.1686 8.57488 10.9291 8.41583 10.8261 8.17123C10.7231 7.92663 10.7767 7.64412 10.9622 7.45427L11.6319 6.76863C10.3605 6.37668 8.92446 6.69473 7.91671 7.72638C6.44966 9.22821 6.44966 11.6694 7.91671 13.1712C9.37532 14.6644 11.7337 14.6644 13.1923 13.1712C13.7884 12.5609 14.1435 11.7945 14.2546 10.997C14.3059 10.6294 14.5979 10.3201 14.9691 10.3201C15.3257 10.3201 15.6215 10.6056 15.587 10.9605C15.4762 12.1018 14.9936 13.2152 14.136 14.0932C12.1598 16.1162 8.94917 16.1162 6.97294 14.0932C5.00515 12.0787 5.00515 8.81891 6.97294 6.80447C8.5012 5.23998 10.7691 4.88429 12.6343 5.74248L13.2944 5.06673C13.4818 4.87486 13.7668 4.81558 14.0152 4.91677Z" fill="white"/>
    </svg>
  )
}

interface BreakdownRow {
  label: string
  value: string
}

export function CalculatorSection() {
  const [pair, setPair] = useState('EURUSD')
  const [balance, setBalance] = useState('10000')
  const [riskIdx, setRiskIdx] = useState(1)
  const [stopLoss, setStopLoss] = useState('50')

  const riskPct = RISK_OPTIONS[riskIdx] === 'MAX' ? 100 : parseInt(RISK_OPTIONS[riskIdx])
  const riskDecimal = riskPct / 100

  const calculate = useCallback(() => {
    const bal = parseFloat(balance) || 0
    const sl = parseFloat(stopLoss) || 1
    const pipValue = 10
    const riskAmount = bal * riskDecimal
    const positionSize = riskAmount / (sl * pipValue)
    return {
      balance: bal,
      riskAmount,
      stopLoss: sl,
      pipValue,
      positionSize: Math.round(positionSize * 100) / 100,
    }
  }, [balance, stopLoss, riskDecimal])

  const result = calculate()

  const breakdownRows: BreakdownRow[] = [
    { label: 'Account Balance', value: `$${result.balance.toLocaleString()}` },
    { label: `Risk Amount (${riskPct}%)`, value: `$${result.riskAmount.toFixed(2)}` },
    { label: 'Stop Loss', value: `${result.stopLoss} pips` },
    { label: `Pip Value (${pair})`, value: `$${result.pipValue.toFixed(2)}` },
    { label: 'Position Size', value: `${result.positionSize} lots` },
  ]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[1.65rem] pt-10 xl:pt-16 pb-10">
      {/* Left Card - Position Size Calculator */}
      <div className="calc-card rounded-[1.625rem] p-[2.75rem] xl:p-[4.4375rem]">
        <div className="flex items-start gap-5">
          <div className="w-[3.125rem] h-[3.125rem] rounded-[0.55rem] bg-[#09241C] flex items-center justify-center shrink-0">
            <CodeScanIcon />
          </div>
          <div>
            <h2 className="text-white text-[2.25rem] font-normal leading-none">Position Size</h2>
            <p className="text-[#808080] text-[1rem] font-normal mt-2">Trading Calculator</p>
          </div>
        </div>

        {/* Recommended Position Result */}
        <div className="mt-14 rounded-[1.25rem] px-8 py-6 flex flex-col gap-2"
          style={{ background: 'linear-gradient(to right, #0C1311, #09241C)' }}>
          <span className="text-[#A0A0A0] text-[1rem] font-normal">Recommended Position</span>
          <div className="flex items-baseline gap-2">
            <span className="text-[#00B38C] text-[2.25rem] font-normal">{result.positionSize.toFixed(2)}</span>
            <span className="text-[#A0A0A0] text-[1rem] font-normal">lots</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-10 flex flex-col gap-6">
          {/* Currency Pair */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-[1rem] font-medium">Currency Pair</label>
            <GlassSelect
              options={CURRENCY_PAIRS}
              value={pair}
              onChange={(v) => setPair(v)}
            />
          </div>

          {/* Account Balance */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-[1rem] font-medium">Account Balance</label>
            <div className="h-[2.875rem] px-5 rounded-full bg-[#0C1311] border border-[#064B34] flex items-center">
              <span className="text-[#808080] text-[1rem] mr-1">$</span>
              <input
                type="number"
                value={balance}
                onChange={e => setBalance(e.target.value)}
                className="bg-transparent text-[#808080] text-[1rem] w-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Risk % */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-[1rem] font-medium">Risk %</label>
            <div className="grid grid-cols-4 gap-2">
              {RISK_OPTIONS.map((opt, i) => (
                <button
                  key={opt}
                  className={`h-[3.125rem] rounded-[1rem] text-[1rem] font-normal cursor-pointer transition-colors ${
                    riskIdx === i
                      ? 'bg-[#0A714F] text-white'
                      : 'bg-[#0C1311] text-[#A0A0A0] hover:bg-white/5'
                  }`}
                  onClick={() => setRiskIdx(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Stop Loss */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-[1rem] font-medium">Stop Loss</label>
            <div className="h-[2.875rem] px-5 rounded-full bg-[#0C1311] border border-[#064B34] flex items-center">
              <input
                type="number"
                value={stopLoss}
                onChange={e => setStopLoss(e.target.value)}
                className="bg-transparent text-[#808080] text-[1rem] w-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[#808080] text-[1rem] ml-1">pips</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-10 flex items-center gap-3">
          <button
            className="h-[2.75rem] w-[5.375rem] rounded-[1.5rem] bg-[#0C1311] border border-[#064B34] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => { setBalance('10000'); setStopLoss('50'); setRiskIdx(1) }}
            aria-label="Reset"
          >
            <RefreshIcon />
          </button>
          <div className="flex-1">
            <GlowButton label="Calculate" width="100%" height={44} onClick={() => {}} />
          </div>
        </div>
      </div>

      {/* Right Card - Calculation Breakdown */}
      <div className="calc-card rounded-[1.625rem] p-[2.75rem] xl:p-[4.4375rem]">
        <div className="flex items-center gap-3 mb-10">
          <DangerIcon />
          <h2 className="text-white text-[1.5rem] font-normal">Calculation Breakdown</h2>
        </div>

        <div className="flex flex-col">
          {breakdownRows.map((row, i) => (
            <div key={row.label}>
              {i > 0 && <div className="h-px bg-[#09241C] my-0" />}
              <div className="flex items-center justify-between py-[1.2rem]">
                <span className="text-[#606060] text-[0.875rem]">{row.label}</span>
                <span className="text-white text-[0.875rem]">{row.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
