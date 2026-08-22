interface AiCoachButtonProps {
  className?: string
  onClick?: () => void
}

// The sparkle overhangs above the face, so a tight 20x20 box centres 2.5 units above
// the face circle and makes the icon read low beside the label. The 25-unit box puts
// the face centre on the box centre instead.
function AiCoachIcon() {
  return (
    <svg width="20" height="25" viewBox="0 0 20 25" fill="none">
      <path d="M15.9811 0.353163C16.1668 -0.117721 16.8332 -0.117721 17.0189 0.353163L17.6733 2.01242C17.73 2.15618 17.8438 2.26998 17.9876 2.32668L19.6468 2.98108C20.1177 3.16679 20.1177 3.83321 19.6468 4.01892L17.9876 4.67332C17.8438 4.73002 17.73 4.84382 17.6733 4.98758L17.0189 6.64684C16.8332 7.11772 16.1668 7.11772 15.9811 6.64684L15.3267 4.98758C15.27 4.84382 15.1562 4.73002 15.0124 4.67332L13.3532 4.01892C12.8823 3.83321 12.8823 3.16679 13.3532 2.98108L15.0124 2.32668C15.1562 2.26998 15.27 2.15618 15.3267 2.01242L15.9811 0.353163Z" fill="#B08DFF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15 12.5C15 16.6421 11.6421 20 7.5 20C3.35786 20 0 16.6421 0 12.5C0 8.35786 3.35786 5 7.5 5C11.6421 5 15 8.35786 15 12.5ZM10 14.75C10.4142 14.75 10.75 14.4142 10.75 14C10.75 13.5858 10.4142 13.25 10 13.25H8C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H10ZM12 10.5C12 11.3284 11.5523 12 11 12C10.4477 12 10 11.3284 10 10.5C10 9.67157 10.4477 9 11 9C11.5523 9 12 9.67157 12 10.5ZM7 12C7.55228 12 8 11.3284 8 10.5C8 9.67157 7.55228 9 7 9C6.44772 9 6 9.67157 6 10.5C6 11.3284 6.44772 12 7 12Z" fill="#B08DFF" />
      <path d="M14.7669 6.29386L14.0175 7.04328C13.6957 6.6594 13.3407 6.30436 12.9568 5.98261L13.7063 5.23315L14.4669 5.53312L14.7669 6.29386Z" fill="#B08DFF" />
    </svg>
  )
}

export function AiCoachButton({ className = '', onClick }: AiCoachButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3.5 px-[19px] h-[52px] rounded-full bg-[linear-gradient(241deg,#100919_0%,#1D0E2F_100%)] max-md:bg-[linear-gradient(266deg,#F4EBFF_0.95%,#F2E8FF_79.28%)] [[data-theme=light]_&]:bg-[linear-gradient(266deg,#F4EBFF_0.95%,#F2E8FF_79.28%)] hover:opacity-90 transition-opacity cursor-pointer ${className}`}
    >
      <AiCoachIcon />
      <span className="text-white max-md:text-black text-base font-acid font-medium leading-6">AI Coach</span>
    </button>
  )
}
