import { useEffect, useState } from 'react'

export type ThemePreference = 'light' | 'dark' | 'auto'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'genesis-fx-theme'
const LIGHT_QUERY = '(prefers-color-scheme: light)'

const listeners = new Set<(preference: ThemePreference) => void>()

function isPreference(value: string | null): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'auto'
}

export function readThemePreference(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY)
  return isPreference(stored) ? stored : 'dark'
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== 'auto') return preference
  return window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark'
}

function paint(theme: ResolvedTheme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

function broadcast(preference: ThemePreference) {
  paint(resolveTheme(preference))
  listeners.forEach(listener => listener(preference))
}

export function setThemePreference(preference: ThemePreference) {
  localStorage.setItem(STORAGE_KEY, preference)
  broadcast(preference)
}

export function subscribeThemePreference(listener: (preference: ThemePreference) => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

window.matchMedia(LIGHT_QUERY).addEventListener('change', () => {
  const preference = readThemePreference()
  if (preference === 'auto') broadcast(preference)
})

export function useThemePreference() {
  const [state, setState] = useState(() => {
    const preference = readThemePreference()
    return { preference, resolved: resolveTheme(preference) }
  })

  useEffect(
    () =>
      subscribeThemePreference(preference => {
        setState({ preference, resolved: resolveTheme(preference) })
      }),
    [],
  )

  return { ...state, setPreference: setThemePreference }
}
