import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppFeatureCard, GlassCard, InstallStepCard, PlatformTabs, type DownloadPlatform } from '@/components/ui'

function WifiIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 9.5a11 11 0 0115 0M7.5 12.5a6.7 6.7 0 019 0M10.4 15.5a2.8 2.8 0 013.2 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/></svg>
}

function BoltIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.2 2.8L5.6 13.1h5.2l-.2 8.1 7.8-11h-5.3l.1-7.4z"/></svg> }
function ShieldIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.7l8 3v5.8c0 5.1-3.4 8.6-8 10-4.6-1.4-8-4.9-8-10V5.7l8-3zm3.1 6.4l-4.2 4.2-2-2-1.4 1.4 3.4 3.4 5.6-5.6-1.4-1.4z"/></svg> }
function ShareIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 15V3m0 0L8 7m4-4l4 4M6 11v7a2 2 0 002 2h8a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function AddIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12 21a9 9 0 100-18 9 9 0 000 18zm1-13h-2v3H8v2h3v3h2v-3h3v-2h-3V8z" clipRule="evenodd"/></svg> }
function CheckIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12 21a9 9 0 100-18 9 9 0 000 18zm4.2-11.6l-5.1 5.2-2.8-2.8 1.4-1.4 1.4 1.4 3.7-3.8 1.4 1.4z" clipRule="evenodd"/></svg> }
function MenuIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg> }
function InstallIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 4h14a3 3 0 013 3v7a3 3 0 01-3 3h-5l-2 4-2-4H5a3 3 0 01-3-3V7a3 3 0 013-3zm6 3v5l-2-2-1.4 1.4 4.4 4.4 4.4-4.4L15 10l-2 2V7h-2z"/></svg> }
function MonitorIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="3"/><path d="M8 21h8v-2H8v2z"/></svg> }

const INSTALLATIONS: Record<DownloadPlatform, { title: string; steps: { icon: ReactNode; title: string; description: string }[] }> = {
  ios: { title: 'Iphone / Ipad Installation', steps: [
    { icon: <ShareIcon />, title: 'Tap the Share button', description: 'Open this page in Safari, then tap the Share icon at the bottom of the screen.' },
    { icon: <AddIcon />, title: 'Add to Home Screen', description: 'Scroll down in the share sheet and tap "Add to Home Screen".' },
    { icon: <CheckIcon />, title: 'Confirm & Launch', description: 'Tap “Add” - the app icon app' },
  ]},
  android: { title: 'Android Installation', steps: [
    { icon: <MenuIcon />, title: 'Tap the Share button', description: 'Tap the three-dot menu icon in the top-right corner of Chrome.' },
    { icon: <InstallIcon />, title: 'Add to Home Screen', description: 'Scroll down in the share sheet and tap "Add to Home Screen".' },
    { icon: <CheckIcon />, title: 'Confirm & Launch', description: 'Tap “Add” - the app icon app' },
  ]},
  desktop: { title: 'Android Installation', steps: [
    { icon: <MonitorIcon />, title: 'Use Chrome or Edge', description: 'Open this page in Google Chrome or Microsoft Edge.' },
    { icon: <InstallIcon />, title: 'Click Install', description: 'Click the install icon in the address bar, or use the button below.' },
    { icon: <CheckIcon />, title: 'Launch the App', description: 'The app opens in its own window and is added to your launcher.' },
  ]},
}

export default function DownloadPage() {
  const navigate = useNavigate()
  const [platform, setPlatform] = useState<DownloadPlatform>('ios')
  const installation = INSTALLATIONS[platform]

  return (
    <div className="min-h-dvh overflow-hidden rounded-[1.875rem] bg-gfx-sidebar pb-12" data-download-page>
      <header className="h-[7.625rem] border-b border-[#14231f]">
        <div className="mx-auto flex h-full w-[min(83.6875rem,calc(100%-2rem))] items-center xl:translate-x-[0.28125rem]">
          <button type="button" onClick={() => navigate('/home')} className="grid size-9.5 cursor-pointer place-items-center rounded-[0.639rem] bg-gfx-green-900 text-gfx-neutral-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-glow" aria-label="Back to home" data-download-back-home>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M11.25 14.25L6 9l5.25-5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <h1 className="ml-3.75 font-acid text-2xl font-normal leading-none text-white">Install GenesisFX</h1>
        </div>
      </header>

      <div className="mx-auto grid w-[min(83.6875rem,calc(100%-2rem))] grid-cols-1 gap-14 pt-[6.4375rem] xl:translate-x-[0.28125rem] xl:grid-cols-[36.5rem_43.5625rem] xl:items-start xl:justify-between">
        <section className="min-w-0" aria-labelledby="download-heading">
          <GlassCard divider="none" rounded="1.875rem" className="grid h-[9.625rem] w-[11.125rem] place-items-center overflow-hidden" data-download-logo-card>
            <span className="block h-[7.2rem] w-[6.45rem] overflow-hidden" aria-hidden="true">
              <img src="/images/genesis-logo.png" alt="" className="h-[7.2rem] w-auto max-w-none" />
            </span>
          </GlassCard>
          <h2 id="download-heading" className="mt-8 font-acid text-[3.125rem] font-normal leading-none text-[#f5f5f7]">Get the App</h2>
          <p className="mt-2 max-w-[36.5rem] font-acid text-sm leading-[1.175rem] text-[#9c9ca4]">Install on your iphone / ipad — instant access, offline support, no app store.</p>

          <div className="mt-8 space-y-3.75">
            <AppFeatureCard icon={<WifiIcon />} title="Offline Ready" description="Works without internet" />
            <AppFeatureCard icon={<BoltIcon />} title="Instant Launch" description="Opens in milliseconds" />
            <AppFeatureCard icon={<ShieldIcon />} title="Fully Secure" description="Bank-grade encryption" />
          </div>
          <p className="mt-6 font-acid text-xs leading-[1.175rem] text-[#8b8b93]">No download required. Works like a native app on any device.</p>
        </section>

        <GlassCard divider="none" rounded="1.5rem" className="relative min-h-[34.4375rem] overflow-hidden clip-radius px-[6.625rem] pb-12 pt-[4.375rem] max-md:px-4 xl:mt-[3.75rem]" data-install-panel>
          <div className="pointer-events-none absolute -bottom-36 left-1/2 h-56 w-[34rem] -translate-x-1/2 rounded-full bg-gfx-green-300/35 blur-[70px]" aria-hidden="true" />
          <img src="/images/pixels.png" alt="" className="pointer-events-none absolute bottom-0 left-1/2 w-[31.25rem] -translate-x-1/2 opacity-20 [clip-path:inset(72%_0_0_0)]" aria-hidden="true" />
          <div className="relative z-10 mx-auto w-full max-w-[30.25rem]">
            <PlatformTabs value={platform} onChange={setPlatform} />
            <h3 className="mt-8 font-acid text-base font-medium leading-[1.5275rem] text-gfx-neutral-400">{installation.title}</h3>
            <div className="mt-[1.125rem] space-y-1.5" role="tabpanel">
              {installation.steps.map((step, index) => <InstallStepCard key={`${platform}-${step.title}`} number={index + 1} {...step} />)}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
