export interface DailyNewsEpisode {
  id: string
  title: string
  date: string
  duration: string
  imageUrl: string
}

export const featuredEpisode: DailyNewsEpisode = {
  id: 'featured-1',
  title: 'News 30/04/2026',
  date: 'Apr 30, 2026',
  duration: '00:02:30',
  imageUrl: '/images/news/daily-hero-thumbnail.webp',
}

export const episodes: DailyNewsEpisode[] = [
  {
    id: 'ep-1',
    title: 'News: 24/04/2026',
    date: 'Apr 21, 2026',
    duration: '00:02:18',
    imageUrl: '/images/news/daily-episode-thumbnail.webp',
  },
  {
    id: 'ep-2',
    title: 'News: 24/04/2026',
    date: 'Apr 21, 2026',
    duration: '00:02:18',
    imageUrl: '/images/news/daily-episode-thumbnail.webp',
  },
  {
    id: 'ep-3',
    title: 'News: 24/04/2026',
    date: 'Apr 21, 2026',
    duration: '00:02:18',
    imageUrl: '/images/news/daily-episode-thumbnail.webp',
  },
  {
    id: 'ep-4',
    title: 'News: 24/04/2026',
    date: 'Apr 21, 2026',
    duration: '00:02:18',
    imageUrl: '/images/news/daily-episode-thumbnail.webp',
  },
]
