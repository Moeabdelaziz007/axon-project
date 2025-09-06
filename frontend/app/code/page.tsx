"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CodeAgentPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified agent page
    router.replace('/agents/code');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-500 mx-auto mb-4"></div>
        <p className="text-mediumGray">Redirecting to Code Agent...</p>
      </div>
    </div>
  );
}