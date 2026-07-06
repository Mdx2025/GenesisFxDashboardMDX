import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { GreetingRow } from '@/components/dashboard/GreetingRow'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { PortfolioEquity } from '@/components/dashboard/PortfolioEquity'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { TradingAccountsTable } from '@/components/dashboard/TradingAccountsTable'
import { TransferModal } from '@/components/dashboard/TransferModal'
import { TransferProcessingModal } from '@/components/dashboard/TransferProcessingModal'
import { FloatingNavBar, SuccessSnackbar } from '@/components/ui'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [processingOpen, setProcessingOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  return (
    <div className="flex w-full min-h-screen bg-gfx-main text-white font-acid">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />
        <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
          <TopBar menuOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(v => !v)} />
          <GreetingRow onTransferClick={() => setTransferOpen(true)} />
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
        {/* Mobile-only floating nav */}
        <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <FloatingNavBar onTransferClick={() => setTransferOpen(true)} />
        </div>
      </main>

      <TransferModal
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        onTransfer={() => {
          setTransferOpen(false)
          setProcessingOpen(true)
        }}
      />
      <TransferProcessingModal
        open={processingOpen}
        onClose={() => setProcessingOpen(false)}
        onComplete={() => {
          setProcessingOpen(false)
          setSnackbarOpen(true)
        }}
      />
      <SuccessSnackbar
        open={snackbarOpen}
        message="Transfer completed successfully"
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
