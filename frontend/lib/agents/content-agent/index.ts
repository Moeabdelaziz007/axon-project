import { GoogleGenerativeAI } from '@google/generative-ai'
import { getJson } from 'serpapi'

// Define more specific types for the new agent logic
export type ContentAgentInput = {
  prompt: string
  tone?: 'casual' | 'formal' | 'neutral'
  length?: 'short' | 'medium' | 'long'
}

export type SuccessAgentResult = {
  ok: true
  output: string
  provider: 'gemini-with-search' | 'gemini-only' | 'stub'
  searchQuery?: string
}

export type ErrorAgentResult = {
  ok: false
  error: string
}

export type ContentAgentResult = SuccessAgentResult | ErrorAgentResult

// Initialize AI clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

/**
 * Enhanced Axon Content Agent
 *
 * This agent leverages web search and a powerful language model to generate informed content.
 *
 * Flow:
 * 1. Validates input and API keys.
 * 2. Creates a concise search query from the user's prompt.
 * 3. Performs a web search using the generated query via SerpApi.
 * 4. Compiles a comprehensive prompt for the Gemini model, including the original
 *    request and the search results for context.
 * 5. Generates the final content using Gemini.
 * 6. Returns the structured result.
 */
export async function runContentAgent(
  input: ContentAgentInput,
): Promise<ContentAgentResult> {
  const { prompt, tone = 'neutral', length = 'medium' } = input

  // --- 1. Validation ---
  if (!prompt) {
    return { ok: false, error: 'Prompt cannot be empty.' }
  }
  if (!process.env.GEMINI_API_KEY) {
    return { ok: false, error: 'GEMINI_API_KEY is not configured.' }
  }
  if (!process.env.SERPAPI_API_KEY) {
    console.warn('SERPAPI_API_KEY not found. Proceeding without web search.')
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    let searchResults: any[] = []
    let searchQuery = ''

    // --- 2. Create Search Query & 3. Perform Web Search ---
    if (process.env.SERPAPI_API_KEY) {
      // Use Gemini to generate a good search query
      const queryGenPrompt = `Based on the following user prompt, generate a concise and effective search engine query to gather relevant information. Return ONLY the search query.

User Prompt: "${prompt}"`

      const queryResult = await model.generateContent(queryGenPrompt)
      searchQuery = queryResult.response.text().trim()

      if (searchQuery) {
        const searchResponse = await getJson({
          api_key: process.env.SERPAPI_API_KEY,
          engine: 'google',
          q: searchQuery,
        })
        searchResults =
          searchResponse.organic_results?.map(
            (result: any) => ({
              title: result.title,
              link: result.link,
              snippet: result.snippet,
            }),
          ) || []
      }
    }

    // --- 4. Compile Comprehensive Prompt for Gemini ---
    const context =
      searchResults.length > 0
        ? `Here is some context from a web search (query: "${searchQuery}"):
${JSON.stringify(searchResults.slice(0, 5), null, 2)}`
        : 'No web search was performed.'

    const finalPrompt = `
You are Axon, an expert content creator AI. Your task is to generate a piece of content based on the user's request and provided web context.

**User Request:**
- Prompt: "${prompt}"
- Tone: ${tone}
- Desired Length: ${length}

**Web Search Context:**
${context}

**Instructions:**
1.  Analyze the user request and the web search context.
2.  Write a high-quality piece of content that directly addresses the user's prompt.
3.  Adhere strictly to the requested tone and length.
4.  If the web context is relevant, synthesize it into your response. Do not simply copy it.
5.  Structure your output clearly. Use markdown for formatting if appropriate (e.g., headings, lists).
6.  If the context is insufficient, rely on your general knowledge but mention that web results were limited.

Begin writing the content now.
`

    // --- 5. Generate Final Content ---
    const finalResult = await model.generateContent(finalPrompt)
    const output = finalResult.response.text()

    // --- 6. Return Structured Result ---
    return {
      ok: true,
      output,
      provider: process.env.SERPAPI_API_KEY
        ? 'gemini-with-search'
        : 'gemini-only',
      searchQuery: searchQuery || undefined,
    }
  } catch (err: any) {
    console.error('Content Agent Error:', err)
    return { ok: false, error: err?.message || 'An unknown error occurred.' }
  }
}
