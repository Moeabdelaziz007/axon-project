/**
 * Common types and interfaces for Axon AI Agent System
 * Unified types that all agents must implement
 */

export type AgentType = 'content' | 'code' | 'research' | 'design' | 'data'

export type AgentStatus = 'idle' | 'running' | 'completed' | 'error'

export type AgentPriority = 'low' | 'medium' | 'high' | 'urgent'

/**
 * Base input interface that all agents must extend.
 * The index signature `[key: string]: any;` makes this type extensible,
 * allowing specific agent inputs to add their own properties.
 */
export interface BaseAgentInput {
  projectId?: string
  userId?: string
  priority?: AgentPriority
  metadata?: Record<string, any>
  [key: string]: any; // <-- FIX: Allows for extensible properties like 'prompt'
}

/**
 * Base result interface that all agents must implement
 */
export interface BaseAgentResult {
  ok: boolean
  agentType: AgentType
  executionTime: number
  timestamp: string
  metadata?: Record<string, any>
}

export interface SuccessAgentResult extends BaseAgentResult {
  ok: true
  output: string
  artifacts?: AgentArtifact[]
  provider: string
}

export interface ErrorAgentResult extends BaseAgentResult {
  ok: false
  error: string
  errorCode?: string
}

export type AgentResult = SuccessAgentResult | ErrorAgentResult

/**
 * Agent artifacts (files, images, data, etc.)
 */
export interface AgentArtifact {
  id: string
  type: 'text' | 'image' | 'file' | 'data' | 'code'
  name: string
  content: string | Buffer
  mimeType?: string
  size?: number
  metadata?: Record<string, any>
}

/**
 * Agent run record for tracking and history
 */
export interface AgentRun {
  id: string
  agentType: AgentType
  input: BaseAgentInput
  result?: AgentResult
  status: AgentStatus
  createdAt: string
  startedAt?: string
  completedAt?: string
  error?: string
}

/**
 * Agent configuration
 */
export interface AgentConfig {
  type: AgentType
  name: string
  description: string
  version: string
  enabled: boolean
  maxConcurrentRuns?: number
  timeout?: number
  retryAttempts?: number
  dependencies?: AgentType[]
}

/**
 * Agent registry entry
 */
export interface AgentRegistryEntry {
  config: AgentConfig
  run: (input: BaseAgentInput) => Promise<AgentResult>
  healthCheck?: () => Promise<boolean>
}

/**
 * Unified agent request/response
 */
export interface AgentRequest {
  agentType: AgentType
  input: BaseAgentInput
  options?: {
    timeout?: number
    priority?: AgentPriority
    returnArtifacts?: boolean
  }
}

export interface AgentResponse {
  runId: string
  result: AgentResult
  status: AgentStatus
}
