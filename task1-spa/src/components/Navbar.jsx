import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { theme, toggleTheme, toggleLang, t } = useApp()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/',            label: t.nav.home },
    { to: '/catalogue',   label: t.nav.catalogue },
    { to: '/workshops',   label: t.nav.workshops },
    { to: '/events',      label: t.nav.events },
    { to: '/booking',     label: t.nav.booking },
    { to: '/about',       label: t.nav.about },
  ]

  return (
    <header className="bg-harvest-600 dark:bg-harvest-700 text-white shadow-lg sticky top-0 z-40">
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4"
      >
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl">
          <span aria-hidden="true" className="text-3xl">🌱</span>
          <span>Urban Harvest Hub</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Switch language"
            className="bg-white text-harvest-700 px-3 py-2 rounded-lg font-semibold text-sm hover:bg-harvest-50 transition-colors"
          >
            {t.common.switchLang}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.common.toggleTheme}
            aria-pressed={theme === 'dark'}
            className="bg-white text-harvest-700 px-3 py-2 rounded-lg font-semibold hover:bg-harvest-50 transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden bg-white text-harvest-700 px-3 py-2 rounded-lg font-bold"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <ul
          id="mobile-menu"
          className="md:hidden bg-harvest-700 dark:bg-harvest-800 px-4 pb-4 space-y-1 animate-slide-up"
        >
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded font-medium ${
                    isActive ? 'bg-harvest-900 underline' : 'hover:bg-harvest-800'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
