import type { ReactNode } from 'react'
import { GlassCard } from './GlassCard'

export type DownloadPlatform = 'ios' | 'android' | 'desktop'

function PhoneIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="4.25" y="1.75" width="9.5" height="14.5" rx="2.1" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" />
      {!filled && <path d="M7.25 3.75h3.5M8.2 13.9h1.6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />}
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.25" y="3" width="15.5" height="11" rx="2.25" fill="currentColor" />
      <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const PLATFORM_OPTIONS: { id: DownloadPlatform; label: string; icon: ReactNode }[] = [
  { id: 'ios', label: 'IOS', icon: <PhoneIcon /> },
  { id: 'android', label: 'Android', icon: <PhoneIcon filled /> },
  { id: 'desktop', label: 'Desktop', icon: <MonitorIcon /> },
]

export function PlatformTabs({ value, onChange }: { value: DownloadPlatform; onChange: (platform: DownloadPlatform) => void }) {
  return (
    <div className="grid h-11.5 w-full grid-cols-3 items-center rounded-full bg-white/[0.04] p-px" role="tablist" aria-label="Installation platform" data-platform-tabs>
      {PLATFORM_OPTIONS.map((option) => {
        const active = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={`relative flex h-11 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-full font-acid text-base font-medium leading-[1.5275rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-glow ${active ? 'border-[0.5px] border-gfx-green-glow bg-gfx-green-300/35 text-white shadow-[0_0_20px_rgba(0,240,160,0.12)]' : 'border-[0.5px] border-transparent text-gfx-neutral-400 hover:text-white'}`}
          >
            {active && <span className="absolute -bottom-6 left-1/2 size-14 -translate-x-1/2 rounded-full bg-gfx-green-glow/35 blur-xl" aria-hidden="true" />}
            <span className="relative flex items-center gap-1.5">{option.icon}{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function AppFeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <GlassCard divider="none" rounded="0.875rem" className="flex h-20 items-center gap-4 px-[1.125rem]" data-app-feature-card>
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-gfx-green-900 text-gfx-green-300">{icon}</span>
      <span className="min-w-0">
        <strong className="block font-acid text-[1.03125rem] font-bold leading-5 text-white">{title}</strong>
        <span className="block font-acid text-sm leading-[1.175rem] text-[#9c9ca4]">{description}</span>
      </span>
    </GlassCard>
  )
}

export function InstallStepCard({ number, icon, title, description }: { number: number; icon: ReactNode; title: string; description: string }) {
  return (
    <GlassCard divider="none" rounded="1.75rem" className="flex min-h-24.25 items-center gap-[1.125rem] px-4" data-install-step-card>
      <span className="relative grid h-11 w-12.5 shrink-0 place-items-center rounded-md bg-gfx-green-900 text-gfx-green-300">
        <span className="absolute -left-0.5 -top-0.5 grid size-3.5 place-items-center rounded-full bg-gfx-green-300 font-acid text-[0.467rem] font-medium leading-none text-black">{number}</span>
        {icon}
      </span>
      <span className="min-w-0">
        <strong className="block font-acid text-base font-medium leading-[1.5275rem] text-white">{title}</strong>
        <span className="block max-w-[21.5rem] font-acid text-sm leading-[1.175rem] text-gfx-neutral-400">{description}</span>
      </span>
    </GlassCard>
  )
}
