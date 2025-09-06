import { GoogleGenerativeAI } from '@google/generative-ai';

export interface CodeAgentInput {
  prompt: string;
  language?: string;
  framework?: string;
  complexity?: 'simple' | 'intermediate' | 'advanced';
  projectId?: string;
}

export interface SuccessAgentResult {
  success: true;
  output: string;
  provider: 'gemini-code-generator';
  language?: string;
  framework?: string;
  complexity?: string;
}

export interface ErrorAgentResult {
  success: false;
  error: string;
  provider: 'gemini-code-generator';
}

export type CodeAgentResult = SuccessAgentResult | ErrorAgentResult;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function runCodeAgent(input: CodeAgentInput): Promise<CodeAgentResult> {
  try {
    // Validate input
    if (!input.prompt || input.prompt.trim().length === 0) {
      return {
        success: false,
        error: 'Prompt is required',
        provider: 'gemini-code-generator'
      };
    }

    if (!process.env.GEMINI_API_KEY) {
      return {
        success: false,
        error: 'Gemini API key not configured',
        provider: 'gemini-code-generator'
      };
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build comprehensive prompt for code generation
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

    return {
      success: true,
      output: generatedCode,
      provider: 'gemini-code-generator',
      language: input.language,
      framework: input.framework,
      complexity: input.complexity
    };

  } catch (error) {
    console.error('Code Agent Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      provider: 'gemini-code-generator'
    };
  }
}