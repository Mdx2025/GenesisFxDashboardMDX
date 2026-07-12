export interface EbookChapter {
  id: number
  title: string
}

export interface EbookDetail {
  id: string
  title: string
  category: 'Crypto' | 'Forex' | 'Stocks'
  readTime: string
  image: string
  chapters: EbookChapter[]
  sections: { title: string; body: string }[]
}

const CRYPTO_CHAPTERS: EbookChapter[] = [
  { id: 1, title: 'Introduction to Crypto' },
  { id: 2, title: 'A New Currency is Born' },
  { id: 3, title: 'Crypto is More Than Just Bitcoin' },
  { id: 4, title: 'A Brief History Lesson' },
  { id: 5, title: 'Why is Decentralisation important?' },
  { id: 6, title: 'What are the Risks?' },
]

const FOREX_CHAPTERS: EbookChapter[] = [
  { id: 1, title: 'Introduction to Forex' },
  { id: 2, title: 'What is the Forex Market?' },
  { id: 3, title: 'Currency Pairs Explained' },
  { id: 4, title: 'Understanding Leverage' },
  { id: 5, title: 'Technical vs Fundamental Analysis' },
  { id: 6, title: 'Risk Management Basics' },
]

const STOCKS_CHAPTERS: EbookChapter[] = [
  { id: 1, title: 'Introduction to Stocks' },
  { id: 2, title: 'How the Stock Market Works' },
  { id: 3, title: 'Types of Stocks' },
  { id: 4, title: 'Reading Financial Statements' },
  { id: 5, title: 'Building a Portfolio' },
  { id: 6, title: 'Common Trading Strategies' },
]

const CRYPTO_SECTIONS = [
  {
    title: 'Introduction to Crypto',
    body: 'This e-book was created with the aim of equipping traders with the fundamentals to start an exciting trading journey. With the help of this comprehensive and easy-to-follow e-book, you will soon be equipped with enough knowledge to start a fulfilling journey as a trader.',
  },
  {
    title: 'High-risk warning',
    body: 'Trading carries a high level of risk that may not be suitable for all investors. Leverage creates additional risk and loss exposure. Before you decide to trade, carefully consider your investment objectives, experience level, and risk tolerance.',
  },
]

const GENERIC_SECTIONS = [
  {
    title: 'Getting Started',
    body: 'This e-book was created with the aim of equipping traders with the fundamentals to start an exciting trading journey. With the help of this comprehensive and easy-to-follow e-book, you will soon be equipped with enough knowledge to start a fulfilling journey as a trader.',
  },
  {
    title: 'High-risk warning',
    body: 'Trading carries a high level of risk that may not be suitable for all investors. Leverage creates additional risk and loss exposure. Before you decide to trade, carefully consider your investment objectives, experience level, and risk tolerance.',
  },
]

export const EBOOK_DETAILS: Record<string, EbookDetail> = {
  'crypto-1': { id: 'crypto-1', title: 'Introduction to Crypto', category: 'Crypto', readTime: '5 min read', image: '/images/course-crypto.png', chapters: CRYPTO_CHAPTERS, sections: CRYPTO_SECTIONS },
  'crypto-2': { id: 'crypto-2', title: 'Advanced Crypto Trading', category: 'Crypto', readTime: '8 min read', image: '/images/course-crypto.png', chapters: CRYPTO_CHAPTERS, sections: CRYPTO_SECTIONS },
  'crypto-3': { id: 'crypto-3', title: 'DeFi Fundamentals', category: 'Crypto', readTime: '6 min read', image: '/images/course-crypto.png', chapters: CRYPTO_CHAPTERS, sections: CRYPTO_SECTIONS },
  'crypto-4': { id: 'crypto-4', title: 'Blockchain Technology', category: 'Crypto', readTime: '7 min read', image: '/images/course-crypto.png', chapters: CRYPTO_CHAPTERS, sections: CRYPTO_SECTIONS },
  'forex-1': { id: 'forex-1', title: 'Introduction to Forex', category: 'Forex', readTime: '5 min read', image: '/images/course-forex.png', chapters: FOREX_CHAPTERS, sections: GENERIC_SECTIONS },
  'forex-2': { id: 'forex-2', title: 'Forex Strategies', category: 'Forex', readTime: '7 min read', image: '/images/course-forex.png', chapters: FOREX_CHAPTERS, sections: GENERIC_SECTIONS },
  'forex-3': { id: 'forex-3', title: 'Currency Pairs Deep Dive', category: 'Forex', readTime: '6 min read', image: '/images/course-forex.png', chapters: FOREX_CHAPTERS, sections: GENERIC_SECTIONS },
  'forex-4': { id: 'forex-4', title: 'Forex Risk Management', category: 'Forex', readTime: '5 min read', image: '/images/course-forex.png', chapters: FOREX_CHAPTERS, sections: GENERIC_SECTIONS },
  'stocks-1': { id: 'stocks-1', title: 'Introduction to Stocks', category: 'Stocks', readTime: '5 min read', image: '/images/course-stocks.png', chapters: STOCKS_CHAPTERS, sections: GENERIC_SECTIONS },
  'stocks-2': { id: 'stocks-2', title: 'Stock Market Basics', category: 'Stocks', readTime: '6 min read', image: '/images/course-stocks.png', chapters: STOCKS_CHAPTERS, sections: GENERIC_SECTIONS },
  'stocks-3': { id: 'stocks-3', title: 'Value Investing', category: 'Stocks', readTime: '8 min read', image: '/images/course-stocks.png', chapters: STOCKS_CHAPTERS, sections: GENERIC_SECTIONS },
  'stocks-4': { id: 'stocks-4', title: 'Growth Investing', category: 'Stocks', readTime: '7 min read', image: '/images/course-stocks.png', chapters: STOCKS_CHAPTERS, sections: GENERIC_SECTIONS },
}
