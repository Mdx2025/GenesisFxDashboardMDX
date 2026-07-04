import type { SVGProps } from 'react'

interface IconProps {
  size?: number
  color?: string
  className?: string
}

export function DashboardIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path d="M2.625 11.375H8.375V2.625H2.625V11.375ZM2.625 18.375H8.375V13.125H2.625V18.375ZM10.125 18.375H15.875V9.625H10.125V18.375ZM10.125 2.625V7.875H15.875V2.625H10.125Z" fill={color}/>
    </svg>
  )
}

export function AssetsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path d="M17.5 5.25H3.5C2.5335 5.25 1.75 6.0335 1.75 7V15.75C1.75 16.7165 2.5335 17.5 3.5 17.5H17.5C18.4665 17.5 19.25 16.7165 19.25 15.75V7C19.25 6.0335 18.4665 5.25 17.5 5.25Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 12.25C14.4832 12.25 14.875 11.8582 14.875 11.375C14.875 10.8918 14.4832 10.5 14 10.5C13.5168 10.5 13.125 10.8918 13.125 11.375C13.125 11.8582 13.5168 12.25 14 12.25Z" fill={color}/>
      <path d="M1.75 8.75H19.25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function TradelockerIcon({ size = 21, className }: IconProps) {
  return (
    <img src="/tradelocker-logo.svg" width={size} height={size} alt="Tradelocker" className={className} style={{ borderRadius: 5 }} />
  )
}

export function ChallengesIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path d="M10.5 2.625L13.125 7.875L19.25 8.75L14.875 13.125L15.75 19.25L10.5 16.625L5.25 19.25L6.125 13.125L1.75 8.75L7.875 7.875L10.5 2.625Z" fill={color}/>
    </svg>
  )
}

export function PammIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <circle cx="10.5" cy="7" r="3.5" fill={color}/>
      <path d="M3.5 17.5C3.5 13.634 6.634 10.5 10.5 10.5C14.366 10.5 17.5 13.634 17.5 17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function MarketNewsIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3.966 0H19.85c.727 0 1.392.18 1.994.54.602.352 1.08.83 1.432 1.432.36.602.54 1.267.54 1.994V19.85c0 .727-.18 1.392-.54 1.994a3.865 3.865 0 01-1.432 1.432c-.602.36-1.267.54-1.994.54H3.966c-.727 0-1.392-.18-1.994-.54A3.865 3.865 0 01.529 21.844 3.855 3.855 0 010 19.85V3.966C0 3.239.176 2.574.529 1.972A3.865 3.865 0 011.972.54C2.574.18 3.239 0 3.966 0zM1.586 3.966V19.85c0 .514.147.973.44 1.377.302.411.683.701 1.146.87V7.314c0-.264.096-.492.287-.683.19-.19.422-.286.694-.286h2.809c.272 0 .504.095.694.286.191.191.287.419.287.683v14.915h1.586V13.67c0-.271.095-.499.286-.683.191-.191.419-.286.683-.286h2.82c.272 0 .5.095.683.286.191.184.287.412.287.683v8.56h1.597V4.924c0-.265.092-.489.276-.672.19-.191.422-.286.694-.286h2.82c.264 0 .492.095.683.286.19.184.286.407.286.672v17.173c.463-.17.845-.46 1.138-.87.301-.404.452-.863.452-1.377V3.966c0-.654-.231-1.212-.694-1.675-.463-.47-1.024-.705-1.685-.705H3.966c-.654 0-1.215.235-1.686.705-.462.462-.694 1.02-.694 1.675z" fill={color}/>
    </svg>
  )
}

export function AcademyIcon({ size = 21, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" className={className}>
      <path d="M10.5 3.5L1.75 8.75L10.5 14L19.25 8.75L10.5 3.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5.25 11.375V15.75L10.5 18.375L15.75 15.75V11.375" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export function CalendarIcon({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="3" width="12" height="11" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M2 7H14M5.5 1.5V4.5M10.5 1.5V4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
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
