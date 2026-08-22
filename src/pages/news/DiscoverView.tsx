import { useState } from 'react'
import {
  DiscoverCategoryBar,
  DiscoverLivePill,
  DiscoverMarketTable,
  DiscoverMoverCard,
  DiscoverPagination,
  DiscoverSearchInput,
} from '@/components/ui'
import {
  DISCOVER_ASSET_CATEGORIES,
  DISCOVER_PRIMARY_CATEGORIES,
  discoverMarketRows,
  discoverMovers,
} from '@/data/discover'

export default function DiscoverView() {
  const [category, setCategory] = useState('For you')
  const [page, setPage] = useState(1)
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
        <div className="flex gap-[15px] overflow-x-auto pb-1">
          {discoverMovers.map((mover, index) => (
            <DiscoverMoverCard key={`${mover.symbol}-${index}`} mover={mover} />
          ))}
        </div>
      </div>

      {/* Explore markets */}
      <div className="flex flex-col gap-5">
        <h2 className="text-white text-h2 font-normal font-acid">Explore Markets</h2>

        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-0 flex-1">
            <DiscoverCategoryBar
              primary={DISCOVER_PRIMARY_CATEGORIES}
              assets={DISCOVER_ASSET_CATEGORIES}
              active={category}
              onChange={setCategory}
            />
          </div>
          <DiscoverSearchInput value={query} onChange={setQuery} />
        </div>

        <DiscoverMarketTable rows={rows} />

        <DiscoverPagination page={page} pages={3} onChange={setPage} />
      </div>
    </div>
  )
}
