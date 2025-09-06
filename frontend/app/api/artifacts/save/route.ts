import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { createClient } from '@supabase/supabase-js';

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
    const body = await req.json()
    const { runId, agentType, output, provider, ok, ...metadata } = body

    // Basic validation
    if (!runId || !agentType) {
      return NextResponse.json(
        { ok: false, error: 'Missing runId or agentType' },
        { status: 400 },
      )
    }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
    const { error } = await supabase
        .from('artifacts')
        .insert([
          {
            run_id: runId,
            agent_type: agentType,
            output: output,
            provider: provider,
            metadata: metadata, // Store all extra fields in the metadata column
          },
        ])
      if (error) {
        console.error('Supabase error:', error)
        // Don't block, just log the error
      }

    // Save locally as a fallback or for dev
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
      provider,
      metadata, // Also save the full metadata to the local file
      timestamp: new Date().toISOString(),
    }

    await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf8')

    return NextResponse.json({ 
      ok: true, 
      file: path.relative(process.cwd(), filePath),
      source: 'Supabase & Local' 
    })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Failed to save artifact' },
      { status: 500 },
    )
  }
}


