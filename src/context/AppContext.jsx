import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations } from '../data/translations'

const AppContext = createContext(null)

const THEME_KEY = 'uh-theme'
const LANG_KEY = 'uh-lang'
const CART_KEY = 'uh-cart'

/**
 * Global app provider. Wraps the whole tree in main.jsx.
 * Manages: theme (light/dark), language (en/si), cart (array of {id, qty}).
 *
 * Each piece of state is persisted to localStorage so the user's
 * preferences survive a page refresh.
 */
export function AppProvider({ children }) {
  // ----- Theme (light / dark) -----
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  // ----- Language (en / si) -----
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'en')

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(
    () => setLang((l) => (l === 'en' ? 'si' : 'en')),
    [],
  )

  // Convenience translator
  const t = translations[lang]

  // ----- Cart / bookings -----
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id)
      if (existing) {
        return prev.map((c) =>
          c.id === id ? { ...c, qty: c.qty + qty } : c,
        )
      }
      return [...prev, { id, qty }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const value = {
    theme, toggleTheme,
    lang, toggleLang, t,
    cart, addToCart, removeFromCart, clearCart,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/** Hook to consume the app context anywhere in the tree. */
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
