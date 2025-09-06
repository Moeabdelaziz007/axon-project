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
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Toggle theme
          </button>
        </div>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded">Skip to main content</a>
        <main id="main-content" role="main">{children}</main>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            const root = document.documentElement;
            const stored = localStorage.getItem('theme');
            if (stored === 'dark') root.classList.add('dark');
            if (stored === 'light') root.classList.remove('dark');
            document.addEventListener('DOMContentLoaded', function() {
              var btn = document.getElementById('theme-toggle');
              if (!btn) return;
              btn.addEventListener('click', function() {
                const isDark = root.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
              });
            });
          })();
        `}} />
      </body>
    </html>
  )
}
