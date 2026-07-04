import { Breadcrumb, GreenDot } from '@/components/ui'
import { HelpIcon } from '@/components/icons'

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="flex items-center justify-between mb-4 gap-2">
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="lg:hidden text-gfx-neutral-500 hover:text-white rounded shrink-0"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <Breadcrumb items={[{ label: 'Overview' }, { label: 'Dashboard', current: true }]} />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <GreenDot size={6} />
          <span className="text-gfx-green-500 text-body2 font-normal hidden sm:inline">Markets Open</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gfx-card-border bg-gfx-card-bg">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v2m0 8v2M1 7h2m8 0h2" stroke="#A0A0A0" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-white text-body2 font-normal">$100.00</span>
        </div>

        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gfx-card-border bg-gfx-card-bg text-gfx-neutral-500 text-body2 font-normal hover:text-white transition-colors" aria-label="Change language">
          EN
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2.5 3.75L5 6.25l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button className="text-gfx-neutral-500 hover:text-white transition-colors rounded" aria-label="Help">
          <HelpIcon />
        </button>
      </div>
    </header>
  )
}
