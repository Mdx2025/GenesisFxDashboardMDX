export interface EBook {
  id: string
  category: 'Crypto' | 'Forex' | 'Stocks'
  image: string
  readTime: string
}

export const EBOOKS: EBook[] = [
  { id: 'crypto-1', category: 'Crypto', image: '/images/course-crypto.png', readTime: '23 min' },
  { id: 'forex-1', category: 'Forex', image: '/images/course-forex.png', readTime: '23 min' },
  { id: 'stocks-1', category: 'Stocks', image: '/images/course-stocks.png', readTime: '23 min' },
  { id: 'crypto-2', category: 'Crypto', image: '/images/course-crypto.png', readTime: '23 min' },
  { id: 'forex-2', category: 'Forex', image: '/images/course-forex.png', readTime: '23 min' },
  { id: 'stocks-2', category: 'Stocks', image: '/images/course-stocks.png', readTime: '23 min' },
  { id: 'crypto-3', category: 'Crypto', image: '/images/course-crypto.png', readTime: '23 min' },
  { id: 'forex-3', category: 'Forex', image: '/images/course-forex.png', readTime: '23 min' },
  { id: 'stocks-3', category: 'Stocks', image: '/images/course-stocks.png', readTime: '23 min' },
  { id: 'crypto-4', category: 'Crypto', image: '/images/course-crypto.png', readTime: '23 min' },
  { id: 'forex-4', category: 'Forex', image: '/images/course-forex.png', readTime: '23 min' },
  { id: 'stocks-4', category: 'Stocks', image: '/images/course-stocks.png', readTime: '23 min' },
]
