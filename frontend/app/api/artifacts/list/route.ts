import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const artifactsDir = path.join(process.cwd(), 'data', 'artifacts')
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
    return NextResponse.json({ ok: true, items })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || 'Failed to list artifacts' }, { status: 500 })
  }
}


