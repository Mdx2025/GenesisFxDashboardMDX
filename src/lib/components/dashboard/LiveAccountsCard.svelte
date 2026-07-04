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

  <div class="relative z-10 flex flex-col h-full">
    <!-- Header row: full width -->
    <div class="flex justify-between items-center px-5 pt-5">
      <div class="text-sm font-normal font-acid leading-5 text-gfx-neutral-500">Live Accounts</div>
      <div class="px-2.5 py-1.5 bg-teal-700/25 rounded-[20.83px] outline outline-1 outline-offset-[-1px] outline-neutral-700 backdrop-blur-xs inline-flex justify-start items-start gap-1.5">
        <span class="text-white text-xs font-normal font-acid leading-5">{totalBalance}</span>
      </div>
    </div>

    <!-- Body: text left + charts right -->
    <div class="flex flex-1">
      <div class="w-1/2 flex flex-col px-5 pb-4">
        <div class="flex items-baseline gap-2 mt-2">
          <span class="text-4xl text-white font-normal font-acid">3</span>
          <span class="text-sm font-normal font-acid leading-5 text-gfx-green-500">Active</span>
        </div>
      </div>

      <!-- Right: bar charts (50%) -->
      <div class="w-1/2 flex items-end gap-2 px-4 pb-4">
      {#each accounts as account}
        <div class="flex-1 flex flex-col items-center gap-1.5">
          <div class="w-full relative rounded-md bg-white/5 overflow-hidden h-[72px]">
            <div
              class="absolute bottom-0 left-0 right-0 rounded-md"
              style="height: {account.value}%; background: linear-gradient(to top, #064B34, #10BC83);"
            ></div>
          </div>
          <span class="text-[9px] font-acid text-gfx-neutral-500 whitespace-nowrap">{account.label}</span>
        </div>
      {/each}
      </div>
    </div>
  </div>
</div>
