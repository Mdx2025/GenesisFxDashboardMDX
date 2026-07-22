import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SearchInput, GlowEllipse, ModeToggle } from '@/components/ui'

const LEVELS = ['All Levels', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10']

interface Referral {
  name: string
  email: string
  initials: string
  level: string
  country: string
  totalBalance: string
  dateJoined: string
}

const REFERRALS: Referral[] = [
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', level: 'Level 1', country: 'United Kingdom', totalBalance: '$12,450.00', dateJoined: 'Oct 24, 2025' },
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', level: 'Level 2', country: 'Germany', totalBalance: '$8,120.50', dateJoined: 'Nov 12, 2025' },
  { name: 'Ana Pinzón', email: 'anakpinzon72@gmail.com', initials: 'AP', level: 'Level 3', country: 'Italy', totalBalance: '$8,120.50', dateJoined: 'Dec 05, 2025' },
]


function DropdownSelect() {
  return (
    <div className="relative bg-[#0c1311] border border-gfx-green-200 rounded-[30px] h-[46px] w-[259px] flex items-center">
      <div className="flex items-center gap-2.5 pl-4 py-2.5">
        <span className="text-gfx-neutral-300 text-base font-acid">All Referrals</span>
      </div>
      <svg className="absolute right-6 top-1/2 -translate-y-1/2" width="13" height="8" viewBox="0 0 13 8" fill="none">
        <path d="M5.036 7.107L0.433 2.504C-0.49 1.58 0.164 0 1.47 0h9.206c1.306 0 1.961 1.58 1.037 2.504L7.11 7.107a1.465 1.465 0 0 1-2.074 0z" fill="#808080" />
      </svg>
    </div>
  )
}

function AvatarCircle({ initials }: { initials: string }) {
  return (
    <div className="w-[47px] h-[47px] rounded-full bg-gfx-green-800 flex items-center justify-center shrink-0">
      <span className="text-gfx-green-500 text-[16.3px] font-acid">{initials}</span>
    </div>
  )
}

function LevelBadge({ level }: { level: string }) {
  return (
    <span className="inline-flex items-center justify-center px-[26px] py-2.5 rounded-[32px] border border-[#303030] text-white text-sm font-acid leading-[18.8px]">
      {level}
    </span>
  )
}

function EyeIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <path d="M4.263 4.4a1.237 1.237 0 1 1 2.475 0 1.237 1.237 0 0 1-2.475 0z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 4.4c0 .902.234 1.206.701 1.813C1.635 7.426 3.2 8.8 5.5 8.8c2.3 0 3.866-1.374 4.8-2.587.467-.607.7-.911.7-1.813s-.233-1.205-.7-1.813C9.366 1.375 7.8 0 5.5 0S1.635 1.375.701 2.588C.234 3.195 0 3.499 0 4.4zm5.5-2.063a2.063 2.063 0 1 0 0 4.126 2.063 2.063 0 0 0 0-4.126z" fill="white" />
    </svg>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-[0.66rem]">
      <span className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem]">{label}</span>
      <span className="text-white text-base font-acid leading-[1.2rem]">{value}</span>
    </div>
  )
}

function InfoBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-5 py-3 rounded-[2.554rem] border border-[#303030] text-[#ECECEC] text-base font-acid leading-[1.2rem]">
      {text}
    </span>
  )
}

function ReferralDetailsModal({ open, onClose, referral }: { open: boolean; onClose: () => void; referral: Referral | null }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) { onClose(); return }
    gsap.to(modal, { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlay, { opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => { setMounted(false); onClose() } })
  }, [onClose])

  useEffect(() => { if (open) setMounted(true) }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) return
    gsap.set(overlay, { opacity: 0 })
    gsap.set(modal, { opacity: 0, scale: 0.96 })
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modal, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, handleClose])

  if (!mounted || !referral) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gfx-overlay backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Referral Details"
    >
      <GlassCard ref={modalRef} variant="light" divider="none" rounded="1.481rem" className="w-[51.636rem] max-w-[95vw] overflow-hidden" style={{ background: '#0C1311' }}>
        {/* Hero banner */}
        <div className="relative h-[14.924rem] overflow-hidden" style={{ background: '#0C1311' }}>
          <div className="absolute w-[39.345rem] h-[22.186rem] left-[3.751rem] top-[0.958rem] rounded-full pointer-events-none" style={{ background: '#064B34', filter: 'blur(200.67px)' }} aria-hidden="true" />
          <h2 className="absolute left-[2.394rem] top-[3.411rem] text-white text-2xl font-acid">Referral Details</h2>
          <div className="absolute right-[2.394rem] top-[8.522rem]">
            <span className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem]">Joined</span>
          </div>
          <div className="absolute right-[2.394rem] top-[10.278rem]">
            <span className="text-[#ECECEC] text-base font-acid font-medium leading-[1.527rem]">June 5, 2026</span>
          </div>
        </div>

        {/* Avatar + user info */}
        <div className="absolute left-[1.996rem] top-[7.502rem] flex items-center gap-[4.625rem]">
          <div className="w-[3.75rem] h-[3.75rem] rounded-full bg-[#0C1311] flex items-center justify-center">
            <span className="text-gfx-green-300 text-2xl font-acid">{referral.initials}</span>
          </div>
          <div className="-ml-[2.5rem]">
            <p className="text-[#ECECEC] text-base font-acid font-medium leading-[1.527rem]">{referral.name}</p>
            <p className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem]">{referral.email}</p>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-[2.234rem] py-10 relative z-10">
          {/* Personal Info */}
          <div className="bg-[#0C1311] rounded-[1.481rem] border-[1.48px] border-[#0C1311] p-6 shadow-[0px_5.93px_29.63px_rgba(0,0,0,0.03)] flex flex-col">
            <h3 className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem] mb-3">PERSONAL INFO</h3>
            <div className="flex flex-col justify-between flex-1">
              <InfoRow label="NAME" value={referral.name} />
              <InfoRow label="EMAIL" value={referral.email} />
              <InfoRow label="PHONE" value="04263942342" />
              <InfoRow label="COUNTRY" value="AR Argentina" />
            </div>
          </div>

          {/* Referral Info */}
          <div className="bg-[#0C1311] rounded-[1.481rem] border-[1.48px] border-[#0C1311] p-6 shadow-[0px_5.93px_29.63px_rgba(0,0,0,0.03)] flex flex-col">
            <h3 className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem] mb-3">REFERRAL INFO</h3>
            <div className="flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem]">LEVEL</span>
                <span className="text-white text-base font-acid leading-[1.2rem]">{referral.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem]">STATUS</span>
                <InfoBadge text="Active" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem]">CODE</span>
                <InfoBadge text="GFX605D9386" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A0A0A0] text-base font-acid font-medium leading-[1.527rem]">COUNTRY</span>
                <InfoBadge text="Inactive" />
              </div>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-5 top-5 w-6 h-6"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </GlassCard>
    </div>
  )
}

function DetailsButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-3.5 h-[46px] px-[18px] rounded-[32px] border border-[#303030] text-[#ececec] text-base font-acid font-medium leading-[24.44px] cursor-pointer hover:border-gfx-green-200 transition-colors">
      <EyeIcon />
      Details
    </button>
  )
}

export default function ReferralsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeLevelIndex, setActiveLevelIndex] = useState(LEVELS.length - 1)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null)

  const breadcrumbItems = [
    { label: 'Referrals', current: true },
  ]

  return (
    <>
      <ReferralDetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} referral={selectedReferral} />
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-acid text-white pb-6 lg:pb-15">Referrals</h1>

        <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
          <div className="relative">
            <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

            {/* Green glow inside card */}
            <div className="absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

            {/* Green gradient divider at top */}
            <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

            {/* Header: "All Referals" */}
            <div className="border-b border-gfx-green-800 px-6 py-0 h-[84px] flex items-center">
              <h2 className="text-2xl font-acid text-white">All Referals</h2>
            </div>

            {/* Filters row */}
            <div className="flex items-center justify-between gap-4 flex-wrap px-4 sm:px-6 py-4">
              <div className="overflow-x-auto max-w-full w-full lg:w-[556px]">
                <ModeToggle options={LEVELS} activeIndex={activeLevelIndex} onChange={setActiveLevelIndex} size="sm" />
              </div>
              <div className="flex items-center gap-3">
                <SearchInput placeholder="Search " className="w-[200px] sm:w-[287px]" />
                <DropdownSelect />
              </div>
            </div>

            {/* Table (scrollable on small screens) */}
            <div className="overflow-x-auto">
            {/* Table header row */}
            <div className="border-b border-gfx-green-800 h-[40px] flex items-center px-6 min-w-[52rem]">
              <div className="grid grid-cols-[minmax(15rem,2fr)_minmax(6rem,0.8fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)] w-full items-center">
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">User</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">LEvel</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">country</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">total balance</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">date joined</span>
                <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">actions</span>
              </div>
            </div>

            {/* Table rows */}
            {REFERRALS.map((referral, i) => (
              <div key={i} className="border-b border-gfx-green-800 last:border-b-0 h-[76px] flex items-center px-6 min-w-[52rem]">
                <div className="grid grid-cols-[minmax(15rem,2fr)_minmax(6rem,0.8fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)] w-full items-center">
                  {/* User */}
                  <div className="flex items-center gap-4">
                    <AvatarCircle initials={referral.initials} />
                    <div>
                      <p className="text-base font-acid font-medium text-[#ececec] leading-[24.44px]">{referral.name}</p>
                      <p className="text-sm font-acid text-[#606060] leading-[18.8px]">{referral.email}</p>
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <LevelBadge level={referral.level} />
                  </div>

                  {/* Country */}
                  <span className="text-sm font-acid text-white leading-[18.8px]">{referral.country}</span>

                  {/* Total Balance */}
                  <span className="text-sm font-acid text-white leading-[18.8px]">{referral.totalBalance}</span>

                  {/* Date Joined */}
                  <span className="text-sm font-acid text-white leading-[18.8px]">{referral.dateJoined}</span>

                  {/* Actions */}
                  <div>
                    <DetailsButton onClick={() => { setSelectedReferral(referral); setDetailsOpen(true) }} />
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
