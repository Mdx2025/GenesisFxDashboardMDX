<script>
  import SummaryCard from './SummaryCard.svelte';
  import MiniBarChart from '$components/charts/MiniBarChart.svelte';
  import CandlestickChart from '$components/charts/CandlestickChart.svelte';
  import AreaChart from '$components/charts/AreaChart.svelte';
  import { GreenDot } from '$components/ui';
  import { MoreDotsIcon } from '$icons';
  import { summaryCards } from '$data/summary-cards.js';

  const glowPattern = ['green', 'stone', 'stone', 'green'];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
  {#each summaryCards as card, i}
    {#if card.isCompact}
      <!-- Live Accounts card -->
      <div class="summary-card relative overflow-hidden">
        <div class="divider-glow absolute top-0 left-[10%] right-[10%]"></div>
        <div class="glow-blob {glowPattern[i] === 'green' ? 'glow-green' : 'glow-stone'}" aria-hidden="true"></div>

        <div class="relative z-10 p-5">
          <div class="flex items-center justify-between mb-3">
            <span class="text-body2 uppercase tracking-[2.32px] font-bold text-gfx-neutral-500">{card.title}</span>
            <button class="text-gfx-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded" aria-label="More options for {card.title}">
              <MoreDotsIcon />
            </button>
          </div>

          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-[36px] text-white font-normal">{card.value}</span>
            <span class="text-gfx-green-500 text-body2 font-medium flex items-center gap-1">
              <GreenDot size={6} />
              {card.change}
            </span>
          </div>

          <div class="mb-3 mt-4 flex justify-end">
            <div class="w-1/2">
              <MiniBarChart data={[{value: 40}, {value: 60}, {value: 35}]} maxHeight={40} />
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.04)]">
            <span class="text-gfx-neutral-500 text-[11px]">{card.accountId}</span>
            <span class="text-white text-body1 font-medium">{card.totalValue}</span>
          </div>
        </div>
      </div>
    {:else}
      <SummaryCard
        title={card.title}
        value={card.value}
        changeText="{card.change}{card.changeLabel ? ` ${card.changeLabel}` : ''}"
        changeColor={card.changeColor}
        glowColor={glowPattern[i]}
      >
        {#if card.chartType === 'bar'}
          <MiniBarChart data={card.chartData} maxHeight={56} />
        {:else if card.chartType === 'candlestick'}
          <CandlestickChart data={card.chartData} height={56} />
        {:else if card.chartType === 'area'}
          <AreaChart height={56} />
        {/if}
      </SummaryCard>
    {/if}
  {/each}
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
