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

{#if $sidebarOpen}
  <div
    class="fixed inset-0 bg-black/60 z-40 lg:hidden"
    onclick={closeSidebar}
    onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
    role="presentation"
  ></div>
{/if}

<aside
  class="sidebar w-[260px] 2xl:w-xs min-h-screen bg-black border-r border-zinc-900 flex flex-col shrink-0 h-screen overflow-hidden p-5 2xl:p-6
  fixed inset-y-0 left-0 z-50 transition-transform lg:sticky lg:top-0 lg:translate-x-0 lg:relative lg:z-auto
  {$sidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
  aria-label="Main navigation"
>
  <!-- Top glow -->
  <div class="sidebar-top-glow" aria-hidden="true"></div>

  <!-- Logo -->
  <div class="relative z-10">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="/genfx-logo.png" alt="GenesisFX" class="h-8 w-auto" />
      </div>
      <button
        class="w-8 h-8 rounded-[10px] bg-emerald-950 flex items-center justify-center text-zinc-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500"
        onclick={closeSidebar}
        aria-label="Close sidebar"
      >
        <ChevronLeftIcon />
      </button>
    </div>
    <span class="text-white text-[14px]">AI-Powered Trading</span>
  </div>

  <!-- Divider -->
  <div class="w-full py-4" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 269 2" fill="none"><path d="M0.511368 0.51136H268.466" stroke="url(#paint0_linear_2533_1364_1)" stroke-width="1.02273" stroke-linecap="round"></path><defs><linearGradient id="paint0_linear_2533_1364_1" x1="7.67046" y1="1.01136" x2="268.466" y2="1.01136" gradientUnits="userSpaceOnUse"><stop stop-color="#0F221C"></stop><stop offset="0.562406" stop-color="#005C3D"></stop><stop offset="1" stop-color="#0F221C"></stop></linearGradient></defs></svg></div>

  <!-- User Account -->
  <div class="relative z-10 mb-2">
    <div class="text-[14px] text-gfx-neutral-300 mb-3">User Account</div>
    <div class="user-card flex items-center gap-3 p-3 rounded-2xl bg-zinc-950 outline outline-1 outline-offset-[-1px] outline-zinc-900 relative overflow-hidden">
      <div class="user-card-glow" aria-hidden="true"></div>
      <div class="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-[200px] h-[80px] rounded-full blur-[80px] pointer-events-none" style="background: #104030" aria-hidden="true"></div>
      <div class="relative z-10 w-9 h-9 rounded-2xl bg-teal-950 flex items-center justify-center text-white text-[16px] overflow-hidden">
        <svg class="absolute top-[-4px] left-[9px]" width="37" height="37" viewBox="0 0 37 37" fill="none" aria-hidden="true">
          <ellipse cx="18.5" cy="1.5" rx="9.5" ry="5.5" fill="#4CFFC4" filter="blur(30px)"/>
        </svg>
        <span class="relative z-10">M</span>
      </div>
      <div class="relative z-10">
        <div class="text-white text-[14px] leading-5">Marcelo Cedeno</div>
        <div class="text-gfx-neutral-300 text-[14px] leading-5">Sep 27th, 2025</div>
      </div>
    </div>
  </div>

  <!-- Divider -->
  <div class="w-full py-4" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 269 2" fill="none"><path d="M0.511368 0.51136H268.466" stroke="url(#paint0_linear_2533_1364_2)" stroke-width="1.02273" stroke-linecap="round"></path><defs><linearGradient id="paint0_linear_2533_1364_2" x1="7.67046" y1="1.01136" x2="268.466" y2="1.01136" gradientUnits="userSpaceOnUse"><stop stop-color="#0F221C"></stop><stop offset="0.562406" stop-color="#005C3D"></stop><stop offset="1" stop-color="#0F221C"></stop></linearGradient></defs></svg></div>

  <!-- Navigation -->
  <div class="relative z-10 flex-1 overflow-y-auto">
    <div class="text-[14px] text-gfx-neutral-300 mb-3">Overview</div>
    <nav aria-label="Main menu">
      <ul class="flex flex-col gap-1.5" role="list">
        {#each navItems as item}
          {@const IconComponent = iconMap[item.icon]}
          <li>
            <NavButton active={item.active} href={item.href}>
              {#if IconComponent}
                <IconComponent />
              {/if}
              <span>{item.label}</span>
              {#if item.submenu}
                <button
                  class="ml-auto text-gfx-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded p-1"
                  onclick={(e) => { e.stopPropagation(); tradelockerOpen = !tradelockerOpen; }}
                  aria-expanded={tradelockerOpen}
                  aria-label="Toggle {item.label} submenu"
                >
                  <ChevronDownIcon />
                </button>
              {/if}
            </NavButton>
          </li>
          {#if item.submenu && tradelockerOpen}
            <li>
              <ul class="flex flex-col gap-0" role="list">
                {#each item.submenu as sub}
                  <li>
                    <a href={sub.href} class="text-gfx-neutral-500 hover:text-white text-[14px] py-2.5 px-10 hover:bg-[rgba(255,255,255,0.03)] transition-colors block focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500 rounded-lg">
                      {sub.label}
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {/if}
        {/each}
      </ul>
    </nav>
  </div>

  <!-- Switch Modes -->
  <div class="relative z-10">
    <div class="text-[16px] text-white font-medium mb-3">Switch Modes</div>
    <ModeToggle />
  </div>

  <!-- Logout -->
  <div class="relative z-10 pb-5">
    <NavButton>
      <LogoutIcon />
      <span class="text-gfx-neutral-300">Logout</span>
    </NavButton>
  </div>
</aside>

<style>
  .sidebar {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .sidebar-top-glow {
    position: absolute;
    width: 600px;
    height: 176px;
    left: 53px;
    top: -58px;
    transform: rotate(47.67deg);
    transform-origin: top left;
    background: #134e4a;
    border-radius: 50%;
    filter: blur(161px);
    pointer-events: none;
  }

  .user-card-glow {
    position: absolute;
    width: 96px;
    height: 56px;
    left: 86px;
    bottom: -20px;
    background: #6ee7b7;
    border-radius: 50%;
    filter: blur(77px);
    pointer-events: none;
  }
</style>
