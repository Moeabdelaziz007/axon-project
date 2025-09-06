import { NextRequest } from 'next/server'
import { runContentAgent } from '@/lib/agents/content-agent'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = await runContentAgent({
      prompt: String(body?.prompt || ''),
      tone: body?.tone,
      length: body?.length,
    })

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 400,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Bad Request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
