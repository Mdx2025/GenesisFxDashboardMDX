import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'

interface Language {
  code: string
  label: string
  flag: React.ReactNode
}

const languages: Language[] = [
  {
    code: 'EN',
    label: 'English',
    flag: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M0 4.53V6.5H2.814L0 4.53ZM2.332 15.5H6.5V12.58L2.332 15.5ZM11.5 12.58V15.5H15.668L11.5 12.58ZM0 11.5V13.47L2.815 11.5H0ZM15.668 2.5H11.5V5.42L15.668 2.5ZM18 13.47V11.5H15.185L18 13.47ZM18 6.5V4.53L15.186 6.5H18ZM6.5 2.5H2.332L6.5 5.42V2.5Z" fill="#00247D"/>
        <path d="M12.57 11.5L17.426 14.9C17.663 14.656 17.833 14.355 17.92 14.026L14.313 11.5H12.57ZM6.5 11.5H5.43L.574 14.9C.834 15.165 1.168 15.355 1.543 15.443L6.5 11.972V11.5ZM11.5 6.5H12.57L17.426 3.1C17.161 2.831 16.825 2.643 16.457 2.558L11.5 6.029V6.5ZM5.43 6.5L.574 3.1C.337 3.345.166 3.646.078 3.975L3.686 6.5H5.43Z" fill="#CF1B2B"/>
        <path d="M18 10.5H10.5V15.5H11.5V12.58L15.668 15.5H16C16.266 15.5 16.529 15.447 16.774 15.344C17.018 15.241 17.24 15.09 17.426 14.9L12.57 11.5H14.314L17.921 14.026C17.968 13.858 18 13.683 18 13.5V13.47L15.185 11.5H18V10.5ZM0 10.5V11.5H2.815L0 13.47V13.5C0 14.046.22 14.539.574 14.9L5.43 11.5H6.5V11.972L1.543 15.442C1.69 15.477 1.842 15.5 2 15.5H2.332L6.5 12.58V15.5H7.5V10.5H0ZM18 4.5C18 3.976 17.794 3.473 17.426 3.1L12.57 6.5H11.5V6.029L16.457 2.558C16.308 2.521 16.154 2.501 16 2.5H15.668L11.5 5.42V2.5H10.5V7.5H18V6.5H15.186L18 4.53V4.5ZM6.5 2.5V5.42L2.332 2.5H2C1.734 2.5 1.471 2.553 1.226 2.656C.981 2.759.76 2.91.574 3.1L5.43 6.5H3.686L.079 3.975C.029 4.145 0 4.322 0 4.5V4.53L2.814 6.5H0V7.5H7.5V2.5H6.5Z" fill="#EEEEEE"/>
        <path d="M10.5 7.5V2.5H7.5V7.5H0V10.5H7.5V15.5H10.5V10.5H18V7.5H10.5Z" fill="#CF1B2B"/>
      </svg>
    ),
  },
  {
    code: 'ES',
    label: 'Español',
    flag: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect y="2" width="18" height="14" rx="1" fill="#C60B1E"/>
        <rect y="5.5" width="18" height="7" fill="#FFC400"/>
      </svg>
    ),
  },
  {
    code: 'PT',
    label: 'Português',
    flag: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect y="2" width="18" height="14" rx="1" fill="#006600"/>
        <rect x="6" y="2" width="12" height="14" fill="#FF0000"/>
        <circle cx="6" cy="9" r="3" fill="#FFCC00"/>
      </svg>
    ),
  },
]

export function LanguageDropdown() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(languages[0])
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

  function handleSelect(lang: Language) {
    setSelected(lang)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-12 px-3 rounded-[30px] hover:opacity-90 transition-opacity cursor-pointer"
        style={{ background: 'rgba(0, 27, 18, 0.30)' }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${selected.label}`}
      >
        {selected.flag}
        <span className="text-white text-base font-medium">{selected.code}</span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M3.617 5.425L7.234 9.041l3.617-3.616" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        ref={dropdownRef}
        role="listbox"
        aria-label="Select language"
        className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden z-50 border border-white/[0.06]"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="lang-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="23" />
              </filter>
            </defs>
          </svg>
          <div
            className="absolute inset-0 -z-10"
            style={{ backdropFilter: 'url(#blur-23)', WebkitBackdropFilter: 'url(#blur-23)' }}
            aria-hidden="true"
          />
          {languages.map((lang) => (
            <li key={lang.code} role="option" aria-selected={selected.code === lang.code}>
              <button
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer hover:bg-white/[0.06] ${
                  selected.code === lang.code ? 'bg-white/[0.04] text-white' : 'text-gfx-neutral-500'
                }`}
              >
                {lang.flag}
                <span className="text-sm">{lang.label}</span>
                <span className="text-xs text-gfx-neutral-300 ml-auto">{lang.code}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
