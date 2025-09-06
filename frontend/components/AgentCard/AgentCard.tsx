'use client';

import type { AgentRegistryEntry, AgentResult, AgentStatus } from '@/lib/agents/types';
import { Bot, Play, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/Button/Button'; // Updated import path

/**
 * @typedef {object} AgentCardProps
 * @property {AgentRegistryEntry} agent - The agent configuration and metadata.
 * @property {AgentStatus} status - The current execution status of the agent.
 * @property {AgentResult | null} result - The last execution result of the agent.
 * @property {() => void} onRun - Callback function to execute when the run button is clicked.
 */
interface AgentCardProps {
  agent: AgentRegistryEntry;
  status: AgentStatus;
  result: AgentResult | null;
  onRun: () => void;
}

/**
 * A presentational component that displays a single AI agent.
 * It receives all its data and logic via props, following the separation of concerns principle.
 * @param {AgentCardProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered agent card.
 */
export function AgentCard({ agent, status, result, onRun }: AgentCardProps) {

  const getStatusIndicator = () => {
    switch (status) {
      case 'running':
        return <span className="flex items-center gap-1.5 text-xs font-medium text-warning"><Loader2 className="h-3 w-3 animate-spin" />Running</span>;
      case 'completed':
        return <span className="flex items-center gap-1.5 text-xs font-medium text-success"><CheckCircle className="h-3 w-3" />Completed</span>;
      case 'error':
        return <span className="flex items-center gap-1.5 text-xs font-medium text-danger"><XCircle className="h-3 w-3" />Error</span>;
      default:
        return <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400"><Bot className="h-3 w-3" />Idle</span>;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      {/* Card Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
              <Bot className="h-6 w-6 text-primary" />
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
        <Button
          onClick={onRun}
          disabled={status === 'running'}
          variant="primary"
          size="md"
          className="w-full gap-2"
        >
          {status === 'running' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
          <span>{status === 'running' ? 'Executing...' : 'Run Agent'}</span>
        </Button>
      </div>
    </div>
  );
}
