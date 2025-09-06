import { NextRequest, NextResponse } from 'next/server';
import { runContentAgent } from '@/lib/agents/content-agent';
import { runCodeAgent } from '@/lib/agents/code-agent';

export async function POST(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;
    const body = await request.json();

    let result;

    switch (agentId) {
      case 'content':
        result = await runContentAgent({
          prompt: body.prompt,
          tone: body.tone,
          length: body.length
        });
        break;

      case 'code':
        result = await runCodeAgent({
          prompt: body.prompt,
          language: body.language,
          framework: body.framework,
          complexity: body.complexity
        });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown agent: ${agentId}` },
          { status: 400 }
        );
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error(`Agent ${params.agentId} execution error:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
