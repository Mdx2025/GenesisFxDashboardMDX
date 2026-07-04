<script>
  import { GlassCard, ActionItem } from '$components/ui';
  import ServerTime from '$components/dashboard/ServerTime.svelte';
  import { DepositIcon, UserIcon, MarketNewsIcon, BookIcon } from '$icons';
  import { quickActions } from '$data/quick-actions.js';

  const iconMap = {
    deposit: DepositIcon,
    user: UserIcon,
    chart: MarketNewsIcon,
    book: BookIcon,
  };
</script>

<GlassCard variant="heavy" divider="white" rounded="20px" className="h-full">
  <div class="p-4 flex-1 flex flex-col">
    <div class="text-[16px] font-medium text-white mb-4">Quick Actions</div>

    <div class="flex flex-col gap-2 flex-1">
      {#each quickActions as action}
        {@const IconComponent = iconMap[action.icon]}
        <ActionItem title={action.title} subtitle={action.subtitle}>
          {#snippet icon()}
            {#if IconComponent}
              <IconComponent />
            {/if}
          {/snippet}
        </ActionItem>
      {/each}
    </div>

    <ServerTime />
  </div>
</GlassCard>
