"use client";

export function DashboardActions() {
  return (
    <>
      <a href="/" className="px-4 py-2 rounded-md bg-spaceGray-800 text-axonWhite border border-spaceGray-800 hover:bg-spaceGray-700 transition-colors">
        Home
      </a>
      <a href="/content" className="px-4 py-2 rounded-md bg-neon-500 text-carbon-900 font-bold hover:shadow-[0_0_20px_#00FFB9] transition-all">
        Content Agent
      </a>
    </>
  );
}
