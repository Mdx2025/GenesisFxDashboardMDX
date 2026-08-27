import { useState } from 'react'
import { TopBar } from '@/components/dashboard/TopBar'
import {
  BroadcasterPip,
  ChartToolbar,
  StreamChartPanel,
  StreamChatPanel,
  StreamFollowButton,
  StreamHelpButton,
  StreamLikeChip,
  StreamTagChip,
  StreamTipChip,
  StreamViewersChip,
  StreamingLiveBadge,
  WatchControlToggle,
  type StreamChatMessage,
  type WatchChartType,
  type WatchTimeframe,
} from '@/components/ui'
import { useSidebar } from '@/layouts/RootLayout'

const CHAT_MESSAGES: StreamChatMessage[] = [
  { id: 'cryptokings', author: '@cryptokings', body: 'Hey', age: '5 minutes' },
]

export default function WatchStreamPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [timeframe, setTimeframe] = useState<WatchTimeframe>('15m')
  const [chartType, setChartType] = useState<WatchChartType>('bars')
  const [mode, setMode] = useState<'watch' | 'control'>('watch')
  const [followed, setFollowed] = useState(false)

  return (
    <div className="relative px-4 py-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 4xl:py-6" data-watch-stream-page data-watch-mode={mode}>
      <TopBar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[{ label: 'Live', href: '/streaming' }, { label: 'Stream Test', current: true }]}
      />
      <main className="pb-20 pt-[45px]">
        <ChartToolbar
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />

        <div className="mt-4">
          <StreamChartPanel>
            <BroadcasterPip className="absolute right-[5.29%] bottom-[6.83%]" />
          </StreamChartPanel>
        </div>

        <div className="mt-[43px] flex flex-wrap items-center gap-y-4">
          <StreamingLiveBadge tone="success" dot className="mt-[5px]">LIVE</StreamingLiveBadge>
          <span className="ml-[23px] text-base leading-[24.44px] font-medium text-white">Stream Test</span>
          <StreamTagChip className="ml-[25px]">Forex</StreamTagChip>
          <StreamViewersChip count={2} className="ml-[15px]" />

          <div className="ml-auto flex flex-wrap items-center gap-5">
            <WatchControlToggle mode={mode} onChange={setMode} />
            <StreamFollowButton followed={followed} onClick={() => setFollowed((value) => !value)} />
            <StreamTipChip />
            <StreamLikeChip count={0} />
            <StreamHelpButton />
          </div>
        </div>

        <div className="mt-[27px]">
          <StreamChatPanel messages={CHAT_MESSAGES} />
        </div>
      </main>
    </div>
  )
}
