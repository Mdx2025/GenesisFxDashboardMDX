<script>
  /** @type {{ data: Array<{wickTop: number, body: number, wickBottom: number, bullish: boolean}>, height?: number }} */
  let { data = [], height = 48 } = $props();
</script>

<div class="flex items-center gap-2 justify-center" style="height: {height}px" role="img" aria-label="Candlestick chart">
  {#each data as candle}
    {@const color = candle.bullish ? 'var(--color-gfx-green-500, #10BC83)' : 'var(--color-gfx-red, #ff717e)'}
    <div class="flex flex-col items-center" aria-hidden="true">
      <div style="width: 1px; height: {candle.wickTop}px; background: {color};"></div>
      <div style="width: 10px; height: {candle.body}px; border-radius: 2px; background: {color}; box-shadow: 0 0 {candle.bullish ? 8 : 7}px {color};"></div>
      <div style="width: 1px; height: {candle.wickBottom}px; background: {color};"></div>
    </div>
  {/each}
</div>
