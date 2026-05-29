import { useState, useEffect } from 'react'

/**
 * Custom hook to toggle and persist dark/light theme options, auto-detecting system theme.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('nutritrack_theme')
    if (saved) return saved
    
    // Fallback to system preferences
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    localStorage.setItem('nutritrack_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, isDark: theme === 'dark', toggleTheme }
}
