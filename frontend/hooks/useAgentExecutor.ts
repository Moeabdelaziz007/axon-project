import { useState } from 'react';

export const useAgentExecutor = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const executeAgent = async (agentId: string, params: any) => {
    try {
      setIsExecuting(true);
      setError(null);
      setResult(null);
      
      const response = await fetch(`/api/agents/${agentId}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Agent execution failed');
      }
      
      setResult(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return { 
    executeAgent, 
    isExecuting, 
    result, 
    error, 
    clearResult 
  };
};
