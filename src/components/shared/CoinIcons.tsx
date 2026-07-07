export function UsdtIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#26A17B" />
      <path d="M13.4 10.9v-1.5h3.1V7H7.5v2.4h3.1v1.5c-2.7.1-4.7.7-4.7 1.4 0 .7 2 1.3 4.7 1.4v4.3h1.8v-4.3c2.7-.1 4.7-.7 4.7-1.4 0-.7-2-1.3-4.7-1.4zm0 2.3v0c-.1 0-.5 0-.9 0s-.7 0-.9 0v0c-2.4-.1-4.2-.6-4.2-1.1 0-.5 1.8-1 4.2-1.1v1.7c.2 0 .6 0 .9 0 .4 0 .7 0 .9 0v-1.7c2.4.1 4.2.6 4.2 1.1 0 .5-1.8 1-4.2 1.1z" fill="white" />
    </svg>
  )
}

export function BtcIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#F7931A" />
      <path d="M15.5 10.8c.2-1.4-.8-2.1-2.3-2.6l.5-1.9-1.2-.3-.5 1.9c-.3-.1-.6-.2-1-.2l.5-1.9-1.2-.3-.5 1.9c-.3-.1-.5-.1-.7-.2l-1.6-.4-.3 1.3s.9.2.9.2c.5.1.6.4.5.7l-.5 2.1c0 0 .1 0 .1 0l-.1 0-.8 3c-.1.2-.2.4-.6.3 0 0-.9-.2-.9-.2l-.6 1.4 1.5.4c.3.1.6.1.8.2l-.5 2 1.2.3.5-1.9c.3.1.7.2 1 .3l-.5 1.9 1.2.3.5-2c2.1.4 3.6.2 4.3-1.6.5-1.5 0-2.3-1.1-2.9.8-.2 1.4-.7 1.5-1.8zm-2.8 3.9c-.4 1.5-2.8.7-3.6.5l.6-2.6c.8.2 3.4.6 3 2.1zm.4-3.9c-.3 1.3-2.3.7-3 .5l.6-2.3c.7.2 2.8.5 2.4 1.8z" fill="white" />
    </svg>
  )
}

export function EthIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#627EEA" />
      <path d="M12 4v5.9l5 2.2L12 4z" fill="white" fillOpacity="0.6" />
      <path d="M12 4L7 12.1l5-2.2V4z" fill="white" />
      <path d="M12 16.5v3.5l5-6.9-5 3.4z" fill="white" fillOpacity="0.6" />
      <path d="M12 20v-3.5L7 13.1l5 6.9z" fill="white" />
      <path d="M12 15.4l5-3.3-5-2.2v5.5z" fill="white" fillOpacity="0.2" />
      <path d="M7 12.1l5 3.3V9.9l-5 2.2z" fill="white" fillOpacity="0.6" />
    </svg>
  )
}

export function UsdcIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#2775CA" />
      <path d="M15.2 13.8c0-1.5-0.9-2-2.7-2.2-1.3-.2-1.5-.5-1.5-1.1s.5-1 1.3-1c.7 0 1.2.3 1.4.9.1.1.1.2.3.2h.6c.1 0 .2-.1.2-.2v-.1c-.2-.8-.9-1.4-1.7-1.5V8.2c0-.1-.1-.2-.3-.2h-.5c-.1 0-.3.1-.3.2v.6c-1.2.2-1.9.9-1.9 1.9 0 1.4.9 1.9 2.7 2.2 1.2.2 1.5.6 1.5 1.2 0 .7-.6 1.1-1.4 1.1-.9 0-1.3-.4-1.5-1-.1-.1-.1-.2-.3-.2h-.6c-.1 0-.2.1-.2.2v.1c.2.9.8 1.5 2 1.7v.6c0 .1.1.2.3.2h.5c.1 0 .3-.1.3-.2v-.6c1.2-.2 2-.9 2-2z" fill="white" />
    </svg>
  )
}

export function CopyIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="10" height="10" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M5 15V6a1 1 0 011-1h9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
