import { GlassCard, GlowEllipse, TradingCalendar } from '@/components/ui'
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

/* ─── Donut Chart ─── */

function DonutChart({ value, label, color = '#10BC83' }: { value: number; label: string; color?: string }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = (value / 100) * circumference
  const remaining = circumference - progress

  return (
    <div className="relative w-[6.25rem] h-[6.25rem]">
      <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-[-90deg]">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#09241c" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={`${progress} ${remaining}`}
          strokeLinecap="round"
          className="[filter:var(--shadow-drop-glow-green)]"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span data-chart-text className="text-white text-sm font-acid">{label}</span>
      </div>
    </div>
  )
}

/* ─── Stat Card ─── */

function StatCard({ stat, glowPos }: { stat: CalendarStat; glowPos: string }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden h-[11.3750rem]">
      <GlowEllipse className={`${glowPos} !w-[11.25rem] !h-[6.25rem] !blur-[4.375rem]`} />
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-gfx-neutral-500 text-base font-acid font-medium">{stat.label}</span>
          <InfoIcon />
        </div>
        <div className="flex-1 flex items-center justify-center mt-2">
          {stat.type === 'asset' && (
            <div
              className="flex items-center gap-4 px-5 py-2.5 rounded-full bg-stat-pill"
            >
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <g clipPath="url(#xauusd-clip)">
                  <path d="M0 0H38V38H0V0Z" fill="#D69A00" />
                  <path d="M14.4196 14.6255H23.773L22.4091 10.966C22.3561 10.8158 22.2592 10.6851 22.1309 10.5907L14.4196 14.6255ZM14.3938 10.282C14.725 9.39167 15.4537 8.82031 16.2572 8.82031H21.7882C22.5916 8.82031 23.3204 9.39167 23.6522 10.282L25.0155 13.9415C25.4247 15.0394 24.7637 16.2846 23.773 16.2846H14.273C13.2823 16.2846 12.6221 15.0394 13.0306 13.9415L14.3945 10.282H14.3938ZM6.94649 24.1255H16.2816L14.9177 20.466C14.8646 20.3158 14.7677 20.1851 14.6395 20.0907L6.94649 24.1255ZM6.92003 19.782C7.25185 18.8917 7.98131 18.3203 8.78407 18.3203H14.2968C15.1002 18.3203 15.8297 18.8917 16.1608 19.782L17.5241 23.4415C17.9332 24.5394 17.273 25.7846 16.2816 25.7846H6.79856C5.80785 25.7846 5.1476 24.5394 5.55678 23.4415L6.92003 19.782ZM31.274 24.1255H21.8757L29.6318 20.0914C29.7533 20.1769 29.851 20.3058 29.9121 20.4666L31.2746 24.1255H31.274ZM23.714 18.3203C22.9106 18.3203 22.1811 18.8917 21.85 19.782L20.4867 23.4415C20.0775 24.5394 20.7378 25.7846 21.7292 25.7846H31.2746C32.2654 25.7846 32.9256 24.5394 32.5164 23.4415L31.1525 19.782C30.8234 18.8917 30.0946 18.3203 29.2912 18.3203H23.714Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="xauusd-clip">
                    <rect width="38" height="38" rx="19" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-white text-2xl font-acid">XAUUSD</span>
            </div>
          )}
          {stat.type === 'number' && (
            <div
              className="flex items-center gap-4 px-5 py-2.5 rounded-full bg-stat-pill"
            >
              <DiagramUpIcon />
              <span className="text-white text-2xl font-acid">{stat.value}</span>
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
          <StatCard
            key={i}
            stat={stat}
            glowPos={
              [
                'left-[-60px] top-[-50px]',
                'left-[-60px] bottom-[-50px]',
                'left-[-60px] top-[-50px]',
                'left-[-60px] top-[-50px]',
              ][i]
            }
          />
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
