interface AgentOutputProps {
  result: any;
  error?: string;
  loading?: boolean;
}

export const AgentOutput = ({ result, error, loading }: AgentOutputProps) => {
  if (loading) {
    return (
      <div className="bg-spaceGray-900 rounded-lg p-4 border border-spaceGray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-spaceGray-800 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-spaceGray-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
        <h3 className="font-medium text-red-400 mb-2">Error</h3>
        <pre className="text-sm text-red-300 whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  if (result) {
    return (
      <div className="bg-spaceGray-900 rounded-lg p-4 border border-spaceGray-700">
        <pre className="text-sm text-axonWhite whitespace-pre-wrap overflow-x-auto">
          {result.result?.output || result.output || JSON.stringify(result, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="text-mediumGray text-center py-12">
      Output will appear here...
    </div>
  );
};
