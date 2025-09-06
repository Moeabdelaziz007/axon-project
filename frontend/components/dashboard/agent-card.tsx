'use client';

import { useState } from 'react';
import { AgentRegistryEntry, AgentResult, AgentStatus } from '@/lib/agents/types';
import { runAgent } from '@/lib/bridge';
import { Bot, Play, Loader2, CheckCircle, XCircle, Terminal } from 'lucide-react';

interface AgentCardProps {
  agent: AgentRegistryEntry;
}

/**
 * AgentCard Component
 *
 * A smart, stateful component that represents a single AI agent on the dashboard.
 * It allows users to run the agent, view its status, and see the results.
 */
export function AgentCard({ agent }: AgentCardProps) {
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [result, setResult] = useState<AgentResult | null>(null);

  const handleRunAgent = async () => {
    setStatus('running');
    setResult(null);

    const response = await runAgent({
      agentType: agent.config.type,
      input: {
        // This is a placeholder. In a real app, you'd get this from a form or modal.
        prompt: `Execute a default task for the ${agent.config.name}.`,
      },
    });

    setResult(response);
    setStatus(response.ok ? 'completed' : 'error');
  };

  const getStatusIndicator = () => {
    switch (status) {
      case 'running':
        return <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400"><Loader2 className="h-3 w-3 animate-spin" />Running</span>;
      case 'completed':
        return <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400"><CheckCircle className="h-3 w-3" />Completed</span>;
      case 'error':
        return <span className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"><XCircle className="h-3 w-3" />Error</span>;
      default:
        return <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400"><Bot className="h-3 w-3" />Idle</span>;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      {/* Card Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
              <Bot className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{agent.config.name}</h3>
          </div>
          {getStatusIndicator()}
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 h-10">{agent.config.description}</p>
      </div>

      {/* Result Display Area */}
      <div className="p-4 flex-grow min-h-[100px]">
        {status === 'running' && <p className="text-sm text-slate-500 dark:text-slate-400">Awaiting results...</p>}
        {result && (
          <div className="text-xs bg-slate-100 dark:bg-slate-800/50 p-2 rounded-md overflow-auto max-h-28">
            <pre className="whitespace-pre-wrap break-words"><code>{result.ok ? result.output.substring(0, 200) + '...' : result.error}</code></pre>
          </div>
        )}
      </div>

      {/* Card Footer / Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleRunAgent}
          disabled={status === 'running'}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
        >
          {status === 'running' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
          <span>{status === 'running' ? 'Executing...' : 'Run Agent'}</span>
        </button>
      </div>
    </div>
  );
}
