import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'

interface InfoListRow {
  label: string
  value: string
  valueColor?: string
}

interface InfoListCardProps {
  title: string
  rows: InfoListRow[]
  className?: string
}

export function InfoListCard({ title, rows, className = '' }: InfoListCardProps) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className={`relative overflow-hidden ${className}`}>
      <GlowEllipse className="-left-[10rem] -top-[7.5rem]" />
      <div className="relative z-10 px-[1.875rem] py-[2.125rem]">
        <h3 className="text-white text-base font-acid font-medium leading-none">{title}</h3>
        <div className="mt-[1.5625rem] -mx-[1.5rem] h-px bg-[rgba(255,255,255,0.06)]" />
        <div className="mt-[1.625rem] flex flex-col gap-[2.1875rem]">
          {rows.map(row => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <span className="text-gfx-neutral-400 text-base font-acid font-normal leading-none">{row.label}</span>
              <span className={`text-base font-acid font-normal leading-none ${row.valueColor ?? 'text-white'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
