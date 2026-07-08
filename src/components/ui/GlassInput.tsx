import { useState } from 'react'

interface GlassInputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'number' | 'password'
  value?: string
  onChange?: (value: string) => void
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
      <path d="M7.75 8.69565C7.75 7.34496 8.75736 6.25 10 6.25C11.2426 6.25 12.25 7.34496 12.25 8.69565C12.25 10.0463 11.2426 11.1413 10 11.1413C8.75736 11.1413 7.75 10.0463 7.75 8.69565Z" fill="#808080"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0 8.69565C0 10.4776 0.424964 11.0777 1.27489 12.2779C2.97196 14.6744 5.81811 17.3913 10 17.3913C14.1819 17.3913 17.028 14.6744 18.7251 12.2779C19.575 11.0777 20 10.4776 20 8.69565C20 6.91372 19.575 6.31362 18.7251 5.1134C17.028 2.71691 14.1819 0 10 0C5.81811 0 2.97196 2.71691 1.27489 5.1134C0.424964 6.31362 0 6.91372 0 8.69565ZM10 4.61957C7.92893 4.61957 6.25 6.44449 6.25 8.69565C6.25 10.9468 7.92893 12.7717 10 12.7717C12.0711 12.7717 13.75 10.9468 13.75 8.69565C13.75 6.44449 12.0711 4.61957 10 4.61957Z" fill="#808080"/>
    </svg>
  )
}

export function GlassInput({ label, placeholder = '0.00', type = 'text', value: controlledValue, onChange }: GlassInputProps) {
  const [internalValue, setInternalValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const value = controlledValue ?? internalValue
  const isPassword = type === 'password'

  function handleChange(raw: string) {
    if (type === 'number') {
      const cleaned = raw.replace(/[^0-9.]/g, '')
      const parts = cleaned.split('.')
      const sanitized = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleaned
      if (controlledValue === undefined) setInternalValue(sanitized)
      onChange?.(sanitized)
    } else {
      if (controlledValue === undefined) setInternalValue(raw)
      onChange?.(raw)
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-white font-acid font-medium text-[1rem] leading-[1.528rem] mb-[0.125rem]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          inputMode={type === 'number' ? 'decimal' : 'text'}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-[#101E1A] font-acid text-white placeholder:text-[#808080] h-[3.125rem] rounded-[1.875rem] px-[1rem] ${isPassword ? 'pr-[3rem]' : ''} text-[1rem] outline-none transition-[border-color] duration-200 ${
            focused ? 'border border-[rgba(16,188,131,0.5)]' : 'border border-[#064B34]'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon />
          </button>
        )}
      </div>
    </div>
  )
}
