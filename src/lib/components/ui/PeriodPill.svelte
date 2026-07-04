<script>
  /** @type {{ periods?: string[], active?: string }} */
  let { periods = ['1D','1W','1M','3M','1Y','ALL'], active = 'ALL' } = $props();

  let selected = $state(active);
</script>

<div class="inline-flex items-center gap-1 bg-[rgba(255,255,255,0.04)] rounded-full py-2 px-4" role="group" aria-label="Time period selection">
  {#each periods as period}
    <button
      class="px-3.5 py-1.5 rounded-[60px] text-xs font-normal font-acid leading-5 cursor-pointer transition-all duration-200
        {selected === period
          ? 'text-white bg-teal-500/20 outline outline-[0.50px] outline-offset-[-0.50px] outline-teal-500'
          : 'text-gfx-neutral-300 hover:text-white/60'}"
      onclick={() => selected = period}
      aria-pressed={selected === period}
    >
      {period}
    </button>
  {/each}

  <button class="ml-1 p-1.5 cursor-pointer transition-opacity duration-200 hover:opacity-80" aria-label="Select date range">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M16.5 10.5V9C16.5 8.37072 16.5 7.81145 16.4903 7.3125H1.50968C1.5 7.81145 1.5 8.37072 1.5 9V10.5C1.5 13.3284 1.5 14.7426 2.37868 15.6213C3.25736 16.5 4.67157 16.5 7.5 16.5H10.5C13.3284 16.5 14.7426 16.5 15.6213 15.6213C16.5 14.7426 16.5 13.3284 16.5 10.5Z" fill="white" fill-opacity="0.35"/>
      <path d="M5.8125 1.875C5.8125 1.56434 5.56066 1.3125 5.25 1.3125C4.93934 1.3125 4.6875 1.56434 4.6875 1.875V3.05944C3.608 3.14588 2.89933 3.35803 2.37868 3.87868C1.85803 4.39933 1.64588 5.108 1.55944 6.1875H16.4406C16.3541 5.108 16.142 4.39933 15.6213 3.87868C15.1007 3.35803 14.392 3.14588 13.3125 3.05944V1.875C13.3125 1.56434 13.0607 1.3125 12.75 1.3125C12.4393 1.3125 12.1875 1.56434 12.1875 1.875V3.00968C11.6886 3 11.1293 3 10.5 3H7.5C6.87072 3 6.31145 3 5.8125 3.00968V1.875Z" fill="white" fill-opacity="0.35"/>
    </svg>
  </button>
</div>
