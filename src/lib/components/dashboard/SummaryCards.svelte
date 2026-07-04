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
      <div class="relative overflow-hidden bg-white/5 rounded-2xl shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.2),inset_0px_1.16px_0px_1.16px_rgba(255,255,255,0.04)] outline outline-1 outline-offset-[-1.16px] outline-white/5 backdrop-blur-xl">
        <div class="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
        <div class="absolute w-[493px] h-72 -left-[72px] -bottom-10 rounded-full blur-[157px] pointer-events-none {glowPattern[i] === 'green' ? 'bg-green-900' : 'bg-stone-900'}" aria-hidden="true"></div>

        <div class="relative z-10 p-5 flex flex-col h-full">
          <div class="flex items-center justify-between mb-3">
            <span class="text-body2 uppercase tracking-[2.32px] font-bold text-gfx-neutral-500">{card.title}</span>
            <span class="text-gfx-green-500 text-body1 font-medium">{card.totalValue}</span>
          </div>

          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-[36px] text-white font-normal">{card.value}</span>
            <span class="text-gfx-green-500 text-body2 font-medium flex items-center gap-1">
              <GreenDot size={6} />
              {card.change}
            </span>
          </div>

          <div class="mt-auto">
            <MiniBarChart data={[{value: 40}, {value: 60}, {value: 35}]} className="h-10" />
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-white/5">
            <span class="text-gfx-neutral-500 text-[11px]">{card.accountId}</span>
            <span class="text-gfx-neutral-500 text-[11px]">{card.accountId}</span>
            <span class="text-gfx-neutral-500 text-[11px]">{card.accountId}</span>
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
          <MiniBarChart data={card.chartData} className="h-16" />
        {:else if card.chartType === 'candlestick'}
          <CandlestickChart data={card.chartData} className="h-16" />
        {:else if card.chartType === 'area'}
          <AreaChart className="h-14" />
        {/if}
      </SummaryCard>
    {/if}
  {/each}
</div>
