import { GlassCard } from '@/components/ui'

interface LiveAccount {
  label: string
  value: number
}

interface LiveAccountsCardProps {
  accounts?: LiveAccount[]
  totalBalance?: string
}

export function LiveAccountsCard({
  accounts = [
    { label: 'L#1644545', value: 70 },
    { label: 'L#1644545', value: 45 },
    { label: 'L#1644545', value: 85 },
  ],
  totalBalance = '$90.254,58',
}: LiveAccountsCardProps) {
  return (
    <GlassCard variant="light" divider="white" rounded="16px" className="overflow-hidden h-full isolate [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
      <div
        className="absolute w-[493px] h-72 -left-[72px] top-[105px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col h-full px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-card-label text-gfx-neutral-500 mb-2 font-normal">Live Accounts</h3>
          <div className="px-2.5 py-1.5 bg-teal-700/25 rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-700 backdrop-blur-xs inline-flex justify-start items-start gap-1.5">
            <span className="text-white text-card-change font-normal leading-5">{totalBalance}</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 mb-2">
          <p className="text-card-value text-white">{accounts.length}</p>
          <span className="text-card-label text-gfx-neutral-500">Active</span>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[65%] sm:w-[55%] h-[65%] flex justify-between gap-0 sm:gap-3 px-3 sm:px-4 3xl:px-6 pb-2 sm:pb-3 3xl:pb-4">
        {accounts.map((acc, i) => {
          const align = i === 0 ? 'text-right' : i === accounts.length - 1 ? 'text-left' : 'text-center'
          return (
            <div key={i} className="flex-1 min-w-0 flex flex-col items-center gap-0.5 sm:gap-1">
              <div className="w-[2.5rem] flex-1 min-h-[2rem] bg-white/5 rounded-sm overflow-hidden flex items-end">
                <div
                  className="w-full rounded-t-sm bg-[linear-gradient(180deg,#10BC83_-44.07%,#0D271F_65.37%)]"
                  style={{ height: `${acc.value}%` }} /* dynamic value */
                />
              </div>
              <span
                className={`whitespace-nowrap ${align} text-xs ${i < 2 ? 'text-gfx-neutral-500' : 'text-white'}`}
              >{acc.label}</span>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
