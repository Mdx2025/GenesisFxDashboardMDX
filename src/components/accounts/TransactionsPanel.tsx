import { useState } from 'react'
import { GlassCard, ModeToggle, SearchInput } from '@/components/ui'

const TABS = ['Open Positions', 'Closed Trades', 'Transactions']

const MOCK_TRANSACTIONS = [
  { type: 'Transfer In', direction: 'To Wallet', date: 'Apr 21, 2026 12:36', amount: '-$5.00', amountColor: 'green' as const, status: 'Completed', icon: 'in' as const },
  { type: 'Transfer Out', direction: 'From Wallet', date: 'Apr 21, 2026 12:36', amount: '+$5.00', amountColor: 'red' as const, status: 'Completed', icon: 'out' as const },
]

function ArchiveIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544968C3.79961 0 5.19974 0 8 0H12C14.8003 0 16.2004 0 17.27 0.544968C18.2108 1.02433 18.9757 1.78924 19.455 2.73005C20 3.79961 20 5.19974 20 8C20 10.8003 20 12.2004 19.455 13.27C18.9757 14.2108 18.2108 14.9757 17.27 15.455C16.2004 16 14.8003 16 12 16H8C5.19974 16 3.79961 16 2.73005 15.455C1.78924 14.9757 1.02433 14.2108 0.544967 13.27C0 12.2004 0 10.8003 0 8ZM10.5303 11.5303C10.3897 11.671 10.1989 11.75 10 11.75C9.80109 11.75 9.61032 11.671 9.46967 11.5303L6.96967 9.03033C6.67678 8.73744 6.67678 8.26256 6.96967 7.96967C7.26256 7.67678 7.73744 7.67678 8.03033 7.96967L9.25 9.18934V5C9.25 4.58579 9.58579 4.25 10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V9.18934L11.9697 7.96967C12.2626 7.67678 12.7374 7.67678 13.0303 7.96967C13.3232 8.26256 13.3232 8.73744 13.0303 9.03033L10.5303 11.5303Z" fill="#808080"/>
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM5.46058 11.0833C5.83333 7.79988 8.62406 5.25 12.0096 5.25C13.9916 5.25 15.7702 6.12471 16.9775 7.50653C17.25 7.81846 17.2181 8.29226 16.9061 8.56479C16.5942 8.83733 16.1204 8.80539 15.8479 8.49347C14.9136 7.42409 13.541 6.75 12.0096 6.75C9.45215 6.75 7.33642 8.63219 6.97332 11.0833H7.33654C7.63998 11.0833 7.91353 11.2662 8.02955 11.5466C8.14558 11.8269 8.08122 12.1496 7.86651 12.364L6.69825 13.5307C6.40544 13.8231 5.93113 13.8231 5.63832 13.5307L4.47005 12.364C4.25534 12.1496 4.19099 11.8269 4.30701 11.5466C4.42304 11.2662 4.69658 11.0833 5.00002 11.0833H5.46058ZM17.3018 10.4693C17.5947 10.1769 18.069 10.1769 18.3618 10.4693L19.53 11.636C19.7448 11.8504 19.8091 12.1731 19.6931 12.4534C19.5771 12.7338 19.3035 12.9167 19.0001 12.9167H18.5395C18.1668 16.2001 15.376 18.75 11.9905 18.75C10.0085 18.75 8.22995 17.8753 7.02263 16.4935C6.7501 16.1815 6.78203 15.7077 7.09396 15.4352C7.40589 15.1627 7.87968 15.1946 8.15222 15.5065C9.08654 16.5759 10.4591 17.25 11.9905 17.25C14.548 17.25 16.6637 15.3678 17.0268 12.9167H16.6636C16.3601 12.9167 16.0866 12.7338 15.9705 12.4534C15.8545 12.1731 15.9189 11.8504 16.1336 11.636L17.3018 10.4693Z" fill="#808080"/>
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
      <div className="flex flex-row justify-between items-center mb-6">
        {/* Tab bar */}
        <div className="w-lg">
          <ModeToggle options={TABS} activeIndex={activeTab} onChange={setActiveTab} />
        </div>

        <div className="flex items-center gap-4">
          {/* Search field */}
          <SearchInput placeholder="Search transactions" />

          {/* Action buttons */}
          <button className="w-11 h-11 rounded-full border border-gfx-neutral-200 flex items-center justify-center hover:border-gfx-neutral-400 transition-colors cursor-pointer">
            <ArchiveIcon />
          </button>
          <button className="w-11 h-11 rounded-full border border-gfx-neutral-200 flex items-center justify-center hover:border-gfx-neutral-400 transition-colors cursor-pointer">
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Table card */}
      <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[493px] h-[278px] rounded-full pointer-events-none bg-gfx-green-200 [filter:url(#blur-157)] will-change-transform opacity-30" aria-hidden="true" />

        <div className="relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-gfx-green-900">
                  <th className="text-left text-xs font-bold tracking-[0.19em] text-gfx-neutral-300 uppercase pl-6 py-4 w-[15%]">Type</th>
                  <th className="text-left text-xs font-bold tracking-[0.19em] text-gfx-neutral-300 uppercase py-4 w-[20%]">Date</th>
                  <th className="text-left text-xs font-bold tracking-[0.19em] text-gfx-neutral-300 uppercase py-4 w-[20%]">Direction</th>
                  <th className="text-left text-xs font-bold tracking-[0.19em] text-gfx-neutral-300 uppercase py-4 w-[20%]">Amount</th>
                  <th className="text-left text-xs font-bold tracking-[0.19em] text-gfx-neutral-300 uppercase py-4 w-[15%]">Status</th>
                  <th className="w-[10%]" />
                </tr>
              </thead>
              <tbody>
                {MOCK_TRANSACTIONS.map((tx, i) => (
                  <tr key={i} className={i > 0 ? 'border-t border-gfx-green-900' : ''}>
                    <td className="pl-6 py-5">
                      <div className="flex items-center gap-2">
                        {tx.icon === 'in' ? <TransferInIcon /> : <TransferOutIcon />}
                        <span className="text-white text-sm">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-5 text-white text-sm">{tx.date}</td>
                    <td className="py-5 text-white text-sm">{tx.direction}</td>
                    <td className={`py-5 text-sm ${tx.amountColor === 'green' ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>{tx.amount}</td>
                    <td className="py-5">
                      <span className="inline-block px-4.5 py-1 rounded-full border border-gfx-bullish text-gfx-bullish-light text-xs">
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
