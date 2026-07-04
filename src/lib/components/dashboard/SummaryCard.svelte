<script>
  import { MoreDotsIcon } from '$icons';

  /** @type {{ title: string, value: string, changeText: string, changeColor?: 'green' | 'red' | 'amber', glowColor?: 'green' | 'stone', children?: import('svelte').Snippet }} */
  let { title, value, changeText, changeColor = 'green', glowColor = 'green', children } = $props();

  const colorClasses = {
    green: 'text-gfx-green-500',
    red: 'text-gfx-red',
    amber: 'text-gfx-amber',
  };

  const fillColors = {
    green: 'var(--color-gfx-green-500, #10BC83)',
    red: 'var(--color-gfx-red, #ff717e)',
    amber: 'var(--color-gfx-amber, #e29d58)',
  };

  const triangleUp = 'M6 0L12 10H0Z';
  const triangleDown = 'M6 10L12 0H0Z';
</script>

<div class="summary-card relative overflow-hidden">
  <div class="divider-glow absolute top-0 left-[10%] right-[10%]"></div>

  <div class="glow-blob {glowColor === 'green' ? 'glow-green' : 'glow-stone'}" aria-hidden="true"></div>

  <div class="relative z-10 p-5">
    <div class="flex items-center justify-between mb-3">
      <span class="text-body2 uppercase tracking-[2.32px] font-bold text-gfx-neutral-500">{title}</span>
      <button class="text-gfx-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded" aria-label="More options for {title}">
        <MoreDotsIcon />
      </button>
    </div>

    <div class="text-[36px] text-white font-normal mb-1">{value}</div>

    <div class="flex items-center gap-1.5 mb-4">
      <svg width="10" height="10" viewBox="0 0 12 10" fill={fillColors[changeColor]} aria-hidden="true">
        <path d={changeColor === 'red' ? triangleDown : triangleUp}/>
      </svg>
      <span class="text-body2 font-medium {colorClasses[changeColor]}">{changeText}</span>
    </div>

    {#if children}
      <div class="mt-2">
        {@render children()}
      </div>
    {/if}
  </div>
</div>

<style>
  .summary-card {
    background: rgba(255,255,255,0.05);
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.05);
    backdrop-filter: blur(23px);
    -webkit-backdrop-filter: blur(23px);
    box-shadow:
      0px 4.64px 23.2px rgba(0,0,0,0.2),
      inset 0px 1.16px 0px 1.16px rgba(255,255,255,0.04);
  }

  .glow-blob {
    position: absolute;
    width: 493px;
    height: 288px;
    left: -72px;
    bottom: -40px;
    border-radius: 50%;
    filter: blur(157px);
    pointer-events: none;
  }

  .glow-green {
    background: #14532d;
  }

  .glow-stone {
    background: #1c1917;
  }
</style>
