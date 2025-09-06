"use client";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({
  title = "Dashboard",
  description = "Manage agents, launch runs, and view results.",
  actions
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-carbon-900/60 backdrop-blur-xl border-b border-spaceGray-800">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-mediumGray">{description}</p>
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
