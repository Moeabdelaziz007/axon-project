'use client'

import { useEffect } from 'react'

export default function HomePage() {

  useEffect(() => {
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
      
      // Dynamic particle color based on theme
      const isDark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(99,102,241,0.4)'
      
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
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-sky-50 to-teal-50 dark:from-indigo-900 dark:via-indigo-800 dark:to-blue-900 overflow-hidden">
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
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              Dashboard
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Features
            </a>
          </div>
        </div>

        <div className="text-slate-600 dark:text-blue-300 text-sm">
          <p>✅ Particle animations active</p>
          <p>✅ Dark mode toggle ready</p>
          <p>✅ Responsive design</p>
          <p id="theme-status" className="text-xs opacity-75">Theme: Loading...</p>
        </div>

        <div className="mt-16 text-slate-700 dark:text-blue-400 text-sm">
          <p>Built with Next.js 14, TypeScript, Tailwind CSS & Supabase</p>
          <p className="mt-2">
            <a href="https://github.com/Moeabdelaziz007/axon-project" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">View on GitHub →</a>
          </p>
        </div>
      </div>
    </div>
  )
}
