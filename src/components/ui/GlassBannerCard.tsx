import type { ReactNode } from 'react'
import { GlassCard } from './GlassCard'

interface GlassBannerCardProps {
  children: ReactNode
  className?: string
  glowSrc?: string
}

export function GlassBannerCard({ children, className = '', glowSrc = '/images/fiat-wallet-glow.svg' }: GlassBannerCardProps) {
  return (
    <GlassCard variant="heavy" divider="green" rounded="26px" className={`xl:min-h-[280px] 3xl:min-h-[350px] 4xl:min-h-[430px] flex flex-col justify-center ${className}`}>
      <img src={glowSrc} alt="" aria-hidden="true" className="absolute top-0 left-0 w-[50%] pointer-events-none z-[1]" />
      <div className="absolute w-[493px] h-[278px] -left-[5%] -top-[80px] rounded-full [filter:url(#blur-157)] pointer-events-none bg-[#104030] opacity-50" aria-hidden="true" />
      <div className="relative z-10 py-10 px-5 xl:py-25 xl:px-8 3xl:py-32 3xl:px-10 4xl:py-40 4xl:px-14">
        {children}
      </div>
    </GlassCard>
  )
}
