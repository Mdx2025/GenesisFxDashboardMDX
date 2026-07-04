<script>
  /** @type {{ periods?: string[], active?: string }} */
  let { periods = ['1D','1W','1M','3M','1Y','ALL'], active = 'ALL' } = $props();

  let selected = $state(active);
</script>

<div class="inline-flex items-center gap-1" role="group" aria-label="Time period selection">
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
</div>
