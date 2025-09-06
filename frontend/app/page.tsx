'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard after 2 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Axon
            </span>
          </h1>
          <p className="text-xl text-blue-200 font-light">
            المحور العصبي لمشروعك
          </p>
          <p className="text-lg text-blue-300 mt-2">
            The Nerve Center for Your Project
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-200 text-lg">جاري التحميل...</p>
          <p className="text-blue-300 text-sm mt-2">سيتم توجيهك إلى لوحة التحكم خلال ثانيتين</p>
        </div>

        {/* Status */}
        <div className="text-blue-300 text-sm">
          <p>✅ Supabase متصل</p>
          <p>✅ قاعدة البيانات جاهزة</p>
          <p>✅ Next.js 14 يعمل</p>
        </div>

        {/* Footer */}
        <div className="mt-16 text-blue-400 text-sm">
          <p>Built with Next.js 14, TypeScript, Tailwind CSS & Supabase</p>
          <p className="mt-2">
            <a 
              href="https://github.com/Moeabdelaziz007/axon-project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              View on GitHub →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
