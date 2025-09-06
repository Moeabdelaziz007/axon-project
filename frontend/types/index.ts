export type AgentType = 'code' | 'data' | 'design' | 'research' | 'quantum';

export interface BaseAgent {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  icon: string;
}

export interface ExecutableAgent extends BaseAgent {
  execute(input: any): Promise<any>;
}

// استخدام الأنواع
const quantumBrain: ExecutableAgent = {
  id: 'quantum-001',
  name: 'Quantum Brain',
  type: 'quantum',
  description: 'Advanced AI agent for complex computations',
  icon: '⚛️',
  execute: async (input) => {
    // منطق التنفيذ
  }
};
