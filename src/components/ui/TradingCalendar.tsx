import { useState } from 'react'
import { GlassCard } from './GlassCard'
import { GlowEllipse } from './GlowEllipse'
import { SparkleButton } from './SparkleButton'

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
  showShareButton?: boolean
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

export function TradingCalendar({ trades, initialYear, initialMonth, onMonthChange, className, showShareButton = false }: TradingCalendarProps) {
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

  const shareCalendar = async () => {
    const shareData = {
      title: `${MONTH_NAMES[month]} ${year} trading calendar`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }

      await navigator.clipboard?.writeText(shareData.url)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      throw error
    }
  }

  return (
    <GlassCard variant="light" divider="white" rounded="19px" className={`overflow-hidden ${className ?? ''}`}>
      <GlowEllipse className="left-1/2 -translate-x-1/2 top-[-30px]" />
      <div className="glow-ellipse absolute -left-[72px] top-[60%] w-[493px] h-[278px] rounded-full pointer-events-none bg-gfx-green-200 [filter:url(#blur-157)] will-change-transform opacity-40" aria-hidden="true" />

      <div className="relative z-10 p-5 xl:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-4">
            <button onClick={prevMonth} className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Previous month">
              <ChevronLeftIcon />
            </button>
            <h2 className="text-gfx-neutral-600 text-2xl font-normal">{MONTH_NAMES[month]} {year}</h2>
            <button onClick={nextMonth} className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Next month">
              <ChevronRightIcon />
            </button>
            <div className="px-3.5 py-2.5 rounded-md border border-gfx-neutral-500 text-gfx-neutral-500 text-sm font-medium">
              This month
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white text-lg font-medium">Monthly stats:</span>
            <div className="flex items-center gap-2">
              <div className="px-5 py-1 rounded-full bg-gfx-green-800 border border-gfx-green-200">
                <span className="text-sm text-gfx-green-300">
                  +$0.00
                </span>
              </div>
              <div className="px-5 py-1 rounded-full bg-gfx-green-800 border border-gfx-green-200">
                <span className="text-sm text-gfx-neutral-600">0 days</span>
              </div>
              {showShareButton && (
                <SparkleButton className="!w-12 !min-w-12 !p-0" onClick={() => void shareCalendar()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.3523 4C10.3523 2.61929 11.4766 1.5 12.8636 1.5C14.2506 1.5 15.375 2.61929 15.375 4C15.375 5.38071 14.2506 6.5 12.8636 6.5C12.1633 6.5 11.5303 6.21447 11.0753 5.7551L7.59875 8.12216C7.63089 8.28186 7.64773 8.44684 7.64773 8.61539C7.64773 8.94916 7.58178 9.26818 7.46219 9.55977L11.2743 12.0644C11.7069 11.712 12.2605 11.5 12.8636 11.5C14.2506 11.5 15.375 12.6193 15.375 14C15.375 15.3807 14.2506 16.5 12.8636 16.5C11.4766 16.5 10.3523 15.3807 10.3523 14C10.3523 13.6384 10.4297 13.2941 10.5688 12.9834L6.78755 10.499C6.34647 10.8824 5.7687 11.1154 5.13636 11.1154C3.74938 11.1154 2.625 9.9961 2.625 8.61539C2.625 7.23467 3.74938 6.11539 5.13636 6.11539C5.93393 6.11539 6.64389 6.48544 7.10359 7.06138L10.4729 4.76732C10.3946 4.5252 10.3523 4.2672 10.3523 4Z" fill="#C6C6C6"/>
                  </svg>
                  <span className="sr-only">Share trading calendar</span>
                </SparkleButton>
              )}
            </div>
            <InfoIcon />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                {DAYS_OF_WEEK.map(day => (
                  <th key={day} className="text-gfx-neutral-500 text-base font-medium pb-3 text-center" style={{ width: '12.5%' }}>{day}</th>
                ))}
                <th className="text-gfx-neutral-500 text-base font-medium pb-3 text-center" style={{ width: '12.5%' }}>Week Total</th>
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
                        return <td key={dayIdx} className="p-1"><div className="h-[109px] rounded-lg" /></td>
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
                        <td key={dayIdx} className="p-1">
                          <div className={`${cellBg} rounded-lg h-[109px] px-3 py-3 relative flex items-center justify-center border ${cellBorder}`}>
                            <span className="absolute top-3 right-3 text-gfx-neutral-500 text-sm">{dayData.day}</span>
                            {hasTradeData && (
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <span className={`text-xs font-bold ${isProfitable ? 'text-gfx-green-300' : 'text-gfx-red-muted'}`}>
                                    {isProfitable ? '▲' : '▼'}
                                  </span>
                                  <span className={`text-sm ${isProfitable ? 'text-gfx-green-300' : 'text-gfx-red-muted'}`}>
                                    {dayData.profit! >= 0 ? '+' : ''}{dayData.profit! >= 0 ? `$${dayData.profit!.toFixed(2)}` : `-$${Math.abs(dayData.profit!).toFixed(2)}`}
                                  </span>
                                </div>
                                <span className="text-gfx-neutral-500 text-sm">({dayData.trades} trades)</span>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                    <td className="p-1">
                      <div className="bg-gfx-green-800 rounded-lg h-[109px] px-3 py-3 flex flex-col items-center justify-center border border-gfx-neutral-200">
                        <span className="text-gfx-neutral-600 text-sm">Week {weekIdx + 1}</span>
                        <span className="text-gfx-neutral-500 text-sm">
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
            <span className="text-gfx-neutral-500 text-base font-medium">Profitable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gfx-red-surface border border-gfx-red-muted" />
            <span className="text-gfx-neutral-500 text-base font-medium">Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gfx-green-800 border border-gfx-neutral-200" />
            <span className="text-gfx-neutral-500 text-base font-medium">No Trade</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
