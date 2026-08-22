import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/dashboard/TopBar'
import { StreamingApplicationForm, StreamingApplicationGate } from '@/components/ui'
import { useSidebar } from '@/layouts/RootLayout'

type ApplicationView = 'required' | 'application'

export default function NewStreamingPage() {
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [view, setView] = useState<ApplicationView>('required')

  return (
    <div className="relative px-4 py-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 4xl:py-6" data-new-streaming-page data-new-streaming-state={view}>
      <TopBar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Streaming', href: '/streaming' },
          { label: 'My channel', href: '/streaming/mystreaming' },
          { label: 'Go live', current: true },
        ]}
      />
      <main className="pb-20 pt-[73px]">
        {view === 'required' ? (
          <StreamingApplicationGate onApply={() => setView('application')} onBack={() => navigate('/streaming')} />
        ) : (
          <StreamingApplicationForm />
        )}
      </main>
    </div>
  )
}
