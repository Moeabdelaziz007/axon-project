import { NextRequest, NextResponse } from 'next/server'
import { runAgent, getAvailableAgents, isAgentHealthy, checkDependencies } from '@/lib/agents/registry'
import { AgentType, BaseAgentInput, AgentRequest, AgentResponse } from '@/lib/agents/types'

/**
 * Unified API endpoint for all AI agents
 * POST /api/agents/run
 */
export async function POST(req: NextRequest) {
  try {
    const body: AgentRequest = await req.json()
    const { agentType, input, options = {} } = body

    // Validate agent type
    if (!agentType || typeof agentType !== 'string') {
      return NextResponse.json(
        { error: 'Invalid agent type' },
        { status: 400 }
      )
    }

    // Check if agent type is supported
    const supportedTypes: AgentType[] = ['content', 'code', 'research', 'design', 'data']
    if (!supportedTypes.includes(agentType as AgentType)) {
      return NextResponse.json(
        { error: `Unsupported agent type: ${agentType}` },
        { status: 400 }
      )
    }

    // Check if agent is healthy
    const isHealthy = await isAgentHealthy(agentType as AgentType)
    if (!isHealthy) {
      return NextResponse.json(
        { error: `Agent ${agentType} is not available` },
        { status: 503 }
      )
    }

    // Check dependencies
    const depsCheck = await checkDependencies(agentType as AgentType)
    if (!depsCheck.available) {
      return NextResponse.json(
        { 
          error: `Missing dependencies: ${depsCheck.missing.join(', ')}`,
          missingDependencies: depsCheck.missing 
        },
        { status: 503 }
      )
    }

    // Generate run ID
    const runId = `run_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Run the agent
    const result = await runAgent(agentType as AgentType, input as BaseAgentInput)

    const response: AgentResponse = {
      runId,
      result,
      status: result.ok ? 'completed' : 'error',
    }

    return NextResponse.json(response)

  } catch (error: any) {
    console.error('Agent API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Get available agents
 * GET /api/agents
 */
export async function GET(req: NextRequest) {
  try {
    const agents = getAvailableAgents()
    const agentStatuses = await Promise.all(
      agents.map(async (agent) => ({
        ...agent,
        healthy: await isAgentHealthy(agent.type),
      }))
    )

    return NextResponse.json({
      agents: agentStatuses,
      total: agents.length,
      healthy: agentStatuses.filter(a => a.healthy).length,
    })

  } catch (error: any) {
    console.error('Agent list API error:', error)
    
    return NextResponse.json(
      { error: 'Failed to get agent list' },
      { status: 500 }
    )
  }
}
