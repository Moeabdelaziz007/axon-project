"use client"

import { useEffect, useState } from 'react'
import AgentGrid from '@/components/AgentGrid'

export default function DashboardPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAgents() {
      try {
        const res = await fetch('/api/agents', { cache: 'no-store' })
        const data = await res.json()
        if (res.ok && data?.agents) setAgents(data.agents)
      } finally {
        setLoading(false)
      }
    }
    loadAgents()
  }, [])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-carbon-900/60 backdrop-blur-xl border-b border-spaceGray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neon-500 via-neon-400 to-cyberViolet-600 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-mediumGray">Manage agents, launch runs, and view results.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="px-4 py-2 rounded-md bg-spaceGray-800 text-axonWhite border border-spaceGray-800">Home</a>
            <a href="/content" className="px-4 py-2 rounded-md bg-neon-500 text-carbon-900 font-bold hover:shadow-[0_0_20px_#00FFB9]">Content Agent</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-mediumGray">Agents</h2>
        </section>

        <AgentGrid />
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vrekxdwpeqqhuwaxmfjk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZWt4ZHdwZXFxaHV3YXhtZmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNTg0OTAsImV4cCI6MjA3MjczNDQ5MH0.k2Eq2y-eh3S1CiEE4s9OeuOVN0c9eD00mjaAi9Y-coo'

const supabase = createClient(supabaseUrl, supabaseKey)

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [progressEntries, setProgressEntries] = useState([])
  const [northStar, setNorthStar] = useState(null)
  const [currentGoal, setCurrentGoal] = useState(null)
  const [newTask, setNewTask] = useState('')
  const [newWin, setNewWin] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load tasks
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      // Load progress entries
      const { data: progressData } = await supabase
        .from('progress_entries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      // Load north star
      const { data: northStarData } = await supabase
        .from('north_stars')
        .select('*')
        .single()

      // Load current goal
      const { data: goalData } = await supabase
        .from('goals')
        .select('*')
        .eq('is_current', true)
        .single()

      setTasks(tasksData || [])
      setProgressEntries(progressData || [])
      setNorthStar(northStarData)
      setCurrentGoal(goalData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          title: newTask,
          status: 'TODO',
          project_id: 'default-project' // ASSUMPTION: Single project for MVP
        }])
        .select()

      if (error) throw error
      
      setTasks([data[0], ...tasks])
      setNewTask('')
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId)

      if (error) throw error

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))

      // If moved to DONE, create progress entry
      if (newStatus === 'DONE') {
        const task = tasks.find(t => t.id === taskId)
        await supabase
          .from('progress_entries')
          .insert({
            content: `أكملت المهمة: ${task.title}`,
            project_id: 'default-project'
          })
        
        loadData() // Reload progress entries
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const addWin = async (e) => {
    e.preventDefault()
    if (!newWin.trim()) return

    try {
      const { data, error } = await supabase
        .from('progress_entries')
        .insert([{
          content: newWin,
          project_id: 'default-project'
        }])
        .select()

      if (error) throw error
      
      setProgressEntries([data[0], ...progressEntries])
      setNewWin('')
    } catch (error) {
      console.error('Error adding win:', error)
    }
  }

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Axon</h1>
              <p className="text-sm text-gray-600">مركز القيادة لمشروعك</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* North Star */}
        {northStar && (
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-6 text-white mb-8">
            <h2 className="text-xl font-semibold mb-2">نجم الشمال</h2>
            <p className="text-lg">{northStar.statement}</p>
          </div>
        )}

        {/* Current Goal */}
        {currentGoal && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">الهدف الأسبوعي</h2>
            <p className="text-gray-700">{currentGoal.objective}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kanban Board */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">لوحة المهام</h2>
                <form onSubmit={addTask} className="flex gap-2">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="إضافة مهمة جديدة..."
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                  >
                    إضافة
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {['TODO', 'IN_PROGRESS', 'FOR_REVIEW', 'DONE'].map(status => (
                  <div key={status} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-4 text-center">
                      {status === 'TODO' && 'قيد الانتظار'}
                      {status === 'IN_PROGRESS' && 'قيد التنفيذ'}
                      {status === 'FOR_REVIEW' && 'قيد المراجعة'}
                      {status === 'DONE' && 'مكتملة'}
                      <span className="ml-2 text-sm text-gray-500">
                        ({getTasksByStatus(status).length})
                      </span>
                    </h3>
                    
                    <div className="space-y-3">
                      {getTasksByStatus(status).map(task => (
                        <div
                          key={task.id}
                          className="bg-white p-3 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => {
                            const statuses = ['TODO', 'IN_PROGRESS', 'FOR_REVIEW', 'DONE']
                            const currentIndex = statuses.indexOf(status)
                            const nextStatus = statuses[currentIndex + 1] || statuses[0]
                            updateTaskStatus(task.id, nextStatus)
                          }}
                        >
                          <div className="font-medium text-sm">{task.title}</div>
                          {task.description && (
                            <div className="text-xs text-gray-500 mt-1">{task.description}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Wall */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">جدار التقدم</h3>
              
              <form onSubmit={addWin} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newWin}
                    onChange={(e) => setNewWin(e.target.value)}
                    placeholder="شارك انتصارك اليومي..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                  >
                    نشر
                  </button>
                </div>
              </form>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {progressEntries.map(entry => (
                  <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-700">{entry.content}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(entry.created_at).toLocaleString('ar-SA')}
                    </div>
                  </div>
                ))}
                
                {progressEntries.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p>لا توجد انتصارات بعد</p>
                    <p className="text-sm">كن أول من يشارك انتصاره!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات سريعة</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي المهام:</span>
                  <span className="font-semibold">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">مكتملة:</span>
                  <span className="font-semibold text-green-600">{getTasksByStatus('DONE').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">قيد التنفيذ:</span>
                  <span className="font-semibold text-blue-600">{getTasksByStatus('IN_PROGRESS').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الانتصارات:</span>
                  <span className="font-semibold text-purple-600">{progressEntries.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
