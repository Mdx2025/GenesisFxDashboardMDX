import { useState } from 'react'
import { TopBar } from '@/components/dashboard/TopBar'
import { BroadcasterTermsModal, BroadcastChannelCard, BroadcastChecklist, BroadcastPermissionsModal, BroadcastReadyHero, BroadcastSessionDetails, type BroadcastPermission } from '@/components/ui'
import { useSidebar } from '@/layouts/RootLayout'

type BroadcastStep = 'ready' | 'terms' | 'permissions'

export default function StartStreamingPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [step, setStep] = useState<BroadcastStep>('ready')
  const [permissions, setPermissions] = useState<BroadcastPermission[]>([])
  const [started, setStarted] = useState(false)

  function enable(permission: BroadcastPermission) {
    setPermissions((current) => current.includes(permission) ? current : [...current, permission])
  }

  return <div className="relative px-4 py-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 4xl:py-6" data-start-streaming-page data-start-streaming-step={step} data-stream-started={started}>
    <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} menuOpen={sidebarOpen} breadcrumbItems={[{ label: 'Streaming', href: '/streaming' }, { label: 'My channel', href: '/streaming/mystreaming' }, { label: 'Go live', current: true }]}/>
    <main className="pb-20 pt-[58px]">
      <BroadcastReadyHero/>
      <div className="mt-[15px] grid gap-[15px] 2xl:grid-cols-[minmax(0,842px)_minmax(0,691px)]">
        <BroadcastSessionDetails onGoLive={() => setStep('terms')}/>
        <div className="grid gap-[15px]"><BroadcastChannelCard/><BroadcastChecklist/></div>
      </div>
    </main>
    {step === 'terms' && (
      <BroadcasterTermsModal onCancel={() => setStep('ready')} onContinue={() => setStep('permissions')} />
    )}
    {step === 'permissions' && (
      <BroadcastPermissionsModal active={permissions} onEnable={enable} onCancel={() => setStep('ready')} onStart={() => setStarted(true)} />
    )}
    <span className="sr-only" aria-live="polite">{started ? 'Broadcast permissions granted. Streaming is ready to start.' : ''}</span>
  </div>
}
