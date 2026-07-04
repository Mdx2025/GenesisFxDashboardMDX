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
    { label: 'GFX', value: 70 },
    { label: '10X', value: 45 },
    { label: 'PSN', value: 85 },
  ],
  totalBalance = '$90.254,58',
}: LiveAccountsCardProps) {
  return (
    <div className="relative overflow-hidden bg-white/5 rounded-2xl shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.2),inset_0px_1.16px_0px_1.16px_rgba(255,255,255,0.04)] outline outline-1 outline-offset-[-1.16px] outline-white/5 backdrop-blur-xl h-[12.8125rem]">
      <div className="absolute top-0 left-[10%] right-[10%] h-px divider-glow" aria-hidden="true" />
      <div className="relative z-10 flex h-full p-4 sm:p-6">
        <div className="flex-1 flex flex-col">
          <h3 className="text-card-label text-gfx-neutral-500 mb-2 font-normal">Live Accounts</h3>
          <p className="text-card-value text-white mb-1">{accounts.length}</p>
          <span className="text-card-label text-gfx-neutral-500">Active</span>
        </div>
        <div className="flex items-end gap-2">
          {accounts.map((acc) => (
            <div key={acc.label} className="flex flex-col items-center gap-1">
              <div className="w-6 h-[72px] bg-white/5 rounded-sm overflow-hidden flex items-end">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${acc.value}%`,
                    background: 'linear-gradient(to top, #064B34, #10BC83)',
                  }}
                />
              </div>
              <span className="text-[9px] text-gfx-neutral-300">{acc.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
