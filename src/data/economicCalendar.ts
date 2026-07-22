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
  description?: string
  source?: string
  sourceUrl?: string
  dateLabel?: string
  timeUtc?: string
  impactLabel?: string
}

export interface CalendarDay {
  label: string
  events: EconomicEvent[]
}

export const economicCalendarDays: CalendarDay[] = [
  {
    label: 'Today, April 28',
    events: [
      { id: 1, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: '0.1%', actualColor: 'green', prior: '0.2%', description: 'Business inventories measure the monthly percentage change in inventories held by manufacturers, wholesalers, and retailers.', source: 'U.S. Census Bureau', sourceUrl: '#', dateLabel: 'Mon, Apr 28', timeUtc: '14:00 UTC', impactLabel: 'Medium' },
      { id: 2, time: '10:00', flag: '🇸🇻', country: 'SV', impact: 'low', event: 'PPI YoY', actual: '3.18%', actualColor: 'green', prior: '2.78%', description: 'Producer prices change refers to year over year change in price of goods and services sold by manufacturers and producers in the wholesale market during a given period.', source: 'Central Reserve Bank of El Salvador', sourceUrl: '#', dateLabel: 'Fri, Jul 10', timeUtc: '17:35 UTC', impactLabel: 'Low' },
    ],
  },
  {
    label: 'Tomorrow, April 28',
    events: [
      { id: 3, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: '0.1%', actualColor: 'green', prior: '0.2%', description: 'Business inventories measure the monthly percentage change in inventories held by manufacturers, wholesalers, and retailers.', source: 'U.S. Census Bureau', sourceUrl: '#', dateLabel: 'Tue, Apr 29', timeUtc: '14:00 UTC', impactLabel: 'Medium' },
      { id: 4, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: '0.1%', actualColor: 'green', description: 'Business inventories measure the monthly percentage change in inventories held by manufacturers, wholesalers, and retailers.', source: 'U.S. Census Bureau', sourceUrl: '#', dateLabel: 'Tue, Apr 29', timeUtc: '14:00 UTC', impactLabel: 'Medium' },
      { id: 5, time: '10:00', flag: '🇺🇸', country: 'US', impact: 'medium', event: 'Business Inventories MoM', actual: 'Coming soon', actualColor: 'red', prior: '0.2%', description: 'Business inventories measure the monthly percentage change in inventories held by manufacturers, wholesalers, and retailers.', source: 'U.S. Census Bureau', sourceUrl: '#', dateLabel: 'Tue, Apr 29', timeUtc: '14:00 UTC', impactLabel: 'Medium' },
    ],
  },
]
