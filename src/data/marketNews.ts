export interface NewsArticle {
  id: string
  category: string
  region?: string
  countryCode?: string
  countryName?: string
  title: string
  description: string
  date: string
  imageUrl?: string
}

export const heroArticle: NewsArticle = {
  id: 'hero-1',
  category: 'Markets',
  region: 'Euro Area',
  title: 'European Stocks Hold Near Records',
  description: 'European stock indices closed mixed on Tuesday following the record highs touched in the previous session amid contrasting earnings results from the Eurozone\'s largest companies.',
  date: 'Feb 10, 5:06 PM·EU',
  imageUrl: '/images/news/hero-stock-market.webp',
}

export const secondaryArticles: NewsArticle[] = [
  {
    id: 'sec-1',
    category: 'Commodity',
    title: 'Germany Natural Gas Futures Fall Further',
    description: 'German natural gas futures fell to EUR33 per megawatt-hour, as milder weather forecasts and stronger wind output',
    date: 'Feb 10, 5:06 PM',
  },
  {
    id: 'sec-2',
    category: 'Commodity',
    title: 'UK Natural Gas Futures Fall to 1-Month Low',
    description: 'UK natural gas futures fell below 75 pence per therm, the lowest since January 9, as milder weather forecasts reduced',
    date: 'Feb 10, 5:06 PM',
  },
]

export const listArticles: NewsArticle[] = [
  {
    id: 'list-1',
    category: 'News',
    countryCode: 'CN',
    countryName: 'China',
    title: 'China Adds 2.99 Million New Urban Jobs in Q1',
    description: 'China\'s job market added 2.99 million new urban jobs in the first quarter of 2026, with the surveyed urban unemployment rate averaging 5.3%, according to the Ministry of Huma ...',
    date: 'Apr 28, 4:10 AM',
  },
  {
    id: 'list-2',
    category: 'News',
    countryCode: 'CN',
    countryName: 'China',
    title: 'China Adds 2.99 Million New Urban Jobs in Q1',
    description: 'China\'s job market added 2.99 million new urban jobs in the first quarter of 2026, with the surveyed urban unemployment rate averaging 5.3%, according to the Ministry of Huma ...',
    date: 'Apr 28, 4:10 AM',
  },
  {
    id: 'list-3',
    category: 'News',
    countryCode: 'CN',
    countryName: 'China',
    title: 'China Adds 2.99 Million New Urban Jobs in Q1',
    description: 'China\'s job market added 2.99 million new urban jobs in the first quarter of 2026, with the surveyed urban unemployment rate averaging 5.3%, according to the Ministry of Huma ...',
    date: 'Apr 28, 4:10 AM',
  },
  {
    id: 'list-4',
    category: 'News',
    countryCode: 'CN',
    countryName: 'China',
    title: 'China Adds 2.99 Million New Urban Jobs in Q1',
    description: 'China\'s job market added 2.99 million new urban jobs in the first quarter of 2026, with the surveyed urban unemployment rate averaging 5.3%, according to the Ministry of Huma ...',
    date: 'Apr 28, 4:10 AM',
  },
  {
    id: 'list-5',
    category: 'News',
    countryCode: 'CN',
    countryName: 'China',
    title: 'China Adds 2.99 Million New Urban Jobs in Q1',
    description: 'China\'s job market added 2.99 million new urban jobs in the first quarter of 2026, with the surveyed urban unemployment rate averaging 5.3%, according to the Ministry of Huma ...',
    date: 'Apr 28, 4:10 AM',
  },
  {
    id: 'list-6',
    category: 'News',
    countryCode: 'CN',
    countryName: 'China',
    title: 'China Adds 2.99 Million New Urban Jobs in Q1',
    description: 'China\'s job market added 2.99 million new urban jobs in the first quarter of 2026, with the surveyed urban unemployment rate averaging 5.3%, according to the Ministry of Huma ...',
    date: 'Apr 28, 4:10 AM',
  },
]
