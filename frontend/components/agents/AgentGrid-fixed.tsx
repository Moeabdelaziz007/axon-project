'use client';

import { agentRegistry } from '@/lib/agentRegistry';
import { runAgent } from '@/lib/bridge';
import type { AgentResult, AgentType, BaseAgentInput, AgentStatus } from '@/lib/agents/types';
import { AgentCard } from './AgentCard';
import useSWRMutation from 'swr/mutation';

/**
 * The mutation function that actually runs the agent via the bridge.
 * This function is passed to useSWRMutation.
 * @param {AgentType} agentType - The type of the agent to run.
 * @param {{ arg: BaseAgentInput }} { arg: input } - The input for the agent.
 * @returns {Promise<AgentResult>} The result of the agent execution.
 */
async function agentRunner(agentType: AgentType, { arg: input }: { arg: BaseAgentInput }): Promise<AgentResult> {
  console.log(`[AgentGrid] Running agent ${agentType} with input:`, input);
  const result = await runAgent({ agentType, input });
  console.log(`[AgentGrid] Agent ${agentType} result:`, result);
  return result;
}

/**
 * A smart component that manages the state and logic for the grid of AI agents.
 * It handles agent execution using SWRMutation and passes down state to presentational AgentCard components.
 * @returns {JSX.Element} The rendered grid of agent cards.
 */
export function AgentGrid() {
  const agents = Array.from(agentRegistry.values());

  // Use individual SWR mutations for each agent - must be called at top level
  const contentMutation = useSWRMutation<AgentResult, Error, AgentType, BaseAgentInput>(
    'content',
    agentRunner
  );

  const codeMutation = useSWRMutation<AgentResult, Error, AgentType, BaseAgentInput>(
    'code',
    agentRunner
  );

  const researchMutation = useSWRMutation<AgentResult, Error, AgentType, BaseAgentInput>(
    'research',
    agentRunner
  );

  const designMutation = useSWRMutation<AgentResult, Error, AgentType, BaseAgentInput>(
    'design',
    agentRunner
  );

  // Map agent types to their mutations
  const agentMutations = {
    content: contentMutation,
    code: codeMutation,
    research: researchMutation,
    design: designMutation
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {agents.map(agentEntry => {
        const mutation = agentMutations[agentEntry.config.type as keyof typeof agentMutations];
        if (!mutation) return null; // Should not happen

        const { trigger, isMutating, data, error } = mutation;

        // Determine the status based on SWRMutation state
        let status: AgentStatus = 'idle';
        if (isMutating) {
          status = 'running';
        } else if (data) {
          status = data.ok ? 'completed' : 'error';
        } else if (error) {
          status = 'error';
        }

        // The onRun handler now simply calls the SWRMutation trigger
        const handleRunAgent = () => {
          trigger({
            // Placeholder input. In a real app, this would come from a form.
            prompt: `Execute a default task for the ${agentEntry.config.name}.`,
          });
        };

        return (
          <AgentCard
            key={agentEntry.config.type}
            agent={agentEntry}
            status={status}
            result={data || null} // Pass the SWR data as result
            onRun={handleRunAgent}
          />
        );
      })}
    </div>
  );
}
