"use client";

import { useState, useEffect } from 'react';
import NeuralBackground from '@/components/NeuralBackground';

interface Artifact {
  id: string;
  runId: string;
  agentType: string;
  output: string;
  provider: string;
  metadata: any;
  createdAt: string;
}

export default function CodeAgentPage() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('TypeScript/JavaScript');
  const [framework, setFramework] = useState('React/Next.js');
  const [complexity, setComplexity] = useState<'simple' | 'intermediate' | 'advanced'>('intermediate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    loadArtifacts();
  }, []);

  const loadArtifacts = async () => {
    try {
      const response = await fetch('/api/artifacts/list');
      const data = await response.json();
      if (data.success) {
        setArtifacts(data.artifacts.filter((a: Artifact) => a.agentType === 'code'));
      }
    } catch (error) {
      console.error('Failed to load artifacts:', error);
    }
  };

  const runAgent = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/agents/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          language,
          framework,
          complexity
        })
      });

      const data = await response.json();
      
      if (data.result?.success) {
        setResult(data.result.output);
        
        // Save artifact
        await fetch('/api/artifacts/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            runId: `code-${Date.now()}`,
            agentType: 'code',
            output: data.result.output,
            provider: data.result.provider,
            language: data.result.language,
            framework: data.result.framework,
            complexity: data.result.complexity,
            prompt: prompt
          })
        });

        // Reload artifacts
        loadArtifacts();
      } else {
        setResult(`Error: ${data.result?.error || 'Unknown error'}`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon-900 via-spaceGray-900 to-carbon-800 text-axonWhite">
      <NeuralBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent mb-2">
            Code Agent
          </h1>
          <p className="text-mediumGray text-lg">
            AI-powered code generation and development assistance
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-carbon-900/60 backdrop-blur-xl rounded-2xl p-6 border border-spaceGray-800">
            <h2 className="text-xl font-bold mb-4 text-neon-400">Generate Code</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Code Description</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the code you want to generate..."
                  className="w-full h-32 px-4 py-3 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite placeholder-mediumGray focus:border-neon-500 focus:ring-1 focus:ring-neon-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite focus:border-neon-500"
                  >
                    <option value="TypeScript/JavaScript">TypeScript/JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C#">C#</option>
                    <option value="Go">Go</option>
                    <option value="Rust">Rust</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Framework</label>
                  <select
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                    className="w-full px-3 py-2 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite focus:border-neon-500"
                  >
                    <option value="React/Next.js">React/Next.js</option>
                    <option value="Vue.js">Vue.js</option>
                    <option value="Angular">Angular</option>
                    <option value="Express.js">Express.js</option>
                    <option value="Django">Django</option>
                    <option value="Flask">Flask</option>
                    <option value="Spring Boot">Spring Boot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Complexity</label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value as any)}
                    className="w-full px-3 py-2 bg-spaceGray-900 border border-spaceGray-700 rounded-lg text-axonWhite focus:border-neon-500"
                  >
                    <option value="simple">Simple</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <button
                onClick={runAgent}
                disabled={loading || !prompt.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-neon-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Generating Code...' : 'Generate Code'}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-carbon-900/60 backdrop-blur-xl rounded-2xl p-6 border border-spaceGray-800">
            <h2 className="text-xl font-bold mb-4 text-neon-400">Generated Code</h2>
            
            {result ? (
              <div className="bg-spaceGray-900 rounded-lg p-4 border border-spaceGray-700">
                <pre className="text-sm text-axonWhite whitespace-pre-wrap overflow-x-auto">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="text-mediumGray text-center py-12">
                Generated code will appear here...
              </div>
            )}
          </div>
        </div>

        {/* Recent Artifacts */}
        <div className="mt-8 bg-carbon-900/60 backdrop-blur-xl rounded-2xl p-6 border border-spaceGray-800">
          <h2 className="text-xl font-bold mb-4 text-neon-400">Recent Code Generations</h2>
          
          {artifacts.length > 0 ? (
            <div className="space-y-4">
              {artifacts.slice(0, 5).map((artifact) => (
                <div key={artifact.id} className="bg-spaceGray-900 rounded-lg p-4 border border-spaceGray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-mediumGray">
                      {new Date(artifact.createdAt).toLocaleString()}
                    </div>
                    <div className="text-xs bg-neon-500/20 text-neon-400 px-2 py-1 rounded">
                      {artifact.metadata?.language || 'Code'}
                    </div>
                  </div>
                  <div className="text-sm text-axonWhite font-mono bg-carbon-900 p-3 rounded border border-spaceGray-800 overflow-x-auto">
                    {artifact.output.substring(0, 200)}...
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-mediumGray text-center py-8">
              No code generations yet. Create your first one above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}