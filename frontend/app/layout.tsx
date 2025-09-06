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
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded">Skip to main content</a>
        <main id="main-content" role="main">{children}</main>
      </body>
    </html>
  )
}
