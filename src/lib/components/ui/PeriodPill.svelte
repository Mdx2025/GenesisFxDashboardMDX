<script>
  /** @type {{ periods?: string[], active?: string }} */
  let { periods = ['1D','1W','1M','3M','1Y','ALL'], active = 'ALL' } = $props();

  let selected = $state(active);
</script>

<div class="flex gap-1" role="group" aria-label="Time period selection">
  {#each periods as period}
    <button
      class="px-3.5 py-1.5 rounded-[60px] text-xs font-normal font-acid leading-5 cursor-pointer transition-all
        {selected === period
          ? 'bg-teal-500/20 text-white outline outline-[0.5px] outline-offset-[-0.5px] outline-teal-500 relative overflow-hidden'
          : 'bg-transparent text-gfx-neutral-300 border border-transparent hover:text-gfx-neutral-500'}"
      onclick={() => selected = period}
      aria-pressed={selected === period}
    >
      {period}
      {#if selected === period}
        <svg class="absolute left-1/2 -translate-x-1/2 bottom-0" width="54" height="33" viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g filter="url(#filter0_f_period_glow)">
            <ellipse cx="27" cy="35" rx="14.5" ry="8" fill="#55FFC7"/>
          </g>
          <defs>
            <filter id="filter0_f_period_glow" x="-27.5" y="-13" width="109" height="96" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur"/>
            </filter>
          </defs>
        </svg>
      {/if}
    </button>
  {/each}
</div>
