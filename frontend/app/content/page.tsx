"use client"
import { useEffect, useState } from 'react'

export default function ContentAgentPage() {
  const [prompt, setPrompt] = useState('Write a short launch announcement for Axon')
  const [tone, setTone] = useState<'neutral' | 'casual' | 'formal'>('neutral')
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState('')
  const [runId, setRunId] = useState<string | null>(null)
  const [savedFile, setSavedFile] = useState<string | null>(null)
  const [artifacts, setArtifacts] = useState<any[]>([])
  const [loadingList, setLoadingList] = useState(false)

  async function loadArtifacts() {
    setLoadingList(true)
    try {
      const res = await fetch('/api/artifacts/list', { cache: 'no-store' })
      const data = await res.json()
      if (res.ok && data?.ok) {
        setArtifacts(data.items || [])
      }
    } catch {}
    setLoadingList(false)
  }

  useEffect(() => {
    loadArtifacts()
  }, [])

  async function runAgent() {
    setLoading(true)
    setOutput('')
    setSavedFile(null)
    try {
      const res = await fetch('/api/agents/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentType: 'content',
          input: { prompt, tone, length },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Request failed')
      setRunId(data.runId)
      if (data?.result?.ok) {
        setOutput(data.result.output)
        // Save artifact
        const save = await fetch('/api/artifacts/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            runId: data.runId,
            agentType: 'content',
            output: data.result.output,
            provider: data.result.provider,
          }),
        })
        const saveJson = await save.json()
        if (save.ok && saveJson?.ok) setSavedFile(saveJson.file)
        // refresh list
        loadArtifacts()
      } else {
        setOutput(`Error: ${data?.result?.error || 'Unknown error'}`)
      }
    } catch (e: any) {
      setOutput(`Error: ${e?.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Content Agent</h1>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-500">Prompt</span>
          <textarea
            className="mt-1 w-full rounded-md border border-gray-300 bg-white/60 dark:bg-zinc-900/60 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <div className="flex gap-4">
          <label className="flex flex-col text-sm">
            Tone
            <select className="mt-1 rounded-md border p-2 bg-white dark:bg-zinc-900" value={tone} onChange={(e) => setTone(e.target.value as any)}>
              <option value="neutral">Neutral</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Length
            <select className="mt-1 rounded-md border p-2 bg-white dark:bg-zinc-900" value={length} onChange={(e) => setLength(e.target.value as any)}>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </label>
        </div>
        <button
          onClick={runAgent}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Running…' : 'Run Content Agent'}
        </button>
      </div>

      {runId && (
        <p className="text-sm text-gray-500">Run ID: {runId}</p>
      )}

      {output && (
        <div className="rounded-md border p-4 bg-white/60 dark:bg-zinc-900/60">
          <h2 className="font-medium mb-2">Output</h2>
          <pre className="whitespace-pre-wrap text-sm">{output}</pre>
          {savedFile && (
            <p className="text-xs text-green-600 mt-2">Saved: {savedFile}</p>
          )}
        </div>
      )}

      <div className="rounded-md border p-4 bg-white/60 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-medium">Recent Artifacts</h2>
          <button className="text-sm text-blue-600 hover:underline" onClick={loadArtifacts} disabled={loadingList}>
            {loadingList ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
        {artifacts.length === 0 ? (
          <p className="text-sm text-gray-500">No artifacts yet.</p>
        ) : (
          <ul className="space-y-2">
            {artifacts.map((a) => (
              <li key={a.file} className="rounded border p-2 bg-white/50 dark:bg-zinc-900/50">
                <div className="text-xs text-gray-500">{a.savedAt || a.timestamp || ''}</div>
                <div className="text-sm font-medium">{a.file}</div>
                <pre className="text-xs mt-1 max-h-24 overflow-auto whitespace-pre-wrap">
                  {(a.output || '').slice(0, 400)}{(a.output || '').length > 400 ? '…' : ''}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}


