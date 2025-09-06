import { NextRequest, NextResponse } from 'next/server';
import { getJson } from 'serpapi';
import { toolCache } from '@/lib/cache/toolCache';
import { toolQuotaMiddleware } from '@/lib/middleware/toolQuota';

/**
 * API route to perform web searches using SerpAPI.
 * This route integrates caching and quota management.
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const toolName = 'web_search';

  // Apply quota middleware
  const quotaResponse = await toolQuotaMiddleware(req, toolName);
  if (quotaResponse) {
    return quotaResponse; // Quota exceeded, return error response
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required for web search.' }, { status: 400 });
    }

    if (!process.env.SERPAPI_API_KEY) {
      return NextResponse.json({ error: 'SERPAPI_API_KEY is not configured on the server.' }, { status: 500 });
    }

    // Generate a cache key based on the query
    const cacheKey = `web_search:${query}`;

    // Check cache first
    const cachedResult = toolCache.get(cacheKey);
    if (cachedResult) {
      console.log(`[Web Search API] Cache hit for query: ${query}`);
      return NextResponse.json({ ...cachedResult, source: 'cache', executionTime: Date.now() - startTime });
    }

    console.log(`[Web Search API] Performing live search for query: ${query}`);
    // Perform the actual web search via SerpAPI
    const searchResponse = await getJson({
      api_key: process.env.SERPAPI_API_KEY,
      engine: 'google',
      q: query,
    });

    const results = searchResponse.organic_results?.map(
      (result: any) => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet,
      }),
    ) || [];

    // Cache the result (e.g., for 1 hour)
    toolCache.set(cacheKey, { results }, 3600000);

    return NextResponse.json({ results, source: 'live', executionTime: Date.now() - startTime });

  } catch (error) {
    console.error('API Route Error (web-search):', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}
