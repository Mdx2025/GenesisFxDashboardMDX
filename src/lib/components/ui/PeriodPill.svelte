<script>
  import { browser } from '$app/environment';

  /** @type {{ periods?: string[], active?: string }} */
  let { periods = ['1D','1W','1M','3M','1Y','ALL'], active = 'ALL' } = $props();

  let selected = $state(active);
  /** @type {Record<string, HTMLButtonElement>} */
  let btnRefs = {};
  let containerEl = $state(null);
  let indicatorStyle = $state('opacity:0');

  function updateIndicator() {
    if (!containerEl) return;
    const btn = btnRefs[selected];
    if (!btn) return;
    const cRect = containerEl.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const x = bRect.left - cRect.left;
    const y = bRect.top - cRect.top;
    indicatorStyle = `transform:translate(${x}px,${y}px);width:${bRect.width}px;height:${bRect.height}px;opacity:1`;
  }

  $effect(() => {
    if (!browser || !containerEl) return;
    selected;
    requestAnimationFrame(updateIndicator);
  });
</script>

<div class="flex items-center gap-2">
  <div
    class="relative inline-flex items-center h-10 rounded-[60px] bg-[#1A1F1D] px-1"
    role="group"
    aria-label="Time period selection"
    bind:this={containerEl}
  >
    <div
      class="absolute rounded-[60px] bg-gfx-green-500/25 overflow-hidden pointer-events-none transition-all duration-300 ease-out outline outline-[0.50px] outline-offset-[-0.50px] outline-gfx-green-500/50"
      style={indicatorStyle}
    >
      <svg class="absolute left-1/2 -translate-x-1/2 bottom-0" width="54" height="33" viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g filter="url(#filter0_f_pill_glow)">
          <ellipse cx="27" cy="35" rx="14.5" ry="8" fill="#55FFC7"/>
        </g>
        <defs>
          <filter id="filter0_f_pill_glow" x="-27.5" y="-13" width="109" height="96" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur"/>
          </filter>
        </defs>
      </svg>
    </div>

    {#each periods as period}
      <button
        class="relative z-10 px-3.5 py-1.5 rounded-[60px] text-xs font-normal font-acid leading-5 cursor-pointer transition-colors duration-200
          {selected === period ? 'text-white' : 'text-gfx-neutral-300 hover:text-gfx-neutral-500'}"
        bind:this={btnRefs[period]}
        onclick={() => selected = period}
        aria-pressed={selected === period}
      >
        {period}
      </button>
    {/each}
  </div>

  <button
    class="size-9 flex items-center justify-center rounded-lg bg-white/[0.03] outline outline-1 outline-offset-[-1px] outline-white/5 text-white/35 hover:text-white/60 transition-colors focus-visible:outline-2 focus-visible:outline-gfx-green-500"
    aria-label="Select date range"
  >
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16.5 10.5V9C16.5 8.37072 16.5 7.81145 16.4903 7.3125H1.50968C1.5 7.81145 1.5 8.37072 1.5 9V10.5C1.5 13.3284 1.5 14.7426 2.37868 15.6213C3.25736 16.5 4.67157 16.5 7.5 16.5H10.5C13.3284 16.5 14.7426 16.5 15.6213 15.6213C16.5 14.7426 16.5 13.3284 16.5 10.5Z" fill="currentColor"/>
      <path d="M5.8125 1.875C5.8125 1.56434 5.56066 1.3125 5.25 1.3125C4.93934 1.3125 4.6875 1.56434 4.6875 1.875V3.05944C3.608 3.14588 2.89933 3.35803 2.37868 3.87868C1.85803 4.39933 1.64588 5.108 1.55944 6.1875H16.4406C16.3541 5.108 16.142 4.39933 15.6213 3.87868C15.1007 3.35803 14.392 3.14588 13.3125 3.05944V1.875C13.3125 1.56434 13.0607 1.3125 12.75 1.3125C12.4393 1.3125 12.1875 1.56434 12.1875 1.875V3.00968C11.6886 3 11.1293 3 10.5 3H7.5C6.87072 3 6.31145 3 5.8125 3.00968V1.875Z" fill="currentColor"/>
    </svg>
  </button>
</div>
