import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlowButton } from '@/components/ui'

function EnvelopeIcon() {
  return (
    <div className="w-[42px] h-[42px] rounded-[11.667px] bg-gfx-green-900 flex items-center justify-center shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM18.7071 7.79289C19.0976 8.18342 19.0976 8.81658 18.7071 9.20711L14.9071 13.0071C13.2985 14.6157 10.7015 14.6157 9.09289 13.0071L5.29289 9.20711C4.90237 8.81658 4.90237 8.18342 5.29289 7.79289C5.68342 7.40237 6.31658 7.40237 6.70711 7.79289L10.5071 11.5929C11.3348 12.4206 12.6652 12.4206 13.4929 11.5929L17.2929 7.79289C17.6834 7.40237 18.3166 7.40237 18.7071 7.79289Z" fill="#00B38C" />
      </svg>
    </div>
  )
}

function WalletIcon() {
  return (
    <div className="w-[42px] h-[42px] rounded-[11.667px] bg-gfx-green-900 flex items-center justify-center shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" fill="#00B38C" />
        <path d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z" fill="#064B34" />
        <path d="M20 8H16C14.1144 8 13.1716 8 12.5858 8.58579C12 9.17157 12 10.1144 12 12C12 13.8856 12 14.8284 12.5858 15.4142C13.1716 16 14.1144 16 16 16H20" fill="#064B34" fillOpacity="0.5" />
      </svg>
    </div>
  )
}

export default function PayoutsPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [amount, setAmount] = useState('0.00')
  const [agreed, setAgreed] = useState(false)

  const breadcrumbItems = [
    { label: 'Payouts', current: true },
  ]

  return (
    <>
      <div className="theme-decorative-glow absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-acid text-white pb-6 lg:pb-15">Partner Payouts</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 3xl:gap-6">
          <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
            <div className="relative p-6 sm:p-10 min-h-[462px]">
              <div className="theme-decorative-glow absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

              <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

              <h2 className="text-2xl font-acid text-white mb-8">Request Payout</h2>

              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-0 mb-6">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon />
                  <span className="text-base font-acid text-white leading-[1.2]">Withdraw to Main Wallet</span>
                </div>

                <div className="flex items-center gap-3">
                  <WalletIcon />
                  <div className="text-right">
                    <p className="text-base font-acid font-medium text-gfx-neutral-500 leading-[24.44px]">Available </p>
                    <p className="text-base font-acid font-medium text-gfx-green-300 leading-[24.44px]">$0.00</p>
                  </div>
                </div>
              </div>

              <div className="relative mb-4">
                <input
                  type="text"
                  value={`$${amount}`}
                  onChange={e => {
                    const v = e.target.value.replace(/[^0-9.]/g, '')
                    setAmount(v)
                  }}
                  className="w-full h-[50px] rounded-[30px] bg-gfx-green-800 border border-gfx-green-300 px-6 text-base font-acid font-medium text-[#ececec] focus:outline-none leading-[24.44px]"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-base font-acid text-white">Max</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
                <p className="text-base font-acid font-medium text-gfx-neutral-500 leading-[24.44px]">Available balance:$0.00</p>

                <GlowButton label="Submit Request" width={210} />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-[21px] h-[21px] rounded-[5.17px] border-[0.517px] border-gfx-green-300 flex items-center justify-center shrink-0 ${agreed ? 'bg-gfx-green-200' : ''}`}
                  onClick={() => setAgreed(!agreed)}
                >
                  {agreed && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-base font-acid font-medium text-center">
                  <span className="text-white">I agree to </span>
                  <span className="text-gfx-green-300">Terms & Conditions</span>
                </span>
              </label>
            </div>
          </GlassCard>

          <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
            <div className="relative p-6 sm:p-10 min-h-[462px] flex flex-col">
              <h2 className="text-2xl font-acid text-white mb-8">Payout history</h2>

              <div className="flex-1 flex items-center justify-center">
                <p className="text-base font-acid font-medium text-gfx-neutral-400 leading-[24.44px]">No payout request found</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  )
}
