interface BannerStatBoxProps {
  value: string | number
  label: string
  icon?: React.ReactNode
  className?: string
}

const CommandIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
    <path d="M23.3346 11.6673L27.7096 11.668C30.1259 11.6683 32.0849 9.7099 32.0853 7.29366C32.0857 4.87741 30.1273 2.91835 27.711 2.91797C25.2948 2.91759 23.3357 4.87603 23.3353 7.29228L23.3346 11.6673L11.6687 11.6673L11.668 7.29228C11.6676 4.87603 9.70853 2.91759 7.29228 2.91797C4.87603 2.91835 2.91759 4.87741 2.91797 7.29366C2.91835 9.7099 4.87741 11.6683 7.29366 11.668L11.6687 11.6673L11.668 23.3339H23.3346V11.6673Z" fill="white"/>
    <path d="M23.3346 23.3339L27.7096 23.3346C30.1259 23.3343 32.0849 25.2927 32.0853 27.7089C32.0857 30.1252 30.1273 32.0843 27.711 32.0846C25.2948 32.085 23.3357 30.1266 23.3353 27.7103L23.3346 23.3339Z" fill="white"/>
    <path d="M7.29366 23.3346L11.6687 23.3353L11.668 27.7103C11.6676 30.1266 9.70853 32.085 7.29228 32.0846C4.87603 32.0843 2.91759 30.1252 2.91797 27.7089C2.91835 25.2927 4.87741 23.3343 7.29366 23.3346Z" fill="white"/>
  </svg>
)

export function BannerStatBox({ value, label, icon, className = '' }: BannerStatBoxProps) {
  return (
    <div className={`hidden xl:flex items-center gap-5 bg-gfx-green-900 rounded-2xl px-5 py-5 shrink-0 ${className}`} style={{ minWidth: '22.4rem', minHeight: '8.375rem' }}>
      <div className="w-[6.125rem] h-[6.125rem] rounded-md bg-gfx-green-200 flex items-center justify-center shrink-0">
        {icon ?? <CommandIcon />}
      </div>
      <div>
        <p className="text-white text-5xl font-acid leading-none">{value}</p>
        <p className="text-gfx-neutral-400 text-body1 font-acid font-medium mt-1">{label}</p>
      </div>
    </div>
  )
}
