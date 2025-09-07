'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-400 mb-4">Something went wrong!</h2>
        <p className="text-mediumGray mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-neon-500 text-carbon-900 font-bold rounded-lg hover:shadow-[0_0_20px_#00FFB9] transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
