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
        <label className="block text-white font-acid font-medium" style={{ fontSize: 16, lineHeight: '24.44px', marginBottom: 2 }}>
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
        className="w-full bg-transparent font-acid text-white placeholder:text-[#808080]"
        style={{
          height: 50,
          background: '#101E1A',
          borderRadius: 30,
          border: focused ? '1px solid rgba(16,188,131,0.5)' : '1px solid #404040',
          paddingLeft: 16,
          paddingRight: 16,
          transition: 'border-color 0.2s',
          fontSize: 16,
          outline: 'none',
        }}
      />
    </div>
  )
}
