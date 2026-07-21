import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlowEllipse, ModeToggle, PeriodPill } from '@/components/ui'
import { TradingCalendar } from '@/components/ui/TradingCalendar'


function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="#606060" strokeWidth="1.5" />
      <path d="M9 12V9M9 6h.008" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[#606060] text-xs font-acid leading-[15.68px] uppercase tracking-[1px]">{label}</p>
      <p className="text-white text-lg font-acid leading-[24.44px] mt-1">{value}</p>
    </div>
  )
}

function RevenueCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="flex flex-col">
        {/* Container 1: Revenue summary */}
        <div className="relative p-6 overflow-hidden">
          <div className="flex flex-row justify-between items-center mb-2">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-[2rem] border border-[#303030] text-[#ECECEC] text-sm font-acid">GenFX</span>
            <div className="w-[59px] h-[59px] rounded-[20px] bg-[#09241C] border border-[#064B34] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.25 7.847C10.314 8.103 9.75 8.822 9.75 9.5c0 .679.564 1.397 1.5 1.653V7.847Z" fill="#00B38C" />
                <path d="M12.75 12.847v3.306c.936-.256 1.5-.974 1.5-1.653 0-.678-.564-1.397-1.5-1.652Z" fill="#00B38C" />
                <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-10-6.75c.414 0 .75.336.75.75v.317c1.63.292 3 1.517 3 3.183a.75.75 0 1 1-1.5 0c0-.678-.564-1.397-1.5-1.652v3.469c1.63.292 3 1.517 3 3.183s-1.37 2.891-3 3.183V18a.75.75 0 1 1-1.5 0v-.317c-1.63-.292-3-1.517-3-3.183a.75.75 0 1 1 1.5 0c0 .679.564 1.397 1.5 1.653v-3.47c-1.63-.292-3-1.516-3-3.183 0-1.666 1.37-2.891 3-3.183V6c0-.414.336-.75.75-.75Z" fill="#00B38C" />
              </svg>
            </div>
          </div>
          <p className="text-white text-5xl font-acid leading-normal">$0.00</p>
          <p className="text-[#808080] text-sm font-acid mt-1">This year: <span className="text-white">$0.00</span></p>
          <GlowEllipse className="left-1/2 -translate-x-1/2 -bottom-[6.25rem]" />
        </div>

        {/* Container 2: Stat cards grid */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#09241C]">
            {[
              { label: 'Referrals', value: '$0.00' },
              { label: 'Clicks', value: '$0.00' },
              { label: 'Trading vol', value: '$0.00' },
              { label: 'Deposits', value: '$0.00' },
              { label: 'This year', value: '$0.00' },
              { label: '2 Mo Ret', value: '$0.00' },
            ].map(s => (
              <div
                key={s.label}
                className="flex flex-col justify-center px-[1.5625rem] py-[1.75rem] bg-[#0C1311] rounded-[18.56px] border-1 border-[#162D25] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)] min-h-[6.75rem]"
              >
                <p className="text-[#A0A0A0] text-sm font-acid leading-[1.175rem]">{s.label}</p>
                <p className="text-white text-2xl font-acid mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

function TopReferralsCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden" style={{ boxShadow: 'none' }}>
      <div className="relative p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-white text-base font-acid font-medium leading-[24.44px]">Top Referrals</h2>
          <div className="w-[42px] h-[42px] rounded-xl bg-gfx-green-900 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="7" cy="5.5" r="3" fill="#00B38C" />
              <ellipse cx="7" cy="14" rx="5" ry="3" fill="#00B38C" />
              <circle cx="14.5" cy="6.5" r="2.2" fill="#00B38C" opacity="0.5" />
              <ellipse cx="14.5" cy="14.5" rx="3.5" ry="2.2" fill="#00B38C" opacity="0.5" />
            </svg>
          </div>
        </div>

        <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
          <div className="relative p-5">
            <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

            <div className="relative z-10 flex items-start gap-5">
              <div className="w-[58px] h-[58px] rounded-full bg-gfx-green-900 border border-[#064B34] flex items-center justify-center shrink-0">
                <span className="text-gfx-green-300 text-[1.25rem] font-acid">AP</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white text-base font-acid leading-[1.2rem]">Ana Pinzon</span>
                  <span className="text-white text-base font-acid font-medium leading-[24.44px]">AR</span>
                </div>
                <div className="inline-flex items-center gap-[11px] px-3.5 py-2.5 bg-gfx-green-900 rounded-[32px] border border-[#064B34] mb-3">
                  <svg width="19" height="11" viewBox="0 0 19 11" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.3994 0.645C12.3994 0.288776 12.6881 0 13.0444 0H17.845C18.2012 0 18.49 0.288776 18.49 0.645V5.41442C18.49 5.77064 18.2012 6.05942 17.845 6.05942C17.4888 6.05942 17.2 5.77064 17.2 5.41442V2.19546L11.9232 7.44011C11.5199 7.841 11.1723 8.18654 10.8566 8.42603C10.5182 8.68275 10.1422 8.87695 9.67931 8.8769C9.21646 8.87685 8.84051 8.68256 8.50216 8.42576C8.18654 8.1862 7.839 7.84059 7.43581 7.43962L7.19994 7.20509C6.75777 6.7654 6.47109 6.48226 6.23238 6.3011C6.00858 6.13126 5.90395 6.11231 5.83466 6.11234C5.76538 6.11236 5.66076 6.13139 5.43709 6.30139C5.19851 6.48273 4.91203 6.76608 4.47018 7.20608L1.10013 10.562C0.847711 10.8134 0.439321 10.8125 0.187961 10.5601C-0.0633985 10.3077 -0.0625425 9.89932 0.189873 9.64796L3.58993 6.26213C3.9932 5.86049 4.34078 5.51433 4.65649 5.27438C4.9949 5.01716 5.37101 4.82251 5.83419 4.82234C6.29738 4.82217 6.67363 5.01655 7.01223 5.27352C7.32811 5.51324 7.67593 5.85914 8.0795 6.26048L8.31537 6.49502C8.75716 6.93432 9.04357 7.2172 9.28206 7.39821C9.50565 7.56791 9.6102 7.58689 9.67946 7.5869C9.74872 7.58691 9.85328 7.56795 10.0769 7.3983C10.3154 7.21735 10.6019 6.93453 11.0438 6.49534L16.2811 1.29H13.0444C12.6881 1.29 12.3994 1.00122 12.3994 0.645Z" fill="#00B38C"/>
                  </svg>
                  <span className="text-gfx-green-300 text-[1.019rem] font-acid">Top performer</span>
                </div>
                <div className="flex items-center gap-4 text-[#808080] text-[1.019rem] font-acid">
                  <div className="flex items-center gap-1.5">
                    <svg width="21" height="18" viewBox="0 0 21 18" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.1009 5.00353C19.0442 4.99996 18.9825 4.99998 18.9186 5L18.9026 5.00001H16.3941C14.3264 5.00001 12.5572 6.62757 12.5572 8.75001C12.5572 10.8724 14.3264 12.5 16.3941 12.5H18.9026L18.9186 12.5C18.9825 12.5 19.0442 12.5001 19.1009 12.4965C19.9408 12.4434 20.6835 11.7862 20.746 10.8682C20.7501 10.808 20.75 10.7431 20.75 10.683L20.75 10.6667V6.83334L20.75 6.81702C20.75 6.75688 20.7501 6.69199 20.746 6.6318C20.6835 5.71381 19.9408 5.05657 19.1009 5.00353ZM16.1717 9.75C16.704 9.75 17.1355 9.30229 17.1355 8.75C17.1355 8.19771 16.704 7.75 16.1717 7.75C15.6394 7.75 15.2078 8.19771 15.2078 8.75C15.2078 9.30229 15.6394 9.75 16.1717 9.75Z" fill="#808080"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.9179 14C19.067 13.9961 19.1799 14.1342 19.1394 14.2778C18.9387 14.9902 18.62 15.5975 18.1088 16.1088C17.3604 16.8571 16.4114 17.1892 15.239 17.3469C14.0998 17.5 12.6442 17.5 10.8064 17.5H8.69359C6.85583 17.5 5.40019 17.5 4.26098 17.3469C3.08856 17.1892 2.13961 16.8571 1.39124 16.1088C0.642881 15.3604 0.310764 14.4114 0.153135 13.239C-2.8044e-05 12.0998 -1.54718e-05 10.6442 3.23433e-07 8.80642V8.69358C-1.5591e-05 6.85583 -2.82824e-05 5.40019 0.153135 4.26098C0.310763 3.08856 0.64288 2.13961 1.39124 1.39124C2.13961 0.642881 3.08856 0.310764 4.26098 0.153136C5.40019 -2.78056e-05 6.85582 -1.5293e-05 8.69358 4.4264e-07L10.8064 3.23431e-07C12.6442 -1.5591e-05 14.0998 -2.82824e-05 15.239 0.153135C16.4114 0.310763 17.3604 0.64288 18.1088 1.39124C18.62 1.90252 18.9386 2.50974 19.1394 3.22218C19.1799 3.36575 19.067 3.50387 18.9179 3.5L16.394 3.50001C13.5574 3.50001 11.0571 5.74091 11.0571 8.75001C11.0571 11.7591 13.5574 14 16.394 14L18.9179 14ZM3.75 4C3.33579 4 3 4.33579 3 4.75C3 5.16421 3.33579 5.5 3.75 5.5H7.75C8.16421 5.5 8.5 5.16421 8.5 4.75C8.5 4.33579 8.16421 4 7.75 4H3.75Z" fill="#808080"/>
                    </svg>
                    <span>L1</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M16.5 10.5V9C16.5 8.37072 16.5 7.81145 16.4903 7.3125H1.50968C1.5 7.81145 1.5 8.37072 1.5 9V10.5C1.5 13.3284 1.5 14.7426 2.37868 15.6213C3.25736 16.5 4.67157 16.5 7.5 16.5H10.5C13.3284 16.5 14.7426 16.5 15.6213 15.6213C16.5 14.7426 16.5 13.3284 16.5 10.5Z" fill="#808080"/>
                      <path d="M5.8125 1.875C5.8125 1.56434 5.56066 1.3125 5.25 1.3125C4.93934 1.3125 4.6875 1.56434 4.6875 1.875V3.05944C3.608 3.14588 2.89933 3.35803 2.37868 3.87868C1.85803 4.39933 1.64588 5.108 1.55944 6.1875H16.4406C16.3541 5.108 16.142 4.39933 15.6213 3.87868C15.1007 3.35803 14.392 3.14588 13.3125 3.05944V1.875C13.3125 1.56434 13.0607 1.3125 12.75 1.3125C12.4393 1.3125 12.1875 1.56434 12.1875 1.875V3.00968C11.6886 3 11.1293 3 10.5 3H7.5C6.87072 3 6.31145 3 5.8125 3.00968V1.875Z" fill="#808080"/>
                    </svg>
                    <span>0d</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-white text-base font-acid font-medium leading-[24.44px]">Commission Earned</p>
                <p className="text-gfx-green-300 text-2xl font-acid mt-1">$0</p>
                <p className="text-[#A0A0A0] text-sm font-acid leading-[18.8px] mt-1">Bal <span className="ml-1">$0</span></p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </GlassCard>
  )
}

const TREND_PATH = 'M0,120 C40,110 80,100 120,95 C160,90 200,85 240,60 C280,35 320,50 360,55 C400,60 440,45 480,30 C520,15 560,35 600,40 C640,45 680,20 720,25 C760,30 800,10 840,15 C880,20 920,5 960,10'
const TREND_AREA = TREND_PATH + ' L960,130 L0,130 Z'

function MonthlyTrendCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-base font-acid font-medium leading-[24.44px]">Monthly Trend</h2>
          <span className="text-[#606060] text-sm font-acid">Last 12 months</span>
        </div>

        <div className="w-full overflow-hidden" style={{ height: '160px' }}>
          <svg width="100%" height="100%" viewBox="0 0 960 140" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00B38C" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00B38C" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={TREND_AREA} fill="url(#trendGrad)" />
            <path d={TREND_PATH} fill="none" stroke="#00B38C" strokeWidth="2" />
          </svg>
        </div>

        <div className="flex justify-between mt-3">
          {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
            <span key={m} className="text-[#606060] text-xs font-acid">{m}</span>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

function StatBannerCard({ label, value }: { label: string; value: string; color: string }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6 min-h-[7rem] flex flex-col justify-center">
        <p className="text-[#606060] text-sm font-acid">{label}</p>
        <p className="text-white text-3xl font-acid mt-1">{value}</p>
      </div>
    </GlassCard>
  )
}

const CALENDAR_TABS = ['Commissions', 'Withdrawals', 'Net', 'Total']

function CommissionCalendarSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(5)

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const weeks: (number | null)[][] = []
  let week: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) week.push(-(prevMonthDays - firstDay + 1 + i))
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d)
    if (week.length === 7) { weeks.push(week); week = [] }
  }
  if (week.length > 0) {
    let next = 1
    while (week.length < 7) week.push(-(next++))
    weeks.push(week)
  }

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-[1.5rem] font-acid font-medium leading-[2rem]">Partner Commission Calendar</h2>
          <div className="w-sm">
            <ModeToggle options={CALENDAR_TABS} activeIndex={activeTab} onChange={setActiveTab} size="sm" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-8 mb-6">
          <p className="text-white text-lg font-acid mb-2">No data yet</p>
          <p className="text-[#606060] text-sm font-acid">You have not earned any commissions yet.</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={prevMonth} className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Previous month">
              <ChevronLeftIcon />
            </button>
            <h3 className="text-white text-[1.125rem] font-acid">{MONTHS[month]} {year}</h3>
            <button onClick={nextMonth} className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Next month">
              <ChevronRightIcon />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#606060] text-[0.875rem] font-acid">0 commissions this month</span>
            <span className="inline-flex items-center px-5 py-2.5 rounded-[2rem] border border-[#303030] text-[#ECECEC] text-[0.875rem] font-acid">Total:$0.00</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: '800px' }}>
            <thead>
              <tr>
                {DAYS.map(day => (
                  <th key={day} className="text-[#606060] text-sm font-acid font-medium pb-3 text-center" style={{ width: '12.5%' }}>{day}</th>
                ))}
                <th className="text-[#606060] text-sm font-acid font-medium pb-3 text-center" style={{ width: '12.5%' }}>Week Total</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((w, wi) => (
                <tr key={wi}>
                  {w.map((d, di) => {
                    const isOverflow = d !== null && d < 0
                    const dayNum = d !== null ? Math.abs(d) : null
                    return (
                      <td key={di} className="p-1">
                        <div className={`rounded-lg h-[90px] px-3 py-3 relative border ${isOverflow ? 'bg-gfx-green-900 border-gfx-green-200' : 'bg-transparent border-gfx-green-200'}`}>
                          <span className={`absolute top-2 right-3 text-sm font-acid ${isOverflow ? 'text-[#404040]' : 'text-[#606060]'}`}>{dayNum}</span>
                        </div>
                      </td>
                    )
                  })}
                  <td className="p-1">
                    <div className="bg-gfx-green-800 rounded-lg h-[90px] px-3 py-3 flex flex-col items-center justify-center border border-gfx-neutral-200">
                      <span className="text-[#606060] text-sm font-acid">Week {wi + 1}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GlassCard>
  )
}

const GROWTH_PATH = 'M0,100 C60,95 120,90 180,80 C240,70 300,75 360,60 C420,45 480,55 540,40 C600,25 660,30 720,20'
const GROWTH_AREA = GROWTH_PATH + ' L720,110 L0,110 Z'

function SymbolExposureCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />
        <h2 className="text-white text-base font-acid font-medium leading-[24.44px] mb-6">Symbol Exposure</h2>

        <div className="bg-[#0C1311] rounded-[18.56px] border-1 border-[#0C1311] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)] overflow-hidden p-6">
          <div className="flex items-center gap-4 mb-4">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" className="shrink-0 rounded-full">
              <g clipPath="url(#xau-clip)">
                <path d="M0 0H38V38H0V0Z" fill="#D69A00" />
                <path d="M14.42 14.626h9.353l-1.364-3.66a1.16 1.16 0 0 0-.278-.435L14.42 14.626Zm-.026-4.344c.331-.89 1.06-1.462 1.863-1.462h5.531c.804 0 1.532.571 1.864 1.462l1.363 3.66c.41 1.097-.25 2.343-1.241 2.343H14.273c-.99 0-1.651-1.245-1.242-2.343l1.364-3.66Zm-7.448 13.844h9.335l-1.364-3.66a1.16 1.16 0 0 0-.278-.435L6.946 24.126Zm-.026-4.344c.332-.89 1.061-1.462 1.864-1.462h5.513c.803 0 1.532.571 1.864 1.462l1.363 3.66c.41 1.097-.25 2.343-1.242 2.343H6.799c-.99 0-1.651-1.245-1.242-2.343l1.364-3.66Zm24.354 4.344h-9.398l7.756-4.034c.121.086.22.214.28.375l1.362 3.66Zm-7.56-5.806c-.803 0-1.533.571-1.864 1.462l-1.363 3.66c-.41 1.097.25 2.343 1.242 2.343h9.546c.99 0 1.65-1.245 1.241-2.343l-1.364-3.66c-.33-.89-1.06-1.462-1.863-1.462h-5.576Z" fill="white" />
              </g>
              <defs><clipPath id="xau-clip"><rect width="38" height="38" rx="19" fill="white" /></clipPath></defs>
            </svg>
            <span className="text-white text-base font-acid font-medium leading-[24.44px]">XAUUSD</span>
          </div>
          <p className="text-white text-xs font-acid leading-[1.175rem] mb-3">45.2 Lots</p>
          <div className="relative w-full h-1 bg-[#09241C] rounded-full">
            <div className="absolute left-0 top-0 h-1 w-[37%] bg-[#0A714F] rounded-full" />
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

function ReferralGrowthCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-base font-acid font-medium leading-[24.44px]">Referral Growth</h2>
          <PeriodPill periods={['1M', '3M', '6M', '1Y']} defaultActive="6M" />
        </div>

        <div className="w-full overflow-hidden" style={{ height: '120px' }}>
          <svg width="100%" height="100%" viewBox="0 0 720 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00B38C" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00B38C" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={GROWTH_AREA} fill="url(#growthGrad)" />
            <path d={GROWTH_PATH} fill="none" stroke="#00B38C" strokeWidth="2" />
          </svg>
        </div>

        <div className="flex justify-between mt-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
            <span key={m} className="text-[#606060] text-xs font-acid">{m}</span>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export default function StatisticsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  const breadcrumbItems = [
    { label: 'Statistics', current: true },
  ]

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 flex flex-col gap-4 3xl:gap-6 4xl:gap-8 pb-20">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <h1 className="text-5xl font-acid text-white pb-15">Partner Statistics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 3xl:gap-6">
          <div className="flex flex-col gap-4 3xl:gap-6">
            <RevenueCard />
            <MonthlyTrendCard />
          </div>
          <div className="flex flex-col">
            <div className="flex-1 [&>*]:h-full">
              <TopReferralsCard />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 3xl:gap-6">
          <StatBannerCard label="Referral Received" value="+$0.00" color="#00B38C" />
          <StatBannerCard label="Referral Withdrawals" value="$0.00" color="#00B38C" />
          <StatBannerCard label="Commission Earned" value="+$0.00" color="#00B38C" />
        </div>

        <CommissionCalendarSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 3xl:gap-6">
          <SymbolExposureCard />
          <ReferralGrowthCard />
        </div>
      </div>
    </>
  )
}
