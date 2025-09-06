"use client";

interface AgentStatusProps {
  healthy: boolean;
}

export function AgentStatus({ healthy }: AgentStatusProps) {
  return (
    <div
      className="absolute right-5 top-5 w-3.5 h-3.5 rounded-full ring-2 ring-neon-500 shadow-[0_0_18px_#00FFB9] animate-pulse"
      style={{ background: healthy ? '#00FFB9' : '#282C34' }}
    />
  );
}
