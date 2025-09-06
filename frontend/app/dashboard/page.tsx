"use client";

import AgentGrid from '@/components/agents/AgentGrid';
import { DashboardHeader, DashboardActions } from '@/components/features/dashboard';
import { useAgents } from '@/components/agents/hooks/useAgents';

export default function DashboardPage() {
  const { agents, loading, error } = useAgents();

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Dashboard"
        description="Manage agents, launch runs, and view results."
        actions={<DashboardActions />}
      />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-mediumGray">
            Agents ({agents.length})
          </h2>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </section>

        <AgentGrid />
      </main>
    </div>
  );
}
