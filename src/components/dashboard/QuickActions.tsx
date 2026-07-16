import { GlassCard, ActionItem } from '@/components/ui'
import { GLOW_GREEN } from '@/constants/colors'
import { ServerTime } from './ServerTime'
import { DepositIcon, UserIcon, BookIcon, MarketNewsIcon } from '@/components/icons'
import { quickActions } from '@/data/quick-actions'
import type { ReactNode } from 'react'

const iconRender: Record<string, ReactNode> = {
  deposit: <DepositIcon size={24} color="white" />,
  user: <UserIcon size={24} color="white" />,
  chart: <MarketNewsIcon size={21} color="white" />,
  book: <BookIcon size={24} color="white" />,
}

export function QuickActions() {
  return (
    <GlassCard variant="heavy" divider="white" rounded="20px" className="h-full">
      <div className="absolute w-[250px] h-[120px] -right-[10%] -top-[8%] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-100)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-3 xl:p-4 2xl:p-6 3xl:p-8">
        <h2 className="text-btn text-white mb-2 2xl:mb-4 font-normal">Quick Actions</h2>
        <div className="flex flex-col gap-1.5 xl:gap-2 2xl:gap-3">
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
        <ServerTime />
      </div>
    </GlassCard>
  )
}
