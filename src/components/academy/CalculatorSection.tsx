import { useState, useCallback } from 'react'
import './CalculatorSection.css'

const CURRENCY_PAIRS = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCHF', 'USDCAD']
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

function ChevronIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M3.617 5.425L7.234 9.041l3.617-3.616" stroke="#808080" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
  const [showPairDropdown, setShowPairDropdown] = useState(false)

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
        <div className="mt-14 rounded-[1.25rem] px-8 py-6 flex items-center justify-between"
          style={{ background: 'linear-gradient(to right, #0C1311, #09241C)' }}>
          <span className="text-[#A0A0A0] text-[1rem] font-medium">Recommended Position</span>
          <div className="flex items-baseline gap-2">
            <span className="text-[#00B38C] text-[2.25rem] font-normal">{result.positionSize.toFixed(2)}</span>
            <span className="text-[#A0A0A0] text-[1rem] font-medium">lots</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-10 flex flex-col gap-6">
          {/* Currency Pair */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-[1rem] font-medium">Currency Pair</label>
            <div className="relative">
              <button
                className="w-full h-[2.875rem] px-5 rounded-full bg-[#0C1311] border border-[#064B34] flex items-center justify-between text-[#808080] text-[1rem] cursor-pointer"
                onClick={() => setShowPairDropdown(!showPairDropdown)}
              >
                <span>{pair}</span>
                <ChevronIcon />
              </button>
              {showPairDropdown && (
                <ul className="absolute top-full mt-1 left-0 right-0 bg-[#0C1311] border border-[#064B34] rounded-2xl overflow-hidden z-10">
                  {CURRENCY_PAIRS.map(p => (
                    <li key={p}>
                      <button
                        className="w-full px-5 py-3 text-left text-[1rem] cursor-pointer hover:bg-white/5 transition-colors"
                        style={{ color: p === pair ? '#00B38C' : '#808080' }}
                        onClick={() => { setPair(p); setShowPairDropdown(false) }}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
            <RestartIcon />
          </button>
          <button className="flex-1 h-[2.75rem] rounded-full bg-[#F1FFFA] text-black text-[1rem] font-medium cursor-pointer hover:opacity-90 transition-opacity">
            Calculate
          </button>
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
