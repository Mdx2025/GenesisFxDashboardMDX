export interface EconomicEvent {
  id: number
  time: string
  flag: string
  country: string
  impact: 'high' | 'medium' | 'low'
  event: string
  actual?: string
  actualColor?: 'green' | 'red'
  forecast?: string
  prior?: string
}

export interface CalendarDay {
  label: string
  events: EconomicEvent[]
}

export const economicCalendarDays: CalendarDay[] = [
  {
    label: 'Today, April 28',
    events: [
      { id: 1, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: '0.1%', actualColor: 'green', prior: '0.2%' },
      { id: 2, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: '$18.8T', actualColor: 'green', prior: '0.2%' },
    ],
  },
  {
    label: 'Tomorrow, April 28',
    events: [
      { id: 3, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: '0.1%', actualColor: 'green', prior: '0.2%' },
      { id: 4, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: '0.1%', actualColor: 'green' },
      { id: 5, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: 'Coming soon', actualColor: 'red', prior: '0.2%' },
    ],
  },
]
