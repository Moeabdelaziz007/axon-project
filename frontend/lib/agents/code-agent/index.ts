import {
  BaseAgentInput,
  AgentResult,
  SuccessAgentResult,
  ErrorAgentResult,
} from '../types';

export interface CodeAgentInput extends BaseAgentInput {
  prompt: string;
  language?: string;
  framework?: string;
  complexity?: 'simple' | 'intermediate' | 'advanced';
}

export async function runCodeAgent(input: CodeAgentInput): Promise<AgentResult> {
  try {
    if (!input.prompt || input.prompt.trim().length === 0) {
      const errorResult: ErrorAgentResult = {
        ok: false,
        error: 'Prompt is required',
        agentType: 'code',
        executionTime: 0,
        timestamp: new Date().toISOString(),
      };
      return errorResult;
    }

    const response = await fetch('/api/agents/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorResult: ErrorAgentResult = {
        ok: false,
        error: errorData.error || 'API request failed',
        errorCode: `HTTP_${response.status}`,
        agentType: 'code',
        executionTime: 0,
        timestamp: new Date().toISOString(),
      };
      return errorResult;
    }

    const result: SuccessAgentResult = await response.json();
    return result;

  } catch (error) {
    console.error('Code Agent Error:', error);
    const errorResult: ErrorAgentResult = {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      agentType: 'code',
      executionTime: 0,
      timestamp: new Date().toISOString(),
    };
    return errorResult;
  }
}
