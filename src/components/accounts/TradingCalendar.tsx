import { useState } from 'react'
import { GlassCard } from '@/components/ui'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface DayTrade {
  day: number
  profit?: number
  trades?: number
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
  '2026-3-4': { profit: -8.25, trades: 2 },
  '2026-3-7': { profit: 15.00, trades: 4 },
  '2026-3-8': { profit: 4.50, trades: 1 },
  '2026-3-9': { profit: -16.00, trades: 3 },
  '2026-3-10': { profit: 22.00, trades: 5 },
  '2026-3-14': { profit: -12.75, trades: 2 },
  '2026-3-15': { profit: -16.00, trades: 3 },
  '2026-3-16': { profit: 8.00, trades: 2 },
  '2026-3-21': { profit: 12.50, trades: 3 },
  '2026-3-22': { profit: -5.50, trades: 1 },
  '2026-3-24': { profit: 12.50, trades: 3 },
  '2026-3-29': { profit: 12.50, trades: 3 },
}

function InfoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#A0A0A0" strokeWidth="1.5"/>
      <path d="M12 16v-4M12 8h.01" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="10" height="19" viewBox="0 0 10 19" fill="none">
      <path d="M9 1L1 9.5L9 18" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="10" height="19" viewBox="0 0 10 19" fill="none">
      <path d="M1 1L9 9.5L1 18" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function getWeeklyTotal(year: number, month: number, weekDays: (number | null)[]): number {
  let total = 0
  for (const day of weekDays) {
    if (day === null) continue
    const key = `${year}-${month}-${day}`
    const trade = MOCK_TRADES[key]
    if (trade) total += trade.profit
  }
  return total
}

export function TradingCalendar() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(3)

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const weeks: (DayTrade | null)[][] = []
  let currentWeek: (DayTrade | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null)
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
    while (currentWeek.length < 7) {
      currentWeek.push(null)
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
          <div className="flex items-center gap-3">
            <button onClick={prevMonth} className="text-gfx-neutral-300 hover:text-white transition-colors cursor-pointer p-1" aria-label="Previous month">
              <ChevronLeft />
            </button>
            <h2 className="text-white text-[1.5rem] font-normal">{MONTH_NAMES[month]} {year}</h2>
            <button onClick={nextMonth} className="text-gfx-neutral-300 hover:text-white transition-colors cursor-pointer p-1" aria-label="Next month">
              <ChevronRight />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2.5 rounded-lg border border-white/10 text-gfx-neutral-300 text-[0.875rem]">
              This month
            </div>
            <span className="text-gfx-neutral-300 text-[0.875rem]">Monthly stats:</span>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-[#0C1311] border border-white/10">
                <span className={`text-[0.75rem] ${monthTotal >= 0 ? 'text-gfx-green-500' : 'text-gfx-red'}`}>
                  {monthTotal >= 0 ? '+' : ''}${Math.abs(monthTotal).toFixed(2)}
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#0C1311] border border-white/10">
                <span className="text-[0.75rem] text-white">{tradingDays} days</span>
              </div>
            </div>
            <InfoIcon />
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                {DAYS_OF_WEEK.map(day => (
                  <th key={day} className="text-gfx-neutral-300 text-[0.875rem] font-medium pb-3 text-left pl-3 w-[12%]">{day}</th>
                ))}
                <th className="text-gfx-neutral-300 text-[0.875rem] font-medium pb-3 text-left pl-3 w-[16%]">Week Total</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIdx) => {
                const weekDayNums = week.map(d => d?.day ?? null)
                const weekTotal = getWeeklyTotal(year, month, weekDayNums)
                const hasWeekTrades = week.some(d => d?.profit !== undefined)

                return (
                  <tr key={weekIdx}>
                    {week.map((dayData, dayIdx) => {
                      if (!dayData) {
                        return <td key={dayIdx} className="p-1"><div className="h-[6.8rem] rounded-[1.2rem]" /></td>
                      }

                      const isProfitable = dayData.profit !== undefined && dayData.profit > 0
                      const isLoss = dayData.profit !== undefined && dayData.profit < 0
                      const hasTradeData = dayData.profit !== undefined

                      let cellBg = ''
                      if (isLoss) cellBg = 'bg-[#2A1411]'
                      else if (isProfitable) cellBg = 'bg-[#0C1311]'
                      else cellBg = 'bg-[#09241C]'

                      return (
                        <td key={dayIdx} className="p-1">
                          <div className={`${cellBg} rounded-[1.2rem] h-[6.8rem] px-3 py-3 flex flex-col justify-between`}>
                            <span className="text-gfx-neutral-300 text-[0.875rem]">{dayData.day}</span>
                            {hasTradeData && (
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className={`text-[0.6875rem] font-bold ${isProfitable ? 'text-gfx-green-500' : 'text-gfx-red'}`}>
                                    {isProfitable ? '▲' : '▲'}
                                  </span>
                                  <span className={`text-[0.875rem] ${isProfitable ? 'text-gfx-green-500' : 'text-gfx-red'}`}>
                                    {dayData.profit! >= 0 ? '+' : ''}{dayData.profit! >= 0 ? `$${dayData.profit!.toFixed(2)}` : `-$${Math.abs(dayData.profit!).toFixed(2)}`}
                                  </span>
                                </div>
                                <span className="text-gfx-neutral-300 text-[0.875rem]"> ({dayData.trades} trades)</span>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                    {/* Week Total cell */}
                    <td className="p-1">
                      <div className={`${hasWeekTrades ? 'bg-[#0C1311]' : 'bg-[#09241C]'} rounded-[1.2rem] h-[6.8rem] px-3 py-3 flex flex-col justify-between`}>
                        <span className="text-gfx-neutral-300 text-[0.875rem]">Week {weekIdx + 1}</span>
                        {hasWeekTrades && (
                          <div>
                            <div className="flex items-center gap-1">
                              <span className={`text-[0.6875rem] font-bold ${weekTotal >= 0 ? 'text-gfx-green-500' : 'text-gfx-red'}`}>
                                {weekTotal >= 0 ? '▲' : '▲'}
                              </span>
                              <span className={`text-[0.875rem] ${weekTotal >= 0 ? 'text-gfx-green-500' : 'text-gfx-red'}`}>
                                {weekTotal >= 0 ? '+' : ''}${Math.abs(weekTotal).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-[#0C1311]" />
            <span className="text-gfx-neutral-300 text-[0.875rem]">Profitable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-[#2A1411]" />
            <span className="text-gfx-neutral-300 text-[0.875rem]">Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-[#09241C]" />
            <span className="text-gfx-neutral-300 text-[0.875rem]">No Trade</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
