import { useState } from 'react'
import {
  SparkleButton, Badge, GreenDot, ModeToggle, PeriodPill,
  GlassCard, DividerGlow, SearchInput, Breadcrumb, ActionItem, LanguageDropdown,
  FloatingNavBar, GlassSelect, GreenPillButton, GlowButton, GlassBannerCard, CourseCard, GlossaryCard,
} from '@/components/ui'
import { DepositIcon, WithdrawIcon, TransferIcon, SearchIcon, HelpIcon } from '@/components/icons'
import { PortfolioChart } from '@/components/charts/PortfolioChart'
import { CandlestickChart } from '@/components/charts/CandlestickChart'
import { MiniBarChart } from '@/components/charts/MiniBarChart'
import { AreaChart } from '@/components/charts/AreaChart'

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-6">
      <h2 className="text-h2 text-white mb-1">{title}</h2>
      {children}
    </section>
  )
}

const sections = [
  { id: 'tokens', label: 'Design Tokens' },
  { id: 'typography', label: 'Typography' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'badges', label: 'Badges' },
  { id: 'surfaces', label: 'Surface Components' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'forms', label: 'Form Components' },
  { id: 'charts', label: 'Charts' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback States' },
  { id: 'accessibility', label: 'Accessibility' },
]

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-h4 text-gfx-neutral-500 mb-4">{title}</h3>
      {children}
    </div>
  )
}

function TokenSwatch({ name, value, className }: { name: string; value: string; className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`size-10 rounded-lg border border-white/10 ${className || ''}`} style={!className ? { background: value } : undefined} /* dynamic: color from props */>
        {/* When className is provided, background comes from the class; otherwise from the value prop */}
      </div>
      <div>
        <p className="text-sm text-white">{name}</p>
        <p className="text-caption text-gfx-neutral-300">{value}</p>
      </div>
    </div>
  )
}

export default function DesignSystemPage() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="min-h-0">
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        <nav className="hidden lg:block w-52 shrink-0 sticky top-10 self-start" aria-label="Page sections">
          <p className="text-eyebrow text-gfx-green-500 mb-4">Contents</p>
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block px-3 py-1.5 rounded-lg text-sm text-gfx-neutral-500 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 min-w-0">
        <header className="mb-12">
          <p className="text-eyebrow text-gfx-green-500 mb-2">Genesis FX</p>
          <h1 className="text-display text-white mb-3">Design System</h1>
          <p className="text-body-lg text-gfx-neutral-500 max-w-2xl">
            A comprehensive collection of reusable components, design tokens, and patterns
            that power the Genesis FX trading platform.
          </p>
        </header>

        {/* Design Tokens */}
        <Section id="tokens" title="Design Tokens">
          <Subsection title="Color Palette">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <TokenSwatch name="Green 500 (Primary)" value="#10BC83" />
              <TokenSwatch name="Green Glow" value="#00f0a0" />
              <TokenSwatch name="Green 200" value="#064B34" />
              <TokenSwatch name="Green 100" value="#021B13" />
              <TokenSwatch name="Green 50" value="#01130d" />
              <TokenSwatch name="Neutral 500" value="#A0A0A0" />
              <TokenSwatch name="Neutral 300" value="#606060" />
              <TokenSwatch name="Red" value="#ff717e" />
              <TokenSwatch name="Red Dark (Danger)" value="#ff4d6a" />
              <TokenSwatch name="Amber (Warning)" value="#e29d58" />
              <TokenSwatch name="Info" value="#5b9cf5" />
              <TokenSwatch name="Bullish" value="#0c9104" />
            </div>
          </Subsection>

          <Subsection title="Semantic Surfaces">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <TokenSwatch name="Main Background" value="#040b09" />
              <TokenSwatch name="Sidebar" value="#000705" />
              <TokenSwatch name="Card BG" value="rgba(255,255,255,0.03)" className="bg-gfx-card-bg" />
              <TokenSwatch name="Card Border" value="rgba(255,255,255,0.06)" className="bg-gfx-card-border" />
              <TokenSwatch name="Glow Green" value="#104030" />
              <TokenSwatch name="Glow Red" value="#241B1C" />
            </div>
          </Subsection>

          <Subsection title="Radius Scale">
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'sm', value: '6px', twClass: 'rounded-sm' },
                { name: 'md', value: '12px', twClass: 'rounded-md' },
                { name: 'lg', value: '18px', twClass: 'rounded-lg' },
                { name: 'xl', value: '24px', twClass: 'rounded-xl' },
                { name: '2xl', value: '30px', twClass: 'rounded-2xl' },
                { name: 'full', value: '9999px', twClass: 'rounded-full' },
              ].map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div className={`size-16 border border-white/10 bg-white/[0.04] ${r.twClass}`} />
                  <p className="text-caption text-gfx-neutral-300">{r.name}</p>
                  <p className="text-caption text-gfx-neutral-500">{r.value}</p>
                </div>
              ))}
            </div>
          </Subsection>

          <Subsection title="Shadow & Elevation">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { name: 'sm', twClass: 'shadow-sm' },
                { name: 'md', twClass: 'shadow-md' },
                { name: 'lg', twClass: 'shadow-lg' },
              ].map((s) => (
                <div
                  key={s.name}
                  className={`h-24 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center ${s.twClass}`}
                >
                  <p className="text-sm text-gfx-neutral-500">shadow-{s.name}</p>
                </div>
              ))}
            </div>
          </Subsection>
        </Section>

        {/* Typography */}
        <Section id="typography" title="Typography">
          <div className="space-y-6">
            <div><p className="text-caption text-gfx-neutral-300 mb-1">Display</p><p className="text-display text-white">The quick brown fox</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">H1</p><p className="text-h1 text-white">Heading One</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">H2</p><p className="text-h2 text-white">Heading Two</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">H3</p><p className="text-h3 text-white">Heading Three</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">H4</p><p className="text-h4 text-white">Heading Four</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">H5</p><p className="text-h5 text-white">Heading Five</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">H6</p><p className="text-h6 text-white">Heading Six</p></div>
            <div className="divider-glow" aria-hidden="true" />
            <div><p className="text-caption text-gfx-neutral-300 mb-1">Body Large</p><p className="text-body-lg text-gfx-neutral-500">The quick brown fox jumps over the lazy dog. This is body large text used for lead paragraphs.</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">Body 1</p><p className="text-body1 text-gfx-neutral-500">Standard body text for general content and descriptions.</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">Body 2</p><p className="text-body2 text-gfx-neutral-500">Smaller body text for secondary information and metadata.</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">Caption</p><p className="text-caption text-gfx-neutral-500">Caption text for annotations and supplementary details.</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">Label</p><p className="text-label text-gfx-neutral-500">Form labels and input descriptors.</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">Eyebrow</p><p className="text-eyebrow text-gfx-green-500">Category Label</p></div>
            <div><p className="text-caption text-gfx-neutral-300 mb-1">Tab</p><p className="text-tab text-gfx-neutral-500 uppercase tracking-[2.32px]">TAB LABEL</p></div>
          </div>
        </Section>

        {/* Buttons */}
        <Section id="buttons" title="Buttons">
          <Subsection title="Variants">
            <div className="flex flex-wrap items-center gap-4">
              <SparkleButton>Deposit</SparkleButton>
              <SparkleButton>Withdraw</SparkleButton>

              <button className="h-12 px-6 rounded-full bg-gfx-green-500 text-black text-sm font-medium hover:bg-gfx-green-500/90 transition-colors cursor-pointer">
                Primary
              </button>
              <button className="h-12 px-6 rounded-full border border-white/10 text-white text-sm hover:bg-white/[0.04] transition-colors cursor-pointer">
                Outline
              </button>
              <button className="h-12 px-6 rounded-full text-gfx-neutral-500 text-sm hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer">
                Ghost
              </button>
              <button className="h-12 px-6 rounded-full bg-gfx-red-dark/20 text-gfx-red text-sm hover:bg-gfx-red-dark/30 transition-colors cursor-pointer">
                Destructive
              </button>
            </div>
          </Subsection>

          <Subsection title="Sizes">
            <div className="flex flex-wrap items-center gap-4">
              <button className="h-8 px-4 rounded-full bg-gfx-green-500 text-black text-xs font-medium cursor-pointer">Small</button>
              <button className="h-10 px-5 rounded-full bg-gfx-green-500 text-black text-sm font-medium cursor-pointer">Medium</button>
              <button className="h-12 px-6 rounded-full bg-gfx-green-500 text-black text-base font-medium cursor-pointer">Large</button>
            </div>
          </Subsection>

          <Subsection title="With Icons">
            <div className="flex flex-wrap items-center gap-4">
              <SparkleButton>
                <span className="flex items-center gap-2"><DepositIcon /><span>Deposit</span></span>
              </SparkleButton>
              <SparkleButton>
                <span className="flex items-center gap-2"><WithdrawIcon /><span>Withdraw</span></span>
              </SparkleButton>
              <SparkleButton>
                <span className="flex items-center gap-2"><TransferIcon /><span>Transfer</span></span>
              </SparkleButton>
            </div>
          </Subsection>

          <Subsection title="States">
            <div className="flex flex-wrap items-center gap-4">
              <button className="h-10 px-5 rounded-full bg-gfx-green-500 text-black text-sm font-medium cursor-pointer">Default</button>
              <button className="h-10 px-5 rounded-full bg-gfx-green-500/80 text-black text-sm font-medium cursor-pointer">Hover</button>
              <button className="h-10 px-5 rounded-full bg-gfx-green-500/60 text-black text-sm font-medium cursor-pointer">Active</button>
              <button className="h-10 px-5 rounded-full bg-gfx-green-500 text-black text-sm font-medium ring-2 ring-gfx-green-500 ring-offset-2 ring-offset-gfx-main cursor-pointer">Focus</button>
              <button className="h-10 px-5 rounded-full bg-white/10 text-gfx-neutral-300 text-sm cursor-not-allowed" disabled>Disabled</button>
              <button className="h-10 px-5 rounded-full bg-gfx-green-500 text-black text-sm font-medium flex items-center gap-2" disabled>
                <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Loading
              </button>
            </div>
          </Subsection>

          <Subsection title="Glow Button">
            <div className="flex flex-wrap items-end gap-8">
              <GlowButton label="Transfer Funds" onClick={() => {}} />
              <GlowButton label="Confirm" width={200} height={40} onClick={() => {}} />
              <GlowButton
                label="Custom Glow"
                width={240}
                surface={['#1a1a2e', '#16213e', '#0f3460']}
                glow={['#533483', '#e94560', '#D1D1D1', '#F0FEFE']}
                textColor="#ffffff"
                onClick={() => {}}
              />
            </div>
            <p className="text-caption text-gfx-neutral-500 mt-2">Pill button with 4-layer cursor-following glow — hover and move your cursor to see the effect</p>
          </Subsection>

          <Subsection title="Green Pill Button">
            <div className="flex flex-wrap items-center gap-4">
              <GreenPillButton>Reset</GreenPillButton>
              <GreenPillButton>Apply</GreenPillButton>
              <GreenPillButton>Clear All</GreenPillButton>
            </div>
            <p className="text-caption text-gfx-neutral-500 mt-2">Dark green pill with subtle sparkle dust — used for filter actions</p>
          </Subsection>

        </Section>

        {/* Badges */}
        <Section id="badges" title="Badges">
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="genfx">GenFX</Badge>
            <Badge variant="10x">10X</Badge>
            <Badge variant="status">Active</Badge>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-gfx-green-500/12 text-gfx-green-500">
              <GreenDot size={6} /> Online
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gfx-red/15 text-gfx-red">Error</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gfx-amber/15 text-gfx-amber">Warning</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#5b9cf5]/15 text-[#5b9cf5]">Info</span>
          </div>
        </Section>

        {/* Surface Components */}
        <Section id="surfaces" title="Surface Components">
          <Subsection title="Glass Cards">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <p className="text-gfx-neutral-500 text-sm">Light variant — default glass card with subtle blur and divider glow.</p>
              </GlassCard>
              <GlassCard variant="heavy" divider="none" className="p-6">
                <p className="text-gfx-neutral-500 text-sm">Heavy variant — stronger blur, shadow, and green divider.</p>
              </GlassCard>
              <GlassCard divider="none" rounded="12px" className="p-6">
                <p className="text-gfx-neutral-500 text-sm">No divider, 12px radius.</p>
              </GlassCard>
              <GlassCard variant="heavy" rounded="30px" className="p-6">
                <p className="text-gfx-neutral-500 text-sm">Heavy variant, 30px radius (pill-like).</p>
              </GlassCard>
            </div>
          </Subsection>

          <Subsection title="Course Card">
            <div className="max-w-[501px]">
              <CourseCard
                image="/images/course-crypto.png"
                title="Crypto Trading"
                description="In this course, you will learn all the basics to start trading in the world of cryptocurrencies"
                lessons={22}
                duration="00:19:09"
                level="Beginner"
              />
            </div>
          </Subsection>

          <Subsection title="Glass Banner Card">
            <GlassBannerCard>
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                <div>
                  <p className="text-gfx-neutral-300 text-body2 mb-2">Reusable banner card</p>
                  <p className="text-white text-h2 font-normal">GlassBannerCard</p>
                  <p className="text-gfx-neutral-500 text-body2 mt-2">Heavy glass card with green divider, SVG glow overlay, and internal glow ellipses. Used in Fiat Wallet and Learning Journey.</p>
                </div>
              </div>
            </GlassBannerCard>
          </Subsection>

          <Subsection title="Dividers">
            <div className="space-y-6">
              <div>
                <p className="text-caption text-gfx-neutral-300 mb-2">White glow</p>
                <DividerGlow />
              </div>
              <div>
                <p className="text-caption text-gfx-neutral-300 mb-2">Green glow (removed)</p>
              </div>
            </div>
          </Subsection>
        </Section>

        {/* Navigation */}
        <Section id="navigation" title="Navigation">
          <Subsection title="Breadcrumb">
            <Breadcrumb items={[{ label: 'Overview' }, { label: 'Dashboard', current: true }]} />
          </Subsection>

          <Subsection title="Period Selector">
            <div className="flex flex-wrap gap-4">
              <PeriodPill />
              <PeriodPill periods={['1H', '4H', '1D', '1W']} defaultActive="1D" />
            </div>
          </Subsection>

          <Subsection title="Language Dropdown">
            <LanguageDropdown />
          </Subsection>

          <Subsection title="Floating Nav Bar">
            <div className="flex flex-col items-center gap-6 py-8 rounded-2xl bg-[linear-gradient(135deg,_rgba(16,188,131,0.08)_0%,_rgba(91,156,245,0.06)_50%,_rgba(255,77,106,0.05)_100%)]">
              <FloatingNavBar />
              <p className="text-caption text-gfx-neutral-500">Click each icon to see the expand/collapse animation</p>
            </div>
          </Subsection>
        </Section>

        {/* Forms */}
        <Section id="forms" title="Form Components">
          <Subsection title="Search Input">
            <div className="flex flex-wrap gap-4">
              <SearchInput value={searchValue} onChange={setSearchValue} />
              <SearchInput placeholder="Filter accounts..." />
            </div>
          </Subsection>

          <Subsection title="Input">
            <div className="flex flex-wrap gap-4 max-w-md">
              <div className="w-full">
                <label htmlFor="ds-input-default" className="text-label text-gfx-neutral-500 mb-1.5 block">Email address</label>
                <input
                  id="ds-input-default"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-xl bg-transparent border border-white/10 text-white text-sm placeholder:text-gfx-neutral-300 focus:border-gfx-green-500/50 focus:outline-none transition-colors"
                />
              </div>
              <div className="w-full">
                <label htmlFor="ds-input-error" className="text-label text-gfx-neutral-500 mb-1.5 block">Amount</label>
                <input
                  id="ds-input-error"
                  type="text"
                  defaultValue="invalid"
                  aria-invalid="true"
                  aria-describedby="ds-input-error-msg"
                  className="w-full h-12 px-4 rounded-xl bg-transparent border border-gfx-red/50 text-white text-sm focus:border-gfx-red focus:outline-none transition-colors"
                />
                <p id="ds-input-error-msg" className="text-caption text-gfx-red mt-1.5" role="alert">Please enter a valid amount.</p>
              </div>
              <div className="w-full">
                <label htmlFor="ds-input-disabled" className="text-label text-gfx-neutral-300 mb-1.5 block">Disabled</label>
                <input
                  id="ds-input-disabled"
                  type="text"
                  placeholder="Not editable"
                  disabled
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-gfx-neutral-300 text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </Subsection>

          <Subsection title="Select">
            <div className="max-w-xs">
              <GlassSelect
                id="ds-select"
                label="Account type"
                defaultValue="genfx"
                options={[
                  { value: 'genfx', label: 'GenFX' },
                  { value: '10x', label: '10X Challenge' },
                  { value: 'pamm', label: 'PAMM' },
                ]}
              />
            </div>
          </Subsection>

          <Subsection title="Toggle / Switch">
            <ModeToggle />
          </Subsection>
        </Section>

        {/* Charts */}
        <Section id="charts" title="Charts">
          <Subsection title="Portfolio Line Chart">
            <GlassCard variant="heavy" divider="none" className="p-6 h-[300px]">
              <PortfolioChart />
            </GlassCard>
          </Subsection>

          <Subsection title="Candlestick Chart">
            <GlassCard className="p-6 h-[200px]">
              <CandlestickChart data={[
                { wickTop: 10, body: 8, wickBottom: 5, bullish: true },
                { wickTop: 12, body: 6, wickBottom: 4, bullish: false },
                { wickTop: 15, body: 10, wickBottom: 7, bullish: true },
                { wickTop: 9, body: 5, wickBottom: 3, bullish: false },
                { wickTop: 14, body: 11, wickBottom: 8, bullish: true },
                { wickTop: 11, body: 7, wickBottom: 4, bullish: true },
                { wickTop: 13, body: 9, wickBottom: 6, bullish: false },
                { wickTop: 16, body: 12, wickBottom: 9, bullish: true },
                { wickTop: 10, body: 6, wickBottom: 3, bullish: false },
                { wickTop: 14, body: 10, wickBottom: 7, bullish: true },
                { wickTop: 12, body: 8, wickBottom: 5, bullish: true },
                { wickTop: 11, body: 7, wickBottom: 4, bullish: false },
              ]} />
            </GlassCard>
          </Subsection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Subsection title="Mini Bar Chart">
              <GlassCard className="p-6 h-[200px]">
                <MiniBarChart data={[120, 180, 90, 250, 200, 160, 300, 220, 180, 270]} />
              </GlassCard>
            </Subsection>

            <Subsection title="Area Chart">
              <GlassCard className="p-6 h-[200px]">
                <AreaChart />
              </GlassCard>
            </Subsection>
          </div>

          <Subsection title="Area Chart Variants">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <GlassCard divider="none" className="p-4 h-[120px]">
                <p className="text-caption text-gfx-neutral-300 mb-2">Green (default)</p>
                <AreaChart />
              </GlassCard>
              <GlassCard divider="none" className="p-4 h-[120px]">
                <p className="text-caption text-gfx-neutral-300 mb-2">Red</p>
                <AreaChart color="#ff717e" />
              </GlassCard>
              <GlassCard divider="none" className="p-4 h-[120px]">
                <p className="text-caption text-gfx-neutral-300 mb-2">Blue</p>
                <AreaChart color="#5b9cf5" />
              </GlassCard>
            </div>
          </Subsection>
        </Section>

        {/* Data Display */}
        <Section id="data-display" title="Data Display">
          <Subsection title="Action Items">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              <ActionItem title="Deposit Funds" subtitle="Add funds instantly" icon={<DepositIcon size={24} color="white" />} />
              <ActionItem title="Withdraw" subtitle="Send to your bank" icon={<WithdrawIcon size={24} color="white" />} />
            </div>
          </Subsection>

          <Subsection title="Status Indicators">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <GreenDot size={6} />
                <span className="text-sm text-gfx-green-500">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gfx-amber inline-block" />
                <span className="text-sm text-gfx-amber">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gfx-red inline-block" />
                <span className="text-sm text-gfx-red">Inactive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gfx-neutral-300 inline-block" />
                <span className="text-sm text-gfx-neutral-300">Offline</span>
              </div>
            </div>
          </Subsection>

          <Subsection title="Green Dot Sizes">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2"><GreenDot size={4} /><span className="text-caption text-gfx-neutral-300">4px</span></div>
              <div className="flex flex-col items-center gap-2"><GreenDot size={6} /><span className="text-caption text-gfx-neutral-300">6px</span></div>
              <div className="flex flex-col items-center gap-2"><GreenDot /><span className="text-caption text-gfx-neutral-300">8px</span></div>
              <div className="flex flex-col items-center gap-2"><GreenDot size={12} /><span className="text-caption text-gfx-neutral-300">12px</span></div>
            </div>
          </Subsection>
        </Section>

        {/* Feedback States */}
        <Section id="feedback" title="Feedback States">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-gfx-green-500/20 bg-gfx-green-500/5" role="alert">
              <GreenDot size={8} />
              <div>
                <p className="text-sm text-gfx-green-500 font-medium">Success</p>
                <p className="text-caption text-gfx-neutral-500">Transaction completed successfully.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-gfx-amber/20 bg-gfx-amber/5" role="alert">
              <span className="size-2 mt-1.5 rounded-full bg-gfx-amber shrink-0 inline-block" />
              <div>
                <p className="text-sm text-gfx-amber font-medium">Warning</p>
                <p className="text-caption text-gfx-neutral-500">Your session will expire in 5 minutes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-gfx-red/20 bg-gfx-red/5" role="alert">
              <span className="size-2 mt-1.5 rounded-full bg-gfx-red shrink-0 inline-block" />
              <div>
                <p className="text-sm text-gfx-red font-medium">Error</p>
                <p className="text-caption text-gfx-neutral-500">Failed to process withdrawal. Please try again.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#5b9cf5]/20 bg-[#5b9cf5]/5" role="status">
              <span className="size-2 mt-1.5 rounded-full bg-[#5b9cf5] shrink-0 inline-block" />
              <div>
                <p className="text-sm text-[#5b9cf5] font-medium">Info</p>
                <p className="text-caption text-gfx-neutral-500">Markets will be closed on Monday for maintenance.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-h4 text-gfx-neutral-500 mb-4">Loading States</h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <svg className="animate-spin size-5 text-gfx-green-500" viewBox="0 0 24 24" fill="none" aria-label="Loading"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                <span className="text-sm text-gfx-neutral-500">Spinner</span>
              </div>
              <div className="w-48 h-3 rounded-full overflow-hidden bg-white/5">
                <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-gfx-green-500 to-gfx-green-glow" />
              </div>
              <div className="flex flex-col gap-2 w-48">
                <div className="h-3 rounded bg-white/5 animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-white/5 animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-white/5 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-h4 text-gfx-neutral-500 mb-4">Glossary Card</h3>
            <div className="max-w-md">
              <GlossaryCard term="Address" definition="A unique identifier used to send and receive cryptocurrency, similar to a bank account number in traditional finance." />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-h4 text-gfx-neutral-500 mb-4">Empty State</h3>
            <GlassCard className="p-10 flex flex-col items-center text-center max-w-md mx-auto">
              <SearchIcon size={32} color="#606060" className="mb-4" />
              <p className="text-body1 text-white mb-1">No results found</p>
              <p className="text-caption text-gfx-neutral-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            </GlassCard>
          </div>
        </Section>

        {/* Accessibility */}
        <Section id="accessibility" title="Accessibility">
          <div className="space-y-4 max-w-2xl">
            <GlassCard divider="none" className="p-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-gfx-green-500/10 flex items-center justify-center shrink-0" aria-hidden="true">
                  <span className="text-gfx-green-500 text-lg">A</span>
                </div>
                <div>
                  <p className="text-sm text-white mb-1">Focus Visible</p>
                  <p className="text-caption text-gfx-neutral-500">All interactive elements use <code className="text-gfx-green-500/80">:focus-visible</code> with a 2px green outline and 2px offset for keyboard navigation.</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard divider="none" className="p-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-gfx-green-500/10 flex items-center justify-center shrink-0" aria-hidden="true">
                  <span className="text-gfx-green-500 text-lg">M</span>
                </div>
                <div>
                  <p className="text-sm text-white mb-1">Reduced Motion</p>
                  <p className="text-caption text-gfx-neutral-500">The <code className="text-gfx-green-500/80">prefers-reduced-motion</code> media query disables all animations and transitions for users who prefer less motion.</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard divider="none" className="p-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-gfx-green-500/10 flex items-center justify-center shrink-0" aria-hidden="true">
                  <span className="text-gfx-green-500 text-lg">S</span>
                </div>
                <div>
                  <p className="text-sm text-white mb-1">Semantic HTML</p>
                  <p className="text-caption text-gfx-neutral-500">Components use proper HTML elements: <code className="text-gfx-green-500/80">&lt;nav&gt;</code>, <code className="text-gfx-green-500/80">&lt;main&gt;</code>, <code className="text-gfx-green-500/80">&lt;header&gt;</code>, <code className="text-gfx-green-500/80">&lt;button&gt;</code>, <code className="text-gfx-green-500/80">&lt;time&gt;</code>. ARIA attributes where semantic elements fall short.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </Section>

        <footer className="mt-16 pt-6 border-t border-white/5">
          <p className="text-caption text-gfx-neutral-300">Genesis FX Design System &middot; Built with React, TypeScript, and Tailwind CSS v4</p>
        </footer>
        </div>
      </div>
    </div>
  )
}
