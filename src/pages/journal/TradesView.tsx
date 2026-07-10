import { useState } from 'react'
import { GlassCard, SparkleButton } from '@/components/ui'
import { tradeHistory } from '@/data/trades'

/* ─── Icons ─── */

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#606060" strokeWidth="2" />
      <path d="M20 20L16.65 16.65" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const COLUMNS = ['DATE/TIME', 'INSTRUMENT', 'SIDE', 'SIZE', 'ENTRY', 'EXIT', 'NET P&L'] as const

export default function TradesView() {
  const [search, setSearch] = useState('')

  const filtered = tradeHistory.filter(t => {
    if (!search) return true
    const q = search.toLowerCase()
    return t.instrument.toLowerCase().includes(q) || t.dateTime.toLowerCase().includes(q) || t.side.toLowerCase().includes(q)
  })

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <h3 className="text-white text-[24px] font-acid font-normal">Trade History</h3>
            <p className="text-[#808080] text-[14px] font-acid mt-1">
              {filtered.length} Trade{filtered.length !== 1 ? 's' : ''} Found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 h-[44px] px-4 rounded-[12px] border border-white/10 bg-transparent min-w-[200px]">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search for"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-white text-[14px] font-acid outline-none flex-1 placeholder:text-[#606060]"
              />
            </div>
            <SparkleButton className="px-4">
              <CameraIcon />
            </SparkleButton>
            <SparkleButton className="px-4">
              <FilterIcon />
            </SparkleButton>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '800px' }}>
            <thead>
              <tr>
                {COLUMNS.map(col => (
                  <th
                    key={col}
                    className="text-gfx-neutral-300 text-[12px] font-acid font-bold uppercase tracking-wider text-left pb-4 px-4"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((trade, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="text-white text-[14px] font-acid px-4 h-[68px]">{trade.dateTime}</td>
                  <td className="text-white text-[14px] font-acid px-4 h-[68px]">{trade.instrument}</td>
                  <td className="text-white text-[14px] font-acid px-4 h-[68px]">{trade.side}</td>
                  <td className="text-white text-[14px] font-acid px-4 h-[68px]">{trade.size}</td>
                  <td className="text-white text-[14px] font-acid px-4 h-[68px]">{trade.entry}</td>
                  <td className={`text-[14px] font-acid px-4 h-[68px] ${trade.exitPositive ? 'text-[#37c92e]' : 'text-[#d46356]'}`}>
                    {trade.exit}
                  </td>
                  <td className={`text-[14px] font-acid px-4 h-[68px] ${trade.netPnlPositive ? 'text-[#37c92e]' : 'text-[#d46356]'}`}>
                    {trade.netPnl}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-[#808080] text-[14px] font-acid py-12">
                    No trades found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </GlassCard>
  )
}
