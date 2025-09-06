'use client';

import { Home, Bot, Settings, LifeBuoy } from 'lucide-react';

/**
 * Sidebar Component
 *
 * Provides primary navigation for the dashboard. It's a client component
 * to allow for future interactivity, such as collapse/expand functionality
 * or active link highlighting.
 */
export function Sidebar() {
  // Placeholder for navigation items
  const navItems = [
    { name: 'Dashboard', icon: Home, href: '#', current: true },
    { name: 'Agents', icon: Bot, href: '#', current: false },
    { name: 'Settings', icon: Settings, href: '#', current: false },
    { name: 'Support', icon: LifeBuoy, href: '#', current: false },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-950/70 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      {/* Logo or Project Name */}
      <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 px-4">
        <div className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-indigo-500" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">Axon</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              item.current
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Sidebar Footer (e.g., User Profile) */}
      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500"></div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Crypto Joker</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Lead Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
