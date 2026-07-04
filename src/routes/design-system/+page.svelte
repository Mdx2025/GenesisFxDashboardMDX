<script>
  import { onMount } from 'svelte';
  import { colors } from '$tokens/colors.js';
  import { typography } from '$tokens/typography.js';
  import { spacing } from '$tokens/spacing.js';
  import {
    GlassCard, GreenDot, DividerGlow, Badge, IconWrap,
    SparkleButton, TradeButton, NavButton, ActionItem,
    ModeToggle, PeriodPill, SearchInput, Breadcrumb
  } from '$components/ui';
  import {
    DashboardIcon, AssetsIcon, TradelockerIcon, ChallengesIcon,
    PammIcon, MarketNewsIcon, AcademyIcon, DepositIcon,
    WithdrawIcon, TransferIcon, LogoutIcon, ChevronDownIcon,
    ChevronLeftIcon, HomeIcon, SearchIcon, HelpIcon,
    CalendarIcon, MoreDotsIcon, MoreDotsVerticalIcon,
    UserIcon, BookIcon
  } from '$icons';
  import MiniBarChart from '$components/charts/MiniBarChart.svelte';
  import SummaryCard from '$components/dashboard/SummaryCard.svelte';

  const sections = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'summary-card', label: 'Summary Card' },
    { id: 'glass-card', label: 'Glass Card' },
    { id: 'dividers', label: 'Dividers' },
    { id: 'status-indicators', label: 'Status Indicators' },
    { id: 'badges', label: 'Badges' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'mode-toggle', label: 'Mode Toggle' },
    { id: 'period-pills', label: 'Period Pills' },
    { id: 'search-input', label: 'Search Input' },
    { id: 'breadcrumb', label: 'Breadcrumb' },
    { id: 'action-items', label: 'Action Items' },
    { id: 'mini-bar-chart', label: 'Mini Bar Chart' },
    { id: 'icons', label: 'Icons' },
    { id: 'nav-button', label: 'Nav Button' },
  ];

  const allIcons = [
    { name: 'Dashboard', component: DashboardIcon },
    { name: 'Assets', component: AssetsIcon },
    { name: 'Tradelocker', component: TradelockerIcon },
    { name: 'Challenges', component: ChallengesIcon },
    { name: 'PAMM', component: PammIcon },
    { name: 'Market News', component: MarketNewsIcon },
    { name: 'Academy', component: AcademyIcon },
    { name: 'Deposit', component: DepositIcon },
    { name: 'Withdraw', component: WithdrawIcon },
    { name: 'Transfer', component: TransferIcon },
    { name: 'Logout', component: LogoutIcon },
    { name: 'ChevronDown', component: ChevronDownIcon },
    { name: 'ChevronLeft', component: ChevronLeftIcon },
    { name: 'Home', component: HomeIcon },
    { name: 'Search', component: SearchIcon },
    { name: 'Help', component: HelpIcon },
    { name: 'Calendar', component: CalendarIcon },
    { name: 'MoreDots', component: MoreDotsIcon },
    { name: 'MoreDotsVert', component: MoreDotsVerticalIcon },
    { name: 'User', component: UserIcon },
    { name: 'Book', component: BookIcon },
  ];

  const chartData = [
    { value: 40 }, { value: 70 }, { value: 55 }, { value: 85 },
    { value: 60 }, { value: 90 }, { value: 45 }
  ];

  function flattenColors(obj, prefix = '') {
    let result = [];
    for (const [key, val] of Object.entries(obj)) {
      if (val && typeof val === 'object' && 'value' in val) {
        result.push({ key: prefix + key, ...val });
      } else if (typeof val === 'object') {
        result = result.concat(flattenColors(val, prefix + key + '.'));
      }
    }
    return result;
  }

  const flatColors = flattenColors(colors);

  let activeSection = $state('colors');

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
</script>

<div class="min-h-screen bg-gfx-main text-white font-acid flex">
  <!-- Sidebar Navigation -->
  <nav class="hidden lg:flex w-[220px] shrink-0 sticky top-0 h-screen flex-col border-r border-gfx-card-border bg-[#000705] overflow-y-auto" aria-label="Design system sections">
    <div class="p-5 border-b border-gfx-card-border">
      <a href="/" class="text-gfx-neutral-500 text-body2 hover:text-white transition-colors inline-flex items-center gap-1.5">
        <ChevronLeftIcon />
        Dashboard
      </a>
    </div>
    <div class="p-5">
      <div class="text-[10px] text-gfx-neutral-500 uppercase tracking-[2px] mb-4 font-bold">Sections</div>
      <ul class="flex flex-col gap-0.5">
        {#each sections as section}
          <li>
            <button
              class="w-full text-left px-3 py-2 rounded-lg text-body2 font-medium transition-all
                {activeSection === section.id
                  ? 'text-white bg-[rgba(16,188,131,0.1)] border border-gfx-green-500/20'
                  : 'text-gfx-neutral-500 hover:text-gfx-neutral-300 hover:bg-gfx-card-bg border border-transparent'}"
              onclick={() => scrollTo(section.id)}
            >
              {section.label}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="flex-1 min-w-0">
    <div class="max-w-[1200px] mx-auto px-6 sm:px-8 py-12">

      <header class="mb-16">
        <a href="/" class="lg:hidden text-gfx-neutral-500 text-body2 hover:text-white transition-colors mb-4 inline-flex items-center gap-1.5">
          <ChevronLeftIcon />
          Back to Dashboard
        </a>
        <h1 class="text-h1 font-bold leading-none mb-3">Design System</h1>
        <p class="text-gfx-neutral-500 text-lg">Genesis FX Dashboard — Tokens, Components & Icons</p>
      </header>

      <!-- Colors -->
      <section id="colors" class="mb-16 scroll-mt-8" aria-labelledby="colors-heading">
        <h2 id="colors-heading" class="text-h2 font-bold mb-8">Colors</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {#each flatColors as color}
            <div class="flex flex-col gap-2">
              <div
                class="w-full aspect-square rounded-xl border border-gfx-card-border"
                style="background: {color.value};"
                role="presentation"
              ></div>
              <div class="text-body2 font-medium">{color.name}</div>
              <div class="text-gfx-neutral-500 text-[11px] font-mono">{color.value}</div>
            </div>
          {/each}
        </div>
      </section>

      <!-- Typography -->
      <section id="typography" class="mb-16 scroll-mt-8" aria-labelledby="typography-heading">
        <h2 id="typography-heading" class="text-h2 font-bold mb-8">Typography</h2>
        <div class="space-y-6">
          {#each typography as type}
            <div class="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 pb-6 border-b border-gfx-card-border">
              <div class="w-24 shrink-0">
                <div class="text-gfx-green-500 text-body2 font-bold uppercase">{type.name}</div>
                <div class="text-gfx-neutral-500 text-[11px]">{type.size}</div>
              </div>
              <div style="font-size: {type.size}; line-height: {type.lineHeight}; letter-spacing: {type.letterSpacing || 'normal'};">
                {type.sample}
              </div>
              <div class="text-gfx-neutral-500 text-[11px] font-mono sm:ml-auto shrink-0">{type.tailwindClass}</div>
            </div>
          {/each}
        </div>
      </section>

      <!-- Spacing -->
      <section id="spacing" class="mb-16 scroll-mt-8" aria-labelledby="spacing-heading">
        <h2 id="spacing-heading" class="text-h2 font-bold mb-8">Spacing</h2>
        <div class="space-y-4">
          {#each spacing as space}
            <div class="flex items-center gap-4">
              <div class="w-16 text-body2 text-gfx-neutral-500 font-mono">{space.name}</div>
              <div class="h-4 rounded bg-gfx-green-500/30" style="width: {space.value};" role="presentation"></div>
              <div class="text-body2">{space.value}</div>
              <div class="text-gfx-neutral-500 text-[11px] font-mono">{space.tailwindClass}</div>
            </div>
          {/each}
        </div>
      </section>

      <!-- Summary Cards -->
      <section id="summary-card" class="mb-16 scroll-mt-8" aria-labelledby="summary-card-heading">
        <h2 id="summary-card-heading" class="text-h2 font-bold mb-8">Summary Card</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="text-body2 text-gfx-neutral-500 mb-3 uppercase tracking-widest">Green glow variant</div>
            <SummaryCard title="Total Balance" value="$42,680.00" changeText="+12.4% this month" changeColor="green" glowColor="green">
              <MiniBarChart data={chartData} />
            </SummaryCard>
          </div>
          <div>
            <div class="text-body2 text-gfx-neutral-500 mb-3 uppercase tracking-widest">Stone glow variant</div>
            <SummaryCard title="Total Equity" value="$46,897.30" changeText="-$3,517.30" changeColor="red" glowColor="stone" />
          </div>
        </div>
      </section>

      <!-- Glass Cards -->
      <section id="glass-card" class="mb-16 scroll-mt-8" aria-labelledby="glass-card-heading">
        <h2 id="glass-card-heading" class="text-h2 font-bold mb-8">Glass Card</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="text-body2 text-gfx-neutral-500 mb-3 uppercase tracking-widest">Light variant</div>
            <GlassCard variant="light" divider="white">
              <div class="p-6">
                <div class="text-body2 text-gfx-neutral-500 mb-1">Glass Card Light</div>
                <div class="text-2xl font-bold">$42,680.00</div>
              </div>
            </GlassCard>
          </div>
          <div>
            <div class="text-body2 text-gfx-neutral-500 mb-3 uppercase tracking-widest">Heavy variant</div>
            <GlassCard variant="heavy" divider="green">
              <div class="p-6">
                <div class="text-body2 text-gfx-neutral-500 mb-1">Glass Card Heavy</div>
                <div class="text-2xl font-bold">$42,680.00</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <!-- Dividers -->
      <section id="dividers" class="mb-16 scroll-mt-8" aria-labelledby="dividers-heading">
        <h2 id="dividers-heading" class="text-h2 font-bold mb-8">Dividers</h2>
        <div class="space-y-8">
          <div>
            <div class="text-body2 text-gfx-neutral-500 mb-3 uppercase tracking-widest">White glow</div>
            <div class="relative h-[1px]">
              <DividerGlow variant="white" />
            </div>
          </div>
          <div>
            <div class="text-body2 text-gfx-neutral-500 mb-3 uppercase tracking-widest">Green glow</div>
            <div class="relative h-[1px]">
              <DividerGlow variant="green" />
            </div>
          </div>
        </div>
      </section>

      <!-- Green Dot -->
      <section id="status-indicators" class="mb-16 scroll-mt-8" aria-labelledby="status-heading">
        <h2 id="status-heading" class="text-h2 font-bold mb-8">Status Indicators</h2>
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <GreenDot size={6} />
            <span class="text-body2">6px dot</span>
          </div>
          <div class="flex items-center gap-3">
            <GreenDot size={8} />
            <span class="text-body2">8px dot (default)</span>
          </div>
        </div>
      </section>

      <!-- Badges -->
      <section id="badges" class="mb-16 scroll-mt-8" aria-labelledby="badges-heading">
        <h2 id="badges-heading" class="text-h2 font-bold mb-8">Badges</h2>
        <div class="flex flex-wrap items-center gap-4">
          <Badge variant="genfx">GENFX</Badge>
          <Badge variant="10x">10X</Badge>
          <Badge variant="status">Active</Badge>
        </div>
      </section>

      <!-- Buttons -->
      <section id="buttons" class="mb-16 scroll-mt-8" aria-labelledby="buttons-heading">
        <h2 id="buttons-heading" class="text-h2 font-bold mb-8">Buttons</h2>
        <div class="space-y-6">
          <div>
            <div class="text-body2 text-gfx-neutral-500 mb-3 uppercase tracking-widest">Sparkle Button</div>
            <div class="flex flex-wrap gap-4">
              <SparkleButton>Default Size</SparkleButton>
              <SparkleButton size="small">Small Size</SparkleButton>
            </div>
          </div>
          <div>
            <div class="text-body2 text-gfx-neutral-500 mb-3 uppercase tracking-widest">Trade Button</div>
            <TradeButton>Trade Now</TradeButton>
          </div>
        </div>
      </section>

      <!-- Mode Toggle -->
      <section id="mode-toggle" class="mb-16 scroll-mt-8" aria-labelledby="mode-toggle-heading">
        <h2 id="mode-toggle-heading" class="text-h2 font-bold mb-8">Mode Toggle</h2>
        <div class="max-w-[300px]">
          <ModeToggle options={['Client', 'Partner']} activeIndex={0} />
        </div>
      </section>

      <!-- Period Pills -->
      <section id="period-pills" class="mb-16 scroll-mt-8" aria-labelledby="period-pills-heading">
        <h2 id="period-pills-heading" class="text-h2 font-bold mb-8">Period Pills</h2>
        <PeriodPill periods={['1D','1W','1M','3M','1Y','ALL']} active="ALL" />
      </section>

      <!-- Search Input -->
      <section id="search-input" class="mb-16 scroll-mt-8" aria-labelledby="search-input-heading">
        <h2 id="search-input-heading" class="text-h2 font-bold mb-8">Search Input</h2>
        <div class="max-w-[400px]">
          <SearchInput placeholder="Search accounts..." />
        </div>
      </section>

      <!-- Breadcrumb -->
      <section id="breadcrumb" class="mb-16 scroll-mt-8" aria-labelledby="breadcrumb-heading">
        <h2 id="breadcrumb-heading" class="text-h2 font-bold mb-8">Breadcrumb</h2>
        <Breadcrumb items={[{label: 'Overview'}, {label: 'Dashboard', current: true}]} />
      </section>

      <!-- Action Items -->
      <section id="action-items" class="mb-16 scroll-mt-8" aria-labelledby="action-items-heading">
        <h2 id="action-items-heading" class="text-h2 font-bold mb-8">Action Items</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px]">
          <ActionItem title="Deposit" subtitle="Fund your account">
            {#snippet icon()}<DepositIcon />{/snippet}
          </ActionItem>
          <ActionItem title="Withdraw" subtitle="Cash out funds">
            {#snippet icon()}<WithdrawIcon />{/snippet}
          </ActionItem>
          <ActionItem title="Transfer" subtitle="Move between accounts">
            {#snippet icon()}<TransferIcon />{/snippet}
          </ActionItem>
        </div>
      </section>

      <!-- Mini Bar Chart -->
      <section id="mini-bar-chart" class="mb-16 scroll-mt-8" aria-labelledby="mini-bar-chart-heading">
        <h2 id="mini-bar-chart-heading" class="text-h2 font-bold mb-8">Mini Bar Chart</h2>
        <div class="w-[120px]">
          <MiniBarChart data={chartData} />
        </div>
      </section>

      <!-- Icons -->
      <section id="icons" class="mb-16 scroll-mt-8" aria-labelledby="icons-heading">
        <h2 id="icons-heading" class="text-h2 font-bold mb-8">Icons</h2>
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
          {#each allIcons as iconItem}
            <div class="flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-lg border border-gfx-card-border bg-gfx-card-bg flex items-center justify-center text-gfx-neutral-500">
                <iconItem.component />
              </div>
              <div class="text-[10px] text-gfx-neutral-500 text-center leading-tight">{iconItem.name}</div>
            </div>
          {/each}
        </div>
      </section>

      <!-- Nav Button -->
      <section id="nav-button" class="mb-16 scroll-mt-8" aria-labelledby="nav-button-heading">
        <h2 id="nav-button-heading" class="text-h2 font-bold mb-8">Nav Button</h2>
        <div class="max-w-[240px] space-y-2">
          <NavButton active={true}><DashboardIcon /><span>Dashboard</span></NavButton>
          <NavButton active={false}><AssetsIcon /><span>Assets</span></NavButton>
        </div>
      </section>

    </div>
  </main>
</div>
