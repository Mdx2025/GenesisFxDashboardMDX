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
                <p className="text-[#a0a0a0] text-[0.875rem] font-acid leading-[18.8px]">{label}</p>
                <p className={`${valueColor} text-[2.25rem] font-acid leading-normal mt-2`}>{value}</p>
              </div>
              <div className="w-[2.625rem] h-[2.625rem] rounded-[0.625rem] bg-[#09241c] flex items-center justify-center">
                {icon}
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-[#a0a0a0] text-[0.875rem] font-acid leading-[18.8px]">{label}</p>
            <p className={`${valueColor} text-[2.25rem] font-acid leading-normal mt-2`}>{value}</p>
          </>
        )}
      </div>
      <GlowEllipse className="!w-[12rem] !h-[8rem] bottom-0 left-0 -translate-x-1/4 translate-y-1/4 !blur-[4rem] opacity-60" />
    </GlassCard>
  )
}
