import { Fragment, type ReactNode } from 'react'
import { GlowButton } from '@/components/ui'

function BackArrowIcon() {
  return (
    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" aria-hidden="true">
      <path d="M5 1L1 6L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ProfileHeaderPill({ children, tone = 'neutral', icon }: { children: ReactNode; tone?: 'neutral' | 'gold'; icon?: ReactNode }) {
  const toneClass = tone === 'gold' ? 'border-gfx-gold text-gfx-gold' : 'border-gfx-green-200 text-gfx-neutral-550'
  return (
    <span className={`inline-flex items-center gap-2 h-[2.1875rem] px-4 rounded-full border bg-gfx-green-800 text-xs font-acid font-normal leading-[18.8px] whitespace-nowrap ${toneClass}`}>
      {icon}
      <span className="optical-text">{children}</span>
    </span>
  )
}

interface ProfileHeaderProps {
  onBack: () => void
  backLabel: string
  initials: string
  name: string
  /** Badges or pills rendered inline after the name; they wrap instead of pushing the CTA off-screen. */
  badges?: ReactNode
  /** Subtitle fragments joined with dot separators. */
  meta?: string[]
  favorite?: boolean
  onToggleFavorite?: () => void
  ctaLabel: string
  ctaIcon?: ReactNode
  onCtaClick: () => void
}

export function ProfileHeader({
  onBack,
  backLabel,
  initials,
  name,
  badges,
  meta,
  favorite = false,
  onToggleFavorite,
  ctaLabel,
  ctaIcon,
  onCtaClick,
}: ProfileHeaderProps) {
  // Below lg the header stacks into rows sharing the page's left edge; from lg it
  // collapses into a single row with the meta line under the name.
  return (
    <div className="grid items-center gap-x-3 sm:gap-x-4 gap-y-3 grid-cols-[auto_auto_1fr] lg:grid-cols-[auto_auto_auto_1fr_auto] lg:gap-y-1.5">
      <button
        type="button"
        aria-label={backLabel}
        onClick={onBack}
        className="w-[2.375rem] h-[2.375rem] rounded-sm bg-gfx-green-900 text-gfx-neutral-500 flex items-center justify-center cursor-pointer transition-colors hover:bg-gfx-green-150 hover:text-white lg:row-start-1 lg:row-span-2 lg:col-start-1"
      >
        <BackArrowIcon />
      </button>

      <div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden border border-gfx-green-300/40 lg:row-start-1 lg:row-span-2 lg:col-start-2"
        style={{ background: 'linear-gradient(145deg, var(--color-gfx-green-200) 0%, var(--color-gfx-green-900) 100%)' }}
      >
        <span className="text-white text-base sm:text-lg font-acid font-medium tracking-wide uppercase">{initials}</span>
      </div>

      <h1 className="text-white text-h1 font-normal leading-[1.05] min-w-0 lg:row-start-1 lg:col-start-3">{name}</h1>

      {badges && (
        <div className="col-span-3 flex flex-wrap items-center gap-2 lg:col-span-1 lg:row-start-1 lg:col-start-4 lg:justify-self-start">
          {badges}
        </div>
      )}

      {meta && meta.length > 0 && (
        <p className="col-span-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-gfx-neutral-500 text-sm font-acid lg:col-span-2 lg:row-start-2 lg:col-start-3">
          {meta.map((item, i) => (
            <Fragment key={item}>
              {i > 0 && <span aria-hidden="true" className="w-1 h-1 rounded-full bg-current opacity-50" />}
              <span>{item}</span>
            </Fragment>
          ))}
        </p>
      )}

      <div className="col-span-3 flex items-center gap-3 lg:col-span-1 lg:row-start-1 lg:row-span-2 lg:col-start-5">
        {onToggleFavorite && (
          <button
            type="button"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={favorite}
            onClick={onToggleFavorite}
            className={`w-11 h-11 rounded-full border bg-gfx-green-800 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${
              favorite
                ? 'border-gfx-gold text-gfx-gold'
                : 'border-gfx-green-200 text-gfx-neutral-500 hover:border-gfx-green-300 hover:text-white'
            }`}
          >
            <StarIcon filled={favorite} />
          </button>
        )}
        <div className="flex-1 sm:flex-none sm:w-[11.25rem]">
          <GlowButton label={ctaLabel} icon={ctaIcon} width="100%" height={44} onClick={onCtaClick} />
        </div>
      </div>
    </div>
  )
}
