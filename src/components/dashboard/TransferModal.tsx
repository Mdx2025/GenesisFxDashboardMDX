import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { GlassSelectIcon, GlassInput } from '@/components/ui'
import { TransferProcessingModal } from './TransferProcessingModal'

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
}

export function TransferModal({ open, onClose }: TransferModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [processingOpen, setProcessingOpen] = useState(false)

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
    if (open) setMounted(true)
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
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Internal Transfer"
    >
      <div
        ref={modalRef}
        className="relative"
        style={{
          width: 793,
          maxWidth: '95vw',
        }}
      >
        {/* Modal background (clipped to contain glows) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            background: '#040B09',
            boxShadow: '0px 1.16px 0px 1.16px rgba(255,255,255,0.05) inset, 0px 9.29px 37.17px rgba(0,0,0,0.30)',
            borderRadius: 40,
            outline: '1.16px rgba(0,0,0,0.20) solid',
            outlineOffset: -1.16,
            backdropFilter: 'blur(23.23px)',
          }}
          aria-hidden="true"
        >
          <div style={{ width: 493, height: 278, left: 190, top: 682, position: 'absolute', background: '#114131', borderRadius: 9999, filter: 'blur(157px)' }} />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity"
          style={{ right: 28, top: 28, width: 24, height: 24 }}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <div className="relative z-10 text-center" style={{ paddingTop: 63 }}>
          <h2 className="text-white font-acid font-normal" style={{ fontSize: 50, lineHeight: 1 }}>
            Internal Transfer
          </h2>
          <p className="mx-auto font-acid font-medium" style={{ color: '#A0A0A0', fontSize: 16, lineHeight: '24.44px', maxWidth: 352, marginTop: 3 }}>
            Transfer funds between your wallets and trading accounts instantly with no fees.
          </p>
        </div>

        {/* Inner glass card */}
        <div
          className="relative mx-auto"
          style={{
            width: 701,
            maxWidth: '90%',
            marginTop: 35,
            marginBottom: 46,
          }}
        >
          {/* Card background with glows (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              borderRadius: 20,
              background: 'rgba(255,255,255,0.03)',
              boxShadow: '0px 1.25px 0px 1.25px rgba(255,255,255,0.04) inset, 0px 5.01px 25.07px rgba(0,0,0,0.20)',
              outline: '1.25px rgba(255,255,255,0.06) solid',
              outlineOffset: -1.25,
              backdropFilter: 'blur(25px)',
            }}
            aria-hidden="true"
          >
            <div className="absolute" style={{ width: 587, height: 435, left: 304, top: -333, transform: 'rotate(48deg)', transformOrigin: 'top left', background: '#00110B', borderRadius: 9999, filter: 'blur(157px)' }} />
            <div className="absolute" style={{ width: 493, height: 278, left: 36, top: -28, background: '#114131', borderRadius: 9999, filter: 'blur(157px)' }} />
            <div className="absolute" style={{ width: 237, height: 237, left: 555, top: -75, opacity: 0.3, mixBlendMode: 'color', background: '#0D4532', borderRadius: 9999, filter: 'blur(87px)' }} />
          </div>

          {/* Card content (not clipped, dropdowns can overflow) */}
          <div className="relative" style={{ padding: '32px 78px 54px' }}>

          {/* Card title */}
          <h3 className="text-white font-acid font-normal text-center relative z-10" style={{ fontSize: 24, marginBottom: 42 }}>
            Transfer Funds
          </h3>

          {/* From Account */}
          <div className="relative z-10" style={{ marginBottom: 22 }}>
            <GlassSelectIcon
              label="From Account"
              placeholder="Search  Coin"
              icon={<SearchCoinIcon />}
              options={COIN_OPTIONS}
            />
          </div>

          {/* To Account */}
          <div className="relative z-10" style={{ marginBottom: 22 }}>
            <GlassSelectIcon
              label="To Account"
              placeholder="Search  Coin"
              icon={<WalletCircleIcon />}
              options={COIN_OPTIONS}
            />
          </div>

          {/* Amount */}
          <div className="relative z-10" style={{ marginBottom: 40 }}>
            <GlassInput label="Amount(USD)" placeholder="0.00" type="number" />
          </div>

          {/* Transfer Funds button with multi-layer glow */}
          <div className="relative z-10">
            <div
              className="absolute pointer-events-none"
              style={{
                width: '90%', height: 44, left: '5%', top: 3,
                background: 'linear-gradient(92deg, rgba(209,209,210,0) 0%, #38846B 100%)',
                borderRadius: 276, filter: 'blur(25px)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute pointer-events-none"
              style={{
                width: '100%', height: 52, left: 0, top: 0,
                background: 'linear-gradient(118deg, rgba(209,209,210,0) 0%, #38FFBD 100%)',
                borderRadius: 240, filter: 'blur(12.65px)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute pointer-events-none"
              style={{
                width: '100%', height: 44, left: 0, top: 3,
                background: 'linear-gradient(270deg, #D1D1D1 0%, rgba(162,245,227,0) 100%)',
                borderRadius: 300, filter: 'blur(4.65px)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute pointer-events-none"
              style={{
                width: '100%', height: 44, left: 0, top: 3,
                background: 'linear-gradient(270deg, #F0FEFE 0%, rgba(162,245,227,0) 100%)',
                borderRadius: 300, filter: 'blur(4.65px)',
              }}
              aria-hidden="true"
            />

            <button
              type="button"
              className="relative w-full cursor-pointer hover:opacity-90 transition-opacity font-acid font-medium"
              style={{
                height: 44,
                background: 'linear-gradient(54deg, #D1D1D1 18%, #D2F5ED 64%, #D5FFF1 80%)',
                borderRadius: 300,
                color: 'black',
                fontSize: 16,
                lineHeight: '24.44px',
              }}
              onClick={() => setProcessingOpen(true)}
            >
              Transfer Funds
            </button>
          </div>
          </div>
        </div>
      </div>
      <TransferProcessingModal open={processingOpen} onClose={() => setProcessingOpen(false)} />
    </div>
  )
}
