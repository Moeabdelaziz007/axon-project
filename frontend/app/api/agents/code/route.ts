import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CodeAgentInput } from '@/lib/agents/code-agent';
import { SuccessAgentResult, ErrorAgentResult } from '@/lib/agents/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const input: CodeAgentInput = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      const errorResult: ErrorAgentResult = {
        ok: false,
        error: 'Gemini API key not configured on server',
        agentType: 'code',
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(errorResult, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are an expert software developer and code generator. Generate clean, production-ready code based on the user's requirements.

Guidelines:
- Write clean, well-commented code
- Follow best practices and conventions for the specified language/framework
- Include error handling where appropriate
- Make code modular and reusable
- Provide complete, runnable code examples
- Include necessary imports/dependencies
- Add helpful comments explaining complex logic

Language: ${input.language || 'TypeScript/JavaScript'}
Framework: ${input.framework || 'React/Next.js'}
Complexity: ${input.complexity || 'intermediate'}

User Request: ${input.prompt}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const generatedCode = response.text();

    const successResult: SuccessAgentResult = {
      ok: true,
      output: generatedCode,
      agentType: 'code',
      provider: 'gemini-code-generator',
      executionTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(successResult);

  } catch (error) {
    console.error('API Route Error:', error);
    const errorResult: ErrorAgentResult = {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown API error occurred',
      agentType: 'code',
      executionTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorResult, { status: 500 });
  }
}
