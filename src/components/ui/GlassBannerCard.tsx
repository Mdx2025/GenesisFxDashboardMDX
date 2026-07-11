import type { ReactNode } from 'react'
import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'
import './GlassBannerCard.css'

interface GlassBannerCardProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  glowSrc?: string
}

const defaultPadding = 'py-10 px-5 xl:py-23 xl:px-12 3xl:py-29 3xl:px-10 4xl:py-36 4xl:px-14'

export function GlassBannerCard({ children, className = '', contentClassName, glowSrc = '/images/fiat-wallet-glow.svg' }: GlassBannerCardProps) {
  return (
    <GlassCard variant="heavy" divider="none" rounded="26px" className={`glass-banner-card ${className}`}>
      <img src={glowSrc} alt="" aria-hidden="true" className="absolute top-0 left-0 w-[50%] h-full pointer-events-none z-[1]" />
      <GlowEllipse className="-left-[5%] -top-[80px]" />
      <div className={`relative z-10 ${contentClassName ?? defaultPadding}`}>
        {children}
      </div>
    </GlassCard>
  )
}
