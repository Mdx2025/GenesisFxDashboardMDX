import { useSidebar, useTransfer } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GreetingRow } from '@/components/dashboard/GreetingRow'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { PortfolioEquity } from '@/components/dashboard/PortfolioEquity'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { TradingAccountsTable } from '@/components/dashboard/TradingAccountsTable'
import { FloatingNavBar } from '@/components/ui'

export default function DashboardPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const { openTransfer } = useTransfer()

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />
      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        <TopBar menuOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(v => !v)} />
        <GreetingRow onTransferClick={openTransfer} />
        <SummaryCards />
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 3xl:gap-6 4xl:gap-8 mb-4 4xl:mb-6">
          <div className="xl:col-span-3 flex flex-col">
            <PortfolioEquity />
          </div>
          <div className="xl:col-span-1 flex flex-col">
            <QuickActions />
          </div>
        </div>
        <TradingAccountsTable />
      </div>
      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingNavBar />
      </div>
    </>
  )
}
