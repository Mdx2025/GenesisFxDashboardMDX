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

<div
  class="relative inline-flex rounded-[60px] bg-white/[0.03] p-1"
  role="group"
  aria-label="Time period selection"
  bind:this={containerEl}
>
  <div
    class="absolute rounded-[60px] bg-teal-500/20 overflow-hidden pointer-events-none transition-all duration-300 ease-out"
    style={indicatorStyle}
  >
    <!-- Inverted fading border: solid top, fades toward bottom -->
    <div class="absolute inset-0 rounded-[60px] border border-teal-500 pointer-events-none" style="mask-image:linear-gradient(to bottom, white 0%, transparent 80%);-webkit-mask-image:linear-gradient(to bottom, white 0%, transparent 80%)" aria-hidden="true"></div>

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
