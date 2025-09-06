'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/50 bg-white/80 backdrop-blur-sm px-3 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-slate-900/10 transition-all duration-300 hover:bg-slate-50 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center">
        <svg id="icon-sun" className={`h-5 w-5 text-amber-500 transition-all duration-500 ease-out ${theme === 'dark' ? 'scale-0 rotate-180' : 'scale-100 rotate-0'}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8 1.41 1.41-1.8 1.79-1.4-1.4zM12 4h0V1h0v3zm0 19h0v-3h0v3zM4 13H1v-2h3v2zm19 0h-3v-2h3v2zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zm12.07-1.79l1.41 1.41-1.79 1.8-1.42-1.42 1.8-1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
        <svg id="icon-moon" className={`absolute h-5 w-5 text-indigo-300 transition-all duration-500 ease-out ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
      </span>
      <span className="hidden sm:inline font-medium">Theme</span>
    </button>
  )
}
