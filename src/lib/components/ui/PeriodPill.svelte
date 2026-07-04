<script>
  import { browser } from '$app/environment';

  /** @type {{ periods?: string[], active?: string }} */
  let { periods = ['1D','1W','1M','3M','1Y','ALL'], active = 'ALL' } = $props();

  let selected = $state(active);
  let containerEl = $state(null);
  let indicatorX = $state(0);
  let indicatorW = $state(0);
  let ready = $state(false);

  function updateIndicator() {
    if (!containerEl) return;
    const btn = containerEl.querySelector('[data-active="true"]');
    if (!btn) return;
    const containerRect = containerEl.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    indicatorX = btnRect.left - containerRect.left;
    indicatorW = btnRect.width;
    ready = true;
  }

  $effect(() => {
    if (!browser || !containerEl) return;
    selected;
    requestAnimationFrame(updateIndicator);
  });
</script>

<div
  class="relative flex gap-0.5 rounded-[60px] bg-white/[0.03] p-0.5"
  role="group"
  aria-label="Time period selection"
  bind:this={containerEl}
>
  <!-- Sliding indicator -->
  <div
    class="absolute top-0.5 bottom-0.5 rounded-[60px] bg-teal-500/20 outline outline-[0.5px] outline-offset-[-0.5px] outline-teal-500 overflow-hidden pointer-events-none transition-all duration-300 ease-out {ready ? 'opacity-100' : 'opacity-0'}"
    style="transform: translateX({indicatorX}px); width: {indicatorW}px"
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
      data-active={selected === period}
      onclick={() => selected = period}
      aria-pressed={selected === period}
    >
      {period}
    </button>
  {/each}
</div>
