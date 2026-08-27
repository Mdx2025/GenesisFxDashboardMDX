import type { ReactNode } from 'react'
import { GlassBannerCard } from './GlassBannerCard'
import { GlassCard } from './GlassCard'
import { GlowButton } from './GlowButton'
import { GlowEllipse } from './GlowEllipse'
import { ModeToggle } from './ModeToggle'
import { SparkleButton } from './SparkleButton'

export const MY_STREAMING_TABS = ['Overview', 'Streams', 'Replays', 'Followers', 'Earnings'] as const
export type MyStreamingTab = (typeof MY_STREAMING_TABS)[number]

export function MyStreamingTabs({ activeIndex, onChange }: { activeIndex: number; onChange: (index: number) => void }) {
  return (
    <div className="w-[740px] max-w-full overflow-x-auto [&_.mode-toggle]:!h-[46px]" data-my-streaming-tabs>
      <ModeToggle options={[...MY_STREAMING_TABS]} activeIndex={activeIndex} onChange={onChange} />
    </div>
  )
}

function StartStreamingIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-[18px] text-black" fill="none" aria-hidden="true">
      <path d="M3.1 3.3A8.1 8.1 0 0 0 .6 9.1a8.1 8.1 0 0 0 2.6 5.9M14.8 3.4a8.1 8.1 0 0 1 2.4 5.7 8.1 8.1 0 0 1-2.5 5.8M5.5 5.8a4.7 4.7 0 0 0-1.4 3.3 4.7 4.7 0 0 0 1.5 3.4M12.4 5.8a4.7 4.7 0 0 1 1.4 3.3 4.7 4.7 0 0 1-1.5 3.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="m7.4 7.2 3.4 1.9-3.4 2V7.2Z" fill="currentColor" />
    </svg>
  )
}

function ShareIcon() {
  return <svg viewBox="0 0 18 18" className="size-[18px]" fill="none" aria-hidden="true"><path d="M6.8 5.2 9 3l2.2 2.2M9 3v8M4 8.3v5.2A1.5 1.5 0 0 0 5.5 15h7a1.5 1.5 0 0 0 1.5-1.5V8.3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function ChannelHeroCard() {
  return (
    <GlassBannerCard
      glowSrc={null}
      rounded="18.563px"
      className="h-[279px]"
      contentClassName="relative h-full"
      data-channel-hero
    >
      <div className="relative flex h-full flex-col justify-center gap-7 px-6 py-8 sm:px-10 xl:flex-row xl:items-start xl:justify-start xl:gap-9 xl:pb-0 xl:pt-[70px]">
        <span className="grid size-[73px] shrink-0 place-items-center rounded-[18px] border border-gfx-green-200 bg-gfx-surface-icon-well text-2xl text-gfx-green-300 xl:mt-[10px]" aria-hidden="true">J</span>
        <div className="min-w-0 xl:mt-[5px]">
          <p className="text-sm text-gfx-green-300">Your channel</p>
          <h1 className="mt-2 text-[50px] font-normal leading-none text-white">Joe doe</h1>
          <span className="mt-5 inline-flex h-9 items-center gap-3 rounded-[7px] border border-gfx-green-200 bg-gfx-green-900 px-4 text-sm text-white"><span className="text-gfx-green-300" aria-hidden="true">▣</span><span className="text-gfx-neutral-500">Wallet</span>$100.00</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 xl:ml-auto">
          <SparkleButton className="!h-[46px] !min-w-[139px] !rounded-[30px] px-5"><ShareIcon />Share</SparkleButton>
          <GlowButton label="Start streaming" icon={<StartStreamingIcon />} width={197} height={44} />
        </div>
      </div>
    </GlassBannerCard>
  )
}

export function ChannelMetricCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <GlassCard variant="light" divider="white" glow={false} rounded="18.563px" className="h-[148px] overflow-hidden clip-radius" data-channel-metric>
      <span className="theme-decorative-glow pointer-events-none absolute -bottom-32 -right-12 size-[260px] rounded-full bg-gfx-green-300/20 blur-[58px]" aria-hidden="true" />
      <div className="flex h-full items-center px-8">
        <div><p className="text-sm text-gfx-neutral-500">{label}</p><p className="mt-3 text-h2 leading-none text-white">{value}</p></div>
        <span className="ml-auto grid size-[42px] place-items-center rounded-[12px] border border-gfx-green-200 bg-gfx-surface-icon-well text-gfx-green-300">{icon}</span>
      </div>
    </GlassCard>
  )
}

export function MyStreamFollowerCard() {
  return (
    <GlassCard variant="light" divider="white" glow={false} rounded="18.563px" className="h-[380px] w-full max-w-none overflow-hidden md:max-w-[374px]" data-follower-card>
      <div className="flex h-full flex-col p-6">
        <div className="flex items-center gap-4"><span className="grid size-[56px] place-items-center rounded-full bg-gfx-green-800 text-lg text-white">KC</span><div><h2 className="text-base text-white">K Dizzy Capital 1.0</h2><p className="mt-1 text-sm text-gfx-neutral-500">0 users · $0.0k AUM</p></div></div>
        <div className="mt-7 flex items-end justify-between"><div><p className="text-sm text-gfx-neutral-500">ROI</p><p className="mt-1 text-[30px] leading-none text-gfx-green-300">194.12%</p></div><span className="text-sm text-gfx-neutral-500">148D</span></div>
        <svg viewBox="0 0 326 78" className="mt-4 h-[78px] w-full" fill="none" aria-label="Follower performance increased to 194.12 percent"><path d="M2 67C26 61 31 65 51 52s28 11 48-5 26-4 45-14 25 6 46-3 29-19 49-8 27-9 45-12 27 3 40-7" stroke="#10BC83" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 67C26 61 31 65 51 52s28 11 48-5 26-4 45-14 25 6 46-3 29-19 49-8 27-9 45-12 27 3 40-7V78H2Z" fill="url(#follower-fill)" opacity=".22" /><defs><linearGradient id="follower-fill" x1="163" y1="0" x2="163" y2="78" gradientUnits="userSpaceOnUse"><stop stopColor="#10BC83"/><stop offset="1" stopColor="#10BC83" stopOpacity="0"/></linearGradient></defs></svg>
        <SparkleButton className="mt-auto !h-[46px] !w-[136px] !rounded-[30px] px-5">Details</SparkleButton>
      </div>
    </GlassCard>
  )
}

export function EarningsSummary() {
  return (
    <GlassCard variant="light" divider="none" glow={false} rounded="30px" className="earnings-summary-panel min-h-[304px] overflow-hidden" data-earnings-summary>
      <div className="grid min-h-[304px] gap-8 px-8 py-12 md:grid-cols-2 xl:px-20">
        <div><p className="text-2xl text-gfx-neutral-500">Social Wallet Balance</p><p className="mt-5 text-[50px] leading-none text-white">$0.00</p><p className="mt-8 max-w-[573px] text-2xl leading-8 text-gfx-neutral-500">Earnings from tips, subs, and copy trading follow-through</p></div>
        <div><p className="text-2xl text-gfx-neutral-500">Total Donations Received</p><div className="mt-5 flex flex-wrap items-center gap-6"><p className="text-[50px] leading-none text-white">$0.00</p><GlowButton label="Transfer to main wallet" width="auto" height={44} /></div><p className="mt-8 text-2xl text-gfx-neutral-500">Lifetime tips from your streams</p></div>
      </div>
    </GlassCard>
  )
}

export function EarningsActivityTable() {
  return (
    <GlassCard variant="light" divider="none" glow={false} rounded="30px" className="overflow-hidden" data-earnings-activity>
      <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />
      <div className="relative z-10 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm"><thead className="h-[66px] border-b border-gfx-green-200 bg-[#002A1E]/80 text-gfx-neutral-500"><tr><th className="px-8 font-normal">Type</th><th className="px-8 font-normal">From</th><th className="px-8 font-normal">Detail</th><th className="px-8 font-normal">Date</th><th className="px-8 font-normal text-right">Amount</th></tr></thead><tbody><tr><td colSpan={5} className="h-[238px] text-center text-base text-gfx-neutral-500">No activity yet</td></tr></tbody></table>
      </div>
    </GlassCard>
  )
}
