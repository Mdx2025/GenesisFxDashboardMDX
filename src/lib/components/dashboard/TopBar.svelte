<script>
  import { Breadcrumb, GreenDot } from '$components/ui';
  import { HelpIcon } from '$icons';
  import { sidebarOpen } from '$stores/ui.js';
</script>

<header class="flex items-center justify-between mb-4 gap-2">
  <div class="flex items-center gap-3 min-w-0">
    <button
      class="lg:hidden text-gfx-neutral-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded shrink-0"
      onclick={() => sidebarOpen.set(true)}
      aria-label="Open navigation menu"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <Breadcrumb items={[{label: 'Overview'}, {label: 'Dashboard', current: true}]} />
  </div>

  <div class="flex items-center gap-2 sm:gap-4 shrink-0">
    <div class="flex items-center gap-2">
      <GreenDot size={6} />
      <span class="text-gfx-green-500 text-body2 font-medium hidden sm:inline">Markets Open</span>
    </div>

    <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gfx-card-border bg-gfx-card-bg">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1v2m0 8v2M1 7h2m8 0h2" stroke="#A0A0A0" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
      <span class="text-white text-body2 font-medium">$100.00</span>
    </div>

    <button
      class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gfx-card-border bg-gfx-card-bg text-gfx-neutral-500 text-body2 font-medium hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500"
      aria-label="Change language, currently English"
    >
      EN
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M2.5 3.75L5 6.25l2.5-2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <button
      class="text-gfx-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded"
      aria-label="Help"
    >
      <HelpIcon />
    </button>
  </div>
</header>
