import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Axon - The Nerve Center for Your Project',
  description: 'مركز قيادة مبسط لفريق واحد ومشروع واحد. أداة إدارة مشاريع تركز على البساطة الجذرية والزخم المدمج.',
  openGraph: {
    title: 'Axon — The Nerve Center for Your Project',
    description: 'A modern, momentum‑driven workspace for small, focused teams.',
    type: 'website',
    images: [
      'https://images.unsplash.com/photo-1550592704-6c76defa9987?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axon — The Nerve Center for Your Project',
    description: 'A modern, momentum‑driven workspace for small, focused teams.',
    images: [
      'https://images.unsplash.com/photo-1550592704-6c76defa9987?q=80&w=1600&auto=format&fit=crop',
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body className={`${inter.className} bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100`}>
        <div className="fixed right-4 top-4 z-50">
          <button
            id="theme-toggle"
            aria-label="Toggle color theme"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/50 bg-white/80 backdrop-blur-sm px-3 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-slate-900/10 transition-all duration-300 hover:bg-slate-50 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center">
              <svg id="icon-sun" className="h-5 w-5 text-amber-500 transition-all duration-500 ease-out dark:scale-0 dark:rotate-180" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8 1.41 1.41-1.8 1.79-1.4-1.4zM12 4h0V1h0v3zm0 19h0v-3h0v3zM4 13H1v-2h3v2zm19 0h-3v-2h3v2zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zm12.07-1.79l1.41 1.41-1.79 1.8-1.42-1.42 1.8-1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
              <svg id="icon-moon" className="absolute h-5 w-5 text-indigo-300 transition-all duration-500 ease-out scale-0 rotate-180 dark:scale-100 dark:rotate-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
            </span>
            <span className="hidden sm:inline font-medium">Theme</span>
          </button>
        </div>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded">Skip to main content</a>
        <main id="main-content" role="main">{children}</main>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            const root = document.documentElement;
            
            // Get stored theme or system preference
            const getTheme = () => {
              const stored = localStorage.getItem('theme');
              if (stored) return stored;
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            };
            
            // Apply theme immediately (before DOMContentLoaded)
            const theme = getTheme();
            if (theme === 'dark') {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
            
            // Update icon states
            const updateIcons = (isDark) => {
              const sun = document.getElementById('icon-sun');
              const moon = document.getElementById('icon-moon');
              if (sun && moon) {
                if (isDark) {
                  sun.style.transform = 'scale(0)';
                  moon.style.transform = 'scale(1)';
                } else {
                  sun.style.transform = 'scale(1)';
                  moon.style.transform = 'scale(0)';
                }
              }
            };
            
            // Initialize icons
            updateIcons(theme === 'dark');
            
            // Update theme status indicator
            const updateThemeStatus = (currentTheme) => {
              const statusEl = document.getElementById('theme-status');
              if (statusEl) {
                statusEl.textContent = `Theme: ${currentTheme === 'dark' ? 'Dark' : 'Light'}`;
              }
            };
            
            // Initialize theme status
            updateThemeStatus(theme);
            
            // Theme toggle handler
            document.addEventListener('DOMContentLoaded', function() {
              const btn = document.getElementById('theme-toggle');
              if (!btn) return;
              
              btn.addEventListener('click', function() {
                const isDark = root.classList.toggle('dark');
                const newTheme = isDark ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                updateIcons(isDark);
                updateThemeStatus(newTheme);
                
                // Haptic feedback
                try { 
                  if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(10);
                  }
                } catch(e) {}
                
                // Dispatch theme change event for other components
                window.dispatchEvent(new CustomEvent('themechange', { 
                  detail: { theme: newTheme, isDark } 
                }));
              });
            });
          })();
        `}} />
      </body>
    </html>
  )
}
