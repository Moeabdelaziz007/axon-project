import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_PY_BACKEND_URL || 'http://127.0.0.1:5000'

function buildTargetUrl(pathSegments: string[], searchParams: URLSearchParams) {
  const path = pathSegments.join('/')
  const url = new URL(path, BASE_URL + '/')
  searchParams.forEach((v, k) => url.searchParams.set(k, v))
  return url.toString()
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const target = buildTargetUrl(params.path || [], req.nextUrl.searchParams)
    const res = await fetch(target, { method: 'GET', cache: 'no-store' })
    const contentType = res.headers.get('content-type') || ''
    const headers: Record<string, string> = { 'content-type': contentType }
    if (contentType.includes('application/json')) {
      const data = await res.json()
      return NextResponse.json(data, { status: res.status, headers })
    } else {
      const text = await res.text()
      return new NextResponse(text, { status: res.status, headers })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Bridge GET failed' }, { status: 502 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const target = buildTargetUrl(params.path || [], req.nextUrl.searchParams)
    const body = await req.text()
    const res = await fetch(target, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: body || undefined,
      cache: 'no-store',
    })
    const contentType = res.headers.get('content-type') || ''
    const headers: Record<string, string> = { 'content-type': contentType }
    if (contentType.includes('application/json')) {
      const data = await res.json()
      return NextResponse.json(data, { status: res.status, headers })
    } else {
      const text = await res.text()
      return new NextResponse(text, { status: res.status, headers })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Bridge POST failed' }, { status: 502 })
  }
}


