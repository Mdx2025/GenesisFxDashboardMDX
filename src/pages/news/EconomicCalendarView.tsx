import { GlassCard, GreenDot } from '@/components/ui'
import { economicCalendarDays } from '@/data/economicCalendar'
import type { EconomicEvent } from '@/data/economicCalendar'

/* ─── Icons ─── */

function ImpactIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="12" width="4" height="8" rx="1" fill="#ff4d6a" />
      <rect x="10" y="8" width="4" height="12" rx="1" fill="#e29d58" />
      <rect x="17" y="4" width="4" height="16" rx="1" fill="#10BC83" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L12 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" fill="#e29d58" />
    </svg>
  )
}

function DashLine() {
  return (
    <svg width="42" height="1" viewBox="0 0 42 1" fill="none">
      <line x1="0" y1="0.5" x2="42" y2="0.5" stroke="#606060" strokeDasharray="4 3" />
    </svg>
  )
}

const GRID_COLS = 'grid-cols-[80px_160px_80px_1fr_120px_120px_100px]'

/* ─── Calendar Row ─── */

function CalendarRow({ event }: { event: EconomicEvent }) {
  const actualColorClass = event.actualColor === 'red' ? 'text-[#d46356]' : 'text-[#37c92e]'

  return (
    <div className={`grid ${GRID_COLS} items-center px-4 sm:px-6 lg:px-[60px] h-[62px] border-b border-white/[0.04]`}>
      <span className="text-white text-sm lg:text-xl font-acid">{event.time}</span>

      <div className="flex items-center gap-2 lg:gap-3">
        <span className="text-gfx-neutral-400 text-sm lg:text-xl">{event.flag}</span>
        <span className="text-white text-sm lg:text-xl font-acid">{event.country}</span>
        <ImpactIcon />
      </div>

      <div className="flex items-center">
        <FolderIcon />
      </div>

      <span className="text-white text-sm lg:text-xl font-acid truncate">{event.event}</span>

      <span className={`text-sm lg:text-xl font-acid ${actualColorClass}`}>
        {event.actual ?? ''}
      </span>

      <div className="flex items-center">
        {event.forecast ? (
          <span className="text-gfx-neutral-300 text-sm lg:text-xl font-acid">{event.forecast}</span>
        ) : (
          <DashLine />
        )}
      </div>

      <span className="text-gfx-neutral-300 text-sm lg:text-xl font-acid">
        {event.prior ?? ''}
      </span>
    </div>
  )
}

/* ─── Date Header ─── */

function DateHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 px-4 sm:px-6 lg:px-[60px] h-[56px] lg:h-[68px] bg-[#09241c]">
      <GreenDot size={10} />
      <span className="text-white text-sm lg:text-xl font-acid">{label}</span>
    </div>
  )
}

/* ─── Column Headers ─── */

function ColumnHeaders() {
  return (
    <div className={`grid ${GRID_COLS} items-center px-4 sm:px-6 lg:px-[60px] h-[48px] lg:h-[56px] border-b border-white/[0.04]`}>
      {['Time', 'Country', 'Impact', 'Event', 'Actual', 'Forecast', 'Prior'].map(col => (
        <span key={col} className="text-gfx-neutral-300 text-xs lg:text-xl font-acid">{col}</span>
      ))}
    </div>
  )
}

/* ─── Main Component ─── */

export default function EconomicCalendarView() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {economicCalendarDays.map((day, dayIdx) => (
            <div key={day.label}>
              <DateHeader label={day.label} />

              {dayIdx === 0 && <ColumnHeaders />}

              {day.events.map(event => (
                <CalendarRow key={event.id} event={event} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
