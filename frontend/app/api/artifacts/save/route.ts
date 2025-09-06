import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

type SaveBody = {
  runId: string
  agentType: string
  output: string
  provider?: string
  metadata?: Record<string, any>
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SaveBody
    const { runId, agentType, output, provider, metadata } = body || {}

    if (!runId || !agentType || typeof output !== 'string') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const baseDir = process.env.VERCEL || process.env.NODE_ENV === 'production'
      ? path.join('/tmp', 'artifacts')
      : path.join(process.cwd(), 'data', 'artifacts')
    const artifactsDir = baseDir
    await fs.mkdir(artifactsDir, { recursive: true })

    const fileName = `${Date.now()}_${agentType}_${runId}.json`
    const filePath = path.join(artifactsDir, fileName)

    const payload = {
      runId,
      agentType,
      output,
      provider: provider || 'unknown',
      metadata: metadata || {},
      savedAt: new Date().toISOString(),
    }

    await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf8')

    return NextResponse.json({ ok: true, file: path.relative(process.cwd(), filePath) })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Failed to save artifact' },
      { status: 500 },
    )
  }
}


