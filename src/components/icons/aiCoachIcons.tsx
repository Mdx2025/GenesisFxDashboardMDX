interface IconProps {
  size?: number
  className?: string
}

export function AiCoachFaceIcon({ size = 25, className }: IconProps) {
  return (
    <svg width={(size * 20) / 25} height={size} viewBox="0 0 20 25" fill="none" className={className} aria-hidden="true">
      <path d="M15.9811 0.353163C16.1668 -0.117721 16.8332 -0.117721 17.0189 0.353163L17.6733 2.01242C17.73 2.15618 17.8438 2.26998 17.9876 2.32668L19.6468 2.98108C20.1177 3.16679 20.1177 3.83321 19.6468 4.01892L17.9876 4.67332C17.8438 4.73002 17.73 4.84382 17.6733 4.98758L17.0189 6.64684C16.8332 7.11772 16.1668 7.11772 15.9811 6.64684L15.3267 4.98758C15.27 4.84382 15.1562 4.73002 15.0124 4.67332L13.3532 4.01892C12.8823 3.83321 12.8823 3.16679 13.3532 2.98108L15.0124 2.32668C15.1562 2.26998 15.27 2.15618 15.3267 2.01242L15.9811 0.353163Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15 12.5C15 16.6421 11.6421 20 7.5 20C3.35786 20 0 16.6421 0 12.5C0 8.35786 3.35786 5 7.5 5C11.6421 5 15 8.35786 15 12.5ZM10 14.75C10.4142 14.75 10.75 14.4142 10.75 14C10.75 13.5858 10.4142 13.25 10 13.25H8C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H10ZM12 10.5C12 11.3284 11.5523 12 11 12C10.4477 12 10 11.3284 10 10.5C10 9.67157 10.4477 9 11 9C11.5523 9 12 9.67157 12 10.5ZM7 12C7.55228 12 8 11.3284 8 10.5C8 9.67157 7.55228 9 7 9C6.44772 9 6 9.67157 6 10.5C6 11.3284 6.44772 12 7 12Z" fill="currentColor" />
      <path d="M14.7669 6.29386L14.0175 7.04328C13.6957 6.6594 13.3407 6.30436 12.9568 5.98261L13.7063 5.23315L14.4669 5.53312L14.7669 6.29386Z" fill="currentColor" />
    </svg>
  )
}

export function AiBoltIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M9.2 1.3 3.4 8.9a.5.5 0 0 0 .4.8h3.1l-.9 4.9a.5.5 0 0 0 .9.4l5.8-7.6a.5.5 0 0 0-.4-.8H9.2l.9-4.9a.5.5 0 0 0-.9-.4Z" fill="currentColor" />
    </svg>
  )
}

export function AiNotebookIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="1.8" width="10" height="12.4" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.4 4.6h2M2.4 8h2M2.4 11.4h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6.4 5.6h4.4M6.4 8.4h4.4M6.4 11.2h2.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function AiFullscreenIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M6 2H2v4M10 2h4v4M10 14h4v-4M6 14H2v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AiHistoryIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M8 4.2v4l2.6 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.2 8a5.8 5.8 0 1 0 1.7-4.1L1.8 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.6 2.6v3.6h3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AiSparkleIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M9 1.2c.5 2.9 1.6 4.5 4.4 5.1l1.6.4-1.6.4c-2.8.6-3.9 2.2-4.4 5.1-.5-2.9-1.6-4.5-4.4-5.1L3 6.7l1.6-.4C7.4 5.7 8.5 4.1 9 1.2Z" fill="currentColor" />
      <path d="M14.6 11.5c.25 1.35.75 2.05 2.05 2.35l.75.2-.75.2c-1.3.3-1.8 1-2.05 2.35-.25-1.35-.75-2.05-2.05-2.35l-.75-.2.75-.2c1.3-.3 1.8-1 2.05-2.35Z" fill="currentColor" />
      <path d="M3.6 11.9c.2 1.1.6 1.6 1.6 1.85l.6.15-.6.15c-1 .25-1.4.75-1.6 1.85-.2-1.1-.6-1.6-1.6-1.85l-.6-.15.6-.15c1-.25 1.4-.75 1.6-1.85Z" fill="currentColor" />
    </svg>
  )
}

export function AiSendIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M16.2 1.8 1.9 7.3c-.7.3-.66 1.3.06 1.5l5.3 1.6 1.6 5.3c.2.72 1.2.76 1.5.06L16.2 1.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16.2 1.8 7.26 10.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function AiMicIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="2.5" width="6" height="11.5" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 17.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function AiChatIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 11.2c0-4 3.8-7 8.5-7s8.5 3 8.5 7-3.8 7-8.5 7c-.9 0-1.8-.1-2.6-.3l-4.2 2 1-3.4c-1.7-1.3-2.7-3.1-2.7-5.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="19" cy="5.5" r="2.6" fill="currentColor" />
    </svg>
  )
}

export function AiPlusIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M9 2.5v13M2.5 9h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function AiBulbIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M6.4 12.6a5 5 0 1 1 5.2 0v1.5H6.4v-1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 16h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function AiThumbUpIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M5.6 7.6 8.8 2c1.2 0 2 .9 1.9 2.1L10.4 6.6h3.7c1 0 1.7.9 1.5 1.9l-1 4.6c-.2.8-.9 1.4-1.7 1.4H5.6V7.6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="1.8" y="7.6" width="3.8" height="6.9" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

export function AiThumbDownIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M5.6 10.4 8.8 16c1.2 0 2-.9 1.9-2.1l-.3-2.5h3.7c1 0 1.7-.9 1.5-1.9l-1-4.6c-.2-.8-.9-1.4-1.7-1.4H5.6v6.9Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="1.8" y="3.5" width="3.8" height="6.9" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

export function AiCopyIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <rect x="6.2" y="6.2" width="9.6" height="9.6" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11.8 3.6a1.4 1.4 0 0 0-1.4-1.4H4.2a2 2 0 0 0-2 2v6.2a1.4 1.4 0 0 0 1.4 1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
