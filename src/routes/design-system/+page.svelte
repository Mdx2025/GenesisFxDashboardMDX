<script>
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
</script>

<div class="min-h-screen bg-gfx-main text-white font-acid">
  <div class="max-w-[1400px] mx-auto px-8 py-12">

    <div class="mb-16">
      <a href="/" class="text-gfx-neutral-500 text-sm hover:text-white transition-colors mb-4 inline-block">&larr; Back to Dashboard</a>
      <h1 class="text-[50px] font-bold leading-none mb-3">Design System</h1>
      <p class="text-gfx-neutral-500 text-lg">Genesis FX Dashboard — Tokens, Components & Icons</p>
    </div>

    <!-- Colors -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Colors</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {#each flatColors as color}
          <div class="flex flex-col gap-2">
            <div
              class="w-full aspect-square rounded-xl border border-[rgba(255,255,255,0.06)]"
              style="background: {color.value};"
            ></div>
            <div class="text-sm font-medium">{color.name}</div>
            <div class="text-gfx-neutral-500 text-xs font-mono">{color.value}</div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Typography -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Typography</h2>
      <div class="space-y-6">
        {#each typography as type}
          <div class="flex items-baseline gap-6 pb-6 border-b border-[rgba(255,255,255,0.06)]">
            <div class="w-24 shrink-0">
              <div class="text-gfx-green-500 text-sm font-bold uppercase">{type.name}</div>
              <div class="text-gfx-neutral-500 text-xs">{type.size}</div>
            </div>
            <div style="font-size: {type.size}; line-height: {type.lineHeight}; letter-spacing: {type.letterSpacing || 'normal'};">
              {type.sample}
            </div>
            <div class="text-gfx-neutral-500 text-xs font-mono ml-auto shrink-0">{type.tailwindClass}</div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Spacing -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Spacing</h2>
      <div class="space-y-4">
        {#each spacing as space}
          <div class="flex items-center gap-4">
            <div class="w-16 text-sm text-gfx-neutral-500 font-mono">{space.name}</div>
            <div class="h-4 rounded bg-gfx-green-500/30" style="width: {space.value};"></div>
            <div class="text-sm">{space.value}</div>
            <div class="text-gfx-neutral-500 text-xs font-mono">{space.tailwindClass}</div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Glass Cards -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Glass Card</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div class="text-sm text-gfx-neutral-500 mb-3 uppercase tracking-widest">Light variant</div>
          <GlassCard variant="light" divider="white">
            <div class="p-6">
              <div class="text-sm text-gfx-neutral-500 mb-1">Glass Card Light</div>
              <div class="text-2xl font-bold">$42,680.00</div>
            </div>
          </GlassCard>
        </div>
        <div>
          <div class="text-sm text-gfx-neutral-500 mb-3 uppercase tracking-widest">Heavy variant</div>
          <GlassCard variant="heavy" divider="green">
            <div class="p-6">
              <div class="text-sm text-gfx-neutral-500 mb-1">Glass Card Heavy</div>
              <div class="text-2xl font-bold">$42,680.00</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>

    <!-- Dividers -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Dividers</h2>
      <div class="space-y-8">
        <div>
          <div class="text-sm text-gfx-neutral-500 mb-3 uppercase tracking-widest">White glow</div>
          <div class="relative h-[1px]">
            <DividerGlow variant="white" />
          </div>
        </div>
        <div>
          <div class="text-sm text-gfx-neutral-500 mb-3 uppercase tracking-widest">Green glow</div>
          <div class="relative h-[1px]">
            <DividerGlow variant="green" />
          </div>
        </div>
      </div>
    </section>

    <!-- Green Dot -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Status Indicators</h2>
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-3">
          <GreenDot size={6} />
          <span class="text-sm">6px dot</span>
        </div>
        <div class="flex items-center gap-3">
          <GreenDot size={8} />
          <span class="text-sm">8px dot (default)</span>
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Badges</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Badge variant="genfx">GENFX</Badge>
        <Badge variant="10x">10X</Badge>
        <Badge variant="status">Active</Badge>
      </div>
    </section>

    <!-- Buttons -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Buttons</h2>
      <div class="space-y-6">
        <div>
          <div class="text-sm text-gfx-neutral-500 mb-3 uppercase tracking-widest">Sparkle Button</div>
          <div class="flex flex-wrap gap-4">
            <SparkleButton>Default Size</SparkleButton>
            <SparkleButton size="small">Small Size</SparkleButton>
          </div>
        </div>
        <div>
          <div class="text-sm text-gfx-neutral-500 mb-3 uppercase tracking-widest">Trade Button</div>
          <TradeButton>Trade Now</TradeButton>
        </div>
      </div>
    </section>

    <!-- Mode Toggle -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Mode Toggle</h2>
      <div class="max-w-[300px]">
        <ModeToggle options={['Client', 'Partner']} activeIndex={0} />
      </div>
    </section>

    <!-- Period Pills -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Period Pills</h2>
      <PeriodPill periods={['1D','1W','1M','3M','1Y','ALL']} active="ALL" />
    </section>

    <!-- Search Input -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Search Input</h2>
      <div class="max-w-[400px]">
        <SearchInput placeholder="Search accounts..." />
      </div>
    </section>

    <!-- Breadcrumb -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Breadcrumb</h2>
      <Breadcrumb items={[{label: 'Overview'}, {label: 'Dashboard', current: true}]} />
    </section>

    <!-- Action Items -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Action Items</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[900px]">
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
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Mini Bar Chart</h2>
      <div class="w-[120px]">
        <MiniBarChart data={chartData} />
      </div>
    </section>

    <!-- Icons -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Icons</h2>
      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
        {#each allIcons as icon}
          <div class="flex flex-col items-center gap-2">
            <div class="w-10 h-10 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-gfx-neutral-500">
              <svelte:component this={icon.component} />
            </div>
            <div class="text-[10px] text-gfx-neutral-500 text-center leading-tight">{icon.name}</div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Nav Button -->
    <section class="mb-16">
      <h2 class="text-[36px] font-bold mb-8">Nav Button</h2>
      <div class="max-w-[240px] space-y-2">
        <NavButton active={true}><DashboardIcon /><span>Dashboard</span></NavButton>
        <NavButton active={false}><AssetsIcon /><span>Assets</span></NavButton>
      </div>
    </section>

  </div>
</div>
