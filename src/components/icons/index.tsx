import { useId } from 'react'

interface IconProps {
  size?: number
  color?: string
  className?: string
}

export function DashboardIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.70312 5.65366C1.70312 3.47238 3.4714 1.7041 5.65268 1.7041C7.83396 1.7041 9.60224 3.47238 9.60224 5.65366C9.60224 7.83494 7.83396 9.60321 5.65268 9.60321C3.4714 9.60321 1.70312 7.83494 1.70312 5.65366Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.8495 14.8C10.8495 12.6187 12.6177 10.8504 14.799 10.8504C16.9803 10.8504 18.7486 12.6187 18.7486 14.8C18.7486 16.9813 16.9803 18.7496 14.799 18.7496C12.6177 18.7496 10.8495 16.9813 10.8495 14.8Z" fill={color}/>
      <path d="M1.70312 14.9143C1.70312 13.1064 1.70312 12.2024 2.26478 11.6408C2.82644 11.0791 3.73041 11.0791 5.53835 11.0791C7.3463 11.0791 8.25027 11.0791 8.81192 11.6408C9.37358 12.2024 9.37358 13.1064 9.37358 14.9143C9.37358 16.7223 9.37358 17.6262 8.81192 18.1879C8.25027 18.7496 7.3463 18.7496 5.53835 18.7496C3.73041 18.7496 2.82644 18.7496 2.26478 18.1879C1.70312 17.6262 1.70312 16.7223 1.70312 14.9143Z" fill={color}/>
      <path d="M11.0781 5.53933C11.0781 3.73139 11.0781 2.82741 11.6398 2.26576C12.2014 1.7041 13.1054 1.7041 14.9134 1.7041C16.7213 1.7041 17.6253 1.7041 18.1869 2.26576C18.7486 2.82741 18.7486 3.73139 18.7486 5.53933C18.7486 7.34727 18.7486 8.25124 18.1869 8.8129C17.6253 9.37456 16.7213 9.37456 14.9134 9.37456C13.1054 9.37456 12.2014 9.37456 11.6398 8.8129C11.0781 8.25124 11.0781 7.34727 11.0781 5.53933Z" fill={color}/>
    </svg>
  )
}

export function AssetsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.985 6.82114C17.9367 6.81809 17.8842 6.81811 17.8296 6.81813L17.816 6.81813H15.6781C13.9159 6.81813 12.408 8.20526 12.408 10.0142C12.408 11.8231 13.9159 13.2102 15.6781 13.2102H17.816L17.8296 13.2102C17.8842 13.2102 17.9367 13.2102 17.985 13.2072C18.7008 13.162 19.3339 12.6018 19.3871 11.8194C19.3906 11.7681 19.3906 11.7128 19.3905 11.6616L19.3905 11.6477V8.38063L19.3905 8.36672C19.3906 8.31547 19.3906 8.26017 19.3871 8.20886C19.3339 7.42648 18.7008 6.86634 17.985 6.82114ZM15.4886 10.8664C15.9422 10.8664 16.31 10.4848 16.31 10.0141C16.31 9.54345 15.9422 9.16188 15.4886 9.16188C15.0349 9.16188 14.6671 9.54345 14.6671 10.0141C14.6671 10.4848 15.0349 10.8664 15.4886 10.8664Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.8291 14.4886C17.9562 14.4853 18.0523 14.603 18.0179 14.7253C17.8468 15.3325 17.5752 15.8501 17.1395 16.2858C16.5017 16.9236 15.6929 17.2067 14.6937 17.341C13.7228 17.4716 12.4822 17.4715 10.9159 17.4715H9.11518C7.54891 17.4715 6.30831 17.4716 5.33739 17.341C4.33816 17.2067 3.5294 16.9236 2.89159 16.2858C2.25378 15.648 1.97073 14.8392 1.83638 13.84C1.70585 12.8691 1.70586 11.6285 1.70587 10.0622V9.96607C1.70586 8.3998 1.70585 7.1592 1.83638 6.18828C1.97073 5.18905 2.25378 4.38029 2.89159 3.74248C3.5294 3.10467 4.33816 2.82162 5.33739 2.68728C6.30831 2.55674 7.5489 2.55675 9.11517 2.55676L10.9159 2.55676C12.4822 2.55675 13.7228 2.55674 14.6937 2.68728C15.6929 2.82162 16.5017 3.10467 17.1395 3.74248C17.5752 4.17823 17.8468 4.69575 18.0179 5.30294C18.0523 5.4253 17.9562 5.54302 17.8291 5.53972L15.678 5.53972C13.2604 5.53972 11.1296 7.44958 11.1296 10.0142C11.1296 12.5787 13.2604 14.4886 15.678 14.4886L17.8291 14.4886ZM5.96724 13.2102C5.61421 13.2102 5.32803 12.924 5.32803 12.571V7.45733C5.32803 7.10431 5.61421 6.81813 5.96724 6.81813C6.32026 6.81813 6.60644 7.10431 6.60644 7.45733V12.571C6.60644 12.924 6.32026 13.2102 5.96724 13.2102Z" fill={color}/>
    </svg>
  )
}

export function TradelockerIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className} aria-hidden="true">
      <path d="M5.79136 13.0146H4V15.9038H16.0194V13.0146H14.2858V14.2281H5.79136V13.0146Z" fill={color}/>
      <path d="M5.79136 6.88928H4V4H16.0194V6.88928H14.2858V5.67578H5.79136V6.88928Z" fill={color}/>
    </svg>
  )
}


export function ChallengesIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path d="M18.7513 6.95683L18.7513 7.01864C18.7513 7.75223 18.7512 8.11902 18.5747 8.41912C18.3981 8.71922 18.0774 8.89735 17.4362 9.25362L16.76 9.62926C17.226 8.05413 17.3814 6.36177 17.4389 4.91447C17.4413 4.85241 17.4441 4.7896 17.4469 4.72611L17.4489 4.68164C18.0039 4.8744 18.3156 5.01811 18.51 5.28786C18.7513 5.62267 18.7513 6.06739 18.7513 6.95683Z" fill={color}/>
      <path d="M1.70587 6.95683L1.70587 7.01864C1.70589 7.75223 1.7059 8.11902 1.88249 8.41912C2.05907 8.71922 2.3797 8.89735 3.02097 9.25362L3.69747 9.62946C3.2315 8.05427 3.07605 6.36184 3.01859 4.91447C3.01612 4.85242 3.01335 4.7896 3.01054 4.72611L3.00857 4.68154C2.45332 4.87435 2.1416 5.01806 1.94715 5.28786C1.70584 5.62267 1.70585 6.06739 1.70587 6.95683Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.9591 2.00035C13.0011 1.83872 11.7488 1.70483 10.2287 1.70483C8.70866 1.70483 7.45636 1.83872 6.49835 2.00035C5.52784 2.1641 5.04259 2.24597 4.63715 2.74532C4.23171 3.24466 4.25313 3.78436 4.29599 4.86376C4.4431 8.56936 5.24277 13.1978 9.58939 13.6074V16.6196H8.37048C7.96421 16.6196 7.61443 16.9064 7.53476 17.3047L7.37349 18.1111H5.11496C4.76194 18.1111 4.47576 18.3973 4.47576 18.7503C4.47576 19.1033 4.76194 19.3895 5.11496 19.3895H15.3422C15.6953 19.3895 15.9814 19.1033 15.9814 18.7503C15.9814 18.3973 15.6953 18.1111 15.3422 18.1111H13.0837L12.9224 17.3047C12.8428 16.9064 12.493 16.6196 12.0867 16.6196H10.8678V13.6074C15.2147 13.198 16.0144 8.56943 16.1615 4.86376C16.2043 3.78436 16.2258 3.24466 15.8203 2.74532C15.4149 2.24597 14.9296 2.1641 13.9591 2.00035Z" fill={color}/>
    </svg>
  )
}

export function PammIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <circle cx="10.2266" cy="5.11392" r="3.40909" fill={color}/>
      <ellipse cx="10.2266" cy="14.4883" rx="5.96591" ry="3.40909" fill={color}/>
    </svg>
  )
}

export function GenSocialIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path d="M6.78517 2.38711C7.11096 1.56107 8.28002 1.56107 8.6058 2.38711L9.61539 4.94695C9.71486 5.19915 9.91449 5.39878 10.1667 5.49824L12.7265 6.50783C13.5526 6.83362 13.5526 8.00267 12.7265 8.32846L10.1667 9.33805C9.91449 9.43751 9.71486 9.63714 9.61539 9.88934L8.6058 12.4492C8.28002 13.2752 7.11096 13.2752 6.78517 12.4492L5.77559 9.88934C5.67612 9.63714 5.47649 9.43751 5.2243 9.33805L2.66445 8.32846C1.83841 8.00267 1.83841 6.83362 2.66446 6.50783L5.2243 5.49824C5.47649 5.39878 5.67612 5.19915 5.77559 4.94695L6.78517 2.38711Z" fill={color}/>
      <path d="M15.0191 11.6705C15.1981 11.2166 15.8406 11.2166 16.0196 11.6705L16.8026 13.6558C16.8573 13.7944 16.967 13.9041 17.1056 13.9588L19.0908 14.7417C19.5448 14.9208 19.5448 15.5632 19.0908 15.7423L17.1056 16.5253C16.967 16.5799 16.8573 16.6896 16.8026 16.8282L16.0196 18.8135C15.8406 19.2674 15.1981 19.2674 15.0191 18.8135L14.2361 16.8282C14.1815 16.6896 14.0717 16.5799 13.9331 16.5253L11.9479 15.7423C11.4939 15.5632 11.4939 14.9208 11.9479 14.7417L13.9331 13.9588C14.0717 13.9041 14.1815 13.7944 14.2361 13.6558L15.0191 11.6705Z" fill={color} style={{ opacity: 0.6 }}/>
    </svg>
  )
}

export function MarketNewsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.07558 2.22754C1.7577 2.22754 1.5 2.48524 1.5 2.80312C1.5 3.12101 1.7577 3.3787 2.07558 3.3787H3.61047V9.32638C3.61047 11.6779 3.61047 12.8537 4.38113 13.5842C5.1518 14.3147 6.39218 14.3147 8.87292 14.3147H9.17442V17.0288L7.95771 17.6371C7.67338 17.7793 7.55814 18.125 7.7003 18.4094C7.84246 18.6937 8.1882 18.8089 8.47252 18.6668L9.75 18.028L11.0275 18.6668C11.3118 18.8089 11.6575 18.6937 11.7997 18.4094C11.9419 18.125 11.8266 17.7793 11.5423 17.6371L10.3256 17.0288V14.3147H10.6271C13.1078 14.3147 14.3482 14.3147 15.1189 13.5842C15.8895 12.8537 15.8895 11.6779 15.8895 9.32639V3.3787H17.4244C17.7423 3.3787 18 3.12101 18 2.80312C18 2.48524 17.7423 2.22754 17.4244 2.22754H2.07558ZM12.4593 7.3845C12.6841 7.60927 12.6841 7.97371 12.4593 8.19849L11.4484 9.20941C11.3371 9.32076 11.2168 9.44117 11.1016 9.5291C10.9666 9.63212 10.7734 9.74302 10.5174 9.74302C10.2615 9.74302 10.0683 9.63212 9.9333 9.5291C9.81805 9.44117 9.69773 9.32076 9.58647 9.20941L9.11822 8.74115C9.06446 8.68739 9.02086 8.64382 8.98256 8.60674C8.94426 8.64382 8.90066 8.68739 8.84689 8.74115L7.85467 9.73337C7.62989 9.95815 7.26546 9.95815 7.04068 9.73337C6.8159 9.50859 6.8159 9.14416 7.04068 8.91938L8.05159 7.90846C8.16285 7.79711 8.28316 7.6767 8.39842 7.58877C8.53344 7.48575 8.72664 7.37485 8.98256 7.37485C9.23848 7.37485 9.43168 7.48575 9.5667 7.58877C9.68194 7.67669 9.80223 7.79708 9.91349 7.90841L10.3818 8.37672C10.4355 8.43048 10.4791 8.47405 10.5174 8.51113C10.5557 8.47405 10.5993 8.43048 10.6531 8.37672L11.6453 7.3845C11.8701 7.15972 12.2345 7.15972 12.4593 7.3845Z" fill={color}/>
    </svg>
  )
}

export function AcademyIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path d="M1.70587 13.7586V4.25932C1.70587 3.32338 2.46124 2.56306 3.39542 2.62048C4.22755 2.67162 5.21169 2.77271 5.96723 2.97209C6.86145 3.20805 7.92415 3.71064 8.76461 4.15505C9.0263 4.29343 9.30458 4.38942 9.58939 4.44353L9.58939 17.3799C9.3312 17.3229 9.07931 17.2311 8.84145 17.1043C7.98962 16.6502 6.88893 16.1238 5.96723 15.8805C5.22004 15.6834 4.24929 15.5823 3.42308 15.5306C2.47807 15.4715 1.70587 14.7054 1.70587 13.7586Z" fill={color}/>
      <path d="M10.8678 17.3799C11.126 17.3229 11.3779 17.2311 11.6157 17.1043C12.4676 16.6502 13.5683 16.1238 14.49 15.8805C15.2372 15.6834 16.2079 15.5823 17.0341 15.5306C17.9791 15.4715 18.7513 14.7054 18.7513 13.7586V4.20426C18.7513 3.29024 18.0301 2.53996 17.1166 2.57178C16.1548 2.60528 14.9561 2.70497 14.0638 2.97209C13.2903 3.20367 12.3894 3.66817 11.6552 4.09309C11.4067 4.23686 11.1412 4.34246 10.8678 4.40942L10.8678 17.3799Z" fill={color}/>
    </svg>
  )
}

export function DepositIcon({ size = 20, color = '#A0A0A0', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.66663 9.99996C1.66663 6.07159 1.66663 4.1074 2.88701 2.88701C4.1074 1.66663 6.07159 1.66663 9.99996 1.66663C13.9283 1.66663 15.8925 1.66663 17.1129 2.88701C18.3333 4.1074 18.3333 6.07159 18.3333 9.99996C18.3333 13.9283 18.3333 15.8925 17.1129 17.1129C15.8925 18.3333 13.9283 18.3333 9.99996 18.3333C6.07159 18.3333 4.1074 18.3333 2.88701 17.1129C1.66663 15.8925 1.66663 13.9283 1.66663 9.99996ZM9.99996 5.20829C10.3451 5.20829 10.625 5.48811 10.625 5.83329V10.1577L12.058 8.72468C12.3021 8.48061 12.6978 8.48061 12.9419 8.72468C13.186 8.96876 13.186 9.36449 12.9419 9.60857L10.4419 12.1086C10.3247 12.2258 10.1657 12.2916 9.99996 12.2916C9.8342 12.2916 9.67523 12.2258 9.55802 12.1086L7.05802 9.60857C6.81394 9.36449 6.81394 8.96876 7.05802 8.72468C7.3021 8.48061 7.69782 8.48061 7.9419 8.72468L9.37496 10.1577V5.83329C9.37496 5.48811 9.65478 5.20829 9.99996 5.20829ZM6.66663 13.5416C6.32145 13.5416 6.04163 13.8214 6.04163 14.1666C6.04163 14.5118 6.32145 14.7916 6.66663 14.7916H13.3333C13.6785 14.7916 13.9583 14.5118 13.9583 14.1666C13.9583 13.8214 13.6785 13.5416 13.3333 13.5416H6.66663Z" fill={color}/>
    </svg>
  )
}

export function WithdrawIcon({ size = 20, color = '#A0A0A0', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.66663 9.99996C1.66663 6.07159 1.66663 4.1074 2.88701 2.88701C4.1074 1.66663 6.07159 1.66663 9.99996 1.66663C13.9283 1.66663 15.8925 1.66663 17.1129 2.88701C18.3333 4.1074 18.3333 6.07159 18.3333 9.99996C18.3333 13.9283 18.3333 15.8925 17.1129 17.1129C15.8925 18.3333 13.9283 18.3333 9.99996 18.3333C6.07159 18.3333 4.1074 18.3333 2.88701 17.1129C1.66663 15.8925 1.66663 13.9283 1.66663 9.99996ZM9.99996 14.7916C10.3451 14.7916 10.625 14.5118 10.625 14.1666V9.84218L12.058 11.2752C12.3021 11.5193 12.6978 11.5193 12.9419 11.2752C13.186 11.0312 13.186 10.6354 12.9419 10.3913L10.4419 7.89135C10.3247 7.77414 10.1657 7.70829 9.99996 7.70829C9.8342 7.70829 9.67523 7.77414 9.55802 7.89135L7.05802 10.3913C6.81394 10.6354 6.81394 11.0312 7.05802 11.2752C7.3021 11.5193 7.69782 11.5193 7.9419 11.2752L9.37496 9.84218V14.1666C9.37496 14.5118 9.65478 14.7916 9.99996 14.7916ZM6.66663 6.45829C6.32145 6.45829 6.04163 6.17847 6.04163 5.83329C6.04163 5.48811 6.32145 5.20829 6.66663 5.20829H13.3333C13.6785 5.20829 13.9583 5.48811 13.9583 5.83329C13.9583 6.17847 13.6785 6.45829 13.3333 6.45829H6.66663Z" fill={color}/>
    </svg>
  )
}

export function TransferIcon({ size = 20, color = '#A0A0A0', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M1.66602 14.9998C1.66602 13.4285 1.66602 12.6428 2.15417 12.1547C2.64233 11.6665 3.428 11.6665 4.99935 11.6665C6.5707 11.6665 7.35637 11.6665 7.84453 12.1547C8.33268 12.6428 8.33268 13.4285 8.33268 14.9998C8.33268 16.5712 8.33268 17.3569 7.84453 17.845C7.35637 18.3332 6.5707 18.3332 4.99935 18.3332C3.428 18.3332 2.64233 18.3332 2.15417 17.845C1.66602 17.3569 1.66602 16.5712 1.66602 14.9998Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.8864 2.88689C1.66602 4.10728 1.66602 6.07147 1.66602 9.99984C1.66602 10.3295 1.66602 10.6453 1.66674 10.948C2.09015 10.6704 2.5567 10.5488 3.00401 10.4887C3.54203 10.4163 4.20342 10.4164 4.92478 10.4165H5.07394C5.7953 10.4164 6.45669 10.4163 6.99471 10.4887C7.58717 10.5683 8.21338 10.7557 8.72842 11.2708C9.24346 11.7858 9.43087 12.412 9.51053 13.0045C9.58286 13.5425 9.58278 14.2039 9.5827 14.9253V15.0744C9.58278 15.7958 9.58286 16.4572 9.51053 16.9952C9.45039 17.4425 9.32883 17.909 9.05122 18.3324C9.35391 18.3332 9.66972 18.3332 9.99935 18.3332C13.9277 18.3332 15.8919 18.3332 17.1123 17.1128C18.3327 15.8924 18.3327 13.9282 18.3327 9.99984C18.3327 6.07147 18.3327 4.10728 17.1123 2.88689C15.8919 1.6665 13.9277 1.6665 9.99935 1.6665C6.07098 1.6665 4.10679 1.6665 2.8864 2.88689ZM11.041 5.20817C10.6958 5.20817 10.416 5.48799 10.416 5.83317C10.416 6.17835 10.6958 6.45817 11.041 6.45817H12.6571L9.55741 9.55789C9.31333 9.80197 9.31333 10.1977 9.55741 10.4418C9.80148 10.6859 10.1972 10.6859 10.4413 10.4418L13.541 7.34205V8.95817C13.541 9.30335 13.8208 9.58317 14.166 9.58317C14.5112 9.58317 14.791 9.30335 14.791 8.95817V5.83317C14.791 5.48799 14.5112 5.20817 14.166 5.20817H11.041Z" fill={color}/>
    </svg>
  )
}

export function LogoutIcon({ size = 18, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12.75L15.75 9L12 5.25M15.75 9H6.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function LeaderboardsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16.9662 16.9663" fill="none" className={className} aria-hidden="true">
      <path d="M5.96724 3.36188L3.80987 5.51278C3.41332 5.90812 3.04956 6.27077 2.76229 6.59861C2.57781 6.80914 2.39346 7.03957 2.2373 7.29418L2.21628 7.27322C2.17638 7.23344 2.1564 7.21352 2.13637 7.19408C1.76139 6.83025 1.32031 6.54097 0.836735 6.34174C0.810893 6.33109 0.784665 6.3207 0.732211 6.29991L0.411 6.17263C-0.0241495 6.00021 -0.140122 5.44002 0.190991 5.10991C1.14127 4.16251 2.28222 3.02501 2.83284 2.79655C3.31845 2.59506 3.84303 2.52802 4.34897 2.60279C4.81254 2.6713 5.25107 2.90942 5.96724 3.36188Z" fill={color}/>
      <path d="M9.65093 14.6869C9.82477 14.8633 9.94024 14.988 10.0446 15.1211C10.1823 15.2969 10.3055 15.4835 10.4128 15.6792C10.5336 15.8995 10.6274 16.1348 10.8151 16.6055C10.9678 16.9886 11.4752 17.0899 11.7699 16.796L11.8412 16.725C12.7914 15.7775 13.9323 14.64 14.1615 14.091C14.3636 13.6069 14.4308 13.0839 14.3558 12.5795C14.2871 12.1173 14.0484 11.6802 13.5946 10.9663L11.4301 13.1244C11.0245 13.5287 10.6527 13.8995 10.3164 14.1899C10.1149 14.364 9.89438 14.5379 9.65093 14.6869Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.5586 12.1961L15.5185 7.25101C16.2328 6.53885 16.59 6.18277 16.7781 5.72996C16.9662 5.27716 16.9662 4.77359 16.9662 3.76645V3.2853C16.9662 1.7366 16.9662 0.962243 16.4837 0.481121C16.0011 0 15.2244 0 13.6711 0H13.1885C12.1783 0 11.6732 0 11.219 0.187559C10.7649 0.375118 10.4077 0.731198 9.69341 1.44336L4.73348 6.38841C3.89882 7.22057 3.38127 7.73656 3.18087 8.23493C3.11754 8.39239 3.08588 8.5481 3.08588 8.71147C3.08588 9.39188 3.63508 9.93943 4.73348 11.0345L4.8811 11.1817L6.61039 9.42663C6.85701 9.17633 7.25984 9.17335 7.51013 9.41997C7.76043 9.66659 7.76341 10.0694 7.51679 10.3197L5.78223 12.0801L5.8985 12.1961C6.9969 13.2912 7.54609 13.8387 8.22855 13.8387C8.37934 13.8387 8.52362 13.812 8.66876 13.7585C9.18051 13.57 9.7029 13.0492 10.5586 12.1961ZM12.8888 6.38878C12.2453 7.03027 11.2021 7.03027 10.5587 6.38878C9.91528 5.74728 9.91528 4.70721 10.5587 4.06572C11.2021 3.42422 12.2453 3.42422 12.8888 4.06572C13.5322 4.70721 13.5322 5.74728 12.8888 6.38878Z" fill={color}/>
    </svg>
  )
}

export function StreamingIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 17.75 12.9778" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.48138 0.181792C3.72295 0.42384 3.72256 0.815887 3.48051 1.05745C2.09469 2.44052 1.23837 4.35106 1.23837 6.46278C1.23837 8.59918 2.11484 10.5297 3.52939 11.9165C3.77359 12.1558 3.77748 12.5479 3.53809 12.7921C3.2987 13.0363 2.90667 13.0402 2.66247 12.8008C1.02012 11.1908 0 8.94534 0 6.46278C0 4.00898 0.996647 1.78679 2.60572 0.180919C2.84777 -0.0606469 3.23982 -0.060256 3.48138 0.181792ZM14.3374 0.241551C14.5816 0.00215917 14.9736 0.0060554 15.213 0.250254C16.7817 1.85045 17.75 4.04415 17.75 6.46278C17.75 8.91017 16.7586 11.1272 15.1569 12.7321C14.9153 12.9741 14.5232 12.9745 14.2812 12.7329C14.0392 12.4914 14.0388 12.0993 14.2803 11.8573C15.6598 10.4751 16.5116 8.569 16.5116 6.46278C16.5116 4.38124 15.6796 2.49526 14.3287 1.11717C14.0893 0.872971 14.0932 0.480943 14.3374 0.241551ZM5.82797 2.73738C6.06163 2.98707 6.04864 3.3789 5.79895 3.61256C5.01555 4.34567 4.5407 5.34841 4.5407 6.44809C4.5407 7.56054 5.02671 8.57399 5.82659 9.30925C6.07835 9.54068 6.09484 9.93238 5.86341 10.1841C5.63199 10.4359 5.24029 10.4524 4.98853 10.221C3.95427 9.27025 3.30233 7.93427 3.30233 6.44809C3.30233 4.97918 3.93925 3.65683 4.95279 2.70835C5.20248 2.47469 5.59431 2.48769 5.82797 2.73738ZM11.965 2.76877C12.2014 2.52165 12.5934 2.51293 12.8405 2.7493C13.8289 3.6947 14.4477 5.00031 14.4477 6.44809C14.4477 7.91314 13.8141 9.23244 12.8051 10.1804C12.5559 10.4145 12.1641 10.4023 11.9299 10.1531C11.6957 9.90388 11.708 9.51203 11.9572 9.27787C12.7369 8.54527 13.2093 7.54491 13.2093 6.44809C13.2093 5.36405 12.7479 4.37441 11.9845 3.64421C11.7374 3.40784 11.7287 3.01589 11.965 2.76877Z" fill={color}/>
      <path d="M10.2424 5.18406C10.982 5.72701 11.3517 5.99849 11.3517 6.4628C11.3517 6.92712 10.982 7.19859 10.2424 7.74154C10.0383 7.89143 9.83581 8.03254 9.64975 8.15013C9.48651 8.2533 9.30164 8.36001 9.11025 8.46476C8.37245 8.86855 8.00355 9.07045 7.67269 8.84692C7.34183 8.62338 7.31176 8.15544 7.25162 7.21954C7.23461 6.95487 7.22384 6.69541 7.22384 6.4628C7.22384 6.2302 7.23461 5.97073 7.25162 5.70606C7.31176 4.77017 7.34183 4.30222 7.67269 4.07869C8.00355 3.85515 8.37245 4.05705 9.11025 4.46084C9.30164 4.56559 9.48651 4.67231 9.64975 4.77547C9.83581 4.89306 10.0383 5.03418 10.2424 5.18406Z" fill={color}/>
    </svg>
  )
}

export function EyeIcon({ open, size = 20, className }: IconProps & { open: boolean }) {
  if (open) {
    return (
      <svg width={size} height={size} viewBox="0 0 20 16" fill="none" className={className} aria-hidden="true">
        <path d="M10 0C5.45 0 1.57 2.91.07 7c1.5 4.09 5.38 7 9.93 7s8.43-2.91 9.93-7C18.43 2.91 14.55 0 10 0zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 20 16" fill="none" className={className} aria-hidden="true">
      <path d="M10 3c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92A11.82 11.82 0 0 0 19.93 8C18.43 3.91 14.55 1 10 1c-1.27 0-2.49.2-3.64.57l2.17 2.17C9.08 3.27 9.52 3 10 3zM1 1.27l2.28 2.28.46.46A11.8 11.8 0 0 0 .07 8c1.5 4.09 5.38 7 9.93 7 1.55 0 3.03-.3 4.38-.84l.42.42L17.73 17l1.27-1.27L2.27 0 1 1.27zM6.53 6.8l1.55 1.55c-.05.21-.08.43-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2zm3.31-.78 3.15 3.15.02-.16a3 3 0 0 0-3-3l-.17.01z" fill="currentColor" />
    </svg>
  )
}

export function ChevronRightIcon({ size = 14, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ChevronDownIcon({ size = 12, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ChevronLeftIcon({ size = 14, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function HomeIcon({ size = 21, color = '#606060', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path d="M2.625 11.375H8.375V2.625H2.625V11.375ZM2.625 18.375H8.375V13.125H2.625V18.375ZM10.125 18.375H15.875V9.625H10.125V18.375ZM10.125 2.625V7.875H15.875V2.625H10.125Z" fill={color}/>
    </svg>
  )
}

export function SearchIcon({ size = 14, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <circle cx="6" cy="6" r="4.5" stroke={color} strokeWidth="1.5"/>
      <path d="M9.5 9.5L12.5 12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function HelpIcon({ size = 18, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M14.686 13.891A8.47 8.47 0 0016.5 9a8.47 8.47 0 00-1.814-5.291l-3.204 3.205A2.98 2.98 0 0112 9c0 .625-.191 1.206-.518 1.686l3.204 3.205z" fill={color}/>
      <path d="M13.891 14.686A8.47 8.47 0 019 16.5a8.47 8.47 0 01-4.891-1.814l3.205-3.204A2.98 2.98 0 009 12c.625 0 1.206-.191 1.686-.518l3.205 3.204z" fill={color}/>
      <path d="M3.314 13.891l3.204-3.205A2.98 2.98 0 016 9c0-.625.191-1.206.518-1.686L3.314 4.109A8.47 8.47 0 001.5 9a8.47 8.47 0 001.814 4.891z" fill={color}/>
      <path d="M9 6a2.98 2.98 0 00-1.686.518L4.109 3.314A8.47 8.47 0 019 1.5a8.47 8.47 0 014.891 1.814l-3.205 3.204A2.98 2.98 0 009 6z" fill={color}/>
    </svg>
  )
}

export function CalendarIcon({ size = 18, color = 'rgba(255, 255, 255, 0.35)', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M16.5 10.5V9C16.5 8.37072 16.5 7.81145 16.4903 7.3125H1.50968C1.5 7.81145 1.5 8.37072 1.5 9V10.5C1.5 13.3284 1.5 14.7426 2.37868 15.6213C3.25736 16.5 4.67157 16.5 7.5 16.5H10.5C13.3284 16.5 14.7426 16.5 15.6213 15.6213C16.5 14.7426 16.5 13.3284 16.5 10.5Z" fill={color}/>
      <path d="M5.8125 1.875C5.8125 1.56434 5.56066 1.3125 5.25 1.3125C4.93934 1.3125 4.6875 1.56434 4.6875 1.875V3.05944C3.608 3.14588 2.89933 3.35803 2.37868 3.87868C1.85803 4.39933 1.64588 5.108 1.55944 6.1875H16.4406C16.3541 5.108 16.142 4.39933 15.6213 3.87868C15.1007 3.35803 14.392 3.14588 13.3125 3.05944V1.875C13.3125 1.56434 13.0607 1.3125 12.75 1.3125C12.4393 1.3125 12.1875 1.56434 12.1875 1.875V3.00968C11.6886 3 11.1293 3 10.5 3H7.5C6.87072 3 6.31145 3 5.8125 3.00968V1.875Z" fill={color}/>
    </svg>
  )
}

export function MoreDotsIcon({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="3" cy="8" r="1.25" fill={color}/>
      <circle cx="8" cy="8" r="1.25" fill={color}/>
      <circle cx="13" cy="8" r="1.25" fill={color}/>
    </svg>
  )
}

export function MoreDotsVerticalIcon({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="3" r="1.25" fill={color}/>
      <circle cx="8" cy="8" r="1.25" fill={color}/>
      <circle cx="8" cy="13" r="1.25" fill={color}/>
    </svg>
  )
}

export function UserIcon({ size = 18, color = '#BEBEBE', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <circle cx="9" cy="4.5" r="3" fill={color}/>
      <ellipse cx="9" cy="12.75" rx="5.25" ry="3" fill={color}/>
    </svg>
  )
}

export function BookIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 4.5C4 3.67157 4.67157 3 5.5 3H9.5C10.8807 3 12 4.11929 12 5.5V20C12 18.8954 11.1046 18 10 18H5.5C4.67157 18 4 17.3284 4 16.5V4.5Z" stroke={color} strokeWidth="1.5"/>
      <path d="M20 4.5C20 3.67157 19.3284 3 18.5 3H14.5C13.1193 3 12 4.11929 12 5.5V20C12 18.8954 12.8954 18 14 18H18.5C19.3284 18 20 17.3284 20 16.5V4.5Z" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}

export function InfoIcon({ size = 18, color = '#808080', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.2"/>
      <path d="M9 8V13" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="9" cy="5.5" r="0.75" fill={color}/>
    </svg>
  )
}

export function BackArrowIcon({ size = 6, color = '#808080', className }: IconProps) {
  return (
    <svg width={size} height={size * 2} viewBox="0 0 6 12" fill="none" className={className}>
      <path d="M5 1L1 6L5 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function VerifiedIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M7 0L8.5 1.5L10.5 1L11 3L13 3.5L12.5 5.5L14 7L12.5 8.5L13 10.5L11 11L10.5 13L8.5 12.5L7 14L5.5 12.5L3.5 13L3 11L1 10.5L1.5 8.5L0 7L1.5 5.5L1 3.5L3 3L3.5 1L5.5 1.5L7 0Z" fill="#10BC83" />
      <path d="M5 7L6.5 8.5L9 5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function XauusdSmallIcon({ size = 18, className }: IconProps) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none" className={className}>
      <g clipPath={`url(#${id})`}>
        <path d="M0 0H38V38H0V0Z" fill="#D69A00" />
        <path d="M14.42 14.63H23.77L22.41 10.97C22.36 10.82 22.26 10.69 22.13 10.59L14.42 14.63ZM14.39 10.28C14.73 9.39 15.45 8.82 16.26 8.82H21.79C22.59 8.82 23.32 9.39 23.65 10.28L25.02 13.94C25.42 15.04 24.76 16.28 23.77 16.28H14.27C13.28 16.28 12.62 15.04 13.03 13.94L14.39 10.28ZM6.95 24.13H16.28L14.92 20.47C14.86 20.32 14.77 20.19 14.64 20.09L6.95 24.13ZM6.92 19.78C7.25 18.89 7.98 18.32 8.78 18.32H14.3C15.1 18.32 15.83 18.89 16.16 19.78L17.52 23.44C17.93 24.54 17.27 25.78 16.28 25.78H6.8C5.81 25.78 5.15 24.54 5.56 23.44L6.92 19.78ZM31.27 24.13H21.88L29.63 20.09C29.75 20.18 29.85 20.31 29.91 20.47L31.27 24.13ZM23.71 18.32C22.91 18.32 22.18 18.89 21.85 19.78L20.49 23.44C20.08 24.54 20.74 25.78 21.73 25.78H31.27C32.27 25.78 32.93 24.54 32.52 23.44L31.15 19.78C30.82 18.89 30.09 18.32 29.29 18.32H23.71Z" fill="white" />
      </g>
      <defs><clipPath id={id}><rect width="38" height="38" rx="19" fill="white" /></clipPath></defs>
    </svg>
  )
}

export function GridViewIcon({ active, className }: { active?: boolean; className?: string }) {
  const c = active ? '#10BC83' : '#808080'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="8" height="8" rx="2" stroke={c} strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke={c} strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke={c} strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" stroke={c} strokeWidth="1.5" />
    </svg>
  )
}

export function ListViewIcon({ active, className }: { active?: boolean; className?: string }) {
  const c = active ? '#10BC83' : '#808080'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="4" width="18" height="4" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="3" y="10" width="18" height="4" rx="1" stroke={c} strokeWidth="1.5" />
      <rect x="3" y="16" width="18" height="4" rx="1" stroke={c} strokeWidth="1.5" />
    </svg>
  )
}

export function DownloadIcon({ size = 18, color = '#C6C6C6', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 10L12 15L17 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GraphUpIcon({ size = 24, color = '#10BC83', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 7H22V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PieChartIcon({ size = 24, color = '#10BC83', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21.21 15.89A10 10 0 118 2.83" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 12A10 10 0 0012 2V12H22Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}

export function ChartBarIcon({ size = 24, color = '#10BC83', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 20V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 20V4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 20V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ChartUpIcon({ size = 20, color = '#10BC83', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 15L12 9L8 13L2 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 3V9H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-4 6)"/>
    </svg>
  )
}

export function StatCalendarIcon({ size = 20, color = '#10BC83', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2.5" y="3.75" width="15" height="13.75" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M2.5 7.5H17.5" stroke={color} strokeWidth="1.5"/>
      <path d="M6.25 2.5V5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13.75 2.5V5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function UsersIcon({ size = 24, color = '#10BC83', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5"/>
      <path d="M23 21V19C23 18.0544 22.6839 17.1392 22.1049 16.4003C21.5259 15.6614 20.7168 15.1415 19.808 14.9278" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13C16.8604 3.35 17.623 3.87 18.1676 4.60 18.7122 5.33 19.0078 6.23 19.0078 7.16 19.0078 8.08 18.7122 8.98 18.1676 9.72 17.623 10.45 16.8604 10.97 16 11.19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function UserRoundedIcon({ size = 20, color = '#808080', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill={color} />
      <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill={color} />
    </svg>
  )
}

export function StarIcon({ size = 24, color = '#808080', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ShareIcon({ size = 18, color = '#808080', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M13.5 6.75C14.7426 6.75 15.75 5.74264 15.75 4.5C15.75 3.25736 14.7426 2.25 13.5 2.25C12.2574 2.25 11.25 3.25736 11.25 4.5C11.25 5.74264 12.2574 6.75 13.5 6.75Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 11.25C5.74264 11.25 6.75 10.2426 6.75 9C6.75 7.75736 5.74264 6.75 4.5 6.75C3.25736 6.75 2.25 7.75736 2.25 9C2.25 10.2426 3.25736 11.25 4.5 11.25Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 15.75C14.7426 15.75 15.75 14.7426 15.75 13.5C15.75 12.2574 14.7426 11.25 13.5 11.25C12.2574 11.25 11.25 12.2574 11.25 13.5C11.25 14.7426 12.2574 15.75 13.5 15.75Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.44 10.13L11.56 12.38" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.56 5.63L6.44 7.88" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ShareFilledIcon({ size = 18, color = '#C6C6C6', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.3523 4C10.3523 2.61929 11.4766 1.5 12.8636 1.5C14.2506 1.5 15.375 2.61929 15.375 4C15.375 5.38071 14.2506 6.5 12.8636 6.5C12.1633 6.5 11.5303 6.21447 11.0753 5.7551L7.59875 8.12216C7.63089 8.28186 7.64773 8.44684 7.64773 8.61539C7.64773 8.94916 7.58178 9.26818 7.46219 9.55977L11.2743 12.0644C11.7069 11.712 12.2605 11.5 12.8636 11.5C14.2506 11.5 15.375 12.6193 15.375 14C15.375 15.3807 14.2506 16.5 12.8636 16.5C11.4766 16.5 10.3523 15.3807 10.3523 14C10.3523 13.6384 10.4297 13.2941 10.5688 12.9834L6.78755 10.499C6.34647 10.8824 5.7687 11.1154 5.13636 11.1154C3.74938 11.1154 2.625 9.9961 2.625 8.61539C2.625 7.23467 3.74938 6.11539 5.13636 6.11539C5.93393 6.11539 6.64389 6.48544 7.10359 7.06138L10.4729 4.76732C10.3946 4.5252 10.3523 4.2672 10.3523 4Z" fill={color} />
    </svg>
  )
}

export function IBDashboardIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <circle cx="5.65" cy="5.65" r="3.95" fill={color} />
      <circle cx="14.8" cy="14.8" r="3.95" fill={color} />
      <rect x="11.08" y="1.7" width="8.22" height="8.22" rx="2" fill={color} />
      <rect x="1.7" y="11.08" width="8.22" height="8.22" rx="2" fill={color} />
    </svg>
  )
}

export function ReferralsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <circle cx="6.50071" cy="3.71556" r="3.71556" fill={color} />
      <ellipse cx="6.50222" cy="13.9343" rx="6.50222" ry="3.71556" fill={color} />
      <path d="M17.6458 13.9339C17.6458 15.4729 15.755 16.7205 13.4465 16.7205C14.1266 15.9771 14.5943 15.044 14.5943 13.9352C14.5943 12.8251 14.1255 11.8911 13.4441 11.1472C15.7527 11.1472 17.6458 12.3948 17.6458 13.9339Z" fill={color} />
      <path d="M14.8592 3.71635C14.8592 5.25539 13.6115 6.50302 12.0725 6.50302C11.7369 6.50302 11.4152 6.4437 11.1172 6.33497C11.5566 5.56205 11.8076 4.66799 11.8076 3.71532C11.8076 2.76335 11.557 1.86991 11.1182 1.09738C11.4159 0.988879 11.7373 0.929688 12.0725 0.929688C13.6115 0.929688 14.8592 2.17732 14.8592 3.71635Z" fill={color} />
    </svg>
  )
}

export function LinksIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.17157 14.8284C2.34315 16 4.22876 16 8 16C11.7712 16 13.6569 16 14.8284 14.8284C16 13.6569 16 11.7712 16 8C16 4.22876 16 2.34315 14.8284 1.17157C13.6569 0 11.7712 0 8 0C4.22876 0 2.34315 0 1.17157 1.17157C0 2.34315 0 4.22876 0 8C0 11.7712 0 13.6569 1.17157 14.8284ZM6 5.4C4.56406 5.4 3.4 6.56406 3.4 8C3.4 9.43594 4.56406 10.6 6 10.6C7.43594 10.6 8.6 9.43594 8.6 8C8.6 7.66863 8.86863 7.4 9.2 7.4C9.53137 7.4 9.8 7.66863 9.8 8C9.8 10.0987 8.09868 11.8 6 11.8C3.90132 11.8 2.2 10.0987 2.2 8C2.2 5.90132 3.90132 4.2 6 4.2C6.33137 4.2 6.6 4.46863 6.6 4.8C6.6 5.13137 6.33137 5.4 6 5.4ZM12.6 8C12.6 9.43594 11.4359 10.6 10 10.6C9.66863 10.6 9.4 10.8686 9.4 11.2C9.4 11.5314 9.66863 11.8 10 11.8C12.0987 11.8 13.8 10.0987 13.8 8C13.8 5.90132 12.0987 4.2 10 4.2C7.90132 4.2 6.2 5.90132 6.2 8C6.2 8.33137 6.46863 8.6 6.8 8.6C7.13137 8.6 7.4 8.33137 7.4 8C7.4 6.56406 8.56406 5.4 10 5.4C11.4359 5.4 12.6 6.56406 12.6 8Z" fill={color} />
    </svg>
  )
}

export function TradesIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.17157 1.17157C0 2.34315 0 4.22876 0 8C0 11.7712 0 13.6569 1.17157 14.8284C2.34315 16 4.22876 16 8 16C11.7712 16 13.6569 16 14.8284 14.8284C16 13.6569 16 11.7712 16 8C16 4.22876 16 2.34315 14.8284 1.17157C13.6569 0 11.7712 0 8 0C4.22876 0 2.34315 0 1.17157 1.17157ZM12 8.2C12.3314 8.2 12.6 8.46863 12.6 8.8V12.8C12.6 13.1314 12.3314 13.4 12 13.4C11.6686 13.4 11.4 13.1314 11.4 12.8V8.8C11.4 8.46863 11.6686 8.2 12 8.2ZM8.6 3.2C8.6 2.86863 8.33137 2.6 8 2.6C7.66863 2.6 7.4 2.86863 7.4 3.2V12.8C7.4 13.1314 7.66863 13.4 8 13.4C8.33137 13.4 8.6 13.1314 8.6 12.8V3.2ZM4 5C4.33137 5 4.6 5.26863 4.6 5.6V12.8C4.6 13.1314 4.33137 13.4 4 13.4C3.66863 13.4 3.4 13.1314 3.4 12.8V5.6C3.4 5.26863 3.66863 5 4 5Z" fill={color} />
    </svg>
  )
}

export function ComissionsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M7.4 4.67798C6.65128 4.88271 6.2 5.45723 6.2 6C6.2 6.54277 6.65128 7.11729 7.4 7.32202V4.67798Z" fill={color} />
      <path d="M8.6 8.67798V11.322C9.34872 11.1173 9.8 10.5428 9.8 10C9.8 9.45723 9.34872 8.88271 8.6 8.67798Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8 2.6C8.33137 2.6 8.6 2.86863 8.6 3.2V3.45339C9.90435 3.68694 11 4.66689 11 6C11 6.33137 10.7314 6.6 10.4 6.6C10.0686 6.6 9.8 6.33137 9.8 6C9.8 5.45723 9.34872 4.88271 8.6 4.67798V7.45339C9.90435 7.68693 11 8.66689 11 10C11 11.3331 9.90435 12.3131 8.6 12.5466V12.8C8.6 13.1314 8.33137 13.4 8 13.4C7.66863 13.4 7.4 13.1314 7.4 12.8V12.5466C6.09565 12.3131 5 11.3331 5 10C5 9.66863 5.26863 9.4 5.6 9.4C5.93137 9.4 6.2 9.66863 6.2 10C6.2 10.5428 6.65128 11.1173 7.4 11.322V8.54661C6.09565 8.31307 5 7.33311 5 6C5 4.66689 6.09565 3.68694 7.4 3.45339V3.2C7.4 2.86863 7.66863 2.6 8 2.6Z" fill={color} />
    </svg>
  )
}

export function PayoutsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 14" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.1757 7.57574C13.4101 7.34142 13.79 7.34142 14.0243 7.57574L15.6243 9.17573C15.8586 9.41005 15.8586 9.78995 15.6243 10.0243C15.3899 10.2586 15.0101 10.2586 14.7757 10.0243L14.2 9.44853V12.8C14.2 13.1314 13.9314 13.4 13.6 13.4C13.2686 13.4 13 13.1314 13 12.8V9.44853L12.4243 10.0243C12.1899 10.2586 11.8101 10.2586 11.5757 10.0243C11.3414 9.78995 11.3414 9.41005 11.5757 9.17573L13.1757 7.57574Z" fill={color} />
      <path d="M6.4 0H9.6C12.617 0 14.1255 0 15.0627 0.937258C15.7376 1.61209 15.9265 2.58306 15.9794 4.2H0.0205731C0.0734774 2.58306 0.262426 1.61209 0.937258 0.937258C1.87452 0 3.38301 0 6.4 0Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.4 12.8H9.6C10.4447 12.8 11.1712 12.8 11.8 12.7794V11.3889C11.4081 11.3454 11.0277 11.1733 10.7272 10.8728C10.0243 10.1698 10.0243 9.03015 10.7272 8.32721L12.3272 6.72721C13.0302 6.02426 14.1698 6.02426 14.8728 6.72721L15.995 7.8494C16 7.40906 16 6.9276 16 6.4C16 6.04645 16 5.71362 15.9985 5.4H0.00150824C0 5.71362 0 6.04645 0 6.4C0 9.41699 0 10.9255 0.937258 11.8627C1.87452 12.8 3.38301 12.8 6.4 12.8ZM2.6 9.6C2.6 9.26863 2.86863 9 3.2 9H6.4C6.73137 9 7 9.26863 7 9.6C7 9.93137 6.73137 10.2 6.4 10.2H3.2C2.86863 10.2 2.6 9.93137 2.6 9.6ZM8.4 9C8.06863 9 7.8 9.26863 7.8 9.6C7.8 9.93137 8.06863 10.2 8.4 10.2H9.6C9.93137 10.2 10.2 9.93137 10.2 9.6C10.2 9.26863 9.93137 9 9.6 9H8.4Z" fill={color} />
    </svg>
  )
}

export function MarketingIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M0.75458 12.715L1.27222 14.6469C1.87647 16.902 2.17859 18.0295 2.86351 18.7608C3.40432 19.3382 4.10421 19.7423 4.87466 19.9219C5.85044 20.1494 6.97798 19.8473 9.23306 19.2431C11.4881 18.6388 12.6157 18.3367 13.347 17.6518C13.4077 17.5949 13.4664 17.5363 13.5233 17.4761C13.1891 17.448 12.852 17.3942 12.5094 17.3261C11.8133 17.1877 10.9862 16.9661 10.008 16.704L9.90119 16.6753L9.87645 16.6687C8.81207 16.3835 7.92281 16.1448 7.21277 15.8883C6.46607 15.6185 5.7876 15.286 5.21148 14.7464C4.41753 14.0028 3.86193 13.0404 3.61491 11.9811C3.43567 11.2123 3.48691 10.4585 3.62666 9.67695C3.76058 8.92802 4.00109 8.03049 4.28926 6.95515L4.28926 6.95514L4.82365 4.96077L4.84245 4.89062C2.9219 5.40799 1.91101 5.71408 1.23687 6.34548C0.659453 6.88629 0.255374 7.58617 0.0757279 8.35663C-0.151791 9.33241 0.150333 10.4599 0.75458 12.715Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.8293 8.71542L18.3116 10.6473C17.7074 12.9024 17.4052 14.0299 16.7203 14.7612C16.1795 15.3386 15.4796 15.7427 14.7092 15.9223C14.6129 15.9448 14.5152 15.9621 14.415 15.9744C13.4999 16.0873 12.3834 15.7881 10.3508 15.2435C8.0957 14.6392 6.96815 14.3371 6.23687 13.6522C5.65945 13.1114 5.25537 12.4115 5.07573 11.641C4.84821 10.6652 5.15033 9.53771 5.75458 7.28263L6.27222 5.35077C6.3591 5.02654 6.43979 4.7254 6.51621 4.44561C6.97128 2.77957 7.27709 1.86298 7.86351 1.23687C8.40432 0.659453 9.10421 0.255374 9.87466 0.0757279C10.8504 -0.151791 11.978 0.150333 14.2331 0.75458C16.4881 1.35883 17.6157 1.66095 18.347 2.34587C18.9244 2.88668 19.3285 3.58657 19.5081 4.35703C19.7356 5.3328 19.4335 6.46034 18.8293 8.71542ZM9.05241 7.80589C9.15962 7.40579 9.57087 7.16835 9.97097 7.27556L14.8006 8.56965C15.2007 8.67686 15.4381 9.08811 15.3309 9.48821C15.2237 9.88831 14.8125 10.1257 14.4124 10.0185L9.58274 8.72444C9.18264 8.61724 8.94521 8.20599 9.05241 7.80589ZM8.27556 10.7033C8.38276 10.3032 8.79402 10.0658 9.19411 10.173L12.0919 10.9495C12.492 11.0567 12.7294 11.4679 12.6222 11.868C12.515 12.2681 12.1038 12.5056 11.7037 12.3984L8.80589 11.6219C8.40579 11.5147 8.16835 11.1034 8.27556 10.7033Z" fill={color} />
    </svg>
  )
}

export function StatisticsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 18" fill="none" className={className}>
      <path d="M12.9215 0.251588C12.6699 0.503176 12.6699 0.9081 12.6699 1.71795V12.8846C12.6699 13.6945 12.6699 14.0994 12.9215 14.351C13.173 14.6026 13.578 14.6026 14.3878 14.6026C15.1977 14.6026 15.6026 14.6026 15.8542 14.351C16.1058 14.0994 16.1058 13.6945 16.1058 12.8846V1.71795C16.1058 0.9081 16.1058 0.503176 15.8542 0.251588C15.6026 0 15.1977 0 14.3878 0C13.578 0 13.173 0 12.9215 0.251588Z" fill={color} />
      <path d="M6.65705 4.29487C6.65705 3.48502 6.65705 3.0801 6.90864 2.82851C7.16023 2.57692 7.56515 2.57692 8.375 2.57692C9.18485 2.57692 9.58977 2.57692 9.84136 2.82851C10.0929 3.0801 10.0929 3.48502 10.0929 4.29487V12.8846C10.0929 13.6945 10.0929 14.0994 9.84136 14.351C9.58977 14.6026 9.18485 14.6026 8.375 14.6026C7.56515 14.6026 7.16023 14.6026 6.90864 14.351C6.65705 14.0994 6.65705 13.6945 6.65705 12.8846V4.29487Z" fill={color} />
      <path d="M0.895818 6.26441C0.644231 6.516 0.644231 6.92092 0.644231 7.73077V12.8846C0.644231 13.6945 0.644231 14.0994 0.895818 14.351C1.14741 14.6026 1.55233 14.6026 2.36218 14.6026C3.17203 14.6026 3.57695 14.6026 3.82854 14.351C4.08013 14.0994 4.08013 13.6945 4.08013 12.8846V7.73077C4.08013 6.92092 4.08013 6.516 3.82854 6.26441C3.57695 6.01282 3.17203 6.01282 2.36218 6.01282C1.55233 6.01282 1.14741 6.01282 0.895818 6.26441Z" fill={color} />
      <path d="M0.644231 16.5353C0.288432 16.5353 0 16.8237 0 17.1795C0 17.5353 0.288432 17.8237 0.644231 17.8237H16.1058C16.4616 17.8237 16.75 17.5353 16.75 17.1795C16.75 16.8237 16.4616 16.5353 16.1058 16.5353H0.644231Z" fill={color} />
    </svg>
  )
}

export function FollowPersonIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className={className}>
      <circle cx="7" cy="3.5" r="3.5" fill="black"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9375 17.5C9.49382 17.5 8.77199 17.5 8.32349 17.0515C7.875 16.603 7.875 15.8812 7.875 14.4375C7.875 12.9938 7.875 12.272 8.32349 11.8235C8.77199 11.375 9.49382 11.375 10.9375 11.375C12.3812 11.375 13.103 11.375 13.5515 11.8235C14 12.272 14 12.9938 14 14.4375C14 15.8812 14 16.603 13.5515 17.0515C13.103 17.5 12.3812 17.5 10.9375 17.5ZM11.4479 13.0764C11.4479 12.7945 11.2194 12.566 10.9375 12.566C10.6556 12.566 10.4271 12.7945 10.4271 13.0764V13.9271H9.57639C9.29449 13.9271 9.06597 14.1556 9.06597 14.4375C9.06597 14.7194 9.29449 14.9479 9.57639 14.9479H10.4271V15.7986C10.4271 16.0805 10.6556 16.309 10.9375 16.309C11.2194 16.309 11.4479 16.0805 11.4479 15.7986V14.9479H12.2986C12.5805 14.9479 12.809 14.7194 12.809 14.4375C12.809 14.1556 12.5805 13.9271 12.2986 13.9271H11.4479V13.0764Z" fill="black"/>
      <path d="M10.2184 10.0649C9.80448 10.07 9.41865 10.085 9.08243 10.1303C8.51991 10.2059 7.90419 10.3866 7.39543 10.8954C6.88667 11.4042 6.70591 12.0199 6.63028 12.5824C6.56232 13.0879 6.56241 13.7055 6.56251 14.3623V14.5127C6.56241 15.1694 6.56232 15.7871 6.63028 16.2926C6.68335 16.6873 6.78819 17.1082 7.0218 17.5C7.01454 17.5 7.00727 17.5 7 17.5C0 17.5 0 15.7371 0 13.5625C0 11.3879 3.13401 9.625 7 9.625C8.16041 9.625 9.25487 9.78383 10.2184 10.0649Z" fill="black"/>
    </svg>
  )
}

export function AtIcon({ size = 14, color = '#00B38C', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path d="M7 0C3.1402 0 0 3.14015 0 6.99985C0 10.8597 3.1402 14 7 14C7.35144 14 7.63636 13.7151 7.63636 13.3636C7.63636 13.0122 7.35144 12.7273 7 12.7273C3.84194 12.7273 1.27273 10.1579 1.27273 6.99985C1.27268 3.84193 3.84194 1.27272 7 1.27272C10.1581 1.27272 12.7273 3.84193 12.7273 6.99985V8.59105C12.7273 9.11741 12.299 9.54559 11.7726 9.54559C11.2462 9.54559 10.8181 9.11741 10.8181 8.59105V6.99985C10.8181 4.89451 9.1053 3.18168 7 3.18168C4.89465 3.18168 3.18186 4.89451 3.18186 6.99985C3.18186 9.10536 4.89465 10.8183 7 10.8183C8.09993 10.8183 9.09249 10.3505 9.7899 9.60372C10.1592 10.324 10.909 10.8183 11.7726 10.8183C13.0008 10.8183 14 9.81919 14 8.59105V6.99985C14 3.14015 10.8598 0 7 0ZM7 9.54559C5.59644 9.54559 4.45459 8.40358 4.45459 6.99985C4.45459 5.59629 5.59644 4.4544 7 4.4544C8.40352 4.4544 9.54533 5.59629 9.54533 6.99985C9.54533 8.40358 8.40348 9.54559 7 9.54559Z" fill={color}/>
    </svg>
  )
}

export function AtGlyphIcon({ size = 27, color = '#00B38C', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 27 27" fill="none" className={className} aria-hidden="true">
      <g style={{ mixBlendMode: 'lighten' }}>
        <path d="M13.5 0C6.0561 0 0 6.056 0 13.4997C0 20.9438 6.0561 27 13.5 27C14.1778 27 14.7273 26.4505 14.7273 25.7727C14.7273 25.095 14.1778 24.5455 13.5 24.5455C7.40945 24.5455 2.45455 19.5903 2.45455 13.4997C2.45446 7.40943 7.40945 2.45454 13.5 2.45454C19.5905 2.45454 24.5455 7.40943 24.5455 13.4997V16.5685C24.5455 17.5836 23.7194 18.4094 22.7042 18.4094C21.6892 18.4094 20.8634 17.5836 20.8634 16.5685V13.4997C20.8634 9.43942 17.5602 6.1361 13.5 6.1361C9.43969 6.1361 6.13645 9.43942 6.13645 13.4997C6.13645 17.5603 9.43969 20.8639 13.5 20.8639C15.6213 20.8639 17.5355 19.9618 18.8805 18.5215C19.5928 19.9106 21.0388 20.8639 22.7042 20.8639C25.0729 20.8639 27 18.937 27 16.5685V13.4997C26.9999 6.056 20.9439 0 13.5 0ZM13.5 18.4094C10.7931 18.4094 8.59099 16.2069 8.59099 13.4997C8.59099 10.7928 10.7931 8.59064 13.5 8.59064C16.2068 8.59064 18.4088 10.7928 18.4088 13.4997C18.4088 16.2069 16.2067 18.4094 13.5 18.4094Z" fill={color}/>
      </g>
    </svg>
  )
}

export function CheckIcon({ size = 17.0391, color = '#00B38C', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 17.0391 17.0391" fill="none" className={className} aria-hidden="true">
      <path d="M14.1992 4.25781L6.38965 12.0674L2.83984 8.51758" stroke={color} strokeWidth="1.41992" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PlayCircleIcon({ size = 15, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15ZM6.52012 10.3844L10.0603 8.29423C10.6466 7.94806 10.6466 7.05194 10.0603 6.70577L6.52012 4.61564C5.95028 4.27921 5.25 4.7171 5.25 5.40987V9.59013C5.25 10.2829 5.95028 10.7208 6.52012 10.3844Z" fill={color}/>
    </svg>
  )
}

export function CursorIcon({ size = 24, color = '#808080', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M16.5744 19.1999L12.6361 15.2616L11.4334 16.4643C10.2022 17.6955 9.58656 18.3111 8.92489 18.1658C8.26322 18.0204 7.96225 17.2035 7.3603 15.5696L5.3527 10.1205C4.15187 6.86106 3.55146 5.23136 4.39141 4.39141C5.23136 3.55146 6.86106 4.15187 10.1205 5.35271L15.5696 7.3603C17.2035 7.96225 18.0204 8.26322 18.1658 8.92489C18.3111 9.58656 17.6955 10.2022 16.4643 11.4334L15.2616 12.6361L19.1999 16.5744C19.6077 16.9821 19.8116 17.186 19.9058 17.4135C20.0314 17.7168 20.0314 18.0575 19.9058 18.3608C19.8116 18.5882 19.6077 18.7921 19.1999 19.1999C18.7921 19.6077 18.5882 19.8116 18.3608 19.9058C18.0575 20.0314 17.7168 20.0314 17.4135 19.9058C17.186 19.8116 16.9821 19.6077 16.5744 19.1999Z" fill={color}/>
    </svg>
  )
}

export function GiftIcon({ size = 24, color = '#808080', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M11.2498 2C7.03145 2.00411 4.84888 2.07958 3.46423 3.46423C2.07958 4.84888 2.00411 7.03145 2 11.2498H6.91352C6.56255 10.8114 6.30031 10.2943 6.15731 9.72228C5.61906 7.56926 7.56926 5.61906 9.72228 6.15731C10.2943 6.30031 10.8114 6.56255 11.2498 6.91352V2Z" fill={color}/>
      <path d="M2 12.7498C2.00411 16.9681 2.07958 19.1506 3.46423 20.5353C4.84888 21.9199 7.03145 21.9954 11.2498 21.9995V14.1234C10.4701 15.6807 8.8598 16.7498 6.99976 16.7498C6.58555 16.7498 6.24976 16.414 6.24976 15.9998C6.24976 15.5856 6.58555 15.2498 6.99976 15.2498C8.53655 15.2498 9.82422 14.1831 10.1628 12.7498H2Z" fill={color}/>
      <path d="M12.7498 21.9995C16.9681 21.9954 19.1506 21.9199 20.5353 20.5353C21.9199 19.1506 21.9954 16.9681 21.9995 12.7498H13.8367C14.1753 14.1831 15.463 15.2498 16.9998 15.2498C17.414 15.2498 17.7498 15.5856 17.7498 15.9998C17.7498 16.414 17.414 16.7498 16.9998 16.7498C15.1397 16.7498 13.5294 15.6807 12.7498 14.1234V21.9995Z" fill={color}/>
      <path d="M21.9995 11.2498C21.9954 7.03145 21.9199 4.84888 20.5353 3.46423C19.1506 2.07958 16.9681 2.00411 12.7498 2V6.91352C13.1882 6.56255 13.7053 6.30031 14.2772 6.15731C16.4303 5.61906 18.3805 7.56926 17.8422 9.72228C17.6992 10.2943 17.437 10.8114 17.086 11.2498H21.9995Z" fill={color}/>
      <path d="M9.35847 7.61252C10.47 7.8904 11.2498 8.88911 11.2498 10.0348V11.2498H10.0348C8.88911 11.2498 7.8904 10.47 7.61252 9.35847C7.34891 8.30403 8.30403 7.34891 9.35847 7.61252Z" fill={color}/>
      <path d="M12.7498 10.0348V11.2498H13.9647C15.1104 11.2498 16.1091 10.47 16.387 9.35847C16.6506 8.30403 15.6955 7.34891 14.6411 7.61252C13.5295 7.8904 12.7498 8.88911 12.7498 10.0348Z" fill={color}/>
    </svg>
  )
}

export function HeartFilledIcon({ color = '#808080', className }: { color?: string; className?: string }) {
  return (
    <svg width="20" height="17" viewBox="0 0 20 17.0001" fill="none" className={className} aria-hidden="true">
      <path d="M0 5.96687C0 0.0830586 5.5002 -2.11422 10 2.43073C14.4998 -2.11422 20 0.0830905 20 5.96687C19.9998 9.48894 15.9803 13.2139 13.0381 15.4688C11.7062 16.4896 11.0403 17.0001 10 17.0001C8.95975 17.0001 8.29382 16.4896 6.96191 15.4688C4.01968 13.2139 0.000203871 9.48886 0 5.96687Z" fill={color}/>
    </svg>
  )
}

export function ViewersEyeIcon({ color = '#808080', className }: { color?: string; className?: string }) {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className={className} aria-hidden="true">
      <path d="M7.75 8C7.75 6.75736 8.75736 5.75 10 5.75C11.2426 5.75 12.25 6.75736 12.25 8C12.25 9.24264 11.2426 10.25 10 10.25C8.75736 10.25 7.75 9.24264 7.75 8Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 9.63938 0.424964 10.1915 1.27489 11.2957C2.97196 13.5004 5.81811 16 10 16C14.1819 16 17.028 13.5004 18.7251 11.2957C19.575 10.1915 20 9.63938 20 8C20 6.36062 19.575 5.80853 18.7251 4.70433C17.028 2.49956 14.1819 0 10 0C5.81811 0 2.97196 2.49956 1.27489 4.70433C0.424964 5.80853 0 6.36062 0 8ZM10 4.25C7.92893 4.25 6.25 5.92893 6.25 8C6.25 10.0711 7.92893 11.75 10 11.75C12.0711 11.75 13.75 10.0711 13.75 8C13.75 5.92893 12.0711 4.25 10 4.25Z" fill={color}/>
    </svg>
  )
}

export function SendPlaneIcon({ size = 15, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" className={className} aria-hidden="true">
      <path d="M12.4768 10.2526L13.7641 6.3906C14.8887 3.01681 15.451 1.32992 14.5605 0.439465C13.6701 -0.450986 11.9832 0.111311 8.6094 1.23591L4.7474 2.52324C2.02443 3.4309 0.662939 3.88473 0.276044 4.55024C-0.0920145 5.18334 -0.0920146 5.96527 0.276043 6.59837C0.662939 7.26388 2.02443 7.71771 4.7474 8.62537C5.08486 8.73786 5.46451 8.65754 5.7172 8.40718L9.84643 4.31622C10.0787 4.08606 10.4536 4.08781 10.6838 4.32011C10.9139 4.55242 10.9122 4.92731 10.6799 5.15747L6.61734 9.18238C6.33882 9.45832 6.25065 9.88066 6.37463 10.2526C7.28228 12.9756 7.73612 14.3371 8.40162 14.724C9.03473 15.092 9.81666 15.092 10.4498 14.724C11.1153 14.3371 11.5691 12.9756 12.4768 10.2526Z" fill={color}/>
    </svg>
  )
}

export function PlayTriangleIcon({ className }: { className?: string }) {
  return (
    <svg width="10.0063" height="11.0873" viewBox="0 0 10.0063 11.0873" fill="none" className={className} aria-hidden="true">
      <path d="M9.16814 4.076C10.2856 4.71568 10.2856 6.37159 9.16814 7.01127L2.42079 10.8736C1.33471 11.4953 -5.43084e-08 10.6861 0 9.40594L3.27707e-07 1.68133C3.82015e-07 0.401183 1.3347 -0.407999 2.42078 0.213694L9.16814 4.076Z" fill="currentColor"/>
    </svg>
  )
}

export function SpeakerMutedIcon({ className }: { className?: string }) {
  return (
    <svg width="12.9557" height="12.9557" viewBox="0 0 12.9557 12.9557" fill="none" className={className} aria-hidden="true">
      <path d="M0.841958 6.01586C0.862311 5.01165 0.872488 4.50954 1.20606 4.0797C1.26695 4.00125 1.35628 3.90803 1.43115 3.84482C1.84137 3.4985 2.38297 3.4985 3.46617 3.4985C3.85317 3.4985 4.04667 3.4985 4.23113 3.44786C4.26945 3.43734 4.30738 3.4252 4.34481 3.41149C4.52494 3.3455 4.68651 3.23191 5.00963 3.00473C6.28447 2.10844 6.92189 1.66029 7.4569 1.85497C7.55947 1.8923 7.65877 1.94618 7.74744 2.01263C8.20995 2.35923 8.2451 3.16562 8.31538 4.7784C8.3414 5.37557 8.35913 5.88667 8.35913 6.17096C8.35913 6.45525 8.3414 6.96635 8.31538 7.56352C8.2451 9.1763 8.20995 9.9827 7.74744 10.3293C7.65877 10.3957 7.55947 10.4496 7.4569 10.4869C6.92189 10.6816 6.28447 10.2335 5.00963 9.33719C4.68651 9.11001 4.52494 8.99642 4.34481 8.93043C4.30738 8.91672 4.26945 8.90459 4.23113 8.89406C4.04667 8.84343 3.85317 8.84343 3.46617 8.84343C2.38297 8.84343 1.84137 8.84343 1.43115 8.4971C1.35628 8.43389 1.26695 8.34067 1.20606 8.26222C0.872488 7.83238 0.862311 7.33027 0.841958 6.32606C0.840889 6.27331 0.840328 6.22154 0.840328 6.17096C0.840328 6.12038 0.840889 6.06861 0.841958 6.01586Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.3741 2.65617C10.5336 2.51444 10.7707 2.53742 10.9036 2.7075C11.1358 3.0875 11.2395 3.29872 11.3416 3.58188C11.5462 4.14917 11.7426 4.99971 11.7426 6.17109C11.7426 7.34247 11.5462 8.193 11.3416 8.7603C11.2395 9.04346 11.1358 9.25467 11.0546 9.39889C11.0141 9.47097 10.9792 9.52623 10.953 9.56532C10.9399 9.58487 10.929 9.60036 10.9206 9.6119L10.9036 9.63468C10.7707 9.80476 10.5336 9.82774 10.3741 9.686C10.2154 9.54495 10.1933 9.29392 10.3241 9.12387C10.3285 9.11783 10.3337 9.11047 10.3412 9.09932C10.3561 9.07703 10.38 9.03959 10.4099 8.9864C10.4697 8.88007 10.554 8.71046 10.6398 8.47249C10.8112 7.99752 10.9907 7.24458 10.9907 6.17109C10.9907 5.0976 10.8112 4.34465 10.6398 3.86969C10.554 3.63172 10.4697 3.46211 10.4099 3.35578C10.38 3.30258 10.3561 3.26515 10.3412 3.24286C10.3337 3.23171 10.3285 3.22434 10.3258 3.22069C10.325 3.21951 10.3244 3.21871 10.3241 3.2183Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.42975 4.21725C9.61125 4.10973 9.84013 4.17946 9.94096 4.37299C9.97279 4.44118 9.98579 4.47218 10.0005 4.51149C10.03 4.59015 10.0664 4.70183 10.1018 4.84893C10.1726 5.14341 10.2389 5.5778 10.2389 6.17115C10.2389 6.7645 10.1726 7.1989 10.1018 7.49337C10.0664 7.64047 10.03 7.75215 10.0005 7.83081C9.98579 7.87012 9.97279 7.90112 9.96252 7.92412C9.95738 7.93561 9.95294 7.9451 9.9493 7.95262L9.94096 7.96931C9.84013 8.16284 9.61125 8.23257 9.42975 8.12505C9.2498 8.01845 9.18398 7.77762 9.28116 7.58489C9.28711 7.57173 9.29369 7.55638 9.30244 7.53305C9.31992 7.48644 9.3462 7.4077 9.37348 7.29424C9.42798 7.06758 9.48701 6.70024 9.48701 6.17115C9.48701 5.64207 9.42798 5.27472 9.37348 5.04806C9.3462 4.9346 9.31992 4.85587 9.30244 4.80925C9.29369 4.78593 9.28711 4.77058 9.28367 4.76288L9.28116 4.75741C9.18398 4.56468 9.2498 4.32385 9.42975 4.21725Z" fill="currentColor"/>
      <path d="M0.528804 0.528804L12.4269 12.4269" stroke="currentColor" strokeWidth="1.05761" strokeLinecap="round"/>
    </svg>
  )
}

export function CornerFrameIcon({ className }: { className?: string }) {
  return (
    <svg width="11.7199" height="11.7199" viewBox="0 0 11.7199 11.7199" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.73899 1.75316e-07L4.76974 3.70264e-07C4.99554 3.70264e-07 5.17858 0.183042 5.17858 0.408835C5.17858 0.634629 4.99554 0.81767 4.76974 0.81767C3.73031 0.81767 2.99186 0.818539 2.43167 0.893855C1.88324 0.96759 1.56726 1.10587 1.33657 1.33657C1.10587 1.56726 0.96759 1.88324 0.893855 2.43167C0.818539 2.99186 0.81767 3.73031 0.81767 4.76974C0.81767 4.99554 0.634629 5.17858 0.408835 5.17858C0.183042 5.17858 3.70264e-07 4.99554 3.70264e-07 4.76974L1.75316e-07 4.73899C-8.46737e-06 3.7372 -1.53521e-05 2.94372 0.0834761 2.32272C0.169401 1.68361 0.350443 1.16633 0.758385 0.758385C1.16633 0.350443 1.68361 0.169401 2.32272 0.0834761C2.94372 -1.53521e-05 3.7372 -8.46737e-06 4.73899 1.75316e-07ZM9.28827 0.893855C8.72808 0.818539 7.98963 0.81767 6.9502 0.81767C6.7244 0.81767 6.54136 0.634629 6.54136 0.408835C6.54136 0.183042 6.7244 3.70264e-07 6.9502 3.70264e-07L6.98095 1.75316e-07C7.98274 -8.46737e-06 8.77622 -1.53521e-05 9.39722 0.0834761C10.0363 0.169401 10.5536 0.350443 10.9616 0.758385C11.3695 1.16633 11.5505 1.68361 11.6365 2.32272C11.72 2.94372 11.7199 3.7372 11.7199 4.73899V4.76974C11.7199 4.99554 11.5369 5.17858 11.3111 5.17858C11.0853 5.17858 10.9023 4.99554 10.9023 4.76974C10.9023 3.73031 10.9014 2.99186 10.8261 2.43167C10.7523 1.88324 10.6141 1.56726 10.3834 1.33657C10.1527 1.10587 9.8367 0.96759 9.28827 0.893855ZM0.408835 6.54136C0.634629 6.54136 0.81767 6.7244 0.81767 6.9502C0.81767 7.98963 0.818539 8.72808 0.893855 9.28827C0.96759 9.8367 1.10587 10.1527 1.33657 10.3834C1.56726 10.6141 1.88324 10.7523 2.43167 10.8261C2.99186 10.9014 3.73031 10.9023 4.76974 10.9023C4.99554 10.9023 5.17858 11.0853 5.17858 11.3111C5.17858 11.5369 4.99554 11.7199 4.76974 11.7199H4.73899C3.7372 11.7199 2.94372 11.72 2.32272 11.6365C1.68361 11.5505 1.16633 11.3695 0.758385 10.9616C0.350443 10.5536 0.169401 10.0363 0.0834761 9.39722C-1.53521e-05 8.77622 -8.46737e-06 7.98274 1.75316e-07 6.98095L3.70264e-07 6.9502C3.70264e-07 6.7244 0.183042 6.54136 0.408835 6.54136ZM11.3111 6.54136C11.5369 6.54136 11.7199 6.7244 11.7199 6.9502V6.98095C11.7199 7.98274 11.72 8.77622 11.6365 9.39722C11.5505 10.0363 11.3695 10.5536 10.9616 10.9616C10.5536 11.3695 10.0363 11.5505 9.39722 11.6365C8.77622 11.72 7.98274 11.7199 6.98095 11.7199H6.9502C6.7244 11.7199 6.54136 11.5369 6.54136 11.3111C6.54136 11.0853 6.7244 10.9023 6.9502 10.9023C7.98963 10.9023 8.72808 10.9014 9.28827 10.8261C9.8367 10.7523 10.1527 10.6141 10.3834 10.3834C10.6141 10.1527 10.7523 9.8367 10.8261 9.28827C10.9014 8.72808 10.9023 7.98963 10.9023 6.9502C10.9023 6.7244 11.0853 6.54136 11.3111 6.54136Z" fill="currentColor"/>
    </svg>
  )
}

export function DotsVerticalSmallIcon({ className }: { className?: string }) {
  return (
    <svg width="2.63899" height="12.3184" viewBox="0 0 2.63899 12.3184" fill="none" className={className} aria-hidden="true">
      <circle cx="1.31949" cy="1.31937" r="1.31937" fill="currentColor"/>
      <circle cx="1.31943" cy="6.1633" r="1.31937" fill="currentColor"/>
      <circle cx="1.31937" cy="10.9991" r="1.31937" fill="currentColor"/>
    </svg>
  )
}

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg width="10.7207" height="10.7207" viewBox="0 0 10.7207 10.7207" fill="none" className={className} aria-hidden="true">
      <path d="M3.12708 7.59196L7.59404 3.125" stroke="currentColor" strokeWidth="0.893392" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.12708 3.125H7.59404V7.59196" stroke="currentColor" strokeWidth="0.893392" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ArrowDownLeftIcon({ className }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className={className} aria-hidden="true">
      <path d="M7.79232 3.21094L3.20898 7.79427" stroke="currentColor" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.79232 7.79427H3.20898V3.21094" stroke="currentColor" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function QuestionCircleIcon({ size = 20, color = '#808080', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="11 12 20 20" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M31 22C31 27.5228 26.5228 32 21 32C15.4772 32 11 27.5228 11 22C11 16.4772 15.4772 12 21 12C26.5228 12 31 16.4772 31 22ZM21 17.75C20.3787 17.75 19.875 18.2537 19.875 18.875C19.875 19.2892 19.5392 19.625 19.125 19.625C18.7108 19.625 18.375 19.2892 18.375 18.875C18.375 17.4253 19.5503 16.25 21 16.25C22.4497 16.25 23.625 17.4253 23.625 18.875C23.625 19.5858 23.3415 20.232 22.883 20.704C22.7907 20.7989 22.7027 20.8869 22.6187 20.9708C22.4029 21.1864 22.2138 21.3753 22.0479 21.5885C21.8289 21.8699 21.75 22.0768 21.75 22.25V23C21.75 23.4142 21.4142 23.75 21 23.75C20.5858 23.75 20.25 23.4142 20.25 23V22.25C20.25 21.5948 20.555 21.0644 20.8642 20.6672C21.0929 20.3733 21.3804 20.0863 21.6138 19.8535C21.6842 19.7832 21.7496 19.7179 21.807 19.6588C22.0046 19.4554 22.125 19.18 22.125 18.875C22.125 18.2537 21.6213 17.75 21 17.75ZM21 27C21.5523 27 22 26.5523 22 26C22 25.4477 21.5523 25 21 25C20.4477 25 20 25.4477 20 26C20 26.5523 20.4477 27 21 27Z" fill={color}/>
    </svg>
  )
}

export function ChartBarsIcon({ color = '#00B38C', className }: { color?: string; className?: string }) {
  return (
    <svg width="17.1171" height="17.1171" viewBox="0 0 17.1171 17.1171" fill="none" className={className} aria-hidden="true">
      <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M1.25337 1.25337C0 2.50674 0 4.52402 0 8.55856C0 12.5931 0 14.6104 1.25337 15.8637C2.50674 17.1171 4.52402 17.1171 8.55856 17.1171C12.5931 17.1171 14.6104 17.1171 15.8637 15.8637C17.1171 14.6104 17.1171 12.5931 17.1171 8.55856C17.1171 4.52402 17.1171 2.50674 15.8637 1.25337C14.6104 0 12.5931 0 8.55856 0C4.52402 0 2.50674 0 1.25337 1.25337ZM12.8378 8.77252C13.1923 8.77252 13.4797 9.05991 13.4797 9.41441V13.6937C13.4797 14.0482 13.1923 14.3356 12.8378 14.3356C12.4833 14.3356 12.1959 14.0482 12.1959 13.6937V9.41441C12.1959 9.05991 12.4833 8.77252 12.8378 8.77252ZM9.20045 3.42342C9.20045 3.06892 8.91307 2.78153 8.55856 2.78153C8.20405 2.78153 7.91667 3.06892 7.91667 3.42342V13.6937C7.91667 14.0482 8.20405 14.3356 8.55856 14.3356C8.91307 14.3356 9.20045 14.0482 9.20045 13.6937V3.42342ZM4.27928 5.3491C4.63379 5.3491 4.92117 5.63648 4.92117 5.99099V13.6937C4.92117 14.0482 4.63379 14.3356 4.27928 14.3356C3.92477 14.3356 3.63739 14.0482 3.63739 13.6937V5.99099C3.63739 5.63648 3.92477 5.3491 4.27928 5.3491Z" fill={color}/>
    </svg>
  )
}

export function ChartLineIcon({ color = '#808080', className }: { color?: string; className?: string }) {
  return (
    <svg width="18.4009" height="18.4009" viewBox="0 0 18.4009 18.4009" fill="none" className={className} aria-hidden="true">
      <g opacity="0.4">
        <path d="M1.28378 0.641892C1.28378 0.287385 0.996399 0 0.641892 0C0.287385 0 1.81048e-07 0.287385 1.81048e-07 0.641892V9.24956C-1.08378e-05 11.2252 -1.95635e-05 12.7735 0.162396 13.9815C0.328637 15.218 0.67555 16.1937 1.44138 16.9595C2.20721 17.7254 3.1829 18.0723 4.41939 18.2385C5.62742 18.4009 7.17569 18.4009 9.15135 18.4009H17.759C18.1135 18.4009 18.4009 18.1135 18.4009 17.759C18.4009 17.4045 18.1135 17.1171 17.759 17.1171H9.20045C7.16503 17.1171 5.70304 17.1158 4.59045 16.9662C3.49632 16.8191 2.83669 16.5393 2.34915 16.0518C1.86161 15.5642 1.58183 14.9046 1.43473 13.8105C1.28515 12.6979 1.28378 11.2359 1.28378 9.20045V0.641892Z" fill={color}/>
        <path d="M15.6943 5.32035C15.9147 5.04273 15.8684 4.63896 15.5908 4.4185C15.3131 4.19804 14.9094 4.24437 14.6889 4.52199L12.0203 7.88242C11.8104 8.14674 11.6727 8.31957 11.5593 8.44409C11.4484 8.56587 11.3963 8.60041 11.3726 8.61308C11.1922 8.70951 10.9767 8.7142 10.7923 8.62571C10.768 8.61408 10.7145 8.58184 10.5984 8.46499C10.4796 8.34553 10.3345 8.17886 10.1133 7.92391L10.0995 7.908C9.89594 7.67334 9.72233 7.47323 9.56917 7.31915C9.40996 7.15897 9.23586 7.00954 9.02022 6.90606C8.467 6.64057 7.82037 6.65463 7.27921 6.94392C7.06827 7.05668 6.90083 7.21354 6.74873 7.38048C6.60243 7.54108 6.43768 7.74854 6.24449 7.99182L3.56265 11.3688C3.34218 11.6464 3.38851 12.0502 3.66613 12.2707C3.94374 12.4912 4.34751 12.4448 4.56798 12.1672L7.2367 8.80672C7.4466 8.54241 7.58429 8.36958 7.69773 8.24507C7.80868 8.12329 7.86074 8.08875 7.88444 8.07608C8.06483 7.97965 8.28037 7.97497 8.46478 8.06346C8.48901 8.07509 8.54253 8.10733 8.65867 8.22418C8.77741 8.34363 8.92248 8.51031 9.14367 8.76525L9.15751 8.78119C9.36107 9.01582 9.53471 9.21595 9.68786 9.37002C9.84707 9.5302 10.0212 9.67963 10.2368 9.78312C10.79 10.0486 11.4367 10.0345 11.9778 9.74524C12.1888 9.63247 12.3562 9.47561 12.5083 9.30866C12.6546 9.14808 12.8193 8.94063 13.0125 8.69737L15.6943 5.32035Z" fill={color}/>
      </g>
    </svg>
  )
}

export function ChartCandleIcon({ color = '#808080', className }: { color?: string; className?: string }) {
  return (
    <svg width="17.1176" height="21.1351" viewBox="0 0 17.1176 21.1351" fill="none" className={className} aria-hidden="true">
      <g opacity="0.4">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.6499 0.0327444C10.7752 1.56227e-07 9.7557 0 8.55856 0C4.52402 0 2.50674 0 1.25337 1.25337C0 2.50674 0 4.52402 0 8.55856C0 12.5931 0 14.6104 1.25337 15.8637C2.50674 17.1171 4.52402 17.1171 8.55856 17.1171C12.5931 17.1171 14.6104 17.1171 15.8637 15.8637C17.1171 14.6104 17.1171 12.5931 17.1171 8.55856C17.1171 7.36141 17.1171 6.34189 17.0844 5.46722C16.407 6.05982 15.5202 6.41892 14.5495 6.41892C12.4225 6.41892 10.6982 4.69461 10.6982 2.56757C10.6982 1.59689 11.0573 0.71008 11.6499 0.0327444ZM13.2488 6.35373C13.5211 6.58068 13.5579 6.98544 13.331 7.25778L11.7657 9.13606C11.4846 9.47347 11.2312 9.77764 10.9945 9.9914C10.7369 10.224 10.4125 10.4311 9.98498 10.4311C9.55749 10.4311 9.23307 10.224 8.97551 9.9914C8.73879 9.77764 8.48536 9.47346 8.20424 9.13605L7.95399 8.83574C7.63665 8.45493 7.44176 8.22349 7.28122 8.07852C7.20677 8.01128 7.1626 7.98449 7.14143 7.97424C7.13713 7.97216 7.13407 7.97091 7.13213 7.97019L7.12862 7.9716L7.12283 7.97424C7.10166 7.98449 7.0575 8.01128 6.98304 8.07852C6.8225 8.22349 6.62762 8.45493 6.31027 8.83574L4.77239 10.6812C4.54544 10.9535 4.14069 10.9903 3.86835 10.7634C3.59601 10.5364 3.55921 10.1317 3.78616 9.85934L5.35138 7.98107C5.6325 7.64366 5.88593 7.33948 6.12266 7.12571C6.38022 6.89313 6.70464 6.68599 7.13213 6.68599C7.55962 6.68599 7.88405 6.89313 8.14161 7.12571C8.37833 7.33948 8.63176 7.64365 8.91288 7.98107L9.16313 8.28137C9.48047 8.66219 9.67535 8.89363 9.8359 9.0386C9.91035 9.10583 9.95452 9.13263 9.97569 9.14287L9.97843 9.14417C9.98132 9.1455 9.98498 9.14692 9.98498 9.14692C9.98692 9.14621 9.98998 9.14495 9.99428 9.14287C10.0155 9.13263 10.0596 9.10583 10.1341 9.0386C10.2946 8.89363 10.4895 8.66219 10.8068 8.28137L12.3447 6.43592C12.5717 6.16358 12.9764 6.12678 13.2488 6.35373Z" fill={color}/>
        <path d="M17.1176 18.5676C17.1176 19.9856 15.968 21.1351 14.55 21.1351C13.132 21.1351 11.9824 19.9856 11.9824 18.5676C11.9824 17.1495 13.132 16 14.55 16C15.968 16 17.1176 17.1495 17.1176 18.5676Z" fill={color}/>
      </g>
    </svg>
  )
}

export * from './aiCoachIcons'
