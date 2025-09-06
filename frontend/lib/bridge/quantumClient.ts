/* Universal Adapter: TypeScript bridge client for Quantum Brain Flask API */

const BASE_URL = process.env.NEXT_PUBLIC_PY_BACKEND_URL || 'http://127.0.0.1:5000';

export type BridgeRequest = {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
};

export type BridgeResponse<T = unknown> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
  rawText?: string;
};

function buildUrl(path: string, query?: BridgeRequest['query']): string {
  const url = new URL(path.replace(/^\//, ''), BASE_URL + '/');
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function bridgeFetch<T = unknown>(req: BridgeRequest): Promise<BridgeResponse<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), req.timeoutMs ?? 30000);
  try {
    const res = await fetch(buildUrl(req.path, req.query), {
      method: req.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers || {}),
      },
      body: req.body ? JSON.stringify(req.body) : undefined,
      signal: controller.signal,
      cache: 'no-store',
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = (await res.json()) as T;
      return { ok: res.ok, status: res.status, data };
    } else {
      const text = await res.text();
      return { ok: res.ok, status: res.status, rawText: text, error: res.ok ? undefined : text };
    }
  } catch (err: any) {
    return { ok: false, status: 0, error: err?.message || 'Bridge request failed' };
  } finally {
    clearTimeout(timeout);
  }
}

// Convenience helpers mapping to Flask endpoints used in web_chat_app.py
export async function sendMessage(message: string) {
  return bridgeFetch<{ response: string }>({ path: '/send_message', method: 'POST', body: { message } });
}

export async function getTasks() {
  return bridgeFetch<{ tasks: Record<string, { description: string; status: string; progress: number }>}>({ path: '/get_tasks', method: 'GET' });
}

export async function getDashboard() {
  return bridgeFetch<{ last_ideas: string[]; projects: any; performance: { labels: string[]; values: number[] } }>({ path: '/api/dashboard', method: 'GET' });
}

export function getPythonBaseUrl() {
  return BASE_URL;
}


