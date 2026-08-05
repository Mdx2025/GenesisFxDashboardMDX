import { useState } from 'react'
import { GlassCard, GlowEllipse, SearchInput } from '@/components/ui'
import { tradeHistory } from '@/data/trades'

/* ─── Icons ─── */

function ArchiveDownIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M20.3708 3.46447C18.9063 2 16.5493 2 11.8352 2C7.12119 2 4.76417 2 3.2997 3.46447C2.54222 4.22195 2.17653 5.21824 2 6.65598C2.53066 6.06532 3.16829 5.57328 3.8843 5.20846C4.66578 4.81027 5.50258 4.6488 6.4291 4.5731C7.32423 4.49997 8.42564 4.49998 9.7724 4.5H13.8981C15.2448 4.49998 16.3462 4.49997 17.2414 4.5731C18.1679 4.6488 19.0047 4.81027 19.7862 5.20846C20.5022 5.57328 21.1398 6.06532 21.6705 6.65598C21.4939 5.21824 21.1283 4.22195 20.3708 3.46447Z" fill="#808080" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 14.6562C2 11.856 2 10.4559 2.54497 9.3863C3.02433 8.44549 3.78924 7.68058 4.73005 7.20122C5.79961 6.65625 7.19974 6.65625 10 6.65625H14C16.8003 6.65625 18.2004 6.65625 19.27 7.20122C20.2108 7.68058 20.9757 8.44549 21.455 9.3863C22 10.4559 22 11.856 22 14.6562C22 17.4565 22 18.8566 21.455 19.9262C20.9757 20.867 20.2108 21.6319 19.27 22.1113C18.2004 22.6562 16.8003 22.6562 14 22.6562H10C7.19974 22.6562 5.79961 22.6562 4.73005 22.1113C3.78924 21.6319 3.02433 20.867 2.54497 19.9262C2 18.8566 2 17.4565 2 14.6562ZM12.5303 18.1866C12.3897 18.3272 12.1989 18.4062 12 18.4062C11.8011 18.4062 11.6103 18.3272 11.4697 18.1866L8.96967 15.6866C8.67678 15.3937 8.67678 14.9188 8.96967 14.6259C9.26256 14.333 9.73744 14.333 10.0303 14.6259L11.25 15.8456V11.6562C11.25 11.242 11.5858 10.9062 12 10.9062C12.4142 10.9062 12.75 11.242 12.75 11.6562V15.8456L13.9697 14.6259C14.2626 14.333 14.7374 14.333 15.0303 14.6259C15.3232 14.9188 15.3232 15.3937 15.0303 15.6866L12.5303 18.1866Z" fill="#808080" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM5.46058 11.0833C5.83333 7.79988 8.62406 5.25 12.0096 5.25C13.9916 5.25 15.7702 6.12471 16.9775 7.50653C17.25 7.81846 17.2181 8.29226 16.9061 8.56479C16.5942 8.83733 16.1204 8.80539 15.8479 8.49347C14.9136 7.42409 13.541 6.75 12.0096 6.75C9.45215 6.75 7.33642 8.63219 6.97332 11.0833H7.33654C7.63998 11.0833 7.91353 11.2662 8.02955 11.5466C8.14558 11.8269 8.08122 12.1496 7.86651 12.364L6.69825 13.5307C6.40544 13.8231 5.93113 13.8231 5.63832 13.5307L4.47005 12.364C4.25534 12.1496 4.19099 11.8269 4.30701 11.5466C4.42304 11.2662 4.69658 11.0833 5.00002 11.0833H5.46058ZM17.3018 10.4693C17.5947 10.1769 18.069 10.1769 18.3618 10.4693L19.53 11.636C19.7448 11.8504 19.8091 12.1731 19.6931 12.4534C19.5771 12.7338 19.3035 12.9167 19.0001 12.9167H18.5395C18.1668 16.2001 15.376 18.75 11.9905 18.75C10.0085 18.75 8.22995 17.8753 7.02263 16.4935C6.7501 16.1815 6.78203 15.7077 7.09396 15.4352C7.40589 15.1627 7.87968 15.1946 8.15222 15.5065C9.08654 16.5759 10.4591 17.25 11.9905 17.25C14.548 17.25 16.6637 15.3678 17.0268 12.9167H16.6636C16.3601 12.9167 16.0866 12.7338 15.9705 12.4534C15.8545 12.1731 15.9189 11.8504 16.1336 11.636L17.3018 10.4693Z" fill="#808080" />
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
        <GlowEllipse className="left-[10%] top-[-20%]" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-10">
          <div>
            <h3 className="text-white text-xl font-acid font-normal leading-tight">Trade History</h3>
            <p className="text-gfx-neutral-400 text-sm font-acid mt-0.5">
              <span className="text-white">{filtered.length}</span>{' '}
              Trade{filtered.length !== 1 ? 's' : ''} Found
            </p>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <SearchInput placeholder="Search for" value={search} onChange={setSearch} />
            <button className="p-2.5 rounded-full border border-gfx-neutral-250 bg-transparent flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
              <ArchiveDownIcon />
            </button>
            <button className="p-2.5 rounded-full border border-gfx-neutral-250 bg-transparent flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
              <RefreshIcon />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Table Card */}
      <div className="relative overflow-hidden rounded-lg bg-gfx-green-800 shadow-md">
        <div className="absolute left-1/2 -translate-x-1/2 top-[-252px] w-[30.8125rem] h-[17.3750rem] rounded-full bg-gfx-green-200 blur-[9.8125rem]" />
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[50rem]">
            <thead>
              <tr className="border-b border-gfx-green-900">
                {COLUMNS.map(col => (
                  <th
                    key={col}
                    className="text-gfx-neutral-500 text-xs font-acid font-bold uppercase text-left h-[3.6250rem] px-4 sm:px-7 tracking-tab"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((trade, i) => (
                <tr key={i} className="border-b border-gfx-green-900">
                  <td className="text-gfx-neutral-600 text-base font-acid font-medium px-4 sm:px-7 h-[4.75rem]">{trade.dateTime}</td>
                  <td className="text-gfx-neutral-600 text-base font-acid font-medium px-4 sm:px-7 h-[4.75rem]">{trade.instrument}</td>
                  <td className="text-gfx-neutral-600 text-base font-acid font-medium px-4 sm:px-7 h-[4.75rem]">{trade.side}</td>
                  <td className="text-gfx-neutral-600 text-base font-acid font-medium px-4 sm:px-7 h-[4.75rem]">{trade.size}</td>
                  <td className="text-gfx-neutral-600 text-base font-acid font-medium px-4 sm:px-7 h-[4.75rem]">{trade.entry}</td>
                  <td className={`text-sm font-acid px-4 sm:px-7 h-[4.75rem] ${trade.exitPositive ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>
                    {trade.exit}
                  </td>
                  <td className={`text-sm font-acid px-4 sm:px-7 h-[4.75rem] ${trade.netPnlPositive ? 'text-gfx-bullish-light' : 'text-gfx-red-muted'}`}>
                    {trade.netPnl}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gfx-neutral-400 text-sm font-acid py-12">
                    No trades found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
