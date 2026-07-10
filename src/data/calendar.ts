import type { TradingCalendarTrade } from '@/components/ui/TradingCalendar'

export interface CalendarStat {
  label: string
  type: 'asset' | 'number' | 'donut'
  value: string
  donutValue?: number
  donutColor?: string
}

export const calendarStats: CalendarStat[] = [
  { label: 'Most Traded Asset', type: 'asset', value: 'XAAUSD' },
  { label: 'Total Trades', type: 'number', value: '120' },
  { label: 'Win rate', type: 'donut', value: '39.2%', donutValue: 39.2, donutColor: '#10BC83' },
  { label: 'Profit Factor', type: 'donut', value: '1.69', donutValue: 56.3, donutColor: '#10BC83' },
]

export const calendarTrades: Record<string, TradingCalendarTrade> = {
  '2026-3-1': { profit: 12.50, trades: 3 },
  '2026-3-4': { profit: -8.00, trades: 3 },
  '2026-3-8': { profit: -16.00, trades: 3 },
  '2026-3-15': { profit: -16.00, trades: 3 },
  '2026-3-22': { profit: -16.00, trades: 3 },
  '2026-3-24': { profit: 12.50, trades: 3 },
  '2026-3-29': { profit: 12.50, trades: 3 },
}
