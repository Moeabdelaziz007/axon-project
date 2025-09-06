import {
  BaseAgentInput,
  AgentResult,
  SuccessAgentResult,
  ErrorAgentResult,
} from '../types';

export interface ContentAgentInput extends BaseAgentInput {
  prompt: string;
  tone?: 'casual' | 'formal' | 'neutral';
  length?: 'short' | 'medium' | 'long';
}

export async function runContentAgent(input: ContentAgentInput): Promise<AgentResult> {
  const startTime = Date.now();
  try {
    if (!input.prompt || input.prompt.trim().length === 0) {
      return {
        ok: false,
        error: 'Prompt is required',
        agentType: 'content',
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }

    const response = await fetch('/api/agents/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        ok: false,
        error: errorData.error || 'API request failed',
        errorCode: `HTTP_${response.status}`,
        agentType: 'content',
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }

    const result: SuccessAgentResult = await response.json();
    return result;

  } catch (error) {
    console.error('Content Agent Error:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      agentType: 'content',
      executionTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };
  }
}
