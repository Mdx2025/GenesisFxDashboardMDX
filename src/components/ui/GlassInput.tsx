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
        <label className="block text-white font-acid font-medium text-[1rem] leading-[1.528rem] mb-[0.125rem]">
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
        className={`w-full bg-[#101E1A] font-acid text-white placeholder:text-[#808080] h-[3.125rem] rounded-[1.875rem] px-[1rem] text-[1rem] outline-none transition-[border-color] duration-200 ${
          focused ? 'border border-[rgba(16,188,131,0.5)]' : 'border border-[#064B34]'
        }`}
      />
    </div>
  )
}
