"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMemoizedValue } from '@/hooks/useMemoizedValue'

// Lazy load AgentCard with loading placeholder
const LazyAgentCard = dynamic(() => import('@/components/AgentCard'), {
  loading: () => <div className="animate-pulse bg-spaceGray-800 h-48 rounded-3xl"></div>,
  ssr: false
})

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

  // Memoize agents to prevent unnecessary re-renders
  const memoizedAgents = useMemoizedValue(agents, [agents])

  if (loading) {
    return <div className="text-mediumGray">Loading agents…</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memoizedAgents.map((agent) => (
        <LazyAgentCard key={agent.type} agent={agent} />
      ))}
    </div>
  )
}


