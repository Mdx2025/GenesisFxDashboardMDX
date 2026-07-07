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
      <div className="absolute w-[717px] h-[727px] -right-[10%] -top-[250px] rounded-full [filter:url(#blur-157)] pointer-events-none bg-[#003523] opacity-30" aria-hidden="true" />
      <div className="absolute w-[493px] h-[278px] -left-[5%] -top-[80px] rounded-full [filter:url(#blur-157)] pointer-events-none bg-[#104030] opacity-50" aria-hidden="true" />
      <div className="relative z-10 p-6 xl:p-8 3xl:p-10 4xl:p-14">
        {children}
      </div>
    </GlassCard>
  )
}
