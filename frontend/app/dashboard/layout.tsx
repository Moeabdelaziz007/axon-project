"use client"

import Sidebar from '@/components/Sidebar'
import dynamic from 'next/dynamic'

// Lazy load NeuralBackground
const LazyNeuralBackground = dynamic(() => import('@/components/NeuralBackground'), {
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800" />,
  ssr: false
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite">
      <LazyNeuralBackground />
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}


