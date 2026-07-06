import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ChevronDownIcon } from '@/components/icons'

export interface GlassSelectIconOption {
  value: string
  label: string
}

interface GlassSelectIconProps {
  options: GlassSelectIconOption[]
  defaultValue?: string
  placeholder?: string
  label?: string
  icon?: React.ReactNode
  onChange?: (value: string) => void
}

export function GlassSelectIcon({ options, defaultValue, placeholder = 'Search  Coin', label, icon, onChange }: GlassSelectIconProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<GlassSelectIconOption | null>(
    defaultValue ? options.find(o => o.value === defaultValue) || null : null
  )
  const ref = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const isFirstRender = useRef(true)

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

  function handleSelect(option: GlassSelectIconOption) {
    setSelected(option)
    setOpen(false)
    onChange?.(option.value)
  }

  return (
    <div ref={ref} className={`relative ${open ? 'z-50' : 'z-0'}`}>
      {label && (
        <label className="block text-white font-acid font-medium" style={{ fontSize: 16, lineHeight: '24.44px', marginBottom: 2 }}>
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center cursor-pointer focus:outline-none"
        style={{
          height: 50,
          background: '#101E1A',
          borderRadius: 30,
          border: open ? '1px solid rgba(16,188,131,0.5)' : '1px solid #404040',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {icon && (
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width: 38, height: 38, marginLeft: 6,
              background: 'linear-gradient(204deg, #01130D 0%, #064B34 100%)',
              borderRadius: 9999,
            }}
          >
            {icon}
          </div>
        )}
        <span
          className="font-acid flex-1 text-left"
          style={{ color: selected ? '#fff' : '#808080', fontSize: 16, marginLeft: 10 }}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDownIcon
          size={14}
          color="#606060"
          className={`transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
        <div style={{ width: 16 }} />
      </button>

      <ul
        ref={dropdownRef}
        role="listbox"
        className="absolute left-0 right-0 top-full mt-2 rounded-2xl overflow-hidden z-50 border border-white/[0.06]"
        style={{ background: 'rgba(10, 14, 12, 0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        {options.map((option) => {
          const isSelected = selected?.value === option.value
          return (
            <li key={option.value} role="option" aria-selected={isSelected}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors cursor-pointer hover:bg-white/[0.06] ${
                  isSelected ? 'bg-white/[0.04] text-gfx-green-500' : 'text-gfx-neutral-500 hover:text-white'
                }`}
              >
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
