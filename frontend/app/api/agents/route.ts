import { AGENTS } from '@/lib/agentRegistry';

export async function GET() {
  return Response.json({ agents: AGENTS });
}
