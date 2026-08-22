import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { GlassBannerCard } from './GlassBannerCard'
import { GlassCard } from './GlassCard'
import { GlowButton } from './GlowButton'
import { SparkleButton } from './SparkleButton'

export type BroadcastPermission = 'camera' | 'microphone' | 'screen'

const CHANNEL_URL = 'https://dashboard.genesisfxmarkets.com'

function BroadcastGlyph({ className = 'size-8' }: { className?: string }) {
  return <svg viewBox="0 0 42 42" className={className} fill="none" aria-hidden="true"><circle cx="21" cy="21" r="5" fill="currentColor"/><path d="M13.5 13.6a10.5 10.5 0 0 0 0 14.8M28.5 13.6a10.5 10.5 0 0 1 0 14.8M8.3 8.4a17.8 17.8 0 0 0 0 25.2M33.7 8.4a17.8 17.8 0 0 1 0 25.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg>
}

function ShieldIcon() {
  return <svg viewBox="0 0 24 24" className="size-6 text-[#00B38C]" fill="currentColor" aria-hidden="true"><path d="M12 2.5 20 6v5.5c0 5.1-3.2 8.7-8 10-4.8-1.3-8-4.9-8-10V6l8-3.5Z"/><path d="m8.5 12 2.2 2.2 4.8-5" fill="none" stroke="#021B13" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function CheckIcon({ className = 'size-3' }: { className?: string }) {
  return <svg viewBox="0 0 12 12" className={className} fill="none" aria-hidden="true"><path d="m2.2 6.3 2.3 2.3 5.3-5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function KeyIcon() {
  return <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true"><circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="m11 12 8-8m-3 3 2 2m-5 1 2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
}

function CopyIcon() {
  return <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true"><rect x="6" y="6" width="9" height="10" rx="2" stroke="currentColor"/><path d="M4 13H3.5A1.5 1.5 0 0 1 2 11.5v-8A1.5 1.5 0 0 1 3.5 2h8A1.5 1.5 0 0 1 13 3.5V4" stroke="currentColor"/></svg>
}

function PermissionIcon({ permission }: { permission: BroadcastPermission }) {
  if (permission === 'camera') return <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden="true"><rect x="4" y="7" width="16" height="11" rx="3" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.6"/></svg>
  if (permission === 'microphone') return <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4m-3 0h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
  return <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 20h6m-3-4v4M8 9l-2 2 2 2m8-4 2 2-2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

const cardClass = 'border border-[#064B34] !bg-gfx-green-800 shadow-none after:hidden [[data-theme=light]_&]:!bg-white/[0.68]'

export function BroadcastReadyHero() {
  return (
    <GlassBannerCard glowSrc={null} rounded="18.563px" className="h-[279px] w-full" contentClassName="flex h-full items-center px-6 sm:px-[42px]" data-broadcast-ready-hero>
      <div className="flex items-center gap-5 sm:gap-[21px]">
        <span className="grid size-[73px] shrink-0 place-items-center rounded-[18px] bg-[#064B34]/55 text-[#00B38C]"><BroadcastGlyph className="size-[34px]" /></span>
        <div>
          <span className="inline-flex h-[18px] items-center rounded-full border border-[#00B38C] px-2 text-[12px] leading-none text-[#00B38C]">+ NEW SESSION</span>
          <h1 className="mt-3 text-[36px] font-normal leading-none text-white sm:text-[50px]">Ready to go live?</h1>
          <p className="mt-4 max-w-[610px] text-sm leading-[18.8px] text-gfx-neutral-400">Set your title and market, then stream from your browser - no OBS needed. Your<br className="hidden sm:block" /> channel URL stays the same every session.</p>
        </div>
      </div>
    </GlassBannerCard>
  )
}

function BroadcastField({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm text-white"><span className="mb-2 block">{label}</span>{children}</label>
}

const inputClass = 'h-[50px] w-full rounded-[30px] border border-[#064B34] bg-transparent px-6 text-sm text-white outline-none placeholder:text-gfx-neutral-400 focus-visible:ring-2 focus-visible:ring-gfx-green-500'

export function BroadcastSessionDetails({ onGoLive }: { onGoLive: () => void }) {
  const [title, setTitle] = useState('Test')
  const [category, setCategory] = useState('Test')
  const [symbol, setSymbol] = useState('Test')
  return (
    <GlassCard variant="light" divider="none" glow={false} rounded="30px" className={`${cardClass} h-[566px] px-6 py-10 sm:px-10`} data-broadcast-session-details>
      <div className="flex items-center gap-3 text-base text-white"><span className="grid size-7 place-items-center rounded-full bg-[#064B34] text-sm text-[#00B38C]">1</span><h2>Session details</h2></div>
      <div className="mt-10">
        <BroadcastField label="Stream title"><input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} /></BroadcastField>
        <p className="mt-2 text-xs text-gfx-neutral-400">{title.length}/120. Viewers see this in the browse list.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <BroadcastField label="Category"><select className={`${inputClass} appearance-none`} value={category} onChange={(event) => setCategory(event.target.value)}><option>Test</option><option>Forex</option><option>Crypto</option></select></BroadcastField>
          <BroadcastField label="Symbol"><select className={`${inputClass} appearance-none`} value={symbol} onChange={(event) => setSymbol(event.target.value)}><option>Test</option><option>EURUSD</option><option>BTCUSD</option></select></BroadcastField>
        </div>
      </div>
      <div className="mt-[69px]"><GlowButton label="Go live now" width="100%" height={44} onClick={onGoLive} icon={<BroadcastGlyph className="size-[15px]" />} /></div>
    </GlassCard>
  )
}

export function BroadcastChannelCard() {
  const [copied, setCopied] = useState(false)
  async function copyChannel() {
    await navigator.clipboard?.writeText(CHANNEL_URL)
    setCopied(true)
  }
  return (
    <GlassCard variant="light" divider="none" glow={false} rounded="30px" className={`${cardClass} h-[283px] px-7 py-10 sm:px-10`} data-broadcast-channel>
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 text-[#00B38C]"><KeyIcon/><div><h2 className="text-base text-white">Your channel</h2><p className="mt-1 max-w-[430px] text-sm leading-[18.8px] text-gfx-neutral-400">Share your channel URL - viewers land here every time<br className="hidden sm:block" /> you go to live</p></div></div>
        <button type="button" className="shrink-0 text-sm text-gfx-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500" onClick={() => setCopied(false)}>↻ Reset key</button>
      </div>
      <p className="mt-8 text-sm text-gfx-neutral-400">Channel URL</p>
      <div className="mt-2 flex h-[50px] items-center rounded-[30px] border border-[#064B34] px-6 text-sm text-gfx-neutral-400"><span className="min-w-0 flex-1 truncate">{CHANNEL_URL}</span><button type="button" onClick={copyChannel} className="grid size-8 place-items-center rounded-lg text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gfx-green-500" aria-label="Copy channel URL"><CopyIcon/></button></div>
      <span className="sr-only" aria-live="polite">{copied ? 'Channel URL copied.' : ''}</span>
    </GlassCard>
  )
}

export function BroadcastChecklist() {
  const items = [<>Share your <strong className="text-white">@channel URL</strong> in advance - followers get notified.</>, <>Use the built-in browser broadcaster - no OBS setup required.</>, <>Your stream is <strong className="text-white">recorded automatically</strong> - you'll be asked to approve the<br className="hidden sm:block" /> replay when you golive.</>]
  return <GlassCard variant="light" divider="none" glow={false} rounded="30px" className={`${cardClass} h-[265px] px-7 py-9 sm:px-10`} data-broadcast-checklist><h2 className="text-sm text-gfx-neutral-400">Before you go live</h2><ul className="mt-7 space-y-5">{items.map((item, index) => <li key={index} className="flex gap-3 text-sm leading-[18.8px] text-gfx-neutral-400"><span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#00B38C]/35 text-[#00B38C]"><CheckIcon className="size-2.5"/></span><span>{item}</span></li>)}</ul></GlassCard>
}

function BroadcastModalShell({ labelId, height, onClose, children, testId }: { labelId: string; height: number; onClose: () => void; children: ReactNode; testId: string }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    panelRef.current?.querySelector<HTMLElement>('button, input, [tabindex]:not([tabindex="-1"])')?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        const trigger = triggerRef.current
        onCloseRef.current()
        requestAnimationFrame(() => trigger?.focus())
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      if (!nodes.length) return
      const first = nodes[0]; const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); requestAnimationFrame(() => triggerRef.current?.focus()) }
  }, [])
  return <div ref={overlayRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-5 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === overlayRef.current) onClose() }} role="dialog" aria-modal="true" aria-labelledby={labelId} data-broadcast-modal={testId}><GlassCard ref={panelRef} variant="light" divider="none" glow={false} rounded="18.563px" className="surface-raised w-[677px] max-w-full overflow-y-auto border border-[#064B34] px-5 after:hidden sm:px-[42px]" style={{ height, maxHeight: 'calc(100vh - 40px)', boxShadow: '0 4.641px 23.204px rgba(0,0,0,.03)' }}><div className="theme-decorative-glow pointer-events-none absolute -bottom-24 -left-24 size-[260px] rounded-full bg-[#064B34]/55 blur-[90px]" aria-hidden="true"/><div className="theme-decorative-glow pointer-events-none absolute -right-24 -top-24 size-[230px] rounded-full bg-[#064B34]/45 blur-[90px]" aria-hidden="true"/><div className="relative z-10 h-full">{children}</div></GlassCard></div>
}

const TERMS_COPY = `These Live Streaming Terms & Conditions ("Streaming Terms") govern any Client of Genesis FX Markets Ltd ("the Company," "Genesis," "we," "us," or "our") who initiates, hosts, participates in, or otherwise transmits live audio, video, screen, or other media content ("Broadcaster," "you," or "your") through any streaming surface operated by the Company. These Streaming Terms are incorporated into, and form an integral and binding part of, the Genesis FX Markets Terms and Conditions, Privacy Policy, Risk Disclosure, Anti-Money Laundering Policy, and Cookie Policy. In the event of any conflict in respect of broadcasting activity, the Terms and Conditions shall prevail.`

export function BroadcasterTermsModal({ onCancel, onContinue }: { onCancel: () => void; onContinue: () => void }) {
  const checkboxId = useId()
  const [accepted, setAccepted] = useState(true)
  return <BroadcastModalShell labelId="broadcaster-terms-title" height={704} onClose={onCancel} testId="terms"><div className="pt-[77px]"><div className="flex items-center gap-2"><ShieldIcon/><h2 id="broadcaster-terms-title" className="text-2xl text-white">Broadcaster Terms &amp; Conditions</h2></div><p className="mt-4 text-sm text-gfx-neutral-400">You must re-agree to the streaming terms every time you go live.</p><div className="mx-auto mt-5 h-[331px] w-[519px] max-w-full overflow-y-auto rounded-[18.563px] border border-[#064B34] p-5 text-xs leading-[16px] text-gfx-neutral-400" data-broadcast-terms-scroll><p>{TERMS_COPY}</p><h3 className="mt-5 font-medium text-white">1. Definitions</h3><p className="mt-2">&quot;Broadcaster&quot; means the verified account holder who transmits a Stream</p></div><label htmlFor={checkboxId} className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-[16px] text-white"><input id={checkboxId} type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="peer sr-only"/><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#00B38C]/25 text-[#00B38C] peer-focus-visible:ring-2 peer-focus-visible:ring-[#00B38C]"><CheckIcon/></span><span>I have read and agree to the Broadcaster Terms &amp; Conditions, and I<br className="hidden sm:block"/> consent to turning on my camera and microphone and to my stream<br className="hidden sm:block"/> being recorded.</span></label><div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row"><SparkleButton onClick={onCancel} className="!h-[46px] !w-[230px] px-6">Cancel</SparkleButton><GlowButton label="Continue" width={230} height={44} disabled={!accepted} onClick={onContinue}/></div></div></BroadcastModalShell>
}

const PERMISSION_ROWS: { id: BroadcastPermission; title: string; copy: string }[] = [
  { id: 'camera', title: 'Camera', copy: 'Required- viewers see your camera feed.' },
  { id: 'microphone', title: 'Microphone', copy: 'Required- viewers hear your commentary' },
  { id: 'screen', title: 'Screen recording', copy: 'Required - consent to session recording for replays.' },
]

export function BroadcastPermissionsModal({ active, onEnable, onCancel, onStart }: { active: BroadcastPermission[]; onEnable: (permission: BroadcastPermission) => void; onCancel: () => void; onStart: () => void }) {
  const allActive = PERMISSION_ROWS.every(({ id }) => active.includes(id))
  return <BroadcastModalShell labelId="broadcast-permissions-title" height={643} onClose={onCancel} testId="permissions"><div className="pt-[65px]"><div className="flex items-center gap-2"><ShieldIcon/><h2 id="broadcast-permissions-title" className="text-2xl text-white">Grant broadcast permissions</h2></div><p className="mt-3 max-w-[500px] text-sm leading-[18.8px] text-gfx-neutral-400">Camera, microphone, and screen share must all be approved before<br className="hidden sm:block"/> your stream can begin.</p><div className="mx-auto mt-6 w-[520px] max-w-full space-y-3" data-broadcast-permission-rows>{PERMISSION_ROWS.map((row) => { const enabled = active.includes(row.id); return <div key={row.id} className="flex h-[91px] items-center gap-4 rounded-[18.563px] border border-[#064B34] px-5"><span className="grid size-[46px] shrink-0 place-items-center rounded-[10px] bg-[#064B34]/55 text-[#00B38C]"><PermissionIcon permission={row.id}/></span><div className="min-w-0 flex-1"><h3 className="text-sm text-white">{row.title}</h3><p className="mt-0.5 text-xs leading-[15px] text-gfx-neutral-400">{row.copy}</p></div>{enabled ? <span className="flex h-10 w-[87px] shrink-0 items-center justify-center gap-1 rounded-full border border-[#00B38C] text-xs text-[#00B38C]" data-permission-active><span className="grid size-4 place-items-center rounded-full bg-[#00B38C]/25"><CheckIcon className="size-2.5"/></span>Active</span> : <GlowButton label="Enable" width={103} height={44} fontSize={14} onClick={() => onEnable(row.id)}/>}</div>})}</div><p className="mt-5 text-xs leading-[16px] text-gfx-neutral-400">Denied a permission by mistake? Enable it in your browser’s site<br className="hidden sm:block"/> settings, then tap the button again</p><div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row"><SparkleButton onClick={onCancel} className="!h-[46px] !w-[230px] px-6">Cancel</SparkleButton><GlowButton label="Start streaming" width={230} height={44} disabled={!allActive} preserveDisabledAppearance onClick={onStart} icon={<BroadcastGlyph className="size-[15px]"/>}/></div></div></BroadcastModalShell>
}
