import { BaseAgentInput, AgentResult, SuccessAgentResult, ErrorAgentResult, AgentType } from '../types';
import { ToolOrchestrator, ToolExecution } from '@/lib/tools/ToolOrchestrator'; // Updated import path
import { contentTools } from '@/lib/tools/contentTools'; // Updated import path

export interface ContentAgentInput extends BaseAgentInput {
  prompt: string;
  tone?: 'casual' | 'formal' | 'neutral';
  length?: 'short' | 'medium' | 'long';
}

/**
 * The ContentAgent class orchestrates content generation using various tools.
 * It analyzes user requests, selects optimal tools, executes them, and synthesizes a final response.
 */
export class ContentAgent {
  private toolOrchestrator: ToolOrchestrator;

  constructor() {
    // Initialize ToolOrchestrator with all available content tools
    this.toolOrchestrator = new ToolOrchestrator(Object.values(contentTools));
  }

  /**
   * Processes a content generation request.
   * @param {ContentAgentInput} input - The input for the content agent.
   * @returns {Promise<AgentResult>} The result of the content generation.
   */
  async processRequest(input: ContentAgentInput): Promise<AgentResult> {
    const startTime = Date.now();
    const agentType: AgentType = 'content';

    try {
      if (!input.prompt || input.prompt.trim().length === 0) {
        return {
          ok: false,
          error: 'Prompt is required',
          agentType,
          executionTime: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        };
      }

      // 1. Analyze request to determine optimal tool chain
      const toolSequence = this.analyzeRequest(input.prompt);
      
      // 2. Execute tools in sequence
      const toolResults = await this.toolOrchestrator.executeToolSequence(toolSequence);
      
      // 3. Synthesize final response from tool results
      const output = this.synthesizeResponse(toolResults);

      const successResult: SuccessAgentResult = {
        ok: true,
        output: output,
        agentType,
        provider: 'axon-content-agent', // New provider name
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        metadata: { toolSequence, toolResults },
      };
      return successResult;

    } catch (error) {
      console.error('Content Agent Error:', error);
      const errorResult: ErrorAgentResult = {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        agentType,
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
      return errorResult;
    }
  }

  /**
   * Analyzes the request to determine the optimal tool sequence.
   * This is a simplified NLP analysis for demonstration purposes.
   * @param {string} request - The user's request prompt.
   * @returns {ToolExecution[]} An array of tool executions.
   */
  private analyzeRequest(request: string): ToolExecution[] {
    const lowerCaseRequest = request.toLowerCase();

    if (lowerCaseRequest.includes('image') || lowerCaseRequest.includes('visual') || lowerCaseRequest.includes('picture')) {
      return [{ toolName: 'gemini_vision', parameters: { prompt: request } }];
    } else if (lowerCaseRequest.includes('video') || lowerCaseRequest.includes('motion') || lowerCaseRequest.includes('clip')) {
      return [{ toolName: 'veo3_video', parameters: { prompt: request } }];
    } else if (lowerCaseRequest.includes('search') || lowerCaseRequest.includes('information') || lowerCaseRequest.includes('latest')) {
      return [
        { toolName: 'web_search', parameters: { query: request } },
        { toolName: 'nano_banana_llm', parameters: { prompt: `Synthesize information about: ${request}` } }
      ];
    } else {
      // Default to text generation if no specific tool is identified
      return [{ toolName: 'nano_banana_llm', parameters: { prompt: request } }];
    }
  }

  /**
   * Synthesizes the final response from the results of tool executions.
   * @param {any[]} toolResults - An array of results from executed tools.
   * @returns {string} The synthesized output.
   */
  private synthesizeResponse(toolResults: any[]): string {
    if (!toolResults || toolResults.length === 0) {
      return "No content could be generated. Please try a different prompt.";
    }

    // Simple synthesis: just return the first successful result or an error summary
    const successfulResult = toolResults.find(res => !res.error);
    if (successfulResult && successfulResult.output) {
      return successfulResult.output;
    } else if (successfulResult && successfulResult.imageUrl) { // Assuming image tool returns imageUrl
      return `Image generated: ${successfulResult.imageUrl}`; 
    } else if (successfulResult && successfulResult.videoUrl) { // Assuming video tool returns videoUrl
      return `Video generated: ${successfulResult.videoUrl}`; 
    } else {
      const errors = toolResults.filter(res => res.error).map(res => res.error).join('; ');
      return `Content generation failed. Errors: ${errors || 'Unknown error during tool execution.'}`;
    }
  }
}

// The existing runContentAgent function now instantiates the class and calls its processRequest method.
export async function runContentAgent(input: ContentAgentInput): Promise<AgentResult> {
  const agentInstance = new ContentAgent();
  return agentInstance.processRequest(input);
}
