"use client"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-carbon-900/80 backdrop-blur-xl border-r border-spaceGray-800 text-axonWhite hidden md:flex flex-col">
      <div className="px-6 py-5 border-b border-spaceGray-800">
        <div className="text-xl font-extrabold bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent">Axon Quantum</div>
        <div className="text-xs text-mediumGray">Control Center</div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        <a href="/" className="block px-3 py-2 rounded-md hover:bg-spaceGray-900">Home</a>
        <a href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-spaceGray-900">Dashboard</a>
        <a href="/content" className="block px-3 py-2 rounded-md hover:bg-spaceGray-900">Content Agent</a>
        <a href="/code" className="block px-3 py-2 rounded-md hover:bg-spaceGray-900">Code Agent</a>
        <a href="/research" className="block px-3 py-2 rounded-md hover:bg-spaceGray-900">Research Agent</a>
        <a href="/design" className="block px-3 py-2 rounded-md hover:bg-spaceGray-900">Design Agent</a>
      </nav>
      <div className="px-6 py-4 text-xs text-mediumGray border-t border-spaceGray-800">v0.1.0</div>
    </aside>
  )
}


