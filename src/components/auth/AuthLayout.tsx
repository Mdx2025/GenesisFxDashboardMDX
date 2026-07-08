import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

function AuthFooter() {
  return (
    <footer className="w-full relative lg:absolute lg:bottom-0 mt-6 lg:mt-0 px-4 lg:pl-15 lg:pr-0">
      <div className="bg-[#0c1311] rounded-xl px-4 lg:px-[1.4375rem] py-3 lg:py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="text-[#ececec] text-xs leading-[1.175rem] whitespace-nowrap">
          2026 Genesis FX Markets. All rights reserved.
        </span>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 lg:gap-x-6 gap-y-1" aria-label="Legal links">
          <a href="#terms" className="text-[#a0a0a0] text-xs leading-[1.175rem] hover:text-white transition-colors">Terms &amp; Conditions</a>
          <a href="#privacy" className="text-[#a0a0a0] text-xs leading-[1.175rem] hover:text-white transition-colors">Privacy Policy</a>
          <a href="#risk" className="text-[#a0a0a0] text-xs leading-[1.175rem] hover:text-white transition-colors">Risk Disclosure</a>
          <a href="#aml" className="text-[#a0a0a0] text-xs leading-[1.175rem] hover:text-white transition-colors">Anti-Money Laundering</a>
        </nav>
      </div>
    </footer>
  )
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen lg:h-screen bg-[#000705] font-acid relative overflow-hidden">
      <div
        className="absolute w-[43.6875rem] h-[43.6875rem] -top-[19.4375rem] -right-[41.75rem] rounded-full bg-[#064b34] blur-[406px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row h-full p-4 sm:p-8 lg:p-[3.125rem] gap-6 lg:gap-0">
        {/* Left: Hero Image — hidden on mobile */}
        <div className="relative hidden lg:block lg:w-[38%] xl:w-[42%] 2xl:w-[50%] h-full shrink-0 rounded-[3rem] overflow-hidden">
          <img
            src="/images/login-hero.png"
            alt="Genesis FX trading platform"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute w-[36.6875rem] h-[20.75rem] -top-[13.4375rem] -right-[16.875rem] rounded-full bg-[#00b38c] blur-[10rem] opacity-20 pointer-events-none" aria-hidden="true" />
          <div className="absolute w-[30.8125rem] h-[17.375rem] -bottom-[9.375rem] -left-[9.375rem] rounded-full bg-[#00b38c] blur-[10rem] opacity-20 pointer-events-none" aria-hidden="true" />
          <div className="absolute w-[18.4375rem] h-[17.125rem] -bottom-[6.25rem] -left-[3.125rem] rounded-full bg-[#40c99c] blur-[8.75rem] opacity-15 mix-blend-plus-lighter pointer-events-none" aria-hidden="true" />
          <div className="absolute w-[18.4375rem] h-[17.125rem] -bottom-[5rem] left-0 rounded-full bg-[#40c99c] blur-[9.375rem] opacity-15 mix-blend-plus-lighter pointer-events-none" aria-hidden="true" />
          <img
            src="/images/genesis-logo.png"
            alt="Genesis FX"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 h-[2.8125rem] w-auto z-10"
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
          {children}
          <AuthFooter />
        </div>
      </div>
    </div>
  )
}
