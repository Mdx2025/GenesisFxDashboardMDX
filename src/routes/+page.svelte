<script>
  import Sidebar from '$components/dashboard/Sidebar.svelte';
  import TopBar from '$components/dashboard/TopBar.svelte';
  import GreetingRow from '$components/dashboard/GreetingRow.svelte';
  import SummaryCards from '$components/dashboard/SummaryCards.svelte';
  import PortfolioEquity from '$components/dashboard/PortfolioEquity.svelte';
  import QuickActions from '$components/dashboard/QuickActions.svelte';
  import TradingAccountsTable from '$components/dashboard/TradingAccountsTable.svelte';
</script>

<div class="flex w-full min-h-screen bg-gfx-main text-white font-acid">
  <Sidebar />

  <main class="flex-1 overflow-y-auto h-screen">
    <div class="px-7 py-4">
      <TopBar />
      <GreetingRow />
      <SummaryCards />

      <div class="flex gap-5 mb-4 items-stretch">
        <div class="flex-1 min-w-0 flex flex-col">
          <PortfolioEquity />
        </div>
        <div class="w-[280px] shrink-0 flex flex-col">
          <QuickActions />
        </div>
      </div>

      <TradingAccountsTable />
    </div>
  </main>
</div>
