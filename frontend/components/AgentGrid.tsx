"use client"

import { useEffect, useState } from 'react'
import AgentCard from '@/components/AgentCard'

export default function AgentGrid() {
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

  if (loading) {
    return <div className="text-mediumGray">Loading agents…</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <AgentCard key={agent.type} agent={agent} />
      ))}
    </div>
  )
}


