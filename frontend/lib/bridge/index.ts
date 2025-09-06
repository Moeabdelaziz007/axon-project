import { getAgent } from '../agentRegistry';
import {
  AgentRequest,
  AgentResult,
  ErrorAgentResult,
  AgentStatus,
} from '../agents/types';

/**
 * Axon Agent Bridge
 *
 * This bridge is the central dispatcher for all agent invocations.
 * It receives a generic agent request, finds the appropriate agent in the registry,
 * and executes it.
 *
 * This decouples the UI and other services from the direct implementation of each agent.
 */

export async function runAgent(
  request: AgentRequest,
): Promise<AgentResult> {
  const startTime = Date.now();

  // 1. Find the agent in the registry
  const agent = getAgent(request.agentType);

  if (!agent) {
    const errorResult: ErrorAgentResult = {
      ok: false,
      error: `Agent type '${request.agentType}' not found in registry.`,
      agentType: request.agentType,
      executionTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };
    return errorResult;
  }

  if (!agent.config.enabled) {
    const errorResult: ErrorAgentResult = {
      ok: false,
      error: `Agent '${agent.config.name}' is currently disabled.`,
      agentType: request.agentType,
      executionTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };
    return errorResult;
  }

  try {
    // 2. Execute the agent's run function with the provided input
    console.log(`[Bridge] Executing agent: ${agent.config.name}...`);
    const result = await agent.run(request.input);
    console.log(`[Bridge] Agent ${agent.config.name} finished execution.`);
    return result;

  } catch (error) {
    console.error(`[Bridge] Critical error executing agent '${agent.config.name}':`, error);
    const errorResult: ErrorAgentResult = {
      ok: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred in the agent bridge.',
      agentType: request.agentType,
      executionTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };
    return errorResult;
  }
}
