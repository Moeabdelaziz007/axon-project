"use client";

import { AgentGrid } from '@/components/agents/AgentGrid';
import { DashboardHeader, DashboardActions } from '@/components/features/dashboard';
import { useAgents } from '@/components/agents/hooks/useAgents';

export default function HomePage() {
  const { agents, loading, error } = useAgents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-carbon-900/60 backdrop-blur-xl border-b border-spaceGray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent">
              Axon Quantum
            </h1>
            <p className="text-mediumGray">Neural Agents. Real-time Flow.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-mediumGray">{agents.length} Agents Online</span>
            <DashboardActions />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Dashboard Header */}
        <DashboardHeader
          title="Agent Dashboard"
          description="Manage agents, launch runs, and view results."
          actions={<DashboardActions />}
        />

        {/* Agents Section */}
        <section className="mt-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-mediumGray">
              AI Agents ({agents.length})
            </h2>
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
            {loading && (
              <p className="text-mediumGray text-sm mt-2">Loading agents...</p>
            )}
          </div>
          
          <AgentGrid />
        </section>
      </main>
    </div>
  );
}