import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  try {
    const { data, error } = await supabase
      .from('artifacts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      throw error
    }
    return NextResponse.json({ ok: true, items: data, source: 'Supabase' })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || 'Failed to list artifacts from Supabase' }, { status: 500 })
  }

  // Fallback to local filesystem
  try {
    const baseDir = process.env.VERCEL || process.env.NODE_ENV === 'production'
      ? path.join('/tmp', 'artifacts')
      : path.join(process.cwd(), 'data', 'artifacts')
    const artifactsDir = baseDir
    await fs.mkdir(artifactsDir, { recursive: true })
    const files = await fs.readdir(artifactsDir)
    const items = await Promise.all(
      files
        .filter((f) => f.endsWith('.json'))
        .sort()
        .reverse()
        .slice(0, 50)
        .map(async (f) => {
          const content = await fs.readFile(path.join(artifactsDir, f), 'utf8')
          const data = JSON.parse(content)
          return { file: `data/artifacts/${f}`, ...data }
        }),
    )
    return NextResponse.json({ ok: true, items, source: 'Local' })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || 'Failed to list artifacts' }, { status: 500 })
  }
}