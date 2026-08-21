import type { ButtonHTMLAttributes } from 'react'

interface ToggleSwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  label: string
}

/** Compact Genesis toggle used by privacy and preference surfaces. */
export function ToggleSwitch({ checked, onCheckedChange, label, className = '', disabled, ...props }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={`relative h-[23px] w-11 shrink-0 rounded-[60px] transition-colors focus-visible:ring-2 focus-visible:ring-gfx-green-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-gfx-green-350' : 'bg-gfx-green-900'} ${className}`}
      {...props}
    >
      <span
        className={`absolute top-0.5 size-[19px] rounded-full transition-[left,background-color] ${checked ? 'left-[22px] bg-white' : 'left-[3px] bg-gfx-neutral-250'}`}
        aria-hidden="true"
      />
    </button>
  )
}
