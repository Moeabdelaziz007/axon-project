import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/molecules/ThemeToggle' // Updated import path

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Axon - The Nerve Center for Your Project',
  description: 'A modern, momentum-driven workspace for small, focused teams.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed right-4 top-4 z-50">
            <ThemeToggle />
          </div>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded">Skip to main content</a>
          <main id="main-content" role="main">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
