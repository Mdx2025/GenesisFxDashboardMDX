<script>
  import Sidebar from '$components/dashboard/Sidebar.svelte';
  import TopBar from '$components/dashboard/TopBar.svelte';
  import GreetingRow from '$components/dashboard/GreetingRow.svelte';
  import SummaryCards from '$components/dashboard/SummaryCards.svelte';
  import PortfolioEquity from '$components/dashboard/PortfolioEquity.svelte';
  import QuickActions from '$components/dashboard/QuickActions.svelte';
  import TradingAccountsTable from '$components/dashboard/TradingAccountsTable.svelte';
</script>

<svelte:head>
  <title>Welcome to Genesis Fx</title>
</svelte:head>

<div class="flex w-full min-h-screen bg-gfx-main text-white font-acid">
  <Sidebar />

  <main class="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden">
    <div class="px-4 xl:px-5 2xl:px-7 py-4 max-w-[1600px]">
      <TopBar />
      <GreetingRow />
      <SummaryCards />

      <div class="flex flex-col xl:flex-row gap-5 mb-4 items-stretch">
        <div class="flex-1 min-w-0 flex flex-col">
          <PortfolioEquity />
        </div>
        <div class="xl:w-[280px] 2xl:w-[23rem] xl:shrink-0 flex flex-col">
          <QuickActions />
        </div>
      </div>

      <TradingAccountsTable />
    </div>
  </main>
</div>
