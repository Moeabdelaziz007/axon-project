"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AgentOutput } from '@/components/agents/AgentOutput';
import { useAgentExecutor } from '@/hooks/useAgentExecutor';
import { AGENTS } from '@/lib/agentRegistry';

export default function AgentPage() {
  const params = useParams();
  const agentId = params.id as string;
  
  const [prompt, setPrompt] = useState('');
  const [agentConfig, setAgentConfig] = useState<any>({});
  
  const { executeAgent, isExecuting, result, error, clearResult } = useAgentExecutor();
  
  const agent = AGENTS.find(a => a.id === agentId);

  useEffect(() => {
    if (!agent) return;
    
    // Set default config based on agent type
    if (agentId === 'code') {
      setAgentConfig({
        language: 'TypeScript/JavaScript',
        framework: 'React/Next.js',
        complexity: 'intermediate'
      });
    } else if (agentId === 'content') {
      setAgentConfig({
        tone: 'neutral',
        length: 'medium'
      });
    }
  }, [agent, agentId]);

  const handleExecute = async () => {
    if (!prompt.trim()) return;
    
    try {
      clearResult();
      await executeAgent(agentId, {
        prompt,
        ...agentConfig
      });
    } catch (error) {
      console.error('Agent execution failed:', error);
    }
  };

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite flex items-center justify-center">
        <Card variant="quantum">
          <h1 className="text-2xl font-bold text-center">Agent Not Found</h1>
          <p className="text-mediumGray mt-2 text-center">The agent &quot;{agentId}&quot; does not exist.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent mb-2">
            {agent.icon} {agent.name}
          </h1>
          <p className="text-mediumGray text-lg">{agent.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card variant="quantum">
            <h2 className="text-xl font-bold mb-4 text-neon-400">Configure & Execute</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Enter your ${agentId} request...`}
                  className="w-full h-32 px-4 py-3 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite placeholder-mediumGray focus:border-neon-500 focus:ring-1 focus:ring-neon-500"
                />
              </div>

              {/* Agent-specific configuration */}
              {agentId === 'code' && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={agentConfig.language || ''}
                      onChange={(e) => setAgentConfig({...agentConfig, language: e.target.value})}
                      className="w-full px-3 py-2 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite"
                    >
                      <option value="TypeScript/JavaScript">TypeScript/JavaScript</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Framework</label>
                    <select
                      value={agentConfig.framework || ''}
                      onChange={(e) => setAgentConfig({...agentConfig, framework: e.target.value})}
                      className="w-full px-3 py-2 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite"
                    >
                      <option value="React/Next.js">React/Next.js</option>
                      <option value="Vue.js">Vue.js</option>
                      <option value="Django">Django</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Complexity</label>
                    <select
                      value={agentConfig.complexity || ''}
                      onChange={(e) => setAgentConfig({...agentConfig, complexity: e.target.value})}
                      className="w-full px-3 py-2 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite"
                    >
                      <option value="simple">Simple</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              )}

              {agentId === 'content' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tone</label>
                    <select
                      value={agentConfig.tone || ''}
                      onChange={(e) => setAgentConfig({...agentConfig, tone: e.target.value})}
                      className="w-full px-3 py-2 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite"
                    >
                      <option value="neutral">Neutral</option>
                      <option value="casual">Casual</option>
                      <option value="formal">Formal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Length</label>
                    <select
                      value={agentConfig.length || ''}
                      onChange={(e) => setAgentConfig({...agentConfig, length: e.target.value})}
                      className="w-full px-3 py-2 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite"
                    >
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                  </div>
                </div>
              )}

              <Button
                onClick={handleExecute}
                disabled={isExecuting || !prompt.trim()}
                className="w-full bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 hover:shadow-lg hover:shadow-neon-500/25"
              >
                {isExecuting ? 'Executing...' : `Run ${agent.name}`}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card variant="quantum">
            <h2 className="text-xl font-bold mb-4 text-neon-400">Output</h2>
            <AgentOutput result={result} error={error} loading={isExecuting} />
          </Card>
        </div>
      </div>
    </div>
  );
}
