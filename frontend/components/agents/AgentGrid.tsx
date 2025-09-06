"use client";

import dynamic from 'next/dynamic';
import { useMemoizedValue } from '@/hooks/useMemoizedValue';
import { useAgents } from './hooks/useAgents';

// Lazy load AgentCard with loading placeholder
const LazyAgentCard = dynamic(() => import('@/components/agents/AgentCard'), {
  loading: () => <div className="animate-pulse bg-spaceGray-800 h-48 rounded-3xl"></div>,
  ssr: false
});

interface AgentGridProps {
  className?: string;
}

export default function AgentGrid({ className = '' }: AgentGridProps) {
  const { agents, loading, error } = useAgents();

  // Memoize agents to prevent unnecessary re-renders
  const memoizedAgents = useMemoizedValue(agents, [agents]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-spaceGray-800 h-48 rounded-3xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Failed to load agents</p>
        <p className="text-mediumGray text-sm">{error}</p>
      </div>
    );
  }

  if (memoizedAgents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-mediumGray">No agents available</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {memoizedAgents.map((agent) => (
        <LazyAgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}


