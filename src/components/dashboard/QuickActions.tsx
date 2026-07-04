import { GlassCard, ActionItem } from '@/components/ui'
import { ServerTime } from './ServerTime'
import { DepositIcon, UserIcon, BookIcon, MarketNewsIcon } from '@/components/icons'
import { quickActions } from '@/data/quick-actions'
import type { ReactNode } from 'react'

const iconRender: Record<string, ReactNode> = {
  deposit: <DepositIcon size={24} color="#10BC83" />,
  user: <UserIcon size={24} color="#10BC83" />,
  chart: <MarketNewsIcon size={21} color="#10BC83" />,
  book: <BookIcon size={24} color="#10BC83" />,
}

export function QuickActions() {
  return (
    <GlassCard variant="heavy" divider="white" rounded="20px" className="h-full">
      <div className="absolute w-[250px] h-[120px] right-[-40px] top-[-20px] rounded-full pointer-events-none" style={{ background: '#104030', filter: 'blur(100px)' }} aria-hidden="true" />
      <div className="relative z-10 p-4 sm:p-6">
        <h2 className="text-btn text-white mb-4 font-normal">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          {quickActions.map((action) => (
            <ActionItem
              key={action.title}
              title={action.title}
              subtitle={action.subtitle}
              icon={iconRender[action.icon] || <span>?</span>}
            />
          ))}
        </div>
        <ServerTime />
      </div>
    </GlassCard>
  )
}
