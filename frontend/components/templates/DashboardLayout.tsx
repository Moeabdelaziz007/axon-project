import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { AgentCard } from '@/components/organisms/AgentCard';
import { agentRegistry } from '@/lib/agentRegistry';

/**
 * DashboardLayout Component (Template)
 *
 * This component defines the primary visual structure of the dashboard.
 * It arranges organisms like Sidebar, Header, and a grid of AgentCards.
 */
export function DashboardLayout() {
  const agents = Array.from(agentRegistry.values());

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-900 p-6 lg:p-8">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Axon Agent Dashboard</h1>
              <p className="mt-1 text-slate-500 dark:text-slate-400">Your project&apos;s nerve center. Monitor and dispatch AI agents.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {agents.map(agentEntry => (
                <AgentCard key={agentEntry.config.type} agent={agentEntry} />
              ))}
            </div>

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
