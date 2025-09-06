"use client";

import dynamic from 'next/dynamic';

const LazyNeuralBackground = dynamic(() => import('@/components/ui/NeuralBackground'), {
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800" />,
  ssr: false
});

const LazySidebar = dynamic(() => import('@/components/layouts/Sidebar'), {
  loading: () => <div className="w-64 bg-carbon-900/80 animate-pulse" />,
  ssr: false
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite">
      <LazyNeuralBackground />
      <LazySidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
