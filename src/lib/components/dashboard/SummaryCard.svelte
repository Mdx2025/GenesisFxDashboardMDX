<script>
  import { GlassCard } from '$components/ui';
  import { MoreDotsIcon } from '$icons';

  /** @type {{ title: string, value: string, changeText: string, changeColor?: 'green' | 'red' | 'amber', children?: import('svelte').Snippet }} */
  let { title, value, changeText, changeColor = 'green', children } = $props();

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

<GlassCard variant="light" divider="white" rounded="19px">
  <div class="p-4">
    <div class="flex items-center justify-between mb-3">
      <span class="text-body2 uppercase tracking-[2.32px] font-bold text-gfx-neutral-500">{title}</span>
      <button class="text-gfx-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded" aria-label="More options for {title}">
        <MoreDotsIcon />
      </button>
    </div>

    <div class="text-[28px] text-white font-normal mb-2">{value}</div>

    <div class="flex items-center gap-1.5 mb-3">
      <svg width="10" height="10" viewBox="0 0 12 10" fill={fillColors[changeColor]} aria-hidden="true">
        <path d={changeColor === 'red' ? triangleDown : triangleUp}/>
      </svg>
      <span class="text-body2 font-medium {colorClasses[changeColor]}">{changeText}</span>
    </div>

    {#if children}
      {@render children()}
    {/if}
  </div>
</GlassCard>
