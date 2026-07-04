<script>
  import { GlassCard, SparkleButton, TradeButton, Badge, GreenDot, SearchInput } from '$components/ui';
  import { MoreDotsVerticalIcon } from '$icons';
  import { tradingAccounts } from '$data/trading-accounts.js';
</script>

<GlassCard variant="heavy" divider="white" rounded="19px">
  <div class="p-4">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-3">
        <span class="text-[16px] font-medium text-white">Trading Accounts</span>
        <Badge variant="status">2 ACTIVE</Badge>
      </div>
      <div class="flex items-center gap-3">
        <SearchInput placeholder="Search for" />
        <SparkleButton size="small">
          <span class="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            New Account
          </span>
        </SparkleButton>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full" aria-label="Trading accounts">
        <thead>
          <tr class="border-b border-gfx-card-border">
            <th scope="col" class="text-left text-tab uppercase text-gfx-neutral-500 font-medium py-3 pr-4">Account</th>
            <th scope="col" class="text-left text-tab uppercase text-gfx-neutral-500 font-medium py-3 pr-4">Platform</th>
            <th scope="col" class="text-left text-tab uppercase text-gfx-neutral-500 font-medium py-3 pr-4">Type</th>
            <th scope="col" class="text-right text-tab uppercase text-gfx-neutral-500 font-medium py-3 pr-4">Balance</th>
            <th scope="col" class="text-right text-tab uppercase text-gfx-neutral-500 font-medium py-3 pr-4">Equity</th>
            <th scope="col" class="text-right text-tab uppercase text-gfx-neutral-500 font-medium py-3 pr-4">Closed P&L</th>
            <th scope="col" class="text-right text-tab uppercase text-gfx-neutral-500 font-medium py-3 pr-4">Open P&L</th>
            <th scope="col" class="text-center text-tab uppercase text-gfx-neutral-500 font-medium py-3 pr-4">Status</th>
            <th scope="col" class="text-right text-tab uppercase text-gfx-neutral-500 font-medium py-3"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {#each tradingAccounts as row}
            <tr class="border-b border-[rgba(255,255,255,0.04)] hover:bg-gfx-card-bg transition-colors">
              <td class="py-3 pr-4">
                <div class="text-white text-body1 font-medium">{row.account}</div>
                <div class="text-gfx-neutral-500 text-body2">{row.username}</div>
              </td>
              <td class="py-3 pr-4 text-gfx-neutral-500 text-body1">{row.platform}</td>
              <td class="py-3 pr-4">
                <Badge variant={row.type}>{row.type === 'genfx' ? 'GenFX' : '10X'}</Badge>
              </td>
              <td class="py-3 pr-4 text-white text-body1 font-medium text-right">{row.balance}</td>
              <td class="py-3 pr-4 text-white text-body1 font-medium text-right">{row.equity}</td>
              <td class="py-3 pr-4 text-body1 font-medium text-right {row.closedPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}">{row.closedPL}</td>
              <td class="py-3 pr-4 text-body1 font-medium text-right {row.openPLColor === 'green' ? 'text-gfx-green-500' : 'text-gfx-red'}">{row.openPL}</td>
              <td class="py-3 pr-4">
                <div class="flex items-center justify-center gap-1.5">
                  <GreenDot size={6} />
                  <span class="text-gfx-green-500 text-body2 font-medium">{row.status}</span>
                </div>
              </td>
              <td class="py-3">
                <div class="flex items-center justify-end gap-2">
                  <button class="text-gfx-neutral-500 hover:text-white text-body2 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded px-1">View</button>
                  <TradeButton>Trade</TradeButton>
                  <button class="text-gfx-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded" aria-label="More options for {row.account}">
                    <MoreDotsVerticalIcon />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</GlassCard>
