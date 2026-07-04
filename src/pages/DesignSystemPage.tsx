import { SparkleButton, TradeButton, Badge, GreenDot, ModeToggle, PeriodPill, GlassCard } from '@/components/ui'

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gfx-main text-white font-acid p-8">
      <h1 className="text-h1 mb-8">Design System</h1>
      <div className="grid gap-8 max-w-4xl">
        <section>
          <h2 className="text-h2 mb-4">Buttons</h2>
          <div className="flex gap-4 items-center flex-wrap">
            <SparkleButton>Deposit</SparkleButton>
            <TradeButton>Trade</TradeButton>
          </div>
        </section>
        <section>
          <h2 className="text-h2 mb-4">Badges</h2>
          <div className="flex gap-4 items-center">
            <Badge variant="genfx">GenFX</Badge>
            <Badge variant="10x">10X</Badge>
            <Badge variant="status">Active</Badge>
          </div>
        </section>
        <section>
          <h2 className="text-h2 mb-4">Mode Toggle</h2>
          <div className="w-64"><ModeToggle /></div>
        </section>
        <section>
          <h2 className="text-h2 mb-4">Period Pill</h2>
          <PeriodPill />
        </section>
        <section>
          <h2 className="text-h2 mb-4">GreenDot</h2>
          <div className="flex items-center gap-3">
            <GreenDot size={6} />
            <GreenDot />
            <GreenDot size={12} />
          </div>
        </section>
        <section>
          <h2 className="text-h2 mb-4">Glass Card</h2>
          <GlassCard className="p-6">
            <p className="text-gfx-neutral-500">Light variant glass card</p>
          </GlassCard>
        </section>
      </div>
    </div>
  )
}
