import type { ReactNode } from 'react'
import { GlassCard } from './GlassCard'

interface GlassBannerCardProps {
  children: ReactNode
  className?: string
  glowSrc?: string
}

export function GlassBannerCard({ children, className = '', glowSrc = '/images/fiat-wallet-glow.svg' }: GlassBannerCardProps) {
  return (
    <GlassCard variant="heavy" divider="green" rounded="26px" className={className}>
      <img src={glowSrc} alt="" aria-hidden="true" className="absolute top-0 left-0 w-[50%] pointer-events-none z-[1]" />
      <div className="absolute w-[493px] h-[278px] -left-[5%] -top-[80px] rounded-full [filter:url(#blur-157)] pointer-events-none bg-[#104030] opacity-50" aria-hidden="true" />
      <div className="relative z-10 py-8 px-5 xl:py-14 xl:px-7 3xl:py-18 3xl:px-9 4xl:py-22 4xl:px-12">
        {children}
      </div>
    </GlassCard>
  )
}
