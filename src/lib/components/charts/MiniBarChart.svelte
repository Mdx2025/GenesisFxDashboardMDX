<script>
  /** @type {{ data: Array<{value: number, label?: string}>, maxHeight?: number }} */
  let { data = [], maxHeight = 48 } = $props();

  let maxVal = $derived(Math.max(...data.map(d => d.value)));
</script>

<div class="flex items-end gap-3" style="height: {maxHeight}px" role="img" aria-label="Bar chart">
  {#each data as bar}
    <div class="flex flex-col items-center gap-1 flex-1" aria-hidden="true">
      <div class="w-full rounded-t-[4px]" style="height: {(bar.value / maxVal) * maxHeight}px; background: linear-gradient(180deg, #10BC83 0%, #064B34 100%);"></div>
      {#if bar.label}<span class="text-[9px] text-gfx-neutral-500">{bar.label}</span>{/if}
    </div>
  {/each}
</div>
