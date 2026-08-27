import { useState } from 'react'
import { TopBar } from '@/components/dashboard/TopBar'
import { ShareAccountModal } from '@/components/modals/ShareAccountModal'
import { useSidebar } from '@/layouts/RootLayout'
import {
  ChannelHeroCard,
  ChannelMetricCard,
  EarningsActivityTable,
  EarningsSummary,
  MyStreamFollowerCard,
  MyStreamingTabs,
  MY_STREAMING_TABS,
  StreamCard,
} from '@/components/ui'

function MetricIcon({ type }: { type: 'live' | 'replay' | 'viewers' | 'wallet' }) {
  if (type === 'wallet') return <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true"><path d="M3 5.5h12.5A1.5 1.5 0 0 1 17 7v8H4.5A1.5 1.5 0 0 1 3 13.5v-8Zm0 0V4.8A1.8 1.8 0 0 1 4.8 3H14" stroke="currentColor" strokeWidth="1.4"/><circle cx="14" cy="10" r="1" fill="currentColor"/></svg>
  if (type === 'viewers') return <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true"><path d="M2.5 10s2.7-4 7.5-4 7.5 4 7.5 4-2.7 4-7.5 4-7.5-4-7.5-4Z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.4"/></svg>
  if (type === 'replay') return <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true"><path d="M4.2 6.4A7 7 0 1 1 3 10.3M4.2 3.8v2.6H1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="m8.4 7.5 4 2.5-4 2.5v-5Z" fill="currentColor"/></svg>
  return <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true"><rect x="3" y="4" width="11" height="12" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="m14 8 3-2v8l-3-2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
}

export default function MyStreamingPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeIndex, setActiveIndex] = useState(0)
  const [shareModal, setShareModal] = useState(false)
  const activeTab = MY_STREAMING_TABS[activeIndex]

  return (
    <div className="relative px-4 py-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 4xl:py-6" data-my-streaming-page data-my-streaming-state={activeTab.toLowerCase()}>
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} menuOpen={sidebarOpen} breadcrumbItems={[{ label: 'Streaming', href: '/streaming' }, { label: 'My channel', current: true }]} />
      <main className="pb-20 pt-[179px]">
        <ChannelHeroCard onShare={() => setShareModal(true)} />
        <div className="mt-[63px]"><MyStreamingTabs activeIndex={activeIndex} onChange={setActiveIndex} /></div>
        <section className="mt-10" aria-live="polite">
          {activeTab === 'Overview' && <div className="grid gap-[15px] sm:grid-cols-2 2xl:ml-1 2xl:w-[calc(100%-4px)] 2xl:grid-cols-4" data-channel-overview><ChannelMetricCard label="Active streams" value="0" icon={<MetricIcon type="live" />} /><ChannelMetricCard label="Total Replays" value="0" icon={<MetricIcon type="replay" />} /><ChannelMetricCard label="Peak Viewers" value="0" icon={<MetricIcon type="viewers" />} /><ChannelMetricCard label="Social Wallet" value="0" icon={<MetricIcon type="wallet" />} /></div>}
          {activeTab === 'Streams' && <div data-channel-streams><StreamCard variant="owner" /></div>}
          {activeTab === 'Replays' && <div data-channel-replays><StreamCard variant="owner" /></div>}
          {activeTab === 'Followers' && <div data-channel-followers><MyStreamFollowerCard /></div>}
          {activeTab === 'Earnings' && <div className="space-y-[61px]" data-channel-earnings><EarningsSummary /><EarningsActivityTable /></div>}
        </section>
      </main>
      <ShareAccountModal open={shareModal} onClose={() => setShareModal(false)} />
    </div>
  )
}
