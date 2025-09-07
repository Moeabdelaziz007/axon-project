// app/api/ping/route.ts
import { NextResponse } from 'next/server';

export const GET = () => {
  console.log('>> /api/ping hit');
  return NextResponse.json({ ok: true, now: new Date().toISOString() });
};
