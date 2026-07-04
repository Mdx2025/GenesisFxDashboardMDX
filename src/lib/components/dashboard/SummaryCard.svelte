<script>
  /** @type {{ title: string, value: string, changeText: string, changeColor?: 'green' | 'red' | 'amber', glowColor?: string, children?: import('svelte').Snippet }} */
  let { title, value, changeText, changeColor = 'green', glowColor = '#104030', children } = $props();

  const colorClasses = {
    green: 'text-gfx-green-500',
    red: 'text-gfx-red',
    amber: 'text-gfx-amber',
  };
</script>

<div class="relative overflow-hidden bg-white/5 rounded-2xl shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.2),inset_0px_1.16px_0px_1.16px_rgba(255,255,255,0.04)] outline outline-1 outline-offset-[-1.16px] outline-white/5 backdrop-blur-xl">
  <!-- Top divider glow -->
  <div class="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>

  <!-- Background glow blob -->
  <div class="absolute w-[493px] h-72 -left-[72px] top-[105px] rounded-full blur-[157px] pointer-events-none" style="background: {glowColor}" aria-hidden="true"></div>

  <div class="relative z-10 p-6">
    <div class="text-sm font-normal font-acid leading-5 text-gfx-neutral-500 mb-2">{title}</div>

    <div class="text-4xl text-white font-normal font-acid mb-2">{value}</div>

    <div class="flex items-center gap-1.5">
      <span class="text-xs font-bold {colorClasses[changeColor]}">{changeColor === 'red' ? '▼' : '▲'}</span>
      <span class="text-sm font-normal font-acid leading-5 {colorClasses[changeColor]}">{changeText}</span>
    </div>
  </div>

  {#if children}
    <div class="absolute bottom-0 right-0 w-1/2 h-1/2 z-10">
      {@render children()}
    </div>
  {/if}
</div>
