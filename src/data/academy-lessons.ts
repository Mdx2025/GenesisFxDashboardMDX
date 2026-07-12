export interface Lesson {
  id: number
  title: string
  duration: string
}

export interface CourseDetail {
  id: string
  title: string
  lessons: Lesson[]
}

const FOREX_LESSONS: Lesson[] = [
  { id: 1, title: 'Intro', duration: '00:00:36' },
  { id: 2, title: 'Online Trading', duration: '00:00:36' },
  { id: 3, title: 'Advantages', duration: '00:00:36' },
  { id: 4, title: 'Pairs', duration: '00:00:36' },
  { id: 5, title: 'Ask Bid', duration: '00:00:36' },
  { id: 6, title: 'Pips', duration: '00:00:36' },
]

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  'crypto-trading': {
    id: 'crypto-trading',
    title: 'Crypto Trading',
    lessons: FOREX_LESSONS,
  },
  'forex-trading': {
    id: 'forex-trading',
    title: 'Forex Trading',
    lessons: FOREX_LESSONS,
  },
  'stocks': {
    id: 'stocks',
    title: 'Stocks',
    lessons: FOREX_LESSONS,
  },
  'technical-analysis': {
    id: 'technical-analysis',
    title: 'Technical Analysis',
    lessons: FOREX_LESSONS,
  },
  'risk-management': {
    id: 'risk-management',
    title: 'Risk Management',
    lessons: FOREX_LESSONS,
  },
  'commodities': {
    id: 'commodities',
    title: 'Commodities',
    lessons: FOREX_LESSONS,
  },
  'trading-psychology': {
    id: 'trading-psychology',
    title: 'Trading Psychology',
    lessons: FOREX_LESSONS,
  },
  'fundamental-analysis': {
    id: 'fundamental-analysis',
    title: 'Fundamental Analysis',
    lessons: FOREX_LESSONS,
  },
  'indices': {
    id: 'indices',
    title: 'Indices',
    lessons: FOREX_LESSONS,
  },
  'algo-trading': {
    id: 'algo-trading',
    title: 'Algo Trading',
    lessons: FOREX_LESSONS,
  },
  'options-trading': {
    id: 'options-trading',
    title: 'Options Trading',
    lessons: FOREX_LESSONS,
  },
  'portfolio-management': {
    id: 'portfolio-management',
    title: 'Portfolio Management',
    lessons: FOREX_LESSONS,
  },
}
