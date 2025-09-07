import { NextRequest, NextResponse } from 'next/server';
import { agentRegistry } from '@/lib/agentRegistry';

/**
 * GET /api/agents
 * Returns a list of all available agents with their configurations
 */
export async function GET(request: NextRequest) {
  try {
    const agents = Array.from(agentRegistry.values()).map(agent => ({
      type: agent.config.type,
      name: agent.config.name,
      description: agent.config.description,
      version: agent.config.version,
      enabled: agent.config.enabled,
      timeout: agent.config.timeout
    }));

    return NextResponse.json({
      success: true,
      agents,
      total: agents.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch agents',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
