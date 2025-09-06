import { AgentRegistryEntry, AgentType } from './agents/types';
import { runCodeAgent } from './agents/code-agent';
import { runContentAgent } from './agents/content-agent';
import { runDataAgent } from './agents/data-agent';
import { runDesignAgent } from './agents/design-agent';
import { runResearchAgent } from './agents/research-agent';

/**
 * Central Agent Registry
 *
 * This registry acts as a single source of truth for all available agents in the Axon system.
 * It maps each agent's type to its configuration and execution function.
 * This centralized approach simplifies agent management, discovery, and invocation.
 *
 * To add a new agent:
 * 1. Create the agent's logic and export its `run` function.
 * 2. Import the `run` function and the agent's config here.
 * 3. Add a new entry to the `agentRegistry` map.
 */

export const agentRegistry: Map<AgentType, AgentRegistryEntry> = new Map([
  [
    'code',
    {
      config: {
        type: 'code',
        name: 'Code Generator',
        description: 'Generates production-ready code in multiple languages.',
        version: '1.1.0',
        enabled: true,
        timeout: 60000, // 60 seconds
      },
      run: runCodeAgent,
    },
  ],
  [
    'content',
    {
      config: {
        type: 'content',
        name: 'Content Creator',
        description: 'Generates high-quality written content with web search capabilities.',
        version: '1.2.0',
        enabled: true,
        timeout: 90000, // 90 seconds
      },
      run: runContentAgent,
    },
  ],
  [
    'design',
    {
      config: {
        type: 'design',
        name: 'UI/UX Designer',
        description: 'Generates UI mockups and design systems (placeholder).',
        version: '0.9.0',
        enabled: true,
        timeout: 30000,
      },
      run: runDesignAgent,
    },
  ],
  [
    'research',
    {
      config: {
        type: 'research',
        name: 'Research Analyst',
        description: 'Performs research and analysis on given topics (placeholder).',
        version: '0.9.0',
        enabled: true,
        timeout: 60000,
      },
      run: runResearchAgent,
    },
  ],
  [
    'data',
    {
      config: {
        type: 'data',
        name: 'Data Analyst',
        description: 'Analyzes data and generates insights (placeholder).',
        version: '0.9.0',
        enabled: true,
        timeout: 60000,
      },
      run: runDataAgent,
    },
  ],
]);

/**
 * Retrieves an agent's entry from the registry.
 * @param agentType The type of the agent to retrieve.
 * @returns The registry entry if found, otherwise undefined.
 */
export function getAgent(agentType: AgentType): AgentRegistryEntry | undefined {
  return agentRegistry.get(agentType);
}
