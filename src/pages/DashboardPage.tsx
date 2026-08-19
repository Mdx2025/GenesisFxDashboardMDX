import { useSidebar, useTransfer } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { Frame518Dashboard } from '@/components/dashboard/Frame518Dashboard'


export default function DashboardPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const { openTransfer } = useTransfer()

  return (
    <div className="relative min-h-dvh bg-gfx-sidebar px-4 pb-9 pt-3 xl:px-7">
      <div className="pointer-events-none absolute -left-76 -top-56 h-83 w-146.75 rounded-full bg-gfx-green-200/55 [filter:url(#blur-157)]" aria-hidden="true" />
      <div className="relative z-10">
        <TopBar menuOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(v => !v)} />
        <div className="mt-11">
          <Frame518Dashboard onTransferClick={openTransfer} />
        </div>
      </div>
    </div>
  )
}
