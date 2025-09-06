import { useEffect, useState } from 'react';

export interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  healthy: boolean;
  icon: string;
}

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAgents = async () => {
    try {
      setError(null);
      const res = await fetch('/api/agents', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data?.agents) {
        setAgents(data.agents);
      } else {
        setError('Failed to load agents');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  return { agents, loading, error, refetch: loadAgents };
}
