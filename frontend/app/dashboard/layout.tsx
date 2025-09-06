"use client"

import Sidebar from '@/components/Sidebar'
import NeuralBackground from '@/components/NeuralBackground'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite">
      <NeuralBackground />
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}


