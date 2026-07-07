import type { ReactNode } from 'react'
import { GlassCard } from './GlassCard'

interface GlassBannerCardProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  glowSrc?: string
}

const defaultPadding = 'py-10 px-5 xl:py-23 xl:px-8 3xl:py-29 3xl:px-10 4xl:py-36 4xl:px-14'

export function GlassBannerCard({ children, className = '', contentClassName, glowSrc = '/images/fiat-wallet-glow.svg' }: GlassBannerCardProps) {
  return (
    <GlassCard variant="heavy" divider="green" rounded="26px" className={className}>
      <img src={glowSrc} alt="" aria-hidden="true" className="absolute top-0 left-0 w-[50%] pointer-events-none z-[1]" />
      <div className="absolute w-[493px] h-[278px] -left-[5%] -top-[80px] rounded-full [filter:url(#blur-157)] pointer-events-none bg-[#104030] opacity-50" aria-hidden="true" />
      <div className={`relative z-10 ${contentClassName ?? defaultPadding}`}>
        {children}
      </div>
    </GlassCard>
  )
}
