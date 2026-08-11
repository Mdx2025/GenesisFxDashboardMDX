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

export function TradelockerIcon({ size = 21, className }: IconProps) {
  return (
    <img src="/tradelocker-icon.png" alt="TradeLocker" width={size} height={size} className={className} />
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
