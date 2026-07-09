import { useState } from 'react'
import { GlassCard } from '@/components/ui'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface DayTrade {
  day: number
  profit?: number
  trades?: number
  overflow?: boolean
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const MOCK_TRADES: Record<string, { profit: number; trades: number }> = {
  '2026-3-1': { profit: 12.50, trades: 3 },
  '2026-3-4': { profit: -8.00, trades: 3 },
  '2026-3-8': { profit: -16.00, trades: 3 },
  '2026-3-15': { profit: -16.00, trades: 3 },
  '2026-3-22': { profit: -16.00, trades: 3 },
  '2026-3-24': { profit: 12.50, trades: 3 },
  '2026-3-29': { profit: 12.50, trades: 3 },
}

function InfoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#808080" strokeWidth="2"/>
      <path d="M12 16v-4M12 8h.01" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="10" height="19" viewBox="0 0 10 19" fill="none">
      <path d="M9 1L1 9.5L9 18" stroke="#808080" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="10" height="19" viewBox="0 0 10 19" fill="none">
      <path d="M1 1L9 9.5L1 18" stroke="#808080" strokeWidth="2.38" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function getWeeklyTotal(year: number, month: number, weekDays: (DayTrade | null)[]): number {
  let total = 0
  for (const d of weekDays) {
    if (!d || d.overflow) continue
    const key = `${year}-${month}-${d.day}`
    const trade = MOCK_TRADES[key]
    if (trade) total += trade.profit
  }
  return total
}

function hasWeekTrades(year: number, month: number, weekDays: (DayTrade | null)[]): boolean {
  return weekDays.some(d => {
    if (!d || d.overflow) return false
    return MOCK_TRADES[`${year}-${month}-${d.day}`] !== undefined
  })
}

export function TradingCalendar() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(3)

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
    const trade = MOCK_TRADES[key]
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
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const monthTotal = Object.entries(MOCK_TRADES)
    .filter(([k]) => k.startsWith(`${year}-${month}-`))
    .reduce((sum, [, v]) => sum + v.profit, 0)

  const tradingDays = Object.keys(MOCK_TRADES).filter(k => k.startsWith(`${year}-${month}-`)).length

  return (
    <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden">
      <div className="absolute -left-[72px] top-[60%] w-[493px] h-[278px] rounded-full pointer-events-none bg-[#064B34] [filter:url(#blur-157)] will-change-transform opacity-40" aria-hidden="true" />

      <div className="relative z-10 p-5 xl:p-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-4">
            <button onClick={prevMonth} className="text-[#808080] hover:text-white transition-colors cursor-pointer p-1" aria-label="Previous month">
              <ChevronLeft />
            </button>
            <h2 className="text-[#ECECEC] text-[1.5rem] font-normal">{MONTH_NAMES[month]} {year}</h2>
            <button onClick={nextMonth} className="text-[#808080] hover:text-white transition-colors cursor-pointer p-1" aria-label="Next month">
              <ChevronRight />
            </button>
            <div className="px-3.5 py-2.5 rounded-lg border border-[#A0A0A0] text-[#A0A0A0] text-[0.875rem] font-medium">
              This month
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white text-[1.125rem] font-medium">Monthly stats:</span>
            <div className="flex items-center gap-2">
              <div className="px-5 py-2 rounded-full bg-[#0C1311] border border-[#064B34]">
                <span className={`text-[0.875rem] ${monthTotal >= 0 ? 'text-[#00B38C]' : 'text-[#D46356]'}`}>
                  {monthTotal >= 0 ? '+' : ''}${Math.abs(monthTotal).toFixed(2)}
                </span>
              </div>
              <div className="px-5 py-2 rounded-full bg-[#0C1311] border border-[#064B34]">
                <span className="text-[0.875rem] text-[#ECECEC]">{tradingDays} days</span>
              </div>
            </div>
            <button className="w-12 h-12 rounded-full bg-[#0C1311] border border-[#064B34] flex items-center justify-center cursor-pointer hover:border-[#00B38C] transition-colors" aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="18" cy="5" r="3" stroke="white" strokeWidth="2"/>
                <circle cx="6" cy="12" r="3" stroke="white" strokeWidth="2"/>
                <circle cx="18" cy="19" r="3" stroke="white" strokeWidth="2"/>
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="white" strokeWidth="2"/>
              </svg>
            </button>
            <InfoIcon />
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                {DAYS_OF_WEEK.map(day => (
                  <th key={day} className="text-[#A0A0A0] text-[0.96rem] font-medium pb-3 text-center" style={{ width: '12.5%' }}>{day}</th>
                ))}
                <th className="text-[#A0A0A0] text-[0.96rem] font-medium pb-3 text-center" style={{ width: '12.5%' }}>Week Total</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIdx) => {
                const weekTotal = getWeeklyTotal(year, month, week)
                const weekHasTrades = hasWeekTrades(year, month, week)

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
                      let cellBorder = 'border-[#064B34]'

                      if (isOverflow) {
                        cellBg = 'bg-[#09241C]'
                        cellBorder = 'border-[#064B34]'
                      } else if (isLoss) {
                        cellBg = 'bg-[#2A1411]'
                        cellBorder = 'border-[#D46356]'
                      } else if (isProfitable) {
                        cellBg = 'bg-[#0C1311]'
                        cellBorder = 'border-[#00B38C]'
                      }

                      return (
                        <td key={dayIdx} className="p-[5px]">
                          <div className={`${cellBg} rounded-[19px] h-[109px] px-3 py-3 relative flex items-center justify-center border ${cellBorder}`}>
                            <span className={`absolute top-3 right-3 text-[#A0A0A0] text-[0.875rem]`}>{dayData.day}</span>
                            {hasTradeData && (
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <span className={`text-[0.6875rem] font-bold ${isProfitable ? 'text-[#00B38C]' : 'text-[#D46356]'}`}>
                                    {isProfitable ? '▲' : '▼'}
                                  </span>
                                  <span className={`text-[0.875rem] ${isProfitable ? 'text-[#00B38C]' : 'text-[#D46356]'}`}>
                                    {dayData.profit! >= 0 ? '+' : ''}{dayData.profit! >= 0 ? `$${dayData.profit!.toFixed(2)}` : `-$${Math.abs(dayData.profit!).toFixed(2)}`}
                                  </span>
                                </div>
                                <span className="text-[#A0A0A0] text-[0.875rem]">({dayData.trades} trades)</span>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                    {/* Week Total cell */}
                    <td className="p-[5px]">
                      <div className="bg-[#0C1311] rounded-[19px] h-[109px] px-3 py-3 flex flex-col items-center justify-center border border-[#2F2F2F]">
                        <span className="text-[#ECECEC] text-[0.875rem]">Week {weekIdx + 1}</span>
                        <span className="text-[#A0A0A0] text-[0.875rem]">
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

        {/* Legend */}
        <div className="flex items-center gap-10 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-[#0C1311] border border-[#00B38C]" />
            <span className="text-[#A0A0A0] text-[1rem] font-medium">Profitable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-[#2A1411] border border-[#D46356]" />
            <span className="text-[#A0A0A0] text-[1rem] font-medium">Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-[#0C1311] border border-[#2F2F2F]" />
            <span className="text-[#A0A0A0] text-[1rem] font-medium">No Trade</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
