<script>
  import { SparkleButton } from '$components/ui';
  import { DepositIcon, WithdrawIcon, TransferIcon } from '$icons';

  /** @type {{ userName?: string, date?: string, tagline?: string }} */
  let { userName = 'Marcelo', date = 'Friday, Apr 3', tagline = 'Born To Outperform' } = $props();
</script>

<div class="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4">
  <div>
    <div class="text-gfx-neutral-500 text-body2 mb-1">{date}</div>
    <h1 class="text-[36px] text-white font-normal leading-none mb-1">Good afternoon, {userName}</h1>
    <div class="text-gfx-neutral-500 text-body2">{tagline}</div>
  </div>

  <div class="flex items-center gap-3">
    <SparkleButton>
      <span class="flex items-center gap-2">
        <DepositIcon />
        Deposit
      </span>
    </SparkleButton>
    <SparkleButton>
      <span class="flex items-center gap-2">
        <WithdrawIcon />
        Withdraw
      </span>
    </SparkleButton>
    <SparkleButton>
      <span class="flex items-center gap-2">
        <TransferIcon />
        Transfer
      </span>
    </SparkleButton>
  </div>
</div>
