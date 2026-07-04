<script>
  /** @type {{ yLabels?: string[] }} */
  let { yLabels = ['$305','$253','$202','$150','$98'] } = $props();
</script>

<div class="relative h-[150px]">
  <div class="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gfx-neutral-500 pr-3">
    {#each yLabels as label}
      <span>{label}</span>
    {/each}
  </div>
  <div class="ml-10 h-full relative">
    <div class="absolute inset-0 flex flex-col justify-between">
      {#each yLabels as _}
        <div class="border-b border-[rgba(255,255,255,0.04)]"></div>
      {/each}
    </div>
    <svg width="100%" height="100%" viewBox="0 0 900 280" preserveAspectRatio="none" class="relative z-10">
      <defs>
        <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10BC83" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#10BC83" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0,250 C50,248 80,240 120,230 C160,220 200,210 240,195 C280,180 320,170 360,155 C400,140 440,125 480,115 C520,105 560,100 600,90 C640,80 680,70 720,55 C760,42 800,35 850,28 L900,20 V280 H0 Z" fill="url(#portfolioGrad)"/>
      <path d="M0,250 C50,248 80,240 120,230 C160,220 200,210 240,195 C280,180 320,170 360,155 C400,140 440,125 480,115 C520,105 560,100 600,90 C640,80 680,70 720,55 C760,42 800,35 850,28 L900,20" fill="none" stroke="#10BC83" stroke-width="2"/>
      <circle cx="720" cy="55" r="5" fill="#10BC83" stroke="#000" stroke-width="2"/>
    </svg>
    <div class="absolute top-0 bottom-0 border-l border-dashed border-[rgba(16,188,131,0.3)]" style="left: 80%;"></div>
  </div>
</div>
