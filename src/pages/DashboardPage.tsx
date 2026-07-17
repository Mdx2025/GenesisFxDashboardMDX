import { useSidebar, useTransfer } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GreetingRow } from '@/components/dashboard/GreetingRow'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { PortfolioEquity } from '@/components/dashboard/PortfolioEquity'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { TradingAccountsTable } from '@/components/dashboard/TradingAccountsTable'


export default function DashboardPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const { openTransfer } = useTransfer()

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />
      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        {/* Hero section — fits in viewport */}
        <div className="flex flex-col h-[calc(100vh-2rem)]">
          <TopBar menuOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(v => !v)} />
          <GreetingRow onTransferClick={openTransfer} />
          <div className="flex-1 min-h-0 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
            <SummaryCards />
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 3xl:gap-6 4xl:gap-8 flex-1 min-h-0">
              <div className="xl:col-span-3 flex flex-col min-h-0">
                <PortfolioEquity />
              </div>
              <div className="xl:col-span-1 flex flex-col min-h-0">
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
        {/* Below the fold — scrollable */}
        <TradingAccountsTable />
      </div>
    </>
  )
}
