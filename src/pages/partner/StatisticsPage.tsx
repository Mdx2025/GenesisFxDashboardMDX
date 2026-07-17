import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlowEllipse, ModeToggle, PeriodPill } from '@/components/ui'
import { TradingCalendar } from '@/components/ui/TradingCalendar'

function DollarCircleIcon({ size = 24, color = '#00B38C' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.15" />
      <path d="M12 6v1.5m0 9V18m3-6c0-1.657-1.343-3-3-3s-3 .672-3 1.5S10.343 12 12 12s3 .828 3 1.5-1.343 1.5-3 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

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
      <div className="relative p-6">
        <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />
        <div className="flex justify-between items-start mb-1">
          <p className="text-[#606060] text-sm font-acid">Revenue</p>
          <div className="w-[42px] h-[42px] rounded-xl bg-gfx-green-900 flex items-center justify-center">
            <DollarCircleIcon size={22} color="#00B38C" />
          </div>
        </div>
        <p className="text-white text-5xl font-acid leading-normal">$0.00</p>
        <p className="text-gfx-green-300 text-sm font-acid mt-1">This year: <span className="text-gfx-green-300">$0.00</span></p>

        <div className="grid grid-cols-3 gap-x-6 gap-y-5 mt-6 pt-6 border-t border-[#09241C]">
          <MiniStat label="Referrals" value="$0.00" />
          <MiniStat label="Clicks" value="$0.00" />
          <MiniStat label="Trading vol" value="$0.00" />
          <MiniStat label="Deposits" value="$0.00" />
          <MiniStat label="This year" value="$0.00" />
          <MiniStat label="2 Mo Ret" value="$0.00" />
        </div>
      </div>
    </GlassCard>
  )
}

function TopReferralsCard() {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6">
        <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />
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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-[47px] h-[47px] rounded-full bg-gfx-green-800 flex items-center justify-center shrink-0">
            <span className="text-gfx-green-500 text-[16.3px] font-acid">AP</span>
          </div>
          <div>
            <p className="text-white text-sm font-acid leading-[18.8px]">Ana Pinzón · <span className="text-[#606060]">All</span></p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {['AP', 'JD', 'MR'].map((initials, i) => (
            <div key={i} className="w-[32px] h-[32px] rounded-full bg-gfx-green-800 flex items-center justify-center border-2 border-gfx-dark">
              <span className="text-gfx-green-500 text-[10px] font-acid">{initials}</span>
            </div>
          ))}
          <div className="w-[32px] h-[32px] rounded-full bg-gfx-green-800 flex items-center justify-center border-2 border-gfx-dark">
            <span className="text-[#606060] text-[10px] font-acid">+2</span>
          </div>
        </div>

        <div className="border-t border-[#09241C] pt-4">
          <p className="text-[#606060] text-xs font-acid uppercase tracking-[1px]">Commission Earned</p>
          <p className="text-white text-2xl font-acid mt-1">$0.00</p>
        </div>
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
          <PeriodPill periods={['1M', '3M', '6M', '1Y']} defaultActive="1Y" />
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

function StatBannerCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
      <div className="relative p-6 flex items-center gap-5 min-h-[7rem]">
        <div className="w-[5rem] h-[5rem] rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '20' }}>
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
            <circle cx="17.5" cy="17.5" r="14" fill={color} fillOpacity="0.3" />
            <path d="M17.5 10v2.5m0 10V25m5-7.5c0-2.761-2.239-5-5-5s-5 1.119-5 2.5 2.239 2.5 5 2.5 5 1.381 5 2.5-2.239 2.5-5 2.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-[#606060] text-sm font-acid">{label}</p>
          <p className="text-white text-3xl font-acid mt-1">{value}</p>
        </div>
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

        <h2 className="text-white text-base font-acid font-medium leading-[24.44px] mb-6">Partner Commission Calendar</h2>

        <div className="flex flex-col items-center justify-center py-8 mb-6">
          <p className="text-white text-lg font-acid mb-2">No data yet</p>
          <p className="text-[#606060] text-sm font-acid">You have not earned any commissions yet.</p>
        </div>

        <div className="mb-6">
          <ModeToggle options={CALENDAR_TABS} activeIndex={activeTab} onChange={setActiveTab} size="sm" />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-white text-lg font-acid">{MONTHS[month]} {year}</h3>
            <span className="text-[#606060] text-sm font-acid">0 commissions this month</span>
            <span className="text-gfx-green-300 text-sm font-acid cursor-pointer hover:underline">View report</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#606060] text-sm font-acid">April {year}</span>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Previous month">
                <ChevronLeftIcon />
              </button>
              <button onClick={nextMonth} className="text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Next month">
                <ChevronRightIcon />
              </button>
            </div>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-base font-acid font-medium leading-[24.44px]">Symbol Exposure</h2>
          <PeriodPill periods={['1W', '1M', '3M', 'ALL']} defaultActive="ALL" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-[48px] h-[48px] rounded-full bg-[#FFD700] flex items-center justify-center shrink-0">
            <span className="text-black text-xs font-bold">Au</span>
          </div>
          <div>
            <p className="text-white text-sm font-acid font-medium">XAUUSD</p>
            <p className="text-[#606060] text-xs font-acid mt-0.5">All lots</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 3xl:gap-6">
          <RevenueCard />
          <TopReferralsCard />
        </div>

        <MonthlyTrendCard />

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
