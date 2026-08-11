import { GlassCard, ActionItem } from '@/components/ui'
import { ServerTime } from './ServerTime'
import { DepositIcon, UserIcon, BookIcon, MarketNewsIcon } from '@/components/icons'
import { quickActions } from '@/data/quick-actions'
import type { ReactNode } from 'react'

const iconRender: Record<string, ReactNode> = {
  deposit: <DepositIcon size={18} color="currentColor" />,
  user: <UserIcon size={18} color="currentColor" />,
  chart: <MarketNewsIcon size={16} color="currentColor" />,
  book: <BookIcon size={18} color="currentColor" />,
}

export function QuickActions() {
  return (
    <GlassCard variant="heavy" divider="white" rounded="20px" className="h-full min-h-0 overflow-hidden">
      <div className="absolute w-[250px] h-[120px] -right-[10%] -top-[8%] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-100)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 flex flex-col h-full min-h-0 p-2.5 xl:p-3 2xl:p-4">
        <h2 className="shrink-0 text-sm xl:text-btn text-gfx-neutral-500 mb-1.5 font-normal leading-tight">Quick Actions</h2>
        <div className="flex flex-col flex-1 min-h-0 gap-1 xl:gap-3">
          {quickActions.map((action) => (
            <ActionItem
              key={action.title}
              title={action.title}
              subtitle={action.subtitle}
              icon={iconRender[action.icon] || <span>?</span>}
              href={action.href}
            />
          ))}
        </div>
        <div className="shrink-0 mt-4">
          <ServerTime />
        </div>
      </div>
    </GlassCard>
  )
}
