<script>
  /** @type {{ accounts?: Array<{label: string, value: number}>, totalBalance?: string }} */
  let {
    accounts = [
      { label: 'L#1644545', value: 85 },
      { label: 'L#1644545', value: 90 },
      { label: 'L#1644545', value: 45 },
    ],
    totalBalance = '$90.254,58'
  } = $props();
</script>

<div class="relative overflow-hidden bg-white/5 rounded-2xl shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.2),inset_0px_1.16px_0px_1.16px_rgba(255,255,255,0.04)] outline outline-1 outline-offset-[-1.16px] outline-white/5 backdrop-blur-xl h-full">
  <div class="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
  <div class="absolute w-[493px] h-72 -left-[72px] top-[105px] rounded-full blur-[157px] pointer-events-none" style="background: rgba(16, 64, 48, 0.6)" aria-hidden="true"></div>

  <div class="relative z-10 flex flex-col h-full p-5">
    <!-- Header row -->
    <div class="flex items-start justify-between mb-1">
      <div class="text-sm font-normal font-acid leading-5 text-gfx-neutral-500">Live Accounts</div>
      <div class="text-sm font-medium font-acid text-gfx-neutral-300 bg-white/5 rounded-lg px-3 py-1">{totalBalance}</div>
    </div>

    <!-- Value row -->
    <div class="flex items-baseline gap-2 mb-4">
      <span class="text-4xl text-white font-normal font-acid">3</span>
      <span class="text-sm font-normal font-acid leading-5 text-gfx-green-500">Active</span>
    </div>

    <!-- Bar charts -->
    <div class="flex items-end gap-4 mt-auto flex-1">
      {#each accounts as account}
        <div class="flex-1 flex flex-col items-center gap-2">
          <div class="w-full h-full relative rounded-md bg-white/5 overflow-hidden min-h-[60px]">
            <div
              class="absolute bottom-0 left-0 right-0 rounded-md"
              style="height: {account.value}%; background: linear-gradient(to top, #064B34, #10BC83);"
            ></div>
          </div>
          <span class="text-[10px] font-acid text-gfx-neutral-500 whitespace-nowrap">{account.label}</span>
        </div>
      {/each}
    </div>
  </div>
</div>
