<script>
  import SummaryCard from './SummaryCard.svelte';
  import MiniBarChart from '$components/charts/MiniBarChart.svelte';
  import CandlestickChart from '$components/charts/CandlestickChart.svelte';
  import AreaChart from '$components/charts/AreaChart.svelte';
  import { summaryCards } from '$data/summary-cards.js';

  const glowColors = ['#104030', '#241B1C', '#281E14', 'rgba(16, 64, 48, 0.6)'];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
  {#each summaryCards as card, i}
    <SummaryCard
      title={card.title}
      value={card.value}
      changeText="{card.change}{card.changeLabel ? ` ${card.changeLabel}` : ''}"
      changeColor={card.changeColor}
      glowColor={glowColors[i]}
    >
      {#if card.chartType === 'bar'}
        <MiniBarChart data={card.chartData} className="h-full" />
      {:else if card.chartType === 'candlestick'}
        <CandlestickChart data={card.chartData} className="h-full" />
      {:else if card.chartType === 'area'}
        <AreaChart color="#e29d58" className="h-full" />
      {:else if card.chartType === 'mini-bars'}
        <MiniBarChart data={[{value: 40}, {value: 60}, {value: 35}]} className="h-full" />
      {/if}
    </SummaryCard>
  {/each}
</div>
