"use client";

interface AgentInfoProps {
  name: string;
  description: string;
  healthy: boolean;
}

export function AgentInfo({ name, description, healthy }: AgentInfoProps) {
  return (
    <>
      <h2 className="font-extrabold text-2xl bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent">
        {name}
      </h2>
      <p className="mt-4 text-mediumGray">{description}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-mediumGray">{healthy ? 'Online' : 'Offline'}</span>
      </div>
    </>
  );
}