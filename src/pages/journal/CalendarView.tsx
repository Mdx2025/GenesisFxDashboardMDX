import { GlassCard, TradingCalendar } from '@/components/ui'
import { calendarStats, calendarTrades } from '@/data/calendar'
import type { CalendarStat } from '@/data/calendar'

/* ─── Icons ─── */

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="#606060" strokeWidth="1.2" />
      <path d="M9 8V13" stroke="#606060" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="0.75" fill="#606060" />
    </svg>
  )
}

function DiagramUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 17L9 11L13 15L21 7" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7H21V13" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XauusdIcon() {
  return (
    <div className="w-[38px] h-[38px] rounded-full bg-[#d69a00] flex items-center justify-center overflow-hidden">
      <svg width="27" height="17" viewBox="0 0 27 17" fill="none">
        <path d="M13.5 0L16.5 6H10.5L13.5 0ZM4 17L0 7H8L4 17ZM23 17L19 7H27L23 17ZM13.5 17L9 7H18L13.5 17Z" fill="white" />
      </svg>
    </div>
  )
}

/* ─── Donut Chart ─── */

function DonutChart({ value, label, color = '#10BC83' }: { value: number; label: string; color?: string }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = (value / 100) * circumference
  const remaining = circumference - progress

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-[-90deg]">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#09241c" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={`${progress} ${remaining}`}
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_rgba(16,188,131,0.5)]"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-[14px] font-acid">{label}</span>
      </div>
    </div>
  )
}

/* ─── Stat Card ─── */

function StatCard({ stat }: { stat: CalendarStat }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden h-[182px]">
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-gfx-neutral-500 text-[16px] font-acid font-medium">{stat.label}</span>
          <InfoIcon />
        </div>
        <div className="flex-1 flex items-center mt-2">
          {stat.type === 'asset' && (
            <div className="flex items-center gap-3">
              <XauusdIcon />
              <span className="text-white text-[22px] font-acid">XAUUSD</span>
            </div>
          )}
          {stat.type === 'number' && (
            <div className="flex items-center gap-3">
              <DiagramUpIcon />
              <span className="text-white text-[24px] font-acid">{stat.value}</span>
            </div>
          )}
          {stat.type === 'donut' && (
            <div className="flex items-center justify-center w-full">
              <DonutChart
                value={stat.donutValue ?? 0}
                label={stat.value}
                color={stat.donutColor}
              />
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Calendar View ─── */

export default function CalendarView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {calendarStats.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      <TradingCalendar
        trades={calendarTrades}
        initialYear={2026}
        initialMonth={3}
      />
    </div>
  )
}
