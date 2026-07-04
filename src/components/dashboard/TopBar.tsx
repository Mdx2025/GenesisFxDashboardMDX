import { Breadcrumb } from '@/components/ui'
import { HelpIcon } from '@/components/icons'

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="flex items-center justify-between mb-4 gap-2">
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="lg:hidden text-gfx-neutral-500 hover:text-white rounded shrink-0"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <Breadcrumb items={[{ label: 'Overview' }, { label: 'Dashboard', current: true }]} />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="shrink-0" aria-hidden="true">
            <g filter="url(#glow_market)">
              <rect x="12.5333" y="12.5333" width="8.77332" height="8.77332" rx="4.38666" fill="#10BC83"/>
            </g>
            <defs>
              <filter id="glow_market" x="0" y="0" width="33.84" height="33.84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="6.267"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.941 0 0 0 0 0.627 0 0 0 0.8 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
            </defs>
          </svg>
          <span className="text-gfx-green-500 text-body2 font-normal hidden sm:inline">Markets Open</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/[0.04] outline outline-1 outline-offset-[-1px] outline-white/[0.06]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.0427 1.04175H9.95602C9.2073 1.04173 8.58293 1.04171 8.08728 1.10834C7.56412 1.17868 7.09179 1.33341 6.71223 1.71296C6.33267 2.09252 6.17795 2.56486 6.10761 3.08802C6.05984 3.44332 6.04633 4.29298 6.04251 5.02146C4.3573 5.07651 3.34548 5.27323 2.64233 5.97639C1.66602 6.9527 1.66602 8.52405 1.66602 11.6667C1.66602 14.8094 1.66602 16.3808 2.64233 17.3571C3.61864 18.3334 5.18998 18.3334 8.33267 18.3334H11.666C14.8087 18.3334 16.3801 18.3334 17.3564 17.3571C18.3327 16.3808 18.3327 14.8094 18.3327 11.6667C18.3327 8.52405 18.3327 6.9527 17.3564 5.97639C16.6532 5.27323 15.6414 5.07651 13.9562 5.02146C13.9524 4.29298 13.9389 3.44332 13.8911 3.08802C13.8208 2.56486 13.666 2.09252 13.2865 1.71296C12.9069 1.33341 12.4346 1.17868 11.9114 1.10834C11.4158 1.04171 10.7914 1.04173 10.0427 1.04175ZM12.706 5.00165C12.7022 4.29611 12.6902 3.53681 12.6522 3.25458C12.6005 2.87003 12.5112 2.70545 12.4026 2.59685C12.294 2.48825 12.1294 2.3989 11.7449 2.3472C11.3423 2.29308 10.8027 2.29175 9.99935 2.29175C9.19601 2.29175 8.65637 2.29308 8.25384 2.3472C7.86929 2.3989 7.70471 2.48825 7.59611 2.59685C7.48752 2.70545 7.39817 2.87003 7.34646 3.25458C7.30852 3.53681 7.29653 4.29611 7.29275 5.00165C7.61893 5.00008 7.96506 5.00008 8.33268 5.00008H11.666C12.0336 5.00008 12.3798 5.00008 12.706 5.00165ZM9.99935 7.70842C10.3445 7.70842 10.6243 7.98824 10.6243 8.33342V8.34194C11.5317 8.57053 12.291 9.28592 12.291 10.2779C12.291 10.623 12.0112 10.9029 11.666 10.9029C11.3208 10.9029 11.041 10.623 11.041 10.2779C11.041 9.95783 10.6862 9.51397 9.99935 9.51397C9.31251 9.51397 8.95768 9.95783 8.95768 10.2779C8.95768 10.5979 9.31251 11.0417 9.99935 11.0417C11.1535 11.0417 12.291 11.8415 12.291 13.0556C12.291 14.0476 11.5317 14.763 10.6243 14.9916V15.0001C10.6243 15.3453 10.3445 15.6251 9.99935 15.6251C9.65417 15.6251 9.37435 15.3453 9.37435 15.0001V14.9916C8.46703 14.763 7.70768 14.0476 7.70768 13.0556C7.70768 12.7105 7.9875 12.4306 8.33268 12.4306C8.67786 12.4306 8.95768 12.7105 8.95768 13.0556C8.95768 13.3757 9.31251 13.8195 9.99935 13.8195C10.6862 13.8195 11.041 13.3757 11.041 13.0556C11.041 12.7356 10.6862 12.2917 9.99935 12.2917C8.84523 12.2917 7.70768 11.492 7.70768 10.2779C7.70768 9.28592 8.46703 8.57053 9.37435 8.34194V8.33342C9.37435 7.98824 9.65417 7.70842 9.99935 7.70842Z" fill="white"/>
          </svg>
          <span className="text-gfx-neutral-500 text-sm font-normal">Wallet</span>
          <span className="text-white text-sm font-normal">$100.00</span>
        </div>

        <button className="hidden sm:flex items-center gap-1.5 h-12 px-3 rounded-[30px] hover:opacity-90 transition-opacity" style={{ background: 'rgba(0, 27, 18, 0.30)' }} aria-label="Change language">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M0 4.5295V6.5H2.814L0 4.5295ZM2.332 15.5H6.5V12.5815L2.332 15.5ZM11.5 12.582V15.5H15.6675L11.5 12.582ZM0 11.5V13.4705L2.815 11.5H0ZM15.6685 2.5H11.5V5.4185L15.6685 2.5ZM18 13.471V11.5H15.1845L18 13.471ZM18 6.5V4.5295L15.1855 6.5H18ZM6.5 2.5H2.332L6.5 5.4185V2.5Z" fill="#00247D"/>
            <path d="M12.5696 11.5001L17.4256 14.9006C17.6628 14.6563 17.8332 14.3552 17.9206 14.0261L14.3131 11.5001H12.5696ZM6.49963 11.5001H5.42913L0.573625 14.9001C0.834125 15.1651 1.16812 15.3546 1.54262 15.4426L6.49963 11.9716V11.5001ZM11.4996 6.50012H12.5701L17.4256 3.10012C17.1607 2.83125 16.8248 2.64313 16.4571 2.55762L11.4996 6.02862V6.50012ZM5.42913 6.50012L0.573625 3.10012C0.336602 3.3446 0.166032 3.64564 0.078125 3.97462L3.68563 6.50012H5.42913Z" fill="#CF1B2B"/>
            <path d="M18 10.5H10.5V15.5H11.5V12.582L15.6675 15.5H16C16.2656 15.5 16.5286 15.447 16.7735 15.3441C17.0183 15.2411 17.2402 15.0903 17.426 14.9005L12.57 11.5H14.3135L17.921 14.026C17.9675 13.8575 18 13.683 18 13.5V13.471L15.1845 11.5H18V10.5ZM0 10.5V11.5H2.815L0 13.4705V13.5C0 14.0455 0.2195 14.539 0.574 14.9L5.4295 11.5H6.5V11.9715L1.543 15.442C1.69 15.477 1.842 15.5 2 15.5H2.332L6.5 12.5815V15.5H7.5V10.5H0ZM18 4.5C18.0003 3.97599 17.7941 3.47298 17.426 3.1L12.5705 6.5H11.5V6.0285L16.4575 2.5575C16.3077 2.52076 16.1542 2.50147 16 2.5H15.6685L11.5 5.4185V2.5H10.5V7.5H18V6.5H15.1855L18 4.5295V4.5ZM6.5 2.5V5.4185L2.332 2.5H2C1.73431 2.49988 1.47128 2.55291 1.22639 2.65595C0.981495 2.75899 0.759682 2.90997 0.574 3.1L5.4295 6.5H3.686L0.0785 3.9745C0.0288901 4.14535 0.00248671 4.32211 0 4.5L0 4.5295L2.814 6.5H0V7.5H7.5V2.5H6.5Z" fill="#EEEEEE"/>
            <path d="M10.5 7.5V2.5H7.5V7.5H0V10.5H7.5V15.5H10.5V10.5H18V7.5H10.5Z" fill="#CF1B2B"/>
          </svg>
          <span className="text-white text-base font-medium">EN</span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M3.617 5.425L7.234 9.041l3.617-3.616" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button className="text-gfx-neutral-500 hover:text-white transition-colors rounded" aria-label="Help">
          <HelpIcon />
        </button>
      </div>
    </header>
  )
}
