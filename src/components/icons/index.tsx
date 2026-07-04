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
    <img src="/tradelocker-logo.svg" width={size} height={size} alt="" className={className} style={{ borderRadius: 5 }} />
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
      <rect x="3" y="3" width="14" height="14" rx="3" stroke={color} strokeWidth="1.5"/>
      <path d="M10 7V13M10 13L7.5 10.5M10 13L12.5 10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function WithdrawIcon({ size = 20, color = '#A0A0A0', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="3" y="3" width="14" height="14" rx="3" stroke={color} strokeWidth="1.5"/>
      <path d="M10 13V7M10 7L7.5 9.5M10 7L12.5 9.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function TransferIcon({ size = 20, color = '#A0A0A0', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 8H16M16 8L13 5M16 8L13 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 14H4M4 14L7 11M4 14L7 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export function UserIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" fill={color}/>
      <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
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
