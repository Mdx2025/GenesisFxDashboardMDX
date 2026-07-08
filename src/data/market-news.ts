export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  date: string
  region: string
  regionCode: string
  category: string
  image?: string
  featured?: boolean
}

export const FEATURED_ARTICLE: NewsArticle = {
  id: 'featured-1',
  title: 'European Stocks Hold Near Records',
  excerpt: 'European stock indices closed mixed on Tuesday following the record highs touched in the previous session amid contrasting earnings results from the Eurozone\'s largest companies.',
  date: 'Feb 10, 5:06 PM',
  region: 'Euro Area',
  regionCode: 'EU',
  category: 'Stocks',
  featured: true,
}

export const SECONDARY_ARTICLES: NewsArticle[] = [
  {
    id: 'secondary-1',
    title: 'Germany Natural Gas Futures Fall Further',
    excerpt: 'German natural gas futures fell to €33 per megawatt-hour, as milder weather forecasts and stronger wind output',
    date: 'Feb 10, 5:06 PM',
    region: 'Commodity',
    regionCode: 'DE',
    category: 'Commodity',
  },
  {
    id: 'secondary-2',
    title: 'UK Natural Gas Futures Fall to 1-Month Low',
    excerpt: 'UK natural gas futures fell below 75 pence per therm, the lowest since January 9, as milder weather forecasts reduced',
    date: 'Feb 10, 5:06 PM',
    region: 'Commodity',
    regionCode: 'UK',
    category: 'Commodity',
  },
]

export const NEWS_LIST: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'China Adds 2.99 Million New Urban Jobs in Q1',
    excerpt: 'China\'s job market added 2.99 million new urban jobs in the first quarter of 2026, with the surveyed urban unemployment rate averaging 5.3%, according to the Ministry of Human Resources and Social Security.',
    date: 'Apr 28, 4:10 AM',
    region: 'China',
    regionCode: 'CN',
    category: 'News',
  },
  {
    id: 'news-2',
    title: 'US Consumer Confidence Drops to 4-Year Low',
    excerpt: 'The Conference Board\'s consumer confidence index fell to 86.0 in April from 92.9 in March, the lowest reading since May 2022, as households grew increasingly worried about the economic outlook.',
    date: 'Apr 28, 3:45 AM',
    region: 'United States',
    regionCode: 'US',
    category: 'News',
  },
  {
    id: 'news-3',
    title: 'Japan Industrial Output Rises 2.5% in March',
    excerpt: 'Japan\'s industrial production increased 2.5% month-over-month in March 2026, beating market expectations of a 1.8% gain, led by strong output in the automotive and semiconductor sectors.',
    date: 'Apr 28, 2:30 AM',
    region: 'Japan',
    regionCode: 'JP',
    category: 'News',
  },
  {
    id: 'news-4',
    title: 'ECB Holds Rates Steady at 3.75%',
    excerpt: 'The European Central Bank kept its main refinancing rate unchanged at 3.75% for the third consecutive meeting, citing persistent core inflation pressures despite softening economic growth across the eurozone.',
    date: 'Apr 27, 8:15 PM',
    region: 'Euro Area',
    regionCode: 'EU',
    category: 'News',
  },
  {
    id: 'news-5',
    title: 'Australia Unemployment Rate Edges Up to 4.1%',
    excerpt: 'Australia\'s unemployment rate rose slightly to 4.1% in March from 3.9% in February, as the economy added 32,000 jobs but labor force participation increased to a record 67.2%.',
    date: 'Apr 27, 6:00 PM',
    region: 'Australia',
    regionCode: 'AU',
    category: 'News',
  },
  {
    id: 'news-6',
    title: 'India GDP Growth Forecast Raised to 7.2%',
    excerpt: 'The International Monetary Fund revised its 2026 GDP growth forecast for India upward to 7.2% from 6.8%, citing robust domestic demand, strong services exports, and continued infrastructure investment.',
    date: 'Apr 27, 4:30 PM',
    region: 'India',
    regionCode: 'IN',
    category: 'News',
  },
]

export const NEWS_TABS = ['Market News', 'Daily News', 'Economic Calendar', 'Trade Sessions', 'Podcast'] as const
