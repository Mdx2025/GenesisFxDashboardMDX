import { useEffect, useState } from 'react'
import { GlassCard, GlowButton, SparkleButton } from '@/components/ui'

interface TransferToMainWalletModalProps {
  open: boolean
  onClose: () => void
  socialBalance?: number
  mainBalance?: number
}

const QUICK_AMOUNTS = [
  { label: '25%', fraction: 0.25 },
  { label: '50%', fraction: 0.5 },
  { label: '75%', fraction: 0.75 },
  { label: 'MAX', fraction: 1 },
]

const money = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function BalanceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between px-1.5 font-acid text-base font-medium leading-[1.5275]">
      <span className="text-gfx-neutral-400">{label}</span>
      <span className="text-white">{money(value)}</span>
    </div>
  )
}

export function TransferToMainWalletModal({
  open,
  onClose,
  socialBalance = 0,
  mainBalance = 100,
}: TransferToMainWalletModalProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [amount, setAmount] = useState('0.00')

  useEffect(() => {
    if (open) {
      setMounted(true)
      setAmount('0.00')
      requestAnimationFrame(() => setVisible(true))
    } else if (mounted) {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 250)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center transition-opacity duration-250"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} role="presentation" />

      <GlassCard
        variant="light"
        divider="none"
        rounded="1.16rem"
        className="w-[49.5625rem] max-w-[95vw] max-h-[90vh] overflow-hidden bg-gfx-green-800"
        style={{
          animation: visible ? 'modalFadeIn 0.3s ease-out forwards' : 'modalFadeOut 0.25s ease-in forwards',
        }}
      >
        <div
          className="theme-decorative-glow pointer-events-none absolute left-[9.375rem] top-[32.25rem] h-[17.375rem] w-[30.8125rem] rounded-full bg-gfx-green-200 [filter:blur(157.15px)]"
          aria-hidden="true"
        />

        <button
          onClick={onClose}
          className="absolute left-[45.1875rem] top-[1.25rem] z-10 cursor-pointer transition-opacity hover:opacity-70"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative px-[3.1875rem] pt-[4.6875rem] pb-[5.4375rem]">
          <h2 className="px-1.5 font-acid text-[2.25rem] font-normal leading-none text-white">
            Transfer to Main Wallet
          </h2>

          <div className="mt-[1.6875rem]">
            <BalanceRow label="Social wallet balance" value={socialBalance} />
          </div>
          <div className="mt-[1.53125rem]">
            <BalanceRow label="Main wallet balance" value={mainBalance} />
          </div>

          <label
            htmlFor="transfer-amount"
            className="mt-[4.03125rem] block px-1.5 font-acid text-base font-medium leading-[1.2] text-gfx-neutral-600"
          >
            Amount (USD)
          </label>

          <div className="mt-[0.425rem] flex h-[3.125rem] items-center rounded-[1.875rem] border border-gfx-green-300 bg-gfx-green-800 px-[1.5625rem]">
            <input
              id="transfer-amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full bg-transparent font-acid text-base font-medium leading-[1.5275] text-gfx-neutral-600 outline-none"
            />
            <span className="pointer-events-none select-none font-acid text-base font-medium leading-[1.5275] text-gfx-neutral-600 opacity-0">
              USDT
            </span>
          </div>

          <div className="mt-[0.5625rem] flex gap-[0.583rem]">
            {QUICK_AMOUNTS.map(({ label, fraction }) => (
              <button
                key={label}
                type="button"
                onClick={() => setAmount((socialBalance * fraction).toFixed(2))}
                className="h-[3.125rem] flex-1 cursor-pointer rounded-2xl border border-gfx-neutral-250 bg-gfx-green-800 font-acid text-base font-normal leading-[1.2] text-gfx-neutral-500 transition-colors hover:border-gfx-green-300 hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-[2.1875rem] flex items-center justify-between">
            <div className="w-[21.1875rem]">
              <SparkleButton fullWidth className="px-[1.375rem] !h-[2.875rem] !rounded-[1.875rem]" onClick={onClose}>
                Cancel
              </SparkleButton>
            </div>
            <GlowButton label="Transfer" width={339} height={44} onClick={onClose} />
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
