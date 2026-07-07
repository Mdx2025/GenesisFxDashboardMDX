import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { FloatingNavBar, GlowButton } from '@/components/ui'

function HourglassIllustration() {
  return (
    <div className="relative w-[280px] h-[280px] mx-auto">
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="134" height="227" viewBox="0 0 134 227" fill="none">
        <g filter="url(#hg-frame)">
          <path d="M67.16 166.38H12.01V131.28c0-2.25.85-4.43 2.37-6.09l33.82-36.86c3.2-3.48 3.16-8.85-.09-12.28L14.47 40.51c-1.58-1.67-2.47-3.89-2.47-6.19V0h55.16v166.38zm54.42-166.38v34.36c0 2.28-.87 4.48-2.42 6.15L85.93 76.09c-3.2 3.42-3.24 8.72-.1 12.19l33.42 36.92c1.5 1.66 2.33 3.81 2.33 6.05v35.14H67.16V0h54.42z" fill="#F8F8F8" fillOpacity="0.025" style={{ mixBlendMode: 'luminosity' }} shapeRendering="crispEdges" />
        </g>
        <defs>
          <filter id="hg-frame" x="-6" y="-18" width="146" height="245" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="bg" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha" />
            <feMorphology radius="24" operator="erode" in="SourceAlpha" result="ds" />
            <feOffset dy="48" />
            <feGaussianBlur stdDeviation="18" />
            <feComposite in2="ha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
            <feBlend in2="bg" result="shadow" />
            <feBlend in="SourceGraphic" in2="shadow" result="shape" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha2" />
            <feOffset />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="ha2" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix values="0 0 0 0 0.97 0 0 0 0 0.97 0 0 0 0 0.97 0 0 0 0.25 0" />
            <feBlend in2="shape" />
          </filter>
        </defs>
      </svg>

      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="92" height="108" viewBox="0 0 92 108" fill="none">
        <path d="M67.67 0H25.13c-1.31 0-1.99 1.56-1.1 2.52l19.6 21.1c.26.27.4.64.4 1.02v39.43c0 .36-.13.71-.37.99L29.36 81.4c-.29.33-.7.52-1.13.52H1.5c-.83 0-1.5.67-1.5 1.5v23.08c0 .83.67 1.5 1.5 1.5h89c.83 0 1.5-.67 1.5-1.5V83.42c0-.83-.67-1.5-1.5-1.5H64.74c-.43 0-.85-.19-1.13-.51L50.31 65.06a1.5 1.5 0 0 1-.37-.99V24.61c0-.36.13-.71.37-.99L69.8 2.49C70.64 1.52 69.95 0 68.67 0z" fill="#CFF2E6" />
      </svg>

      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="119" height="135" viewBox="0 0 119 135" fill="none">
        <g filter="url(#hg-glow)">
          <path d="M81.02 13.36H38.49c-1.31 0-1.99 1.56-1.1 2.52l19.6 21.1c.26.27.4.64.4 1.02v39.43c0 .36-.13.71-.37.99L42.72 94.76c-.29.33-.7.52-1.13.52H14.86c-.83 0-1.5.67-1.5 1.5v23.08c0 .83.67 1.5 1.5 1.5h89c.83 0 1.5-.67 1.5-1.5V96.78c0-.83-.67-1.5-1.5-1.5H79.1c-.43 0-.85-.19-1.13-.51L63.67 78.42a1.5 1.5 0 0 1-.37-.99V37.97c0-.36.13-.71.37-.99L82.15 15.85c.85-.97.16-2.49-1.13-2.49z" fill="#10BC83" />
        </g>
        <defs>
          <filter id="hg-glow" x="0" y="0" width="119" height="135" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="bg" />
            <feBlend in="SourceGraphic" in2="bg" result="shape" />
            <feGaussianBlur stdDeviation="6.68" result="blur" />
          </filter>
        </defs>
      </svg>

      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="133" height="143" viewBox="0 0 133 143" fill="none">
        <g filter="url(#hg-detail)">
          <path d="M67.43 0h-1.09c-7.76 0-11.65 0-13.51 1.56a7.5 7.5 0 0 0-2.39 5.49c.13 2.42 2.78 5.26 8.07 10.95l2.71 2.92c1.06 1.14 1.59 1.71 1.97 2.36a7.5 7.5 0 0 1 .73 1.86c.17.74.17 1.51.17 3.07v32.25c0 1.49 0 2.24-.16 2.94a7.5 7.5 0 0 1-.67 1.8 7.5 7.5 0 0 1-1.82 2.31l-9.26 10.57c-1.18 1.34-1.77 2.02-2.48 2.5a7.5 7.5 0 0 1-2.06.94 7.5 7.5 0 0 1-2.07.22H30.2c-3.21 0-4.82 0-6.08.54a6 6 0 0 0-3.51 3.51c-.54 1.26-.54 2.87-.54 6.08s0 4.82.54 6.08a6 6 0 0 0 3.51 3.51c1.26.54 2.87.54 6.08.54h71.73c3.21 0 4.82 0 6.08-.54a6 6 0 0 0 3.51-3.51c.54-1.26.54-2.87.54-6.08s0-4.82-.54-6.08a6 6 0 0 0-3.51-3.51c-1.26-.54-2.87-.54-6.08-.54H89.97a7.5 7.5 0 0 1-2.07-.22 7.5 7.5 0 0 1-2.06-.94c-.71-.48-1.3-1.16-2.48-2.5l-9.26-10.57a7.5 7.5 0 0 1-1.82-2.31 7.5 7.5 0 0 1-.67-1.8c-.16-.71-.16-1.45-.16-2.94V28.02c0-1.49 0-2.24.16-2.94a7.5 7.5 0 0 1 .67-1.8 7.5 7.5 0 0 1 1.82-2.31l2.81-3.21c4.94-5.64 7.41-8.46 7.49-10.85a7.5 7.5 0 0 0-2.44-5.39C80.67 0 76.93 0 69.43 0h-2z" fill="#F8F8F8" fillOpacity="0.1" style={{ mixBlendMode: 'luminosity' }} shapeRendering="crispEdges" />
          <path d="M66.34.63h1.09c3.76 0 6.54 0 8.61.19 2.09.19 3.32.56 4.09 1.19a6.25 6.25 0 0 1 2.26 4.88c-.03 1-.57 2.17-1.8 3.86a83 83 0 0 1-5.53 6.6l-2.81 3.21a6.25 6.25 0 0 0-1.9 4.46v32.44c0 1.46 0 2.29.17 3.08.15.69.4 1.35.74 1.96.29.53.67 1.01 1.25 1.68l.65.74 9.26 10.57c1.15 1.32 1.8 2.06 2.6 2.6.69.47 1.45.79 2.26 1a6.25 6.25 0 0 0 1.86.24h11.95c1.62 0 2.8 0 3.73.07.93.07 1.57.19 2.11.42a4.75 4.75 0 0 1 2.57 2.57c.23.54.35 1.18.42 2.11.07.93.07 2.11.07 3.73s0 2.8-.07 3.73c-.07.93-.19 1.57-.42 2.11a4.75 4.75 0 0 1-2.57 2.57c-.54.23-1.18.35-2.11.42-.93.07-2.11.07-3.73.07H30.2c-1.62 0-2.8 0-3.73-.07-.93-.07-1.57-.19-2.11-.42a4.75 4.75 0 0 1-2.57-2.57c-.23-.54-.35-1.18-.42-2.11a50 50 0 0 1-.07-3.73c0-1.62 0-2.8.07-3.73.07-.93.19-1.57.42-2.11a4.75 4.75 0 0 1 2.57-2.57c.54-.23 1.18-.35 2.11-.42.93-.07 2.11-.07 3.73-.07h13.93c1.75 0 2.74 0 3.67-.24.81-.21 1.57-.55 2.26-1 .79-.54 1.45-1.28 2.6-2.6l9.26-10.57.65-.74a6.25 6.25 0 0 0 1.25-1.68c.34-.61.58-1.27.74-1.96.17-.79.17-1.62.17-3.08V28.2c0-1.53 0-2.37-.18-3.21a6.25 6.25 0 0 0-.82-2.14 6.25 6.25 0 0 0-1.55-1.49l-2.71-2.92C45.85 14.72 43.88 12.61 42.56 10.91c-1.33-1.69-1.91-2.88-1.97-3.88a6.25 6.25 0 0 1 2.17-4.98c.77-.65 2.04-1.03 4.2-1.22C49.03.63 51.91.63 55.8.63h10.54z" stroke="url(#hg-border)" strokeOpacity="0.25" strokeWidth="1.25" shapeRendering="crispEdges" />
        </g>
        <defs>
          <filter id="hg-detail" x="0" y="0" width="133" height="143" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="bg" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha" />
            <feOffset dy="20" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="ha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
            <feBlend in2="bg" result="shadow" />
            <feBlend in="SourceGraphic" in2="shadow" result="shape" />
          </filter>
          <linearGradient id="hg-border" x1="66" y1="0" x2="114" y2="109" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="0.4" stopColor="white" stopOpacity="0.01" />
            <stop offset="0.6" stopColor="white" stopOpacity="0.01" />
            <stop offset="1" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute left-1/2 -translate-x-1/2 top-[32px] w-[110px] h-[12px] bg-[#3A3A3A]" />
      <div className="absolute left-1/2 -translate-x-1/2 top-[187px] w-[110px] h-[12px] bg-[#3A3A3A]" />

      <div className="absolute left-[72%] top-[17%] w-[3px] h-[3px] rounded-full bg-white [filter:url(#blur-2)]" />
      <div className="absolute left-[67%] top-[19%] w-[3px] h-[3px] rounded-full bg-white opacity-50 [filter:url(#blur-2)]" />
      <div className="absolute left-[63%] top-[21%] w-[3px] h-[3px] rounded-full bg-[#ACACAC] [filter:url(#blur-2)]" />
      <div className="absolute left-[67%] top-[12%] w-[3px] h-[3px] rounded-full bg-[#ACACAC] [filter:url(#blur-2)]" />
      <div className="absolute left-[57%] top-[20%] w-[3px] h-[3px] rounded-full bg-[#ACACAC] [filter:url(#blur-2)]" />
      <div className="absolute left-[55%] top-[13%] w-[2px] h-[2px] rounded-full bg-[#8C8C8C] [filter:url(#blur-2)]" />
      <div className="absolute left-[42%] top-[18%] w-[3px] h-[2px] rounded-full bg-[#8C8C8C] [filter:url(#blur-2)]" />

      <div className="absolute left-[72%] top-[43%] w-[3px] h-[3px] rounded-full bg-white [filter:url(#blur-2)]" />
      <div className="absolute left-[67%] top-[45%] w-[3px] h-[3px] rounded-full bg-white opacity-50 [filter:url(#blur-2)]" />
      <div className="absolute left-[63%] top-[47%] w-[3px] h-[3px] rounded-full bg-[#ACACAC] [filter:url(#blur-2)]" />
      <div className="absolute left-[67%] top-[38%] w-[3px] h-[3px] rounded-full bg-[#ACACAC] [filter:url(#blur-2)]" />
      <div className="absolute left-[57%] top-[46%] w-[3px] h-[3px] rounded-full bg-[#ACACAC] [filter:url(#blur-2)]" />
      <div className="absolute left-[55%] top-[39%] w-[2px] h-[2px] rounded-full bg-[#8C8C8C] [filter:url(#blur-2)]" />
      <div className="absolute left-[42%] top-[44%] w-[3px] h-[2px] rounded-full bg-[#8C8C8C] [filter:url(#blur-2)]" />
    </div>
  )
}

export default function WithdrawProcessingPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const amount = params.get('amount') || '60.00'
  const coin = params.get('coin') || 'USDT'

  const now = new Date()
  now.setMinutes(now.getMinutes() + 30)
  const estimatedTime = now.toISOString().replace('T', ' ').slice(0, 19)

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={[
            { label: 'Assets Management', href: '/assets-management' },
            { label: 'Funding', href: '/assets-management' },
            { label: 'Withdraw', href: '/withdraw' },
            { label: 'Processing', current: true },
          ]}
        />

        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="relative z-10 text-center max-w-[500px] w-full animate-[fadeInStep_0.5s_ease-out]">
            <HourglassIllustration />

            <p className="text-[#A0A0A0] text-[24px] font-normal mt-4">Withdrawal Processing</p>
            <p className="text-white text-[clamp(2rem,8vw,50px)] font-normal mt-2 leading-tight">
              {amount} {coin}
            </p>

            <div className="mt-8 space-y-1">
              <p className="text-[#A0A0A0] text-[16px] font-medium leading-6">
                Estimated completion time: {estimatedTime}
              </p>
              <p className="text-[#A0A0A0] text-[16px] font-medium leading-6">
                You will receive an email once withdrawal is completed.
              </p>
              <p className="text-[#A0A0A0] text-[16px] font-medium leading-6">
                View History for the latest updates
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <GlowButton label="View History" width={180} height={44} onClick={() => navigate('/assets-management')} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[300px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingNavBar />
      </div>
    </>
  )
}
