import { useState } from 'react'
import { GlassCard, ModeToggle } from '@/components/ui'

const TABS = ['Open Positions', 'Closed Trades', 'Transactions']

const MOCK_TRANSACTIONS = [
  { type: 'Transfer In', direction: 'To Wallet', date: 'Apr 21, 2026 12:36', amount: '-$5.00', amountColor: 'green' as const, status: 'Completed', icon: 'in' as const },
  { type: 'Transfer Out', direction: 'From Wallet', date: 'Apr 21, 2026 12:36', amount: '+$5.00', amountColor: 'red' as const, status: 'Completed', icon: 'out' as const },
]

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#808080" strokeWidth="1.5"/>
      <path d="M13 13L16 16" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ArchiveIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M2 6h20v2H2V6z" fill="#808080"/>
      <path d="M4 8v10a2 2 0 002 2h12a2 2 0 002-2V8" stroke="#808080" strokeWidth="1.5"/>
      <path d="M10 13h4" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 4v4h-4M4 20v-4h4" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TransferInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 3v12M9 15l-4-4M9 15l4-4" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TransferOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 15V3M9 3L5 7M9 3l4 4" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function TransactionsPanel() {
  const [activeTab, setActiveTab] = useState(2)

  return (
    <div>
      {/* Top bar: Tabs + Search + Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        {/* Tab bar */}
        <ModeToggle options={TABS} activeIndex={activeTab} onChange={setActiveTab} />

        <div className="flex items-center gap-4">
          {/* Search field */}
          <div className="flex items-center gap-2.5 bg-[#0C1311] border border-[#064B34] rounded-full px-4 py-2.5 w-[287px]">
            <SearchIcon />
            <span className="text-[#808080] text-[1rem]">Search transactions</span>
          </div>

          {/* Action buttons */}
          <button className="w-11 h-11 rounded-full border border-[#2F2F2F] flex items-center justify-center hover:border-[#808080] transition-colors cursor-pointer">
            <ArchiveIcon />
          </button>
          <button className="w-11 h-11 rounded-full border border-[#2F2F2F] flex items-center justify-center hover:border-[#808080] transition-colors cursor-pointer">
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Table card */}
      <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[493px] h-[278px] rounded-full pointer-events-none bg-[#064B34] [filter:url(#blur-157)] will-change-transform opacity-30" aria-hidden="true" />

        <div className="relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#09241C]">
                  <th className="text-left text-[0.75rem] font-bold tracking-[0.19em] text-[#606060] uppercase pl-6 py-4 w-[15%]">Type</th>
                  <th className="text-left text-[0.75rem] font-bold tracking-[0.19em] text-[#606060] uppercase py-4 w-[20%]">Date</th>
                  <th className="text-left text-[0.75rem] font-bold tracking-[0.19em] text-[#606060] uppercase py-4 w-[20%]">Direction</th>
                  <th className="text-left text-[0.75rem] font-bold tracking-[0.19em] text-[#606060] uppercase py-4 w-[20%]">Amount</th>
                  <th className="text-left text-[0.75rem] font-bold tracking-[0.19em] text-[#606060] uppercase py-4 w-[15%]">Status</th>
                  <th className="w-[10%]" />
                </tr>
              </thead>
              <tbody>
                {MOCK_TRANSACTIONS.map((tx, i) => (
                  <tr key={i} className={i > 0 ? 'border-t border-[#09241C]' : ''}>
                    <td className="pl-6 py-5">
                      <div className="flex items-center gap-2">
                        {tx.icon === 'in' ? <TransferInIcon /> : <TransferOutIcon />}
                        <span className="text-white text-[0.875rem]">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-5 text-white text-[0.875rem]">{tx.date}</td>
                    <td className="py-5 text-white text-[0.875rem]">{tx.direction}</td>
                    <td className={`py-5 text-[0.875rem] ${tx.amountColor === 'green' ? 'text-[#37C92E]' : 'text-[#D46356]'}`}>{tx.amount}</td>
                    <td className="py-5">
                      <span className="inline-block px-[18px] py-1 rounded-full border border-[#0C9104] text-[#37C92E] text-[0.75rem]">
                        {tx.status}
                      </span>
                    </td>
                    <td />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
