import { GlowButton } from '@/components/ui'
import { SparkleButton } from '@/components/ui'

interface PlatformItem {
  name: string
  subtitle: string
  icon: string
  action: 'launch' | 'download'
}

const PLATFORMS: PlatformItem[] = [
  { name: 'Browser-based Platform', subtitle: 'TradeLocker', icon: '/images/platform-browser.png', action: 'launch' },
  { name: 'Windows OS', subtitle: 'TradeLocker', icon: '/images/platform-windows.png', action: 'download' },
  { name: 'Mac OS', subtitle: 'TradeLocker', icon: '/images/platform-macos.png', action: 'download' },
  { name: 'IOS App Store', subtitle: 'TradeLocker', icon: '/images/platform-ios.png', action: 'download' },
  { name: 'Google Play Store', subtitle: 'TradeLocker', icon: '/images/platform-playstore.png', action: 'download' },
]

export function PlatformsView() {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {PLATFORMS.map((platform) => (
        <div
          key={platform.name}
          className="relative flex items-center gap-3 sm:gap-5 px-4 sm:px-6 xl:px-8 py-4 sm:py-6 xl:py-8 rounded-[19px] bg-[#0C1311] shadow-[0px_9.08px_23.2px_rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)]"
        >
          <div className="flex-shrink-0 w-10 h-10 sm:w-[3.6875rem] sm:h-[3.6875rem] rounded-[0.625rem] sm:rounded-[0.75rem] bg-[#09241C] flex items-center justify-center">
            <img src={platform.icon} alt="" aria-hidden="true" className="w-5 h-5 sm:w-[29px] sm:h-[29px] object-contain" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-acid font-normal text-[1rem] sm:text-[1.5rem] leading-tight truncate">{platform.name}</p>
            <p className="text-[#808080] font-acid font-medium text-[0.8125rem] sm:text-[1rem] mt-0.5">{platform.subtitle}</p>
          </div>

          <div className="flex-shrink-0 w-[7.5rem] sm:w-[8.5rem]">
            {platform.action === 'launch' ? (
              <GlowButton label="Launch" width="100%" height={44} fontSize={16} />
            ) : (
              <SparkleButton fullWidth>
                <span className="text-white font-acid font-medium text-[0.875rem] sm:text-[1rem]">Download</span>
              </SparkleButton>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
