'use client';

import { useState } from 'react';
import { agentRegistry } from '@/lib/agentRegistry';
import { runAgent } from '@/lib/bridge';
import type { AgentResult, AgentStatus } from '@/lib/agents/types';
import { AgentCard } from './AgentCard';

// Define a type for the state of all agents
type AgentsState = {
  [key: string]: {
    status: AgentStatus;
    result: AgentResult | null;
  };
};

/**
 * A smart component that manages the state and logic for the grid of AI agents.
 * It handles agent execution and passes down state to presentational AgentCard components.
 * @returns {JSX.Element} The rendered grid of agent cards.
 */
export function AgentGrid() {
  const agents = Array.from(agentRegistry.values());

  // A single state object to manage all agents
  const [agentsState, setAgentsState] = useState<AgentsState>(
    agents.reduce((acc, agent) => {
      acc[agent.config.type] = { status: 'idle', result: null };
      return acc;
    }, {} as AgentsState)
  );

  // Handler to run an agent, now located in the parent container
  const handleRunAgent = async (agentType: keyof AgentsState) => {
    // Update state for the specific agent to 'running'
    setAgentsState(prevState => ({
      ...prevState,
      [agentType]: { status: 'running', result: null },
    }));

    const response = await runAgent({
      agentType,
      input: {
        // This is a placeholder. In a real app, you'd get this from a form or modal.
        prompt: `Execute a default task for the ${agentType} agent.`,
      },
    });

    // Update state with the final result
    setAgentsState(prevState => ({
      ...prevState,
      [agentType]: {
        status: response.ok ? 'completed' : 'error',
        result: response,
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {agents.map(agentEntry => {
        const agentState = agentsState[agentEntry.config.type];
        return (
          <AgentCard
            key={agentEntry.config.type}
            agent={agentEntry}
            status={agentState.status}
            result={agentState.result}
            onRun={() => handleRunAgent(agentEntry.config.type)}
          />
        );
      })}
    </div>
  );
}
