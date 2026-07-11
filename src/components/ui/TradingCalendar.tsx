import { useState } from 'react'
import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export interface TradingCalendarTrade {
  profit: number
  trades: number
}

export interface TradingCalendarProps {
  trades: Record<string, TradingCalendarTrade>
  initialYear?: number
  initialMonth?: number
  onMonthChange?: (year: number, month: number) => void
  className?: string
}

interface DayTrade {
  day: number
  profit?: number
  trades?: number
  overflow?: boolean
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function InfoIcon() {
  return (
    <svg className="text-gfx-neutral-400" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="10" height="19" viewBox="0 0 10 19" fill="none">
      <path d="M9 1L1 9.5L9 18" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="10" height="19" viewBox="0 0 10 19" fill="none">
      <path d="M1 1L9 9.5L1 18" stroke="currentColor" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function getWeeklyTotal(trades: Record<string, TradingCalendarTrade>, year: number, month: number, weekDays: (DayTrade | null)[]): number {
  let total = 0
  for (const d of weekDays) {
    if (!d || d.overflow) continue
    const trade = trades[`${year}-${month}-${d.day}`]
    if (trade) total += trade.profit
  }
  return total
}

function hasWeekTrades(trades: Record<string, TradingCalendarTrade>, year: number, month: number, weekDays: (DayTrade | null)[]): boolean {
  return weekDays.some(d => {
    if (!d || d.overflow) return false
    return trades[`${year}-${month}-${d.day}`] !== undefined
  })
}

export function TradingCalendar({ trades, initialYear, initialMonth, onMonthChange, className }: TradingCalendarProps) {
  const [year, setYear] = useState(initialYear ?? new Date().getFullYear())
  const [month, setMonth] = useState(initialMonth ?? new Date().getMonth())

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const weeks: (DayTrade | null)[][] = []
  let currentWeek: (DayTrade | null)[] = []

  const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1)
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ day: prevMonthDays - firstDay + 1 + i, overflow: true })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${year}-${month}-${day}`
    const trade = trades[key]
    currentWeek.push({
      day,
      profit: trade?.profit,
      trades: trade?.trades,
    })

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  if (currentWeek.length > 0) {
    let nextDay = 1
    while (currentWeek.length < 7) {
      currentWeek.push({ day: nextDay++, overflow: true })
    }
    weeks.push(currentWeek)
  }

  const prevMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1
    const newYear = month === 0 ? year - 1 : year
    setMonth(newMonth)
    if (month === 0) setYear(y => y - 1)
    onMonthChange?.(newYear, newMonth)
  }

  const nextMonth = () => {
    const newMonth = month === 11 ? 0 : month + 1
    const newYear = month === 11 ? year + 1 : year
    setMonth(newMonth)
    if (month === 11) setYear(y => y + 1)
    onMonthChange?.(newYear, newMonth)
  }

  const monthTotal = Object.entries(trades)
    .filter(([k]) => k.startsWith(`${year}-${month}-`))
    .reduce((sum, [, v]) => sum + v.profit, 0)

  const tradingDays = Object.keys(trades).filter(k => k.startsWith(`${year}-${month}-`)).length

  return (
    <GlassCard variant="light" divider="white" rounded="19px" className={`overflow-hidden ${className ?? ''}`}>
      <GlowEllipse className="left-1/2 -translate-x-1/2 top-[-30px]" />
      <div className="absolute -left-[72px] top-[60%] w-[493px] h-[278px] rounded-full pointer-events-none bg-gfx-green-200 [filter:url(#blur-157)] will-change-transform opacity-40" aria-hidden="true" />

      <div className="relative z-10 p-5 xl:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-4">
            <button onClick={prevMonth} className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Previous month">
              <ChevronLeftIcon />
            </button>
            <h2 className="text-gfx-neutral-600 text-[1.5rem] font-normal">{MONTH_NAMES[month]} {year}</h2>
            <button onClick={nextMonth} className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Next month">
              <ChevronRightIcon />
            </button>
            <div className="px-3.5 py-2.5 rounded-lg border border-gfx-neutral-500 text-gfx-neutral-500 text-[0.875rem] font-medium">
              This month
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white text-[1.125rem] font-medium">Monthly stats:</span>
            <div className="flex items-center gap-2">
              <div className="px-5 py-1 rounded-full bg-gfx-green-800 border border-gfx-green-200">
                <span className="text-[0.875rem]" style={{ color: '#00B38C' }}>
                  +$0.00
                </span>
              </div>
              <div className="px-5 py-1 rounded-full bg-gfx-green-800 border border-gfx-green-200">
                <span className="text-[0.875rem] text-gfx-neutral-600">0 days</span>
              </div>
            </div>
            <InfoIcon />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                {DAYS_OF_WEEK.map(day => (
                  <th key={day} className="text-gfx-neutral-500 text-[0.96rem] font-medium pb-3 text-center" style={{ width: '12.5%' }}>{day}</th>
                ))}
                <th className="text-gfx-neutral-500 text-[0.96rem] font-medium pb-3 text-center" style={{ width: '12.5%' }}>Week Total</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIdx) => {
                const weekTotal = getWeeklyTotal(trades, year, month, week)
                const weekHasTrades = hasWeekTrades(trades, year, month, week)

                return (
                  <tr key={weekIdx}>
                    {week.map((dayData, dayIdx) => {
                      if (!dayData) {
                        return <td key={dayIdx} className="p-[5px]"><div className="h-[109px] rounded-[19px]" /></td>
                      }

                      const isOverflow = dayData.overflow
                      const hasTradeData = !isOverflow && dayData.profit !== undefined
                      const isProfitable = hasTradeData && dayData.profit! > 0
                      const isLoss = hasTradeData && dayData.profit! < 0

                      let cellBg = ''
                      let cellBorder = 'border-gfx-green-200'

                      if (isOverflow) {
                        cellBg = 'bg-gfx-green-900'
                        cellBorder = 'border-gfx-green-200'
                      } else if (isLoss) {
                        cellBg = 'bg-gfx-red-surface'
                        cellBorder = 'border-gfx-red-muted'
                      } else if (isProfitable) {
                        cellBg = 'bg-gfx-green-800'
                        cellBorder = 'border-gfx-green-300'
                      }

                      return (
                        <td key={dayIdx} className="p-[5px]">
                          <div className={`${cellBg} rounded-[19px] h-[109px] px-3 py-3 relative flex items-center justify-center border ${cellBorder}`}>
                            <span className="absolute top-3 right-3 text-gfx-neutral-500 text-[0.875rem]">{dayData.day}</span>
                            {hasTradeData && (
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <span className={`text-[0.6875rem] font-bold ${isProfitable ? 'text-gfx-green-300' : 'text-gfx-red-muted'}`}>
                                    {isProfitable ? '▲' : '▼'}
                                  </span>
                                  <span className={`text-[0.875rem] ${isProfitable ? 'text-gfx-green-300' : 'text-gfx-red-muted'}`}>
                                    {dayData.profit! >= 0 ? '+' : ''}{dayData.profit! >= 0 ? `$${dayData.profit!.toFixed(2)}` : `-$${Math.abs(dayData.profit!).toFixed(2)}`}
                                  </span>
                                </div>
                                <span className="text-gfx-neutral-500 text-[0.875rem]">({dayData.trades} trades)</span>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                    <td className="p-[5px]">
                      <div className="bg-gfx-green-800 rounded-[19px] h-[109px] px-3 py-3 flex flex-col items-center justify-center border border-gfx-neutral-200">
                        <span className="text-gfx-neutral-600 text-[0.875rem]">Week {weekIdx + 1}</span>
                        <span className="text-gfx-neutral-500 text-[0.875rem]">
                          {weekHasTrades ? `${weekTotal >= 0 ? '+' : ''}$${Math.abs(weekTotal).toFixed(2)}` : ''}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-10 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gfx-green-800 border border-gfx-green-300" />
            <span className="text-gfx-neutral-500 text-[1rem] font-medium">Profitable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gfx-red-surface border border-gfx-red-muted" />
            <span className="text-gfx-neutral-500 text-[1rem] font-medium">Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gfx-green-800 border border-gfx-neutral-200" />
            <span className="text-gfx-neutral-500 text-[1rem] font-medium">No Trade</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
