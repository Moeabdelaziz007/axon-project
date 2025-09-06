"use client"

import { useEffect, useState } from 'react'
import AgentCard from '@/components/AgentCard'
import NeuralBackground from '@/components/NeuralBackground'

export default function Dashboard() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAgents() {
      try {
        const res = await fetch('/api/agents', { cache: 'no-store' })
        const data = await res.json()
        if (res.ok && data?.agents) setAgents(data.agents)
      } finally {
        setLoading(false)
      }
    }
    loadAgents()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite">
      <NeuralBackground />
      <header className="sticky top-0 z-30 bg-carbon-900/60 backdrop-blur-xl border-b border-spaceGray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent">Axon Quantum</h1>
            <p className="text-mediumGray">Neural Agents. Real-time Flow.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-mediumGray">
              {agents.filter(a => a.healthy).length} / {agents.length} Online
            </span>
            <a href="/dashboard" className="px-4 py-2 rounded-md bg-neon-500 text-carbon-900 font-bold hover:shadow-[0_0_20px_#00FFB9]">
              Enter Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="mb-10 text-center">
          <h2 className="text-4xl font-black bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent">Launch. Analyze. Evolve.</h2>
          <p className="mt-3 text-mediumGray">Crypto–Space–Tech aesthetics. Quantum‑grade UX.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-mediumGray">Loading agents…</div>
          ) : (
            agents.map((agent) => (
              <AgentCard key={agent.type} agent={agent} />
            ))
          )}
        </section>
      </main>
    </div>
  )
}