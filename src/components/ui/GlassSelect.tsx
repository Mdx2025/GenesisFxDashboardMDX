import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ChevronDownIcon } from '@/components/icons'

export interface GlassSelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface GlassSelectProps {
  options: GlassSelectOption[]
  defaultValue?: string
  value?: string
  placeholder?: string
  label?: string
  id?: string
  size?: 'sm' | 'default'
  onChange?: (value: string) => void
}

const SIZE_STYLES = {
  default: { trigger: 'h-12 px-5 rounded-full', dropdown: 'rounded-2xl', item: 'px-4 py-3' },
  sm: { trigger: 'h-12 px-5 rounded-full', dropdown: 'rounded-2xl', item: 'px-4 py-2.5' },
} as const

export function GlassSelect({ options, defaultValue, value, placeholder = 'Select...', label, id, size = 'default', onChange }: GlassSelectProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<GlassSelectOption | null>(
    (value ?? defaultValue) ? options.find(o => o.value === (value ?? defaultValue)) || null : null
  )
  const s = SIZE_STYLES[size]
  const ref = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (value !== undefined && value !== selected?.value) {
      setSelected(options.find(o => o.value === value) || null)
    }
  }, [value])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useLayoutEffect(() => {
    const el = dropdownRef.current
    if (!el) return

    if (isFirstRender.current) {
      gsap.set(el, { autoAlpha: 0, y: -8, scaleY: 0.96, transformOrigin: 'top center' })
      isFirstRender.current = false
      return
    }

    if (open) {
      gsap.to(el, { autoAlpha: 1, y: 0, scaleY: 1, duration: 0.25, ease: 'power2.out' })
    } else {
      gsap.to(el, { autoAlpha: 0, y: -8, scaleY: 0.96, duration: 0.2, ease: 'power2.in' })
    }
  }, [open])

  function handleSelect(option: GlassSelectOption) {
    setSelected(option)
    setOpen(false)
    onChange?.(option.value)
  }

  return (
    <div ref={ref} className="relative">
      {label && (
        <label htmlFor={id} className="text-label text-gfx-neutral-500 mb-1.5 block">{label}</label>
      )}
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full ${s.trigger} text-sm text-left flex items-center justify-between gap-2 transition-colors cursor-pointer focus:outline-none text-white bg-gfx-green-100 ${
          open ? 'border border-[rgba(16,188,131,0.5)]' : 'border border-gfx-green-200'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? 'text-white' : 'text-gfx-neutral-300'}>
          {selected ? (
            <span className="flex items-center gap-2.5">
              {selected.icon}
              {selected.label}
            </span>
          ) : placeholder}
        </span>
        <ChevronDownIcon
          size={14}
          color="#A0A0A0"
          className={`transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <ul
        ref={dropdownRef}
        role="listbox"
        className={`absolute left-0 right-0 top-full mt-2 ${s.dropdown} overflow-y-auto max-h-[15rem] z-50 border border-white/[0.06] bg-[rgba(10,14,12,0.92)] [backdrop-filter:url(#blur-24)]`}
      >
        {options.map((option) => {
          const isSelected = selected?.value === option.value
          return (
            <li key={option.value} role="option" aria-selected={isSelected}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full flex items-center gap-3 ${s.item} text-left text-sm transition-colors cursor-pointer hover:bg-white/[0.06] ${
                  isSelected ? 'bg-white/[0.04] text-gfx-green-500' : 'text-gfx-neutral-500 hover:text-white'
                }`}
              >
                {option.icon && <span className="shrink-0">{option.icon}</span>}
                <span>{option.label}</span>
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-auto shrink-0" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
