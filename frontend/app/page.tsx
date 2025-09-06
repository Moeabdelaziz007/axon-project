'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
    return () => clearTimeout(timer)
    // particles background
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement | null
    const ctx = canvas?.getContext('2d') || null
    let frame = 0
    let raf = 0
    let particles: { x: number; y: number; dx: number; dy: number; size: number }[] = []
    let width = 0
    let height = 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      particles = Array.from({ length: prefersReduced ? 40 : 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2 + 0.6,
      }))
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      for (const p of particles) {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > width) p.dx *= -1
        if (p.y < 0 || p.y > height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      frame++
      raf = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      if (!particles.length) return
      const mx = e.clientX
      const my = e.clientY
      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.max(1, Math.hypot(dx, dy))
        const force = 20 / dist
        p.dx += (dx / dist) * force * 0.02
        p.dy += (dy / dist) * force * 0.02
      }
    }

    if (canvas && ctx && !prefersReduced) {
      resize()
      draw()
      window.addEventListener('resize', resize)
      window.addEventListener('mousemove', onMouseMove)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [router])

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-sky-50 to-teal-50 dark:from-indigo-900 dark:via-indigo-800 dark:to-blue-900 overflow-hidden">
      <canvas id="particle-canvas" aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-40"></canvas>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-blue-400 dark:to-teal-400">
              Axon
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-blue-200 font-light">المحور العصبي لمشروعك</p>
          <p className="text-lg text-slate-700 dark:text-blue-300 mt-2">The Nerve Center for Your Project</p>
        </div>

        <div className="mb-8">
          <div aria-hidden="true" className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-700 dark:text-blue-200 text-lg">جاري التحميل...</p>
          <p className="text-slate-600 dark:text-blue-300 text-sm mt-2">سيتم توجيهك إلى لوحة التحكم خلال ثانيتين</p>
        </div>

        <div className="text-slate-600 dark:text-blue-300 text-sm">
          <p>✅ Supabase متصل</p>
          <p>✅ قاعدة البيانات جاهزة</p>
          <p>✅ Next.js 14 يعمل</p>
        </div>

        <div className="mt-16 text-slate-700 dark:text-blue-400 text-sm">
          <p>Built with Next.js 14, TypeScript, Tailwind CSS & Supabase</p>
          <p className="mt-2">
            <a href="https://github.com/Moeabdelaziz007/axon-project" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">View on GitHub →</a>
          </p>
        </div>
      </div>
    </main>
  )
}
