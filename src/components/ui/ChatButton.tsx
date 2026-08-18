interface ChatButtonProps {
  className?: string
  onClick?: () => void
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.2797 4.30049 14.4893 4.83477 15.562C4.97675 15.847 5.02401 16.1729 4.94169 16.4805L4.46521 18.2613C4.25836 19.0344 4.96561 19.7416 5.73868 19.5348L7.51951 19.0583C7.82715 18.976 8.15297 19.0232 8.43802 19.1652C9.51069 19.6995 10.7203 20 12 20Z" fill="#B08DFF" />
    </svg>
  )
}

export function ChatButton({ className = '', onClick }: ChatButtonProps) {
  return (
    <button
      type="button"
      aria-label="Open chat"
      onClick={onClick}
      className={`flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[linear-gradient(241deg,#100919_0%,#1D0E2F_100%)] max-md:bg-[linear-gradient(266deg,#F4EBFF_0.95%,#F2E8FF_79.28%)] [[data-theme=light]_&]:bg-[linear-gradient(266deg,#F4EBFF_0.95%,#F2E8FF_79.28%)] hover:opacity-90 transition-opacity cursor-pointer ${className}`}
    >
      <ChatIcon />
    </button>
  )
}
