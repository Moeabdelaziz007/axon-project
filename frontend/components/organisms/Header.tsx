'use client';

import { Search, Bell } from 'lucide-react';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';

/**
 * Header Component (Organism)
 *
 * Sits at the top of the main content area. It is a self-contained unit
 * that provides search, notifications, and theme-switching functionality.
 */
export function Header() {
  return (
    <header className="h-16 flex-shrink-0 bg-white/80 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <input
            type="search"
            placeholder="Search agents, tasks, or results..."
            className="w-64 lg:w-96 bg-slate-100 dark:bg-slate-800/50 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right-side Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50">
          <Bell className="h-6 w-6" />
          {/* Notification dot */}
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-950"></span>
        </button>

        {/* You can add a user menu here if needed */}
      </div>
    </header>
  );
}
