<script>
  import { SparkleButton } from '$components/ui';
  import { DepositIcon, WithdrawIcon, TransferIcon } from '$icons';

  /** @type {{ userName?: string, date?: string, tagline?: string }} */
  let { userName = 'Marcelo', date = 'Friday, Apr 3', tagline = 'Born To Outperform' } = $props();
</script>

<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
  <div>
    <div class="text-gfx-neutral-500 text-body2 mb-1">{date}</div>
    <h1 class="text-[24px] xl:text-[28px] 2xl:text-[36px] text-white font-normal leading-none mb-1">Good afternoon, {userName}</h1>
    <div class="text-gfx-neutral-500 text-body2">{tagline}</div>
  </div>

  <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
    <SparkleButton>
      <span class="flex items-center gap-2">
        <DepositIcon />
        <span class="hidden sm:inline">Deposit</span>
      </span>
    </SparkleButton>
    <SparkleButton>
      <span class="flex items-center gap-2">
        <WithdrawIcon />
        <span class="hidden sm:inline">Withdraw</span>
      </span>
    </SparkleButton>
    <SparkleButton>
      <span class="flex items-center gap-2">
        <TransferIcon />
        <span class="hidden sm:inline">Transfer</span>
      </span>
    </SparkleButton>
  </div>
</div>
