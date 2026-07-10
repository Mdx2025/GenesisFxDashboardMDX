import { useState } from 'react'
import { GlassCard, SparkleButton } from '@/components/ui'
import { tradeHistory } from '@/data/trades'

/* ─── Icons ─── */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#606060" strokeWidth="2" />
      <path d="M20 20L16.65 16.65" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1.5" fill="white" />
      <circle cx="12" cy="12" r="1.5" fill="white" />
      <circle cx="12" cy="19" r="1.5" fill="white" />
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
    <div className="flex flex-col gap-4">
      {/* Header Card */}
      <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h3 className="text-white text-[22px] font-acid font-normal leading-tight">Trade History</h3>
            <p className="text-[#808080] text-[13px] font-acid mt-0.5">
              <span className="text-white">{filtered.length}</span>{' '}
              Trade{filtered.length !== 1 ? 's' : ''} Found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 h-[38px] px-4 rounded-[12px] border border-white/10 bg-transparent min-w-[180px]">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search for"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-white text-[13px] font-acid outline-none flex-1 placeholder:text-[#606060]"
              />
            </div>
            <SparkleButton className="!h-[38px] !w-[38px] !min-w-0 !p-0 flex items-center justify-center">
              <CameraIcon />
            </SparkleButton>
            <SparkleButton className="!h-[38px] !w-[38px] !min-w-0 !p-0 flex items-center justify-center">
              <FilterIcon />
            </SparkleButton>
            <SparkleButton className="!h-[38px] !w-[38px] !min-w-0 !p-0 flex items-center justify-center">
              <DotsIcon />
            </SparkleButton>
          </div>
        </div>
      </GlassCard>

      {/* Table Card */}
      <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '800px' }}>
            <thead>
              <tr className="bg-[#0a2e22]/60">
                {COLUMNS.map(col => (
                  <th
                    key={col}
                    className="text-[#5a6b63] text-[11px] font-acid font-bold uppercase tracking-wider text-left py-3 px-6"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((trade, i) => (
                <tr key={i}>
                  <td className="text-white/90 text-[14px] font-acid px-6 h-[64px]">{trade.dateTime}</td>
                  <td className="text-white/90 text-[14px] font-acid px-6 h-[64px]">{trade.instrument}</td>
                  <td className="text-white/90 text-[14px] font-acid px-6 h-[64px]">{trade.side}</td>
                  <td className="text-white/90 text-[14px] font-acid px-6 h-[64px]">{trade.size}</td>
                  <td className="text-white/90 text-[14px] font-acid px-6 h-[64px]">{trade.entry}</td>
                  <td className={`text-[14px] font-acid px-6 h-[64px] ${trade.exitPositive ? 'text-[#37c92e]' : 'text-[#d46356]'}`}>
                    {trade.exit}
                  </td>
                  <td className={`text-[14px] font-acid px-6 h-[64px] ${trade.netPnlPositive ? 'text-[#37c92e]' : 'text-[#d46356]'}`}>
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
      </GlassCard>
    </div>
  )
}
