import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { GreetingRow } from '@/components/dashboard/GreetingRow'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { PortfolioEquity } from '@/components/dashboard/PortfolioEquity'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { TradingAccountsTable } from '@/components/dashboard/TradingAccountsTable'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex w-full min-h-screen bg-gfx-main text-white font-acid">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden">
        <div className="px-4 xl:px-5 2xl:px-7 py-4 max-w-[1600px]">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <GreetingRow />
          <SummaryCards />
          <div className="flex flex-col xl:flex-row gap-5 mb-4 items-stretch">
            <div className="flex-1 min-w-0 flex flex-col">
              <PortfolioEquity />
            </div>
            <div className="xl:w-[280px] 2xl:w-[23rem] xl:shrink-0 flex flex-col">
              <QuickActions />
            </div>
          </div>
          <TradingAccountsTable />
        </div>
      </main>
    </div>
  )
}
