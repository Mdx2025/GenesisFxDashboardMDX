import { useState } from 'react'

interface GlassTextareaProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  rows?: number
}

export function GlassTextarea({ label, placeholder = '', value: controlledValue, onChange, rows = 4 }: GlassTextareaProps) {
  const [internalValue, setInternalValue] = useState('')
  const [focused, setFocused] = useState(false)
  const value = controlledValue ?? internalValue

  function handleChange(raw: string) {
    if (controlledValue === undefined) setInternalValue(raw)
    onChange?.(raw)
  }

  return (
    <div>
      {label && (
        <label className="block text-white font-acid font-medium text-base leading-6 mb-[0.125rem]">
          {label}
        </label>
      )}
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-gfx-green-800 font-acid text-white placeholder:text-gfx-neutral-400 rounded-lg px-4 py-4 text-base outline-none resize-none transition-[border-color] duration-200 ${
          focused ? 'border border-gfx-focus-ring' : 'border border-gfx-green-200'
        }`}
      />
    </div>
  )
}
