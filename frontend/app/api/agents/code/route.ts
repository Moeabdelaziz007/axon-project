import { NextRequest, NextResponse } from 'next/server';
import { runCodeAgent } from '@/lib/agents/code-agent';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, language, framework, complexity } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const result = await runCodeAgent({
      prompt,
      language,
      framework,
      complexity
    });

    return NextResponse.json({ result });

  } catch (error) {
    console.error('Code Agent API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
