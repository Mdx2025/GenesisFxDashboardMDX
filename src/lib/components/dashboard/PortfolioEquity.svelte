<script>
  import { GlassCard, PeriodPill } from '$components/ui';
  import PortfolioChart from '$components/charts/PortfolioChart.svelte';
</script>

<GlassCard variant="heavy" divider="green" rounded="18px" className="h-full">
  <div class="p-5 flex flex-col h-full">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
      <div>
        <div class="text-body2 uppercase tracking-[2.32px] font-bold text-gfx-neutral-500 mb-2">Portfolio Equity</div>
        <div class="flex items-baseline gap-3">
          <span class="text-[28px] text-white font-normal">$17,897.30</span>
          <span class="text-gfx-green-500 text-body2 font-medium">+$6,437.21 (56.1%)</span>
        </div>
      </div>

      <PeriodPill />
    </div>

    <div class="flex-1 min-h-[200px]">
      <PortfolioChart />
    </div>
  </div>
</GlassCard>
