<script>
  import { GlassCard, ActionItem } from '$components/ui';
  import ServerTime from '$components/dashboard/ServerTime.svelte';
  import { DepositIcon, UserIcon, BookIcon } from '$icons';
  import { quickActions } from '$data/quick-actions.js';

  const iconMap = {
    deposit: DepositIcon,
    user: UserIcon,
    book: BookIcon,
  };
</script>

<GlassCard variant="heavy" divider="white" rounded="20px" className="h-full">
  <div class="absolute w-[300px] h-[200px] -right-[60px] -top-[60px] rounded-full blur-[120px] pointer-events-none" style="background: #104030" aria-hidden="true"></div>
  <div class="relative z-10 p-4 flex-1 flex flex-col">
    <div class="text-[16px] font-normal text-white mb-4">Quick Actions</div>

    <div class="flex flex-col gap-2 flex-1">
      {#each quickActions as action}
        {@const IconComponent = iconMap[action.icon]}
        <ActionItem title={action.title} subtitle={action.subtitle}>
          {#snippet icon()}
            {#if action.icon === 'chart'}
              <span class="text-lg">📊</span>
            {:else if IconComponent}
              <IconComponent />
            {/if}
          {/snippet}
        </ActionItem>
      {/each}
    </div>

    <ServerTime />
  </div>
</GlassCard>
