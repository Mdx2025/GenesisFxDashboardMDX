import { type ReactNode } from 'react'
import { GlassCard } from './GlassCard'

export function StatCard({ label, value, valueColor = 'text-white', icon, action }: { label: string; value: string; valueColor?: string; icon?: ReactNode; action?: string }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="relative p-6 min-h-[148px] flex flex-col justify-center">
        {icon ? (
          <>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gfx-neutral-500 text-sm font-acid leading-tight">{label}</p>
                <p className={`${valueColor} text-4xl font-acid leading-normal mt-2`}>{value}</p>
                {action && <p className="text-gfx-green-300 text-base font-acid mt-1">{action}</p>}
              </div>
              <div className="w-[42px] h-[42px] rounded-xl bg-gfx-green-900 flex items-center justify-center">
                {icon}
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-gfx-neutral-500 text-sm font-acid leading-tight">{label}</p>
            <p className={`${valueColor} text-4xl font-acid leading-normal mt-2`}>{value}</p>
            {action && <p className="text-gfx-green-300 text-base font-acid mt-1">{action}</p>}
          </>
        )}
      </div>
    </GlassCard>
  )
}
