export type ContentAgentInput = {
  projectId?: string
  prompt: string
  tone?: 'casual' | 'formal' | 'neutral'
  length?: 'short' | 'medium' | 'long'
}

export type ContentAgentResult =
  | {
      ok: true
      output: string
      provider: 'upstream' | 'stub'
    }
  | {
      ok: false
      error: string
    }

/**
 * Axon ContentAgent adapter
 * - If FUNCTIONS_BASE_URL is set, forward the request to upstream contentAgent function
 * - Otherwise, return a stubbed response so UI can integrate
 */
export async function runContentAgent(
  input: ContentAgentInput,
): Promise<ContentAgentResult> {
  const baseUrl =
    process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL || process.env.FUNCTIONS_BASE_URL

  try {
    if (baseUrl) {
      const url = baseUrl
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        cache: 'no-store',
      })
      if (!res.ok) {
        const text = await res.text()
        return { ok: false, error: `Upstream error ${res.status}: ${text}` }
      }
      const data = await res.json().catch(() => ({}))
      const output: string =
        data?.output || data?.content || JSON.stringify(data)
      return { ok: true, output, provider: 'upstream' }
    }

    // Stub response when no upstream configured
    const output = `AXON Content Draft (stub)\n\nPrompt: ${input.prompt}\nTone: ${
      input.tone || 'neutral'
    }\nLength: ${input.length || 'medium'}\n\n- Intro paragraph...\n- 3 key points...\n- CTA...`
    return { ok: true, output, provider: 'stub' }
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Unknown error' }
  }
}
