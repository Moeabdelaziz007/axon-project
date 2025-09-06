import { Sidebar } from '@/components/organisms/Sidebar'; // Will be moved next
import { Header } from '@/components/organisms/Header';   // Will be moved next
import { AgentGrid } from '@/components/agents/AgentGrid';

/**
 * @description A presentational layout component for the main dashboard.
 * It arranges the primary UI sections like Sidebar, Header, and the main content area.
 * @returns {JSX.Element} The rendered dashboard layout structure.
 */
export function DashboardLayout() {
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

            {/* The main content is now the smart AgentGrid component */}
            <AgentGrid />

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
