<script>
  import SummaryCard from './SummaryCard.svelte';
  import MiniBarChart from '$components/charts/MiniBarChart.svelte';
  import CandlestickChart from '$components/charts/CandlestickChart.svelte';
  import AreaChart from '$components/charts/AreaChart.svelte';
  import { GlassCard, GreenDot } from '$components/ui';
  import { MoreDotsIcon } from '$icons';
  import { summaryCards } from '$data/summary-cards.js';
</script>

<div class="flex gap-4 mb-4 flex-col md:flex-row">
  {#each summaryCards as card, i}
    {#if card.isCompact}
      <!-- Live Accounts card -->
      <div class="w-full md:w-[200px] md:shrink-0">
        <GlassCard variant="light" divider="white" rounded="19px">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-body2 uppercase tracking-[2.32px] font-bold text-gfx-neutral-500">{card.title}</span>
              <button class="text-gfx-neutral-500 hover:text-white transition-colors">
                <MoreDotsIcon />
              </button>
            </div>

            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-[28px] text-white font-normal">{card.value}</span>
              <span class="text-gfx-green-500 text-body2 font-medium flex items-center gap-1">
                <GreenDot size={6} />
                {card.change}
              </span>
            </div>

            <div class="mb-3">
              <MiniBarChart data={[{value: 40}, {value: 60}, {value: 35}]} maxHeight={32} />
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.04)]">
              <span class="text-gfx-neutral-500 text-[10px]">{card.accountId}</span>
              <span class="text-white text-body2 font-medium">{card.totalValue}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    {:else}
      <div class="flex-1">
        <SummaryCard
          title={card.title}
          value={card.value}
          changeText="{card.change}{card.changeLabel ? ` ${card.changeLabel}` : ''}"
          changeColor={card.changeColor}
        >
          {#if card.chartType === 'bar'}
            <MiniBarChart data={card.chartData} />
          {:else if card.chartType === 'candlestick'}
            <CandlestickChart data={card.chartData} />
          {:else if card.chartType === 'area'}
            <AreaChart />
          {/if}
        </SummaryCard>
      </div>
    {/if}
  {/each}
</div>
