import { useNavigate, useLocation } from 'react-router-dom'
import { useTransfer } from '@/layouts/RootLayout'

interface FloatingNavItem {
  icon: React.ReactNode
  label: string
}

const defaultItems: FloatingNavItem[] = [
  {
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 21 21" fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.70312 5.65366C1.70312 3.47238 3.4714 1.7041 5.65268 1.7041C7.83396 1.7041 9.60224 3.47238 9.60224 5.65366C9.60224 7.83494 7.83396 9.60321 5.65268 9.60321C3.4714 9.60321 1.70312 7.83494 1.70312 5.65366Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.8495 14.8C10.8495 12.6187 12.6177 10.8504 14.799 10.8504C16.9803 10.8504 18.7486 12.6187 18.7486 14.8C18.7486 16.9813 16.9803 18.7496 14.799 18.7496C12.6177 18.7496 10.8495 16.9813 10.8495 14.8Z" fill="currentColor"/>
        <path d="M1.70312 14.9143C1.70312 13.1064 1.70312 12.2024 2.26478 11.6408C2.82644 11.0791 3.73041 11.0791 5.53835 11.0791C7.3463 11.0791 8.25027 11.0791 8.81192 11.6408C9.37358 12.2024 9.37358 13.1064 9.37358 14.9143C9.37358 16.7223 9.37358 17.6262 8.81192 18.1879C8.25027 18.7496 7.3463 18.7496 5.53835 18.7496C3.73041 18.7496 2.82644 18.7496 2.26478 18.1879C1.70312 17.6262 1.70312 16.7223 1.70312 14.9143Z" fill="currentColor"/>
        <path d="M11.0781 5.53933C11.0781 3.73139 11.0781 2.82741 11.6398 2.26576C12.2014 1.7041 13.1054 1.7041 14.9134 1.7041C16.7213 1.7041 17.6253 1.7041 18.1869 2.26576C18.7486 2.82741 18.7486 3.73139 18.7486 5.53933C18.7486 7.34727 18.7486 8.25124 18.1869 8.8129C17.6253 9.37456 16.7213 9.37456 14.9134 9.37456C13.1054 9.37456 12.2014 9.37456 11.6398 8.8129C11.0781 8.25124 11.0781 7.34727 11.0781 5.53933Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Deposit',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.66663 9.99996C1.66663 6.07159 1.66663 4.1074 2.88701 2.88701C4.1074 1.66663 6.07159 1.66663 9.99996 1.66663C13.9283 1.66663 15.8925 1.66663 17.1129 2.88701C18.3333 4.1074 18.3333 6.07159 18.3333 9.99996C18.3333 13.9283 18.3333 15.8925 17.1129 17.1129C15.8925 18.3333 13.9283 18.3333 9.99996 18.3333C6.07159 18.3333 4.1074 18.3333 2.88701 17.1129C1.66663 15.8925 1.66663 13.9283 1.66663 9.99996ZM9.99996 5.20829C10.3451 5.20829 10.625 5.48811 10.625 5.83329V10.1577L12.058 8.72468C12.3021 8.48061 12.6978 8.48061 12.9419 8.72468C13.186 8.96876 13.186 9.36449 12.9419 9.60857L10.4419 12.1086C10.3247 12.2258 10.1657 12.2916 9.99996 12.2916C9.8342 12.2916 9.67523 12.2258 9.55802 12.1086L7.05802 9.60857C6.81394 9.36449 6.81394 8.96876 7.05802 8.72468C7.3021 8.48061 7.69782 8.48061 7.9419 8.72468L9.37496 10.1577V5.83329C9.37496 5.48811 9.65478 5.20829 9.99996 5.20829ZM6.66663 13.5416C6.32145 13.5416 6.04163 13.8214 6.04163 14.1666C6.04163 14.5118 6.32145 14.7916 6.66663 14.7916H13.3333C13.6785 14.7916 13.9583 14.5118 13.9583 14.1666C13.9583 13.8214 13.6785 13.5416 13.3333 13.5416H6.66663Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Withdraw',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.66663 9.99996C1.66663 6.07159 1.66663 4.1074 2.88701 2.88701C4.1074 1.66663 6.07159 1.66663 9.99996 1.66663C13.9283 1.66663 15.8925 1.66663 17.1129 2.88701C18.3333 4.1074 18.3333 6.07159 18.3333 9.99996C18.3333 13.9283 18.3333 15.8925 17.1129 17.1129C15.8925 18.3333 13.9283 18.3333 9.99996 18.3333C6.07159 18.3333 4.1074 18.3333 2.88701 17.1129C1.66663 15.8925 1.66663 13.9283 1.66663 9.99996ZM9.99996 14.7916C10.3451 14.7916 10.625 14.5118 10.625 14.1666V9.84218L12.058 11.2752C12.3021 11.5193 12.6978 11.5193 12.9419 11.2752C13.186 11.0312 13.186 10.6354 12.9419 10.3913L10.4419 7.89135C10.3247 7.77414 10.1657 7.70829 9.99996 7.70829C9.8342 7.70829 9.67523 7.77414 9.55802 7.89135L7.05802 10.3913C6.81394 10.6354 6.81394 11.0312 7.05802 11.2752C7.3021 11.5193 7.69782 11.5193 7.9419 11.2752L9.37496 9.84218V14.1666C9.37496 14.5118 9.65478 14.7916 9.99996 14.7916ZM6.66663 6.45829C6.32145 6.45829 6.04163 6.17847 6.04163 5.83329C6.04163 5.48811 6.32145 5.20829 6.66663 5.20829H13.3333C13.6785 5.20829 13.9583 5.48811 13.9583 5.83329C13.9583 6.17847 13.6785 6.45829 13.3333 6.45829H6.66663Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Transfer',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M1.66602 14.9998C1.66602 13.4285 1.66602 12.6428 2.15417 12.1547C2.64233 11.6665 3.428 11.6665 4.99935 11.6665C6.5707 11.6665 7.35637 11.6665 7.84453 12.1547C8.33268 12.6428 8.33268 13.4285 8.33268 14.9998C8.33268 16.5712 8.33268 17.3569 7.84453 17.845C7.35637 18.3332 6.5707 18.3332 4.99935 18.3332C3.428 18.3332 2.64233 18.3332 2.15417 17.845C1.66602 17.3569 1.66602 16.5712 1.66602 14.9998Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.8864 2.88689C1.66602 4.10728 1.66602 6.07147 1.66602 9.99984C1.66602 10.3295 1.66602 10.6453 1.66674 10.948C2.09015 10.6704 2.5567 10.5488 3.00401 10.4887C3.54203 10.4163 4.20342 10.4164 4.92478 10.4165H5.07394C5.7953 10.4164 6.45669 10.4163 6.99471 10.4887C7.58717 10.5683 8.21338 10.7557 8.72842 11.2708C9.24346 11.7858 9.43087 12.412 9.51053 13.0045C9.58286 13.5425 9.58278 14.2039 9.5827 14.9253V15.0744C9.58278 15.7958 9.58286 16.4572 9.51053 16.9952C9.45039 17.4425 9.32883 17.909 9.05122 18.3324C9.35391 18.3332 9.66972 18.3332 9.99935 18.3332C13.9277 18.3332 15.8919 18.3332 17.1123 17.1128C18.3327 15.8924 18.3327 13.9282 18.3327 9.99984C18.3327 6.07147 18.3327 4.10728 17.1123 2.88689C15.8919 1.6665 13.9277 1.6665 9.99935 1.6665C6.07098 1.6665 4.10679 1.6665 2.8864 2.88689ZM11.041 5.20817C10.6958 5.20817 10.416 5.48799 10.416 5.83317C10.416 6.17835 10.6958 6.45817 11.041 6.45817H12.6571L9.55741 9.55789C9.31333 9.80197 9.31333 10.1977 9.55741 10.4418C9.80148 10.6859 10.1972 10.6859 10.4413 10.4418L13.541 7.34205V8.95817C13.541 9.30335 13.8208 9.58317 14.166 9.58317C14.5112 9.58317 14.791 9.30335 14.791 8.95817V5.83317C14.791 5.48799 14.5112 5.20817 14.166 5.20817H11.041Z" fill="currentColor"/>
      </svg>
    ),
  },
]

const NAV_ROUTES: Record<string, string> = {
  Home: '/',
  Deposit: '/deposit',
  Withdraw: '/withdraw',
}

const ROUTE_TO_INDEX: Record<string, number> = {
  '/': 0,
  '/deposit': 1,
  '/withdraw': 2,
}

interface FloatingNavBarProps {
  items?: FloatingNavItem[]
}

export function FloatingNavBar({ items = defaultItems }: FloatingNavBarProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { openTransfer } = useTransfer()
  const active = ROUTE_TO_INDEX[pathname] ?? -1

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="fnb-blur" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="BackgroundImage" stdDeviation="11.5" result="blurred" />
            <feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="dimmed" />
            <feMerge>
              <feMergeNode in="dimmed" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <nav
        className="inline-flex items-center gap-1 rounded-full p-1.5 bg-[rgba(10,14,12,0.85)] border-[1.16px] border-[rgba(255,255,255,0.06)] [backdrop-filter:url(#blur-23)] shadow-[0px_4.641px_23.204px_rgba(0,0,0,0.2),inset_0px_1.16px_0px_1.16px_rgba(255,255,255,0.04)]"
      >
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.label === 'Transfer') {
                  openTransfer()
                } else if (NAV_ROUTES[item.label]) {
                  navigate(NAV_ROUTES[item.label])
                }
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex items-center rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 overflow-hidden will-change-transform transition-[padding,gap,background-color,color] duration-[400ms] ease-[cubic-bezier(0.4,0,0.15,1)] ${
                isActive
                  ? 'text-white bg-[rgba(20,184,166,0.2)] py-[10px] pr-[18px] pl-[12px] gap-2'
                  : 'text-gfx-neutral-300 hover:text-white bg-transparent p-[10px] gap-0'
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full pointer-events-none border border-gfx-green-300 [mask-image:linear-gradient(to_bottom,white_0%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_bottom,white_0%,transparent_80%)] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden="true"
              />
              <div
                className={`absolute pointer-events-none w-[98px] h-[45px] left-1/2 -translate-x-1/2 bottom-[-20px] bg-[#55FFC7] rounded-full [filter:url(#blur-20)] transition-opacity duration-300 ${isActive ? 'opacity-30' : 'opacity-0'}`}
                aria-hidden="true"
              />
              <div className={`absolute w-px h-px rounded-full bg-white pointer-events-none z-base right-[8px] top-2 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              <div className={`absolute w-px h-px rounded-full bg-white/50 pointer-events-none z-base right-[16px] bottom-[6px] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              <div className={`absolute w-px h-px rounded-full pointer-events-none z-base left-[30%] top-[4px] bg-gfx-neutral-550 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              <div className={`absolute w-px h-px rounded-full pointer-events-none z-base left-[60%] bottom-[4px] bg-gfx-neutral-550 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              <div className={`absolute w-px h-px rounded-full pointer-events-none z-base right-[25%] top-[6px] bg-gfx-neutral-550 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              <div className={`absolute w-px h-px rounded-full pointer-events-none z-base left-[15%] bottom-[8px] bg-gfx-neutral-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              <span className="relative z-10 shrink-0 flex items-center justify-center size-[18px]">
                {item.icon}
              </span>
              <span
                className={`relative z-10 text-sm font-medium whitespace-nowrap overflow-hidden transition-[max-width,opacity] duration-[400ms] ease-[cubic-bezier(0.4,0,0.15,1)] ${
                  isActive ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
