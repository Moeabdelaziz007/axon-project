import { Sidebar } from './sidebar';
import { Header } from './header';
import { AgentCard } from './agent-card';
import { agentRegistry } from '@/lib/agentRegistry';

/**
 * DashboardLayout Component
 *
 * This component defines the primary visual structure of the dashboard,
 * including the sidebar, header, and the main content area where
 * agent cards are displayed.
 */
export function DashboardLayout() {
  const agents = Array.from(agentRegistry.values());

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-900 p-6 lg:p-8">
          <div className="container mx-auto max-w-7xl">
            {/* Welcome Message or Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Axon Agent Dashboard</h1>
              <p className="mt-1 text-slate-500 dark:text-slate-400">Your project&apos;s nerve center. Monitor and dispatch AI agents.</p>
            </div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {agents.map(agentEntry => (
                <AgentCard key={agentEntry.config.type} agent={agentEntry} />
              ))}
            </div>

            {/* Placeholder for future components like activity feed or results viewer */}
            <div className="mt-12 p-8 bg-white dark:bg-slate-950/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Activity Feed</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Real-time agent activity will be displayed here...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
