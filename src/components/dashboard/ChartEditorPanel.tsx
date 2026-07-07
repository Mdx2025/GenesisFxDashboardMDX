import { useState } from 'react'
import type { ChartConfig } from '@/components/charts/PortfolioChart'
import { defaultChartConfig } from '@/components/charts/PortfolioChart'

interface ChartEditorPanelProps {
  config: ChartConfig
  onChange: (config: ChartConfig) => void
}

const presetColors = ['#00f0a0', '#00d4ff', '#a855f7', '#f59e0b', '#ef4444', '#ec4899']

const presetDatasets: { label: string; data: number[] }[] = [
  { label: 'Mountain', data: defaultChartConfig.data },
  { label: 'Uptrend', data: [130, 140, 138, 155, 165, 170, 180, 195, 210, 225, 218, 235, 245, 250, 255, 265, 260, 275, 280, 290, 285, 295, 300, 305, 298, 310, 315, 320, 312, 325] },
  { label: 'Volatile', data: [180, 280, 150, 260, 170, 310, 140, 290, 165, 300, 130, 275, 155, 265, 175, 295, 145, 285, 160, 270, 150, 290, 140, 280, 170, 300, 135, 275, 160, 285] },
  { label: 'Valley', data: [280, 260, 230, 200, 170, 150, 140, 135, 140, 150, 165, 175, 180, 175, 165, 155, 145, 140, 150, 170, 195, 220, 245, 265, 280, 290, 285, 275, 280, 285] },
  { label: 'Flat', data: [220, 222, 218, 221, 219, 223, 217, 220, 222, 218, 221, 219, 223, 217, 220, 222, 218, 221, 219, 220, 222, 218, 221, 219, 223, 217, 220, 222, 218, 221] },
]

export function ChartEditorPanel({ config, onChange }: ChartEditorPanelProps) {
  const [open, setOpen] = useState(true)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="absolute top-3 right-3 z-30 size-9 flex items-center justify-center rounded-lg cursor-pointer bg-white/5 border border-white/[0.08] [backdrop-filter:url(#blur-12)]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.3 2.7a2.1 2.1 0 0 0-3 0L3.6 9.4l-.9 3.2a.4.4 0 0 0 .5.5l3.2-.9 6.7-6.7a2.1 2.1 0 0 0 0-3Z" stroke="#A0A0A0" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M10 3l3 3" stroke="#A0A0A0" strokeWidth="1.2" />
        </svg>
      </button>
    )
  }

  const update = (partial: Partial<ChartConfig>) => onChange({ ...config, ...partial })

  return (
    <div
      className="absolute top-3 right-3 z-30 w-[280px] rounded-xl overflow-hidden bg-[rgba(10,14,12,0.92)] border border-white/[0.06] [backdrop-filter:url(#blur-24)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <span className="text-xs uppercase tracking-[2px] text-gfx-neutral-300 font-medium">Chart Editor</span>
        <button onClick={() => setOpen(false)} className="text-gfx-neutral-500 hover:text-white transition-colors cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
        {/* Dataset presets */}
        <Section label="Dataset">
          <div className="flex flex-wrap gap-1.5">
            {presetDatasets.map((p) => {
              const active = JSON.stringify(config.data) === JSON.stringify(p.data)
              return (
                <button
                  key={p.label}
                  onClick={() => update({ data: p.data })}
                  className={`px-2.5 py-1 rounded-md text-xs cursor-pointer transition-all ${
                    active
                      ? 'bg-[rgba(20,184,166,0.2)] text-white border border-[rgba(20,184,166,0.4)]'
                      : 'bg-white/[0.04] text-gfx-neutral-300 border border-white/[0.06]'
                  }`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
        </Section>

        {/* Line color */}
        <Section label="Line Color">
          <div className="flex items-center gap-2">
            {presetColors.map((c) => (
              <button
                key={c}
                onClick={() => update({ lineColor: c })}
                className="size-6 rounded-full cursor-pointer transition-transform hover:scale-110"
                style={{
                  background: c,
                  outline: config.lineColor === c ? `2px solid ${c}` : '2px solid transparent',
                  outlineOffset: '2px',
                  boxShadow: config.lineColor === c ? `0 0 12px ${c}80` : 'none',
                }} /* dynamic value */
              />
            ))}
            <label className="relative size-6 rounded-full cursor-pointer overflow-hidden bg-[conic-gradient(red,yellow,lime,aqua,blue,magenta,red)]">
              <input
                type="color"
                value={config.lineColor}
                onChange={(e) => update({ lineColor: e.target.value })}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </Section>

        {/* Wave Height */}
        <Section label="Wave Height">
          <Slider value={config.waveHeight} min={0.05} max={1} step={0.05} color={config.lineColor} onChange={(v) => update({ waveHeight: v })} />
        </Section>

        {/* Tension */}
        <Section label="Smoothness">
          <Slider value={config.tension} min={0} max={1} step={0.05} color={config.lineColor} onChange={(v) => update({ tension: v })} />
        </Section>

        {/* Line Width */}
        <Section label="Line Width">
          <Slider value={config.lineWidth} min={0.5} max={6} step={0.5} color={config.lineColor} onChange={(v) => update({ lineWidth: v })} />
        </Section>

        {/* Fill Opacity */}
        <Section label="Fill Opacity">
          <Slider value={config.fillOpacity} min={0} max={1} step={0.02} color={config.lineColor} onChange={(v) => update({ fillOpacity: v })} />
        </Section>

        {/* Glow Intensity */}
        <Section label="Glow Intensity">
          <Slider value={config.glowIntensity} min={0} max={40} step={1} color={config.lineColor} onChange={(v) => update({ glowIntensity: v })} />
        </Section>

        {/* Grid Opacity */}
        <Section label="Grid Opacity">
          <Slider value={config.gridOpacity} min={0} max={0.2} step={0.01} color={config.lineColor} onChange={(v) => update({ gridOpacity: v })} />
        </Section>

        {/* Highlight Point */}
        <Section label="Highlight Point">
          <Slider value={config.highlightIndex} min={0} max={config.data.length - 1} step={1} color={config.lineColor} onChange={(v) => update({ highlightIndex: v })} />
        </Section>

        {/* Reset */}
        <button
          onClick={() => onChange(defaultChartConfig)}
          className="w-full py-2 rounded-lg text-xs uppercase tracking-[1.5px] text-gfx-neutral-300 hover:text-white cursor-pointer transition-colors bg-white/[0.03] border border-white/[0.06]"
        >
          Reset Defaults
        </button>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.625rem] uppercase tracking-[1.5px] text-gfx-neutral-500">{label}</span>
      {children}
    </div>
  )
}

function Slider({ value, min, max, step, color, onChange }: { value: number; min: number; max: number; step: number; color: string; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 h-1.5 rounded-full bg-white/[0.06]">
        <div
          className="absolute left-0 top-0 h-full rounded-full opacity-60"
          style={{ width: `${pct}%`, background: color }} /* dynamic value */
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 size-3 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${pct}%`,
            background: color,
            boxShadow: `0 0 8px ${color}80`,
          }} /* dynamic value */
        />
      </div>
      <span className="text-[0.625rem] text-gfx-neutral-500 tabular-nums w-8 text-right">
        {Number.isInteger(step) ? value : value.toFixed(2)}
      </span>
    </div>
  )
}
