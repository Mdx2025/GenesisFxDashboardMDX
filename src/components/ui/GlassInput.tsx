import { useState } from 'react'

interface GlassInputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'number'
  value?: string
  onChange?: (value: string) => void
}

export function GlassInput({ label, placeholder = '0.00', type = 'text', value: controlledValue, onChange }: GlassInputProps) {
  const [internalValue, setInternalValue] = useState('')
  const [focused, setFocused] = useState(false)
  const value = controlledValue ?? internalValue

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
        <label className="block text-white font-acid font-medium text-[16px] leading-[24.44px] mb-[2px]">
          {label}
        </label>
      )}
      <input
        type="text"
        inputMode={type === 'number' ? 'decimal' : 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-[#101E1A] font-acid text-white placeholder:text-[#808080] h-[50px] rounded-[30px] px-[16px] text-[16px] outline-none transition-[border-color] duration-200 ${
          focused ? 'border border-[rgba(16,188,131,0.5)]' : 'border border-[#404040]'
        }`}
      />
    </div>
  )
}
