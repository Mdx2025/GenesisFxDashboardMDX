import { useState } from 'react'
import {
  DiscoverLivePill,
  DiscoverMarketTable,
  DiscoverMoverCard,
  DiscoverSearchInput,
  ModeToggle,
} from '@/components/ui'
import {
  DISCOVER_ASSET_CATEGORIES,
  DISCOVER_PRIMARY_CATEGORIES,
  discoverMarketRows,
  discoverMovers,
} from '@/data/discover'

const CATEGORIES = ['For you', ...DISCOVER_PRIMARY_CATEGORIES, ...DISCOVER_ASSET_CATEGORIES]

export default function DiscoverView() {
  const [category, setCategory] = useState(0)
  const [query, setQuery] = useState('')

  const rows = query
    ? discoverMarketRows.filter(row => `${row.symbol} ${row.name}`.toLowerCase().includes(query.toLowerCase()))
    : discoverMarketRows

  return (
    <div className="flex flex-col gap-5">
      {/* Top movers strip */}
      <div className="flex flex-col gap-[13px]">
        <div className="flex items-center gap-[15px]">
          <h2 className="text-white text-base font-medium font-acid leading-[24.44px] whitespace-nowrap">TOP MOVERS</h2>
          <DiscoverLivePill>Biggest 24H MOVES</DiscoverLivePill>
        </div>
        <div className="grid grid-cols-2 gap-[15px] sm:grid-cols-4 lg:grid-cols-7">
          {discoverMovers.map((mover, index) => (
            <DiscoverMoverCard key={`${mover.symbol}-${index}`} mover={mover} />
          ))}
        </div>
      </div>

      {/* Explore markets */}
      <div className="mt-6 flex flex-col gap-5">
        <h2 className="text-white text-h2 font-normal font-acid">Explore Markets</h2>

        <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center" data-explore-markets-controls>
          <div className="min-w-0 w-full md:flex-1">
            <ModeToggle
              options={CATEGORIES}
              activeIndex={category}
              onChange={setCategory}
              buttonClassName="text-[14px]! px-0! overflow-visible!"
            />
          </div>
          <DiscoverSearchInput value={query} onChange={setQuery} className="w-full md:w-[287px]" />
        </div>

        <DiscoverMarketTable rows={rows} />
      </div>
    </div>
  )
}
