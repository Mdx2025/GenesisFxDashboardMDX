import type { ReactNode } from 'react'

interface AuthCardLayoutProps {
  children: ReactNode
  footer?: ReactNode
}

export function AuthCardLayout({ children, footer }: AuthCardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#000705] font-acid relative overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      {/* Page-level glow — top right */}
      <div
        className="absolute w-[43.6875rem] h-[43.6875rem] -top-[19.4375rem] -right-[1.9375rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #064b34 0%, transparent 70%)', filter: 'blur(9.375rem)' }}
        aria-hidden="true"
      />

      {/* Card container */}
      <div className="relative w-full max-w-[51.125rem] rounded-[3rem] overflow-hidden">
        {/* Glow — top right of card */}
        <div
          className="absolute -top-[16.5625rem] -right-[12.5rem] w-[36.6875rem] h-[20.75rem] rounded-full pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(ellipse, #00b38c 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Glow — bottom left of card */}
        <div
          className="absolute -bottom-[20.4375rem] -left-[27.75rem] w-[36.6875rem] h-[20.75rem] rounded-full pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(ellipse, #00b38c 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-[18.625rem] -left-[18.625rem] w-[18.4375rem] h-[17.125rem] rounded-full pointer-events-none opacity-30 mix-blend-plus-lighter"
          style={{ background: 'radial-gradient(ellipse, #40c99c 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Pixel texture — top right */}
        <div
          className="absolute -top-[11.3125rem] -right-[1.375rem] w-[31.25rem] h-[31.25rem] opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/pixels.png)',
            backgroundSize: '37.5rem 37.5rem',
            backgroundPosition: 'top left',
            maskImage: 'linear-gradient(135deg, transparent 20%, black 50%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(135deg, transparent 20%, black 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* Pixel texture — bottom left */}
        <div
          className="absolute -bottom-[0.25rem] -left-[2rem] w-[31.25rem] h-[31.25rem] opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/pixels.png)',
            backgroundSize: '37.5rem 37.5rem',
            backgroundPosition: 'top left',
            maskImage: 'linear-gradient(315deg, transparent 20%, black 50%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(315deg, transparent 20%, black 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* Logo */}
        <div className="relative flex justify-center pt-[5.4375rem] pb-6">
          <img
            src="/images/genesis-logo.png"
            alt="Genesis FX"
            className="h-[2.8125rem] w-auto relative z-10"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-6 sm:px-12 pb-16">
          {children}
        </div>

        {/* Footer inside card */}
        {footer && (
          <div className="relative z-10 pb-10">
            {footer}
          </div>
        )}
      </div>

      {/* Footer outside card */}
      <p className="text-[#808080] text-xs mt-8 text-center">
        2026 Genesis FX Markets. All rights reserved.
      </p>
    </div>
  )
}
