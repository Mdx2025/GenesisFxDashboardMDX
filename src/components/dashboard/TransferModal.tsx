import { useEffect, useRef } from 'react'

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

function ChevronDownSmall() {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true">
      <path d="M1 1l7 6 7-6" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface TransferModalProps {
  open: boolean
  onClose: () => void
}

export function TransferModal({ open, onClose }: TransferModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Internal Transfer"
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: 793,
          maxWidth: '95vw',
          background: '#040B09',
          boxShadow: '0px 1.16px 0px 1.16px rgba(255,255,255,0.05) inset, 0px 9.29px 37.17px rgba(0,0,0,0.30)',
          borderRadius: 40,
          outline: '1.16px rgba(0,0,0,0.20) solid',
          outlineOffset: -1.16,
          backdropFilter: 'blur(23.23px)',
        }}
      >
        {/* Bottom glow ellipse */}
        <div
          className="absolute pointer-events-none"
          style={{ width: 493, height: 278, left: 190, top: 682, background: '#114131', borderRadius: 9999, filter: 'blur(157px)' }}
          aria-hidden="true"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity"
          style={{ right: 28, top: 28, width: 24, height: 24 }}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <div className="text-center" style={{ paddingTop: 63 }}>
          <h2 className="text-white font-acid font-normal" style={{ fontSize: 50, lineHeight: 1 }}>
            Internal Transfer
          </h2>
          <p className="mx-auto font-acid font-medium" style={{ color: '#A0A0A0', fontSize: 16, lineHeight: '24.44px', maxWidth: 352, marginTop: 3 }}>
            Transfer funds between your wallets and trading accounts instantly with no fees.
          </p>
        </div>

        {/* Inner glass card */}
        <div
          className="relative overflow-hidden mx-auto"
          style={{
            width: 701,
            maxWidth: '90%',
            marginTop: 35,
            marginBottom: 46,
            background: 'rgba(255,255,255,0.03)',
            boxShadow: '0px 1.25px 0px 1.25px rgba(255,255,255,0.04) inset, 0px 5.01px 25.07px rgba(0,0,0,0.20)',
            borderRadius: 20,
            outline: '1.25px rgba(255,255,255,0.06) solid',
            outlineOffset: -1.25,
            backdropFilter: 'blur(25px)',
            padding: '32px 78px 54px',
          }}
        >
          {/* Decorative glows inside card */}
          <div className="absolute pointer-events-none" style={{ width: 587, height: 435, left: 304, top: -333, transform: 'rotate(48deg)', transformOrigin: 'top left', background: '#00110B', borderRadius: 9999, filter: 'blur(157px)' }} aria-hidden="true" />
          <div className="absolute pointer-events-none" style={{ width: 493, height: 278, left: 36, top: -28, background: '#114131', borderRadius: 9999, filter: 'blur(157px)' }} aria-hidden="true" />
          <div className="absolute pointer-events-none" style={{ width: 237, height: 237, left: 555, top: -75, opacity: 0.3, mixBlendMode: 'color', background: '#0D4532', borderRadius: 9999, filter: 'blur(87px)' }} aria-hidden="true" />

          {/* Card title */}
          <h3 className="text-white font-acid font-normal text-center relative z-10" style={{ fontSize: 24, marginBottom: 42 }}>
            Transfer Funds
          </h3>

          {/* From Account */}
          <div className="relative z-10" style={{ marginBottom: 22 }}>
            <label className="block text-white font-acid font-medium" style={{ fontSize: 16, lineHeight: '24.44px', marginBottom: 2 }}>
              From Account
            </label>
            <div
              className="flex items-center relative"
              style={{ height: 50, background: '#101E1A', borderRadius: 30, border: '1px solid #404040' }}
            >
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 38, height: 38, marginLeft: 6,
                  background: 'linear-gradient(204deg, #01130D 0%, #064B34 100%)',
                  borderRadius: 9999,
                }}
              >
                <SearchCoinIcon />
              </div>
              <span className="font-acid" style={{ color: '#808080', fontSize: 16, marginLeft: 10 }}>Search  Coin</span>
              <div className="absolute" style={{ right: 16, top: '50%', transform: 'translateY(-50%)' }}>
                <ChevronDownSmall />
              </div>
            </div>
          </div>

          {/* To Account */}
          <div className="relative z-10" style={{ marginBottom: 22 }}>
            <label className="block text-white font-acid font-medium" style={{ fontSize: 16, lineHeight: '24.44px', marginBottom: 2 }}>
              To Account
            </label>
            <div
              className="flex items-center relative"
              style={{ height: 50, background: '#101E1A', borderRadius: 30, border: '1px solid #404040' }}
            >
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 38, height: 38, marginLeft: 6,
                  background: 'linear-gradient(204deg, #01130D 0%, #064B34 100%)',
                  borderRadius: 9999,
                }}
              >
                <WalletCircleIcon />
              </div>
              <span className="font-acid" style={{ color: '#808080', fontSize: 16, marginLeft: 10 }}>Search  Coin</span>
              <div className="absolute" style={{ right: 16, top: '50%', transform: 'translateY(-50%)' }}>
                <ChevronDownSmall />
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="relative z-10" style={{ marginBottom: 40 }}>
            <label className="block text-white font-acid font-medium" style={{ fontSize: 16, lineHeight: '24.44px', marginBottom: 2 }}>
              Amount(USD)
            </label>
            <div
              className="flex items-center"
              style={{ height: 50, background: '#101E1A', borderRadius: 30, border: '1px solid #404040', paddingLeft: 16 }}
            >
              <span className="font-acid" style={{ color: '#808080', fontSize: 16 }}>0.00</span>
            </div>
          </div>

          {/* Transfer Funds button with multi-layer glow */}
          <div className="relative z-10">
            {/* Glow layers behind button */}
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

            {/* Actual button */}
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
            >
              Transfer Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
