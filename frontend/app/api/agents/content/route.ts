import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getJson } from 'serpapi';
import { ContentAgentInput } from '@/lib/agents/content-agent';
import { SuccessAgentResult, ErrorAgentResult } from '@/lib/agents/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const input: ContentAgentInput = await req.json();
    const { prompt, tone = 'neutral', length = 'medium' } = input;

    // --- Validation ---
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        ok: false, error: 'GEMINI_API_KEY is not configured on server.',
        agentType: 'content', executionTime: Date.now() - startTime, timestamp: new Date().toISOString(),
      }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    let searchResults: any[] = [];
    let searchQuery = '';
    let provider: 'gemini-with-search' | 'gemini-only' = 'gemini-only';

    // --- Create Search Query & Perform Web Search ---
    if (process.env.SERPAPI_API_KEY) {
      provider = 'gemini-with-search';
      const queryGenPrompt = `Based on the following user prompt, generate a concise and effective search engine query to gather relevant information. Return ONLY the search query.\n\nUser Prompt: "${prompt}"`;
      const queryResult = await model.generateContent(queryGenPrompt);
      searchQuery = queryResult.response.text().trim();

      if (searchQuery) {
        const searchResponse = await getJson({
          api_key: process.env.SERPAPI_API_KEY,
          engine: 'google',
          q: searchQuery,
        });
        searchResults = searchResponse.organic_results?.map((result: any) => ({
          title: result.title, link: result.link, snippet: result.snippet,
        })) || [];
      }
    }

    // --- Compile Comprehensive Prompt for Gemini ---
    const context = searchResults.length > 0
      ? `Here is some context from a web search (query: "${searchQuery}"):\n${JSON.stringify(searchResults.slice(0, 5), null, 2)}`
      : 'No web search was performed.';

    const finalPrompt = `You are Axon, an expert content creator AI. Your task is to generate a piece of content based on the user's request and provided web context.\n\n**User Request:**\n- Prompt: "${prompt}"\n- Tone: ${tone}\n- Desired Length: ${length}\n\n**Web Search Context:**\n${context}\n\n**Instructions:**\n1. Analyze the user request and the web search context.\n2. Write a high-quality piece of content that directly addresses the user's prompt.\n3. Adhere strictly to the requested tone and length.\n4. If the web context is relevant, synthesize it into your response. Do not simply copy it.\n5. Structure your output clearly. Use markdown for formatting if appropriate.\n6. If the context is insufficient, rely on your general knowledge but mention that web results were limited.\n\nBegin writing the content now.`;

    // --- Generate Final Content ---
    const finalResult = await model.generateContent(finalPrompt);
    const output = finalResult.response.text();

    // --- Return Structured Result ---
    const successResult: SuccessAgentResult = {
      ok: true,
      output,
      agentType: 'content',
      provider,
      executionTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      metadata: { searchQuery: searchQuery || undefined },
    };

    return NextResponse.json(successResult);

  } catch (err: any) {
    console.error('Content Agent API Error:', err);
    const errorResult: ErrorAgentResult = {
      ok: false,
      error: err?.message || 'An unknown error occurred.',
      agentType: 'content',
      executionTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(errorResult, { status: 500 });
  }
}
