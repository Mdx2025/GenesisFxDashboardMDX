import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import './ThemeSwitch.css'

type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'genesis-fx-theme'

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 19 19" aria-hidden="true">
      <path
        d="M14.44 9.664a5.28 5.28 0 0 1-8.96 3.236 5.28 5.28 0 0 1 3.237-8.96 4.042 4.042 0 0 0 5.723 5.724Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.788"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="3.15" fill="currentColor" />
      <path
        d="M10 2.2v1.55M10 16.25v1.55M2.2 10h1.55M16.25 10h1.55M4.48 4.48l1.1 1.1M14.42 14.42l1.1 1.1M15.52 4.48l-1.1 1.1M5.58 14.42l-1.1 1.1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ReferenceGradientGlow() {
  return (
    <svg viewBox="0 0 276 148" fill="none" aria-hidden="true">
      <defs>
        <filter
          id="theme-switch-reference-blur"
          x="-21.3594"
          y="0"
          width="338.44"
          height="327.015"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="26.3613" result="referenceBlur" />
        </filter>
        <linearGradient
          id="theme-switch-reference-gradient"
          x1="197.623"
          y1="75.4587"
          x2="113.502"
          y2="227.23"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#06AE76" />
          <stop offset="1" stopColor="#CBFFF4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((layer) => (
        <g key={layer} opacity="0.2" filter="url(#theme-switch-reference-blur)">
          <path
            d="M249.717 52.9467C238.492 50.3744 228.866 70.5826 225.456 81.0083L31.3633 274.292H220.194C222.825 264.158 255.271 92.5255 262.286 76.6239C269.302 60.7224 256.83 54.2135 249.717 52.9467Z"
            fill="url(#theme-switch-reference-gradient)"
          />
        </g>
      ))}
    </svg>
  )
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const knobRef = useRef<HTMLSpanElement>(null)
  const darkLayerRef = useRef<HTMLSpanElement>(null)
  const lightLayerRef = useRef<HTMLSpanElement>(null)
  const moonRef = useRef<HTMLSpanElement>(null)
  const sunRef = useRef<HTMLSpanElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)
  const referenceGlowRef = useRef<HTMLSpanElement>(null)
  const bloomRef = useRef<HTMLSpanElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const firstRender = useRef(true)

  useLayoutEffect(() => {
    const isDark = theme === 'dark'
    const targets = [
      knobRef.current,
      darkLayerRef.current,
      lightLayerRef.current,
      moonRef.current,
      sunRef.current,
      glowRef.current,
      referenceGlowRef.current,
    ].filter((target): target is HTMLElement => target !== null)

    if (firstRender.current) {
      gsap.set(knobRef.current, { x: isDark ? 30 : 0 })
      gsap.set(darkLayerRef.current, { opacity: isDark ? 1 : 0 })
      gsap.set(lightLayerRef.current, { opacity: isDark ? 0 : 1 })
      gsap.set(moonRef.current, { autoAlpha: isDark ? 1 : 0, rotate: isDark ? 0 : 55, scale: isDark ? 1 : 0.55 })
      gsap.set(sunRef.current, { autoAlpha: isDark ? 0 : 1, rotate: isDark ? -55 : 0, scale: isDark ? 0.55 : 1 })
      gsap.set(glowRef.current, { x: isDark ? 29 : 0, backgroundColor: isDark ? '#55ffc7' : '#f5c77a' })
      gsap.set(referenceGlowRef.current, { opacity: isDark ? 1 : 0.32, x: isDark ? 0 : 8, scale: isDark ? 1 : 0.96 })
    } else {
      const transition = { duration: 0.46, ease: 'power3.inOut', overwrite: true }
      gsap.to(knobRef.current, { x: isDark ? 30 : 0, ...transition })
      gsap.to(darkLayerRef.current, { opacity: isDark ? 1 : 0, ...transition })
      gsap.to(lightLayerRef.current, { opacity: isDark ? 0 : 1, ...transition })
      gsap.to(moonRef.current, { autoAlpha: isDark ? 1 : 0, rotate: isDark ? 0 : 55, scale: isDark ? 1 : 0.55, ...transition })
      gsap.to(sunRef.current, { autoAlpha: isDark ? 0 : 1, rotate: isDark ? -55 : 0, scale: isDark ? 0.55 : 1, ...transition })
      gsap.to(glowRef.current, { x: isDark ? 29 : 0, backgroundColor: isDark ? '#55ffc7' : '#f5c77a', ...transition })
      gsap.to(referenceGlowRef.current, { opacity: isDark ? 1 : 0.32, x: isDark ? 0 : 8, scale: isDark ? 1 : 0.96, ...transition })
    }

    firstRender.current = false

    return () => gsap.killTweensOf(targets)
  }, [theme])

  useLayoutEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  function applyTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.style.colorScheme = nextTheme
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    setTheme(nextTheme)
  }

  function handleToggle() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const button = buttonRef.current
    const bloom = bloomRef.current

    timelineRef.current?.kill()

    if (reduceMotion || !button || !bloom) {
      applyTheme(nextTheme)
      return
    }

    const rect = button.getBoundingClientRect()
    const bloomSize = Math.max(window.innerWidth, window.innerHeight) * 1.35
    const bloomColor = nextTheme === 'light' ? 'rgba(192, 255, 229, 0.72)' : 'rgba(0, 179, 140, 0.56)'

    gsap.set(bloom, {
      display: 'block',
      width: bloomSize,
      height: bloomSize,
      x: rect.left + rect.width / 2 - bloomSize / 2,
      y: rect.top + rect.height / 2 - bloomSize / 2,
      scale: 0.025,
      opacity: 0,
      background: `radial-gradient(circle, ${bloomColor} 0%, rgba(12, 19, 17, 0) 68%)`,
    })

    timelineRef.current = gsap
      .timeline({
        onComplete: () => gsap.set(bloom, { display: 'none' }),
      })
      .to(button, { scale: 0.94, duration: 0.11, ease: 'power2.in' }, 0)
      .to(button, { scale: 1, duration: 0.32, ease: 'back.out(2.1)' }, 0.11)
      .to(bloom, { opacity: 0.48, scale: 0.72, duration: 0.28, ease: 'power2.out' }, 0)
      .call(() => applyTheme(nextTheme), [], 0.13)
      .to(bloom, { opacity: 0, scale: 1.55, duration: 0.58, ease: 'power2.out' }, 0.16)
  }

  const isDark = theme === 'dark'

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Theme: ${isDark ? 'dark' : 'light'}. Switch to ${isDark ? 'light' : 'dark'} theme`}
        className="theme-switch"
        onClick={handleToggle}
      >
        <span ref={referenceGlowRef} className="theme-switch__reference-glow" aria-hidden="true">
          <ReferenceGradientGlow />
        </span>
        <span ref={darkLayerRef} className="theme-switch__track theme-switch__track--dark" aria-hidden="true" />
        <span ref={lightLayerRef} className="theme-switch__track theme-switch__track--light" aria-hidden="true" />
        <span ref={glowRef} className="theme-switch__travel-glow" aria-hidden="true" />
        <span ref={knobRef} className="theme-switch__knob" aria-hidden="true">
          <span className="theme-switch__knob-sheen" />
          <span ref={moonRef} className="theme-switch__icon theme-switch__icon--moon"><MoonIcon /></span>
          <span ref={sunRef} className="theme-switch__icon theme-switch__icon--sun"><SunIcon /></span>
        </span>
        <span className="theme-switch__spark theme-switch__spark--one" aria-hidden="true" />
        <span className="theme-switch__spark theme-switch__spark--two" aria-hidden="true" />
      </button>
      {createPortal(<span ref={bloomRef} className="theme-transition-bloom" aria-hidden="true" />, document.body)}
    </>
  )
}
