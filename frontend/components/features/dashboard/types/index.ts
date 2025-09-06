export interface DashboardProps {
  title?: string;
  description?: string;
  showActions?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  healthy: boolean;
  icon: string;
}

export interface DashboardState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
}
