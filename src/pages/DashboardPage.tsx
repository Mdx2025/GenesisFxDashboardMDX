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
        <div className="px-4 xl:px-5 2xl:px-7 3xl:px-10 py-4 max-w-[2400px]">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <GreetingRow />
          <SummaryCards />
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 3xl:gap-6 mb-4">
            <div className="xl:col-span-3 flex flex-col">
              <PortfolioEquity />
            </div>
            <div className="xl:col-span-1 flex flex-col">
              <QuickActions />
            </div>
          </div>
          <TradingAccountsTable />
        </div>
      </main>
    </div>
  )
}
