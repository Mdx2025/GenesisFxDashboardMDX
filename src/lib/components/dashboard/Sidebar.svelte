<script>
  import { NavButton, ModeToggle } from '$components/ui';
  import {
    DashboardIcon, AssetsIcon, TradelockerIcon, ChallengesIcon,
    PammIcon, MarketNewsIcon, AcademyIcon, LogoutIcon,
    ChevronDownIcon, ChevronLeftIcon
  } from '$icons';
  import { navItems } from '$data/navigation.js';
  import { sidebarOpen } from '$stores/ui.js';

  const iconMap = {
    dashboard: DashboardIcon,
    assets: AssetsIcon,
    tradelocker: TradelockerIcon,
    challenges: ChallengesIcon,
    pamm: PammIcon,
    news: MarketNewsIcon,
    academy: AcademyIcon,
  };

  let tradelockerOpen = $state(false);

  function closeSidebar() {
    sidebarOpen.set(false);
  }
</script>

<!-- Mobile backdrop -->
{#if $sidebarOpen}
  <div
    class="fixed inset-0 bg-black/60 z-40 lg:hidden"
    onclick={closeSidebar}
    role="presentation"
  ></div>
{/if}

<aside class="w-[240px] min-h-screen bg-[#000705] border-r border-[#1a1a1a] flex flex-col relative shrink-0 sticky top-0 h-screen overflow-y-auto
  fixed inset-y-0 left-0 z-50 transform transition-transform lg:translate-x-0 lg:relative lg:z-auto
  {$sidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
>
  <!-- Logo -->
  <div class="p-5 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#10BC83" fill-opacity="0.15"/>
        <path d="M10 16h12M16 10v12" stroke="#10BC83" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <div>
        <div class="text-white text-[15px] font-bold tracking-wide">GenFX</div>
        <div class="text-gfx-neutral-500 text-[10px]">AI-Powered Trading</div>
      </div>
    </div>
    <button class="text-gfx-neutral-500 hover:text-white transition-colors" onclick={closeSidebar}>
      <ChevronLeftIcon />
    </button>
  </div>

  <!-- User Account -->
  <div class="px-5 mb-4">
    <div class="text-[10px] text-gfx-neutral-500 uppercase tracking-[2px] mb-3 font-bold">User Account</div>
    <div class="flex items-center gap-3 p-3 rounded-[12px] border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)]">
      <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#10BC83] to-[#064B34] flex items-center justify-center text-white text-[13px] font-bold">M</div>
      <div>
        <div class="text-white text-[13px] font-medium">Marcelo Cedeno</div>
        <div class="text-gfx-neutral-500 text-[11px]">Sep 27th 2025</div>
      </div>
    </div>
  </div>

  <!-- Navigation -->
  <div class="px-5 flex-1">
    <div class="text-[10px] text-gfx-neutral-500 uppercase tracking-[2px] mb-3 font-bold">Overview</div>
    <nav class="flex flex-col gap-1">
      {#each navItems as item}
        {@const IconComponent = iconMap[item.icon]}
        <NavButton active={item.active} href={item.href}>
          {#if IconComponent}
            <IconComponent />
          {/if}
          <span>{item.label}</span>
          {#if item.submenu}
            <button
              class="ml-auto text-gfx-neutral-500 hover:text-white transition-colors"
              onclick={(e) => { e.stopPropagation(); tradelockerOpen = !tradelockerOpen; }}
            >
              <ChevronDownIcon />
            </button>
          {/if}
        </NavButton>
        {#if item.submenu && tradelockerOpen}
          <div class="ml-8 flex flex-col gap-1">
            {#each item.submenu as sub}
              <a href={sub.href} class="text-gfx-neutral-500 hover:text-white text-[13px] py-1.5 px-3 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                {sub.label}
              </a>
            {/each}
          </div>
        {/if}
      {/each}
    </nav>
  </div>

  <!-- Switch Modes -->
  <div class="px-5 mb-4">
    <div class="text-[10px] text-gfx-neutral-500 uppercase tracking-[2px] mb-3 font-bold">Switch Modes</div>
    <ModeToggle />
  </div>

  <!-- Logout -->
  <div class="px-5 pb-5">
    <NavButton>
      <LogoutIcon />
      <span class="text-red-400">Logout</span>
    </NavButton>
  </div>
</aside>
