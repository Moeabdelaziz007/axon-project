'use client';

import { Home, Bot, Settings, LifeBuoy } from 'lucide-react';

/**
 * Sidebar Component (Organism)
 *
 * Provides primary navigation for the dashboard. It is a self-contained unit
 * with its own structure and navigation logic, now using design tokens.
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
          <Bot className="h-7 w-7 text-primary" />
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
                ? 'bg-primary/10 text-primary dark:bg-primary/20'
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary"></div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Crypto Joker</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Lead Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
