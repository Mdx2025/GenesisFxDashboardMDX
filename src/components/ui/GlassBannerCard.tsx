import type { ReactNode } from 'react'
import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'
import './GlassBannerCard.css'

interface GlassBannerCardProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  glowSrc?: string
  rounded?: string
}

const defaultPadding = 'py-10 px-5 xl:py-11 xl:px-12 3xl:py-14 3xl:px-15 4xl:py-18 4xl:px-19'

export function GlassBannerCard({ children, className = '', contentClassName, glowSrc = '/images/fiat-wallet-glow.svg', rounded = '26px' }: GlassBannerCardProps) {
  return (
    <GlassCard variant="heavy" divider="none" rounded={rounded} className={`glass-banner-card ${className}`}>
      <img src={glowSrc} alt="" aria-hidden="true" className="glass-banner-card__glow-image absolute top-0 left-0 w-[50%] h-full pointer-events-none z-base" />
      <GlowEllipse className="-left-[5%] -top-[80px]" />
      <div className={`relative z-10 ${contentClassName ?? defaultPadding}`}>
        {children}
      </div>
    </GlassCard>
  )
}
