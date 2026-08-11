import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SearchInput, GlowEllipse, ModeToggle, SparkleButton } from '@/components/ui'
import { PartnerQrCodeIcon, PartnerShareIcon, PartnerCopyIcon } from '@/components/partner/shared'

const TABS = ['Marketing Library', 'Landing Pages', 'Referral Links']

interface Material {
  type: 'image' | 'video' | 'document'
  title: string
  category: string
  description: string
}

const MATERIALS: Material[] = [
  { type: 'image', title: 'Icon Logo', category: 'Logos', description: 'Square logo icon for social sharing' },
  { type: 'image', title: 'Icon Logo', category: 'Logos', description: 'Square logo icon for social sharing' },
]

function GalleryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" fill="#00B38C" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62178 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62178 21.25 12C21.25 12.4502 21.2499 12.8764 21.2487 13.2804L21.0266 13.2497C18.1828 12.8559 15.5805 14.3343 14.2554 16.5626C12.5459 12.2376 8.02844 9.28807 2.98073 10.0129L2.75497 10.0454C2.76633 8.63992 2.80368 7.52616 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z" fill="#00B38C" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M20.3708 3.46447C18.9063 2 16.5493 2 11.8352 2C7.12119 2 4.76417 2 3.2997 3.46447C2.54222 4.22195 2.17653 5.21824 2 6.65598C2.53066 6.06532 3.16829 5.57328 3.8843 5.20846C4.66578 4.81027 5.50258 4.6488 6.4291 4.5731C7.32423 4.49997 8.42564 4.49998 9.7724 4.5H13.8981C15.2448 4.49998 16.3462 4.49997 17.2414 4.5731C18.1679 4.6488 19.0047 4.81027 19.7862 5.20846C20.5022 5.57328 21.1398 6.06532 21.6705 6.65598C21.4939 5.21824 21.1283 4.22195 20.3708 3.46447Z" fill="#808080" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 14.6562C2 11.856 2 10.4559 2.54497 9.3863C3.02433 8.44549 3.78924 7.68058 4.73005 7.20122C5.79961 6.65625 7.19974 6.65625 10 6.65625H14C16.8003 6.65625 18.2004 6.65625 19.27 7.20122C20.2108 7.68058 20.9757 8.44549 21.455 9.3863C22 10.4559 22 11.856 22 14.6562C22 17.4565 22 18.8566 21.455 19.9262C20.9757 20.867 20.2108 21.6319 19.27 22.1113C18.2004 22.6562 16.8003 22.6562 14 22.6562H10C7.19974 22.6562 5.79961 22.6562 4.73005 22.1113C3.78924 21.6319 3.02433 20.867 2.54497 19.9262C2 18.8566 2 17.4565 2 14.6562ZM12.5303 18.1866C12.3897 18.3272 12.1989 18.4062 12 18.4062C11.8011 18.4062 11.6103 18.3272 11.4697 18.1866L8.96967 15.6866C8.67678 15.3937 8.67678 14.9188 8.96967 14.6259C9.26256 14.333 9.73744 14.333 10.0303 14.6259L11.25 15.8456V11.6562C11.25 11.242 11.5858 10.9062 12 10.9062C12.4142 10.9062 12.75 11.242 12.75 11.6562V15.8456L13.9697 14.6259C14.2626 14.333 14.7374 14.333 15.0303 14.6259C15.3232 14.9188 15.3232 15.3937 15.0303 15.6866L12.5303 18.1866Z" fill="#808080" />
    </svg>
  )
}

function BentoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 4.63415C0 2.07478 2.07478 0 4.63415 0C7.19351 0 9.26829 2.07478 9.26829 4.63415C9.26829 7.19351 7.19351 9.26829 4.63415 9.26829C2.07478 9.26829 0 7.19351 0 4.63415Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.7317 15.3659C10.7317 12.8065 12.8065 10.7317 15.3659 10.7317C17.9252 10.7317 20 12.8065 20 15.3659C20 17.9252 17.9252 20 15.3659 20C12.8065 20 10.7317 17.9252 10.7317 15.3659Z" fill="currentColor"/>
      <path d="M0 15.5C0 13.3787 0 12.318 0.65901 11.659C1.31802 11 2.37868 11 4.5 11C6.62132 11 7.68198 11 8.34099 11.659C9 12.318 9 13.3787 9 15.5C9 17.6213 9 18.682 8.34099 19.341C7.68198 20 6.62132 20 4.5 20C2.37868 20 1.31802 20 0.65901 19.341C0 18.682 0 17.6213 0 15.5Z" fill="currentColor"/>
      <path d="M11 4.5C11 2.37868 11 1.31802 11.659 0.65901C12.318 0 13.3787 0 15.5 0C17.6213 0 18.682 0 19.341 0.65901C20 1.31802 20 2.37868 20 4.5C20 6.62132 20 7.68198 19.341 8.34099C18.682 9 17.6213 9 15.5 9C13.3787 9 12.318 9 11.659 8.34099C11 7.68198 11 6.62132 11 4.5Z" fill="currentColor"/>
    </svg>
  )
}

function ReferralLinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.46447 18.5355C2.92893 20 5.28595 20 10 20C14.714 20 17.0711 20 18.5355 18.5355C20 17.0711 20 14.714 20 10C20 5.28595 20 2.92893 18.5355 1.46447C17.0711 0 14.714 0 10 0C5.28595 0 2.92893 0 1.46447 1.46447C0 2.92893 0 5.28595 0 10C0 14.714 0 17.0711 1.46447 18.5355ZM7.5 6.75C5.70507 6.75 4.25 8.20507 4.25 10C4.25 11.7949 5.70507 13.25 7.5 13.25C9.29493 13.25 10.75 11.7949 10.75 10C10.75 9.58579 11.0858 9.25 11.5 9.25C11.9142 9.25 12.25 9.58579 12.25 10C12.25 12.6234 10.1234 14.75 7.5 14.75C4.87665 14.75 2.75 12.6234 2.75 10C2.75 7.37665 4.87665 5.25 7.5 5.25C7.91421 5.25 8.25 5.58579 8.25 6C8.25 6.41421 7.91421 6.75 7.5 6.75ZM15.75 10C15.75 11.7949 14.2949 13.25 12.5 13.25C12.0858 13.25 11.75 13.5858 11.75 14C11.75 14.4142 12.0858 14.75 12.5 14.75C15.1234 14.75 17.25 12.6234 17.25 10C17.25 7.37665 15.1234 5.25 12.5 5.25C9.87665 5.25 7.75 7.37665 7.75 10C7.75 10.4142 8.08579 10.75 8.5 10.75C8.91421 10.75 9.25 10.4142 9.25 10C9.25 8.20507 10.7051 6.75 12.5 6.75C14.2949 6.75 15.75 8.20507 15.75 10Z" fill="#00B38C"/>
    </svg>
  )
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center px-3 h-[24px] rounded-[30px] border-[1.16px] border-[#303030] bg-gfx-dark text-xs font-acid text-white leading-[18.8px]">
      {label}
    </span>
  )
}

function DownloadButton() {
  return (
    <button type="button" className="flex items-center gap-[10px] px-[19px] py-[10px] rounded-[60px] border border-[#303030] cursor-pointer hover:border-gfx-green-200 transition-colors">
      <DownloadIcon />
      <span className="text-sm font-acid text-white leading-[18.8px]">Download</span>
    </button>
  )
}

const GRID_COLS = 'grid-cols-[3rem_minmax(8rem,1.2fr)_minmax(5rem,0.8fr)_minmax(12rem,2fr)_minmax(8rem,1fr)]'

export default function MarketingPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [search, setSearch] = useState('')

  const breadcrumbItems = [
    { label: 'Marketing', current: true },
  ]

  const filtered = MATERIALS.filter(m =>
    !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 pb-30 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-acid text-white pb-6 lg:pb-15">Partner Marketing Tools</h1>

        <div className="w-full lg:w-5xl mx-auto flex flex-col gap-8">
          <div className="w-full sm:w-sm">
            <ModeToggle options={TABS} activeIndex={activeTabIndex} onChange={setActiveTabIndex} size="sm" />
          </div>

        {activeTabIndex === 1 ? (
          <GlassCard variant="light" divider="none" rounded="19px" className="w-full overflow-hidden" style={{ background: 'var(--color-gfx-green-800)', boxShadow: '0px 4.641px 23.204px rgba(0,0,0,0.03)' }}>
            <div className="flex flex-col items-center justify-center h-[23.75rem]">
              <div className="flex items-center justify-center w-[3.375rem] h-[3.375rem] rounded-full bg-gfx-green-900 text-gfx-green-300">
                <BentoIcon />
              </div>
              <h2 className="mt-7 text-2xl font-acid text-white">Landing pages coming soon</h2>
              <p className="mt-4 text-base font-acid text-gfx-neutral-400 text-center max-w-[22.625rem] leading-[1.2]">
                Custom branded landing pages to convert your audience into traders. Stay tuned!
              </p>
            </div>
          </GlassCard>
        ) : activeTabIndex === 2 ? (
          <GlassCard variant="light" divider="none" rounded="19px" className="w-full overflow-hidden" style={{ background: 'var(--color-gfx-green-800)', boxShadow: '0px 4.641px 23.204px rgba(0,0,0,0.03)' }}>
            <div className="relative">
              <div className="absolute top-0 left-[14%] right-0 h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />
              <div className="absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-green-200 [filter:url(#blur-157)]" aria-hidden="true" />

              <div className="flex flex-col lg:flex-row gap-6 p-6 sm:p-[3.3rem]">
                <div className="flex flex-col gap-5 flex-1 min-w-0 justify-center">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-[2.625rem] h-[2.625rem] rounded-[0.73rem] bg-gfx-green-900 shrink-0">
                      <ReferralLinkIcon />
                    </div>
                    <h2 className="text-2xl font-acid text-white">Referral Link</h2>
                  </div>
                  <p className="text-sm font-acid leading-[18.8px] max-w-[27.4rem]">
                    <span className="text-gfx-neutral-400">Earn multi-level commissions from your referral network up to </span>
                    <span className="text-gfx-green-300">10 levels deep.</span>
                    <span className="text-gfx-neutral-400"> Commission rates vary by asset class (Forex, Crypto, Metals, Indices) and account type. Share your links to build your trading community and generate passive income from every trade your network makes</span>
                  </p>
                </div>

                <GlassCard variant="light" divider="none" rounded="1.16rem" className="w-full lg:w-[31.8rem] shrink-0 overflow-hidden" style={{ background: '#0C1311', boxShadow: '0px 4.641px 23.204px rgba(0,0,0,0.03)' }}>
                  <div className="p-[2.5rem_2.6rem] flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center h-7 px-[1.125rem] rounded-[30px] bg-[#0C1311] border-[1.16px] border-[#064B34]">
                        <span className="text-xs font-acid text-[#00B38C] leading-[18.8px]">GFX605D9D38</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <button type="button" aria-label="Show QR code" className="flex items-center justify-center w-[2.125rem] h-[2.125rem] rounded-full bg-[#09241C] cursor-pointer hover:opacity-80 transition-opacity">
                          <PartnerQrCodeIcon />
                        </button>
                        <button type="button" aria-label="Share link" className="flex items-center justify-center w-[2.125rem] h-[2.125rem] rounded-full bg-[#09241C] cursor-pointer hover:opacity-80 transition-opacity">
                          <PartnerShareIcon />
                        </button>
                        <button type="button" aria-label="Copy link" className="flex items-center justify-center w-[2.125rem] h-[2.125rem] rounded-full bg-[#09241C] cursor-pointer hover:opacity-80 transition-opacity">
                          <PartnerCopyIcon />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center h-[2.875rem] px-4 rounded-[2.5rem] border border-[#064B34] bg-[#0C1311]">
                      <span className="text-xs font-acid text-[#808080] leading-[18.8px] truncate">https://dashboard.genesisfxmarkets.com/a</span>
                    </div>

                    <SparkleButton fullWidth>View Comission Rates</SparkleButton>
                  </div>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        ) : (
          <GlassCard variant="light" divider="none" rounded="19px" className="w-full overflow-hidden">
            <div className="relative">
              <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

              <div className="absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

              <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

              <div className="px-6 pt-6 pb-4 flex flex-col gap-4">
                <h2 className="text-base font-acid font-medium text-white leading-[24.44px]">Marketing Materials Library</h2>
                <SearchInput placeholder="Search materials..." value={search} onChange={setSearch} className="w-full max-w-[417px]" />
              </div>

              <div className="overflow-x-auto">
                <div className="border-b border-[#09241C] h-[40px] flex items-center px-6 min-w-[48rem]">
                  <div className={`grid ${GRID_COLS} w-full items-center`}>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Type</span>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Title</span>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Category</span>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Description</span>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-gfx-neutral-400 leading-[15.68px]">Action</span>
                  </div>
                </div>

                {filtered.map((item, i) => (
                  <div key={i} className="border-b border-[#09241C] last:border-b-0 h-[76px] flex items-center px-6 min-w-[48rem]">
                    <div className={`grid ${GRID_COLS} w-full items-center`}>
                      <div>
                        <GalleryIcon />
                      </div>
                      <span className="text-sm font-acid text-white leading-[18.8px]">{item.title}</span>
                      <div>
                        <CategoryBadge label={item.category} />
                      </div>
                      <span className="text-sm font-acid text-white leading-[18.8px]">{item.description}</span>
                      <div>
                        <DownloadButton />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        )}
        </div>
      </div>
    </>
  )
}
