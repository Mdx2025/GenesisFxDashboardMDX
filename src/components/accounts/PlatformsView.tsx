import { GlowButton } from '@/components/ui'
import { SparkleButton } from '@/components/ui'

function BrowserIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" aria-hidden="true">
      <path d="M14.5 26.1C20.9065 26.1 26.1 20.9065 26.1 14.5C26.1 8.09345 20.9065 2.9 14.5 2.9C8.09345 2.9 2.9 8.09345 2.9 14.5C2.9 20.9065 8.09345 26.1 14.5 26.1Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.9 14.5H26.1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5 2.9C17.4686 6.15735 19.1613 10.2364 19.28 14.5C19.1613 18.7636 17.4686 22.8427 14.5 26.1C11.5314 22.8427 9.83873 18.7636 9.72 14.5C9.83873 10.2364 11.5314 6.15735 14.5 2.9Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M11.05 3.9L2.6 5.07V12.35H11.05V3.9Z" fill="white"/>
      <path d="M23.4 2.6V12.35H12.35V3.72L23.4 2.6Z" fill="white"/>
      <path d="M2.6 13.65H11.05V20.93L2.6 22.1V13.65Z" fill="white"/>
      <path d="M12.35 13.65H23.4V23.4L12.35 22.28V13.65Z" fill="white"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="22" height="27" viewBox="0 0 22 27" fill="none" aria-hidden="true">
      <path d="M18.1838 14.2725C18.1538 11.0925 20.7938 9.5625 20.9138 9.4875C19.4288 7.3275 17.1338 7.0425 16.3388 7.0125C14.3888 6.8175 12.4988 8.1975 11.5088 8.1975C10.4988 8.1975 8.96375 7.0325 7.31375 7.0625C5.18375 7.0925 3.19375 8.3375 2.10375 10.2675C-0.136254 14.1825 1.52375 19.8975 3.67375 23.0625C4.75375 24.6075 6.01375 26.3325 7.66375 26.2725C9.27375 26.2125 9.87375 25.2525 11.8088 25.2525C13.7238 25.2525 14.2838 26.2725 15.9638 26.2425C17.6938 26.2125 18.7838 24.6675 19.8238 23.1075C21.0638 21.3225 21.5538 19.5675 21.5738 19.4825C21.5338 19.4675 18.2188 18.1875 18.1838 14.2725Z" fill="white"/>
      <path d="M14.9988 4.935C15.8788 3.855 16.4838 2.385 16.3188 0.9C15.0438 0.96 13.4538 1.77 12.5388 2.82C11.7288 3.75 10.9988 5.265 11.1838 6.705C12.6138 6.81 14.0838 5.995 14.9988 4.935Z" fill="white"/>
    </svg>
  )
}

function IOSIcon() {
  return (
    <svg width="29" height="26" viewBox="0 0 29 26" fill="none" aria-hidden="true">
      <path d="M20.3 2.6H8.7C5.33 2.6 2.6 5.33 2.6 8.7V17.3C2.6 20.67 5.33 23.4 8.7 23.4H20.3C23.67 23.4 26.4 20.67 26.4 17.3V8.7C26.4 5.33 23.67 2.6 20.3 2.6Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5 8.7V17.3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.15 13L14.5 8.7L18.85 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlayStoreIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" aria-hidden="true">
      <path d="M4.35 3.262V25.738C4.35 26.332 4.989 26.706 5.51 26.406L25.11 15.168C25.624 14.872 25.624 14.128 25.11 13.832L5.51 2.594C4.989 2.294 4.35 2.668 4.35 3.262Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.35 25.375L18.125 13.775" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.35 3.625L18.125 15.225" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface PlatformItem {
  name: string
  subtitle: string
  icon: React.ReactNode
  action: 'launch' | 'download'
}

const PLATFORMS: PlatformItem[] = [
  { name: 'Browser-based Platform', subtitle: 'TradeLocker', icon: <BrowserIcon />, action: 'launch' },
  { name: 'Windows OS', subtitle: 'TradeLocker', icon: <WindowsIcon />, action: 'download' },
  { name: 'Mac OS', subtitle: 'TradeLocker', icon: <AppleIcon />, action: 'download' },
  { name: 'IOS App Store', subtitle: 'TradeLocker', icon: <IOSIcon />, action: 'download' },
  { name: 'Google Play Store', subtitle: 'TradeLocker', icon: <PlayStoreIcon />, action: 'download' },
]

export function PlatformsView() {
  return (
    <div className="flex flex-col gap-4">
      {PLATFORMS.map((platform) => (
        <div
          key={platform.name}
          className="relative flex items-center gap-5 px-6 xl:px-8 py-6 xl:py-8 rounded-[19px] bg-[#0C1311] shadow-[0px_9.08px_23.2px_rgba(0,0,0,0.2)]"
        >
          <div className="flex-shrink-0 w-[3.6875rem] h-[3.6875rem] rounded-[0.75rem] bg-[#09241C] flex items-center justify-center">
            {platform.icon}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-acid font-normal text-[1.5rem] leading-tight">{platform.name}</p>
            <p className="text-[#808080] font-acid font-medium text-[1rem] mt-0.5">{platform.subtitle}</p>
          </div>

          <div className="flex-shrink-0">
            {platform.action === 'launch' ? (
              <GlowButton label="Launch" width={118} height={44} fontSize={16} />
            ) : (
              <SparkleButton>
                <span className="text-white font-acid font-medium text-[1rem]">Download</span>
              </SparkleButton>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
