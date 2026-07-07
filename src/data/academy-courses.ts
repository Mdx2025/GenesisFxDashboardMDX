export interface Course {
  id: string
  title: string
  description: string
  lessons: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  image: string
}

export const COURSES: Course[] = [
  {
    id: 'crypto-trading',
    title: 'Crypto Trading',
    description: 'In this course, you will learn all the basics to start trading in the world of cryptocurrencies',
    lessons: 22,
    duration: '00:19:09',
    level: 'Beginner',
    image: '/images/course-crypto.png',
  },
  {
    id: 'forex-trading',
    title: 'Forex Trading',
    description: 'From calculating pips and leverage to managing positions — all that traders need to know about Forex trading.',
    lessons: 22,
    duration: '00:19:09',
    level: 'Beginner',
    image: '/images/course-forex.png',
  },
  {
    id: 'stocks',
    title: 'Stocks',
    description: 'Learn the essentials of stock trading — from points and leverage to trading hours and risk management.',
    lessons: 12,
    duration: '00:15:29',
    level: 'Beginner',
    image: '/images/course-stocks.png',
  },
  {
    id: 'technical-analysis',
    title: 'Technical Analysis',
    description: 'Master chart patterns, indicators, and price action strategies to make informed trading decisions.',
    lessons: 18,
    duration: '00:22:45',
    level: 'Intermediate',
    image: '/images/course-crypto.png',
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'Learn how to protect your capital with proper position sizing, stop losses, and portfolio diversification.',
    lessons: 15,
    duration: '00:16:30',
    level: 'Beginner',
    image: '/images/course-forex.png',
  },
  {
    id: 'commodities',
    title: 'Commodities',
    description: 'Explore gold, oil, and agricultural commodities trading — from fundamentals to execution strategies.',
    lessons: 14,
    duration: '00:18:12',
    level: 'Intermediate',
    image: '/images/course-stocks.png',
  },
  {
    id: 'trading-psychology',
    title: 'Trading Psychology',
    description: 'Understand the mental game of trading — discipline, emotions, and building a winning mindset.',
    lessons: 10,
    duration: '00:12:50',
    level: 'Beginner',
    image: '/images/course-crypto.png',
  },
  {
    id: 'fundamental-analysis',
    title: 'Fundamental Analysis',
    description: 'Learn to evaluate assets using economic data, earnings reports, and macroeconomic indicators.',
    lessons: 16,
    duration: '00:20:15',
    level: 'Intermediate',
    image: '/images/course-forex.png',
  },
  {
    id: 'indices',
    title: 'Indices',
    description: 'Trade the world\'s major stock indices — S&P 500, NASDAQ, DAX and more with confidence.',
    lessons: 11,
    duration: '00:14:20',
    level: 'Beginner',
    image: '/images/course-stocks.png',
  },
  {
    id: 'algo-trading',
    title: 'Algo Trading',
    description: 'Introduction to automated trading systems, backtesting, and building your first trading bot.',
    lessons: 20,
    duration: '00:25:00',
    level: 'Advanced',
    image: '/images/course-crypto.png',
  },
  {
    id: 'options-trading',
    title: 'Options Trading',
    description: 'Understand calls, puts, spreads, and advanced options strategies for hedging and speculation.',
    lessons: 19,
    duration: '00:23:40',
    level: 'Advanced',
    image: '/images/course-forex.png',
  },
  {
    id: 'portfolio-management',
    title: 'Portfolio Management',
    description: 'Build and manage a diversified portfolio with proper asset allocation and rebalancing techniques.',
    lessons: 13,
    duration: '00:17:55',
    level: 'Intermediate',
    image: '/images/course-stocks.png',
  },
]

export const ACADEMY_TABS = [
  { id: 'video-courses', label: 'Video Courses' },
  { id: 'ebooks', label: 'E Books' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'calculators', label: 'Calculators' },
] as const
