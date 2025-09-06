/**
 * Centralized Agent Registry for Axon AI Agent System
 * Manages all available agents and provides unified access
 */

import { AgentRegistryEntry, AgentType, AgentConfig, BaseAgentInput, AgentResult } from '@/lib/agents/types'
import { runContentAgent } from '@/lib/agents/content-agent'
import { runCodeAgent } from '@/lib/agents/code-agent'
import { runResearchAgent } from '@/lib/agents/research-agent'
import { runDesignAgent } from '@/lib/agents/design-agent'
import { runDataAgent } from '@/lib/agents/data-agent'

// Quantum-brain agent types
export type QuantumAgentType = 
  | 'ide' | 'fraud_detection' | 'pricing' | 'resource_forecasting'
  | 'self_healing' | 'security' | 'customer_engagement' | 'anomaly_detection'
  | 'performance' | 'backup' | 'revenue' | 'retention' | 'market'
  | 'knowledge' | 'recommendations'

export type ExtendedAgentType = AgentType | QuantumAgentType

/**
 * Quantum-brain agent configurations
 */
const QUANTUM_AGENT_CONFIGS: Record<QuantumAgentType, AgentConfig> = {
  ide: {
    type: 'code', // Map to existing type
    name: 'IDE Agent',
    description: 'Intelligent IDE agent for code generation and project monitoring',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 2,
    timeout: 120000,
    retryAttempts: 1,
  },
  fraud_detection: {
    type: 'data',
    name: 'Fraud Detection Agent',
    description: 'Advanced fraud detection using ML patterns and anomaly detection',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 5,
    timeout: 30000,
    retryAttempts: 2,
  },
  pricing: {
    type: 'data',
    name: 'Pricing Agent',
    description: 'Dynamic pricing optimization based on market conditions',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 3,
    timeout: 45000,
    retryAttempts: 1,
  },
  resource_forecasting: {
    type: 'data',
    name: 'Resource Forecasting Agent',
    description: 'Resource usage prediction and optimization',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 2,
    timeout: 60000,
    retryAttempts: 1,
  },
  self_healing: {
    type: 'code',
    name: 'Self-Healing Agent',
    description: 'System self-healing and automatic recovery',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 1,
    timeout: 90000,
    retryAttempts: 3,
  },
  security: {
    type: 'data',
    name: 'Security Sentinel',
    description: 'Security monitoring and threat detection',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 4,
    timeout: 30000,
    retryAttempts: 2,
  },
  customer_engagement: {
    type: 'content',
    name: 'Customer Engagement Agent',
    description: 'Customer engagement and retention strategies',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 3,
    timeout: 45000,
    retryAttempts: 1,
  },
  anomaly_detection: {
    type: 'data',
    name: 'Anomaly Detection Agent',
    description: 'Behavioral anomaly detection and analysis',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 4,
    timeout: 30000,
    retryAttempts: 2,
  },
  performance: {
    type: 'code',
    name: 'Performance Optimizer',
    description: 'System performance optimization and tuning',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 2,
    timeout: 60000,
    retryAttempts: 1,
  },
  backup: {
    type: 'data',
    name: 'Backup Guardian',
    description: 'Automated backup and recovery management',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 1,
    timeout: 120000,
    retryAttempts: 3,
  },
  revenue: {
    type: 'data',
    name: 'Revenue Collector',
    description: 'Revenue collection and payment processing',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 3,
    timeout: 45000,
    retryAttempts: 2,
  },
  retention: {
    type: 'content',
    name: 'Retention Agent',
    description: 'Customer retention analysis and strategies',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 3,
    timeout: 45000,
    retryAttempts: 1,
  },
  market: {
    type: 'research',
    name: 'Market Adapter',
    description: 'Market trend analysis and adaptation',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 2,
    timeout: 60000,
    retryAttempts: 1,
  },
  knowledge: {
    type: 'research',
    name: 'Knowledge Synthesizer',
    description: 'Knowledge synthesis and query processing',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 4,
    timeout: 45000,
    retryAttempts: 1,
  },
  recommendations: {
    type: 'content',
    name: 'AI Recommendation Engine',
    description: 'AI-powered recommendation engine',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 5,
    timeout: 30000,
    retryAttempts: 1,
  },
}

/**
 * Agent configurations
 */
const AGENT_CONFIGS: Record<AgentType, AgentConfig> = {
  content: {
    type: 'content',
    name: 'Content Agent',
    description: 'Generates high-quality content using AI (Gemini Pro, OpenAI)',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 5,
    timeout: 30000,
    retryAttempts: 2,
  },
  code: {
    type: 'code',
    name: 'Code Agent',
    description: 'Generates and analyzes code using IntelliJ IDEA & Z.ai',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 3,
    timeout: 60000,
    retryAttempts: 1,
    dependencies: ['content'],
  },
  research: {
    type: 'research',
    name: 'Research Agent',
    description: 'Conducts research using Manus AI for academic papers and analysis',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 2,
    timeout: 120000,
    retryAttempts: 1,
  },
  design: {
    type: 'design',
    name: 'Design Agent',
    description: 'Creates UI/UX designs using Nano Banana and design tools',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 3,
    timeout: 45000,
    retryAttempts: 2,
  },
  data: {
    type: 'data',
    name: 'Data Agent',
    description: 'Analyzes and processes data using Google Opal and data tools',
    version: '1.0.0',
    enabled: true,
    maxConcurrentRuns: 4,
    timeout: 90000,
    retryAttempts: 1,
    dependencies: ['research'],
  },
}

/**
 * Agent registry mapping
 */
const AGENT_REGISTRY: Record<AgentType, AgentRegistryEntry> = {
  content: {
    config: AGENT_CONFIGS.content,
    run: async (input: BaseAgentInput): Promise<AgentResult> => {
      const started = Date.now()
      const { prompt = '', tone, length } = (input as any) || {}
      const res = await runContentAgent({ prompt, tone, length })
      const executionTime = Date.now() - started
      if (res.ok) {
        return {
          ok: true,
          agentType: 'content',
          executionTime,
          timestamp: new Date().toISOString(),
          output: res.output,
          provider: res.provider,
        }
      }
      return {
        ok: false,
        agentType: 'content',
        executionTime,
        timestamp: new Date().toISOString(),
        error: (res as any).error || 'Unknown error',
        errorCode: 'CONTENT_AGENT_ERROR',
      }
    },
    healthCheck: async () => {
      // Check if upstream functions are available
      const baseUrl = process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL || process.env.FUNCTIONS_BASE_URL
      if (!baseUrl) return true // Stub mode is always healthy
      
      try {
        const response = await fetch(baseUrl, { method: 'HEAD' })
        return response.ok
      } catch {
        return false
      }
    },
  },
  code: {
    config: AGENT_CONFIGS.code,
    run: runCodeAgent,
    healthCheck: async () => {
      // Check IntelliJ IDEA API availability
      return true // Placeholder
    },
  },
  research: {
    config: AGENT_CONFIGS.research,
    run: runResearchAgent,
    healthCheck: async () => {
      // Check Manus AI API availability
      return true // Placeholder
    },
  },
  design: {
    config: AGENT_CONFIGS.design,
    run: runDesignAgent,
    healthCheck: async () => {
      // Check Nano Banana API availability
      return true // Placeholder
    },
  },
  data: {
    config: AGENT_CONFIGS.data,
    run: runDataAgent,
    healthCheck: async () => {
      // Check Google Opal API availability
      return true // Placeholder
    },
  },
}

/**
 * Get all available agents
 */
export function getAvailableAgents(): AgentConfig[] {
  return Object.values(AGENT_CONFIGS).filter(config => config.enabled)
}

/**
 * Get agent configuration by type
 */
export function getAgentConfig(type: AgentType): AgentConfig | null {
  return AGENT_CONFIGS[type] || null
}

/**
 * Get agent registry entry by type
 */
export function getAgentEntry(type: AgentType): AgentRegistryEntry | null {
  return AGENT_REGISTRY[type] || null
}

/**
 * Check if agent is available and healthy
 */
export async function isAgentHealthy(type: AgentType): Promise<boolean> {
  const entry = getAgentEntry(type)
  if (!entry) return false
  
  if (entry.healthCheck) {
    return await entry.healthCheck()
  }
  
  return true
}

/**
 * Get all healthy agents
 */
export async function getHealthyAgents(): Promise<AgentConfig[]> {
  const agents = getAvailableAgents()
  const healthyAgents: AgentConfig[] = []
  
  for (const agent of agents) {
    if (await isAgentHealthy(agent.type)) {
      healthyAgents.push(agent)
    }
  }
  
  return healthyAgents
}

/**
 * Run agent with unified interface
 */
export async function runAgent(type: AgentType, input: BaseAgentInput): Promise<AgentResult> {
  const entry = getAgentEntry(type)
  if (!entry) {
    return {
      ok: false,
      agentType: type,
      executionTime: 0,
      timestamp: new Date().toISOString(),
      error: `Agent type '${type}' not found`,
      errorCode: 'AGENT_NOT_FOUND',
    }
  }
  
  if (!entry.config.enabled) {
    return {
      ok: false,
      agentType: type,
      executionTime: 0,
      timestamp: new Date().toISOString(),
      error: `Agent type '${type}' is disabled`,
      errorCode: 'AGENT_DISABLED',
    }
  }
  
  const startTime = Date.now()
  
  try {
    const result = await entry.run(input)
    const executionTime = Date.now() - startTime
    
    return {
      ...result,
      executionTime,
      timestamp: new Date().toISOString(),
    }
  } catch (error: any) {
    const executionTime = Date.now() - startTime
    
    return {
      ok: false,
      agentType: type,
      executionTime,
      timestamp: new Date().toISOString(),
      error: error?.message || 'Unknown error',
      errorCode: 'EXECUTION_ERROR',
    }
  }
}

/**
 * Get agent dependencies
 */
export function getAgentDependencies(type: AgentType): AgentType[] {
  const config = getAgentConfig(type)
  return config?.dependencies || []
}

/**
 * Check if all dependencies are available
 */
export async function checkDependencies(type: AgentType): Promise<{ available: boolean; missing: AgentType[] }> {
  const dependencies = getAgentDependencies(type)
  const missing: AgentType[] = []
  
  for (const dep of dependencies) {
    const isHealthy = await isAgentHealthy(dep)
    if (!isHealthy) {
      missing.push(dep)
    }
  }
  
  return {
    available: missing.length === 0,
    missing,
  }
}
