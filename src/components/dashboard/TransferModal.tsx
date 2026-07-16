import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassSelectIcon, GlassInput, GlowButton } from '@/components/ui'

function SearchCoinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.45 4.39l3.08 3.08a.75.75 0 11-1.06 1.06l-3.08-3.08A7 7 0 012 9z" fill="#808080"/>
    </svg>
  )
}

function WalletCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 5.25A2.25 2.25 0 015.25 3h7.5A2.25 2.25 0 0115 5.25v.75h.75A2.25 2.25 0 0118 8.25v4.5A2.25 2.25 0 0115.75 15H5.25A2.25 2.25 0 013 12.75V5.25z" fill="#A0A0A0"/>
      <circle cx="14.25" cy="10.5" r="1.125" fill="#1a1a1a"/>
    </svg>
  )
}

const COIN_OPTIONS = [
  { value: 'usdt', label: 'USDT' },
  { value: 'btc', label: 'BTC' },
  { value: 'eth', label: 'ETH' },
  { value: 'usdc', label: 'USDC' },
]

interface TransferModalProps {
  open: boolean
  onClose: () => void
  onTransfer?: () => void
}

export function TransferModal({ open, onClose, onTransfer }: TransferModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [amount, setAmount] = useState('')

  const isValid = fromAccount !== '' && toAccount !== '' && amount !== '' && parseFloat(amount) > 0

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) { onClose(); return }

    gsap.to(modal, { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlay, {
      opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => { setMounted(false); onClose() },
    })
  }, [onClose])

  useEffect(() => {
    if (open) {
      setMounted(true)
      setFromAccount('')
      setToAccount('')
      setAmount('')
    }
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) return

    gsap.set(overlay, { opacity: 0 })
    gsap.set(modal, { opacity: 0, scale: 0.96 })
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modal, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, handleClose])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Internal Transfer"
    >
      <div
        ref={modalRef}
        className="relative w-[793px] max-w-[95vw] bg-gfx-main rounded-2xl"
      >
        {/* Modal background (clipped to contain glows) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none bg-gfx-main rounded-2xl backdrop-blur-[23.23px] border border-gfx-green-200"
          aria-hidden="true"
        >
          <div className="absolute w-[493px] h-[278px] left-[190px] top-[682px] bg-gfx-green-175 rounded-full blur-[157px]" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[28px] top-[28px] w-6 h-6"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <div className="relative z-10 text-center pt-[63px]">
          <h2 className="text-white font-acid font-normal text-h2 leading-none">
            Internal Transfer
          </h2>
          <p className="mx-auto font-acid font-medium text-gfx-neutral-500 text-caption leading-snug max-w-[352px] mt-1">
            Transfer funds between your wallets and trading accounts instantly with no fees.
          </p>
        </div>

        {/* Inner glass card */}
        <div
          className="relative mx-auto w-[701px] max-w-[90%] mt-9 mb-[46px]"
        >
          {/* Card background with glows (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl bg-gfx-card-bg shadow-[0px_1.25px_0px_1.25px_rgba(255,255,255,0.04)_inset,0px_5.01px_25.07px_rgba(0,0,0,0.20)] outline outline-1 outline-offset-[-1.25px] outline-gfx-card-border backdrop-blur-[25px]"
            aria-hidden="true"
          >
            <div className="absolute w-[587px] h-[435px] left-[304px] top-[-333px] rotate-[48deg] origin-top-left bg-gfx-green-50 rounded-full blur-[157px]" />
            <div className="absolute w-[493px] h-[278px] left-[36px] top-[-28px] bg-gfx-green-175 rounded-full blur-[157px]" />
            <div className="absolute w-[237px] h-[237px] left-[555px] top-[-75px] opacity-30 mix-blend-color bg-gfx-green-175 rounded-full blur-[87px]" />
          </div>

          {/* Card content (not clipped, dropdowns can overflow) */}
          <div className="relative z-10 px-[78px] pt-[32px] pb-[54px]">

          {/* Card title */}
          <h3 className="text-white font-acid font-normal text-center text-2xl mb-[42px]">
            Transfer Funds
          </h3>

          {/* From Account */}
          <div className="mb-[22px]">
            <GlassSelectIcon
              label="From Account"
              placeholder="Search  Coin"
              icon={<SearchCoinIcon />}
              options={COIN_OPTIONS}
              value={fromAccount}
              onChange={setFromAccount}
            />
          </div>

          {/* To Account */}
          <div className="mb-[22px]">
            <GlassSelectIcon
              label="To Account"
              placeholder="Search  Coin"
              icon={<WalletCircleIcon />}
              options={COIN_OPTIONS}
              value={toAccount}
              onChange={setToAccount}
            />
          </div>

          {/* Amount */}
          <div className="mb-[40px]">
            <GlassInput label="Amount(USD)" placeholder="0.00" type="number" value={amount} onChange={setAmount} />
          </div>

          {/* Transfer Funds button */}
          <GlowButton
            label="Transfer Funds"
            width="100%"
            disabled={!isValid}
            onClick={() => { handleClose(); onTransfer?.() }}
          />
          </div>
        </div>
      </div>
    </div>
  )
}
