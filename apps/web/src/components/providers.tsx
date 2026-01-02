'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { UserSession } from 'shared'

interface AuthContextType {
  user: UserSession | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a Providers component')
  }
  return context
}

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a Providers component')
  }
  return context
}

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) return savedTheme
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    const systemTheme: 'light' | 'dark' = media?.matches ? 'dark' : 'light'
    const initialTheme = savedTheme ?? systemTheme

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')

    // If user hasn't explicitly chosen a theme, follow system changes
    let cleanup: (() => void) | undefined
    if (!savedTheme && media) {
      const onChange = (e: MediaQueryListEvent) => {
        const nextTheme: 'light' | 'dark' = e.matches ? 'dark' : 'light'
        setTheme(nextTheme)
        document.documentElement.classList.toggle('dark', nextTheme === 'dark')
      }
      media.addEventListener('change', onChange)
      cleanup = () => media.removeEventListener('change', onChange)
    }
    
    // Check auth status
    refresh()
    return cleanup
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Error al iniciar sesión')
    }
    
    await refresh()
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }

  const refresh = async () => {
    try {
      const res = await fetch('/api/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ user, isLoading, login, logout, refresh }}>
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}

