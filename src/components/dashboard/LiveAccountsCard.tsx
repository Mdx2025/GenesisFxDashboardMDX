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
    <div className="relative overflow-hidden bg-white/5 rounded-2xl shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.2),inset_0px_1.16px_0px_1.16px_rgba(255,255,255,0.04)] outline outline-1 outline-offset-[-1.16px] outline-white/5 backdrop-blur-xl aspect-[1.6/1]">
      <div className="absolute top-0 left-[10%] right-[10%] h-px divider-glow" aria-hidden="true" />
      <div className="relative z-10 flex flex-col h-full p-4 sm:p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-card-label text-gfx-neutral-500 font-normal">Live Accounts</h3>
          <div className="px-2.5 py-1.5 bg-teal-700/25 rounded-[20.83px] outline outline-1 outline-offset-[-1px] outline-neutral-700 backdrop-blur-xs inline-flex justify-start items-start gap-1.5">
            <span className="text-white text-xs font-normal leading-5">{totalBalance}</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="text-card-value text-white">{accounts.length}</p>
          <span className="text-card-label text-gfx-neutral-500">Active</span>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 h-[65%] flex gap-6 px-6 pb-4">
        {accounts.map((acc, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1 max-w-[60px]">
            <div className="w-full flex-1 bg-white/5 rounded-sm overflow-hidden flex items-end">
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${acc.value}%`,
                  background: 'linear-gradient(180deg, #10BC83 -44.07%, #0D271F 65.37%)',
                }}
              />
            </div>
            <span className="text-[0.75rem] text-white">{acc.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
