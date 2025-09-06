import { Tool } from './contentTools';

export interface ToolExecution {
  toolName: string;
  parameters: Record<string, any>;
}

/**
 * Orchestrates the execution of a sequence of tools.
 * It manages the available tools and executes them based on a defined sequence.
 */
export class ToolOrchestrator {
  private tools: Map<string, Tool>;

  constructor(tools: Tool[]) {
    this.tools = new Map();
    tools.forEach(tool => this.tools.set(tool.name, tool));
  }

  /**
   * Executes a sequence of tools.
   * @param {ToolExecution[]} toolSequence - An array of tool executions, each specifying a tool name and its parameters.
   * @returns {Promise<any[]>} A promise that resolves to an array of results from each tool execution.
   */
  async executeToolSequence(toolSequence: ToolExecution[]): Promise<any[]> {
    const results: any[] = [];
    for (const execution of toolSequence) {
      const tool = this.tools.get(execution.toolName);
      if (!tool) {
        throw new Error(`Tool '${execution.toolName}' not found.`);
      }
      try {
        const result = await tool.execute(execution.parameters);
        results.push(result);
      } catch (error) {
        console.error(`Error executing tool '${execution.toolName}':`, error);
        results.push({ error: `Failed to execute tool '${execution.toolName}'` });
      }
    }
    return results;
  }
}
