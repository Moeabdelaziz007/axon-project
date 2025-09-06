// Agent Types
export type AgentType = 'code' | 'content' | 'data' | 'design' | 'research' | 'quantum';

export interface BaseAgent {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  icon: string;
  healthy: boolean;
}

export interface ExecutableAgent extends BaseAgent {
  execute(input: any): Promise<any>;
}

// API Response Types
export interface AgentsResponse {
  agents: BaseAgent[];
}

export interface AgentExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  provider?: string;
}

// Component Props Types
export interface AgentCardProps {
  agent: BaseAgent;
}

export interface AgentGridProps {
  className?: string;
}

// Hook Return Types
export interface UseAgentsReturn {
  agents: BaseAgent[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseAgentExecutorReturn {
  executeAgent: (agentId: string, params: any) => Promise<any>;
  isExecuting: boolean;
  result: any;
  error: string | null;
  clearResult: () => void;
}

// Example usage
const quantumBrain: ExecutableAgent = {
  id: 'quantum-001',
  name: 'Quantum Brain',
  type: 'quantum',
  description: 'Advanced AI agent for complex computations',
  icon: '⚛️',
  healthy: true,
  execute: async (input) => {
    // منطق التنفيذ
  }
};
