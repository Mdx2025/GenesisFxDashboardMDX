import { type ReactNode } from 'react'
import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'

export function StatCard({ label, value, valueColor = 'text-white', icon }: { label: string; value: string; valueColor?: string; icon?: ReactNode }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
      <div className="relative p-6 min-h-[148px] flex flex-col justify-center">
        {icon ? (
          <>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gfx-neutral-500 text-sm font-acid leading-tight">{label}</p>
                <p className={`${valueColor} text-4xl font-acid leading-normal mt-2`}>{value}</p>
              </div>
              <div className="w-10 h-10 rounded-sm bg-gfx-green-900 flex items-center justify-center">
                {icon}
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-gfx-neutral-500 text-sm font-acid leading-tight">{label}</p>
            <p className={`${valueColor} text-4xl font-acid leading-normal mt-2`}>{value}</p>
          </>
        )}
      </div>
      <GlowEllipse className="!w-[12rem] !h-[8rem] bottom-0 left-0 -translate-x-1/4 translate-y-1/4 !blur-[4rem] opacity-60" />
    </GlassCard>
  )
}
